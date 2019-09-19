const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// Handle all fetch requests
async function getPeopleInSpace(url){
  const peopleResponse = await fetch(url);
  const peopleJSON = await peopleResponse.json();

  const profiles = peopleJSON.people.map( async (person) =>{
    const craft = person.craft;
    const profileResponse = await fetch(wikiUrl + person.name);
    const profileJSON = await profileResponse.json();

    return {...profileJSON, craft}
  });

  return Promise.all(profiles);
}

// Generate the markup for each profile
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

btn.addEventListener('click', async (event) => {
  event.target.textContent = "Loading...";

  getPeopleInSpace(astrosUrl)
    .then(generateHTML)
    .finally( () => event.target.remove() )
});