<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Chunk extends Model
{
    // Use the HasFactory and HasUuids traits for automatic model factory generation and UUID handling
    use HasFactory, HasUuids;

    // Specify the key type to 'string' since UUIDs are being used instead of auto-incrementing integers
    protected $keyType = 'string';

    // Disable auto-incrementing of the primary key as we are using UUIDs
    public $incrementing = false;

    // Define the fillable attributes for mass assignment (to allow mass assignment of these fields)
    protected $fillable = ['id', 'file_id', 'content'];
}
