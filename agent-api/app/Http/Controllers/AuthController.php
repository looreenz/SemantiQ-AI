<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    // Handles user registration
    public function register(Request $request)
    {
        // Validate incoming request data
        $credentials = $request->validate([
            'id' => 'required|uuid',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        // Check if a user with the given email already exists
        $user = User::where('email', $credentials['email'])->first();

        if (!$user) {
            // If not, create a new user
            $user = User::create([
                'id' => $credentials['id'],
                'name' => $credentials['name'],
                'email' => $credentials['email'],
                'password' => Hash::make($credentials['password']), // Hash the password
            ]);

            // Log in the newly created user
            Auth::login($user);
            $request->session()->regenerate(); // Prevent session fixation

            return response()->json($user, 200);
        } else {
            // User already exists
            return response()->json(['message' => 'User already exists'], 400);
        }
    }

    // Redirects the user to the Google login page
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    // Handles the callback after Google authentication
    public function googleCallback()
    {
        $googleUser = Socialite::driver('google')->user();

        // Look up user by email
        $user = User::where('email', $googleUser->getEmail())->first();

        // If user does not exist, create a new one using Google data
        if (!$user) {
            $user = User::create([
                'id' => Str::uuid()->toString(),
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'avatar' => $googleUser->getAvatar(),
                'password' => Hash::make(Str::random(16)), // Generate a random hashed password
            ]);
        }

        // Log the user in and regenerate the session
        Auth::login($user);
        request()->session()->regenerate();

        // Redirect to frontend after successful login
        return redirect()->away("http://localhost:5173/login-success");
    }

    // Handles user login with email and password
    public function login(Request $request)
    {
        // Validate credentials
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        // Attempt to log the user in
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate(); // Regenerate session to prevent fixation
            return response()->json(Auth::user(), 200);
        }

        // Return unauthorized response if login fails
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // Logs out the authenticated user
    public function logout(Request $request)
    {
        Auth::guard('web')->logout(); // Log out the user
        $request->session()->invalidate(); // Invalidate session
        $request->session()->regenerateToken(); // Regenerate CSRF token

        return response()->json(['message' => 'Logged out']);
    }

    // Returns the currently authenticated user
    public function user(Request $request)
    {
        return response()->json(Auth::user());
    }
}
