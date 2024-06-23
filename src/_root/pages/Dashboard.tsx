/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Overview } from "../../components/Overview";
import { PieChartC } from "../../components/PieChartC";
import { columns } from "../../components/table/column";
import { DataTable } from "../../components/table/data-table";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { months } from "../../constants/data";
import {
  useGetBarChartData,
  useGetPieChartData,
  useGetStatistics,
  useGetTransactions,
} from "../../lib/react-query/quries-mutations";
const Dashboard = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [searchParam, setSearchParam] = useSearchParams();
  const currentPage = Number(searchParam.get("page")) || 1;
  const search = searchParam.get("search") || "";
  const transactionMonth = searchParam.get("transactionmonth") || "3";
  const {
    data: transactionData,
    isError,
    isLoading,
    refetch: refetchTransactions,
  } = useGetTransactions({
    page: currentPage,
    search: search,
    transactionMonth: transactionMonth,
  });

  const {
    data: barChartData,
    isError: barChartIsError,
    isLoading: barChartIsLoading,
    refetch: refetchBarChartData,
  } = useGetBarChartData({ month: transactionMonth });

  const {
    data: pieChartData,
    isError: pieChartIsError,
    isLoading: pieChartIsLoading,
    refetch: refetchPieChartData,
  } = useGetPieChartData({ month: transactionMonth });

  const {
    data: statisticsData,

    refetch: refetchStatistics,
  } = useGetStatistics({ month: transactionMonth });

  const handleNextPage = () => {
    setSearchParam((oldParams) => {
      const params = new URLSearchParams(oldParams);
      //@ts-ignore
      params.set("page", currentPage + 1);
      return params;
    });
  };

  const handlePreviousPage = () => {
    setSearchParam((oldParams) => {
      const params = new URLSearchParams(oldParams);
      //@ts-ignore
      params.set("page", currentPage - 1);
      return params;
    });
  };

  const handleTransactionMonthChange = (value: string) => {
    if (value === "All") {
      setSearchParam((oldParams) => {
        const params = new URLSearchParams(oldParams);
        params.set("transactionmonth", "All");
        params.set("page", "1");
        return params;
      });
      return;
    }
    setSearchParam((oldParams) => {
      const params = new URLSearchParams(oldParams);
      params.set("transactionmonth", value);
      params.set("page", "1");
      return params;
    });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      refetchTransactions();
      refetchStatistics();
    }, 600);
    return () => clearTimeout(timer);
  }, [currentPage, search, transactionMonth]);

  useEffect(() => {
    refetchBarChartData();
  }, [transactionMonth]);

  useEffect(() => {
    refetchPieChartData();
  }, [transactionMonth]);

  useEffect(() => {
    if (transactionData) {
      //@ts-ignore
      setTotalPages(transactionData?.data?.pagination.totalPages);
    }
  }, [transactionData]);

  if (isLoading || barChartIsLoading || pieChartIsLoading) {
    return <div>Loading...</div>;
  }
  if (isError || barChartIsError || pieChartIsError) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="h-full ">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Hi, Welcome back 👋
            </h2>
            <div className="hidden items-center space-x-2 md:flex">
              <Button>Download</Button>
            </div>
          </div>

          <Card>
            <CardHeader className="px-7">
              <CardTitle>Orders</CardTitle>
              <CardDescription>Recent orders from your store.</CardDescription>
              <div className="flex flex-col md:flex-row w-full items-center gap-2   justify-between space-x-4">
                <Input
                  placeholder="Search for title , price, description"
                  value={search}
                  className="md:w-[300px] w-full mt-2 "
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setSearchParam((oldParams) => {
                        const params = new URLSearchParams(oldParams);
                        params.delete("search");
                        params.set("page", "1");
                        return params;
                      });
                      return;
                    }
                    setSearchParam((oldParams) => {
                      const params = new URLSearchParams(oldParams);
                      params.set("search", e.target.value);
                      params.set("page", "1");
                      return params;
                    });
                  }}
                />

                <Select
                  onValueChange={(value) => {
                    handleTransactionMonthChange(value);
                  }}
                  // @ts-expect-error
                  value={
                    transactionMonth === "All"
                      ? "All"
                      : months[Number(transactionMonth) - 1].id
                  }
                  name={"transactionMonth"}
                >
                  <SelectTrigger className="md:w-[180px] w-full  mt-2">
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Month</SelectLabel>
                      <SelectItem value={"All"}>All</SelectItem>
                      {months.map((month: any) => (
                        <SelectItem key={month.id} value={month?.id}>
                          {month.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <DataTable
                columns={columns}
                //@ts-ignore
                data={transactionData?.data?.transactions}
              />
              {/* Pagination */}
              <div className="flex items-center space-x-6 lg:space-x-8 mt-4">
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  {/* Go to first page */}
                  <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => {
                      setSearchParam((oldParams) => {
                        const params = new URLSearchParams(oldParams);
                        params.set("page", "1");
                        return params;
                      });
                    }}
                    disabled={currentPage === 1}
                  >
                    <span className="sr-only">Go to first page</span>
                    <DoubleArrowLeftIcon className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || totalPages === 1}
                  >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => {
                      setSearchParam((oldParams) => {
                        const params = new URLSearchParams(oldParams);
                        params.set("page", totalPages.toString());
                        return params;
                      });
                    }}
                    disabled={currentPage === totalPages || totalPages === 1}
                  >
                    <span className="sr-only">Go to last page</span>
                    <DoubleArrowRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Card className="  max-w-[300px] mt-6">
                <CardHeader className="flex ">
                  <CardTitle>Statistics</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Total Sales</span>
                      <span className="text-xl font-bold">
                        Rs.{statisticsData?.data?.totalSaleAmount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Total Sold Itmes
                      </span>
                      <span className="text-xl font-bold">
                        {statisticsData?.data?.totalSoldItems}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Total Not Sold Items
                      </span>
                      <span className="text-xl font-bold">
                        {statisticsData?.data?.totalNotSoldItems}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader className="flex w-full flex-row items-center justify-between">
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview data={barChartData?.data} />
              </CardContent>
            </Card>
            <Card className="col-span-4 md:col-span-3">
              <CardHeader className="flex w-full flex-row items-center justify-between">
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <PieChartC data={pieChartData?.data} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
