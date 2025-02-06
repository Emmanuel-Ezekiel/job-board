"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bookmark, BriefcaseIcon, Moon, Sun } from "lucide-react";
import { useBookmarks } from "../context/bookmark-context";
import { useTheme } from "../providers";

export function Nav() {
  const pathname = usePathname();
  const { savedJobs } = useBookmarks();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="border-b">
      <div className="container mx-auto flex items-center gap-6 py-4">
        <Link href="/">
          <Button
            variant="ghost"
            className={cn(
              "flex items-center gap-2",
              pathname === "/" && "text-primary"
            )}
          >
            <BriefcaseIcon className="h-4 w-4" />
            All Jobs
          </Button>
        </Link>
        <Link href="/saved">
          <Button
            variant="ghost"
            className={cn(
              "flex items-center gap-2",
              pathname === "/saved" && "text-primary"
            )}
          >
            <Bookmark className="h-4 w-4" />
            Saved Jobs
            {savedJobs.length > 0 && (
              <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                {savedJobs.length}
              </span>
            )}
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="ml-auto"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </nav>
  );
}
