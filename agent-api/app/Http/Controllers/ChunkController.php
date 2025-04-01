<?php

namespace App\Http\Controllers;

use App\Models\Chunk;

class ChunkController extends Controller
{
    public function index()
    {
        return response()->json(Chunk::all());
    }

    public function show($id) {
        $chunk = Chunk::find($id);
        return response()->json($chunk);
    }
}
