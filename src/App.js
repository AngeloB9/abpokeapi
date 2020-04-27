import React, { useEffect } from 'react';
import './App.css';
import Title from './components/titulo'
import { render } from '@testing-library/react';





function App() {
  const [result, setResult] = React.useState([]);
  const [poke, setPoke] = React.useState([]);
  const [load, setLoad] = React.useState('true');

  const arr = [];
  
  useEffect(() => {
  fetch('https://pokeapi.co/api/v2/pokemon/?limit=61')
      .then((response) => response.json())
      .then((data) => setResult(
        data.results.map((item) => {
          fetch(item.url)
            .then((response) => response.json())
            .then((allpokemon) => arr.push(allpokemon));
            setPoke(arr);
        }),
      ));
  }, []);

   setTimeout(() => {
     setLoad(false);
     console.log(poke)
   }, 1000);
   
  return (
   
    <div className="App">
       <div className='pokegallery'>
       <div>
          <h1>
            Angelo Benavidez
          </h1>
          <p>Reto 1, Unidad 3</p>
        </div>


        { load ? (
          <p>Loading...</p>
        ) : (

          poke.map((img, i) => (
            
            <div id={img.id} key={img.id}>

              <div className='card' style={{ width: '10rem', height: '15rem', backgroundColor: '#F0F0C9' }}>
                <img  src={img.sprites.front_default} alt='pokemon' />
                <div >
                  <h5 >{img.name}</h5>
                  <h6>tipo: {img.types[0].type.name}</h6>
                </div>
              </div>


            </div>
          ))
        )}



</div>
    </div>
  );
}

export default App;
