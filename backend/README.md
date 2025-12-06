# Oil Factory Backend API

Backend منفصل باستخدام Node.js و Express.js لمنصة B2B لمصنع الزيوت الطبيعية

## 🚀 المميزات

- RESTful API متكامل
- تكامل مع Prisma ORM
- رفع الملفات على AWS S3
- إشعارات Email و WhatsApp
- نظام مصادقة JWT
- حماية CORS و Rate Limiting
- معالجة أخطاء شاملة

## 📋 المتطلبات

- Node.js 18+
- PostgreSQL 14+
- حساب AWS (لرفع الملفات)

## 🛠️ التثبيت

### 1. تثبيت الحزم

```bash
cd backend
npm install
```

### 2. إعداد ملف البيئة

أنشئ ملف `.env`:

```env
PORT=5000
NODE_ENV=development

DATABASE_URL="postgresql://user:password@localhost:5432/oil_db"
FRONTEND_URL=http://localhost:3000

AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your_bucket_name

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=noreply@oilfactory.com

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

ADMIN_EMAIL=admin@oilfactory.com
ADMIN_PASSWORD=your_secure_password
```

### 3. إعداد قاعدة البيانات

```bash
# توليد Prisma Client
npm run generate

# تطبيق migrations (استخدم نفس schema من المشروع الرئيسي)
npm run migrate
```

### 4. تشغيل السيرفر

```bash
# Development mode
npm run dev

# Production mode
npm start
```

السيرفر سيعمل على: `http://localhost:5000`

## 📚 API Endpoints

### Health Check
- `GET /health` - فحص حالة السيرفر

### الطلبات (Orders)
- `POST /api/orders` - إنشاء طلب جديد
- `GET /api/orders` - جلب جميع الطلبات (مع pagination)
- `GET /api/orders/:id` - جلب طلب محدد
- `PATCH /api/orders/:id/status` - تحديث حالة الطلب

### المنتجات (Products)
- `GET /api/products` - جلب جميع المنتجات
- `GET /api/products/:id` - جلب منتج محدد
- `POST /api/products` - إنشاء منتج جديد (Admin)
- `PATCH /api/products/:id` - تحديث منتج (Admin)
- `DELETE /api/products/:id` - حذف منتج (Admin)

### رفع الملفات (Upload)
- `POST /api/upload` - رفع ملف واحد
- `POST /api/upload/multiple` - رفع عدة ملفات

### التواصل (Contact)
- `POST /api/contact` - إرسال رسالة تواصل
- `GET /api/contact` - جلب جميع الرسائل (Admin)
- `PATCH /api/contact/:id/read` - تحديد الرسالة كمقروءة (Admin)

### White Label
- `POST /api/white-label` - إنشاء طلب White Label
- `GET /api/white-label` - جلب جميع الطلبات (Admin)

### الكتالوجات (Catalog)
- `POST /api/catalog` - طلب كتالوج

### التتبع (Tracking)
- `GET /api/tracking/:orderId` - تتبع طلب

### الإدارة (Admin)
- `POST /api/admin/login` - تسجيل دخول Admin
- `GET /api/admin/stats` - إحصائيات Dashboard (يتطلب مصادقة)

## 🔐 المصادقة

للمناطق المحمية، أرسل JWT token في header:

```
Authorization: Bearer <token>
```

## 📝 أمثلة الاستخدام

### إنشاء طلب جديد

```javascript
const response = await fetch('http://localhost:5000/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    customerName: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    country: 'USA',
    orderType: 'BULK',
    items: [
      {
        productName: 'Olive Oil',
        quantity: 100,
        unit: 'LITER',
        packaging: 'DRUM_200L',
      },
    ],
  }),
});
```

### رفع ملف

```javascript
const formData = new FormData();
formData.append('file', file);

const response = await fetch('http://localhost:5000/api/upload', {
  method: 'POST',
  body: formData,
});
```

### تسجيل دخول Admin

```javascript
const response = await fetch('http://localhost:5000/api/admin/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'admin@oilfactory.com',
    password: 'your_password',
  }),
});

const { data } = await response.json();
const token = data.token;
```

## 🏗️ البنية

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js      # Prisma Client
│   │   └── aws.js           # AWS S3 Client
│   ├── middleware/
│   │   └── auth.js          # Authentication middleware
│   ├── routes/
│   │   ├── orders.js
│   │   ├── products.js
│   │   ├── contact.js
│   │   ├── whiteLabel.js
│   │   ├── catalog.js
│   │   ├── upload.js
│   │   ├── tracking.js
│   │   └── admin.js
│   ├── utils/
│   │   ├── orderId.js       # Generate Order ID
│   │   ├── email.js         # Email functions
│   │   └── whatsapp.js      # WhatsApp functions
│   └── server.js            # Main server file
├── prisma/
│   └── schema.prisma        # Database schema
├── .env
├── package.json
└── README.md
```

## 🔒 الأمان

- Helmet.js للأمان الأساسي
- CORS configuration
- Rate limiting
- JWT authentication
- Input validation

## 📦 المتغيرات البيئية

| المتغير | الوصف | مثال |
|---------|-------|------|
| `PORT` | منفذ السيرفر | `5000` |
| `DATABASE_URL` | رابط قاعدة البيانات | `postgresql://...` |
| `FRONTEND_URL` | رابط Frontend | `http://localhost:3000` |
| `AWS_ACCESS_KEY_ID` | AWS Access Key | |
| `AWS_SECRET_ACCESS_KEY` | AWS Secret Key | |
| `AWS_S3_BUCKET` | اسم S3 Bucket | |
| `SMTP_HOST` | SMTP Server | `smtp.gmail.com` |
| `JWT_SECRET` | JWT Secret Key | |
| `ADMIN_EMAIL` | بريد Admin | |
| `ADMIN_PASSWORD` | كلمة مرور Admin | |

## 🚧 التطوير المستقبلي

- [ ] Unit Tests
- [ ] Integration Tests
- [ ] API Documentation (Swagger)
- [ ] WebSocket support
- [ ] Redis caching
- [ ] Advanced logging
- [ ] Monitoring & Analytics

## 📞 الدعم

للدعم أو الأسئلة، يرجى التواصل

---

**تم التطوير بـ ❤️ باستخدام Node.js و Express.js**

