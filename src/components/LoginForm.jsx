import React from 'react'
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    const navigate = useNavigate()

    function handleLogin() {
        localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzMxNTM4NDAxLCJleHAiOjE3MzQxMzA0MDF9.Nah48IsRPlvxjyrwVVXWl8htfqD5OiX8KQMq98f5okA")
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