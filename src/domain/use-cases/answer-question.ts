import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Answer } from "../entities/answer";
import type { AnswersRepositories } from "../repositories/answers-repositories";

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestion {
  constructor(private answersRepositories: AnswersRepositories) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    });

    await this.answersRepositories.create(answer);

    return answer;
  }
}
