import React, { useState, useEffect } from "react";
import { FaUmbrellaBeach } from "react-icons/fa";

const StudentNotice = () => {
  const [holidays, setHolidays] = useState([
    {
      name: "Independence Day",
      description: "Celebration of national independence.",
      date: "2025-08-15",
    },
    {
      name: "Christmas",
      description: "Annual festival celebrating the birth of Jesus Christ.",
      date: "2025-12-25",
    },
  ]);

  // Load holidays from localStorage when component mounts
  useEffect(() => {
    const storedHolidays = localStorage.getItem("holidays");
    if (storedHolidays) {
      const parsedHolidays = JSON.parse(storedHolidays);
      if (parsedHolidays.length > 0) {
        setHolidays(parsedHolidays);
      }
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Title Section */}
      <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
        <FaUmbrellaBeach className="text-yellow-500 text-3xl" /> Upcoming Notices
      </h1>

      {/* Table Section */}
      {holidays.length === 0 ? (
        <p className="text-gray-600 text-center">No holidays available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">Holiday Name</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((holiday, index) => (
                <tr key={index} className="border-b border-gray-300 hover:bg-gray-100 transition">
                  <td className="p-3 font-medium">{holiday.name}</td>
                  <td className="p-3">{holiday.description}</td>
                  <td className="p-3 text-blue-600 font-medium">{holiday.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentNotice;