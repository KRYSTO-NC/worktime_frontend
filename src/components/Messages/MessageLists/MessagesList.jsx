import { useState } from 'react';
import Conversation from '../Conversation/Conversation';
import './messagesList.css';

function MessagesList({ messages }) {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [filter, setFilter] = useState('all');  // 'all', 'Non lu', 'Lu', 'Archivée'

    const handleFilter = (status) => {
        setFilter(status);
    };

    const filteredMessages = messages.filter(message => {
        switch (filter) {
            case 'Non lu':
                return message.status === 'Non lu';
            case 'Lu':
                return message.status === 'Lu';
            case 'Archivée':
                return message.status === 'Archivée';
            default:
                return true;
        }
    });

    const getEmptyMessage = () => {
        switch (filter) {
            case 'Non lu':
                return "Aucun message non lu.";
            case 'Lu':
                return "Aucun message lu.";
            case 'Archivée':
                return "Aucun message archivé.";
            default:
                return "Aucun message.";
        }
    };

    const getColorByStatus = (status) => {
        switch (status) {
            case 'Non lu':
                return '#ca8e39'; // Color for unread messages
            case 'Lu':
                return '#CEF9CA'; // Color for read messages
            case 'Archivée':
                return '#BBB7E6'; // Color for archived messages
            default:
                return 'black'; // Default color
        }
    };

    return (
        <div className="message-page-container">
            <section className='messageList'>
                <div className="filterMessages">
                    <button className='btn btn-sm' onClick={() => handleFilter('all')}>Tous</button>
                    <button className='btn btn-sm notRead' onClick={() => handleFilter('Non lu')}>Non lu</button>
                    <button className='btn btn-sm read' onClick={() => handleFilter('Lu')}>Lu</button>
                    <button className='btn btn-sm archive' onClick={() => handleFilter('Archivée')}>Archivée</button>
                </div>

                <div className='messages'>
                    {filteredMessages.length > 0 ? (
                        filteredMessages.map((message) => (
                            <div 
                                className='messageCard' 
                                key={message._id} 
                                onClick={() => setSelectedMessage(message)}
                                style={{ backgroundColor: getColorByStatus(message.status) }}
                            >
                                <div>
                                    <div> message de : {message.from && message.from.firstname} {message.from && message.from.lastname}</div>
                                    <div>Reçu le  : {new Date(message.createdAt).toLocaleDateString()} à {new Date(message.createdAt).toLocaleTimeString()}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-message">
                            {getEmptyMessage()}
                        </div>
                    )}
                </div>
            </section>

            
                <Conversation message={selectedMessage} />
            
        </div>
    );
}

export default MessagesList;
