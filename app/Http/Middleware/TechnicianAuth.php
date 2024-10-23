<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        if (Auth::guard('technicians')->check()) {
            return redirect()->route('technician.dashboard'); // Redirect technicians to their dashboard
        } elseif (Auth::guard('web')->check()) {
            return redirect()->route('dashboard');
        } elseif (Auth::guard('admin')->check()) {
            return redirect()->route('admin.home');
        }

        // If not authenticated, allow the request to proceed
        return $next($request);
    }
}
