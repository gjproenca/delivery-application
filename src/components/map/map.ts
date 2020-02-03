import Vue from 'vue';
import MapHtml from './map.html';
import L from 'leaflet';
import './map.scss';
import 'leaflet-routing-machine';
import 'mapbox';

const tileLayerUrl = `https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png`;

export const MapComponent = Vue.extend({
  name: 'MapComponent',
  template: MapHtml,
  mounted() {
    const leaflet: any = L;

    const startLat: number = this.$store.state.data.location._lat;
    const startLong: number = this.$store.state.data.location._long;
    const finishLat: number = this.$store.state.selectedFinish[0];
    const finishLong: number = this.$store.state.selectedFinish[1];

    const map = leaflet.map('map').setView([startLat, startLong], 13);
    leaflet.tileLayer(tileLayerUrl, {
      maxZoom: 18,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      accessToken:
        'pk.eyJ1IjoiZ2pzcHJvZW5jYSIsImEiOiJjazQydXoycnUwMTZkM25yejhrdGE1eTBqIn0.Vaw2SMgV3Bq1AKSDciMdQg',
    }).addTo(map);

    const icon = leaflet.icon({
      iconUrl: './images/location.png',
      iconAnchor: [10, 27],
    });

    leaflet.marker([startLat, startLong], { icon }).addTo(map);
    leaflet.marker([finishLat, finishLong], { icon }).addTo(map);

    const plan: any = leaflet.Routing.plan(
      [leaflet.latLng(startLat, startLong), leaflet.latLng(finishLat, finishLong)],
      {
        createMarker: () => null as any,
        draggableWaypoints: false,
      },
    );

    leaflet.Routing.control({
      plan,
      routeWhileDragging: true,
      router: leaflet.Routing.mapbox(
        'pk.eyJ1IjoiZ2pzcHJvZW5jYSIsImEiOiJjazQydXoycnUwMTZkM25yejhrdGE1eTBqIn0.Vaw2SMgV3Bq1AKSDciMdQg',
      ),
    }).addTo(map);
  },
});
