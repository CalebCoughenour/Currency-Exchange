# _Currency Exchange_

#### By _**Caleb Coughenour**_

#### This website will convert currencies using an API

## Technologies Used

* _HTML_
* _Javascript_
* _JQuery_
* _CSS_
* _Node.js_
* _npm_
* _Webpack_
* _API_

## Description

This website will ask the user for three inputs. The inputs are amount they want to convert, base currency and the currency they would like to convert to. Next, the site will query the ExchangeRate-API with the information provided by the user. The base currency, converted currency, conversion rate and converted amount will be displayed on the page after the call is complete. 

## Necessary Tools

* node.js
* Create an account and get an API key from [ExchangeRate-API](https://www.exchangerate-api.com/)
* Create an account and get API key from [Nomics](https://p.nomics.com/pricing) (this part is optional, crypto search is commented out)

## Setup/Installation Requirements

* Copy the git repository url from the "code" drop down on this github page
* Open a shell program & navigate to your desktop
* Clone the repository using the copied URL and the "git clone" command
* In the shell program, navigate to the root directory of the newly created file called "Currency-Exchage"
* In the root directory, create a file named ".env"
* Navigate to the newly created .env file. This is where you will add your API key by typing "API_KEY={your key here}"
* In the root directory, add a file named ".gitignore" if you do not already have one_
* Add .env to your .gitignore file
* Commit just your .gitignore file to your github
* In the root directory run "npm install"
* Once the installs have successfully completed, run "npm run start" to open and run website

## Crypto Search Bar

* If you want to use the crypto search you will need to remove all commented out code in index.src, index.html & crypto-search-api.js
* Next, add your API key to the .env file by typing "CRYPTO_API_KEY={your key here}"

## Known Bugs

* _No known issues_

## License

_MIT Licensed_

Copyright (c) _4/22/22_ _Caleb Coughenour_
