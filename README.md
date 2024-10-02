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

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Development process

In this section I'll try to describe as precise as I can the train of thought and how thing were done, in which order. This can be checked via commits where I've tried to be as specific as possible.

### Create app structure

Checking the requisities to fulfill this test, I've to have two separated branches, one with the initial structure of the project and another with the app per se. With this in mind, I create every folder I think I'll need, with some test file just to get them commited on the repository. After that, I made sure I've no npm errors, I've everything installed and I proceed to commit and push master. After this, I create develop.

### Checking API

I've never worked before with this MovieDB, so I started by trying to get to know the API. Testing on the website gives me errors, due to how it's handled on their node tester passing the API KEY through headers when it actually needs them by url params, but I quickly realise this creating the movies.ts file inside pages/api. I create a basic structure to add this API to the Next router, and then I start testing errors. I create the error handler to make my life easier in all the error handling in a future, even tho I don't think I will really need it on this project, it took me the same amount of time as testing it on the movies.ts file and I can add content as I need.

Once I feel comfortable enough with how strong my errors are, I first check everything is working on the index.tsx file, some quick fetch('api/movies') to ensure everything was working as intended, and then I proceed with the creation of the getMovies service, where I outsource the getter to this file, to be able to get it anywhere on the app.

I have now in mind the idea of having a main page with the most recent or popular movies, for this purpose I'll have to add Redux or Zustand to handle a global state and avoid repeating unnecessary requests. I'll also have to add a Searched Movies state to store movies user searches as well as Rated Movies for the /mylist page.

### Creating a lasting state

With all this worked out, I stared working on Redux as soon as I checked the API was working fine. Now I can just add services when needed, and having the structured defined ASAP will reduce the amount of rework I'll have to do in a future. I create the stores folder and install all the dependencies I need for Redux.

I got Redux up and ready with its folder structure, change the previously called "movies" to "popularMovies" to start making it as needed, and call it in the test index file. After some quick troubleshooting, I started with the layouts.

### Layouts

I first started creating a common Layout with a Navbar to be able to navigate from everywhere across the app. I added some styles with Tailwind and created a custom Link NextJS component on elements since I got an error when redirecting to the same url I was in. I also added a burger menu to only appear on mobile, but I will only develop it further in case I've spare time since responsiveness at that level is not required by the use case.

Here I faced some issues related to NextJS **not** routing how I wanted to due to some bad folder placement for my part (I nested `popularMovies/popularMovies.tsx` instead of doing `popularMovies/index.tsx` or just `popularMovies.tsx` at the same level as `_app.tsx`, which is the solution I chose). I decided to fix it this time by creating a custom `_app.tsx` component to nest my provides, and inside use a component `App.tsx` to get the entities ready. My `index.tsx` file on the pages folder redirects to the Popular Movies page, and now everything is redirecting as expected. Then, I started creating the 3 main pages I'll need: Popular Movies, Search and Rated Movies. Most of the time is spent writing JSX with Tailwind styles and making sure everything is as it should.

### Final funtionalities

After some time working on styles and displaying information, and once the Popular Movies part was done as requested, I decided to get quicker approach to the search and the ranking parts. I think most of the code quality can be seen inside the components I've already made, so I'll try to take less to finish the required functionallities. I started with the search bar, created it file and worked on it's logic. Since it's just searching, there's no need to store on redux any information.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
