import React, { useState, useEffect } from "react";
import { IoCalendarSharp } from "react-icons/io5";

const Bsctime = () => {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Open IndexedDB
  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("BscTimetableDB", 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("timetable")) {
          db.createObjectStore("timetable", { keyPath: "id", autoIncrement: true });
        }
      };
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e.target.error);
    });
  };

  // Load data from IndexedDB
  const loadQuestions = async () => {
    const db = await openDB();
    const tx = db.transaction("timetable", "readonly");
    const store = tx.objectStore("timetable");
    const request = store.getAll();
    request.onsuccess = (e) => {
      setQuestions(e.target.result);
    };
  };

  // Save question to IndexedDB
  const saveQuestion = async (newQuestion) => {
    const db = await openDB();
    const tx = db.transaction("timetable", "readwrite");
    const store = tx.objectStore("timetable");
    store.add(newQuestion);
    tx.oncomplete = () => loadQuestions();
  };

  // Update question in IndexedDB
  const updateQuestionInDB = async (id, updatedQuestion) => {
    const db = await openDB();
    const tx = db.transaction("timetable", "readwrite");
    const store = tx.objectStore("timetable");
    store.put({ ...updatedQuestion, id });
    tx.oncomplete = () => loadQuestions();
  };

  // Remove question from IndexedDB
  const removeQuestionFromDB = async (id) => {
    const db = await openDB();
    const tx = db.transaction("timetable", "readwrite");
    const store = tx.objectStore("timetable");
    store.delete(id);
    tx.oncomplete = () => loadQuestions();
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "pdf") setPdfFile(reader.result);
        if (type === "image") setImgFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addOrUpdateQuestion = () => {
    if (!questionText.trim()) {
      alert("Please enter a question!");
      return;
    }

    const newQuestion = { text: questionText, pdf: pdfFile, img: imgFile };

    if (isEditing) {
      const updatedQuestions = [...questions];
      updatedQuestions[currentIndex] = { ...newQuestion, id: questions[currentIndex].id };
      setQuestions(updatedQuestions);
      updateQuestionInDB(questions[currentIndex].id, newQuestion);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      saveQuestion(newQuestion);
    }

    // Reset form
    setQuestionText("");
    setPdfFile(null);
    setImgFile(null);
  };

  const editQuestion = (index) => {
    const question = questions[index];
    setQuestionText(question.text);
    setPdfFile(question.pdf);
    setImgFile(question.img);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  const removeQuestion = (index) => {
    const question = questions[index];
    removeQuestionFromDB(question.id);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">
          <IoCalendarSharp className="text-blue-500 inline-block mr-2" />
          Exam Timetable
        </h1>

        {/* Input Fields */}
        <div className="mb-4 space-y-3">
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter exam details"
            className="w-full p-2 border rounded"
          />
          <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, "pdf")} className="w-full p-2 border rounded" />
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "image")} className="w-full p-2 border rounded" />

          <button
            onClick={addOrUpdateQuestion}
            className={`w-full py-2 text-white font-semibold rounded ${
              isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isEditing ? "Update Timetable" : "Add Timetable"}
          </button>
        </div>

        {/* Timetable List */}
        <div className="space-y-4">
          {questions.length === 0 ? (
            <p className="text-gray-500 text-center">No Timetable added yet.</p>
          ) : (
            questions.map((question, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50 shadow-md">
                <p className="font-semibold">{question.text}</p>

                {question.pdf && (
                  <button
                    onClick={() => setSelectedQuestion(question)}
                    className="text-blue-500 underline block mt-2"
                  >
                    📄 View PDF
                  </button>
                )}
                {question.img && <img src={question.img} alt="Question" className="w-32 h-32 object-cover rounded-lg shadow mt-2" />}

                {/* Buttons */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setSelectedQuestion(question)}
                    className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    👀 View
                  </button>
                  <button
                    onClick={() => editQuestion(index)}
                    className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => removeQuestion(index)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for Viewing a Question */}
      {selectedQuestion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">📌 Exam Details</h2>
            <p className="mb-3 text-gray-800 font-medium">{selectedQuestion.text}</p>

            {selectedQuestion.pdf && (
              <iframe
                src={selectedQuestion.pdf}
                className="w-full h-64 border rounded-lg"
                title="PDF Viewer"
              ></iframe>
            )}
            {selectedQuestion.img && (
              <img src={selectedQuestion.img} alt="Question" className="w-full rounded-lg shadow mb-3" />
            )}

            <button
              onClick={() => setSelectedQuestion(null)}
              className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bsctime;
