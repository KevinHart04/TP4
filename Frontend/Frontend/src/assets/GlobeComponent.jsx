// src/components/DarkGlobe.jsx
import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

export default function DarkGlobe() {
  const globeRef = useRef();
  const [countries, setCountries] = useState({ features: [] });

  useEffect(() => {
    // Carga el GeoJSON con los límites de países
    fetch("https://unpkg.com/world-atlas@2.0.2/countries-110m.json")
      .then(res => res.json())
      .then(worldData => {
        const countriesData = window.topojson.feature(worldData, worldData.objects.countries);
        setCountries(countriesData);
      });
  }, []);

  useEffect(() => {
    // Rotación automática lenta
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.6;
    }
  }, [globeRef]);

  return (
    <div className="w-full h-screen bg-black">
      <Globe
        ref={globeRef}
        globeRadius={200}
        width={window.innerWidth}
        height={window.innerHeight}
        globeImageUrl={null}
        backgroundColor="rgba(0, 0, 0, 0)"
        showGlobe={true}
        showAtmosphere={false}
        polygonsData={countries.features}
        polygonCapColor={() => "rgba(0, 0, 0, 0)"}
        polygonSideColor={() => "rgba(0, 0, 0, 0)"}
        polygonStrokeColor={() => "#00bfff"}
        polygonLabel={() => ""} // sin etiquetas
        atmosphereColor="black"
      />
    </div>
  );
}
