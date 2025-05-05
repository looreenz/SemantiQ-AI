<?php

namespace App\Http\Controllers;

use App\Models\Chunk;
use Illuminate\Http\Request;

class LLMController extends Controller
{
    // Find the most relevant chunks of text based on a user's question
    public function findRelevantChunks(Request $request)
    {
        // Validate that the 'question' field is provided and is a string
        $request->validate([
            'question' => 'required|string'
        ]);

        $question = $request->input('question');

        // Perform a full-text search using MySQL's MATCH...AGAINST
        $relevantChunks = Chunk::select('content')
            ->whereRaw("MATCH(content) AGAINST(? IN NATURAL LANGUAGE MODE)", [$question])
            ->limit(5) // Limit to top 5 relevant chunks
            ->pluck('content'); // Retrieve only the 'content' field

        // Return the relevant chunks as JSON
        return response()->json(['relevantChunks' => $relevantChunks], 200);
    }
}
