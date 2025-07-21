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
        Schema::create('standard_fees', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // e.g., BPMP, PPDB, End of Year
            $table->decimal('amount', 10, 2);
            $table->string('frequency')->nullable(); // e.g., monthly, once
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('standard_fees');
    }
};
