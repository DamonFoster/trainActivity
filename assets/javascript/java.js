var config = {
	apiKey: "AIzaSyCnGq1BCxGTMHEZ1_Icf3_H6Dxt_YlkLiQ",
    authDomain: "traintracker-a9044.firebaseapp.com",
    databaseURL: "https://traintracker-a9044.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "805022617906"
};
firebase.initializeApp(config);

var database = firebase.database();


// 2. Button for adding Employees
$("#addTrain").on("click", function(){

	// Grabs user input
	var trainName = $("#TrainNameInput").val().trim();
	var destination = $("#DestInput").val().trim();
	var startTime = moment($("#startInput").val().trim(), "DD/MM/YY").format("X");
	var frequency = $("#FreqInput").val().trim();

	// Creates local "temporary" object for holding employee data
	var newTrain = {
		name:  trainName,
		Destination: destination,
		firstTrain: startTime,
		freq: frequency
	}

	// Uploads employee data to the database
	database.ref().push(newTrain);

	// Logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.Destination);
	console.log(newTrain.firstTrain);
	console.log(newTrain.freq);

	// Alert
	alert("Train successfully added");

	// Clears all of the text-boxes
	$("#TrainNameInput").val("");
	$("#DestInput").val("");
	$("#startInput").val("");
	$("#FreqInput").val("");

	// Prevents moving to new page
	return false;
});


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().Destination;
	var trainTime = childSnapshot.val().firstTrain;
	var trainFreq = childSnapshot.val().freq;

	// Employee Info
	console.log(trainName);
	console.log(trainDest);
	console.log(trainTime);
	console.log(trainFreq);

	// Prettify the employee start
	var trainStart = moment.unix(trainTime).format("HH:mm");
	// Calculate the months worked using hardconre math
	// To calculate the months worked
	var next = moment().diff(moment.unix(empStart, 'X'), "minutes");
	console.log(next);

	// Calculate the total billed rate
	var minsAway = 0;
	console.log(minsAway);

	// Add each train's data into the table
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + next + "</td><td>" + minsAway + "</td></tr>");

});