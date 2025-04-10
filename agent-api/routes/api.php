<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ChunkController;
use App\Http\Controllers\LLMController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;

Route::prefix('v1')->group(function () {
    // Rutas para autenticación
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Rutas protegidas por Sanctum
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', [AuthController::class, 'user']);

        Route::get('/documents', [FileController::class, 'index']);
        Route::get('/documents/{id}', [FileController::class, 'getFilesByUserId']);
        Route::get('/documents/show/{id}', [FileController::class, 'show']);
        Route::post('/documents/upload', [FileController::class, 'upload']);
        Route::delete('/documents/delete/{id}', [FileController::class, 'delete']);
    
        Route::get('/chunks', [ChunkController::class, 'index']);
        Route::get('/chunks/{id}', [ChunkController::class, 'show']);
        Route::post('/get-chunks', [LLMController::class, 'findRelevantChunks']);
    
        Route::get('/messages', [MessageController::class, 'index']);
        Route::get('/messages/{id}', [MessageController::class, 'getMessagesByUserId']);
        Route::post('/messages', [MessageController::class, 'store']);
    
        Route::delete('/history/delete/{date}', [MessageController::class, 'deleteByDate']);
    
        Route::post('/chatgpt', [ChatController::class, 'askGpt']);
    });
});