<template>
    <header>
        <div class="container-fluid">
            <div class="row navbar">
                <div class="col-1 col-md-1"></div>
                <div class="col-7 col-lg-5 col-xl-4 nav">
                    <ul class="d-flex">
                        <li style="margin-left: 0px"><label class="d-flex align-items-center" onClick='location.href="index.html"'><img src="./assets/Logo.png" alt="logo" class="menu__logo"></label></li>
                        <li><label class="nav__item d-flex align-items-center" onClick='location.href="index.html"'>ГЛАВНАЯ</label></li>
                        <li class="d-flex align-items-center">
                            <div class="dropdown show d-flex align-items-center" style="">
                                <label  class="nav__item d-flex align-items-center" id="dropdownMenuLink" @click="MenuActive">
                                    ДОБАВИТЬ...</label>
                                <div class="dropdown-menu" >
                                    <div class="dropdown-inner d-flex align-items-center"><label style="border-top: 1px solid white" class="dropdown-item d-flex align-items-center justify-content-center" @click="UPD_REQUEST_FORM_VISIBLE(true)">ДОБАВИТЬ ЗАЯВКУ</label></div>
                                    <div class="dropdown-inner d-flex align-items-center"><label class="dropdown-item d-flex align-items-center justify-content-center">ДОБАВИТЬ НОВЫЙ БЛАНК</label></div>
                                    <div class="dropdown-inner d-flex align-items-center" style="border-bottom: 0"><label class="dropdown-item d-flex align-items-center justify-content-center" @click="UPD_EXECUTOR_FORM_VISIBLE(true)">ДОБАВИТЬ ИСПОЛНИТЕЛЯ</label></div>
                                </div>
                            </div>
                        </li>
                        <li style="margin-right: 0px"><label class="nav__item d-flex align-items-center">НАСТРОЙКИ</label></li>
                    </ul>
                </div>
                <div class="col-1 col-lg-4 col-xl-5"></div>
                <div class="col-3 col-lg-2 d-flex align-items-center justify-content-end" style='height: 100%;'>
                    <img class="client__logo" src="./assets/nav_user_logo.png" alt="client__logo">
                    <label class="client__name" style="font-size: 16px;">{{ LOGIN }}</label>
                    <label class="logout" onClick='location.href="index.html"'>ВЫЙТИ</label>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    data: function() {
        return {
            isMenuActive: false,
        }
    },
    methods: {
        ...mapActions([
            'UPD_EXECUTOR_FORM_VISIBLE',
            'UPD_REQUEST_FORM_VISIBLE'
        ]),

        MenuActive: function() {
            if (this.isMenuActive == false) {this.isMenuActive = true}
            else {this.isMenuActive = false}
        },

    },
    computed: {
        ...mapGetters([
            'LOGIN'
        ])
    }
    
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
    height: 62px;
    background: #6F6F6F;
    padding: 0;
}

.nav {
    height: 100%;
}

.nav ul {
    list-style: none;
    height: 100%;
}

.nav ul li label {
    text-decoration: none;
    cursor: pointer;
    height: 100%;
    vertical-align: center;
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

.dropdown {
    height: 62px;
}

.dropdown .show {
    margin-left: 25px;
}

.dropdown-menu {
    background: #6F6F6F;
    padding: 0;
    margin: 0;

    border-radius: 0;
    border: 0;
}

 .dropdown:hover > .dropdown-menu {
 display: block; 
} 

.dropdown-inner {
    height: 62px;
    width: 270px;
    border-bottom: 1px solid white;
}

.dropdown-item {
    height: 62px;
    align-items: center;
    font-weight: 500;
    font-size: 12px;
    padding: 0;
    margin: 0;
    color: #FFFFFF;
}

.dropdown-item:focus,
.dropdown-item:hover {
    align-items: center;
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