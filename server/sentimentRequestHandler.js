var normWeeklyKeywords = require('./network/network.js').normWeeklyKeywords;

var dummyData = {
  monday: ['ok', 'love', 'eager', 'fine', 'rush', 'hurray'],
  tuesday: ['cry', 'sorry', 'sorry', 'frustrated', 'tired', 'tired', 'fine'],
  wednesday: ['eager', 'fine', 'frustrated', 'fine', 'ok'],
  thursday: ['eager', 'fine', 'rush', 'deadline', 'tired', 'ok', 'cry'],
  friday: ['ok', 'cool', 'cool', 'relax', 'eager', 'good', 'love'],
  saturday: ['love', 'love', 'eager', 'hurray', 'good', 'cool', 'fine'],
  sunday: ['relax', 'cool', 'ok', 'fine', 'relax', 'tired', 'ok', 'hurray']
}


exports.sendBackData = function(req, res, next){
  // console.log(normWeeklyKeywords(dummyData));
  console.log(normWeeklyKeywords(dummyData));
  res.status(200).send(normWeeklyKeywords(dummyData));
}

