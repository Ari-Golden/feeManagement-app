<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StandardFee extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'amount',
        'frequency',
        'th_ajaran',
        'note'
    ];
}
