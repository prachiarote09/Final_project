import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTheaterMasks,
  FaFootballBall,
  FaUserFriends,
  FaCode,
  FaShieldAlt,
  FaEye,
} from "react-icons/fa";

function StudentCommite() {
  const [committees, setCommittees] = useState([]);

  // Load committees when component mounts
  useEffect(() => {
    console.log("Loading default and saved committees...");

    // Default Committees
    const defaultCommittees = [
      { title: "Cultural Committee", path: "/user-dashboard/committeess/cultural" },
      { title: "Sports Committee", path: "/user-dashboard/committeess/sports" },
      { title: "Student Committee", path: "/user-dashboard/committeess/student" },
      { title: "Tech Dreamers", path: "/user-dashboard/committeess/tech-dreamers" },
      { title: "Anti-Ragging", path: "/user-dashboard/committeess/anti-ragging" },
    ];

    // Fetch Saved Committees from localStorage
    const savedCommittees = JSON.parse(localStorage.getItem("committees")) || [];
    console.log("Fetched Committees from localStorage:", savedCommittees);

    // Merge Default and Saved Committees
    const updatedCommittees = [
      ...defaultCommittees,
      ...savedCommittees
        .filter((c) => {
          // Validate the committee data
          const validName = c.name && typeof c.name === "string";
          return validName;
        })
        .map((c) => {
          const committeeName = c.name || "Unnamed";
          console.log("Processing Committee Name:", committeeName);
          return {
            title: committeeName,
            path: `/user-dashboard/committeess/${committeeName
              .replace(/\s+/g, "-")
              .toLowerCase()}`,
          };
        }),
    ];

    console.log("Final list of committees:", updatedCommittees);
    setCommittees(updatedCommittees);
  }, []);

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      {/* Header */}
      <nav className="flex items-center justify-between bg-gradient-to-r from-blue-700 to-blue-500 text-white p-5 shadow-lg">
        <div className="text-3xl font-bold tracking-wide flex items-center gap-2">
          <FaUserFriends className="text-white" />
          Committee Members
        </div>
      </nav>

      {/* Committee Sections */}
      <div className="flex justify-center gap-8 mt-8 flex-wrap">
        {committees.map((committee, index) => (
          <Section key={index} title={committee.title} path={committee.path} />
        ))}
      </div>
    </div>
  );
}

// Get Icon Based on Committee
const getIcon = (title) => {
  switch (title) {
    case "Cultural Committee":
      return <FaTheaterMasks className="text-blue-200 text-3xl mb-3" />;
    case "Sports Committee":
      return <FaFootballBall className="text-green-200 text-3xl mb-3" />;
    case "Student Committee":
      return <FaUserFriends className="text-yellow-200 text-3xl mb-3" />;
    case "Tech Dreamers":
      return <FaCode className="text-purple-200 text-3xl mb-3" />;
    case "Anti-Ragging":
      return <FaShieldAlt className="text-red-200 text-3xl mb-3" />;
    default:
      return <FaEye className="text-gray-400 text-3xl mb-3" />;
  }
};

function Section({ title, path }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 border border-blue-600 rounded-xl p-6 w-80 text-left shadow-md transform hover:scale-105 transition-transform hover:shadow-2xl hover:border-blue-400 hover:bg-blue-600 relative group">
      {/* Icon and Title */}
      <div className="flex items-center justify-between mb-3">
        {getIcon(title)}
        <h3 className="text-xl font-semibold text-white group-hover:text-blue-200 transition-all">
          {title}
        </h3>
      </div>

      <p className="text-sm text-blue-200 mb-4 leading-relaxed">
        Explore the {title} and get involved with various activities and initiatives.
      </p>

      <button
        onClick={() => {
          console.log(`Navigating to: ${path}`);
          navigate(path);
        }}
        className="bg-white text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 hover:shadow-lg transition-all"
      >
        <FaEye />
        View
      </button>
    </div>
  );
}

export default StudentCommite;
