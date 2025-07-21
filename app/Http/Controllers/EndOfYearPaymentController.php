<?php

namespace App\Http\Controllers;

use App\Models\EndOfYearPayment;
use App\Models\Student;
use App\Models\StandardFee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EndOfYearPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $endOfYearStandardFee = StandardFee::where('name', 'End OF Year Payment')->first();

        return Inertia::render('end-of-year-payments/index', [
            'endOfYearPayments' => EndOfYearPayment::with('student')->get(),
            'students' => Student::all(),
            'endOfYearStandardFee' => $endOfYearStandardFee,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'student_id' => 'required|exists:students,id',
            'amount' => 'required|numeric|min:0',
            'payment_date' => 'required|date',
            'description' => 'nullable|string|max:255',
        ]);

        EndOfYearPayment::create($validatedData);

        return redirect()->route('end-of-year-payments.index')->with('success', 'End of Year Payment recorded successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
