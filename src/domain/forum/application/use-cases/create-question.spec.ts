import { beforeEach, describe, expect, it } from "vitest";
import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionsRepositories } from "@/test/repositories/in-memory-questions-repositories";

let inMemoryQuestionsRepositories: InMemoryQuestionsRepositories;
let sut: CreateQuestionUseCase;

describe("Create a Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepositories = new InMemoryQuestionsRepositories();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepositories);
  });

  it("Should be able to create a question", async () => {
    const { question } = await sut.execute({
      title: "Nova pergunta",
      content: "Conteúdo da pergunta",
      authorId: "1",
    });

    expect(question.content).toEqual("Conteúdo da pergunta");
    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionsRepositories.items[0].authorId).toEqual(
      question.authorId
    );
  });
});
