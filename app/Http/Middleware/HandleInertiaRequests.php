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
        return array_merge(parent::share($request), [
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
            // Add this to explicitly share errors with the frontend
            'errors' => function () use ($request) {
                return $request->session()->get('errors')
                    ? $request->session()->get('errors')->getBag('default')->getMessages()
                    : (object) [];
            },
            // Add flash messages if you need them
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ]);
    }
}
