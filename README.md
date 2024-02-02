# Cross-Region Cognito OTP Delivery Project

Este proyecto implementa una función Lambda de AWS que se dispara en lugar del método por defecto para los envíos de OTP (One Time Password) de Amazon Cognito. El objetivo principal es permitir el uso de un sender personalizado para los correos electrónicos de OTP, resolviendo así el problema de entrega de correos a ciertos dominios empresariales en Indonesia.

## Problema

El pool de usuarios de Cognito está ubicado en la región `ap-southeast-1`. Al mover los entornos a `ap-southeast-3`, se detectó que algunos correos empresariales en Indonesia no estaban recibiendo los OTPs. Esto se debía a restricciones en la zona de envío del Simple Email Service (SES) de AWS.

## Solución

La función Lambda desarrollada intercepta los eventos de Cognito y reenvía los correos electrónicos de OTP utilizando SES, permitiendo seleccionar la región de envío y personalizar completamente el cuerpo del mensaje. Esto asegura la entrega efectiva de los OTPs a todos los usuarios, independientemente de las restricciones regionales de sus correos electrónicos empresariales.

### Características Clave

- **Selección de la Región de SES**: Permite elegir la región desde la cual se enviarán los correos electrónicos, superando las limitaciones de entrega en ciertas áreas.
- **Personalización del Mensaje**: Ofrece la capacidad de personalizar completamente el cuerpo del correo electrónico de OTP, mejorando la experiencia del usuario final.
- **Integración con KMS**: Se creó una clave en AWS Key Management Service (KMS) para encriptar los datos desde Cognito, y se configuraron los permisos necesarios para que Cognito pueda utilizar esta clave.

### Documentación de Referencia

Para más detalles sobre cómo desencriptar el código OTP y manejar los eventos de Cognito, consulte la documentación oficial de AWS: [Custom Email Sender Lambda Trigger](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-custom-email-sender.html).
