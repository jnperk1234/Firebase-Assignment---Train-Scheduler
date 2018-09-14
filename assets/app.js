$(document).ready(function() {
  
 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyCQwm-XWqPmwTA9H72PnB_F-vUCT-TPm-M",
  authDomain: "ricknmortymulti.firebaseapp.com",
  databaseURL: "https://ricknmortymulti.firebaseio.com",
  projectId: "ricknmortymulti",
  storageBucket: "ricknmortymulti.appspot.com",
  messagingSenderId: "800686330494"
};
firebase.initializeApp(config);

  var database = firebase.database();

 

  // First Time (pushed back 1 year to make sure it comes before current time)
   
  // 2. Button for adding Trains
  $("#addTrain").on("click", function(event) {
  		event.preventDefault();

	 // Grabs user input
	  var trainName = $("#nameInput").val().trim();
	  var trainDest = $("#destInput").val().trim();
	  var firstTrain = $("#timeInput").val().trim();
	  var trainFreq = $("#freqInput").val().trim();

	  // Creates local "temporary" object for holding train data
	  var newTrain = {
	  	name: trainName,
	  	destination: trainDest,
	  	start: firstTrain,
	  	frequency: trainFreq
	  };

	  // Uploads train data to the database
  		database.ref().push(newTrain);


	   // Alert
  		alert("Train successfully added");

	 // Clears all of the text-boxes
	  $("#nameInput").val("");
	  $("#destInput").val("");
	  $("#timeInput").val("");
	  $("#freqInput").val("");
  	});

  	// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	  console.log(childSnapshot.val());

	  // Store everything into a variable.
	  var trainName = childSnapshot.val().name;
	  var trainDest = childSnapshot.val().destination;
	  var firstTrain = childSnapshot.val().start;
	  var trainFreq = childSnapshot.val().frequency;


	   // Declare variable
  		var trainFreq;

  		// Time is to be entered on the entry form
   		 var firstTime = 0;

	   var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	    console.log(firstTimeConverted);

	  // Current Time
	    var currentTime = moment();
	    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

	  // Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
	    var tRemainder = diffTime % trainFreq;
	    console.log(tRemainder);

	    // Minute Until Train
	    var tMinutesTillTrain = trainFreq - tRemainder;
	    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	    // Next Train
	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


	  // Add each train's data into the table
	  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + 
	   "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
	});

});