type RecaptchaResult =
  | {
      success: false
    }
  | {
      score: number
      success: true
    }

const verifyRecaptcha = async (token: string) => {
  const httpResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
    { method: 'POST' },
  )

  if (httpResponse.ok) {
    const result = (await httpResponse.json()) as RecaptchaResult
    if (result.success) {
      return result.score >= 0.6
    }
  }
  return false
}

export default verifyRecaptcha
