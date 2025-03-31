<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\File;
use App\Models\Chunk;
use Ramsey\Uuid\Guid\Guid;
use Smalot\PdfParser\Parser;

class FileController extends Controller
{
    // Subir un archivo
    public function upload(Request $request)
    {
        // Validar el archivo
        $request->validate([
            'document' => 'required|file|max:5120', // 5MB
            'id' => 'required|uuid',
            'user_id' => 'required|uuid',
        ]);

        // Verificar que se haya subido un archivo
        if ($request->hasFile('document') && $request->file('document')->isValid()) {
            $document = $request->file('document');
            $path = $document->store('documents', 'public');
            $url = asset('storage/documents/' . $document->getClientOriginalName());

            // Verificar si el archivo fue almacenado correctamente
            if (!$url) {
                return response()->json(['message' => 'Failed to store file.'], 500);
            }

            // Crear el registro en la base de datos con el path
            $file = File::create([
                'id' => $request->id,
                'name' => $document->getClientOriginalName(),
                'type' => $document->getClientMimeType(),
                'size' => $document->getSize(),
                'path' => $url,
                'user_id' => $request->user_id
            ]);

            $content = $this->extractContent($document);
            $content = $this->normalizeText($content);
            $this->storeChunks($file->id, $content);

            // Devolver la respuesta exitosa con el archivo guardado
            return response()->json(['message' => 'File uploaded successfully.', 'file' => $file], 201);
        } else {
            return response()->json(['message' => 'No file uploaded or file is invalid.'], 400);
        }
    }

    private function extractContent($document)
    {
        $extension = $document->getClientOriginalExtension();
        $content = '';

        try {
            switch ($extension) {
                case 'pdf':
                    $parser = new Parser();
                    $pdf = $parser->parseFile($document->getPathname());
                    if (!$pdf) throw new \Exception("No se pudo analizar el PDF.");
                    $content = $pdf->getText();
                    if (empty($content)) throw new \Exception("El PDF no contiene texto extraíble.");
                    break;

                case 'txt':
                    $content = file_get_contents($document->getPathname());
                    if ($content === false) {
                        throw new \Exception("No se pudo leer el archivo TXT.");
                    }
                    break;

                default:
                    throw new \Exception("Formato no soportado.");
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al extraer contenido: ' . $e->getMessage()], 500);
        }

        return $content;
    }

    function normalizeText($text) {
        // Convertir a minúsculas
        $text = mb_strtolower($text, 'UTF-8');
        
        // Eliminar caracteres especiales y múltiples espacios
        $text = preg_replace('/[^\p{L}\p{N}\s]/u', ' ', $text);
        $text = preg_replace('/\s+/', ' ', $text);
    
        return trim($text);
    }

    function splitText($text, $chunkSize = 500, $overlap = 100) {
        $chunks = [];
        $length = mb_strlen($text, 'UTF-8');
    
        for ($i = 0; $i < $length; $i += ($chunkSize - $overlap)) {
            $chunk = mb_substr($text, $i, $chunkSize, 'UTF-8');
            $chunks[] = $chunk;
        }
        
        return $chunks;
    }

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

    // Descargar un archivo
    public function show($id)
    {
        $file = File::findOrFail($id);
        return response()->json($file);
    }

    public function delete($id)
    {
        $file = File::findOrFail($id);
        Chunk::where('file_id', $file->id)->delete();
        $file->delete();

        return response()->json(['message' => 'File and associated content deleted successfully.']);
    }

    // Listar archivos subidos
    public function index()
    {
        return response()->json(File::all());
    }

    public function getFilesByUserId($id)
    {
        if (!$id) {
            return response()->json(['error' => 'El id es requerido'], 400);
        }

        $files = File::where('user_id', $id)->get();
        return response()->json($files);
    }
}
