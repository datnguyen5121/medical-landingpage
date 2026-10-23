export interface ContactInput {
  fullName: string
  phone: string
  email: string | null
  position: string | null
  organization: string
  quantity: number
  productInterest: string | null
  message: string | null
}

export type ContactResult =
  | { ok: true; data: ContactInput }
  | { ok: false; error: string }

const MAX = {
  fullName: 120,
  phone: 20,
  email: 254,
  position: 120,
  organization: 300,
  productInterest: 200,
  message: 3000,
}

const PHONE_RE = /^\+?[0-9][0-9 .\-()]{6,18}[0-9]$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function text(value: unknown): string | null {
  if (value === undefined || value === null) return ''
  return typeof value === 'string' ? value.trim() : null
}

export function validateContact(body: unknown): ContactResult {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Dữ liệu không hợp lệ.' }
  }
  const b = body as Record<string, unknown>

  const fields = {
    fullName: text(b.fullName),
    phone: text(b.phone),
    email: text(b.email),
    position: text(b.position),
    organization: text(b.organization),
    productInterest: text(b.productInterest),
    message: text(b.message),
  }
  for (const [key, value] of Object.entries(fields)) {
    if (value === null) return { ok: false, error: 'Dữ liệu không hợp lệ.' }
    if (value.length > MAX[key as keyof typeof MAX]) {
      return { ok: false, error: 'Nội dung nhập quá dài.' }
    }
  }

  const rawQuantity = typeof b.quantity === 'number' ? b.quantity : Number(String(b.quantity ?? '').trim())
  if (!fields.fullName || !fields.phone || !fields.organization || !Number.isInteger(rawQuantity) || rawQuantity < 1 || rawQuantity > 100000) {
    return { ok: false, error: 'Vui lòng điền đầy đủ các trường bắt buộc.' }
  }
  if (!PHONE_RE.test(fields.phone!)) {
    return { ok: false, error: 'Số điện thoại không hợp lệ.' }
  }
  if (fields.email && !EMAIL_RE.test(fields.email)) {
    return { ok: false, error: 'Email không hợp lệ.' }
  }

  return {
    ok: true,
    data: {
      fullName: fields.fullName!,
      phone: fields.phone!,
      email: fields.email || null,
      position: fields.position || null,
      organization: fields.organization!,
      quantity: rawQuantity,
      productInterest: fields.productInterest || null,
      message: fields.message || null,
    },
  }
}
