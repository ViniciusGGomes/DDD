import { expect, test } from "vitest";
import { AnswerQuestion } from "./answer-question.js";

test("create an answer", () => {
  const answerQuestion = new AnswerQuestion();

  const answer = answerQuestion.execute({
    questionId: "1",
    instructorId: "1",
    content: "Nova resposta",
  });

  expect(answer.content).toEqual("Nova resposta");
});
