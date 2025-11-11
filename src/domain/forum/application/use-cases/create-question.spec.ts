import { beforeEach, describe, expect, it } from "vitest";
import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Create a Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("Should be able to create a question", async () => {
    const { question } = await sut.execute({
      title: "Nova pergunta",
      content: "Conteúdo da pergunta",
      authorId: "1",
    });

    expect(question.content).toEqual("Conteúdo da pergunta");
    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionsRepository.items[0].authorId).toEqual(
      question.authorId
    );
  });
});
