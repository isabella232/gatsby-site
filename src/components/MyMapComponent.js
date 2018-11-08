import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
        <GoogleMap
            defaultZoom={11}
            defaultCenter={{ lat: 53.210564, lng: 6.179228 }}
        >
            {props.isMarkerShown && <Marker position={{ lat: 53.2064, lng: 6.5740}} />}
            {props.isMarkerShown && <Marker position={{ lat: 53.2152674, lng: 5.7794542}} />}
        </GoogleMap>
    ))

export default MyMapComponent