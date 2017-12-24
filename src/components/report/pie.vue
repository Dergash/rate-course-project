<template>
  <div class="pie">
    <svg width="600" height="400"></svg>
    <ul class="legend">
      <li class="legend-item" v-for="item in legendItems">
        <i class="color" :style="{ backgroundColor: item.color }" />
        {{ item.category }} - {{ item.value }}
      </li>
      <li class="legend-total">
        total - {{ total }}
      </li>
    </ul>
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
  computed: {
    legendItems: function () {
      return this.data.filter(item => !item.service);
    },
    total: function() {
      const pek = this.data.filter(item => item.service).find(item => item.name === 'total');
      return (pek ? pek.value : 0);
    }
  },
  mounted: function () {
  },
  watch: {
    data: function(value) {
      const isEmpty = value.filter(item => item.value).length === 0;
      if (isEmpty) {
        buildPie([{
          category: 'No data',
          value: 100,
          color: 'grey',
        }]);
      } else {
        buildPie(value.filter(item => !item.service));
      }
    }
  },
  methods: {},
};

function buildPie(data) {
  const svg = d3.select('.pie > svg');
  d3.selectAll('.pie > svg > *').remove();
  const width = Number.parseInt(svg.attr('width'), 10);
  const height = Number.parseInt(svg.attr('height'), 10);
  const radius = Math.min(width, height) / 2;
  const group = svg
    .data(data)
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

  const pie = d3.pie()
      .sort(null)
      .value(function(d) {
        return d.value;
      });

  const path = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(10);

  const arc = group.selectAll('.arc')
    .data(pie(data))
    .enter().append('g')
      .attr('class', 'arc');

  arc.append('path')
      .attr('d', path)
      .attr('fill', function(d) {
        return d.data.color;
      })
      .attr('stroke', 'black')
      .attr('stroke-width', '8');
}
</script>

<style scoped>
.chart {
  display: flex;
}

.legend {
  list-style-type: none;
}

.legend-item {
  display: flex;
  margin-bottom: 8px;
}

.color {
  display: block;
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.legend-total {
  margin-top: 16px;
  font-weight: bold;
}

</style>
