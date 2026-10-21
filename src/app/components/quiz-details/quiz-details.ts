import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-quiz-details',
  styleUrl: './quiz-details.css',
  templateUrl: './quiz-details.html',
})
export class QuizDetails {
  @Input() name: string = 'quiz-details';
  @Input() description: string = 'A simple quiz details component';
  @Input() kinds: string[] = ['Mathématiques', 'Sciences'];
  @Input() numberOfQuestions: number = 0;
}
