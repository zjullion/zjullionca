#!/usr/bin/env ts-node
import 'source-map-support/register'

import * as cdk from 'aws-cdk-lib'
import dotenv from 'dotenv'
import path from 'path'

import { AppStack } from '../src/AppStack'

dotenv.config({ path: path.resolve(__dirname, '../../prod.env') })

const account = process.env.ACCOUNT
const certificateArn = process.env.CERT_ARN

if (account == null || certificateArn == null) {
  throw new Error('Failed to load "../prod.env".')
}

const app = new cdk.App()
new AppStack(app, 'zjullionca', {
  certificateArn,
  env: { account, region: 'us-east-1' },
  tags: { managed: 'cdk', owner: 'zjullion.ca', stage: 'prod' },
  url: 'zjullion.ca',
})
