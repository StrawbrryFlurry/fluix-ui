import { isTouchEvent } from './is-touch-event.util';

export function getPointerPositionOnPage(event: MouseEvent | TouchEvent) {
  // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
  const point = isTouchEvent(event)
    ? event.touches[0] || event.changedTouches[0]
    : event;
  return { x: point.clientX, y: point.clientY };
}
