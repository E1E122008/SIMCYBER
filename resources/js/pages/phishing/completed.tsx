import { Head } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';

export default function Completed() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 py-10 dark:bg-slate-950">
            <Head title="Riset Selesai" />

            <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-6 flex justify-center">
                    <div className="flex size-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                        <ShieldCheck className="size-10" />
                    </div>
                </div>
                
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                    Rangkaian Riset Selesai
                </h1>
                
                <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
                    Terima kasih telah berpartisipasi dalam penelitian ini. Anda telah menyelesaikan seluruh rangkaian simulasi dan pengisian kuesioner. Data Anda telah terekam.
                </p>

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm font-medium text-blue-800 dark:border-blue-900/30 dark:bg-blue-900/20 dark:text-blue-300">
                    Anda sudah dapat menutup jendela browser ini. Jangan pernah lelah untuk selalu memverifikasi segala informasi di ruang digital.
                </div>
            </div>
        </div>
    );
}
