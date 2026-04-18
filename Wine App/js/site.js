(function () {
  "use strict";

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
      return;
    }
    callback();
  }

  function getCartCount() {
    try {
      var raw = localStorage.getItem("wineapp_cart_v1");
      var items = JSON.parse(raw || "[]");
      if (!Array.isArray(items)) return 0;
      return items.reduce(function (sum, item) {
        return sum + (Number(item.quantity) || 0);
      }, 0);
    } catch (error) {
      return 0;
    }
  }

  function syncCartBadge() {
    var badges = document.querySelectorAll("[data-cart-count]");
    var total = getCartCount();
    badges.forEach(function (badge) {
      badge.textContent = String(total);
    });
  }

  function initHeader() {
    var toggle = document.querySelector("[data-menu-toggle]");
    var menu = document.querySelector("[data-menu]");
    var header = document.querySelector(".site-header");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!header) return;
        header.classList.toggle("compact", window.scrollY > 24);
      },
      { passive: true }
    );
  }

  function initCarousel() {
    var slides = Array.prototype.slice.call(
      document.querySelectorAll("[data-slide]")
    );
    if (!slides.length) return;

    var index = 0;
    var prev = document.querySelector("[data-carousel-prev]");
    var next = document.querySelector("[data-carousel-next]");

    function show(target) {
      index = (target + slides.length) % slides.length;
      slides.forEach(function (slide, slideIndex) {
        slide.classList.toggle("active", slideIndex === index);
      });
    }

    if (prev) {
      prev.addEventListener("click", function () {
        show(index - 1);
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        show(index + 1);
      });
    }

    window.setInterval(function () {
      show(index + 1);
    }, 4500);
  }

  function normalize(value) {
    return String(value || "")
      .trim()
      .toLowerCase();
  }

  function getCatalog() {
    if (globalThis.WineAppData && Array.isArray(globalThis.WineAppData.products)) {
      return globalThis.WineAppData;
    }
    return { products: [], categories: [], testimonials: [] };
  }

  function formatCurrency(value) {
    return "Rs " + Number(value || 0).toLocaleString("en-IN");
  }

  function getProductUrl(productId) {
    return "product.html?id=" + encodeURIComponent(productId);
  }

  function findProductById(productId) {
    return getCatalog().products.find(function (product) {
      return product.id === productId;
    });
  }

  function getPageAssetPrefix() {
    return window.location.pathname.toLowerCase().indexOf("/html/") !== -1
      ? "../"
      : "";
  }

  function createProductCard(product) {
    var prefix = getPageAssetPrefix();
    var article = document.createElement("article");
    article.className = "product-card";
    article.setAttribute("data-product-card", "");
    article.setAttribute("data-name", product.name);
    article.setAttribute("data-category", product.category.join(" "));
    article.innerHTML =
      '<div class="product-card__media">' +
      '<img src="' +
      prefix +
      product.image +
      '" alt="' +
      product.name +
      '">' +
      "</div>" +
      '<div class="product-card__body">' +
      '<div class="product-card__top">' +
      '<span class="product-tag">' +
      product.tag +
      "</span>" +
      '<span class="product-price">' +
      formatCurrency(product.price) +
      "</span>" +
      "</div>" +
      '<h3><a href="' +
      getProductUrl(product.id) +
      '">' +
      product.name +
      "</a></h3>" +
      '<p class="product-rating">' +
      product.subtitle +
      "</p>" +
      "<p>" +
      product.description +
      "</p>" +
      '<p class="product-rating">Rated ' +
      product.rating +
      "/5 by repeat buyers</p>" +
      '<div class="product-actions">' +
      '<button class="button-ghost" type="button" data-add-cart="' +
      product.id +
      '">Add to cart</button>' +
      '<button class="button" type="button" data-buy-now="' +
      product.id +
      '">Buy now</button>' +
      "</div>" +
      "</div>";
    return article;
  }

  function createCategoryCard(category) {
    var prefix = getPageAssetPrefix();
    var article = document.createElement("article");
    article.className = "category-card";
    article.innerHTML =
      '<img src="' +
      prefix +
      category.image +
      '" alt="' +
      category.title +
      '">' +
      "<h3>" +
      category.title +
      "</h3>" +
      "<p>" +
      category.description +
      '</p><div class="section-actions"><a class="button-ghost" href="' +
      category.link +
      '">Explore</a></div>';
    return article;
  }

  function createTestimonialCard(item) {
    var article = document.createElement("article");
    article.className = "testimonial-card";
    article.innerHTML =
      "<blockquote>" +
      item.quote +
      "</blockquote>" +
      "<footer><strong>" +
      item.author +
      "</strong><br>" +
      item.role +
      "</footer>";
    return article;
  }

  function initDynamicSections() {
    var catalog = getCatalog();
    var featuredGrid = document.querySelector("[data-featured-grid]");
    var categoryGrid = document.querySelector("[data-category-grid]");
    var shopGrid = document.querySelector("[data-shop-grid]");
    var testimonialGrid = document.querySelector("[data-testimonial-grid]");

    if (featuredGrid) {
      featuredGrid.innerHTML = "";
      catalog.products
        .filter(function (product) {
          return product.featured;
        })
        .forEach(function (product) {
          featuredGrid.appendChild(createProductCard(product));
        });
    }

    if (categoryGrid) {
      categoryGrid.innerHTML = "";
      catalog.categories.forEach(function (category) {
        categoryGrid.appendChild(createCategoryCard(category));
      });
    }

    if (shopGrid) {
      shopGrid.innerHTML = "";
      catalog.products.forEach(function (product) {
        shopGrid.appendChild(createProductCard(product));
      });
    }

    if (testimonialGrid) {
      testimonialGrid.innerHTML = "";
      catalog.testimonials.forEach(function (item) {
        testimonialGrid.appendChild(createTestimonialCard(item));
      });
    }
  }

  function initShopFilters() {
    var shop = document.querySelector("[data-shop]");
    if (!shop) return;

    var cards = Array.prototype.slice.call(shop.querySelectorAll("[data-product-card]"));
    var chips = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
    var searchInput = document.querySelector("[data-search-input]");
    var label = document.querySelector("[data-results-label]");
    var params = new URLSearchParams(window.location.search);
    var activeFilter = normalize(params.get("q")) || "all";

    function refreshCards() {
      cards = Array.prototype.slice.call(shop.querySelectorAll("[data-product-card]"));
    }

    function applyFilters() {
      refreshCards();
      var query = normalize(searchInput ? searchInput.value : "");
      var visibleCount = 0;

      cards.forEach(function (card) {
        var categories = normalize(card.getAttribute("data-category")).split(" ");
        var name = normalize(card.getAttribute("data-name"));
        var matchesFilter =
          activeFilter === "all" ||
          categories.indexOf(activeFilter) !== -1 ||
          name.indexOf(activeFilter) !== -1;
        var matchesQuery = !query || name.indexOf(query) !== -1;
        var visible = matchesFilter && matchesQuery;
        card.classList.toggle("hidden", !visible);
        if (visible) visibleCount += 1;
      });

      chips.forEach(function (chip) {
        chip.classList.toggle(
          "active",
          normalize(chip.getAttribute("data-filter")) === activeFilter
        );
      });

      if (label) {
        label.textContent = visibleCount + " products available";
      }
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        activeFilter = normalize(chip.getAttribute("data-filter"));
        applyFilters();
      });
    });

    if (searchInput) {
      if (activeFilter !== "all") {
        searchInput.value = params.get("q") || "";
      }
      searchInput.addEventListener("input", applyFilters);
    }

    applyFilters();
  }

  function initProductActions() {
    document.addEventListener("click", function (event) {
      var addButton = event.target.closest("[data-add-cart]");
      var buyButton = event.target.closest("[data-buy-now]");
      if (addButton) {
        var addProduct = getCatalog().products.find(function (product) {
          return product.id === addButton.getAttribute("data-add-cart");
        });
        if (addProduct && window.addToCart) {
          window.addToCart(addProduct.id, addProduct.name, addProduct.price);
        }
      }
      if (buyButton) {
        var buyProduct = getCatalog().products.find(function (product) {
          return product.id === buyButton.getAttribute("data-buy-now");
        });
        if (buyProduct && window.buyNow) {
          window.buyNow(buyProduct.id, buyProduct.name, buyProduct.price);
        }
      }
    });
  }

  function renderProductDetail() {
    var host = document.querySelector("[data-product-detail]");
    if (!host) return;

    var params = new URLSearchParams(window.location.search);
    var product = findProductById(params.get("id") || "");
    if (!product) {
      host.innerHTML =
        '<div class="cart-empty"><h2>Product not found</h2><p class="cart-note">The selected bottle could not be loaded.</p><div class="section-actions"><a class="button" href="shop.html">Back to shop</a></div></div>';
      return;
    }

    var prefix = "../";
    var related = getCatalog().products.filter(function (item) {
      return item.id !== product.id && item.category.some(function (category) {
        return product.category.indexOf(category) !== -1;
      });
    }).slice(0, 3);

    host.innerHTML =
      '<section class="page-hero"><div class="page-hero__panel"><div class="product-detail">' +
      '<div class="product-detail__visual"><img src="' + prefix + product.image + '" alt="' + product.name + '"></div>' +
      '<div class="product-detail__content">' +
      '<span class="eyebrow">' + product.tag + "</span>" +
      "<h1>" + product.name + "</h1>" +
      '<p class="lead">' + product.subtitle + "</p>" +
      '<div class="pill-row"><span class="pill">' + product.origin + '</span><span class="pill">' + product.volume + '</span><span class="pill">' + product.abv + "</span></div>" +
      '<p class="section-copy">' + product.description + "</p>" +
      '<div class="product-price-block"><strong>' + formatCurrency(product.price) + "</strong><span>" + product.stock + "</span></div>" +
      '<div class="product-actions"><button class="button-ghost" type="button" data-add-cart="' + product.id + '">Add to cart</button><button class="button" type="button" data-buy-now="' + product.id + '">Buy now</button></div>' +
      "</div></div></div></section>" +
      '<section class="section"><div class="grid-two">' +
      '<article class="editorial-card"><span class="section-kicker">Tasting profile</span><h3>What to expect in the glass</h3><ul class="list">' +
      product.tasting.map(function (item) { return "<li>" + item + "</li>"; }).join("") +
      '</ul></article>' +
      '<article class="editorial-card"><span class="section-kicker">Serving notes</span><h3>Pairing and hosting notes</h3><ul class="list">' +
      product.pairings.map(function (item) { return "<li>" + item + "</li>"; }).join("") +
      '</ul></article></div></section>' +
      '<section class="section"><div class="section-header"><div><p class="section-kicker">Reviews</p><h2 class="section-title">What buyers are saying</h2></div></div><div class="grid-two">' +
      product.reviews.map(function (review) {
        return '<article class="testimonial-card"><blockquote>' + review.text + '</blockquote><footer><strong>' + review.author + '</strong><br>Verified buyer</footer></article>';
      }).join("") +
      '</div></section>' +
      '<section class="section"><div class="section-header"><div><p class="section-kicker">Related picks</p><h2 class="section-title">Similar bottles and sets</h2></div></div><div class="product-grid">' +
      related.map(function (item) {
        return createProductCard(item).outerHTML;
      }).join("") +
      "</div></section>";
  }

  function renderCheckout() {
    var host = document.querySelector("[data-checkout-page]");
    if (!host || typeof window.getCartItems !== "function") return;

    var items = window.getCartItems();
    var total = typeof window.getCartTotal === "function" ? window.getCartTotal() : 0;

    if (!items.length) {
      host.innerHTML =
        '<div class="cart-empty"><h2>No items to checkout</h2><p class="cart-note">Add products to your cart before starting checkout.</p><div class="section-actions"><a class="button" href="shop.html">Go to shop</a></div></div>';
      return;
    }

    host.innerHTML =
      '<div class="checkout-layout">' +
      '<article class="checkout-card"><span class="eyebrow">Checkout</span><h1>Complete your order</h1><p class="section-copy">This production-style checkout includes address, payment selection, and a structured order review.</p>' +
      '<form data-checkout-form class="checkout-form">' +
      '<div class="grid-two"><div class="form-field"><label for="full-name">Full name</label><input id="full-name" name="full_name" required></div><div class="form-field"><label for="phone">Phone number</label><input id="phone" name="phone" required></div></div>' +
      '<div class="form-field"><label for="email">Email</label><input id="email" type="email" name="email" required></div>' +
      '<div class="form-field"><label for="address">Address</label><textarea id="address" name="address" rows="4" required></textarea></div>' +
      '<div class="grid-two"><div class="form-field"><label for="city">City</label><input id="city" name="city" required></div><div class="form-field"><label for="postal">Postal code</label><input id="postal" name="postal" required></div></div>' +
      '<div class="form-field"><label for="payment">Payment method</label><select id="payment" name="payment"><option>UPI</option><option>Card</option><option>Cash on delivery</option></select></div>' +
      '<label class="check-row" for="terms"><input id="terms" type="checkbox" required><span>I confirm legal-age purchase compliance and delivery availability.</span></label>' +
      '<div class="auth-actions"><button class="button" type="submit">Place order</button><a class="button-secondary" href="cart.html">Back to cart</a></div>' +
      '</form><p id="checkout-status" class="status info">Order flow is frontend-ready and can now be connected to a payment backend.</p></article>' +
      '<aside class="checkout-card"><span class="eyebrow">Order review</span><h2>Your summary</h2><div class="checkout-items">' +
      items.map(function (item) {
        var lineTotal = (Number(item.price) || 0) * (Number(item.quantity) || 0);
        return '<div class="checkout-item"><div><strong>' + item.name + '</strong><p class="cart-note">Qty ' + item.quantity + '</p></div><span>' + formatCurrency(lineTotal) + '</span></div>';
      }).join("") +
      '</div><div class="checkout-total"><div class="checkout-row"><span>Subtotal</span><strong>' + formatCurrency(total) + '</strong></div><div class="checkout-row"><span>Delivery</span><span>Free</span></div><div class="checkout-row"><span>Total</span><strong>' + formatCurrency(total) + '</strong></div></div></aside></div>';

    var form = host.querySelector("[data-checkout-form]");
    var status = host.querySelector("#checkout-status");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (status) {
          status.textContent = "Order confirmed. Redirecting to confirmation page.";
          status.className = "status success";
        }
        if (typeof window.clearCartData === "function") {
          window.clearCartData();
        }
        window.setTimeout(function () {
          window.location.href = "success.html";
        }, 700);
      });
    }
  }

  function initForms() {
    var forms = document.querySelectorAll("[data-demo-form]");
    forms.forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var statusId = form.getAttribute("data-status-target");
        var status = statusId ? document.getElementById(statusId) : null;
        if (!status) return;

        var mode = form.getAttribute("data-demo-form");
        if (mode === "login") {
          var email = form.querySelector("input[type='email']").value;
          status.textContent =
            "Demo login saved for " + email + ". Backend login can be connected later.";
        } else {
          status.textContent =
            "Message received. This demo form is ready for backend integration.";
        }
        status.className = "status success";
        form.reset();
      });
    });
  }

  function initFooterYear() {
    var years = document.querySelectorAll("[data-current-year]");
    var currentYear = String(new Date().getFullYear());
    years.forEach(function (node) {
      node.textContent = currentYear;
    });
  }

  function ensureToastStack() {
    var stack = document.querySelector("[data-toast-stack]");
    if (stack) return stack;
    stack = document.createElement("div");
    stack.className = "toast-stack";
    stack.setAttribute("data-toast-stack", "");
    stack.setAttribute("aria-live", "polite");
    stack.setAttribute("aria-atomic", "true");
    document.body.appendChild(stack);
    return stack;
  }

  function showToast(title, message) {
    var stack = ensureToastStack();
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = "<strong>" + title + "</strong><span>" + message + "</span>";
    stack.appendChild(toast);

    requestAnimationFrame(function () {
      toast.classList.add("is-visible");
    });

    window.setTimeout(function () {
      toast.classList.remove("is-visible");
      window.setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 240);
    }, 2600);
  }

  function initRevealAnimations() {
    var nodes = document.querySelectorAll(
      ".section, .feature-card, .product-card, .editorial-card, .testimonial-card, .showcase-card, .faq-item, .cta-banner"
    );
    nodes.forEach(function (node) {
      node.classList.add("reveal");
    });

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (node) {
        node.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    nodes.forEach(function (node) {
      observer.observe(node);
    });
  }

  onReady(function () {
    initDynamicSections();
    initHeader();
    initCarousel();
    initShopFilters();
    initProductActions();
    renderProductDetail();
    renderCheckout();
    initForms();
    initFooterYear();
    initRevealAnimations();
    syncCartBadge();

    window.addEventListener("storage", syncCartBadge);
    window.addEventListener("wineapp:cart:updated", syncCartBadge);
    window.WineAppUI = window.WineAppUI || {};
    window.WineAppUI.showToast = showToast;
  });
})();
