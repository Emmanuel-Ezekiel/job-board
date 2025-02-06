"use client";

import { JobListing } from "@/helpers/types";
import { createContext, useContext, useEffect, useState } from "react";

interface BookmarkContextType {
  bookmarkedJobs: Set<string>;
  toggleBookmark: (jobId: string, job: JobListing) => void;
  isBookmarked: (jobId: string) => boolean;
  savedJobs: JobListing[];
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());
  const [savedJobs, setSavedJobs] = useState<JobListing[]>([]);

  useEffect(() => {
    // Load bookmarked jobs from localStorage
    const savedBookmarks = localStorage.getItem("bookmarkedJobs");
    const savedJobsData = localStorage.getItem("savedJobsData");

    if (savedBookmarks) {
      setBookmarkedJobs(new Set(JSON.parse(savedBookmarks)));
    }
    if (savedJobsData) {
      setSavedJobs(JSON.parse(savedJobsData));
    }
  }, []);

  const toggleBookmark = (jobId: string, job: JobListing) => {
    setBookmarkedJobs((prev) => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(jobId)) {
        newBookmarks.delete(jobId);
        setSavedJobs((currentSavedJobs) =>
          currentSavedJobs.filter((j) => j.job_id !== jobId)
        );
      } else {
        newBookmarks.add(jobId);
        setSavedJobs((currentSavedJobs) => [...currentSavedJobs, job]);
      }

      // Save to localStorage
      localStorage.setItem("bookmarkedJobs", JSON.stringify([...newBookmarks]));
      return newBookmarks;
    });
  };

  useEffect(() => {
    localStorage.setItem("savedJobsData", JSON.stringify(savedJobs));
  }, [savedJobs]);

  const isBookmarked = (jobId: string) => bookmarkedJobs.has(jobId);

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedJobs, toggleBookmark, isBookmarked, savedJobs }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};
