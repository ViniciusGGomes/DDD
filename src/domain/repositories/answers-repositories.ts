import { Answer } from "../entities/answer";

export interface AnswersRepositories {
  create(answer: Answer): Promise<void>;
}
