<?php

namespace App\Models;

use App\Models\EndOfYearPayment;
use App\Models\Payment;
use App\Models\PpdbPayment;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'no_ppdb',
        'nisn',
        'name',
        'class',
        'barcode_id',
    ];

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function ppdbPayments()
    {
        return $this->hasMany(PpdbPayment::class);
    }

    public function endOfYearPayments()
    {
        return $this->hasMany(EndOfYearPayment::class);
    }
}
