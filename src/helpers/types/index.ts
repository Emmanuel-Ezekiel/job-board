// Define TypeScript interfaces
export interface JobSearchParams {
  query?: string;
  page?: string;
  num_pages?: string;
  country?: string;
  date_posted?: string;
  job_id?: string;
  extended_publisher_details?: boolean;
}

export interface ErrorResponse {
  message: string;
  code?: string | number;
}

export type ApiResponse<T> = { data: T } | { error: ErrorResponse };

export interface JobListing {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo: string | null;
  employer_website: string | null;
  job_employment_type: string;
  job_city: string;
  job_max_salary: null | number;
  job_min_salary: null | number;
  job_state: string;
  job_country: string;
  job_salary: string | null;
  job_description: string;
  job_apply_link: string;
  job_highlights: {
    Qualifications?: string[];
    Responsibilities?: string[];
  };
}

export interface Filters {
  query: string;
  country: string;
  // date_posted: string;
}
