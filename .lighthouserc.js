module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 1,
      settings: {
        onlyCategories: ['accessibility'],
        locale: 'ja',
        chromeFlags: '--no-sandbox',
      },
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.9 }],
        // Core ARIA attributes
        'aria-allowed-attr': 'error',
        'aria-hidden-body': 'error',
        'aria-hidden-focus': 'error',
        'aria-required-attr': 'error',
        'aria-required-children': 'error',
        'aria-required-parent': 'error',
        'aria-roles': 'error',
        'aria-valid-attr-value': 'error',
        'aria-valid-attr': 'error',
        
        // Interactive elements
        'button-name': 'error',
        'link-name': 'error',
        'input-button-name': 'error',
        'label': 'error',
        
        // Document structure
        'document-title': 'error',
        'html-has-lang': 'error',
        'html-lang-valid': 'error',
        'heading-order': 'warn',
        'bypass': 'error',
        
        // Images and media
        'image-alt': 'error',
        'input-image-alt': 'error',
        'object-alt': 'error',
        'video-caption': 'error',
        
        // Color and contrast
        'color-contrast': 'warn',
        
        // Lists and tables
        'definition-list': 'error',
        'dlitem': 'error',
        'list': 'error',
        'listitem': 'error',
        'td-has-header': 'error',
        'th-has-data-cells': 'error',
        
        // Other accessibility issues
        'duplicate-id-aria': 'error',
        'form-field-multiple-labels': 'error',
        'meta-viewport': 'error',
        'tabindex': 'error',
        'valid-lang': 'error',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};