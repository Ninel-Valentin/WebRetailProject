function Encode(key) {
    let encoded = key
        .split('')
        .map((x, index) => {
            let char = 100 + +x.charCodeAt(0);
            char = index % 2 ? char.toString().split('').reverse().join('') : char;
            return char;
        })
        .join('');
    return encoded;
}

function Decode(key) {
    let decoded = "";
    for (let i = 0; i < key.toString().length; i += 3) {
        let number = `${key[i]}${key[i + 1]}${key[i + 2]}`;
        number = i % 2 ? number.toString().split('').reverse().join('') : number;
        decoded += String.fromCharCode(+number - 100);
    }
    return decoded;
}

export default { Decode, Encode };