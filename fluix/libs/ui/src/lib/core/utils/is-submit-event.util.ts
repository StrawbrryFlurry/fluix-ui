/**
 * Whether the key event is a `Enter` press.
 */
export function isSubmitEvent(event: KeyboardEvent) {
  const isEnterPress = event.code === 'Enter' || event.code === 'NumpadEnter';

  if (isEnterPress) {
    return true;
  }

  return false;
}

/**
 * Same as {@link isSubmitEvent} but supports
 */
export function isButtonSubmitPress(event: KeyboardEvent) {
  const isEnterPress =
    event.code === 'Enter' ||
    event.code === 'NumpadEnter' ||
    event.code === 'Space';

  if (isEnterPress) {
    return true;
  }

  return false;
}
