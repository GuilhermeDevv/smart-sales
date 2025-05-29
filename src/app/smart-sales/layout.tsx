"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import localFont from "next/font/local";
import { Suspense } from "react";

const brandonGrotesqueBlack = localFont({
  src: "../../assets/fonts/Brandon_blk.otf",
  variable: "--font-brandon-grotesque-black",
  weight: "900",
});
const brandonGrotesqueMedium = localFont({
  src: "../../assets/fonts/Brandon_med.otf",
  variable: "--font-brandon-grotesque-medium",
  weight: "500",
});
const brandonGrotesqueRegular = localFont({
  src: "../../assets/fonts/Brandon_reg.otf",
  variable: "--font-brandon-grotesque-regular",
  weight: "300 400",
  style: "normal",
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <head>
          <title>Smart Sales</title>
          <meta
            name="description"
            content="Gerencie suas vendas com eficiência"
          />
          <meta name="keywords" content="vendas, gerenciamento, eficiência" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body
          className={`${brandonGrotesqueBlack.variable} ${brandonGrotesqueMedium.variable} ${brandonGrotesqueRegular.variable}`}
        >
          <Suspense>{children}</Suspense>
        </body>
      </QueryClientProvider>
    </html>
  );
}
