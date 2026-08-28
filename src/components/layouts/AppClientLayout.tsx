"use client";
import { Toaster } from "sonner";
import ThemeProvider from "../providers/ThemeProvider";

interface AppClientLayoutProps {
  children: React.ReactNode;
}

const AppClientLayout = (props: AppClientLayoutProps) => {
  const { children } = props;
  return (
    <ThemeProvider>
      <main className="min-h-screen w-full">{children}</main>
      <Toaster richColors position="bottom-right" />
    </ThemeProvider>
  );
};

export default AppClientLayout;
