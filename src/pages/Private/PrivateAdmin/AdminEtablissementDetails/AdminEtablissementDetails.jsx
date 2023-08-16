import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEtablissement } from '../../../../features/etablissement/etablissementSlice'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import Spinner from '../../../../components/shared/spinner/Spinner'

function AdminEtablissementDetails() {
  const params = useParams()
  const dispatch = useDispatch()

  const { etablissement, isLoading, isError, message } = useSelector(
    (state) => state.etablissement,
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getEtablissement(params.id))
  }, [dispatch, isError, message, params.id])

  console.log(etablissement)
  if (!etablissement || !etablissement.data) {
    return <Spinner />
  }
  return <main className='container'>
    <section className="heading">
        <h1>Détails etablissement : {etablissement.data.name}</h1>
    </section>
  </main>
}

export default AdminEtablissementDetails
