import React, { useState, useEffect } from "react";
import { handleError } from "../../../../Utils";
import { useNavigate } from "react-router-dom";

function Event() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
  });

  const navigate = useNavigate();

  // Load events from localStorage on mount
  useEffect(() => {
    const storedEvents = localStorage.getItem("event");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // Save events to localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const addEvent = async (e) => {
    e.preventDefault();
  
    const user_id = localStorage.getItem("user_id");
  
    if (!user_id) {
      console.error("User ID not found");
      return;
    }
  
    const newData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      date: formData.date,
      //user: user_id,
    };
  
    console.log("Sending Data:", newData); // Debugging output
  
    try {
      const url = `http://localhost:8080/event/`;
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
  
      const result = await response.json();
      console.log("API Response:", result); // Debugging output
  
      if (!response.ok) {
        console.error("Error response from server:", result);
        return;
      }
  
      setEvents((prev) => [...prev, result.data]); // Add the new event to the list
      setFormData({ name: "", description: "", date: "" });
    } catch (err) {
      handleError(err);
    }
  };
  
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-r from-pink-400 to-red-400 shadow-lg rounded-lg">
      <h1 className="text-center text-2xl font-bold text-white">Add Event</h1>

      <form onSubmit={addEvent} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-white font-semibold">Event Name*</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter event name"
            required
            className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-white font-semibold">Description*</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter event description"
            required
            className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-white font-semibold">Event Date*</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
          >
            Save Event
          </button>
        </div>
      </form>

      {/* Display Events */}
      <h2 className="text-xl font-semibold text-white mt-8">Event List</h2>
      <ul className="mt-4 space-y-3">
        {events.map((event, index) => (
          <li
            key={index}
            className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500"
          >
            <h3 className="text-lg font-bold">{event.name}</h3>
            <p>{event.description}</p>
            <p className="text-gray-600">Date: {event.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Event;
