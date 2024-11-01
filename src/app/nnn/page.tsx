"use client";

export default function Page() {
    let b = false;

    const c = (e: any) => {
        if (b) return;

        e.currentTarget.style.opacity = '0';
        b = true;

        const tick = new Audio('tick.mp3');
        const yay = new Audio('yay.mp3');
        tick.volume = 0.03;
        const target = new Date('2024-11-30T23:59:59');
        // const target = new Date(Date.now() + 10000);
        const int = setInterval(() => {
            const now = new Date();
            const diff = target.getTime() - now.getTime();

            if (diff < 0) {
                document.getElementById('countdown')!.textContent = "WOOOOOOOOOO 🎉🎉🎉🎉";
                clearInterval(int);
                yay.play();
                return;
            }

            tick.play();

            const months = target.getMonth() - now.getMonth() + (target.getFullYear() - now.getFullYear()) * 12;
            const days = Math.floor(diff / (1000 * 3600 * 24)) - (months * 30);
            const hours = Math.floor((diff % (1000 * 3600 * 24)) / (1000 * 3600));
            const minutes = Math.floor((diff % (1000 * 3600)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('countdown')!.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    };

    return (
        <>
            <div
                onClick={c}
                className="fixed inset-0 bg-black transition-opacity duration-500 z-50 flex items-center justify-center"
            >
                <span className="text-white text-2xl italic font-[800]">Click.</span>
            </div>
            <div className="fixed inset-0 flex items-center justify-center z-40">
                <span id="countdown" className="text-white text-8xl font-[800]">...</span>
            </div>
        </>
    );
}
