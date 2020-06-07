<template>
    <div class="table__item">
        <input
                    style="display: none"
                    type="checkbox"
                    :id="this.requestInfo.id"
                    :value="this.requestInfo"
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
                <div class="panel">
                    <div class="d-flex">
                        <GMap style="width: 100%"
                        :size="mapSize"
                        :zoom="16"
                        :requests="null"></GMap>
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
import {mapActions, mapGetters} from 'vuex';
import GMap from "./GoogleMap.vue"; //Карта

export default {
    props: ['requestInfo'],

    data: function() {
        return {
            mapWidth: 0
        }
    },

    methods: {
        reqColor: function(name) {
            switch (name) {
                case "Открыта":
                    return "background: #FFD79A";                        
                case "Принята":
                    return "background: #D993D0";
                case "Выполнена":
                    return "background: #82DBB1";
            }
        },
        formColor: function(form) {
                var color = '';
                this.FORMS.forEach((val, i) => {
                        if (val.name == form) {
                            color = val.color;
                        }
                    });
                return color;
        },
        handleResize: function() {
            this.mapWidth = window.innerWidth;
        }
    },

    created: function() {
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
    },

    destroyed: function() {
            window.removeEventListener('resize', this.handleResize);
    },

    computed: {
        ...mapGetters([
            'FORMS'
        ]),
        mapSize: function() {
            var size = String;
            size = "width: inherit; "+"height: 271px;";
            return size;
        }
    },

    components: {GMap}
}
</script>

<style>

    
</style>