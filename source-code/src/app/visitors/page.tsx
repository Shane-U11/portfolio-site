"use client";
import React, { useEffect, useState } from 'react';
import { Map } from 'react-map-gl';
import { ScatterplotLayer } from '@deck.gl/layers';
import Deck from '@deck.gl/react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { DataObject } from '@mui/icons-material';

interface Viewport {
    latitude: number;
    longitude: number;
    zoom: number;
}

const initialViewState: Viewport = {
    latitude: 37.70577,
    longitude: -122.46192,
    zoom: 12,
};


const Visitors = () => {
    const [viewport, setViewport] = useState<Viewport>(initialViewState);

    const handleViewportChange = (newViewport: Viewport) => {
        setViewport(newViewport);
    };

    useEffect(() => {
        const geoCodeIpAddress = async () => {
            try {
                const ipAddressRes = await fetch('https://api.ipify.org/?format=json')
                const { ip } = await ipAddressRes.json()

                const geocodeResponse = await fetch(
                    `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY}&ip=${ip}`
                );

                const { latitude, longitude } = await geocodeResponse.json()

                console.log('DATA', latitude, longitude, ip)

                if (latitude && longitude) {
                    const res = await fetch('/api/postVisitor', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ latitude: Number(latitude), longitude: Number(longitude), ipAddress: ip })
                    })
                    setDidPost(true)
                    console.log('HERE',await res.json())
                }
            } catch (error) {
                console.error('Error in geoCodeIpAddress:', error)
            }
        };

        geoCodeIpAddress()
    }, [])

    const [longitude, setLongitude] = useState(null)
    const [latitude, setLatitude] = useState(null)
    const [didPost, setDidPost] = useState(false)

    useEffect(() => {
        const getAllVisitors = async () => {
            const res = await fetch('/api/getAllVisitors', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const visitorsData = await res.json()
            // console.log(visitorsData)
            for (let i = 0; i < visitorsData.length; i++) {
                const data = visitorsData[i]
                setLongitude(data.long)
                setLatitude(data.lat)
            }
        }
        getAllVisitors()
    }, [didPost])

    const layers = [
        new ScatterplotLayer({
            id: 'scatter-plot',
            data: [{ position: [longitude, latitude] }],
            getPosition: d => d.position,
            getFillColor: [255, 0, 0, 100],
            getRadius: 1000
        })
    ];

    return (
        <Deck
            layers={[layers]}
            viewState={viewport}
            onViewStateChange={({ viewState }) => handleViewportChange(viewState as Viewport)}
            controller

        >
            <Map
                style={{ width: '100%', height: '100vh' }}
                mapStyle="mapbox://styles/mapbox/light-v9"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                {...viewport}
            />
        </Deck>
    );
}

export default Visitors;