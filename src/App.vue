<template>
  <div id="app" class="main" style="height: 100%;">
    <Header
      style="min-width: 1240px;"
    ></Header>
      <!--Форма добавления нового исполнителя-->
      <add-executor
        v-if="EXECUTOR_FORM_VISIBLE"
        @addNewExecutor="EXECUTORS = $event"
      />
      <!--Форма добавления новой заявки-->
      <add-request
        v-if="REQUEST_FORM_VISIBLE"
      />
      <splitpanes class="default-theme" style="height: calc( 100% - 62px)">
        <!--Левая часть (фильтры)-->
        <pane :size='paneHorizontalSize' :max-size='paneHorizontalSize'>
          <splitpanes horizontal>
            <pane :size='paneVerticalSize'>
              <div class="left__pane">
                <TopFilters
                  class="filters"
                  :isOptionsLocked="isOptionsLocked"
                ></TopFilters>
              </div>
            </pane>
            <pane style="position: relative">
              <div class="left__pane">
                <ExecutorFilter
                  class="filterbox"
                ></ExecutorFilter>
              </div>
            </pane>
            <pane>
              <div class="left__pane">
                <FormsFilter
                  class="filterbox"
                ></FormsFilter>
              </div>
            </pane>
          </splitpanes>
        </pane>
        <!--Правая часть-->
        <pane :size='100-paneHorizontalSize' style="padding: 30px 23px 32px 10px">
          <b-tabs class="right__content">
            <!--Вкладка "Заявки"-->
            <b-tab title="Заявки" @click="UPD_TAB_POSITION(1)" active>
              <div class="justbox" v-if="SELECTED_RADIO == 'calendar'">
                <h1>Данная опция на стадии разработки</h1>
                <img src="./assets/works.png" alt="works" style="height: 100px; weight:100px;">
              </div>
              <!--Карта-->
              <div class="justbox" v-if="SELECTED_RADIO == 'map'">
                <Map
                :center="[56.8380, 60.5974]"
                :crop="14"
                :kind="'circle'"
                :markers="filteredMarkers"
                :key="counter">
                </Map>
              </div>
              <div class="justbox" v-if="SELECTED_RADIO == 'table'">
                <RequestsTable
                :requests="filteredRequests"
                ></RequestsTable>
              </div>
            </b-tab>
            <!--Вкладка "Исполнители"-->
            <b-tab title="Исполнители" @click="UPD_TAB_POSITION(2); UPD_SELECTED_RADIO('table');">
                <div class="justbox" v-if="SELECTED_RADIO == 'table'">
                  <ExecutorsTable
                    :executors="filteredExecutors"
                  ></ExecutorsTable>
                </div>
            </b-tab>
            <!--Вкладка "Отчеты"-->
            <b-tab title="Отчеты" @click="UPD_TAB_POSITION(3); UPD_SELECTED_RADIO('table');">
              <div class="justbox" v-if="SELECTED_RADIO == 'table'">
                <ReportsTable
                ></ReportsTable>
              </div>
            </b-tab>
          </b-tabs>
        </pane>
      </splitpanes>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';
import { Splitpanes, Pane } from "splitpanes"; //Сплитеры.
import "splitpanes/dist/splitpanes.css"; //Стили сплитеров.
import Header from "./header.vue"; //Хедер (ваш Кэп).
import TopFilters from "./TopFilters.vue"; //Верхняя часть фильтров. Включает в себя фильтр по типу заявок.
import ExecutorFilter from "./ExecutorsFilter.vue"; //Фильтр по исполнителям.
import FormsFilter from "./FormsFilter.vue"; //Фильтр по бланкам.
import RequestsTable from "./RequestsTable.vue"; //Таблица с заявками.
import ExecutorsTable from "./ExecutorsTable.vue"; //Таблица с исполнителями.
import ReportsTable from "./ReportsTable.vue"; //Таблица с отчетами.
import Map from "./SimpleMap.vue"; //Карта
import AddExecutor from "./addExecutor.vue"; //Модальное окно по добавлению исполнителя
import AddRequest from "./addRequest.vue" //Модальное окно по добавлению заявки

export default {
  name: "app",
  data() {
    return {
      window: {
        height: window.innerHeight,
        width: window.innerWidth,
      },
      counter: 0,
    };
  },

  mounted() {
    this.GET_EXECUTORS();
    this.GET_FORMS();
    this.GET_REQUESTLIST();
  },

  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    ...mapActions([
      'UPD_SELECTED_RADIO',
      'UPD_TAB_POSITION',
      'GET_EXECUTORS',
      'GET_FORMS',
      'GET_REQUESTLIST'
    ]),
    
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    }
  },

  computed: {
    ...mapGetters([
      'EXECUTORS',
      'FORMS',
      'REQUESTLIST',
      'LOGIN',
      'SELECTED_RADIO',
      'TAB_POSITION',
      'EXECUTOR_FORM_VISIBLE',
      'REQUEST_FORM_VISIBLE',
      'CHECKED_REQUESTS'
    ]),

    ...mapState(['Markers']),

    upgradeMarkers() {
      let Marks = []
      this.Markers.forEach((val) => {
        this.REQUESTLIST.forEach((val2) => {
            if (val.id == val2.id) {
              Marks.push(Object.assign(val2, val))
            }
        })
      })
      return Marks
    },

    filteredMarkers() {
      return this.upgradeMarkers.filter(elem => {
        let res = true
        this.CHECKED_REQUESTS.forEach((val) =>{
          if (elem.status == val.other && val.status == false) {
            res = false
          }
        })
        this.EXECUTORS.forEach((val) =>{
          if (elem.executor == val.name && val.status == false) {
            res = false
          }
        })
        this.FORMS.forEach((val) =>{
          if (elem.form == val.name && val.status == false) {
            res = false
          }
        })
        return res
      })
    },

    isOptionsLocked(){
      if (this.TAB_POSITION != 1){
        return true
      } else {
        return false
      }
    },

    paneHorizontalSize() {
      if (this.window.width > 1239){
        return (400 / (this.window.width / 100))
      } else {return 32}
    },

    paneVerticalSize() {
      return (380 / (this.window.height / 100))
    },
    //Вычисение высоты основной карты в пикселях (фактически костыль, т.к экземпляр карты не принимает проценты)
    rightContentHeight() {
      return "height:"+(this.window.height - 160)+"px; "
    },
    //Отфильтрованный список заявок
    filteredRequests() {
      return this.REQUESTLIST.filter(elem => {
        let res = true

        this.CHECKED_REQUESTS.forEach((val) => {
          if (val.other === elem.status && val.status == false) {
            res = false
          }
        })

        this.EXECUTORS.forEach((val) => {
          if (val.name === elem.executor && val.status == false) {
            res = false
          }
        })

        this.FORMS.forEach((val) => {
          if (val.name === elem.form && val.status == false) {
            res = false
          }
        })
        return res
      })
    },
    //Отфильтрованный список работников
    filteredExecutors() {
                return this.EXECUTORS.filter(elem => {
                    let res = true

                    this.EXECUTORS.forEach((val) => {
                        if (val.name == elem.name && val.status == false) {
                            res= false
                        }
                    })
                    return res
                })
            },
  },

  watch: {
    filteredMarkers() {
      this.counter = this.counter + 1
    }
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
    Map
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
