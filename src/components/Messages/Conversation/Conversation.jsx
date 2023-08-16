import { FaEnvelope } from 'react-icons/fa';
import './conversation.css';

function Conversation({ message }) {
    if (!message) {
        return (
            <section className='messageDetails'>
                <div className="instruction-message">
                <FaEnvelope/>

                    Cliquer sur une conversation de la liste pour la consulter ou cliquez sur nouveaux message pour en envoyer un.
                </div>
            </section>
        );
    }
    
    return (
        <section className='messageDetails'>
             <div> de : {message.from.firstname} {message.from.lastname}</div>
            <div>Reçu le  : {new Date(message.createdAt).toLocaleDateString()} à {new Date(message.createdAt).toLocaleTimeString()}</div>
            <h2> Objet : {message.object}</h2>
           
            <div className='message-body'>
                {message.body} {/* Supposant que votre message ait une propriété "body" qui contient le contenu du message */}
            </div>
        </section>
    );
}

export default Conversation;
