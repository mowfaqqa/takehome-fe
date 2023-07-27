import Image from "next/image";
import { Inter } from "next/font/google";
import AppLayout from "@/components/Applayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <p>Dashboard</p>
    </div>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
