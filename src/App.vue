<template>
  <div id="app" style="height: 100%;">
    <Header
      :isExForm="isExForm"
      :isReForm="isReForm"
      @showExForm="isExForm = $event"
      @showReForm="isReForm = $event"
    ></Header>
      <!--Форма добавления нового исполнителя-->
      <add-executor
        v-if="isExForm"
        @showExForm="isExForm = $event"
      />
      <add-request
        v-if="isReForm"
        :forms="checkedForms"
        :executors="checkboxNames"
        @showReForm="isReForm = $event"
      />
      <splitpanes class="default-theme" style="height: calc(100% - 44px)">
        <!--Левая часть (фильтры)-->
        <pane max-size="22">
          <splitpanes horizontal>
            <pane size="35">
              <div class="left__pane">
                <TopFilters
                  class="filters"
                  :selectedRadio="selectedRadio"
                  :AllRequestsChecked="AllRequestsChecked"
                  :checkedRequests="checkedRequests"
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
                  :names="checkboxNames"
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
            <b-tab title="Заявки" active>
              <div class="justbox">
              <div v-if="selectedRadio == 'calendar'"><h1>Календарь</h1></div>
              <div v-if="selectedRadio == 'map'"><h1>Карта</h1></div>
              <div v-if="selectedRadio == 'table'"><h1><Table
                                                        :requestList="requestList"
                                                        :requestsFilter="checkedRequests"
                                                        :executorsFilter="checkboxNames"
                                                        :formsFilter="checkedForms"
                                                        ></Table></h1></div>
              </div>
            </b-tab>
            <b-tab title="Исполнители">
              <div class="justbox">
                <h1>Исполнители</h1>
              </div>
            </b-tab>
            <b-tab title="Отчеты">
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
                  <li v-for="n in checkboxNames">{{ n.name }}: {{ n.status }}</li>
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
import addExecutor from "./addExecutor.vue" //Модальное окно по добавлению исполнителя
import addRequest from "./addRequest.vue" //Модальное окно по добавлению заявки

export default {
  name: "app",
  data() {
    //Все значения приведенные здесь - считаются дефолтными.
    return {
      selectedRadio: "table", //Значения: calendar, map или table. Это радиокнопки  в фильтрах.

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
      checkboxNames: [
        {
          name: "Васнецов Николай Евгеньевич",
          status: true,
          id: "name1"
        },
        {
          name: "Романов Александр Николаевич",
          status: false,
          id: "name2"
        },
        {
          name: "Прокопьев Владимир Дмитриевич",
          status: false,
          id: "name3"
        },
        {
          name: "Попов Антон Андреевич",
          status: false,
          id: "name4"
        },
        {
          name: "Васюков Евгений Петрович",
          status: false,
          id: "name5"
        },
        {
          name: "Some name #6",
          status: false,
          id: "name6"
        },
        {
          name: "Some name #7",
          status: false,
          id: "name7"
        },
        {
          name: "Some name #8",
          status: false,
          id: "name8"
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
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          executor: "Васнецов Николай Евгеньевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов"
        },
        {
          id: "r2",
          status: "Открыта",
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          executor: "Васнецов Николай Евгеньевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов"
        },
        {
          id: "r3",
          status: "Выполнена",
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          executor: "Васюков Евгений Петрович",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов"
        },
        {
          id: "r4",
          status: "Открыта",
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          executor: "Попов Антон Андреевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов"
        },
        {
          id: "r5",
          status: "Открыта",
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          executor: "Васнецов Николай Евгеньевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов"
        },
        {
          id: "r6",
          status: "Выполнена",
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          executor: "Васюков Евгений Петрович",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов"
        },
        {
          id: "r7",
          status: "Открыта",
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          executor: "Попов Антон Андреевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов"
        },
        {
          id: "r8",
          status: "Открыта",
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          executor: "Васнецов Николай Евгеньевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов"
        },
        {
          id: "r9",
          status: "Выполнена",
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          executor: "Васюков Евгений Петрович",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов"
        },
        {
          id: "r10",
          status: "Открыта",
          address: "ул. Союзная 27, кв.275",
          date: "17.01.2019",
          executor: "Попов Антон Андреевич",
          formColor: "Background: #84D2DE",
          form: "Бланк для окон",
          task: "Замер оконных проёмов"
        },
      ],

      isExForm: false,
      isReForm: false
    };
  },

  components: {
    Splitpanes,
    Pane,
    Header,
    TopFilters,
    ExecutorFilter,
    FormsFilter,
    Table,
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
}

.justbox {
  width: calc(100% - 38px);
  height: 100%;
  border: solid #000 0 0 2px 0;
  background: #fff;
}

</style>
