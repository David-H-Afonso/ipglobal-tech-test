## About brances

### master

This branch is just the barebones of the project. It has the initial needed dependencies installed, has the folder structure and one simple index file. As requested by the technical team, this branch will be left like this. Future development and current versions of the test can be seen on the develop branch.

### develop

This branch has the up-to-date version of the application. Notice if you're changing to this branch from master that you'll probably need to run the installation command `npm install` again to get everything ready

## Getting Started

```bash
# clone project
git clone https://github.com/David-H-Afonso/ipglobal-tech-test.git
# access project
cd .\ipglobal-tech-test\
# install required dependencies
npm install
# start project, by default on http://localhost:3000/
```

Before running the project, you'll need the API key. To use it, create a new file in the project root named `.env.local`. Its content should be as follows:
`TMDB_API_KEY=8f781d70654b5a6f2fa69770d1d115a3`
(Note that there's no problem adding this key to the Readme.md since it's a public one provided by the website itself. If it was private it musn't be displayed here.)

```bash
npm run dev
```

## Folder structure:

### /src

This folder will hold our whole app.

### /assets

In this folder we store all kind of styling files and logic, such as `/fonts` and `/styles`

### /components

Here we can find components we can use across the whole app, separated by name.

#### `/elements`

Inside the elements folder we can find reusable smaller components, such as a Button or an Input, that are agnostic to the rest of the functionallity and must be consistent across the app.

### /hooks

Here we introduce our custom React hooks to use more complex logic.

### /layouts

Here we store the common wrappers to our application. For example, one main layout may contain a navbar or a footer, while we could have another one when doing some Auth that don't require this.

### /pages

This is where NextJs stores and enroutes the whole app, each file on this folder is a route in our app.

#### `/api`

In this subfolder we specifically store API routes, to be handled by NextJs.

### /services

Here we have all the API calls stored.

### /stores

Here I store all the entities with a persisted state, such as Rated Movies or Popular Movies, which are only updated when needed.

#### `/hooks`

Here I store some custom hooks for Redux selector and dispatch, since the original ones don't return and ask for types properly, to ensure everything is typed as expected

#### `/reducers`

Here I store all my entities. As entity in this case is described as any value needed to be stored by it's own. For example, popularMovies, ratedMovies.

#### `/utilities`

Here I set all my entities to the default value. I got an entities folder with each one individually and then a gather-all file to be able to summon it whenever I need and keep the code cleaner.

### /types

Here we store all the types used on the app.

### /utils

In this folder we collect common functions that are not tied to an specific context or component to be able to reuse them in more than one place.

## Development process

In this section, I will describe my thought process and the sequence of actions taken as precisely as possible. This can be verified through the commits, where I have aimed to be as specific as possible.

Note: I spent a considerable amount of time trying to figure out how to retrieve the movies that a guest client has rated through the API, only to realize that this functionality is not available. While I understand that creating a guest session ID and submitting ratings via the API demonstrates how to handle API calls with a token, it would have been immensely helpful if the project specifications clearly stated that retrieving the list of rated movies must be done through a custom entity in Redux. This clarification would have saved me a lot of effort and confusion, allowing me to focus on the actual implementation more efficiently.

### Create app structure

Upon reviewing the requirements for this technical test, I noted that I needed to create two separate branches: one for the initial project structure and another for the application itself. With this in mind, I established all the necessary folders and included some test files to ensure they were committed to the repository. Afterward, I verified that there were no npm errors and confirmed that all dependencies were installed before proceeding to commit and push to the master branch. Following this, I created the develop branch.

Since the app's requirements do not specify the use of a promise-based HTTP client, such as Axios, I opted to use the native JavaScript fetch function. This choice minimizes compatibility issues and allows for easy modifications in the future should another client be preferred.

### Checking API

Having never worked with the MovieDB API before, I began by familiarizing myself with its functionality. Initially, I encountered errors while testing on the website, primarily due to the API key being handled incorrectly in their tester; it requires the key as URL parameters instead of through headers. I quickly realized this while creating the `movies.ts` file inside the `pages/api` directory. I set up a basic structure to integrate this API into the Next.js router and began testing for errors. I also implemented an error handler to simplify future error management. While I don't anticipate needing it extensively for this project, it took the same amount of time to set up as it would have to troubleshoot errors directly in the `movies.ts` file, and it allows for easier content addition down the line.

Some errors also occurred due to the requirements document not being up to date with the API. For instance, the provided URL for rating movies was incorrect: https://developers.themoviedb.org/3/movies/rate-movie. The correct URL is actually https://developer.themoviedb.org/reference/movie-add-rating. Some of these issues, along with the note provided at the beginning of the development process, slightly slowed down my initial progress.

Once I felt confident in my error handling, I verified that everything was functioning correctly in the `index.tsx` file, conducting some quick fetch requests to `api/movies` to ensure proper operation. Subsequently, I moved on to the creation of the `getMovies` service, outsourcing the fetching logic to this file for accessibility throughout the application.

I am now considering the idea of having a main page showcasing the most recent or popular movies. To achieve this, I will need to incorporate Redux or Zustand to manage global state and avoid redundant requests. Additionally, I plan to implement a Searched Movies state to store user search results, as well as a Rated Movies state for the `/ratedMovies` page. Although the documentation specified `/mylist` as the URL for this part, I found the name to be somewhat misleading, so I opted for the alternative. However, I can easily adjust it if the original name is deemed necessary.

### Creating a lasting state

With all of this in place, I began working on Redux as soon as I confirmed that the API was functioning correctly. By adding services as needed and establishing a well-defined structure from the start, I can minimize the amount of rework required in the future. I created a stores folder and installed all the necessary dependencies for Redux.

I configured Redux with its folder structure and renamed the previously labeled "movies" to "popularMovies" to align with our requirements. I also made the necessary calls in the test index file. After a bit of troubleshooting, I moved on to the layouts.

### Layouts

I began by creating a common Layout that includes a Navbar, allowing for seamless navigation throughout the app. I applied some styles using Tailwind and developed a custom Link component for Next.js to resolve an error encountered when redirecting to the same URL. Additionally, I implemented a burger menu that appears only on mobile devices, although I will only further develop it if time permits, as responsiveness at that level is not essential for this use case.

During this process, I encountered issues with Next.js **not** routing as intended due to improper folder placement on my part. I mistakenly nested `popularMovies/popularMovies.tsx` instead of using `popularMovies/index.tsx` or placing `popularMovies.tsx` at the same level as `_app.tsx`, which is the approach I ultimately chose. To resolve this, I created a custom `_app.tsx` component to wrap my providers and used a component named `App.tsx` to prepare the entities. My `index.tsx` file in the pages folder now redirects to the Popular Movies page, and all redirections function as expected. I then proceeded to create the three main pages I will need: Popular Movies, Search, and Rated Movies. A significant portion of the time was spent writing JSX with Tailwind styles and ensuring everything appears as intended.

### Final funtionalities

After spending some time on styles and information display, and once the Popular Movies section was completed as requested, I opted for a more streamlined approach to the search and ranking functionalities. I believe that the majority of the code quality can be observed within the components I have already developed, so I aimed to expedite the completion of the required functionalities. I began with the search bar, creating its file and implementing the associated logic. Given that this feature is solely focused on searching, there is no need to store any related information in Redux.

### Search movies

In this section, I focused on linking and establishing everything necessary to render the movies. The components, along with my prior explanations, outline how I approached this aspect. I also created a separate component in the elements folder to build a reusable Search Bar.

Given that the content rendered here is not directly obtained from Redux and requires additional logic, I developed a simple custom hook to demonstrate one of its potential uses. I opted not to create additional hooks, as I believe the scope of this application does not warrant them. This particular hook could have been used solely within `Search.tsx`, but I wanted to illustrate how I would handle such cases if the Search functionality were to be implemented across multiple pages, such as in Rated Movies.

Additionally, I created a Loading component in the elements folder to use while fetching data from a URL.

Next, I modified the MovieCover component to resolve minor warnings and to ensure it displays the poster, title, and date as required. I then developed the MovieInfo component, which serves as the modal to showcase movie details when a cover is clicked. This component utilizes a React Portal to enhance the user experience by displaying the modal above all other content. In a larger application, I could have implemented a general custom portal component to handle various situations, allowing parameters for the component ID and the actual JSX to be rendered. However, since this is the only modal needed for this project, I opted for a simpler solution.

With these enhancements in place, and since I am using the same components in the Popular Movies section without requiring any changes, users can now effectively search for movies with a slight delay to prevent excessive API calls, view their results, open the movie information, and access a complete modal with all relevant details.

### Rated movies

In this final section, I began by creating a Rating component that allows users to rate movies using a star system. The design enables users to provide ratings from 0 to 5, with half-star increments available. To enhance readability for those unfamiliar with the calculations involved, I included comments within the component to clarify its functionality.

I integrated this Rating component into the MovieInformation modal, enabling users to submit ratings by clicking on a star.
This aspect posed some challenges, which are detailed in the **Development process** section above.

Once I established the approach for creating this list, I proceeded to develop a RatedMovies entity along with its associated logic. Upon completion, I implemented the functionality to capture ratings when users click on the stars within the movie information modal. I ensured that the ratings were recorded in our custom entity and sent to the API. (Even though they are not currently retrieved or utilized. However, since this requirement was specified, I included it). To add further functionality, I implemented a mechanism whereby the rating must first receive a 200 status response from the API before being added to Redux. With the custom entity for movies and ratings now fully operational, I created a page similar to Popular Movies to display the movies that have been rated. Later, I extended the functionality to display the user's given rating within the movie info modal, incorporating this feature into both Popular Movies and the Search functionality.

## Test

As a final step, I added tests for a service and a element component to show how testing can be handled in those cases. While greater coverage and more thorough testing are always preferable, these tests were designed to ensure that key functionality is working in both files and to demonstrate my approach to testing in these scenarios. I utilized Vitest for easier setup.
