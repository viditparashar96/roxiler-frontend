import { env_config } from "../../config/env_config";
import axios_instance from "../axios";

export const getTransactions = async (data: {
  page: number;
  search: string;
  transactionMonth: string;
}) => {
  try {
    const response = await axios_instance.get(
      `${env_config.api_url}/transaction/transactions`,
      {
        params: {
          page: data.page,
          search: data.search,
          transactionMonth: data.transactionMonth,
        },
      }
    );
    return response;
  } catch (error: any) {
    // console.log(error);
  }
};

export const getBarchartData = async (data: { month: string }) => {
  try {
    const response = await axios_instance.get(
      `${env_config.api_url}/transaction/bar-chart-data`,
      {
        params: {
          month: data.month,
        },
      }
    );
    return response;
  } catch (error: any) {
    // console.log(error);
  }
};

export const getPieChartData = async (data: { month: string }) => {
  try {
    const response = await axios_instance.get(
      `${env_config.api_url}/transaction/pie-chart`,
      {
        params: {
          month: data.month,
        },
      }
    );
    return response;
  } catch (error: any) {
    // console.log(error);
  }
};

export const getStatistics = async (data: { month: string }) => {
  try {
    console.log("data in statiscis===>", data);
    const response = await axios_instance.get(
      `${env_config.api_url}/transaction/statistics`,
      {
        params: {
          month: data.month,
        },
      }
    );
    return response;
  } catch (error: any) {
    // console.log(error);
  }
};
