import { describe, expect, it } from 'vitest'
import { validateContact } from '../lib/contact-validation'

const valid = {
  fullName: ' Nguyễn Văn A ',
  phone: '0968 348 698',
  organization: 'Bệnh viện X, Hà Nội',
  quantity: '2',
}

describe('validateContact', () => {
  it('chấp nhận dữ liệu hợp lệ và chuẩn hóa', () => {
    const r = validateContact(valid)
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.data.fullName).toBe('Nguyễn Văn A')
      expect(r.data.quantity).toBe(2)
      expect(r.data.email).toBeNull()
    }
  })

  it('từ chối body không phải object', () => {
    expect(validateContact(null).ok).toBe(false)
    expect(validateContact('x').ok).toBe(false)
  })

  it('từ chối trường không phải chuỗi (tránh lỗi .trim())', () => {
    expect(validateContact({ ...valid, fullName: { a: 1 } }).ok).toBe(false)
    expect(validateContact({ ...valid, phone: 123456789 }).ok).toBe(false)
  })

  it('từ chối thiếu trường bắt buộc hoặc số lượng sai', () => {
    expect(validateContact({ ...valid, fullName: '  ' }).ok).toBe(false)
    expect(validateContact({ ...valid, quantity: '0' }).ok).toBe(false)
    expect(validateContact({ ...valid, quantity: '1.5' }).ok).toBe(false)
    expect(validateContact({ ...valid, quantity: 'abc' }).ok).toBe(false)
  })

  it('từ chối số điện thoại và email sai định dạng', () => {
    expect(validateContact({ ...valid, phone: 'abc' }).ok).toBe(false)
    expect(validateContact({ ...valid, email: 'not-an-email' }).ok).toBe(false)
    expect(validateContact({ ...valid, email: 'a@b.vn' }).ok).toBe(true)
  })

  it('từ chối nội dung quá dài', () => {
    expect(validateContact({ ...valid, message: 'x'.repeat(3001) }).ok).toBe(false)
  })
})
