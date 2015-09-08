//prints message with badge count and points 
function printMessage(username, badgeCount, points) {
	var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in Javascript";
	console.log(message);}

//prints different tpypes of error messages
function printError(error) {
	console.error(error.message)};

var http = require("http");

function getProfile(username) {
	var request = http.get("http://teamtreehouse.com/" + username + ".json", function(response) {
		var body = "";
		response.on("data", function (chunk) {
			body += chunk;})
		response.on("end", function() {
		if (response.statusCode === 200) {
			try {
				//parses data and prints message
				var profile = JSON.parse(body);
				printMessage(username, profile.badges.length, profile.points.JavaScript);}
			//catches possible parsing error
			catch(error) {
				printError(error);}}
		else {
			//prints error if there's a status code error
			printError({message: "No profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"})}})})

//prints error in case of connection error
request.on("error", printError);}
module.exports.get = getProfile;

