# Explore Your Options

Search potential careers and colleges to decide where you want to go.

## Screenshots

![alt text](https://github.com/pelosirm/explore-your-options-capstone/blob/master/readmeImg/FrontPage.png)

![alt text](https://github.com/pelosirm/explore-your-options-capstone/blob/master/readmeImg/HowItWorks.png)

![alt text](https://github.com/pelosirm/explore-your-options-capstone/blob/master/readmeImg/Login.png)

![alt text](https://github.com/pelosirm/explore-your-options-capstone/blob/master/readmeImg/Search.png)

![alt text](https://github.com/pelosirm/explore-your-options-capstone/blob/master/readmeImg/Search_Colleges.png)

![alt text](https://github.com/pelosirm/explore-your-options-capstone/blob/master/readmeImg/College_Results.png)

![alt text](https://github.com/pelosirm/explore-your-options-capstone/blob/master/readmeImg/Careers.png)

![alt text](https://github.com/pelosirm/explore-your-options-capstone/blob/master/readmeImg/Compare.png)

![alt text](https://github.com/pelosirm/explore-your-options-capstone/blob/master/readmeImg/ROI.png)



## Use Case

Explore Your Options is for individuals deciding what kind of field they would like to enter and what colleges they would like to apply to. With the returned
data, it will allow individuals to get a general idea how much college will cost and whats the average median salary for the field they are interested it.

## Initial UX

* As an initial user, I want to land on the page in order to see what the website is about.
* As an initial user, if I would like to sign up, I would like an easy way to create my account.
* As a logged in user, I would like to be able to search careers by location and return the median salary for that job, the education level required,
and how many years of experience.
* Additionally, the user is able to add career data to compare them later.
* User is also able to search colleges by degree, specialization, and location or region. The data returned will show average cost,
graduation rate, and average debt.
* User will also be able to see more details about the college including size, programs offered, and more detailed cost breakdown.
* The user will be able to save the college details in order to compare them against salary and determine return on investment.
* The user will be able to remove careers and colleges that are no longer applicable.



## Working Prototype

Find the NODE working protype here: https://explore-your-options.herokuapp.com and REACT one here https://pelosirm.github.io/explore-your-options-capstone-react/build

## Functionality
* When the user sets up for an account, they are able to search hikes by location and save them as they are planning out their trips.

## Technical

<h3>Front End</h3>
<ul>
    <li>HTML5</li>
    <li>CSS3</li>
    <li>JavaScript</li>
    <li>jQuery</li>
</ul>
<h3>Back End</h3>
<ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>MongoDB</li>
    <li>Mongoose</li>
    <li>mLab database</li>
    <li><a href="https://mochajs.org/">Mocha</a> and <a href="http://chaijs.com/">Chai</a> for testing</li>

</ul>
<p>The app uses AJAX JSON calls to the mLab database that was seeded with governmental information on colleges and careers.</p>
<h3>Responsive</h3>
<ul>
    <li>The app is responsive and optimized for both desktop and mobile viewing and use.</li>
</ul>
<h3>Security</h3>
<ul>
    <li>User passwords are encrypted using <a href="https://github.com/dcodeIO/bcrypt.js">bcrypt.js</a>.</li>
</ul>

## Development Roadmap
Planned additional features and improvements will allow users to:

<ul>
    <li>Be able to do more indepth analysis in regards to debt that one would incure</li>
</ul>

## NODE command lines
* npm install ==> install all node modules
* nodemon server.js ==> run node server
* npm test ==> run the tests

## REACT command lines
* npm install ==> install all node modules
* npm run build ==> build the react files in the "build" folder
* npm start ==> run node server on http://127.0.0.1:8080
* npm test ==> run the tests
