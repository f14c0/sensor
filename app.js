var express 		= require('express')
var app 		= express()
var record		= require('./models/record.js')
var record_model	= new record()
var routes 		= require('./routes/devices.js')
var io      		= require('./lib/sockets.js').listen(app)
var fs 			= require('fs');

/**/
/*app config*/
app.configure(function () {
	app.use(express.bodyParser())
  	app.use(express.methodOverride())
  	app.use(app.router)
})

//Specify where the static content is
app.use(express.static('static', __dirname + '/static'))

/*Init Model*/
record_model.connect()

/*Init Routes*/
routes.init(app)

