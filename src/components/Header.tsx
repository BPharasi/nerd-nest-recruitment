import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  className?: string;
}

const Header = ({ className = "" }: HeaderProps) => {
  return (
    <header
      className={`bg-white py-4 shadow-md ${className}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75px",
      }}
    >
      <Link
        href="/"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Image
          src="/images/logo.png"
          alt="Nerd.Next Logo"
          width={300}
          height={75}
          style={{ width: "auto", height: "50px" }}
          priority
        />
      </Link>
    </header>
  );
};

export default Header;