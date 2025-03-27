import React, { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Committee() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [committees, setCommittees] = useState([]);

  const [newCommittee, setNewCommittee] = useState("");

  // Load committees from local storage when component mounts
  useEffect(() => {
    // Default committees (ensuring predefined ones are always available)
    const defaultCommittees = [
      { title: "Cultural Committee", path: "/admin-dashboard/committees/cultural" },
      { title: "Sports Committee", path: "/admin-dashboard/committees/sports" },
      { title: "Student Committee", path: "/admin-dashboard/committees/student" },
      { title: "Tech Dreamers", path: "/admin-dashboard/committees/tech-dreamers" },
      { title: "Anti-Ragging", path: "/admin-dashboard/committees/anti-ragging" },
    ];
  
    // Get saved committees from localStorage
    const savedCommittees = JSON.parse(localStorage.getItem("committees")) || [];
  
    // Merge predefined committees with saved ones (avoid duplicates)
    const mergedCommittees = [...defaultCommittees, ...savedCommittees.filter(
      (c) => !defaultCommittees.some((dc) => dc.path === c.path)
    )];
  
    setCommittees(mergedCommittees);
    localStorage.setItem("committees", JSON.stringify(mergedCommittees));
  }, []);
  

  // Save committees to local storage
  const saveCommittees = (updatedCommittees) => {
    setCommittees(updatedCommittees);
    localStorage.setItem("committees", JSON.stringify(updatedCommittees));
  };

  const handleCreateCommittee = () => {
    if (newCommittee.trim() === "") return;
    const formattedPath = `/admin-dashboard/committees/${newCommittee.toLowerCase().replace(/\s+/g, "-")}`;
    const updatedCommittees = [...committees, { title: newCommittee, path: formattedPath }];
    saveCommittees(updatedCommittees);
    setNewCommittee("");
  };

  const handleDeleteCommittee = (index) => {
    const updatedCommittees = committees.filter((_, i) => i !== index);
    saveCommittees(updatedCommittees);
  };

  return (
    <div className="font-sans min-h-screen bg-gray-100 p-4">
      <nav className="flex items-center justify-between bg-pink-500 text-white p-4 rounded-lg">
        <div className="text-lg font-bold">Committee Members</div>
        <button
          className="text-white text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoClose /> : <IoMenu />}
        </button>
      </nav>

      {/* Create Committee Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
        <input
          type="text"
          value={newCommittee}
          onChange={(e) => setNewCommittee(e.target.value)}
          placeholder="Enter committee name"
          className="border px-4 py-2 rounded-md w-64"
        />
        <button
          onClick={handleCreateCommittee}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create New Committee
        </button>
      </div>

      {/* Committee Sections */}
      <div className="flex justify-center gap-6 mt-6 flex-wrap">
        {committees.map((committee, index) => (
          <Section
            key={index}
            title={committee.title}
            path={committee.path}
            onDelete={() => handleDeleteCommittee(index)}
          />
        ))}
      </div>
    </div>
  );
}

function Section({ title, path, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 w-72 text-left shadow-md">
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
              <div className="flex flex-col space-y-2">
              <button
  onClick={() => {
    console.log("Navigating to:", path);
    navigate(path);
  }}
  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
>
  View
</button>
                <button
                  onClick={onDelete}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </td>
            <td className="border px-4 py-2">
              Learn more about {title.toLowerCase()}.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Committee;
