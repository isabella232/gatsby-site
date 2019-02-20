import React from 'react';
import {GoogleMap, Marker, InfoWindow, withGoogleMap, withScriptjs} from 'react-google-maps';

const GoogleMapsWrapper = withScriptjs(withGoogleMap(props => {
    const {onMapMounted, ...otherProps} = props;
    return <GoogleMap {...otherProps} ref={c => {
        onMapMounted && onMapMounted(c)
    }}>{props.children}</GoogleMap>
}));

const markers = [{
        name: 'Hereweg 120, Groningen',
        position: {
            lat: 53.2064,
            lng: 6.5740
        }
    },
    {
        name: 'Meester P.J. Troelstraweg 149, Leeuwarden',
        position: {
            lat: 53.2152674,
            lng: 5.7794542
        }
    }
];

export default class GoogleMaps extends React.Component {
    _mapRef = null;

    _handleMapMounted = (c) => {
        if (!c || this._mapRef) return;
        this._mapRef = c;

        const bounds = new window.google.maps.LatLngBounds();

        markers.forEach(marker => {
            let {lat, lng} = marker.position;

            bounds.extend(new window.google.maps.LatLng(lat, lng));
        });

        this._mapRef.fitBounds(bounds)
        this._mapRef.panToBounds(bounds)
    };

    _handleBoundsChanged = () => {

    };

    render() {
        return (
            <GoogleMapsWrapper
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAUxvzle5FGXaec9N2wiePOBmB3IyAYzxY"
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{height: `100%`}}/>}
                defaultZoom={3}
                defaultCenter={{lat: 53.2064, lng: 6.5740}}
                onMapMounted={this._handleMapMounted}
                onBoundsChanged={this._handleBoundsChanged}>
                {markers.map(( marker, key ) => {
                    const lat = marker.position.lat;
                    const lng = marker.position.lng;
                    return (<Marker key={key} position={{ lat: lat, lng: lng}} >
                        <InfoWindow><span>{marker.name}</span></InfoWindow>
                    </Marker>)
                })}
                {/*<Marker position={{lat: 53.2152674, lng: 5.7794542}} />*/}
            </GoogleMapsWrapper>
        )
    }
}