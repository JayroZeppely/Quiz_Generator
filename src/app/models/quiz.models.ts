interface Quiz {
  id: number;
  name: string;
  description: string;
  kinds: string[];
  file: string;
}

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