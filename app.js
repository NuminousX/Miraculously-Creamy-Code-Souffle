const express = require("express")
const fs = require("fs")
const app = express()
const bodyParser = require('body-parser');

app.set("view engine", "pug")
app.set("views", __dirname + "/views")


app.use(bodyParser.urlencoded({ extended: false }))

//this is the part that renders the form page with the search bar
app.get ("/form", (request, response) =>{
	console.log("Rendering a form ")

	response.render("form")
})

app.post('/form', (request,response) => {
	console.log(request.body )

	fs.readFile(__dirname + "/users.json", (error, data) => {
		if (error) throw error
			// error ? throw error
		let parseData = JSON.parse(data)
		let searchResults = []
		for (var i = 0; i < parseData.length; i++) {
			if (request.body.firstname == parseData[i].firstname || request.body.lastname == parseData[i].lastname ) {
				searchResults.push (parseData[i])
				// else if (request.body.lastname == parseData[i].lastname) {
				// 	searchResults.push (parseData[i])
				
			}
		}
	
		console.log(searchResults)
		response.render("result", {data: searchResults} )

		//for loop to go though parsedata
		// within loop check if user is equal to input
		// if that is the case render result with the data of that user 
		
	})
})


//The create user route to create and add a new user to the json file
app.get ("/createUser", (request, response) => {
	console.log("Creating new user")

	response.render("createUser")
})

app.post('/createUser', (request,response) => {
	console.log(request.body )

	fs.readFile(__dirname + "/users.json", (error, data) => {
		if (error) throw error
			// error ? throw error
		let parseData = JSON.parse(data)
		let newUser = parseData
		newUser.push(request.body)
		
		console.log(newUser)
		
		fs.writeFile(__dirname + "/users.json", JSON.stringify(newUser), (error, data) => {
			if (error) throw error

				console.log('wrote to the file')

			response.redirect("index")
		})

	})

})



	// make a form with 3 fields that lets you create a new user
	// the new user should be added to the user.json when clicking submit
	// it should first read the file and then add to it
	//it should not overwrite the current data stored in the json file
	// it should eventually read the file, write the new data to the json file then redirect to the new index page
	// JSON.stringify


// 	app.get('/category', function(req, res) {
//   req.session.valid = true;
//   res.redirect('/');
// });

 // json.users.push = username;
 //    fs.writeFile("./storage.json", JSON.stringify(json, null, 4) , 'utf-8');
 //    delete require.cache[require.resolve('./storage.json')];
 //    json = require("./storage.json");




/* previous Notes and code pieces I might find usefull

const first = request.body.firstname;
     const last = request.body.lastname;
     const mail = request.body.email;
     */

// Maybe use response.send

// app.post('/game', function (req, res) {
//     res.render('some-file', { name: req.body.name });
// });


//this is the part that will render the index page when you type /index after the localhost
app.get ("/index", (request, response) => {

	console.log( "about to render the index page")

	fs.readFile(__dirname + "/users.json", (error, data) => {
		if (error) throw error
			// error ? throw error
		let parseData = JSON.parse(data)
		console.log(parseData)
		response.render("index", {data:parseData} )
	})

})

// the listening port and a message to show you your app is running
app.listen(8000, () => {
	console.log("Local server running")
});