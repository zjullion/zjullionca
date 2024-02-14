import { CfnTemplate } from 'aws-cdk-lib/aws-ses'
import { Construct } from 'constructs'
import { readFileSync } from 'fs'

export type SesTemplateConfig = {
  htmlTemplate: string
  stage: string
  subjectPart: string
  templateName: string
}

/**
 * An SES email template.
 */
export class SesTemplate extends Construct {
  constructor(scope: Construct, id: string, props: SesTemplateConfig) {
    super(scope, id)
    const { htmlTemplate, stage, subjectPart, templateName } = props

    new CfnTemplate(this, `${id}-${stage}`, {
      template: {
        htmlPart: readFileSync(`htmlTemplates/${htmlTemplate}.html`, 'utf-8'),
        subjectPart,
        templateName: `${templateName}-${stage}`,
      },
    })
  }
}
