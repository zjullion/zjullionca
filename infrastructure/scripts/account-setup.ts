#!/usr/bin/env ts-node

import arg from 'arg'
import { execSync } from 'child_process'

const args = arg({
  '--accountNumber': String,
  '-a': '--accountNumber',
})

const accountNumber = args['--accountNumber']
if (accountNumber == null) {
  console.log('An account number must be provided.')
  process.exit()
}

execSync(`cdk bootstrap aws://${accountNumber}/us-east-1`, { stdio: 'inherit' })
