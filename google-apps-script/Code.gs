/**
 * Dán file này vào Apps Script gắn với Google Sheet (Mở Sheet → Tiện ích mở rộng → Apps Script).
 * Triển khai: Triển khai → Triển khai mới → Loại: Ứng dụng web
 *   - Chạy dưới tên: Tôi
 *   - Quyền truy cập: Bất kỳ ai (quan trọng để trang thiệp POST được)
 * Copy URL Web App (kết thúc /exec) vào `webAppUrl` trong invitation.vi.ts
 */

var HEADER = ['Thời gian', 'Họ tên', 'Tham dự', 'Lời nhắn', 'Ngôn ngữ', 'Cặp đôi', 'User-Agent']

var ATTEND_VI = { yes: 'Có', maybe: 'Chưa chắc', no: 'Không' }

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
    var couple = body.couple || {}
    var attendKey = data.attendance
    var attendLabel = ATTEND_VI[attendKey] || attendKey || ''
    var coupleStr = [couple.brideName, couple.groomName].filter(Boolean).join(' & ')

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
    ensureHeader(sheet)
    sheet.appendRow([
      body.submittedAt || new Date().toISOString(),
      String(data.fullName || ''),
      attendLabel,
      String(data.message || ''),
      String(body.locale || ''),
      coupleStr,
      String(body.userAgent || ''),
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
