import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cultural = () => {
  const [culturals, setCultural] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    year: "",
    grNumber: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCultural = async () => {
      try {
        const response = await fetch("http://localhost:8080/cultural/");
        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();
        setCultural(data);
      } catch (error) {
        console.error("Error fetching cultural committee:", error);
      }
    };
    fetchCultural();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/cultural/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save data");

      const newCultural = await response.json();
      setCultural((prev) => [...prev, newCultural]);

      alert("Student data saved successfully!");
      handleReset();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      department: "",
      year: "",
      grNumber: "",
    });
  };

  const handleEdit = (index) => {
    const studentToEdit = culturals[index];
    setFormData(studentToEdit);
    handleDelete(index);
  };

  const handleDelete = async (index) => {
    try {
      const idToDelete = culturals[index].id;
      await fetch(`http://localhost:8080/cultural/`, {
        method: "DELETE",
      });

      setCultural((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-purple-100 shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-center text-2xl font-bold text-purple">Cultural Committee</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Full Name", name: "name" },
            { label: "Department", name: "department" },
            { label: "Year", name: "year" },
            { label: "GR Number", name: "grNumber" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-purple font-semibold">{label}*</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                required
                className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
            Save
          </button>
          <button type="button" onClick={handleReset} className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600">
            Cancel
          </button>
        </div>
      </form>

      <hr className="my-8 border-t-2 border-gray-300" />

      <div>
        <h2 className="text-xl font-semibold text-purple-200 mt-6">Student List</h2>
        <div className="overflow-x-auto">
          <table className="w-full mt-4 border-collapse min-w-[300px]">
            <thead>
              <tr className="bg-purple-500 text-white">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Year</th>
                <th className="p-3 text-left">GR Number</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {culturals.map((cultural, index) => (
                <tr key={index} className="border-b border-gray-300 text-white">
                  <td className="p-3 bg-transparent">{cultural.name}</td>
                  <td className="p-3 bg-transparent">{cultural.department}</td>
                  <td className="p-3 bg-transparent">{cultural.year}</td>
                  <td className="p-3 bg-transparent">{cultural.grNumber}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cultural;
