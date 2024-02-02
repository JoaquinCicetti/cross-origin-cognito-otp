# Cross-Region Cognito OTP Delivery Project

This project implements an AWS Lambda function that is triggered instead of the default method for OTP (One Time Password) deliveries from Amazon Cognito. The main goal is to enable the use of a custom sender for OTP emails, thus solving the problem of email delivery to certain business domains in Indonesia.

## Problem

The Cognito user pool is located in the `ap-southeast-1` region. When moving environments to `ap-southeast-3`, it was detected that some business emails in Indonesia were not receiving the OTPs. This was due to restrictions in the sending zone of AWS's Simple Email Service (SES).

## Solution

The developed Lambda function intercepts Cognito events and forwards OTP emails using SES, allowing the selection of the sending region and fully customizing the message body. This ensures the effective delivery of OTPs to all users, regardless of the regional restrictions of their business emails.

### Key Features

- **SES Region Selection**: Allows choosing the region from which the emails will be sent, overcoming delivery limitations in certain areas.
- **Message Customization**: Offers the ability to fully customize the OTP email body, enhancing the end-user experience.
- **Integration with KMS**: A key was created in AWS Key Management Service (KMS) to encrypt data from Cognito, and the necessary permissions were configured for Cognito to use this key.

### Reference Documentation

For more details on how to decrypt the OTP code and handle Cognito events, consult the official AWS documentation: [Custom Email Sender Lambda Trigger](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-custom-email-sender.html).
