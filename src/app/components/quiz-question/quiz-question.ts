import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-quiz-question',
  styleUrl: './quiz-question.css',
  templateUrl: './quiz-question.html',
})
export class QuizQuestion {
  @Input() id: number = 0;
  @Input() question: string = 'What is the capital of France?';
  @Input() options: string[] = ['Paris', 'London', 'Berlin', 'Madrid'];
  @Input() answer: number = 0;
  @Output() nextQuestion = new EventEmitter<void>();
  @Output() previousQuestion = new EventEmitter<void>();

  goToNextQuestion(): void {
    this.nextQuestion.emit();
  }

  checkAnswer(selectedOption: number): boolean {
    return selectedOption === this.answer;
  }
  
  goToPreviousQuestion(): void {
    this.previousQuestion.emit();
  }
}