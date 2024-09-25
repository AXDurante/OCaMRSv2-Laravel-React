import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextInput2 from "@/Components/TextInput2";
import LoginButton from "@/Components/LoginButton";
import PhoneNumberInput from '@/Components/PhoneNumberInput';

import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password_confirmation: '',
        employeeID: '',
        phoneNumber: '',
        college: '',
        labLoc: '',
    });

    const [switchForm, setSwitchForm] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    const nextForm = () => {
        if (switchForm === 3) {
            // Show errors if any fields are invalid
            setSubmitted(true);
        }
        setSwitchForm(switchForm + 1);
    };

    const previousForm = () => {
        setSwitchForm(switchForm - 1);
    };

    const submit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div>
            <div className="split left">
                <div className="centered"></div>
                <div className="half login-imageHolder"></div>
            </div>

            <div className="split2 right2"></div>
            <div className="split3 right">
                <div className="centered2">
                    <form onSubmit={submit}>
                        <h1 className="text-center titleLogin mb-3">Register</h1>

                        {switchForm === 1 && (
                            <div>
                                <div>
                                    <InputLabel htmlFor="firstName" value="First Name" />
                                    <TextInput2
                                        id="firstName"
                                        name="firstName"
                                        value={data.firstName}
                                        className="mt-1 block w-full"
                                        autoComplete="firstName"
                                        isFocused={true}
                                        onChange={(e) => setData('firstName', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.firstName} className="mt-2 text-danger" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="lastName" value="Last Name" />
                                    <TextInput2
                                        id="lastName"
                                        name="lastName"
                                        value={data.lastName}
                                        className="mt-1 block w-full"
                                        autoComplete="lastName"
                                        isFocused={true}
                                        onChange={(e) => setData('lastName', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.lastName} className="mt-2 text-danger" />
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
                                    <InputLabel htmlFor="phoneNumber" value="Phone Number" />
                                    <PhoneNumberInput
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="tel"
                                        value={data.phoneNumber}
                                        autoComplete="tel"
                                        isFocused={true}
                                        onChange={(e) => {
                                            const filteredValue = e.target.value.replace(/[^0-9]/g, '');
                                            setData('phoneNumber', filteredValue);
                                        }}
                                        required
                                        pattern="[0-9]{10}"
                                    />
                                    <InputError message={errors.phoneNumber} className="mt-2 text-danger" />
                                </div>

                                <div className='d-flex justify-content-end my-5 '>
                                    <Link className="theButton2 buttonColor1 theButtonMG" href={route('loginHome')}>
                                        Back
                                    </Link>
                                    <button onClick={() => nextForm()} className="theButton2 buttonColor2 theButtonMG">
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {switchForm === 2 && (
                            <div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="college" value="College" />
                                    <select
                                        id="college"
                                        name="college"
                                        value={data.college}
                                        className="optionBox w-100"
                                        onChange={(e) => setData('college', e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select your department/faculty</option>
                                        <option value="Engineering"> Faculty of Engineering </option>
                                        <option value="Education"> College of Education </option>
                                        <option value="Pharmacy"> Faculty of Pharmacy </option>
                                        <option value="Biochemistry"> Faculty of Biochemistry </option>
                                        <option value="Medicine Technology"> Faculty of Medicine Technology </option>
                                        <option value="Nursing"> College of Nursing </option>
                                        <option value="Rehabilitation Science"> College of Rehabilitation Science </option>
                                        <option value="Biology"> College of Biology </option>
                                        <option value="Physics"> College of Physics </option>
                                        <option value="Physiology"> Faculty of Physiology </option>
                                        <option value="Pharmacology"> Faculty of Pharmacology </option>
                                        <option value="Graduate School"> UST Graduate School </option>
                                        <option value="Junior HS"> Junior High School </option>
                                        <option value="Senior HS"> Senior High School </option>
                                        <option value="RCNAS"> RCNAS </option>
                                        <option value="LESO"> LESO </option>
                                      
                                    </select>
                                    <InputError message={errors.college} className="mt-2 text-danger" />
                                </div>

                                <div className='mt-4'>
                                    <InputLabel htmlFor="labLoc" value="Lab Location" />
                                    <TextInput2
                                        id="labLoc"
                                        name="labLoc"
                                        value={data.labLoc}
                                        className="mt-1 block w-full"
                                        autoComplete="labLoc"
                                        isFocused={true}
                                        onChange={(e) => setData('labLoc', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.labLoc} className="mt-2 text-danger" />
                                </div>

                                

                                <div className='d-flex justify-content-end my-5 '>
                                    <button className="theButton2 buttonColor1 " onClick={() => previousForm()} >
                                        Back
                                    </button>
                                    <button onClick={() => nextForm()} className="theButton2 buttonColor2 theButtonMG">
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {switchForm === 3 && (
                            <div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="employeeID" value="ID Number" />
                                    <TextInput2
                                        id="employeeID"
                                        name="employeeID"
                                        value={data.employeeID}
                                        className="mt-1 block w-full"
                                        autoComplete="employeeID"
                                        isFocused={true}
                                        onChange={(e) => setData('employeeID', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.employeeID} className="mt-2 text-danger" />
                                </div>

                                <div className='mt-4'>
                                    <div className='d-flex align-items-center'>
                                        <InputLabel htmlFor="password" value="Password" />
                                        <small className='mb-0 ml-2 mx-2 text-danger'>  (1 uppercase letter, 1 number, and 1 special character required.)</small> 
                                    </div>
                                   
                                    
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

                                {submitted && Object.keys(errors).length > 0 && (
                                    <div className="mt-4">
                                        <InputError message="Some input fields are incorrect, kindly check the current or previous pages." className="text-danger" />
                                    </div>
                                )}


                                <div className='d-flex justify-content-center mt-5 '>
                                    <button className="theButton2 buttonColor1 w-100" onClick={() => previousForm()}>
                                        Back
                                    </button>
                                  
                                </div>

                                <div className='d-flex justify-content-center my-4 '>
                                    <LoginButton className="theButton2 buttonColor2  w-100" processing={processing}>
                                        Register
                                    </LoginButton>
                                  
                                </div>

                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
