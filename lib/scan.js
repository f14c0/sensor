var noble     = require('noble')
var util      = require ('util')
var events    = require('events')
var self
var _         = require("underscore")
var f         = require('./filter.js')
var filter    = new f()

var scanner =function (){
  self=this
  events.EventEmitter.call(this)

  var timer
  this.start= function(delay){
    var time=delay
    if (delay>0){
      timer=setTimeout(this.stop,1000*time)
    }
    noble.startScanning()
    console.log ('DEBUG - Scan.js: *****Scanning...for '+ time + ' seconds.******')
    self.emit('scanning')
    noble.on('discover', btListener)
  }

  function btListener(peripheral){
    //console.log("DEBUG - scan.js: bt device found  event emited")
    console.log('DEBUG - scan.js: discover event has ' + _.size(noble.listeners('discover'))+ ' listeners')
    var mac =peripheral.uuid.macFormat(2).join(':')
    //filter device
    filter_result=filter.filterHex(String(peripheral.advertisement.device_class))
    if(filter_result.accepted){
      var device_found ={mac:mac,
                        name:peripheral.advertisement.localName,
                        timestamp:new Date().getTime(),
                        device_class:filter_result.major_class + " - " + filter_result.minor_class,
                        rssi:peripheral.rssi}
      self.emit('device_found',device_found)
    }
   }

  String.prototype.macFormat = function(n) {
    var ret = [];
    for(var i=0, len=this.length; i < len; i += n) {
       ret.push(this.substr(i, n))
    }
    return ret
  }

  this.stop = function(){
    if (timer) {
      clearTimeout(timer)
      timer = 0
    }
    noble.stopScanning()
    self.emit('scan_stopped')
    noble.removeAllListeners()
  }
}
scanner.prototype.__proto__ = events.EventEmitter.prototype
module.exports=scanner
