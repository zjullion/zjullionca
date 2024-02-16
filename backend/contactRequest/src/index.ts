import { SendEmailCommand, SESv2Client } from '@aws-sdk/client-sesv2'
import { Handler } from 'aws-lambda'
import { ContactRequestEnvironment, ContactRequestEvent } from 'shared/types'

import sanitize from '/opt/sanitize'
import verifyRecaptcha from '/opt/verifyRecaptcha'

declare const process: {
  env: ContactRequestEnvironment
}

const sesClient = new SESv2Client()

export const handler: Handler = async (event: ContactRequestEvent) => {
  const { email, message, name, recaptchaToken } = event

  await verifyRecaptcha(recaptchaToken)

  try {
    await sesClient.send(
      new SendEmailCommand({
        Content: {
          Template: {
            TemplateArn: process.env.TEMPLATE_ARN,
            TemplateData: JSON.stringify({
              email: sanitize(email),
              message: sanitize(message),
              name: sanitize(name),
            }),
          },
        },
        Destination: {
          ToAddresses: [process.env.EMAIL_DESTINATION],
        },
        FromEmailAddress: process.env.EMAIL_SOURCE,
      }),
    )
  } catch {
    throw new Error('Email sending failed.')
  }
}
