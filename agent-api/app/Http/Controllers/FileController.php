<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\File;
use App\Models\Chunk;
use Ramsey\Uuid\Guid\Guid;
use Smalot\PdfParser\Parser;

class FileController extends Controller
{
    // Upload a file and extract its contents
    public function upload(Request $request)
    {
        // Validate incoming file and parameters
        $request->validate([
            'document' => 'required|file|mimes:pdf,txt|max:5120', // Limit file size to 5MB
            'id' => 'required|uuid',
            'user_id' => 'required|uuid',
        ]);

        // Check if a valid file is uploaded
        if ($request->hasFile('document') && $request->file('document')->isValid()) {
            $document = $request->file('document');
            $path = $document->store('documents', 'public');
            $url = asset('storage/documents/' . $document->getClientOriginalName());

            // If storing failed, return an error
            if (!$url) {
                return response()->json(['message' => 'Failed to store file.'], 500);
            }

            // Save file metadata to database
            $file = File::create([
                'id' => $request->id,
                'name' => $document->getClientOriginalName(),
                'type' => $document->getClientMimeType(),
                'size' => $document->getSize(),
                'path' => $url,
                'user_id' => $request->user_id
            ]);

            // Extract and clean file content
            $content = $this->extractContent($document);
            $content = $this->normalizeText($content);
            $this->storeChunks($file->id, $content);

            // Return success response with file info
            return response()->json(['message' => 'File uploaded successfully.', 'file' => $file], 201);
        } else {
            return response()->json(['message' => 'No file uploaded or file is invalid.'], 400);
        }
    }

    // Extracts text content from PDF or TXT
    private function extractContent($document)
    {
        $extension = $document->getClientOriginalExtension();
        $content = '';

        try {
            switch ($extension) {
                case 'pdf':
                    $parser = new Parser();
                    $pdf = $parser->parseFile($document->getPathname());
                    if (!$pdf)
                        throw new \Exception("Could not parse PDF.");
                    $content = $pdf->getText();
                    if (empty($content))
                        throw new \Exception("PDF contains no extractable text.");
                    break;

                case 'txt':
                    $content = file_get_contents($document->getPathname());
                    if ($content === false) {
                        throw new \Exception("Could not read TXT file.");
                    }
                    break;

                default:
                    throw new \Exception("Unsupported file format.");
            }
        } catch (\Exception $e) {
            // Return error if content extraction fails
            return response()->json(['message' => 'Error extracting content: ' . $e->getMessage()], 500);
        }

        return $content;
    }

    // Normalize extracted text for consistency
    private function normalizeText($text)
    {
        $text = mb_strtolower($text, 'UTF-8'); // Convert to lowercase
        $text = preg_replace('/[^\p{L}\p{N}\s]/u', ' ', $text); // Remove special characters
        $text = preg_replace('/\s+/', ' ', $text); // Collapse multiple spaces

        return trim($text);
    }

    // Split long text into chunks of defined size with overlap
    private function splitText($text, $chunkSize = 500, $overlap = 100)
    {
        $chunks = [];
        $length = mb_strlen($text, 'UTF-8');

        for ($i = 0; $i < $length; $i += ($chunkSize - $overlap)) {
            $chunk = mb_substr($text, $i, $chunkSize, 'UTF-8');
            $chunks[] = $chunk;
        }

        return $chunks;
    }

    // Store content chunks in the database
    private function storeChunks($fileId, $content)
    {
        $chunks = $this->splitText($content);

        foreach ($chunks as $chunk) {
            Chunk::create([
                'id' => Guid::uuid7()->toString(),
                'file_id' => $fileId,
                'content' => $chunk
            ]);
        }
    }

    // Retrieve a single file by ID
    public function show($id)
    {
        $file = File::findOrFail($id);
        return response()->json($file);
    }

    // Delete a file and its related chunks
    public function delete($id)
    {
        $file = File::findOrFail($id);
        Chunk::where('file_id', $file->id)->delete();
        $file->delete();

        return response()->json(['message' => 'File and associated content deleted successfully.']);
    }

    // List all uploaded files
    public function index()
    {
        return response()->json(File::all());
    }

    // Get all files belonging to a specific user
    public function getFilesByUserId($id)
    {
        if (!$id) {
            return response()->json(['error' => 'ID is required'], 400);
        }

        $files = File::where('user_id', $id)->get();
        return response()->json($files);
    }
}
