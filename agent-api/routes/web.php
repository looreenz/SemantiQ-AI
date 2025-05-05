<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Define the home route and load routes from routes.json into the view
Route::get('/', function () {
    // Read routes from the 'routes.json' file and decode it into an array
    $routes = json_decode(file_get_contents(resource_path('routes.json')), true);

    // Return the home view and pass the routes data to it
    return view('home', compact('routes'));
});

// Group routes that require web middleware (session handling, CSRF protection, etc.)
Route::middleware('web')->group(function () {
    // Google authentication redirect route
    Route::get('/auth/google/redirect', [AuthController::class, 'redirectToGoogle']);

    // Google authentication callback route
    Route::get('/auth/google/callback', [AuthController::class, 'googleCallback']);
});

// Group API routes under the 'api' prefix (typically for RESTful APIs)
Route::prefix('api')->group(base_path('routes/api.php'));
