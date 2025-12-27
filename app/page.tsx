'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
    const [text, setText] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [status, setStatus] = useState<'idle' | 'burning' | 'finished'>('idle');
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if ((text.length > 0 || images.length > 0) && status === 'idle') {
            timerRef.current = setTimeout(() => {
                handleBurn();
            }, 5 * 60 * 1000); // 5 minutes auto-burn
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [text, images, status]);

    const handleBurn = () => {
        if (!text && images.length === 0) return;
        setStatus('burning');
        const burnSound = new Audio('/sounds/burn.wav');
        burnSound.play();

        setTimeout(() => {
            setText('');
            setImages([]);
        }, 1500);

        setTimeout(() => {
            setStatus('finished');
        }, 2000);

        setTimeout(() => {
            setStatus('idle');
        }, 4500);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const blob = items[i].getAsFile();
                if (blob) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        if (event.target?.result) {
                            setImages(prev => [...prev, event.target!.result as string]);
                        }
                    };
                    reader.readAsDataURL(blob);
                    e.preventDefault(); // Prevent default paste behavior if it's an image
                }
            }
        }
    };

    const kanjiVariants = {
        hidden: { scale: 2, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
    };

    return (
        <main className={`flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-75 ${status === 'burning' ? 'bg-orange-950' : 'bg-ninja-black'}`}>

            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/shattered-island.png')]"></div>

            {/* EXPLOSION & FINALE LAYERS */}
            <AnimatePresence>
                {status === 'burning' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[999] pointer-events-none mix-blend-screen"
                    >
                        <motion.div
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 3, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="absolute inset-0 m-auto w-[50vh] h-[50vh] rounded-full bg-gradient-radial from-white via-yellow-400 to-orange-600 blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-orange-400/50"
                        />
                    </motion.div>
                )}

                {status === 'finished' && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    >
                        <div className="flex flex-col items-center gap-4 select-none">
                            <div className="flex gap-4 md:gap-8">
                                <motion.span variants={kanjiVariants} initial="hidden" animate="visible" className="text-6xl md:text-9xl font-black font-yuji text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">成</motion.span>
                                <motion.span variants={kanjiVariants} initial="hidden" animate={{ ...kanjiVariants.visible, transition: { delay: 0.2, type: 'spring' } }} className="text-6xl md:text-9xl font-black font-yuji text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">敗</motion.span>
                            </div>
                            <div className="flex gap-4 md:gap-8">
                                <motion.span variants={kanjiVariants} initial="hidden" animate={{ ...kanjiVariants.visible, transition: { delay: 0.4, type: 'spring' } }} className="text-6xl md:text-9xl font-black font-yuji text-ninja-red drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]">完</motion.span>
                                <motion.span variants={kanjiVariants} initial="hidden" animate={{ ...kanjiVariants.visible, transition: { delay: 0.6, type: 'spring' } }} className="text-6xl md:text-9xl font-black font-yuji text-ninja-red drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]">了</motion.span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* NEW HEADER with Ninja Armstrong */}
            <header className={`z-10 w-full max-w-md flex items-center justify-between p-4 border-b border-ninja-red/30 bg-black/50 backdrop-blur-sm rounded-t-xl mb-4 transition-all duration-100 ${status === 'burning' ? 'animate-shake-violent border-orange-500' : ''}`}>
                {/* 左側：アイコンと名前 */}
                <div className="flex items-center space-x-3">
                    {/* Icon removed */}
                    <span className="text-gray-200 font-bold font-sans text-xs tracking-wider">
                        NinjaArmstrong🇯🇵
                    </span>
                </div>

                {/* 右側：アプリタイトル */}
                <h1 className="text-ninja-red font-ninja tracking-widest text-xl drop-shadow-[0_0_10px_rgba(255,0,51,0.5)]">
                    SHADOW MEMO
                </h1>
            </header>

            {/* Action Area */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md px-2">
                <button
                    onClick={handleBurn}
                    disabled={(!text && images.length === 0) || status !== 'idle'}
                    className={`w-full group relative h-16 bg-transparent border-2 border-ninja-red rounded-xl text-ninja-red font-black text-xl uppercase tracking-widest transition-all duration-200 active:scale-95 hover:bg-ninja-red hover:text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    <span className="relative z-10 flex items-center justify-center gap-3 font-ninja">
                        <span>🔥</span> 忍法・火遁の術 <span>🔥</span>
                    </span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md bg-ninja-red/50"></div>
                </button>
            </div>

            {/* Main Container */}
            <div className={`relative z-10 w-full max-w-md h-[50vh] min-h-[300px] bg-ninja-gray rounded-2xl shadow-2xl border border-ninja-charcoal overflow-hidden group transition-all duration-75 ${status === 'burning' ? 'animate-shake-violent border-orange-500 ring-4 ring-orange-500/50 scale-105' : ''}`}>

                {/* EXPLOSION INTERIOR */}
                <AnimatePresence>
                    {status === 'burning' && (
                        <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden mix-blend-normal">
                            <motion.div
                                initial={{ scale: 0, opacity: 1 }}
                                animate={{ scale: 2.5, opacity: 0 }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="absolute inset-0 m-auto w-full h-full bg-white rounded-full blur-md"
                            />
                            <motion.div
                                initial={{ y: "100%", scale: 1 }}
                                animate={{ y: "-20%", scale: 1.5 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="absolute -inset-10 bg-gradient-to-t from-orange-600 via-orange-500 to-yellow-300 opacity-90"
                            />
                            {[...Array(60)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: "50%", y: "100%", scale: 0 }}
                                    animate={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100 - 50}%`, scale: [0, 1 + Math.random(), 0], opacity: [1, 1, 0] }}
                                    transition={{ duration: 0.6 + Math.random() * 0.5, ease: "easeOut" }}
                                    className="absolute w-2 h-2 bg-orange-200 shadow-[0_0_10px_orange]"
                                    style={{ left: 0, top: 0 }}
                                />
                            ))}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="absolute inset-0 bg-black"
                            />
                        </div>
                    )}
                </AnimatePresence>

                {/* Content Area (Scrollable) */}
                <div className={`w-full h-full overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-ninja-red scrollbar-track-transparent ${status !== 'idle' ? 'opacity-0 transition-opacity duration-200' : ''}`}>
                    <textarea
                        value={text}
                        onChange={handleTextChange}
                        onPaste={handlePaste}
                        placeholder={`その不条理、クソリプ\nコピペも全て焼き尽くしてくれるわ！`}
                        className={`w-full bg-transparent text-2xl font-bold font-yuji text-gray-100 resize-none focus:outline-none leading-relaxed tracking-wide placeholder:text-gray-600 min-h-[120px]`}
                        style={{ height: 'auto' }}
                        rows={3}
                        spellCheck={false}
                    />

                    {/* Image Preview Area */}
                    {images.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            {images.map((img, idx) => (
                                <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-700">
                                    <img src={img} alt={`pasted-${idx}`} className="w-full h-auto object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                        <span className="text-white text-xs">燃やす</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info / Counter (Now just count) */}
                <div className={`absolute bottom-4 right-4 text-xs font-mono font-bold pointer-events-none text-gray-600 transition-opacity ${status !== 'idle' ? 'opacity-0' : 'opacity-100'}`}>
                    {text.length} chars {images.length > 0 ? `+ ${images.length} img` : ''}
                </div>
            </div>

        </main>
    );
}

