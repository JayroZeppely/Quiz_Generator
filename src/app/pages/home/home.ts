import { Component, OnInit, signal } from '@angular/core';
import { QuizItem } from '../../components/quiz-item/quiz-item';

interface Quiz {
  id: number;
  name: string;
  description: string;
  kinds: string[];
  file: string;
}

@Component({
  imports: [QuizItem],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  readonly quizFiles = [
    'sport.json',
    'cinema.json',
    'geographie.json',
    'histoire.json',
    'math.json',
    'sciences.json',
  ];
  quizzes = signal<Quiz[]>([]);
  categories = signal<string[]>([]);
  selectedCategories = signal<string[]>([]);
  errorMessage = signal<string | null>('');
  isLoading = signal(true);

filterByCategory(category: string, checked: boolean): void {
  if (checked) {
    this.selectedCategories.update((current) => current.includes(category) ? current : [...current, category]);
  } else {
    this.selectedCategories.update((current) => current.filter((c) => c !== category));
  }
  console.log('Selected categories:', this.selectedCategories());
}

  async ngOnInit(): Promise<void> {
    try {
      this.quizzes.set(await Promise.all(
        this.quizFiles.map(async (fileName) => {
          const response = await fetch(`/data/${fileName}`);
          if (!response.ok) {
            throw new Error(`Impossible de charger ${fileName} (${response.status})`);
          }
          let quizData = await response.json() as Quiz;
          quizData.file = fileName;
          let kinds = quizData.kinds;
          this.categories.update((currentCategories) =>
            [...new Set([...currentCategories, ...kinds])].sort((a, b) =>
              a.localeCompare(b),
            ),
          );
          return (quizData);
        }),
      ));
    } catch (error: unknown) {
      this.errorMessage.set(
        error instanceof Error
          ? error.message
          : 'Impossible de charger les quiz.'
      );
    } finally {
      this.isLoading.set(false);
      this.selectedCategories.set(this.categories());
    }
  }
}
