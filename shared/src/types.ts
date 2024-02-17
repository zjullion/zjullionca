export type ApiGatewayEvent = {
  body: string
}

export type AddVisitorEnvironment = {
  RECAPTCHA_SECRET: string
}

export type AddVisitorEvent = {
  cookieUuid: string
  recaptchaToken: string
}

export type ContactRequestEnvironment = {
  EMAIL_DESTINATION: string
  EMAIL_SOURCE: string
  RECAPTCHA_SECRET: string
  TEMPLATE_ARN: string
}

export type ContactRequestEvent = {
  email: string
  message: string
  name: string
  recaptchaToken: string
}
