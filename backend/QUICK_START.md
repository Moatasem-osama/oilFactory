# دليل البدء السريع - Backend API

## الخطوات السريعة

### 1. تثبيت الحزم

```bash
cd backend
npm install
```

### 2. إعداد ملف البيئة

انسخ `.env.example` إلى `.env` واملأ القيم:

```bash
cp .env.example .env
```

عدّل ملف `.env` وأضف:
- `DATABASE_URL` - رابط قاعدة البيانات
- `AWS_ACCESS_KEY_ID` و `AWS_SECRET_ACCESS_KEY` - مفاتيح AWS
- `SMTP_USER` و `SMTP_PASS` - إعدادات البريد
- `JWT_SECRET` - مفتاح JWT (يُفضل أن يكون عشوائي)

### 3. إعداد قاعدة البيانات

```bash
# توليد Prisma Client
npm run generate

# إنشاء قاعدة البيانات (إذا لم تكن موجودة)
# ثم تطبيق migrations
npm run migrate
```

### 4. تشغيل السيرفر

```bash
# Development mode
npm run dev

# السيرفر سيعمل على http://localhost:5000
```

## اختبار API

### Health Check

```bash
curl http://localhost:5000/health
```

### إنشاء طلب

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "country": "USA",
    "orderType": "BULK",
    "items": [
      {
        "productName": "Olive Oil",
        "quantity": 100,
        "unit": "LITER",
        "packaging": "DRUM_200L"
      }
    ]
  }'
```

### تسجيل دخول Admin

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@oilfactory.com",
    "password": "your_password"
  }'
```

## التكامل مع Frontend

في ملف `.env` في مشروع Frontend، غيّر:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

ثم في Frontend استخدم:

```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

fetch(`${API_URL}/api/orders`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

## ملاحظات مهمة

1. **قاعدة البيانات**: تأكد من أن PostgreSQL يعمل وقاعدة البيانات موجودة
2. **AWS S3**: يجب إعداد S3 bucket قبل رفع الملفات
3. **البريد الإلكتروني**: استخدم App Password لـ Gmail
4. **CORS**: تأكد من أن `FRONTEND_URL` في `.env` صحيح

## حل المشاكل الشائعة

### خطأ في الاتصال بقاعدة البيانات
- تأكد من أن PostgreSQL يعمل
- تحقق من `DATABASE_URL` في `.env`

### خطأ في رفع الملفات
- تحقق من إعدادات AWS
- تأكد من أن S3 bucket موجود

### خطأ CORS
- تحقق من `FRONTEND_URL` في `.env`
- تأكد من أن Frontend يعمل على نفس الرابط

---

**جاهز للاستخدام! 🚀**

