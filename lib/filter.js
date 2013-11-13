var _               = require('underscore')
var accepted_classes= require('./accepted.json')
var filter = function(){

	this.filterHex = function(hex){
		//Substring 'AAAAAA' of 0xAAAAAAL
		var binary = ""
		binary= hexToBin(hex.substring(2,8))
		console.log(binary)
		return checkAccept(binary)
	}

	function hexToBin(hex){
		var res=""
		len= hex.length
		for (i=0;i<len;i++){
			hi = String(hex).charAt(i)
			switch (hi)
			{
			case '0':
				res +='0000'
				break;
			case '1':
				res +='0001'
				break;
			case '2':
				res +='0010'
				break;
			case '3':
				res +='0011'
				break;
			case '4':
				res +='0100'
				break;
			case '5':
				res +='0101'
				break;
			case '6':
				res +='0110'
				break;
			case '7':
				res +='0111'
				break;
			case '8':
				res +='1000'
				break;
			case '9':
				res +='1001'
				break;
			case 'a':
				res +='1010'
				break;
			case 'b':
				res +='1011'
				break;
			case 'c':
				res +='1100'
				break;
			case 'd':
				res +='1101'
				break;
			case 'e':
				res +='1110'
				break;
			case 'f':
				res +='1111'
				break;
			}
		}
		return res
	}
	function checkAccept(binary){
		//based on https://www.bluetooth.org/en-us/specification/assigned-numbers/baseband
		bits_major=binary.substring(11,16)
		bits_minor=binary.substring(16,22)
		console.log(bits_major + " " +  bits_minor)
		major_class ='Undefinied'
		minor_class ='Undefinied'
		classes ={}
		switch(bits_major){
			case '00000':
				major_class='Miscellaneous'
				minor_class='Miscellaneous'
			break
			case '00001':
				major_class='Computer'
				switch(bits_minor){
					case '000000':
						minor_class='Uncategorized'
					break
					case '000001':
						minor_class='Desktop workstation'
					break
					case '000010':
						minor_class='Server-class computer'
					break
					case '000011':
						minor_class='Laptop'
					break
					case '000100':
						minor_class='Handheld PC/PDA'
					break
					case '000101':
						minor_class='Palm-size PC/PDA'
					break
					case '000110':
						minor_class='Wearable computer'
					break
					case '000111':
						minor_class='Tablet'
					break
					default: 
						minor_class='Reserved'
					break
				}
			break
			case '00010':
				major_class='Phone'
				switch(bits_minor){
					case '000000':
						minor_class='Uncategorized'
					break
					case '000001':
						minor_class='Cellular'
					break
					case '000010':
						minor_class='Cordless'
					break
					case '000011':
						minor_class='Smartphone'
					break
					case '000100':
						minor_class='Wired modem or voice gateway'
					break
					case '000101':
						minor_class='Common ISDN access'
					break
					default: 
						minor_class='Reserved'
					break
				}
			break
			case '00011':
				major_class='LAN'
				switch(bits_minor){
					case '000000':
						minor_class='Fully available'
					break
					case '001000':
						minor_class='1% to 17% utilized'
					break
					case '010000':
						minor_class='17% to 33% utilized'
					break
					case '011000':
						minor_class='33% to 50% utilized'
					break
					case '100000':
						minor_class='50% to 67% utilized'
					break
					case '101000':
						minor_class='67% to 83% utilized'
					break
					case '110000':
						minor_class='83% to 99% utilized'
					break
					case '111000':
						minor_class='No service available'
					break
					default: 
						minor_class='Reserved'
					break
				}
			break
			case '00100':
				major_class='Audio/Video'
				switch(bits_minor){
					case '000000':
						minor_class='Uncategorized'
					break
					case '000001':
						minor_class='Wearable Headset Device'
					break
					case '000010':
						minor_class='Hands-free Device'
					break
					case '000011':
						minor_class='(Reserved)'
					break
					case '000100':
						minor_class='Microphone'
					break
					case '000101':
						minor_class='Loudspeaker'
					break
					case '000110':
						minor_class='Headphones'
					break
					case '000111':
						minor_class='Portable Audio'
					break
					case '001000':
						minor_class='Car audio'
					break
					case '001001':
						minor_class='Set-top box'
					break
					case '001010':
						minor_class='HiFi Audio Device'
					break
					case '001011':
						minor_class='VCR'
					break
					case '001100':
						minor_class='Video Camera'
					break
					case '001101':
						minor_class='Camcorder'
					break
					case '001110':
						minor_class='Video Monitor'
					break
					case '001111':
						minor_class='Video Display and Loudspeaker'
					break
					case '010000':
						minor_class='Video Conferencing'
					break
					case '010001':
						minor_class='(Reserved)'
					break
					case '010010':
						minor_class='Gaming/Toy'
					break
					default: 
						minor_class='Reserved'
					break
				}
			break
			case '00101':
				major_class='Peripheral'
				switch(bits_minor){
					case '000000':
						minor_class='Uncategorized'
					break
					case '000001':
						minor_class='Joystick'
					break
					case '000010':
						minor_class='Gamepad'
					break
					case '000011':
						minor_class='Remote control'
					break
					case '000100':
						minor_class='Sensing device'
					break
					case '000101':
						minor_class='Digitizer tablet'
					break
					case '000110':
						minor_class='Card Reader'
					break
					case '000111':
						minor_class='Digital Pen'
					break
					case '001000':
						minor_class='Handheld scanner'
					break
					case '001001':
						minor_class='Handheld gestural input device'
					break
					default: 
						minor_class='Reserved'
					break
				}
			break
			case '00110':
				major_class='Imaging'
				if(String(bits_minor).indexOf('1') !== -1){
					minor_class=''
				}
				if(String(bits_minor).charAt(0)==='1'){
					minor_class+='Printer '
				}
				if(String(bits_minor).charAt(1)==='1'){
					minor_class+='Scanner '
				}
				if(String(bits_minor).charAt(2)==='1'){
					minor_class+='Camera '
				}
				if(String(bits_minor).charAt(3)==='1'){
					minor_class+='Display '
				}
			break
			case '00111':
				major_class='Wearable'
				switch(bits_minor){
					case '000000':
						minor_class='Uncategorized'
					break
					case '000001':
						minor_class='Wristwatch'
					break
					case '000010':
						minor_class='Pager'
					break
					case '000011':
						minor_class='Jacket'
					break
					case '000100':
						minor_class='Helmet'
					break
					case '000101':
						minor_class='Glasses'
					break
					default: 
						minor_class='Reserved'
				}
			break
			case '01000':
				major_class='Toy'
				switch(bits_minor){
					case '000001':
						minor_class='Robot'
					break
					case '000010':
						minor_class='Vehicle'
					break
					case '000011':
						minor_class='Doll / Action figure'
					break
					case '000100':
						minor_class='Controller'
					break
					case '000101':
						minor_class='Game'
					break
					default: 
						minor_class='Reserved'
				}
			break
			case '01001':
				major_class='Health'
				switch(bits_minor){
					case '000000':
						minor_class='Undefinied'
					break
					case '000001':
						minor_class='Blood Pressure Monitor'
					break
					case '000010':
						minor_class='Thermometer'
					break
					case '000011':
						minor_class='Weighing Scale'
					break
					case '000100':
						minor_class='Glucose Meter'
					break
					case '000101':
						minor_class='Pulse Oximeter'
					break
					case '000110':
						minor_class='Heart/Pulse Rate Monitor'
					break
					case '000111':
						minor_class='Health Data Display'
					break
					case '001000':
						minor_class='Step Counter'
					break
					case '001001':
						minor_class='Body Composition Analyzer'
					break
					case '001010':
						minor_class='Peak Flow Monitor'
					break
					case '001011':
						minor_class='Medication Monitor'
					break
					case '001100':
						minor_class='Knee Prosthesis'
					break
					case '001101':
						minor_class='Ankle Prosthesis'
					break
					case '001110':
						minor_class='Generic Health Manager'
					break
					case '001111':
						minor_class='Personal Mobility Device'
					break
					default: 
						minor_class='Reserved'
					break
				}
			break
			case '11111':
				major_class='Uncategorized'
			break

			default:
				major_class='Reserved'
			break
		}
		classes.major_class=major_class
		classes.minor_class=minor_class
		//Check if accepted 
		if(accepted_classes[String(major_class)]){
			majc=String(major_class+'_minor')
			minc =String(minor_class)
			classes.accepted=accepted_classes[majc][minc]
		}
		
		console.log(classes)
		return classes
	}
}
//filter1= new filter()
//filter1.filterHex('0x200404L')
module.exports = filter

