export function decodeOnlineResult(result, _letters) {
    const resultArray = result.split('')
    const letters = [..._letters]
    for (let i = 0; i < letters.length; i++) {
        const state = resultArray[i]
        letters[i] = state == 'x' ? 'correct' : state === 'o' ? 'partial' : ''
    }

    return letters
}

export function decodeOfflineResult(testWord, codeWord) {
    const codeWordArray = codeWord.split('')
    const testWordArray = testWord.split('')
    let result = []
    
    // Check for correct index and char
    let filteredCodeArray = []
    codeWordArray.forEach((codeChar, i) => {
        const testChar = testWordArray[i]
        if (codeChar === testChar) {
            result.push('correct')
            testWordArray[i] = null
        } else {
            filteredCodeArray.push(codeChar)
        }
    })
    const remainingTestWordArray = testWordArray.filter(testChar => testChar !== null)

    // Check if char exists in remaing code
    remainingTestWordArray.forEach(testChar => {
        const index = filteredCodeArray.indexOf(testChar)

        if (index >= 0) {
            result.push('partial')
            filteredCodeArray[index] = null
        }
    })

    // Pad
    const pad = codeWord.length - result.length
    for (let i = 0; i < pad; i++) {
        result.push('')
    }

    return result
}