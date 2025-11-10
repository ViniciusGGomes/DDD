import { AnswersRepository } from "../repositories/answers-repository";

interface deleteAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: deleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Not found answer");
    }

    if (authorId != answer.authorId.toString()) {
      throw new Error("Not allowed");
    }

    await this.answersRepository.delete(answer);

    return {};
  }
}
