import CryptoJS from "crypto-js"

export function isJson(str) {
  let strVal = str
  strVal = typeof strVal !== 'string' ? JSON.stringify(strVal) : strVal

  try {
    strVal = JSON.parse(strVal)
  } catch (e) {
    return false
  }

  if (typeof strVal === 'object' && strVal !== null) {
    return true
  }

  return false
}

export function isEmpty(str) {
  if (str == '' || str == undefined || str == null) {
    return true
  }

  return false
}

export function funcMonthDateOnlyNow() {
  const d = new Date();

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Biar di depannya ada karakter 0, untuk format datetime
  const date = days[d.getDay()];

  const month = monthNames[d.getMonth()];
  // Biar di depannya ada karakter 0, untuk format datetime

  const dateNow = month + date;
  return dateNow;
}

export function encryptApiKey(str) {
  if (!isEmpty(str)) {
    const encrypted = CryptoJS.AES.encrypt(str,
      `${process.env.ENCRYPT_APIKEY}${funcMonthDateOnlyNow()}`
    );

    return encrypted.toString();
  }

  return "";
}

export function decryptApiKey(str) {
  if (!isEmpty(str)) {

    const decrypted = CryptoJS.AES.decrypt(str,
      `${process.env.ENCRYPT_APIKEY}${funcMonthDateOnlyNow()}`
    );

    try {
      const stringDecrypt = decrypted.toString(CryptoJS.enc.Utf8)

      return stringDecrypt;
    } catch (err) {
      return "";
    }
  }

  return "";
}

export function encryptDefault(text) {
  let string = ''
  if (!isEmpty(text)) {
    string = text
    const ciphertext = CryptoJS.AES.encrypt(string.toString(), process.env.ENCRYPT_DEFAULT).toString()
    const encoded = CryptoJS.enc.Base64.parse(ciphertext).toString(CryptoJS.enc.Hex)
    return encoded
  }
  return ''
}

export function decryptDefault(text) {
  let string = ''
  if (!isEmpty(text)) {
    string = text

    const decoded = CryptoJS.enc.Hex.parse(string).toString(CryptoJS.enc.Base64)
    const decrypted = CryptoJS.AES.decrypt(decoded, process.env.ENCRYPT_DEFAULT).toString(CryptoJS.enc.Utf8)
    return decrypted

  }
  return ''
}