import { careers } from './careerData.js';

export class CareerExplorer {
  constructor() {
    this.careers = careers;
    this.careerGrid = document.querySelector('.career-grid');
    this.init();
  }

  init() {
    this.renderCareers();
    this.setupSearch();
    this.setupFilters();
  }

  // Setup the search functionality
setupSearch() {
  const searchInput = document.querySelector('.search-bar'); // Select the search input
  const careerGrid = document.querySelector('.career-grid'); // Select the career grid

  // Array of careers (Example: these should match the structure of your career data)
  const careers = [
      { title: 'Software Engineer', description: 'Develops and maintains software applications.' },
      { title: 'Data Scientist', description: 'Analyzes and interprets complex data.' },
      { title: 'Marketing Manager', description: 'Oversees marketing strategies and campaigns.' },
      { title: 'Graphic Designer', description: 'Creates visual content to communicate messages.' }
  ];

  // Function to render careers
  function renderCareers(careersToDisplay) {
      careerGrid.innerHTML = ''; // Clear the grid
      careersToDisplay.forEach(career => {
          const careerCard = document.createElement('div'); // Create career card div
          careerCard.className = 'career-card'; // Add a class for styling

          // Populate the card with title and description
          careerCard.innerHTML = `
              <h3>${career.title}</h3>
              <p>${career.description}</p>
          `;

          // Add the card to the career grid
          careerGrid.appendChild(careerCard);
      });
  }

  // Initial render of all careers
  renderCareers(careers);

  // Event listener for search input
  searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase(); // Get the input and convert to lowercase
      const filteredCareers = careers.filter(career => 
          career.title.toLowerCase().includes(searchTerm) || // Match by title
          career.description.toLowerCase().includes(searchTerm) // Match by description
      );
      renderCareers(filteredCareers); // Render the filtered careers
  });
}


  renderCareers(filteredCareers = this.careers) {
    this.careerGrid.innerHTML = '';
    filteredCareers.forEach(career => {
      const careerCard = this.createCareerCard(career);
      this.careerGrid.appendChild(careerCard);
    });
  }

  createCareerCard(career) {
    const card = document.createElement('div');
    card.className = 'career-card';
    card.innerHTML = `
      <h3>${career.title}</h3>
      <p>${career.description}</p>
      <div class="skills">
        <h4>Required Skills:</h4>
        <ul>
          ${career.skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
      </div>
      <div class="education">
        <h4>Education:</h4>
        <ul>
          ${career.education.map(edu => `<li>${edu}</li>`).join('')}
        </ul>
      </div>
      <div class="career-info">
        <p>Job Outlook: ${career.jobOutlook}</p>
        <p>Average Salary: ${career.averageSalary}</p>
      </div>
    `;
    return card;
  }

  setupSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search careers...';
    searchInput.className = 'search-input';

    this.careerGrid.parentNode.insertBefore(searchInput, this.careerGrid);

    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredCareers = this.careers.filter(career => 
        career.title.toLowerCase().includes(searchTerm) ||
        career.description.toLowerCase().includes(searchTerm)
      );
      this.renderCareers(filteredCareers);
    });
  }

  setupFilters() {
    const filters = document.createElement('div');
    filters.className = 'career-filters';
    filters.innerHTML = `
      <select class="filter-select">
        <option value="">All Salaries</option>
        <option value="0-10">₹0-10 LPA</option>
        <option value="10-20">₹10-20 LPA</option>
        <option value="20+">₹20+ LPA</option>
      </select>
    `;

    this.careerGrid.parentNode.insertBefore(filters, this.careerGrid);

    filters.querySelector('select').addEventListener('change', (e) => {
      const value = e.target.value;
      if (!value) {
        this.renderCareers();
        return;
      }

      const filteredCareers = this.careers.filter(career => {
        const salary = parseInt(career.averageSalary.match(/\d+/)[0]);
        switch(value) {
          case '0-10': return salary <= 10;
          case '10-20': return salary > 10 && salary <= 20;
          case '20+': return salary > 20;
          default: return true;
        }
      });
      this.renderCareers(filteredCareers);
    });
  }
}
