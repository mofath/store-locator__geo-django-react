import React, { useState, useRef, useEffect } from 'react';

import { Map, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';

import useIconURL from '../../../_assets/user-icon.svg';
import groceryIconURL from '../../../_assets/grocery-icon.svg';
import restaurantIconURL from '../../../_assets/restaurant-icon.svg';
import hotelIconURL from '../../../_assets/hotel-icon.svg';
import positionIconURL from '../../../_assets/crosshairs.svg';
import SideBar from '../SideBar/SideBar';
import classes from './MapContainer.module.css';
import Control from 'react-leaflet-control';


const userIcon = L.icon({ iconUrl: useIconURL, iconSize: [60, 83] });
const hotelIcon = L.icon({ iconUrl: hotelIconURL, iconSize: [45, 70] });
const groceryIcon = L.icon({ iconUrl: groceryIconURL, iconSize: [45, 70] });
const restaurantIcon = L.icon({ iconUrl: restaurantIconURL, iconSize: [45, 70] });

const icons = {
    "hotel": hotelIcon,
    "grocery": groceryIcon,
    "restaurant": restaurantIcon
};

const MapContainer = ({
    haveUserLoci, userLocation,
    locus, filter, isLoaded, }) => {
    const mapRef = useRef(null);
    const [ActiveLoci, setActiveLoci] = useState(null);
    const [Center, setCenter] = useState([userLocation.lat, userLocation.lng]);
    useEffect(()=>{},[Center])

    return (
        <div className={classes.MapContainer}>

            <Map
                className="map"
                zoom={13}
                zoomControl={false}
                center={Center}
                style={{ width: "100%", height: "100vh" }}
                ref={mapRef}
            >
                <ZoomControl position="topright" />

                <TileLayer
                    attribution="&amp;copy 
                    <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> 
                    contributors Mohamed Fathi" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {haveUserLoci &&
                    <Marker
                        position={{ lat: userLocation.lat, lng: userLocation.lng }}
                        icon={userIcon}
                        onclick={() => setActiveLoci({
                            lat: userLocation.lat,
                            lng: userLocation.lng,
                            name: userLocation.name,
                            address: userLocation.address
                        })}
                    >
                    </Marker>
                }
                {
                    locus.map((loci, index) =>
                        <Marker
                            key={index}
                            position={[
                                loci.location.coordinates[0],
                                loci.location.coordinates[1]
                            ]}
                            icon={icons[loci.category]}
                            onclick={() => setActiveLoci({
                                lat: loci.location.coordinates[0]+0.2,
                                lng: loci.location.coordinates[1]+0.2,
                                name: loci.name,
                                address: loci.address
                            })}
                        />
                    )}

                {ActiveLoci &&
                    <Popup
                        position={[
                            ActiveLoci.lat,
                            ActiveLoci.lng,
                        ]}
                        onClose={() => setActiveLoci(null)}
                    >
                        <div className={classes.Popup}>
                            <h2>{ActiveLoci.name}</h2>
                            <h5><em>{ActiveLoci.address}</em></h5>
                            <h6>
                                {ActiveLoci.lat}
                                &nbsp;&nbsp;{ActiveLoci.lng}
                            </h6>
                        </div>
                    </Popup>
                }
                <Control >
                    <button className={[classes.PositionBtn, "center-content"].join(' ')}
                    
                        onClick={() => {
                            setCenter(prevstate =>[
                                ...prevstate,
                                userLocation.lat,
                                userLocation.lng
                            ])
                            mapRef.current._updating=true

                        }}
                    >
                        <img src={positionIconURL} alt="" />
                    </button>
                </Control>
            </Map>


            <SideBar
                locus={locus}
                filter={filter}
                isLoaded={isLoaded}
            />
        </div>
    )
}

MapContainer.propTypes = {
    isLoaded: PropTypes.bool.isRequired,
    haveUserLoci: PropTypes.bool.isRequired,
    locus: PropTypes.array,
    filter: PropTypes.func,
    updateUserLocation: PropTypes.func,
    userLocation: PropTypes.shape({
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        category: PropTypes.string,
        distance: PropTypes.string,
    })
}


export default MapContainer;
