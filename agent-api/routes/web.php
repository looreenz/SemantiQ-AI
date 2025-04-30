<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    $routes = json_decode(file_get_contents(resource_path('routes.json')), true);
    return view('home', compact('routes'));
});

Route::middleware('web')->group(function () {
    Route::get('/auth/google/redirect', [AuthController::class, 'redirectToGoogle']);
    Route::get('/auth/google/callback', [AuthController::class, 'googleCallback']);
});

Route::prefix('api')->group(base_path('routes/api.php'));