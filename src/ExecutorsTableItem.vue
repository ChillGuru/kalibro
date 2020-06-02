<template>
    <div class="table__item">
                <input
                    style="display: none"
                    type="checkbox"
                    :id="this.executorInfo.id + 'table'"
                    :value="this.executorInfo"
                />
                <label class="req__content d-flex" :for="this.executorInfo.id + 'table'">
                <ul class="item__values d-flex" style="width: 100%">
                    <li style="width: 20%"><span>{{this.executorInfo.name}}</span></li>
                    <li style="width: 20%"><span>{{this.executorInfo.email}}</span></li>
                    <li style="width: 20%"><span>{{this.executorInfo.phone}}</span></li>
                    <li style="width: 20%"><span>{{ inwork(this.executorInfo.name) }}</span></li>
                    <li style="width: 20%"><span>{{ complete(this.executorInfo.name) }}</span></li>
                </ul>
                </label>
                <div class="panel2">
                    <!--Верхняя часть, с кнопками-->
                    <div class="panel__filter d-flex align-items-center justify-content-between">
                        <div class="p__filter d-flex">
                            <span style="margin: 0px 15px;">Отображать по</span>
                            <input type="text" class="count__input" v-model="count" style="margin-right: 58px">
                            <span style="margin-right: 10px;">Страница</span>
                            <div class="d-flex listToBtns">
                                <div v-for="asd in paginationList">
                                    <input
                                        style="display: none"
                                        type="radio"
                                        :id="asd + 'check'"
                                    />
                                    <label class="listToBtn" :for="asd + 'check'" @click="currentPage = asd" :class="[isactive(asd)]">{{ asd }}</label>
                                </div>
                                <span v-if="isCurrent">...</span>
                                <div v-if="(countPage > 5) && (countPage != '')">
                                    <input
                                        style="display: none"
                                        type="radio"
                                        id="lastPage"
                                    />
                                    <label class="listToBtn" for="lastPage" @click="currentPage = countPage" :class="[isactive(countPage)]">{{ countPage }}</label>
                                </div>
                            </div>
                            
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
                        <div class="table__element" v-for="request in paginationData">
                            <ul class="d-flex align-items-center" style="height: inherit">
                                <li class="ul__elem">{{ request.date }}</li>
                                <li class="ul__elem">{{ request.address }}</li>
                                <li class="ul__elem">{{ request.status }}</li>
                                <li class="ul__elem"><a :href="request.crm">Ссылка</a></li>
                                <li class="ul__elem"> <a href="#">Отчет</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
    </div>
</template>

<script>

export default {
    props: ['executorInfo', 'id', 'requestList'],

    data: function() {
        return {
            localID: this.id,
            count: 4,
            currentPage: 1,
        }
    },

    watch: {
             count: function() {
                 this.currentPage = 1;
             }
        },

    computed:{
            isCurrent: function() {
                if ((this.countPage > 5)&&(this.currentPage < this.countPage - 3)) {
                    return true
                } else {return false}
            },
            paginationData: function(){
                let start = (this.currentPage - 1) * this.count;
                let end = start*1 + this.count*1;
                return this.filteredRequests.slice(start, end);
            },
            // количество страниц ( после изменения ОТОБРАЖАТЬ ПО, произойдет пересчет данной величины)
            countPage: function(){
                return Math.ceil(this.filteredRequests.length / this.count);
            },
            // фильтр заявок
            filteredRequests: function() {
                return this.requestList.filter(elem => {
                    let res = false;
                        if (elem.executor == this.executorInfo.name) {
                            res= true;
                        }
                    return res;
                })
            },
            // Список с кнопочками
            paginationList: function(){
                var list = [];
                if ((this.filteredRequests == '') || (this.conut < 1)) {list.push("-"); return list; currentPage = 1;}
                if (this.countPage < 6) {
                    switch(this.currentPage) {
                        case 1: 
                            list.push(this.currentPage);
                            list.push(this.currentPage + 1);
                            list.push(this.currentPage + 2);
                            list.push(this.currentPage + 3);
                            list.push(this.currentPage + 4);
                            list = list
                                .filter( num => num <= this.countPage); 
                            break;
                        
                        case 2:
                            list.push(this.currentPage - 1);
                            list.push(this.currentPage);
                            list.push(this.currentPage + 1);
                            list.push(this.currentPage + 2);
                            list.push(this.currentPage + 3);
                            list = list
                                .filter( num => num <= this.countPage); 
                            break;

                        case 3:
                            list.push(this.currentPage - 2);
                            list.push(this.currentPage - 1);
                            list.push(this.currentPage);
                            list.push(this.currentPage + 1);
                            list.push(this.currentPage + 2);
                            list = list
                                .filter( num => num <= this.countPage); 
                            break;

                        case 4:
                            list.push(this.currentPage - 3);
                            list.push(this.currentPage - 2);
                            list.push(this.currentPage - 1);
                            list.push(this.currentPage);
                            list.push(this.currentPage + 1);
                            list = list
                                .filter( num => num <= this.countPage); 
                            break;

                        case 5:
                            list.push(this.currentPage - 4);
                            list.push(this.currentPage - 3);
                            list.push(this.currentPage - 2);
                            list.push(this.currentPage - 1);
                            list.push(this.currentPage);
                            list = list
                                .filter( num => num <= this.countPage); 
                            break;
                    };
                } else {
                if (this.currentPage == 1){
                    list.push(this.currentPage);
                    list.push(this.currentPage + 1);
                    list.push(this.currentPage + 2); 
                    list = list
                        .filter( num => num <= this.countPage); 

                } else if (this.currentPage == this.countPage){
                    list.push(this.currentPage - 4);
                    list.push(this.currentPage - 3);
                    list.push(this.currentPage - 2);
                    list.push(this.currentPage - 1);
                    
                } else if (this.currentPage == this.countPage - 1) {
                    list.push(this.currentPage - 3);
                    list.push(this.currentPage - 2);
                    list.push(this.currentPage - 1);
                    list.push(this.currentPage);
                } else if (this.currentPage == this.countPage - 2){
                    list.push(this.currentPage - 2);
                    list.push(this.currentPage - 1);
                    list.push(this.currentPage);
                    list.push(this.currentPage + 1);
                }else if (this.currentPage == this.countPage - 3){
                    list.push(this.currentPage - 1);
                    list.push(this.currentPage);
                    list.push(this.currentPage + 1);
                    list.push(this.currentPage + 2);
                }else{
                    list.push(this.currentPage - 1);    // предыдущая
                    list.push(this.currentPage);        // текущая страница
                    list.push(this.currentPage + 1);    // следующая
                    list = list
                        .filter(num => num > 0) // оставляем страницы только больше 0
                        .filter( num => num <= this.countPage); // отсекаем страницы больше самой последней
                    };
                }
                return list;
            },
    },
    methods: {
        inwork: function(name) {
            var num = 0;
            this.filteredRequests.forEach((val, i) => {
                if ((val.executor == name) && (val.status ==  "Принята")) {
                    num++;
                }   
            });
            return num;
        },

        complete: function(name) {
            var num = 0;
            this.filteredRequests.forEach((val, i) => {
                if ((val.executor == name) && (val.status ==  "Выполнена")) {
                    num++;
                }   
            });
            return num;
        },

        isactive: function(asd){
                if (asd == this.currentPage) {
                return "act"
            } else {return ".listToBtn"}
        },
    }
}
</script>

<style>

.table__item {
    width: 100%;
    min-height: 45px;
}
    
</style>