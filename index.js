const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const request = require("request");
const clc = require("cli-color");

let theResults = [];
let savedResponses = [];

const writeFileAsync = util.promisify(fs.writeFile);
const readTemplate = util.promisify(fs.readFile);

// function used to itterate through the questions contained in the array.

function promptUser(input, title, theMessage, theDefault) {
  console.log(clc.blue("Enter for previous answer : " + theDefault));

  return inquirer.prompt([
    {
      type: input,
      name: title,
      default: theDefault,
      message: theMessage,
    },
  ]);
}

function makeChanges(masterString, changeThis, changeTo) {
  let repeatNow = masterString.split(changeThis).length;

  for (x = 0; x < repeatNow; x++) {
    masterString = masterString.replace(theResults[i][2], changeTo);
  }

  return masterString;
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

    theModifiedString = makeChanges(
      theModifiedString,
      theResults[i][2],
      useThisAnswer
    );
  }

  return theModifiedString;
}

async function init() {
  try {
  let getJson = null;

  while ((getJson == null) || (!getJson)) {
    let theJsonResponse = await promptUser(
      "prompt",
      "jsonLocation",
      "Full path and filename to package.json file:",
      "./package.json"
    );

    // access the package.json file to identify information.fail
     try {getJson = await readTemplate(theJsonResponse["jsonLocation"], "utf8");}
     catch (err) {
      // if the file is not found, report an error and try, try again.
      console.log("File not found - please try again.")
     getJson = null;
    }
  }

      Jsonresults = JSON.parse(getJson);

    // load up array of previous answers
    loadSavedResponses = await readTemplate("./assets/responses.json", "utf8");
    // only access the array if the file exists.

    if (loadSavedResponses) {
      questionArray = JSON.parse(loadSavedResponses);
    }

    for (i = 0; i < questionArray.length; i++) {
      theAnswer = questionArray[i][1];

      // feed the question array to the prompt user function
      let answers = await promptUser(
        questionArray[i][0],
        questionArray[i][1],
        questionArray[i][2],
        questionArray[i][4]
      );

      // check if the answer provided is not chr13 - if it is not, then update the answer with the new response.
      if (answers[questionArray[i][1]] !== "") {
        savedResponses[i] = answers[questionArray[i][1]];
        questionArray[i][4] = answers[questionArray[i][1]];
      }

      // push the results to theresults.[the question title, the answer, the field to be updated and the default text]
      theResults.push([
        questionArray[i][1],
        answers[questionArray[i][1]],
        questionArray[i][3],
        questionArray[i][4],
      ]);

      // if the user has not provided an appropriate URL, use the github image capture.

      if (questionArray[i][5] == "screencap") {
        if (answers[questionArray[i][1]] == "") {
          useThisURL = "https://www.github.com";
        } else {
          useThisURL = answers[questionArray[i][1]];
        }
      }
    }

    console.log("Generating website image for : " + useThisURL);

    request(
      {
        url: "https://api.apiflash.com/v1/urltoimage",
        encoding: "binary",
        qs: {
          access_key: "0d583704ac6847c0a833af29532409ec",
          url: useThisURL,
        },
      },
      (error, response, body) => {
        if (error) {
          console.log("Unable to secure screen capture");
        } else {
          fs.writeFile(
            "./generated_content/siteimg.jpeg",
            body,
            "binary",
            (error) => {
              () => {};
            }
          );
        }
      }
    );

    // load default tmp.txt file (this is used to generate readme.md file)
    const getTemplate = await readTemplate("./templates/tmp.txt", "utf8");
    res = await processString(getTemplate);

    res = res.replace(
      "<dependancies>",
      JSON.stringify(Jsonresults["dependencies"], null, " ")
    );

    // function for multiple edits
    function makeChanges(changefrom, changeto) {
      let repeatLoops = res.split(changefrom).length;

      for (z = 0; z < repeatLoops; z++) {
        res = res.replace(changefrom, changeto);
      }
    }

    // take information contained from within the package.json file and populate it.
    // if i have time, i'll add below to an automated array json file.

    makeChanges("<repo>", Jsonresults["name"]);
    makeChanges("<main>", Jsonresults["main"]);
    makeChanges("<repositry>", Jsonresults["repository"]["url"]);
    makeChanges("<testing>", Jsonresults.scripts.test);

    fs.writeFile(
      "./assets/responses.json",
      JSON.stringify(questionArray),
      "utf8",
      (error) => {
        () => {};
      }
    );

    writeFileAsync("./generated_content/README.md", res);

    // write array to assets/answers files
    console.log("Successfully wrote output to generated_content/README.md");
  } catch (err) {
    console.log(err);
  }
}

init();
