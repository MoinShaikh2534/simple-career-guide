// mentorshipProgram.js
export class MentorshipProgram {
    constructor() {
      this.container = document.querySelector('.mentorship');
      this.init();
    }
  
    init() {
      this.setupEventListeners();
      this.loadMentors();
    }
  
    setupEventListeners() {
      const browseMentorsBtn = this.container.querySelector('.btn-primary');
      const applyMentorBtn = this.container.querySelector('.btn-secondary');
  
      if (browseMentorsBtn) {
        browseMentorsBtn.addEventListener('click', () => this.showMentorsList());
      }
  
      if (applyMentorBtn) {
        applyMentorBtn.addEventListener('click', () => this.showMentorApplication());
      }
    }
  
    showMentorsList() {
      const mentorsList = document.createElement('div');
      mentorsList.className = 'mentors-list';
      mentorsList.innerHTML = `
        <h3>Available Mentors</h3>
        <ul>
          <li>Arpita - Software Developer, 5 years experience</li>
          <li>Moin - Data Scientist, 7 years experience</li>
          <li>Manasi - UX Designer, 4 years experience</li>
        </ul>
        <button class="btn request-mentor-btn">Request Mentorship</button>
      `;
  
      this.container.innerHTML = ''; // Clear the container
      this.container.appendChild(mentorsList); // Append mentors list
  
      // Event listener for requesting mentorship
      this.container.querySelector('.request-mentor-btn').addEventListener('click', () => {
        alert('Mentorship request sent!'); // Notify user
        this.init(); // Refresh the program
      });
    }
  
    showMentorApplication() {
      const applicationForm = document.createElement('div');
      applicationForm.className = 'mentor-application';
      applicationForm.innerHTML = `
        <h3>Apply to Become a Mentor</h3>
        <form id="mentor-application-form">
          <label for="name">Name:</label>
          <input type="text" name="name" required>
          <label for="expertise">Expertise:</label>
          <input type="text" name="expertise" required>
          <label for="experience">Experience (years):</label>
          <input type="number" name="experience" min="1" required>
          <button type="submit" class="btn submit-btn">Submit Application</button>
        </form>
      `;
  
      this.container.innerHTML = ''; // Clear the container
      this.container.appendChild(applicationForm); // Append application form
  
      // Event listener for form submission
      const form = applicationForm.querySelector('#mentor-application-form');
      form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission
        alert('Application submitted!'); // Notify user
        this.init(); // Refresh the program
      });
    }
  
    loadMentors() {
      // Mock API data load
      console.log('Loading mentors...');
      // Ideally, you would fetch real data from an API here
    }
  }
  