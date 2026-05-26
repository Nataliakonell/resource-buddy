import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Eye, Moon, Type, Bell, CheckCircle2 } from "lucide-react";

export default function Configuracoes() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("dark-mode") === "true";
  });
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem("font-size") || "normal";
  });
  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem("notifications") !== "false";
  });
  const [accessTheme, setAccessTheme] = useState(() => {
    return localStorage.getItem("accessibility-theme") || "normal";
  });

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    localStorage.setItem("dark-mode", String(checked));
    document.documentElement.classList.toggle("dark", checked);
  };

  const handleFontSizeChange = (v: string) => {
    setFontSize(v);
    localStorage.setItem("font-size", v);
    document.documentElement.style.fontSize = v === "grande" ? "18px" : v === "muito-grande" ? "20px" : "16px";
  };

  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
    localStorage.setItem("notifications", String(checked));
  };

  const handleAccessThemeChange = (v: string) => {
    setAccessTheme(v);
    localStorage.setItem("accessibility-theme", v);
    
    document.documentElement.classList.remove("theme-daltonismo");
    if (v === "daltonismo") {
      document.documentElement.classList.add("theme-daltonismo");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground text-sm mt-1">Personalize a aparência e acessibilidade do sistema</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-base flex items-center gap-2">
              <Moon className="h-4 w-4" /> Aparência
            </CardTitle>
            <CardDescription>Alterne entre os modos claro e escuro</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Modo escuro</Label>
              <Switch id="dark-mode" checked={darkMode} onCheckedChange={toggleDarkMode} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-base flex items-center gap-2">
              <Type className="h-4 w-4" /> Tipografia
            </CardTitle>
            <CardDescription>Ajuste o tamanho da fonte para melhor legibilidade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label>Tamanho da fonte</Label>
              <Select value={fontSize} onValueChange={handleFontSizeChange}>
                <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="grande">Grande</SelectItem>
                  <SelectItem value="muito-grande">Muito Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-base flex items-center gap-2">
              <Bell className="h-4 w-4" /> Notificações
            </CardTitle>
            <CardDescription>Gerencie alertas e avisos do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="notif">Receber notificações</Label>
              <Switch id="notif" checked={notifications} onCheckedChange={handleNotificationsChange} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-base flex items-center gap-2">
              <Eye className="h-4 w-4" /> Modo Daltônico
            </CardTitle>
            <CardDescription>Ajuste as cores do painel para daltônicos (Protanopia/Deuteranopia)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label>Paleta de Cores</Label>
              <Select value={accessTheme} onValueChange={handleAccessThemeChange}>
                <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Padrão</SelectItem>
                  <SelectItem value="daltonismo">Daltônico (Azul / Laranja)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="font-heading text-base flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Recursos de Acessibilidade Ativos
            </CardTitle>
            <CardDescription>Confira o que está configurado para garantir a melhor experiência</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <p>✓ Navegação completa por teclado (Tab / Enter)</p>
            <p>✓ Compatível com leitores de tela (Labels ARIA)</p>
            <p>✓ Textos alternativos em ícones e imagens</p>
            <p>✓ Identificação dupla de status (Cores e Ícones distintos)</p>
            <p>✓ Paleta otimizada para daltonismo (Protanopia / Deuteranopia)</p>
            <p>✓ Controle de dimensionamento dinâmico de texto</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
