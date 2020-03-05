import React, { useEffect, useRef,useState } from "react";
import Config from "Config";
import axios from "axios";
import { handleError } from "Store/helper";
import GoogleMapReact from 'google-map-react';


const google = window.google;

const Map = props => {
  const mapRef = useRef(null);
  const [mapPermission,setMapPermission] = useState(null);
  const [ deseaseName,setDeseaseName ] = useState(null);

  useEffect(()=>{
    if(navigator.geolocation){
      (async()=>{
        const permission = await navigator.permissions.query({name:'geolocation'});
        setMapPermission(permission.state);
        permission.onchange = ()=>{
          setMapPermission(permission.state);
        }
      })();
    }
  },[])

  const handleSearch = ( )=> {

    // TODO : Validate search should not empty

    // TODO : Search Nearby Hospital


  }
  return (
    <div>
      </div>
        /* {state.isLoaded && (
       
          <button type="submit" onSubmit={handleSearch}>Search</button>
        {Boolean(mapPermission==='granted' && state.isLoaded) && (
          <Map
            options={{
              center: { lat: state.latitude, lng: state.logitude },
              zoom: 13
            }}
          />
        )}
        {Boolean(mapPermission!=='granted' && state.isLoaded) && (
          <div>
            <p>Please enable Geolocation permission</p>
          </div>
        )}
      </div> */
  );
};
export default Map;
