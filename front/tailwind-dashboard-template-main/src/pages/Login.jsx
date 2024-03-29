import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
export default function LoginUser() {

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

    const [user, setUser] = useState({
        password: "",
        username: ""
    })

    const { password, username } = user
    const [errorResponse, setErrorResponse] = useState('')
    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        await axios.post(`http://localhost:8080/api/auth/signin`, user)
            .then(response => {
                let userInfo = JSON.stringify(response.data);
                localStorage.setItem('userInfo', userInfo);
                navigate("/main")
            }).catch(error => {
                switch (error.response.status) {
                    case 401:
                        setErrorResponse('Неверно введены логин/пароль')
                        break;
                    default:
                        break;
                }
            })
    }


    return (<>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-auto h-12 w-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                    <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-600">
                        EDMS
                    </h1>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Вход в аккаунт
                    </h2>
                </div>
                <div>
                    {errorResponse && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                        {errorResponse}
                    </div>}
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" name="remember" value="True" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Имя пользователя</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="text"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Имя пользователя"
                                required
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />

                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Пароль</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Пароль"
                                required
                                value={password}
                                onChange={(e) => onInputChange(e)}
                            />
                            <div>
                                {errors?.username && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                    {errors?.username?.message}
                                </div>}
                            </div>
                            <div>
                                {errors?.password && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                    {errors?.password?.message}
                                </div>}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center"></div>
                        <div className="text-sm">
                            <a href="/registration" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Создать аккаунт
                            </a>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                            </span>
                            Войти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}