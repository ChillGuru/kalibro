<template>
    <header>
        <div class="container-fluid">
            <div class="row navbar">
                <div class="col-12 col-md-1"></div>
                <div class="col-8 col-md-6 col-lg-5 col-xl-4 nav">
                        <ul class="d-flex">
                            <li style="margin-left: 0px"><label><img src="./assets/Logo.png" alt="logo" class="menu__logo"></label></li>
                            <li><label class="nav__item">ГЛАВНАЯ</label></li>
                            <li>
                                <div class="dropdown show">
                                    <label  class="nav__item" id="dropdownMenuLink" @click="MenuActive">
                                        ДОБАВИТЬ...</label>
                                    <div class="dropdown-menu" :class="[isMenuActive == true ? 'show': '']">
                                        <div class="dropdown-inner d-flex align-items-center"><label class="dropdown-item" @click="showReForm">Добавить заявку</label></div>
                                        <div class="dropdown-inner d-flex align-items-center"><label class="dropdown-item">Добавить новый бланк</label></div>
                                        <div class="dropdown-inner d-flex align-items-center" style="border-bottom: 0"><label class="dropdown-item" @click="showExForm">Добавить исполнителя</label></div>
                                    </div>
                                </div>
                            </li>
                            <li style="margin-right: 0px"><label class="nav__item">НАСТРОЙКИ</label></li>
                        </ul>
                </div>
                <div class="col-12 col-md-2 col-lg-4 col-xl-5"></div>
                <div class="col-4 col-md-3 col-lg-2 d-flex align-items-center justify-content-end" style='height: 100%; padding-bottom: 8px;'>
                    <img class="client__logo" src="./assets/nav_user_logo.png" alt="client__logo">
                    <label class="client__name">{{ localUsername }}</label>
                    <label class="logout">Выйти</label>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        props: ["isExForm", "isReForm", "username"],
        
        data () {
            return {
                isMenuActive: false,
                localIsExForm: this.isExForm,
                localIsReForm: this.isReForm,
                localUsername: this.username
            }
        },
        methods: {
            MenuActive() {
                if (this.isMenuActive == false) {this.isMenuActive = true}
                else {this.isMenuActive = false}
            },

            showExForm() {
                this.localIsExForm = true
                this.$emit('showExForm', this.localIsExForm)
            },
            
            showReForm() {
                this.localIsReForm = true
                this.$emit('showReForm', this.localIsReForm)
            },
        },
        
       
    }
</script>

<style>

::-webkit-input-placeholder {
    color:#000;
    font-size: 9px;
    font-weight: 300;
    text-align: center;
}

.menu__logo {
    height: 22px;
    widows: 81px;
}

.row {
    height: 44px;
    background: #6F6F6F;
}

.nav ul {
    list-style: none;
}

.nav ul li label {
    text-decoration: none;
    cursor: pointer;
}

.nav__item {
    margin: 0px 40px;
    color: #FFFFFF;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    white-space: nowrap;
    text-decoration: none;
}

.nav__item:hover {
    color: #FFD79A;
    transition: .4s;
}

.dropdown .show {
    margin-left: 25px;
}

.dropdown-menu {
    background: #6F6F6F;
    padding: 0;
    margin: 0;
    margin-top: 12px;
    border-radius: 0;
    border: 0;
}

.dropdown-inner {
    height: 45px;
    width: 270px;
    border-bottom: 1px solid white;
}

.dropdown-item {
    height: 44px;
    align-items: center;
    font-weight: 500;
    font-size: 12px;
    padding: 12px 0 0 0;
    margin: 0 0 0 13px;
    color: #FFFFFF;
}

.dropdown-item:focus,
.dropdown-item:hover {
    align-items: center;
    height: 42px;
    color: #FFD79A;
    text-decoration: none;
    background-color: #6F6F6F;
    transition: .4s;
    
}

.dropdown-item.active,
.dropdown-item:active {
    color: #FFD79A;
    text-decoration: none;
    background-color: #6F6F6F;
}

.logout {
    color: #fff;
}

.logout, .logout:hover {
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
}

.logout:hover, .client__name:hover {
    color: #FFD79A;
    transition: .4s;
    text-decoration: none;
}

.client__name {
    font-weight: 300;
    font-size: 14px;
    margin-right: 35px;
    color: #fff;
    cursor: pointer;
}

.client__logo {
    height: 28px;
    width: 28px;
    margin: 0 24px 6px 0;
}

</style>