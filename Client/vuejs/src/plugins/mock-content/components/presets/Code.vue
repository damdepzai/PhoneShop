<!--
  - Copyright (c) 2020.
  - Project: Source
  - LastModified: 2/14/20, 3:23 PM
  - Author: diengv < Giáp Văn Điện >
  - Email: diengv@ominext.com
  - File name: Code.vue
  - File path: D:/Projects/PMS/Source/Client/vuejs/src/plugins/mock-content/components/presets/Code.vue
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
  <mock-content-loading v-bind="$attrs" :width="300" :height="80">
    <rect x="0" y="0" rx="3" ry="3" width="70" height="10" />
    <rect x="80" y="0" rx="3" ry="3" width="100" height="10" />
    <rect x="190" y="0" rx="3" ry="3" width="10" height="10" />
    <rect x="15" y="20" rx="3" ry="3" width="130" height="10" />
    <rect x="155" y="20" rx="3" ry="3" width="130" height="10" />
    <rect x="15" y="40" rx="3" ry="3" width="90" height="10" />
    <rect x="115" y="40" rx="3" ry="3" width="60" height="10" />
    <rect x="185" y="40" rx="3" ry="3" width="60" height="10" />
    <rect x="0" y="60" rx="3" ry="3" width="30" height="10" />
  </mock-content-loading>
</template>
