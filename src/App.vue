<template>
  <div id="app" style="height: 100%;">
    <Header
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
      <add-request
        v-if="isReForm"
        :isForm="isReForm"
        :forms="checkedForms"
        :executors="executors"
        :requests="requestList"
        @showReForm="isReForm = $event"
        @addNewRequest="requestList = $event"
      />
      <splitpanes class="default-theme" style="height: calc(100% - 44px)">
        <!--Левая часть (фильтры)-->
        <pane max-size="22">
          <splitpanes horizontal>
            <pane size="40">
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
        <pane size="78" style="padding: 30px 23px 32px 10px">
          <b-tabs class="right__content">
            <b-tab title="Заявки" @click="tabPosition = 1" active>
              <div class="justbox" v-if="selectedRadio == 'calendar'"><h1>Календарь</h1></div>
              <div class="justbox" v-if="selectedRadio == 'map'"><h1>Карта</h1></div>
              <div class="justbox" v-if="selectedRadio == 'table'"><Table
                                                        :requestList="requestList"
                                                        :requestsFilter="checkedRequests"
                                                        :executorsFilter="executors"
                                                        :formsFilter="checkedForms"
                                                        ></Table></div>
            </b-tab>
            <b-tab title="Исполнители" @click="tabPosition = 2">
                <div class="justbox" v-if="selectedRadio == 'table'"><TableExecutors
                                                        :requestList="requestList"
                                                        :executorsFilter="executors"
                                                        ></TableExecutors></div>
            </b-tab>
            <b-tab title="Отчеты" @click="tabPosition = 3">
              <div class="justbox">
                <h1>Отчеты</h1>
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
import TopFilters from "./filters-top.vue"; //Верхняя часть фильтров. Включает в себя фильтр по типу заявок.
import ExecutorFilter from "./filter-executors.vue"; //Фильтр по исполнителям.
import FormsFilter from "./filter-forms.vue"; //Фильтр по бланкам.
import Table from "./table.vue"; //Таблица с заявками.
import TableExecutors from "./tableExecutors.vue"; //Таблица с заявками.
import addExecutor from "./addExecutor.vue" //Модальное окно по добавлению исполнителя
import addRequest from "./addRequest.vue" //Модальное окно по добавлению заявки

export default {
  name: "app",
  data() {
    //Все значения приведенные здесь - считаются дефолтными.
    return {
      login: "admin",

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
          date: "17.01.2019",
          endin: "",
          executor: "Васнецов Николай Евгеньевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
        },
        {
          id: "r2",
          status: "Открыта",
          city: "Екатеринбург",
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          endin: "",
          executor: "Васнецов Николай Евгеньевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
        },
        {
          id: "r3",
          status: "Выполнена",
          city: "Екатеринбург",
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          endin: "",
          executor: "Васюков Евгений Петрович",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
        },
        {
          id: "r4",
          status: "Открыта",
          city: "Екатеринбург",
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          endin: "",
          executor: "Попов Антон Андреевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
        },
        {
          id: "r5",
          status: "Открыта",
          city: "Екатеринбург",
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          endin: "",
          executor: "Васнецов Николай Евгеньевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
        },
        {
          id: "r6",
          status: "Выполнена",
          city: "Екатеринбург",
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          endin: "",
          executor: "Васюков Евгений Петрович",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
        },
        {
          id: "r7",
          status: "Открыта",
          city: "Екатеринбург",
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          endin: "",
          executor: "Попов Антон Андреевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
        },
        {
          id: "r8",
          status: "Открыта",
          city: "Екатеринбург",
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          endin: "",
          executor: "Васнецов Николай Евгеньевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
        },
        {
          id: "r9",
          status: "Выполнена",
          city: "Екатеринбург",
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          endin: "",
          executor: "Васюков Евгений Петрович",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
        },
        {
          id: "r10",
          status: "Открыта",
          city: "Екатеринбург",
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          endin: "",
          executor: "Попов Антон Андреевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов",
          crm: "",
          instructions: "",
        },
      ],

      isExForm: false,
      isReForm: false
    };
  },

  computed: {
    isOptionsLocked(){
      if (this.tabPosition != 1){
        return true
      } else {
        return false
      }
    }
  },

  components: {
    Splitpanes,
    Pane,
    Header,
    TopFilters,
    ExecutorFilter,
    FormsFilter,
    Table,
    TableExecutors,
    addExecutor,
    addRequest
  }
};
</script>

<style>

button {
  outline: none !important;
}

html,
body {
  height: 100%;
}

content {
  background: #e5e5e5;
  height: inherit !important;
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
  font-weight: normal;
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

</style>
