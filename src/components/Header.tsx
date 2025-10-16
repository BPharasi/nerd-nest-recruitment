import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

interface HeaderProps {
  className?: string;
}

const Header = ({ className = "" }: HeaderProps) => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if logout button should be shown
  const hideLogout =
    router.pathname === "/" ||
    router.pathname === "/auth/signin" ||
    router.pathname === "/auth/signup";

  if (!mounted) {
    return null; // or a skeleton loader
  }

  return (
    <header
      className={`bg-white py-4 shadow-md ${className}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75px",
        position: "relative",
      }}
    >
      <Link
        href="/"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Image
          src="/images/Logo.png"
          alt="Nerd.Next Logo"
          width={300}
          height={75}
          style={{ width: "auto", height: "50px" }}
          priority
        />
      </Link>
      {/* Logout buttons on the right, only if not on landing/signin/signup */}
      {!hideLogout && session && (
        <div
          style={{
            position: "absolute",
            right: "2rem",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            gap: "1rem",
          }}
        >
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            style={{
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.4), rgba(6, 182, 212, 0.4))",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(20, 184, 166, 0.3)",
              color: "grey-800",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              fontWeight: 600,
              boxShadow: "0 2px 8px rgba(59,130,246,0.12)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Log Out
          </button>
          
        </div>
      )}
    </header>
  );
};

export default Header;