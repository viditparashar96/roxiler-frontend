import { useQuery } from "@tanstack/react-query";
import {
  getBarchartData,
  getPieChartData,
  getStatistics,
  getTransactions,
} from "../actions/transaction.actions";
import { QUERY_KEYS } from "./quiryKeys";

// ============================================================
// GET QUERIES
// ============================================================

export const useGetTransactions = ({
  page,
  search,
  transactionMonth,
}: {
  page: number;
  search: string;
  transactionMonth: string;
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TRANSACTIONS],
    queryFn: () => getTransactions({ page, search, transactionMonth }),
  });
};

export const useGetBarChartData = ({ month }: { month: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_BAR_CHART_DATA],
    queryFn: () => getBarchartData({ month }),
  });
};

export const useGetPieChartData = ({ month }: { month: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PIE_CHART_DATA],
    queryFn: () => getPieChartData({ month }),
  });
};

export const useGetStatistics = (data: { month: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STATISTICS],
    queryFn: () => getStatistics({ month: data.month }),
  });
};
