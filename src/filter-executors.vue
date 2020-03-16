<template>
<div style="min-width: 350px; height: inherit;">
  <div class="box ml-auto mr-auto" style="height: 100%;">
    <div class="box__header d-flex justify-content-between">
      <div class="check__main d-flex align-items-center">
        <input style="display: none" type="checkbox" checked="localNamesChecked" v-model="localNamesChecked"  id="check_main2"/>
        <label class="check__label" for="check_main2" style="font-weight: 600;">{{title}}</label>
      </div>
      <button class="add__checkbox_item" @click="showExForm">+</button>
    </div>
    <div class="executors__content d-flex flex-column">
      <span v-if="localNames == ''" class="lackof">Исполнители отсутствуют</span>  
      <div v-for="executor in localNames" class="d-flex justify-content-between" style="margin: 8px 0; line-height: 17px;">
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

export default {
  props: ["title", "names", "allChecked", "isForm"],
  data() {
    return {
      localNames: this.names,
      localNamesChecked: this.allChecked,
      changes: [],
      localIsForm: this.isForm
    }
  },

  mounted() {
    this.id = this._uid
  },
  
  methods: {
    changeFilterStatus(nm) {
      this.localNames.forEach((val, i) => {
        if (val.name == nm.name) {
          val.status = !val.status;
        }
      });
    },

    pushName() {
      var Executor = {};
      Executor.name = 'Some name #' + (this.localNames.length + 1);
      Executor.id = 'name' + (this.localNames.length + 1);
      Executor.status = false;

      this.localNames.push(Executor);
      return this.localNames;
    },

    showExForm() {
      this.localIsForm = true;
      this.$emit('showExForm', this.localIsForm)
  }
  },

  watch: {
    localNamesChecked() {
      if (this.localNamesChecked) {
        this.localNames.forEach((val, i) => {
          val.status = true;
        });
      } else {
        this.localNames.forEach((val, i) => {
          val.status = false;
        });
      }
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