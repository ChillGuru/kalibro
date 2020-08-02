<template>
    <div ref="mapContainer" style="width: 100%; height: 100%;">

    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'

export default {
  name: "Map",
  props:['center', 'crop', 'kind', 'markers'],
  data() {
    return {
      
    }
  },

  methods: {
    mapCreate(markers){
      const map = L.map(this.$refs.mapContainer, {preferCanvas: true}).setView(this.center, this.crop)
      const mapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
      map.addLayer(mapLayer)
      if (this.kind == 'circle') {
        markers.forEach((val) => {
          let circle = L.circle([val.lat, val.lng], {
            color: 'black',
            fillColor: this.setColor(val.status),
            fillOpacity: 1,
            radius: 20
          })
          circle.bindPopup("Адрес: "+val.address+"<br>"+"Статус: "+val.status+"<br>"+"Исполнитель: "+val.executor+"<br>"+"Бланк: "+val.form+"<br>"+"crm: <a href='"+val.crm+"'>"+val.crm+"</a>")
          circle.addTo(map)
        })
      } else if (this.kind == 'marker'){
        let marker = L.marker([markers.lat, markers.lng]).addTo(map)
      }
      return map
    },

    setColor(status){
      if (status == 'Открыта') {return '#FFD79A'}
      if (status == 'Принята') {return '#D993D0'}
      if (status == 'Выполнена') {return '#82DBB1'}
    },

    renderMap() {
      this.mapCreate(this.markers)
    }
  },

  mounted() {
    this.renderMap()
  }, 

}
</script>

<style>

</style>