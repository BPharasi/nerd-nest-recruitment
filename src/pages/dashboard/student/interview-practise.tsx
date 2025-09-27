
import { useState, useRef, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

interface PracticeQuestion {
  type: "audio" | "video" | "mcq" | "coding";
  question: string;
  options?: string[]; // For MCQ
  timeLimit: number; // Seconds
}

const mockQuestions: PracticeQuestion[] = [
  { type: "audio", question: "Describe your strengths in 60 seconds.", timeLimit: 60 },
  { type: "video", question: "Tell us about yourself.", timeLimit: 120 },
  { type: "mcq", question: "What is 2 + 2?", options: ["3", "4", "5"], timeLimit: 30 },
  { type: "coding", question: "Write a function to sum two numbers.", timeLimit: 300 },
];

const InterviewPracticePage: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentType, setCurrentType] = useState<"audio" | "video" | "mcq" | "coding">("audio");
  const [currentQuestion, setCurrentQuestion] = useState<PracticeQuestion | null>(null);
  const [timer, setTimer] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState("");
  const [mcqAnswer, setMcqAnswer] = useState("");
  const [code, setCode] = useState("");
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated" || session?.user?.role !== "Student") {
    router.push("/auth/signin");
    return null;
  }

  const requestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      setPermissionsGranted(true);
    } catch (err) {
      console.error("Permission denied", err);
    }
  };

  const startPractice = (type: "audio" | "video" | "mcq" | "coding") => {
    setCurrentType(type);
    const question = mockQuestions.find((q) => q.type === type) || mockQuestions[0];
    setCurrentQuestion(question);
    setTimer(question.timeLimit);
    if (type === "video" || type === "audio") {
      startRecording(type === "video");
    }
  };

  const startRecording = async (video: boolean) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    mediaRecorderRef.current = new MediaRecorder(stream);
    const chunks: Blob[] = [];
    mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: "video/mp4" });
      setRecordingUrl(URL.createObjectURL(blob));
    };
    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (isRecording) {
      stopRecording();
    }
    return () => clearInterval(interval);
  }, [timer, isRecording]);

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Interview Practice</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Interview Practice
        </h1>
        <p className="text-center mb-6">Practice audio, video, MCQ, and coding questions.</p>
        {!permissionsGranted && (
          <button onClick={requestPermissions} className="bg-blue-800 text-white p-3 rounded mb-4">
            Grant Camera/Microphone Permissions
          </button>
        )}
        <div className="flex justify-center mb-6">
          <button onClick={() => startPractice("audio")} className="mx-2 p-2 bg-gray-200 rounded">
            Audio
          </button>
          <button onClick={() => startPractice("video")} className="mx-2 p-2 bg-gray-200 rounded">
            Video
          </button>
          <button onClick={() => startPractice("mcq")} className="mx-2 p-2 bg-gray-200 rounded">
            MCQ
          </button>
          <button onClick={() => startPractice("coding")} className="mx-2 p-2 bg-gray-200 rounded">
            Coding
          </button>
        </div>
        {currentQuestion && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">{currentQuestion.type.toUpperCase()} Practice</h2>
            <p>{currentQuestion.question}</p>
            <p>Time left: {timer} seconds</p>
            {currentType === "video" || currentType === "audio" ? (
              <div>
                <video ref={videoRef} autoPlay muted className="w-full mb-4" />
                {isRecording ? (
                  <button onClick={stopRecording} className="bg-red-600 text-white p-3 rounded">
                    Stop Recording
                  </button>
                ) : (
                  recordingUrl && <video src={recordingUrl} controls className="w-full" />
                )}
              </div>
            ) : currentType === "mcq" ? (
              <div>
                {currentQuestion.options?.map((option, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      name="mcq"
                      value={option}
                      onChange={(e) => setMcqAnswer(e.target.value)}
                    />
                    {option}
                  </div>
                ))}
                <button className="bg-blue-800 text-white p-3 rounded mt-4">
                  Submit Answer
                </button>
              </div>
            ) : currentType === "coding" ? (
              <div>
                <AceEditor
                  mode="javascript"
                  theme="github"
                  value={code}
                  onChange={setCode}
                  name="code-editor"
                  editorProps={{ $blockScrolling: true }}
                  style={{ width: "100%", height: "300px" }}
                />
                <button className="bg-blue-800 text-white p-3 rounded mt-4">
                  Run Code (Mock)
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default InterviewPracticePage;