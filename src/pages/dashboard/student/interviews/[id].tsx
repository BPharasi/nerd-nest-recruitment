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
  FaExpand,
  FaSpinner 
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
  const employerVideoRef = useRef<HTMLVideoElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [interviewerJoined, setInterviewerJoined] = useState(false);

  // Add state for current active video call
  const [videoCallActive, setVideoCallActive] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [employerStream, setEmployerStream] = useState<MediaStream | null>(null);

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
    // Check if the interview exists
    if (id) {
      // Mock verification - in real app, fetch from API
      const isValidInterview = true; // Replace with actual verification
      
      if (!isValidInterview) {
        router.push('/dashboard/student/applications');
        return;
      }

      // Initialize video only when verified
      if (typeof window !== 'undefined') {
        // Mock employer video stream (in real app, this would come from WebRTC)
        const mockEmployerStream = new MediaStream();
        setEmployerStream(mockEmployerStream);

        // Student video setup
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(stream => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              setVideoCallActive(true);
            }
          })
          .catch(err => {
            console.error("Error accessing media devices:", err);
            setJoinError("Failed to access camera/microphone. Please check permissions.");
          });
      }
    }

    // Cleanup function
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [id, router]);

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
        { href: "/dashboard/student/interview-practise", label: "Interviews", icon: <FaVideo /> },
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

  // Add error handling UI
  if (joinError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-400 mb-2">Failed to Join Interview</h2>
          <p className="text-red-300">{joinError}</p>
          <button 
            onClick={() => router.push('/dashboard/student/applications')}
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Return to Applications
          </button>
        </div>
      </div>
    );
  }

  // Fix video display issues
  const handleVideoError = () => {
    setJoinError("Failed to load video stream. Please refresh the page.");
  };

  // Add waiting screen component
  const WaitingScreen = () => (
    <div className="flex flex-col items-center justify-center h-full bg-gray-800 rounded-lg p-8 text-center">
      <div className="animate-spin mb-6">
        <FaSpinner className="w-12 h-12 text-teal-500" />
      </div>
      <h2 className="text-2xl font-semibold text-white mb-4">
        Waiting for interviewer to join...
      </h2>
      <p className="text-gray-400 max-w-md">
        {interviewData.interviewer} from {interviewData.company} hasn't joined yet. 
        Please stay on this page, you'll be connected automatically when they arrive.
      </p>
      <div className="mt-8 p-4 bg-gray-700/50 rounded-lg">
        <p className="text-teal-300 font-medium">Interview Details</p>
        <p className="text-gray-300 mt-2">Position: {interviewData.position}</p>
        <p className="text-gray-300">Company: {interviewData.company}</p>
      </div>
    </div>
  );

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
              <div className="col-span-2">
                {activeTab === 'video' && (
                  <div className="relative h-full">
                    {/* Main Video (Interviewer) */}
                    <div className="w-full h-full rounded-lg overflow-hidden bg-gray-800">
                      {interviewerJoined ? (
                        <video
                          ref={employerVideoRef}
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover"
                          style={{ minHeight: '500px' }}
                        />
                      ) : (
                        <WaitingScreen />
                      )}
                      <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-lg">
                        <span className="text-white text-sm">
                          {interviewerJoined ? interviewData.interviewer : "Waiting..."}
                        </span>
                      </div>
                    </div>

                    {/* Small Student Video Overlay */}
                    <div className="absolute top-4 right-4 w-48 aspect-video bg-gray-800 rounded-lg overflow-hidden shadow-lg border-2 border-gray-700">
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        onError={handleVideoError}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-0.5 rounded text-xs text-white">
                        You
                      </div>
                      
                      {/* Compact Video Controls */}
                      <div className="absolute bottom-2 right-2 flex flex-row items-center gap-2 bg-black/50 p-2 rounded">
                        <button
                          onClick={toggleAudio}
                          style={{
                            width: '44px',
                            height: '44px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            backgroundColor: isAudioEnabled ? '#2563eb' : '#dc2626',
                            transition: 'background-color 0.2s',
                            marginRight: '8px'
                          }}
                        >
                          {isAudioEnabled ? 
                            <FaMicrophone style={{ width: '18px', height: '18px', color: 'white' }} /> : 
                            <FaMicrophoneSlash style={{ width: '18px', height: '18px', color: 'white' }} />
                          }
                        </button>
                        <button
                          onClick={toggleVideo}
                          style={{
                            width: '44px',
                            height: '44px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            backgroundColor: isVideoEnabled ? '#2563eb' : '#dc2626',
                            transition: 'background-color 0.2s'
                          }}
                        >
                          {isVideoEnabled ? 
                            <FaVideo style={{ width: '18px', height: '18px', color: 'white' }} /> : 
                            <FaVideoSlash style={{ width: '18px', height: '18px', color: 'white' }} />
                          }
                        </button>
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
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-xl font-semibold text-white mb-4">Interview Questions</h2>
                  <div className="space-y-6">
                    {interviewData.questions.map((question, index) => (
                      <div key={index} className="p-4 bg-gray-700 rounded-lg">
                        <span className="text-gray-400 text-base">Question {index + 1}:</span>
                        <p className="text-white mt-2 text-lg">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat Section */}
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 p-6 overflow-y-auto">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className="mb-6">
                        <span className="text-blue-400 text-base">{msg.sender}:</span>
                        <p className="text-white bg-gray-700 rounded-lg p-4 mt-2 text-lg">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 border-t border-gray-700">
                    <div className="flex flex-col gap-4">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full bg-gray-700 text-white rounded-lg px-6 py-4 text-lg min-h-[150px] resize-none"
                        style={{ 
                          fontSize: '16px', 
                          marginBottom: '10px',
                          width: '100%', // Makes it take full width of container
                          maxWidth: '800px', // Maximum width to maintain readability
                          margin: '0 auto' // Centers the textarea
                        }}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                      />
                      <div className="flex justify-center">
                        <button
                          onClick={handleSendMessage}
                          className="w-1/2 bg-blue-600 text-white py-4 rounded-lg text-xl font-medium hover:bg-blue-700 transition-colors"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Controls */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6" style={{ 
                width: '100%', 
                borderTop: '2px solid rgba(75, 85, 99, 0.6)',
                marginTop: '2rem',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '2rem',
                    width: '100%',
                    maxWidth: '4xl',
                    margin: '0 auto'
                }}>
                    <button
                        onClick={() => {
                            setActiveTab('video');
                            if (videoRef.current && videoRef.current.srcObject) {
                                videoRef.current.play();
                            }
                            if (employerVideoRef.current && employerVideoRef.current.srcObject) {
                                employerVideoRef.current.play();
                            }
                        }}
                        style={{ 
                            flex: '1',
                            minWidth: '180px',
                            background: activeTab === 'video' 
                                ? 'linear-gradient(135deg, #3B82F6, #2563EB)'
                                : 'linear-gradient(135deg, rgba(55, 65, 81, 0.8), rgba(31, 41, 55, 0.8))',
                            boxShadow: activeTab === 'video'
                                ? '0 4px 15px rgba(59, 130, 246, 0.5)'
                                : '0 4px 15px rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            margin: '0 1rem'
                        }}
                        className={`px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 ${
                            activeTab === 'video' 
                                ? 'text-white' 
                                : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        <FaVideo className="text-xl" />
                        <span className="font-semibold tracking-wide">Video</span>
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('code');
                            if (!code) {
                                setCode(`// Write your code here\nfunction solution() {\n  \n}`);
                            }
                        }}
                        style={{ 
                            flex: '1',
                            minWidth: '180px',
                            background: activeTab === 'code' 
                                ? 'linear-gradient(135deg, #3B82F6, #2563EB)'
                                : 'linear-gradient(135deg, rgba(55, 65, 81, 0.8), rgba(31, 41, 55, 0.8))',
                            boxShadow: activeTab === 'code'
                                ? '0 4px 15px rgba(59, 130, 246, 0.5)'
                                : '0 4px 15px rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            margin: '0 1rem'
                        }}
                        className={`px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 ${
                            activeTab === 'code' 
                                ? 'text-white' 
                                : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        <FaCode className="text-xl" />
                        <span className="font-semibold tracking-wide">Code</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('chat')}
                        style={{ 
                            flex: '1',
                            minWidth: '180px',
                            background: activeTab === 'chat' 
                                ? 'linear-gradient(135deg, #3B82F6, #2563EB)'
                                : 'linear-gradient(135deg, rgba(55, 65, 81, 0.8), rgba(31, 41, 55, 0.8))',
                            boxShadow: activeTab === 'chat'
                                ? '0 4px 15px rgba(59, 130, 246, 0.5)'
                                : '0 4px 15px rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            margin: '0 1rem'
                        }}
                        className={`px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 ${
                            activeTab === 'chat' 
                                ? 'text-white' 
                                : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        <FaComments className="text-xl" />
                        <span className="font-semibold tracking-wide">Chat</span>
                    </button>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewRoom;
