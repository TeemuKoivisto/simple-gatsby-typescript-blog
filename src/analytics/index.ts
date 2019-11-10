
export const outboundClick = (e: React.MouseEvent<HTMLLinkElement>) => {
  // Check if gtag library _and_ Google Analytics has loaded
  // Weird thing is that gtag loads, but ga does not when adblocker is enabled
  if (window && window.gtag && window.ga) {
    let redirect = true
    // Check for modifier keys, might imply that eg Ctrl was used when clicking
    // so in that case we shouldn't redirect the user programmatically
    if (
      e.button !== 0 ||
      e.altKey ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey ||
      e.defaultPrevented
    ) {
      redirect = false
    }
    // Check if the element clicked was link
    const href = e!.currentTarget!.href
    // If both previous cases were true, hijack the default behaviour (following the link)
    if (redirect && href) {
      e.preventDefault()
    }
    // Send an event to Google Analytics
    window.gtag('event', 'click', {
      event_category: 'outbound',
      event_label: href,
      // Some weird thing that might work in some browsers, might not
      // https://developers.google.com/analytics/devguides/collection/analyticsjs/events#measure_outbound_links_and_forms
      transport_type: redirect ? 'beacon' : '',
      event_callback() {
        // Here do the redirect in a callback after the event has finished
        if (redirect && href) {
          document.location.href = href
        }
      },
    })
  }
}
