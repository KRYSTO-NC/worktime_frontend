import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../../features/auth/authSlice'
import BigTitle from '../../components/shared/BigTitle/BigTitle'
import { Link } from 'react-router-dom'
import Background from '../../components/shared/Gradient/Gradient'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const { isLoading, isError, message } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(forgotPassword(email)) // Wait for the forgotPassword action to complete
    setTimeout(() => {
      window.location.reload() // Reload the page after 3 seconds
    }, 3000)
  }

  return (
    <>
      <Background>
        <section className="heading">
          <h2>Réinitialisation de votre mot de passe</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa ab
            ducimus deleniti laborum iste similique accusamus consequuntur totam
            ex dolorum!
          </p>
        </section>
        
          {isLoading && <p className="message">Chargement...</p>}
          {message && !isError && (
            <p className="message message-success">
              Un email a été envoyé à {email}. Veuillez vérifier vos spams.
            </p>
          )}
          {isError && (
            <p className="message message-error">
              Une erreur est survenue. Veuillez réessayer.
            </p>
          )}
          <div className="form-login-container">
          <form className="form container-pass" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-block btn-danger" type="submit">
                Envoyer le lien de réinitialisation
              </button>
            </div>

            <Link className="btn btn-block btn-reverse" to={'/login'}>
              connexion
            </Link>
          </form>
        </div>
      </Background>
    </>
  )
}

export default ForgotPassword
