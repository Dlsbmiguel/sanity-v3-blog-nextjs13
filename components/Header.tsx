import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-10 py-5 space-x-2 font-bold">
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Image
            src="/user-logo.png"
            width={50}
            height={50}
            className="rounded-full"
            alt="logo"
          />
        </Link>
        <h1>My Blog</h1>
      </div>

      <div className="">
        <Link
          href="#"
          className="px-5 py-3 text-sm md:text-base bg-gray-900 text-[#F7AB0A] flex items-center rounded-full text-center"
        >
          Sign up to the best blog online
        </Link>
      </div>
    </header>
  );
};

export default Header;
