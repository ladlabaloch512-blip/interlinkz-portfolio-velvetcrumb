/* Velvet Crumb Bakery - shared site script */
(function () {
  "use strict";

  /* ---------- Product data (from the content pack) ---------- */
  var PRODUCTS = [
    { id: "sourdough", name: "Classic Sourdough Loaf", cat: "Breads", price: 450, unit: "600g loaf",
      img: "images/p-sourdough.jpg",
      short: "Fresh baked every morning, crisp crust and soft centre.",
      long: "Our classic sourdough is baked fresh every morning in small batches. It has a crisp, golden crust and a soft, open centre, and it is made with simple, honest ingredients and given all the time it needs to rise. Best on the day of baking, lovely toasted the next day.",
      options: null },
    { id: "croissant", name: "Butter Croissant", cat: "Pastries", price: 380, unit: "Pack of 2",
      img: "images/p-croissant.jpg",
      short: "Flaky layers made with real butter.",
      long: "Light, golden and flaky, our butter croissants are folded with real butter to give them their delicate layers. Warm them for a few minutes in the oven and they taste like they just came out of ours.",
      options: [ { label: "Pack of 2", price: 380 }, { label: "Pack of 4", price: 760 } ] },
    { id: "choc-fudge-cake", name: "Chocolate Fudge Cake", cat: "Cakes", price: 2450, unit: "2 lb cake",
      img: "images/p-choc-cake.jpg",
      short: "Rich cocoa sponge with fudge icing.",
      long: "Our most ordered birthday cake. A rich cocoa sponge covered in smooth fudge icing, made to order by our own bakers. Order before 10 am and it can often be ready the same day.",
      options: null },
    { id: "red-velvet-cake", name: "Red Velvet Cake", cat: "Cakes", price: 2650, unit: "2 lb cake",
      img: "images/p-red-velvet.jpg",
      short: "Cream cheese frosting and a soft red crumb.",
      long: "A soft red crumb under a generous layer of cream cheese frosting. Gentle, rich and made for celebrations, this is the cake our regulars ask for when the day matters.",
      options: null },
    { id: "blueberry-muffin", name: "Blueberry Muffin", cat: "Pastries", price: 620, unit: "Pack of 4",
      img: "images/p-muffin.jpg",
      short: "Baked with real blueberries.",
      long: "Soft, golden muffins baked with real blueberries in every pack. A pack of four is just right for a slow breakfast or an afternoon tea tray.",
      options: [ { label: "Pack of 4", price: 620 }, { label: "Pack of 8", price: 1240 } ] },
    { id: "cinnamon-roll", name: "Cinnamon Roll", cat: "Pastries", price: 320, unit: "Single roll",
      img: "images/p-cinnamon-roll.jpg",
      short: "Warm spice swirl with a light sugar glaze.",
      long: "A soft roll swirled with warm cinnamon spice and finished with a light sugar glaze. Best eaten warm, with a cup of coffee on the side.",
      options: null },
    { id: "vol-au-vent", name: "Chicken Vol au Vent", cat: "Pastries", price: 540, unit: "Pack of 4",
      img: "images/p-danish.jpg",
      short: "Crisp pastry shells with creamy chicken filling.",
      long: "Crisp, golden pastry shells filled with a creamy chicken filling. A pack of four makes an easy tea time savoury or a light starter for guests.",
      options: [ { label: "Pack of 4", price: 540 }, { label: "Pack of 8", price: 1080 } ] },
    { id: "focaccia", name: "Garlic and Herb Focaccia", cat: "Breads", price: 520, unit: "Flat loaf",
      img: "images/p-focaccia.jpg",
      short: "Flat Italian style bread with olive oil and herbs.",
      long: "A flat Italian style bread brushed with olive oil and scattered with garlic and herbs. Tear it up for the table, or slice it for sandwiches with a little crunch.",
      options: null },
    { id: "biscotti", name: "Almond Biscotti", cat: "Cookies", price: 480, unit: "250g pack",
      img: "images/p-almond-croissant.jpg",
      short: "Twice baked, made for coffee dipping.",
      long: "Twice baked the traditional way, so every slice is crisp and full of almond. Made for coffee dipping, and just as good next to a cup of tea.",
      options: [ { label: "250g pack", price: 480 }, { label: "500g pack", price: 960 } ] },
    { id: "fruit-tart", name: "Fruit Tart", cat: "Cakes", price: 1850, unit: "8 inch tart",
      img: "images/p-fruit-tart.jpg",
      short: "Vanilla custard base topped with seasonal fruit.",
      long: "A crisp tart shell filled with smooth vanilla custard and topped with seasonal fruit. Light, fresh and pretty enough to carry straight to the table.",
      options: null },
    { id: "cappuccino", name: "Cappuccino", cat: "Cafe Drinks", price: 350, unit: "Regular cup",
      img: "images/p-cappuccino.jpg",
      short: "Double shot with steamed milk foam.",
      long: "A regular cup made with a double shot and steamed milk foam. Order it with your breakfast for pickup, or have it delivered with your bakes.",
      options: null },
    { id: "cold-coffee", name: "Cold Coffee", cat: "Cafe Drinks", price: 420, unit: "350 ml bottle",
      img: "images/p-cold-coffee.jpg",
      short: "Chilled blended coffee with a hint of cocoa.",
      long: "Chilled blended coffee with a hint of cocoa, bottled at 350 ml so it travels well. Keep it in the fridge and shake before you pour.",
      options: null },
    { id: "birthday-cake", name: "Birthday Sprinkle Cake", cat: "Cakes", price: 2350, unit: "2 lb cake",
      img: "images/p-birthday-cake.jpg",
      short: "Vanilla sponge, buttercream and colourful sprinkles.",
      long: "A vanilla sponge layered with buttercream and covered in colourful sprinkles. The happy centre of many birthday tables, made to order by our bakers.",
      options: null },
    { id: "whole-wheat-bread", name: "Whole Wheat Bread", cat: "Breads", price: 380, unit: "600g loaf",
      img: "images/p-whole-wheat.jpg",
      short: "Stone ground flour, no added sugar.",
      long: "A hearty 600g loaf made with stone ground flour and no added sugar. Slices well for sandwiches and toast, and stays good for 2 to 3 days in a cloth bag.",
      options: null }
  ];

  var CATEGORIES = ["All", "Breads", "Cakes", "Pastries", "Cookies", "Cafe Drinks"];
  var DELIVERY_FEE = 200;
  var FREE_DELIVERY_ABOVE = 3000;

  function byId(id) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i]; return null; }
  function fmt(n) { return "Rs " + n.toLocaleString("en-US"); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  /* ---------- Cart storage ---------- */
  var CART_KEY = "vc_cart";
  var FULFIL_KEY = "vc_fulfil";
  function loadCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch (e) { return {}; } }
  function saveCart(c) { try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {} }
  function cartCount() { var c = loadCart(), n = 0, k; for (k in c) n += c[k].qty; return n; }
  function cartSubtotal() { var c = loadCart(), s = 0, k; for (k in c) s += c[k].price * c[k].qty; return s; }
  function getFulfil() { try { return localStorage.getItem(FULFIL_KEY) || "pickup"; } catch (e) { return "pickup"; } }
  function setFulfil(v) { try { localStorage.setItem(FULFIL_KEY, v); } catch (e) {} }
  function deliveryFee(subtotal, fulfil) {
    if (fulfil !== "delivery") return 0;
    return subtotal > FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
  }

  function addToCart(id, optionLabel, qty) {
    var p = byId(id); if (!p) return;
    var price = p.price, label = optionLabel || "";
    if (p.options && optionLabel) {
      for (var i = 0; i < p.options.length; i++) if (p.options[i].label === optionLabel) price = p.options[i].price;
    }
    var key = id + "|" + label;
    var c = loadCart();
    if (c[key]) c[key].qty += qty; else c[key] = { id: id, option: label, price: price, qty: qty };
    saveCart(c);
    updateBadge();
    showToast("Added to cart: " + p.name + (label ? " (" + label + ")" : ""));
  }

  function updateBadge() {
    var n = cartCount();
    var badges = document.querySelectorAll(".cart-count");
    for (var i = 0; i < badges.length; i++) { badges[i].textContent = n; badges[i].style.display = n > 0 ? "inline-block" : "none"; }
  }

  var toastTimer = null;
  function showToast(msg) {
    var t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }

  /* ---------- Global click handling (bound once, never stacked) ---------- */
  var bound = false;
  function bindGlobal() {
    if (bound) return; bound = true;
    document.addEventListener("click", function (e) {
      var addBtn = e.target.closest ? e.target.closest("[data-add]") : null;
      if (addBtn) {
        var wrap = addBtn.closest("[data-options-for]");
        var sel = wrap ? wrap.querySelector("select") : null;
        addToCart(addBtn.getAttribute("data-add"), sel ? sel.value : null, 1);
        return;
      }
      var navToggle = e.target.closest ? e.target.closest(".nav-toggle") : null;
      if (navToggle) {
        var nav = document.querySelector(".main-nav");
        if (nav) { nav.classList.toggle("open"); navToggle.setAttribute("aria-expanded", nav.classList.contains("open")); }
        return;
      }
      var accBtn = e.target.closest ? e.target.closest(".faq-q") : null;
      if (accBtn) {
        var item = accBtn.parentElement;
        var panel = item.querySelector(".faq-a");
        var isOpen = item.classList.contains("open");
        var all = document.querySelectorAll(".faq-item.open");
        for (var i = 0; i < all.length; i++) { all[i].classList.remove("open"); all[i].querySelector(".faq-a").style.maxHeight = null; all[i].querySelector(".faq-q").setAttribute("aria-expanded", "false"); }
        if (!isOpen) { item.classList.add("open"); panel.style.maxHeight = panel.scrollHeight + "px"; accBtn.setAttribute("aria-expanded", "true"); }
      }
    });
  }

  /* ---------- Product cards ---------- */
  function cardHTML(p) {
    var opt = "";
    if (p.options) {
      opt = '<label class="card-opt"><span class="sr-only">Pack option for ' + esc(p.name) + '</span><select data-opt-for="' + p.id + '">';
      for (var i = 0; i < p.options.length; i++) opt += '<option value="' + esc(p.options[i].label) + '">' + esc(p.options[i].label) + " - " + fmt(p.options[i].price) + "</option>";
      opt += "</select></label>";
    }
    return '<article class="card" data-cat="' + esc(p.cat) + '" data-price="' + p.price + '">' +
      '<a class="card-img" href="product.html?id=' + p.id + '"><img src="' + p.img + '" alt="' + esc(p.name) + '"></a>' +
      '<div class="card-body">' +
      '<p class="card-cat">' + esc(p.cat) + " - " + esc(p.unit) + "</p>" +
      '<h3><a href="product.html?id=' + p.id + '">' + esc(p.name) + "</a></h3>" +
      '<p class="card-short">' + esc(p.short) + "</p>" +
      '<p class="card-price">' + fmt(p.price) + "</p>" +
      '<div data-options-for="' + p.id + '">' + opt +
      '<button class="btn btn-primary btn-block" type="button" data-add="' + p.id + '">Add to Cart</button></div>' +
      "</div></article>";
  }

  /* ---------- Home best sellers ---------- */
  function initHome() {
    var grid = document.getElementById("best-sellers");
    if (!grid) return;
    var picks = ["sourdough", "choc-fudge-cake", "croissant", "blueberry-muffin"];
    grid.innerHTML = picks.map(function (id) { return cardHTML(byId(id)); }).join("");
  }

  /* ---------- Shop: filter + sort ---------- */
  var shopState = { cat: "All", sort: "featured" };
  function renderShop() {
    var grid = document.getElementById("shop-grid");
    if (!grid) return;
    var list = PRODUCTS.filter(function (p) { return shopState.cat === "All" || p.cat === shopState.cat; });
    if (shopState.sort === "low") list = list.slice().sort(function (a, b) { return a.price - b.price; });
    if (shopState.sort === "high") list = list.slice().sort(function (a, b) { return b.price - a.price; });
    grid.innerHTML = list.length ? list.map(cardHTML).join("") : '<p class="empty-note">No products in this category yet.</p>';
    var pills = document.querySelectorAll(".pill");
    for (var i = 0; i < pills.length; i++) pills[i].classList.toggle("active", pills[i].getAttribute("data-cat-filter") === shopState.cat);
    var count = document.getElementById("shop-count");
    if (count) count.textContent = "Showing " + list.length + " of " + PRODUCTS.length + " products";
  }
  function initShop() {
    var grid = document.getElementById("shop-grid");
    if (!grid) return;
    var params = new URLSearchParams(window.location.search);
    var cat = params.get("cat");
    if (cat && CATEGORIES.indexOf(cat) >= 0) shopState.cat = cat;
    var pillsWrap = document.getElementById("filter-pills");
    pillsWrap.innerHTML = CATEGORIES.map(function (c) {
      return '<button type="button" class="pill" data-cat-filter="' + c + '">' + c + "</button>";
    }).join("");
    pillsWrap.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-cat-filter]") : null;
      if (!b) return;
      shopState.cat = b.getAttribute("data-cat-filter");
      renderShop();
    });
    var sortSel = document.getElementById("sort-select");
    if (sortSel) sortSel.addEventListener("change", function () { shopState.sort = sortSel.value; renderShop(); });
    renderShop();
  }

  /* ---------- Product detail ---------- */
  function initProduct() {
    var root = document.getElementById("product-detail");
    if (!root) return;
    var params = new URLSearchParams(window.location.search);
    var p = byId(params.get("id")) || PRODUCTS[0];
    document.title = p.name + " - Velvet Crumb Bakery";
    var optHTML = "";
    if (p.options) {
      optHTML = '<label class="field"><span>Pack size</span><select id="pd-option">' +
        p.options.map(function (o) { return '<option value="' + esc(o.label) + '">' + esc(o.label) + " - " + fmt(o.price) + "</option>"; }).join("") + "</select></label>";
    }
    root.innerHTML =
      '<div class="pd-img"><img src="' + p.img + '" alt="' + esc(p.name) + '"></div>' +
      '<div class="pd-info">' +
      '<p class="card-cat">' + esc(p.cat) + " - " + esc(p.unit) + "</p>" +
      "<h1>" + esc(p.name) + "</h1>" +
      '<p class="pd-price" id="pd-price">' + fmt(p.price) + "</p>" +
      "<p>" + esc(p.long) + "</p>" +
      '<div class="pd-controls">' + optHTML +
      '<label class="field qty-field"><span>Quantity</span>' +
      '<span class="qty-ctrl"><button type="button" id="qty-minus" aria-label="Decrease quantity">-</button>' +
      '<input type="number" id="pd-qty" value="1" min="1" max="99" aria-label="Quantity">' +
      '<button type="button" id="qty-plus" aria-label="Increase quantity">+</button></span></label></div>' +
      '<button class="btn btn-primary btn-lg" type="button" id="pd-add">Add to Cart</button>' +
      '<p class="pd-note">Order before 10 am for same day pickup on most items. Delivery is Rs 200, free on orders above Rs 3,000.</p>' +
      "</div>";
    var qty = document.getElementById("pd-qty");
    var priceEl = document.getElementById("pd-price");
    var optSel = document.getElementById("pd-option");
    function currentPrice() {
      if (optSel) { for (var i = 0; i < p.options.length; i++) if (p.options[i].label === optSel.value) return p.options[i].price; }
      return p.price;
    }
    function refreshPrice() { priceEl.textContent = fmt(currentPrice() * Math.max(1, parseInt(qty.value, 10) || 1)); }
    document.getElementById("qty-minus").addEventListener("click", function () { qty.value = Math.max(1, (parseInt(qty.value, 10) || 1) - 1); refreshPrice(); });
    document.getElementById("qty-plus").addEventListener("click", function () { qty.value = Math.min(99, (parseInt(qty.value, 10) || 1) + 1); refreshPrice(); });
    qty.addEventListener("change", refreshPrice);
    if (optSel) optSel.addEventListener("change", refreshPrice);
    document.getElementById("pd-add").addEventListener("click", function () {
      addToCart(p.id, optSel ? optSel.value : null, Math.max(1, parseInt(qty.value, 10) || 1));
    });
    var rel = document.getElementById("related-grid");
    if (rel) {
      var others = PRODUCTS.filter(function (x) { return x.cat === p.cat && x.id !== p.id; }).slice(0, 3);
      if (others.length < 3) others = others.concat(PRODUCTS.filter(function (x) { return x.cat !== p.cat; }).slice(0, 3 - others.length));
      rel.innerHTML = others.map(cardHTML).join("");
    }
  }

  /* ---------- Cart page ---------- */
  function renderCart() {
    var wrap = document.getElementById("cart-lines");
    if (!wrap) return;
    var c = loadCart();
    var keys = Object.keys(c);
    var fulfil = getFulfil();
    var radios = document.querySelectorAll('input[name="fulfil"]');
    for (var i = 0; i < radios.length; i++) radios[i].checked = radios[i].value === fulfil;
    if (!keys.length) {
      wrap.innerHTML = '<p class="empty-note">Your cart is empty. <a href="shop.html">Browse the shop</a> and add something fresh.</p>';
    } else {
      wrap.innerHTML = keys.map(function (k) {
        var line = c[k], p = byId(line.id);
        return '<div class="cart-line">' +
          '<img src="' + p.img + '" alt="' + esc(p.name) + '">' +
          '<div class="cart-line-info"><h3>' + esc(p.name) + "</h3>" +
          (line.option ? '<p class="card-cat">' + esc(line.option) + "</p>" : "") +
          '<p class="card-cat">' + fmt(line.price) + " each</p></div>" +
          '<span class="qty-ctrl"><button type="button" data-dec="' + esc(k) + '" aria-label="Decrease quantity">-</button>' +
          '<input type="number" min="1" max="99" value="' + line.qty + '" data-qty="' + esc(k) + '" aria-label="Quantity for ' + esc(p.name) + '">' +
          '<button type="button" data-inc="' + esc(k) + '" aria-label="Increase quantity">+</button></span>' +
          '<p class="cart-line-total">' + fmt(line.price * line.qty) + "</p>" +
          '<button type="button" class="btn btn-ghost" data-remove="' + esc(k) + '">Remove</button></div>';
      }).join("");
    }
    var sub = cartSubtotal();
    var fee = deliveryFee(sub, fulfil);
    document.getElementById("ct-subtotal").textContent = fmt(sub);
    document.getElementById("ct-fee").textContent = fulfil === "delivery" ? (fee === 0 ? "Free" : fmt(fee)) : "Free (pickup)";
    document.getElementById("ct-total").textContent = fmt(sub + fee);
    var hint = document.getElementById("ct-hint");
    if (hint) {
      hint.textContent = fulfil === "delivery" && sub <= FREE_DELIVERY_ABOVE && sub > 0
        ? "Add " + fmt(FREE_DELIVERY_ABOVE + 1 - sub) + " more to get free delivery."
        : (fulfil === "delivery" && sub > FREE_DELIVERY_ABOVE ? "Your order is above Rs 3,000, so delivery is free." : "");
    }
    var co = document.getElementById("cart-checkout-btn");
    if (co) co.style.display = keys.length ? "" : "none";
  }
  function initCart() {
    if (!document.getElementById("cart-lines")) return;
    document.getElementById("cart-lines").addEventListener("click", function (e) {
      var c = loadCart();
      var dec = e.target.closest ? e.target.closest("[data-dec]") : null;
      var inc = e.target.closest ? e.target.closest("[data-inc]") : null;
      var rem = e.target.closest ? e.target.closest("[data-remove]") : null;
      if (dec) { var k1 = dec.getAttribute("data-dec"); c[k1].qty = Math.max(1, c[k1].qty - 1); }
      else if (inc) { var k2 = inc.getAttribute("data-inc"); c[k2].qty = Math.min(99, c[k2].qty + 1); }
      else if (rem) { delete c[rem.getAttribute("data-remove")]; }
      else return;
      saveCart(c); updateBadge(); renderCart();
    });
    document.getElementById("cart-lines").addEventListener("change", function (e) {
      var inp = e.target.closest ? e.target.closest("[data-qty]") : null;
      if (!inp) return;
      var c = loadCart();
      c[inp.getAttribute("data-qty")].qty = Math.min(99, Math.max(1, parseInt(inp.value, 10) || 1));
      saveCart(c); updateBadge(); renderCart();
    });
    var radios = document.querySelectorAll('input[name="fulfil"]');
    for (var i = 0; i < radios.length; i++) radios[i].addEventListener("change", function () { setFulfil(this.value); renderCart(); });
    renderCart();
  }

  /* ---------- Checkout ---------- */
  function initCheckout() {
    var form = document.getElementById("checkout-form");
    if (!form) return;
    var fulfil = getFulfil();
    var sub = cartSubtotal();
    var fee = deliveryFee(sub, fulfil);
    var c = loadCart();
    var keys = Object.keys(c);
    var summary = document.getElementById("co-summary");
    summary.innerHTML = (keys.length ? keys.map(function (k) {
      var line = c[k], p = byId(line.id);
      return '<p class="sum-line"><span>' + esc(p.name) + (line.option ? " (" + esc(line.option) + ")" : "") + " x " + line.qty + "</span><span>" + fmt(line.price * line.qty) + "</span></p>";
    }).join("") : '<p class="empty-note">Your cart is empty.</p>') +
      '<p class="sum-line"><span>Subtotal</span><span>' + fmt(sub) + "</span></p>" +
      '<p class="sum-line"><span>' + (fulfil === "delivery" ? "Delivery" : "Pickup") + '</span><span>' + (fulfil === "delivery" ? (fee === 0 ? "Free" : fmt(fee)) : "Free") + "</span></p>" +
      '<p class="sum-line sum-total"><span>Total</span><span>' + fmt(sub + fee) + "</span></p>";
    document.getElementById("co-fulfil-note").textContent = fulfil === "delivery" ? "Delivering to your address below." : "You chose pickup from the bakery: 12 Demo Lane, Sample Town.";
    var addrField = document.getElementById("co-address");
    if (fulfil === "pickup") { addrField.removeAttribute("required"); document.getElementById("co-address-label").textContent = "Address (only needed for delivery)"; }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      var fields = form.querySelectorAll("[required]");
      for (var i = 0; i < fields.length; i++) {
        var f = fields[i];
        var bad = !f.value.trim() || (f.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value));
        f.classList.toggle("invalid", bad);
        if (bad) ok = false;
      }
      var err = document.getElementById("co-error");
      if (!keys.length) { err.textContent = "Your cart is empty. Add something from the shop first."; err.style.display = "block"; return; }
      if (!ok) { err.textContent = "Please fill in the highlighted fields so we can take your order."; err.style.display = "block"; return; }
      err.style.display = "none";
      var orderNo = "VC-" + Date.now().toString(36).toUpperCase();
      document.getElementById("order-number").textContent = orderNo;
      document.getElementById("co-success-name").textContent = document.getElementById("co-name").value.trim();
      document.getElementById("co-success-total").textContent = fmt(sub + fee);
      saveCart({});
      updateBadge();
      document.getElementById("checkout-main").style.display = "none";
      var s = document.getElementById("checkout-success");
      s.style.display = "block";
      window.scrollTo(0, 0);
    });
  }

  /* ---------- Custom cake builder ---------- */
  var CAKE_SIZES = { "1 lb": 1450, "2 lb": 2350, "3 lb": 3400 };
  function initCake() {
    var form = document.getElementById("cake-form");
    if (!form) return;
    var priceEl = document.getElementById("cake-price");
    function update() {
      var size = document.getElementById("cake-size").value;
      var total = CAKE_SIZES[size] || 1450;
      if (document.getElementById("cake-fondant").checked) total += 600;
      if (document.getElementById("cake-topper").checked) total += 500;
      priceEl.textContent = fmt(total);
    }
    form.addEventListener("change", update);
    form.addEventListener("input", update);
    update();
    var dateInput = document.getElementById("cake-date");
    var min = new Date(Date.now() + 2 * 24 * 3600 * 1000);
    dateInput.min = min.toISOString().split("T")[0];
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      var fields = form.querySelectorAll("[required]");
      for (var i = 0; i < fields.length; i++) { var bad = !fields[i].value.trim(); fields[i].classList.toggle("invalid", bad); if (bad) ok = false; }
      var msg = document.getElementById("cake-msg");
      if (!ok) { msg.className = "form-msg error"; msg.textContent = "Please fill in the highlighted fields, including the date you need the cake."; msg.style.display = "block"; return; }
      msg.className = "form-msg success";
      msg.textContent = "Thank you. Your custom cake request is noted at a guide price of " + priceEl.textContent + ". This is a demo, so no cake will be baked, but our bakers would confirm the final price with you before starting.";
      msg.style.display = "block";
    });
  }

  /* ---------- Simple demo forms (contact) ---------- */
  function initSimpleForms() {
    var forms = document.querySelectorAll("form[data-demo-form]");
    for (var i = 0; i < forms.length; i++) {
      (function (form) {
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          var ok = true;
          var fields = form.querySelectorAll("[required]");
          for (var j = 0; j < fields.length; j++) { var bad = !fields[j].value.trim(); fields[j].classList.toggle("invalid", bad); if (bad) ok = false; }
          var msg = form.querySelector(".form-msg");
          if (!msg) return;
          if (!ok) { msg.className = "form-msg error"; msg.textContent = "Please fill in the highlighted fields."; }
          else { msg.className = "form-msg success"; msg.textContent = "Thank you, your message has been noted. This is a demo site, so nothing was sent, but we would reply within one working day."; form.reset(); }
          msg.style.display = "block";
        });
      })(forms[i]);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindGlobal();
    updateBadge();
    initHome();
    initShop();
    initProduct();
    initCart();
    initCheckout();
    initCake();
    initSimpleForms();
  });
})();
