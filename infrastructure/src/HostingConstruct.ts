import { RemovalPolicy } from 'aws-cdk-lib'
import { ICertificate } from 'aws-cdk-lib/aws-certificatemanager'
import {
  AllowedMethods,
  CachedMethods,
  CachePolicy,
  Distribution,
  HttpVersion,
  PriceClass,
  SecurityPolicyProtocol,
  SSLMethod,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront'
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins'
import { ARecord, IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53'
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets'
import { BlockPublicAccess, Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3'
import { BucketDeployment, ISource } from 'aws-cdk-lib/aws-s3-deployment'
import { Construct } from 'constructs'

export type HostingConstructConfig = {
  certificate: ICertificate
  source: ISource
  stage: string
  url: string
  zone: IHostedZone
}

/**
 * A hosting template, which consists of an S3 Bucket, a Cloudfront Distribution, Route 53 A
 * Records, and a deployment to the bucket.
 */
export class HostingConstruct extends Construct {
  constructor(scope: Construct, id: string, props: HostingConstructConfig) {
    super(scope, id)
    const { certificate, source, stage, url, zone } = props

    const hostingBucket = new Bucket(this, `${id}-hosting-${stage}`, {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      bucketName: `${id}-hosting-${stage}`,
      encryption: BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      publicReadAccess: false,
      removalPolicy: RemovalPolicy.DESTROY,
      versioned: false,
    })

    const distribution = new Distribution(this, `${id}-distribution-${stage}`, {
      certificate,
      comment: url,
      defaultBehavior: {
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachePolicy: CachePolicy.CACHING_OPTIMIZED,
        cachedMethods: CachedMethods.CACHE_GET_HEAD,
        compress: true,
        origin: new S3Origin(hostingBucket),
        smoothStreaming: false,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      domainNames: [url, `www.${url}`],
      enableIpv6: true,
      enableLogging: false,
      errorResponses: [
        { httpStatus: 403, responseHttpStatus: 200, responsePagePath: '/index.html' },
        { httpStatus: 404, responseHttpStatus: 200, responsePagePath: '/index.html' },
      ],
      httpVersion: HttpVersion.HTTP2_AND_3,
      minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2018,
      priceClass: PriceClass.PRICE_CLASS_ALL,
      sslSupportMethod: SSLMethod.SNI,
    })

    const target = RecordTarget.fromAlias(new CloudFrontTarget(distribution))
    new ARecord(this, `${id}-dns`, { recordName: '', target, zone })
    new ARecord(this, `${id}-dns-www`, { recordName: 'www', target, zone })

    new BucketDeployment(this, `${id}-content`, {
      destinationBucket: hostingBucket,
      distribution,
      distributionPaths: ['/*'],
      sources: [source],
    })
  }
}
