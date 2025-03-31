<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chunk extends Model
{
    use HasFactory;

    protected $fillable = ['file_id', 'content'];
}
