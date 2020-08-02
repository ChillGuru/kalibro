<template>
    <div class="table__item">
                <input
                    style="display: none"
                    type="checkbox"
                    :id="report.id + 'table'"
                    :value="report"
                    v-model="view"
                />
                <label class="req__content d-flex" :for="report.id + 'table'">
                <ul class="item__values d-flex" style="width: 100%">
                    <li style="width: 12.5%"><span>{{ report.address }}</span></li>
                    <li style="width: 12.5%"><span>{{report.date}}</span></li>
                    <li style="width: 12.5%"><span>{{report.begin}}</span></li>
                    <li style="width: 12.5%"><span>{{report.endin}}</span></li>
                    <li style="width: 12.5%"><span>{{report.executor}}</span></li>
                    <li style="width: 12.5%"><span>{{report.form}}</span></li>
                    <li style="width: 12.5%"><span>{{report.task}}</span></li>
                    <li style="width: 12.5%"><span>2120</span></li>
                </ul>
                </label>
                <div class="panel2" v-if="view">
                    <div class="report_table d-flex flex-column">
                        <div class="header">
                            <ul class="d-flex align-items-center" style="width: 100%; height: 100%; margin: 0;">
                                <li style="width: 16.6%"><span>Артикул</span></li>
                                <li style="width: 16.6%"><span>Параметр</span></li>
                                <li style="width: 16.6%"><span>Название элемента</span></li>
                                <li style="width: 16.6%"><span>Ед. изм.</span></li>
                                <li style="width: 16.6%"><span>Значение</span></li>
                                <li style="width: 16.6%"><span>Цена за товар</span></li>
                            </ul>
                        </div>
                        <div class="report_element" v-for="elem in this.fullForm">
                            <ul class="d-flex align-items-center" style="width: 100%; height: 100%; margin: 0;">
                                <li style="width: 16.6%"><span>{{elem.articul}}</span></li>
                                <li style="width: 16.6%"><span>{{elem.parameter}}</span></li>
                                <li style="width: 16.6%"><span>{{elem.name}}</span></li>
                                <li style="width: 16.6%"><span>{{elem.ed}}</span></li>
                                <li style="width: 16.6%"><span>{{elem.value}}</span></li>
                                <li style="width: 16.6%"><span>{{elem.price}}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    props: ['reportInfo'],

    data() {
        return {
            report: this.reportInfo,
            view: false
        }
    },
    computed: {
        ...mapState(['fullForm'])
    }
}
</script>

<style>

    .header{
        height:58px;
        width:100%;
        background: #DFDFDF;
        border: solid black 1px;
    }

    .panel2{
        padding: 26px;
    }

    .report_table{
        background: #E9E9E9;
        width: 100%;
        height: 260px;
    }

    .report_element{
        height: 45px;
        border-bottom: solid black 1px;
    }
</style>