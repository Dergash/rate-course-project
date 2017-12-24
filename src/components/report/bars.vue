<template>
  <div class="bars">
    <svg width="560" height="500"></svg>
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
      buildBars(value);
    }
  },
  methods: {},
};

function buildBars(data) {
  const svg = d3.select('.bars > svg');
  const margin = {top: 20, right: 20, bottom: 30, left: 40};
  const width = +svg.attr('width') - margin.left - margin.right;
  const height = +svg.attr('height') - margin.top - margin.bottom;

  const x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);
  const y = d3.scaleLinear()
    .rangeRound([height, 0]);

  const g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

  g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10))
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');

  g.selectAll('.bar')
    .data(data)
    .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) { return x(d.name); })
      .attr('y', function(d) { return y(d.value); })
      .attr('width', x.bandwidth())
      .attr('height', function(d) { return height - y(d.value); })
      .attr('fill', function(d) {
        return d.color;
      });
}
</script>

<style scoped>


</style>
