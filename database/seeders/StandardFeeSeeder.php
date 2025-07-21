<?php

namespace Database\Seeders;

use App\Models\StandardFee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StandardFeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StandardFee::create([
            'name' => 'BPMP',
            'amount' => 250000,
            'frequency' => 'monthly',
        ]);

        StandardFee::create([
            'name' => 'PPDB',
            'amount' => 500000,
            'frequency' => 'once',
        ]);

        StandardFee::create([
            'name' => 'End of Year',
            'amount' => 1000000,
            'frequency' => 'once',
        ]);
    }
}

