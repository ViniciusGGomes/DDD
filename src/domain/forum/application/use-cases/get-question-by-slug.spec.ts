import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { makeQuestion } from "@/test/factory/make-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to get a question by slug", async () => {
    const createSlug = makeQuestion({
      slug: Slug.create("nova-pergunta"),
    });

    await inMemoryQuestionsRepository.create(createSlug);

    const { question } = await sut.execute({
      slug: "nova-pergunta",
    });

    expect(question.id).toBeTruthy();
    expect(createSlug.slug).toEqual(question.slug);
  });
});
