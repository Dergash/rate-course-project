<template>
  <div class="report">
    <h2>Отчет</h2>
    <Pie :data='data' />
    <Bars :data='data' />
  </div>
</template>

<script>

const colors = ['#F44336', '#43A047', '#03A9F4', '#FFF176', '#AB47BC', '#d0743c', '#ff8c00'];

export default {
  name: 'upload',
  props: [
    'report',
  ],
  data () {
    return {
      msg: 'Report',
    };
  },
  computed: {
    data: function() {
      if (!this.report) {
        return [];
      }
      const total = this.report.metrics.find(metric => metric.name === 'total');
      const unknown = this.report.metrics.reduce((prev, next) => {
        if (next.name === 'total') {
          return prev;
        }
        return prev - next.value;
      }, total.value || 0);
      const result = this.report.metrics
        .filter(metric => metric.name !== 'total')
        .map((metric, index) => ({
          category: metric.name,
          value: metric.value,
          color: colors[index],
        }));
      result.push({
        service: true,
        name: 'total',
        value: total.value,
      });
      result.push({
        category: 'unknown',
        value: unknown,
        color: 'grey',
      });
      return result;
    }
  },
  methods: {
  },
};
</script>

<style scoped>

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

ul.list li {
  display: block;
  margin-bottom: 6px;
}

</style>
