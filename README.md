# zjullionca

Full-stack code for my professional website hosted on [AWS](https://aws.amazon.com) serverless infrastructure.
Everything is written in [TypeScript](https://www.typescriptlang.org).
The [ReactJS](https://react.dev) frontend is deployed using [CDK](https://aws.amazon.com/cdk).

## Motivation

This repository exists for two reasons:

1. To demonstrate my knowledge of this tech stack.
2. To act as an example / template for anyone else interested in using this tech stack.

## Configuration

As stated previously, this repository is written in [TypeScript](https://www.typescriptlang.org).
I prefer [pNpm](https://pnpm.io) over both `npm` and `yarn` for library management.
[nvm](https://github.com/nvm-sh/nvm) is used to manage `Node` versions.

## Frontend

The frontend is built with [ReactJS](https://react.dev).
"Standard" React libraries, such as `react-router-dom`, `styled-components`, and `webpack` are also in use.
Note that `create-react-app` is not used in the frontend - I find it causes problems "down the road".

## Backend & Infrastructure

[Cloud Development Kit](https://aws.amazon.com/cdk) is used to deploy the application.
The frontend is hosted in an `S3 bucket` and distributed by a `CloudFront distribution`.
Additionally, the application uses two `Lambda functions`, a `DynamoDB table`, and an `API Gateway endpoint`.
Each backend folder contains code for one of the Lambda functions.

## Code Formatting & Testing

Nearly all files in the repo are formatted with [Prettier](https://prettier.io).
Tests are run using [Jest](https://jestjs.io).
Code quality is enforced via [ESLint](https://eslint.org).

## CI / CD

Obviously, this repository is hosted on `GitHub`.
[GitHub Actions](https://github.com/features/actions) is used to test pull requests and deploy the site.
