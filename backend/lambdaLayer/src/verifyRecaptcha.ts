type RecaptchaResult =
  | {
      success: false
    }
  | {
      score: number
      success: true
    }

const verifyRecaptcha = async (token: string) => {
  try {
    const httpResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
      { method: 'POST' },
    )
    if (httpResponse.ok) {
      const result = (await httpResponse.json()) as RecaptchaResult
      if (result.success && result.score >= 0.6) {
        return
      }
    }
  } catch {
    // More complex error handling is out of scope
  }
  throw new Error('reCAPTCHA verification failed.')
}

export default verifyRecaptcha
