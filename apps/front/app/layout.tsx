import type { Metadata } from "next";
import "./globals.css";
import NavbarContainer from "@/components/NavbarContainer";
import Navbar from "@/components/navbar";
import QueryProvider from "@/components/providers/queryProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Blog App",
  description: "Blog App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <NavbarContainer>
            <Navbar />
          </NavbarContainer>
          <Toaster />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
