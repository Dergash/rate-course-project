const ADD_PROJECT_URL = 'http://localhost:3000/projects';
const GET_PROJECTS_URL = 'http://localhost:3000/projects';

export function sendProject(files) {
  const body = new FormData();
  files.forEach(file => {
    body.append(file.name, file);
  });
  fetch(ADD_PROJECT_URL, {
    method: 'POST',
    body,
  }).then(response => {
    console.log(response);
  });
}

export async function getProjects() {
  const pek = await fetch(GET_PROJECTS_URL).then(response => response.json());
  return pek;
}

export async function getReport(projectId) {
  const bek = await fetch(`${GET_PROJECTS_URL}/${projectId}`).then(response => response.json());
  return bek;
}
