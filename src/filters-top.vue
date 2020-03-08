<template>
    <div class="filters-body d-flex flex-column">
        <button class="filters__btn ml-auto mr-auto">Новая заявка</button>
        <Option class="filters__radio ml-auto mr-auto" :selected="selectedRadio" @radioChanged="localSelectedRadio = $event"></Option>
        <button class="filters__btn ml-auto mr-auto" style="margin-top: 35px;">{{date}}</button>
        <RequestsFilter
            class="filters__box ml-auto mr-auto"
            :checkedRequests="localCheckedRequests"
            @requestFilterChanged="RequestsForEmit = $event"
        ></RequestsFilter>

    </div>
</template>

<script>
    import Option from './filter-option.vue' //Переключатели Календарь/Карта/Таблица
    import RequestsFilter from './filter-requests.vue' //Блок с заявками

    export default {
        props:[
            'selectedRadio',
            'AllRequestsChecked',
            'checkedRequests',
            ],
        data() {
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
    width: 350px;
    height: 45px;
    font-weight: 600;
    font-size: 14px;
    border: 0;
}

.filters__btn:hover {
    background: #FFE6C0;
    transition: .3s;
}

.filters__radio {
    margin-top: 35px;
    margin-right: 0;
}

.filters__box {
    margin-top: 35px;
}

</style>