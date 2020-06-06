<template>
  <div id="app" class="main" style="height: 100%;">
    <Header
      style="min-width: 1240px;"
      :isExForm="isExForm"
      :isReForm="isReForm"
      :username="login"
      @showExForm="isExForm = $event"
      @showReForm="isReForm = $event"
    ></Header>
      <!--Форма добавления нового исполнителя-->
      <add-executor
        v-if="isExForm"
        :isForm="isExForm"
        :executors="executors"
        @addNewExecutor="executors = $event"
        @showExForm="isExForm = $event"
      />
      <!--Форма добавления новой заявки-->
      <add-request
        v-if="isReForm"
        :isForm="isReForm"
        :forms="checkedForms"
        :executors="executors"
        :requests="requestList"
        @showReForm="isReForm = $event"
        @addNewRequest="requestList = $event"
      />
      <splitpanes class="default-theme" style="height: calc( 100% - 62px)">
        <!--Левая часть (фильтры)-->
        <pane :size='paneHorizontalSize' :max-size='paneHorizontalSize'>
          <splitpanes horizontal>
            <pane :size='paneVerticalSize'>
              <div class="left__pane">
                <TopFilters
                  class="filters"
                  :selectedRadio="selectedRadio"
                  :AllRequestsChecked="AllRequestsChecked"
                  :checkedRequests="checkedRequests"
                  :isOptionsLocked="isOptionsLocked"
                  @radioChanged="selectedRadio = $event"
                  @requestFilterChanged="checkedRequests = $event"
                ></TopFilters>
              </div>
            </pane>
            <pane style="position: relative">
              <div class="left__pane">
                <ExecutorFilter
                  class="filterbox"
                  :title="'Исполнители'"
                  :names="executors"
                  :allChecked="allNamesChecked"
                  :isForm="isExForm"
                  @showExForm="isExForm = $event"
                ></ExecutorFilter>
              </div>
            </pane>
            <pane>
              <div class="left__pane">
                <FormsFilter
                  class="filterbox"
                  :title="'Бланки'"
                  :forms="checkedForms"
                  :allChecked="allFormsChecked"
                ></FormsFilter>
              </div>
            </pane>
          </splitpanes>
        </pane>
        <!--Правая часть-->
        <pane :size='100-paneHorizontalSize' style="padding: 30px 23px 32px 10px">
          <b-tabs class="right__content">
            <!--Вкладка "Заявки"-->
            <b-tab title="Заявки" @click="tabPosition = 1" active>
              <div class="justbox" v-if="selectedRadio == 'calendar'">
                <h1>Данная функция в стадии разработки</h1>
                <img src="./assets/works.png" alt="works" style="height: 100px; weight:100px;">
              </div>
              <!--Карта-->
              <div class="justbox" v-if="selectedRadio == 'map'">
                <GMap
                :size="rightContentHeight+'width:100%;'"
                :zoom="13"
                :requests="filteredRequests">
                </GMap>
              </div>
              <div class="justbox" v-if="selectedRadio == 'table'">
                <RequestsTable
                  :requestList="filteredRequests"
                  :formsFilter="checkedForms"
                ></RequestsTable>
              </div>
            </b-tab>
            <!--Вкладка "Исполнители"-->
            <b-tab title="Исполнители" @click="tabPosition = 2; selectedRadio = 'table';">
                <div class="justbox" v-if="selectedRadio == 'table'">
                  <ExecutorsTable
                    :requestList="requestList"
                    :executors="filteredExecutors"
                  ></ExecutorsTable>
                </div>
            </b-tab>
            <!--Вкладка "Отчеты"-->
            <b-tab title="Отчеты" @click="tabPosition = 3; selectedRadio = 'table';">
              <div class="justbox" v-if="selectedRadio == 'table'">
                <ReportsTable
                  :requestList="requestList"
                  :executorsFilter="executors"
                  :checkedRequests="checkedRequests"
                  :checkedForms="checkedForms"
                ></ReportsTable>
              </div>
            </b-tab>
            <b-tab title="Отладка">
              <div class="justbox">
                <h1>Фильтр:</h1>
                <br/>
                <ul>
                  <li v-for="r in checkedRequests">{{ r.name }}: {{ r.status }}</li>
                </ul>
                <br />
                <ul>
                  <li v-for="n in executors">{{ n.name }}: {{ n.status }}</li>
                </ul>
                <br />
                <ul>
                  <li v-for="f in checkedForms">{{ f.name }}: {{ f.status }}</li>
                </ul>
              </div>
            </b-tab>
          </b-tabs>
        </pane>
      </splitpanes>
  </div>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes"; //Сплитеры.
import "splitpanes/dist/splitpanes.css"; //Стили сплитеров.
import Header from "./header.vue"; //Хедер (ваш Кэп).
import TopFilters from "./TopFilters.vue"; //Верхняя часть фильтров. Включает в себя фильтр по типу заявок.
import ExecutorFilter from "./ExecutorsFilter.vue"; //Фильтр по исполнителям.
import FormsFilter from "./FormsFilter.vue"; //Фильтр по бланкам.
import RequestsTable from "./RequestsTable.vue"; //Таблица с заявками.
import ExecutorsTable from "./ExecutorsTable.vue"; //Таблица с исполнителями.
import ReportsTable from "./ReportsTable.vue"; //Таблица с отчетами.
import GMap from "./GoogleMap.vue"; //Карта
import AddExecutor from "./addExecutor.vue"; //Модальное окно по добавлению исполнителя
import AddRequest from "./addRequest.vue" //Модальное окно по добавлению заявки

export default {
  name: "app",
  data: function() {
    //Все значения приведенные здесь - считаются дефолтными.
    return {
      login: "admin",
      window: { //размер окна
        height: window.innerHeight,
        width: window.innerWidth,
    },
      selectedRadio: "table", //Значения: calendar, map или table. Это радиокнопки  в фильтрах.

      tabPosition: 1,

      AllRequestsChecked: true,
      checkedRequests: [
        //Фильтр по типу заявок.
        {
          name: "Открыты",
          other: "Открыта",
          fullname: "Открытая заявка",
          id: "open",
          color: "background: #FFD79A",
          status: true
        },

        {
          name: "Приняты",
          other: "Принята",
          fullname: "Принятая заявка",
          id: "adopted",
          color: "background: #D993D0",
          status: true
        },

        {
          name: "Выполнены",
          other: "Выполнена",
          fullname: "Выполненная заявка",
          id: "complete",
          color: "background: #82DBB1",
          status: true
        }
      ],

      allNamesChecked: false,
      executors: [
        {
          name: "Васнецов Николай Евгеньевич",
          email: "example@gmail.com",
          password: "qwerty",
          phone: "88005553535",
          status: true,
          id: "name1"
        },
        {
          name: "Романов Александр Николаевич",
          email: "example@gmail.com",
          password: "qwerty",
          phone: "88005553535",
          status: false,
          id: "name2"
        },
        {
          name: "Прокопьев Владимир Дмитриевич",
          email: "example@gmail.com",
          password: "qwerty",
          phone: "88005553535",
          status: false,
          id: "name3"
        },
        {
          name: "Попов Антон Андреевич",
          email: "example@gmail.com",
          password: "qwerty",
          phone: "88005553535",
          status: false,
          id: "name4"
        },
        {
          name: "Васюков Евгений Петрович",
          email: "example@gmail.com",
          password: "qwerty",
          phone: "88005553535",
          status: false,
          id: "name5"
        }
      ],

      allFormsChecked: false,
      checkedForms: [
        {
          name: "Бланк для окон",
          color: "background: #84D2DE;",
          status: true,
          id: "form1"
        },
        {
          name: "Бланк для дверей",
          color: "background: #BFF3A7;",
          status: false,
          id: "form2"
        },
        {
          name: "Монтаж 15к1е6",
          color: "background: #84D2DE;",
          status: false,
          id: "form3"
        },
        {
          name: "Бланк стандарт 15",
          color: "background: #85B8F1;",
          status: false,
          id: "form4"
        },
        {
          name: "ГОСТ-12512-У-1",
          color: "background: #D4D4D4;",
          status: false,
          id: "form5"
        }
      ],
      requestList: [
        {
          id: "r1",
          status: "Выполнена",
          city: "Екатеринбург",
          address: "ул. Союзная 27, кв.275",
          date: "10.01.2019",
          begin: "17.01.2019 17.32",
          endin: "17.01.2019 19.56",
          executor: "Васнецов Николай Евгеньевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
          price: "",
        },
        {
          id: "r2",
          status: "Открыта",
          city: "Екатеринбург",
          address: "ул. Союзная 27, кв.275",
          date: "11.01.2019",
          begin: "",
          endin: "",
          executor: "Васнецов Николай Евгеньевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
          price: "",
        },
        {
          id: "r3",
          status: "Выполнена",
          city: "Екатеринбург",
          address: "ул. Союзная 27, кв.275",
          date: "12.01.2019",
          begin: "17.01.2019 17.32",
          endin: "17.01.2019 19.56",
          executor: "Васюков Евгений Петрович",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
          price: "",
        },
        {
          id: "r4",
          status: "Открыта",
          city: "Екатеринбург",
          address: "ул. Союзная 27, кв.275",
          date: "13.01.2019",
          begin: "",
          endin: "",
          executor: "Попов Антон Андреевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
          price: "",
        },
        {
          id: "r5",
          status: "Открыта",
          city: "Екатеринбург",
          address: "ул. Союзная 27, кв.275",
          date: "14.01.2019",
          begin: "",
          endin: "",
          executor: "Васнецов Николай Евгеньевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
          price: "",
        },
        {
          id: "r6",
          status: "Выполнена",
          city: "Екатеринбург",
          address: "ул. Союзная 27, кв.275",
          date: "15.01.2019",
          begin: "17.01.2019 17.32",
          endin: "17.01.2019 19.56",
          executor: "Васюков Евгений Петрович",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
          price: "",
        },
        {
          id: "r7",
          status: "Открыта",
          city: "Екатеринбург",
          address: "ул. Союзная 27, кв.275",
          date: "16.01.2019",
          begin: "",
          endin: "",
          executor: "Попов Антон Андреевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
          price: "",
        },
        {
          id: "r8",
          status: "Открыта",
          city: "Екатеринбург",
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          begin: "",
          endin: "",
          executor: "Васнецов Николай Евгеньевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
          price: "",
        },
        {
          id: "r9",
          status: "Выполнена",
          city: "Екатеринбург",
          address: "ул. Союзная 27, кв.275",
          date: "18.01.2019",
          begin: "17.01.2019 17.32",
          endin: "17.01.2019 19.56",
          executor: "Васюков Евгений Петрович",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
          price: "",
        },
        {
          id: "r10",
          status: "Открыта",
          city: "Екатеринбург",
          address: "ул. Союзная 27, кв.275",
          date: "19.01.2019",
          begin: "",
          endin: "",
          executor: "Попов Антон Андреевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
          price: "",
        },
      ],

      isExForm: false,
      isReForm: false
    };
  },

  created: function() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
  },

  destroyed: function() {
        window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    handleResize: function() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        }
  },

  computed: {
    isOptionsLocked: function(){
      if (this.tabPosition != 1){
        return true
      } else {
        return false
      }
    },

    paneHorizontalSize: function() {
      var procent;
      if (this.window.width > 1240){
        procent = this.window.width / 100;
        return (400 / procent);
      }
    },

    paneVerticalSize: function() {
      var procent;
      procent = this.window.height / 100;
      return (380 / procent);
    },
    //Вычисение высоты основной карты в пикселях (фактически костыль, т.к экземпляр карты не принимает проценты)
    rightContentHeight: function() {
      return "height:"+(this.window.height - 160)+"px; ";
    },
    //Отфильтрованный список заявок
    filteredRequests: function() {
                return this.requestList.filter(elem => {
                    var res = true;

                    this.checkedRequests.forEach((val) => {
                        if (val.other === elem.status && val.status == false) {
                          res = false;
                        }
                    });

                    this.executors.forEach((val) => {
                        if (val.name === elem.executor && val.status == false) {
                          res = false;
                        }
                    });

                    this.checkedForms.forEach((val) => {
                        if (val.name === elem.form && val.status == false) {
                          res = false;
                        }
                    });
                    return res;
                })
            },
    //Отфильтрованный список работников
    filteredExecutors: function() {
                return this.executors.filter(elem => {
                    var res = true;

                    this.executors.forEach((val) => {
                        if (val.name == elem.name && val.status == false) {
                            res= false;
                        }
                    });

                    return res;
                })
            },
  },

  components: {
    Splitpanes,
    Pane,
    Header,
    TopFilters,
    ExecutorFilter,
    FormsFilter,
    RequestsTable,
    ExecutorsTable,
    ReportsTable,
    AddExecutor,
    AddRequest,
    GMap
  },

};
</script>

<style>

button {
  outline: none !important;
}

html,
body {
  height: 100%;
  overflow: scroll;
  min-width: 1240px;
}

content {
  background: #e5e5e5;
  height: inherit !important;
  min-width: 1240px;
}

.default-theme {
  height: 1036px;
}

.left__pane {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
}

.filters {
  position: absolute;
  top: 65px;
  right: 21px;
  left: 21px;
}

.filterbox {
  position: absolute;
  right: 21px;
  left: 21px;
}

.test2 {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.test1inner {
  position: absolute;
  min-width: 350px;
  min-height: 939px;
  background: green;
  left: 21px;
  right: 21px;
  top: 65px;
}

.inner2 {
  position: absolute;
  min-width: 320px;
  height: 45px;
  right: 15px;
  left: 15px;
  background: #000;
}

#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
}

h1,
h2 {
  font-size: 50px;
  padding-top: 300px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #fff;
}

/*Табы справа */
.nav-tabs {
  border: none;
  outline: none;
}

.nav-item a,
.active a {
  color: #000;
}

.nav-link.active, .nav-link.active:hover {
  border: none;
  border-color: #ffc368 !important;
  border-top: solid #ffc368 6px !important;
  border-radius: 0;
  height: 35px;
  padding-top: 2px;
  color: #000 !important;
}

.nav-item, .nav-link {
  border: 0;
  margin: 0;
  height: 37px;
  width: 200px;
  outline: none;
}

.nav-item:hover {
  color: #000;
  border: none;
}

.nav-link:hover {
  border: none;
}

.tab-pane.fade {
  transition: none;
}

.right__content {
  border: none;
  height: 100%;

}

.tab-content {
  height: calc(100% - 36px);
}

.tab-pane.show.fade.active {
  height: 100%;
  overflow: hidden;
}

.justbox {
  width: calc(100% - 38px);
  height: 100%;
  border: solid #000 0 0 2px 0;
  background: #fff;

}

span, a, h1, h2, label {       /*For text unselectable */
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge */
  user-select: none;           /* Non-prefixed version, currently not supported by any browser */
}

</style>
