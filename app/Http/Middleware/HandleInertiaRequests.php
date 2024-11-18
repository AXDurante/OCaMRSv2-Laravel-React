<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'firstName' => $request->user()->firstName,
                    'lastName' => $request->user()->lastName,
                    'email' => $request->user()->email,
                    'phoneNumber' => $request->user()->phoneNumber,
                    'role' => $request->user()->role,
                    'college' => $request->user()->college,
                    'photo' => $request->user()->photo,
                    'employeeID' => $request->user()->employeeID,
                    'labLoc' => $request->user()->labLoc,
                    'position' => $request->user()->position,
                ] : null,
            ],
            // ... other shared data
        ];
    }
}
