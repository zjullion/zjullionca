import { Stack, StackProps } from 'aws-cdk-lib'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { Code, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda'
import { HostedZone } from 'aws-cdk-lib/aws-route53'
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
      actions: ['ses:SendEmail'],
      effect: Effect.ALLOW,
      resources: [emailTemplate.arn],
    })

    new Node20Lambda<ContactRequestEnvironment>(this, 'contactRequest', {
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
    })

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
  }
}
