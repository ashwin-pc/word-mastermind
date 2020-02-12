import { encrypt } from 'modules/crypt.js'
import { getApiEndpoint } from 'modules/utils.js'
import { validate } from 'validate.js'

export async function generateURL (codeWord, online) {
    const [valid, error] = validate(codeWord)

    if (!valid) {
        return [null, error]
    }

    let game
    if (online) {
        const response = await fetch(`${getApiEndpoint()}api.php?codeWord=${codeWord}&action=encode`)
        game = await response.text()
    } else {
        game = encrypt(codeWord.toLowerCase())
    }

    const { origin, pathname } = location
    const url = `${origin}${pathname}?game=${game}&l=${codeWord.length}&online=${online}`

    return [url, null]
}