const MAX_LENGTH = 20

export const validate = (text, length) => {
    if (text == '' || text == null) {
        return [false, 'Enter something, silly']
    }

    if (text.length > MAX_LENGTH) {
        return [false, `The max code length is ${MAX_LENGTH} :p`]
    }

    return [true, null]
}