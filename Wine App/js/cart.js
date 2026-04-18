(function (global) {
  "use strict";

  var STORAGE_KEY = "wineapp_cart_v1";

  function loadCart() {
    try {
      var raw = global.localStorage.getItem(STORAGE_KEY);
      var items = JSON.parse(raw || "[]");
      return Array.isArray(items) ? items : [];
    } catch (error) {
      return [];
    }
  }

  function saveCart(items) {
    global.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    emitUpdate();
  }

  function emitUpdate() {
    global.dispatchEvent(new CustomEvent("wineapp:cart:updated"));
  }

  function getBaseHtmlPath() {
    return global.location.pathname.toLowerCase().indexOf("/html/") !== -1
      ? ""
      : "html/";
  }

  function notify(title, message) {
    if (
      global.WineAppUI &&
      typeof global.WineAppUI.showToast === "function"
    ) {
      global.WineAppUI.showToast(title, message);
      return;
    }
    global.alert(message);
  }

  function formatCurrency(value) {
    return "Rs " + Number(value || 0).toLocaleString("en-IN");
  }

  function addItem(id, name, price) {
    var items = loadCart();
    var existing = items.find(function (item) {
      return item.id === id;
    });

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({
        id: id,
        name: name,
        price: Number(price) || 0,
        quantity: 1,
      });
    }

    saveCart(items);
    notify("Added to cart", name + " has been added to your cart.");
  }

  function buyNow(id, name, price) {
    addItem(id, name, price);
    global.location.href = getBaseHtmlPath() + "cart.html";
  }

  function updateQuantity(id, quantity) {
    var items = loadCart();
    var next = items
      .map(function (item) {
        if (item.id !== id) return item;
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: Math.max(1, Number(quantity) || 1),
        };
      })
      .filter(function (item) {
        return item.quantity > 0;
      });

    saveCart(next);
  }

  function removeItem(id) {
    var next = loadCart().filter(function (item) {
      return item.id !== id;
    });
    saveCart(next);
  }

  function clearCart() {
    saveCart([]);
  }

  function getAllItems() {
    return loadCart();
  }

  function getCartTotal() {
    return loadCart().reduce(function (sum, item) {
      return sum + (Number(item.price) || 0) * (Number(item.quantity) || 0);
    }, 0);
  }

  function renderCartTable(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var items = loadCart();
    container.innerHTML = "";

    if (!items.length) {
      container.innerHTML =
        '<div class="cart-empty"><h2>Your cart is empty</h2><p class="cart-note">Start with our featured bottles and build your order.</p><div class="section-actions"><a class="button" href="shop.html">Go to shop</a></div></div>';
      return;
    }

    var list = document.createElement("div");
    list.className = "cart-items";

    var grandTotal = 0;

    items.forEach(function (item) {
      var total = item.price * item.quantity;
      grandTotal += total;

      var row = document.createElement("article");
      row.className = "cart-row";
      row.innerHTML =
        '<div class="cart-row__meta">' +
        "<h3>" +
        item.name +
        "</h3>" +
        "<p>Unit price: " +
        formatCurrency(item.price) +
        "</p>" +
        "<p>Total: " +
        formatCurrency(total) +
        "</p>" +
        "</div>" +
        '<div class="qty-control">' +
        '<button type="button" data-qty-action="decrease" data-id="' +
        item.id +
        '">-</button>' +
        '<input type="number" min="1" value="' +
        item.quantity +
        '" data-qty-input data-id="' +
        item.id +
        '">' +
        '<button type="button" data-qty-action="increase" data-id="' +
        item.id +
        '">+</button>' +
        "</div>" +
        '<button type="button" class="button-ghost" data-remove-item data-id="' +
        item.id +
        '">Remove</button>';
      list.appendChild(row);
    });

    var summary = document.createElement("div");
    summary.className = "cart-summary";
    summary.innerHTML =
      "<div><p class=\"cart-note\">Order summary</p><strong>" +
      formatCurrency(grandTotal) +
      "</strong><p class=\"cart-note\">Taxes and delivery calculated at checkout.</p></div>" +
      '<div class="cart-summary__actions">' +
      '<button type="button" class="button-secondary" data-clear-cart>Clear cart</button>' +
      '<button type="button" class="button" data-checkout>Proceed to checkout</button>' +
      "</div>";

    container.appendChild(list);
    container.appendChild(summary);

    container.querySelectorAll("[data-qty-action]").forEach(function (button) {
      button.addEventListener("click", function () {
        var id = button.getAttribute("data-id");
        var input = container.querySelector('[data-qty-input][data-id="' + id + '"]');
        var current = Number(input.value) || 1;
        var next =
          button.getAttribute("data-qty-action") === "increase"
            ? current + 1
            : Math.max(1, current - 1);
        updateQuantity(id, next);
        renderCartTable(containerId);
      });
    });

    container.querySelectorAll("[data-qty-input]").forEach(function (input) {
      input.addEventListener("change", function () {
        updateQuantity(input.getAttribute("data-id"), input.value);
        renderCartTable(containerId);
      });
    });

    container.querySelectorAll("[data-remove-item]").forEach(function (button) {
      button.addEventListener("click", function () {
        removeItem(button.getAttribute("data-id"));
        renderCartTable(containerId);
      });
    });

    var clearButton = container.querySelector("[data-clear-cart]");
    var checkoutButton = container.querySelector("[data-checkout]");

    if (clearButton) {
      clearButton.addEventListener("click", function () {
        clearCart();
        renderCartTable(containerId);
      });
    }

    if (checkoutButton) {
      checkoutButton.addEventListener("click", function () {
        global.location.href = "checkout.html";
      });
    }
  }

  global.addToCart = addItem;
  global.buyNow = buyNow;
  global.updateQuantity = updateQuantity;
  global.removeFromCart = removeItem;
  global.renderCartTable = renderCartTable;
  global.getCartItems = getAllItems;
  global.getCartTotal = getCartTotal;
  global.clearCartData = clearCart;
})(window);
