import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizDetails } from '../../components/quiz-details/quiz-details';
import { QuizQuestion } from '../../components/quiz-question/quiz-question';

interface QuizInfos {
  id: number;
  name: string;
  description: string;
  kinds: string[];
  questions: Array<{
    id: number;
    question: string;
    options: string[];
    answer: number;
  }>;
  numberOfQuestions: number;
}

@Component({
  imports: [QuizDetails, QuizQuestion],
  selector: 'app-quiz',
  styleUrl: './quiz.css',
  templateUrl: './quiz.html',
})

export class Quiz implements OnInit {

  private readonly activedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  id: number | null = 0;
  score : number = 0;
  file: string | null = null;
  quizInfos = signal<QuizInfos | null>(null);
  errorMessage = signal<string | null>(null);
  hasBegin = signal(false);
  questions = signal<QuizInfos['questions'] | null>(null);
  currentQuestionIndex = signal<number>(0);

  async ngOnInit(): Promise<void> {
    try {
      const params = this.activedRoute.snapshot.params;
      this.id = params['id'] ? parseInt(params['id'], 10) : null;
      this.file = this.activedRoute.snapshot.queryParamMap.get('file');
      await this.loadQuizInfos();
    } catch (error: unknown) {
      this.errorMessage.set(
        error instanceof Error
          ? error.message
          : 'Impossible de charger le quiz.',
      );
    }
  }

  async loadQuizInfos(): Promise<void> {
    if (!this.file) {
      throw new Error('Le fichier du quiz est manquant.');
    }

    const response = await fetch(`/data/${this.file}`);
    if (!response.ok) {
      throw new Error(`Impossible de charger ${this.file} (${response.status})`);
    }

    const quizData = (await response.json()) as QuizInfos;
    this.quizInfos.set({
      ...quizData,
      numberOfQuestions: quizData.questions.length,
    });
    this.questions.set(quizData.questions);
  }

  beginQuiz(): void {
    this.hasBegin.set(true);
    this.currentQuestionIndex.set(0);
  }

  goToNextQuestion(): void {
    const questions = this.questions();
    if (!questions) {
      return;
    }

    this.currentQuestionIndex.update((index) =>
      Math.min(index + 1, questions.length - 1),
    );
  }

  goToPreviousQuestion(): void {
    this.currentQuestionIndex.update((index) => Math.max(index - 1, 0));
  }

  incrementScore(): void {
    this.score++;
  }

  finishQuiz(): void {
    void this.router.navigate(['/score'], {
      queryParams: { score: this.score, total: this.questions()?.length ?? 0 },
    });
  }
}
