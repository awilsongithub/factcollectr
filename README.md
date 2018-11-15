# How to run the app
- Install [node](https://nodejs.org/en/) if you don't have it
- Log in to github.com  
- Go to https://github.com/awilsongithub/factcollectr
- Copy the "Clone or download" (with https) url (https://github.com/awilsongithub/factcollectr.git)
- In your computers terminal navigate to the directory into which you'd like to clone the factCollectr project directory.
```
git clone https://github.com/awilsongithub/factcollectr.git
cd into factCollectr directory
npm install
npm start
```
- In your default browser, navigate to http://localhost:3000
- FactCollectr should load


# How app meets requirements

**Responsive**
Using the [Bootstrap Grid system](https://getbootstrap.com/docs/4.0/layout/grid/) and media queries.

**React application implementing the React framework**
Bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

**3+ routes using React Router**
1. "/" (StartScreen component)
2. "/play" (QuizScreen component)
3. "/hall" (Hall of Fame component)

**Bonus: Also implements CRUD operations with associated UI:**
[Firebase Realtime Database](https://firebase.google.com/) used to:
1. Save quiz scores (Create) (see "saveScore" method on App component).
2. Read quiz scores on change to realtime database (see HallOfFame component)

**Select a read-only API and implement a "rich" interface using multiple (at least 3) resources (end points):**
I used the [Open Trivia Database](https://opentdb.com) API. Users can fetch questions from 24 different endpoints representing different categories of trivia questions. On fetch, users are routed to the QuizScreen where they answer questions. On answering the final question, the Score component renders showing a quiz recap with an option to save the score to the database. If they choose to save and are not yet logged in, the login modal is triggered where users can authenticate using Google Auth (via firebase authentication). Users must be authenticated to save a score. TODO: Once authenticated users are taken to the Hall of Fame where the save is confirmed and all scores displayed.

**Project also:**
- Is in its own Github repo
- Has major sections commented.
- Has README describing purpose, functionality and how to start the application (includeing any necessary prerequisites for running it).
- TODO: FactCollectr will be deployed via firebase to ....


# About FactCollectr

- Trivia questions courtesy of [Open Trivia Database](https://opentdb.com)
- Bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
- Routing with [React Router v4](https://reacttraining.com/react-router/)
- Data persistence with [Firebase Realtime Database](https://firebase.google.com/)
- Using Firebase with React [Tutorial](https://css-tricks.com/intro-firebase-react/)
- Styling supported by [Bootstrap v4](https://getbootstrap.com)
- UI inspired by [Trivia Plaza](https://www.triviaplaza.com/)
- Sortable, searchable tables with [Reactable](https://github.com/glittershark/reactable)
- Icons from [Flaticon](https://www.flaticon.com/)
