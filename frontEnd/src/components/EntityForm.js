import React, { useState, useEffect } from "react";


const EntityForm = ({ entity, entityType, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    
    name: "",
    email: entityType === "employees" ? "" : undefined,
    role: entityType === "employees" ? "" : undefined,
    salary: entityType === "employees" ? "" : undefined,
    experience: entityType === "employees" ? "" : undefined,
    // departmentId: entityType === "employees" ?"": undefined,
    location: entityType === "departments" ? "" : undefined,
    manager:entityType ==="departments" ? "" : undefined,
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    if (entity) {
      setFormData({
        id: entity.id || null,
        name: entity.name || "",
        email: entityType === "employees" ? entity.email || "" : undefined,
        role: entityType === "employees" ? entity.role || "" : undefined,
        salary: entityType === "employees" ? entity.salary || "" : undefined,
        experience: entityType === "employees" ? entity.experience || "" : undefined,
        // departmentId: entityType === "employees" ? entity.department?.id || "" : undefined,
        location: entityType === "departments" ? entity.location || "" : undefined,
        manager:entityType ==="departments" ?entity.manager || "" : undefined,
      });
    }

    if (entityType === "employees") {
      fetch("http://localhost:8081/departments")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setDepartments(data.content || []))
        .catch((error) => console.error("Error fetching departments:", error));
    }
    
  }, [entity, entityType]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    
};

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    console.log(e.target);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-5">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      {entityType === "employees" && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <label className="block text-sm font-medium text-gray-700">
            Role:
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />

          <label className="block text-sm font-medium text-gray-700">
            Salary:
          </label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <label className="block text-sm font-medium text-gray-700">
            Experience:
          </label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />

          <label className="block text-sm font-medium text-gray-700">
            Department:
          </label>
          <select
            name="department"
            value={departments.id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select a department</option>
            {departments?.map((department) => (
              
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
            
          </select>
        </div>
      )}
      {entityType === "departments" && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location:
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <label className="block text-sm font-medium text-gray-700">
            Manager:
          </label>
          <input
            type="text"
            name="manager"
            value={formData.manager}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
      )}
      <div className="flex space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EntityForm;
