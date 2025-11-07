import { beforeEach, describe, expect, it, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswersRepositories } from "@/test/repositories/in-memory-answers-repositories";

let inMemoryAnswersRepositories: InMemoryAnswersRepositories;
let sut: AnswerQuestionUseCase;

describe("Create an answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepositories = new InMemoryAnswersRepositories();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepositories);
  });

  it("should be able to create a new answer", async () => {
    const { answer } = await sut.execute({
      instructorId: "1",
      questionId: "1",
      content: "Conteúdo da resposta",
    });

    expect(answer.id).toBeTruthy();
    expect(inMemoryAnswersRepositories.items[0].id).toEqual(answer.id);
  });
});
