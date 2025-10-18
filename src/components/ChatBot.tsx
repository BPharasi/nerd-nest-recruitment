import { useState } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your UFS Recruitment assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isEscalating, setIsEscalating] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Mock bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Troubleshooting responses
    if (input.includes('login') || input.includes('sign in')) {
      return "Having trouble logging in? Try resetting your password or clearing your browser cache. If that doesn't work, I can help escalate this to our admin team.";
    }
    
    if (input.includes('application') || input.includes('submit')) {
      return "Issues with submitting applications? Make sure all required fields are filled and your CV is uploaded. Check your internet connection and try again.";
    }
    
    if (input.includes('interview') || input.includes('video')) {
      return "Video interview problems? Ensure your camera and microphone permissions are enabled. Try refreshing the page or using a different browser.";
    }
    
    if (input.includes('cv') || input.includes('resume') || input.includes('upload')) {
      return "CV upload issues? Supported formats are PDF, DOC, DOCX. File size should be under 5MB. If you're still having trouble, let me know!";
    }
    
    if (input.includes('notification') || input.includes('email')) {
      return "Not receiving notifications? Check your spam folder and ensure your email is verified. You can update notification preferences in your profile.";
    }
    
    if (input.includes('profile') || input.includes('update')) {
      return "Profile update problems? Make sure you're logged in and try refreshing the page. If changes aren't saving, clear your browser cache.";
    }
    
    // Escalation and ticket creation
    if (input.includes('escalate') || input.includes('ticket') || input.includes('admin') || input.includes('help') || input.includes('problem')) {
      setIsEscalating(true);
      return "I understand you're having an issue. Would you like me to create a support ticket for you? Please provide a brief subject and description of the problem.";
    }
    
    if (input.includes('job') || input.includes('apply')) {
      return "To apply for jobs, go to the Jobs section and click 'Apply Now' on any position that interests you. Make sure your profile is complete!";
    }
    
    if (input.includes('schedule')) {
      return "Interview scheduling is handled through your dashboard. Check your notifications for upcoming interviews and join via the provided link.";
    }
    
    if (input.includes('skills') || input.includes('challenge')) {
      return "Skills Challenges are available in your dashboard. Complete them to earn badges and improve your profile visibility to employers.";
    }
    
    if (input.includes('employer') || input.includes('post')) {
      return "Employers can post jobs through the Job Posting section. Your postings will be reviewed by admins before going live.";
    }
    
    return "I'm not sure about that. Try asking about login issues, applications, interviews, CV uploads, or type 'escalate' to create a support ticket!";
  };

  const handleEscalate = () => {
    if (!ticketSubject.trim() || !ticketDescription.trim()) {
      alert('Please provide both subject and description.');
      return;
    }

    // Mock ticket creation
    const ticketId = `TCK-${Date.now()}`;
    const ticket = {
      id: ticketId,
      user: 'current_user@example.com', // In real app, get from session
      role: 'Student', // In real app, get from session
      subject: ticketSubject,
      description: ticketDescription,
      status: 'open',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      escalated: false,
      resolution: '',
    };

    // Store in localStorage for demo (in real app, send to API)
    const existingTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
    existingTickets.push(ticket);
    localStorage.setItem('userTickets', JSON.stringify(existingTickets));

    // Create notification for the user
    const notifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
    notifications.push({
      id: Date.now(),
      type: 'ticket_created',
      title: 'Support Ticket Created',
      message: `Your ticket ${ticketId} has been created. Our team will review it shortly.`,
      date: new Date().toISOString(),
      read: false
    });
    localStorage.setItem('userNotifications', JSON.stringify(notifications));

    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: `Ticket created successfully! Ticket ID: ${ticketId}. Our admin team will review it shortly.`,
      sender: 'bot',
      timestamp: new Date()
    }]);

    setIsEscalating(false);
    setTicketSubject('');
    setTicketDescription('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        }}
      >
        <FaComments style={{ color: 'white', fontSize: '24px' }} />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '350px',
            height: '500px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
              color: 'white',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
              UFS Recruitment Assistant
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              background: '#f8fafc'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  marginBottom: '12px',
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: message.sender === 'user' ? '#14b8a6' : '#e2e8f0',
                    color: message.sender === 'user' ? 'white' : '#374151',
                    fontSize: '14px'
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {/* Escalation Form */}
            {isEscalating && (
              <div style={{ marginTop: '16px', padding: '12px', background: '#fff3cd', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>Create Support Ticket</h4>
                <input
                  type="text"
                  placeholder="Subject"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
                <textarea
                  placeholder="Description"
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    minHeight: '60px',
                    resize: 'vertical'
                  }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={handleEscalate}
                    style={{
                      padding: '6px 12px',
                      background: '#14b8a6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Create Ticket
                  </button>
                  <button
                    onClick={() => setIsEscalating(false)}
                    style={{
                      padding: '6px 12px',
                      background: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div
            style={{
              padding: '16px',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              gap: '8px'
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                outline: 'none',
                fontSize: '14px'
              }}
              disabled={isEscalating}
            />
            <button
              onClick={handleSendMessage}
              style={{
                padding: '8px 12px',
                background: '#14b8a6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
              disabled={isEscalating}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
