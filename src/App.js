import React, {Component} from 'react';
import './App.css';
import MapDisplay from './components/MapDisplay';
import ListDrawer from './components/ListDrawer';

const FS_CLIENT = "IGXZG543B3RW4HHAD1XVVWK03Y2JU3M3KIOTZ2KEMJH5BEUF";
const FS_SECRET = "3VKMH02ZDPJKMJIO5EEFJKJ3JCKO22SJAAOCPYGRBJHKVXVF";
const FS_VERSION = "20180323";

class App extends Component {
  state = {
    lat: 29.7844913,
    lon: -95.7800231,
    zoom: 13,
    all: [],
    filtered: null,
    open: false,
    selectedId: null,
    activeMarker: null
  }

  realMarkers = [];

  styles = {
    menuButton: {
      marginLeft: 10,
      marginRight: 20,
      position: "absolute",
      left: 10,
      top: 20,
      background: "white",
      padding: 10
    },
    hide: {
      display: 'none'
    },
    header: {
      marginTop: "0px"
    }
  };

  componentDidMount = () => {
    // Load the restaurant data from FourSquare
    let url = `https://api.foursquare.com/v2/venues/search?client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=${FS_VERSION}&radius=5000&ll=${this.state.lat},${this.state.lon}&intent=browse&query=Mexican`;
    let headers = new Headers();
    let request = new Request(url, {
      method: 'GET',
      headers
    });
    fetch(request)
      .then(response => response.json())
      .then(json => {
        const all = json.response.venues;
        this.setState({
          all,
          filtered: this.filterVenues(all, "")
        });
      })
      .catch(error => {
        alert("FourSquare data could not be retrieved");
      });
  }

  saveRealMarker = marker => {
    if (this.realMarkers.indexOf(marker) === -1 && marker !== null) 
      this.realMarkers.push(marker);
    }
  
  toggleDrawer = () => {
    // Toggle the value controlling whether the drawer is displayed
    this.setState({
      open: !this.state.open
    });
  }

  updateQuery = (query) => {
    // Update the query value and filter the list of locations accordingly
    this.setState({
      selectedIndex: null,
      filtered: this.filterVenues(this.state.all, query)
    });
  }

  filterVenues = (venues, query) => {
    // Filter locations to match query string
    return venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
  }

  clickMarker = (id) => {
    // Set the state to reflect the selected marker id
    const marker = this.realMarkers.filter(marker => marker.marker.id === id)[0];
    this.setState({
      selectedId: id,
      activeMarker: marker
    })
  }

  render = () => {
    return (
      <div className="App">
        <div>
          <button onClick={this.toggleDrawer} style={this.styles.menuButton}>
            <i className="fa fa-bars"></i>
          </button>
          <h1>Katy, TX Mexican Restaurants</h1>
        </div>
        <MapDisplay
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.zoom}
          venues={this.state.filtered}
          saveRealMarker={this.saveRealMarker}
          clickMarker={this.clickMarker}
          activeMarker={this.state.activeMarker} />
        <ListDrawer
          venues={this.state.filtered}
          open={this.state.open}
          toggleDrawer={this.toggleDrawer}
          filterVenues={this.updateQuery}
          clickMarker={this.clickMarker}/>
      </div>
    );
  }
}

export default App;
