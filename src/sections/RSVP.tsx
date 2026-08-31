import { useMemo, useState } from 'react'
import type { InvitationContent } from '../content/invitation.vi'
import { Card, Section } from './_shared'

type RsvpForm = {
  fullName: string
  message: string
  attendance: 'yes' | 'maybe' | 'no'
}

function isValidUrl(value: string) {
  try {
    const u = new URL(value)
    return u.protocol === 'https:' || u.protocol === 'http:'
  } catch {
    return false
  }
}

function rsvpSubmitTarget(rsvp: InvitationContent['rsvp']): { enabled: boolean; url: string } {
  if (rsvp.type === 'googleSheet' && isValidUrl(rsvp.webAppUrl)) {
    const u = rsvp.webAppUrl
    if (u.includes('YOUR_DEPLOYMENT_ID')) return { enabled: false, url: '' }
    return { enabled: true, url: u }
  }
  return { enabled: false, url: '' }
}

export default function RSVP({ content }: { content: InvitationContent }) {
  const { enabled: isEnabled, url: endpointUrl } = rsvpSubmitTarget(content.rsvp)

  const [form, setForm] = useState<RsvpForm>({
    fullName: '',
    message: '',
    attendance: 'yes',
  })
  const [status, setStatus] = useState<
    | { state: 'idle' }
    | { state: 'submitting' }
    | { state: 'success' }
    | { state: 'error'; message: string }
  >({ state: 'idle' })

  const canSubmit = useMemo(() => {
    if (!isEnabled) return false
    if (!form.fullName.trim()) return false
    if (!form.message.trim()) return false
    return true
  }, [form.fullName, form.message, isEnabled])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return

    setStatus({ state: 'submitting' })
    try {
      const payload = {
        type: 'wedding_rsvp' as const,
        locale: content.locale,
        couple: content.couple,
        submittedAt: new Date().toISOString(),
        data: form,
        userAgent: navigator.userAgent,
      }
      // form-urlencoded + field `payload` — tránh preflight CORS với Google Apps Script Web App
      const body = new URLSearchParams()
      body.set('payload', JSON.stringify(payload))

      const res = await fetch(endpointUrl, { method: 'POST', body })

      const text = await res.text().catch(() => '')
      let parsed: { ok?: boolean; error?: string } | null = null
      try {
        parsed = JSON.parse(text) as { ok?: boolean; error?: string }
      } catch {
        /* Apps Script đôi khi bọc HTML — coi là lỗi */
      }

      if (!res.ok) {
        throw new Error(text || `Máy chủ trả lỗi ${res.status}`)
      }
      if (!parsed || parsed.ok !== true) {
        throw new Error(
          parsed && parsed.ok === false && parsed.error
            ? parsed.error
            : (text.slice(0, 240) || 'Không đọc được phản hồi từ Apps Script (kiểm tra Web App URL).'),
        )
      }

      setStatus({ state: 'success' })
    } catch (err) {
      setStatus({
        state: 'error',
        message: err instanceof Error ? err.message : 'Lỗi không xác định',
      })
    }
  }

  return (
    <Section id="rsvp">
      <div className="w-full min-w-0">
        <Card>
          <div className="text-center font-[family-name:var(--font-sans)] text-[28px] font-bold leading-tight text-[var(--invite-accent-strong)] md:text-[39px] md:leading-[1.2]">
            Gửi lời chúc
          </div>

          {!isEnabled ? (
            <div className="mt-4 break-words text-center text-[14px] leading-relaxed text-[var(--invite-muted)] md:text-sm md:leading-normal">
              RSVP chưa cấu hình. Đặt <code className="rounded bg-black/5 px-1 py-0.5">webAppUrl</code> (Apps Script Web
              App) trong <code className="rounded bg-black/5 px-1 py-0.5">src/content/invitation.vi.ts</code> — xem{' '}
              <code className="rounded bg-black/5 px-1 py-0.5">google-apps-script/Code.gs</code>.
            </div>
          ) : null}

          <form className="mt-6 grid min-w-0 max-w-full gap-4 md:mt-10 md:gap-5" onSubmit={onSubmit}>
            <div className="min-w-0">
              <div className="px-0.5 text-[17px] font-medium text-[var(--invite-muted)] md:px-[10px] md:text-[25px]">
                <span className="text-[#fb3535]">*</span> Họ và tên
              </div>
              <input
                className="mt-2 box-border min-h-[48px] w-full max-w-full min-w-0 rounded-[10px] border border-[var(--invite-border)] bg-[#f8f7f7] px-3 py-2.5 text-[16px] outline-none focus:ring-2 focus:ring-[var(--invite-accent)] md:h-[55px] md:min-h-0 md:px-5 md:py-0 md:text-[18px]"
                value={form.fullName}
                onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                placeholder="Tên của bạn"
                autoComplete="name"
              />
            </div>

            <div className="min-w-0">
              <div className="px-0.5 text-[17px] font-medium text-[var(--invite-muted)] md:px-[10px] md:text-[25px]">
                <span className="text-[#fb3535]">*</span> Lời nhắn
              </div>
              <textarea
                className="mt-2 box-border h-[140px] w-full max-w-full min-w-0 rounded-[16px] border-2 border-[var(--invite-border)] bg-[#f8f7f7] px-3 py-3 text-[16px] outline-none focus:ring-2 focus:ring-[var(--invite-accent)] md:h-[181px] md:px-5 md:py-4 md:text-[18px]"
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                placeholder="Vài dòng gửi đến dâu rể"
              />
            </div>

            <div className="min-w-0">
              <div className="px-0.5 text-[17px] font-medium text-[var(--invite-muted)] md:px-[10px] md:text-[25px]">
                <span className="text-[#fb3535]">*</span> Tham dự
              </div>

              <div className="mt-3 flex flex-col gap-2 md:flex-row md:gap-0 md:overflow-hidden md:rounded-[20px] md:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]">
                {(
                  [
                    { key: 'yes', label: 'Có' },
                    { key: 'maybe', label: 'Chưa chắc' },
                    { key: 'no', label: 'Không' },
                  ] as const
                ).map((opt, idx, arr) => {
                  const selected = form.attendance === opt.key
                  const isFirst = idx === 0
                  const isLast = idx === arr.length - 1
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, attendance: opt.key }))}
                      className={[
                        'box-border min-h-[48px] w-full rounded-xl px-3 py-2 text-center font-[family-name:var(--font-sans)] text-[15px] font-bold leading-snug text-[#808080] outline-none transition md:min-h-0 md:flex-1 md:min-w-0 md:rounded-none md:px-4 md:py-[22px] md:text-left md:text-[16px]',
                        isFirst ? 'md:rounded-l-[20px]' : '',
                        isLast ? 'md:rounded-r-[20px]' : '',
                        selected
                          ? 'border-2 border-[var(--invite-accent)] bg-white shadow-sm ring-2 ring-[var(--invite-accent)] md:shadow-none'
                          : 'border border-[var(--invite-border)] bg-[#f8f7f7]',
                      ].join(' ')}
                    >
                      {opt.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                className="box-border mx-auto min-h-[52px] w-full max-w-full rounded-[16px] bg-[var(--invite-accent)] px-6 py-3 font-[family-name:var(--font-sans)] text-[17px] font-bold leading-tight text-white shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 sm:max-w-[280px] md:h-[77px] md:max-w-none md:w-[195px] md:rounded-[20px] md:px-[50px] md:py-[20px] md:text-[20px] md:leading-[1.2]"
                disabled={!canSubmit || status.state === 'submitting'}
                type="submit"
              >
                {status.state === 'submitting' ? 'Đang gửi…' : 'Gửi ngay'}
              </button>
            </div>

            {status.state === 'success' ? (
              <div className="text-center text-[16px] font-medium leading-relaxed text-emerald-700 md:text-sm md:leading-normal">
                Đã gửi. Cảm ơn bạn.
              </div>
            ) : null}
            {status.state === 'error' ? (
              <div className="text-center text-[16px] font-medium leading-relaxed text-red-700 md:text-sm md:leading-normal">
                Gửi thất bại: {status.message}
              </div>
            ) : null}
          </form>
        </Card>
      </div>
    </Section>
  )
}

