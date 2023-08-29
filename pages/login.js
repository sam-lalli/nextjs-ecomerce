import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'
import { getError } from '../utils/Error'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'


export default function LoginScreen() {

    const { data: session } = useSession();

    const router = useRouter();
    const { redirect } = router.query;

    useEffect(() => {
        if (session?.user) {
            router.push(redirect || '/');
        }
    }, [router, session, redirect]);

    const { handleSubmit, register, formState: { errors } } = useForm();

    const submitHandler =  async ({email, password }) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });
            if (result.error) {
                toast.error(result.error)
            }
        } catch(err) { 
            toast.error(getError(err));
        }
    };

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
                    type='password' 
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
