document.addEventListener('DOMContentLoaded', () => {
  initDrawerMenu();
});

function initDrawerMenu() {
  const drawer = document.querySelector('.js-drawer');
  const drawerToggles = document.querySelectorAll('.js-drawer-toggle');
  const drawerLinks = drawer ? drawer.querySelectorAll('a[href]') : [];
  const icon = document.querySelector('.p-header__icon');

  if (!drawer || !drawerToggles.length) return;

  const openDrawer = () => {
    drawer.classList.add('is-open');
    document.body.classList.add('is-fixed');
    drawer.setAttribute('aria-hidden', 'false');
    icon?.classList.add('is-open');
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    document.body.classList.remove('is-fixed');
    drawer.setAttribute('aria-hidden', 'true');
    icon?.classList.remove('is-open');
  };

  drawerToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (drawer.classList.contains('is-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  });

  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
    }
  });
}
