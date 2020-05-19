<template>
  <div class="radio__group d-flex justify-content-around" :class="{locked: isLocked}">
    <label for="calendarOption" class="radio d-flex align-items-center justify-content-center" :class="{isLocked: isLocked}">
      <input type="radio" value="calendar" name="mainradio" v-model="localSelected" id="calendarOption"/>
      <span class="d-flex align-items-center justify-content-center"><img src="./assets/calendar_icon.png" alt="calendar_icon" class="option_icon"></span>
    </label>
    <label for="mapOption" class="radio d-flex align-items-center justify-content-center" :class="{isLocked: isLocked}">
      <input type="radio" value="map" name="mainradio" v-model="localSelected" id="mapOption" />
      <span class="d-flex align-items-center justify-content-center"><img src="./assets/map_icon.svg" alt="map_icon" class="option_icon"></span>
    </label>
    <label for="tableOption" class="radio d-flex align-items-center justify-content-center">
      <input type="radio" value="table" name="mainradio" v-model="localSelected" id="tableOption" />
      <span class="d-flex align-items-center justify-content-center"><img src="./assets/table_icon.png" alt="table_icon" class="option_icon"></span>
    </label>
  </div>
</template>

<script>
export default {
  props:['selected', 'isLocked'],
  data: function() {
    return {
      localSelected: this.selected
    }
  },
  watch: {
    localSelected: function() {
      this.$emit('radioChanged', this.localSelected)
    },

    selected: function() {
      this.localSelected = this.selected
    }    
  }
};
</script>

<style>

.radio__group {
    width: 170px;
    height: 45px;
    background: #fff;
    border-radius: 5px;
}

.option_icon {
  height: 25px;
  width: 25px;
}

.locked {
  background: #DFDFDF !important;
}

.isLocked {
  background: #DFDFDF !important;
  pointer-events: none;
}

.radio {
  font-size: 14px;
  width: 100%;
  height: 45px;
  background: #fff;
  border-radius: 5px;
  margin: 0;
  font-weight: 600;
  font-size: 14px;
  color: #000000;
  cursor: pointer;
}

.radio input[type="radio"]{
    display: none;
}

.radio input[type="radio"]:checked ~ span{
    background: #FFE6C0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
}

</style>
