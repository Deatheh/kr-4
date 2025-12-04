import './TechnologyCard.css'
import { useState, useEffect } from 'react';

function TechnologyCard({ id, title, description, status, onStatusChange, onViewClick }) {
    const [currentStatus, setCurrentStatus] = useState(status)
    
    useEffect(() => {
        setCurrentStatus(status);
    }, [status]);

    const changeStatus = (event) => {
        const newStatus = event.target.value;
        setCurrentStatus(newStatus);
        onStatusChange(id, newStatus);
    }

    const handleViewClick = (e) => {
        e.stopPropagation();
        onViewClick();
    }
    
    return (
        <div className={"technology-card " + currentStatus}>
            <h3>{title}</h3>
            <p className="description">{description}</p>
            
            <div className="status-info">
                <span>Статус:</span>
                <span className="status-badge">{currentStatus}</span>
            </div>
            
            <select name="status" value={currentStatus} onChange={changeStatus}>
                <option value="new">Новая</option>
                <option value="in-progress">В процессе</option>
                <option value="completed">Завершена</option>
            </select>
            
            <div className="card-actions">
                <button className="view-btn" onClick={handleViewClick}>
                    Просмотр
                </button>
            </div>
        </div>
    );
}

export default TechnologyCard;