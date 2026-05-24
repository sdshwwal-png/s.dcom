// 1. تبديل الوضع (دارك/لايت)
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

themeIcon.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

// 2. عداد الزوار (يُخزن في localStorage)
let count = parseInt(localStorage.getItem('visitCount')) || 0;
count++;
localStorage.setItem('visitCount', count);
document.getElementById('visitCount').innerText = count;
document.getElementById('visitCountDisplay').innerText = count;

// عدد المستخدمين (وهمي بناءً على عدد الزوار الفريد)
let users = parseInt(localStorage.getItem('usersCount')) || 0;
if (count === 1) { users = 1; localStorage.setItem('usersCount', users); }
document.getElementById('usersCountDisplay').innerText = users;

// 3. كود الخصم (sand123)
function applyDiscount() {
    const code = document.getElementById('discountCode').value.trim();
    const messageBox = document.getElementById('discountMessage');
    if (code === 'sand123') {
        messageBox.innerHTML = '<span style="color:gold; font-weight:bold;">✅ تم تطبيق خصم 20%!</span>';
    } else {
        messageBox.innerHTML = '<span style="color:red;">❌ كود خصم غير صحيح</span>';
    }
}

// 4. الدخول إلى لوحة التحكم (ilmnilmn#1)
function accessDashboard() {
    const secretCode = document.getElementById('secretCode').value.trim();
    const dashboard = document.getElementById('dashboard-content');

    if (secretCode === 'ilmnilmn#1') {
        dashboard.style.display = 'block';
        document.getElementById('visitCount').innerText = count;
        document.getElementById('currentMode').innerText = body.classList.contains('light-mode') ? 'لايت مود' : 'دارك مود';
        // تحديث عدد المنتجات
        updateProductCount();
        // عرض المنتجات المحفوظة
        loadProducts();
        alert('مرحباً بك يا مدير! يمكنك إدارة المنتجات والإحصائيات.');
    } else {
        alert('كود غير صحيح!');
        dashboard.style.display = 'none';
    }
}

// 5. إضافة منتج (باقة) عبر لوحة التحكم
function addProduct() {
    const name = document.getElementById('newProductName').value.trim();
    const price = document.getElementById('newProductPrice').value.trim();
    const img = document.getElementById('newProductImg').value.trim();
    
    if (name && price) {
        const product = { name, price, img };
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        
        // تحديث العرض
        loadProducts();
        updateProductCount();
        alert('تمت إضافة الباقة بنجاح!');
        // تنظيف الحقول
        document.getElementById('newProductName').value = '';
        document.getElementById('newProductPrice').value = '';
        document.getElementById('newProductImg').value = '';
    } else {
        alert('يرجى إدخال اسم الباقة والسعر على الأقل');
    }
}

// 6. تحميل وعرض المنتجات
function loadProducts() {
    const list = document.getElementById('productList');
    list.innerHTML = '';
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    if (products.length === 0) {
        list.innerHTML = '<p style="color:#666;">لا توجد باقات مضافة بعد.</p>';
        return;
    }
    
    products.forEach((p, index) => {
        const div = document.createElement('div');
        div.style.border = '1px solid #444';
        div.style.padding = '10px';
        div.style.margin = '5px';
        div.style.borderRadius = '8px';
        div.style.background = '#222';
        div.innerHTML = `
            <strong>${p.name}</strong> - ${p.price}<br>
            ${p.img ? `<img src="${p.img}" width="80" style="border-radius:5px;">` : ''}
            <button onclick="deleteProduct(${index})" style="background:red; border:none; color:white; border-radius:5px; padding:2px 8px; margin-top:5px; cursor:pointer;">حذف</button>
        `;
        list.appendChild(div);
    });
}

// 7. حذف منتج
function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
    updateProductCount();
}

// 8. تحديث عداد المنتجات في لوحة التحكم
function updateProductCount() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    document.getElementById('productCount').innerText = products.length;
}

// 9. عند تحميل الصفحة، تحميل المنتجات إذا كانت لوحة التحكم مفتوحة
// (اختياري: إذا تم الدخول من قبل)
loadProducts();
updateProductCount();

// 10. تحسين رابط تيك توك (سيقوم المستخدم بوضع الرابط يدوياً)
document.getElementById('tiktokLink').addEventListener('click', function() {
    alert('يرجى استبدال هذا الرابط برابط حساب التيك توك الخاص بك في ملف web.html');
});

