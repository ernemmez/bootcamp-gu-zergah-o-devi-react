import { useState,useRef, useEffect } from 'react';
import './App.css';


function App() {
    const [routes,setRoutes] = useState(false);
    const [routeName,setRouteName] = useState();
    const [stations,setStations] = useState([]);
    const [saveBtn,setSaveBtn] = useState(false);
    const [error,showError] = useState(false);
    const btnRef = useRef();
    

      useEffect(()=>{ //button'un disabled durumunu kontrol ediyor
        if(stations.length > 0){
          stations.map(durak => {
            if(durak.name === '' || durak.enlem === '' || durak.boylam === ''){// disable olması gereken durum
                setSaveBtn(false);
            }else{ //disable olmaması gereken durum
              if(error){ 
                setSaveBtn(false);
              }else{
                setSaveBtn(true);
              }
            }
          })
        }
      },[error, stations])

//sorun inputa girildiğinde direk ekliyor ondan sonra duplicate mi kontrol etmemiz lazım



    const handleName = (e,index) => {
      const currentDurak = stations[index];
      currentDurak.name = e.target.value;
      setStations([...stations]);

      if(stations.length > 0){
        const duplicates = stations.filter( durak => Object.values(durak).includes(e.target.value)); //durağı array'e çevirip input value'su var mı diye kontrol ediyorum.
        if(duplicates.length > 1){
          showError(true);
        }else{
          showError(false);
        }
      }
    }




    const handleEnlem = (e,index) => {
      const currentDurak = stations[index];
      currentDurak.enlem = e.target.value;
      setStations([...stations]);

      if(stations.length > 0){
        const duplicates = stations.filter( durak => Object.values(durak).includes(e.target.value));
        if(duplicates.length > 1){
          showError(true);
        }else{
          showError(false);
        }
      }
    }
    
    const handleBoylam = (e,index) => {
      const currentDurak = stations[index];
      currentDurak.boylam = e.target.value;
      setStations([...stations]);

      if(stations.length > 0){
        const duplicates = stations.filter( durak => Object.values(durak).includes(e.target.value));
        if(duplicates.length > 1){
          showError(true);
        }else{
          showError(false);
        }
      }
      
    }

    const handleSave = () => {
      setRoutes({
        id:Math.floor(Math.random() * 666),
        name:routeName,
        stations,
      })
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
          name:'',
          enlem:'',
          boylam:'',
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

      <span style={{color:'red'}}>{error ? 'Aynı Veri Yalnızca Bir Kez Eklenebilir!' : null}</span> <br/> <br/>
      
      <button
        ref={btnRef}
        type="button"
        className={saveBtn ? '' : 'disable'}
        disabled={!saveBtn}
        onClick={handleSave}
        >
         Kaydet
      </button>
    </div>
  );
}
export default App;

