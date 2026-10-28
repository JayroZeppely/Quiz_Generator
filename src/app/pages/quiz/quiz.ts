import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizDetails } from '../../components/quiz-details/quiz-details';
import { QuizQuestion } from '../../components/quiz-question/quiz-question';

@Component({
  imports: [QuizDetails, QuizQuestion],
  selector: 'app-quiz',
  styleUrl: './quiz.css',
  templateUrl: './quiz.html',
})

export class Quiz implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  id: number | null = 0;
  file: string | null = null;
  quizInfos = signal<QuizInfos | null>(null);
  errorMessage = signal<string | null>(null);
  hasBegin = signal(false);
  questions = signal<QuizInfos['questions'] | null>(null);
  answers = signal<number[]>([]);
  currentQuestionIndex = signal<number>(0);

  get isFinish(): boolean {
    for (let i = 0; i < (this.questions()?.length || 0); i++) {
      if (this.answers()[i] == undefined || this.answers()[i] == null) {
        return false;
      }
    }
    return this.answers().length === (this.questions()?.length || 0);
  }

  async ngOnInit(): Promise<void> {
    try {
      const params = this.activatedRoute.snapshot.params;
      this.id = params['id'] ? parseInt(params['id'], 10) : null;
      this.file = this.activatedRoute.snapshot.queryParamMap.get('file');
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

  selectAnswer(questionId: number, selectedOption: number): void {
    this.answers.update((currentAnswers) => {
      const updatedAnswers = [...currentAnswers];
      updatedAnswers[questionId] = selectedOption;
      return updatedAnswers;
    });
  }

  finishQuiz(): void {
    const questions = this.questions();
    if (!questions) {
      return;
    }

    let score = 0;
    const correctAnswers: string[] = [];

    for (let i = 0; i < questions.length; i++) {
      const correctAnswer = questions[i].answer;
      const selectedAnswer = this.answers()[i];
      const correctAnswerText = questions[i].options[correctAnswer] ?? 'Option non trouvée';

      correctAnswers.push(correctAnswerText);

      if (correctAnswer === selectedAnswer) {
        score++;
      }
    }

    void this.router.navigate(['/score'], {
      queryParams: {
        score: score,
        total: questions.length,
        answers: JSON.stringify(correctAnswers),
      },
    });
  }
}
