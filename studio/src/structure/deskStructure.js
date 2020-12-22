import S from '@sanity/desk-tool/structure-builder'
import {MdSettings, MdPerson, MdDescription, MdLocalOffer} from 'react-icons/md'

import {GoHome} from 'react-icons/go'
import EyeIcon from 'part:@sanity/base/eye-icon'
import EditIcon from 'part:@sanity/base/edit-icon'

// Web Preview
import IframePreview from '../previews/iframe/IframePreview'
import IframeMobilePreview from '../previews/iframe/IframeMobilePreview'
import SeoPreview from '../previews/seo/SeoPreviews'

// a11y preview
import ColorblindPreview from '../previews/a11y/colorblind-filter/ColorblindPreview'

// Web preview configuration
const remoteURL = 'https://ywst-mono-v-1.netlify.app'
const localURL = 'http://localhost:8000'
const previewURL = window.location.hostname === 'localhost' ? localURL : remoteURL

export const getDefaultDocumentNode = props => {
  /**
   * Here you can define fallback views for document types without
   * a structure definition for the document node. If you want different
   * fallbacks for different types, or document values (e.g. if there is a slug present)
   * you can set up that logic in here too.
   * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
   */
  const {schemaType} = props
  if (schemaType == 'post' || schemaType == 'page' || schemaType == 'route') {
    return S.document().views([
      S.view.form().icon(EditIcon),
      S.view
        .component(IframePreview)
        .title('Web preview')
        .icon(EyeIcon)
        .options({previewURL}),
      S.view
        .component(IframeMobilePreview)
        .title('Mobile preview')
        .icon(EyeIcon)
        .options({previewURL}),
      S.view
        .component(SeoPreview)
        .options({previewURL})
        .icon(EyeIcon)
        .title('SEO Preview'),
      S.view
        .component(ColorblindPreview)
        .options({previewURL})
        .icon(EyeIcon)
        .title('Colorblind')
    ])
  }
  return S.document().views([S.view.form()])
}

/**
 * This defines how documents are grouped and listed out in the Studio.
 * Relevant documentation:
 * - https://www.sanity.io/guides/getting-started-with-structure-builder
 * - https://www.sanity.io/docs/structure-builder-introduction
 * - https://www.sanity.io/docs/structure-builder-typical-use-cases
 * - https://www.sanity.io/docs/structure-builder-reference
 */

export default () =>
  S.list()
    .title('Content')
    .items([
      S.documentListItem()
        .title('Settings')
        .id('siteSettings')
        .schemaType('siteSettings')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      S.documentListItem()
        .title('Frontpage')
        .schemaType('page')
        .id('frontpage')
        .icon(GoHome)
        .child(
          S.editor()
            .schemaType('page')
            .documentId('frontpage')
            .views([
              S.view.form().icon(EditIcon),
              S.view
                .component(IframePreview)
                .title('Web preview')
                .icon(EyeIcon)
                .options({previewURL}),
              S.view
                .component(IframeMobilePreview)
                .title('Mobile preview')
                .icon(EyeIcon)
                .options({previewURL}),
              S.view
                .component(SeoPreview)
                .options({previewURL})
                .icon(EyeIcon)
                .title('SEO Preview'),
              S.view
                .component(ColorblindPreview)
                .options({previewURL})
                .icon(EyeIcon)
                .title('Colorblind')
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Pages')
        .icon(MdLocalOffer)
        .schemaType('page')
        .child(
          S.documentTypeList('page')
            .title('Pages')),
      S.listItem()
        .title('Routes')
        .schemaType('route')
        .child(
          S.documentTypeList('route')
            .title('Routes')
        ),
      S.divider(),
      S.listItem()
        .title('Blog posts')
        .icon(MdDescription)
        .schemaType('post')
        .child(S.documentTypeList('post').title('Blog posts')),
      S.listItem()
        .title('Authors')
        .icon(MdPerson)
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),
      S.listItem()
        .title('Categories')
        .icon(MdLocalOffer)
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      // `S.documentTypeListItems()` returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above.
      ...S.documentTypeListItems().filter(
        listItem =>
          !['category', 'author', 'post', 'siteSettings', 'page', 'route'].includes(
            listItem.getId()
          )
      )
    ])
