<template>
<div class="modal__req d-flex justify-content-center align-items-center">
    <div class="modal__req__content d-flex">
        <div class="request__form">
            <form class="d-flex flex-column align-items-start reqForm">
                <div class="d-flex"><h1>АДРЕС</h1><span class="some__span1">Укажите на карте или введите вручную</span></div>

                <div class="row1 d-flex justify-content-between">
                    <div class="st d-flex align-items-center">
                        <span class="some__span2">Улица, дом, кв.</span>
                        <input class="medium__text" type="text" v-model="newReq.address">
                    </div>
                    <div class="st d-flex align-items-center">
                        <span class="some__span2">Город</span>
                        <input class="medium__text" type="text" v-model="newReq.city" placeholder="Екатеринбург">
                    </div>
                </div>

                <h1 style="margin-top: 20px">ДАТА</h1>

                <div class="row1 d-flex align-items-center">
                    <span class="some__span2">C</span>
                    <input class="little__text" type="text" id="date__mask" v-model="newReq.date" placeholder="Дата">
                    <input class="little__text" style="margin-right: 32px" type="text" id="time__mask" v-model="starttime" placeholder="Время">
                    <span class="some__span2">По</span>
                    <input class="little__text"  type="text" id="date__mask2" v-model="newReq.endin" placeholder="Дата">
                    <input class="little__text" type="text" id="time__mask2" v-model="endtime" placeholder="Время">
                </div>

                <h1 style="margin-top: 20px">ЗАДАНИЕ</h1>
                <input class="max__text" v-model="newReq.task" type="text">

                <h1 style="margin-top: 20px">БЛАНК</h1>
                <select class="max__text" v-model="newReq.form" style="cursor: pointer">
                    <option :value="FORMS[0].name">{{ FORMS[0].name }} (по умолчанию)</option>
                    <option v-for="form in FORMS" :value="form.name" v-if="form.name != FORMS[0].name">{{ form.name }}</option>
                </select>

                <h1 style="margin-top: 20px">ИСПОЛНИТЕЛЬ</h1>
                <select class="max__text" v-model="newReq.executor" style="cursor: pointer">
                    <option value="-">Выбрать всех (по умолчанию)</option>
                    <option v-for="executor in EXECUTORS" :value="executor.name">{{ executor.name }}</option>
                </select>

                <h1 style="margin-top: 20px">CRM-ССЫЛКА</h1>
                <input class="max__text" type="text" v-model="newReq.crm" >

                <h1 style="margin-top: 20px">ИНСТРУКЦИЯ</h1>
                <textarea class="max__text" v-model="newReq.instructions" style="height: 67px" wrap="soft"></textarea>
            </form>
            <div class="req__modal__footer d-flex justify-content-center">
                    <button class="req__btn" @click="UPD_REQUEST_FORM_VISIBLE(false)">ОТМЕНИТЬ</button>
                    <button class="req__btn" @click="addNewReq">СОХРАНИТЬ</button>
                </div>
        </div>
        <div style="width: 550px; height: 642px;">
            <Map
            :center="[56.8380, 60.5974]"
            :crop="15"
            :kind="''"
            :markers="''"
            ></Map>
        </div>
    </div>
</div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';
import Inputmask from 'inputmask'; //Маски ввода
import Map from "./SimpleMap.vue" //Карта

export default {
    data() {
        return {
            all: 'Все',
            startdate: "",
            starttime: "",
            enddate: "",
            endtime: "",
            newReq: {
                id: "",
                status: "Открыта",
                city: "Екатеринбург",
                address: "",
                date: this.startdate,
                endin: this.endtdate,
                executor: "",
                formColor: "",
                form: "",
                task: "",
                crm: "",
                instructions: "",
            },
        }
    },

    mounted() {
        let im = new Inputmask("99/99/9999")
        im.mask(document.getElementById('date__mask'))
        let im2 = new Inputmask("99:99")
        im2.mask(document.getElementById('time__mask'))
        let im3 = new Inputmask("99/99/9999")
        im3.mask(document.getElementById('date__mask2'))
        let im4 = new Inputmask("99:99")
        im4.mask(document.getElementById('time__mask2'))
    },

    methods: {
        ...mapActions([
            'UPD_REQUEST_FORM_VISIBLE',
            'UPD_REQUESTLIST_IN_LOCAL',
            'ADD_REQUEST',
            'UPD_MARKERS'
        ]),

        addNewReq() {
            let local = this.REQUESTLIST
            if (this.newReq.city == ''){console.log('Данные не приняты')}
            else if (this.newReq.address == ''){console.log('Данные не приняты')}
            else if (this.newReq.task == ''){console.log('Данные не приняты')}
            else if (this.newReq.form == ''){console.log('Данные не приняты')}
            else if (this.newReq.executor == ''){console.log('Данные не приняты')}
            else {
                let bg = ''
                this.newReq.id = Math.random() * (9999999 - 1) + 1
                bg = Math.floor(Math.random() * 899) + 100
                this.FORMS.forEach((val) => {
                    if (val.name == this.newReq.form) {
                    this.newReq.color = val.color
                    }
                })
                let marker = {
                    id: this.newReq.id,
                    lat: 56.880703,
                    lng: 60.510625
                }
                this.UPD_MARKERS(marker)
                this.ADD_REQUEST(this.newReq)
                this.UPD_REQUEST_FORM_VISIBLE(false)
            }
        },
    },
    
    computed: {
        ...mapGetters([
            'FORMS',
            'EXECUTORS',
            'REQUESTLIST'
        ])
    },

    components: {
        Map
    }
}
</script>

<style>

.modal__req {
    position: absolute;
    width: 100%;
    min-width: 1240px;
    height: calc(100% - 44px);
    z-index: 1050;
    background: rgba(0, 0, 0, 0.3);
}

.modal__req__content {
    position: relative;
    width: 1100px;
    height: auto;
    background: #FFF;
    border: 1px solid #000000;
}

.request__map {
    width: 550px;
    background: url("./assets/map_modal.png") no-repeat;
    background-size: 550px 100%;
}

.request__form {
    width: 550px;
    padding: 20px 30px 20px 38px;
}

.reqForm {
    width: 100%;
    height: auto;
}

.reqForm h1 {
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
}

.some__span1 {
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
    color: #9E9E9E;
    margin-left: 14px;
}

.reqForm h1 {
    padding: 0;
}

.row1 {
    width: 100%;
}

.some__span2 {
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
    margin-right: 4px;
}

.medium__text, .little__text, .max__text {
    width: 150px;
    height: 30px;
    background: #E9E9E9;
    border-radius: 5px;
    border: 0;
    padding-left: 13px;
    outline: none;
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
}

.little__text {
    width: 73px;
    text-align: center;
    margin-left: 24px;
    padding: 0;
}

.max__text {
    width: 480px;
}

.req__modal__footer {
    width: 100%;
    margin-top: 20px;
}

.req__btns {
    max-width: 181px;
    height: auto;
}

.req__btn {
    font-size: 9px;
    font-weight: 300;
    border: 0;
    background: #FFD79A;
    border-radius: 5px;
    width: 100px;
    height: 28px;
    margin: 0px 10px;
    outline: none;
}

.req__btn:hover {
    background: #FFE6C0;
    transition: .3s;
}

</style>