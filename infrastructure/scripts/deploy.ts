#!/usr/bin/env ts-node
import 'source-map-support/register'

import * as cdk from 'aws-cdk-lib'
import dotenv from 'dotenv'
import path from 'path'

import { AppStack } from '../src/AppStack'

dotenv.config({ path: path.resolve(__dirname, '../../prod.env') })

const account = process.env.ACCOUNT
const certificateArn = process.env.CERT_ARN
const contactRequestEmailDestination = process.env.CONTACT_REQUEST_EMAIL_DESTINATION
const contactRequestEmailSource = process.env.CONTACT_REQUEST_EMAIL_SOURCE

if (
  account == null ||
  certificateArn == null ||
  contactRequestEmailDestination == null ||
  contactRequestEmailSource == null
) {
  throw new Error('Failed to load env variables!')
}

const app = new cdk.App()
new AppStack(app, 'zjullionca', {
  certificateArn,
  contactRequestEmailDestination,
  contactRequestEmailSource,
  env: { account, region: 'us-east-1' },
  tags: { managed: 'cdk', owner: 'zjullion.ca', stage: 'prod' },
  url: 'zjullion.ca',
})
