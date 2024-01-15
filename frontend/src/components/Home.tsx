import { FunctionComponent } from 'react'

import { SafeLink, Text, Title } from './base'

export const Home: FunctionComponent = () => {
  return (
    <>
      <Title>About Me</Title>
      <Text>
        Hello there! I am Zach Jullion, a software developer living in Edmonton, Alberta, Canada. My
        expertise is primarily in web applications built with{' '}
        <SafeLink content="ReactJS" to="https://react.dev" /> and hosted on{' '}
        <SafeLink content="AWS" to="https://aws.amazon.com/" />.
      </Text>
      <Text>I have signifiant experience with the following languages / frameworks / tools:</Text>
    </>
  )
}
