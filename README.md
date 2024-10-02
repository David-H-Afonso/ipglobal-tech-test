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

### /types

Here we store all the types used on the app.

### /utils

In this folder we collect common functions that are not tied to an specific context or component to be able to reuse them in more than one place.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
