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

<img width="331" alt="saving-data-traditional" src="https://user-images.githubusercontent.com/20265633/37110266-6d339572-220a-11e8-8335-2b406814b014.PNG">

<img width="475" alt="saving-data-meteor-default" src="https://user-images.githubusercontent.com/20265633/37110304-89a7b54e-220a-11e8-8f31-3bde9ae2eb8f.PNG">

By default, when we call `Collection.insert()` method with a new record or whenever we make a change to a collection, we're kicking off two separate flows. On the client side, the new record is **instantly** saved into the local collection, and the React components that were watching that collection will instantly update with the new record. Instantly here means it happens instantly **without communicating with the server at all**. At the same time, the client also kicks off a request to the backend to server. The new record was added to the collection and it gets persisted into the Mongo database. 

So the key item here is, by default, in a Meteor application whenever a client wants to save data, it is saved **without any validation** unless we specifically write some validation, which is quick in building the application but very **insecure** especially in serious and production environments.

## 8. Save Data at Client Side of Meteor Application

To secure the application:

While the publication and subscription system is used to read data, **Meteor methods** are used to **manipulate (操作)** data. A Meteor method is a function that is used to run a chunk of code in a secure fashion. We use Meteor methods to securely update data.

First of all, remove the `insecure` package (literally). By doing so we seesntially lock down the entire application and prevent anyone from changing any data at all. `meteor remove insecure`

<img width="410" alt="saving-data-meteor-secure" src="https://user-images.githubusercontent.com/20265633/37112039-6ad38ac6-220f-11e8-8ad6-7d6406dc82da.PNG">

When user wants to save some data, the application is going to call a new Meteor method and pass the data that it wants to save as an argument. Whenever a Meteor method got called, it executes on both client and the server.

On the client side, the method is instantly executed, and data is instantly inserted into the client side collection. And because the Meteor method is running on the client, whenever the data gets inserted into a local collection, React components are going to instantly update with the new piece of data, which makes the users think that the app is super fast.

Swap to the server flow, the method is going to execute on the server where the server has the opportunity to validate the record in a secure context. In side the Meteor method on the server, we can add any type of **validation check** that we want. If all these checks are successful, we then save the record to our database. If the server rejects the record, it will notify the client that the record was not saved successfully and that the client needs to **revert** that change from its collection. And the changed collection will be rolled back, which means the UI will update because the React components are watching the collection, and whatever data was attempted to be saved will be removed out of the UI.

This entire flow is a huge benefit of Meteor. On the client side flow, we refer to this as **optimistic UI updates**. Optimistic here means whenever a user makes a change we assume that it's going to be a successful change.

## 9. React Ref System

A ref is a variable that points to a specific DOM element that is being produced by our component. We can add a ref to a very particular element by passing a ref property to the element that we care about.

```html
<input ref="input" className="form-control" />
```

We can access this imput from anywhere inside of our component by calling `this.refs.input`.

```javascript
handleSubmit(event) {
	event.preventDefault();

	console.log(this.refs.input.value);
}
```

## 10. NPM package 'valid-url'

Check if the input url is valid. `$ npm install --save valid-url`

## 11. Middleware and WebApp

<img width="420" alt="redirect" src="https://user-images.githubusercontent.com/20265633/37125171-64222bcc-2239-11e8-8ea6-5359ef8442e8.PNG">

When an HTTP request comes into a Meteor application, if falls through a series of middlewares. Middlewares are small snippets of code (functions) that execute when requests come into the application. Middlewares can also be used to modify/process requests. So in the shorten url project we create a middleware that detects if the user is visiting the app with a url like 'localhost:3000/anything'. If they are, we redirect them to the appropriate destination.

The WebApp object is essentially the actual server component of Meteor. It's a part of Meteor that handles incoming request and figures out what to do with them. We can use WebApp object to add more middleware to application.

## 12. Update Records in a Collection

Use a system called **Mongo-Style Modifiers** [[Document]](https://docs.meteor.com/api/collections.html#modifiers), which is an convention(惯例) on how to update records saved in a Mongo database. Mongo modifiers are JavaScript objects that describe a precise operation to take on a record that we're updating. `Links.update(link, { $inc: { clicks: 1 } });`