(function () {
  var header = document.querySelector(".site-header");
  if (!header) {
    return;
  }

  var toggle = header.querySelector(".nav-toggle");
  var nav = header.querySelector("#site-nav");
  if (!toggle || !nav) {
    return;
  }

  var dropdownItem = header.querySelector(".menu-item-has-dropdown");
  var dropdownTrigger =
    dropdownItem && dropdownItem.querySelector(":scope > a");
  var mobileQuery = window.matchMedia("(max-width: 900px)");
  var desktopQuery = window.matchMedia("(min-width: 901px)");

  function isMobileNav() {
    return mobileQuery.matches;
  }

  function setSubmenuOpen(open) {
    if (!dropdownItem || !dropdownTrigger) {
      return;
    }

    dropdownItem.classList.toggle("is-submenu-open", open);
    dropdownTrigger.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function closeSubmenu() {
    setSubmenuOpen(false);
  }

  function setMenuOpen(open) {
    header.classList.toggle("is-nav-open", open);
    document.body.classList.toggle("is-nav-locked", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");

    if (!open) {
      closeSubmenu();
    }
  }

  toggle.addEventListener("click", function () {
    setMenuOpen(!header.classList.contains("is-nav-open"));
  });

  if (dropdownTrigger) {
    dropdownTrigger.addEventListener("click", function (event) {
      if (!isMobileNav()) {
        return;
      }

      event.preventDefault();
      setSubmenuOpen(!dropdownItem.classList.contains("is-submenu-open"));
    });
  }

  nav.addEventListener("click", function (event) {
    var link = event.target.closest("a");
    if (!link) {
      return;
    }

    if (
      isMobileNav() &&
      dropdownItem &&
      dropdownTrigger &&
      link === dropdownTrigger
    ) {
      return;
    }

    setMenuOpen(false);
    closeSubmenu();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    if (
      isMobileNav() &&
      dropdownItem &&
      dropdownItem.classList.contains("is-submenu-open")
    ) {
      closeSubmenu();
      return;
    }

    setMenuOpen(false);
  });

  function handleDesktopBreakpoint(event) {
    if (event.matches) {
      setMenuOpen(false);
      closeSubmenu();
    }
  }

  if (typeof desktopQuery.addEventListener === "function") {
    desktopQuery.addEventListener("change", handleDesktopBreakpoint);
  } else if (typeof desktopQuery.addListener === "function") {
    desktopQuery.addListener(handleDesktopBreakpoint);
  }
})();
