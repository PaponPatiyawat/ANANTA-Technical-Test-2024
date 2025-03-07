function validateRhymeSequence(sequence) {
    const blocks = sequence.split(" ");
    
    if(blocks.length < 2) {
        return {
            isValid: false,
            message: "The sequence must have one more rhyming pattern."
        };
    }

    for (let block of blocks) {
        if (![2, 4, 6].includes(block.length)) {
            return {
                isValid: false,
                message: "Each pattern must contain 2, 4, or 6 lines (letters)."
            };
        }

        let seen = new Set();
        for (let i = 0; i < block.length; i++) {
            let char = block[i];
            
            if (!char.match(/[A-Z]/i) || char != char.toUpperCase()) {
                return {
                    isValid: false,
                    message: `The sequence must contain only capital letters.`
                };
            }

            if (seen.has(char)) {
                continue;
            } else {
                let count = [...block].filter(c => c === char).length;
                if (count !== 2) {
                    return {
                        isValid: false,
                        message: `Letter '${char}' does not rhyme properly in the block.`
                    };
                }
                seen.add(char);
            }
        }
    }

    return {
        isValid: true,
        message: "This sequence is valid."
    };
}

// print "Letter 'A' does not rhyme properly in the block."
let sequence = "ABCD ABCD";
let result = validateRhymeSequence(sequence);
console.log(result.isValid);
console.log(result.message);

// print "This sequence is valid."
sequence = "ABBA CDCD";
result = validateRhymeSequence(sequence);
console.log(result.isValid);
console.log(result.message);

// print "The sequence must contain only capital letters."
sequence = "1221 3443";
result = validateRhymeSequence(sequence);
console.log(result.isValid);
console.log(result.message);

// print "The sequence must have one more rhyming pattern."
sequence = "ABBA";
result = validateRhymeSequence(sequence);
console.log(result.isValid);
console.log(result.message);
