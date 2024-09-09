import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextInput2 from '@/Components/TextInput2';
import LoginButton from '@/Components/LoginButton';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('technician.password.store'), {
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
                        <h1 className="text-center titleLogin mb-5">Technician Reset Password</h1>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput2
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            
                            autoComplete="email"
                            isFocused={true}
                            disabled={true}
                            onChange={(e) =>
                                setData("email", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.email}
                            className="mt-2 text-danger"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput2
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2 text-danger"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                        <TextInput2
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2 text-danger"
                        />
                    </div>

            
                        


        
                           
                        <div className="pt-3">
                            <LoginButton classname="w-100">
                                    Reset Password
                            </LoginButton>    
                        </div>
                       
                            
                       
                      
                   
                </form>
            </div>
        </div>
    </div>
    );
}
