"use client";

import { JobCard } from "../components/job-card";
import { useBookmarks } from "../context/bookmark-context";
import { v4 as uuidv4 } from 'uuid';

export default function SavedJobs() {
  const { savedJobs } = useBookmarks();

  return (
    <main className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Saved Jobs</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          View and manage your bookmarked jobs
        </p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No saved jobs yet</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedJobs.map((job) => (
            <JobCard key={uuidv4()} job={job} />
          ))}
        </div>
      )}
    </main>
  );
}
