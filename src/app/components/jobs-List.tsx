"use client";

import { useEffect, useRef, useCallback } from "react";
import type { JobListing } from "@/helpers/types";
import { JobCard } from "./job-card";
import { LoadingSpinner } from "./loading-spinner";

interface JobsListProps {
  readonly jobs: JobListing[];
  readonly loading: boolean;
  readonly error: string | null;
  readonly hasMore: boolean;
  readonly onLoadMore: () => void;
}

export function JobsList({
  jobs,
  loading,
  error,
  hasMore,
  onLoadMore,
}: JobsListProps) {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastJobElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      {error && (
        <p className="text-red-500 text-center my-4" role="alert">
          {error}
        </p>
      )}

      {jobs.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <div
              key={job.job_id}
              ref={index === jobs.length - 1 ? lastJobElementRef : null}
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center my-8">
            <p className="text-xl font-semibold text-gray-600 dark:text-gray-400">
              No jobs found
            </p>
            <p className="mt-2 text-gray-500 dark:text-gray-500">
              Try adjusting your search criteria
            </p>
          </div>
        )
      )}

      {loading && (
        <div className="my-8">
          <LoadingSpinner />
        </div>
      )}

      {!loading && !hasMore && jobs.length > 0 && (
        <p className="text-center mt-8 text-gray-500 dark:text-gray-400">
          No more jobs to load
        </p>
      )}
    </>
  );
}
