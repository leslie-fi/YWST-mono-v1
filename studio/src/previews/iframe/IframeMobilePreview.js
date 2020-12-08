import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import styles from './IframePreview.module.css'
import SanityMobilePreview from 'sanity-mobile-preview'
import 'sanity-mobile-preview/dist/index.css?raw'
const assemblePostUrl = ({ displayed, options }) => {
  const { slug, publishedAt } = displayed
  const { previewURL } = options
  if (!slug || !previewURL) {
    console.warn('Missing slug or previewURL', { slug, previewURL })
    return ''
  }
  const dateSegment = format(publishedAt, 'YYYY/MM')
  const path = `/${dateSegment}/${slug.current}/`
  return `${previewURL}/blog${path}`
}

const IframeMobilePreview = props => {
  const { options } = props
  const { displayed } = props.document

  if (!displayed) {
    return (
      <div className={styles.componentWrapper}>
        <p>There is no document to preview</p>
      </div>
    )
  }

  const url = assemblePostUrl({ displayed, options })

  if (!url) {
    return (
      <div className={styles.componentWrapper}>
        <p>Hmm. Having problems constructing the web front-end URL.</p>
      </div>
    )
  }

  return (
    <div className={styles.componentWrapper}>
      <SanityMobilePreview>
        <div className={styles.iframeContainer}>
          <iframe src={url} frameBorder={'0'} />
        </div>
      </SanityMobilePreview>
    </div>
  )
}

IframeMobilePreview.propTypes = {
  document: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

IframeMobilePreview.defaultProps = {
  document: null
}

export default IframeMobilePreview
