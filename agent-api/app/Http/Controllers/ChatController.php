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
            'context' => 'array'
        ]);

        $context = implode("\n", $request->context);

        $prompt = "
    Si la pregunta contiene un saludo (como 'Hola', 'Buenos días', 'Qué tal', 'Buenas tardes') o una despedida (como 'Adiós', 'Hasta luego', 'Nos vemos'), 
    responde apropiadamente con un saludo o despedida. 
    Basándote en el contexto proporcionado, responde directamente a la pregunta con la respuesta completa. 
    Si el contexto no es relevante o no contiene información suficiente, responde claramente: \"No puedo encontrar una respuesta en el contenido disponible.\" \n
    Contexto: {$context}\n
    Pregunta: {$request->question}";

        // Inicialización
        $data = [];
        $source = $request->model;
        $content = '';
        $reasoning = null;

        // Obtener la respuesta
        switch ($source) {
            case 'local':
                $data = $this->askLocal($prompt);
                if (!isset($data['error'])) {
                    [$reasoning, $content] = $this->extractReasoningAndResponse($data['response']);
                }
                break;

            case 'gpt':
                $data = $this->askGpt($prompt);
                if (!isset($data['error'])) {
                    $content = $data['choices'][0]['message']['content'];
                }
                break;

            default:
                return response()->json(['error' => 'Modelo no reconocido'], 400);
        }

        // Si hay error, responderlo
        if (isset($data['error'])) {
            return response()->json(['error' => $data['error']], 500);
        }

        // Si todo fue bien, devolver en formato unificado
        return response()->json([
            'content' => $content,
            'reasoning' => $reasoning,
            'source' => $source
        ]);
    }

    public function askGpt($prompt)
    {
        $OPENAI_API_KEY = env('OPENAI_API_KEY');

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
                ]);

                return ['error' => 'Error al consultar ChatGPT'];
            }

            return $response->json(); // ← Devuelve solo array
        } catch (\Exception $e) {
            \Log::error('Error en la solicitud a OpenAI:', [
                'message' => $e->getMessage(),
                'stack' => $e->getTraceAsString(),
            ]);

            return ['error' => 'Excepción al consultar OpenAI'];
        }
    }

    public function askLocal($prompt)
    {
        try {
            $response = Http::timeout(3600)->post('http://linux:11434/api/generate', [
                'model' => 'deepseek-r1',
                'prompt' => $prompt,
                'stream' => false
            ]);

            if ($response->failed()) {
                \Log::error('Ollama API Error:', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return ['error' => 'Error al consultar DeepSeek'];
            }

            return $response->json(); // ← Devuelve solo array
        } catch (\Exception $e) {
            \Log::error('Error en la solicitud a Ollama:', [
                'message' => $e->getMessage(),
                'stack' => $e->getTraceAsString(),
            ]);

            return ['error' => 'Excepción al consultar Ollama'];
        }
    }

    private function extractReasoningAndResponse($text)
    {
        $reasoning = null;

        if (preg_match('/<think>(.*?)<\/think>/s', $text, $matches)) {
            $reasoning = trim($matches[1]);
            // Quitamos el <think>...</think> del texto
            $text = preg_replace('/<think>.*?<\/think>/s', '', $text);
        }

        return [trim($reasoning), trim($text)];
    }

}
