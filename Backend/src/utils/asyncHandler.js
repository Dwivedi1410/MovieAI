const asyncHandler = (handleRequest) => {
    return async (req, res, next) => {
        Promise.resolve(handleRequest(req, res, next)).catch((error) => next(error));
    }
}
export default asyncHandler;



/*

What is a Promise in JavaScript?
A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

Think of a Promise as a promise that something will be done in the future:

Pending: The promise is still waiting for the operation to finish.

Fulfilled (Resolved): The operation completed successfully.

Rejected: The operation failed (error occurred).

Why do we need Promises?
JavaScript is single-threaded, and many operations like fetching data from a server, reading files, or waiting for timeouts, happen asynchronously (you don’t get the result immediately).

Promises let you write code that can wait for these async operations to finish, and handle success or failure, without getting stuck or blocking the rest of the code.

code :- 
        // Creating a promise that simulates a task taking 2 seconds
        const myPromise = new Promise((resolve, reject) => {
        const success = true; // change to false to test rejection
        setTimeout(() => {
            if (success) {
            resolve("Task completed successfully!");
            } else {
            reject("Task failed!");
            }
        }, 2000); // wait 2 seconds
        });
        // Using the promise
        myPromise
        .then((message) => {
            console.log("Success:", message);  // runs if resolved
        })
        .catch((error) => {
            console.log("Error:", error);      // runs if rejected
        });

*/




/*

What is a Callback Function?
A callback function is a function passed as an argument to another function, to be “called back” (executed) later. Think of it as giving instructions: “Once you’re done with your task, run this function for me.”

They’re often used for things that take time, like waiting for a timer, loading a file, or responding to user actions.

Everyday Analogy
Imagine you order food at a restaurant and leave your phone number. The chef cooks your meal (which takes time) and calls you back when it’s ready—your phone number is like a callback.

code :- 
        function greet(name, callback) {
        console.log("Hello, " + name + "!");
        callback();  // Call the function passed as callback
        }
        function sayBye() {
        console.log("Goodbye!");
        }
        greet("Sam", sayBye);


What happens here?
The greet function does two things:

Greets the user.

Calls the callback function you gave it.

When you call greet("Sam", sayBye), sayBye runs at the end, printing “Goodbye!”

*/





/*

onClick = {handleAddItem}
This passes the function itself as the click handler.

It does NOT call the function immediately; React will call it when the button is clicked.

BUT: If your function expects an argument (like item), this won't work as expected since React will call it with the click event object, not your custom argument.




onClick = {handleAddItem(item)}
This calls the function immediately when rendering!

The return value of handleAddItem(item) gets assigned as the click handler.

Usually, this is NOT what you want because the function runs right away, instead of when you click.



onClick = {() => handleAddItem(item)}
This is the common correct way to call a function with arguments on click.

You pass an anonymous arrow function that calls handleAddItem(item) when clicked.

The arrow function itself is what React invokes on click.

*/