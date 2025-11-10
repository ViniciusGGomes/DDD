import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { EditQuestionUseCase } from "./edit-question";
import { makeQuestion } from "@/test/factory/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to edit a question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      content: "Texto Editado",
      title: "Titulo editado",
      authorId: "author-1",
      questionId: newQuestion.id.toValue(),
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      content: "Texto Editado",
      title: "Titulo editado",
    });
  });

  it("should not be able to edit a question from another person", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await expect(() => {
      return sut.execute({
        content: "Texto Editado",
        title: "Titulo editado",
        authorId: "author-2",
        questionId: newQuestion.id.toValue(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
