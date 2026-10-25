// Accordions ([data-acc]) and service drawers ([data-drawer-open]) for the expandable version.

const changed = () => window.dispatchEvent(new Event('copy:toggle'));

// Accordions: aria-expanded on the button, data-closed on the panel.
document.querySelectorAll<HTMLElement>('[data-acc]').forEach((group) => {
  const single = group.hasAttribute('data-acc-single');
  const buttons = [...group.querySelectorAll<HTMLButtonElement>('.acc__btn')];
  const panelOf = (b: HTMLButtonElement) => document.getElementById(b.getAttribute('aria-controls')!)!;

  const set = (b: HTMLButtonElement, open: boolean) => {
    b.setAttribute('aria-expanded', String(open));
    const panel = panelOf(b);
    if (open) panel.removeAttribute('data-closed');
    else panel.setAttribute('data-closed', '');
    panel.inert = !open;
  };

  buttons.forEach((b) => {
    set(b, b.getAttribute('aria-expanded') === 'true');
    // The whole row header is clickable (see .wrow__btn::after); buttons handle it.
    b.addEventListener('click', () => {
      const open = b.getAttribute('aria-expanded') !== 'true';
      if (single && open) buttons.forEach((o) => o !== b && set(o, false));
      set(b, open);
      window.setTimeout(changed, 520);
    });
  });
});

// Drawers: native <dialog> gives Esc-to-close, focus handling and the backdrop.
document.querySelectorAll<HTMLButtonElement>('[data-drawer-open]').forEach((btn) => {
  const dialog = document.getElementById(btn.dataset.drawerOpen!) as HTMLDialogElement | null;
  if (!dialog) return;
  btn.addEventListener('click', () => {
    dialog.showModal();
    document.documentElement.classList.add('has-drawer');
    window.dispatchEvent(new Event('drawer:open'));
  });
});

document.querySelectorAll<HTMLDialogElement>('dialog.drawer').forEach((dialog) => {
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close(); // click on the backdrop
  });
  dialog.querySelector('[data-drawer-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('has-drawer');
    window.dispatchEvent(new Event('drawer:close'));
  });
});
