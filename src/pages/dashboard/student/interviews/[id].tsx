import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import { 
  FaUser, 
  FaFileAlt, 
  FaSearch, 
  FaClipboardList, 
  FaVideo, 
  FaTrophy, 
  FaBell,
  FaComments, 
  FaCode, 
  FaMicrophone, 
  FaMicrophoneSlash, 
  FaVideoSlash, 
  FaExpand 
} from "react-icons/fa";

const InterviewRoom: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<'video' | 'code' | 'chat'>('video');
  const [code, setCode] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{sender: string; message: string}>>([]);
  const [newMessage, setNewMessage] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Mock interview data
  const interviewData = {
    company: "TechNova Solutions",
    position: "Junior Software Developer",
    interviewer: "Sarah Johnson",
    questions: [
      "Implement a function to reverse a string",
      "Explain how promises work in JavaScript",
      "Write a function to find duplicates in an array"
    ]
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize video call
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error("Error accessing media devices:", err));
    }
  }, []);

  const toggleVideo = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const toggleAudio = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, { sender: session?.user?.name || 'You', message: newMessage }]);
      setNewMessage("");
    }
  };

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

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: '#f9fafb' }}>
      <Head>
        <title>Interview Room - {interviewData.company}</title>
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
        className="block"
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
            {/* Avatar and Name Display */}
            <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
              <img 
                src="/images/avatar-placeholder.jpg" 
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h2 className="text-white text-lg font-semibold">John Doe</h2>
              <p className="text-gray-200 text-sm">Student</p>
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
          {/* Interview Room Content */}
          <div style={{
            background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(20, 184, 166, 0.3)",
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            {/* Control Bar */}
            <div className="bg-gray-800/50 p-4 flex justify-between items-center backdrop-blur-sm">
              <div>
                <h1 className="text-xl font-bold text-white">{interviewData.position}</h1>
                <p className="text-gray-200">{interviewData.company}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleVideo}
                  className={`p-3 rounded-full ${isVideoEnabled ? 'bg-blue-600' : 'bg-red-600'}`}
                >
                  {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
                </button>
                <button
                  onClick={toggleAudio}
                  className={`p-3 rounded-full ${isAudioEnabled ? 'bg-blue-600' : 'bg-red-600'}`}
                >
                  {isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
                </button>
                <button
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="p-3 rounded-full bg-gray-700"
                >
                  <FaExpand />
                </button>
              </div>
            </div>

            {/* Main Interview Area */}
            <div className="grid grid-cols-3 gap-4 p-4">
              {/* Video/Code Area - Takes up 2/3 of space */}
              <div className="col-span-2 bg-gray-800 rounded-lg overflow-hidden">
                {activeTab === 'video' && (
                  <div className="h-full flex">
                    <div className="flex-1 relative">
                      {/* Main Video (Interviewer) */}
                      <div className="absolute inset-0 bg-gray-800">
                        <img 
                          src="/images/interviewer-placeholder.jpg" 
                          alt="Interviewer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Self Video (Small) */}
                      <div className="absolute bottom-4 right-4 w-64 h-48 bg-gray-700 rounded-lg overflow-hidden">
                        <video
                          ref={videoRef}
                          autoPlay
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'code' && (
                  <div className="h-full p-4">
                    <AceEditor
                      mode="javascript"
                      theme="monokai"
                      value={code}
                      onChange={setCode}
                      name="code-editor"
                      editorProps={{ $blockScrolling: true }}
                      style={{ width: '100%', height: '100%' }}
                      fontSize={14}
                      showPrintMargin={false}
                      showGutter={true}
                      highlightActiveLine={true}
                      setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Questions & Chat - Takes up 1/3 of space */}
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                {/* Questions Section */}
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white mb-4">Interview Questions</h2>
                  <div className="space-y-4">
                    {interviewData.questions.map((question, index) => (
                      <div key={index} className="p-3 bg-gray-700 rounded-lg">
                        <span className="text-gray-400 text-sm">Question {index + 1}:</span>
                        <p className="text-white mt-1">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat Section */}
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 p-4 overflow-y-auto">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className="mb-4">
                        <span className="text-blue-400 text-sm">{msg.sender}:</span>
                        <p className="text-white bg-gray-700 rounded-lg p-2 mt-1">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-700">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-blue-600 text-white px-4 rounded-lg"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="bg-gray-800/50 p-4 flex justify-center gap-4 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab('video')}
                className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
                  activeTab === 'video' ? 'bg-blue-600' : 'bg-gray-700'
                }`}
              >
                <FaVideo />
                <span>Video</span>
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
                  activeTab === 'code' ? 'bg-blue-600' : 'bg-gray-700'
                }`}
              >
                <FaCode />
                <span>Code</span>
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
                  activeTab === 'chat' ? 'bg-blue-600' : 'bg-gray-700'
                }`}
              >
                <FaComments />
                <span>Chat</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewRoom;
