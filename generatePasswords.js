const chars = require("./dictionary.json"); // Word dictionary to make passwords from
const { question } = require("readline-sync");

/**
 *
 * @param {string[]} Dictionary
 */
function generatePassphrases(Dictionary) {
  let numberOfPasswords = 3;
  let passwordLength = 3;
  let separator = "-";
  let TitleCase = false;

  let defaults = question("Would you like to use all default values? (yes or no), Enter for yes: ");
  while (defaults !== "yes" && defaults !== "no") {
    console.log("Enter either yes or no");
    defaults = question("Would you like to use all default values? (yes or no), Enter for yes: ");
  }

  if (defaults.toLowerCase() === "no") {
    const numberOfPasswordsQuestion = "Number of passwords you want to generate, Enter for default (3): ";
    numberOfPasswords = question(numberOfPasswordsQuestion) || 3;
    while (typeof parseInt(numberOfPasswords) != "number" || isNaN(parseInt(numberOfPasswords)) || parseInt(numberOfPasswords) > 100000) {
      console.log("Invalid Values");
      numberOfPasswords = question(numberOfPasswordsQuestion) || 1;
    }

    const passwordLengthQuestion = "Number of words you want in your passphrase, Enter for default (3): ";
    passwordLength = question(passwordLengthQuestion) || 3;
    while (typeof parseInt(passwordLength) != "number" || isNaN(parseInt(passwordLength)) || parseInt(passwordLength) > 100) {
      console.log("Invalid Values");
      passwordLength = question(passwordLengthQuestion) || 3;
    }

    const separatorOptions = {
      keepWhitespace: true,
    };
    separator = question("The separator, Enter for default (-): ", separatorOptions) || "-";
    console.log("'" + separator + "'");
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
