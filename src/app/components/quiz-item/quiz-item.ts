import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-quiz-item',
  styleUrl: './quiz-item.css',
  templateUrl: './quiz-item.html',
})
export class QuizItem {
  private readonly router = inject(Router);

  @Input() id: number = 0;
  @Input() name: string = 'quiz-item';
  @Input() file: string = 'quiz-item.json';
  @Input() description: string = 'A simple quiz item';
  @Input() kinds: string[] = ['Mathématiques', 'Sciences'];

  viewQuiz(id: number, file: string): void {
    void this.router.navigate(['/quiz', id], {
      queryParams: { file },
    });
  }
}
