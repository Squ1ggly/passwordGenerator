const chars = require("./dictionary.json"); // Word dictionary to make passwords from
const { writeFileSync } = require("fs");

/**
 *
 * @param {string[]} Dictionary
 * @param {number} NumberOfPasswords
 * @param {number} passwordLength
 * @param {string} separator
 * @param {boolean} TitleCase
 * @returns {string[]} Returns the passwords string array
 */
function generatePasswords(Dictionary, NumberOfPasswords, passwordLength, separator = "-", TitleCase = false) {
  if (NumberOfPasswords > 100000) return new Error("Cannot have number over 100k");
  if (passwordLength > 100) return new Error("Cannot have have password over 100 words");
  if (passwordLength < 2) return new Error("Password length must be at least 2");
  let returnValue = [];
  for (let i = 0; i < NumberOfPasswords; i++) {
    let password = "";
    for (let j = 1; j <= passwordLength; j++) {
      let word = Dictionary[Math.floor(Math.random() * Dictionary.length)] + (j === passwordLength ? "" : separator);
      if (TitleCase) word = word.charAt(0).toUpperCase() + word.slice(1);
      password += word;
    }
    returnValue.push(password);
  }
  return returnValue;
}

writeFileSync(__dirname + "/Passwords.json", JSON.stringify(generatePasswords(chars, 5, 3, ".", true), null, 2));
