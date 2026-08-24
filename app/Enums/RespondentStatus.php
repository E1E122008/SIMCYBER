<?php

namespace App\Enums;

enum RespondentStatus: string
{
    case Pending = 'pending';
    case Sent = 'sent';
    case Clicked = 'clicked';
    case CompletedBehavior = 'completed_behavior';
    case CompletedQuestionnaire = 'completed_questionnaire';
    case Finished = 'finished';

    public function label(): string
    {
        return match ($this) {
            self::Pending => 'Menunggu Dikirim',
            self::Sent => 'Terkirim',
            self::Clicked => 'Akses Link',
            self::CompletedBehavior => 'Selesai Simulasi',
            self::CompletedQuestionnaire => 'Selesai Kuesioner',
            self::Finished => 'Selesai Kuesioner',
        };
    }
}
