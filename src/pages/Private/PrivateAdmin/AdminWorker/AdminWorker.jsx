import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUsers,
  createUser,
  deleteUser,
} from '../../../../features/user/userSlice'
import { toast } from 'react-toastify'
import Ticket from '../../../../components/shared/ticket/Ticket'
import Modal from '../../../../components/shared/modal/Modal'
import { FaEye, FaPlusCircle, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../../../components/shared/spinner/Spinner'
import { getHorraires } from '../../../../features/horraire/horraireSlice'

function AdminWorker() {


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.user,
  )

  const loggedInUserClientId = JSON.parse(localStorage.getItem('userCustomer'))

  const [isNewEmployeeModalOpen, setIsNewEmployeeModalOpen] = useState(false)
  const [newEmployeeData, setNewEmployeeData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    cafat: '',
    customer: loggedInUserClientId,
  })

  const closeNewEmployeeModal = () => setIsNewEmployeeModalOpen(false)
  const openNewEmployeeModal = () => setIsNewEmployeeModalOpen(true)

  const handleNewEmployeeChange = (e) => {
    const { name, value } = e.target
    setNewEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleNewEmployeeSubmit = (e) => {
    e.preventDefault()
    dispatch(createUser(newEmployeeData))
      .unwrap()
      .then(() => {
        toast.success("L'employée a été ajouté avec succès.")
        closeNewEmployeeModal()
        dispatch(getUsers())
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'employée:", error.message)
        toast.error("Une erreur s'est produite lors de l'ajout de l'employée.")
      })
  }


  const filteredUsers = users.data
    ? users.data.filter(
        (user) => user.customer && user.customer._id === loggedInUserClientId,
      )
    : []

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getUsers())
  }, [dispatch, isError, message])

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id))
      .unwrap()
      .then(() => {
        toast.success("L'employée a été supprimé avec succès.")
        dispatch(getUsers())
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la suppression de l'employée:",
          error.message,
        )
        toast.error(
          "Une erreur s'est produite lors de la suppression de l'employée.",
        )
      })
  }

  const handleViewDetails = (id) => {
    navigate(`/admin/employee/${id}`)
  }

  if (!users.data || isLoading) {
    return <Spinner />
  }

  return (
    <main className="container">
      <section className="heading">
        <h1>Employée</h1>
        <p>
          Sur cette page, vous pouvez gérer tous les employés associés à votre
          compte. Vous pouvez ajouter de nouveaux employés, consulter leurs
          détails, modifier leurs informations et les supprimer si nécessaire.
          Assurez-vous de gérer avec soin les informations des employés pour
          assurer la fluidité des opérations.
        </p>
        <button onClick={openNewEmployeeModal} className="btn btn-danger">
          <FaPlusCircle /> Ajouter un nouvel employée
        </button>
      </section>

      <div className="ticket-headings">
        <div>Nom</div>
        <div>Num cafat</div>
        <div>Email</div>
        <div>Actif</div>
        <div>Actions</div>
      </div>

      {filteredUsers.map((user) => (
        <Ticket key={user._id}>
          <div>{user.firstname + '  ' + user.lastname}</div>
          <div>{user.cafat}</div>
          <div>{user.email}</div>
          <div style={{ color: user.actif ? 'green' : 'red' }}>
    {user.actif ? 'Oui' : 'Non'}
</div>

          <div className="actions">
            <button
              className="btn  btn-danger"
              onClick={() => handleDeleteUser(user.id)}
            >
              <FaTrash />
            </button>
            <button className="btn" onClick={() => handleViewDetails(user.id)}>
              <FaEye />
            </button>
          </div>
        </Ticket>
      ))}

      {isNewEmployeeModalOpen && (
        <Modal
          titleModal="Ajouter un nouvel employée"
          onClose={closeNewEmployeeModal}
          isOpen={isNewEmployeeModalOpen}
        >
          <form onSubmit={handleNewEmployeeSubmit}>
            <div className="form-group">
              <label htmlFor="firstname">Prénom</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={newEmployeeData.firstname}
                onChange={handleNewEmployeeChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Nom</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={newEmployeeData.lastname}
                onChange={handleNewEmployeeChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={newEmployeeData.email}
                onChange={handleNewEmployeeChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={newEmployeeData.password}
                onChange={handleNewEmployeeChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cafat">Numéro CAFAT</label>
              <input
                type="text"
                id="cafat"
                name="cafat"
                value={newEmployeeData.cafat}
                onChange={handleNewEmployeeChange}
                required
              />
            </div>
          
            <div className="form-group">
              <button type="submit" className="btn btn-danger btn-block">
                Ajouter
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-block"
                onClick={closeNewEmployeeModal}
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

export default AdminWorker
