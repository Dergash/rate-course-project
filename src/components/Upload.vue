<template>
  <div class="upload">
    <h1>{{ msg }}</h1>
    <FileUploader v-on:change="handleChange" />
    <RaisedButton value="Send" v-on:click="handleSend" />
    <h2>Проекты</h2>
    <ul>
      <li v-for="project in projects">
        {{ project.name }} - {{ project.id }}
        <RaisedButton value="Report" v-on:click="handleReport($event, project.id)" />
      </li>
    </ul>
    <h2>Отчет</h2>
    <ul v-if="report">
      <li>Всего строк: {{ report.total }}</li>
      <li>JS-кода: {{ report.code }}</li>
      <li>HTML-кода: {{ report.html }}</li>
      <li>CSS-кода: {{ report.css }}</li>
      <li>Комментариев: {{ report.comment }}</li>
    </ul>
  </div>
</template>

<script>
import { sendProject, getProjects, getReport } from '../api';

export default {
  name: 'upload',
  data () {
    return {
      msg: 'Upload your project',
      files: [],
      projects: [],
      report: null,
    };
  },
  mounted: async function() {
    this.projects = await getProjects();
  },
  methods: {
    handleChange(files) {
      this.files = files;
    },
    handleSend() {
      sendProject(this.files);
    },
    async handleReport(event, id) {
      this.report = await getReport(id);
    }
  },
};
</script>

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
