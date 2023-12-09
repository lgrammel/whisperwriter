"use client";

import { Button } from "@/components/ui/button";
import { IconMicrophone } from "@/components/ui/icon-microphone";
import { useMicVAD, utils } from "@ricky0123/vad-react";
import { useEffect, useState } from "react";

export default function App() {
  const [items, setItems] = useState<
    Array<
      | { type: "transcription"; text: string }
      | { type: "command"; text: string }
    >
  >([]);
  const [transcribing, setTranscribing] = useState(false);
  const [paused, setPaused] = useState(false);

  const vad = useMicVAD({
    userSpeakingThreshold: 0.7,
    onSpeechEnd: async (audio) => {
      vad.pause();
      try {
        setTranscribing(true);

        // Whisper.cpp can transcribe this format without additional conversions:
        const wavBuffer = utils.encodeWAV(audio, 1, 16000, 1, 16);
        const base64 = utils.arrayBufferToBase64(wavBuffer);

        const transcriptionResponse = await fetch("/api/transcribe", {
          method: "POST",
          body: JSON.stringify({ data: base64 }),
        });

        const {
          transcription,
        }: {
          transcription: string;
        } = await transcriptionResponse.json();

        const type = transcription.toLowerCase().startsWith("command")
          ? "command"
          : "transcription";

        if (type === "transcription" && paused) {
          return;
        }

        setItems((old) => [...old, { type, text: transcription }]);

        if (type === "command") {
          const command = transcription
            .toLowerCase()
            .replace(/command/gi, "")
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
            .trim();

          if (command === "clear") {
            setItems([]);
          } else if (command === "stop") {
            setPaused(true);
          } else if (command === "start") {
            setPaused(false);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        vad.start();
        setTranscribing(false);
      }
    },
  });

  useEffect(() => {
    if (paused) vad.pause();
    else vad.start();
  }, [paused, vad]);

  return (
    <div className="m-8">
      <div className="bg-white p-4 shadow rounded-lg max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <IconMicrophone className="text-blue-600 h-6 w-6" />
            <span className="text-gray-700">
              {vad.loading
                ? "Loading..."
                : vad.errored
                ? (vad.errored && vad.errored?.message) ?? "Error"
                : vad.userSpeaking
                ? "Recording speech..."
                : transcribing
                ? "Transcribing..."
                : vad.listening
                ? "Listening..."
                : ""}
            </span>
          </div>
          <Button
            variant={paused ? "outline" : "destructive"}
            onClick={() => {
              setPaused((old) => !old);
            }}
          >
            {vad.listening ? "Stop" : "Start"}
          </Button>
        </div>
        <div className="space-y-2">
          {items.map((item, index) => {
            switch (item.type) {
              case "command":
                return (
                  <div key={index} className="bg-blue-100 p-2 rounded">
                    <p className="text-gray-700">{item.text}</p>
                  </div>
                );
              case "transcription":
                return (
                  <div key={index} className="bg-gray-100 p-2 rounded">
                    <p className="text-gray-700">{item.text}</p>
                  </div>
                );
            }
          })}
        </div>
      </div>
    </div>
  );
}
