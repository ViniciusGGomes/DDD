import { beforeEach, describe, expect, it, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Create an answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("should be able to create a new answer", async () => {
    const result = await sut.execute({
      instructorId: "1",
      questionId: "1",
      content: "Conteúdo da resposta",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer);
  });
});
