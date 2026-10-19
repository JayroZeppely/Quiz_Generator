import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-quiz',
  styleUrl: './quiz.css',
  templateUrl: './quiz.html',
})
export class Quiz implements OnInit {

  private readonly activedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    const id = params['id'] ? parseInt(params['id'], 10) : null;
    console.log('Quiz ID:', id);
  }
}
