const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

function getJSON(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if(xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        resolve (data);
      } else {
        reject ( Error(xhr.statusText))
      }
    };
    xhr.onerror = () => reject( Error('A network error occured'));
    xhr.send();
  });

}

function getProfiles(json) {
  json.people.map( person => {
    getJSON(wikiUrl + person.name, generateHTML);      
  }); 
}

function generateHTML(data) {
  const section = document.createElement('section');
  peopleList.appendChild(section);
  section.innerHTML = `
    <img src=${data.thumbnail.source}>
    <h2>${data.title}</h2>
    <p>${data.description}</p>
    <p>${data.extract}</p>
  `;
}

btn.addEventListener('click', (event) => {
  getJSON(astrosUrl, getProfiles);
  event.target.remove();
});