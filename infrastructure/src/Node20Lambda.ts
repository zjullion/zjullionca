import { Duration } from 'aws-cdk-lib'
import { Code, Function, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda'
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs'
import { Construct } from 'constructs'

type LambdaEnvironment = { [key: string]: string }

export type Node20LambdaConfig<T extends LambdaEnvironment> = {
  codeDirectory: string
  environment: T
  layers?: LayerVersion[]
  name: string
  stage: string
  timeout?: Duration
}

/**
 * A lambda function, configured with the code and permissions provided.
 */
export class Node20Lambda<T extends LambdaEnvironment> extends Construct {
  constructor(scope: Construct, id: string, props: Node20LambdaConfig<T>) {
    super(scope, id)
    const { codeDirectory, environment, layers, name, stage, timeout } = props
    const functionName = `${name}-${stage}`

    const logGroup = new LogGroup(this, `${id}-logs`, {
      logGroupName: `/aws/lambda/${functionName}`,
      retention: RetentionDays.ONE_MONTH,
    })

    new Function(this, `${id}-${stage}`, {
      code: Code.fromAsset(`${codeDirectory}/dist`),
      environment,
      functionName,
      handler: 'index.handler',
      layers,
      logGroup,
      runtime: Runtime.NODEJS_20_X,
      // TODO role: ,
      timeout: timeout ?? Duration.seconds(5),
    })
  }
}
