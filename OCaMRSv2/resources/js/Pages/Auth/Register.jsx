import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextInput2 from "@/Components/TextInput2";
import LoginButton from "@/Components/LoginButton";
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div>
        <div class="split left">
            <div class="centered"></div>
            <div class="half login-imageHolder"></div>
        </div>

        <div class="split2 right2">  </div>
        <div class="split3 right">

            <div class="centered2">
                <form onSubmit={submit}>
                <div>
                <h1 className="text-center titleLogin mb-3">Register</h1>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput2
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2 text-danger" />
                </div>


                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput2
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2 text-danger" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput2
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2 text-danger" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput2
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2 text-danger" />
                </div>

            
                        
                    <div className="checkbox-container mt-3 mb-4">
                        <div className="">
                            {/*
                                <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData("remember", e.target.checked)}
                            />
                            <span className="remember-me-text">Remember me</span>
                            */}

                           
                            
                        </div>

                        <div className="">
                       
                      
                        </div>
                       
                       
                    </div>

                    
                        
                           
                     
                            <LoginButton classname="w-100" disabled={processing}>
                                Register
                        </LoginButton>    
                  
                       
                            
                       
                      
                   
                </form>
            </div>
        </div>
    </div>
    );
}
