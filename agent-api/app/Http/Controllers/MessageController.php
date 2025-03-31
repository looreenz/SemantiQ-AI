<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $messages = $request->all();

        foreach ($messages as $message) {
            Message::create([
                'id' => $message['id'],
                'user_id' => $message['user_id'],
                'question_id' => $message['question_id'],
                'message' => $message['message']
            ]);
        }

        return response()->json(['message' => 'Messages stored successfully', 'data' => $messages], 201);
    }

    public function index()
    {
        return response()->json(Message::all());
    }

    public function getMessagesByUserId($id)
    {
        if (!$id) {
            return response()->json(['error' => 'El user_id es requerido'], 400);
        }

        $messages = Message::where('user_id', $id)
            ->orWhere('question_id', function ($query) use ($id) {
                $query->select('id')
                    ->from('messages')
                    ->where('user_id', $id);
            })
            ->get();

        if ($messages->isEmpty()) {
            return response()->json(['message' => 'No se encontraron mensajes para este usuario.'], 404);
        }

        return response()->json($messages);
    }
}
