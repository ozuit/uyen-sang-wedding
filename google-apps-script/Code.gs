/**
 * Dán file này vào Apps Script gắn với Google Sheet (Mở Sheet → Tiện ích mở rộng → Apps Script).
 *
 * Trước khi Triển khai Web App: chọn authorizeOnce → Chạy → ủy quyền Sheet.
 *
 * Nếu màn hình Google báo "Ứng dụng này đã bị chặn" (không có nút bỏ qua):
 *   - Cài đặt dự án → Dự án Google Cloud: thử "Ngắt liên kết" về dự án mặc định của Apps Script rồi Chạy authorizeOnce lại.
 *   - Hoặc bỏ Apps Script: trong site đổi RSVP sang type 'webhook' + Make.com (Webhook → Google Sheets).
 *
 * Triển khai Web App: Chạy dưới tên Tôi, quyền Bất kỳ ai. URL /exec → webAppUrl trong invitation.vi.ts
 *
 * Sheet 5 cột: Thời gian, Họ tên, Tham dự, Lời nhắn, Khách (Nhà trai / Nhà gái).
 * Nếu sheet cũ còn cột Ngôn ngữ / Cặp đôi / User-Agent, xóa các cột đó trên Google Sheet cho gọn.
 */

var HEADER = ['Thời gian', 'Họ tên', 'Tham dự', 'Lời nhắn', 'Khách']

var ATTEND_VI = { yes: 'Có', maybe: 'Chưa chắc', no: 'Không' }

/** Chạy một lần (nút Chạy) để Google xin quyền truy cập Sheet — bắt buộc trước khi triển khai Web App. */
function authorizeOnce() {
  SpreadsheetApp.getActiveSpreadsheet().getName()
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

function ensureHeader(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER)
    return
  }
  var v = sheet.getRange(1, 1).getDisplayValue()
  if (v !== HEADER[0]) {
    sheet.insertRowBefore(1)
    sheet.getRange(1, 1, 1, HEADER.length).setValues([HEADER])
  }
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
      String(data.guestSide || ''),
    ])
    return jsonOut({ ok: true })
  } catch (err) {
    return jsonOut({ ok: false, error: String(err.message || err) })
  } finally {
    lock.releaseLock()
  }
}

function doGet() {
  return jsonOut({ ok: true, hint: 'POST JSON hoặc form field payload' })
}
