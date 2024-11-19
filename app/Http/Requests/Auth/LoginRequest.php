<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class LoginRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'employeeID' => ['required', 'string'],
            'password' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'employeeID.required' => 'Employee ID is required.',
            'employeeID.string' => 'Invalid User ID.',
            'password.required' => 'Password is required.',
            'password.string' => 'Invalid password format.',
        ];
    }
}
