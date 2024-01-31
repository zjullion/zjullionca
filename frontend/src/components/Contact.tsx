import { FunctionComponent, useState } from 'react'
import { css, styled } from 'styled-components'

import { FlexChild, FlexDiv, SafeLink, Text, Title } from './base'

const INPUT_CSS = css`
  border-radius: 2px;
  padding: 2px;
  margin: 3px 0 12px 5px;
  font-size: 0.95em;
`

const StyledInput = styled.input`
  ${INPUT_CSS}
  ${(props) => `width: ${(props.maxLength ?? 30) * 0.35}em;`}
`

const StyledTextArea = styled.textarea`
  ${INPUT_CSS}
`

const EMAIL_REGEX = /[^@]+@[^@]+\.[^@]+/

export const Contact: FunctionComponent = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')

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
        <Title>Message Form</Title>
        <label>Name</label>
        <br />
        <StyledInput
          maxLength={30}
          onChange={(event) => setName(event?.target?.value)}
          type="text"
          value={name}
        />
        <br />
        <label>Email</label>
        <br />
        <StyledInput
          maxLength={60}
          onChange={(event) => setEmail(event?.target?.value)}
          type="text"
          value={email}
        />
        <br />
        <label>Message</label>
        <br />
        <StyledTextArea
          cols={35}
          maxLength={500}
          onChange={(event) => setMessage(event?.target?.value)}
          rows={5}
          value={message}
        />
        <br />
      </FlexChild>
    </FlexDiv>
  )
}
