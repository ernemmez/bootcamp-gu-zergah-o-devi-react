import { useState,useRef, useEffect } from 'react';
import './App.css';


function App() {
    const [routes] = useState([]);
    const [routeName,setRouteName] = useState();
    const [stations,setStations] = useState([]);
    const [saveBtn,setSaveBtn] = useState(false);
    const btnRef = useRef();
    

      useEffect(()=>{ //button'un disabled durumunu kontrol ediyor
        if(stations.length > 0){
          stations.map(durak => {
            if(durak.name === '' || durak.enlem === '' || durak.boylam === '' ){// disable olması gereken durum
                setSaveBtn(false);
            }else{ //disable olmaması gereken durum
              setSaveBtn(true);
            }
          })
        }
      },[stations])



    const handleName = (e,index) => {
        let currentDurak = stations[index];

        currentDurak.name = e.target.value;
        console.log(stations);
        setStations([...stations]);
    }
    const handleEnlem = (e,index) => {
      let currentDurak = stations[index];

        currentDurak.enlem = e.target.value;
        console.log(stations);
        setStations([...stations]);
    }
    const handleBoylam = (e,index) => {
      let currentDurak = stations[index];

        currentDurak.boylam = e.target.value;
        console.log(stations);
        setStations([...stations]);
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
            <label>Durak Adı :<input  type="text" className='input' name="name" placeholder='örn : beylerbeyi' value={durak.name} onChange={(e) => handleName(e,stations.indexOf(durak))}/></label>
            <label>Enlem :<input  type="text" className='input' name="enlem" placeholder='örn : 41.042778' value={durak.enlem} onChange={(e) => handleEnlem(e,stations.indexOf(durak))} /></label>
            <label>Boylam :<input  type="text" className='input' name="boylam" placeholder='örn : 29.040001' value={durak.boylam} onChange={(e) => handleBoylam(e,stations.indexOf(durak))}/></label>
          </div>
        ))
      : <span>Bir Durak Ekleyin</span>}
      </div>
      <button
        ref={btnRef}
        type="button"
        disabled={saveBtn}
        className={saveBtn ? '' : 'disable'}
        onClick={saveBtn ? handleSave : null}
        >
         Kaydet
      </button>
    </div>
  );
}
export default App;

