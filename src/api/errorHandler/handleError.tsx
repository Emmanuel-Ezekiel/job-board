import { ErrorResponse } from "@/helpers/types";
import axios, { AxiosError } from "axios";

// Custom error handler
export const handleError = (error: unknown): ErrorResponse => {
  // Handle Axios errors
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    // Network error
    if (!axiosError.response) {
      return {
        message: "Network Error - Please check your internet connection",
        code: "NETWORK_ERROR",
      };
    }

    // Server response error
    const response = axiosError.response;
    return {
      message: `Request failed with status ${response.status}`,
      code: response.status,
    };
  }

  // Handle generic errors
  if (error instanceof Error) {
    return {
      message: error.message,
      code: "GENERIC_ERROR",
    };
  }

  // Unknown error type
  return {
    message: "An unknown error occurred",
    code: "UNKNOWN_ERROR",
  };
};
