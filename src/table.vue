<template>
    <div class="table">
        <header class="table__header">
            <ul class="header__items d-flex justify-content-between">
                <li>Статус</li>
                <li>Адрес</li>
                <li>Дата</li>
                <li>Исполнитель</li>
                <li>Бланк</li>
                <li>Задание</li>
            </ul>
        </header>

        <content class="table__content">
            <div class="table__item d-flex" v-for="req in filteredRequests">
                <input
                    style="display: none"
                    type="checkbox"
                    :id="req.id"
                    :value="req"
                />
                <label class="req__content  d-flex" :for="req.id">
                    <ul class="item__values d-flex" style="width: 100%">
                    <li style="width: 3%"><div class="status__color" :style="reqColor(req.status)"></div></li>
                    <li style="width: 8%">{{req.status}}</li>
                    <li style="width: 20%"> {{req.address}}</li>
                    <li style="width: 7%"> {{req.date}} </li>
                    <li style="width: 20%">{{req.executor}}</li>
                    <li style="width: 3%"><div class="status__color" :style="formColor(req.form)"></div></li>
                    <li style="width: 12%">{{req.form}}</li>
                    <li style="width: 17%">{{req.task}}</li>
                </ul>
                </label>
            </div>
        </content>
    </div>
</template>

<script>
    export default {
        props:[
            'requestList',
            'requestsFilter',
            'executorsFilter',
            'formsFilter'
            ],
        data() {
            return{
            }
        },
        computed:{
            filteredRequests() {
                return this.requestList.filter(elem => {
                    var res = true;

                    this.requestsFilter.forEach((val, i) => {
                        if (val.other == elem.status && val.status == false) {
                            res= false;
                        }
                    });

                    this.executorsFilter.forEach((val, i) => {
                        if (val.name == elem.executor && val.status == false) {
                            res= false;
                        }
                    });

                    this.formsFilter.forEach((val, i) => {
                        if (val.name == elem.form && val.status == false) {
                            res = false;
                        }
                    });
                    return res;
                })
            }
        },
        methods: {
            reqColor(name) {
            switch (name) {
                        case "Открыта":
                            return "background: #FFD79A";
                            
                        case "Принята":
                            return "background: #D993D0";
                            
                        case "Выполнена":
                            return "background: #82DBB1";
                        }
            },
            formColor(form) {
                var color = '';
                this.formsFilter.forEach((val, i) => {
                        if (val.name == form) {
                            color = val.color;
                        }
                    });
                return color;
            }
        }
    }
</script>

<style>

.table {
    height: 100%;
    width: 100%;
}

.table__header {
    width: 100%;
    height: 46px;
    background: #DFDFDF;
    border: 1px solid #000000;
    font-weight: 600;
    font-size: 14px;
    padding: 13px 93px;
}

.table__content {
    width: 100%;
    height: 100%;
}

.table__item {
    width: 100%;
}

.item__values li {
    margin: 0 8px;
    height: 15px;
}

.req__content {
  padding-top: 18px;
  margin: 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  border-bottom: 1px solid #000;
}

.req__content::before {
  background: url("./assets/triangle_unchecked.png") no-repeat;
  content: "";
  display: inline-block;
  vertical-align: top;
  background-size: 13px 13px;
  width: 15px;
  height: 15px;
  background-position: center;
  margin-left: 5px;
}

input[type="checkbox"]:checked + .req__content::before {
  background: url("./assets/triangle_checked.png") no-repeat;
  background-size: 13px 13px;
  transform: scale(1);
}

input[type="checkbox"]:checked + .req__content {
    background: #FFF4E4;
}

.status__color {
    width: 36px;
    height: 17px;
    margin-right: 0;
}

</style>