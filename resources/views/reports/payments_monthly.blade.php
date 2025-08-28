<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Pembayaran Bulan {{ $month }}/{{ $year }}</title>
    <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #333; padding: 8px; text-align: left; }
        th { background: #eee; }
    </style>
</head>
<body>
    <h2>Laporan Pembayaran Bulan {{ $month }}/{{ $year }}</h2>
    <table>
        <thead>
            <tr>
                <th>Nama Siswa</th>
                <th>Tanggal Pembayaran</th>
                <th>Jumlah</th>
            </tr>
        </thead>
        <tbody>
            @foreach($payments as $payment)
            <tr>
                <td>{{ $payment->student->name ?? '-' }}</td>
                <td>{{ $payment->payment_date }}</td>
                <td>Rp {{ number_format($payment->amount) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
