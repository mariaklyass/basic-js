const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  checkArguments(message, key) {
    if (!message || !key) {
      throw new Error("Incorrect arguments!");
    }
  }

  processText(text, key, encrypt) {
    const A_CODE = "A".charCodeAt(0);
    const Z_CODE = "Z".charCodeAt(0);
    const ALPHABET_LENGTH = 26;

    let result = "";
    for (let i = 0, j = 0; i < text.length; i++) {
      const char = text[i].toUpperCase();
      if (char >= "A" && char <= "Z") {
        const keyChar = key[j % key.length].toUpperCase();
        const shift = encrypt
          ? keyChar.charCodeAt(0) - A_CODE
          : A_CODE - keyChar.charCodeAt(0);
        const encryptedCharCode =
          A_CODE +
          ((char.charCodeAt(0) - A_CODE + shift + ALPHABET_LENGTH) %
            ALPHABET_LENGTH);
        result += String.fromCharCode(encryptedCharCode);
        j++;
      } else {
        result += char;
      }
    }

    return result;
  }

  encrypt(message, key) {
    this.checkArguments(message, key);
    const result = this.processText(message, key, this.isDirect);
    return this.isDirect ? result : result.split("").reverse().join("");
  }

  decrypt(encryptedMessage, key) {
    this.checkArguments(encryptedMessage, key);
    const result = this.processText(encryptedMessage, key, !this.isDirect);
    return this.isDirect ? result : result.split("").reverse().join("");
  }
}
module.exports = {
  VigenereCipheringMachine,
};
