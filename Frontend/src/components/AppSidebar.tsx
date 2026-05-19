import { useState, useEffect } from "react";
import {
  Monitor,
  ArrowRightLeft,
  Settings,
  Package,
  LogOut,
  Bell
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5279/api";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { user, logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const [hasPendingNotification, setHasPendingNotification] = useState(false);

  useEffect(() => {
    if (!user) return;
    const checkNotifications = async () => {
      try {
        const token = localStorage.getItem("resource_buddy_token");
        const res = await fetch(`${apiUrl}/loans`, {
          headers: {
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
          }
        });
        if (res.ok) {
          const loans = await res.json();
          // Exibe o ponto vermelho pulsante se houver qualquer empréstimo no status pendente
          const pending = loans.some((l: any) => l.status === "pendente");
          setHasPendingNotification(pending);
        }
      } catch (err) {
        console.error("Erro ao verificar notificações:", err);
      }
    };

    checkNotifications();
    const interval = setInterval(checkNotifications, 10000);
    return () => clearInterval(interval);
  }, [user]);

  const mainItems = [];

  if (user?.role === "Administrador") {
    mainItems.push(
      { title: "Equipamentos", url: "/equipamentos", icon: Monitor },
      { title: "Notificação", url: "/emprestimos", icon: ArrowRightLeft },
      { title: "Aprovações", url: "/notificacoes", icon: Bell }
    );
  } else {
    mainItems.push(
      { title: "Solicitar Equipamentos", url: "/equipamentos", icon: Monitor },
      { title: "Notificação", url: "/emprestimos", icon: ArrowRightLeft }
    );
  }

  const systemItems = [
    { title: "Configurações", url: "/configuracoes", icon: Settings },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Package className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-heading text-base font-bold tracking-tight text-sidebar-foreground">
                SmartResource+
              </span>
              <span className="text-[11px] text-sidebar-foreground/60">
                Gestão de Recursos
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink to={item.url} className="w-full flex items-center relative" end>
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed ? (
                        <div className="flex items-center justify-between w-full ml-2 min-w-0">
                          <span className="truncate">{item.title}</span>
                          {item.title === "Notificação" && hasPendingNotification && (
                            <span className="relative flex h-2 w-2 mr-1 shrink-0">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                          )}
                        </div>
                      ) : (
                        item.title === "Notificação" && hasPendingNotification && (
                          <span className="absolute top-1 right-1 flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                          </span>
                        )
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink to={item.url} end>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 flex flex-col gap-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => logout()}
              tooltip="Sair da Conta"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>Sair da Conta</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
