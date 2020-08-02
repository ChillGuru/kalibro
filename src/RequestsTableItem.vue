<template>
    <div class="table__item">
        <input
            style="display: none"
            type="checkbox"
            :id="this.requestInfo.id"
            :value="this.requestInfo"
            v-model="view"
        />
        <label class="req__content d-flex" :for="this.requestInfo.id">
        <ul class="item__values d-flex align-items-center" style="width: 100%">
            <li style="width: 3%"><div class="status__color" :style="reqColor(this.requestInfo.status)"></div></li>
            <li style="width: 8%">{{this.requestInfo.status}}</li>
            <li style="width: 20%"> {{this.requestInfo.address}}</li>
            <li style="width: 7%"> {{this.requestInfo.date}} </li>
            <li style="width: 20%">{{this.requestInfo.executor}}</li>
            <li style="width: 3%"><div class="status__color" :style="formColor(this.requestInfo.form)"></div></li>
            <li style="width: 12%">{{this.requestInfo.form}}</li>
            <li style="width: 17%">{{this.requestInfo.task}}</li>
        </ul>
        </label>
        <div class="panel" v-if="view">
            <div class="d-flex">
                <div style="width: 1201px; height: 271;">
                <Map
                :center="[this.marker.lat, this.marker.lng]"
                :crop="16"
                :kind="'marker'"
                :markers="this.marker">
                </Map>
                </div>
                <div class="panel__btns">
                    <button class="panel__btn">Удалить</button>
                    <button class="panel__btn" style="margin-top: 30px">Изменить</button>
                    <button class="panel__btn" style="margin-top: 30px">Подробнее</button>
                    <button class="panel__btn" style="margin-top: 30px">Отчет</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';
import Map from "./SimpleMap.vue" //Карта

export default {
    props: ['requestInfo', 'marker'],

    data() {
        return {
            view: false
        }
    },

    methods: {
        reqColor(name) {
            switch (name) {
                case "Открыта":
                    return "background: #FFD79A"                        
                case "Принята":
                    return "background: #D993D0"
                case "Выполнена":
                    return "background: #82DBB1"
            }
        },
        formColor(form) {
                let color = ''
                this.FORMS.forEach((val, i) => {
                        if (val.name == form) {
                            color = val.color
                        }
                    })
                return color
        }
    },

    computed: {
        ...mapGetters([
            'FORMS'
        ])
    },

    components: {Map}
}
</script>

<style>

    
</style>