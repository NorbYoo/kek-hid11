import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'

export function RichText({ content, className }: { content?: SerializedEditorState | null; className?: string }) {
  if (!content) return null
  return (
    <div className={className ?? 'prose prose-slate max-w-none'}>
      <PayloadRichText data={content} />
    </div>
  )
}
