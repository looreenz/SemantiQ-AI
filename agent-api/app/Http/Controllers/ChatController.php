<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function askGpt(Request $request)
    {
        $request->validate([
            'question' => 'required|string',
            'context' => 'required|string',
            'user_id' => 'required|uuid'
        ]);

        $prompt = "Basandote en el contexto contesta la pregunta. Si el contexto no es relevante o no contiene información suficiente, responde claramente: \"No puedo encontrar una respuesta en el contenido disponible.\" \nContexto: {$request->context}\nPregunta: {$request->question}";

        $response = Http::withToken(env('OPENAI_API_KEY'))->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4o-mini',
            'messages' => [
                ['role' => 'system', 'content' => 'Eres un asistente útil que responde usando el contexto.'],
                ['role' => 'user', 'content' => $prompt],
            ],
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Error al consultar ChatGPT'], 500);
        }

        $data = $response->json();
        return response()->json($data['choices'][0]['message']);
    }
}
