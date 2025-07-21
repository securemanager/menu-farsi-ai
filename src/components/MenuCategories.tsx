import { useState } from "react";
import { Card } from "@/components/ui/card";
import teaCategoryImg from "@/assets/tea-category.jpg";
import coffeeCategoryImg from "@/assets/coffee-category.jpg";
import dessertsCategoryImg from "@/assets/desserts-category.jpg";
import beveragesCategoryImg from "@/assets/beverages-category.jpg";

interface Category {
  id: string;
  name: string;
  nameEn: string;
  image: string;
  description: string;
}

const categories: Category[] = [
  {
    id: "tea",
    name: "چای و دمنوش",
    nameEn: "Tea & Herbal",
    image: teaCategoryImg,
    description: "انواع چای‌های سنتی و دمنوش‌های گیاهی"
  },
  {
    id: "coffee", 
    name: "قهوه",
    nameEn: "Coffee",
    image: coffeeCategoryImg,
    description: "قهوه‌های تازه و معطر"
  },
  {
    id: "desserts",
    name: "شیرینی و دسر",
    nameEn: "Desserts",
    image: dessertsCategoryImg,
    description: "شیرینی‌ها و دسرهای خوشمزه"
  },
  {
    id: "beverages",
    name: "نوشیدنی‌ها",
    nameEn: "Beverages", 
    image: beveragesCategoryImg,
    description: "آبمیوه‌ها و نوشیدنی‌های سرد"
  }
];

interface MenuCategoriesProps {
  onCategorySelect: (categoryId: string) => void;
}

export const MenuCategories = ({ onCategorySelect }: MenuCategoriesProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="text-rtl">
      <div className="text-center mb-8">
        <h2 className="text-persian-title mb-3">منوی کافه</h2>
        <p className="text-persian-subtitle">دسته‌بندی مورد نظر خود را انتخاب کنید</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {categories.map((category) => (
          <Card 
            key={category.id}
            className="relative overflow-hidden cursor-pointer group"
            onClick={() => onCategorySelect(category.id)}
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="relative h-48 md:h-56">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
              
              <div className="absolute bottom-0 right-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2 text-right">
                  {category.name}
                </h3>
                <p className="text-muted-foreground text-right mb-3">
                  {category.description}
                </p>
                <div className="flex justify-end">
                  <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                    {category.nameEn}
                  </span>
                </div>
              </div>

              {hoveredCategory === category.id && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium shadow-elegant">
                    مشاهده محصولات
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};