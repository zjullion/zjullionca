import { SendEmailCommand, SESv2Client } from '@aws-sdk/client-sesv2'
import { Handler } from 'aws-lambda'
import { ContactRequestEnvironment, ContactRequestEvent } from 'shared/types'

import sanitize from '/opt/nodejs/sanitize'
import verifyRecaptcha from '/opt/nodejs/verifyRecaptcha'

declare const process: {
  env: ContactRequestEnvironment
}

const sesClient = new SESv2Client()

export const handler: Handler = async (event: ContactRequestEvent) => {
  const { email, message, name, recaptchaToken } = event

  await verifyRecaptcha(recaptchaToken)

  try {
    sesClient.send(
      new SendEmailCommand({
        Content: {
          Template: {
            TemplateData: JSON.stringify({
              email: sanitize(email),
              message: sanitize(message),
              name: sanitize(name),
            }),
            TemplateArn: process.env.TEMPLATE_ARN,
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
