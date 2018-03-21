$(document).ready(function(){
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD52ACuEcN4oukoZED01Lr272Dj9kKe9Ko",
    authDomain: "trainproject-8b8ae.firebaseapp.com",
    databaseURL: "https://trainproject-8b8ae.firebaseio.com",
    projectId: "trainproject-8b8ae",
    storageBucket: "trainproject-8b8ae.appspot.com",
    messagingSenderId: "43663787626"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on("click", function(){ 
      var name = $('#nameInput').val().trim();
      var dest = $('#destInput').val().trim();
      var time = $('#timeInput').val().trim();
      var freq = $('#freqInput').val().trim();

      database.ref().push({
          name: name,
          dest: dest,
          time: time,
          freq: freq,
          timeAdded: firebase.database.ServerValue. TIMESTAMP
      });

      $("input").val('');
      return false;

  });

  database.ref().on("child_added", function(childSnapshot){
      var name = childSnapshot.val().name;
      var dest = childSnapshot.val().dest;
      var time = childSnapshot.val().time;
      var freq = childSnapshot.val().freq;

      console.log("Name: " + name);
      console.log("Destination: " + dest);
      console.log("Time: " + time);
      console.log("Frequency: " + freq);

      //Train Time Converted======

      var freq = parseInt(freq);

      //Current Time

      var currentTime = moment();
      console.log("CURRENT TIME: " + moment().format('HH:mm'));
      	//FIRST TIME: PUSHED BACK ONE YEAR TO COME BEFORE CURRENT TIME
    // var dConverted = moment(time,'hh:mm').subtract(1, 'years');
    var dConverted = moment(childSnapshot.val().time, 'HH:mm').subtract(1, 'years');
	console.log("DATE CONVERTED: " + dConverted);
	var trainTime = moment(dConverted).format('HH:mm');
	console.log("TRAIN TIME : " + trainTime);
	
	//DIFFERENCE B/T THE TIMES 
	var tConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
	var tDifference = moment().diff(moment(tConverted), 'minutes');
	console.log("DIFFERENCE IN TIME: " + tDifference);
	//REMAINDER 
	var tRemainder = tDifference % freq;
	console.log("TIME REMAINING: " + tRemainder);
	//MINUTES UNTIL NEXT TRAIN
	var minsAway = freq - tRemainder;
	console.log("MINUTES UNTIL NEXT TRAIN: " + minsAway);
	//NEXT TRAIN
	var nextTrain = moment().add(minsAway, 'minutes');
	console.log("ARRIVAL TIME: " + moment(nextTrain).format('HH:mm A'));
    //console.log(==============================);
   //TABLE DATA=====================================================
 //APPEND TO DISPLAY IN TRAIN TABLE
$('#currentTime').text(currentTime);
$('#trainTable').append(
		"<tr><td id='nameDisplay'>" + childSnapshot.val().name +
		"</td><td id='destDisplay'>" + childSnapshot.val().dest +
		"</td><td id='freqDisplay'>" + childSnapshot.val().freq +
		"</td><td id='nextDisplay'>" + moment(nextTrain).format("HH:mm") +
		"</td><td id='awayDisplay'>" + minsAway  + ' minutes until arrival' + "</td></tr>");
 },

function(errorObject){
    console.log("Read failed: " + errorObject.code)
});
});