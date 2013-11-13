//Model
//File: models/devices.js

var mongoose 	= require('mongoose')
var schema		= mongoose.Schema
var db_host		= 'mongodb://f14c0:624691@paulo.mongohq.com:10090/records'
var config      = require('../config.json')

var record_schema = new schema({
	mac : 			{type: 	String},
	device_class: 	{type: 	String},
	timestamp: 		{type: 	String},
	sensor_id: 		{type: 	String},
	rssi:     		{type: 	Number}	
})

record_model = mongoose.model(config.location_id+'_record',record_schema)
module.exports.record_model= record_model

var record = function(){

	this.connect=function(){
		/*Connecto to Mongodb*/
		mongoose.connect(db_host,function(err, res){
			if(!err){
				console.log('Connected to databasase, Successfuly!')
			}else{
				console.log('ERROR:' + err);
			}
		})
	}
	this.insertRecord =function(mac,device_class,timestamp,sensor_id,rssi){
		var record = new record_model()
		record.mac=mac
		record.device_class=device_class
		record.timestamp=timestamp
		record.sensor_id=sensor_id
		record.rssi=rssi
		record.save(function(err){
			if(!err){
				console.log(JSON.stringify(record)+' saved to db')
			}else{
				console.log('ERROR: ' + err)
			}
		})
	}
	this.getAllRecords=function(callback){
		record_model.find(function(err,records){
			callback(err,records)
		})
	}

}
module.exports=record