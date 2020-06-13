<template>
    <div ref="mapContainer" style="width: 100%; height: 100%;">

    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'

export default {
  name: "app",
  data: function() {
    return {
      
    };
  },

  methods: {
    mapCreate(markers){

      const map = L.map(this.$refs.mapContainer, {preferCanvas: true}).setView([56.8380, 60.5974], 13);
      const mapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
      map.addLayer(mapLayer);

      markers.forEach((val) => {
        var circle = L.circle([val.lat, val.lng], {
              color: 'red',
              fillColor: '#f03',
              fillOpacity: 0.5,
              radius: 20
            }).addTo(map);
        
      });
      return map;
    },

    renderMap() {
      this.mapCreate(this.TestMarker);
    }
  },

  computed: {
    ...mapState(['TestMarker'])
  },

  mounted: function() {
    this.renderMap();
  }, 

  watch: {
    TestMarker() {

    }
  }

}
</script>

<style>

</style>