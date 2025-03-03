import React from 'react';

const NotificationPopup = () => {
  return (
    <div className="absolute right-0 mt-8 bg-white shadow-lg w-80 p-4 rounded-lg">
      <ul>
        <li className="py-2 border-b">New course added: React Basics</li>
        <li className="py-2 border-b">Payment received for course "JS Mastery"</li>
        <li className="py-2">New user enrolled: John Doe</li>
      </ul>
    </div>
  );
};

export default NotificationPopup;
