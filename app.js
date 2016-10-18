const express = require("express")
const fs = require("fs")
const app = express()
const bodyParser = require('body-parser');

app.set("view engine", "pug")
app.set("views", __dirname + "/views")


app.use(bodyParser.uurlencoded({ extended: false }))


app.get('/form', (request, response) => {
	console.log('GET /')

})

    
app.post('/', (request,response) => {
    console.log('POST /');

})
   

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

//this is the part that renders the form page with the search bar
app.get ("/form", (request, response) =>{
	console.log("about to render a form with a search bar")

	response.render("form")
})


// the listening port and a message to show you your app is running
app.listen(8000, () => {
	console.log("server running")
})