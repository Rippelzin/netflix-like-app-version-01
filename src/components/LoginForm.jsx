import React from 'react'
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    const navigate = useNavigate()

    function handleLogin() {
        localStorage.setItem("token", 123)
        navigate("/")
    } 

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Nome</label>
                <input {...register('nome', { required: true })} />
                { errors.nome && <span>O campo nome é obrigatório</span> }
            </div>
            <div>
                <label>Email</label>
                <input
                {...register('email', { 
                    required: 'O campo e-mail é obrigatório', 
                    pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Endereço de e-mail inválido'
                    }
                })}
                />
                { errors.email && <span>{errors.email.message}</span> }
            </div>
            <button type="submit" onClick={handleLogin}>Login </button>
        </form>
        
    </>
  )
}

export default LoginForm