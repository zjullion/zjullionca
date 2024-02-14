import { Stack, StackProps } from 'aws-cdk-lib'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import { HostedZone } from 'aws-cdk-lib/aws-route53'
import { Source } from 'aws-cdk-lib/aws-s3-deployment'
import { Construct } from 'constructs'

import { HostingConstruct } from './HostingConstruct'
import { Node20Lambda } from './Node20Lambda'
import { SesTemplate } from './SesTemplate'

export type AppStackConfig = {
  certificateArn: string
  url: string
}

/**
 * Constructs a one-per-stage stack that consists of: TODO
 */
export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps & AppStackConfig) {
    super(scope, id, props)
    const { certificateArn, tags, url } = props
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

    new SesTemplate(this, 'contact-request-template', {
      htmlTemplate: 'contactRequest',
      stage,
      subjectPart: 'You have a contact request from {{name}}',
      templateName: 'contact-request-template',
    })

    new Node20Lambda(this, 'sendEmail', {
      codeDirectory: '../backend/sendEmail',
      environment: {},
      name: 'sendEmail',
      stage,
    })
  }
}
