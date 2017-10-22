<template>
  <button class="button" v-on:click="handleClick">
    {{ value }}
  </button>
</template>

<script>
export default {
  name: 'raised-button',
  props: [
    'value',
  ],
  data () {
    return {};
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped>
.button {
  /* clean */
  border: 0;
  background: none;
  outline: 0;

  /* default */
  min-width: 64px;
  padding-left: 16px;
  padding-right: 16px;
  cursor: pointer;
  font-size: 14px;
  height: 36px;
  border-radius: 2px;
  text-transform: uppercase;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;

  /* custom */
  background-color: #F48FB1;
  color: white;
}
</style>
