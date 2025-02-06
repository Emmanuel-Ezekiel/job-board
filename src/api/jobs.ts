import { Api } from "@/config/axios.config";
import { ApiResponse, JobSearchParams } from "@/helpers/types";
import { AxiosResponse } from "axios";
import { handleError } from "./errorHandler/handleError";

export const getAllJobsApi = async (
  params: JobSearchParams
): Promise<ApiResponse<AxiosResponse>> => {
  try {
    const options = {
      method: "GET",
      url: "/search",
      params: {
        query: params.query ?? "developer jobs",
        page: params.page ?? "1",
        num_pages: params.num_pages ?? "1",
        country: params.country ?? "us",
        date_posted: params.date_posted ?? "all",
      },
    };

    const response = await Api.request(options);
    return { data: response.data };
  } catch (error) {
    const handledError = handleError(error);
    console.error("API Error:", handledError);
    return { error: handledError };
  }
};

export const getJobDetailsApi = async (
  params: JobSearchParams
): Promise<ApiResponse<AxiosResponse>> => {
  try {
    const options = {
      method: "GET",
      url: "/job-details",
      params: {
        job_id: params.job_id ?? "hpyA_5f2KAErFsx0AAAAAA==",
      },
    };
    const response = await Api.request(options);
    return { data: response.data };
  } catch (error) {
    const handledError = handleError(error);
    console.error("API Error:", handledError);
    return { error: handledError };
  }
};
