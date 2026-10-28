import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-score',
  styleUrl: './score.css',
  templateUrl: './score.html',
})
export class Score {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  score: number = 0;
  total: number = 0;
  answers: String[] = [];

  ngOnInit(): void {
      this.score = parseInt(this.activatedRoute.snapshot.queryParamMap.get('score') ?? '0');
      this.total = parseInt(this.activatedRoute.snapshot.queryParamMap.get('total') ?? '0');
      this.answers = this.activatedRoute.snapshot.queryParamMap.get('answers') ? JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('answers') ?? '[]') : [];
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
