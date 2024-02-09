import { Handler } from 'aws-lambda'
import { SendEmailEvent } from 'shared/types'

import verifyRecaptcha from '/opt/nodejs/verifyRecaptcha'

export const handler: Handler = async (event: SendEmailEvent, context) => {
  const { email, message, name, recaptchaToken } = event

  const validRequest = await verifyRecaptcha(recaptchaToken)
  if (!validRequest) {
    throw new Error('reCAPTCHA verification failed.')
  }
}
