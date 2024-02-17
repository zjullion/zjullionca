import { Handler } from 'aws-lambda'
import { AddVisitorEvent, ApiGatewayEvent } from 'shared/types'

import verifyRecaptcha from '/opt/verifyRecaptcha'

// declare const process: {
//   env: AddVisitorEnvironment
// }

export const handler: Handler = async (rawEvent: ApiGatewayEvent) => {
  const event: AddVisitorEvent = JSON.parse(rawEvent.body)
  const { recaptchaToken } = event

  await verifyRecaptcha(recaptchaToken)

  // TODO
}
