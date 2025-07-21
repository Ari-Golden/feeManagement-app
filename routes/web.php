<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('students', [App\Http\Controllers\StudentController::class, 'index'])->name('students.index');
    Route::post('students', [App\Http\Controllers\StudentController::class, 'store'])->name('students.store');
    Route::put('students/{student}', [App\Http\Controllers\StudentController::class, 'update'])->name('students.update');
    Route::delete('students/{student}', [App\Http\Controllers\StudentController::class, 'destroy'])->name('students.destroy');
    Route::get('students/{student}/print-barcode', [App\Http\Controllers\StudentController::class, 'printBarcode'])->name('students.printBarcode');
    Route::get('students/print-all-barcodes', [App\Http\Controllers\StudentController::class, 'printAllBarcodes'])->name('students.printAllBarcodes');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
