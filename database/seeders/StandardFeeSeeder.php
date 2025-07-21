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
            'name' => 'BPMP Monthly',
            'amount' => 250000,
            'frequency' => 'monthly',
        ]);

        StandardFee::create([
            'name' => 'PPDB Fee',
            'amount' => 500000,
            'frequency' => 'once',
        ]);

        StandardFee::create([
            'name' => 'End of Year Fee',
            'amount' => 1000000,
            'frequency' => 'once',
        ]);
    }
}
}
