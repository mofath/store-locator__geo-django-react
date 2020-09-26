import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import useIconURL from '../../../_assets/user-icon.svg';
import groceryIconURL from '../../../_assets/grocery-icon.svg';
import restaurantIconURL from '../../../_assets/restaurant-icon.svg';
import hotelIconURL from '../../../_assets/hotel-icon.svg';
import SideBar from '../SideBar/SideBar'

const userIcon = L.icon({ iconUrl: useIconURL, iconSize: [60, 83] })
const hotelIcon = L.icon({ iconUrl: hotelIconURL, iconSize: [45, 70] })
const groceryIcon = L.icon({ iconUrl: groceryIconURL, iconSize: [45, 70] })
const restaurantIcon = L.icon({ iconUrl: restaurantIconURL, iconSize: [45, 70] })

const icons = {
    "hotel": hotelIcon,
    "grocery": groceryIcon,
    "restaurant": restaurantIcon
}

const MapContainer = ({ locus, position, activeLoci, updateActiveLoci, userLoci, filter }) => {

    return (
        <div className="mapcontainer">
            <Map
                className="Map"
                zoom={13}
                zoomControl={false}
                worldCopyJump={true}
                center={[position.lat, position.lng]}
                style={{ width: "100%", height: "100vh" }}
            >
                <TileLayer
                    attribution="&amp;copy 
                    <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> 
                    contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {userLoci &&
                    <Marker
                        position={position}
                        icon={userIcon}>
                    </Marker>
                }
                {
                    locus.map((loci) =>
                        <Marker
                            key={loci.pk}
                            position={[
                                loci.location.coordinates[0],
                                loci.location.coordinates[1]
                            ]}
                            icon={icons[loci.category]}
                            onclick={() => updateActiveLoci(loci)}

                        />
                    )}

                {activeLoci &&
                    <Popup
                        position={[
                            activeLoci.location.coordinates[0],
                            activeLoci.location.coordinates[1],
                        ]}
                        onClose={() => updateActiveLoci(null)}
                    >
                        <div>
                            <h2>{activeLoci.name}</h2>
                            <p>{activeLoci.address}</p>
                        </div>
                    </Popup>
                }
            </Map>
            <SideBar
                locus={locus}
                filter={filter}
            />
        </div>
    )
}

export default MapContainer;
