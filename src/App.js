import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
   const [repositories, setRepositories] = useState([])

   useEffect(() => {
      api.get('/repositories')
         .then(response => {
            console.log(response.data)
            setRepositories(response.data)
         })

   }, [])

   async function handleAddRepository() {

      const newRepository = {
         title: `new Title ${Date.now()} `,
         techs: [
            'react'
         ],
         url: 'https://github.com',
         likes: 0
      }
      const response = await api.post('/repositories', newRepository)

  
      if (response.status === 200) {
         const newRepository = response.data

         setRepositories([...repositories, newRepository])
      } 
   }

   async function handleRemoveRepository(id) {
      const response = await api.delete(`/repositories/${id}`)

      if (response.status == 204) {
         const repository = repositories.filter(repository => repository.id !== id)

         setRepositories(repository)
      }

   }

   return (
      <div>
         <ul data-testid="repository-list" >
            {repositories.map(repository => {
               return (
                  <li key={repository.id}>
                     {repository.title}
                     <button onClick={
                        () => handleRemoveRepository(repository.id)} >
                        Remover
                     </button>
                  </li>
               )
            })}

         </ul>

         <button onClick={handleAddRepository} > Adicionar </button>
      </div >
   );
}

export default App;