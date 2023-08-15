import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getUser } from '../../../../features/user/userSlice'
import Spinner from '../../../../components/shared/spinner/Spinner'
import './adminWorkerDetails.css'
import WorkerHeader from '../../../../components/Worker/WorkerDetail/WorkerHeader'
import WorkerContrats from '../../../../components/Worker/WorkerContrats/WorkerContrats'

function AdminWorkerDetails() {
  const params = useParams()
  const dispatch = useDispatch()
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.user,
  )

  useEffect(() => {
    dispatch(getUser(params.id))
  }, [dispatch, params.id])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [user, isError, message])

  if (!user || !user.data || isLoading) {
    return <Spinner />
  }

  return (
    <main className="container">
      <WorkerHeader user={user.data} />
      <WorkerContrats user={user.data}/>
    </main>
  )
}

export default AdminWorkerDetails
