import React, { useEffect } from 'react'
import MessagesList from '../../../../components/Messages/MessageLists/MessagesList'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getMessages } from '../../../../features/message/messageSlice'
import { getProfil } from '../../../../features/user/userSlice'
import Spinner from '../../../../components/shared/spinner/Spinner'

function AdminMessages() {
    const dispatch = useDispatch()

    const { messages, isLoading, isError, message } = useSelector((state) => state.message);
    const { profil } = useSelector((state) => state.user);

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(getMessages())
        dispatch(getProfil())
    }, [dispatch, isError, message])

    const filteredMessagesTo = messages.data && profil.data
        ? messages.data.filter((message) => message.to._id === profil.data._id)
        : [];

    const filteredMessagesFrom = messages.data && profil.data
        ? messages.data.filter((message) => message.from._id === profil.data._id)
        : [];

    if (!messages || !messages.data || !profil || !profil.data) {
        return <Spinner />
    }

    return (
        <main className="container">
            <section className="heading">
                <h1>Messages</h1>
                <p>
                    Sur cette page, vous pouvez gérer et visualiser toutes vos conversations. Tous les messages envoyés et reçus sont centralisés ici, vous permettant de communiquer efficacement et de rester organisé.
                </p>
            </section>
           
                <MessagesList messages={filteredMessagesTo} />
        
        </main>
    )
}

export default AdminMessages
