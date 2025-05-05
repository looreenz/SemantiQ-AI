<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chunk;

class IntentionController extends Controller
{
    // Analyze the user's question to detect their intention
    public function analyzeIntention($question)
    {
        // Retrieve predefined patterns for each intention
        $patterns = $this->getIntentionPatterns();

        // Iterate over each pattern and check if it matches the question
        foreach ($patterns as $intention => $pattern) {
            if (preg_match($pattern, $question)) {
                return $intention; // Return the matching intention
            }
        }

        // If no pattern matches, return null
        return null;
    }

    // Define regex patterns for different types of user intentions
    private function getIntentionPatterns()
    {
        return [
            // Intention: summarize content
            'resumen' => '/(resumen|resúmeme|hazme un resumen|cuéntame de qué trata|qué es el contenido de)/i',

            // Intention: compare concepts
            'comparar' => '/(compara|diferencias entre|cómo se comparan)/i'
        ];
    }
}
