import AppLayout from "@/components/Applayout";
import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import UserDataItemCard from "@/components/UserDataItemCard";
import Button from "@/components/Button";

const DataView = () => {
  const [dataEntries, setDataEntries] = React.useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://takehome-backend.onrender.com/api/data",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  };
  const { data } = useQuery(["FORM_DATA"], fetchData);

  const compareDataEntries = (dataEntry1: any, dataEntry2: any) => {
    const percentage1 = dataEntry1.percentage;
    const percentage2 = dataEntry2.percentage;

    // Calculate the percentage difference
    const difference = Math.abs(percentage1 - percentage2);

    // Display the comparison result
    console.log(
      `Percentage difference between ${dataEntry1.company} and ${dataEntry2.company}: ${difference}`
    );
  };

  const handleCompareButtonClick = () => {
    if (dataEntries.length >= 2) {
      // Compare the first two data entries in the dataEntries array
      compareDataEntries(dataEntries[0], dataEntries[1]);
    } else {
      console.log("At least two data entries are required for comparison.");
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="mt-3">
          <h2 className="text-2xl font-semibold">Form Data</h2>
          <span className="text-sm">View Form Data entries</span>
        </div>
        <div className="mt-3">
          <Button
            variant="primary"
            onClick={handleCompareButtonClick}
            className="py-2 text-base"
          >
            Compare Data
          </Button>
        </div>
      </div>
      <div>
        <div className="text-lg grid grid-cols-4 font-semibold border-b border-gray-400 mt-4">
          <span>Company</span>
          <span>Number of Users</span>
          <span>Number of Products</span>
          <span>Percentage</span>
        </div>
        {data?.map((info: any, index: number) => {
          return (
            <div key={index} className="my-4">
              <UserDataItemCard
                company={info.company}
                numUsers={info.numUsers}
                numProducts={info.numProducts}
                percentage={info.percentage}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataView;

DataView.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
