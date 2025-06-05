document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('globe-container');

  const globe = Globe()
    .globeImageUrl(null) // Sin textura de océano
    .backgroundColor('rgb(6,6,6)')
    .showGlobe(true)
    .globeGlowColor('rgba(0,0,255,0.2)')
    .globeGlowRadius(0.15)
    .width(window.innerWidth)
    .height(window.innerHeight);

  container.appendChild(globe());

  fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
    .then(res => res.json())
    .then(geojson => {
      globe
        .polygonsData(geojson.features)
        .polygonCapColor(() => 'rgb(6,6,6)')     // mismo color que fondo (oceano)
        .polygonSideColor(() => 'rgb(6,6,6)')
        .polygonStrokeColor(() => '#0066ff')    // bordes azules
        .polygonLabel(({ properties: d }) => `<b>${d.name}</b>`)
        .onPolygonHover(() => {})                // desactivado
        .globeRotationSpeed(0.02);               // giro lento
    });

  window.addEventListener('resize', () => {
    globe.width(window.innerWidth).height(window.innerHeight);
  });
});