import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'



export default function RegistrationUser() {


    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
    } = useForm({
        mode: "onBlur"
    })

    let navigate = useNavigate()

    const [confirmPassword, setConfirmPassword] = useState('')
    const [responseError, setResponseError] = useState('')

    const [user, setUser] = useState({
        username: "",
        password: "",
        email: ""
    })

    const { username, password, email } = user

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        await axios.post(`http://localhost:8080/api/auth/signup`, user).then(reponse=>
        navigate("/")
        ).catch(error=>{
            setResponseError('Возможно пользователь с таким именем/почтой уже есть!')
        })
    }

    return (
        <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full space-y-8">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto h-12 w-auto">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                    <h1 class="mt-6 text-center text-3xl font-extrabold text-gray-600">
                        EDMS
                    </h1>
                    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Регистрация аккаунта
                    </h2>
                </div>
                <div>
                            {responseError && <div class="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                {responseError}
                            </div>}
                        </div>
                <form class="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" name="remember" value="True" />
                    <div class="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="username" class="sr-only">Имя пользователя</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autocomplete="text"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Имя пользователя"
                                {...register('username', {
                                    required: "Имя пользователя обязательное поле",
                                    pattern:{
                                        value:/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
                                        message:'Имя пользователя некорректно!От 8 до 20 символов.Пробелы должны отсутствовать'
                                    }

                                })}
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />

                        </div>
                        <div>
                            <label for="password" class="sr-only">Пароль</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autocomplete="current-password"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Пароль"
                                {...register('password', {
                                    required: "Пароль обязательное поле",

                                })}
                                value={password}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div>
                            <label for="passwordConfirm" class="sr-only">Повтор пароля</label>
                            <input
                                id="passwordConfirm"
                                name="passwordConfirm"
                                type="password"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Повтор пароля"
                                {...register('confirmPassword', {
                                    required: "Повторите пароль!",
                                    validate: value => value === password || "Пароли не совпадают!"

                                })}
                                value={confirmPassword}
                                onInput={e => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label for="email" class="sr-only">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-m focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email"
                                {...register('email', {
                                    required: "Почта обязательное поле",
                                    pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: "Не соответствует образцу - example@abx.com"
                                    }

                                })}
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div>
                            {errors?.username && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                {errors?.username?.message}
                            </div>}
                        </div>
                        <div>
                            {errors?.password && <div class="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                {errors?.password?.message}
                            </div>}
                        </div>
                        <div>
                            {errors?.confirmPassword && <div class="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                {errors?.confirmPassword?.message}
                            </div>}
                        </div>
                        <div>
                            {errors?.email && <div class="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                {errors?.email?.message}
                            </div>}
                        </div>
                    </div>
                    <div>
                        <button onClick={() => { location.href = "/" }} type="button" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                            </span>
                            Авторизоваться
                        </button>
                    </div>
                    <div>
                        <button type="submit" disabled={!isValid} class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </span>
                            Зарегестрироваться
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )


}

