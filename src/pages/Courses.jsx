import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Table from "../components/Table";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    price: "",
    discountedPrice: "",
    rating: "",
    students: "",
    includes: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const courseList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(courseList);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, "courses", selectedCourse.id));
    setShowDeleteModal(false);
    fetchCourses();
  };

  const handleAddCourse = async () => {
    await addDoc(collection(db, "courses"), newCourse);
    setShowModal(false);
    fetchCourses();
  };

  const handleEditCourse = async () => {
    await updateDoc(doc(db, "courses", selectedCourse.id), selectedCourse);
    setShowEditModal(false);
    fetchCourses();
  };

  const columns = ["Title", "Instructor", "Price", "Students", "Rating", "Actions"];
  const data = courses.map((course) => ({
    name: course.title,
    instructor: course.instructor || "Unknown",
    price: `₹${course.discountedPrice} (₹${course.price})`,
    students: `${course.students.toLocaleString()} students`,
    rating: `⭐ ${course.rating}`,
    actions: (
      <div className="space-x-2">
        <button
          onClick={() => {
            setSelectedCourse(course);
            setShowEditModal(true);
          }}
          className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => {
            setSelectedCourse(course);
            setShowDeleteModal(true);
          }}
          className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={() => {
            setSelectedCourse(course);
            setShowDetailsModal(true);
          }}
          className="px-2 py-1 text-white bg-gray-500 rounded hover:bg-gray-600"
        >
          View Details
        </button>
      </div>
    ),
  }));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Courses</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add Course
        </button>
      </div>
      <Table columns={columns} data={data} />

     {/* Add Course Modal */}
{showModal && (
  <Modal title="Add New Course" onClose={() => setShowModal(false)}>
    <div className="grid grid-cols-2 gap-4">
      {[
        { label: "Title", key: "title", type: "text" },
        { label: "Description", key: "description", type: "text" },
        { label: "Price", key: "price", type: "number" },
        { label: "Discounted Price", key: "discountedPrice", type: "number" },
        { label: "Rating", key: "rating", type: "number", min: 1, max: 5 },
        { label: "Students", key: "students", type: "number" },
        { label: "Includes", key: "includes", type: "text" }
      ].map(({ label, key, type, min, max }) => (
        <React.Fragment key={key}>
          <p className="font-semibold">{label}:</p>
          <input
            type={type}
            placeholder={label}
            value={newCourse[key] || ""}
            onChange={(e) => setNewCourse({ ...newCourse, [key]: type === "number" ? Number(e.target.value) : e.target.value })}
            className="w-full p-2 border rounded mb-2"
            {...(min !== undefined ? { min } : {})}
            {...(max !== undefined ? { max } : {})}
          />
        </React.Fragment>
      ))}
    </div>
    <div className="flex justify-end space-x-2 mt-4">
      <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded">
        Cancel
      </button>
      <button onClick={handleAddCourse} className="px-4 py-2 bg-green-500 text-white rounded">
        Save
      </button>
    </div>
  </Modal>
)}

{/* Edit Course Modal */}
{showEditModal && selectedCourse && (
  <Modal title="Edit Course" onClose={() => setShowEditModal(false)}>
    <div className="grid grid-cols-2 gap-4">
      {[
        { label: "Title", key: "title", type: "text" },
        { label: "Description", key: "description", type: "text" },
        { label: "Price", key: "price", type: "number" },
        { label: "Discounted Price", key: "discountedPrice", type: "number" },
        { label: "Rating", key: "rating", type: "number", min: 1, max: 5 },
        { label: "Students", key: "students", type: "number" },
        { label: "Includes", key: "includes", type: "text" }
      ].map(({ label, key, type, min, max }) => (
        <React.Fragment key={key}>
          <p className="font-semibold">{label}:</p>
          <input
            type={type}
            placeholder={label}
            value={selectedCourse[key]}
            onChange={(e) => setSelectedCourse({ ...selectedCourse, [key]: type === "number" ? Number(e.target.value) : e.target.value })}
            className="w-full p-2 border rounded mb-2"
            {...(min !== undefined ? { min } : {})}
            {...(max !== undefined ? { max } : {})}
          />
        </React.Fragment>
      ))}
    </div>
    <div className="flex justify-end space-x-2 mt-4">
      <button onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded">
        Cancel
      </button>
      <button onClick={handleEditCourse} className="px-4 py-2 bg-blue-500 text-white rounded">
        Save
      </button>
    </div>
  </Modal>
)}


   {/* View Details Modal */}
{showDetailsModal && selectedCourse && (
  <Modal title="Course Details" onClose={() => setShowDetailsModal(false)}>
    <div className="grid grid-cols-2 gap-4">
      <p className="font-semibold">Title:</p>
      <p>{selectedCourse.title}</p>

      <p className="font-semibold">Description:</p>
      <p>{selectedCourse.description}</p>

      <p className="font-semibold">Price:</p>
      <p>₹{selectedCourse.price}</p>

      <p className="font-semibold">Discounted Price:</p>
      <p>₹{selectedCourse.discountedPrice}</p>

      <p className="font-semibold">Rating:</p>
      <p>⭐ {selectedCourse.rating}</p>

      <p className="font-semibold">Students:</p>
      <p>{selectedCourse.students.toLocaleString()} students</p>

      <p className="font-semibold">Includes:</p>
      <p>{selectedCourse.includes}</p>
    </div>
  </Modal>
)}


      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal title="Confirm Deletion" onClose={() => setShowDeleteModal(false)}>
          <p>Are you sure you want to delete this course?</p>
          <div className="flex justify-end space-x-2 mt-4">
            <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      {children}
      <div className="flex justify-end mt-4">
        <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Close</button>
      </div>
    </div>
  </div>
);

export default Courses;
