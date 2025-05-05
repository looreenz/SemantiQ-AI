<?php

namespace App\Http\Controllers;

use App\Models\Chunk;

class ChunkController extends Controller
{
    // Returns a list of all chunks in the database
    public function index()
    {
        return response()->json(Chunk::all());
    }

    // Returns a specific chunk by its ID
    public function show($id)
    {
        $chunk = Chunk::find($id); // Search the chunk using its primary key
        return response()->json($chunk); // Return the result as JSON
    }
}
