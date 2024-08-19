import React from "react";

const EntityList = ({ entities, entityType, onView, onEdit, onDelete }) => {
  console.log("Entity type:", entityType);
  console.log("enities", entities);
  return (
    <div className="">
      {entities && entities.length > 0 ? (
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 border">ID</th>
              <th className="py-2 border">Name</th>
              {entityType === "employees" ? (
                <>
                  <th className="py-2 border">Email</th>
                  <th className="py-2 border">Role</th>
                  <th className="py-2 border">Salary</th>
                  <th className="py-2 border">Experience</th>
                  {/* <th className="py-2 border">DepId</th> */}

                </>
              ) : 
                 <>
                  <th className="py-2 border">Location</th>
                  <th className="py-2 border">Manager</th>
                  </>
              
              }

              <th className="py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entities.map((entity) => (
              <tr key={entity.id}>
                <td className="border px-4 py-2">{entity.id}</td>
                <td className="border px-4 py-2">{entity.name}</td>
                {entityType === "employees" ? (
                  <>
                    <td className="border px-4 py-2">{entity.email}</td>
                    <td className="border px-4 py-2">{entity.role}</td>
                    <td className="border px-4 py-2">{entity.salary}</td>
                    <td className="border px-4 py-2">{entity.experience}</td>
                    {/* <td className="border px-4 py-2">{entity.depID}</td> */}
                  </>
                ) : (
                  <>
                    <td className="border px-4 py-2">{entity.location}</td>
                    <td className="border px-4 py-2">{entity.manager}</td>
                  </>
                )}

                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="text-blue-500  hover:text-blue-700   py-1 px-4 rounded-md text-lg "
                    onClick={() => onView(entity.id)}
                  >
                    View
                  </button>
                  <button
                    className="text-yellow-500  hover:text-yellow-700  py-2 px-5 rounded-md text-lg"
                    onClick={() => onEdit(entity.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700  py-2 px-5 rounded-md text-lg"
                    onClick={() => onDelete(entity.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h5 className="text-red-500">No {entityType}s found</h5>
      )}
    </div>
  );
};

export default EntityList;
