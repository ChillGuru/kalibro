<template>
<div style="min-width: 350px; height: inherit;">
  <div class="box ml-auto mr-auto" style="height: 100%;">
    <div class="box__header d-flex justify-content-between">
      <div class="check__main d-flex align-items-center">
        <input style="display: none" type="checkbox" :checked="ALL_FORMS_CHECKED" @change="check_all" id="check_main3"/>
        <label class="check__label" for="check_main3" style="font-weight: 600;">Бланки</label>
      </div>
      <button class="add__checkbox_item" @click="pushForm()">+</button>
    </div>
    <div class="forms__content d-flex flex-column">
      <span v-if="FORMS == ''" class="lackof">Бланки отсутсвуют</span> 
      <div v-for="form in FORMS" class="d-flex" style="margin: 8px 0; line-height: 17px; height: 17px;">
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
import {mapActions, mapGetters} from 'vuex';

export default {
  data: function() {
    return {
      changes: []
    }
  },
  
  methods: {
    ...mapActions([
      'UPD_ALL_FORMS_CHECKED',
      'UPD_FORMS_IN_LOCAL',
      'ADD_FORM'
    ]),

    check_all() {
      let local = this.ALL_FORMS_CHECKED;
      if (local) {local = false}
      else {local = true};
      this.UPD_ALL_FORMS_CHECKED(local)
    },

    changeFilterStatus: function(nm) {
      let local = this.FORMS
      local.forEach((val) => {
        if (val.name == nm.name) {
          val.status = !val.status;
        }
      });
      this.UPD_FORMS_IN_LOCAL(local)
    },
    
    pushForm: function() {
      let local = this.FORMS; 
      var Form = {},
      color = Math.floor(Math.random() * 899) + 100;
      Form.name = 'Some Form #' + (local.length + 1);
      Form.color = 'background: #' + color.toString();
      Form.id = 'Form' + (local.length + 1);
      Form.status = false;
      this.ADD_FORM(Form);
    }
  },

  computed: {
    ...mapGetters([
      'ALL_FORMS_CHECKED',
      'FORMS'
    ])
  },

  watch: {
    ALL_FORMS_CHECKED: function() {
      let local = this.FORMS;
      if (this.ALL_FORMS_CHECKED) {
        local.forEach((val) => {
          val.status = true;
        });
      } else {
        local.forEach((val) => {
          val.status = false;
        });
      };
      this.UPD_FORMS_IN_LOCAL(local)
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