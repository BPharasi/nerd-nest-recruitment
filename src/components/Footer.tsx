import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Image
              src="/logo.png"
              alt="UFS Recruitment System Logo"
              width={100}
              height={30}
            />
          </div>
          <div className="flex space-x-4">
            <Link href="/jobs" legacyBehavior>
              <a className="text-gray-600 hover:text-blue-800 text-sm">
                Jobs
              </a>
            </Link>
            <Link href="/auth/signup" legacyBehavior>
              <a className="text-gray-600 hover:text-blue-800 text-sm">
                Sign Up
              </a>
            </Link>
            <Link href="/auth/forgot-password" legacyBehavior>
              <a className="text-gray-600 hover:text-blue-800 text-sm">
                Forgot Password
              </a>
            </Link>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} University of the Free State Recruitment System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;