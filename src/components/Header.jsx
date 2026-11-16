import { useState } from "react";
import { Menu } from "lucide-react";
import logoSrc from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppNav } from "@/hooks/useAppNav";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

/**
 * @param {{ variant?: "solid" | "overlay" }} props
 */
export default function Header({ variant = "solid" }) {
  const {
    navigate,
    isAuthenticated,
    navItems,
    goProfile,
    profileImageSrc,
    firstName,
  } = useAppNav();
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isOverlay = variant === "overlay";

  const handleNav = (item) => {
    setMenuOpen(false);
    if (item.onClick) item.onClick();
    else navigate(item.path);
  };

  const handleMobileProfile = () => {
    setMenuOpen(false);
    goProfile();
  };

  const handleMobileLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate("/");
  };

  const handleMobileAuthNav = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header
      className={cn(
        "w-full",
        isOverlay
          ? "absolute top-0 left-0 z-20 bg-brown-deep/40 backdrop-blur-md"
          : "bg-brown-deep"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <button
          type="button"
          className="flex items-center"
          onClick={() => navigate("/")}
          aria-label="Punjabi Rishtey home"
        >
          <img
            src={logoSrc}
            alt="Punjabi Rishtey"
            className="h-11 w-auto sm:h-14"
          />
        </button>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNav(item)}
              className="text-sm font-medium text-ivory/85 transition-colors hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={goProfile}
              className="flex items-center gap-2"
            >
              <span className="size-9 overflow-hidden rounded-full border border-ivory/60">
                <img
                  src={profileImageSrc}
                  alt=""
                  className="size-full object-cover object-top"
                />
              </span>
              {firstName && (
                <span className="hidden text-sm text-ivory sm:inline">
                  {firstName}
                </span>
              )}
            </button>
          ) : (
            <div className="hidden items-center gap-2 lg:flex">
              <Button
                variant="outline"
                size="sm"
                className="border-ivory/70 bg-transparent text-ivory hover:bg-ivory hover:text-brown"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button size="sm" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </div>
          )}

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-ivory hover:bg-white/10 hover:text-white lg:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-full flex-col gap-0 border-brown bg-brown-deep p-0 text-ivory sm:max-w-xs"
              closeButtonClassName="text-ivory/80 hover:bg-white/10 hover:text-white"
            >
              <SheetHeader className="border-b border-ivory/10 px-6 py-5">
                <SheetTitle className="font-display text-xl text-ivory">
                  Punjabi Rishtey
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1 overflow-y-auto px-3 py-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleNav(item)}
                    className="rounded-lg px-3 py-3 text-left text-base font-medium text-ivory/90 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-auto border-t border-ivory/10 px-6 py-5">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      className="border-ivory/70 bg-transparent text-ivory hover:bg-ivory hover:text-brown"
                      onClick={handleMobileProfile}
                    >
                      My Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-ivory/80 hover:bg-white/10 hover:text-white"
                      onClick={handleMobileLogout}
                    >
                      Log out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      className="border-ivory/70 bg-transparent text-ivory hover:bg-ivory hover:text-brown"
                      onClick={() => handleMobileAuthNav("/login")}
                    >
                      Login
                    </Button>
                    <Button onClick={() => handleMobileAuthNav("/signup")}>
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
