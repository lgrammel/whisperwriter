import { generateTranscription, whispercpp } from "modelfusion";

export const runtime = "edge";

const whisper = whispercpp.Transcriber({
  api: whispercpp.Api({ baseUrl: "http://localhost:8080" }),
  temperature: 0,
});

export async function POST(req: Request) {
  const { data }: { data: string } = await req.json();

  const transcription = await generateTranscription({
    model: whisper,
    mimeType: "audio/wav",
    audioData: data,
    logging: "basic-text",
  });

  return Response.json({ transcription });
}
