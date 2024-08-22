import Head from "next/head";
import DateRangePicker from "./components/DateRangePicker";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Head>
        <title>Date Range Picker</title>
      </Head>
      <DateRangePicker />
    </div>
  );
}
