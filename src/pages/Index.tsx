import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { CafeInfoPopup } from "@/components/CafeInfoPopup";
import { AuthForm } from "@/components/AuthForm";
import { MenuCategories } from "@/components/MenuCategories";
import { ShoppingCart } from "@/components/ShoppingCart";
import { AIAssistant } from "@/components/AIAssistant";
import cafeLogoImg from "@/assets/cafe-logo.jpg";

interface User {
  name: string;
  role: string;
  email: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showCafeInfo, setShowCafeInfo] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: "1", name: "چای ماسالا", price: 25000, quantity: 2 },
    { id: "2", name: "قهوه ترک", price: 35000, quantity: 1 }
  ]);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenCafeInfo');
    if (!hasSeenPopup) {
      setShowCafeInfo(true);
      localStorage.setItem('hasSeenCafeInfo', 'true');
    }
  }, []);

  const handleLogin = (userData: User) => setUser(userData);
  const handleLogout = () => setUser(null);
  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };
  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };
  const handleCheckout = () => {
    alert("پرداخت با موفقیت انجام شد!");
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-hero text-rtl">
      <header className="border-b border-border/20 backdrop-blur-sm bg-card/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>{user && (
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4 ml-2" />خروج
              </Button>
            )}</div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <h1 className="text-xl font-bold">کافه پارسیان</h1>
                <p className="text-sm text-muted-foreground">منوی دیجیتال</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowCafeInfo(true)}>
                <img src={cafeLogoImg} alt="لوگو" className="w-10 h-10 rounded-full object-cover"/>
              </Button>
            </div>
            <div>{user && (
              <div className="text-center">
                <span className="text-sm font-medium">{user.name}</span>
                <p className="text-xs text-muted-foreground">
                  {user.role === 'customer' ? 'مشتری' : 'صاحب کافه'}
                </p>
              </div>
            )}</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!user ? (
          <div className="flex items-center justify-center min-h-[600px]">
            <AuthForm onLogin={handleLogin} />
          </div>
        ) : (
          <MenuCategories onCategorySelect={(id) => console.log('Selected:', id)} />
        )}
      </main>

      {user && (
        <>
          <ShoppingCart 
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />
          <AIAssistant />
        </>
      )}

      <CafeInfoPopup isOpen={showCafeInfo} onClose={() => setShowCafeInfo(false)} />
    </div>
  );
};

export default Index;
