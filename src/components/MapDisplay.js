import React, {Component} from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import NoMapDisplay from './NoMapDisplay';
import {Marker} from 'google-maps-react/dist/components/Marker';

const MAP_KEY = "AIzaSyBSf2q0a4Umr65w17nKsfLOl6L99Vj2DsQ";

class MapDisplay extends Component {
    state = {
        map: null,
        markerProps: [],
        activeMarker: null,
        activeMarkerProps: null,
        showingInfoWindow: false,
        firstDrop: true,
        introAnim: this.props.google.maps.Animation.BOUNCE,
        venueCount: 0
    };

    componentDidMount = () => {}

    saveRealMarker = marker => {
        // Make the call to the props function to store the full reference to the
        // real Google marker object
        this
            .props
            .saveRealMarker(marker);
    }

    componentWillReceiveProps = (props) => {
        // Check if the count of venues has changed
        const venueCountChanged = this.state.venueCount !== props.venues.length
            ? true
            : false;
        // Check if we should be showing the first time marker drop animation
        const introAnim = !this.state.firstDrop
            ? null
            : this.props.google.maps.Animation.DROP;
        // Check if the info window should be showing
        const showingInfoWindow = props.activeMarker && !venueCountChanged
            ? true
            : false;

        this.setState({firstDrop: false, introAnim, activeMarker: props.activeMarker, showingInfoWindow, venueCount: props.venues.length},
            () => {
                if (this.state.activeMarker) this.state.activeMarker.marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
            });
    }

    mapReady = (props, map) => {
        // Save the map reference in state and prepare the location markers
        this.setState({map});
    }

    closeInfoWindow = () => {
        // Set the info window to not be shown
        this.setState({showingInfoWindow: false});
    }

    onMarkerClick = marker => {
        // Make the call to the props function for clicking the marker
        this
            .props
            .clickMarker(marker.id);
    }

    render = () => {
        const style = {
            width: '100%',
            height: '100%'
        }
        const center = {
            lat: this.props.lat,
            lng: this.props.lon
        }

        return (
            <Map
                role="application"
                aria-label="map"
                onReady={this.mapReady}
                google={this.props.google}
                zoom={this.props.zoom}
                style={style}
                initialCenter={center}
                onClick={this.closeInfoWindow}>

                {this.props.venues && this
                    .props
                    .venues
                    .map((venue, index) => {
                        return (<Marker
                            id={venue.id}
                            key={venue.id}
                            index={index}
                            title={venue.name}
                            name={venue.name}
                            address={venue.location.formattedAddress}
                            onClick={this.onMarkerClick}
                            position={{
                            lat: venue.location.lat,
                            lng: venue.location.lng
                        }}
                            animation={this.state.introAnim}
                            ref={this.saveRealMarker}/>)
                    })}

                <InfoWindow
                    marker={this.state.activeMarker && this.state.activeMarker.marker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.closeInfoWindow}>
                    <div>
                        <h3>{this.state.activeMarker && this.state.activeMarker.props.name}</h3>
                        <div>{this.state.activeMarker && this.state.activeMarker.props.address[0]}</div>
                        <div>{this.state.activeMarker && this.state.activeMarker.props.address[1]}</div>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({apiKey: MAP_KEY, LoadingContainer: NoMapDisplay})(MapDisplay)
