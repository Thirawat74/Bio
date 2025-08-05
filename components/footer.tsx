import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-auto bg-card border-t dark:border-none">
      <div className="w-full max-w-[85rem] py-4 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
          <p className="text-sm text-muted-foreground font-medium flex flex-wrap items-center justify-center sm:justify-start gap-x-1.5 tracking-tight">
            &copy; {new Date().getFullYear()}{" "}
            <span className="bg-gradient-to-t from-sky-500 to-indigo-500 bg-clip-text text-transparent">
              bio Thirawat
            </span>
            <span>•</span> Made with 💻 by{" "}
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Thirawat
            </span>
          </p>

          <Link
            className="text-xs text-muted-foreground hover:text-foreground focus:outline-none transition duration-300 mt-1 sm:mt-0 flex items-center justify-center sm:justify-end"
            href="https://discord.gg/RRpq4M4naf"
            target="_blank"
          >
            ติดต่อเขียนเว็บไซต์ / ติดต่องานเขียนโปรแกรมอื่น ๆ
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
