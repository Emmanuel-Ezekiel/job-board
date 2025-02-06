"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Twitter, Facebook } from "lucide-react";
import { ApplicationModal } from "@/app/components/application-modal";
import type { JobListing } from "@/helpers/types";
import { LoadingSpinner } from "@/app/components/loading-spinner";

interface JobDetailsProps {
  id: string;
}

export function JobDetails({ id }: JobDetailsProps) {
  const [job, setJob] = useState<JobListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Try to get job from localStorage first
    const savedJob = localStorage.getItem("selectedJob");

    if (savedJob) {
      setJob(JSON.parse(savedJob));
      setLoading(false);
    } else {
      // Fallback to localStorage jobs list if direct navigation
      const allJobs = JSON.parse(localStorage.getItem("jobs") ?? "[]");
      const foundJob = allJobs.find((j: JobListing) => j.job_id === id);

      if (foundJob) {
        setJob(foundJob);
      } else {
        // Handle case where job isn't found
        console.error("Job not found in local storage");
      }
      setLoading(false);
    }
  }, [id]);

  if (loading)
    return (
      <div className="container mx-auto py-8">
        <LoadingSpinner />
      </div>
    );
  if (!job) return <div className="container mx-auto py-8">Job not found</div>;

  return (
    <main className="container mx-auto py-4 px-4 sm:py-8 sm:px-6 lg:px-8 max-w-4xl">
      <div className="space-y-6 sm:space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              {job.job_title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mt-2">
              {job.employer_name}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-start sm:justify-end">
            <Button variant="outline" size="icon" className="w-10 h-10">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="w-10 h-10">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="w-10 h-10">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto"
            >
              Apply now
            </Button>
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-6">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
              Role Expectations
            </h2>
            <div className="prose max-w-none text-sm sm:text-base">
              {job.job_description}
            </div>
          </section>

          {job.job_highlights?.Qualifications && (
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                Applicant Requirements
              </h2>
              <ul className="list-disc pl-5 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
                {job.job_highlights.Qualifications.map(
                  (qual: string, i: number) => (
                    <li key={i}>{qual}</li>
                  )
                )}
              </ul>
            </section>
          )}

          {job.job_highlights?.Responsibilities && (
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                Additional Requirements
              </h2>
              <ul className="list-disc pl-5 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
                {job.job_highlights.Responsibilities.map(
                  (resp: string, i: number) => (
                    <li key={i}>{resp}</li>
                  )
                )}
              </ul>
            </section>
          )}

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
              What to expect in the hiring process
            </h2>
            <ul className="list-disc pl-5 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>A take-home assessment</li>
              <li>A preliminary phone call with the recruiter</li>
              <li>A technical interview with a Lead in our Engineering team</li>
              <li>
                A behavioral and technical interview with a member of the
                Executive team
              </li>
            </ul>
          </section>
        </div>

        {/* Apply Button */}
        <div className="flex justify-center pt-4 sm:pt-6">
          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto"
          >
            Apply now
          </Button>
        </div>
      </div>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobId={job.job_id}
        jobTitle={job.job_title}
      />
    </main>
  );
}
