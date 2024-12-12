// This files contain helper functions for all the Component functions.

// Declaration variables
let generatedId = 0;
let generatedKeyNumber = 0;

// generate new id automatically
export function generateId() {
    generatedId++;
    return generatedId;
};

export function generateKeyNumber() {
    generatedKeyNumber++;
    return generatedKeyNumber;
};