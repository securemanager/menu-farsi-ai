import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AuthFormProps {
  onLogin: (userData: any) => void;
}

export const AuthForm = ({ onLogin }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent, isLogin: boolean) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin({
        name: "کاربر نمونه",
        role: "customer",
        email: "user@example.com"
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="card-persian w-full max-w-md mx-auto text-rtl">
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-persian-title text-2xl mb-2">ورود / ثبت‌نام</h2>
          <p className="text-persian-subtitle">به سامانه منوی دیجیتال خوش آمدید</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="font-vazir">ورود</TabsTrigger>
            <TabsTrigger value="register" className="font-vazir">ثبت‌نام</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-right block">ایمیل یا شماره موبایل</Label>
                <div className="relative">
                  <Input 
                    id="email" 
                    type="text" 
                    placeholder="example@email.com" 
                    className="pr-10 text-right" 
                    dir="ltr"
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-right block">رمز عبور</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="رمز عبور خود را وارد کنید"
                    className="pr-10 pl-10 text-right"
                  />
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute left-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" variant="persian" className="w-full" disabled={isLoading}>
                {isLoading ? "در حال ورود..." : "ورود"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-right block">نام و نام خانوادگی</Label>
                <div className="relative">
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="نام خود را وارد کنید" 
                    className="pr-10 text-right"
                  />
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email" className="text-right block">ایمیل یا شماره موبایل</Label>
                <div className="relative">
                  <Input 
                    id="reg-email" 
                    type="text" 
                    placeholder="example@email.com" 
                    className="pr-10 text-right" 
                    dir="ltr"
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-right block">نوع کاربری</Label>
                <Select>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="نوع کاربری خود را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">مشتری</SelectItem>
                    <SelectItem value="owner">صاحب کافه</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-password" className="text-right block">رمز عبور</Label>
                <div className="relative">
                  <Input 
                    id="reg-password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="رمز عبور خود را وارد کنید"
                    className="pr-10 pl-10 text-right"
                  />
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute left-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" variant="persian" className="w-full" disabled={isLoading}>
                {isLoading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};