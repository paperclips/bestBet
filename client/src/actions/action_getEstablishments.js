//Receives array of zone numbers
//calls function to get establishment data from server
//dispatch function that returns {type: UPDATE_EST, payload: estabs}

import GET_EST from './constants.js';
import sendReq from './utils.js';
import zoneHandler from './zoneHandler.js';

