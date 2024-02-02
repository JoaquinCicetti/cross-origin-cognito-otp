export const getTranslatedSubject = (locale: string) => {
  switch (locale) {
    case 'id-id':
      return 'Kode Verifikasi Anda';
    case 'es-mx':
      return 'Su código de verificación';
    case 'fr-fr':
      return 'Votre code de vérification';
    case 'so-so':
      return 'Koodhkaaga xaqiijinta';
    case 'en-us':
    default:
      return 'Your verification code';
  }
};

export const getTranslatedBody = (locale: string, code: string) => {
  switch (locale) {
    case 'id-id':
      return `Kode Verifikasi Anda adalah: ${code}`;
    case 'es-mx':
      return `Su código de verificación es: ${code}`;
    case 'fr-fr':
      return `Votre code de vérification est: ${code}`;
    case 'so-so':
      return `Koodhkaaga xaqiijinta waa: ${code}`;

    case 'en-us':
    default:
      return `Your verification code is: ${code}`;
  }
};
