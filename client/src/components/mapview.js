import React, {
  MapView,
  Component,
} from 'react-native';

import MapView from 'react-native-maps';

export default class Map extends Component {

  componentDidMount() {
    let properties = this.props;


    let success = (position) => {
      initialGeoLocation(properties, position);
    }

    let error = (error) => {
      console.log('ERROR', error);
    };

    let watchCallback = (position) => {
      console.log("UPDATING POSITION", position);
      // updateGeoLocation(socket, position)
    };

    let options = {
    };


    navigator.geolocation.getCurrentPosition(success, error);

  }

  render(){
    return (
     <MapView
       style={styles.container}
       showsUserLocation={true} 
       followUserLocation={true}
     />
    ); 
  }
};