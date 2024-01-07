class EncryptionService {
    static digits = '31415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';

    static Encrypt(password) {
        let encodedPassword = '';
        let toggle = false;

        for (let i = 0; i < password.length; i++) {
            let char = password[i];
            let encodedChar = char.charCodeAt() + (toggle ? -1 : 1) * this.digits[i];
            encodedChar = `0${encodedChar}`.substring(`0${encodedChar}`.length - 3);

            encodedPassword += encodedChar.toString();
            toggle = !toggle;
        }
        return encodedPassword;
    }

    static Decrypt(password) {
        let decodedPassword = '';
        let toggle = false;

        for (let i = 0; i < password.length; i += 3) {
            let group = password.substring(i, i + 3);
            group -= (toggle ? -1 : 1) * this.digits[i / 3];
            decodedPassword += String.fromCharCode(group);

            toggle = !toggle;
        }
        return decodedPassword;
    }
}

module.exports = { EncryptionService };

