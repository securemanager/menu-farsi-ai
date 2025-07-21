import { useState } from "react";
import { X, Clock, MapPin, Phone, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import cafeLogoImg from "@/assets/cafe-logo.jpg";

interface CafeInfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CafeInfoPopup = ({ isOpen, onClose }: CafeInfoPopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <Card className="card-persian w-full max-w-md text-rtl relative overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 left-4 z-10 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
        
        <div className="p-8 text-center">
          <div className="mb-6">
            <img 
              src={cafeLogoImg} 
              alt="لوگو کافه" 
              className="w-24 h-24 mx-auto rounded-full shadow-elegant object-cover"
            />
          </div>
          
          <h2 className="text-persian-title mb-2">کافه پارسیان</h2>
          <p className="text-persian-subtitle mb-6">
            بهترین نوشیدنی‌ها و غذاهای سنتی ایرانی
          </p>
          
          <div className="space-y-4 text-right">
            <div className="flex items-center gap-3 justify-end">
              <span className="text-muted-foreground">تهران، خیابان انقلاب، پلاک ۱۲۳</span>
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            
            <div className="flex items-center gap-3 justify-end">
              <span className="text-muted-foreground">شنبه تا پنج‌شنبه: ۸:۰۰ - ۲۲:۰۰</span>
              <Clock className="h-5 w-5 text-primary" />
            </div>
            
            <div className="flex items-center gap-3 justify-end">
              <span className="text-muted-foreground">۰۲۱-۱۲۳۴۵۶۷۸</span>
              <Phone className="h-5 w-5 text-primary" />
            </div>
            
            <div className="flex items-center gap-3 justify-end">
              <span className="text-muted-foreground">@cafe_parsian</span>
              <Instagram className="h-5 w-5 text-primary" />
            </div>
          </div>
          
          <Button 
            variant="persian" 
            onClick={onClose}
            className="w-full mt-6"
          >
            شروع سفارش
          </Button>
        </div>
      </Card>
    </div>
  );
};