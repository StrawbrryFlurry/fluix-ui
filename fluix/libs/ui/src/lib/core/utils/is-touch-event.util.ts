/**
 * Returns whether an event is a touch event.
 */
export function isTouchEvent(
  event: MouseEvent | TouchEvent
): event is TouchEvent {
  return event.type[0] === 't';
}
