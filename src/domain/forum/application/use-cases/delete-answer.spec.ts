import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteAnswerUseCase } from "./delete-answer";
import { makeAnswer } from "@/test/factory/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to delete a answer", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      authorId: "author-1",
      answerId: "answer-1",
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a answer from another person", async () => {
    const createAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(createAnswer);

    await expect(() => {
      return sut.execute({
        authorId: "author-2",
        answerId: "answer-1",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
