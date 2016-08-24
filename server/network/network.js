var synaptic = require('synaptic');
var Architect = synaptic.Architect;

//Normalize data
//Input (keywords)
var wordNorm = ["deadline", "rush", "tired", "frustrated", "sorry", "cry", "fine", "ok", "cool", "relax", "hooray", "eager", "good", "love"]

//Output (mood)
var happy     = [0,0,0,0,0,0,1];
var excited   = [0,0,0,0,0,1,0];
var calm      = [0,0,0,0,1,0,0];
var neutral   = [0,0,0,1,0,0,0];
var sad       = [0,0,1,0,0,0,0];
var annoyed   = [0,1,0,0,0,0,0];
var stressed  = [1,0,0,0,0,0,0];

var wordList = {
  love: "love",
  good: "good",
  eager: "eager",
  hooray: "hooray",
  relax : "relax",
  cool: "cool",
  ok: "ok",
  fine: "fine",
  cry: "cry",
  sorry: "sorry",
  frustrated: "frustrated",
  tired: "tired",
  rush: "rush",
  deadline: "deadline"
}

//Create architecture for network
var myNet = new Architect.Perceptron(14, 10, 7); //14 inputs, 10 hidden neurons and 7 outputs

//Training data
var trainingSet = [
  {
    input: [0,0,0,0,0,0,0,0,0,0,0,0,0,1], //love
    output: [0,0,0,0,0,0,1] //happy
  },
  {
    input: [0,0,0,0,0,0,0,0,0,0,0,0,1,0], //good
    output: [0,0,0,0,0,0,1] //happy
  },
  {
    input: [0,0,0,0,0,0,0,0,0,0,0,1,0,0], //eager
    output: [0,0,0,0,0,1,0] //excited
  },
  {
    input: [0,0,0,0,0,0,0,0,0,0,1,0,0,0], //hooray
    output: [0,0,0,0,0,1,0] //excited
  },
  {
    input: [0,0,0,0,0,0,0,0,0,1,0,0,0,0], //relax
    output: [0,0,0,0,1,0,0] //calm
  },
  {
    input: [0,0,0,0,0,0,0,0,1,0,0,0,0,0], //cool
    output: [0,0,0,0,1,0,0] //calm
  },
  {
    input: [0,0,0,0,0,0,0,1,0,0,0,0,0,0], //ok
    output: [0,0,0,1,0,0,0] //neutral
  },
  {
    input: [0,0,0,0,0,0,1,0,0,0,0,0,0,0], //fine
    output: [0,0,0,1,0,0,0] //neutral
  },
  {
    input: [0,0,0,0,0,1,0,0,0,0,0,0,0,0], //cry
    output: [0,0,1,0,0,0,0] //sad
  },
  {
    input: [0,0,0,0,1,0,0,0,0,0,0,0,0,0], //sorry
    output: [0,0,1,0,0,0,0] //sad
  },
  {
    input: [0,0,0,1,0,0,0,0,0,0,0,0,0,0], //frustrated
    output: [0,1,0,0,0,0,0] //annoyed
  },
  {
    input: [0,0,1,0,0,0,0,0,0,0,0,0,0,0], //tired
    output: [0,1,0,0,0,0,0] //annoyed
  },
  {
    input: [0,1,0,0,0,0,0,0,0,0,0,0,0,0], //rush
    output: [1,0,0,0,0,0,0] //stressed
  }
  {
    input: [1,0,0,0,0,0,0,0,0,0,0,0,0,0], //deadline
    output: [1,0,0,0,0,0,0] //stressed
  }
];

//Training options
var trainingOptions = {
  rate: .1, //learning rate for the training
  iterations: 20000,  //max # of iterations
  error: .005 //minimum error that can be reached during training, if achieved, training stops
};

//Train data set to network
myNet.trainer.train(trainingSet, trainingOptions); //daily

//Parse through each user's notes for that day to identify any keywords
var findKeywords = function(userArray){ //weekly array of objects with daily stringified notes
  var keywords = { monday: [], tuesday:[], wednesday:[], thursday:[], friday:[], saturday:[], sunday:[] }
  userArray.forEach(function(dayObj){
    for(var day in dayObj){
      dayObj[day].split(" ").forEach(function(word){ //need to account for punctuation before or after a keyword
        for(var key in wordList) {
          if(word === wordList[key]){
            keywords[day].push(word);
          }
        }
      })
    }
  })
  return keywords; //{monday: ["love", "good"], tuesday: ["tired"]}
}

var normWeeklyKeywords = function(weeklyWords){
  var result = {}
  //Normalize DAILY moods
  var normDailyKeywords = function(keywordArr){ // ["love", "good"]
    var normalized = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    keywordArr.forEach(function(word){
      if(wordList[word]){
        normalized[wordNorm.indexOf(word)] = 1;
      }
    })
    return normalized; //normalizes correctly
  }

  for(var day in weeklyWords){
    result[day] = normDailyKeywords(weeklyWords[day]);
  }
  return result; //should be: {monday:[0,0,...1],..sunday:[0,0...1]}
}

//Activate as needed
//returns array with normalized moods
//The input in activate should come from the notes
var dailyMood = myNet.activate([1,1,0,0,0,0,0,0,0,0,0,0,0,0]); //fed the activate fx -> "rush" & "deadline" keywords; yields approx: [1,0,0,0,0,0,0] aka stresssed

//console.log("daily mood is: " + dailyMood);

var moods = {
  "happy": happy,
  "excited": excited,
  "calm": calm,
  "neutral": neutral,
  "sad": sad,
  "annoyed": annoyed,
  "stressed": stressed
}

//console.log(moods);
//Input is the dailyMood (above)
var moodTranslator = function(input){
  //find index of mood with highest
  var moodIndex = input.indexOf(Math.max.apply(Math, input));
  //console.log("moodIndex is: " + moodIndex);
  for(var mood in moods) {
    if(mood[moodIndex] === 1) {
      output = mood;
    }
  }
  return mood;
}

console.log("mood translated is: " + moodTranslator(dailyMood));
var currentMood = moodTranslator(dailyMood)

//Input (keywords)
// var wordNorm = {
// love            :[0,0,0,0,0,0,0,0,0,0,0,0,0,1],
// good            :[0,0,0,0,0,0,0,0,0,0,0,0,1,0],
// eager           :[0,0,0,0,0,0,0,0,0,0,0,1,0,0],
// hooray          :[0,0,0,0,0,0,0,0,0,0,1,0,0,0],
// relax           :[0,0,0,0,0,0,0,0,0,1,0,0,0,0],
// cool            :[0,0,0,0,0,0,0,0,1,0,0,0,0,0],
// ok              :[0,0,0,0,0,0,0,1,0,0,0,0,0,0],
// fine            :[0,0,0,0,0,0,1,0,0,0,0,0,0,0],
// cry             :[0,0,0,0,0,1,0,0,0,0,0,0,0,0],
// sorry           :[0,0,0,0,1,0,0,0,0,0,0,0,0,0],
// frustrated      :[0,0,0,1,0,0,0,0,0,0,0,0,0,0],
// tired           :[0,0,1,0,0,0,0,0,0,0,0,0,0,0],
// rush            :[0,1,0,0,0,0,0,0,0,0,0,0,0,0],
// deadline        :[1,0,0,0,0,0,0,0,0,0,0,0,0,0]
// }
