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
    public function register(Request $request)
    {
        $credentials = $request->validate([
            'id' => 'required|uuid',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        // Verifica si el usuario ya existe
        $user = User::where('email', $credentials['email'])->first();

        if (!$user) {
            $user = User::create([
                'id' => $credentials['id'],
                'name' => $credentials['name'],
                'email' => $credentials['email'],
                'password' => Hash::make($credentials['password']),
            ]);

            Auth::login($user);
            $request->session()->regenerate();

            return response()->json($user, 200);
        } else {
            return response()->json(['message' => 'User already exists'], 400);
        }
    }

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function googleCallback()
    {
        $googleUser = Socialite::driver('google')->user();

        // Buscar usuario por email
        $user = User::where('email', $googleUser->getEmail())->first();

        // Si no existe, lo creamos
        if (!$user) {
            $user = User::create([
                'id' => Str::uuid()->toString(), // Generar UUID v7
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'password' => Hash::make(Str::random(16)), // No se usa, pero es necesario
            ]);
        }

        // Autenticamos al usuario en Laravel Sanctum
        Auth::login($user);
        request()->session()->regenerate();

        return response()->json($user, 200);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        // Intenta hacer login
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json(Auth::user(), 200);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out']);
    }

    public function user(Request $request)
    {
        return response()->json(Auth::user());
    }
}