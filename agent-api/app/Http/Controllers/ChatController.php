<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{

    // Main method to handle incoming chat questions
    public function ask(Request $request)
    {
        // Validate input request
        $request->validate([
            'model' => 'required|string',
            'question' => 'required|string',
            'context' => 'array'
        ]);

        // Join the context array into a single string
        $context = implode("\n", $request->context);

        // Define the prompt template to instruct the model
        $prompt = "
    Si la pregunta contiene un saludo (como 'Hola', 'Buenos días', 'Qué tal', 'Buenas tardes') o una despedida (como 'Adiós', 'Hasta luego', 'Nos vemos'), 
    responde apropiadamente con un saludo o despedida.
    Basándote en el contenido proporcionado del campo 'Contexto', responde directamente a la pregunta del campo 'Pregunta' con la respuesta completa. 
    Si el contenido del campo 'Contexto' no es relevante o no contiene información suficiente, responde claramente: \"No puedo encontrar una respuesta en el contenido disponible.\" \n
    Contexto: {$context}\n
    Pregunta: {$request->question}";

        // Initialize response variables
        $data = [];
        $source = $request->model;
        $content = '';
        $reasoning = null;

        // Choose which model to use: local or GPT
        switch ($source) {
            case 'local':
                // Call local model (e.g., Ollama/DeepSeek)
                $data = $this->askLocal($prompt);
                if (!isset($data['error'])) {
                    // Extract thinking and response if no error
                    [$reasoning, $content] = $this->extractReasoningAndResponse($data['response']);
                }
                break;

            case 'gpt':
                // Call OpenAI's GPT model
                $data = $this->askGpt($prompt);
                if (!isset($data['error'])) {
                    $content = $data['choices'][0]['message']['content'];
                }
                break;

            default:
                // Unknown model
                return response()->json(['error' => 'Modelo no reconocido'], 400);
        }

        // Handle errors from model calls
        if (isset($data['error'])) {
            return response()->json(['error' => $data['error']], 500);
        }

        // Return the unified response
        return response()->json([
            'content' => $content,
            'prompt' => $prompt,
            'reasoning' => $reasoning,
            'source' => $source
        ]);
    }

    // Method to send prompt to OpenAI GPT
    public function askGpt($prompt)
    {
        $OPENAI_API_KEY = env('OPENAI_API_KEY');

        try {
            // Make request to OpenAI API
            $response = Http::withToken($OPENAI_API_KEY)->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-4o-mini',
                'messages' => [
                    ['role' => 'system', 'content' => 'Eres un asistente útil que responde usando el contexto.'],
                    ['role' => 'user', 'content' => $prompt],
                ],
            ]);

            // Handle HTTP failure
            if ($response->failed()) {
                \Log::error('ChatGPT API Error:', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return ['error' => 'Error al consultar ChatGPT'];
            }

            return $response->json(); // Return JSON response as array
        } catch (\Exception $e) {
            // Catch and log exception
            \Log::error('Error en la solicitud a OpenAI:', [
                'message' => $e->getMessage(),
                'stack' => $e->getTraceAsString(),
            ]);

            return ['error' => 'Excepción al consultar OpenAI'];
        }
    }

    // Method to send prompt to local model via HTTP (e.g., Ollama or similar)
    public function askLocal($prompt)
    {
        try {
            // POST to local AI endpoint
            $response = Http::timeout(3600)->post('http://linux:11434/api/generate', [
                'model' => 'deepseek-r1',
                'prompt' => $prompt,
                'stream' => false
            ]);

            // Handle HTTP failure
            if ($response->failed()) {
                \Log::error('Ollama API Error:', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return ['error' => 'Error al consultar DeepSeek'];
            }

            return $response->json(); // Return JSON response as array
        } catch (\Exception $e) {
            // Catch and log exception
            \Log::error('Error en la solicitud a Ollama:', [
                'message' => $e->getMessage(),
                'stack' => $e->getTraceAsString(),
            ]);

            return ['error' => 'Excepción al consultar Ollama'];
        }
    }

    // Helper function to extract <think>...</think> from local model response
    private function extractReasoningAndResponse($text)
    {
        $reasoning = null;

        // Use regex to find <think> block
        if (preg_match('/<think>(.*?)<\/think>/s', $text, $matches)) {
            $reasoning = trim($matches[1]);
            // Remove <think> block from response text
            $text = preg_replace('/<think>.*?<\/think>/s', '', $text);
        }

        return [trim($reasoning), trim($text)];
    }

}
