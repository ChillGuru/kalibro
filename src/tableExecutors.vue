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
        <header class="table__header2">
            <ul class="header__items d-flex">
                <li style="width: 20%">Имя</li>
                <li style="width: 20%">E-mail</li>
                <li style="width: 20%">Телефон</li>
                <li style="width: 20%">В работе</li>
                <li style="width: 20%">Выполнено</li>
            </ul>
        </header>

        <div class="table__content">
            <div class="table__item" v-for="executor in filteredExecutors">
                <input
                    style="display: none"
                    type="checkbox"
                    :id="executor.id + 'table'"
                    :value="executor"
                />
                <label class="req__content d-flex" :for="executor.id + 'table'">
                <ul class="item__values d-flex" style="width: 100%">
                    <li style="width: 20%">{{ executor.name }}</li>
                    <li style="width: 20%">{{executor.email}}</li>
                    <li style="width: 20%"> {{executor.phone}}</li>
                    <li style="width: 20%"> {{ inwork(executor.name) }} </li>
                    <li style="width: 20%">{{ complete(executor.name) }}</li>
                </ul>
                </label>
                <div class="panel2">
                    <!--Верхняя часть, с кнопками-->
                    <div class="panel__filter d-flex align-items-center justify-content-between">
                        <div class="p__filter">
                            <span style="margin: 0px 15px;">Отображать по</span>
                            <input type="text" class="count__input" v-model="count" style="margin-right: 58px">
                            <span style="margin-right: 10px;">Страница</span>
                        </div>
                        <div class="d-flex justify-content-end" style="width: 50%">
                            <button class="panel__btn" style="max-width: 350px; margin-right: 10px;">Изменить данные исполнителя</button>
                            <button class="panel__btn" style="max-width: 262px; margin-right: 32px;">Удалить исполнителя</button>
                        </div>
                    </div>
                    <!--Шапка таблицы, средняя часть-->
                    <div class="panel__table__header">
                        <ul class="d-flex align-items-center" style="height: inherit">
                            <li class="ul__elem">Дата</li>
                            <li class="ul__elem">Адрес</li>
                            <li class="ul__elem">Статус</li>
                            <li class="ul__elem">CRM</li>
                            <li class="ul__elem">Отчет</li>
                        </ul>
                    </div>
                    <!--Контентая часть таблицы-->
                    <div class="panel__table">
                        <div class="table__element" v-for="requests in requestList">
                            <ul class="d-flex align-items-center" style="height: inherit">
                                <li class="ul__elem">{{ request.data }}</li>
                                <li class="ul__elem">{{ request.address }}</li>
                                <li class="ul__elem">{{ request.status }}</li>
                                <li class="ul__elem"><a :href="request.crm">Ссылка</a></li>
                                <li class="ul__elem"> <a href="#">Отчет</a></li>
                            </ul>
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
            'executorsFilter',
            ],
        data() {
            return{
                count: 4,
            }
        },
        computed:{
            filteredExecutors() {
                return this.executorsFilter.filter(elem => {
                    var res = true;

                    this.executorsFilter.forEach((val, i) => {
                        if (val.name == elem.name && val.status == false) {
                            res= false;
                        }
                    });

                    return res;
                })
            }
        },
        methods: {
            inwork(name) {
                var num = 0;
                this.requestList.forEach((val, i) => {
                    if ((val.executor == name) && (val.status ==  "Принята")) {
                        num++;
                    }   
                });
                return num;
            },

            complete(name) {
                var num = 0;
                this.requestList.forEach((val, i) => {
                    if ((val.executor == name) && (val.status ==  "Выполнена")) {
                        num++;
                    }   
                });
                return num;
            },

            filterRequests(list)
        }
    }
</script>

<style>

.table {
    height: 100%;
    width: 100%;
}

.table__header2 {
    width: 100%;
    height: 46px;
    background: #DFDFDF;
    border: 1px solid #000000;
    font-weight: 600;
    font-size: 14px;
    padding: 13px 0px;
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
}

.item__values li {
    margin: 0 8px;
    height: 15px;
}

.table__element{
    height: 46px;
    width: 100%;
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
    border: solid 1px #000;
    border-top: 0;
}

input[type="checkbox"]:checked + .req__content + .panel2 {
    background: #FFF4E4;
    display: block;
    border: solid 1px #000;
    border-top: 0;
}

.ul__elem {
    width: 20%;
}

.panel2 {
  background-color: #FFF4E4;
  display: none;
  width: 100%;
  height: 320px;
}

.panel__filter {
    width: 100%;
    height: 91px;
}

.panel__table__header {
    width: 100%;
    height: 46px;
    background: #FFE6C0;
    border: 1px solid #000000;
    border-left: 0;
    font-weight: 600;
    font-size: 14px;
}

.count__input {
    width: 30px;
    height: 32px;
    border-radius: 5px;
    background: #FFFFFF;
    border: 1px solid #000000;
    text-align: center;
}

.panel__table {
    width: 100%;
    height: 183px;
    font-weight: 300;
    font-size: 14px;
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

</style>