import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "내 성격에 딱 맞는 IT 부캐 찾기 | IT 부캐 MBTI 테스트",
  description:
    "출근길 내 모습으로 알아보는 'IT 부캐' 테스트. 협업 스타일부터 위기 대처법까지, 내 MBTI 유형에 맞는 IT 직무 페르소나를 확인해보세요.",
  openGraph: {
    title: "내 성격에 딱 맞는 IT 부캐 찾기",
    description:
      "8개의 질문으로 알아보는 나의 IT 직장인 페르소나. 지금 바로 확인해보세요!",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0b0f1f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased text-slate-100">{children}</body>
    </html>
  );
}
