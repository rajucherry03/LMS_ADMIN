import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">{course.title}</h2>
      <p className="text-gray-600">{course.description}</p>
      <button className="mt-4 bg-teal-500 text-white p-2 rounded">View Course</button>
    </div>
  );
};

export default CourseCard;
