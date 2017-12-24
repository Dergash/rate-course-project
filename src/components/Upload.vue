<template>
  <div class="upload">
    <main>
      <aside>
        <h1>{{ msg }}</h1>
        <FileUploader v-on:change="handleChange" />
        <RaisedButton value="Send" v-on:click="handleSend" />
        <h2>Проекты</h2>
        <ul class="list">
          <li v-for="project in projects">
            <RaisedButton value="Report" v-on:click="handleReport($event, project.id)" />
            <span :title="getProjectName(project)">
              {{ getProjectName(project) }}
            </span>
          </li>
        </ul>
      </aside>
      <Report :report='report' class="report" />
    </main>
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
    getProjectName(project) {
      return `${project.name} - ${project.id}`;
    },
    handleChange(files) {
      this.files = files;
    },
    handleSend() {
      sendProject(this.files);
    },
    async handleReport(event, id) {
      const ek = await getReport(id);
      this.report = ek;
    }
  },
};
</script>

<style scoped>
main {
  display: flex;
}

aside {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex-grow: 1;
  max-width: 20%;
}

.report {
  flex-grow: 8;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}

ul.list li {
  display: block;
  margin-bottom: 6px;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
}

</style>
