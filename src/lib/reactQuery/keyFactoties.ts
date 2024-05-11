import { QUERY_KEYS } from "../../constants/queryKeys";

export const generateUserKey = (userId: number) => {
  return [QUERY_KEYS.name, userId];
};
