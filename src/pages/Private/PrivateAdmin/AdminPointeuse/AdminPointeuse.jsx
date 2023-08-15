import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPointeuses, createPointeuse, deletePointeuse } from '../../../../features/pointeuse/pointeuseSlice';
import { toast } from "react-toastify";
import Ticket from '../../../../components/shared/ticket/Ticket';
import Modal from '../../../../components/shared/modal/Modal';
import { FaEye, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../../components/shared/spinner/Spinner';
import { getEtablissements } from '../../../../features/etablissement/etablissementSlice';

function AdminPointeuse() {
    const dispatch = useDispatch();
    const { pointeuses, isLoading, isError, message } = useSelector(state => state.pointeuse);
    const { etablissements } = useSelector(state => state.etablissement);
    
    const navigate = useNavigate(); 
    const loggedInUserClientId = JSON.parse(localStorage.getItem('userCustomer'));

    
    const [isNewPointeuseModalOpen, setIsNewPointeuseModalOpen] = useState(false);
    const [newPointeuseData, setNewPointeuseData] = useState({
        customer:  loggedInUserClientId,
        etblissement: "",
        name: "",
    });
    
    const openNewPointeuseModal = () => setIsNewPointeuseModalOpen(true);
    const closeNewPointeuseModal = () => setIsNewPointeuseModalOpen(false);

  const handleNewPointeuseChange = (e) => {
    const { name, value } = e.target;
    setNewPointeuseData({
      ...newPointeuseData,
      [name]: value,
    });
  };

  const handleNewPointeuseSubmit = (e) => {
    e.preventDefault();
    dispatch(createPointeuse(newPointeuseData))
      .unwrap()
      .then(() => {
        toast.success("La nouvelle pointeuse a été créée avec succès.");
        closeNewPointeuseModal();
        dispatch(getPointeuses());
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la pointeuse:", error.message);
        toast.error("Une erreur s'est produite lors de la création de la pointeuse.");
      });
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getPointeuses());
    dispatch(getEtablissements());
  }, [dispatch, isError, message]);


  const filteredPointeuses = pointeuses.data 
    ? pointeuses.data.filter(pointeuse => pointeuse.customer._id === loggedInUserClientId) 
    : [];

  const filteredEtablissements = etablissements.data 
    ? etablissements.data.filter(etablissement => etablissement.customer._id === loggedInUserClientId) 
    : [];


  const handleDeletePointeuse = (id) => {
    dispatch(deletePointeuse(id))
      .unwrap()
      .then(() => {
        toast.success("La pointeuse a été supprimée avec succès.");
        dispatch(getPointeuses());
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la pointeuse:", error.message);
        toast.error("Une erreur s'est produite lors de la suppression de la pointeuse.");
      });
  };

  const handleViewDetails = (id) => {
    navigate(`/admin/pointeuse/${id}`);
  };

  if(!pointeuses || !pointeuses.data || isLoading) {
    return <Spinner/>
  }

  return (
    <main className="container">
    
      <section className="heading">
        <h1>Pointeuses</h1>
        <button onClick={openNewPointeuseModal} className="btn  btn-danger">
          <FaPlusCircle/>  Ajouter une nouvelle pointeuse
        </button>
      </section>

      <div className="ticket-headings">
        <div>Nom</div>
        {/* Add more columns if needed */}
        <div>Actions</div>
      </div>

      {filteredPointeuses.map(pointeuse => (
        <Ticket key={pointeuse.id}>
        
        
          <div>{pointeuse.name}</div>
        
          <div className='actions'>
            <button className="btn  btn-danger" onClick={() => handleDeletePointeuse(pointeuse.id)}>
              <FaTrash/>  
            </button>
            <button className="btn" onClick={() => handleViewDetails(pointeuse.id)}>
              <FaEye/>  
            </button>
          </div>
        </Ticket>
      ))}

      {isNewPointeuseModalOpen && (
        <Modal
          titleModal="Ajouter une nouvelle pointeuse"
          btnTxt="Ajouter"
          isOpen={isNewPointeuseModalOpen}
          onClose={closeNewPointeuseModal}
        >
          <form onSubmit={handleNewPointeuseSubmit}>


          <div className="form-group">
              <label htmlFor="etablissement">Établissement</label>
              <select 
                id="etablissement" 
                name="etablissement" 
                value={newPointeuseData.etablissement}
                onChange={handleNewPointeuseChange}
                required>
                <option value="">-- Sélectionnez un établissement --</option>
                {filteredEtablissements.map(etablissement => (
                  <option key={etablissement._id} value={etablissement._id}>
                    {etablissement.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="name">Nom de la pointeuse</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newPointeuseData.name}
                onChange={handleNewPointeuseChange}
                required
              />
            </div>

            {/* Add more fields if needed */}
            <div className="form-group">
              <button className='btn btn-danger btn-block' type="submit">Ajouter</button>
              <button className='btn btn-block' type="button" onClick={closeNewPointeuseModal}>Annuler</button>
            </div>
          </form>
        </Modal>
      )}
    </main>
  );
}

export default AdminPointeuse;
