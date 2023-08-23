import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

export default function LoginScreen() {

    const { handleSubmit, register, formState: { errors } } = useForm();

    const submitHandler = ({email, password }) => {
        console.log(email, password)
    }

    return (
        <Layout title={"Login"}>
            <form className='mx-auto max-w-screem-md' onSubmit={handleSubmit(submitHandler)}>
                <h1 className='mb-4 text-xl'>Login</h1>
                <div className='mb-4'>
                    <label htmlFor='email'>Email</label>
                    <input name='email' 
                    {...register('email', {required: 'Please enter email', pattern: { value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, message: 'Please enter valid email address'}})} 
                    className='w-full' 
                    id='email' 
                    autoFocus>
                    </input>
                    {errors.email && (<div className='text-red-500'>{errors.email.message}</div>)}
                </div>
                <div className='mb-4'>
                    <label htmlFor='password'>Password</label>
                    <input name='password'
                    {...register('password', {required: 'Please enter password', minLength: {value: 3, message: 'Password is more than 5 chars'}})}
                    className='w-full'
                    id='password' 
                    autoFocus>
                    </input>
                    {errors.password && (<div className='text-red-500'>{errors.password.message}</div>)}
                </div>
                <div className='mb-4'>
                    <button className='primary-button'>Login</button>
                </div>
                <div className='mb-4'>
                    Don't have an Account?<br></br>
                    <Link href={"register"}>Register</Link>
                </div>
            </form>
        </Layout>
    )
}
