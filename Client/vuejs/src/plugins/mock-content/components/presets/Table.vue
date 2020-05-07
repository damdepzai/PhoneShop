<!--
  - Copyright (c) 2020.
  - Project: Source
  - LastModified: 2/14/20, 3:23 PM
  - Author: diengv < Giáp Văn Điện >
  - Email: diengv@ominext.com
  - File name: Table.vue
  - File path: D:/Projects/PMS/Source/Client/vuejs/src/plugins/mock-content/components/presets/Table.vue
  -->

<script>
  import MockContentLoading from '../MockContent.vue';

  export default {
    components: {
      MockContentLoading,
    },

    props: {
      header: {
        default: true,
        type: Boolean,
      },
      rows: {
        default: 5,
        type: Number,
      },
      columns: {
        default: 4,
        type: Number,
      },
    },

    computed: {
      height () {
        return (this.rows * 30) - 20;
      },
      width () {
        return ((this.columns - 1) * 20) + 10 + (this.columns * 100);
      },
    },

    methods: {
      getXPos (column) {
        return 5 + ((column - 1) * 100) + ((column - 1) * 20);
      },
      getYPos (row) {
        return (row - 1) * 30;
      },
    },
  };
</script>

<template>
  <mock-content-loading v-bind="$attrs" :width="width" :height="height">
    <template v-for="r in rows">
      <template v-for="c in columns">
        <rect :key="r + '_' + c" :x="getXPos(c)" :y="getYPos(r)" rx="3" ry="3" :width="100" height="10" />
      </template>
      <rect :key="r + '_l'" v-if="r < rows" x="0" :y="getYPos(r) + 20" :width="width" height="1" />
    </template>
  </mock-content-loading>
</template>
