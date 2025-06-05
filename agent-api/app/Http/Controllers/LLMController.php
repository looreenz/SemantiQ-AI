<?php

namespace App\Http\Controllers;

use App\Models\Chunk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LLMController extends Controller
{
    // Find the most relevant chunks of text based on a user's question
    public function findRelevantChunks(Request $request)
    {
        // Validate that the 'question' field is provided and is a string
        $request->validate([
            'question' => 'required|string',
            'user_id' => 'required|uuid',
        ]);

        $question = $request->input('question');
        $userId = $request->input('user_id');

        // Perform a full-text search using MySQL's MATCH...AGAINST
        $relevantChunks = DB::table('chunks')
            ->join('files', 'chunks.file_id', '=', 'files.id')
            ->where('files.user_id', $userId)
            ->whereRaw("MATCH(chunks.content) AGAINST(? IN NATURAL LANGUAGE MODE)", [$question])
            ->select('chunks.content')
            ->limit(5)
            ->pluck('content');

        // Return the relevant chunks as JSON
        return response()->json(['relevantChunks' => $relevantChunks], 200);
    }
}
