# WhisperWriter

Local, private voice controlled notepad using [Next.js](https://nextjs.org/), [whisper.cpp](https://github.com/ggerganov/whisper.cpp), [ModelFusion](https://github.com/lgrammel/modelfusion), and [@ricky0123/vad](https://github.com/ricky0123/vad).

Voice activity detection (VAD) and speech-to-text (STT) are run locally on your machine. WhisperWriter always listens while it's running, and automatically transcribes what you say when it's active.

Besides transcription, you can use the following voice commands:

- "Command: clear": Clear the text in the panel
- "Command: stop": Stop transcribing
- "Command: start": Start transcribing

## Setup

1. Clone and compile [whisper.cpp](https://github.com/ggerganov/whisper.cpp#quick-start)
1. Start the [whisper.cpp server](https://github.com/ggerganov/whisper.cpp/tree/master/examples/server)
   - Tip: you can download stronger models for better speech recognition. Usually they take longer to respond though. See the [ModelFusion Whisper.cpp guide for details](https://modelfusion.dev/integration/model-provider/whispercpp).
1. Run `npm install`
1. Run `npm run build`
1. Run `npm start`
1. Go to http://localhost:3000/

> [!NOTE]
> There is a bug that can lead to double initialize when using `npm run dev`. You need to use `npm run build` and `npm start` instead.

## Demo

> [!NOTE]
> Transcriptions are better than what's shown in the video if you use stronger models in whisper.cpp

https://github.com/lgrammel/whisperwriter/assets/205036/8021e72b-7b88-45a2-a820-3bc3e25fbbce
