import {
  generateTranscription,
  setGlobalFunctionLogging,
  whispercpp,
} from "modelfusion";

export const runtime = "edge";

setGlobalFunctionLogging("detailed-object");

const whisper = whispercpp.Transcriber({
  api: whispercpp.Api({ baseUrl: "http://localhost:8080" }),
  temperature: 0,
});

export async function POST(req: Request) {
  const { data }: { data: string } = await req.json();

  const transcription = await generateTranscription(whisper, {
    type: "wav",
    data: Buffer.from(data, "base64"),
  });

  return Response.json({ transcription });
}
