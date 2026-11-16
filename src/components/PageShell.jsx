import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

/**
 * Light atelier app shell: brown chrome header + paper canvas + footer.
 */
export default function PageShell({
  children,
  className,
  hideFooter = false,
  headerVariant = "solid",
}) {
  return (
    <div className={cn("flex min-h-screen flex-col bg-paper text-ink", className)}>
      <Header variant={headerVariant} />
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
