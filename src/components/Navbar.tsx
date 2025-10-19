import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import AceEditor from "react-ace";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("code");
  const [code, setCode] = useState("// Your code here");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Role-specific dashboard links
  const dashboardLink = session?.user?.role === "Student"
    ? "/dashboard/student"
    : session?.user?.role === "Employer"
      ? "/dashboard/employer"
      : session?.user?.role === "Admin"
        ? "/dashboard/admin"
        : "/dashboard";

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/jobs" legacyBehavior>
              <a className="block text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-base font-medium">
                Jobs
              </a>
            </Link>
            {status === "authenticated" ? (
              <>
                <Link href={dashboardLink} legacyBehavior>
                  <a className="block text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-base font-medium">
                    Dashboard
                  </a>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block w-full text-left text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-base font-medium"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/" legacyBehavior>
                  <a className="block text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-base font-medium">
                    Log In
                  </a>
                </Link>
                <Link href="/auth/signup" legacyBehavior>
                  <a className="block text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-base font-medium">
                    Sign Up
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      {activeTab === 'code' && (
        <div className="h-full p-4">
          <AceEditor
            mode="text"
            theme="monokai"
            value={code}
            readOnly={true}
            name="live-code-view"
            editorProps={{ $blockScrolling: true }}
            style={{ width: '100%', height: '100%' }}
            fontSize={14}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={false}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;