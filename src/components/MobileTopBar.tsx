import Link from "next/link";
import { PencilSimpleLine } from "@phosphor-icons/react/dist/ssr";
import { MobileMenu } from "@/components/MobileMenu";

export function MobileTopBar() {
  return (
    <div className="fixed right-5 top-5 z-40 flex items-center gap-2 md:hidden">
      <Link
        href="#formular"
        aria-label="Devino membru"
        className="grid size-10 place-items-center rounded-full bg-blue-500 text-white shadow-xs transition-opacity hover:opacity-90"
      >
        <PencilSimpleLine size={18} weight="regular" />
      </Link>
      <MobileMenu />
    </div>
  );
}
