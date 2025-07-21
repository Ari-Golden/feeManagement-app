<?php

namespace App\Http\Controllers;

use App\Models\EndOfYearPayment;
use App\Models\Payment;
use App\Models\PpdbPayment;
use App\Models\StandardFee;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalStudents = Student::count();

        $bpmpStandard = StandardFee::where('name', 'BPMP')->first();
        $ppdbStandard = StandardFee::where('name', 'PPDB')->first();
        $endOfYearStandard = StandardFee::where('name', 'End OF Year Payment')->first();

        $totalBpmpPaid = Payment::sum('amount');
        $totalPpdbPaid = PpdbPayment::sum('amount');
        $totalEndOfYearPaid = EndOfYearPayment::sum('amount');

        $totalStandardBpmp = $bpmpStandard ? $bpmpStandard->amount * 12 * $totalStudents : 0;
        $totalStandardPpdb = $ppdbStandard ? $ppdbStandard->amount * $totalStudents : 0;
        $totalStandardEndOfYear = $endOfYearStandard ? $endOfYearStandard->amount * $totalStudents : 0;

        $grandTotalStandardFee = $totalStandardBpmp + $totalStandardPpdb + $totalStandardEndOfYear;
        $grandTotalPaid = $totalBpmpPaid + $totalPpdbPaid + $totalEndOfYearPaid;
        $grandTotalRemainingBalance = $grandTotalStandardFee - $grandTotalPaid;

        // Get students with their payments
        $studentsWithPayments = Student::with(['payments', 'ppdbPayments', 'endOfYearPayments'])->get();

        $studentsWithOutstandingBalance = $studentsWithPayments->map(function ($student) use ($bpmpStandard, $ppdbStandard, $endOfYearStandard) {
            $totalBpmpPaidStudent = $student->payments->sum('amount');
            $totalPpdbPaidStudent = $student->ppdbPayments->sum('amount');
            $totalEndOfYearPaidStudent = $student->endOfYearPayments->sum('amount');

            $standardBpmpStudent = $bpmpStandard ? $bpmpStandard->amount * 12 : 0; // Assuming 12 months
            $standardPpdbStudent = $ppdbStandard ? $ppdbStandard->amount : 0;
            $standardEndOfYearStudent = $endOfYearStandard ? $endOfYearStandard->amount : 0;

            $totalStandardFeeStudent = $standardBpmpStudent + $standardPpdbStudent + $standardEndOfYearStudent;
            $totalPaidStudent = $totalBpmpPaidStudent + $totalPpdbPaidStudent + $totalEndOfYearPaidStudent;
            $remainingBalanceStudent = $totalStandardFeeStudent - $totalPaidStudent;

            return [
                'id' => $student->id,
                'name' => $student->name,
                'no_ppdb' => $student->no_ppdb,
                'nisn' => $student->nisn,
                'class' => $student->class,
                'total_standard_fee' => $totalStandardFeeStudent,
                'total_paid' => $totalPaidStudent,
                'remaining_balance' => $remainingBalanceStudent,
            ];
        })->filter(function ($student) {
            return $student['remaining_balance'] > 0;
        })->values(); // Reset keys after filtering

        return Inertia::render('dashboard', [
            'totalStudents' => $totalStudents,
            'totalBpmpPaid' => $totalBpmpPaid,
            'totalPpdbPaid' => $totalPpdbPaid,
            'totalEndOfYearPaid' => $totalEndOfYearPaid,
            'grandTotalStandardFee' => $grandTotalStandardFee,
            'grandTotalPaid' => $grandTotalPaid,
            'grandTotalRemainingBalance' => $grandTotalRemainingBalance,
            'studentsWithOutstandingBalance' => $studentsWithOutstandingBalance,
        ]);
    }
}

