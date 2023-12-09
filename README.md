# WhisperWriter

Voice controlled notepad using [Next.js](https://nextjs.org/), [whisper.cpp](https://github.com/ggerganov/whisper.cpp), [ModelFusion](https://github.com/lgrammel/modelfusion), and [@ricky0123/vad](https://github.com/ricky0123/vad).

## Setup

1. Clone and compile [whisper.cpp](https://github.com/ggerganov/whisper.cpp#quick-start)
1. Start the [whisper.cpp server](https://github.com/ggerganov/whisper.cpp/tree/master/examples/server)
1. Run `npm install`
1. Run `npm run build`
1. Run `npm start`
1. Go to http://localhost:3000/

:::note
There is a bug that can lead to double initialize when using `npm run dev`. You need to use `npm run build` and `npm start` instead.
:::
