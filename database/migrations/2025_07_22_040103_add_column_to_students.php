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
        Schema::table('students', function (Blueprint $table) {
            $table->string('BPMP_id')->nullable();
            $table->string('PPDB_id')->nullable();
            $table->string('EOY_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            $table->dropColumn('BPMP_id');
            $table->dropColumn('PPDB_id');
            $table->dropColumn('EOY_id');
        });
    }
};
