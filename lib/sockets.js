var socketio        = require('socket.io')
var scan            = require('./scan.js')
var bt              = new scan() 
var _               = require("underscore")
var record          = require('../models/record.js')
var record_model    = new record()
var config          = require('../config.json') 

module.exports.listen = function(app){
	server = require('http').createServer(app)
    io = socketio.listen(server)
    io.set('log level',0);
    server.listen(3000)

    //realtime namespace
    realtime = io.of('/realtime')

    realtime.on('connection', function(socket){
        console.log('DEBUG: ' + socket.id + '  conected')

        socket.on('start_scan', function(params){
            //console.log("DEBUG - socket.js: star scan event emited")
            bt.start(params.time)

    		bt.on('device_found',function (device_found){
                //console.log('DEBUG - socket.js: device_found event has ' + _.size(bt.listeners('device_found'))+ ' listeners')
                //console.log("DEBUG - socket.js: bt device found  event emited")
                socket.emit('bt',device_found)
                //Check id save in database is checked
                if(params.db_check){
                    record_model.insertRecord(device_found.mac.toUpperCase(),device_found.device_class,device_found.timestamp,config.location_id,device_found.rssi)
                }
            })

            bt.on('scan_stopped', function(){
                socket.emit('scan_stopped')
                bt.removeAllListeners()
            })
       	})

    	socket.on('stop_scan', function(){
    		bt.stop()
            bt.on('scan_stopped', function(){
                socket.emit('scan_stopped')
                bt.removeAllListeners()
            })
            
        })
        //.removeAllListeners()
        socket.on('disconnect', function() {
            console.log('DEBUG: ' + socket.id + '  disconected')
            socket.removeAllListeners()
            //delete sockets[_.indexOf(sockets,socket.id)]
        })
    })
    return io
}