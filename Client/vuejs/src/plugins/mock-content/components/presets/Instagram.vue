<!--
  - Copyright (c) 2020.
  - Project: Source
  - LastModified: 2/14/20, 3:23 PM
  - Author: diengv < Giáp Văn Điện >
  - Email: diengv@ominext.com
  - File name: Instagram.vue
  - File path: D:/Projects/PMS/Source/Client/vuejs/src/plugins/mock-content/components/presets/Instagram.vue
  -->

<script>
  import MockContentLoading from '../MockContent.vue';

  export default {
    components: {
      MockContentLoading,
    },
  };
</script>

<template>
  <mock-content-loading v-bind="$attrs" :height="480">
    <circle cx="30" cy="30" r="30" />
    <rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
    <rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
    <rect x="0" y="70" rx="5" ry="5" width="400" height="400" />
  </mock-content-loading>
</template>
