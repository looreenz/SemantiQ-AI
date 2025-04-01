<?php

namespace App\Http\Controllers;

use App\Models\Chunk;
use Illuminate\Http\Request;

class LLMController extends Controller
{
    public function findRelevantChunks(Request $request)
    {
        $request->validate([
            'question' => 'required|string'
        ]);

        $question = $request->input('question');

        $relevantChunks = Chunk::select('content')
            ->whereRaw("MATCH(content) AGAINST(? IN NATURAL LANGUAGE MODE)", [$question])
            ->limit(5)
            ->pluck('content');

        return response()->json(['relevantChunks' => $relevantChunks], 200);
    }
}
