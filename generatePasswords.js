const chars = require("./dictionary.json"); // Word dictionary to make passwords from
const {question} = require('readline-sync');


/**
 *
 * @param {string[]} Dictionary
 */
function generatePassphrases(Dictionary) {
  let NumberOfPasswords = 3;
  let passwordLength = 3;
  let separator = "-";
  let TitleCase = false;

  let defaults = question("Would you like to use all default values? (yes or no), Enter for yes: ");
  while (defaults !== "yes" && defaults !== "no") {
    console.log("Enter either yes or no");
    defaults = question("Would you like to use all default values? (yes or no), Enter for yes: ");
  }

  if (defaults.toLowerCase() === "no") {
    NumberOfPasswords = question("Number of passwords you want to generate, Enter for default (3): ") || 3;
    while (typeof parseInt(NumberOfPasswords) != "number" || isNaN(parseInt(NumberOfPasswords)) || parseInt(NumberOfPasswords) > 100000) {
      console.log("Invalid Values");
      NumberOfPasswords = question("Number of passwords you want to generate, Enter for default (3): ") || 1;
    }

    passwordLength = question("Number of words you want in your passphrase, Enter for default (3): ") || 3;
    while (typeof parseInt(passwordLength) != "number" || isNaN(parseInt(passwordLength)) || parseInt(passwordLength) > 100) {
      console.log("Invalid Values");
      passwordLength = question("Number of words you want in your passphrase, Enter for default (3): ") || 3;
    }

    separator = question("The separator, Enter for default (-): ") || "-";
    TitleCase = question("Title case? Enter for default (false): ") || false;
    if (typeof TitleCase !== "boolean") TitleCase = false;
  }

  let returnCsv = [];
  for (let i = 0; i < NumberOfPasswords; i++) {
    let password = "";
    for (let j = 1; j <= passwordLength; j++) {
      let word = Dictionary[Math.floor(Math.random() * Dictionary.length)] + (j >= passwordLength ? "" : separator);
      if (TitleCase) word = word.charAt(0).toUpperCase() + word.slice(1);
      password += word;
    }
    returnCsv.push(password);
  }
  return returnCsv;
}

console.log("\n\n" + generatePassphrases(chars).join(",\n") + "\n\n");
