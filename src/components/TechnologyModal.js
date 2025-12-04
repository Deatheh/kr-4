import './TechnologyModal.css';

function TechnologyModal({ technology, onClose, onStatusChange }) {
  const handleStatusChange = (event) => {
    onStatusChange(technology.id, event.target.value);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content ${technology.status}`} onClick={handleModalClick}>
        <div className="modal-header">
          <h2>{technology.title}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="modal-section">
            <h3>Краткое описание</h3>
            <p>{technology.description}</p>
          </div>
          
          <div className="modal-section">
            <h3>Статус</h3>
            <select 
              name="status" 
              value={technology.status} 
              onChange={handleStatusChange}
              className="status-select"
            >
              <option value="new">Новая</option>
              <option value="in-progress">В процессе</option>
              <option value="completed">Завершена</option>
            </select>
          </div>
          
          <div className="modal-section">
            <h3>Подробная информация</h3>
            <div className="information-content">
              {technology.information.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          {technology.urls && technology.urls.length > 0 && (
            <div className="modal-section">
              <h3>Полезные ссылки</h3>
              <div className="urls-list">
                {technology.urls.map((link, index) => (
                  <div key={index} className="url-item">
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="url-link"
                    >
                      {link.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
}

export default TechnologyModal;