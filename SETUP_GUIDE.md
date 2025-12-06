# دليل الإعداد السريع - Oil Factory B2B Platform

## ✅ ما تم إنجازه

تم بناء منصة B2B متكاملة بالكامل تشمل:

### ✅ الصفحات الرئيسية (12 صفحة)
1. ✅ الصفحة الرئيسية (Home) - مع جميع الأقسام المطلوبة
2. ✅ من نحن (About Us)
3. ✅ المنتجات (Products)
4. ✅ طلب شحنة (Request Quote) - نموذج متقدم
5. ✅ ابدأ علامتك التجارية (Start Your Brand)
6. ✅ الأسواق والعملاء (Clients & Markets)
7. ✅ الشهادات والجودة (Quality & Certifications)
8. ✅ آراء العملاء (Testimonials)
9. ✅ الكتالوجات (Download Catalog)
10. ✅ تواصل معنا (Contact Us)
11. ✅ الصفحات القانونية (Privacy, Terms, Shipping)
12. ✅ تتبع الطلب (Order Tracking)

### ✅ الأنظمة الأساسية
- ✅ نظام اللغات (عربي/إنجليزي) باستخدام next-intl
- ✅ قاعدة البيانات مع Prisma Schema كاملة
- ✅ نظام الطلبات الكامل مع API
- ✅ نظام رفع الملفات على AWS S3
- ✅ نظام تتبع الطلبات
- ✅ إشعارات Email (جاهز للإعداد)
- ✅ إشعارات WhatsApp (جاهز للإعداد)
- ✅ لوحة التحكم الأساسية

### ✅ المكونات والميزات
- ✅ Header و Footer متجاوبان
- ✅ نماذج متقدمة مع التحقق
- ✅ تصميم حديث ومتجاوب
- ✅ دعم RTL للعربية

## 🚀 الخطوات التالية للإعداد

### 1. تثبيت الحزم

```bash
npm install
```

### 2. إعداد قاعدة البيانات

```bash
# إنشاء قاعدة بيانات PostgreSQL
createdb oil_db

# تطبيق migrations
npx prisma generate
npx prisma migrate dev
```

### 3. إعداد ملف البيئة

أنشئ `.env.local`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/oil_db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# AWS S3
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=your_bucket

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=noreply@oilfactory.com

# Admin
ADMIN_EMAIL=admin@oilfactory.com
ADMIN_PASSWORD=your_password

# JWT
JWT_SECRET=your_secret_key
```

### 4. إعداد AWS S3

1. أنشئ S3 bucket
2. احصل على Access Keys
3. أضفها في `.env.local`

### 5. إعداد البريد الإلكتروني

لـ Gmail:
1. فعل 2-Step Verification
2. أنشئ App Password
3. استخدم App Password في `SMTP_PASS`

### 6. تشغيل المشروع

```bash
npm run dev
```

## 📝 ملاحظات مهمة

### البيانات الوهمية (Placeholders)
- المنتجات حالياً وهمية - يجب إضافتها من قاعدة البيانات
- الصور وضعت مكانها - أضف الصور الفعلية في `/public`
- شعارات العملاء - أضف الصور الفعلية

### الصفحات التي تحتاج محتوى حقيقي
- `/about` - معلومات المصنع الحقيقية
- `/products` - منتجات من قاعدة البيانات
- `/clients` - عملاء حقيقيين
- `/testimonials` - آراء حقيقية
- `/quality` - شهادات حقيقية

### ميزات إضافية يمكن إضافتها
- نظام إدارة المنتجات من لوحة التحكم
- رفع الصور للمنتجات
- نظام تقييمات العملاء
- خريطة تفاعلية حقيقية
- نظام دفع
- تقارير متقدمة

## 🔧 التخصيص

### الألوان
عدّل في `tailwind.config.ts`:
```typescript
colors: {
  primary: { ... },
  secondary: { ... },
}
```

### النصوص والترجمات
عدّل في:
- `messages/en.json` - الإنجليزية
- `messages/ar.json` - العربية

### الشعار والأيقونات
- أضف شعار في Header
- استبدل الأيقونات حسب الحاجة

## 🎨 الملفات التي يجب تخصيصها

1. **الصور**: 
   - `/public/images/` - صور المصنع
   - `/public/products/` - صور المنتجات
   - `/public/clients/` - شعارات العملاء
   - `/public/videos/` - فيديو Hero (اختياري)

2. **المحتوى**: 
   - تحديث جميع النصوص في صفحات About, Quality, etc.
   - إضافة منتجات حقيقية من لوحة التحكم

3. **التصميم**: 
   - تعديل الألوان في `tailwind.config.ts`
   - تخصيص الخطوط

## 📞 الدعم

لأي استفسار أو مساعدة في التخصيص، راجع:
- `README.md` - الوثائق الكاملة
- Prisma Schema في `prisma/schema.prisma`

---

**المشروع جاهز للاستخدام والتخصيص! 🎉**

