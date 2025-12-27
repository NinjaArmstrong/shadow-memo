import type { Metadata } from "next";
import { Inter, Shojumaru, Yuji_Syuku } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const shojumaru = Shojumaru({ weight: "400", subsets: ["latin"], variable: "--font-ninja" });
const yuji = Yuji_Syuku({ weight: "400", subsets: ["latin"], variable: "--font-yuji" });

export const metadata: Metadata = {
    title: "Shadow Memo | 隠密メモ",
    description: "Vent your stress into the void. A ninja-themed disappearing memo pad.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className={`${inter.variable} ${shojumaru.variable} ${yuji.variable} bg-ninja-black text-white antialiased overflow-hidden font-sans`}>
                {children}
            </body>
        </html>
    );
}
