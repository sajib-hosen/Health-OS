import React, { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useFirebase from './../../Hooks/useFirebase';
import bgImg from './../../images/californian_hills_scenery.jpg';
import logo from './../../images/2983787.png';

const LogIn = () => {
    const { googleSignIn, facebookSignIn, loginWithPassword, resetPassword } = useFirebase();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = () =>{
        loginWithPassword(emailRef.current.value, passwordRef.current.value, navigate, location ) // login user
        emailRef.current.value = '';
        passwordRef.current.value='';
    }

    const resPassword = () =>{
        resetPassword(emailRef.current.value)
    }

    return (
        <div className='flex w-full' >
            <div style={{backgroundImage: `url(${ bgImg })`, backgroundRepeat: "no-repeat", backgroundSize:"cover"}} className='w-full h-screen flex justify-center sm:justify-end items-center border-red-500 '>
                {/* <div className='border-4 border-purple-400 w-16 h-16 absolute top-20 left-32'> </div>
                <div className='w-32 absolute bottom-44 left-64' >
                    <img src="https://raw.githubusercontent.com/sajib-hosen/pioneer-alpha-login/main/src/Components/images/mobile.png" alt="" />
                </div>
                <div className='w-20 absolute bottom-5 left-24' >
                    <img src="https://raw.githubusercontent.com/sajib-hosen/pioneer-alpha-login/main/src/Components/images/man.png" alt="man" />
                </div> */}


                <div className=' bg-black bg-opacity-50 text-white max-w-sm sm:w-[300px] h-[460px] sm:mr-20 drop-shadow-lg rounded shadow-2xl '>
                    
                    <div className='' >


                        {/* logo ----------------------------------------------------------------- */}
                        <div className='flex justify-center items-center border-b mx-10' >
                            <div className='border-2 border-white rounded-full mt-3 mb-2'>
                                <div className='w-[30px]' >
                                    <img src={logo} alt="logo" />
                                </div>
                            </div>
                        </div>


                        {/* form and button ------------------------------------------------------ */}
                        <div>
                            <p className=' mt-2 font-thin text-white '>Let's Explore The World !!</p>

                            <input ref={emailRef} required className=' p-2 rounded w-[90%] mt-5 text-black' type="text" name="email" placeholder='Email Address' />
                            <input ref={passwordRef} required className='p-2 w-[90%] rounded mt-5 text-black' type="password" name="password" placeholder='Password' />
                            <div className='w-[90%] mt-3 text-right mx-auto'>
                                <span onClick={resPassword} className='text-red-500 '>Forget Password?</span>
                            </div>
                            <button onClick={handleLogin} className='w-[90%] p-2 mt-4 rounded bg-indigo-800 text-white hover:bg-purple-900 transition-all duration-300 ease-in-out ' >Log In</button>
                        </div>

                        {/* or design ----------------------------------------------------------- */}
                        <div className='flex justify-around w-60 mx-auto mt-4' >
                            <div className='w-full'>
                                <div className='border-b-2 border-white h-3/5' ></div>
                            </div>
                            <p className='flex justify-center items-center mx-2'>or</p>
                            <div className='w-full'>
                                <div className='border-b-2 border-white h-3/5' ></div>
                            </div>
                        </div>

                        {/* login with facebook and google -----------------------------------  */}
                        <div className='flex justify-around mx-auto mt-2 w-[80%]'>
                            {/* facebook login  */}
                            <div onClick={()=>{ facebookSignIn( navigate ) }} className='w-10 rounded-full overflow-hidden '>
                                <img src="https://e7.pngegg.com/pngimages/203/864/png-clipart-computer-icons-graphics-facebook-social-media-facebook-blue-text-thumbnail.png" alt="facebook login" />
                            </div>
                            {/* google login  */}
                            <div onClick={()=>{  googleSignIn( navigate) }} className='w-10 rounded-full overflow-hidden '>
                                <img src="https://www.clipartmax.com/png/full/219-2197783_training-documents-google-logo-icon-png.png" alt="google login" />
                            </div>
                        </div>
                        {/* Sign Up Text ------------------------------------------------------ */}
                        <div className=' mt-5' >
                            <p>Don't have an account? <Link to='/reg' ><span className='text-teal-400'>Sign Up</span></Link></p>
                        </div>


                    </div>
                </div>
            </div>
            {/* <div className='border-2  h-screen '>
                <h1></h1>
            </div> */}
        </div>
    );
};

export default LogIn;