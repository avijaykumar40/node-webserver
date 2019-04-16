const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const port = process.env.PORT || 3000

var app = express() // Creating an App
app.set('view engine','hbs')
// Partials for command markups with dynamic data
hbs.registerPartials(__dirname + '/views/partials')
// Express middleware
app.use((req, res, next) =>{
    var now = new Date().toString()
	var log = `${now} : ${req.method} ${req.url}`
	console.log(log)
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err)
			console.log('Unable to append to server.log')
	})
	next() // Hanlders will not get fired we we dont execute next()
})

// app.use((req, res, next) =>{
// 	res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'))

// Common parameter in all files
hbs.registerHelper('getCurrentYear', () =>{
	return new Date().getFullYear() 
})

hbs.registerHelper('scremIt', (text) =>{
	return text.toUpperCase() 
})

app.get('/',(req, res) => {
	//res.send('<h1>Hello Express!</h1>')
	// res.send({
	// 	name : 'Vijay',
	// 	likes: ['Biking','Cities']
	// })
	res.render('home.hbs',{
		pageTitle: 'Home Page',
		welcomeMessage : 'Welcome User!',
	})
})

app.get('/about',(req, res) => {
	//res.send('About Page')
	res.render('about.hbs',{
		pageTitle : 'About Page Dynamic',
		})
})

app.get('/bad',(req, res) => {
	res.send({
		errorMessage:'Bad Request'
	})
})


app.listen(port, () =>{
	console.log(`Server is UP in port ${port}`)
})
