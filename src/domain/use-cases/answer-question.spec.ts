import { expect, test } from "vitest";
import { AnswerQuestion } from "./answer-question";
import type { AnswersRepositories } from "../repositories/answers-repositories";
import type { Answer } from "../entities/answer";

const fakeAnswersRepository: AnswersRepositories = {
  create: async (answer: Answer) => {
    return;
  },
};

test("create an answer", async () => {
  const answerQuestion = new AnswerQuestion(fakeAnswersRepository);

  const answer = await answerQuestion.execute({
    instructorId: "1",
    questionId: "1",
    content: "Nova resposta",
  });

  expect(answer.content).toEqual("Nova resposta");
});
