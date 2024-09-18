import React, { useState, useEffect } from 'react';
import EmployeeList from './Components/EmployeeList';
import EmployeeForm from './Components/EmployeeForm';
import axios from 'axios';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Fetch employees from JSON server
  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  // Add a new employee
  const addEmployee = (employee) => {
   
    if (employees.some(emp => emp.id === employee.id)) {
      alert('An employee with this ID already exists. Please choose a different ID.');
      return;
    }

    axios.post('http://localhost:5000/employees', employee)
      .then((response) => {
        setEmployees([...employees, response.data]);
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
  };

  // Update an employee
  const updateEmployee = (updatedEmployee) => {
    axios.put(`http://localhost:5000/employees/${updatedEmployee.id}`, updatedEmployee)
      .then(() => {
        setEmployees(employees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  };

  // Delete an employee
  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:5000/employees/${id}`)
      .then(() => {
        setEmployees(employees.filter((emp) => emp.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  // Set employee for editing
  const editEmployee = (employee) => {
    setEditingEmployee(employee);
  };

  return (
    <div className="App">
      <h1>Employee Management</h1>
      <EmployeeForm 
        addEmployee={addEmployee} 
        updateEmployee={updateEmployee} 
        editingEmployee={editingEmployee} 
        setEditingEmployee={setEditingEmployee} 
      />
      <EmployeeList 
        employees={employees} 
        deleteEmployee={deleteEmployee} 
        editEmployee={editEmployee} 
      />
    </div>
  );
}

export default App;
