/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state */
import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import styles from './IframePreview.module.css'
import resolveUrl from '../../../resolvePreviewUrl'
/**
 * Explore more examples of previews:
 * https://www.sanity.io/blog/evolve-authoring-experiences-with-views-and-split-panes
 */

// const assembleUrl = ({ displayed, options }) => {
//   const { slug, publishedAt } = displayed
//   const { previewURL } = options
//   if (!slug || !previewURL) {
//     console.warn('Missing slug or previewURL', { slug, previewURL })
//     return ''
//   }
//   const dateSegment = format(publishedAt, 'YYYY/MM')
//   const path = `/${slug.current}/`
//   return `${previewURL}/blog${path}`
// }

const IframePreview = props => {
  const { options, document } = props
  // const { displayed } = props.document

  if (!document) {
    return (
      <div className={styles.componentWrapper}>
        <p>There is no document to preview</p>
      </div>
    )
  }

  const url = resolveUrl({ document, options })

  if (!url) {
    return (
      <div className={styles.componentWrapper}>
        <p>Hmm. Having problems constructing the web front-end URL.</p>
      </div>
    )
  }

  return (
    <div className={styles.componentWrapper}>
      <div className={styles.iframeContainer}>
        <iframe src={url} frameBorder={'0'} />
      </div>
    </div>
  )
}

IframePreview.propTypes = {
  document: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

IframePreview.defaultProps = {
  document: null
}

export default IframePreview
