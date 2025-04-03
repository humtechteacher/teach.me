export interface Stats {
  correct: number;
  incorrect: number;
  accuracy: string;
  streak: number;
  score: number;
}

export interface Feedback {
  title: string;
  message: string;
  details: {
    items: {
      icon: string;
      iconColor: string;
      text: string;
    }[];
    summary?: string;
  };
}
