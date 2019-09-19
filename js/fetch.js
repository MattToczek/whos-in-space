const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');


function getProfiles(json) {
  const profiles = json.people.map( person => {
    const craft = person.craft ;
    return fetch(wikiUrl + person.name)  
            .then( response => response.json() )
            .then(profile => {
                return {...profile, craft }
            })
            .catch( err => console.log('Error Fetching Wiki: ', err) )
  }); 
  return Promise.all(profiles);    
}

function generateHTML(data) {
  data.map( person => {
    const section = document.createElement('section');
    peopleList.appendChild(section);
    if(person.thumbnail){
      section.innerHTML = `
      <img src=${person.thumbnail.source}>
      <h2>${person.title}</h2>
      <span>${person.craft}</span>
      <p>${person.description}</p>
      <p>${person.extract}</p>
      `;
    }else{
      section.innerHTML = `
        <h2>${person.title}</h2>
        <p>The above name has multiple entries on Wikipedia - please see the <a target="_blank" href=${person.content_urls.desktop.page}>Wikipedia disambiguation page</a>.</p>
        <p>Sorry for the inconvenience.</p>
      `;
    }
  });
  
}

btn.addEventListener('click', (event) => {
  event.target.textContent = "Loading...";

  fetch(astrosUrl)
    .then( response => response.json() )
    .then(getProfiles)
    .then( generateHTML )
    .catch( err => {
      peopleList.innerHTML = "<h3>Something went wrong! Please refresh and try again.</h3>"
      console.log(err) 
    })
    .finally( () => event.target.remove() )  
});