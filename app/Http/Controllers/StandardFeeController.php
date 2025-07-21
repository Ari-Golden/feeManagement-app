<?php

namespace App\Http\Controllers;

use App\Models\StandardFee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StandardFeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('standard-fees/index', [
            'standardFees' => StandardFee::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:standard_fees,name',
            'amount' => 'required|numeric|min:0',
            'frequency' => 'nullable|string|max:255',
        ]);

        StandardFee::create($validatedData);

        return redirect()->route('standard-fees.index')->with('success', 'Standard Fee created successfully!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StandardFee $standardFee)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:standard_fees,name,' . $standardFee->id,
            'amount' => 'required|numeric|min:0',
            'frequency' => 'nullable|string|max:255',
        ]);

        $standardFee->update($validatedData);

        return redirect()->route('standard-fees.index')->with('success', 'Standard Fee updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StandardFee $standardFee)
    {
        $standardFee->delete();

        return redirect()->route('standard-fees.index')->with('success', 'Standard Fee deleted successfully!');
    }
}
