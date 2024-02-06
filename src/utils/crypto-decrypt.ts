import * as b64 from 'base64-js';
import * as encryptionSdk from '@aws-crypto/client-node';

/**
 * This decrypt the payload that cognito encrypt with the key which arn is in .envs
 *
 * I tried to simply decrypt with aws-kms but I couldn't
 * Then went to aws docs and they do it in this way, so...
 */
export const decryptCode = async (code: string) => {
  const { decrypt } = encryptionSdk.buildClient(encryptionSdk.CommitmentPolicy.REQUIRE_ENCRYPT_ALLOW_DECRYPT);

  const generatorKeyId = process.env.kmsKeyAlias;
  const keyIds = [process.env.kmsKeyArn];
  const keyring = new encryptionSdk.KmsKeyringNode({ generatorKeyId, keyIds });

  const { plaintext } = await decrypt(keyring, b64.toByteArray(code));

  return plaintext;
};
