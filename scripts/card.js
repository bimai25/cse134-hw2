class stadiumCard extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
      const title = this.getAttribute('title');
      const imgSrc = this.getAttribute('img-src');
      const imgAlt = this.getAttribute('img-alt');
      const description = this.getAttribute('description');
      const link = this.getAttribute('link');
      const date = this.getAttribute('date');
      const visits = this.getAttribute('visits');
      const team = this.getAttribute('homeTeam');

      this.shadowRoot.innerHTML = `
          <style>
              @import url('style.css');
          </style>
          <h2 class="stadium-title">${title}</h2>
          <picture>
              <img src="${imgSrc}" alt="${imgAlt}" width="100%" height="175" style="object-fit: cover; border-radius: 0.5rem; margin-bottom: 0.25rem;">
          </picture>
          <p class="stadium-team"><strong>Home Team:</strong> ${team}</p>
          <p class="stadium-desc">${description}</p>
          <a href="${link}" class="stadium-link" target="_blank">Read More</a>
          <p class="stadium-date"><strong>First Visit:</strong> ${date}</p>
          <p class="stadium-visit"><strong>Total Visits:</strong> ${visits}</p>
      `;
  }
}

customElements.define('stadium-card', stadiumCard);

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('stadiums', JSON.stringify(data));
    console.log('Stadium data has been saved to localStorage!');
  })
  .catch(error => console.error('Failed to load JSON:', error));

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById('load-local').addEventListener('click', async () => {
  const localStadiums = JSON.parse(localStorage.getItem('stadiums')) || [];
  clearStadiums();
  await delay(500);
  displayStadiums(localStadiums);
});

document.getElementById('load-remote').addEventListener('click', () => {
  fetch('https://api.jsonbin.io/v3/b/67d33d068561e97a50eb68a6/latest', {
    headers: {
      'X-Master-Key': '$2a$10$4oBLd/upsQNvKaZKCDGm4eiGSPfi8OTUJXWqAD4lQWIjQzznWksBy'
    }
  })
    .then(response => response.json())
    .then(async data => {
      const remoteStadiums = data.record;
      clearStadiums();
      await delay(500);
      displayStadiums(remoteStadiums);
    })
    .catch(error => console.error('Failed to load remote JSON:', error));
});


function displayStadiums(stadiums) {
  const container = document.getElementById('stadiums-container');
  stadiums.forEach(stadium => {
      const card = document.createElement('stadium-card');
      card.setAttribute('title', stadium.title);
      card.setAttribute('img-src', stadium.imgSrc);
      card.setAttribute('img-alt', stadium.imgAlt);
      card.setAttribute('description', stadium.description);
      card.setAttribute('link', stadium.link);
      card.setAttribute('date', stadium.date);
      card.setAttribute('homeTeam', stadium.homeTeam);
      card.setAttribute('visits', stadium.visits);
      container.appendChild(card);
  });
}

function clearStadiums() {
  const container = document.getElementById('stadiums-container');
  container.innerHTML = '';
}