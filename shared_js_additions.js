
// =========================================================
// إضافات نظام المقارنات (Comparison System)
// تضاف في نهاية shared.js
// =========================================================

/**
 * استخراج جزء من النص (1-based indexing)
 * @param {string} str - النص الأصلي
 * @param {number} start - بداية الاستخراج (1-based)
 * @param {number} end - نهاية الاستخراج (1-based)
 * @returns {string|null}
 */
function extractSubstring(str, start, end) {
  if (!str || !start || !end) return null;
  // Convert 1-based to 0-based
  return str.substring(start - 1, end);
}

/**
 * تنسيق JSON للعرض
 * @param {Object} obj
 * @returns {string}
 */
function formatJSON(obj) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    return String(obj);
  }
}

/**
 * التحقق من صحة مدى الاستخراج
 * @param {string} range - النص "بداية-نهاية"
 * @returns {Object|null} {start, end} أو null
 */
function parseExtractRange(range) {
  if (!range || !range.includes('-')) return null;
  const parts = range.split('-').map(v => parseInt(v.trim(), 10));
  if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) return null;
  if (parts[0] < 1 || parts[1] < parts[0]) return null;
  return { start: parts[0], end: parts[1] };
}

/**
 * مقارنة قيمتين مع معالجة null/undefined
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
function safeCompare(a, b) {
  if (a === null || a === undefined) return b === null || b === undefined;
  if (b === null || b === undefined) return false;
  return String(a).trim() === String(b).trim();
}
