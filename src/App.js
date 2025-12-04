import './App.css';
import TechnologyCard from './components/TechnologyCard';
import TechnologyModal from './components/TechnologyModal';
import CreateCardModal from './components/CreateCardModal';
import { useState } from 'react';

function App() {
  const [technologies, setTechnologies] = useState([
    {
      id: 1,
      title: 'React Components',
      description: 'Изучение базовых компонентов',
      status: 'completed',
      information: 'React компоненты - это строительные блоки React приложений. Каждый компонент представляет собой независимую часть пользовательского интерфейса, который можно повторно использовать.\n\nКомпоненты могут быть функциональными или классовыми. Функциональные компоненты проще и используются с хуками, а классовые компоненты имеют дополнительные возможности, такие как жизненный цикл.',
      urls: [
        { name: 'Документация React', url: 'https://reactjs.org/docs/components-and-props.html' },
        { name: 'React Components Guide', url: 'https://reactjs.org/docs/react-component.html' }
      ]
    },
    {
      id: 2,
      title: 'JSX Syntax',
      description: 'Освоение синтаксиса JSX',
      status: 'in-progress',
      information: 'JSX (JavaScript XML) - это расширение синтаксиса JavaScript, которое позволяет писать HTML-подобный код в JavaScript. JSX облегчает создание React элементов.\n\nJSX компилируется в вызовы React.createElement(), что делает код более читаемым и удобным для написания. Он также поддерживает встраивание JavaScript выражений с помощью фигурных скобок {}.',
      urls: [
        { name: 'JSX Introduction', url: 'https://reactjs.org/docs/introducing-jsx.html' },
        { name: 'JSX In Depth', url: 'https://reactjs.org/docs/jsx-in-depth.html' }
      ]
    },
    {
      id: 3,
      title: 'State Management',
      description: 'Работа с состоянием компонентов',
      status: 'new',
      information: 'State (состояние) в React - это объект, который содержит данные компонента, которые могут меняться со временем. Когда состояние меняется, компонент перерисовывается.\n\nУправление состоянием является ключевой концепцией React. Существует локальное состояние (useState) и глобальное состояние (Redux, Context API). Правильное управление состоянием критически важно для производительности и поддержки приложения.',
      urls: [
        { name: 'React State', url: 'https://reactjs.org/docs/state-and-lifecycle.html' },
        { name: 'Hooks API Reference', url: 'https://reactjs.org/docs/hooks-reference.html' },
        { name: 'Context API', url: 'https://reactjs.org/docs/context.html' }
      ]
    }
  ]);

  const [selectedTech, setSelectedTech] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Функция для обновления статуса технологии
  const updateTechnologyStatus = (id, newStatus) => {
    setTechnologies(prevTechs =>
      prevTechs.map(tech =>
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
  }

  // Функция для добавления новой карточки
  const addNewCard = (newCardData) => {
    const newId = technologies.length > 0
      ? Math.max(...technologies.map(t => t.id)) + 1
      : 1;

    const newCard = {
      id: newId,
      title: newCardData.title,
      description: newCardData.description,
      status: 'new', // Всегда 'new' для новых карточек
      information: newCardData.information || '',
      urls: newCardData.urls || []
    };

    setTechnologies(prev => [...prev, newCard]);
    setIsCreateModalOpen(false);
  }

  const progress = (techs) => {
    let s = 0;
    techs.forEach(t => {
      if (t.status === 'completed') {
        s++;
      }
    });
    s = Math.ceil(s / techs.length * 100);
    return String(s);
  }

  const updateRoadMap = (event) => {
    const file = event.target.files[0];

    if (!file) {
      console.log("Файл не выбран");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
      try {
        const jsonData = JSON.parse(event.target.result);

        // Проверяем, что загруженные данные имеют правильную структуру
        const validatedData = jsonData.map((item, index) => ({
          id: item.id || index + 1,
          title: item.title || `Технология ${index + 1}`,
          description: item.description || '',
          status: item.status || 'new',
          information: item.information || '',
          urls: item.urls || []
        }));

        setTechnologies(validatedData);
      } catch (error) {
        console.error("Ошибка при чтении JSON:", error);
        alert("Ошибка при загрузке файла. Проверьте формат JSON.");
      }
    };

    reader.onerror = function (error) {
      console.error("Ошибка при чтении файла:", error);
      alert("Ошибка при чтении файла.");
    };

    reader.readAsText(file);
  }

  const download = () => {
    let json = JSON.stringify(technologies, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'roadmap-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const setNewAll = () => {
    setTechnologies(prevTechs =>
      prevTechs.map(tech => ({
        ...tech,
        status: 'new'
      }))
    );
  }

  const handleViewClick = (tech) => {
    setSelectedTech(tech);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTech(null);
  }

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  }

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  }

  return (
    <div className="App">
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12'>
            <h1>RoadMap</h1>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-sm-3'></div>
          <div className='col-sm-6'>
            <p>Результат: </p>
            <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow={progress(technologies)} aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar" style={{ width: progress(technologies) + "%" }}>{progress(technologies) + "%"}</div>
            </div>
          </div>
          <div className='col-sm-3'></div>
        </div>
      </div>

      <div className="controls">
        <input
          type="file"
          id="docpicker"
          onChange={updateRoadMap}
          accept=".json" />

        <button type="button" className="btn btn-primary" onClick={download}>Сохранить RoadMap</button>
        <button type="button" className="btn btn-secondary" onClick={setNewAll}>Обнулить всё</button>
        <button type="button" className="btn btn-success" onClick={openCreateModal}>+ Добавить карточку</button>
      </div>

      <div className='card-container container'>
        {technologies.map(t => (
          <TechnologyCard
            key={t.id}
            id={t.id}
            title={t.title}
            description={t.description}
            status={t.status}
            onStatusChange={updateTechnologyStatus}
            onViewClick={() => handleViewClick(t)}
          />
        ))}
      </div>

      {isModalOpen && selectedTech && (
        <TechnologyModal
          technology={selectedTech}
          onClose={closeModal}
          onStatusChange={updateTechnologyStatus}
        />
      )}

      {isCreateModalOpen && (
        <CreateCardModal
          onClose={closeCreateModal}
          onSave={addNewCard}
        />
      )}
    </div>
  );
}

export default App;