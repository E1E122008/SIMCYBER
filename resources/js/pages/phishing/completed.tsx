import { Head, Link } from '@inertiajs/react';
import { 
    ShieldCheck, 
    AlertTriangle, 
    CheckCircle, 
    BadgeInfo,
    BookOpen
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

type Props = {
    token: string;
    behavior_status?: string;
    keystroke_detected?: boolean;
};

export default function Completed({ token, behavior_status, keystroke_detected }: Props) {
    let resultBox = null;

    if (behavior_status === 'berisiko') {
        resultBox = (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-left dark:border-red-900/50 dark:bg-red-950/20">
                <div className="flex items-center justify-center sm:justify-start gap-3 text-red-700 dark:text-red-400">
                    <AlertTriangle className="size-6 shrink-0" />
                    <h2 className="text-lg font-bold">Status: Berisiko</h2>
                </div>
                <p className="mt-2 text-sm text-red-600 dark:text-red-300">
                    Anda memasukkan dan mengirimkan data Anda pada situs phishing ini. Di dunia nyata, akun Anda mungkin sudah diretas.
                </p>
            </div>
        );
    } else if (behavior_status === 'waspada') {
        resultBox = (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-left dark:border-emerald-900/50 dark:bg-emerald-950/20">
                <div className="flex items-center justify-center sm:justify-start gap-3 text-emerald-700 dark:text-emerald-400">
                    <CheckCircle className="size-6 shrink-0" />
                    <h2 className="text-lg font-bold">Status: Waspada</h2>
                </div>
                <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-300">
                    Sangat baik! Anda berhasil mengenali situs ini sebagai halaman mencurigakan dan berhasil menghindarinya.
                </p>
            </div>
        );
    } else if (behavior_status === 'netral' || behavior_status === 'tidak_merespons') {
        resultBox = (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-left dark:border-amber-900/50 dark:bg-amber-950/20">
                <div className="flex items-center justify-center sm:justify-start gap-3 text-amber-700 dark:text-amber-400">
                    <BadgeInfo className="size-6 shrink-0" />
                    <h2 className="text-lg font-bold">Status: Netral</h2>
                </div>
                <p className="mt-2 text-sm text-amber-600 dark:text-amber-300">
                    Anda sempat mencurigai atau mencoba berinteraksi, namun pada akhirnya Anda menolak atau menavigasi pergi. Berhati-hatilah agar tidak terburu-buru memasukkan data di masa depan.
                </p>
            </div>
        );
    }
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
                
                <p className="mb-6 text-lg text-slate-600 dark:text-slate-400">
                    Terima kasih telah berpartisipasi dalam penelitian ini. Anda telah menyelesaikan seluruh rangkaian simulasi dan pengisian kuesioner. Data Anda telah terekam.
                </p>

                {behavior_status && (
                    <div className="mb-8">
                        <h3 className="mb-3 font-semibold text-slate-900 dark:text-slate-50">
                            Hasil Simulasi Anda:
                        </h3>
                        {resultBox}
                    </div>
                )}

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm font-medium text-blue-800 dark:border-blue-900/30 dark:bg-blue-900/20 dark:text-blue-300 mb-8">
                    Anda sudah dapat menutup jendela browser ini. Jangan pernah lelah untuk selalu memverifikasi segala informasi di ruang digital.
                </div>

                <div className="flex flex-col items-center justify-center pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Link 
                        href={`/s/${token}/reveal?completed=true`}
                        className={buttonVariants({ variant: "outline" }) + " w-full sm:w-auto h-12 flex items-center gap-2"}
                    >
                        <BookOpen className="size-4" />
                        Pelajari Kembali Materi Edukasi
                    </Link>
                    <p className="mt-3 text-xs text-slate-500 max-w-sm">
                        Anda dapat membaca kembali materi edukasi phishing kapan saja.
                    </p>
                </div>
            </div>
        </div>
    );
}
