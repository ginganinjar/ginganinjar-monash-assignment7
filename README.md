<h1 align="center">Welcome to Good README.md file creator 👋</h1>

  <p align="center">
  <a href="https://www.github.com" rel="noopener">
 <img width=200px height=200px src="./siteimg.jpeg" alt="Good README.md file creator logo"></a>
</p>


<div align="center">

  [![GitHub issues](https://img.shields.io/github/followers/ginganinjar?label=Follow)](/issues)
  [![Status](https://img.shields.io/badge/status-active-success.svg)]()  
  [![GitHub issues](https://img.shields.io/github/issues/ginganinjar/ginganinjar-monash-assignment7)](/issues)
  [![GitHub Pull Requests](	https://img.shields.io/github/issues-pr/ginganinjar/ginganinjar-monash-assignment7)]()
  [![GitHub Forks](	https://img.shields.io/github/forks/ginganinjar/ginganinjar-monash-assignment7?label=Fork)]()
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/mit-license.php)

</div>

---

<p align="center"> Good README.md creator is a university assigned project designed to assist developers create a functioning README.md file without much work or pain. It automates most of the creation process creating a file that can be easily formed and designed.

Of special note :

The array, containing most of the information required for this project is contained in ./tmp/responses.txt <- this file is updated on the fly ensuring that users do not need to constantly update information that would otherwise be required.

The README.md file has been designed to present with significant information. Giving readers full access to badges, well formed layout and high presentation.

If an appropriate location is provided in terms of a production system, the CLI script will use an API to snap a production screenshot of the website and provide that also in the website.

The application also takes the authors information and provides that information within the file also.

The file ./templates/tmp.txt is the template README.md file. This file can be modified in accordance with the users requires. The user may elect to insert an appropriate key inside this file and that will automatically be populated at the time of execution. For example, the file ./tmp/responses.txt contains a stringify'ed array : the structure of that array is as follows : 

[inquirer input type],[The question asked to the user], [the field to be updated in the README.md file. For example, <title> will take the answer from this array and populate the file with this content], [the default response which is updated every time the user makes a change], [null <- this field is used internally by the application and cannot be changed]

After the application completes, it will create two files (README.md & siteimg.jpeg) - These files will be contained in the directory, ./generated_content. Move these files to the root of your repositry and everything is good to go.


 
</p>

## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 Usage <a name = "about"></a>
 To assist in the design and build of a professional and easily used README.md file using a CLI editor from within NODE CLI console.

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Installing & 🚀 Deployment <a name = "deployment"></a>

```sh
Clone the repo 

GIT CLONE git@github.com:ginganinjar/ginganinjar-monash-assignment7.git from your console.   

Install NPM packages
npm install 

```

## :mag: Testing  <a name = "built_using"></a>
Other than UAT, no testing harnesses have been used.

## ✍️ Authors <a name = "authors"></a>
David Sparrius

## 🎉 Acknowledgements <a name = "acknowledgement"></a>
A special thanks to Tri Nguyen