import * as dotenv from 'dotenv';
import { assertValidRegion } from './validations';

/**
 * This file retrieves and validates environment variables at compile time.
 * Then, they are injected to corresponding function in serverless.ts.
 *
 * Therefore, this should not be used to access environment variables in other places apart from serverless.ts.
 */

dotenv.config();

//env
const env = process.env.ENVIRONMENT;

// account
const fromRegion = process.env.FROM_REGION;
const toRegion = process.env.TO_REGION;
const accountId = process.env.ACCOUNT_ID;

// cognito
const userPoolId = process.env.USER_POOL_ID;
const userPoolName = process.env.USER_POOL_NAME;

// kms
const kmsKeyArn = process.env.KMS_KEY_ARN;
const kmsKeyAlias = process.env.KMS_KEY_ALIAS;

export const getEnvsAtCompileTime = () => {
  if (!['dev', 'staging', 'prod'].includes(env)) {
    throw new Error('Missing/invalid ENVIRONMENT');
  }

  assertValidRegion(fromRegion);
  assertValidRegion(toRegion);

  if (!String(accountId)) {
    throw new Error('Missing env ACCOUNT_ID');
  }

  if (!String(userPoolId)) {
    throw new Error('Missing env USER_POOL_ID');
  }

  if (!String(userPoolName)) {
    throw new Error('Missing env USER_POOL_NAME');
  }

  if (!String(kmsKeyArn)) {
    throw new Error('Missing env KMS_KEY_ARN');
  }

  if (!String(kmsKeyAlias)) {
    throw new Error('Missing env KMS_KEY_ALIAS');
  }

  return {
    env,
    fromRegion,
    toRegion,
    accountId,
    userPoolId,
    userPoolName,
    kmsKeyArn,
    kmsKeyAlias,
  };
};
