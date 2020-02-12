export const validate = (text, length) => {
    if (text == '' || text == null) {
        return [false, 'Enter something, silly']
    }

    if (text.length < length || text.length > length) {
        const offset = length - text.length
        const suffix = offset > 0 ? 'short' : 'more than needed'
        return [false, `The code is ${length} letters long, you're ${Math.abs(offset)} ${suffix} :p`]
    }

    return [true, null]
}