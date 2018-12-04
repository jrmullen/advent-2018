const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n');

let count = 0;
let claims = [];

input.forEach((element) => {
    let split = element.split('@');

    let claim = {};

    claim.id = split[0].trim().replace('#', ''); // Left of @, trimmed

    let offset = split[1].split(':')[0].trim(); // Between @ and :, trimmed
    let size = split[1].split(':')[1].trim(); // Right of :, trimmed

    claim.left = parseInt(offset.split(',')[0]); // Left of ,
    claim.top = parseInt(offset.split(',')[1]); // Right of ,

    claim.width = parseInt(size.split('x')[0]); // Left of ,
    claim.height = parseInt(size.split('x')[1]); // Right of ,

    claims.push(claim);
});

// Create empty matrix 1000x1000
let matrix = [];
for (let i = 0; i < 1000; i++) {
    matrix[i] = [];
    for (let j = 0; j < 1000; j++) {
        matrix[i][j] = 0;
    }
}

// Populate matrix with input data
for (let claim of claims) {
    for (let w = claim.left; w < claim.left + claim.width; w++) {
        for (let h = claim.top; h < claim.top + claim.height; h++) {
            matrix[w][h]++;
        }
    }
}

// Part 1
for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] >= 2) {
            count++;
        }
    }
}

// Part 2
for (let claim of claims) {
    let isOverlapping = false;

    for (let w = claim.left; w < claim.left + claim.width; w++) {
        for (let h = claim.top; h < claim.top + claim.height; h++) {
            if (matrix[w][h] > 1 || matrix[w][h] === 0) {
                isOverlapping = true;
            }
        }
    }

    if (!isOverlapping) {
        console.log('Part 2: ' + claim.id);
        break;
    }
}

console.log('Part 1: ' + count);
