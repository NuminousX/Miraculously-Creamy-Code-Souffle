const express = require("express")
const fs = require("fs")
const app = express()
const bodyParser = require('body-parser');

app.set("view engine", "pug")
app.set("views", __dirname + "/views")


app.use(bodyParser.urlencoded({ extended: false }))

//this is the part that renders the form page with the search bar
app.get ("/form", (request, response) =>{
	console.log("about to render a form with a search bar")

	response.render("form")
})
    
app.post('/form', (request,response) => {
    console.log(request.body )
    
    fs.readFile(__dirname + "/users.json", (error, data) => {
		if (error) throw error
			// error ? throw error
		let parseData = JSON.parse(data)
		response.render("result", {data:parseData} )
	})
    

})

// const first = request.body.firstname;
    // const last = request.body.lastname;
    // const mail = request.body.email;

// Maybe use response.send

 // json.users.push = username;
 //    fs.writeFile("./storage.json", JSON.stringify(json, null, 4) , 'utf-8');
 //    delete require.cache[require.resolve('./storage.json')];
 //    json = require("./storage.json");


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
	console.log("server running")
})