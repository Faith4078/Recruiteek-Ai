import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

import { Button } from "@/components/ui/button";

const MarketingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-layout">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Recruiteek-Ai Logo" width={38} height={32} />
          <h2 className="text-primary-100">Recruiteek-Ai</h2>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/blog"
            className="text-sm font-semibold text-light-100 hover:text-primary-200 transition-colors"
          >
            Blog
          </Link>
          <Button asChild className="btn-primary">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </nav>

      {children}
    </div>
  );
};

export default MarketingLayout;
