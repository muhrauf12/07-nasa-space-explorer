// script.js
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const button = document.querySelector('button');
const gallery = document.getElementById('gallery');

setupDateInputs(startInput, endInput);

const facts = [
  "A day on Venus is longer than its year.",
  "Neutron stars can spin 600 times per second.",
  "Jupiter has 92 known moons.",
  "The Sun makes up 99.86% of the mass in the solar system.",
  "Saturn's rings are made of ice and rock particles."
];

function showRandomFact() {
  const factSection = document.createElement('div');
  factSection.className = 'space-fact';
  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  factSection.textContent = `✨ Did You Know? ${randomFact}`;
  document.querySelector('.container').insertBefore(factSection, gallery);
}

function showLoading() {
  gallery.innerHTML = '<p>\ud83d\udd04 Loading space photos...</p>';
}

function fetchImages(start, end) {
  showLoading();
  const url = `https://api.nasa.gov/planetary/apod?api_key=6WpyXV1UPDfvpPE0UrFNbUIEWiYiGb0kX9q7P7Of&start_date=${start}&end_date=${end}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      gallery.innerHTML = '';
      data.reverse().forEach(item => {
        const entry = document.createElement('div');
        entry.className = 'gallery-item';

        if (item.media_type === 'image') {
          entry.innerHTML = `
            <img src="${item.url}" alt="${item.title}" />
            <p><strong>${item.title}</strong><br>${item.date}</p>
          `;
        } else if (item.media_type === 'video') {
          entry.innerHTML = `
            <iframe src="${item.url}" frameborder="0" allowfullscreen></iframe>
            <p><strong>${item.title}</strong><br>${item.date}</p>
          `;
        }

        entry.addEventListener('click', () => showModal(item));
        gallery.appendChild(entry);
      });
    });
}

function showModal(item) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      ${item.media_type === 'image' ? `<img src="${item.hdurl}" alt="${item.title}" />` : `<iframe src="${item.url}" frameborder="0" allowfullscreen></iframe>`}
      <h2>${item.title} (${item.date})</h2>
      <p>${item.explanation}</p>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector('.close').onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

button.addEventListener('click', () => {
  fetchImages(startInput.value, endInput.value);
});

showRandomFact();

