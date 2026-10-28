import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-not-found',
  styleUrl: './not-found.css',
  templateUrl: './not-found.html',
})
export class NotFound {

  private readonly router = inject(Router);

  goBackToHome(): void {
    this.router.navigate(['/']);
  }
}
