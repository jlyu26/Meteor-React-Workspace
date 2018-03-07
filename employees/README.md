## Employees

A Meteor and React application that shows employee's profiles.

<img width="316" alt="employees" src="https://user-images.githubusercontent.com/20265633/37068540-4273eca2-217d-11e8-876f-70a36fb36c81.PNG">

## Challenges

1. Need a place to store our data (in MongoDB)
2. Need to somehow generate this data (use faker package)
3. Must assume that we have thousands of entries and we only want to send a small subset to the client at any time (Meteor publication and subscription system)
4. Need a way to load more data when the user clicks the "Load More" button (use `componentWillMount()`)