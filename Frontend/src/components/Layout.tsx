import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Link, useLocation } from "react-router-dom";
import { VLibras } from "./VLibras";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);
  const { user, logout } = useAuth();

  const getFirstName = (fullName?: string) => {
    if (!fullName) return "";
    return fullName.trim().split(" ")[0];
  };

  const getInitials = (fullName?: string) => {
    if (!fullName) return "";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  if (isAuthPage) {
    return (
      <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4">
        <main className="w-full flex items-center justify-center">{children}</main>
        <VLibras />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b bg-card px-4 shadow-sm">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
            </div>
            <div className="flex items-center gap-2">
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full p-1.5 transition-colors hover:bg-muted select-none">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-sm">
                        {getInitials(user.name)}
                      </div>
                      <span className="hidden sm:inline text-sm font-semibold text-foreground">
                        {getFirstName(user.name)}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1 py-1">
                        <p className="text-sm font-bold leading-none text-foreground">{user.name}</p>
                        <p className="text-[11px] leading-none text-muted-foreground mt-0.5">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="px-2 py-1.5 flex flex-col gap-0.5">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-muted-foreground/80">Tipo de Conta</span>
                      <span className="text-xs font-semibold text-foreground bg-primary/10 text-primary self-start px-2 py-0.5 rounded mt-0.5">{user.role}</span>
                    </div>
                    <div className="px-2 py-1.5 flex flex-col gap-0.5">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-muted-foreground/80">Setor</span>
                      <span className="text-xs font-semibold text-foreground">{user.sector}</span>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => logout()}
                      className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer font-semibold py-2"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair da Conta
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
      <VLibras />
    </SidebarProvider>
  );
}
