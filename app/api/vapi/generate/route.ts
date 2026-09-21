import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { revalidatePath } from "next/cache";

import { getFirebaseDb } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

interface GenerateInterviewArgs {
  type: string;
  role: string;
  level: string;
  techstack: string;
  amount: number | string;
  userid: string;
}

async function generateInterview(args: GenerateInterviewArgs) {
  const { type, role, level, techstack, amount, userid } = args;

  const { text: questions } = await generateText({
    model: google("gemini-2.0-flash-001"),
    prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]

        Thank you! <3
    `,
  });

  const interview = {
    role,
    type,
    level,
    techstack: techstack.split(",").map((tech) => tech.trim()),
    questions: JSON.parse(questions),
    userId: userid,
    finalized: true,
    coverImage: getRandomInterviewCover(),
    createdAt: new Date().toISOString(),
  };

  await getFirebaseDb().collection("interviews").add(interview);
  revalidatePath("/");
}

export async function POST(request: Request) {
  const body = await request.json();

  // Vapi's custom function tool webhook wraps the call in this envelope:
  // { message: { toolCallList: [{ id, name, arguments }] } }
  const toolCall = body?.message?.toolCallList?.[0];

  if (toolCall) {
    try {
      await generateInterview(toolCall.arguments as GenerateInterviewArgs);

      return Response.json({
        results: [
          {
            toolCallId: toolCall.id,
            result:
              "Your interview has been created successfully. You'll find it on your dashboard.",
          },
        ],
      });
    } catch (error) {
      console.error("Error generating interview:", error);

      return Response.json({
        results: [
          {
            toolCallId: toolCall.id,
            result:
              "Sorry, something went wrong while creating your interview. Please try again shortly.",
          },
        ],
      });
    }
  }

  // Fallback for direct, non-Vapi callers posting the flat shape.
  try {
    await generateInterview(body as GenerateInterviewArgs);
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error generating interview:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
