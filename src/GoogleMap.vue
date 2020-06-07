<template>
  <div>
    
    <gmap-map
      :center="center"
      :zoom="this.zoom"
      :style="this.size"
    >
<!--      <gmap-marker--
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker-->
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  props: ['size', 'zoom', 'requests'],
  data() {
    return {
      // default to Yekateringurg to keep it simple
      // change this to whatever makes sense
      center: { lat: 56.8380, lng: 60.5974 },
      places: [],
      currentPlace: null
    };
  },

//  mounted() {
//    this.geolocate();
//  },

  computed: {
//    markers: function() {
//      var addresses = [];
//      var address = String;
//      if (this.requests){
//        this.requests.forEach((val) => {
//          address = val.city + ", " + val.address;
//         const marker = {
//            lat: address.geometry.location.lat(),
//            lng: address.geometry.location.lng()
//          };
//          addresses.push({position: marker});
//        s});
//      };
//      return addresses;
//    }
  },

  methods: {
  //setPlace(place) {
  //    this.currentPlace = place;
  //  },
  //  addMarker() {
  //    if (this.currentPlace) {
  //      const marker = {
  //        lat: this.currentPlace.geometry.location.lat(),
  //        lng: this.currentPlace.geometry.location.lng()
  //      };
  //      this.markers.push({ position: marker });
  //      this.places.push(this.currentPlace);
  //      this.center = marker;
  //      this.currentPlace = null;
  //    }
  //  },
  //  geolocate: function() {
  //    navigator.geolocation.getCurrentPosition(position => {
  //      this.center = {
  //        lat: position.coords.latitude,
  //        lng: position.coords.longitude
  //      };
  //    });
  //  }
  }
};
</script>