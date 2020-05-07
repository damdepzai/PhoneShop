<template>
    <div>
        <nav class="main-admin-nav navbar is-fixed-top is-light" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <!-- <a class="navbar-item" @click="asideExpanded()">
                   <span class="icon is-medium icon-expand">
                       <i class="is-2x icon-arrow-alt-circle-right"></i>
                   </span>
                 </a>-->

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
                   data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div class="navbar-menu">
                <div class="navbar-start">
                    <div class="navbar-item">
                        <h2></h2>
                    </div>

                    <!--<div class="navbar-item">
                        <div class="buttons">
                            <template v-for="btn in navAction">
                                <button v-if="btn.show"
                                        :name="btn.name"
                                        @click="btn.clickAction"
                                        :class="btn.color && 'is-'+ btn.color"
                                        class="button">
                                    <span class="icon"><i :class="btn.icon && 'icon-' + btn.icon"></i></span>
                                    <span> {{btn.labelText}} </span>
                                </button>
                            </template>
                        </div>
                    </div>-->
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div>
                            <a class="button is-light">
                                <img src="../assets/img/users.png"/> &ensp;
                                <i>{{ userInfo.name }}</i>
                            </a>
                        </div>
                        <div class="buttons" @click.prevent="logout()">
                            <a class="button is-light">
                                Đăng xuất
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <sidebar-menu :menu="menu" :collapsed="!expanded">
            <div slot="header">
            </div>
        </sidebar-menu>
        <div class="has-padding-top-md has-padding-bottom-md has-padding-left-md has-padding-right-md">
            <router-view/>
        </div>
    </div>
</template>


<script>
  import FooterLayout from './inc/footer-layout'
  import AppNav from '../components/app-nav'
  import UserModel from "../../app/modules/user/models/UserModel";
  import SidebarMenu from "./inc/SidebarMenu";
  import adminMenu from './admin-menu'
  import ViewProfile from '../../app/modules/auth/script/view-profile'
  import {mapGetters} from "vuex";

  export default {
    name: 'master-layout',
    components: {SidebarMenu, AppNav, FooterLayout},
    mixins: [ViewProfile],
    data: () => ({
      expanded: true,
      menu: adminMenu
    }),
    computed: {
      isRoot() {
        return this.$store.getters['userSession/userInfo'].type === UserModel.TYPE.root
      },
      isCustomer() {
        return this.$store.getters['userSession/userInfo'].type === UserModel.TYPE.customer
      },
      isAdmin() {
        return true
        // return this.$store.getters['userSession/userInfo'].type === UserModel.TYPE.admin
      },
        ...mapGetters({
            userInfo: 'userSession/userInfo'
        })
    },
    methods: {
      goDashboard() {
        this.$router.push('/user/manager', () => {
        })
      },
      logout() {
        this.userLogout()
      }
    }
  }
</script>

<style lang="scss" scoped>
    #master-left-menu {
        width: 200px;
        padding-right: 0;
        height: calc(100vh - 55px);
    }

    .master-content {
        padding-right: 0.75rem;
    }

    .menu {
        position: fixed;
        top: 60px;
        width: 188px;
        height: calc(100vh - 55px);
        /*overflow-y: scroll;*/
    }

    .home {
        min-height: calc(100vh - 55px);
    }

    .footer {
        margin-left: -10px;
    }
    img {
        border-radius:50%;
        -moz-border-radius:50%;
        -webkit-border-radius:50%;
    }
</style>
