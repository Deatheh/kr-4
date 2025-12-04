import './CreateCardModal.css';
import { useState } from 'react';

function CreateCardModal({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [information, setInformation] = useState('');
  const [urls, setUrls] = useState([{ name: '', url: '' }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Пожалуйста, введите название карточки');
      return;
    }

    const newCardData = {
      title: title.trim(),
      description: description.trim(),
      status: 'new',
      information: information.trim(),
      urls: urls.filter(url => url.name.trim() && url.url.trim())
    };

    onSave(newCardData);
  };

  const handleUrlChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    setUrls([...urls, { name: '', url: '' }]);
  };

  const removeUrlField = (index) => {
    if (urls.length > 1) {
      const newUrls = [...urls];
      newUrls.splice(index, 1);
      setUrls(newUrls);
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content create-modal" onClick={handleModalClick}>
        <div className="modal-header">
          <h2>Создать новую карточку</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-section">
              <label className="form-label">
                <h3>Название карточки *</h3>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Например: React Hooks"
                  className="form-input"
                  required
                />
              </label>
            </div>
            
            <div className="form-section">
              <label className="form-label">
                <h3>Краткое описание</h3>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Краткое описание технологии"
                  className="form-textarea"
                  rows="2"
                />
              </label>
            </div>
            
            <div className="form-section">
              <label className="form-label">
                <h3>Подробная информация</h3>
                <textarea
                  value={information}
                  onChange={(e) => setInformation(e.target.value)}
                  placeholder="Подробное описание технологии..."
                  className="form-textarea large"
                  rows="4"
                />
                <p className="form-hint">Для разделения на абзацы используйте Enter</p>
              </label>
            </div>
            
            <div className="form-section">
              <div className="urls-header">
                <h3>Полезные ссылки</h3>
                <button 
                  type="button" 
                  onClick={addUrlField}
                  className="btn-add-url"
                >
                  <span className="btn-icon">+</span> Добавить ссылку
                </button>
              </div>
              
              <div className="urls-container">
                {urls.map((url, index) => (
                  <div key={index} className="url-input-group">
                    <div className="url-input-row">
                      <input
                        type="text"
                        value={url.name}
                        onChange={(e) => handleUrlChange(index, 'name', e.target.value)}
                        placeholder="Название ссылки"
                        className="url-input name"
                      />
                      <input
                        type="text"
                        value={url.url}
                        onChange={(e) => handleUrlChange(index, 'url', e.target.value)}
                        placeholder="https://example.com"
                        className="url-input url"
                      />
                    </div>
                    {urls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeUrlField(index)}
                        className="btn-remove-url"
                        title="Удалить ссылку"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <div className="footer-actions">
              <button type="button" className="btn btn-cancel" onClick={onClose}>
                Отмена
              </button>
              <button type="submit" className="btn btn-save">
                <span className="btn-icon">✓</span> Создать карточку
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCardModal;