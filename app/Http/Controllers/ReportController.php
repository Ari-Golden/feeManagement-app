<?php

namespace App\Http\Controllers;

use App\Models\EndOfYearPayment;
use App\Models\Payment;
use App\Models\PpdbPayment;
use App\Models\StandardFee;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        $students = Student::all();
        $bpmpStandard = StandardFee::where('name', 'BPMP')->first();
        $ppdbStandard = StandardFee::where('name', 'PPDB')->first();
        $endOfYearStandard = StandardFee::where('name', 'End OF Year Payment')->first();

        $reportData = $students->map(function ($student) use ($bpmpStandard, $ppdbStandard, $endOfYearStandard) {
            $totalBpmpPaid = $student->payments->sum('amount');
            $bpmpMonthsPaid = $bpmpStandard && $bpmpStandard->amount > 0 ? floor($totalBpmpPaid / $bpmpStandard->amount) : 0;
            $totalPpdbPaid = $student->ppdbPayments->sum('amount');
            $totalEndOfYearPaid = $student->endOfYearPayments->sum('amount');

            $standardBpmp = $bpmpStandard ? $bpmpStandard->amount * 12 : 0; // Assuming 12 months
            $standardPpdb = $ppdbStandard ? $ppdbStandard->amount : 0;
            $standardEndOfYear = $endOfYearStandard ? $endOfYearStandard->amount : 0;

            $totalStandardFee = $standardBpmp + $standardPpdb + $standardEndOfYear;
            $totalPaid = $totalBpmpPaid + $totalPpdbPaid + $totalEndOfYearPaid;
            $remainingBalance = $totalStandardFee - $totalPaid;

            return [
                'id' => $student->id,
                'name' => $student->name,
                'no_ppdb' => $student->no_ppdb,
                'nisn' => $student->nisn,
                'class' => $student->class,
                'total_bpmp_paid' => $totalBpmpPaid,
                'bpmp_months_paid' => $bpmpMonthsPaid,
                'total_ppdb_paid' => $totalPpdbPaid,
                'total_end_of_year_paid' => $totalEndOfYearPaid,
                'total_standard_fee' => $totalStandardFee,
                'total_paid' => $totalPaid,
                'remaining_balance' => $remainingBalance,
            ];
        });

        return Inertia::render('reports/index', [
            'reportData' => $reportData,
        ]);
    }
}

