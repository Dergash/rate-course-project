<template>
  <div class="report">
    <h2>Отчет</h2>
    <h3>Lines of code:</h3>
    <Pie :data='data' />
    <h3>Comments ratio:</h3>
    <div class="comments">
      <Bars :data='commentsData' />
      <div v-if='commentsRatio' class="ratio">
        {{ commentsRatio.toFixed(2) }}%
      </div>
    </div>
  </div>
</template>

<script>

const COLORS = {
  red: '#F44336',
  green: '#43A047',
  blue: '#03A9F4',
};

const colors = [COLORS.red, COLORS.green, COLORS.blue, '#FFF176', '#AB47BC', '#d0743c', '#ff8c00'];

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
    commentsRatio: function () {
      if (!this.report) {
        return null;
      }
      const total = this.report.metrics.find(metric => metric.name === 'total');
      const comments = this.report.metrics.find(metric => metric.name === 'comment');
      if (!total.value) {
        return null;
      }
      return (comments.value / total.value * 100);
    },
    commentsData: function () {
      if (!this.report) {
        return [];
      }
      const total = this.report.metrics.find(metric => metric.name === 'total');
      const comments = this.report.metrics.find(metric => metric.name === 'comment');
      return [
        {
          name: 'total',
          value: total ? total.value : 0,
          color: COLORS.blue,
        },
        {
          name: 'comments',
          value: comments ? comments.value : 0,
          color: COLORS.green,
        }
      ];
    },
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

.comments {
  display: flex;
}

.ratio {
  font-size: 36px;
  color: #43A047;
  align-self: center;
  margin-left: 20%;
}


</style>
