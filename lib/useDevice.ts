import { useState, useEffect } from "react";

export function useDevice(breakpoint: number = 1024) {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    // Fungsi untuk mengecek ukuran layar
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= breakpoint);
    };

    checkScreenSize(); // Cek saat pertama kali load
    window.addEventListener("resize", checkScreenSize); // Update saat resize

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);

  return isDesktop;
}
