<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Student;
use App\Models\Payment;
use App\Models\PpdbPayment;
use App\Models\EndOfYearPayment;
use App\Models\StandardFee;
use Illuminate\Support\Str;

class AIChatbotController extends Controller
{
    public function processMessage(Request $request)
    {
        $userMessage = strtolower($request->input('message'));
        $response = 'Maaf, saya tidak mengerti pertanyaan Anda. Bisakah Anda bertanya tentang siswa, pembayaran, atau biaya standar?';

        if (str_contains($userMessage, 'siswa') || str_contains($userMessage, 'student')) {
            if (str_contains($userMessage, 'jumlah') || str_contains($userMessage, 'berapa banyak')) {
                $count = Student::count();
                $response = "Ada {$count} siswa terdaftar di sistem. <a href=\"" . route('students.index') . "\" class=\"text-blue-500 hover:underline\">Lihat daftar siswa.</a>";
            } elseif (str_contains($userMessage, 'nama') || str_contains($userMessage, 'siapa')) {
                preg_match('/(?:nama|siapa)\s*(.+)/i', $userMessage, $matches);
                if (isset($matches[1])) {
                    $name = trim($matches[1]);
                    $student = Student::where('name', 'like', '%' . $name . '%')->first();
                    if ($student) {
                        $response = "Siswa dengan nama '{$student->name}' ditemukan. NISN: {$student->nisn}, Kelas: {$student->class}. <a href=\"" . route('students.index') . "\" class=\"text-blue-500 hover:underline\">Cari siswa ini.</a>";
                    } else {
                        $response = "Siswa dengan nama '{$name}' tidak ditemukan.";
                    }
                } else {
                    $response = "Anda ingin tahu nama siswa? Bisakah Anda memberikan nama spesifik?";
                }
            } elseif (str_contains($userMessage, 'kelas') || str_contains($userMessage, 'class')) {
                preg_match('/(?:kelas|class)\s*(\w+)/i', $userMessage, $matches);
                if (isset($matches[1])) {
                    $class = trim($matches[1]);
                    $count = Student::where('class', 'like', '%' . $class . '%')->count();
                    $response = "Ada {$count} siswa di kelas {$class}. <a href=\"" . route('students.index') . "\" class=\"text-blue-500 hover:underline\">Lihat siswa di kelas ini.</a>";
                } else {
                    $response = "Anda ingin tahu tentang siswa di kelas mana?";
                }
            } else {
                $response = "Saya bisa memberikan informasi tentang jumlah siswa, atau mencari siswa berdasarkan nama atau kelas.";
            }
        } elseif (str_contains($userMessage, 'pembayaran') || str_contains($userMessage, 'payment')) {
            if (str_contains($userMessage, 'jumlah') || str_contains($userMessage, 'berapa banyak')) {
                $count = Payment::count() + PpdbPayment::count() + EndOfYearPayment::count();
                $response = "Ada {$count} total catatan pembayaran di sistem. <a href=\"" . route('payments.index') . "\" class=\"text-blue-500 hover:underline\">Lihat semua pembayaran.</a>";
            } elseif (str_contains($userMessage, 'terbaru') || str_contains($userMessage, 'recent')) {
                $latestPayment = Payment::latest('payment_date')->first();
                if ($latestPayment && $latestPayment->student) {
                    $response = "Pembayaran terbaru adalah Rp " . number_format($latestPayment->amount) . " dari siswa {$latestPayment->student->name} pada tanggal {$latestPayment->payment_date}. <a href=\"" . route('payments.index') . "\" class=\"text-blue-500 hover:underline\">Lihat detail pembayaran.</a>";
                } else {
                    $response = "Tidak ada catatan pembayaran terbaru.";
                }
            }
            else {
                $response = "Saya bisa memberikan informasi tentang jumlah total pembayaran atau pembayaran terbaru.";
            }
        } elseif (str_contains($userMessage, 'biaya standar') || str_contains($userMessage, 'standard fee')) {
            if (str_contains($userMessage, 'jumlah') || str_contains($userMessage, 'berapa banyak')) {
                $count = StandardFee::count();
                $response = "Ada {$count} jenis biaya standar terdaftar. <a href=\"" . route('standard-fees.index') . "\" class=\"text-blue-500 hover:underline\">Lihat daftar biaya standar.</a>";
            } elseif (str_contains($userMessage, 'daftar') || str_contains($userMessage, 'list')) {
                $fees = StandardFee::all();
                if ($fees->isNotEmpty()) {
                    $list = $fees->map(function($fee) {
                        return "{$fee->name} (Rp " . number_format($fee->amount) . ")";
                    })->implode(', ');
                    $response = "Daftar biaya standar: {$list}. <a href=\"" . route('standard-fees.index') . "\" class=\"text-blue-500 hover:underline\">Lihat detail biaya standar.</a>";
                } else {
                    $response = "Tidak ada biaya standar yang terdaftar.";
                }
            } else {
                $response = "Saya bisa memberikan informasi tentang jumlah biaya standar atau daftar biaya standar.";
            }
        }

        return Inertia::render('chatbot/index', [
            'response' => $response,
        ]);
    }
}
