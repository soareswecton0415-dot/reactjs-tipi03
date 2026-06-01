import { useState } from "react";
import{Link} from "react-router-dom";
import ValidacaodeCadastro from "./ValidacaodeCadastro";
import { useNavigate } from "react-router-dom";
import axios from "axios"


const Cadastrar = () => {
     const [valores, setValores] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navegacao = useNavigate();

    const [errors, setErrors] = useState({});

    const handleInput = (event) =>{
   setValores(prev=>({...prev,[event.target.name]: event.target.value}))
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setErrors(ValidacaodeCadastro(valores));

        if(errors.name === "" && errors.email === "" && errors.password === ""){
            axios.post('http://localhost:7006/cadastrar', valores)
            .then(res => {
                navegacao("/");
            })
            .catch(err => console.log(err));
        }
    }
  return (
     <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
                <div className="bg-white p-3 rounded w-25">
                    <h2>Cadastrar</h2>
                    <form action="" onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label htmlFor="email"><strong>Nome completo</strong></label>
                            <input type="text" placeholder="Digite seu nome completo" name="name"
                            onChange= {handleInput}className="form-control rounded-0"></input>
                            {errors.name && <span className="text-danger">{errors.name}</span>}
    
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email"><strong>E-mail</strong></label>
                            <input type="email" placeholder="Digite seu email" name="email"
                            onChange= {handleInput}className="form-control rounded-0"></input>
                             {errors.email && <span className="text-danger">{errors.email}</span>}
    
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password"><strong>Senha</strong></label>
                            <input type="password" placeholder="Digite sua senha" name="password"
                            onChange={handleInput}className="form-control rounded-0" ></input>
                             {errors.password && <span className="text-danger">{errors.password}</span>}
                        </div>
                        <button type="submit" className="btn btn-success w-100 rounded-0"><strong>Cadastrar</strong></button>
                        <p> Ao se cadastrar você esta de acordo com nossos termos e politicas</p>
                        <Link to="/" className="btn btn-default border w-100 rounded bg-light rounded-0">Vá para a tela de Login</Link>
                    </form>
                </div>
    
            </div>
  )
}

export default Cadastrar;