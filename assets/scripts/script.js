// Assignment code here
var randomPassword = {
    
  // Initial values for the object
  password: "",
  useLowerCase: null,
  useUpperCase: null,
  useNumber: null,
  useSpecialChar: null,
  passchars: 0,

  // Resets the object to it's initial state
  reset: function () {
      this.password = "";
      this.useLowerCase = null;
      this.useUpperCase = null;
      this.useNumber = null;
      this.useSpecialChar = null;
      this.passchars = 0;
  },

  // Randomizes the password's characters to stop from having the same pattern due to the conditional building of the password
  shuffle: function() {
      
      var tempPassword = [];
      var shuffledPassword = "";

      // Puts each character of the password string into an array
      for (var stringPos = 0; stringPos < this.password.length; stringPos++) {
          tempPassword[stringPos] = this.password.charAt(stringPos);
      }

      // Randomly swaps the elements inside the array with each other
      for (var arrayPos = 0; arrayPos < tempPassword.length; arrayPos ++) {
          swapIndex = randomNumber(0, tempPassword.length - 1);
          [tempPassword[arrayPos], tempPassword[swapIndex]] = [tempPassword[swapIndex], tempPassword[arrayPos]];
      }

      // Recreates the string from the array
      for (var arrayPos = 0; arrayPos < tempPassword.length; arrayPos++) {
          shuffledPassword = shuffledPassword + tempPassword[arrayPos];    
      }
     
      this.password = shuffledPassword
  },

  // Creates a password based on how the object's variable are set
  generate: function() {
      
      var newPassword = "";

      // Itererates through each timer for the required number of password characters

      for(var i = 0; i < this.passchars; i++) {
         
          // Compares the current password with the character requirements and adds the character types if they are missing
          // from the current password.

          if (!hasUpperCase(newPassword) && this.useUpperCase == true)  {
              newPassword = newPassword + String.fromCharCode(getRandomUpperCase());
          }
          else if (!hasLowerCase(newPassword) && this.useLowerCase == true) {
              newPassword = newPassword + String.fromCharCode(getRandomLowerCase());
          }
          else if (!hasNumber(newPassword) && this.useNumber == true) {
              newPassword = newPassword + String.fromCharCode(getRandomNumberString());
          }
          else if (!hasSpecialChar(newPassword) && this.useSpecialChar == true) {
              newPassword = newPassword + String.fromCharCode(getRandomSpecialChar());
          }
          else {
              
              // If all the required characters have been added to the password, it will then randomly pick a character that is allowed to be
              // included the passwrod
              
              var newChar = "";

              while(!newChar) {
              
                  // While will continue to loop until an allowed character is selected from the pool - if a character type (e.g. lowerCase) is chosen
                  // and the user hasn't selected that type as an option, another random character will be selected.
                  
                  switch (Math.floor(Math.random() * 4) + 1) {
                      case 1:
                          if (this.useUpperCase == true) {
                              newChar = String.fromCharCode(getRandomUpperCase());
                          }
                          break;
                      case 2:
                          if (this.useLowerCase == true) {
                              newChar = String.fromCharCode(getRandomLowerCase());
                          }
                          break;
                      case 3:
                          if (this.useNumber == true) {
                              newChar = String.fromCharCode(getRandomNumberString());
                          }
                          break;
                      default:
                          if (this.useSpecialChar == true) {
                              newChar = String.fromCharCode(getRandomSpecialChar());
                          }
                          break;
                  }
              }

              newPassword = newPassword + newChar;
          }
      }

      this.password = newPassword;
      
      // Shuffles the password to add randomness (e.g. the first letter isn't always an uppercase)

      this.shuffle();
  }    
}

// Random Functions for the object to use to generate character types using ascii codes for the types

function getRandomUpperCase() {
    return Math.floor(Math.random() * 26) + 65;
  }
  
  function getRandomLowerCase() {
    return Math.floor(Math.random() * 26) + 97;
  }
  
  function getRandomNumberString() {
    return Math.floor(Math.random() * 10) + 48;
  }
  
  function getRandomSpecialChar() {
    var isSpecialChar = false;
    var code = null;
  
    while(!isSpecialChar) {
        code = Math.floor(Math.random() * 94) + 33
        isSpecialChar = hasSpecialChar(String.fromCharCode(code));
    }
    return code;
  }
  
  function randomNumber(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from; 
  }
  


// Functions to verifiy if specific chars are present in the new password

function hasUpperCase(password) {
  for(i = 0; i < password.length; i++) {
      if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
          return true;
      }
  }
  return false;
}

function hasLowerCase(password) {
  for(i = 0; i < password.length; i++) {
      if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
          return true;
      }
  }
  return false;
}

function hasNumber(password) {
  for(i = 0; i < password.length; i++) {
      if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
          return true;
      }
  }
  return false;
}

function hasSpecialChar(password) {
  for(i = 0; i < password.length; i++) {
      if (password.charCodeAt(i) >= 33 && password.charCodeAt(i) <= 47) {
          return true;
      }
      else if (password.charCodeAt(i) >= 58 && password.charCodeAt(i) <= 64) {
          return true;
      }
      else if (password.charCodeAt(i) >= 91 && password.charCodeAt(i) <= 96) {
          return true;
      }
      else if (password.charCodeAt(i) >= 123 && password.charCodeAt(i) <= 126) {
          return true;
      }
  }    
  return false;
}

function abandonPassword() {
    if (window.confirm("Are you sure you want to abandon this password?")) {
        throw Error;
    }
}


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");


// Write password to the #password input
function writePassword() {
    var password = randomPassword;
    var minimumRequirementsMet = false;
    password.reset();
    
    // A sequence of prompts to get the users options for their secure password, which only a valid option
    // will allow the app to exit from the loops.
    //
    // Also, if the user selects cancel in any of the prompts, the abandon password function will 
    // be executed; which will give the user the option to quit or return to the password.
  
    // Get number of characters
    while(!(password.passchars > 7 && password.passchars < 129)) {
      var option = window.prompt("How many characters would you like your password to be? (8 - 128)");
      if (option == null) {
          abandonPassword();
      }
      else {
          password.passchars = parseInt(option);
      }
    }

    // Get if they want to include lowercase characters
    while(password.useLowerCase == null) {
        var option = window.prompt("Would you like to include lower case letters? (y/n)");
        
        if (option == null) {
            abandonPassword();
        }
        else {
            switch (option.toLowerCase()) {
                case "y":
                    password.useLowerCase = true;
                    minimumRequirementsMet = true;
                    break;
                case "n":
                    password.useLowerCase = false;
                    break;
                default:
                    password.useLowerCase = null;
            }  
        }   
    }

    // Get if they want to include uppercase characters
    while(password.useUpperCase == null) {
        var option = window.prompt("Would you like to include uppper case letters? (y/n)");

        if (option == null) {
            abandonPassword();
        }
        else {
            switch (option.toLowerCase()) {
                case 'y':
                    password.useUpperCase = true;
                    minimumRequirementsMet = true;
                    break;
                case 'n':
                    password.useUpperCase = false;
                    break;
                default:
                    password.useUpperCase = null;
            }       
        }
    }
    

    // Gets if they want to include numbers
    while(password.useNumber == null) {
        var option = window.prompt("Would you like to include numbers? (y/n)");

        if (option == null) {
            abandonPassword();
        }
        else {
            switch (option.toLowerCase()) {
                case 'y':
                    password.useNumber = true;
                    minimumRequirementsMet = true;
                    break;
                case 'n':
                    password.useNumber = false;
                    break;
                default:
                    password.useNumber = null;
            }       
        }
    }

    // Gets if they want to include special characters
    while(password.useSpecialChar == null) {
        var option = window.prompt("Would you like to include special characters? (y/n)");

        if (option == null) {
            abandonPassword();
        }
        else {
            switch (option.toLowerCase()) {
                case 'y':
                    password.useSpecialChar = true;
                    minimumRequirementsMet = true;
                    break;
                case 'n':
                    password.useSpecialChar = false;
                    break;
                default:
                    password.useSpecialChar = null;
            }       
        }
    }

    var passwordText = document.querySelector("#password");
    

    // Verifies that at least one character type has been included in the password
    if (minimumRequirementsMet) {
        password.generate();
        passwordText.value = password.password;
    }
    else {
        var confirm = window.confirm("Error: You have not included any character types for your password!\nYou must select at least one type.");
    }
}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
