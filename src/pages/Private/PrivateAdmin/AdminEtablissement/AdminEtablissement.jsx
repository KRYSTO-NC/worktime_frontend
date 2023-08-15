import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getEtablissements,
  createEtablissement,
  deleteEtablissement,
} from '../../../../features/etablissement/etablissementSlice'
import { toast } from 'react-toastify'
import Ticket from '../../../../components/shared/ticket/Ticket'
import Modal from '../../../../components/shared/modal/Modal'
import { FaEye, FaPlusCircle, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../../../components/shared/spinner/Spinner'

function AdminEtablissement() {
  const dispatch = useDispatch()
  const { etablissements, isLoading, isError, message } = useSelector(
    (state) => state.etablissement,
  )

  const navigate = useNavigate()

  const loggedInUserClientId = JSON.parse(localStorage.getItem('userCustomer'))
  const filteredEtablissement = etablissements.data
    ? etablissements.data.filter(
        (etablissement) => etablissement.customer._id === loggedInUserClientId,
      )
    : []

  const [
    isNewEtablissementModalOpen,
    setIsNewEtablissementModalOpen,
  ] = useState(false)
  const [newEtablissementData, setNewEtablissementData] = useState({
    customer: loggedInUserClientId,
    name: '',
    address: '',
  })

  const openNewEtablissementModal = () => setIsNewEtablissementModalOpen(true)
  const closeNewEtablissementModal = () => setIsNewEtablissementModalOpen(false)

  const handleNewEtablissementChange = (e) => {
    const { name, value } = e.target
    setNewEtablissementData({
      ...newEtablissementData,
      [name]: value,
    })
  }

  const handleNewEtablissementSubmit = (e) => {
    e.preventDefault()
    dispatch(createEtablissement(newEtablissementData))
      .unwrap()
      .then(() => {
        toast.success('Le nouvel établissement a été créé avec succès.')
        closeNewEtablissementModal()
        dispatch(getEtablissements())
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la création de l'établissement:",
          error.message,
        )
        toast.error(
          "Une erreur s'est produite lors de la création de l'établissement.",
        )
      })
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getEtablissements())
  }, [dispatch, isError, message])

  const handleDeleteEtablissement = (id) => {
    dispatch(deleteEtablissement(id))
      .unwrap()
      .then(() => {
        toast.success("L'établissement a été supprimé avec succès.")
        dispatch(getEtablissements())
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la suppression de l'établissement:",
          error.message,
        )
        toast.error(
          "Une erreur s'est produite lors de la suppression de l'établissement.",
        )
      })
  }

  const handleViewDetails = (id) => {
    navigate(`/admin/etablissement/${id}`)
  }
  if (!etablissements || !etablissements.data) {
    return <Spinner />
  }
  return (
    <main className="container">
      <section className="heading">
        <h1>Etablissements</h1>
        <p>
          Sur cette page, vous pouvez gérer tous les établissements associés à
          votre organisation. Les établissements sont des entités distinctes
          telles que des bureaux, des filiales ou des départements. Vous pouvez
          ajouter de nouveaux établissements, voir leurs détails, les modifier
          et les supprimer si nécessaire. Chaque établissement est lié à un
          ensemble d'employés et a des propriétés uniques comme l'adresse et la
          ville. Assurez-vous de tenir à jour les informations des
          établissements pour une meilleure organisation.
        </p>
        <button onClick={openNewEtablissementModal} className="btn  btn-danger">
          <FaPlusCircle /> Ajouter un nouvel établissement
        </button>
      </section>

      <div className="ticket-headings">
        <div>Nom</div>
        <div>Adresse</div>
        <div>Ville</div>
        <div>Créer le</div>
        <div>Actions</div>
      </div>

      {filteredEtablissement.map((etablissement) => (
        <Ticket key={etablissement.id}>
          <div>{etablissement.name}</div>
          <div>{etablissement.location.formattedAddress}</div>
          <div>{etablissement.location.city}</div>
          <div>{new Date(etablissement.createdAt).toLocaleDateString()}</div>
          <div className="actions">
            <button
              className="btn  btn-danger"
              onClick={() => handleDeleteEtablissement(etablissement.id)}
            >
              <FaTrash />
            </button>
            <button
              className="btn"
              onClick={() => handleViewDetails(etablissement.id)}
            >
              <FaEye />
            </button>
          </div>
        </Ticket>
      ))}

      {isNewEtablissementModalOpen && (
        <Modal
          titleModal="Ajouter un nouvel établissement"
          btnTxt="Ajouter"
          isOpen={isNewEtablissementModalOpen}
          onClose={closeNewEtablissementModal}
        >
          <form onSubmit={handleNewEtablissementSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom de l'établissement</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newEtablissementData.name}
                onChange={handleNewEtablissementChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Adresse de l'établissement</label>
              <textarea
                id="address"
                name="address"
                value={newEtablissementData.address}
                onChange={handleNewEtablissementChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <button className="btn btn-danger btn-block" type="submit">
                Ajouter
              </button>
              <button
                className="btn btn-block"
                type="button"
                onClick={closeNewEtablissementModal}
              >
                Annuler
              </button>
            </div>
          </form>
        </Modal>
      )}
    </main>
  )
}

export default AdminEtablissement
