import { FunctionComponent } from 'react'

import { FlexChild, FlexDiv, Image, ListItem, SafeLink, Text, Title, UnorderedList } from './base'

export const Home: FunctionComponent = () => {
  return (
    <FlexDiv>
      <FlexChild>
        <Title>About Me</Title>
        <Text>
          Hello there! I&apos;m Zach Jullion, a senior fullstack software developer living in
          Edmonton, Alberta, Canada. My goals are to:
        </Text>
        <UnorderedList>
          <ListItem>
            Scrutinize project requirements to ensure that vital needs are met with the best
            possible value.
          </ListItem>
          <ListItem>
            Architect solutions that fulfill current needs, consider future growth, and minimize
            maintenance.
          </ListItem>
          <ListItem>
            Implement processes and tools that make development easier and faster while reducing
            errors.
          </ListItem>
          <ListItem>
            Retroactively examine issues and failures, in order to learn and improve (both
            personally and as a team).
          </ListItem>
        </UnorderedList>
      </FlexChild>
      <FlexChild>
        <Title>Education</Title>
        <Text>
          I have a Bachelor of Science with Honors and a Master of Science, both from the University
          of Alberta. You can find my master&apos;s thesis{' '}
          <SafeLink
            content="here"
            to="https://era.library.ualberta.ca/items/82a7eb86-455b-4938-8630-6c57e9398ae5"
          />
          .
        </Text>
        <Image alt="Photo of Zach Jullion's face" src="/img/headshot.jpg" />
      </FlexChild>
      <FlexChild>
        <Title>Experience</Title>
        <Text>I have signifiant experience with the following languages / frameworks / tools:</Text>
        <UnorderedList>
          <ListItem>
            Many <SafeLink content="AWS" to="https://aws.amazon.com" /> services, with the most
            experience in serverless offerings such as Lambda, DynamoDB, SQS, IAM, AppSync, S3,
            CloudWatch, SES, and Cognito
          </ListItem>
          <ListItem>
            JavaScript & <SafeLink content="TypeScript" to="https://www.typescriptlang.org" />
          </ListItem>
          <ListItem>HTML & CSS</ListItem>
          <ListItem>
            <SafeLink content="ReactJS" to="https://react.dev" />
          </ListItem>
          <ListItem>
            <SafeLink content="Jest" to="https://jestjs.io" />,{' '}
            <SafeLink
              content="React Testing Library"
              to="https://testing-library.com/docs/react-testing-library/intro"
            />
            , and <SafeLink content="Cypress" to="https://www.cypress.io" />
          </ListItem>
          <ListItem>
            AWS deployment frameworks:{' '}
            <SafeLink content="CloudFormation" to="https://aws.amazon.com/cloudformation" />,{' '}
            <SafeLink content="CDK" to="https://aws.amazon.com/cdk" />, and{' '}
            <SafeLink content="Amplify CLI" to="https://docs.amplify.aws/javascript/tools/cli" />
          </ListItem>
        </UnorderedList>
        <Text>I have some experience with:</Text>
        <UnorderedList>
          <ListItem>
            Java, Ruby on Rails, C, C++, C#, Python, ActionScript, PHP, and MIPS assembly
          </ListItem>
          <ListItem>SQL (MySQL, SQLite, PostgreSQL)</ListItem>
        </UnorderedList>
      </FlexChild>
      <FlexChild>
        <Title>My Software Philosophies</Title>
        <UnorderedList>
          <ListItem>
            Socialization within and between teams is vital - it builds empathy and breaks down “us
            vs. them” attitudes. This results in both a better product and higher morale.
          </ListItem>
          <ListItem>
            Feedback (“upwards”, “downwards”, and between peers) is critical to help individuals,
            teams, and companies grow and improve. Good feedback is gentle, poignant, and
            actionable, but not “brutally honest”.
          </ListItem>
          <ListItem>
            Software teams need time and permission to innovate and make technical decisions. Teams
            that have these opportunities produce better results and become deeply invested in the
            success of their product.
          </ListItem>
        </UnorderedList>
      </FlexChild>
    </FlexDiv>
  )
}
