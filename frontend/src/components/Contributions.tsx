import { FunctionComponent } from 'react'

import { FlexChild, FlexDiv, ListItem, SafeLink, Text, Title, UnorderedList } from './base'

export const Contributions: FunctionComponent = () => {
  return (
    <FlexDiv>
      <FlexChild>
        <Title>AWS Amplify CLI</Title>
        <Text>
          <SafeLink content="Homepage" to="https://github.com/aws-amplify/amplify-cli" />
        </Text>
        <Text>
          The AWS Amplify CLI is a tool for rapidly building AWS backends with minimal AWS
          knowledge. Early versions of Amplify CLI only supported a very limited set of AWS
          resources. For nearly a year, the community asked for a way to deploy &quot;custom&quot;
          AWS resources using Amplify CLI. In May 2019, while I was working at the Alberta Motor
          Association, I{' '}
          <SafeLink
            content="found a way to deploy custom resources"
            to="https://github.com/aws-amplify/amplify-cli/issues/80#issuecomment-492428916"
          />
          . My method for deploying custom resources became part of the official documentation for
          several years (until the process was changed).
        </Text>
      </FlexChild>
      <FlexChild>
        <Title>sensitive-param-filter</Title>
        <Text>
          <SafeLink content="Homepage" to="https://github.com/amaabca/sensitive-param-filter" />
        </Text>
        <Text>
          This library is used to filter &quot;sensitive&quot; data (passwords, secrets, etc) from
          JavaScript objects. I originally wrote this library while working at the Alberta Motor
          Association. Since then, multiple AMA developers have contributed to it. Recently,
          I&apos;ve rewritten sensitive-param-filter in{' '}
          <SafeLink content="TypeScript" to="https://www.typescriptlang.org" /> and started
          publishing{' '}
          <SafeLink
            content="my own version"
            to="https://github.com/zjullion/sensitive-param-filter"
          />
          .
        </Text>
      </FlexChild>
      <FlexChild>
        <Title>zjullionca</Title>
        <Text>
          <SafeLink content="Homepage" to="https://github.com/zjullion/zjullionca" />
        </Text>
        <Text>
          The repository for this website! This repo contains a{' '}
          <SafeLink content="ReactJS" to="https://react.dev" /> frontend written in TypeScript,
          which is deployed to AWS using <SafeLink content="CDK" to="https://aws.amazon.com/cdk/" />
          . Additionally, code quality / style rules are enforced using the following tools:
        </Text>
        <UnorderedList>
          <ListItem>
            <SafeLink content="ESLint" to="https://eslint.org" />
          </ListItem>
          <ListItem>
            <SafeLink content="Prettier" to="https://prettier.io" />
          </ListItem>
          <ListItem>
            <SafeLink content="Stylelint" to="https://stylelint.io" />
          </ListItem>
        </UnorderedList>
      </FlexChild>
      <FlexChild>
        <Title>fetched-interval-cache</Title>
        <Text>
          <SafeLink content="Homepage" to="https://github.com/zjullion/fetched-interval-cache" />
        </Text>
        <Text>
          I wrote and maintain this TypeScript library for storing ordered query data (typically
          fetched from a backend database).{' '}
          <SafeLink
            content="Documentation"
            to="https://zjullion.github.io/fetched-interval-cache"
          />{' '}
          for fetched-interval-cache is generated using{' '}
          <SafeLink content="TypeDoc" to="https://typedoc.org" />. Like my other libraries, this one
          is published using{' '}
          <SafeLink content="GitHub Actions" to="https://github.com/features/actions" />.
        </Text>
      </FlexChild>
    </FlexDiv>
  )
}
