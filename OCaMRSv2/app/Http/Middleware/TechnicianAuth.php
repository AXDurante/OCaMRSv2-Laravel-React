<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class TechnicianAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Check if the user is authenticated as a technician
        if (!auth()->guard('technician')->check()) {
            return redirect()->route('technician.login'); // Redirect to the login page if not authenticated
        }

        return $next($request);
    }
}
