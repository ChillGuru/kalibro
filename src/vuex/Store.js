import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        login: "admin", //Не трогать
        selectedRadio: "table", //Значения: calendar, map или table. Это радиокнопки  в фильтрах.
        tabPosition: 1, //выбранная вкладка
        isExForm: false, //видимость формы добавления заявки
        isReForm: false, //видимость формы добавления исполнителя
        AllRequestsChecked: true, //флажок "Выбрать все заявки" в фильтре заявок
        allNamesChecked: false, //флажок "Выбрать всех исполнителей" в фильтре исполнителей
        allFormsChecked: false, //флажок "Выбрать все формы" в фильтре форм
        Markers: [
            {id: 'r1', lat: 56.8380, lng: 60.5974},
            {id: 'r2', lat: 56.8350, lng: 60.5974},
            {id: 'r3', lat: 56.8320, lng: 60.5974},
            {id: 'r4', lat: 56.8290, lng: 60.5974},
            {id: 'r5', lat: 56.8410, lng: 60.5974},
            {id: 'r6', lat: 56.8440, lng: 60.5974},
            {id: 'r7', lat: 56.8470, lng: 60.5974},
            {id: 'r8', lat: 56.8260, lng: 60.5974},
            {id: 'r9', lat: 56.8230, lng: 60.5974},
            {id: 'r10', lat: 56.8350, lng: 60.5954},
        ],

        checkedRequests: [ //Фильтр по типу заявок.
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
        Executors: [],
        Forms: [],
        requestList: []
    },

    mutations: {
        SET_SELECTED_RADIO: (state, selectedRadio) => {
            state.selectedRadio = selectedRadio;
        },
        SET_TAB_POSITION: (state, tabPosition) => {
            state.tabPosition = tabPosition;
        },
        SET_CHECKED_REQUESTS: (state, checkedRequests) => {
            state.checkedRequests = checkedRequests;
        },
        SET_EXECUTOR_FORM_VISIBLE: (state, isExForm) => {
            state.isExForm = isExForm;
        },
        SET_REQUEST_FORM_VISIBLE: (state, isReForm) => {
            state.isReForm = isReForm;
        },
        SET_ALL_REQUESTS_CHECKED: (state, AllRequestsChecked) => {
            state.AllRequestsChecked = AllRequestsChecked;
        },
        SET_ALL_NAMES_CHECKED: (state, allNamesChecked) => {
            state.allNamesChecked = allNamesChecked;
        },
        SET_ALL_FORMS_CHECKED: (state, allFormsChecked) => {
            state.allFormsChecked = allFormsChecked;
        },
        SET_EXECUTORS_TO_STATE: (state, Executors) => {
            state.Executors = Executors;
        },
        SET_FORMS_TO_STATE: (state, Forms) => {
            state.Forms = Forms;
        },
        SET_REQUESTLIST_TO_STATE: (state, requestList) => {
            state.requestList = requestList;
        },
        SET_REQUEST: (state, request) => {
            state.requestList.push(request)
        },
        SET_EXECUTOR: (state, executor) => {
            state.Executors.push(executor)
        },
        SET_FORM: (state, form) => {
            state.Forms.push(form)
        },
    },

    actions: {
        UPD_SELECTED_RADIO({commit}, selectedRadio) {
            this.commit('SET_SELECTED_RADIO', selectedRadio)
        },
        UPD_TAB_POSITION({commit}, tabPosition) {
            this.commit('SET_TAB_POSITION', tabPosition)
        },
        UPD_CHECKED_REQUESTS({commit}, checkedRequests) {
            this.commit('SET_CHECKED_REQUESTS', checkedRequests)
        },
        UPD_EXECUTOR_FORM_VISIBLE({commit}, isExForm) {
            this.commit('SET_EXECUTOR_FORM_VISIBLE', isExForm)
        },
        UPD_REQUEST_FORM_VISIBLE({commit}, isReForm) {
            this.commit('SET_REQUEST_FORM_VISIBLE', isReForm)
        },
        UPD_ALL_REQUESTS_CHECKED({commit}, AllRequestsChecked) {
            this.commit('SET_ALL_REQUESTS_CHECKED', AllRequestsChecked)
        },
        UPD_ALL_NAMES_CHECKED({commit}, allNamesChecked) {
            this.commit('SET_ALL_NAMES_CHECKED', allNamesChecked)
        },
        UPD_ALL_FORMS_CHECKED({commit}, allFormsChecked) {
            this.commit('SET_ALL_FORMS_CHECKED', allFormsChecked)
        },
        GET_EXECUTORS({commit}) {
            return Axios('http://localhost:3000/Executors', {
                method: "GET"
            })
            .then((Executors) => {
                    commit('SET_EXECUTORS_TO_STATE', Executors.data);
            })
            .catch((error) => {
                    console.log(error)
            })
        },
        GET_FORMS({commit}) {
            return Axios('http://localhost:3000/Forms', {
                method: "GET"
            })
            .then((Forms) => {
                    commit('SET_FORMS_TO_STATE', Forms.data);
            })
            .catch((error) => {
                    console.log(error)
            })
        },
        GET_REQUESTLIST({commit}) {
            return Axios('http://localhost:3000/requestList', {
                method: "GET"
            })
            .then((requestList) => {
                    commit('SET_REQUESTLIST_TO_STATE', requestList.data);
            })
            .catch((error) => {
                    console.log(error)
            })
        },

        UPD_EXECUTORS_IN_LOCAL({commit}, Executors) {
            this.commit('SET_EXECUTORS_TO_STATE', Executors)
        },
        UPD_REQUESTLIST_IN_LOCAL({commit}, requestList) {
            this.commit('SET_REQUESTLIST_TO_STATE', requestList)
        },
        UPD_FORMS_IN_LOCAL({commit}, requestList) {
            this.commit('SET_FORMS_TO_STATE', requestList)
        },
        ADD_REQUEST({commit}, request) {
            this.commit('SET_REQUEST', request)
        },
        ADD_EXECUTOR({commit}, executor) {
            this.commit('SET_EXECUTOR', executor)
        },
        ADD_FORM({commit}, form) {
            this.commit('SET_FORM', form)
        },

    },

    getters: {
        LOGIN(state){
            return state.login
        },
        SELECTED_RADIO(state){
            return state.selectedRadio
        },
        TAB_POSITION(state){
            return state.tabPosition
        },
        EXECUTOR_FORM_VISIBLE(state){
            return state.isExForm
        },
        REQUEST_FORM_VISIBLE(state){
            return state.isReForm
        },
        ALL_REQUESTS_CHECKED(state){
            return state.AllRequestsChecked
        },
        ALL_NAMES_CHECKED(state){
            return state.allNamesChecked
        },
        ALL_FORMS_CHECKED(state){
            return state.allFormsChecked
        },
        CHECKED_REQUESTS(state){
            return state.checkedRequests
        },
        EXECUTORS(state){
            return state.Executors
        },
        FORMS(state){
            return state.Forms
        },
        REQUESTLIST(state){
            return state.requestList
        },
    }
});
