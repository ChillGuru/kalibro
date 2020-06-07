<template>
<div style="min-width: 350px; height: inherit;">
  <div class="box ml-auto mr-auto" style="height: 100%;">
    <div class="box__header d-flex justify-content-between">
      <div class="check__main d-flex align-items-center">
        <input style="display: none" type="checkbox" :checked="ALL_NAMES_CHECKED" @change="all_check"  id="check_main2"/>
        <label class="check__label" for="check_main2" style="font-weight: 600;">Исполнители</label>
      </div>
      <button class="add__checkbox_item" @click="UPD_EXECUTOR_FORM_VISIBLE(true)">+</button>
    </div>
    <div class="executors__content d-flex flex-column">
      <span v-if="EXECUTORS == ''" class="lackof">Исполнители отсутствуют</span>  
      <div v-for="executor in EXECUTORS" class="d-flex justify-content-between" style="margin: 8px 0; line-height: 17px;">
        <div>
          <input
            style="display: none"
            type="checkbox"
            :id="executor.id"
            :checked="executor.status"
            :value="executor"
            @change="changeFilterStatus(executor)"
            :v-model="changes"
          />
          <label class="check__label" :for="executor.id">{{ executor.name }}</label>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import addExecutor from "./addExecutor.vue" //Модальное окно по добавлению исполнителя
import {mapActions, mapGetters} from 'vuex';

export default {
  data: function() {
    return {
      changes: [],
    }
  },

  mounted: function() {
    this.id = this._uid;
    this.GET_EXECUTORS();
  },
  
  computed: {
    ...mapGetters([
      'EXECUTORS',
      'ALL_NAMES_CHECKED'
    ])
  },

  methods: {
    ...mapActions([
          'GET_EXECUTORS',
          'UPD_EXECUTORS_IN_LOCAL',
          'UPD_ALL_NAMES_CHECKED',
          'UPD_EXECUTOR_FORM_VISIBLE'
        ]),

    all_check() {
      let local = this.ALL_NAMES_CHECKED;
      if (local == true) {local = false}
      else {local = true};
      this.UPD_ALL_NAMES_CHECKED(local);
    },

    changeFilterStatus: function(nm) {
      let localNames = this.EXECUTORS;
      localNames.forEach((val) => {
        if (val.name == nm.name) {
          val.status = !val.status;
        }
      });
      this.UPD_EXECUTORS_IN_LOCAL(localNames);
    }
  },

  watch: {
    ALL_NAMES_CHECKED: function() {
      let local = this.EXECUTORS;
      if (this.ALL_NAMES_CHECKED) {
        local.forEach((val) => {
          val.status = true;
        });
      } else {
        local.forEach((val) => {
          val.status = false;
        });
      };
      this.UPD_EXECUTORS_IN_LOCAL(local);
    }
  },

  components: {
    addExecutor
  }
}
</script>

<style>


.check__label {
    margin: 0;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    margin-top: 5px;
}

.lackof {
  font-size: 14px;
  font-weight: 500;
  margin-top: 25px;
}

.check__label::before {
    content: '';
    display: inline-block;
    vertical-align: top;
    width: 17px;
    height: 17px;
    background-color: #C4C4C4;
    border-radius: 5px;
    margin-right: 18px;
}

input[type="checkbox"]:checked + .check__label::before {
    background: url("./assets/checked1.png") no-repeat;
    background-position: center;
    background-size: 10px 8px;
    background-color: #C4C4C4;
    transform: scale(1);
}

.executors__content {
  font-weight: 600;
  font-size: 14px;
  height: inherit;
  padding: 8px 0 53px 8px;
  overflow: scroll;
}

.add__checkbox_item {
  height: 29px;
  width: 29px;
  border: none;
  border-radius: 5px;
  background: #fff;
  color: #000;
  font-weight: 600;
  line-height: 29px;
  font-size: 24px;
  margin: 8px 10px 0 0;
}

</style>