import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepositories } from "../repositories/questions-repositories";

interface CreateQuestionUseCaseRequest {
  title: string;
  content: string;
  authorId: string;
}

interface CreateQuestionUseCaseResponse {
  question: Question;
}

export class CreateQuestionUseCase {
  constructor(private questionsRepositories: QuestionsRepositories) {}

  async execute({
    title,
    content,
    authorId,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      title,
      content,
      authorId: new UniqueEntityID(authorId),
    });

    await this.questionsRepositories.create(question);

    return { question };
  }
}
