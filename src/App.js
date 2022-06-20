import { useState,useRef } from 'react';
import './App.css';


function App() {
    const [routes] = useState([]);
    const [routeName,setRouteName] = useState();
    const [stations,setStations] = useState([]);
    const btnRef = useRef();
    

    const handleName = (e,id) => {
      let currentDurak = stations.find(durak => durak.id === id);
      if(currentDurak){
        currentDurak.name = e.target.value
      }
      
    }
    const handleEnlem = (e,id) => {
      let currentDurak = stations.find(durak => durak.id === id);
      if(currentDurak){
        currentDurak.enlem = e.target.value
      }
    }
    const handleBoylam = (e,id) => {
      let currentDurak = stations.find(durak => durak.id === id);
      if(currentDurak){
        currentDurak.boylam = e.target.value
      }
    }

    const handleSave = () => {
        routes.push({ //yeni güzergahi güzergahların içerisine ekle
          id:Math.floor(Math.random() * 666),
          name:routeName,
          stations,
        })
        setStations([]); //istasyonları boşalt
        setRouteName(); //güzergah adını boşalt
        console.log(routes);
    }
  return (
    <div className="App">
      <h1>Add Route </h1>
      <label>
          Güzergah Adı : 
          <input type="text" name="" placeholder='Örn:Çengelköy - Altunizade' value={routeName} onChange={e => setRouteName(e.target.value)}/>
      </label>
      <button type="button" onClick={() => {
         setStations([...stations,{
          id:stations.length + 1,
          name:null,
          enlem:null,
          boylam:null,
        }]);
      }}>
         Durak Ekle
      </button>

      <div className='s'>
     {stations.length > 0 ?
        stations.map(durak => (
          <div className='routes'>
            <label>Durak Adı :<input  type="text" className='input' name="name" placeholder='örn : beylerbeyi' value={durak.name} onChange={(e) => handleName(e,durak.id)}/></label>
            <label>Enlem :<input  type="text" className='input' name="enlem" placeholder='örn : 41.042778' value={durak.enlem} onChange={(e) => handleEnlem(e,durak.id)} /></label>
            <label>Boylam :<input  type="text" className='input' name="boylam" placeholder='örn : 29.040001' value={durak.boylam} onChange={(e) => handleBoylam(e,durak.id)}/></label>
          </div>
        ))
      : <span>Bir Durak Ekleyin</span>}
      </div>
      <button
        ref={btnRef}
        type="button"
        disabled={stations.length > 0 ? false : true}
        className={stations.length > 0 ? '' : 'disable'}
        onClick={handleSave}
        >
         Kaydet
      </button>
    </div>
  );
}
export default App;

