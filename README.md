# The Pog Chronicles

This is a newsfeed app that displays current news headlines fetched from NewsAPI. Users can register and select categories of news that they are interested in, and the news feed will fetch news according to their selection. 

## Installation

### Client
In the root directory for the client folder, run `npm install` to install all dependencies. You can also:

- `npm run dev` to start development server
- `npm run build`, then `npm start` to view production build

Client app can be viewed at http://localhost:3000/

### Server
Run `npm install` in root directory for server folder to install all dependencies. To start development server:

- `npm start` or
- `npm run serve` if using nodemon.

The sequelize-cli should be installed as part of the dependencies. Please run:

- `createdb newsfeed` to create local database
- `sequelize db:migrate` to perform migrations
- `sequelize db:seed:all` to seed database

Server-side app can be found at http://localhost:8000/ 

### News API
This app uses NewsAPI to fetch news data. Please sign up for an API key at https://newsapi.org/ and create a .env file in the root folder of server app and place the following command in the file:
`NEWS_API_KEY5=YourAPIKeyHere`


## About the Project

### Architecture

Stack: Typescript, React, Node.js/Express, Sequelize, Material-UI

In general, I leveraged a mix between an MVVM pattern and an MVC pattern across my application. The backend closely resembles the MVC pattern, but relegates the View portion to the frontend completely. The "Model" portion comes from the backend server that serves data from three different data models. The user and category models are stored in the app database, while the third model is actually fetched through the third-party NewsAPI that I incorporated. These models are processed in controllers, which then passes that data to the frontend.

For the client app, I designed it to resemble the MVVM pattern more closely. The "Model" portion comes from the data that connects the backend to the frontend, whereas the "View Model" portion is representated in the classes that can be found within the models subfolder in the React app. These classes handles all the API calls to the backend server for individual models (authentication, categories, etc.). The pages and containers folders contain the "View Controllers" that maintain the necessary methods and functions for the view components, for instance, the fetchNews function in the NewsFeed container page. I made the decision early on that each individual news article that is fetched should be its own component, and there should be at the very least a container for the individual news articles that handles both the fetching and the mapping into a list. This will allow for greater reusability since there were multiple stretch goal features such as displaying headlines by category that would require further handling by the container to decide what news to fetch.

Finally, within the components folder, you can find components that are mostly intended to be view components, though they can definitely be further refactored to separate elements out even more. For instance, the Header component originally contained both the Title and the Menu Button, and while I separated out the Title component, the Menu Button can be further separated into its own component to provide greater flexibility, reusability and easier testing.


##### Performance & Accessibility Considerations
One of the bigger design decisions I made was to introduce Recoil into the app for state management, and Recoil-Persist to persist that data in local storage. After implementing fetching news and saving categories, I realized that there were many opportunities to cache those results and reduce the number of API calls both from the server to the NewsAPI, and also from the client to the server as well. While it may not be necessary for the purpose of this app due to the limited time and scope of it, I felt that being able to cache the results from the news articles, especially the images, would greatly improve performance overall. 

In terms of accessibility, I tried to be purposeful about keeping the [font sizes](https://drive.google.com/file/d/12xTeCo7rGlbhfujQOXOC1dktsij7MSoG/view?usp=sharing) at a big enough size, and also keeping HTML tags semantically meaningful. For instance, in the [Login/Register components](https://drive.google.com/file/d/1GyylXY7WgIYgkKZs5FPL149b-tG-Yvba/view?usp=sharing), I purposely chose to have "h2" variants and increased the font size to allow for better accessibility. Furthermore, after experimenting with various colors, I eventually ended with a mostly black and white approach to the color scheme, not only for design purposes but also for the color contrast. Finally, I also periodically did accessibility checks with Lighthouse and screen readers to ensure that the experience was not too jarring. While I did not manage to resolve every accessibility issue found by Lighthouse, there were some issues I paid special attention to when I used the screen reader. For instance, with the [alt text](https://drive.google.com/file/d/1GyylXY7WgIYgkKZs5FPL149b-tG-Yvba/view?usp=sharing) in the images for the news article, I thought about whether or not it was feasible to have an alt text that dynamically changes according to the articles I fetch. I read more into writing alt texts, and rather than having a generic alt text that says something like "news article image", and because the images themselves mostly reflected the content of the news article, I decided to leave the alt text empty and treat the images as decorative images instead. Another decision I made was to add aria-labels to certain places such as the beginning of the newspaper article card to make it clearer to listeners what they are listening to.



In terms of the requirements, the project meets them through the following:

##### User Interaction
Users can interact with the app through registering an account, logging in/logging out, viewing full articles, selecting and deselecting categories they are interested in, and changing their password. 

##### API
Usage of NewsAPI's top headlines endpoint with various parameters.

##### Reusable components
The News component, the Back Button, the Title components are examples of reusable UI components that I have written. The models in the React app are also examples of reusable components that I use to fetch in various controller components.

##### Backend service + CRUD
Backend service is done in Node.js/Express/Sequelize/Typescript with API endpoints noted below.
- C = Create User/Associating User selected categories
- R = Reading user category information and email; displayed on user profile page
- U = Updating user selected categories and user password
- D = Deleting user association of selected categories

##### MUI Components
- Grid in NewsFeed container component (client/src/container/NewsFeed.tsx)
- CircularProgress component to indicate loading in NewsFeed container 
- Card component for individual news articles (client/src/components/News.tsx) 
- Button component for all buttons on the site (client/src/components/News.tsx, Login.tsx, Register.tsx, etc)
- Selection Menu component for selecting categories (client/src/components/categories/CategoryMenu.tsx)

### User Flow

User Flow:
    - ![User flow diagram depicting the routes to all the pages](https://drive.google.com/file/d/1-y_1ZTCdXgsNHu240znJ57iMjidrp6nA/view?usp=sharing)

Landing Page:
    - ![Landing Page with rows of news articles](https://drive.google.com/file/d/1FEv1jEGvhzTZYH4AtK9FvWaVno0XsOtP/view?usp=sharing)

Authentication Page:
    - ![Authentication Page with login and register forms](https://drive.google.com/file/d/1PCYwZtDi8n1gaW_GdEuqMpyfkCrZB1h-/view?usp=sharing)

Category Selection Page after registering
    - ![Category Selection Page after registering with dropdown menus](https://drive.google.com/file/d/18axTdfwCrQP2vPzIdMt8H0IpPFdSdAEY/view?usp=sharing)

Home Page with menu button to log out or navigate to profile
    - ![Home Page with menu button to log out or navigate to profile](https://drive.google.com/file/d/10Fo2JnFfIUR44Pe9bMjVt157728xfOMv/view?usp=sharing)

User Profile page
    - ![User Profile page with account information and category selection](https://drive.google.com/file/d/15GucdATratu5-ntEEHOB8Bs0NbT-agE_/view?usp=sharing)

Change Password page
    - ![Chnage password page with a form](https://drive.google.com/file/d/1fE18B8TU9jimvKPJoFBZ-mtUTSFYCJMm/view?usp=sharing)

### Data Models & ERD
Models include user and category, with userCategories as a joint table with a many to many relationship between user and categories.
![ERD](https://drive.google.com/drive/folders/1j7Ldxww0nsojr-Dk9KMJ0e4Y0EqsVRxV?usp=sharing)

### Server API Endpoints

1. Authentication (/auth)
    - /register
        - Registers a user
    - /login
        - Logs user into the site
        - Sample payload:
            ```
            {
                status: 200,
                message: "Success, user is logged in",
                user: "hello_world@gmail.com"
                categories: ["health", "japan"]
            }
            ```
    - /changepw
        - Updates user password 

2. News (/news)
    - /
        - Fetches current top headlines. Default is set to US news.
        - Sample payload:
            ```
            {
                status: "ok",
                totalResults: 37
                articles: [
                    {
                        source: {
                            id: null,
                            name: "MLB Trade Rumors"
                        },
                        title: "Red Sox To Sign Trevor Story - MLB Trade Rumors",
                        url: "https://www.mlbtraderumors.com/2022/03/red-sox-to-sign-trevor-story.html",
                        urlToImage: "https://cdn.mlbtraderumors.com/files/2022/03/trevor-story-1024x682.jpg",
                        author: "Darragh McDonald",
                        content: "The Red Sox are in agreement with Trevor Story on a contract for $140MM, per Bob Nightengale of USA Today. (Twitterlinks) It will be a six-year deal, per Ken Rosenthal of The Athletic. There is a “co… [+2434 chars]",
                        description: "The Red Sox are in agreement with Trevor Story on a contract for $140MM, per Bob Nightengale of USA Today. &hellip;"
                    },
                    ...
                ]
            }
            ```
    - /byUser
        - Fetches news according to user categories
3. Category (/category)
    - /all
        - Fetches all categories currently in use by the app
        - Sample payload: 
            ```
            {
                status: 200,
                [
                    {id: 1, name: "health", type: "categories", abbreviation: null},
                    {id: 2, name: "business", type: "categories", abbreviation: null},
                    {id: 3, name: "japan", type: "country", abbreviation: "jp"},
                    ...
                ]
            }
            ```
    - /save
        - Saves categories to user
    - /delete
        - Deletes category association to user

### Live site
[Hosted app](https://pogchronicles.herokuapp.com/) can be found here. A [mirror site](https://tpchronicles.herokuapp.com/) can also be found here (mainly used for staging currently and in case of rate limitation by NewsAPI). 


### Limitations/Future Development
1. Refactors:
    - The save category API call from the frontend to the backend, as well as the processing of save and delete categories on the frontend can be refactored and moved to the backend. This was done in a separate branch, but as I was not able to do thorough testing to ensure reliability, I have chosen not to include it in the main branch. 
2. Authentication:
    - The authentication is rather bare bones, and the backend API do not have protected routes. More security, for instance, usage of JWT web tokens, and a backend middleware that checks for authentication will be ideal.
3. Caching using Recoil/cookies

