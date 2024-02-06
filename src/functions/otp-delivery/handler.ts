import { CustomEmailSenderTriggerEvent } from 'aws-lambda';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { decryptCode } from 'src/utils/crypto-decrypt';
import { getTranslatedBody, getTranslatedSubject } from 'src/utils/translate';

const toRegion = process.env.toRegion;

export const handler = async (event: CustomEmailSenderTriggerEvent) => {
  const sesClient = new SESClient({ region: toRegion });

  // Extract the verification code and email address from the event
  const emailAddress = event.request.userAttributes['email'];
  const locale = event.request.userAttributes['locale'];

  const encryptedCode = event.request.code;

  const code = await decryptCode(encryptedCode);

  console.log({ code });

  // Define the email parameters
  const params = {
    Destination: {
      ToAddresses: [emailAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: getTranslatedBody(locale, code.toString()),
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: getTranslatedSubject(locale),
      },
    },
    Source: 'no-reply@walkingdocs.com', // Your verified email address
  };

  // Create a SendEmailCommand instance
  const sendEmailCommand = new SendEmailCommand(params);

  try {
    // Send the email
    const data = await sesClient.send(sendEmailCommand);

    console.log('Email sent successfully', data);
  } catch (err) {
    console.error('Failed to send email', err);
  }

  return event;
};
