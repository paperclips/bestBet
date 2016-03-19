import io from 'socket.io-client/socket.io';

import zones from './zoneHandler.js';
import zoneCalc from '../components/zoneCalculator.js';

//Change to real user location once it's implemented
const LATITUDE = 37.7832096; 
const LONGITUDE = -122.4091516;

const SERVER_ADDRESS = 'http://localhost:3000';

export function connectSocket(){
  const socket = io.connect(SERVER_ADDRESS, { jsonp: false });

  // Emit an event to server
  socket.on('connect',function(){
    //To receive establishment data, uncomment this line
    let userZone = zoneCalc.zoneCalculator(LATITUDE,LONGITUDE);
    var mapZones = zones.getSurroundingZones(userZone);

    socket.emit('Get establishments',{zones: mapZones});  
  });

  socket.on('New Establishments', function(newData){
    //New establishment and votes data
    console.log(newData);
    var establishmentObject = {};
    

    // [ { id: 23,
    //    name: 'The Fine Mousse',
    //    imageUrl: 'https://s3-media3.fl.yelpcdn.com/bphoto/CLOCdeLQN1zlWY5IKbGUbQ/ms.jpg',
    //    yelpUrl: 'http://www.yelp.com/biz/the-fine-mousse-san-francisco?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=FW8Mc7pREwM4wb6tDXCqQQ',
    //    yelpId: 'the-fine-mousse-san-francisco',
    //    yelpCategory: 'newamerican',
    //    yelpRating: 4.5,
    //    yelpReviewCount: 47,
    //    latitude: 37.79539,
    //    longitude: -122.41306,
    //    address: '1098 Jackson St, San Francisco, CA 94133',
    //    phoneNumber: '+1-415-908-1988',
    //    industryId: 1,
    //    zoneNumber: 3007 },

   //  votes: 
   // [ { id: 1,
   //     establishmentId: 13,
   //     traitId: 9,
   //     userId: 1,
   //     voteValue: false,
   //     time: '2016-03-19T04:45:57.938Z',
   //     zoneNumber: 5005 },

  })

};

// Map { establishments: Map {id: Map { name: String, yelpId: String, ..., votes: Map {traidId1: Map {totalPosPct: Number, realtime: List [Map {voteValue: Number, time: datetime}, 
    //                                                                                                                                         Map {voteValue: Number, time: datetime}...]},
    //                                                                                     traidId2: Map {totalPosPct: Number, realtime: List [Map {voteValue: Number, time: datetime}, 
    //
