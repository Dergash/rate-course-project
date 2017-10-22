<template>
  <div class="upload">
    <h1>{{ msg }}</h1>
    <FileUploader v-on:change="handleChange" />
    <RaisedButton value="Send" v-on:click="handleSend" />
  </div>
</template>

<script>

export default {
  name: 'upload',
  data () {
    return {
      msg: 'Upload your project',
    };
  },
  methods: {
    handleChange(files) {
      console.log(files);
    },
    handleSend() {

    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
