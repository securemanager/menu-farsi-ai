import { useState } from "react";
import { ShoppingCart as ShoppingCartIcon, Plus, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const ShoppingCart = ({ items, onUpdateQuantity, onRemoveItem, onCheckout }: ShoppingCartProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <>
      {/* Floating Cart Button */}
      <Button
        variant="persian"
        size="icon"
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full shadow-elegant"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCartIcon className="h-6 w-6" />
        {totalItems > 0 && (
          <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-accent text-accent-foreground border-2 border-background">
            {totalItems > 99 ? '99+' : totalItems}
          </Badge>
        )}
      </Button>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="flex-1 bg-background/50 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
          />
          <Card className="w-full max-w-md h-full rounded-none border-l shadow-elegant overflow-hidden">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
                <h2 className="text-xl font-bold text-rtl">سبد خرید</h2>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="text-center text-muted-foreground py-12">
                    <ShoppingCartIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">سبد خرید خالی است</p>
                    <p className="text-sm mt-2">محصولات خود را اضافه کنید</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <Card key={item.id} className="p-4">
                        <div className="flex items-center gap-3 text-rtl">
                          <div className="flex-1">
                            <h3 className="font-medium text-right">{item.name}</h3>
                            <p className="text-primary font-bold text-right">
                              {formatPrice(item.price)} تومان
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => 
                                item.quantity > 1 
                                  ? onUpdateQuantity(item.id, item.quantity - 1)
                                  : onRemoveItem(item.id)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-border bg-card/50">
                  <div className="flex justify-between items-center mb-4 text-rtl">
                    <div className="text-xl font-bold">
                      {formatPrice(totalPrice)} تومان
                    </div>
                    <div className="text-muted-foreground">
                      جمع کل ({totalItems} مورد)
                    </div>
                  </div>
                  
                  <Button 
                    variant="persian" 
                    className="w-full"
                    onClick={() => {
                      onCheckout();
                      setIsOpen(false);
                    }}
                  >
                    تایید و پرداخت
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </>
  );
};