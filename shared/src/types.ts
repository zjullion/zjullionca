export type ContactRequestEvent = {
  email: string
  message: string
  name: string
  recaptchaToken: string
}

export type ContactRequestEnvironment = {
  EMAIL_DESTINATION: string
  EMAIL_SOURCE: string
  TEMPLATE_ARN: string
}
