<template>
    <div class="table__item">
                <input
                    style="display: none"
                    type="checkbox"
                    :id="report.id + 'table'"
                    :value="report"
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
                    <li style="width: 12.5%"><span>{{report.price}}</span></li>
                </ul>
                </label>
                <div class="panel2">
                    
                </div>
    </div>
</template>

<script>

export default {
    props: ['reportInfo'],

    data() {
        return {
            report: this.reportInfo,
        }
    }
}
</script>

<style>

    
</style>