import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  //to uniquly identify the query in the cache we need a query key
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, isLoading, error };
}
