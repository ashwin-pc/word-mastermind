const key = '5EF694A7883986743C044B734798CCF5' // MD5: This is not secure!

export const encrypt = text => {
    const cipherText = xor_encrypt(key, text)
    return btoa(cipherText)
}

export const decrypt = encodedCipherText => {
    const cipherText = atob(encodedCipherText).split(',')
    return xor_decrypt(key, cipherText)
}

// Credits: https://gist.github.com/sukima/5613286
const keyCharAt = (key, i) => key.charCodeAt(Math.floor(i % key.length));

function xor_encrypt(key, data) {
    let rta = []
    for (let i = 0; i < data.length; i++) {
        let c = data[i]
        rta.push(c.charCodeAt(0) ^ keyCharAt(key, i))
    }

    return rta;
}

function xor_decrypt(key, data) {
    let rta = []
    for (let i = 0; i < data.length; i++) {
        let c = data[i]
        rta.push(String.fromCharCode(c ^ keyCharAt(key, i)))
    }             

   return  rta.join("")            
}