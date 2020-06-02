<template>
    <div class="filters-body d-flex flex-column">
        <div class="d-flex justify-content-between ml-auto mr-auto" style="width: 350px">
            <button class="filters__btn">Новая заявка</button>
            <Option 
            class="filters__radio" 
            :selected="selectedRadio"
            :isLocked="isOptionsLocked"
            @radioChanged="localSelectedRadio = $event"
            ></Option>
        </div>
        <RequestsFilter
            class="filters__box ml-auto mr-auto"
            :checkedRequests="localCheckedRequests"
            @requestFilterChanged="RequestsForEmit = $event"
        ></RequestsFilter>

    </div>
</template>

<script>
    import Option from './Options.vue' //Переключатели Календарь/Карта/Таблица
    import RequestsFilter from './RequestsFilter.vue' //Блок с заявками

    export default {
        props:[
            'selectedRadio',
            'AllRequestsChecked',
            'checkedRequests',
            'isOptionsLocked'
            ],
        data: function() {
            return{
                date: '25/01/2019 - 29/01/2019',
                RequestsForEmit: [],
                localCheckedRequests: this.checkedRequests,
                localSelectedRadio: ''
            }
        },
        watch: {
            localSelectedRadio: function() {
                this.$emit('radioChanged', this.localSelectedRadio)
            },
            RequestsForEmit: function() {
                this.$emit('requestFilterChanged', this.RequestsForEmit)
            }
        },
        components: {
            Option,
            RequestsFilter
        }
    }
</script>

<style>

.filters-body {
    height: 450px;
    min-width: 350px;
    position: absolute;
}

.filters__btn {
    border-radius: 5px;
    background: #FFD79A;
    border-color: #FFD79A;
    outline: none;
    white-space: nowrap;
    width: 170px;
    height: 45px;
    font-weight: 600;
    font-size: 14px;
    border: 0;
}

.filters__btn:hover {
    background: #FFE6C0;
    transition: .3s;
}

.filters__box {
    margin-top: 35px;
}

</style>