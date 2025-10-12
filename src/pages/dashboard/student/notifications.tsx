import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaFileAlt,
  FaSearch,
  FaClipboardList,
  FaVideo,
  FaTrophy,
  FaBell,
  FaCheck,
  FaTrash,
  FaClock,
  FaExclamationTriangle,
  FaInfo
} from "react-icons/fa";

interface Notification {
  id: number;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const NotificationsPage: NextPage = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    // Mock notifications data
    const mockNotifications: Notification[] = [
      {
        id: 1,
        type: 'success',
        title: 'Application Submitted',
        message: 'Your application for Junior Software Developer at TechNova Solutions has been submitted successfully.',
        date: '2024-01-15T10:30:00Z',
        read: false
      },
      {
        id: 2,
        type: 'info',
        title: 'Interview Scheduled',
        message: 'Your interview for the Data Analyst position has been scheduled for January 20th at 2:00 PM.',
        date: '2024-01-14T14:15:00Z',
        read: false
      },
      {
        id: 3,
        type: 'warning',
        title: 'Application Deadline Reminder',
        message: 'The application deadline for Cloud Engineer position is in 2 days.',
        date: '2024-01-13T09:00:00Z',
        read: true
      },
      {
        id: 4,
        type: 'info',
        title: 'Profile Update',
        message: 'Your CV has been successfully updated in the system.',
        date: '2024-01-12T16:45:00Z',
        read: true
      }
    ];
    
    setNotifications(mockNotifications);
  }, []);

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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <FaCheck className="text-green-500" />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'error':
        return <FaExclamationTriangle className="text-red-500" />;
      default:
        return <FaInfo className="text-blue-500" />;
    }
  };

  const getNotificationBorderColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500';
      case 'warning':
        return 'border-l-yellow-500';
      case 'error':
        return 'border-l-red-500';
      default:
        return 'border-l-blue-500';
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'read') return notif.read;
    if (filter === 'unread') return !notif.read;
    return true;
  });

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: '#f9fafb' }}>
      <Head>
        <title>Notifications - UFS Recruitment</title>
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
        className={`${isSidebarOpen ? 'block' : 'hidden md:block'}`}
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <button
              onClick={markAllAsRead}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Mark all as read
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-4 mb-6">
            {(['all', 'unread', 'read'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === filterType
                    ? 'bg-[#003B73] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                {filterType === 'unread' && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <FaBell className="mx-auto text-gray-400 text-4xl mb-4" />
                <p className="text-gray-500 text-lg">No notifications found</p>
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`bg-white rounded-lg shadow-md border-l-4 ${getNotificationBorderColor(notif.type)} ${
                    !notif.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="mt-1">
                          {getNotificationIcon(notif.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{notif.title}</h3>
                            {!notif.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-gray-700 mb-3">{notif.message}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <FaClock className="mr-1" />
                            {new Date(notif.date).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notif.read && (
                          <button
                            onClick={() => markAsRead(notif.id)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Mark as read"
                          >
                            <FaCheck />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notif.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete notification"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
