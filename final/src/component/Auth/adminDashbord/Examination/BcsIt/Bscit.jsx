import React from "react";
import { useNavigate } from "react-router-dom";

function Bscit() {
  const navigate = useNavigate(); // ✅ Added useNavigate hook for navigation

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mt-6">Welcome to BScIT Examination</h1>

      {/* Sections with Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Section title="Exam Timetable" path="exam-timetable" navigate={navigate} />
        <Section title="Result" path="percentage" navigate={navigate} />
        <Section title="Previous Year Question Paper" path="previousyear" navigate={navigate} />
        <Section title="Question Bank" path="questionbank" navigate={navigate} />
        <Section title="CouseOverview" path="bsccourse" navigate={navigate} />
      </div>
    </div>
  );
}

function Section({ title, path, navigate }) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 w-full text-left shadow-md">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <table className="w-full border-collapse mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Action</th>
            <th className="border px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">
              <button
                className="text-white px-3 py-1 rounded bg-pink-400 hover:bg-pink-500"
                onClick={() => navigate(`/admin-dashboard/examination/bscit/${path}`)}
              >
                Add
              </button>
            </td>
            <td className="border px-4 py-2">
              Add a new record to {title.toLowerCase()}.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Bscit;
