<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class File extends Model
{
    // Use the HasFactory and HasUuids traits for automatic model factory generation and UUID handling
    use HasFactory, HasUuids;

    // Specify the key type to 'string' since UUIDs are used as primary keys instead of integers
    protected $keyType = 'string';

    // Disable auto-incrementing of the primary key because UUIDs are used
    public $incrementing = false;

    // Define the fillable attributes for mass assignment
    protected $fillable = ['id', 'name', 'type', 'size', 'path', 'user_id'];
}
