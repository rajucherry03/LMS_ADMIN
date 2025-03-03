import React from 'react';

const Table = ({ columns, data }) => {
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index} className="py-2 px-4 text-left">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="border-t">
            {Object.values(row).map((cell, index) => (
              <td key={index} className="py-2 px-4">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
