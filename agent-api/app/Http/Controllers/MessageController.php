<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
    // Store a list of messages sent in the request
    public function store(Request $request)
    {
        $messages = $request->all(); // Get all messages from request body

        // Iterate and store each message individually
        foreach ($messages as $message) {
            Message::create([
                'id' => $message['id'],
                'user_id' => $message['user_id'],
                'question_id' => $message['question_id'],
                'message' => $message['message']
            ]);
        }

        // Return a success response
        return response()->json(['message' => 'Messages stored successfully', 'data' => $messages], 201);
    }

    // Return all messages from the database
    public function index()
    {
        return response()->json(Message::all());
    }

    // Retrieve messages by user ID or by question IDs related to that user
    public function getMessagesByUserId($id)
    {
        if (!$id) {
            return response()->json(['error' => 'user_id is required'], 400);
        }

        // Retrieve messages where the user is either the sender or owns the question
        $messages = Message::where('user_id', $id)
            ->orWhereIn('question_id', function ($query) use ($id) {
                $query->select('id')
                    ->from('messages')
                    ->where('user_id', $id);
            })
            ->get();

        // If no messages found, return 404
        if ($messages->isEmpty()) {
            return response()->json(['message' => 'No messages found for this user.'], 404);
        }

        // Return the matching messages
        return response()->json($messages);
    }
}
