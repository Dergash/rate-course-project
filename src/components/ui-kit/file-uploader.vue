<template>
  <div class="container">
    <label>
      <input
        ref="input"
        class="hidden"
        type="file"
        v-on:change="handleChange"
      >
    </label>
    <RaisedButton value="Select from disk" v-on:click="handleSelect" />
  </div>
</template>

<script>
export default {
  name: 'file-uploader',
  data () {
    return {};
  },
  methods: {
    handleSelect () {
      this.$refs.input.click();
    },
    handleChange(event) {
      this.$emit('change', event.target.files);
    },
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}

.container {
  display: inline-block;
}
</style>
