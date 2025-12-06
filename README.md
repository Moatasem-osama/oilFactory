# Oil Factory B2B Platform

منصة B2B تفاعلية متكاملة لمصنع الزيوت الطبيعية

## 🎯 نظرة عامة

هذه منصة B2B شاملة تقدم:
- نظام طلبات متقدم يدعم Bulk Orders و White Label
- نظام تتبع الطلبات الكامل
- لوحة تحكم للإدارة
- دعم كامل للغتين (العربية والإنجليزية)
- إشعارات فورية عبر Email و WhatsApp
- رفع الملفات على AWS S3

## ✨ المميزات الرئيسية

### للمستخدمين (B2B)
- 🌐 **دعم اللغتين**: واجهة بالعربية والإنجليزية
- 📦 **نظام طلبات متقدم**: 
  - طلبات كميات كبيرة (Bulk Orders)
  - خدمات العلامة البيضاء (White Label)
  - طلبات عينات (Samples)
  - إضافة عدة منتجات بكميات مختلفة
  - اختيار نوع التعبئة والوحدات
- 📍 **تتبع الطلبات**: تتبع حالة الطلب في الوقت الفعلي
- 📧 **إشعارات**: رسائل تأكيد عبر Email و WhatsApp
- 📄 **الكتالوجات**: تحميل الكتالوجات والشهادات

### للإدارة
- 💼 **لوحة التحكم**: إدارة شاملة للطلبات والمنتجات
- 📊 **إحصائيات**: نظرة عامة على الأداء
- ✉️ **إدارة الرسائل**: إدارة رسائل العملاء
- 🔄 **تغيير حالة الطلبات**: تحديث حالة الطلب بسهولة

## 🛠️ التقنيات المستخدمة

- **Frontend**: 
  - Next.js 14 (App Router)
  - React 18
  - TypeScript
  - Tailwind CSS
  - next-intl (للترجمة)
  - React Hook Form & Zod (للنماذج)

- **Backend**: 
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL
  - AWS SDK (S3)

- **Services**: 
  - Nodemailer (البريد الإلكتروني)
  - WhatsApp API (اختياري)
  - JWT (المصادقة)

## 📋 متطلبات النظام

- Node.js 18+ 
- PostgreSQL 14+
- npm أو yarn
- حساب AWS (لرفع الملفات)

## 🚀 التثبيت والإعداد

### 1. استنساخ المشروع

```bash
git clone <repository-url>
cd oil-website
```

### 2. تثبيت الحزم

```bash
npm install
```

### 3. إعداد ملف البيئة

أنشئ ملف `.env.local` في المجلد الرئيسي:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/oil_db"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your_bucket_name

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=noreply@oilfactory.com

# WhatsApp API (Optional)
WHATSAPP_API_KEY=your_whatsapp_api_key
WHATSAPP_PHONE_NUMBER=your_phone_number

# Admin Credentials
ADMIN_EMAIL=admin@oilfactory.com
ADMIN_PASSWORD=your_secure_password

# JWT Secret
JWT_SECRET=your_jwt_secret_key_change_in_production
```

### 4. إعداد قاعدة البيانات

```bash
# توليد Prisma Client
npx prisma generate

# إنشاء قاعدة البيانات وتطبيق migrations
npx prisma migrate dev --name init

# (اختياري) فتح Prisma Studio لإدارة البيانات
npx prisma studio
```

### 5. تشغيل المشروع

```bash
npm run dev
```

افتح المتصفح على: [http://localhost:3000](http://localhost:3000)

## 📁 هيكل المشروع

```
oil-website/
├── app/
│   ├── [locale]/              # الصفحات مع دعم اللغات
│   │   ├── page.tsx          # الصفحة الرئيسية
│   │   ├── about/            # من نحن
│   │   ├── products/         # المنتجات
│   │   ├── request-quote/    # طلب شحنة
│   │   ├── start-your-brand/ # ابدأ علامتك التجارية
│   │   ├── clients/          # العملاء والأسواق
│   │   ├── quality/          # الجودة والشهادات
│   │   ├── testimonials/     # آراء العملاء
│   │   ├── catalog/          # الكتالوجات
│   │   ├── contact/          # تواصل معنا
│   │   ├── tracking/         # تتبع الطلب
│   │   └── ...               # الصفحات القانونية
│   ├── api/                  # API Routes
│   │   ├── orders/           # إدارة الطلبات
│   │   ├── upload/           # رفع الملفات
│   │   ├── contact/          # رسائل التواصل
│   │   ├── admin/            # APIs للإدارة
│   │   └── ...
│   └── admin/                # لوحة التحكم
│       ├── login/            # تسجيل الدخول
│       ├── orders/           # إدارة الطلبات
│       └── ...
├── components/               # المكونات المشتركة
│   ├── layout/              # Header, Footer
│   ├── home/                # مكونات الصفحة الرئيسية
│   ├── request-quote/       # نموذج الطلب
│   ├── white-label/         # نموذج White Label
│   └── ...
├── lib/                     # Utilities
│   ├── prisma.ts           # Prisma Client
│   ├── utils.ts            # دوال مساعدة
│   ├── email.ts            # إرسال البريد
│   └── whatsapp.ts         # إشعارات WhatsApp
├── prisma/
│   └── schema.prisma       # Schema قاعدة البيانات
├── messages/               # ملفات الترجمة
│   ├── en.json            # الإنجليزية
│   └── ar.json            # العربية
└── public/                # الملفات الثابتة
```

## 🔑 المميزات الرئيسية بالتفصيل

### 1. نظام الطلبات
- نموذج طلب متقدم يدعم:
  - إضافة عدة منتجات
  - كميات ووحدات مختلفة
  - أنواع تعبئة متعددة
  - رفع المرفقات
  - اختيار Incoterms

### 2. نظام تتبع الطلبات
- تتبع حالة الطلب في الوقت الفعلي
- عرض تاريخ تغيير الحالة
- تفاصيل كاملة عن الطلب والمنتجات

### 3. خدمات White Label
- نموذج خاص للعلامة البيضاء
- رفع ملفات التصميم
- أو طلب خدمة التصميم

### 4. لوحة التحكم
- عرض جميع الطلبات
- تحديث حالة الطلبات
- إدارة المنتجات
- إدارة رسائل العملاء

## 🌐 الصفحات المتاحة

### الصفحات العامة
- `/` - الصفحة الرئيسية
- `/about` - من نحن
- `/products` - المنتجات
- `/request-quote` - طلب شحنة
- `/start-your-brand` - ابدأ علامتك التجارية
- `/clients` - العملاء والأسواق
- `/quality` - الجودة والشهادات
- `/testimonials` - آراء العملاء
- `/catalog` - الكتالوجات
- `/contact` - تواصل معنا
- `/tracking` - تتبع الطلب
- `/privacy` - سياسة الخصوصية
- `/terms` - الشروط والأحكام
- `/shipping` - سياسة الشحن

### لوحة التحكم
- `/admin/login` - تسجيل الدخول
- `/admin` - لوحة التحكم الرئيسية
- `/admin/orders` - إدارة الطلبات

## 🔐 الأمان

- JWT للمصادقة في لوحة التحكم
- تحقق من البيانات باستخدام Zod
- حماية API Routes
- تشفير كلمات المرور (قابل للتطوير)

## 📝 ملاحظات مهمة

1. **قاعدة البيانات**: تأكد من إعداد PostgreSQL بشكل صحيح
2. **AWS S3**: يجب إعداد حساب AWS و S3 bucket
3. **البريد الإلكتروني**: استخدم App Password لـ Gmail
4. **WhatsApp**: اختياري - يمكن تفعيله لاحقاً
5. **الإنتاج**: 
   - غيّر JWT_SECRET
   - استخدم HTTPS
   - راجع إعدادات الأمان

## 🚧 التطوير المستقبلي

- [ ] إضافة نظام دفع
- [ ] دعم عملات متعددة
- [ ] لوحة تحكم للمنتجات
- [ ] تقارير وإحصائيات متقدمة
- [ ] تطبيق موبايل
- [ ] نظام إدارة المخزون

## 📞 الدعم

للدعم أو الأسئلة، يرجى التواصل:
- Email: support@oilfactory.com

## 📄 الرخصة

هذا المشروع خاص - جميع الحقوق محفوظة

---

**تم التطوير بـ ❤️ باستخدام Next.js و TypeScript**
