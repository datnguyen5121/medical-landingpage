import { describe, expect, it } from 'vitest'
import { installImageProtection, isImageTarget } from '../lib/protect-images'

function fakeDocument() {
  const target = new EventTarget()
  return target as unknown as Document
}

function fire(doc: Document, type: string, tagName: string) {
  const event = new Event(type, { cancelable: true })
  Object.defineProperty(event, 'target', { value: { tagName } })
  doc.dispatchEvent(event)
  return event.defaultPrevented
}

describe('image protection', () => {
  it('chỉ nhận diện thẻ IMG', () => {
    expect(isImageTarget({ tagName: 'IMG' })).toBe(true)
    expect(isImageTarget({ tagName: 'A' })).toBe(false)
    expect(isImageTarget(null)).toBe(false)
  })

  it('chặn chuột phải và kéo-thả trên ảnh, không ảnh hưởng phần tử khác', () => {
    const doc = fakeDocument()
    const remove = installImageProtection(doc)
    expect(fire(doc, 'contextmenu', 'IMG')).toBe(true)
    expect(fire(doc, 'dragstart', 'IMG')).toBe(true)
    expect(fire(doc, 'contextmenu', 'P')).toBe(false)
    expect(fire(doc, 'dragstart', 'A')).toBe(false)
    remove()
    expect(fire(doc, 'contextmenu', 'IMG')).toBe(false)
  })
})
