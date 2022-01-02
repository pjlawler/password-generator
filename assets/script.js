var randomPassword = {
    
    // Default values for the object
    password: "",
    useLowerCase: false,
    useUpperCase: false,
    useNumber: false,
    useSpecialChar: false,
    passchars: 128,


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
        
        // Shuffles the password to add randomness so the first letter isn't always an uppercase

        this.shuffle();
    }    
}

runTest();

function runTest() {

    var password = randomPassword;
    
    password.useLowerCase = true;
    password.useSpecialChar = false;
    password.useUpperCase = true;
    password.useNumber = true;
    password.passchars = 10
    
    password.generate();

    while (window.confirm("Your password is:\n" + password.password +"\n\nGenerate another?")) {
        password.generate();
    }

}


// Random Functions for the object to use //
//
//

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

// Functions to verifiy if specific chars are present or not
//
//
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