import { useEffect, useState } from 'react'
import './App.css'
import axios, { AxiosResponse } from 'axios'

function App() {
  
  const API_URL: string = 'https://api.mpg.football/api/data/';
  const [listClubs, setListClubs] = useState([]);
  const [listPlayers, setListPlayers] = useState([]);
  
  async function catchClubs(): Promise<void> {
    const response: AxiosResponse = await axios.get(`${API_URL}championship-clubs`);
    setListClubs([response.data.championshipClubs]);
  }

  async function catchPlayers(): Promise<void> {
    const response: AxiosResponse = await axios.get(`${API_URL}championship-players-pool/1`);
    setListPlayers([response.data.poolPlayers]);
  
  }
  
  useEffect(() => {
    catchClubs();
    catchPlayers();
  },[])

  return (
 
      
    <div className="App">
        <header className="App-header">
          <h2>Liste des Clubs</h2>

          <ul>

          { listClubs.length > 0 && 
              Object.keys(listClubs[0]).map((oneKey,i)=>{
                let club = listClubs[0][oneKey]
                return (
                  <li key={`${i}- yo ${oneKey}`}>{club.name["fr-FR"]}</li>
                  )
                })
              }

          </ul>
       
          <h2>Liste des joueurs</h2>
          <ul>

          { listPlayers.length > 0 && 
              Object.keys(listPlayers[0]).map((oneKey,i)=>{
                let player = listPlayers[0][oneKey]
                return (
                    <li key={`${i}- yo ${oneKey}`}>{`M.${player.lastName} ${player.firstName}`}</li>
                  )
              })
            }

          </ul>

        </header>

    </div>
  )
}

export default App
