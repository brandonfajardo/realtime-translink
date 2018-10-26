import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { BusDescription } from "../index";
import styles from "./index.css";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYmZhamFyZCIsImEiOiJjam5waHlhZGswNXdvM2twbmJ1azQwNmJ4In0.pKdi2TlW05UGa6KxRvotUA";
const SERVER = "http://localhost:3000/";

class Map extends Component {
  state = {
    viewport: {
      latitude: 49.2627,
      longitude: -123.0807,
      zoom: 12,
      width: window.innerWidth,
      height: window.innerHeight
    },
    popupInfo: null
  };

  componentDidMount() {
    const socket = socketIOClient(SERVER);
    socket.on("BusLocationsUpdated", data => {
      this.props.updateBusLocations(data);
    });
  }

  displayPopup = bus => {
    this.setState({ popupInfo: bus });
  };

  render() {
    const { busList } = this.props;
    const { popupInfo } = this.state;
    return (
      <ReactMapGL
        className={styles.Map}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v8"
        onViewportChange={viewport => this.setState({ viewport })}
        {...this.state.viewport}
      >
        {busList &&
          busList.map((bus, index) => {
            return (
              <Marker
                key={`marker-${index}`}
                latitude={bus.Latitude}
                longitude={bus.Longitude}
                key={index}
              >
                <div
                  className={styles.Marker}
                  onClick={() => this.displayPopup(bus)}
                />
              </Marker>
            );
          })}
        {popupInfo && (
          <Popup
            tipSize={5}
            anchor="top"
            longitude={popupInfo.Longitude}
            latitude={popupInfo.Latitude}
            onClose={() => this.setState({ popupInfo: null })}
          >
            <BusDescription {...popupInfo} />
          </Popup>
        )}
      </ReactMapGL>
    );
  }
}

const mapDispatchToProps = {
  updateBusLocations: actions.updateBusLocations
};

const mapStateToProps = state => ({
  busList: state.bus.busList
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
