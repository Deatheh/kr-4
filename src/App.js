import './App.css';
import TechnologyCard from './components/TechnologyCard';
import { useState } from 'react';

function App() {
  const [technologies, setTechnologies] = useState([
    {
      id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'completed'
    },
    {
      id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'in-progress'
    },
    {
      id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'new'
    }
  ]);

  // Функция для обновления статуса технологии
  const updateTechnologyStatus = (id, newStatus) => {
    setTechnologies(prevTechs => 
      prevTechs.map(tech => 
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
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

  const updateRoadMap = () => {
    let input = document.getElementById("docpicker");
    const file = input.files[0];

    if (!file) {
      console.log("Файл не выбран");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
      try {
        const jsonData = JSON.parse(event.target.result);
        setTechnologies(jsonData);
      } catch (error) {
        console.error("Ошибка при чтении JSON:", error);
      }
    };

    reader.onerror = function (error) {
      console.error("Ошибка при чтении файла:", error);
    };

    reader.readAsText(file);
  }

  const download = () => {
    let json = JSON.stringify(technologies)
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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

      <input
        type="file"
        id="docpicker"
        onChange={updateRoadMap}
        accept=".json" />

      <button type="button" class="btn btn-primary" onClick={download}>Сохранить RoadMap</button>

      <div className='card-container container'>
        {technologies.map(t => (
          <TechnologyCard 
            key={t.id} 
            id={t.id}
            title={t.title} 
            description={t.description} 
            status={t.status}
            onStatusChange={updateTechnologyStatus} // Передаем функцию обратного вызова
          />
        ))}
      </div>
    </div>
  );
}

export default App;