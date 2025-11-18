import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteQuestionUseCase } from "./delete-question";
import { makeQuestion } from "@/test/factory/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./erros/not-allowed-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("Delete Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to delete a question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1")
    );

    // console.log(createQuestion);

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId: "author-1",
      questionId: "question-1",
    });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a question from another user", async () => {
    const createQuestion = makeQuestion(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("question-2")
    );

    await inMemoryQuestionsRepository.create(createQuestion);

    const result = await sut.execute({
      authorId: "author-2",
      questionId: "question-2",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
