const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const request = require('request');

let answers;
let theAnswer;
let theResults = [];

const writeFileAsync = util.promisify(fs.writeFile);
const readTemplate = util.promisify(fs.readFile);


function promptUser(input, title, theMessage) {
  return inquirer.prompt([
    {
      type: input,
      name: title,
      message: theMessage
    }
  ]);
}

async function processString(theString) {

 let theModifiedString = theString.toString();
    
    for (i = 0; i < theResults.length; i++) {
    // if the user has not stipulated an aswer, use the default answer
    if (theResults[i][1] == "") {
         useThisAnswer = theResults[i][3];
      } else {
           useThisAnswer = theResults[i][1];
          }
    
     // here we will itterate through the string and update all the fields that need to be updated.
     theModifiedString = theModifiedString.replace(theResults[i][2], useThisAnswer );

  }
   return (theModifiedString);

}


async function init() {
  try {

    // array field is used to [process questions and populate fields etc.]
    let questionArray = [["input", "title","What is the name of the project : ", "<title>", "GitHub Project",'null'],
                         ["input","repo","What is the repo address :","<repo>", "",'github'],
                         ["input","project","What is the live project address : (include https) : ","<project.address>", "",'screencap'],                          
                         ["input","license","What is the license you wish to use (enter for default):","<answers.license>", "https://opensource.org/licenses/mit-license.php",'null'], 
                         ["input","projectdesc","What is description of the project :","<project.desc>", "The author has not provided a description",'null'],    
                         ["input","projectpurpose","What is purpose of the project :","<project.purpose>", "The author has not provided a purpose",'null'],
                         ["input","prereqs","What are the project pre-reqs :","<prereqs>", "The author has not provided a pre-reqs",'null'],
                         ["input","install","What are the steps to install :","<install-details>", "The author has not provided a pre-reqs",'null'],
                        ]
  
    for (i = 0; i < questionArray.length; i++) {
      theAnswer = questionArray[i][1];
      
        // feed the question array to the prompt user function
         answers = await promptUser(questionArray[i][0],questionArray[i][1],questionArray[i][2]);
          // push the results to theresults.[the question title, the answer, the field to be updated and the default text]
         theResults.push([questionArray [i][1] ,   answers[ questionArray [i][1] ], questionArray [i][3]  , questionArray [i][4] ]);
            
         // if the user has not provided an appropriate URL, just use the github image capture.
            if (questionArray[i][5] == "screencap") {
              if ( answers[ questionArray [i][1]] == "" ) {useThisURL = "https://www.github.com"} else { useThisURL = answers[ questionArray [i][1]];}
            }      
          }
    
   console.log("Generating website image for" + useThisURL);
    

   
   
   await request({
        url: "https://api.apiflash.com/v1/urltoimage",
        encoding: "binary",
        qs: {
            access_key: "0d583704ac6847c0a833af29532409ec",
            url: useThisURL
        }
    }, (error, response, body) => {
        if (error) {
            console.log("Unable to secure screen capture");
        } else {
             fs.writeFile("./generated_content/siteimg.jpeg", body, "binary", error => {
               // console.log(error);
            });
        }
    });
  


    const getTemplate = await readTemplate("./templates/tmp.txt", "utf8");
    let res = await processString(getTemplate);
  
    // get screenshots of live site


    await writeFileAsync("./generated_content/README.md", res);
    console.log("Successfully wrote output to generated_content/README.md");
  } catch (err) {
    console.log(err);
  }
}

init();
