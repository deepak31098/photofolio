import logo from "../assets/images/logo.jpg";

export default function Navbar() {
  const handleCLick = () => {
    window.location.reload();
  };
  return (
    <nav className="lg:px-32 md:px-24 md:px-8 px-2 py-4 bg-[#FFFFFF] flex items-center">
      <img
        onClick={handleCLick}
        className="rounded-full w-10 h-10 cursor-pointer"
        src={logo}
      />
      <span className="text-2xl font-black tracking-wider text-black">
        PhotoFolio
      </span>
    </nav>
  );
}
