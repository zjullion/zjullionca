import { SendEmailCommand, SESv2Client } from '@aws-sdk/client-sesv2'
import { Handler } from 'aws-lambda'
import { ApiGatewayEvent, ContactRequestEnvironment, ContactRequestEvent } from 'shared/types'

import sanitize from '/opt/sanitize'
import verifyRecaptcha from '/opt/verifyRecaptcha'

declare const process: {
  env: ContactRequestEnvironment
}

const sesClient = new SESv2Client()

export const handler: Handler = async (rawEvent: ApiGatewayEvent) => {
  try {
    const event: ContactRequestEvent = JSON.parse(rawEvent.body)
    const { email, message, name, recaptchaToken } = event

    try {
      await verifyRecaptcha(recaptchaToken)
    } catch {
      return {
        body: 'reCAPTCHA verification failed - please try again.',
        statusCode: 500,
      }
    }

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
    return {
      body: 'Message sending failed - please try again.',
      statusCode: 500,
    }
  }
}
