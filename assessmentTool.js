// src/js/assessmentTool.js
import { assessmentQuestions } from './assessmentData.js';

export class AssessmentTool {
  constructor() {
    this.questions = assessmentQuestions;
    this.currentQuestion = 0;
    this.answers = {};
    this.container = document.querySelector('.assessment-card');
    this.init();
  }

  init() {
    this.renderQuestion();
    this.setupProgressBar();
  }

  renderQuestion() {
    if (this.currentQuestion >= this.questions.length) {
      this.showResults();
      return;
    }

    const question = this.questions[this.currentQuestion];
    this.container.innerHTML = `
      <h3>${question.question}</h3>
      <div class="options">
        ${question.options.map(option => `
          <button class="option-btn">${option}</button>
        `).join('')}
      </div>
      <div class="progress-bar">
        Question ${this.currentQuestion + 1} of ${this.questions.length}
      </div>
    `;

    this.container.querySelectorAll('.option-btn').forEach(button => {
      button.addEventListener('click', () => this.handleAnswer(button.textContent));
    });
  }

  handleAnswer(answer) {
    this.answers[this.questions[this.currentQuestion].id] = answer;
    this.currentQuestion++;
    this.renderQuestion();
    this.updateProgress();
  }

  setupProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-container';
    this.container.parentNode.insertBefore(progressBar, this.container);
    this.updateProgress();
  }

  updateProgress() {
    const progress = (this.currentQuestion / this.questions.length) * 100;
    const progressBar = document.querySelector('.progress-container');
    progressBar.style.width = `${progress}%`;
  }

  showResults() {
    const careerSuggestions = this.analyzeAnswers();
    this.container.innerHTML = `
      <h3>Assessment Complete!</h3>
      <div class="results">
        <h4>Based on your answers, you might be interested in:</h4>
        <ul class="career-suggestions">
          ${careerSuggestions.map(career => `
            <li>${career}</li>
          `).join('')}
        </ul>
        <button class="btn btn-primary restart-btn">Take Assessment Again</button>
      </div>
    `;

    this.container.querySelector('.restart-btn').addEventListener('click', () => {
      this.currentQuestion = 0;
      this.answers = {};
      this.renderQuestion();
      this.updateProgress();
    });
  }

  analyzeAnswers() {
    // Simple analysis based on answers
    const suggestions = [];
    const techAnswers = Object.values(this.answers).filter(answer => 
      answer.toLowerCase().includes('technology') || 
      answer.toLowerCase().includes('problem')
    ).length;

    const creativeAnswers = Object.values(this.answers).filter(answer => 
      answer.toLowerCase().includes('creative') || 
      answer.toLowerCase().includes('design')
    ).length;

    if (techAnswers >= 2) suggestions.push('Software Developer', 'Data Scientist');
    if (creativeAnswers >= 2) suggestions.push('UX Designer', 'Graphic Designer');
    
    return suggestions.length ? suggestions : ['Career Counselor Consultation Recommended'];
  }
}
