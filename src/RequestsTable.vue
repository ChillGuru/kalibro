<template>
    <div class="table">
        <div class="table__header d-flex align-items-center justify-content-between" style="border-bottom: 0; background: #fff; padding: 0;">
            <div class="date__item">
                <img src="./assets/toLeft.png" alt="toLeft" style="sidth: 15px; height: 15px; margin: 0 35px 0 8px;">
                <span>БЕЗ ДАТЫ</span>
            </div>
            <div class="date__item"><span>03.11 ПН</span></div>
            <div class="date__item"><span>04.11 ВТ</span></div>
            <div class="date__item"><span>05.11 СР</span></div>
            <div class="date__item"><span>06.11 ЧТ</span></div>
            <div class="date__item"><span>07.11 ПТ</span></div>
            <div class="date__item"><span>08.11 СБ</span></div>
            <div class="date__item">
                <span>09.11 ВС</span>
                <img src="./assets/toRight.png" alt="toRight" style="sidth: 15px; height: 15px; margin: 0 8px 0 35px;">
            </div>
        </div>
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

        <div class="table__content">
            <span v-if="filteredRequests == ''" class="lackof">Фильтры не включены или заявки отсутствуют</span> 
            <div class="table__item" v-for="req in filteredRequests">
                <input
                    style="display: none"
                    type="checkbox"
                    :id="req.id"
                    :value="req"
                />
                <label class="req__content d-flex" :for="req.id">
                <ul class="item__values d-flex align-items-center" style="width: 100%">
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
                <div class="panel">
                    <div class="d-flex">
                        <div class="panel__map"></div>
                        <div class="panel__btns">
                            <button class="panel__btn">Удалить</button>
                            <button class="panel__btn" style="margin-top: 30px">Изменить</button>
                            <button class="panel__btn" style="margin-top: 30px">Подробнее</button>
                            <button class="panel__btn" style="margin-top: 30px">Отчет</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
        data: function() {
            return{
            }
        },
        computed:{
            filteredRequests: function() {
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

.date__item {
    height: 100%;
    padding: 13px 0 0 0;
}

.table__content {
    width: 100%;
    height: calc(100% - 92px);
    overflow: scroll;
}

.table__item {
    width: 100%;
    min-height: 45px;
}

.item__values {
    margin: 0;
}

.item__values li {
    margin: 0 8px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.req__content {
  margin: 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  min-height: 45px;
  border-bottom: 1px solid #000;
}

.req__content::before {
  background: url("./assets/triangle_unchecked.png") no-repeat;
  content: "";
  display: inline-block;
  margin-top: 15px;
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
    border: solid 1px #000;
    border-top: 0;
}

input[type="checkbox"]:checked + .req__content + .panel {
    background: #FFF4E4;
    display: block;
    border: solid 1px #000;
    border-top: 0;
}

.panel {
  background-color: #FFF4E4;
  display: none;
  width: 100%;
  height: 320px;
  padding: 20px 17px 29px 37px;
}

.panel__map {
    width: 1200px;
    height: 271px;
    background: url("./assets/map_panel.png") no-repeat;
    background-size: 1200px 271px;
}

.panel__btns {
    width: 200px;
    height: 271px;
    margin-left: 34px;
}

.panel__btn {
    width: 100%;
    height: 45px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    border: 0;
    border-radius: 5px;
    background: #FFD79A;

}

.panel__btn:hover {
    background: #FFE6C0;
    transition: .3s;
}

.status__color {
    width: 36px;
    height: 17px;
    margin-right: 0;
}

</style>