//Express server
var express     = require('express');
var app         = express();
var http        = require('http').Server(app);
var io          = require('socket.io-client');
var NUM_OF_ROWS = require('./services/zoneHandler').NUM_OF_ROWS;
var NUM_OF_COLS = require('./services/zoneHandler').NUM_OF_COLS;

//var SERVER_URL = 'http://104.131.12.172:3000';
var SERVER_URL = 'http://localhost:3000';

// Connect to server via socket
var socket = io.connect(SERVER_URL, { jsonp: false });

socket.on('voteAdded',function(voteDetails){
  //vote object is {establishmentId, userId, time, zoneNumber, votes:{1: 0 or 1, 2: 0 or 1, 3: 0 or 1...}}
  console.log('Received vote ', 'and userId:',voteDetails.userId,'at',voteDetails.time);
});

socket.on('New Establishments',function(estabs){
  //estabs object is {establishments:estabObject}
  console.log('Received estabs sent to bot socket; Total estabs received', Object.keys(estabs.establishments).length);
});

var createNewVote = function(){
  //vote object is {establishmentId, userId, time, votes:{1: 0 or 1, 2: 0 or 1, 3: 0 or 1...}}
  var vote = {};
  //zoneNumbers around Hack Reactor for live demo
  var estArray = [ 13,
  18,
  24,
  33,
  34,
  38,
  42,
  43,
  48,
  64,
  68,
  70,
  73,
  74,
  82,
  90,
  92,
  93,
  101,
  107,
  111,
  115,
  125,
  129,
  130,
  132,
  137,
  144,
  151,
  153,
  159,
  181,
  182,
  183,
  185,
  186,
  188,
  192,
  193,
  195,
  196,
  200,
  202,
  203,
  206,
  212,
  228,
  233,
  235,
  239,
  256,
  260,
  334,
  336,
  341,
  387,
  388,
  389,
  390,
  391,
  434,
  435,
  436,
  437,
  438,
  439,
  440,
  441,
  442,
  443,
  444,
  445,
  446,
  452,
  453,
  455,
  456,
  460,
  461,
  496,
  497,
  498,
  500,
  501,
  531,
  533,
  574,
  584,
  585,
  592,
  595,
  604,
  611,
  614,
  615,
  618,
  633,
  640,
  647,
  655,
  699,
  700,
  701,
  706,
  707,
  711,
  713,
  714,
  751,
  756,
  758,
  811,
  828,
  832,
  837,
  844,
  846,
  881,
  883,
  889,
  895,
  896,
  902,
  904,
  909,
  914,
  916,
  919,
  923,
  1001,
  1002,
  1004,
  1107,
  1125,
  1155,
  1156,
  1157,
  1165,
  1167,
  1188,
  1190,
  1191,
  1199,
  1206,
  1210,
  1308,
  1309,
  1345,
  1349,
  1351,
  1352,
  1354,
  1374,
  1376,
  1377,
  1380,
  1387,
  1408,
  1423,
  1424,
  1425,
  1447,
  1454,
  1457,
  1458,
  1469,
  1470,
  1473,
  1474,
  1477,
  1525,
  1526,
  1535,
  1538,
  1562,
  1567,
  1569,
  1579,
  1580,
  1581,
  1582,
  1590,
  1595,
  1632,
  1634,
  1636,
  1639,
  1654,
  1662,
  1668,
  1669,
  1699,
  1700,
  1734,
  1739,
  1744,
  1752,
  1758,
  1771,
  1780,
  1783,
  1784,
  1799,
  1802,
  1803,
  1811,
  1813,
  1814,
  1852,
  1853,
  1858,
  1883,
  1885,
  1887,
  1894,
  1895,
  1909,
  1912,
  1979,
  1983,
  1985,
  1989,
  2008,
  2021,
  2089,
  2090,
  2092,
  2098,
  2153,
  2207,
  2211,
  2214,
  2267,
  2270,
  2318,
  2319,
  2320,
  2326,
  2351,
  2357,
  2358,
  2371,
  2406,
  2422,
  2424,
  2428,
  2431 ];

  vote.establishmentId = estArray[Math.floor(Math.random()*estArray.length)];
  vote.userId = Math.floor(Math.random()*40+1);
  vote.time = new Date();
  vote.votes = {};

  // socket.emit('joinRooms', [vote.zoneNumber]);
  
  for(var i=1;i<=9;i++){
    vote.votes[i] = Math.round(Math.random());
  }
  socket.emit('userVoted',vote);
  console.log(vote.userId, 'voted on', vote.establishmentId);
};

var requestEstabs = function(){
  //request object is {userId, zones: [array of zones]}
  var request = {};
  request.userId = Math.floor(Math.random()*20+1);
  request.zones = [];
  for(var i=1;i<=9;i++){
    while(true){
      var zone = Math.floor(Math.random()*NUM_OF_ROWS)*1000 + Math.floor(Math.random()*NUM_OF_COLS);
      if(request.zones.indexOf(zone) === -1){
        request.zones.push(zone);
        break;
      }
    }
  };
  socket.emit('Get Establishments', request);
};


//Bot will live on port 8000
var port = process.env.PORT || 8000;

//Start the bot:
http.listen(port);
console.log('botServer listening on port ' + port);
setInterval(createNewVote,1000);
//setInterval(requestEstabs,1000);
