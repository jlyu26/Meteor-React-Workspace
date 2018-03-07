# Meteor-React-Workspace

## 1. Meteor vs React

Meteor: Keep track of data in our application

React: Take data and produce HTML; Handle user events

## 2. Add Meteor Package

Bootstrap: `$ meteor add twbs:bootstrap@3.3.6` 'twbs' short for 'Twitter BootStrap', 3.3.6 is version number.

## 3. Full Stack File Structure

**`client` folder:** Any code that is written in the client folder is automatically going to be bundled up and shipped down to our client —— our web browser.

**`server` folder:** Any code put in the server folder is going to be held back and only it will be ran and exists on our server.

**`imports` folder:** For any amount code that we want to share between two different environments, we can place inside of the `imports` folder because the `imports` folder is automatically shared between client and server. And also, any code inside of `import` folder will be actually **executed first** before anything on the client and server, so it makes it a fantastic spot to do some initial application setup or declaration.

## 4. faker Library

The purpose of faker library [Document](https://www.npmjs.com/package/faker) is to generate a bunch of seed or fake data for our application to pre-populated some amount data in our database. Usually used for client side development.

## 5. Publish and Subscribe System —— Slice Data from Back-end

By default Meteor at all times is going to attempt to provide the entire set of data to the client side. (To disable, run `meteor remove autopublish` in command line.) This is a feature that is done solely for development purpose to make it easier to put application together. However not only considering the performance, but also to have a security with data, we only want to publish a limited set to the client of the web application (e.g. bank accounts), so that someone who is coming to the web page can't just arbitrarily make a query and get all records in database. So this process of limiting the amount of data that a client can see at any time is referred to as the **publish and subscribe system**.

In the employees project he React application has a local copy of the employee's collection, it can choose to **subscribe to a subset** of the employees that are stored in the back-end. The meteor server can then choose to respond to this subscription by **publishing** the required subset. In a word, server defines publications while client defines subscription.

## 6. Container

In section above, anytime the subscription loads up more data, we need to re-render React. To handle case like this,  use package [[react-meteor-data]](https://github.com/meteor/react-packages/tree/devel/packages/react-meteor-data), which works specifically with React components when we're using collection.

React-meteor-data allows us to create what we refer to as a **container**. A container is a function that allows us to update some amount of data being passed to the component whenever a subscription changes. (In this project watch the 'employee collection' whenever it changes, take all the data that's been loaded to it on the client side and pass it to the 'employee list').

<img width="250" alt="container" src="https://user-images.githubusercontent.com/20265633/37054209-38939f9c-214c-11e8-9035-9babca5aef14.PNG">

## 7. Security

The publication and subscription system is used to read data while **Meteor methods** are used to **manipulate (操作)** data. 