import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientConfig,
} from "@tanstack/react-query";
import { message } from "antd";
// import { getLanguage } from "../getLanguage";

const createTitle = (errorMsg: string, actionType: "query" | "mutation") => {
  // we can access selected Language like this
  // const selectedLanguage = getLanguage()
  console.log(actionType);
  const action = actionType === "query" ? "fetch" : "update";
  return `could not ${action} data: ${
    errorMsg ?? "error connecting to server"
  }`;
};

const errorHandler = (title: string) => {
  console.log(title);
  message.error(title);
};

export const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 600000, // 10 minutes
      gcTime: 900000, // 15 minutes
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      const title = createTitle(error.message, "query");
      errorHandler(title);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const title = createTitle(error.message, "mutation");
      errorHandler(title);
    },
  }),
};

export const queryClient = new QueryClient(queryClientOptions);
