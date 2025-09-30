import Image from "next/image";

interface HeaderProps {
  className?: string;
}

const Header = ({ className = "" }: HeaderProps) => {
  return (
    <header className={`bg-white py-4 shadow-md ${className}`}>
      <div className="max-w-7xl mx-auto flex justify-center">
        <img src="/images/logo.png" width={384} height={75} alt="Logo" />
      </div>
    </header>
  );
};

export default Header;