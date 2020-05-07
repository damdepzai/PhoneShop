<template>
    <component
        :is="item.component"
        v-if="item.component && !isItemHidden"
        v-bind="item.props"
    />
    <div
        v-else-if="item.header && !isItemHidden"
        class="vsm--header"
        :class="item.class"
        v-bind="item.attributes"
    >
        <hr v-if="item.hr">
        <span class="vsm--header-title">{{ item.title }}</span>
    </div>
    <div
        v-else-if="!isItemHidden && checkPermission"
        class="vsm--item"
        :class="[{'vsm--item_open' : show}]"
        v-on="disableHover && isCollapsed ? { click: mouseEnterEvent } : { mouseover: mouseEnterEvent }"
        @mouseout="mouseLeaveEvent"
    >
        <sidebar-menu-link
            :tag="item.disabled || !itemLinkHref ? 'span' : (isRouterLink ? 'router-link' : 'a')"
            :href="itemLinkHref"
            :disabled="item.disabled"
            :class="itemLinkClass"
            v-bind="item.attributes"
            @click.native="clickEvent"
        >
            <sidebar-menu-icon
                v-if="item.icon && !isMobileItem"
                :icon="item.icon"
            />
            <template v-if="(isCollapsed && !isFirstLevel) || !isCollapsed || isMobileItem">
                <sidebar-menu-badge
                    v-if="item.badge"
                    :badge="item.badge"
                    :style="[rtl ? (item.child ? {'margin-left' : '30px'} : '') : (item.child ? {'margin-right' : '30px'} : '')]"
                />
                <span class="vsm--title">{{ item.title }}</span>
                <div
                    v-if="item.child"
                    class="vsm--arrow"
                    :class="[{'vsm--arrow_open' : show}, {'vsm--arrow_slot' : $slots['dropdown-icon']}]"
                >
                    <slot name="dropdown-icon"/>
                </div>
            </template>
        </sidebar-menu-link>
        <template v-if="item.child">
            <template v-if="(isCollapsed && !isFirstLevel) || !isCollapsed">
                <transition
                    name="expand"
                    @enter="expandEnter"
                    @afterEnter="expandAfterEnter"
                    @beforeLeave="expandBeforeLeave"
                >
                    <div
                        v-if="show"
                        class="vsm--dropdown"
                    >
                        <div class="vsm--list">
                            <sidebar-menu-item
                                v-for="(subItem, index) in item.child"
                                :key="index"
                                :item="subItem"
                                :level="level+1"
                                :show-child="showChild"
                                :rtl="rtl"
                                :is-collapsed="isCollapsed"
                            >
                                <slot
                                    slot="dropdown-icon"
                                    name="dropdown-icon"
                                />
                            </sidebar-menu-item>
                        </div>
                    </div>
                </transition>
            </template>
        </template>
    </div>
</template>

<script>
    import {itemMixin, animationMixin} from './sidebar-mixin'
    import SidebarMenuLink from './SidebarMenuLink.vue'
    import SidebarMenuIcon from './SidebarMenuIcon.vue'
    import SidebarMenuBadge from './SidebarMenuBadge.vue'
    import {mapGetters} from "vuex";

    export default {
        name: 'SidebarMenuItem',
        components: {
            SidebarMenuLink,
            SidebarMenuIcon,
            SidebarMenuBadge
        },
        computed: {
            ...mapGetters({
                userInfo: 'userSession/userInfo'
            }),
            checkPermission: function () {
                let flag = false
                if (_.isArray(this.permission)) {
                    this.permission.map((e) => {
                        if (this.listPermissionUser.includes(e)) flag = true
                    })
                } else {
                    flag = this.listPermissionUser.includes(this.permission)
                }
                return flag
            }
        },
        data() {
            return {
                permission: '',
                listPermissionUser: []
            }
        },
        created() {
            this.permission = this.item.permission ? this.item.permission : ''
            this.userInfo.roles.map(item => {
                this.listPermissionUser = this.listPermissionUser.concat(item.permissions)
            })
        },
        mixins: [itemMixin, animationMixin],
        props: {
            item: {
                type: Object,
                required: true
            },
            level: {
                type: Number,
                default: 1
            },
            isCollapsed: {
                type: Boolean
            },
            isMobileItem: {
                type: Boolean,
                default: false
            },
            mobileItem: {
                type: Object,
                default: null
            },
            activeShow: {
                type: Object,
                default: null
            },
            showChild: {
                type: Boolean,
                default: false
            },
            showOneChild: {
                type: Boolean,
                default: false
            },
            rtl: {
                type: Boolean,
                default: false
            },
            disableHover: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
