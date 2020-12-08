const env = process.env.NODE_ENV || 'development'

export default function resolvePreviewUrl({ document, options }) {
  // const { previewURL } = options
  const previewURL = env === 'development' ? 'http://localhost:8000' : '<#<deployments.web.url>#>'
  switch (document._type) {
    case 'route':
      if (!document.slug || !document.slug.current) {
        return previewURL
      }
      return `${previewURL}/${document.slug.current}`
    case 'post':
      return `${previewURL}/blog/${document.slug.current}`
    case 'siteSettings':
      return previewURL
    case 'page':
      if (document._id === 'frontpage' || document._id === 'drafts.frontpage') {
        return previewURL
      }
      return null
    default:
      return null
  }
}
