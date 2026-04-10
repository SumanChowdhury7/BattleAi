import { HumanMessage } from "@langchain/core/messages";
import {
  StateSchema,
  MessagesValue,
  ReducedValue,
  StateGraph,
  START,
  END,
  type GraphNode,
} from "@langchain/langgraph";
import { z } from "zod";
import { mistralModel, cohereModel, geminiModel } from "./models.service.js";
import { createAgent, providerStrategy } from "langchain";

const State = new StateSchema({
  problem: z.string().default(""),
  solution_1: z.string().default(""),
solution_2: z.string().default(""),
  judge: z.object({
    solution_1_score: z.number().default(0),
    solution_2_score: z.number().default(0),
    solution_1_reasoning: z.string().default(""),
    solution_2_reasoning: z.string().default(""),
  }),
});

const solutionNode: GraphNode<typeof State> = async (state: typeof State) => {

  const [mistralResponse, cohereResponse] = await Promise.all([
    mistralModel.invoke(state.problem),
    cohereModel.invoke(state.problem),
  ]);

  return {
    solution_1: mistralResponse.text,
    solution_2: cohereResponse.text,
  };
};

const judge_node: GraphNode<typeof State> = async (state: typeof State) => {
  const { solution_1, solution_2 } = state;

  const judgeAgent = createAgent({
    model: geminiModel,
    tools: [],
    responseFormat: providerStrategy(
      z.object({
        solution_1_score: z.number().min(0).max(10),
        solution_2_score: z.number().min(0).max(10),
        solution_1_reasoning: z.string(),
        solution_2_reasoning: z.string(),
      })),
      systemPrompt: `You are a helpful and precise assistant for checking the quality of the answer. You will be given a question and two solutions. You need to judge which solution is better for the question and give a score between 0-10 for each solution. Where 0 means the solution is incorrect and irrelevant, and 10 means the solution is correct and highly relevant. And give feedback on each solution, and reason why you gave the scores.`,
  });

  const judgeResponse = await judgeAgent.invoke({
    messages: [
      new HumanMessage(`
        problem: ${state.problem}
        solution 1: ${solution_1}
        solution 2: ${solution_2}

        please judge the quality of the two solutions and give a score between 0-10 for each solution, and give feedback and reasoning for each solution.
        `
        ,
      ),
    ],
  });

const {
  solution_1_score,
  solution_2_score,
  solution_1_reasoning,
  solution_2_reasoning
} = judgeResponse.structuredResponse

return {
judge: {
  solution_1_score,
  solution_2_score,
  solution_1_reasoning,
  solution_2_reasoning
}
}


};

const graph = new StateGraph(State)
  .addNode("solutionNode", solutionNode)
  .addNode("judgeNode", judge_node)
  .addEdge(START, "solutionNode")
  .addEdge("solutionNode", "judgeNode")
  .addEdge("judgeNode", END)
  .compile();

export default async function (problem: string) {
  const result = await graph.invoke({
    problem: problem
  });

  console.log(result);

  return result;
}
