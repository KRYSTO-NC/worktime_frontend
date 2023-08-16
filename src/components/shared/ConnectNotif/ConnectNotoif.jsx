import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { getProfil } from '../../../features/user/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../../components/shared/spinner/Spinner';

function ConnectNotif() {
    const dispatch = useDispatch();
    const socketRef = useRef(null);
    const { profil, isLoading, isError, message } = useSelector(state => state.user);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(getProfil());
    }, [dispatch, isError, message]);
    useEffect(() => {
        socketRef.current = io('http://localhost:8000');
    
        // Assurez-vous que profil est défini avant de tenter d'accéder à ses propriétés
        if (profil && profil.data) {
            const { customer, firstname, lastname } = profil.data;
            socketRef.current.emit('joinRoom', { customerID: customer, firstname, lastname });
    
            socketRef.current.on('userConnected', (data) => {
                console.log("Reçu 'userConnected' avec le message:", data.message);
                toast(data.message);
            });
        }
    
        return () => {
            socketRef.current.disconnect();
        };
    
    }, [profil]);

    if (isLoading || !profil || !profil.data) {
        return <Spinner />;
    }

    return <ToastContainer />;
}

export default ConnectNotif;
