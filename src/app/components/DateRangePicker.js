"use client"; // This line tells Next.js to treat this component as a Client Component

import { useState } from "react";

export default function DateRangePicker() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState(null);
  const [error, setError] = useState("");

  const calculateDays = async () => {
    if (!startDate || !endDate) {
      setError("Both dates must be selected");
      return;
    }

    try {
      const response = await fetch(
        `/api/calculateDays?startDate=${startDate}&endDate=${endDate}`
      );
      const result = await response.json();

      if (response.ok) {
        setDays(result.days);
        setError("");
      } else {
        setError(result.error);
        setDays(null);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setDays(null);
    }
  };

  const clearDates = () => {
    setStartDate("");
    setEndDate("");
    setDays(null);
    setError("");
  };

  return (
    <div className="p-6 min-w-[300px] sm:min-w-[400px] mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-black">
        Date Range Picker
      </h2>
      <div className="mb-4">
        <label
          htmlFor="startDate"
          className="block mb-1 font-medium text-gray-700"
        >
          Start Date
        </label>
        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="block w-full p-2 mb-2 border border-gray-300 rounded text-black"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="endDate"
          className="block mb-1 font-medium text-gray-700"
        >
          End Date
        </label>
        <input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="block w-full p-2 mb-2 border border-gray-300 rounded text-black"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={calculateDays}
          className="w-full sm:w-auto bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-2 sm:mb-0"
        >
          Calculate Days
        </button>
        <button
          onClick={clearDates}
          className="w-full sm:w-auto bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          Clear Dates
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {days !== null && (
        <p className="text-green-500 mt-4">Number of days: {days}</p>
      )}
    </div>
  );
}
