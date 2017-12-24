<template>
  <div class="bars">
    <svg width="960" height="500"></svg>
  </div>

</template>

<script>

import * as d3 from 'd3';

export default {
  name: 'upload',
  props: [
    'data',
  ],
  data () {
    return {};
  },
  mounted: function () {
  },
  watch: {
    data: function(value) {
      buildBars();
    }
  },
  methods: {},
};

function buildBars(data) {

}
</script>

<style scoped>


</style>
