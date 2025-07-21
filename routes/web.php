<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    Route::get('students', [App\Http\Controllers\StudentController::class, 'index'])->name('students.index');
    Route::post('students', [App\Http\Controllers\StudentController::class, 'store'])->name('students.store');
    Route::put('students/{student}', [App\Http\Controllers\StudentController::class, 'update'])->name('students.update');
    Route::delete('students/{student}', [App\Http\Controllers\StudentController::class, 'destroy'])->name('students.destroy');
    Route::get('students/{student}/print-barcode', [App\Http\Controllers\StudentController::class, 'printBarcode'])->name('students.printBarcode');
    Route::get('students/print-all-barcodes', [App\Http\Controllers\StudentController::class, 'printAllBarcodes'])->name('students.printAllBarcodes');

    Route::get('payments', [App\Http\Controllers\PaymentController::class, 'index'])->name('payments.index');
    Route::post('payments', [App\Http\Controllers\PaymentController::class, 'store'])->name('payments.store');

    Route::get('ppdb-payments', [App\Http\Controllers\PpdbPaymentController::class, 'index'])->name('ppdb-payments.index');
    Route::post('ppdb-payments', [App\Http\Controllers\PpdbPaymentController::class, 'store'])->name('ppdb-payments.store');

    Route::get('end-of-year-payments', [App\Http\Controllers\EndOfYearPaymentController::class, 'index'])->name('end-of-year-payments.index');
    Route::post('end-of-year-payments', [App\Http\Controllers\EndOfYearPaymentController::class, 'store'])->name('end-of-year-payments.store');

    Route::get('standard-fees', [App\Http\Controllers\StandardFeeController::class, 'index'])->name('standard-fees.index');
    Route::post('standard-fees', [App\Http\Controllers\StandardFeeController::class, 'store'])->name('standard-fees.store');
    Route::put('standard-fees/{standardFee}', [App\Http\Controllers\StandardFeeController::class, 'update'])->name('standard-fees.update');
    Route::delete('standard-fees/{standardFee}', [App\Http\Controllers\StandardFeeController::class, 'destroy'])->name('standard-fees.destroy');

    Route::get('reports', [App\Http\Controllers\ReportController::class, 'index'])->name('reports.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
