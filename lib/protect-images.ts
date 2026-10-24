// Cản trở việc lưu ảnh một cách thông thường (chuột phải, kéo-thả ra desktop).
// Đây chỉ là rào cản nhẹ: ảnh đã hiển thị vẫn có thể lấy bằng chụp màn hình hoặc DevTools.

interface TargetLike {
  tagName?: string
}

export function isImageTarget(target: unknown): boolean {
  return (target as TargetLike | null)?.tagName === 'IMG'
}

export function installImageProtection(doc: Document = document): () => void {
  const block = (e: Event) => {
    if (isImageTarget(e.target)) e.preventDefault()
  }
  doc.addEventListener('contextmenu', block)
  doc.addEventListener('dragstart', block)
  return () => {
    doc.removeEventListener('contextmenu', block)
    doc.removeEventListener('dragstart', block)
  }
}
