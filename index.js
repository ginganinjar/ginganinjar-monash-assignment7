const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");


let answers;
const writeFileAsync = util.promisify(fs.writeFile);
const readTemplate = util.promisify(fs.readFile);


function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is your projects title :"
    },
    {
      type: "input",
      name: "icon",
      message: "Project Icon address : "
    },
   {
    type: "input",
    name: "repo",
    message: "Repo Address :"
   }
   ,
   {
    type: "input",
    name: "purpose",
    message: "Project Purpose :"
   }

  ]);
}

async function processString(theString) {

  let rplString = [["<answers.title>", answers.title],["<answers.license>", answers.license]];
  console.log(rplString);
 let theModifiedString = theString.toString().replace("<answers.title>", answers.title);
  return(theModifiedString);

}


async function init() {

  try {
    answers = await promptUser();
    const getTemplate = await readTemplate("./templates/tmp.txt", answers);
   // let res = await processString(getTemplate);
     
     let rplString = [["<title>", answers.title, "GitHub Project"],
     ["<projectIcon>", answers.icon, "https://i.imgur.com/6wj0hh6.jpg"],
     ["<repo>", answers.repo, ""],
     ["<purpose>", answers.purpose, "The purpose of this project is to : <enter reason here>"]
    ];
  
      theModifiedString = getTemplate.toString();

    for (i = 0; i < rplString.length; i ++) {
        console.log("Writing" + rplString[i][0]);
        // see if user has entered data - if not default to array 2
        if (rplString[i][1] == "") {
            if (rplString[i][2] == "") {
              console.log("Error - missing information for field " + rplString[i][1]);
              continue;

                }
            thisString = rplString[i][2]} else {thisString = rplString[i][1];}
         theModifiedString = theModifiedString.replace(rplString[i][0], thisString);

    }
    
      await writeFileAsync("./generated_content/README.md",theModifiedString);
      console.log("Successfully wrote output to generated_content/README.md");
  } catch(err) {
    console.log(err);
  }
}

init();
