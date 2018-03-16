# Explore Your Options

Search potential careers and colleges to decide where you want to go.

## Screenshots

![alt text](https://github.com/pelosirm/take-a-hike-node-capstone/blob/master/readmeImg/front_page.png)

![alt text](https://github.com/pelosirm/take-a-hike-node-capstone/blob/master/readmeImg/search.png)

![alt text](https://github.com/pelosirm/take-a-hike-node-capstone/blob/master/readmeImg/hike-results.png)

![alt text](https://github.com/pelosirm/take-a-hike-node-capstone/blob/master/readmeImg/hike-info.png)

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

Find the working protype here: https://explore-your-options.herokuapp.com

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
<p>The app uses AJAX JSON calls to the Hiking Project API to return the hike search results.</p>
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
    <li>Be able to add additional info with hike, pictures etc</li>
    <li>Add more conditional information around the places visiting ie weather and local campgrounds</li>
</ul>
