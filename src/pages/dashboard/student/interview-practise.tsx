import { useState, useRef, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import Header from "@/components/Header";
import Link from "next/link";
import { FaUser, FaFileAlt, FaSearch, FaClipboardList, FaVideo, FaTrophy, FaBell } from "react-icons/fa";

interface PracticeQuestion {
  id: number;
  type: "audio" | "video" | "mcq" | "coding";
  category: "cs" | "bis" | "general";
  subType: "technical" | "problem-solving" | "conceptual" | "behavioral" | "case-study";
  question: string;
  explanation?: string;
  timeLimit: number;
  options?: string[];
  sampleAnswer?: string;
  correctAnswer?: number;
}

const mockQuestions: PracticeQuestion[] = [
  // CS MCQ Questions
  {
    id: 1,
    type: "mcq",
    category: "cs",
    subType: "technical",
    question: "What is the time complexity of inserting an element at the beginning of an array?",
    options: [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n²)"
    ],
    correctAnswer: 1,
    explanation: "Arrays require shifting all elements, making it linear time.",
    timeLimit: 60
  },
  {
    id: 2,
    type: "mcq",
    category: "cs",
    subType: "conceptual",
    question: "In object-oriented programming, which principle allows a subclass to provide a specific implementation of a method already defined in its superclass?",
    options: [
      "Inheritance",
      "Encapsulation",
      "Abstraction",
      "Polymorphism"
    ],
    correctAnswer: 3,
    explanation: "Polymorphism enables method overriding for flexible code.",
    timeLimit: 60
  },
  // ...more CS MCQ questions...

  // BIS MCQ Questions
  {
    id: 101,
    type: "mcq",
    category: "bis",
    subType: "technical",
    question: "What does ERP stand for, and what is its main benefit?",
    options: [
      "Enterprise Resource Planning; integrates business processes",
      "Electronic Record Processing; data storage",
      "External Resource Procurement; vendor management",
      "Efficient Reporting Platform; analytics only"
    ],
    correctAnswer: 0,
    explanation: "ERP unifies finance, HR, and supply chain for efficiency.",
    timeLimit: 60
  },
  {
    id: 102,
    type: "mcq",
    category: "bis",
    subType: "conceptual",
    question: "In business analysis, what is a use case diagram used for?",
    options: [
      "Showing data flow",
      "Modeling user interactions with a system",
      "Financial forecasting",
      "Network topology"
    ],
    correctAnswer: 1,
    explanation: "Use cases capture functional requirements from user perspectives.",
    timeLimit: 60
  },
  // ...more BIS MCQ questions...
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
  const [selectedCategory, setSelectedCategory] = useState<"cs" | "bis" | "general">("general");
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const navigationGroups = [
    {
      title: "Profile",
      items: [
        { href: "/dashboard/student/Profile", label: "Profile Setup", icon: <FaUser /> },
        { href: "/dashboard/student/resume-builder", label: "Create CV", icon: <FaFileAlt /> },
      ]
    },
    {
      title: "Job Search",
      items: [
        { href: "/jobs", label: "Job Search & Matching", icon: <FaSearch /> },
        { href: "/dashboard/student/applications", label: "Applications", icon: <FaClipboardList /> },
        { href: "/dashboard/student/interviews", label: "Interviews", icon: <FaVideo /> },
      ]
    },
    {
      title: "Activities",
      items: [
        { href: "/dashboard/student/skills-challenge", label: "Skills Challenges", icon: <FaTrophy /> },
        { href: "/dashboard/student/notifications", label: "Notifications", icon: <FaBell /> },
      ]
    }
  ];

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
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: '#f9fafb' }}>
      <Head>
        <title>Interview Practice - UFS Recruitment</title>
      </Head>

      {/* Fixed Height Header */}
      <header style={{ 
        height: '75px', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 10, 
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <Header />
      </header>

      {/* Left Navigation */}
      <aside 
        style={{ 
          position: 'absolute',
          top: '75px',
          bottom: 0,
          left: 0,
          width: '256px',
          overflowY: 'auto',
          background: 'linear-gradient(to bottom, #26A69A, #00BCD4)',
          padding: '1rem'
        }}
        className={`block`}
      >
        {/* Profile Avatar Section */}
        <div className="relative mb-8" style={{ height: '180px', width: '100%' }}>
          <div 
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: '20px',
              width: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div 
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '60px',
                border: '4px solid rgba(255, 255, 255, 0.9)',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginBottom: '12px'
              }}
            >
              <img 
                src={session?.user?.image || "https://www.gravatar.com/avatar/?d=mp"} 
                alt="Profile" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-white text-lg">{session?.user?.name || "Student"}</h3>
            </div>
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="space-y-4">
          {navigationGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              <div className="px-4 py-2 text-sm font-semibold text-white uppercase tracking-wider mb-3">
                {group.title}
              </div>
              <div className="space-y-2">
                {group.items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block"
                  >
                    <div 
                      style={{
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                      className="px-4 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-3"
                    >
                      <span className="text-lg text-white">{item.icon}</span>
                      <span className="text-white font-medium">{item.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{
        position: 'absolute',
        top: '75px',
        right: 0,
        bottom: 0,
        left: '256px',
        overflowY: 'auto',
        padding: '2rem',
        background: '#f9fafb'
      }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Interview Practice</h1>

            {/* Category Selection */}
            <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            gap: '16px',
            width: '100%',
            marginBottom: '24px',
            }}>
            {["cs", "bis"].map((category) => (
              <div
              key={category}
              style={{
                display: 'flex',
                flex: '1',
                minWidth: '200px',
                backgroundColor: selectedCategory === category ? '#14b8a6' : 'white',
                color: selectedCategory === category ? 'white' : '#111827',
                padding: '16px',
                borderRadius: '12px',
                border: selectedCategory === category ? '2px solid #14b8a6' : '1px solid #e5e7eb',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => {
                setSelectedCategory(category as any);
                // Find a question matching both type and category, or fallback to first in category
                const question = mockQuestions.find(
                (q) => q.type === currentType && q.category === category
                ) || mockQuestions.find((q) => q.category === category);
                setCurrentQuestion(question || null);
                setTimer(question ? question.timeLimit : 0);
                setIsRecording(false);
                setRecordingUrl("");
                setMcqAnswer("");
                setCode("");
              }}
              className={`hover:border-teal-500 transition-colors ${
                selectedCategory === category ? 'border-teal-500' : ''
              }`}
              >
              <h3 className="text-lg font-medium" style={{ color: selectedCategory === category ? 'white' : '#111827' }}>
                {category === "cs" ? "Computer Science" : "Business Information Systems"}
              </h3>
              </div>
            ))}
            </div>

          {/* Question Types */}
          <div style={{ display: "flex", gap: "20px", marginBottom: "24px", justifyContent: "center" }}>
            {["audio", "video", "mcq", "coding"].map((type) => (
              <button
                key={type}
                onClick={() => startPractice(type as any)}
                style={{
                  background: currentType === type ? "linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%)" : "#f3f4f6",
                  color: currentType === type ? "#fff" : "#374151",
                  fontWeight: 600,
                  padding: "12px 32px",
                  borderRadius: "10px",
                  border: currentType === type ? "2px solid #14b8a6" : "2px solid transparent",
                  boxShadow: currentType === type ? "0 2px 8px rgba(20,184,166,0.15)" : "none",
                  transition: "all 0.2s",
                  cursor: "pointer",
                  fontSize: "1rem",
                  letterSpacing: "0.05em"
                }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Practice Area */}
          {currentQuestion && (
            <div style={{
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(20, 184, 166, 0.3)",
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              margin: '1rem 0'
            }}>
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-2">{currentQuestion.question}</h2>
                  <p className="text-teal-50">Time remaining: {timer} seconds</p>
                </div>

                {/* Practice Content Area */}
                <div className="space-y-6">
                  {currentType === "video" && (
                    <div className="aspect-video bg-black/20 rounded-lg overflow-hidden">
                      <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* MCQ Options */}
                  {currentType === "mcq" && currentQuestion.options && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <label key={index} className="flex items-center gap-3 p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors">
                          <input
                            type="radio"
                            name="mcq"
                            value={option}
                            onChange={(e) => setMcqAnswer(e.target.value)}
                            className="w-4 h-4 text-teal-500"
                          />
                          <span className="text-white">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Coding Editor */}
                  {currentType === "coding" && (
                    <div className="bg-white/10 rounded-lg p-4">
                      <AceEditor
                        mode="javascript"
                        theme="github"
                        value={code}
                        onChange={setCode}
                        name="code-editor"
                        editorProps={{ $blockScrolling: true }}
                        style={{ width: "100%", height: "300px", borderRadius: "0.5rem" }}
                      />
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col items-center gap-4 pt-6 border-t border-teal-200/20">
                    {isRecording ? (
                      <button onClick={stopRecording} className="w-1/2 bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-colors">
                        Stop Recording
                      </button>
                    ) : (
                      <>
                        <button className="w-1/2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg font-medium">
                          Submit Answer
                        </button>
                        <button className="w-1/2 border-2 border-teal-500 text-teal-100 px-6 py-3 rounded-xl hover:bg-teal-500/20 transition-colors font-medium">
                          Next Question
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default InterviewPracticePage;