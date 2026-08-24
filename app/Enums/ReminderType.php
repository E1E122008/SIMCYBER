<?php

namespace App\Enums;

enum ReminderType: string
{
    case SimulasiDiabaikan = 'simulasi_diabaikan';
    case KuesionerBelumSelesai = 'kuesioner_belum_selesai';

    public function label(): string
    {
        return match ($this) {
            self::SimulasiDiabaikan => 'Pesan Diabaikan',
            self::KuesionerBelumSelesai => 'Kuesioner Tidak Selesai',
        };
    }
}
