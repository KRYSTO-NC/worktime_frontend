import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomer } from '../../../features/customer/customerSlice'
import { getEtablissements } from '../../../features/etablissement/etablissementSlice' // Import the action
import Spinner from '../../../components/shared/spinner/Spinner'
import { toast } from 'react-toastify'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import WeekSlider from '../../../components/AdminHome/WeekSlider/WeekSlider'
import './adminHome.css'
function AdminHome() {
  const loggedInUserClientId = JSON.parse(localStorage.getItem('userCustomer'))

  const dispatch = useDispatch()
  const {
    customer,
    isLoading: customerLoading,
    isError,
    message,
  } = useSelector((state) => state.customer)
  const { etablissements, isLoading: etablissementLoading } = useSelector(
    (state) => state.etablissement,
  ) // Get the etablissements from the state
  const [selectedEtablissement, setSelectedEtablissement] = useState(null)

  const handleEtablissementChange = (e) => {
    setSelectedEtablissement(e.target.value)
  }
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getCustomer(loggedInUserClientId))
    dispatch(getEtablissements()) // Fetch the etablissements
  }, [dispatch])

  const filteredEtablissements = etablissements.data
    ? etablissements.data.filter(
        (etablissement) => etablissement.customer._id === loggedInUserClientId,
      )
    : []

  // week slider

  if (!customer || !customer.data || customerLoading || etablissementLoading) {
    return <Spinner />
  }

  return (
    <main className="container">
      <section className="heading">
        <h1>{customer.data.name}</h1>
      </section>
      <div className="headerHomeAdmin">
        <section>
          <h2>Sélectionnez un établissement :</h2>
          {filteredEtablissements.length === 0 ? (
            <p>Aucun établissement associé.</p>
          ) : (
            <div className="form-group select">
              <select
                value={selectedEtablissement}
                onChange={handleEtablissementChange}
              >
                <option value="" disabled>
                  Sélectionnez un établissement
                </option>
                {filteredEtablissements.map((etablissement) => (
                  <option key={etablissement.id} value={etablissement.id}>
                    {etablissement.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </section>
        <WeekSlider />
      </div>
    </main>
  )
}

export default AdminHome
