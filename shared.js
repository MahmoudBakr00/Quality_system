// =========================================================
// ملف مشترك لكل صفحات نظام تسجيل العيوب
// يحتاج: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
//        <script src="https://cdn.jsdelivr.net/npm/html5-qrcode@2.3.8/html5-qrcode.min.js"></script>
// قبل تحميل هذا الملف
// =========================================================

const SUPABASE_URL = "https://igdfaqiaprhgsdrqcxfj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_2Vw18qr3DeAt7Ge7onvXLA_Gr02sm2e";
const sbClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const ROLE_NAMES = { admin: 'أدمن', supervisor: 'مشرف', technician: 'فني' };

// =========================================================
// التحقق من الجلسة + جلب البروفايل، مع إمكانية تقييد الصفحة بأدوار معينة
// allowedRoles: مصفوفة أدوار مسموحة، أو null للسماح للجميع
// =========================================================
async function requireAuth(allowedRoles = null) {
  const { data: { user } } = await sbClient.auth.getUser();
  if (!user) {
    window.location.href = 'index.html';
    return null;
  }

  const { data: profile, error } = await sbClient
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (error || !profile) {
    console.error('Profile error:', error);
    await sbClient.auth.signOut();
    window.location.href = 'index.html';
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    alert('⛔ ليس لديك صلاحية الوصول لهذه الصفحة');
    window.location.href = 'home.html';
    return null;
  }

  return { user, role: profile.role };
}

async function logout() {
  await sbClient.auth.signOut();
  window.location.href = 'index.html';
}

// =========================================================
// استخراج الجوب أوردر من السيريال (نسخة طرف العميل، مطابقة لدالة قاعدة البيانات)
// =========================================================
function extractJobOrder(serial) {
  if (!serial) return null;
  const parts = serial.split('-');
  if (parts.length < 2) return null;
  const seg = parts[1];
  if (!seg) return null;
  if (seg.length === 8) {
    return seg.substring(0, 6) + ' ' + seg.substring(6, 8);
  }
  return seg;
}

// =========================================================
// سكان الباركود بالكاميرا (باركود عادي بس، مش QR)
// containerId: عنصر div هيظهر فيه الفيديو
// onResult: callback(decodedText) بيتنفذ لما يلاقي باركود
// بترجع كائن فيه دالة stop() لإيقاف السكانر
// =========================================================
function startBarcodeScanner(containerId, onResult, onError) {
  const formatsToSupport = [
    Html5QrcodeSupportedFormats.CODE_128,
    Html5QrcodeSupportedFormats.CODE_39,
    Html5QrcodeSupportedFormats.CODE_93,
    Html5QrcodeSupportedFormats.CODABAR,
    Html5QrcodeSupportedFormats.EAN_13,
    Html5QrcodeSupportedFormats.EAN_8,
    Html5QrcodeSupportedFormats.ITF,
    Html5QrcodeSupportedFormats.UPC_A,
    Html5QrcodeSupportedFormats.UPC_E,
  ];

  const html5QrCode = new Html5Qrcode(containerId, { formatsToSupport, verbose: false });
  let stopped = false;

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: { width: 280, height: 140 } },
    (decodedText) => {
      if (!stopped) {
        onResult(decodedText);
      }
    },
    (errorMessage) => {
      // بيتنادى باستمرار لو مفيش باركود في الفريم الحالي، تجاهل عادي
    }
  ).catch((err) => {
    if (onError) onError(err);
  });

  return {
    stop: async () => {
      stopped = true;
      try {
        await html5QrCode.stop();
        html5QrCode.clear();
      } catch (e) {
        // كانت السكانر متوقفة بالفعل
      }
    }
  };
}

// =========================================================
// تصدير مصفوفة من الكائنات كـ CSV وتنزيلها
// =========================================================
function exportToCSV(filename, rows) {
  if (!rows || rows.length === 0) {
    alert('لا توجد بيانات للتصدير');
    return;
  }
  const headers = Object.keys(rows[0]);
  const csvRows = [headers.join(',')];
  rows.forEach(row => {
    const values = headers.map(h => {
      let val = row[h] === null || row[h] === undefined ? '' : String(row[h]);
      val = val.replace(/"/g, '""');
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        val = `"${val}"`;
      }
      return val;
    });
    csvRows.push(values.join(','));
  });
  const csvContent = '\uFEFF' + csvRows.join('\n'); // BOM عشان العربي يظهر صح في Excel
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' });
}
