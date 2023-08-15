import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getProfil } from '../../../../features/user/userSlice'
import Spinner from '../../../../components/shared/spinner/Spinner'

function PrivateUserHome() {
    const dispatch = useDispatch()
    const { profil, isLoading, isError, message } = useSelector(
      (state) => state.user,
    )
    
    // 1. Définir l'état local
    const [currentTime, setCurrentTime] = useState(new Date())
  
    useEffect(() => {
      if (isError) {
        toast.error(message)
      }
  
      dispatch(getProfil())
    }, [dispatch, isError, message])
  
    // 2. Mettre en place un intervalle pour mettre à jour currentTime
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date())
      }, 1000)
  
      // 3. Nettoyer l'effet
      return () => {
        clearInterval(interval)
      }
    }, [])
  
    // Condition de sortie placée après tous les appels de hooks
    if (!profil || !profil.data || isLoading) {
      return <Spinner />
    }
  return (
    <section className="container">
      <section className="heading">
        <p className='dateTime'>Il est actuellement {currentTime.toLocaleTimeString()} le {currentTime.toLocaleDateString()}.</p>
        <h1>Bonjour {profil.data.firstname} !</h1>
        <p>
          Depuis cet espace dédié, vous pouvez gérer plusieurs aspects de votre
          vie professionnelle. Vous avez la possibilité de demander des congés,
          signaler un arrêt maladie, contacter directement votre manager pour
          toute question ou préoccupation, contacter un de vos collégue de travail et bien plus encore. Nous avons conçu
          cet espace pour vous fournir tous les outils nécessaires pour
          faciliter votre expérience de travail chez nous. N'hésitez pas à
          explorer et à utiliser toutes les fonctionnalités mises à votre
          disposition !
        </p>
      </section>

      <section>
        <h2>Mes horaires de travail</h2>
      </section>
    </section>
  )
}

export default PrivateUserHome
