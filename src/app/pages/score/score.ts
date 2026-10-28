import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-score',
  styleUrl: './score.css',
  templateUrl: './score.html',
})
export class Score {

  private readonly activedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  @Input() score: number = 0;
  @Input() total: number = 0;

  ngOnInit(): void {
      this.score = parseInt(this.activedRoute.snapshot.queryParamMap.get('score') ?? '0');
      this.total = parseInt(this.activedRoute.snapshot.queryParamMap.get('total') ?? '0');
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
