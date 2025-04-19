// src/app/page.tsx
import PortfolioClient from '@/components/PortfolioClient'; // Import your actual portfolio component

export default function Home() {
  // This component should ONLY return your PortfolioClient component
  return (
    <PortfolioClient />
  );
}