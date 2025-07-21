<?php

namespace App\Http\Controllers;

use App\Models\PpdbPayment;
use App\Models\Student;
use App\Models\StandardFee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PpdbPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ppdbStandardFee = StandardFee::where('name', 'PPDB')->first();

        return Inertia::render('ppdb-payments/index', [
            'ppdbPayments' => PpdbPayment::with('student')->get(),
            'students' => Student::all(),
            'ppdbStandardFee' => $ppdbStandardFee,
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

        PpdbPayment::create($validatedData);

        return redirect()->route('ppdb-payments.index')->with('success', 'PPDB Payment recorded successfully!');
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
