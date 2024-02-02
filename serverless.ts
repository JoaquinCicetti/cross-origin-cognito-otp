import type { AWS } from '@serverless/typescript';
import { getEnvsAtCompileTime } from './src/utils/envs';

const { env, accountId, fromRegion, toRegion, kmsKeyArn, kmsKeyAlias, userPoolName } = getEnvsAtCompileTime();

const serverlessConfiguration: AWS = {
  service: 'cross-region-cognito',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    region: fromRegion,
    runtime: 'nodejs18.x',
    stage: `\${opt:stage, "${env}"}`,
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['ses:SendEmail', 'ses:SendRawEmail'],
            Resource: `arn:aws:ses:${toRegion}:${accountId}:*`,
          },
          {
            // Permissions to write logs to CloudWatch
            Effect: 'Allow',
            Action: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
            Resource: `arn:aws:logs:${toRegion}:${accountId}:*`,
          },
          {
            Effect: 'Allow',
            Action: ['kms:Decrypt'],
            Resource: kmsKeyArn,
          },
        ],
      },
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  functions: {
    otpDelivery: {
      description: 'Intercept cognito events and re-send email OTP in corresponding region',
      handler: 'src/functions/otp-delivery/handler.handler',
      events: [
        {
          cognitoUserPool: {
            pool: userPoolName,
            trigger: 'CustomEmailSender',
            existing: true,
            kmsKeyId: kmsKeyArn,
          },
        },
      ],
      environment: {
        toRegion,
        fromRegion,
        kmsKeyAlias,
        kmsKeyArn,
      },
      timeout: 10,
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
