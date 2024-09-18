import React from 'react';

const EmployeeList = ({ employees, deleteEmployee, editEmployee }) => {
  return (
    <div>
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.username}</td>
              <td>{employee.email}</td>
              <td>{employee.status}</td>
              <td>
                <button className='edi'  onClick={() => editEmployee(employee)}>Edit</button>
                <button className='delete' onClick={() => deleteEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
