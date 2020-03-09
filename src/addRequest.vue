<template>
<div class="modal__req d-flex justify-content-center align-items-center">
    <div class="modal__req__content d-flex">
        <div class="request__form">
            <form class="d-flex flex-column align-items-start reqForm">
                <div class="d-flex"><h1>АДРЕС</h1><span class="some__span1">Укажите на карте или введите вручную</span></div>

                <div class="row1 d-flex justify-content-between">
                    <div class="st d-flex align-items-center">
                        <span class="some__span2">Улица, дом, кв.</span>
                        <input class="medium__text" type="text">
                    </div>
                    <div class="st d-flex align-items-center">
                        <span class="some__span2">Город</span>
                        <input class="medium__text" type="text" value="Екатеринбург">
                    </div>
                </div>

                <h1 style="margin-top: 20px">ДАТА</h1>

                <div class="row1 d-flex align-items-center">
                    <span class="some__span2">C</span>
                    <input class="little__text" type="text" placeholder="Дата">
                    <input class="little__text" style="margin-right: 32px" type="text" placeholder="Время">
                    <span class="some__span2">По</span>
                    <input class="little__text"  type="text" placeholder="Дата">
                    <input class="little__text" type="text" placeholder="Время">
                </div>

                <h1 style="margin-top: 20px">ЗАДАНИЕ</h1>
                <input class="max__text" type="text">

                <h1 style="margin-top: 20px">БЛАНК</h1>
                <select class="max__text" style="cursor: pointer">
                    <option value="forms[0].name">{{ forms[0].name }} (по умолчанию)</option>
                    <option v-for="form in forms" value="form.name" v-if="form.name != forms[0].name">{{ form.name }}</option>
                </select>

                <h1 style="margin-top: 20px">ИСПОЛНИТЕЛЬ</h1>
                <select class="max__text" style="cursor: pointer">
                    <option value="Any">Выбрать всех (по умолчанию)</option>
                    <option v-for="executor in executors" value="executor.name">{{ executor.name }}</option>
                </select>

                <h1 style="margin-top: 20px">CRM-ССЫЛКА</h1>
                <input class="max__text" type="text">

                <h1 style="margin-top: 20px">ИНСТРУКЦИЯ</h1>
                <textarea class="max__text" style="height: 67px" wrap="soft"></textarea>

                <div class="req__modal__footer d-flex justify-content-center">
                    <button class="req__btn" @click="showReForm">ОТМЕНИТЬ</button>
                    <input type="submit" class="req__btn" value="СОХРАНИТЬ">
                </div>
            </form>
        </div>
        <div class="request__map"></div>
    </div>
</div>
</template>

<script>
export default {
    props: ["forms", "executors", "isForm"],

    data() {
        return {
            localIsForm: this.isForm
        }
    },

    methods: {
        showReForm() {
            this.localIsForm = false
        }
    },
        
    watch: {
        localIsForm() {
            this.$emit('showReForm', this.localIsForm)
        }
    }

}
</script>

<style>

.modal__req {
    position: absolute;
    width: 100%;
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