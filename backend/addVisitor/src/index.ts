import { Handler } from 'aws-lambda'
import { AddVisitorEnvironment, AddVisitorEvent } from 'shared/types'

import verifyRecaptcha from '/opt/verifyRecaptcha'

declare const process: {
  env: AddVisitorEnvironment
}

export const handler: Handler = async (event: AddVisitorEvent) => {
  const { cookieUuid, recaptchaToken } = event

  await verifyRecaptcha(recaptchaToken)

  // TODO
}
