import React from 'react';
import LoginHeader from '../../components/Login/LoginHeader';
import LoginForm from '../../components/Login/LoginForm';
import GoogleLoginButton from '../../components/Login/GoogleLoginButton';
import FacebookLogin from '../../components/Login/FacebookLogin';

const Login = () => {
    return (
        <section className="bg-white w-screen h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-screen h-screen">
                <LoginHeader />
                <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                    <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Đăng Nhập</h2>
                        <p className="mt-2 text-base text-gray-600">
                            Bạn chưa có tài khoản?{" "}
                            <a className="text-blue-600 hover:text-blue-700" href="/">
                                Đăng ký ngay!
                            </a>
                        </p>
                        <LoginForm />
                        <GoogleLoginButton />
                        <FacebookLogin />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
