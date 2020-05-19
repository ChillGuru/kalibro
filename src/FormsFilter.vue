<template>
<div style="min-width: 350px; height: inherit;">
  <div class="box ml-auto mr-auto" style="height: 100%;">
    <div class="box__header d-flex justify-content-between">
      <div class="check__main d-flex align-items-center">
        <input style="display: none" type="checkbox" checked="localFormsChecked" v-model="localFormsChecked"  id="check_main3"/>
        <label class="check__label" for="check_main3" style="font-weight: 600;">{{title}}</label>
      </div>
      <button class="add__checkbox_item" @click="pushForm()">+</button>
    </div>
    <div class="forms__content d-flex flex-column">
      <span v-if="localForms == ''" class="lackof">Бланки отсутсвуют</span> 
      <div v-for="form in localForms" class="d-flex" style="margin: 8px 0; line-height: 17px; height: 17px;">
        <div>
          <input
            style="display: none"
            type="checkbox"
            :id="form.id"
            :checked="form.status"
            :value="form"
            @change="changeFilterStatus(form)"
            :v-model="changes"
          />
          <label class="form__label d-flex" :for="form.id"><div class="colorbox" :style="form.color"></div> {{ form.name }}</label>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  props: ["title", "forms", "allChecked"],
  data: function() {
    return {
      localForms: this.forms,
      localFormsChecked: this.allChecked,
      changes: []
    }
  },
  
  methods: {
    changeFilterStatus: function(nm) {
      this.localForms.forEach((val, i) => {
        if (val.name == nm.name) {
          val.status = !val.status;
        }
      });
    },
    
    pushForm: function() {
      var Form = {},
      color = Math.floor(Math.random() * 899) + 100;
      Form.name = 'Some Form #' + (this.localForms.length + 1);
      Form.color = 'background: #' + color.toString();
      Form.id = 'Form' + (this.localForms.length + 1);
      Form.status = false;

      this.localForms.push(Form);
      return this.localForms;
    }
  },

  watch: {
    localFormsChecked: function() {
      if (this.localFormsChecked) {
        this.localForms.forEach((val, i) => {
          val.status = true;
        });
      } else {
        this.localForms.forEach((val, i) => {
          val.status = false;
        });
      }
    }
  },
}
</script>

<style>

.colorbox {
  width: 30px;
  height: 17px;
  margin-right: 13px;
}

.form__label {
    margin: 0;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    margin-top: 5px;
    width: 100%;
}

.form__label::before {
    content: '';
    display: inline-block;
    vertical-align: top;
    width: 17px;
    height: 17px;
    background-color: #C4C4C4;
    border-radius: 5px;
    margin-right: 18px;
}

input[type="checkbox"]:checked + .form__label::before {
    background: url("./assets/checked1.png") no-repeat;
    background-position: center;
    background-size: 10px 8px;
    background-color: #C4C4C4;
    transform: scale(1);
}

.forms__content {
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