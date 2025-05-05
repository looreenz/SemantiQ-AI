<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ChunkController;
use App\Http\Controllers\LLMController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;

// Group all routes under the "v1" prefix (versioning for API routes)
Route::prefix('v1')->group(function () {
    // Routes for authentication
    Route::post('/register', [AuthController::class, 'register']); // Register a new user
    Route::post('/login', [AuthController::class, 'login']); // User login
    Route::post('/logout', [AuthController::class, 'logout']); // User logout


    // Protected routes that require Sanctum authentication middleware
    Route::middleware('auth:sanctum')->group(function () {
        // Retrieve the currently authenticated user
        Route::get('/user', [AuthController::class, 'user']);

        // Routes related to documents
        Route::get('/documents', [FileController::class, 'index']); // List all documents
        Route::get('/documents/{id}', [FileController::class, 'getFilesByUserId']); // Get documents by user ID
        Route::get('/documents/show/{id}', [FileController::class, 'show']); // Show a specific document
        Route::post('/documents/upload', [FileController::class, 'upload']); // Upload a new document
        Route::delete('/documents/delete/{id}', [FileController::class, 'delete']); // Delete a document

        // Routes related to chunks (text parts from documents)
        Route::get('/chunks', [ChunkController::class, 'index']); // List all chunks
        Route::get('/chunks/{id}', [ChunkController::class, 'show']); // Show a specific chunk
        Route::post('/get-chunks', [LLMController::class, 'findRelevantChunks']); // Get relevant chunks based on a question

        // Routes related to messages
        Route::get('/messages', [MessageController::class, 'index']); // List all messages
        Route::get('/messages/{id}', [MessageController::class, 'getMessagesByUserId']); // Get messages by user ID
        Route::post('/messages', [MessageController::class, 'store']); // Store new messages

        // Additional routes for message history and chat
        Route::delete('/history/delete/{date}', [MessageController::class, 'deleteByDate']); // Delete messages by date
        Route::post('/ask', [ChatController::class, 'ask']); // Handle chat questions
    });
});
