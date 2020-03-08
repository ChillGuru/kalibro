<template>
<div class="modal__ex d-flex justify-content-center align-items-center">
    <div class="modal__ex__content">
        <form class="d-flex flex-column align-items-start ExForm">
            <label for="#ExName">ФИО</label>
            <input type="text" class="executorInput" id="ExName">
            <label for="#ExEmail">E-MAIL</label>
            <input type="e-mail" class="executorInput" id="ExEmail">
            <label for="#ExPass">ПАРОЛЬ</label>
            <input type="password" class="executorInput" id="ExPass">
            <label for="#ExPassCheck">ПОДТВЕРЖДЕНИЕ ПАРОЛЯ</label>
            <input type="password" class="executorInput" id="ExPassCheck">
            <label for="#ExNumber">ТЕЛЕФОН</label>
            <input type="text" class="executorInput" id="ExNumber">
        </form>
        <div class="ex__modal__footer d-flex justify-content-center">
                <button class="ex__btn" @click="showExForm">ОТМЕНИТЬ</button>
                <input type="submit" class="ex__btn" value="СОХРАНИТЬ">
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ["isForm"],

    data() {
        return {
        localIsForm: this.isForm
        }
    },

    methods: {
        showExForm() {
            this.localIsForm = false
        }
    },
        
    watch: {
        localIsForm() {
            this.$emit('showExForm', this.localIsForm)
        }
    }

}
</script>

<style>

.modal__ex {
    position: absolute;
    width: 100%;
    height: calc(100% - 44px);
    z-index: 1050;
    background: rgba(0, 0, 0, 0.3);
}

.modal__ex__content {
    position: relative;
    width: 550px;
    height: auto;
    background: #FFF;
    padding: 20px 35px 33px 35px;
    border: 1px solid #000000;
}

.ExForm {
    width: 100%;
    height: auto;
}

.executorInput {
    width: 480px;
    height: 30px;
    background: #E9E9E9;
    color: #000;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 20px;
    border: 0;
    outline: none;
    padding-left: 10px;
}

.ExForm label {
    margin: 0 !important;
    line-height: 15px;
    font-weight: 600;
    font-size: 12px;
}

.ex__modal__footer {
    width: 100%;
    margin-top: 20px;
}

.ex__btns {
    max-width: 181px;
    height: auto;
}

.ex__btn {
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

.ex__btn:hover {
    background: #FFE6C0;
    transition: .3s;
}

</style>