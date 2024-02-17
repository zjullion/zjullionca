import { Stack, StackProps } from 'aws-cdk-lib'
import { CorsHttpMethod, DomainName, HttpApi, HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2'
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { Code, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda'
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53'
import { ApiGatewayv2DomainProperties } from 'aws-cdk-lib/aws-route53-targets'
import { Source } from 'aws-cdk-lib/aws-s3-deployment'
import { Construct } from 'constructs'
import { AddVisitorEnvironment, ContactRequestEnvironment } from 'shared/types'

import { HostingConstruct } from './HostingConstruct'
import { Node20Lambda } from './Node20Lambda'
import { SesTemplate } from './SesTemplate'

export type AppStackConfig = {
  certificateArn: string
  contactRequestEmailDestination: string
  contactRequestEmailSource: string
  recaptchaSecret: string
  sesIdentityArn: string
  url: string
}

/**
 * Constructs a one-per-stage stack.
 */
export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps & AppStackConfig) {
    super(scope, id, props)
    const {
      certificateArn,
      contactRequestEmailDestination,
      contactRequestEmailSource,
      recaptchaSecret,
      sesIdentityArn,
      tags,
      url,
    } = props
    const stage = tags?.stage ?? 'temp'

    const certificate = Certificate.fromCertificateArn(this, `cert-${stage}`, certificateArn)
    const zone = HostedZone.fromLookup(this, `hostedzone-${stage}`, { domainName: url })

    new HostingConstruct(this, 'zjullionca', {
      certificate,
      source: Source.asset('../frontend/dist/'),
      stage,
      url,
      zone,
    })

    const lambdaLayer = new LayerVersion(this, `zjullionca-layer-${stage}`, {
      code: Code.fromAsset('../backend/lambdaLayer/dist'),
      compatibleRuntimes: [Runtime.NODEJS_18_X, Runtime.NODEJS_20_X],
      layerVersionName: `zjullionca-layer-${stage}`,
    })

    const emailTemplate = new SesTemplate(this, 'contact-request-template', {
      htmlTemplate: 'contactRequest',
      name: 'contact-request-template',
      stage,
      subjectPart: 'You have a contact request from {{name}}',
    })
    const sendEmailPolicy = new PolicyStatement({
      actions: ['ses:SendTemplatedEmail'],
      conditions: {
        'ForAllValues:StringEquals': {
          'ses:Recipients': contactRequestEmailDestination,
        },
      },
      effect: Effect.ALLOW,
      resources: [emailTemplate.arn, sesIdentityArn],
    })

    const contactRequestLambda = new Node20Lambda<ContactRequestEnvironment>(
      this,
      'contactRequest',
      {
        codeDirectory: '../backend/contactRequest',
        environment: {
          EMAIL_DESTINATION: contactRequestEmailDestination,
          EMAIL_SOURCE: contactRequestEmailSource,
          RECAPTCHA_SECRET: recaptchaSecret,
          TEMPLATE_ARN: emailTemplate.arn,
        },
        layers: [lambdaLayer],
        name: 'contactRequest',
        policies: [sendEmailPolicy],
        stage,
      },
    )

    new Node20Lambda<AddVisitorEnvironment>(this, 'addVisitor', {
      codeDirectory: '../backend/addVisitor',
      environment: {
        RECAPTCHA_SECRET: recaptchaSecret,
      },
      layers: [lambdaLayer],
      name: 'addVisitor',
      policies: [], // TODO
      stage,
    })

    const apiDomainName = new DomainName(this, `zjullionca-api-domain-name-${stage}`, {
      certificate,
      domainName: `api.${url}`,
    })
    const apiGateway = new HttpApi(this, `zjullion-api-${stage}`, {
      corsPreflight: {
        allowHeaders: ['*'],
        allowMethods: [CorsHttpMethod.POST],
        allowOrigins: [`https://${url}`],
      },
      defaultDomainMapping: {
        domainName: apiDomainName,
      },
    })
    const target = RecordTarget.fromAlias(
      new ApiGatewayv2DomainProperties(
        apiDomainName.regionalDomainName,
        apiDomainName.regionalHostedZoneId,
      ),
    )
    new ARecord(this, `zjullionca-api-${stage}`, { recordName: 'api', target, zone })

    apiGateway.addRoutes({
      integration: new HttpLambdaIntegration(
        `contact-request-integration-${stage}`,
        contactRequestLambda.function,
      ),
      methods: [HttpMethod.POST],
      path: '/contact-request',
    })
  }
}
