import './style.css'
import { useEffect, useState, useRef } from 'react'
import IconeLixeira from '../../assets/image/icone-lixeira.svg'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const response = await api.get('/usuarios')
    setUsers(response.data)
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <div className='container'>
        <form>
          <h1>Cadastro de Usuários</h1>
          <input type="text" name='nome' placeholder='Nome' ref={inputName} />
          <input type="number" name='idade' placeholder='Idade' ref={inputAge} />
          <input type="email" name='email' placeholder='E-mail' ref={inputEmail} />
          <button onClick={createUsers} type='submit'>Cadastrar</button>
        </form>

        {users.map(user => (
          <div key={user.id} className='card'>
            <div>
              <p>Nome: <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>E-mail: <span>{user.email}</span></p>
            </div>
            <button onClick={() => deleteUsers(user.id)}>
              <img src={IconeLixeira} />
            </button>
          </div>
        ))}


      </div>
    </>
  )
}

export default Home
