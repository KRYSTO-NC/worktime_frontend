import React, { useState } from 'react'
import Modal from '../../../components/shared/modal/Modal'
import { useDispatch } from 'react-redux'
import { uploadUserPhoto } from '../../../features/user/userSlice' // Assurez-vous de créer cette action
import './workerHeader.css'
import {
  FaEnvelope,
  FaMobile,
  FaPhone,
} from 'react-icons/fa'
import Tag from '../../shared/Tag/Tag'

function WorkerHeader({ user }) {
  const dispatch = useDispatch()
  const [isNewPhotoModalOpen, setIsNewPhotoModalOpen] = useState(false)
  const [photoFile, setPhotoFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  const openNewPhotoModal = () => {
    setIsNewPhotoModalOpen(true)
  }

  const closeNewPhotoModal = () => {
    setIsNewPhotoModalOpen(false)
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    setPhotoFile(file)
    setPreviewImage(URL.createObjectURL(file))
  }

  const handlePhotoSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('photo', photoFile)
    dispatch(
      uploadUserPhoto({
        userId: user._id,
        photo: formData,
      }),
    )
      .then(() => {
        setIsNewPhotoModalOpen(false)
        window.location.reload() // Ceci recharge la page, mais il est préférable de mettre à jour l'état de l'utilisateur
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la photo:", error)
      })
  }

  return (
    <section className="heading headingWorker">
      <div className="img-worker-container">

        <img
         onClick={openNewPhotoModal}
          src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${user.photo}`}
          alt=""
        />
      </div>
      <div className="worker-infos">
        <div className="tag">
        {user.actif ? 'Actif' : 'Inactif'}
        </div>
      
        <h1>
          {user.firstname} <span>{user.lastname}</span>
        </h1>
        <div className="contactInfoUser">
          <div>
            <FaPhone /> {user.fixedNumber}
          </div>

          <div>
            <FaMobile /> {user.mobileNumber}
          </div>
          <div>
            <FaEnvelope /> {user.email}
          </div>
        </div>
      </div>

      <Modal
        titleModal="Ajouter ou changer votre photo"
        isOpen={isNewPhotoModalOpen}
        onClose={closeNewPhotoModal}
      >
        <form className="add-photo-form" onSubmit={handlePhotoSubmit}>
          <div className="form-group">
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
            {previewImage && (
              <img className="photo-preview" src={previewImage} alt="Preview" />
            )}
          </div>
          <button className="btn" type="submit">
            Ajouter
          </button>
        </form>
      </Modal>
    </section>
  )
}

export default WorkerHeader
