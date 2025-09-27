import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <div className="flex items-center">
            <Link href="/" legacyBehavior>
              <a>
                <Image
                  src="/logo.png"
                  alt="UFS Recruitment System Logo"
                  width={120}
                  height={40}
                  priority
                />
              </a>
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link href="/jobs" legacyBehavior>
              <a className="text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">
                Jobs
              </a>
            </Link>
            {status === "authenticated" ? (
              <>
                <Link href={dashboardLink} legacyBehavior>
                  <a className="text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </a>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition duration-200"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/" legacyBehavior>
                  <a className="text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">
                    Log In
                  </a>
                </Link>
                <Link href="/auth/signup" legacyBehavior>
                  <a className="text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">
                    Sign Up
                  </a>
                </Link>
              </>
            )}
          </div>
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-blue-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
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
    </nav>
  );
};

export default Navbar;