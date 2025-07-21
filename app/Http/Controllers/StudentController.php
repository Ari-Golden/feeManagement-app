<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('students/index', [
            'students' => Student::with(['payments', 'ppdbPayments', 'endOfYearPayments'])->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('students/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'no_ppdb' => 'required|string|max:255|unique:students,no_ppdb',
            'nisn' => 'required|string|max:255|unique:students,nisn',
            'name' => 'required|string|max:255',
            'class' => 'required|string|max:255',
        ]);

        do {
            $barcodeId = Str::random(10);
        } while (Student::where('barcode_id', $barcodeId)->exists());

        Student::create(array_merge($validatedData, [
            'barcode_id' => $barcodeId,
        ]));

        return redirect()->route('students.index')->with('success', 'Student created successfully!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        $validatedData = $request->validate([
            'no_ppdb' => 'required|string|max:255|unique:students,no_ppdb,' . $student->id,
            'nisn' => 'required|string|max:255|unique:students,nisn,' . $student->id,
            'name' => 'required|string|max:255',
            'class' => 'required|string|max:255',
        ]);

        $student->update($validatedData);

        return redirect()->route('students.index')->with('success', 'Student updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();

        return redirect()->route('students.index')->with('success', 'Student deleted successfully!');
    }

    public function printBarcode(Student $student)
    {
        return Inertia::render('students/PrintBarcodePage', [
            'student' => $student,
        ]);
    }

    public function printAllBarcodes()
    {
        return Inertia::render('students/PrintAllBarcodesPage', [
            'students' => Student::all(),
        ]);
    }

    public function showPaymentDetails(Student $student)
    {
        $student->load(['payments', 'ppdbPayments', 'endOfYearPayments']);

        return Inertia::render('students/PaymentDetailsModalPage', [
            'student' => $student->load(['payments', 'ppdbPayments', 'endOfYearPayments']),
        ]);
    }
}
