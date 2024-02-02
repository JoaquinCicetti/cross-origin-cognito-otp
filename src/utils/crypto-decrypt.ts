import * as b64 from 'base64-js';
import * as encryptionSdk from '@aws-crypto/client-node';

export const decryptCode = async (code: string) => {
  const { decrypt } = encryptionSdk.buildClient(encryptionSdk.CommitmentPolicy.REQUIRE_ENCRYPT_ALLOW_DECRYPT);
  const generatorKeyId = process.env.kmsKeyAlias;
  const keyIds = [process.env.kmsKeyArn];
  const keyring = new encryptionSdk.KmsKeyringNode({ generatorKeyId, keyIds });

  const { plaintext, messageHeader } = await decrypt(keyring, b64.toByteArray(code));
  console.log(plaintext, messageHeader);

  return plaintext;
};
