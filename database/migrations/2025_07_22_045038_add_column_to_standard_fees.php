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
        Schema::table('standard_fees', function (Blueprint $table) {
            $table->string('th_ajaran')->nullable();
            $table->string('note')->nullable();            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('standard_fees', function (Blueprint $table) {
            $table->dropColumn('th_ajaran');
            $table->dropColumn('note');
        });
    }
};
