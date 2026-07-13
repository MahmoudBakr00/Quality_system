// =========================================================
// ملف مشترك لكل صفحات نظام تسجيل العيوب
// يحتاج: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
//        <script src="https://cdn.jsdelivr.net/npm/html5-qrcode@2.3.8/html5-qrcode.min.js"></script>
// قبل تحميل هذا الملف
// =========================================================

// =========================================================
// نظام تبديل اللغة (عربي / إنجليزي)
// =========================================================
const TRANSLATIONS = {
  ar: {
    login: 'تسجيل الدخول', register_tab: 'تسجيل حساب جديد', login_tab: 'دخول',
    email_label: 'البريد الإلكتروني', password_label: 'كلمة المرور', role_label: 'الدور',
    role_technician: 'فني', role_supervisor: 'مشرف محطة', role_admin: 'مهندس', role_general_supervisor: 'مشرف عام', role_maintenance: 'فني صيانة',
    login_btn: 'دخول', create_account_btn: 'إنشاء الحساب',
    supervisor_hint: 'تُنشأ حسابات المشرفين فقط من لوحة تحكم مدير النظام.',
    admin_code_label: 'كود تفعيل مدير النظام', forgot_password: 'نسيت كلمة المرور؟',
    send_reset_link: '📩 إرسال رابط إعادة التعيين', cancel_back_login: 'إلغاء والرجوع لتسجيل الدخول',
    reset_password_title: '🔑 إعادة تعيين كلمة المرور', footer_text: 'نظام تسجيل ومتابعة العيوب',
    home: '🏠 الرئيسية', logout: 'تسجيل خروج', dashboard: '📊 لوحة التحكم',
    register_defect_title: '🔍 تسجيل عيب', track_product_title: '📦 تتبع منتج',
    register_defect_desc: 'سكان بالكاميرا أو كتابة السيريال يدويًا',
    track_product_desc: 'اعرف كل ما حدث للمنتج في كل المحطات',
    dashboard_desc: 'استعراض وإدارة العيوب المسجلة',
    choose_option: 'اختر من الخيارات التالية', system_title: 'نظام تسجيل ومتابعة العيوب',
    change_password: '🔑 تغيير كلمة المرور',
    serial_label: 'السيريال', scan_btn: '📷 سكان', stage_label: 'محطة الفحص',
    defect_type_label: 'نوع العيب', description_label: 'وصف العيب (اختياري)',
    submit_defect_btn: '✅ تسجيل العيب', search_btn: '🔍 بحث',
    manage_stations: '🏭 إدارة المحطات', manage_users: '👥 إدارة المستخدمين',
    all_stations: 'كل المحطات', all_statuses: 'كل الحالات',
    status_pending: 'قيد المراجعة', status_approved: 'معتمد', status_rejected: 'مرفوض',
    filter_btn: '🔍 تصفية', reset_btn: '↺ إعادة تعيين', export_btn: '⬇ تصدير',
    delete_selected: '🗑 حذف المحدد', print_report: '🖨️ طباعة / حفظ كـ PDF',
    col_serial: 'السيريال', col_job_order: 'الجوب أوردر', col_station: 'المحطة',
    col_defect_type: 'نوع العيب', col_status: 'الحالة', col_technician: 'الفني', col_date: 'التاريخ',
    add_new_user: '➕ إضافة مستخدم جديد (مشرف / مدير نظام / فني)',
    registered_users: '📋 المستخدمين المسجلين', create_account: '➕ إنشاء حساب',
  },
  en: {
    login: 'Login', register_tab: 'Create Account', login_tab: 'Login',
    email_label: 'Email', password_label: 'Password', role_label: 'Role',
    role_technician: 'Technician', role_supervisor: 'Station Supervisor', role_admin: 'Engineer', role_general_supervisor: 'General Supervisor', role_maintenance: 'Maintenance Technician',
    login_btn: 'Login', create_account_btn: 'Create Account',
    supervisor_hint: 'Supervisor accounts can only be created from the admin panel.',
    admin_code_label: 'Admin Activation Code', forgot_password: 'Forgot password?',
    send_reset_link: '📩 Send Reset Link', cancel_back_login: 'Cancel and back to login',
    reset_password_title: '🔑 Reset Password', footer_text: 'Defect Tracking System',
    home: '🏠 Home', logout: 'Logout', dashboard: '📊 Dashboard',
    register_defect_title: '🔍 Register Defect', track_product_title: '📦 Track Product',
    register_defect_desc: 'Scan with camera or type the serial manually',
    track_product_desc: 'See everything that happened to the product across all stations',
    dashboard_desc: 'View and manage registered defects',
    choose_option: 'Choose one of the following options', system_title: 'Defect Tracking System',
    change_password: '🔑 Change Password',
    serial_label: 'Serial Number', scan_btn: '📷 Scan', stage_label: 'Inspection Station',
    defect_type_label: 'Defect Type', description_label: 'Defect Description (optional)',
    submit_defect_btn: '✅ Register Defect', search_btn: '🔍 Search',
    manage_stations: '🏭 Manage Stations', manage_users: '👥 Manage Users',
    all_stations: 'All Stations', all_statuses: 'All Statuses',
    status_pending: 'Pending', status_approved: 'Approved', status_rejected: 'Rejected',
    filter_btn: '🔍 Filter', reset_btn: '↺ Reset', export_btn: '⬇ Export',
    delete_selected: '🗑 Delete Selected', print_report: '🖨️ Print / Save as PDF',
    col_serial: 'Serial', col_job_order: 'Job Order', col_station: 'Station',
    col_defect_type: 'Defect Type', col_status: 'Status', col_technician: 'Technician', col_date: 'Date',
    add_new_user: '➕ Add New User (Supervisor / Admin / Technician)',
    registered_users: '📋 Registered Users', create_account: '➕ Create Account',
  }
};

function getLang() {
  return localStorage.getItem('app_lang') || 'ar';
}

function setLang(lang) {
  localStorage.setItem('app_lang', lang);
}

function t(key) {
  const lang = getLang();
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.ar[key] || key;
}

function applyDirection() {
  const lang = getLang();
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

// يطبّق الترجمة على أي عنصر عليه data-i18n أو data-i18n-placeholder
function applyTranslations() {
  applyDirection();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
}

function toggleLang() {
  setLang(getLang() === 'ar' ? 'en' : 'ar');
  location.reload();
}

// عنصر زر تبديل اللغة، يُضاف داخل أي header عن طريق استدعاء renderLangToggle('containerId')
function renderLangToggle(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const btn = document.createElement('button');
  btn.textContent = getLang() === 'ar' ? '🌐 EN' : '🌐 عربي';
  btn.style.cssText = 'color:#93c5fd; background:#334155; border:none; padding:8px 16px; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer;';
  btn.addEventListener('click', toggleLang);
  container.appendChild(btn);
}

const SUPABASE_URL = "https://igdfaqiaprhgsdrqcxfj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_2Vw18qr3DeAt7Ge7onvXLA_Gr02sm2e";
const sbClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function getRoleName(role) {
  return t('role_' + role) || role;
}
// للتوافق مع الكود القديم اللي بيستخدم ROLE_NAMES مباشرة
const ROLE_NAMES = new Proxy({}, { get: (_, role) => getRoleName(role) });

// =========================================================
// التحقق من الجلسة + جلب البروفايل، مع إمكانية تقييد الصفحة بأدوار معينة
// allowedRoles: مصفوفة أدوار مسموحة، أو null للسماح للجميع
// =========================================================
const CACHED_ROLE_KEY = 'cached_user_role';

async function requireAuth(allowedRoles = null) {
  // getSession() بيقرا من التخزين المحلي مباشرة (من غير طلب شبكة) - أسرع وأضمن
  const { data: { session } } = await sbClient.auth.getSession();
  if (!session || !session.user) {
    window.location.href = 'index.html';
    return null;
  }
  const user = session.user;

  let role = null;
  try {
    const { data: profile, error } = await sbClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    role = profile.role;
    localStorage.setItem(CACHED_ROLE_KEY, role); // نخزن آخر دور معروف عشان نستخدمه لو الشبكة فشلت المرة الجاية
  } catch (err) {
    // فشل جلب الدور (غالبًا انقطاع/بطء مؤقت في النت) - نستخدم آخر دور محفوظ بدل ما نعمل تسجيل خروج قسري
    console.warn('تعذر جلب بيانات المستخدم، سيتم استخدام آخر دور محفوظ محليًا:', err);
    role = localStorage.getItem(CACHED_ROLE_KEY);
    if (!role) {
      // معندناش أي دور محفوظ خالص (أول مرة يفتح فيها الصفحة دي) - هنا فعلاً لازم نرجعه لتسجيل الدخول
      window.location.href = 'index.html';
      return null;
    }
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    alert('⛔ ليس لديك صلاحية الوصول لهذه الصفحة');
    window.location.href = 'home.html';
    return null;
  }

  return { user, role };
}

async function logout() {
  await sbClient.auth.signOut();
  window.location.href = 'index.html';
}

// =========================================================
// استخراج الجوب أوردر من السيريال (نسخة طرف العميل، مطابقة لدالة قاعدة البيانات)
// القاعدة: تجاهل أول 3 حروف/أرقام من الشمال، وخد الـ 8 اللي بعدهم
// =========================================================
function extractJobOrder(serial) {
  if (!serial || serial.length <= 3) return null;
  return serial.substring(3, 11);
}

// =========================================================
// سكان عام (باركود و/أو QR حسب الصيغ المطلوبة)
// containerId: عنصر div هيظهر فيه الفيديو
// formats: مصفوفة Html5QrcodeSupportedFormats المطلوبة
// onResult: callback(decodedText) بيتنفذ لما يلاقي كود
// بترجع كائن فيه دالة stop() لإيقاف السكانر
// =========================================================
function startScanner(containerId, formats, onResult, onError) {
  const html5QrCode = new Html5Qrcode(containerId, { formatsToSupport: formats, verbose: false });
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
      // بيتنادى باستمرار لو مفيش كود في الفريم الحالي، تجاهل عادي
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

// سكان الباركود بالكاميرا (باركود عادي بس، مش QR) - للاستخدامات القديمة
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
  return startScanner(containerId, formatsToSupport, onResult, onError);
}

// سكان QR Code بس (للينكات في مرحلة الفحص الجديدة)
function startQrScanner(containerId, onResult, onError) {
  return startScanner(containerId, [Html5QrcodeSupportedFormats.QR_CODE], onResult, onError);
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

// =========================================================
// نظام الطابور المحلي (Offline Queue) لتسجيل العيوب أثناء انقطاع النت
// =========================================================
const PENDING_QUEUE_KEY = 'pending_defects_queue';
const CACHE_STAGES_KEY = 'cached_stages';
const CACHE_DEFECT_TYPES_KEY = 'cached_defect_types';

function getPendingQueue() {
  try {
    return JSON.parse(localStorage.getItem(PENDING_QUEUE_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function savePendingQueue(queue) {
  localStorage.setItem(PENDING_QUEUE_KEY, JSON.stringify(queue));
}

function getPendingCount() {
  return getPendingQueue().length;
}

// =========================================================
// توليد كود عيب فريد من المتصفح نفسه (تاريخ + جزء عشوائي)
// بيتولد فور ما الفني يسحب السيريال، عشان يضمن عدم التكرار
// حتى لو النت مقطوع أو المزامنة اتكررت لأي سبب
// شكل الكود: 20260712-A3F9K2
// =========================================================
function generateDefectCode() {
  const today = new Date();
  const datePart = today.getFullYear().toString()
    + String(today.getMonth() + 1).padStart(2, '0')
    + String(today.getDate()).padStart(2, '0');

  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // بدون حروف/أرقام ممكن تتلخبط زي O/0 أو I/1
  let randomPart = '';
  for (let i = 0; i < 6; i++) {
    randomPart += chars[Math.floor(Math.random() * chars.length)];
  }
  return datePart + '-' + randomPart;
}

// يحفظ العيب محليًا لما التسجيل يفشل بسبب الاتصال
function queueDefectOffline(defectData) {
  const queue = getPendingQueue();
  const localId = 'local_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
  // معرّف فريد بيتبعت مع العيب نفسه لقاعدة البيانات، عشان لو حصل أي تكرار
  // في محاولة المزامنة (من تاب تاني مثلاً)، قاعدة البيانات ترفض النسخة الزيادة تلقائيًا
  if (!defectData.client_ref_id) {
    defectData.client_ref_id = localId;
  }
  queue.push({ localId, data: defectData, queuedAt: new Date().toISOString() });
  savePendingQueue(queue);
  return localId;
}

// يحاول يرفع كل العيوب المحفوظة محليًا لما الاتصال يرجع
let isSyncingDefects = false; // قفل يمنع تنفيذ المزامنة أكتر من مرة في نفس اللحظة

async function syncPendingDefects() {
  if (isSyncingDefects) {
    // في مزامنة شغالة بالفعل، منعملش حاجة عشان منرفعش نفس العيوب مرتين
    return { synced: 0, failed: 0 };
  }
  isSyncingDefects = true;

  try {
    const queue = getPendingQueue();
    if (queue.length === 0) return { synced: 0, failed: 0 };

    // نفضّي الطابور فورًا (قبل ما نبدأ نرفع) عشان أي محاولة مزامنة تانية
    // تحصل في نفس اللحظة متلاقيش نفس العناصر تاني
    savePendingQueue([]);

    let synced = 0;
    const remaining = [];

    for (const item of queue) {
      try {
        console.log('🔄 محاولة مزامنة عيب:', item.localId, item.data);
        const { data: insertedRows, error, status, statusText } = await sbClient
          .from('defects')
          .insert([item.data])
          .select('id, defect_code');

        console.log('📡 رد السيرفر الكامل:', { insertedRows, error, status, statusText });

        if (error) {
          console.error('❌ فشلت مزامنة العيب:', item.localId, 'الخطأ الكامل:', JSON.stringify(error));
          const isDuplicate = error.code === '23505';
          if (isDuplicate) {
            console.warn('⚠️ اتعامل معاها كتكرار حقيقي (كود 23505) - العيب ده كان موجود بالفعل');
            synced++;
          } else {
            throw error;
          }
        } else if (!insertedRows || insertedRows.length === 0) {
          // مفيش خطأ ظاهر، بس كمان مفيش صف رجع فعليًا - ده مؤشر خطير إن الإدراج
          // اترفض بصمت (زي Trigger أو RLS بيرجع بدون خطأ)
          console.error('🚨🚨 تحذير خطير: الطلب "نجح" من غير خطأ، بس مفيش صف رجع من قاعدة البيانات! العيب ده على الأرجح ما اتسجلش فعليًا رغم عدم وجود خطأ ظاهر:', item.localId);
          throw new Error('نجح الطلب لكن لم يتم إرجاع أي صف - يُشتبه في رفض صامت من قاعدة البيانات');
        } else {
          console.log('✅ نجحت مزامنة العيب فعليًا وتأكدنا من الصف:', item.localId, 'كود العيب:', insertedRows[0].defect_code);
          synced++;
        }
      } catch (e) {
        console.error('🚨 العيب هيرجع للطابور يتحاول تاني:', item.localId, e);
        remaining.push(item); // نسيبه في الطابور نحاول تاني بعدين
      }
    }

    if (remaining.length > 0) {
      // ندمج أي عناصر جديدة اتضافت أثناء ما إحنا بنرفع، مع العناصر اللي فشلت
      const currentQueue = getPendingQueue();
      savePendingQueue([...currentQueue, ...remaining]);
    }

    return { synced, failed: remaining.length };
  } finally {
    isSyncingDefects = false;
  }
}

// يحفظ نسخة من المحطات/أنواع العيوب محليًا كل ما نجحنا نجيبها أونلاين
// عشان تفضل متاحة حتى لو النت اتقطع بعد كده
function cacheStages(stages) {
  localStorage.setItem(CACHE_STAGES_KEY, JSON.stringify(stages || []));
}
function getCachedStages() {
  try { return JSON.parse(localStorage.getItem(CACHE_STAGES_KEY) || '[]'); }
  catch (e) { return []; }
}
function cacheDefectTypes(stageId, types) {
  const all = (() => { try { return JSON.parse(localStorage.getItem(CACHE_DEFECT_TYPES_KEY) || '{}'); } catch (e) { return {}; } })();
  all[stageId] = types || [];
  localStorage.setItem(CACHE_DEFECT_TYPES_KEY, JSON.stringify(all));
}
function getCachedDefectTypes(stageId) {
  try {
    const all = JSON.parse(localStorage.getItem(CACHE_DEFECT_TYPES_KEY) || '{}');
    return all[stageId] || [];
  } catch (e) { return []; }
}

// =========================================================
// مزامنة شاملة: تنزيل كل البيانات (محطات + أنواع عيوب + كل العيوب) محليًا
// بتتنفذ بعد تسجيل الدخول عشان الموقع يشتغل بالكامل حتى لو النت اتقطع بعدين
// =========================================================
const CACHE_ALL_DEFECTS_KEY = 'cached_all_defects';
const CACHE_LAST_SYNC_KEY = 'cached_last_full_sync';

async function syncAllDataForOffline() {
  try {
    const [stagesRes, defectTypesRes, defectsRes] = await Promise.all([
      sbClient.from('stages').select('*').order('name'),
      sbClient.from('defect_types').select('*'),
      sbClient.from('defects').select('*, stages(name, line_no)').order('created_at', { ascending: false }),
    ]);

    if (!stagesRes.error) cacheStages(stagesRes.data);

    if (!defectTypesRes.error) {
      const grouped = {};
      (defectTypesRes.data || []).forEach((dt) => {
        if (!grouped[dt.stage_id]) grouped[dt.stage_id] = [];
        grouped[dt.stage_id].push(dt);
      });
      localStorage.setItem(CACHE_DEFECT_TYPES_KEY, JSON.stringify(grouped));
    }

    if (!defectsRes.error) {
      localStorage.setItem(CACHE_ALL_DEFECTS_KEY, JSON.stringify(defectsRes.data || []));
    }

    localStorage.setItem(CACHE_LAST_SYNC_KEY, new Date().toISOString());
    return true;
  } catch (e) {
    console.warn('فشلت المزامنة الشاملة (غالبًا مفيش نت حاليًا):', e);
    return false;
  }
}

function getCachedAllDefects() {
  try { return JSON.parse(localStorage.getItem(CACHE_ALL_DEFECTS_KEY) || '[]'); }
  catch (e) { return []; }
}

// نسخة خفيفة: تحدّث المحطات وأنواع العيوب بس (من غير سجل العيوب الكامل)
// مفيدة للصفحات اللي محتاجة بس فورم التسجيل، عشان متبطأش الصفحة
async function syncFormDataForOffline() {
  try {
    const [stagesRes, defectTypesRes] = await Promise.all([
      sbClient.from('stages').select('*').order('name'),
      sbClient.from('defect_types').select('*'),
    ]);

    if (!stagesRes.error) cacheStages(stagesRes.data);

    if (!defectTypesRes.error) {
      const grouped = {};
      (defectTypesRes.data || []).forEach((dt) => {
        if (!grouped[dt.stage_id]) grouped[dt.stage_id] = [];
        grouped[dt.stage_id].push(dt);
      });
      localStorage.setItem(CACHE_DEFECT_TYPES_KEY, JSON.stringify(grouped));
    }
    return true;
  } catch (e) {
    console.warn('فشلت مزامنة بيانات الفورم (غالبًا مفيش نت حاليًا):', e);
    return false;
  }
}

function getLastSyncTime() {
  return localStorage.getItem(CACHE_LAST_SYNC_KEY);
}

// =========================================================
// حفظ إيميل آخر مستخدم دخل (بدون كلمة المرور لأسباب أمان)
// عشان يظهر جاهز في خانة الإيميل تلقائيًا في المرة الجاية
// =========================================================
const REMEMBERED_EMAIL_KEY = 'remembered_email';

function saveRememberedEmail(email) {
  localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
}

// =========================================================
// يحوّل أي <select> عادي لقائمة قابلة للبحث (بحث "يحتوي على" في
// أي مكان من النص، مش بس "يبدأ بـ" زي سلوك المتصفح الافتراضي)
// بيشتغل فوق نفس الـ <select> الأصلي من غير ما يغيّر أي كود تاني
// بيستخدمه أو بيسمعه (change event لسه شغال زي ما هو)
// =========================================================
function injectSearchableSelectStyles() {
  if (document.getElementById('searchableSelectStyles')) return;
  const style = document.createElement('style');
  style.id = 'searchableSelectStyles';
  style.textContent = `
    .searchable-select-wrapper { position: relative; margin-bottom: 18px; user-select: none; }
    .searchable-select-box {
      width: 100%; padding: 12px 14px; border-radius: 8px;
      background: #334155; color: #f1f5f9; font-size: 15px;
      display: flex; justify-content: space-between; align-items: center;
      cursor: pointer; border: 2px solid transparent;
    }
    .searchable-select-box.open { border-color: #3b82f6; border-radius: 8px 8px 0 0; }
    .searchable-select-box.disabled { opacity: 0.6; cursor: not-allowed; }
    .searchable-select-box .arrow { font-size: 11px; color: #94a3b8; transition: transform .15s; }
    .searchable-select-box.open .arrow { transform: rotate(180deg); }
    .searchable-select-box .box-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .searchable-select-box .box-label.placeholder { color: #94a3b8; }
    .searchable-select-panel {
      display: none; background: #1e293b; border: 2px solid #3b82f6; border-top: none;
      border-radius: 0 0 8px 8px; overflow: hidden; position: absolute; top: 100%; right: 0; left: 0; z-index: 200;
    }
    .searchable-select-panel.open { display: block; }
    .searchable-select-input {
      width: 100%; padding: 10px 14px; border: none; border-bottom: 1px solid #334155;
      background: #0f172a; color: #f1f5f9; font-size: 14px; margin: 0;
    }
    .searchable-select-input:focus { outline: none; }
    .searchable-select-list { max-height: 220px; overflow-y: auto; }
    .searchable-select-item {
      padding: 10px 14px; cursor: pointer; font-size: 14px; color: #f1f5f9;
    }
    .searchable-select-item:hover { background: #334155; }
    .searchable-select-item.selected { background: #3b82f6; color: white; }
    .searchable-select-item.disabled { color: #64748b; cursor: not-allowed; }
    .searchable-select-empty { padding: 10px 14px; color: #64748b; font-size: 13px; text-align: center; }
  `;
  document.head.appendChild(style);
}

function makeSelectSearchable(selectId) {
  injectSearchableSelectStyles();

  const select = document.getElementById(selectId);
  if (!select || select.dataset.searchableInit) return;
  select.dataset.searchableInit = '1';

  const wrapper = document.createElement('div');
  wrapper.className = 'searchable-select-wrapper';
  select.parentNode.insertBefore(wrapper, select);
  wrapper.appendChild(select);
  select.style.display = 'none';

  // الصندوق الظاهر (زي الـ select العادي)
  const box = document.createElement('div');
  box.className = 'searchable-select-box';
  box.tabIndex = 0;
  const boxLabel = document.createElement('span');
  boxLabel.className = 'box-label';
  const arrow = document.createElement('span');
  arrow.className = 'arrow';
  arrow.textContent = '▼';
  box.appendChild(boxLabel);
  box.appendChild(arrow);
  wrapper.appendChild(box);

  // اللوحة اللي بتفتح تحت (input + list)
  const panel = document.createElement('div');
  panel.className = 'searchable-select-panel';
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'searchable-select-input';
  input.autocomplete = 'off';
  input.placeholder = 'اكتب للبحث...';
  const list = document.createElement('div');
  list.className = 'searchable-select-list';
  panel.appendChild(input);
  panel.appendChild(list);
  wrapper.appendChild(panel);

  function buildList(filter) {
    list.innerHTML = '';
    const term = (filter || '').trim().toLowerCase();
    const opts = Array.from(select.options);
    const filtered = term ? opts.filter(o => o.textContent.toLowerCase().includes(term)) : opts;
    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'searchable-select-empty';
      empty.textContent = 'لا توجد نتائج';
      list.appendChild(empty);
      return;
    }
    filtered.forEach(o => {
      const item = document.createElement('div');
      item.className = 'searchable-select-item';
      if (o.disabled) item.classList.add('disabled');
      if (o.value === select.value) item.classList.add('selected');
      item.textContent = o.textContent;
      item.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (o.disabled) return;
        select.value = o.value;
        closePanel();
        select.dispatchEvent(new Event('change'));
      });
      list.appendChild(item);
    });
  }

  function openPanel() {
    if (select.disabled) return;
    box.classList.add('open');
    panel.classList.add('open');
    input.value = '';
    buildList('');
    input.focus();
  }
  function closePanel() {
    box.classList.remove('open');
    panel.classList.remove('open');
    syncBox();
  }
  function togglePanel() {
    panel.classList.contains('open') ? closePanel() : openPanel();
  }
  function syncBox() {
    const opt = select.options[select.selectedIndex];
    if (opt && opt.value) {
      boxLabel.textContent = opt.textContent;
      boxLabel.classList.remove('placeholder');
    } else {
      boxLabel.textContent = opt ? opt.textContent : 'اختر...';
      boxLabel.classList.add('placeholder');
    }
    box.classList.toggle('disabled', select.disabled);
  }

  box.addEventListener('click', () => { if (!select.disabled) togglePanel(); });
  input.addEventListener('input', () => buildList(input.value));
  document.addEventListener('click', (e) => { if (!wrapper.contains(e.target)) closePanel(); });

  const observer = new MutationObserver(() => {
    syncBox();
    if (panel.classList.contains('open')) buildList(input.value);
  });
  observer.observe(select, { childList: true, subtree: true, attributes: true, attributeFilter: ['disabled'] });

  select.addEventListener('change', syncBox);
  syncBox();

  // نسجّل دالة تحديث قسرية لهذا الـ select عشان تتنادى من كود الصفحة
  // مباشرة بعد أي تحميل بيانات جديد، من غير ما نعتمد بس على المراقبة التلقائية
  searchableSelectRefreshers[selectId] = () => {
    syncBox();
    if (panel.classList.contains('open')) buildList(input.value);
  };
}

function getRememberedEmail() {
  return localStorage.getItem(REMEMBERED_EMAIL_KEY) || '';
}

// دالة تحديث قسري لودجت البحث - تتنادى بعد أي تغيير برمجي لخيارات الـ select
// (زي تحميل بيانات جديدة) عشان نضمن إن الودجت يعرض أحدث الخيارات فورًا
// من غير ما نعتمد بس على المراقبة التلقائية (MutationObserver)
const searchableSelectRefreshers = {};
function refreshSearchableSelect(selectId) {
  if (searchableSelectRefreshers[selectId]) {
    searchableSelectRefreshers[selectId]();
  }
}

// =========================================================
// إشعارات التليفون (Web Push) - بتظهر حتى لو التطبيق مقفول
// =========================================================
const VAPID_PUBLIC_KEY = 'BKhU2nSJ79OywRiEUpKcWU-0bAmSwpWjqGIJl32aEefHzfg1TVa2kzY2vdwH16-_B3QMH1Jzg9Jr9RBBA5J6WUs';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function isPushSubscribed() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false;
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  return !!subscription;
}

async function enablePhoneNotifications(userId) {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    alert('⚠️ متصفحك لا يدعم إشعارات التليفون. جرب من Chrome أو Edge على أندرويد.');
    return false;
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    alert('⚠️ لازم توافق على إذن الإشعارات من المتصفح عشان الميزة دي تشتغل.');
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }

    const subJson = subscription.toJSON();
    const { error } = await sbClient.from('push_subscriptions').upsert({
      user_id: userId,
      endpoint: subJson.endpoint,
      p256dh: subJson.keys.p256dh,
      auth_key: subJson.keys.auth,
    }, { onConflict: 'endpoint' });

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('فشل تفعيل إشعارات التليفون:', err);
    alert('❌ حدث خطأ أثناء تفعيل الإشعارات: ' + err.message);
    return false;
  }
}

async function disablePhoneNotifications() {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      await sbClient.from('push_subscriptions').delete().eq('endpoint', subscription.endpoint);
      await subscription.unsubscribe();
    }
    return true;
  } catch (err) {
    console.error('فشل إلغاء إشعارات التليفون:', err);
    return false;
  }
}

// زر بسيط قابل لإعادة الاستخدام لتفعيل/إلغاء إشعارات التليفون
async function renderPushToggleButton(containerId, userId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return; // المتصفح مش بيدعم

  async function update() {
    const subscribed = await isPushSubscribed();
    container.innerHTML = `
      <button id="pushToggleBtn" style="background:${subscribed ? '#22c55e' : '#334155'}; color:white; border:none; padding:8px 14px; border-radius:8px; cursor:pointer; font-size:12px; font-weight:bold;">
        ${subscribed ? '🔔 إشعارات التليفون مفعّلة' : '🔕 تفعيل إشعارات التليفون'}
      </button>
    `;
    document.getElementById('pushToggleBtn').addEventListener('click', async () => {
      const btn = document.getElementById('pushToggleBtn');
      btn.disabled = true;
      if (subscribed) {
        await disablePhoneNotifications();
      } else {
        await enablePhoneNotifications(userId);
      }
      btn.disabled = false;
      update();
    });
  }
  update();
}

// =========================================================
// نظام الإشعارات (جرس + صوت تنبيه + قائمة منسدلة)
// =========================================================
function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.value = 880;
    gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.3);
  } catch (e) {
    // بعض المتصفحات بتمنع الصوت التلقائي قبل أول تفاعل من المستخدم - تجاهل بهدوء
  }
}

function renderNotificationBell(containerId, userId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const NOTIFIED_KEY = 'notified_sound_ids';
  let notifiedIds = new Set();
  try { notifiedIds = new Set(JSON.parse(localStorage.getItem(NOTIFIED_KEY) || '[]')); } catch (e) {}

  async function fetchAndRender() {
    const { data, error } = await sbClient
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error || !data) return;
    const unread = data.filter(n => !n.is_read);

    // صوت تنبيه للإشعارات الجديدة اللي لسه ما نبهناش عليها قبل كده
    const newOnes = unread.filter(n => !notifiedIds.has(n.id));
    if (newOnes.length > 0) {
      playNotificationSound();
      newOnes.forEach(n => notifiedIds.add(n.id));
      localStorage.setItem(NOTIFIED_KEY, JSON.stringify([...notifiedIds]));
    }

    const wasOpen = document.getElementById('notifDropdown')?.style.display === 'block';

    container.innerHTML = `
      <div style="position:relative; display:inline-block;">
        <button id="notifBellBtn" style="background:#334155; border:none; color:#f1f5f9; padding:8px 12px; border-radius:8px; cursor:pointer; font-size:16px; position:relative;">
          🔔
          ${unread.length > 0 ? `<span style="position:absolute; top:-4px; left:-4px; background:#ef4444; color:white; font-size:10px; font-weight:bold; border-radius:50%; width:18px; height:18px; display:flex; align-items:center; justify-content:center;">${unread.length}</span>` : ''}
        </button>
        <div id="notifDropdown" style="display:${wasOpen ? 'block' : 'none'}; position:absolute; top:110%; left:0; background:#1e293b; border:1px solid #334155; border-radius:10px; padding:10px; width:300px; max-height:400px; overflow-y:auto; z-index:1000; box-shadow:0 8px 24px rgba(0,0,0,0.5);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="color:#60a5fa; font-weight:bold; font-size:13px;">🔔 الإشعارات</span>
            ${unread.length > 0 ? `<button id="markAllReadBtn" style="background:none; border:none; color:#93c5fd; font-size:11px; cursor:pointer;">تحديد الكل كمقروء</button>` : ''}
          </div>
          ${data.length === 0 ? '<div style="color:#64748b; font-size:12px; padding:10px; text-align:center;">لا توجد إشعارات</div>' : data.map(n => `
            <div class="notif-item-row" data-id="${n.id}" style="background:${n.is_read ? '#0f172a' : '#334155'}; border-radius:8px; padding:10px; margin-bottom:6px; cursor:pointer; ${!n.is_read ? 'border-right:3px solid #3b82f6;' : ''}">
              <div style="font-weight:bold; font-size:12px; color:#f1f5f9;">${n.title}</div>
              <div style="font-size:11px; color:#94a3b8; margin-top:2px;">${n.message}</div>
              <div style="font-size:10px; color:#64748b; margin-top:4px;">${formatDate(n.created_at)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.getElementById('notifBellBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = document.getElementById('notifDropdown');
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });

    container.querySelectorAll('.notif-item-row').forEach(row => {
      row.addEventListener('click', async () => {
        const notif = data.find(n => n.id === row.dataset.id);
        await sbClient.from('notifications').update({ is_read: true }).eq('id', row.dataset.id);

        // لو الإشعار مرتبط بعيب، وديه مباشرة لتفاصيله في الداشبورد
        if (notif && notif.type === 'defect' && notif.related_id) {
          window.location.href = 'dashboard.html?defect_id=' + notif.related_id;
          return;
        }

        fetchAndRender();
      });
    });

    const markAllBtn = document.getElementById('markAllReadBtn');
    if (markAllBtn) {
      markAllBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        await sbClient.from('notifications').update({ is_read: true }).eq('user_id', userId).eq('is_read', false);
        fetchAndRender();
      });
    }
  }

  // إغلاق القائمة لو ضغطنا برة منها
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('notifDropdown');
    if (dropdown && !container.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });

  fetchAndRender();
  setInterval(fetchAndRender, 30000); // نسخة احتياطية لو الاتصال اللحظي انقطع لأي سبب

  // اشتراك لحظي (Realtime): أي إشعار جديد يوصل فورًا من غير استنى الفحص الدوري
  try {
    sbClient
      .channel('notifications-' + userId)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      }, () => {
        fetchAndRender();
      })
      .subscribe();
  } catch (e) {
    console.warn('فشل الاشتراك اللحظي للإشعارات، هيتم الاعتماد على الفحص الدوري بس:', e);
  }
}

// =========================================================
// لوحة تشخيص بسيطة تظهر في الصفحة نفسها (مفيدة على الموبايل حيث
// أدوات المطور صعبة الوصول)
// =========================================================
function renderDiagnosticsPanel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  function update() {
    const stages = getCachedStages();
    const allDefectsCached = getCachedAllDefects();
    const pendingCount = getPendingCount();
    const lastSync = getLastSyncTime();
    const online = navigator.onLine;

    let defectTypesCount = 0;
    let defectTypesByStage = '';
    try {
      const grouped = JSON.parse(localStorage.getItem(CACHE_DEFECT_TYPES_KEY) || '{}');
      defectTypesCount = Object.values(grouped).reduce((sum, arr) => sum + (arr ? arr.length : 0), 0);
      defectTypesByStage = Object.entries(grouped).map(([stageId, types]) => {
        const stageName = (stages.find(s => s.id === stageId) || {}).name || stageId;
        return `${stageName}: ${(types || []).length}`;
      }).join(' | ') || 'لا يوجد';
    } catch (e) { defectTypesCount = 0; defectTypesByStage = 'خطأ في القراءة'; }

    container.innerHTML = `
      <div style="background:#0f172a; border:1px solid #334155; border-radius:10px; padding:14px; font-size:12px; color:#cbd5e1; direction:ltr; text-align:left;">
        <div style="font-weight:bold; color:#60a5fa; margin-bottom:8px; direction:rtl; text-align:right;">🔧 لوحة التشخيص</div>
        <div>الاتصال بالنت (navigator.onLine): <b style="color:${online ? '#4ade80' : '#f87171'}">${online ? 'متصل ✅' : 'غير متصل ❌'}</b></div>
        <div>عدد المحطات المحفوظة محليًا: <b>${stages.length}</b></div>
        <div style="direction:rtl; text-align:right; color:#fbbf24; margin:4px 0;">أسماء المحطات المحفوظة: ${stages.length > 0 ? stages.map(s => s.name).join('، ') : '⚠️ لا توجد أي محطة محفوظة'}</div>
        <div>عدد أنواع العيوب المحفوظة محليًا (كل المحطات): <b>${defectTypesCount}</b></div>
        <div style="direction:rtl; text-align:right; color:#a78bfa; margin:4px 0;">تفصيل أنواع العيوب لكل محطة: ${defectTypesByStage}</div>
        <div>عدد العيوب المحفوظة محليًا (نسخة كاملة): <b>${allDefectsCached.length}</b></div>
        <div>عدد العيوب في انتظار الرفع: <b>${pendingCount}</b></div>
        <div>آخر مزامنة شاملة ناجحة: <b>${lastSync ? formatDate(lastSync) : 'لم تتم أبدًا'}</b></div>
      </div>
    `;
  }

  update();
  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  setInterval(update, 3000);
}

// شارة صغيرة قابلة لإعادة الاستخدام توضح عدد العيوب المنتظرة + زر مزامنة يدوي
function renderPendingBadge(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  function update() {
    const count = getPendingCount();
    container.innerHTML = '';
    if (count === 0) return;
    const badge = document.createElement('div');
    badge.style.cssText = 'background:#fbbf24; color:#78350f; padding:8px 14px; border-radius:8px; font-size:12px; font-weight:bold; display:flex; align-items:center; gap:8px; margin-bottom:10px;';
    badge.innerHTML = `⏳ ${count} عيب محفوظ محليًا في انتظار الرفع <button id="manualSyncBtn" style="background:#78350f; color:white; border:none; padding:4px 10px; border-radius:6px; cursor:pointer; font-size:11px;">🔄 مزامنة الآن</button>`;
    container.appendChild(badge);
    document.getElementById('manualSyncBtn').addEventListener('click', async () => {
      const result = await syncPendingDefects();
      alert(`✅ تمت مزامنة ${result.synced} عيب${result.failed > 0 ? ` (لا يزال هناك ${result.failed} عنصر لم تتم مزامنته بنجاح، وستتم إعادة المحاولة لاحقًا)` : ''}`);
      update();
    });
  }

  update();
  window.addEventListener('online', update); // بس تحديث الشارة، المزامنة الفعلية بتحصل من مكان واحد مركزي تحت
  window.addEventListener('defects-synced', update); // تحديث فوري بمجرد ما المزامنة المركزية تخلص
  // إعادة فحص كل شوية في حالة نجاح المزامنة من صفحة تانية
  setInterval(update, 5000);
}

// عند رجوع الاتصال في أي صفحة، حاول مزامنة الطابور تلقائيًا في الخلفية (مكان واحد فقط)
window.addEventListener('online', async () => {
  await syncPendingDefects();
  window.dispatchEvent(new CustomEvent('defects-synced'));
});

// =========================================================
// تسجيل Service Worker (نسخة v3 مصححة - Network-First للصفحات)
// عشان الموقع يفتح ويتنقل بين صفحاته حتى بدون نت بعد أول زيارة ناجحة.
// ملحوظة: لو جهازك سجّل نسخة قديمة معطوبة من قبل، لازم تعمل
// Unregister + Clear site data يدويًا مرة واحدة الأول (من Developer Tools)
// عشان النسخة الجديدة دي تسجل بدل القديمة.
// =========================================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch((err) => {
      console.warn('فشل تسجيل Service Worker:', err);
    });
  });
}
