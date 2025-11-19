import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { EditAnswerUseCase } from "./edit-answer";
import { makeAnswer } from "@/test/factory/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./erros/not-allowed-error";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to edit an answer", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-id")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      authorId: "author-1",
      answerId: newAnswer.id.toValue(),
      content: "Resposta editada",
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "Resposta editada",
    });
  });

  it("should not be able to edit an answer from another person", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-id")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      authorId: "author-2",
      answerId: newAnswer.id.toValue(),
      content: "Resposta editada",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
