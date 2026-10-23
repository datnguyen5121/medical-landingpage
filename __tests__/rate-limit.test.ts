import { describe, expect, it } from 'vitest'
import { isRateLimited } from '../lib/rate-limit'

describe('isRateLimited', () => {
  it('chặn sau khi vượt giới hạn trong cửa sổ thời gian', () => {
    const key = 'test-ip-1'
    for (let i = 0; i < 3; i++) expect(isRateLimited(key, 3, 1000)).toBe(false)
    expect(isRateLimited(key, 3, 1000)).toBe(true)
  })

  it('tách biệt theo khóa', () => {
    expect(isRateLimited('a', 1, 1000)).toBe(false)
    expect(isRateLimited('b', 1, 1000)).toBe(false)
  })
})
