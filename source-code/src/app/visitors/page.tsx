"use client";
import React, { useEffect, useState } from 'react';
import { Map } from 'react-map-gl';
import { ScatterplotLayer } from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Typography } from '@mui/material';

interface Viewport {
    latitude: number;
    longitude: number;
    zoom: number;
}

interface Visitor {
    latitude: number;
    longitude: number;
}

interface VisitorData {
    lat: number;
    long: number;
}

const initialViewState: Viewport = {
    latitude: 37,
    longitude: -5,
    zoom: 1.5,
};

const Visitors = () => {
    const [viewport, setViewport] = useState<Viewport>(initialViewState)
    const [visitors, setVisitors] = useState<Visitor[]>([])
    const [didPost, setDidPost] = useState(false)
    const [numOfPlots, setNumOfPlots] = useState(0)

    const handleViewportChange = (newViewport: Viewport) => {
        setViewport(newViewport)
    };

    useEffect(() => {
        const geoCodeIpAddress = async () => {
            try {
                const ipAddressRes = await fetch('https://api.ipify.org/?format=json')
                const { ip } = await ipAddressRes.json()

                const geocodeResponse = await fetch(
                    `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY}&ip=${ip}`
                )

                const { latitude, longitude } = await geocodeResponse.json()

                if (latitude && longitude) {
                    const res = await fetch('/api/postVisitor', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ latitude: Number(latitude), longitude: Number(longitude), ipAddress: ip })
                    });
                    setDidPost(true)
                    await res.json()
                }
            } catch (error) {
                console.error('Error in geoCodeIpAddress:', error)
            }
        }

        geoCodeIpAddress()
    }, [])

    useEffect(() => {
        const getAllVisitors = async () => {
            try {
                const res = await fetch('/api/getAllVisitors', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const visitorsData: VisitorData[] = await res.json();
                setVisitors(visitorsData.map(({ lat, long }) => ({ latitude: lat, longitude: long })))
                setNumOfPlots(visitorsData.length)
            } catch (error) {
                console.error('Error in getAllVisitors:', error)
            }
        }
        getAllVisitors()
    }, [didPost])

    const layers = [
        new ScatterplotLayer({
            id: 'scatter-plot',
            data: visitors.map(visitor => ({ position: [visitor.longitude, visitor.latitude] })),
            getPosition: d => d.position,
            getFillColor: [255, 0, 0, 100],
            getRadius: 3000,
        }),
    ]

    return (
        <><DeckGL
            // style={{ width: "100%", height: "100%" }}
            layers={layers}
            viewState={viewport}
            onViewStateChange={({ viewState }) => handleViewportChange(viewState as Viewport)}
            controller={true}
        >
            <Map
                style={{ width: '100%', height: '100vh' }}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                {...viewport} />
        </DeckGL>
        <Typography
            variant="h6"
            style={{
                position: 'absolute',
                top: 10,
                left: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px'
            }}>
                Visitor Count: {numOfPlots}
            </Typography></>
            )
}
            export default Visitors;