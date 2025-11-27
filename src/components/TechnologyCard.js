import './TechnologyCard.css'
import { useState } from 'react';

function TechnologyCard({ id, title, description, status, onStatusChange }) {
    const [currentStatus, setCurrentStatus] = useState(status)

    const changeStatus = (event) => {
        const newStatus = event.target.value;
        console.log(newStatus);
        setCurrentStatus(newStatus);
        // Вызываем функцию обратного вызова для обновления в родительском компоненте
        onStatusChange(id, newStatus);
    }
    
    return (
        <div className={"technology-card " + currentStatus} >
            <h3>{title}</h3>
            <p>{description}</p>
            <p>Статус: {currentStatus}</p>
            <select name="status" value={currentStatus} onChange={changeStatus}>
                <option value="new">Новая</option>
                <option value="in-progress">В процессе</option>
                <option value="completed">Завершена</option>
            </select>
        </div>
    );
}

export default TechnologyCard;