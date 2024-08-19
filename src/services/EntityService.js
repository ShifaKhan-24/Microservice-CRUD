import { useEffect, useState } from "react";

import EntityForm from "../components/EntityForm";
import EntityList from "../components/EntityList";
import SearchBar from "../components/SearchBar";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EntityService = ({ entityType, apiUrl }) => {
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(7);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchEntities();
  }, [currentPage, pageSize,entityType]);

  const fetchEntities = async () => {
    try {
      const response = await fetch(`${apiUrl}/${entityType}?page=${currentPage}&size=${pageSize}`);
      
      if (!response.ok) {
        throw new Error('An error occurred while fetching data');
      }
  
      const data = await response.json();
  
      setEntities(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error(
        error.message || "An error occurred while fetching data"
      );
    }
  };
  

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
   
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
   
  };
  const handleSave = async (entity) => {
    try {
        // Create a copy of the entity
        const payload = { ...entity };

        // Convert departmentId to department object if present
        if (payload.departmentId) {
            payload.department = { id: payload.departmentId };
            delete payload.departmentId;
        } else if (payload.department) {
            payload.department = { id: payload.department };
        }

        // Handle save or update based on the isEditing flag
        if (isEditing) {
            // Update existing entity
            await fetch(`${apiUrl}/${entityType}/${entity.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
        } else {
            // Create new entity
            await fetch(`${apiUrl}/${entityType}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
        }

        // Refresh the entities list
        fetchEntities();
        setIsEditing(false);
        setSelectedEntity(null);
        toast.success("Data saved successfully");
        handleCloseModal();
        setShowForm(false)
    } catch (error) {
        toast.error(
            error.message || "An error occurred while saving data"
        );
    }
};

const handleEdit = (id) => {
  const entity = entities.find((e) => e.id === id);
  setSelectedEntity(entity);
  setIsEditing(true);
  setShowForm(true);
  handleOpenModal();
};

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${entityType}/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      fetchEntities();
      toast.success("Data deleted successfully");
    } catch (error) {
      toast.error(
        error.message || "An error occurred while deleting data"
      );
    }
  };
  

  const handleView = (id) => {
    const entity = entities.find((e) => e.id === id);
    toast.info(JSON.stringify(entity, null, 5));
    
  };

  const handleAddEntity = () => {
    setShowForm(true);
    setSelectedEntity(null);
    setIsEditing(false);
    handleOpenModal();
  };

  return (
    <div>
      <SearchBar entityType={entityType} setEntities={setEntities} />
      <EntityList
        entities={entities}
        entityType={entityType}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {showForm && (
        <Modal isOpen={handleOpenModal} onClose={handleCloseModal}>
          <EntityForm
            entity={selectedEntity}
            entityType={entityType}
            onSave={handleSave}
            onCancel={() => setShowForm(false)}
          />
        </Modal>
      )}
      <button
        className={`bg-blue-500 text-white px-4 py-2 rounded-md mt-5 `}
        onClick={handleAddEntity}
      >
        Add {entityType}
      </button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default EntityService;
