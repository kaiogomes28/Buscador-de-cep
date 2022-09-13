import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import api from '../Services/api';
import './styles.css';

function Buscador() {

    const [input, setInput] = useState('');
    const [cep, setCep] = useState({})

    async function handleSearch() {
        if(input === ''){
            alert("Irforme algum cep!")
            return;
        }

        try{
            const response = await api.get(`${input}/json`);
            setCep(response.data)
            setInput("");

        }catch{
            alert("Opss! cep inválido");
            setInput("");
        }
    }

    return (
        <div className="container">
            <h1 className="title">Buscador de CEP</h1>

            <div className="container-input">
                <input 
                type="text" 
                placeholder="Digite seu cep..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />

                <button className="button-search" onClick={handleSearch}> 
                    <FiSearch size={24} color="#fff"/>
                </button>
            </div>

            {Object.keys(cep).length > 0 && (
                <main className='main'>
                    <h2>CEP: {cep.cep}</h2>

                    <span>{cep.logradouro}</span>
                    <span>Complemento: {cep.complemento}</span>
                    <span>{cep.bairro}</span>
                <span>{cep.localidade} - {cep.uf} /{cep.ddd}</span>

            </main>
            )}
            
        </div>
    )
}

export default Buscador;