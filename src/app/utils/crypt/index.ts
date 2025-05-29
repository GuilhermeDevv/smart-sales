import CryptoJS from "crypto-js";

// Função para criptografar
function encrypt(pws = "", key = "nsx@2024") {
  const message = CryptoJS.AES.encrypt(pws, key).toString();
  return encodeURIComponent(message);
}

// Função para descriptografar
function decrypt(message = "", key = "nsx@2024") {
  const decodedMessage = decodeURIComponent(message);
  const code = CryptoJS.AES.decrypt(decodedMessage, key);
  const decryptedMessage = code.toString(CryptoJS.enc.Utf8);
  return decryptedMessage;
}

export { encrypt, decrypt };
