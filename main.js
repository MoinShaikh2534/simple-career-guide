import { CareerExplorer } from './careerExplorer.js';
import { AssessmentTool } from './assessmentTool.js';
import { MentorshipProgram } from './mentorshipProgram.js';

document.addEventListener('DOMContentLoaded', () => {
  const careerExplorer = new CareerExplorer();
  const assessmentTool = new AssessmentTool();
  const mentorshipProgram = new MentorshipProgram();

  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('href');
      const section = document.querySelector(sectionId);

      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      } else {
        console.error(`Section not found: ${sectionId}`);
      }
    });
  });
});
