import React, { useState, useEffect, useRef } from 'react';
import './headerUserSelect.css';
import { FaUser, FaBriefcase, FaHospital, FaAddressCard, FaCog, FaSlidersH, FaHSquare } from 'react-icons/fa';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';

function HeaderUserSelect({ profil }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Gestionnaire de clic pour vérifier si le clic a eu lieu à l'extérieur
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        // Ajouter l'écouteur d'événements lors du montage du composant
        document.addEventListener('mousedown', handleClickOutside);

        // Supprimer l'écouteur d'événements lors du démontage du composant
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    if (!profil) {
        return <Spinner/>;  // ou return null; si vous ne voulez rien afficher
    }
    return (
        <div className="customDropdown" ref={dropdownRef}>
            <button className='btn' onClick={() => setIsOpen(!isOpen)}>
                <FaUser /> {profil.firstname} <span>{profil.lastname}</span>
            </button>
            <div className={`dropdownContent ${isOpen ? 'show' : ''}`}>
            <Link to={'/user/congees'}><FaBriefcase /> Congés</Link>
                <Link to={"/user/maladies"}><FaHSquare /> Maladies</Link>
                <Link to={'/user/mon-profil'}><FaAddressCard /> Mon profil</Link>
                <Link to={'/user/preferences'}><FaSlidersH /> Préférences</Link>
                <Link to={'/user/configuration'}><FaCog /> Configuration</Link>
            </div>
        </div>
    );
}

export default HeaderUserSelect;
