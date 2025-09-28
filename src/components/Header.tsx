import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-white w-full py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-center">
        <img src="/images/logo.png" width={384} height={75} alt="Logo" />
      </div>
    </header>
  );
};

export default Header;