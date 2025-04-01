<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('sessions', function (Blueprint $table) {
            // 1. Eliminar el índice actual (si existe)
            $table->dropIndex(['user_id']);

            // 2. Cambiar el tipo de la columna a UUID
            $table->uuid('user_id')->nullable()->change();

            // 3. Volver a agregar el índice si es necesario
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sessions', function (Blueprint $table) {
            // 1. Eliminar el índice UUID
            $table->dropIndex(['user_id']);

            // 2. Restaurar el tipo original a bigint
            $table->bigInteger('user_id')->nullable()->change();

            // 3. Volver a agregar el índice
            $table->index('user_id');
        });
    }
};
