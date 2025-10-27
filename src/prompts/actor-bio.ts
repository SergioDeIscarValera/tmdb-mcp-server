import { z } from "zod";
import { type InferSchema, type PromptMetadata } from "xmcp";

export const schema = {
  actorName: z.string().describe("The name of the actor"),
  knownFor: z.array(z.string()).describe("Array of notable movies or roles"),
};

export const metadata: PromptMetadata = {
  name: "actor-bio",
  title: "Actor Biography",
  description:
    "Generate a short biography for an actor based on their notable works.",
  role: "assistant",
};

export default function actorBio({
  actorName,
  knownFor,
}: InferSchema<typeof schema>) {
  return `${actorName} is known for starring in ${knownFor.join(
    ", "
  )}. Provide a brief biography highlighting their career and major achievements.`;
}
