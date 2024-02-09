import { Handler } from 'aws-lambda'
import { SendEmailEvent } from 'shared/types'

export const handler: Handler = async (event: SendEmailEvent, context) => {
  console.log('EVENT: \n' + JSON.stringify(event, null, 2))
  return context.logStreamName
}
