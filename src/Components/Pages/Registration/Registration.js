import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFirebase from './../../Hooks/useFirebase';

const Registration = () => {
    const [regData, setRegData] = useState({});
    const { registerUser } = useFirebase();
    const navigate = useNavigate();

    const getData = (even) =>{
        const name = even.target.name;
        const value = even.target.value;
        setRegData({...regData, [name]: value})
    }
    const handleSubmit = (even)=>{
        even.preventDefault()
        console.log( regData )
        registerUser( `${regData.fName} ${regData.sName}`, regData.email, regData.password, navigate)
    }
    
    return (
        <div>
            <h1 className='text-2xl' >Registration Form </h1>

            <div className='flex justify-center p-6' >
                <form className="w-full max-w-lg " onSubmit={(e)=>{handleSubmit(e)}}>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">First Name</label>
                        <input onChange={(even)=>{getData(even)}} name='fName' required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                        <label className="block text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">Last Name</label>
                        <input onChange={(even)=>{getData(even)}} name='sName' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                        <label className="block text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">Email</label>
                        <input onChange={(even)=>{getData(even)}} name='email' required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="example@gmail.com" />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                        <label className="block text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">Password</label>
                        <input onChange={(even)=>{getData(even)}} name='password' required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="**********" />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-2">

                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">City</label>
                            <input onChange={(even)=>{getData(even)}} name='city' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Ex: Dhaka" />
                        </div>

                        <div className="w-full text-left md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-country">Country</label>
                            <input onChange={(even)=>{getData(even)}} name='country' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-country" type="text" placeholder="Ex: Bangladesh" />
                        </div>

                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">Zip</label>
                            <input onChange={(even)=>{getData(even)}} name='zip' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" />
                        </div>
                    </div>
                    
                    <button className='border-2 w-full mt-3 rounded bg-violet-700 hover:bg-indigo-900 transition-all duration-300 ease-in-out p-2 text-white '>Register</button>
                </form>
            </div>
        </div>
    );
};

export default Registration;