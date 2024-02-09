import { FunctionComponent, useState } from 'react'
import { css, styled } from 'styled-components'

import { FlexChild, FlexDiv, SafeLink, Text, Title } from './base'

const INPUT_CSS = css`
  border-radius: 2px;
  padding: 2px;
  margin: 2px 0 12px 5px;
  font-size: 0.95em;
`

const StyledInput = styled.input`
  ${INPUT_CSS}
  ${(props) => `width: ${(props.maxLength ?? 30) * 0.35}em;`}
`

const StyledTextArea = styled.textarea`
  ${INPUT_CSS}
`

const ErrorMessage = styled(Text)`
  color: red;
  margin: 0 0 0 5px;
`

const StyledButton = styled.button`
  font-size: 0.9em;
`

const EMAIL_REGEX = /[^@]+@[^@]+\.[^@]+/

export const Contact: FunctionComponent = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const [nameError, setNameError] = useState<string | undefined>()
  const [emailError, setEmailError] = useState<string | undefined>()
  const [messageError, setMessageError] = useState<string | undefined>()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const submit = async () => {
    setIsSubmitting(true)
    let hasError = false

    if (name.length === 0) {
      setNameError('Name required.')
      hasError = true
    }
    if (email.length === 0) {
      setEmailError('Email required.')
      hasError = true
    } else if (!EMAIL_REGEX.test(email)) {
      setEmailError('Invalid email.')
      hasError = true
    }
    if (message.length === 0) {
      setMessageError('Message required.')
      hasError = true
    }

    if (hasError) {
      setIsSubmitting(false)
      return
    }

    const resolve = () => null

    grecaptcha.ready(() => {
      grecaptcha
        .execute('6LfkfW0pAAAAAGOhMBGOAN5Tz5r6eAIXn4zSanRV', { action: 'submit_contact_form' })
        .then((token) => {
          // TODO: submit stuff
          console.log(token)
          // TODO: call resolve when done
        })
    })

    await new Promise(resolve)
    setIsSubmitting(false)
  }

  return (
    <FlexDiv>
      <FlexChild>
        <Title>Contact Info</Title>
        <Text>
          Email: <a href="mailto:zach@zjullion.ca">zach@zjullion.ca</a>
        </Text>
        <Text>
          LinkedIn:{' '}
          <SafeLink
            content="Zach Jullion"
            to="https://www.linkedin.com/in/zach-jullion-b9809b14a/"
          />
        </Text>
      </FlexChild>
      <FlexChild>
        <Title>Contact Form</Title>
        <label>Name</label>
        <br />
        {nameError != null ? <ErrorMessage>{nameError}</ErrorMessage> : undefined}
        <StyledInput
          maxLength={30}
          onChange={(event) => {
            setName(event?.target?.value)
            setNameError(undefined)
          }}
          type="text"
          value={name}
        />
        <br />
        <label>Email</label>
        <br />
        {emailError != null ? <ErrorMessage>{emailError}</ErrorMessage> : undefined}
        <StyledInput
          maxLength={60}
          onChange={(event) => {
            setEmail(event?.target?.value)
            setEmailError(undefined)
          }}
          type="text"
          value={email}
        />
        <br />
        <label>Message</label>
        <br />
        {messageError != null ? <ErrorMessage>{messageError}</ErrorMessage> : undefined}
        <StyledTextArea
          cols={35}
          maxLength={500}
          onChange={(event) => {
            setMessage(event?.target?.value)
            setMessageError(undefined)
          }}
          rows={5}
          value={message}
        />
        <br />
        <StyledButton disabled={isSubmitting} onClick={submit}>
          Submit
        </StyledButton>
      </FlexChild>
    </FlexDiv>
  )
}
