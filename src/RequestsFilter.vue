<template>
  <div class="box">
    <div class="box__header">
      <div class="check__main d-flex align-items-center">
        <input
          style="display: none"
          type="checkbox"
          id="check_main"
          :checked="ALL_REQUESTS_CHECKED"
          @change="check_all"
        />
        <label class="check__label" for="check_main" style="font-weight: 600;">Заявки</label>
      </div>
    </div>
    <div class="requests__content d-flex flex-column justify-content-between">
      <div v-for="request in CHECKED_REQUESTS" class="check__content d-flex justify-content-between">
        <div>
          <input
            style="display: none"
            type="checkbox"
            :id="request.id"
            :checked="request.status"
            :value="request"
            @change="changeFilterStatus(request)"
          />
          <label class="check__label unselectable" :for="request.id">{{ request.name }}</label>
        </div>
        <div class="request d-flex">
          <div class="colorblock" :style="request.color"></div>
          <div class="colorvalue d-flex align-items-center justify-content-center">
            <span style="font-weight: 500; font-size: 10px;">{{request.fullname}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  data() {
    return {
    }
  },

  methods: {
    ...mapActions([
      'UPD_ALL_REQUESTS_CHECKED',
      'UPD_CHECKED_REQUESTS'
    ]),

    check_all() {
      let local = this.ALL_REQUESTS_CHECKED
      if (local == false) {local = true}
      else {local = false}
      this.UPD_ALL_REQUESTS_CHECKED(local)
    },

    changeFilterStatus(req) {
      let local = this.CHECKED_REQUESTS
      local.forEach((val) => {
        if (val.name == req.name) {
          val.status = !val.status
        }
      })
      this.UPD_ALL_REQUESTS_CHECKED(local)
    }
  },

  computed: {
    ...mapGetters([
      'ALL_REQUESTS_CHECKED',
      'CHECKED_REQUESTS'
    ]),
  },

  watch: {
    ALL_REQUESTS_CHECKED() {
    let local = this.CHECKED_REQUESTS
      if (this.ALL_REQUESTS_CHECKED) {
        local.forEach((val) => {
          val.status = true
        })
      } else {
        local.forEach((val) => {
          val.status = false
        })
      }
      this.UPD_CHECKED_REQUESTS(local)
    }
  }
}
</script>

<style>
.box {
  width: 350px;
  height: 184px;
  border-radius: 5px;
  background: #fff;
}

.box__header {
  width: 350px;
  height: 45px;
  border-radius: 5px;
  background: #ffe6c0;
  font-weight: 600;
  font-size: 14px;
  padding-left: 8px;
}

.check__main {
  width: 100%;
  height: 100%;
}

.check__label {
  margin: 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  margin-top: 5px;
}

.check__label::before {
  content: "";
  display: inline-block;
  width: 17px;
  height: 17px;
  background-color: #c4c4c4;
  border-radius: 5px;
  margin-right: 18px;
}

input[type="checkbox"]:checked + .check__label::before {
  background: url("./assets/checked1.png") no-repeat;
  background-position: center;
  background-size: 10px 8px;
  background-color: #c4c4c4;
  transform: scale(1);
}

.requests__content {
  margin-top: 14px;
  height: 112px;
  font-weight: 600;
  font-size: 14px;
  padding-left: 8px;
}

.request {
  width: 195px;
  height: 26px;
}

.colorblock {
  width: 20px;
  height: 26px;
}

.colorvalue {
  width: 165px;
  height: 100%;
  background: #f1f1f1;
}
</style>
