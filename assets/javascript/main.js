// Initialize Firebase
var config = {
  apiKey: "AIzaSyC6XxEpgyyXzAMTmLjBskjkqORTAuGO144",
  authDomain: "train-time-test-69571.firebaseapp.com",
  databaseURL: "https://train-time-test-69571.firebaseio.com",
  projectId: "train-time-test-69571",
  storageBucket: "train-time-test-69571.appspot.com",
  messagingSenderId: "119094385593"
};

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Trains
$("#submit-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input")
    .val()
    .trim();
  var destination = $("#destination-input")
    .val()
    .trim();
  var firstTrainTime = moment(
    $("#first-train-time-input")
      .val()
      .trim(),
    "HH:mm"
  ).format("hh:mm a");
  // var frequency = $("#frequency-input")
  //   .val()
  //   .trim();
  var frequency = moment(
    $("#frequency-input")
      .val()
      .trim(),
    "mm"
  ).format("mm");

  // Creates local "temporary" object for holding Train data
  var newTrain = {
    name: trainName,
    dest: destination,
    firstTT: firstTrainTime,
    freq: frequency
  };

  // Uploads Train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  // console.log(newTrain.name);
  // console.log(newTrain.dest);
  // console.log(newTrain.firstTT);
  // console.log(newTrain.freq);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding Train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrainTime = childSnapshot.val().firstTT;
  var frequency = childSnapshot.val().freq;

  var trainInstances = [];
  currentTime = moment().format("hh:mm a");
  var firstNextTrain = "";
  for (var i = 0; i < (24 * 60) / frequency; i++) {
    var nextTrain = false;

    var temp = moment(firstTrainTime, "hh:mm a")
      .add(frequency * i, "minutes")
      .format("HH:mm A");
    if (temp === "00:00 AM") break;
    trainInstances.push(temp);
    var timeDiff =
      moment(temp, "hh:mm a").unix() - moment(currentTime, "hh:mm a").unix();
    if (timeDiff >= 0) {
      nextTrain = true;
      if (firstNextTrain === "") {
        firstNextTrain = temp;
      }
    }
    console.log(
      `Current Time: ${currentTime}, Temp: ${temp} : diff : ${timeDiff} : ===> NextTrain: ${nextTrain}`
    );
  }
  console.log(firstNextTrain);

  // Prettify/Formated Train start time
  // var firstTrainTimeFormated = moment.unix(firstTrainTime).format("hh:mm");

  // Calculate next train time / next arrival
  // var nextTrainTime = moment().diff(moment(firstTrainTime, "hh:mm a"), "h");
  // var nextTrainTime = moment().diff(moment(firstTrainTime, "hh:mm a"), "mm");

  // var nextTrainTime = moment().unix(moment(firstTrainTime, "hh:mm a"), "mm");
  console.log("unaltered first train", firstTrainTime);
  console.log("first time", moment(firstTrainTime, "hh:mm"));
  // console.log("next arrival", nextTrainTime);

  // Calculate minutes away
  // currentTime = moment().format("hh:mm a");
  // console.log("current time:", currentTime);
  // $("#current-time").text(currentTime);
  // // currentTime = moment(currentTime).format("hh:mm");
  // var minutesAway = currentTime - nextTrainTime;
  // var minutesAwayFormated = moment().diff(
  //   moment(minutesAway, "hh:mm"),
  //   "minute"
  // );
  // console.log(minutesAwayFormated);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    // $("<td>").text(moment(firstNextTrain, "hh:mm a")),
    // $("<td>").text(moment(firstNextTrain).format("hh:mm a")),
    $("<td>").text(firstNextTrain),
    // $("<td>").text(minutesAwayFormated)
    $("<td>").text(timeDiff / 60)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
  // $("#train-table").append(newRow);
});
