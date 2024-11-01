import React from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="border-b text-purple-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              TagGen
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button className="hover:text-[#9C27B0] hover:bg-[#1a1a1a]">Get Started</Button>
            </Link>
            <Link to="/upload">
              <Button className="hover:text-[#9C27B0] hover:bg-[#1a1a1a]">
                Upload Docs
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
