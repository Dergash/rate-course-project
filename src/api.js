const ADD_PROJECT_URL = 'http://localhost:3000/projects/';

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
