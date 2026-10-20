import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-quiz-item',
  styleUrl: './quiz-item.css',
  templateUrl: './quiz-item.html',
})
export class QuizItem {
  @Input() id: number = 0;
  @Input() name: string = 'quiz-item';
  @Input() description: string = 'A simple quiz item';
  @Input() kinds: string[] = ['Mathématiques', 'Sciences'];

  startQuiz(id: number): void {
    console.log(`Starting quiz with id: ${id}`);
  }
}
