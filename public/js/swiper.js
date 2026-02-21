var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
  },
});
const findScopeRoot = (swiperElement, scopeSelector) => {
  if (!scopeSelector) return swiperElement;
  const scopedRoot = swiperElement.closest(scopeSelector);
  return scopedRoot || swiperElement;
};

const resolveNavigation = (swiperElement, { scopeSelector, override } = {}) => {
  if (override) return override;

  const scope = findScopeRoot(swiperElement, scopeSelector);
  const nextBtn = scope.querySelector(".swiper-button-next");
  const prevBtn = scope.querySelector(".swiper-button-prev");

  if (nextBtn && prevBtn) {
    return { nextEl: nextBtn, prevEl: prevBtn };
  }

  let parent = scope.parentElement;
  while (parent && parent !== document.body) {
    const next = parent.querySelector(".swiper-button-next");
    const prev = parent.querySelector(".swiper-button-prev");
    if (next && prev) {
      return { nextEl: next, prevEl: prev };
    }
    parent = parent.parentElement;
  }

  console.warn(`Swiper navigation not found for`, swiperElement);
  return undefined;
};

const resolvePagination = (swiperElement, { scopeSelector, override } = {}) => {
  if (override) return override;

  const scope = findScopeRoot(swiperElement, scopeSelector);
  const pagination = scope.querySelector(".swiper-pagination");

  if (pagination) {
    return { el: pagination, clickable: true };
  }

  let parent = scope.parentElement;
  while (parent && parent !== document.body) {
    const el = parent.querySelector(".swiper-pagination");
    if (el) {
      return { el, clickable: true };
    }
    parent = parent.parentElement;
  }

  return undefined;
};

const createSwiperInstances = (
  selector,
  { navigation = {}, pagination = {}, ...restOptions } = {},
) => {
  const swiperElements = document.querySelectorAll(selector);

  if (!swiperElements.length) {
    console.warn(`Swiper selector "${selector}" not found in DOM.`);
    return [];
  }

  return Array.from(swiperElements).map((swiperEl, index) => {
    const navConfig = resolveNavigation(swiperEl, navigation);
    const pagConfig = resolvePagination(swiperEl, pagination);

    const swiperOptions = {
      slidesPerView: "auto",
      direction: "horizontal",
      slidesOffsetAfter: 12,
      ...restOptions,
      ...(navConfig ? { navigation: navConfig } : {}),
      ...(pagConfig ? { pagination: pagConfig } : {}),
    };

    const instance = new Swiper(swiperEl, swiperOptions);
    swiperEl.dataset.swiperInstanceIndex = index.toString();
    return instance;
  });
};

function debuggerPlugin({ swiper, extendParams, on }) {
  extendParams({ debugger: false });

  const log = (label, payload) => {
    if (!swiper.params.debugger) return;
    console.log(`[${swiper.el.className}] ${label}`, payload ?? "");
  };

  on("init", () => log("init"));
  on("slideChange", () =>
    log("slideChange", `${swiper.previousIndex} → ${swiper.activeIndex}`),
  );
  on("reachBeginning", () => log("reachBeginning"));
  on("reachEnd", () => log("reachEnd"));
  on("fromEdge", () => log("fromEdge"));
  on("transitionStart", () => log("transitionStart"));
  on("transitionEnd", () => log("transitionEnd"));
  on("sliderMove", (_, e) => log("sliderMove", e));
  on("click", (_, e) => log("click", e));
  on("tap", (_, e) => log("tap", e));
  on("doubleTap", (_, e) => log("doubleTap", e));
}

const initSwipers = () => {
  createSwiperInstances(".swiper");

  createSwiperInstances(".swiper2", {
    modules: [debuggerPlugin],
    debugger: true,
    pagination: { scopeSelector: ".swiper2" },
  });

  createSwiperInstances(".swiper3", {
    navigation: { scopeSelector: ".categories__swiper" },
    pagination: { scopeSelector: ".categories__swiper" },
  });

  createSwiperInstances(".swiper4");

  createSwiperInstances(".swiper5", {
    navigation: { scopeSelector: ".topselling__swiper" },
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSwipers);
} else {
  initSwipers();
}
