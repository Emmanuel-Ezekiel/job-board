"use client";

import { SearchFilters } from "./components/search-filters";
import { useJobs } from "./hooks/useJobs";
import { DEFAULT_FILTERS } from "@/helpers/constants";
import { JobsList } from "./components/jobs-List";

export default function Home() {
  const { jobs, loading, error, hasMore, handleSearch, loadMore } =
    useJobs(DEFAULT_FILTERS);

  return (
    <main className="container mx-auto py-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Join the dream team
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Join the team that&apos;s building experiences for millions of people.
        </p>
      </div>

      <SearchFilters onSearch={handleSearch} />

      <JobsList
        jobs={jobs}
        loading={loading}
        error={error}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </main>
  );
}
