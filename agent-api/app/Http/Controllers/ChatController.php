<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{

    public function ask(Request $request)
    {
        $request->validate([
            'model' => 'required|string',
            'question' => 'required|string',
            'context' => 'required'
        ]);

        switch ($request->model) {
            case 'local':
                $this->askLocal($request->context, $request->question);
                break;
            case 'gpt':
                $data = $this->askGpt($request->context, $request->question);
                return response()->json($data['choices'][0]['message']);
        }
    }

    public function askGpt($context, $question)
    {

        $OPENAI_API_KEY = env('OPENAI_API_KEY');
        $context = implode("\n", $context);

        $prompt = "
            Si la pregunta contiene un saludo (como 'Hola', 'Buenos días', 'Qué tal', 'Buenas tardes') o una despedida (como 'Adiós', 'Hasta luego', 'Nos vemos'), 
            responde apropiadamente con un saludo o despedida. 
            Basándote en el contexto proporcionado, responde directamente a la pregunta con la respuesta completa. 
            Si el contexto no es relevante o no contiene información suficiente, responde claramente: \"No puedo encontrar una respuesta en el contenido disponible.\" \n
            Contexto: {$context}\n
            Pregunta: {$question}";

        try {
            $response = Http::withToken($OPENAI_API_KEY)->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-4o-mini',
                'messages' => [
                    ['role' => 'system', 'content' => 'Eres un asistente útil que responde usando el contexto.'],
                    ['role' => 'user', 'content' => $prompt],
                ],
            ]);

            if ($response->failed()) {
                \Log::error('ChatGPT API Error:', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                    'request_url' => $response->effectiveUri(),
                    'request_data' => $response->body(),
                ]);

                return response()->json([
                    'error' => 'Error al consultar ChatGPT',
                    'status' => $response->status(),
                    'details' => $response->body(),
                ], 500);
            }

            $data = $response->json();
            return $data;
        } catch (\Exception $e) {
            \Log::error('Error en la solicitud a la API de OpenAI:', [
                'message' => $e->getMessage(),
                'stack' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'error' => 'Error al realizar la solicitud a la API de OpenAI.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }

    public function askLocal($context, $question)
    {
        return 0;
    }
}
