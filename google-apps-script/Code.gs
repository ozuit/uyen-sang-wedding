/**
 * Dán TOÀN BỘ file này vào Apps Script gắn với Google Sheet.
 *
 * BẮT BUỘC sau khi dán:
 * 1. Chọn hàm setupSheet → bấm Chạy (sửa header sheet thành 5 cột)
 * 2. Triển khai → Quản lý triển khai → Chỉnh sửa (biểu tượng bút) → Phiên bản mới → Triển khai
 *    (Chỉ bấm Lưu KHÔNG cập nhật Web App — phải tạo phiên bản triển khai mới!)
 * 3. Mở URL Web App /exec trên trình duyệt — phải thấy version "5-col-khach"
 *
 * Sheet 5 cột: Thời gian | Họ tên | Tham dự | Lời nhắn | Khách
 * Khách = "Nhà trai" hoặc "Nhà gái" (tự gắn theo link /nha-trai hoặc /nha-gai)
 */

var SCRIPT_VERSION = '5-col-khach'

var HEADER = ['Thời gian', 'Họ tên', 'Tham dự', 'Lời nhắn', 'Khách']

var ATTEND_VI = { yes: 'Có', maybe: 'Chưa chắc', no: 'Không' }

/** Chạy một lần để Google xin quyền truy cập Sheet. */
function authorizeOnce() {
  SpreadsheetApp.getActiveSpreadsheet().getName()
}

/** Chạy một lần để sửa hàng tiêu đề sheet cho khớp 5 cột mới. */
function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER)
    return
  }
  sheet.getRange(1, 1, 1, HEADER.length).setValues([HEADER])
  var extraCols = sheet.getLastColumn() - HEADER.length
  if (extraCols > 0) {
    sheet.deleteColumns(HEADER.length + 1, extraCols)
  }
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}

function parseBody(e) {
  if (!e) return null
  if (e.parameter && e.parameter.payload) {
    try {
      return JSON.parse(e.parameter.payload)
    } catch (x) {}
  }
  if (e.postData && e.postData.contents) {
    var t = e.postData.type || ''
    if (t.indexOf('application/json') !== -1) {
      return JSON.parse(e.postData.contents)
    }
    var raw = e.postData.contents
    var m = raw.match(/(?:^|&)payload=([^&]*)/)
    if (m) {
      return JSON.parse(decodeURIComponent(m[1].replace(/\+/g, ' ')))
    }
  }
  return null
}

function headersMatch(sheet) {
  if (sheet.getLastRow() === 0) return false
  var current = sheet.getRange(1, 1, 1, HEADER.length).getDisplayValues()[0]
  for (var i = 0; i < HEADER.length; i++) {
    if (current[i] !== HEADER[i]) return false
  }
  return true
}

function ensureHeader(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER)
    return
  }
  if (!headersMatch(sheet)) {
    setupSheet()
  }
}

function normalizeGuestSide(data) {
  var value = String(data.guestSide || '').trim()
  if (value === 'Nhà trai' || value === 'Nhà gái') return value
  return value
}

function doPost(e) {
  var lock = LockService.getScriptLock()
  try {
    lock.waitLock(20000)
    var body = parseBody(e)
    if (!body || body.type !== 'wedding_rsvp') {
      return jsonOut({ ok: false, error: 'Payload không hợp lệ' })
    }
    var data = body.data || {}
    var attendKey = data.attendance
    var attendLabel = ATTEND_VI[attendKey] || attendKey || ''

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
    ensureHeader(sheet)
    sheet.appendRow([
      body.submittedAt || new Date().toISOString(),
      String(data.fullName || ''),
      attendLabel,
      String(data.message || ''),
      normalizeGuestSide(data),
    ])
    return jsonOut({ ok: true, version: SCRIPT_VERSION })
  } catch (err) {
    return jsonOut({ ok: false, error: String(err.message || err) })
  } finally {
    lock.releaseLock()
  }
}

function doGet() {
  return jsonOut({
    ok: true,
    version: SCRIPT_VERSION,
    columns: HEADER,
    hint: 'POST form field payload (type=wedding_rsvp)',
  })
}
