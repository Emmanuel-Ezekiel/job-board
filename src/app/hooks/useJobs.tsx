"use client";

import { useState, useEffect, useCallback } from "react";
import { getAllJobsApi } from "@/api/jobs";
import { Filters, JobListing } from "@/helpers/types";
import { PAGE_SIZE } from "@/helpers/constants";

export function useJobs(initialFilters: Filters, pageSize: number = PAGE_SIZE) {
  const [state, setState] = useState({
    jobs: [] as JobListing[],
    loading: true,
    error: null as string | null,
    page: 1,
    hasMore: true,
    filters: initialFilters,
  });

  const fetchJobs = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const result = await getAllJobsApi({
        ...state.filters,
        page: state.page.toString(),
        num_pages: "1",
      });

      if ("error" in result) {
        setState((prev) => ({ ...prev, error: result.error.message }));
      } else {
        const newJobs = result.data.data;
        setState((prev) => ({
          ...prev,
          jobs: state.page === 1 ? newJobs : [...prev.jobs, ...newJobs],
          hasMore: newJobs.length === pageSize,
          error: null,
        }));
        // Store all jobs in localStorage
        localStorage.setItem("jobs", JSON.stringify(newJobs));
      }
    } catch (err) {
      console.log(err);
      setState((prev) => ({ ...prev, error: "Failed to fetch jobs" }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, [state.filters, state.page, pageSize]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = useCallback((newFilters: Filters) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, ...newFilters },
      page: 1,
      jobs: [],
      hasMore: true,
    }));
  }, []);

  const loadMore = useCallback(() => {
    setState((prev) => ({ ...prev, page: prev.page + 1 }));
  }, []);

  return {
    jobs: state.jobs,
    loading: state.loading,
    error: state.error,
    hasMore: state.hasMore,
    handleSearch,
    loadMore,
  };
}
