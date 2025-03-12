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
        <p class = "stadium-team"><strong>Home Team:</strong> ${team}</p>
        <p class="stadium-desc">${description}</p>
        <a href="${link}" class="stadium-link" target="_blank">Read More</a>
        <p class="stadium-date"><strong>First Visit:</strong> ${date}</p>
        <p class = "stadium-visit"><strong>Total Visits:</strong> ${visits}</p>
      `;
    }
  }
//   const sampleLocalstadiums = [
//     {
//       title: "Task Manager App",
//       imgSrc: "https://via.placeholder.com/400x200",
//       imgAlt: "Task manager screenshot",
//       description: "A task management tool built with React.",
//       link: "https://github.com/username/task-manager",
//       tags: ["React", "Productivity"],
//       date: "2023-10-05"
//     }
//   ];
//   localStorage.setItem('stadiums', JSON.stringify(sampleLocalstadiums));
  customElements.define('stadium-card', stadiumCard);

  // ---------- Dynamically Create Cards ----------

  // Load from Local Storage
  const localstadiums = JSON.parse(localStorage.getItem('stadiums')) || [];

  // Load from JSON file (remote simulation)
  fetch('data.json')
    .then(response => response.json())
    .then(remotestadiums => {
      const allstadiums = [...localstadiums, ...remotestadiums];
      displaystadiums(allstadiums);
    })
    .catch(error => console.error('Failed to load JSON:', error));

  // Function to append cards
  function displaystadiums(stadiums) {
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
      card.setAttribute('visits', stadium.visits)
      container.appendChild(card);
    });
  }