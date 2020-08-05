# AppSMB116 
This program is a bet mobile app made for a project with a friend.

We made this app with a back in nodeJS (with express) and a front in React-Native.


# How to install the back and the front
1) You need to have node and npm on your computer.
2) You have to download the repository.
3) Go inside the back and/or the front folder and open a terminal.
4) Run ``` npm install --save ``` and it's gonna install the packages in your "packages.json" file.

### Back
5) Run the command ``` node app.js ``` to start the node server.

### Front
5) Run the command ``` npm start ``` to start the webserver.

### Tip
I didn't succeed to put the Back and the Front on different servers (because of the network), but you can do it by freeing ports or a direct tunnel to the server.


And that's all ! You've done with the installation.

# What can you find in the files ?
### Back
The files "database.rules.json", "firebase.json" and "tvprono xxxx ... .json" are just to connect the back with the google's database "Firebase".
So if you DON'T use firebase as db, you don't need this files, and the queries won't be the same as us.

#### In app.js :
You're gonna find the imports.  
* The packages installed and needed
  * ex : ``` const express = require('express'); ```
* The functions we made
  * ex : ``` const getAllBetsImport = require('./functions/bets/index.js'); ```.
    
Then you're gonna call the functions ``` post ```, ``` put ```, ``` get ``` or ``` delete ``` with the good url, and the good function.

For exemple : ``` app.post('/api/login/authentification', loginImport.data.authentification); ```

At the end of the file, you have to chose a port to start the server.

#### In the folder function :
You're gonna find each files for each functions needed.

In each "index.js" you have to import the packages that you need (like in app.js).

Then you're gonna declare a variable (``` let methods = {} ``` for us) called as you want, and this variable is gonna contains all your functions.

Once you'll finish your functions, you'll have to export them with ``` exports.data = methods ``` (replace methods by your variable).
And they are gonna get called when someone is gonna use the correct url in the front !

Each funtion is returning a JSON, the index of the returned value is "response".

### Front

#### In app.js
Like in the back (or other frameworks) you're gonna have to import what you want to use, like the react's functions, or yours, or your components.

#### In the folder actions
You're gonna find all the url's calling and the return of the datas.

You'll have to create a function, with parameters (if you have to), then you're gonna call an url, with the method of your choice (``` POST ``` or ``` GET ```).

Then you're gonna set a header (to avoid CORS errors), and setup the datas that you want to send.

The promises ``` .then ``` are the comeback of the information from the back (as JSON).

And you have to export the function, like this, it's gonna get import in the folder "containers".

#### In the folder containers
Don't forget to import the functions (and the css, or the images if you want them)

Then you'll have to create a variable (or a cons) with the value returned from the function (``` const resp = await authentification(username, password); ```) and after this, you could use it.

Then in your main function, you're gonna render your page, with the value in JS, and your operations.

Done with "React-navigation", not exactly the same method to render things than in ReactJS. 

Don't forget to export it with ``` export default loginContainer;```.
