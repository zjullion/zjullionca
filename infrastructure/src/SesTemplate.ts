import { ScopedAws } from 'aws-cdk-lib'
import { CfnTemplate } from 'aws-cdk-lib/aws-ses'
import { Construct } from 'constructs'
import { readFileSync } from 'fs'

export type SesTemplateConfig = {
  htmlTemplate: string
  name: string
  stage: string
  subjectPart: string
}

/**
 * An SES email template.
 */
export class SesTemplate extends Construct {
  private templateArn: string

  constructor(scope: Construct, id: string, props: SesTemplateConfig) {
    super(scope, id)
    const { htmlTemplate, name, stage, subjectPart } = props

    const templateName = `${name}-${stage}`
    const { accountId, region } = new ScopedAws(this)
    this.templateArn = `arn:aws:ses:${region}:${accountId}:template/${templateName}`

    new CfnTemplate(this, `${id}-${stage}`, {
      template: {
        htmlPart: readFileSync(`htmlTemplates/${htmlTemplate}.html`, 'utf-8'),
        subjectPart,
        templateName,
      },
    })
  }

  public get arn() {
    return this.templateArn
  }
}
