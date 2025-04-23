<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chunk;

class IntentionController extends Controller
{
    public function analyzeIntention($question)
    {
        $patterns = $this->getIntentionPatterns();

        foreach ($patterns as $intention => $pattern) {
            if (preg_match($pattern, $question)) {
                return $intention;
            }
        }

        return null;
    }

    private function getIntentionPatterns()
    {
        return [
            'resumen' => '/(resumen|resúmeme|hazme un resumen|cuéntame de qué trata|qué es el contenido de)/i',
            'comparar' => '/(compara|diferencias entre|cómo se comparan)/i'
        ];
    }
}
