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
            <span v-if="filteredExecutors == ''" class="lackof">Фильтры не включены или исполнители отсутствуют</span> 
            <div v-for="executor in filteredExecutors">
                <table-item
                :executorInfo="executor"
                :id="uniID(executor.name)"
                :requestList="requestList">

                </table-item>
            </div>
        </div>
    </div>
</template>

<script>
import tableItem from "./ExecutorsTableItem.vue"

    export default {
        props:[
            'requestList',
            'executorsFilter',
            ],
        data() {
            return{

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
            },
        },

        methods: {
            uniID(value) {
                let id = 0;
                this.filteredExecutors.forEach((val, i) => {
                    if (val.name == value) {
                        return id;
                    } else {id++}
                });
            }
        },

        components: {
            tableItem
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
    min-height: 45px;
}

.item__values li {
    margin: 0 8px;
    align-items: center;
}

.table__element{
    height: 46px;
    width: 100%;
    border-bottom: 1px solid #C1C1C1;
    
}

.req__content {
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
  min-height: 184px;

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
    outline: none;
}

.panel__table {
    width: 100%;
    font-weight: 300;
    font-size: 14px;
    min-height: 47px;
}

.listToBtns {
    min-width: 66px;
    max-width: 110px;
    height: 32px;
}

.listToBtn {
    width: 22px;
    height: 30px;
    cursor: pointer;
}

.act {
    background: #FFD79A;
    text-decoration: underline;
    border-radius: 5px;
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