import { useSyncExternalStore } from 'react';
import type { AnchorHTMLAttributes, MouseEvent } from 'react';

const NAVIGATE_EVENT = 'reflua:navigate';

function normalize(pathname: string) {
  return pathname.replace(/\/$/, '') || '/';
}

function subscribe(callback: () => void) {
  window.addEventListener('popstate', callback);
  window.addEventListener(NAVIGATE_EVENT, callback);

  return () => {
    window.removeEventListener('popstate', callback);
    window.removeEventListener(NAVIGATE_EVENT, callback);
  };
}

export function usePathname() {
  return useSyncExternalStore(
    subscribe,
    () => normalize(window.location.pathname),
    () => '/',
  );
}

export function navigate(to: string) {
  if (normalize(window.location.pathname) === normalize(to)) return;

  window.history.pushState(null, '', to);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
  window.scrollTo(0, 0);
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Link({ href, onClick, target, ...rest }: LinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.defaultPrevented || event.button !== 0 || modified || (target && target !== '_self')) {
      return;
    }

    event.preventDefault();
    navigate(href);
  };

  return <a href={href} target={target} onClick={handleClick} {...rest} />;
}
