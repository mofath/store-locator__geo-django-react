import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import userLocationURL from '../../../_assets/user-loci-icon.png';

const userIcon = L.icon({
    iconUrl: userLocationURL,
    iconSize: [38, 62]
})

const MapContainer = ({ locus, position, activeLoci, updateActiveLoci, userLoci }) => {


    return (
        <div className="mapcontainer">
            <Map
                className="Map"
                zoom={13}
                worldCopyJump={true}
                center={[position.lat, position.lng]}
                style={{ width: "100%", height: "100vh" }}
            >
                <TileLayer
                    attribution="&amp;copy 
                <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
        </div>
    )
}

export default MapContainer;
