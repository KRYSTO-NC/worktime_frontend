import React from 'react';
import Background from '../../components/shared/Background/Background'

import { Link } from 'react-router-dom';
import './NotFound.css'
function NotFound() {
    return (

        <Background>

        <div className='not-found-container'>
            <div className='notFoundTxt'>

            <h1>404 - Page non trouvée</h1>
            <p>Désolé, la page que vous recherchez n'existe pas.</p>
            </div>

            <Link to={'/'} className='btn btn-block btn-danger'>Retour a l'acceuil</Link>
        </div>
        </Background>
    );
}

export default NotFound;