<script>
  import { onMount } from 'svelte'
  import L from 'leaflet'
  import 'leaflet/dist/leaflet.css'
  
  const defaultCenter =
    { latitude: "55.02532"
    , longitude: "-1.48693"
    }

  let { latitude
      , longitude
      , center
      , zoom = 12
      , height = "40rem"
      , width = "100%"
      , sensitivity = 15
      , markers = []
      } = $props()

  onMount(() => {
    const map = L.map('map',{wheelPxPerZoomLevel: sensitivity}).setView([latitude,longitude], zoom)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map)

    const line = L.polyline(markers.map(m=>[m.latitude,m.longitude]), {
  color: '#5599cc',
  weight: 4
}).addTo(map);

    map.fitBounds(line.getBounds(), { animate: false });
map.setZoom(map.getZoom() - 1);
  //console.log(markers.categories)


    markers[0].name = 'home'
    markers[0].categories = ['home']
    markers.forEach( m => {
      var marker = L.marker([m.latitude, m.longitude]).addTo(map)
      var categories = ( typeof m.categories === 'string'
                       ? JSON.parse(m.categories).join(', ')
                       //? m.categories
                       : ""
                       )
      marker.bindPopup(`<strong><a href="${m.google_maps_url || "#"}">${m.name}</a></strong><br><p>${categories}</p>`)
    })
    /*
    */
  })

</script>

<div id="map" style={"width:" + width + "; height: " + height + ";"}></div>
