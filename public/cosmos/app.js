(() => {
  // public/cosmos/shell.jsx
  var cosmosPages = [
    ["intro", "01", "Introduction", "/cosmos/"],
    ["secondary", "02", "Secondary research", "/cosmos/secondary/"],
    ["primary", "03", "Primary research", "/cosmos/primary/"],
    ["user-waveline", "04", "User waveline", "/cosmos/user-waveline/"],
    ["storyboard", "05", "Storyboard", "/cosmos/storyboard/"],
    ["stakeholder-map", "06", "Stakeholder analysis", "/cosmos/stakeholder-map/"],
    ["impact-analysis", "07", "Impact analysis", "/cosmos/impact-analysis/"],
    ["making", "08", "Making Cosmos", "/cosmos/making/"]
  ];
  var designSystemLink = {
    id: "design",
    label: "Design system",
    path: "/cosmos/design-system/"
  };
  var secondaryReports = [
    ["overview", "2.0", "Overview", "/cosmos/secondary/"],
    ["spatial-audio", "2.1", "Spatial communications", "/cosmos/secondary/spatial-communications/"],
    ["memory-pods", "2.2", "MemoryPods (arXiv)", "/cosmos/secondary/memory-pods/"],
    ["socially-late", "2.3", "Asynchronous social VR", "/cosmos/secondary/socially-late/"],
    ["vr-reading", "2.4", "Customizing VR reading", "/cosmos/secondary/vr-reading/"]
  ];
  var primaryReports = [
    ["overview", "3.0", "Overview", "/cosmos/primary/"],
    ["interview-kris", "3.1", "Interview 01 \xB7 Kris", "/cosmos/primary/interview-kris/"],
    ["interview-yves", "3.2", "Interview 02 \xB7 Yves", "/cosmos/primary/interview-yves/"],
    ["interview-johnny", "3.3", "Interview 03 \xB7 Johnny", "/cosmos/primary/interview-johnny/"],
    ["interview-jd-suh", "3.4", "Interview 04 \xB7 JD Suh", "/cosmos/primary/interview-jd-suh/"],
    ["expert-questionnaire", "3.5", "Remote expert questionnaire", "/cosmos/primary/expert-questionnaire/"],
    ["version1-review", "3.6", "Version 1 & review", "/cosmos/primary/version1-review/"]
  ];
  var reportChildren = {
    secondary: secondaryReports,
    primary: primaryReports
  };
  function CosmosMark() {
    return /* @__PURE__ */ React.createElement("span", { className: "wordmark-mark" }, /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null));
  }
  function CosmosHeader({ meta = "Research report \xB7 2026" }) {
    const [open, setOpen] = React.useState(false);
    return /* @__PURE__ */ React.createElement("header", { className: "site-header" }, /* @__PURE__ */ React.createElement("a", { className: "wordmark", href: "/cosmos/", "aria-label": "Cosmos home" }, /* @__PURE__ */ React.createElement(CosmosMark, null), " COSMOS"), /* @__PURE__ */ React.createElement("button", { className: "menu-button", onClick: () => setOpen(!open), "aria-expanded": open }, "Menu"), /* @__PURE__ */ React.createElement("nav", { className: open ? "top-nav is-open" : "top-nav", "aria-label": "Cosmos navigation" }, cosmosPages.map(([id, number, label, path]) => /* @__PURE__ */ React.createElement(React.Fragment, { key: id }, /* @__PURE__ */ React.createElement("a", { href: path, onClick: () => setOpen(false) }, label), reportChildren[id]?.slice(1).map(([subId, subNumber, subLabel, subPath]) => /* @__PURE__ */ React.createElement("a", { className: "top-nav-child", key: subId, href: subPath, onClick: () => setOpen(false) }, "\u21B3 ", subLabel))))), /* @__PURE__ */ React.createElement("p", { className: "header-meta" }, meta));
  }
  function CosmosSidebar({ active, subActive }) {
    const [open, setOpen] = React.useState(() => {
      try {
        return window.localStorage.getItem("cosmos-rail") !== "closed";
      } catch {
        return true;
      }
    });
    React.useEffect(() => {
      document.documentElement.dataset.cosmosRail = open ? "open" : "closed";
      try {
        window.localStorage.setItem("cosmos-rail", open ? "open" : "closed");
      } catch {
      }
    }, [open]);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("aside", { className: "chapter-rail", "aria-label": "Cosmos reports", hidden: !open }, /* @__PURE__ */ React.createElement("div", { className: "rail-intro" }, /* @__PURE__ */ React.createElement("div", { className: "rail-intro__top" }, /* @__PURE__ */ React.createElement("p", null, "Research library"), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "rail-close",
        onClick: () => setOpen(false),
        "aria-label": "Close chapter sidebar",
        title: "Close sidebar"
      },
      "\u2039"
    )), /* @__PURE__ */ React.createElement("h2", null, "Cosmos"), /* @__PURE__ */ React.createElement("span", null, "Spatializing asynchronous community")), /* @__PURE__ */ React.createElement("nav", null, /* @__PURE__ */ React.createElement("p", null, "Index"), cosmosPages.map(([id, number, label, path]) => /* @__PURE__ */ React.createElement(React.Fragment, { key: id }, /* @__PURE__ */ React.createElement("a", { className: active === id ? "active" : "", href: path }, /* @__PURE__ */ React.createElement("span", null, number), /* @__PURE__ */ React.createElement("b", null, label), /* @__PURE__ */ React.createElement("i", null, "\u2192")), reportChildren[id] && active === id && /* @__PURE__ */ React.createElement("div", { className: "rail-subnav" }, reportChildren[id].map(([subId, subNumber, subLabel, subPath]) => /* @__PURE__ */ React.createElement("a", { className: subActive === subId ? "active" : "", key: subId, href: subPath }, /* @__PURE__ */ React.createElement("span", null, subNumber), /* @__PURE__ */ React.createElement("b", null, subLabel), /* @__PURE__ */ React.createElement("i", null, "\u2197"))))))), /* @__PURE__ */ React.createElement("div", { className: "rail-footer" }, /* @__PURE__ */ React.createElement(
      "a",
      {
        className: `rail-footer__design ${active === "design" ? "active" : ""}`,
        href: designSystemLink.path
      },
      designSystemLink.label
    ), /* @__PURE__ */ React.createElement("div", { className: "rail-status" }, /* @__PURE__ */ React.createElement("i", null), " Cosmos archive ", /* @__PURE__ */ React.createElement("span", null, "2026")))), !open && /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "rail-reopen",
        onClick: () => setOpen(true),
        "aria-label": "Open chapter sidebar",
        title: "Open sidebar"
      },
      "\u2630"
    ));
  }

  // node_modules/d3-quadtree/src/add.js
  function add_default(d) {
    const x3 = +this._x.call(null, d), y3 = +this._y.call(null, d);
    return add(this.cover(x3, y3), x3, y3, d);
  }
  function add(tree, x3, y3, d) {
    if (isNaN(x3) || isNaN(y3)) return tree;
    var parent, node = tree._root, leaf = { data: d }, x0 = tree._x0, y0 = tree._y0, x1 = tree._x1, y1 = tree._y1, xm, ym, xp, yp, right, bottom, i, j;
    if (!node) return tree._root = leaf, tree;
    while (node.length) {
      if (right = x3 >= (xm = (x0 + x1) / 2)) x0 = xm;
      else x1 = xm;
      if (bottom = y3 >= (ym = (y0 + y1) / 2)) y0 = ym;
      else y1 = ym;
      if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
    }
    xp = +tree._x.call(null, node.data);
    yp = +tree._y.call(null, node.data);
    if (x3 === xp && y3 === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;
    do {
      parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
      if (right = x3 >= (xm = (x0 + x1) / 2)) x0 = xm;
      else x1 = xm;
      if (bottom = y3 >= (ym = (y0 + y1) / 2)) y0 = ym;
      else y1 = ym;
    } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | xp >= xm));
    return parent[j] = node, parent[i] = leaf, tree;
  }
  function addAll(data) {
    var d, i, n = data.length, x3, y3, xz = new Array(n), yz = new Array(n), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (i = 0; i < n; ++i) {
      if (isNaN(x3 = +this._x.call(null, d = data[i])) || isNaN(y3 = +this._y.call(null, d))) continue;
      xz[i] = x3;
      yz[i] = y3;
      if (x3 < x0) x0 = x3;
      if (x3 > x1) x1 = x3;
      if (y3 < y0) y0 = y3;
      if (y3 > y1) y1 = y3;
    }
    if (x0 > x1 || y0 > y1) return this;
    this.cover(x0, y0).cover(x1, y1);
    for (i = 0; i < n; ++i) {
      add(this, xz[i], yz[i], data[i]);
    }
    return this;
  }

  // node_modules/d3-quadtree/src/cover.js
  function cover_default(x3, y3) {
    if (isNaN(x3 = +x3) || isNaN(y3 = +y3)) return this;
    var x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1;
    if (isNaN(x0)) {
      x1 = (x0 = Math.floor(x3)) + 1;
      y1 = (y0 = Math.floor(y3)) + 1;
    } else {
      var z = x1 - x0 || 1, node = this._root, parent, i;
      while (x0 > x3 || x3 >= x1 || y0 > y3 || y3 >= y1) {
        i = (y3 < y0) << 1 | x3 < x0;
        parent = new Array(4), parent[i] = node, node = parent, z *= 2;
        switch (i) {
          case 0:
            x1 = x0 + z, y1 = y0 + z;
            break;
          case 1:
            x0 = x1 - z, y1 = y0 + z;
            break;
          case 2:
            x1 = x0 + z, y0 = y1 - z;
            break;
          case 3:
            x0 = x1 - z, y0 = y1 - z;
            break;
        }
      }
      if (this._root && this._root.length) this._root = node;
    }
    this._x0 = x0;
    this._y0 = y0;
    this._x1 = x1;
    this._y1 = y1;
    return this;
  }

  // node_modules/d3-quadtree/src/data.js
  function data_default() {
    var data = [];
    this.visit(function(node) {
      if (!node.length) do
        data.push(node.data);
      while (node = node.next);
    });
    return data;
  }

  // node_modules/d3-quadtree/src/extent.js
  function extent_default(_) {
    return arguments.length ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
  }

  // node_modules/d3-quadtree/src/quad.js
  function quad_default(node, x0, y0, x1, y1) {
    this.node = node;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
  }

  // node_modules/d3-quadtree/src/find.js
  function find_default(x3, y3, radius) {
    var data, x0 = this._x0, y0 = this._y0, x1, y1, x22, y22, x32 = this._x1, y32 = this._y1, quads = [], node = this._root, q, i;
    if (node) quads.push(new quad_default(node, x0, y0, x32, y32));
    if (radius == null) radius = Infinity;
    else {
      x0 = x3 - radius, y0 = y3 - radius;
      x32 = x3 + radius, y32 = y3 + radius;
      radius *= radius;
    }
    while (q = quads.pop()) {
      if (!(node = q.node) || (x1 = q.x0) > x32 || (y1 = q.y0) > y32 || (x22 = q.x1) < x0 || (y22 = q.y1) < y0) continue;
      if (node.length) {
        var xm = (x1 + x22) / 2, ym = (y1 + y22) / 2;
        quads.push(
          new quad_default(node[3], xm, ym, x22, y22),
          new quad_default(node[2], x1, ym, xm, y22),
          new quad_default(node[1], xm, y1, x22, ym),
          new quad_default(node[0], x1, y1, xm, ym)
        );
        if (i = (y3 >= ym) << 1 | x3 >= xm) {
          q = quads[quads.length - 1];
          quads[quads.length - 1] = quads[quads.length - 1 - i];
          quads[quads.length - 1 - i] = q;
        }
      } else {
        var dx = x3 - +this._x.call(null, node.data), dy = y3 - +this._y.call(null, node.data), d2 = dx * dx + dy * dy;
        if (d2 < radius) {
          var d = Math.sqrt(radius = d2);
          x0 = x3 - d, y0 = y3 - d;
          x32 = x3 + d, y32 = y3 + d;
          data = node.data;
        }
      }
    }
    return data;
  }

  // node_modules/d3-quadtree/src/remove.js
  function remove_default(d) {
    if (isNaN(x3 = +this._x.call(null, d)) || isNaN(y3 = +this._y.call(null, d))) return this;
    var parent, node = this._root, retainer, previous, next, x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1, x3, y3, xm, ym, right, bottom, i, j;
    if (!node) return this;
    if (node.length) while (true) {
      if (right = x3 >= (xm = (x0 + x1) / 2)) x0 = xm;
      else x1 = xm;
      if (bottom = y3 >= (ym = (y0 + y1) / 2)) y0 = ym;
      else y1 = ym;
      if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
      if (!node.length) break;
      if (parent[i + 1 & 3] || parent[i + 2 & 3] || parent[i + 3 & 3]) retainer = parent, j = i;
    }
    while (node.data !== d) if (!(previous = node, node = node.next)) return this;
    if (next = node.next) delete node.next;
    if (previous) return next ? previous.next = next : delete previous.next, this;
    if (!parent) return this._root = next, this;
    next ? parent[i] = next : delete parent[i];
    if ((node = parent[0] || parent[1] || parent[2] || parent[3]) && node === (parent[3] || parent[2] || parent[1] || parent[0]) && !node.length) {
      if (retainer) retainer[j] = node;
      else this._root = node;
    }
    return this;
  }
  function removeAll(data) {
    for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
    return this;
  }

  // node_modules/d3-quadtree/src/root.js
  function root_default() {
    return this._root;
  }

  // node_modules/d3-quadtree/src/size.js
  function size_default() {
    var size = 0;
    this.visit(function(node) {
      if (!node.length) do
        ++size;
      while (node = node.next);
    });
    return size;
  }

  // node_modules/d3-quadtree/src/visit.js
  function visit_default(callback) {
    var quads = [], q, node = this._root, child, x0, y0, x1, y1;
    if (node) quads.push(new quad_default(node, this._x0, this._y0, this._x1, this._y1));
    while (q = quads.pop()) {
      if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
        var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
        if (child = node[3]) quads.push(new quad_default(child, xm, ym, x1, y1));
        if (child = node[2]) quads.push(new quad_default(child, x0, ym, xm, y1));
        if (child = node[1]) quads.push(new quad_default(child, xm, y0, x1, ym));
        if (child = node[0]) quads.push(new quad_default(child, x0, y0, xm, ym));
      }
    }
    return this;
  }

  // node_modules/d3-quadtree/src/visitAfter.js
  function visitAfter_default(callback) {
    var quads = [], next = [], q;
    if (this._root) quads.push(new quad_default(this._root, this._x0, this._y0, this._x1, this._y1));
    while (q = quads.pop()) {
      var node = q.node;
      if (node.length) {
        var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
        if (child = node[0]) quads.push(new quad_default(child, x0, y0, xm, ym));
        if (child = node[1]) quads.push(new quad_default(child, xm, y0, x1, ym));
        if (child = node[2]) quads.push(new quad_default(child, x0, ym, xm, y1));
        if (child = node[3]) quads.push(new quad_default(child, xm, ym, x1, y1));
      }
      next.push(q);
    }
    while (q = next.pop()) {
      callback(q.node, q.x0, q.y0, q.x1, q.y1);
    }
    return this;
  }

  // node_modules/d3-quadtree/src/x.js
  function defaultX(d) {
    return d[0];
  }
  function x_default(_) {
    return arguments.length ? (this._x = _, this) : this._x;
  }

  // node_modules/d3-quadtree/src/y.js
  function defaultY(d) {
    return d[1];
  }
  function y_default(_) {
    return arguments.length ? (this._y = _, this) : this._y;
  }

  // node_modules/d3-quadtree/src/quadtree.js
  function quadtree(nodes, x3, y3) {
    var tree = new Quadtree(x3 == null ? defaultX : x3, y3 == null ? defaultY : y3, NaN, NaN, NaN, NaN);
    return nodes == null ? tree : tree.addAll(nodes);
  }
  function Quadtree(x3, y3, x0, y0, x1, y1) {
    this._x = x3;
    this._y = y3;
    this._x0 = x0;
    this._y0 = y0;
    this._x1 = x1;
    this._y1 = y1;
    this._root = void 0;
  }
  function leaf_copy(leaf) {
    var copy = { data: leaf.data }, next = copy;
    while (leaf = leaf.next) next = next.next = { data: leaf.data };
    return copy;
  }
  var treeProto = quadtree.prototype = Quadtree.prototype;
  treeProto.copy = function() {
    var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1), node = this._root, nodes, child;
    if (!node) return copy;
    if (!node.length) return copy._root = leaf_copy(node), copy;
    nodes = [{ source: node, target: copy._root = new Array(4) }];
    while (node = nodes.pop()) {
      for (var i = 0; i < 4; ++i) {
        if (child = node.source[i]) {
          if (child.length) nodes.push({ source: child, target: node.target[i] = new Array(4) });
          else node.target[i] = leaf_copy(child);
        }
      }
    }
    return copy;
  };
  treeProto.add = add_default;
  treeProto.addAll = addAll;
  treeProto.cover = cover_default;
  treeProto.data = data_default;
  treeProto.extent = extent_default;
  treeProto.find = find_default;
  treeProto.remove = remove_default;
  treeProto.removeAll = removeAll;
  treeProto.root = root_default;
  treeProto.size = size_default;
  treeProto.visit = visit_default;
  treeProto.visitAfter = visitAfter_default;
  treeProto.x = x_default;
  treeProto.y = y_default;

  // node_modules/d3-force/src/constant.js
  function constant_default(x3) {
    return function() {
      return x3;
    };
  }

  // node_modules/d3-force/src/jiggle.js
  function jiggle_default(random) {
    return (random() - 0.5) * 1e-6;
  }

  // node_modules/d3-force/src/collide.js
  function x(d) {
    return d.x + d.vx;
  }
  function y(d) {
    return d.y + d.vy;
  }
  function collide_default(radius) {
    var nodes, radii, random, strength = 1, iterations = 1;
    if (typeof radius !== "function") radius = constant_default(radius == null ? 1 : +radius);
    function force() {
      var i, n = nodes.length, tree, node, xi, yi, ri, ri2;
      for (var k = 0; k < iterations; ++k) {
        tree = quadtree(nodes, x, y).visitAfter(prepare);
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          ri = radii[node.index], ri2 = ri * ri;
          xi = node.x + node.vx;
          yi = node.y + node.vy;
          tree.visit(apply);
        }
      }
      function apply(quad, x0, y0, x1, y1) {
        var data = quad.data, rj = quad.r, r = ri + rj;
        if (data) {
          if (data.index > node.index) {
            var x3 = xi - data.x - data.vx, y3 = yi - data.y - data.vy, l = x3 * x3 + y3 * y3;
            if (l < r * r) {
              if (x3 === 0) x3 = jiggle_default(random), l += x3 * x3;
              if (y3 === 0) y3 = jiggle_default(random), l += y3 * y3;
              l = (r - (l = Math.sqrt(l))) / l * strength;
              node.vx += (x3 *= l) * (r = (rj *= rj) / (ri2 + rj));
              node.vy += (y3 *= l) * r;
              data.vx -= x3 * (r = 1 - r);
              data.vy -= y3 * r;
            }
          }
          return;
        }
        return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
      }
    }
    function prepare(quad) {
      if (quad.data) return quad.r = radii[quad.data.index];
      for (var i = quad.r = 0; i < 4; ++i) {
        if (quad[i] && quad[i].r > quad.r) {
          quad.r = quad[i].r;
        }
      }
    }
    function initialize() {
      if (!nodes) return;
      var i, n = nodes.length, node;
      radii = new Array(n);
      for (i = 0; i < n; ++i) node = nodes[i], radii[node.index] = +radius(node, i, nodes);
    }
    force.initialize = function(_nodes, _random) {
      nodes = _nodes;
      random = _random;
      initialize();
    };
    force.iterations = function(_) {
      return arguments.length ? (iterations = +_, force) : iterations;
    };
    force.strength = function(_) {
      return arguments.length ? (strength = +_, force) : strength;
    };
    force.radius = function(_) {
      return arguments.length ? (radius = typeof _ === "function" ? _ : constant_default(+_), initialize(), force) : radius;
    };
    return force;
  }

  // node_modules/d3-force/src/link.js
  function index(d) {
    return d.index;
  }
  function find(nodeById2, nodeId) {
    var node = nodeById2.get(nodeId);
    if (!node) throw new Error("node not found: " + nodeId);
    return node;
  }
  function link_default(links) {
    var id = index, strength = defaultStrength, strengths, distance = constant_default(30), distances, nodes, count, bias, random, iterations = 1;
    if (links == null) links = [];
    function defaultStrength(link) {
      return 1 / Math.min(count[link.source.index], count[link.target.index]);
    }
    function force(alpha) {
      for (var k = 0, n = links.length; k < iterations; ++k) {
        for (var i = 0, link, source, target, x3, y3, l, b; i < n; ++i) {
          link = links[i], source = link.source, target = link.target;
          x3 = target.x + target.vx - source.x - source.vx || jiggle_default(random);
          y3 = target.y + target.vy - source.y - source.vy || jiggle_default(random);
          l = Math.sqrt(x3 * x3 + y3 * y3);
          l = (l - distances[i]) / l * alpha * strengths[i];
          x3 *= l, y3 *= l;
          target.vx -= x3 * (b = bias[i]);
          target.vy -= y3 * b;
          source.vx += x3 * (b = 1 - b);
          source.vy += y3 * b;
        }
      }
    }
    function initialize() {
      if (!nodes) return;
      var i, n = nodes.length, m2 = links.length, nodeById2 = new Map(nodes.map((d, i2) => [id(d, i2, nodes), d])), link;
      for (i = 0, count = new Array(n); i < m2; ++i) {
        link = links[i], link.index = i;
        if (typeof link.source !== "object") link.source = find(nodeById2, link.source);
        if (typeof link.target !== "object") link.target = find(nodeById2, link.target);
        count[link.source.index] = (count[link.source.index] || 0) + 1;
        count[link.target.index] = (count[link.target.index] || 0) + 1;
      }
      for (i = 0, bias = new Array(m2); i < m2; ++i) {
        link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
      }
      strengths = new Array(m2), initializeStrength();
      distances = new Array(m2), initializeDistance();
    }
    function initializeStrength() {
      if (!nodes) return;
      for (var i = 0, n = links.length; i < n; ++i) {
        strengths[i] = +strength(links[i], i, links);
      }
    }
    function initializeDistance() {
      if (!nodes) return;
      for (var i = 0, n = links.length; i < n; ++i) {
        distances[i] = +distance(links[i], i, links);
      }
    }
    force.initialize = function(_nodes, _random) {
      nodes = _nodes;
      random = _random;
      initialize();
    };
    force.links = function(_) {
      return arguments.length ? (links = _, initialize(), force) : links;
    };
    force.id = function(_) {
      return arguments.length ? (id = _, force) : id;
    };
    force.iterations = function(_) {
      return arguments.length ? (iterations = +_, force) : iterations;
    };
    force.strength = function(_) {
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default(+_), initializeStrength(), force) : strength;
    };
    force.distance = function(_) {
      return arguments.length ? (distance = typeof _ === "function" ? _ : constant_default(+_), initializeDistance(), force) : distance;
    };
    return force;
  }

  // node_modules/d3-dispatch/src/dispatch.js
  var noop = { value: () => {
  } };
  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
      _[t] = [];
    }
    return new Dispatch(_);
  }
  function Dispatch(_) {
    this._ = _;
  }
  function parseTypenames(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
      return { type: t, name };
    });
  }
  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(typename, callback) {
      var _ = this._, T = parseTypenames(typename + "", _), t, i = -1, n = T.length;
      if (arguments.length < 2) {
        while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
        return;
      }
      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
      while (++i < n) {
        if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
        else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
      }
      return this;
    },
    copy: function() {
      var copy = {}, _ = this._;
      for (var t in _) copy[t] = _[t].slice();
      return new Dispatch(copy);
    },
    call: function(type, that) {
      if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    },
    apply: function(type, that, args) {
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    }
  };
  function get(type, name) {
    for (var i = 0, n = type.length, c2; i < n; ++i) {
      if ((c2 = type[i]).name === name) {
        return c2.value;
      }
    }
  }
  function set(type, name, callback) {
    for (var i = 0, n = type.length; i < n; ++i) {
      if (type[i].name === name) {
        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
      }
    }
    if (callback != null) type.push({ name, value: callback });
    return type;
  }
  var dispatch_default = dispatch;

  // node_modules/d3-timer/src/timer.js
  var frame = 0;
  var timeout = 0;
  var interval = 0;
  var pokeDelay = 1e3;
  var taskHead;
  var taskTail;
  var clockLast = 0;
  var clockNow = 0;
  var clockSkew = 0;
  var clock = typeof performance === "object" && performance.now ? performance : Date;
  var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
    setTimeout(f, 17);
  };
  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }
  function clearNow() {
    clockNow = 0;
  }
  function Timer() {
    this._call = this._time = this._next = null;
  }
  Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(callback, delay, time) {
      if (typeof callback !== "function") throw new TypeError("callback is not a function");
      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
      if (!this._next && taskTail !== this) {
        if (taskTail) taskTail._next = this;
        else taskHead = this;
        taskTail = this;
      }
      this._call = callback;
      this._time = time;
      sleep();
    },
    stop: function() {
      if (this._call) {
        this._call = null;
        this._time = Infinity;
        sleep();
      }
    }
  };
  function timer(callback, delay, time) {
    var t = new Timer();
    t.restart(callback, delay, time);
    return t;
  }
  function timerFlush() {
    now();
    ++frame;
    var t = taskHead, e;
    while (t) {
      if ((e = clockNow - t._time) >= 0) t._call.call(void 0, e);
      t = t._next;
    }
    --frame;
  }
  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout = 0;
    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }
  function poke() {
    var now2 = clock.now(), delay = now2 - clockLast;
    if (delay > pokeDelay) clockSkew -= delay, clockLast = now2;
  }
  function nap() {
    var t0, t1 = taskHead, t2, time = Infinity;
    while (t1) {
      if (t1._call) {
        if (time > t1._time) time = t1._time;
        t0 = t1, t1 = t1._next;
      } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
      }
    }
    taskTail = t0;
    sleep(time);
  }
  function sleep(time) {
    if (frame) return;
    if (timeout) timeout = clearTimeout(timeout);
    var delay = time - clockNow;
    if (delay > 24) {
      if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
      if (interval) interval = clearInterval(interval);
    } else {
      if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }

  // node_modules/d3-force/src/lcg.js
  var a = 1664525;
  var c = 1013904223;
  var m = 4294967296;
  function lcg_default() {
    let s = 1;
    return () => (s = (a * s + c) % m) / m;
  }

  // node_modules/d3-force/src/simulation.js
  function x2(d) {
    return d.x;
  }
  function y2(d) {
    return d.y;
  }
  var initialRadius = 10;
  var initialAngle = Math.PI * (3 - Math.sqrt(5));
  function simulation_default(nodes) {
    var simulation, alpha = 1, alphaMin = 1e-3, alphaDecay = 1 - Math.pow(alphaMin, 1 / 300), alphaTarget = 0, velocityDecay = 0.6, forces = /* @__PURE__ */ new Map(), stepper = timer(step), event = dispatch_default("tick", "end"), random = lcg_default();
    if (nodes == null) nodes = [];
    function step() {
      tick();
      event.call("tick", simulation);
      if (alpha < alphaMin) {
        stepper.stop();
        event.call("end", simulation);
      }
    }
    function tick(iterations) {
      var i, n = nodes.length, node;
      if (iterations === void 0) iterations = 1;
      for (var k = 0; k < iterations; ++k) {
        alpha += (alphaTarget - alpha) * alphaDecay;
        forces.forEach(function(force) {
          force(alpha);
        });
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          if (node.fx == null) node.x += node.vx *= velocityDecay;
          else node.x = node.fx, node.vx = 0;
          if (node.fy == null) node.y += node.vy *= velocityDecay;
          else node.y = node.fy, node.vy = 0;
        }
      }
      return simulation;
    }
    function initializeNodes() {
      for (var i = 0, n = nodes.length, node; i < n; ++i) {
        node = nodes[i], node.index = i;
        if (node.fx != null) node.x = node.fx;
        if (node.fy != null) node.y = node.fy;
        if (isNaN(node.x) || isNaN(node.y)) {
          var radius = initialRadius * Math.sqrt(0.5 + i), angle = i * initialAngle;
          node.x = radius * Math.cos(angle);
          node.y = radius * Math.sin(angle);
        }
        if (isNaN(node.vx) || isNaN(node.vy)) {
          node.vx = node.vy = 0;
        }
      }
    }
    function initializeForce(force) {
      if (force.initialize) force.initialize(nodes, random);
      return force;
    }
    initializeNodes();
    return simulation = {
      tick,
      restart: function() {
        return stepper.restart(step), simulation;
      },
      stop: function() {
        return stepper.stop(), simulation;
      },
      nodes: function(_) {
        return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation) : nodes;
      },
      alpha: function(_) {
        return arguments.length ? (alpha = +_, simulation) : alpha;
      },
      alphaMin: function(_) {
        return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
      },
      alphaDecay: function(_) {
        return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
      },
      alphaTarget: function(_) {
        return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
      },
      velocityDecay: function(_) {
        return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
      },
      randomSource: function(_) {
        return arguments.length ? (random = _, forces.forEach(initializeForce), simulation) : random;
      },
      force: function(name, _) {
        return arguments.length > 1 ? (_ == null ? forces.delete(name) : forces.set(name, initializeForce(_)), simulation) : forces.get(name);
      },
      find: function(x3, y3, radius) {
        var i = 0, n = nodes.length, dx, dy, d2, node, closest;
        if (radius == null) radius = Infinity;
        else radius *= radius;
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dx = x3 - node.x;
          dy = y3 - node.y;
          d2 = dx * dx + dy * dy;
          if (d2 < radius) closest = node, radius = d2;
        }
        return closest;
      },
      on: function(name, _) {
        return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
      }
    };
  }

  // node_modules/d3-force/src/manyBody.js
  function manyBody_default() {
    var nodes, node, random, alpha, strength = constant_default(-30), strengths, distanceMin2 = 1, distanceMax2 = Infinity, theta2 = 0.81;
    function force(_) {
      var i, n = nodes.length, tree = quadtree(nodes, x2, y2).visitAfter(accumulate);
      for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);
    }
    function initialize() {
      if (!nodes) return;
      var i, n = nodes.length, node2;
      strengths = new Array(n);
      for (i = 0; i < n; ++i) node2 = nodes[i], strengths[node2.index] = +strength(node2, i, nodes);
    }
    function accumulate(quad) {
      var strength2 = 0, q, c2, weight = 0, x3, y3, i;
      if (quad.length) {
        for (x3 = y3 = i = 0; i < 4; ++i) {
          if ((q = quad[i]) && (c2 = Math.abs(q.value))) {
            strength2 += q.value, weight += c2, x3 += c2 * q.x, y3 += c2 * q.y;
          }
        }
        quad.x = x3 / weight;
        quad.y = y3 / weight;
      } else {
        q = quad;
        q.x = q.data.x;
        q.y = q.data.y;
        do
          strength2 += strengths[q.data.index];
        while (q = q.next);
      }
      quad.value = strength2;
    }
    function apply(quad, x1, _, x22) {
      if (!quad.value) return true;
      var x3 = quad.x - node.x, y3 = quad.y - node.y, w = x22 - x1, l = x3 * x3 + y3 * y3;
      if (w * w / theta2 < l) {
        if (l < distanceMax2) {
          if (x3 === 0) x3 = jiggle_default(random), l += x3 * x3;
          if (y3 === 0) y3 = jiggle_default(random), l += y3 * y3;
          if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
          node.vx += x3 * quad.value * alpha / l;
          node.vy += y3 * quad.value * alpha / l;
        }
        return true;
      } else if (quad.length || l >= distanceMax2) return;
      if (quad.data !== node || quad.next) {
        if (x3 === 0) x3 = jiggle_default(random), l += x3 * x3;
        if (y3 === 0) y3 = jiggle_default(random), l += y3 * y3;
        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
      }
      do
        if (quad.data !== node) {
          w = strengths[quad.data.index] * alpha / l;
          node.vx += x3 * w;
          node.vy += y3 * w;
        }
      while (quad = quad.next);
    }
    force.initialize = function(_nodes, _random) {
      nodes = _nodes;
      random = _random;
      initialize();
    };
    force.strength = function(_) {
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default(+_), initialize(), force) : strength;
    };
    force.distanceMin = function(_) {
      return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
    };
    force.distanceMax = function(_) {
      return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
    };
    force.theta = function(_) {
      return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
    };
    return force;
  }

  // node_modules/d3-force/src/x.js
  function x_default2(x3) {
    var strength = constant_default(0.1), nodes, strengths, xz;
    if (typeof x3 !== "function") x3 = constant_default(x3 == null ? 0 : +x3);
    function force(alpha) {
      for (var i = 0, n = nodes.length, node; i < n; ++i) {
        node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;
      }
    }
    function initialize() {
      if (!nodes) return;
      var i, n = nodes.length;
      strengths = new Array(n);
      xz = new Array(n);
      for (i = 0; i < n; ++i) {
        strengths[i] = isNaN(xz[i] = +x3(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
      }
    }
    force.initialize = function(_) {
      nodes = _;
      initialize();
    };
    force.strength = function(_) {
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default(+_), initialize(), force) : strength;
    };
    force.x = function(_) {
      return arguments.length ? (x3 = typeof _ === "function" ? _ : constant_default(+_), initialize(), force) : x3;
    };
    return force;
  }

  // node_modules/d3-force/src/y.js
  function y_default2(y3) {
    var strength = constant_default(0.1), nodes, strengths, yz;
    if (typeof y3 !== "function") y3 = constant_default(y3 == null ? 0 : +y3);
    function force(alpha) {
      for (var i = 0, n = nodes.length, node; i < n; ++i) {
        node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;
      }
    }
    function initialize() {
      if (!nodes) return;
      var i, n = nodes.length;
      strengths = new Array(n);
      yz = new Array(n);
      for (i = 0; i < n; ++i) {
        strengths[i] = isNaN(yz[i] = +y3(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
      }
    }
    force.initialize = function(_) {
      nodes = _;
      initialize();
    };
    force.strength = function(_) {
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default(+_), initialize(), force) : strength;
    };
    force.y = function(_) {
      return arguments.length ? (y3 = typeof _ === "function" ? _ : constant_default(+_), initialize(), force) : y3;
    };
    return force;
  }

  // public/cosmos/app.jsx
  var { useEffect, useState, useRef } = React;
  var experienceWaves = [
    {
      id: "cosmos",
      label: "Cosmos VR",
      kicker: "04 \xB7 User waveline \xB7 Cosmos VR",
      title: "One session in the sphere",
      lede: "Eight stages of using Cosmos VR \u2014 from first intrigue through contribution and return. Wave height is felt intensity.",
      stroke: "#f14f9b",
      fill: "#f14f9b",
      defaultStage: "immerse",
      stages: [
        {
          id: "entice",
          stage: "01",
          name: "Entice",
          short: "Awareness & intrigue",
          intensity: 0.38,
          peakLabel: "intrigue",
          behavior: "Sees a demo or trailer: someone speaking a post into existence, a post glowing with color, or walking up to a note and hearing the original voice while text appears.",
          feelings: "Intrigue + emotional pull \u2014 more human and alive than text-only forums.",
          achievements: "Expects a multimodal, embodied community (voice + space + touch).",
          mechanics: ["Voice trailer", "Color glow", "Proximity playback"]
        },
        {
          id: "enter",
          stage: "02",
          name: "Enter",
          short: "First entry into the sphere",
          intensity: 0.72,
          peakLabel: "awe",
          behavior: "Enters the center of the sphere. Sees color-coded post-its of different sizes and depths. Onboarding: walk or sit, point to zoom, grab with hands, or speak to post.",
          feelings: "Awe at the living, colorful space. Curiosity about voice and touch layers.",
          achievements: "Understands Cosmos is not only visual \u2014 voice, color, and direct manipulation.",
          mechanics: ["Sphere entry", "Color coding", "Onboarding gestures"]
        },
        {
          id: "orient",
          stage: "03",
          name: "Orient",
          short: "Learning the spatial language",
          intensity: 0.84,
          peakLabel: "delight",
          behavior: "Points to zoom a post, grabs and shifts it, walks closer for faint voice playback, notices color themes, speaks a short test post into the right place.",
          feelings: "Empowerment and small wow moments \u2014 \u201CI can just grab it\u2026 and it speaks when I get close.\u201D",
          achievements: "Color = theme/mood; proximity = voice + detail; hands = manipulate; voice = create.",
          mechanics: ["Point-to-zoom", "Hand grab", "Voice test post"]
        },
        {
          id: "explore",
          stage: "04",
          name: "Explore",
          short: "High-level scanning & wandering",
          intensity: 0.52,
          peakLabel: "calm scan",
          behavior: "Walks or pans across color clusters. Older posts sit slightly behind. Points from a distance to preview; walks closer for soft voice snippets without full zoom.",
          feelings: "Calm exploration with sensory richness. Voice fragments add emotional texture while browsing.",
          achievements: "Quick visual + auditory overview of the community\u2019s mood and themes.",
          mechanics: ["Color clusters", "Depth = age", "Soft proximity audio"]
        },
        {
          id: "discover",
          stage: "05",
          name: "Discover",
          short: "Serendipitous + intentional finding",
          intensity: 0.8,
          peakLabel: "aha",
          behavior: "Follows color gradients and clusters. Closer approach reveals tone in original voice. Points to zoom full text + reactions; grabs a post for personal inspection, then releases it.",
          feelings: "Strong aha moments \u2014 hearing actual voice makes posts feel real and human.",
          achievements: "Finds content with emotional and contextual nuance text-only browsing misses.",
          mechanics: ["Voice approach", "Point-to-zoom", "Grab inspect"]
        },
        {
          id: "immerse",
          stage: "06",
          name: "Immerse",
          short: "Deep reading & sense-making",
          intensity: 0.96,
          peakLabel: "presence",
          behavior: "Stays in a cluster. Points posts forward one by one, or grabs a small personal reading circle. Full voice + text; emoji reactions; color and proximity show theme evolution.",
          feelings: "Deep focus + intimacy \u2014 \u201CIt feels like the person is here with me.\u201D",
          achievements: "Empathetic understanding combining text, voice tone, space, and social reactions.",
          mechanics: ["Reading circle", "Full voice", "Emoji reactions"]
        },
        {
          id: "interact",
          stage: "07",
          name: "Interact",
          short: "Active participation",
          intensity: 0.92,
          peakLabel: "agency",
          behavior: "Speaks to post (color-coded note appears by meaning). Replies by pointing/grabbing then speaking. Gestures emoji reactions. Grabs to re-position, group, or show others.",
          feelings: "Agency and belonging. Voice creation is expressive and low-friction; posts feel like mine.",
          achievements: "Contributes multimodal, spatially organized content; space feels like a living knowledge sculpture.",
          mechanics: ["Speak to post", "Voice reply", "React", "Hand rearrange"]
        },
        {
          id: "exit",
          stage: "08",
          name: "Exit & extend",
          short: "Closure + long-term relationship",
          intensity: 0.58,
          peakLabel: "linger",
          behavior: "Zooms out; releases grabbed posts. May bookmark a cluster with a voice note. After headset off, notifications on nearby replies. Returns to evolved space.",
          feelings: "Satisfied closure with lingering resonance. Ongoing connection as the space keeps growing.",
          achievements: "Intellectual insight + emotional memory; habit of return because contributions stay alive.",
          mechanics: ["Zoom out", "Bookmark + voice note", "Return path"]
        }
      ]
    },
    {
      id: "reddit",
      label: "Feed social (e.g. Reddit)",
      kicker: "04 \xB7 User waveline \xB7 Feed platforms",
      title: "One session in the feed",
      lede: "Eight stages of using a ranking-driven social platform (Reddit-like). Wave height is felt intensity \u2014 spikes early, then flattens into scroll fatigue.",
      stroke: "#ff4500",
      fill: "#ff4500",
      defaultStage: "explore",
      stages: [
        {
          id: "entice",
          stage: "01",
          name: "Entice",
          short: "Notification or habit pull",
          intensity: 0.7,
          peakLabel: "pull",
          behavior: "Opens the app from a notification, a shared link, or muscle memory. Home/feed is already ranking posts for engagement.",
          feelings: "Immediate curiosity and mild FOMO \u2014 \u201Cwhat did I miss?\u201D",
          achievements: "Enters with a low-friction promise of novelty, not a clear reading goal.",
          mechanics: ["Push notification", "Home feed", "Hot / Best ranking"]
        },
        {
          id: "enter",
          stage: "02",
          name: "Enter",
          short: "Land on the feed",
          intensity: 0.62,
          peakLabel: "open",
          behavior: "Sees a vertical stack of posts, thumbnails, vote counts, and comment tallies. May switch subreddit or sort mode.",
          feelings: "Slight stimulation; the UI is familiar and dense.",
          achievements: "Locates a starting stream quickly, but orientation is algorithmic rather than spatial.",
          mechanics: ["Infinite feed", "Subreddit switch", "Sort controls"]
        },
        {
          id: "orient",
          stage: "03",
          name: "Orient",
          short: "Learn the local norms",
          intensity: 0.48,
          peakLabel: "skim",
          behavior: "Skims titles and flair, checks vote ratios, opens a few threads to see how people argue. Figures out what \u201Cbelongs\u201D here.",
          feelings: "Mild competence mixed with noise \u2014 lots of signals, little structure beyond rank.",
          achievements: "Can predict what will rise, not necessarily what will reward deep attention.",
          mechanics: ["Votes", "Flair", "Thread nesting"]
        },
        {
          id: "explore",
          stage: "04",
          name: "Explore",
          short: "Scroll & sample",
          intensity: 0.78,
          peakLabel: "scroll high",
          behavior: "Scrolls continuously. Opens posts, peeks at comments, jumps back to feed. Cross-posts and related threads pull sideways.",
          feelings: "High stimulation, low depth \u2014 dopamine of novelty without a map of the whole conversation.",
          achievements: "Consumes volume; loses track of where ideas sit relative to each other.",
          mechanics: ["Infinite scroll", "Comment preview", "Related / next"]
        },
        {
          id: "discover",
          stage: "05",
          name: "Discover",
          short: "Rabbit hole or search",
          intensity: 0.66,
          peakLabel: "rabbit hole",
          behavior: "Follows a heated thread, a meme chain, or a search into an adjacent subreddit. May open multiple tabs.",
          feelings: "Brief aha, then fragmentation \u2014 discovery feels accidental and hard to relocate later.",
          achievements: "Finds interesting bits; place memory is weak (history/search, not a place).",
          mechanics: ["Search", "Cross-post", "Multi-tab threads"]
        },
        {
          id: "immerse",
          stage: "06",
          name: "Immerse",
          short: "Deep thread or long scroll",
          intensity: 0.34,
          peakLabel: "fatigue",
          behavior: "Tries to read a long comment tree or stay on one topic; notifications and the next post keep interrupting. Time blurs.",
          feelings: "Fatigue, mild guilt, glassy focus \u2014 immersed in the feed, not in understanding.",
          achievements: "High dwell time with low sense-making; hard to summarize what was learned.",
          mechanics: ["Nested comments", "Auto-refresh", "Ads / promotions"]
        },
        {
          id: "interact",
          stage: "07",
          name: "Interact",
          short: "Vote, comment, post",
          intensity: 0.44,
          peakLabel: "status anxiety",
          behavior: "Upvotes, writes a comment, maybe posts. Watches score. May delete or rewrite under social pressure.",
          feelings: "Performance anxiety and intermittent reward \u2014 validation is public and ranked.",
          achievements: "Contributes text into a ranking machine; voice, body, and place are absent.",
          mechanics: ["Upvote / downvote", "Comment box", "Karma / score"]
        },
        {
          id: "exit",
          stage: "08",
          name: "Exit",
          short: "Close app, residual pull",
          intensity: 0.28,
          peakLabel: "residue",
          behavior: "Locks phone or switches apps. Often reopens \u201Cjust to check.\u201D Rarely leaves with a saved place in the discussion.",
          feelings: "Empty closure, residual itch to scroll again.",
          achievements: "Session ends without a durable spatial memory; return habit is compulsive more than purposeful.",
          mechanics: ["App switch", "History", "Notifications re-pull"]
        }
      ]
    },
    {
      id: "vr-browse",
      label: "VR browsing (non-game)",
      kicker: "04 \xB7 User waveline \xB7 VR without a game loop",
      title: "One session trying to browse in VR",
      lede: "Eight stages for someone who wants headset time that isn\u2019t a game \u2014 and finds browsing hard to enjoy. Wave height is felt intensity (comfort + fulfillment).",
      stroke: "#5b6cff",
      fill: "#5b6cff",
      defaultStage: "orient",
      stages: [
        {
          id: "entice",
          stage: "01",
          name: "Entice",
          short: "Want non-game VR time",
          intensity: 0.64,
          peakLabel: "hope",
          behavior: "Puts on a Quest / Vision Pro hoping to browse, read forums, or catch up on the web \u2014 not to launch a shooter or fitness game.",
          feelings: "Hopeful curiosity \u2014 \u201Cthis could be my calm digital place.\u201D",
          achievements: "Arrives with intent to use VR as a reading / social surface, not as a game console.",
          mechanics: ["Headset on", "Home environment", "Browser / panel apps"]
        },
        {
          id: "enter",
          stage: "02",
          name: "Enter",
          short: "Boot into panels",
          intensity: 0.42,
          peakLabel: "setup drag",
          behavior: "Adjusts IPD, guardians, brightness. Opens a browser or social app as floating panels. Controllers or hand tracking must be re-learned each session.",
          feelings: "Friction and self-consciousness \u2014 entry cost is high before any content arrives.",
          achievements: "Gets a window open, but the body is already managing hardware before the mind can browse.",
          mechanics: ["Boundary setup", "Floating windows", "Controller / hand tracking"]
        },
        {
          id: "orient",
          stage: "03",
          name: "Orient",
          short: "Fight the interface",
          intensity: 0.3,
          peakLabel: "clumsy",
          behavior: "Tries to scroll, select, resize panels, and type. Laser pointer overshoots; virtual keyboard is slow; text is small or shimmering.",
          feelings: "Frustration and cognitive load \u2014 orientation is about surviving UI, not learning a community.",
          achievements: "Can perform basic navigation, but confidence stays low.",
          mechanics: ["Laser cursor", "Virtual keyboard", "Panel resize / reparent"]
        },
        {
          id: "explore",
          stage: "04",
          name: "Explore",
          short: "Browse while managing body",
          intensity: 0.36,
          peakLabel: "unease",
          behavior: "Scrolls feeds or tabs while standing/sitting carefully. Turns head to multi-panel layouts; may feel mild nausea or eye strain. Avoids large motion.",
          feelings: "Uneasy multitasking \u2014 half attention on content, half on comfort and balance.",
          achievements: "Samples content, but exploration is shallow because comfort budgets everything.",
          mechanics: ["Head-locked / world-locked panels", "Scroll gesture", "Comfort vignette"]
        },
        {
          id: "discover",
          stage: "05",
          name: "Discover",
          short: "Find something worth reading",
          intensity: 0.5,
          peakLabel: "brief win",
          behavior: "Finally lands on a long article or discussion that seems worth it. Tries to pin the window and settle in.",
          feelings: "Short relief and interest \u2014 then the medium starts fighting the content again.",
          achievements: "Discovers something promising; cannot yet trust the session will support deep attention.",
          mechanics: ["Search", "Pin window", "Passthrough toggle"]
        },
        {
          id: "immerse",
          stage: "06",
          name: "Immerse",
          short: "Attempt deep reading",
          intensity: 0.22,
          peakLabel: "strain",
          behavior: "Tries to read carefully. Text blurs, resolution limits, neck fatigue, or motion discomfort force breaks. May sit down or remove headset briefly.",
          feelings: "Strain and disappointment \u2014 wants immersion in ideas, gets immersion in hardware limits.",
          achievements: "Deep sense-making fails more often than it succeeds; session quality collapses mid-read.",
          mechanics: ["Fixed distance text", "Reprojection artifacts", "Break reminders"]
        },
        {
          id: "interact",
          stage: "07",
          name: "Interact",
          short: "Comment / share (if at all)",
          intensity: 0.26,
          peakLabel: "abandon",
          behavior: "Considers posting or replying; typing is painful. Often switches to phone for the actual reply, or skips interaction entirely.",
          feelings: "Defeat about participation \u2014 presence without easy expression.",
          achievements: "Lurking dominates; contribution migrates off-headset or doesn\u2019t happen.",
          mechanics: ["Dictation (error-prone)", "Controller typing", "Phone companion"]
        },
        {
          id: "exit",
          stage: "08",
          name: "Exit",
          short: "Headset off with relief",
          intensity: 0.4,
          peakLabel: "relief",
          behavior: "Removes headset. Eyes adjust. May finish the same content on a phone/laptop. Hesitates to put the headset back on for \u201Cjust browsing.\u201D",
          feelings: "Physical relief stronger than intellectual closure. Residual belief that VR \u201Cshould\u201D be better for this.",
          achievements: "Learns that non-game browsing in VR is possible but rarely enjoyable; weak habit of return for reading.",
          mechanics: ["Power off / sleep", "Continue on flat screen", "Comfort recovery"]
        }
      ]
    }
  ];
  var makingPrinciples = [
    {
      number: "01",
      title: "Smooth browsing above all",
      body: "Fluid and responsive at every moment. Stickiness, lag, or jank are bugs. Drag speed, animation duration, and update rate exist to serve feel \u2014 not benchmarks."
    },
    {
      number: "02",
      title: "No features without discussion",
      body: "Production product, not a demo dump. Every user-facing change is intentional and discussed before it ships."
    },
    {
      number: "03",
      title: "Shading, not transparency",
      body: "Hierarchy uses brightness and darkness. Cards dim via CSS brightness() \u2014 they never go transparent ghosts."
    },
    {
      number: "04",
      title: "The user is inside (/web)",
      body: "On the desktop planetarium the camera stays at the origin. You rotate to look; you do not fly. That constraint makes the dome metaphor work."
    },
    {
      number: "05",
      title: "Spatial meaning",
      body: "Position is not decoration. On the sphere it encodes opinion, abstraction, and time. The layout is the content."
    }
  ];
  var makingSurfaces = [
    {
      id: "web",
      route: "/web",
      name: "Desktop planetarium",
      status: "Shipped \xB7 production",
      stack: "React + R3F + optional WebXR seat mode",
      metaphor: "Seated look-from-center: drag, browse, gaze. Camera fixed at origin.",
      timeModel: "Rank-based age via fog brightness \u2014 cards do not jump shells when you scroll time.",
      input: "Drag rotation, click focus, browse mode sidebar, MediaPipe head-pose (opt-in), optional headset look."
    },
    {
      id: "vr",
      route: "/VR",
      name: "Walkable sphere wall",
      status: "PRD locked \xB7 implementation not started",
      stack: "Strict Meta IWSDK (@iwsdk/core) \u2014 dual stack, not R3F XR",
      metaphor: "You may leave center. Walk, turn, approach regions with stock IWSDK locomotion.",
      timeModel: "Radius encodes time: newer on inner shells, older farther out and slightly dimmer.",
      input: "Headset + controllers via IWSDK defaults; proximity cluster voice; voice plant to wall (DB real, external publish mocked)."
    }
  ];
  var makingModules = [
    {
      code: "01",
      title: "Spatial model",
      status: "Shipped (/web)",
      intent: "Stand inside a planetarium of ideas. Distance = difference; direction = kind of difference.",
      facts: [
        "Camera fixed at (0,0,0) on /web \u2014 rotation only",
        "Sphere radius 150; poles clamped 30\xB0\u2013150\xB0",
        "\u03B8 = opinion \xB7 \u03C6 = abstraction \xB7 r = time shell",
        "Cluster centers \u226560\xB0 apart; repulsion pass for separation"
      ]
    },
    {
      code: "02",
      title: "Navigation",
      status: "Shipped (/web)",
      intent: "Feel like looking around a room, not operating a machine. Smooth browsing is the product.",
      facts: [
        "Screen-space quaternion drag (no gimbal lock)",
        "Focus ease-out to center a card; drag threshold 3px",
        "Modes: Normal \xB7 Browse \xB7 Gaze \xB7 seated VR",
        "Drag passthrough over DOM cards so the sky always pans"
      ]
    },
    {
      code: "03",
      title: "Temporal depth",
      status: "Shipped (/web)",
      intent: "Older talk recedes like farther stars \u2014 continuous rank order, not discrete layer jumps.",
      facts: [
        "ageNorm = rank / n (even slots; no same-day flicker)",
        "Fog = brightness by circular distance to time focus",
        "Two-finger scroll rotates time order; wraps endlessly",
        "Selected cards stay full brightness"
      ]
    },
    {
      code: "04",
      title: "Visual design",
      status: "Shipped",
      intent: "Warm dark planetarium at dusk \u2014 human, not cold tech demo.",
      facts: [
        "Rainbow skybox by \u03B8; poles orient (warm north / navy south)",
        "Theme: walnut dark, gold accent, cream type",
        "Cards: paper panels + 4px emotion accent strip",
        "Compact 300\xD7200 \xB7 expanded ~550\xD7600 scrollable"
      ]
    },
    {
      code: "05",
      title: "Head-pose browse",
      status: "Shipped (/web \xB7 opt-in)",
      intent: "Hands-free look: attention opens a region \u2014 not a face joystick.",
      facts: [
        "MediaPipe FaceLandmarker, GPU, client-side only",
        "Position-based steering (offset from base), not velocity",
        "Auto-calibrate rest pose; slow rolling recalibration",
        "No video leaves the device \u2014 privacy-critical path"
      ]
    },
    {
      code: "06",
      title: "Content pipeline",
      status: "Shipped",
      intent: "Topic \u2192 enriched discourse \u2192 spatial layout, streamed so the wall appears before the pipeline finishes.",
      facts: [
        "Tier load: cached layout \u2192 merge user posts \u2192 SSE generate",
        "Generator \u2192 Cartographer \u2192 Architect agents",
        "~150+ posts, 3\u20137 clusters, bridges + gaps",
        "Partial layouts stream batch-by-batch"
      ]
    },
    {
      code: "07",
      title: "Community",
      status: "Deferred \xB7 Phase 3\u20134",
      intent: "Reading-first. Native posts, replies, votes after the wall proves comprehension value.",
      facts: [
        "PRD kept: compose, classify placement, vote, merge",
        "Not the active plan until reading validation lands",
        "Aligns with research: lurkers are success, not failure",
        "VR voice plant is separate MVP path (see 12)"
      ]
    },
    {
      code: "08",
      title: "Performance",
      status: "Shipped discipline",
      intent: "If it feels sticky, it is wrong \u2014 profiler scores do not override feel.",
      facts: [
        "Visibility cone: full 0\u201335\xB0 \xB7 fade 35\u201355\xB0 \xB7 cull beyond",
        "React.memo + opacity quantization + CSS containment",
        "Camera 60fps; React cull state ~40fps via startTransition",
        "DPR cap [1, 1.5]; quality can drop under load"
      ]
    },
    {
      code: "09",
      title: "Admin",
      status: "Shipped",
      intent: "Operate topics, regenerate walls, clear cache, watch health.",
      facts: [
        "PIN-gated /admin \xB7 dark warm theme",
        "Layouts, Cache, Generate (SSE), Health, Stats",
        "Regenerate deletes + full pipeline re-run",
        "Supports research iterations on real layouts"
      ]
    },
    {
      code: "10",
      title: "Stack & deploy",
      status: "Production",
      intent: "Ship dual client + API with known hosts and data types.",
      facts: [
        "React 19 \xB7 Vite 7 \xB7 R3F 9 \xB7 Three \xB7 XR 6 \xB7 Tailwind 4",
        "Express 5 \xB7 Anthropic SDK \xB7 Mongo/Firestore path",
        "Frontend: cosmosweb.web.app \xB7 API: Cloud Run",
        "CosmosLayout / CosmosPost / Cluster / Gap types"
      ]
    },
    {
      code: "11",
      title: "Legal & analytics",
      status: "Shipped",
      intent: "California-ready privacy for webcam gaze + AI content disclaimers.",
      facts: [
        "/terms \xB7 /privacy (CCPA-oriented)",
        "Camera: on-device only; no frames to server",
        "AI content labeled exploratory",
        "Firebase Analytics for product usage"
      ]
    },
    {
      code: "12",
      title: "IWSDK /VR",
      status: "PRD v2 \xB7 not built",
      intent: "Walkable multi-source wall on strict Meta Immersive Web SDK \u2014 second stack beside /web.",
      facts: [
        "World.create owns runtime; no R3F XR on /VR",
        "Stock locomotion; proximity cluster summaries (voice)",
        "Source badges (Threads, X, Reddit\u2026); ingest can be stubbed",
        "Wall post to DB real; publish to networks mocked at MVP"
      ]
    }
  ];
  var makingPipeline = [
    { stage: "01", name: "Generator", body: "AI creates ~150+ posts across 7\u201310 subtopics with cross-references." },
    { stage: "02", name: "Cartographer", body: "Enrich stance, emotion, themes, claims, relationships; stream partial batches." },
    { stage: "03", name: "Architect", body: "3\u20137 clusters, spherical positions, bridges, and gaps where perspectives are missing." },
    { stage: "04", name: "Client load", body: "Cache first, merge user posts, else SSE process \u2014 wall paints as soon as first batch lands." }
  ];
  var phases = [
    {
      phase: "01",
      name: "Ship the controlled wall",
      status: "Done \xB7 /web",
      body: "Production planetarium: spatial layout, smooth browse, time fog, pipeline, admin, privacy. The research object exists and can be studied.",
      outputs: ["cosmosweb.web.app /web", "PRD modules 01\u201306, 08\u201311", "Gaze opt-in + on-device camera policy"]
    },
    {
      phase: "02",
      name: "Validate reading value",
      status: "Now",
      body: "Comparative studies: wall vs flat feed on comprehension, comfort, place memory, and intentional exit \u2014 before adding contribution pressure.",
      outputs: ["Quest + desktop protocols", "Flat-feed control", "Sense-making metrics from impact analysis"]
    },
    {
      phase: "03",
      name: "Continuity & paths",
      status: "Then",
      body: "Give people a reason to return without becoming a feed: save regions, revisit, lightweight personal paths. Aligns with one-way product\u2192people gaps on the stakeholder analysis.",
      outputs: ["Save + revisit", "Remembered viewpoints", "Cross-device handoff notes"]
    },
    {
      phase: "04",
      name: "Walkable /VR (IWSDK)",
      status: "PRD locked",
      body: "Strict IWSDK dual surface: layered time shells, stock locomotion, proximity voice briefings, multi-source story. Implementation not started.",
      outputs: ["/VR World.create", "Radius = age shells", "Proximity audio \xB7 voice plant to DB"]
    },
    {
      phase: "05",
      name: "Light contribution",
      status: "Deferred",
      body: "Native posts, replies, votes (PRD 07) only after reading works. Optional co-presence and spatial voice remain conditional on evidence.",
      outputs: ["Classify + place note", "Votes / replies", "Steward tools if community load appears"]
    }
  ];
  var speakerStrategies = [
    { number: "01", name: "N-loudest", verdict: "Breaks presence", body: "Forwarding only the loudest speakers causes quiet voices to cut out unnaturally. A technique that works for meetings becomes perceptually wrong in a spatial room." },
    { number: "02", name: "N-closest", verdict: "Creates asymmetry", body: "Proximity feels intuitive until two users have different subscription sets: one person can hear the other while the conversation remains one-way." },
    { number: "03", name: "Fixed range", verdict: "Predictable, abrupt", body: "A hard hearing boundary controls load, but voices appear and disappear at the edge. Dense rooms can sound empty even when people are visibly present." },
    { number: "04", name: "Large attenuated range", verdict: "Natural, expensive", body: "A wide range lets voices decay toward silence and best matches physical hearing. It also increases the number of streams or mixes the system must deliver." }
  ];
  var deliveryArchitectures = [
    { label: "Peer-to-peer", load: "Client", risk: "IP exposure + upstream bandwidth", note: "Every participant sends audio directly to every listener. Simple in theory; insecure and inefficient at room scale." },
    { label: "Forwarding proxy", load: "Network", risk: "Stream fan-out", note: "A server hides client addresses and routes individual streams, but each listener may still receive dozens of concurrent voices." },
    { label: "Server-side mixing", load: "Server", risk: "Per-listener compute", note: "The server creates a custom spatial scene for each listener. Complex, but the strongest fit for dense constrained environments." }
  ];
  function Progress() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
      const update = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      };
      update();
      window.addEventListener("scroll", update, { passive: true });
      return () => window.removeEventListener("scroll", update);
    }, []);
    return /* @__PURE__ */ React.createElement("div", { className: "reading-progress", style: { transform: `scaleX(${progress})` } });
  }
  function ChapterLabel({ number, children }) {
    return /* @__PURE__ */ React.createElement("div", { className: "chapter-label" }, /* @__PURE__ */ React.createElement("span", null, number), /* @__PURE__ */ React.createElement("p", null, children));
  }
  function buildWavePath(stages, padL, padT, chartW, chartH) {
    const n = stages.length;
    const points = stages.map((stage, index2) => {
      const x3 = padL + index2 / (n - 1) * chartW;
      const y3 = padT + chartH * (1 - stage.intensity);
      return { ...stage, x: x3, y: y3 };
    });
    const lineD = points.map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = points[i - 1];
      const cpx = (prev.x + p.x) / 2;
      return `C ${cpx} ${prev.y}, ${cpx} ${p.y}, ${p.x} ${p.y}`;
    }).join(" ");
    return { points, lineD };
  }
  function WavelineCompareChart({ waves }) {
    const width = 1680;
    const height = 520;
    const padL = 118;
    const padR = 80;
    const padT = 40;
    const padB = 72;
    const chartW = width - padL - padR;
    const chartH = height - padT - padB;
    const baselineY = padT + chartH;
    const stageSpine = waves[0]?.stages || [];
    const n = stageSpine.length;
    const stageXs = stageSpine.map((_, index2) => padL + index2 / Math.max(n - 1, 1) * chartW);
    const yTicks = [
      { t: 1, label: "High" },
      { t: 0.5, label: "Mid" },
      { t: 0, label: "Low" }
    ];
    const series = waves.map((wave) => {
      const { points, lineD } = buildWavePath(wave.stages, padL, padT, chartW, chartH);
      return { wave, points, lineD };
    });
    return /* @__PURE__ */ React.createElement(
      "svg",
      {
        className: "waveline-chart waveline-chart--compare",
        viewBox: `0 0 ${width} ${height}`,
        preserveAspectRatio: "xMidYMid meet",
        role: "img",
        "aria-label": "Compared experience wavelines. Vertical axis: wave height is felt intensity. Horizontal axis: session stages."
      },
      yTicks.map(({ t, label }) => {
        const y3 = padT + chartH * (1 - t);
        return /* @__PURE__ */ React.createElement("g", { key: label, className: "waveline-y-tick" }, /* @__PURE__ */ React.createElement(
          "line",
          {
            x1: padL,
            y1: y3,
            x2: width - padR,
            y2: y3,
            stroke: "rgba(17,28,78,0.1)",
            strokeDasharray: t === 0 ? "0" : "3 5",
            strokeWidth: t === 0 ? 1.35 : 1
          }
        ), /* @__PURE__ */ React.createElement("text", { x: padL - 12, y: y3 + 4, textAnchor: "end", className: "waveline-y-tick-label" }, label));
      }),
      /* @__PURE__ */ React.createElement("line", { x1: padL, y1: padT, x2: padL, y2: baselineY, stroke: "rgba(17,28,78,0.28)", strokeWidth: "1.5" }),
      /* @__PURE__ */ React.createElement(
        "text",
        {
          className: "waveline-y-axis-title",
          transform: `translate(28, ${(padT + baselineY) / 2}) rotate(-90)`,
          textAnchor: "middle"
        },
        "Wave height = felt intensity"
      ),
      /* @__PURE__ */ React.createElement(
        "text",
        {
          className: "waveline-y-axis-sub",
          transform: `translate(48, ${(padT + baselineY) / 2}) rotate(-90)`,
          textAnchor: "middle"
        },
        "(engagement / fulfillment, not time-on-app)"
      ),
      stageSpine.map((stage, index2) => {
        const x3 = stageXs[index2];
        return /* @__PURE__ */ React.createElement("g", { key: stage.id, className: "waveline-stage-guide" }, /* @__PURE__ */ React.createElement(
          "line",
          {
            x1: x3,
            y1: padT,
            x2: x3,
            y2: baselineY,
            stroke: "rgba(17,28,78,0.1)",
            strokeWidth: 1,
            strokeDasharray: "2 5"
          }
        ), /* @__PURE__ */ React.createElement("text", { x: x3, y: baselineY + 22, textAnchor: "middle", className: "stage-num" }, stage.stage), /* @__PURE__ */ React.createElement("text", { x: x3, y: baselineY + 46, textAnchor: "middle", className: "stage-name" }, stage.name));
      }),
      /* @__PURE__ */ React.createElement("text", { x: (padL + width - padR) / 2, y: height - 6, textAnchor: "middle", className: "waveline-x-axis-title" }, "Session stages \u2192"),
      series.map(({ wave, points, lineD }) => /* @__PURE__ */ React.createElement("g", { key: wave.id, className: "waveline-series", opacity: 0.95 }, /* @__PURE__ */ React.createElement(
        "path",
        {
          d: lineD,
          fill: "none",
          stroke: wave.stroke,
          strokeWidth: 3.25,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ), points.map((p) => /* @__PURE__ */ React.createElement(
        "circle",
        {
          key: `${wave.id}-${p.id}`,
          cx: p.x,
          cy: p.y,
          r: 6,
          fill: wave.stroke,
          stroke: "#f7f4ed",
          strokeWidth: 1.75
        }
      ))))
    );
  }
  function UserWavelinePage() {
    const stageSpine = experienceWaves[0]?.stages || [];
    const noteRows = [
      { key: "peakLabel", label: "Peak" },
      { key: "behavior", label: "Behavior" },
      { key: "feelings", label: "Feelings" },
      { key: "achievements", label: "Achievements" },
      { key: "mechanics", label: "Mechanics" }
    ];
    return /* @__PURE__ */ React.createElement("section", { className: "report-section waveline-page waveline-page--document", id: "user-waveline" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "04" }, "User waveline"), /* @__PURE__ */ React.createElement("header", { className: "waveline-doc-intro" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "waveline-kicker" }, "Three sessions \xB7 one stage spine"), /* @__PURE__ */ React.createElement("h1", null, "User experience wavelines")), /* @__PURE__ */ React.createElement("p", { className: "waveline-lede" }, "Same eight stages across Cosmos VR, feed platforms, and VR without a game loop. Columns follow the chart left \u2192 right. Wave height already shows felt intensity \u2014 tables hold the words.")), /* @__PURE__ */ React.createElement("div", { className: "waveline-viz", "aria-label": "Waveline visualization and stage tables" }, /* @__PURE__ */ React.createElement("div", { className: "waveline-doc-legend", "aria-label": "Wave legend" }, experienceWaves.map((w) => /* @__PURE__ */ React.createElement("span", { key: w.id, className: "waveline-legend-item waveline-legend-item--static" }, /* @__PURE__ */ React.createElement("i", { style: { background: w.stroke } }), /* @__PURE__ */ React.createElement("span", null, w.label)))), /* @__PURE__ */ React.createElement("figure", { className: "waveline-doc-chart" }, /* @__PURE__ */ React.createElement(WavelineCompareChart, { waves: experienceWaves }), /* @__PURE__ */ React.createElement("figcaption", null, "Session stages run left \u2192 right. Tables use the same order as column headers.")), /* @__PURE__ */ React.createElement("div", { className: "waveline-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "waveline-table waveline-table--peaks" }, /* @__PURE__ */ React.createElement("caption", null, "Peak feel at each stage \u2014 columns match the chart"), /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { scope: "col" }, "Experience"), stageSpine.map((s) => /* @__PURE__ */ React.createElement("th", { key: s.id, scope: "col" }, /* @__PURE__ */ React.createElement("span", { className: "waveline-table__stage-name" }, s.name), /* @__PURE__ */ React.createElement("span", { className: "waveline-table__sub" }, s.short))))), /* @__PURE__ */ React.createElement("tbody", null, experienceWaves.map((w) => /* @__PURE__ */ React.createElement("tr", { key: w.id }, /* @__PURE__ */ React.createElement("th", { scope: "row", style: { color: w.stroke } }, w.label), w.stages.map((st) => /* @__PURE__ */ React.createElement("td", { key: `${w.id}-${st.id}` }, st.peakLabel))))))), experienceWaves.map((wave) => /* @__PURE__ */ React.createElement("div", { key: wave.id, className: "waveline-table-block", id: `wave-${wave.id}` }, /* @__PURE__ */ React.createElement("h2", { className: "waveline-table-block__title", style: { color: wave.stroke } }, /* @__PURE__ */ React.createElement("i", { style: { background: wave.stroke } }), wave.label), /* @__PURE__ */ React.createElement("p", { className: "waveline-table-block__lede" }, wave.lede), /* @__PURE__ */ React.createElement("div", { className: "waveline-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "waveline-table waveline-table--detail" }, /* @__PURE__ */ React.createElement("caption", null, wave.label, " \u2014 stages left \u2192 right (Entice \u2192 Exit)"), /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { scope: "col" }, "Note"), wave.stages.map((s) => /* @__PURE__ */ React.createElement("th", { key: s.id, scope: "col" }, /* @__PURE__ */ React.createElement("span", { className: "waveline-table__stage-name" }, s.name), /* @__PURE__ */ React.createElement("span", { className: "waveline-table__sub" }, s.short))))), /* @__PURE__ */ React.createElement("tbody", null, noteRows.map((row) => /* @__PURE__ */ React.createElement("tr", { key: row.key }, /* @__PURE__ */ React.createElement("th", { scope: "row" }, row.label), wave.stages.map((st) => /* @__PURE__ */ React.createElement("td", { key: `${wave.id}-${st.id}-${row.key}` }, row.key === "mechanics" ? st.mechanics.join(" \xB7 ") : st[row.key])))))))))), /* @__PURE__ */ React.createElement("p", { className: "waveline-share-hint" }, "Print tip: close the left sidebar (\u2039), then Print / Save as PDF. Chart and tables print together \u2014 no interaction."), /* @__PURE__ */ React.createElement("div", { className: "report-next-links" }, /* @__PURE__ */ React.createElement("a", { href: "/cosmos/primary/version1-review/" }, "\u2190 Version 1 & review"), /* @__PURE__ */ React.createElement("a", { href: "/cosmos/storyboard/" }, "Next: Storyboard \u2192")));
  }
  var storyboardBeats = [
    { beat: "01", title: "Character", situation: "New mom, 2-week-old, short leave", outcome: "Time is split; identity feels awkward" },
    { beat: "02", title: "Constraints", situation: "Wrist pain, indoor days, chores + rest", outcome: "Phone hurts after ~5 min; exercise is gone" },
    { beat: "03", title: "VR hope", situation: "Baby asleep on chest / lying down", outcome: "Headset could free hands and posture" },
    { beat: "04", title: "Browser fail", situation: "Desk-optimized VR web", outcome: "Close reading hurts; hands hit the baby" },
    { beat: "05", title: "Discovery", situation: "App Store search for VR browsing", outcome: "Cosmos: posts on a wall, by similarity" },
    { beat: "06", title: "Gaze + pull", situation: "Eyes look; hand pulls the wall closer", outcome: "No controller required for basic browse" },
    { beat: "07", title: "Walk", situation: "She stands and moves through the room", outcome: "Wall stays world-anchored; passthrough keeps her safe" },
    { beat: "08", title: "Care", situation: "Baby wakes hungry", outcome: "Breastfeeding continues with headset on" }
  ];
  var storyboardImplications = [
    { constraint: "Wrist pain / short phone tolerance", requirement: "Minimize sustained grip; favor gaze and occasional hand gestures" },
    { constraint: "Baby on chest / sling", requirement: "Avoid frequent mid-air hand waving near the torso; controller optional for browse" },
    { constraint: "Lying down + standing", requirement: "Comfortable at recline; wall readable without leaning into a virtual monitor" },
    { constraint: "Indoors, moving around home", requirement: "World-anchored content + passthrough so the body stays safe in real space" },
    { constraint: "Fragmented attention", requirement: "Browsing must be scannable in pockets \u2014 similarity clusters beat endless scroll" },
    { constraint: "Identity: still wants the world", requirement: "High-signal wall of posts/news, not a social hangout that demands performance" }
  ];
  function StoryboardPage() {
    return /* @__PURE__ */ React.createElement("section", { className: "report-section storyboard-page", id: "storyboard" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "05" }, "Storyboard"), /* @__PURE__ */ React.createElement("div", { className: "section-heading" }, /* @__PURE__ */ React.createElement("h2", null, "Jeenie.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", null, "Browsing when the body is not desk-ready.")), /* @__PURE__ */ React.createElement("p", null, "Design storyboard \u2014 a composite persona, not a research sample. Use it to pressure-test Cosmos: gaze-first browse, optional hand pull, world-anchored wall, and passthrough safety under real care load.")), /* @__PURE__ */ React.createElement("figure", { className: "storyboard-title-figure" }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: "/assets/images/cosmos/storyboard-panels.jpg",
        alt: "Hand-drawn twelve-panel Cosmos VR storyboard: Jeenie from postpartum constraints through VR headset, Cosmos wall, speech post, and return to reality"
      }
    ), /* @__PURE__ */ React.createElement("figcaption", null, "Cosmos VR Storyboard \xB7 Rae Jin \xB7 July 29, 2026 \u2014 original panel sequence.")), /* @__PURE__ */ React.createElement("figure", { className: "storyboard-user-figure" }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: "/assets/images/cosmos/storyboard-user.jpg",
        alt: "Person reclining with a newborn on their chest, wearing a VR headset and holding a controller"
      }
    ), /* @__PURE__ */ React.createElement("figcaption", null, "Reference moment for the storyboard body: reclined care, headset on, hands partly occupied \u2014 the body Cosmos must design for.")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "storyboard-spine" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "0"), /* @__PURE__ */ React.createElement("h2", null, "Spine"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, /* @__PURE__ */ React.createElement("strong", null, "Cosmos is for people who cannot sit at a desk and hold a phone.")), /* @__PURE__ */ React.createElement("p", null, "Jeenie is two weeks postpartum. Her days are feed \u2192 change \u2192 nap \u2192 chores \u2192 rest, with almost no clean blocks of attention. She still wants to stay current \u2014 the techie habit of scanning news and gossip fast \u2014 but her body and her baby will not cooperate with desk-browser VR or long phone sessions."), /* @__PURE__ */ React.createElement("p", { className: "storyboard-pull" }, "If Cosmos only works for seated, two-handed, full-attention browsing, it fails the people who need spatial async most.")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "storyboard-beats" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "1"), /* @__PURE__ */ React.createElement("h2", null, "Eight beats"), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table report-table-wide" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Beat"), /* @__PURE__ */ React.createElement("th", null, "Situation"), /* @__PURE__ */ React.createElement("th", null, "What fails / what works"))), /* @__PURE__ */ React.createElement("tbody", null, storyboardBeats.map((row) => /* @__PURE__ */ React.createElement("tr", { key: row.beat }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("strong", null, row.beat, " \xB7 ", row.title)), /* @__PURE__ */ React.createElement("td", null, row.situation), /* @__PURE__ */ React.createElement("td", null, row.outcome))))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "storyboard-character" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2"), /* @__PURE__ */ React.createElement("h2", null, "Meet Jeenie"), /* @__PURE__ */ React.createElement("div", { className: "storyboard-cards-3" }, /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "New mom, week two"), /* @__PURE__ */ React.createElement("p", null, "Just settling into newborn life: frequent breastfeeding, sleep in fragments, constant diaper changes.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "On short leave"), /* @__PURE__ */ React.createElement("p", null, "This window is temporary. She still thinks of herself as someone who returns to work and the world.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "Was a techie"), /* @__PURE__ */ React.createElement("p", null, "Used to work in tech and stay ahead of news and gossip \u2014 fast, always-on, feed-fluent."))), /* @__PURE__ */ React.createElement("p", { className: "storyboard-pull" }, "The product question is not \u201Cmake her a gamer.\u201D It is: can she stay herself while caregiving?")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "storyboard-time" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "3"), /* @__PURE__ */ React.createElement("h2", null, "No clean \u201Cme time\u201D"), /* @__PURE__ */ React.createElement("p", null, "When the baby sleeps, she does not get a free hour. She gets a fragile pocket. In that pocket she tries to stack chores, rest, and a little of her old self \u2014 catch up on the world before the next wake."), /* @__PURE__ */ React.createElement("p", null, "She feels awkward about how to split the time: productive parent, recovering body, or the person who used to know what was happening online."), /* @__PURE__ */ React.createElement("p", { className: "storyboard-pull" }, "Browsing has to fit inside interrupted pockets, not replace them with a session.")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "storyboard-body" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "4"), /* @__PURE__ */ React.createElement("h2", null, "Her body rejects the usual inputs"), /* @__PURE__ */ React.createElement("div", { className: "storyboard-cards-3" }, /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "Wrist pain"), /* @__PURE__ */ React.createElement("p", null, "Postpartum strain makes gripping a phone painful after about five minutes.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "Mostly indoors"), /* @__PURE__ */ React.createElement("p", null, "Recovery and newborn care keep her home. Movement and exercise are harder than before.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "Hands are busy"), /* @__PURE__ */ React.createElement("p", null, "Baby in a chest sling, chores, or lying down to rest \u2014 two free hands are rare."))), /* @__PURE__ */ React.createElement("p", { className: "storyboard-pull" }, "Phone-in-hand and desk-controller VR both assume a body she does not have right now.")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "storyboard-vr-fail" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "5"), /* @__PURE__ */ React.createElement("h2", null, "VR looks like a way out \u2014 then the browser fails her"), /* @__PURE__ */ React.createElement("div", { className: "storyboard-cards-2" }, /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "Why she tries a headset"), /* @__PURE__ */ React.createElement("p", null, "She can lie down with the baby. Looking around should be easier than holding a glowing rectangle at arm\u2019s length.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "Why the usual browser fails"), /* @__PURE__ */ React.createElement("p", null, "Web VR is still desk-shaped: lean in, read close, use hands. Looking at sites up close feels bad. Moving a hand sometimes hits the baby on her chest."))), /* @__PURE__ */ React.createElement("p", { className: "storyboard-pull" }, "The headset is not the problem. The interaction model is still a monitor with extra steps.")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "storyboard-cosmos" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "6"), /* @__PURE__ */ React.createElement("h2", null, "She finds Cosmos"), /* @__PURE__ */ React.createElement("p", null, "She searches for the best VR browsing app and finds ", /* @__PURE__ */ React.createElement("strong", null, "Cosmos"), " in the App Store. Instead of a floating desktop browser, content lives on a ", /* @__PURE__ */ React.createElement("strong", null, "wall"), " \u2014 posts arranged by similarity, built for headset distance rather than desk-monitor reading."), /* @__PURE__ */ React.createElement("p", { className: "storyboard-pull" }, "The first product promise she understands is not \u201Csocial VR.\u201D It is \u201CI can scan the world without a feed and without a desk.\u201D"), /* @__PURE__ */ React.createElement("h3", { className: "storyboard-subhead" }, "Gaze + optional pull"), /* @__PURE__ */ React.createElement("div", { className: "storyboard-cards-2" }, /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "Eyes look around"), /* @__PURE__ */ React.createElement("p", null, "Looking is enough to browse. She does not need to aim a controller for every shift of attention.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "Hand pulls when needed"), /* @__PURE__ */ React.createElement("p", null, "When she wants detail, a simple hand pull brings the wall closer \u2014 then she looks across posts without a tool in her grip."))), /* @__PURE__ */ React.createElement("p", { className: "storyboard-pull" }, "Controller-free browse is not a nicety \u2014 it is what keeps the baby from getting bumped."), /* @__PURE__ */ React.createElement("h3", { className: "storyboard-subhead" }, "Walk; the wall stays put"), /* @__PURE__ */ React.createElement("p", null, "She gets up and walks. The wall does not follow her face like a HUD. It stays put. She walks along it the way people walk a bulletin board \u2014 scan, step closer, step back, change angle. Because the background is transparent (passthrough), she can still see the house and avoid furniture, pets, and clutter."), /* @__PURE__ */ React.createElement("p", { className: "storyboard-pull" }, "Place memory only works if the wall is a place \u2014 not a sticker glued to the camera."), /* @__PURE__ */ React.createElement("h3", { className: "storyboard-subhead" }, "Care does not end the session"), /* @__PURE__ */ React.createElement("p", null, "The baby wakes hungry. Jeenie breastfeeds and keeps the headset on. She does not need a clean \u201CVR session\u201D that ends when parenting starts. The wall can wait in the room while her hands and chest are occupied; gaze and light head movement are still available."), /* @__PURE__ */ React.createElement("p", { className: "storyboard-pull" }, "Success is not longer sessions. Success is sessions that survive real interruptions.")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "storyboard-implications" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "7"), /* @__PURE__ */ React.createElement("h2", null, "What Jeenie demands from the product"), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table report-table-wide" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Constraint"), /* @__PURE__ */ React.createElement("th", null, "Product requirement"))), /* @__PURE__ */ React.createElement("tbody", null, storyboardImplications.map((row) => /* @__PURE__ */ React.createElement("tr", { key: row.constraint }, /* @__PURE__ */ React.createElement("td", null, row.constraint), /* @__PURE__ */ React.createElement("td", null, row.requirement))))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "storyboard-contrast" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "8"), /* @__PURE__ */ React.createElement("h2", null, "Desk browser vs Cosmos wall"), /* @__PURE__ */ React.createElement("div", { className: "storyboard-cards-2" }, /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "Desk-shaped VR browser"), /* @__PURE__ */ React.createElement("p", null, "Assumes seated posture, close reading, and free hands. Collides with baby, wrist pain, and recline. Content has no place memory in the room.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "Cosmos wall"), /* @__PURE__ */ React.createElement("p", null, "Assumes walk-or-recline browse, gaze-first attention, optional pull, and a fixed wall with passthrough. Content stays where she left it when life interrupts."))), /* @__PURE__ */ React.createElement("p", { className: "storyboard-pull" }, "Jeenie is not asking for more immersion. She is asking for less friction between information and care.")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "storyboard-honesty" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "9"), /* @__PURE__ */ React.createElement("h2", null, "What this does not prove"), /* @__PURE__ */ React.createElement("p", null, "This is a ", /* @__PURE__ */ React.createElement("strong", null, "scenario"), ", not evidence. It does not prove postpartum users will adopt headsets, or that gaze+pull is comfortable for twenty minutes, or that passthrough is safe enough around a newborn."), /* @__PURE__ */ React.createElement("p", null, "It names failure modes product tests must hit:"), /* @__PURE__ */ React.createElement("ol", { className: "storyboard-tests" }, /* @__PURE__ */ React.createElement("li", null, "Can someone browse usefully while reclining with occupied hands?"), /* @__PURE__ */ React.createElement("li", null, "Does a world-anchored wall beat a follow-head browser for place memory and safety?"), /* @__PURE__ */ React.createElement("li", null, "Can a session survive a care interruption without a full restart?")), /* @__PURE__ */ React.createElement("p", { className: "storyboard-pull" }, "Treat Jeenie as a stress test for interaction assumptions \u2014 then validate with real users who share her constraints.")), /* @__PURE__ */ React.createElement("blockquote", null, /* @__PURE__ */ React.createElement("span", null, "Closing claim"), /* @__PURE__ */ React.createElement("p", null, "If Cosmos works for Jeenie, it works for anyone whose body is not desk-ready."), /* @__PURE__ */ React.createElement("footer", null, "Build for gaze-first scan, optional hand pull, world-anchored placement, and passthrough safety \u2014 or admit the product is still a monitor for people with free afternoons. Rebuild the wall for the body people actually have.")), /* @__PURE__ */ React.createElement("div", { className: "report-next-links" }, /* @__PURE__ */ React.createElement("a", { href: "/cosmos/user-waveline/" }, "\u2190 User waveline"), /* @__PURE__ */ React.createElement("a", { href: "/cosmos/stakeholder-map/" }, "Next: Stakeholder analysis \u2192")));
  }
  var influenceTypes = [
    { id: "functional", label: "Functional", short: "Can / workflow", color: "#111c4e", desc: "Capability, access, workflow \u2014 whether the job can be done." },
    { id: "financial", label: "Financial", short: "Gives money", color: "#0a7a5c", desc: "Money transfer \u2014 funding, payment, ad spend, seat purchase. Arrow points from who pays to who receives." },
    { id: "emotional", label: "Emotional", short: "Feel / price feel", color: "#f14f9b", desc: "Felt pressure: comfort, anxiety, delight, and price/cost as experience (not a wire transfer)." },
    { id: "identity", label: "Identity", short: "Who we are", color: "#c43b7a", desc: "Status and belonging signals \u2014 \u201Cpeople like me use this.\u201D" },
    { id: "meaning", label: "Meaning", short: "Purpose / value", color: "#8a6d00", desc: "Purpose, learning, lasting contribution \u2014 why the time felt worth it." }
  ];
  var influenceTypeById = Object.fromEntries(influenceTypes.map((t) => [t.id, t]));
  var networkClusters = [
    { id: "people", number: "01", shortName: "People", name: "People", color: "#f14f9b", x: 420, y: 860 },
    { id: "app", number: "02", shortName: "App", name: "App (product systems & team)", color: "#d4b200", x: 880, y: 760, isHub: true },
    { id: "hardware", number: "03", shortName: "Hardware", name: "Hardware suppliers", color: "#0a7a5c", x: 1340, y: 860 },
    { id: "competitors", number: "04", shortName: "Competitors", name: "Competitors & substitutes", color: "#c43b7a", x: 480, y: 340 },
    { id: "partners", number: "05", shortName: "Partners", name: "Partners & enablers", color: "#5b6cff", x: 1280, y: 340 },
    { id: "institutions", number: "06", shortName: "Institutions", name: "External institutions", color: "#111c4e", x: 880, y: 1220 }
  ];
  var networkEntities = [
    // People
    { id: "readers", label: "Readers", cluster: "people" },
    { id: "contributors", label: "Contributors", cluster: "people" },
    { id: "stewards", label: "Stewards / Mods", cluster: "people" },
    { id: "intentional-users", label: "Intentional Users", cluster: "people" },
    // App
    { id: "team", label: "Product & Marketing Team", cluster: "app" },
    { id: "cosmos", label: "Cosmos (product)", cluster: "app" },
    { id: "spatial-engine", label: "Spatial Engine", cluster: "app" },
    { id: "content-org", label: "Content Organization", cluster: "app" },
    { id: "voice-system", label: "Voice System", cluster: "app" },
    { id: "interaction-system", label: "Interaction System", cluster: "app" },
    { id: "onboarding", label: "Onboarding", cluster: "app" },
    { id: "continuity", label: "Continuity / Save-Return", cluster: "app" },
    { id: "moderation-tools", label: "Moderation Tooling", cluster: "app" },
    { id: "cross-device-bridge", label: "Cross-device Bridge", cluster: "app" },
    // Hardware suppliers — company trees (same pattern as Meta)
    { id: "apple-hardware", label: "Apple (hardware)", cluster: "hardware" },
    { id: "vision-pro", label: "Apple Vision Pro", cluster: "hardware", parentId: "apple-hardware" },
    { id: "valve", label: "Valve", cluster: "hardware" },
    { id: "steamvr", label: "SteamVR", cluster: "hardware", parentId: "valve" },
    { id: "valve-index", label: "Valve Index / hardware", cluster: "hardware", parentId: "valve" },
    { id: "pcvr", label: "PCVR PCs & GPUs", cluster: "hardware", parentId: "valve" },
    { id: "bytedance-xr", label: "ByteDance XR", cluster: "hardware" },
    { id: "pico-headsets", label: "Pico Headsets", cluster: "hardware", parentId: "bytedance-xr" },
    { id: "pico-store", label: "Pico Store", cluster: "hardware", parentId: "bytedance-xr" },
    { id: "pico-os", label: "Pico OS", cluster: "hardware", parentId: "bytedance-xr" },
    { id: "pico-business", label: "Pico Business / Enterprise", cluster: "hardware", parentId: "bytedance-xr" },
    { id: "pico-sdk", label: "Pico SDK / Runtime", cluster: "hardware", parentId: "bytedance-xr" },
    { id: "other-hmd", label: "Other HMD makers", cluster: "hardware" },
    { id: "htc-vive", label: "HTC Vive", cluster: "hardware", parentId: "other-hmd" },
    { id: "psvr", label: "PlayStation VR", cluster: "hardware", parentId: "other-hmd" },
    { id: "varjo", label: "Varjo", cluster: "hardware", parentId: "other-hmd" },
    { id: "xreal", label: "XREAL / AR glasses", cluster: "hardware", parentId: "other-hmd" },
    // Competitors — branch concrete brands
    { id: "feed-social", label: "Feed Social", cluster: "competitors" },
    { id: "reddit", label: "Reddit", cluster: "competitors", parentId: "feed-social" },
    { id: "x-twitter", label: "X", cluster: "competitors", parentId: "feed-social" },
    { id: "tiktok", label: "TikTok", cluster: "competitors", parentId: "feed-social" },
    { id: "attention-ads", label: "Ad / Attention Economy", cluster: "competitors" },
    { id: "chat-platforms", label: "Chat Platforms", cluster: "competitors" },
    { id: "discord", label: "Discord", cluster: "competitors", parentId: "chat-platforms" },
    { id: "slack", label: "Slack", cluster: "competitors", parentId: "chat-platforms" },
    { id: "teams", label: "Microsoft Teams", cluster: "competitors", parentId: "chat-platforms" },
    { id: "social-vr", label: "Social VR", cluster: "competitors" },
    { id: "vrchat", label: "VRChat", cluster: "competitors", parentId: "social-vr" },
    { id: "horizon", label: "Horizon Worlds", cluster: "competitors", parentId: "social-vr" },
    { id: "rec-room", label: "Rec Room", cluster: "competitors", parentId: "social-vr" },
    { id: "knowledge-apps", label: "2D Knowledge Apps", cluster: "competitors" },
    { id: "notion", label: "Notion", cluster: "competitors", parentId: "knowledge-apps" },
    { id: "are-na", label: "Are.na", cluster: "competitors", parentId: "knowledge-apps" },
    { id: "obsidian", label: "Obsidian", cluster: "competitors", parentId: "knowledge-apps" },
    // Partners — company / platform trees
    { id: "meta", label: "Meta", cluster: "partners" },
    { id: "meta-store", label: "Meta Store", cluster: "partners", parentId: "meta" },
    { id: "meta-os", label: "Meta OS", cluster: "partners", parentId: "meta" },
    { id: "meta-quest", label: "Meta Quest", cluster: "partners", parentId: "meta" },
    { id: "meta-glasses", label: "Meta Glasses", cluster: "partners", parentId: "meta" },
    { id: "apple-platform", label: "Apple (platform)", cluster: "partners" },
    { id: "app-store", label: "App Store", cluster: "partners", parentId: "apple-platform" },
    { id: "visionos", label: "visionOS", cluster: "partners", parentId: "apple-platform" },
    { id: "apple-dev-tools", label: "Xcode / RealityKit", cluster: "partners", parentId: "apple-platform" },
    { id: "steam-store", label: "Steam / Storefronts", cluster: "partners" },
    { id: "steam-pcvr-store", label: "SteamVR Store", cluster: "partners", parentId: "steam-store" },
    { id: "itch-sidequest", label: "itch / SideQuest", cluster: "partners", parentId: "steam-store" },
    { id: "cloud-ai", label: "Cloud AI", cluster: "partners" },
    { id: "openai", label: "OpenAI", cluster: "partners", parentId: "cloud-ai" },
    { id: "anthropic", label: "Anthropic", cluster: "partners", parentId: "cloud-ai" },
    { id: "google-cloud", label: "Google Cloud / Gemini", cluster: "partners", parentId: "cloud-ai" },
    { id: "content-partners", label: "Content & Rights Partners", cluster: "partners" },
    { id: "publishers", label: "Publishers / Rights Holders", cluster: "partners", parentId: "content-partners" },
    { id: "ugc-platforms", label: "UGC / Import Platforms", cluster: "partners", parentId: "content-partners" },
    { id: "academic-labs", label: "Academic / Design Labs", cluster: "partners" },
    { id: "hci-labs", label: "HCI / XR Labs", cluster: "partners", parentId: "academic-labs" },
    { id: "design-research-labs", label: "Design Research Labs", cluster: "partners", parentId: "academic-labs" },
    { id: "press-media", label: "Press & Media", cluster: "partners" },
    { id: "tech-press", label: "Tech Press", cluster: "partners", parentId: "press-media" },
    { id: "design-press", label: "Design / Culture Press", cluster: "partners", parentId: "press-media" },
    // Institutions (external) — expand umbrellas like Meta (parent → specific orgs)
    { id: "capital", label: "Investors / Capital", cluster: "institutions" },
    { id: "venture-capital", label: "Venture Capital", cluster: "institutions", parentId: "capital" },
    { id: "angels-grants", label: "Angels / Grants", cluster: "institutions", parentId: "capital" },
    { id: "government", label: "Government / Regulators", cluster: "institutions" },
    { id: "privacy-regulators", label: "Privacy Authorities", cluster: "institutions", parentId: "government" },
    { id: "platform-regulators", label: "Platform / Content Regulators", cluster: "institutions", parentId: "government" },
    { id: "biometric-xr-policy", label: "Biometric / XR Policy Bodies", cluster: "institutions", parentId: "government" },
    { id: "edu-orgs", label: "Schools & Universities", cluster: "institutions" },
    { id: "k12-schools", label: "K-12 Schools", cluster: "institutions", parentId: "edu-orgs" },
    { id: "universities", label: "Universities", cluster: "institutions", parentId: "edu-orgs" },
    { id: "design-art-schools", label: "Design / Art Schools", cluster: "institutions", parentId: "edu-orgs" },
    { id: "libraries-archives", label: "Libraries / Archives", cluster: "institutions", parentId: "edu-orgs" },
    { id: "enterprise-orgs", label: "Enterprises / Workplaces", cluster: "institutions" },
    { id: "tech-companies", label: "Tech / Knowledge Companies", cluster: "institutions", parentId: "enterprise-orgs" },
    { id: "creative-agencies", label: "Creative Agencies", cluster: "institutions", parentId: "enterprise-orgs" },
    { id: "community-orgs", label: "Community Organizations", cluster: "institutions" },
    { id: "hobby-clubs", label: "Hobby / Interest Clubs", cluster: "institutions", parentId: "community-orgs" },
    { id: "fandom-groups", label: "Fandom / Fan Groups", cluster: "institutions", parentId: "community-orgs" }
  ];
  var membershipEdges = networkEntities.filter((e) => e.parentId).map((e) => ({ from: e.parentId, to: e.id, rel: "branch" }));
  function clusterHubId(clusterId) {
    return `hub:${clusterId}`;
  }
  var clusterMembershipEdges = networkEntities.filter((e) => !e.parentId).map((e) => ({
    from: clusterHubId(e.cluster),
    to: e.id,
    rel: "cluster",
    clusterId: e.cluster
  }));
  var hubLinkPairs = [
    ["app", "people"],
    ["app", "hardware"],
    ["app", "competitors"],
    ["app", "partners"],
    ["app", "institutions"]
  ];
  var hubHubEdges = hubLinkPairs.map(([a2, b]) => ({
    from: clusterHubId(a2),
    to: clusterHubId(b),
    rel: "hub",
    fromCluster: a2,
    toCluster: b
  }));
  var relationshipEdges = [...hubHubEdges, ...clusterMembershipEdges, ...membershipEdges];
  var influenceEdges = [
    // Team / product → external stakeholders
    { from: "team", to: "readers", type: "emotional", note: "Marketing and narrative shape first impressions." },
    { from: "team", to: "contributors", type: "identity", note: "Roadmap tone shapes contributor trust." },
    { from: "team", to: "capital", type: "identity", note: "Story and traction feed capital conversations." },
    { from: "cosmos", to: "readers", type: "meaning", note: "The product is the place people judge for reading value." },
    { from: "cosmos", to: "contributors", type: "identity", note: "Whether Cosmos feels like \u201Cour place\u201D decides contribution." },
    { from: "cosmos", to: "discord", type: "identity", note: "Communities compare Cosmos against the places they already live." },
    // App capabilities → people / orgs (product surface, not team wiring)
    { from: "spatial-engine", to: "readers", type: "meaning", note: "Layout must answer \u201Cwhy is this here?\u201D" },
    { from: "spatial-engine", to: "contributors", type: "functional", note: "Contributors need place-to-post." },
    { from: "content-org", to: "readers", type: "meaning", note: "Clusters turn posts into discourse." },
    { from: "content-org", to: "contributors", type: "meaning", note: "Good organization makes contribution feel like building a place." },
    { from: "voice-system", to: "contributors", type: "functional", note: "Create/playback quality decides voice viability." },
    { from: "voice-system", to: "readers", type: "emotional", note: "Tone pulls quiet readers without forcing speech." },
    { from: "voice-system", to: "intentional-users", type: "emotional", note: "Voice capture can feel invasive." },
    { from: "interaction-system", to: "intentional-users", type: "emotional", note: "Agency instead of passive scroll." },
    { from: "interaction-system", to: "contributors", type: "functional", note: "Low-friction react/place-reply in-headset." },
    { from: "onboarding", to: "readers", type: "emotional", note: "Setup drag turns hope into drop-off." },
    { from: "continuity", to: "readers", type: "functional", note: "Without return, discovery never becomes a library." },
    { from: "continuity", to: "contributors", type: "meaning", note: "Saved places make contribution feel persistent." },
    { from: "moderation-tools", to: "stewards", type: "functional", note: "Mods need tooling at scale." },
    { from: "moderation-tools", to: "intentional-users", type: "emotional", note: "Visible safety creates room to stay." },
    { from: "cross-device-bridge", to: "contributors", type: "functional", note: "Follow-up often leaves the headset." },
    { from: "cross-device-bridge", to: "enterprise-orgs", type: "functional", note: "Work needs desk handoff." },
    // People value loop (external public, not org chart)
    { from: "contributors", to: "readers", type: "meaning", note: "Living walls give readers a reason to return." },
    { from: "readers", to: "contributors", type: "emotional", note: "Attentive readership rewards careful contribution." },
    { from: "stewards", to: "contributors", type: "functional", note: "Norms keep contribution safe and legible." },
    { from: "stewards", to: "readers", type: "identity", note: "Stewards define who belongs." },
    { from: "intentional-users", to: "contributors", type: "identity", note: "Anti-doomscroll norms reshape \u201Cgood\u201D posts." },
    // Hardware / platforms → people & product surface (not brand→brand parent links)
    { from: "meta-quest", to: "onboarding", type: "functional", note: "Quest UX and comfort set the first-session floor." },
    { from: "meta-quest", to: "readers", type: "emotional", note: "Headset price is felt as access anxiety or relief." },
    { from: "meta-quest", to: "interaction-system", type: "functional", note: "Tracking and controllers bound grab/point feel." },
    { from: "meta-quest", to: "intentional-users", type: "emotional", note: "Weight and heat decide calm browsing." },
    { from: "meta-glasses", to: "readers", type: "identity", note: "Glasses form-factor reframes who might read outside a full HMD session." },
    { from: "meta-glasses", to: "interaction-system", type: "functional", note: "Lightweight optics change what spatial UI can assume." },
    { from: "vision-pro", to: "interaction-system", type: "functional", note: "Eyes/hands input changes interaction design." },
    { from: "vision-pro", to: "readers", type: "identity", note: "Premium device attracts quality-focused readers." },
    { from: "vision-pro", to: "readers", type: "emotional", note: "Comfort and sticker shock shape long sessions." },
    { from: "pico-headsets", to: "interaction-system", type: "functional", note: "Pico headsets add another input/runtime target." },
    { from: "pico-headsets", to: "readers", type: "emotional", note: "Pico price positioning is felt as access relief vs Quest/Apple." },
    { from: "pico-headsets", to: "intentional-users", type: "emotional", note: "Comfort and weight on Pico-class gear still decide calm sessions." },
    { from: "pico-os", to: "onboarding", type: "functional", note: "Pico OS defaults shape first-session comfort and install flow." },
    { from: "pico-os", to: "interaction-system", type: "functional", note: "Pico OS APIs bound controller/hand interaction parity with Quest." },
    { from: "pico-store", to: "team", type: "emotional", note: "Another store means another featuring and policy surface." },
    { from: "pico-store", to: "onboarding", type: "functional", note: "Pico Store listing and discovery gate first-run on Pico." },
    { from: "team", to: "pico-store", type: "financial", note: "Team pays Pico store cut if shipping on Pico." },
    { from: "pico-business", to: "enterprise-orgs", type: "functional", note: "Pico Business device programs target workplace XR pilots." },
    { from: "pico-business", to: "tech-companies", type: "identity", note: "Enterprise Pico kits reframe XR as work tooling, not games." },
    { from: "pico-sdk", to: "interaction-system", type: "functional", note: "Pico SDK/runtime force a second interaction integration path." },
    { from: "pico-sdk", to: "team", type: "emotional", note: "Maintaining a Pico runtime feels like platform tax on a small team." },
    { from: "htc-vive", to: "interaction-system", type: "functional", note: "Vive-class tracking stacks still define parts of open VR." },
    { from: "psvr", to: "readers", type: "identity", note: "Console VR culture is play-first, not discourse-first." },
    { from: "varjo", to: "readers", type: "identity", note: "Pro/enterprise HMDs attract quality-focused knowledge work." },
    { from: "xreal", to: "readers", type: "identity", note: "Lightweight AR glasses reframe who might read outside a full HMD." },
    { from: "xreal", to: "interaction-system", type: "functional", note: "Passthrough AR glasses change spatial UI assumptions." },
    { from: "other-hmd", to: "interaction-system", type: "functional", note: "Fragmented HMDs force lowest-common-denominator UX or forks." },
    { from: "steamvr", to: "interaction-system", type: "functional", note: "SteamVR runtime assumptions bound open PCVR interaction." },
    { from: "valve-index", to: "interaction-system", type: "functional", note: "Index controllers and lighthouse tracking set open-PCVR input expectations." },
    { from: "valve-index", to: "readers", type: "emotional", note: "High-end PCVR kit cost feels exclusive before any reading session." },
    { from: "pcvr", to: "readers", type: "functional", note: "PCVR enables longer seated reading when setup works." },
    { from: "pcvr", to: "readers", type: "emotional", note: "PC + headset cost/setup feels heavy before any session." },
    { from: "pcvr", to: "contributors", type: "functional", note: "PCVR suits deeper contribution sessions." },
    // Competitors — category + brand-level
    { from: "feed-social", to: "readers", type: "meaning", note: "Feeds already answer \u201Cwhat should I read?\u201D" },
    { from: "feed-social", to: "intentional-users", type: "emotional", note: "Ranking trains habits Cosmos tries to replace." },
    { from: "reddit", to: "readers", type: "meaning", note: "Subreddits are a default for deep, asynchronous discourse." },
    { from: "reddit", to: "stewards", type: "functional", note: "Mod culture and tools are learned on Reddit." },
    { from: "x-twitter", to: "contributors", type: "identity", note: "X rewards hot takes over place-building." },
    { from: "x-twitter", to: "intentional-users", type: "emotional", note: "Timeline urgency is the opposite of calm reading." },
    { from: "tiktok", to: "readers", type: "emotional", note: "Short-video ranking owns leisure attention." },
    { from: "tiktok", to: "intentional-users", type: "emotional", note: "Infinite short-form is the doomscroll archetype." },
    { from: "feed-social", to: "attention-ads", type: "functional", note: "Feeds supply inventory ad markets buy." },
    { from: "attention-ads", to: "feed-social", type: "financial", note: "Ad spend pays for feed products." },
    { from: "attention-ads", to: "reddit", type: "financial", note: "Ad money funds Reddit\u2019s business model." },
    { from: "attention-ads", to: "x-twitter", type: "financial", note: "Ad money funds X\u2019s attention product." },
    { from: "attention-ads", to: "tiktok", type: "financial", note: "Ad money funds TikTok\u2019s ranking machine." },
    { from: "attention-ads", to: "intentional-users", type: "emotional", note: "Attention extraction is the antagonist of intentional reading." },
    { from: "discord", to: "stewards", type: "functional", note: "Mod craft already lives in Discord toolchains." },
    { from: "discord", to: "readers", type: "identity", note: "\u201CMy community lives on Discord.\u201D" },
    { from: "discord", to: "community-orgs", type: "functional", note: "Many community orgs run on Discord." },
    { from: "discord", to: "cosmos", type: "identity", note: "Discord is the default \u201Cplace\u201D communities compare Cosmos against." },
    { from: "slack", to: "enterprise-orgs", type: "identity", note: "Slack is the default workplace chat identity." },
    { from: "slack", to: "contributors", type: "functional", note: "Work discourse already lives in Slack threads." },
    { from: "teams", to: "enterprise-orgs", type: "identity", note: "Teams is the Microsoft-stack workplace default." },
    { from: "teams", to: "tech-companies", type: "functional", note: "Large orgs route knowledge talk through Teams." },
    { from: "chat-platforms", to: "readers", type: "emotional", note: "Chat already feels like \u201Cwhere community happens.\u201D" },
    { from: "vrchat", to: "readers", type: "emotional", note: "Play-social VR makes calm browsing feel wrong." },
    { from: "vrchat", to: "contributors", type: "identity", note: "Headset culture defaults to hangouts, not walls." },
    { from: "horizon", to: "readers", type: "identity", note: "Horizon defines mass-market \u201Cwhat VR is for.\u201D" },
    { from: "rec-room", to: "readers", type: "emotional", note: "Game-social defaults own casual headset time." },
    { from: "social-vr", to: "meta-quest", type: "identity", note: "Social VR content drives headset leisure expectations." },
    { from: "notion", to: "readers", type: "functional", note: "2D wikis already hold personal knowledge." },
    { from: "notion", to: "enterprise-orgs", type: "identity", note: "Work knowledge already lives in Notion-class tools." },
    { from: "are-na", to: "contributors", type: "identity", note: "Curatorial boards are a 2D cousin of spatial walls." },
    { from: "obsidian", to: "intentional-users", type: "identity", note: "Local-first note keepers already have a \u201Cserious reading\u201D identity." },
    { from: "obsidian", to: "readers", type: "functional", note: "Personal knowledge graphs compete for long-form attention." },
    { from: "knowledge-apps", to: "readers", type: "functional", note: "2D tools already hold notes and wikis." },
    // Partners → Cosmos / people (not brand→brand parent links — those are gray category edges)
    { from: "meta-store", to: "onboarding", type: "functional", note: "Store listing and policy gate first-run." },
    { from: "meta-store", to: "team", type: "emotional", note: "Fees and featuring pressure viability." },
    { from: "team", to: "meta-store", type: "financial", note: "Team pays Meta store revenue share / listing costs." },
    { from: "meta-os", to: "interaction-system", type: "functional", note: "OS / APIs bound what spatial interaction can ship." },
    { from: "meta", to: "horizon", type: "identity", note: "Horizon sits inside Meta\u2019s social / platform strategy." },
    { from: "visionos", to: "vision-pro", type: "functional", note: "visionOS capabilities and review bound Vision apps." },
    { from: "visionos", to: "interaction-system", type: "functional", note: "visionOS interaction models set Apple spatial UI norms." },
    { from: "app-store", to: "onboarding", type: "functional", note: "App Store listing and review gate first Vision install." },
    { from: "app-store", to: "team", type: "emotional", note: "Revenue share feels like a tax on paid features." },
    { from: "team", to: "app-store", type: "financial", note: "Team pays Apple store cut when distributing on Vision." },
    { from: "apple-platform", to: "enterprise-orgs", type: "identity", note: "Apple identity pulls knowledge work orgs." },
    { from: "apple-dev-tools", to: "team", type: "functional", note: "RealityKit/Xcode toolchains shape what can be built for Vision." },
    { from: "steam-pcvr-store", to: "pcvr", type: "functional", note: "SteamVR store is a primary open-PCVR distribution surface." },
    { from: "steam-pcvr-store", to: "onboarding", type: "functional", note: "Steam install and library flow shape first PCVR session." },
    { from: "team", to: "steam-pcvr-store", type: "financial", note: "Team pays Steam cut if shipping PCVR." },
    { from: "itch-sidequest", to: "readers", type: "identity", note: "Indie storefronts attract experimental, non-console readers." },
    { from: "itch-sidequest", to: "team", type: "emotional", note: "Sideloading culture lowers store pressure but raises support load." },
    { from: "cloud-ai", to: "spatial-engine", type: "functional", note: "Embeddings enable spatial organization." },
    { from: "cloud-ai", to: "voice-system", type: "functional", note: "STT/TTS providers set latency and coverage." },
    { from: "openai", to: "spatial-engine", type: "functional", note: "Model APIs can drive clustering and summaries." },
    { from: "anthropic", to: "content-org", type: "functional", note: "Long-context models can assist organization." },
    { from: "google-cloud", to: "voice-system", type: "functional", note: "Cloud STT/TTS is a common voice backend." },
    { from: "cloud-ai", to: "spatial-engine", type: "emotional", note: "Unit compute price pushes cheaper layouts." },
    { from: "cloud-ai", to: "voice-system", type: "emotional", note: "Per-minute prices make free voice feel expensive." },
    { from: "team", to: "cloud-ai", type: "financial", note: "Team pays cloud AI invoices." },
    { from: "team", to: "openai", type: "financial", note: "API usage is a direct cash cost." },
    { from: "publishers", to: "content-org", type: "functional", note: "Rights-safe licensed import seeds real walls." },
    { from: "publishers", to: "stewards", type: "functional", note: "Licenses shape what stewards can host." },
    { from: "ugc-platforms", to: "content-org", type: "functional", note: "Import APIs from UGC platforms seed early walls." },
    { from: "ugc-platforms", to: "readers", type: "meaning", note: "Without import, walls stay empty of real discourse." },
    { from: "content-partners", to: "readers", type: "meaning", note: "Empty walls fail people who wanted real discourse." },
    { from: "hci-labs", to: "contributors", type: "identity", note: "HCI labs legitimize research use of spatial discourse." },
    { from: "hci-labs", to: "universities", type: "functional", note: "HCI labs open university classroom and study pilots." },
    { from: "design-research-labs", to: "design-art-schools", type: "identity", note: "Design research treats spatial discourse as studio infrastructure." },
    { from: "design-research-labs", to: "capital", type: "identity", note: "Academic design legitimacy aids fundraising narratives." },
    { from: "tech-press", to: "readers", type: "emotional", note: "Tech coverage shapes first product impressions." },
    { from: "tech-press", to: "capital", type: "identity", note: "Tech narrative affects capital interest." },
    { from: "design-press", to: "team", type: "identity", note: "Design/culture press rewards or punishes craft framing." },
    { from: "design-press", to: "intentional-users", type: "identity", note: "Design media signals who \u201Cserious\u201D spatial tools are for." },
    // Institutions — influence from specific bodies (parents stay category structure)
    { from: "venture-capital", to: "team", type: "financial", note: "VC funds runway and growth bets." },
    { from: "venture-capital", to: "continuity", type: "emotional", note: "VC pace can make patient loops feel unfundable." },
    { from: "angels-grants", to: "team", type: "financial", note: "Angels and grants fund early exploration." },
    { from: "angels-grants", to: "academic-labs", type: "identity", note: "Grant culture aligns research pilots with early capital." },
    { from: "capital", to: "cloud-ai", type: "emotional", note: "Funding fashion makes AI plays feel \u201Chotter.\u201D" },
    { from: "privacy-regulators", to: "intentional-users", type: "emotional", note: "Privacy rules set baseline safety expectations." },
    { from: "privacy-regulators", to: "voice-system", type: "functional", note: "Consent and retention law constrain voice capture." },
    { from: "platform-regulators", to: "meta-store", type: "emotional", note: "Store and platform compliance cost reshapes what can ship." },
    { from: "platform-regulators", to: "pico-store", type: "emotional", note: "Store policy pressure also hits non-Meta storefronts." },
    { from: "platform-regulators", to: "team", type: "functional", note: "Content and intermediary rules shape moderation duties." },
    { from: "biometric-xr-policy", to: "meta-os", type: "functional", note: "XR tracking and biometric rules constrain OS-level APIs." },
    { from: "biometric-xr-policy", to: "pico-os", type: "functional", note: "Biometric rules also constrain Pico OS tracking surfaces." },
    { from: "biometric-xr-policy", to: "voice-system", type: "functional", note: "Biometric voice rules limit always-on capture." },
    { from: "k12-schools", to: "team", type: "financial", note: "District purchase can fund seats and devices." },
    { from: "k12-schools", to: "moderation-tools", type: "functional", note: "Schools require safety, audit, and age-appropriate controls." },
    { from: "k12-schools", to: "readers", type: "functional", note: "Classroom cohorts create structured reading demand." },
    { from: "universities", to: "team", type: "financial", note: "Universities license tools for courses and labs." },
    { from: "universities", to: "content-org", type: "meaning", note: "Seminars need stable discourse structure, not feed heat." },
    { from: "universities", to: "contributors", type: "identity", note: "Faculty and students can seed expert threads." },
    { from: "design-art-schools", to: "contributors", type: "identity", note: "Studio culture recruits spatial explainers and critics." },
    { from: "design-art-schools", to: "spatial-engine", type: "meaning", note: "Design programs pressure spatial craft quality." },
    { from: "libraries-archives", to: "readers", type: "functional", note: "Libraries bring long-form readers and collection habits." },
    { from: "libraries-archives", to: "content-org", type: "meaning", note: "Catalog and archive metaphors need stable structure." },
    { from: "tech-companies", to: "team", type: "financial", note: "Knowledge workplaces buy contracts when ready." },
    { from: "tech-companies", to: "cross-device-bridge", type: "functional", note: "Tech orgs need desk \u2194 headset handoff if they try Cosmos." },
    { from: "creative-agencies", to: "contributors", type: "identity", note: "Agencies can seed visual, critique-heavy walls." },
    { from: "creative-agencies", to: "spatial-engine", type: "meaning", note: "Agency craft standards pressure spatial layout quality." },
    { from: "enterprise-orgs", to: "cosmos", type: "functional", note: "Enterprise adoption is a later Cosmos channel\u2014not the core community wall." },
    { from: "enterprise-orgs", to: "continuity", type: "functional", note: "If work uses Cosmos at all, it needs save/return and handoff." },
    { from: "enterprise-orgs", to: "moderation-tools", type: "functional", note: "Procurement expects access control." },
    { from: "hobby-clubs", to: "stewards", type: "identity", note: "Hobby clubs bring local stewards and norms." },
    { from: "hobby-clubs", to: "readers", type: "functional", note: "Clubs can migrate whole interest groups." },
    { from: "fandom-groups", to: "contributors", type: "identity", note: "Fandom culture already practices place-building and lore walls." },
    { from: "fandom-groups", to: "discord", type: "identity", note: "Many fandoms still call Discord home." },
    { from: "community-orgs", to: "discord", type: "identity", note: "Many community orgs still call Discord home." }
  ];
  var entityById = Object.fromEntries(networkEntities.map((e) => [e.id, e]));
  var opportunityKinds = [
    {
      id: "marketing",
      label: "Marketing",
      short: "Narrative",
      color: "#f14f9b",
      desc: "Story and first impressions \u2014 where others currently define what Cosmos is for."
    },
    {
      id: "feature",
      label: "Feature",
      short: "Product",
      color: "#111c4e",
      desc: "Product capability that reduces a one-way dependency or creates a missing reverse path."
    },
    {
      id: "targeting",
      label: "Targeting",
      short: "Who / where",
      color: "#c43b7a",
      desc: "Which segments, channels, or pilots to enter first."
    },
    {
      id: "partnership",
      label: "Partnership",
      short: "Distribution",
      color: "#5b6cff",
      desc: "Reciprocal value with platforms, content, labs, or press \u2014 not fee payment alone."
    },
    {
      id: "policy",
      label: "Policy / capital",
      short: "Institution",
      color: "#0a7a5c",
      desc: "Institutional pressure answered with evidence, compliance design, or capital narrative."
    },
    {
      id: "defensive",
      label: "Defensive",
      short: "Counter",
      color: "#8a6d00",
      desc: "Competitor or attention-economy pull that still has no Cosmos answer."
    }
  ];
  var opportunityKindById = Object.fromEntries(opportunityKinds.map((k) => [k.id, k]));
  var gapOpportunityOverrides = {
    "reddit|readers": {
      kinds: ["defensive", "targeting"],
      note: "Reddit already hosts deep async discourse. Reach those readers with import-seeded walls and place memory \u2014 not another feed."
    },
    "reddit|stewards": {
      kinds: ["feature", "targeting"],
      note: "Mod craft is learned on Reddit. Build steward tools that transfer that skill into spatial places, then recruit there."
    },
    "discord|readers": {
      kinds: ["defensive", "marketing"],
      note: "\u201CMy community lives on Discord\u201D is default identity. Position Cosmos as the wall outside chat; bridge without forcing a move."
    },
    "discord|cosmos": {
      kinds: ["defensive", "partnership"],
      note: "Discord is the comparison set for \u201Cplace.\u201D Frame Cosmos as additive; support import/export rather than full migration."
    },
    "discord|stewards": {
      kinds: ["feature", "targeting"],
      note: "Stewards already work in Discord. Transfer moderation skill into the wall; pilot with server-heavy communities."
    },
    "discord|community-orgs": {
      kinds: ["targeting", "partnership"],
      note: "Orgs already run on Discord. Target clubs and fandoms as groups, not only lone consumers."
    },
    "tiktok|readers": {
      kinds: ["defensive", "marketing"],
      note: "Short-form ranking owns leisure attention. Sell finite, calm sessions \u2014 and refuse metrics that recreate infinite pull."
    },
    "tiktok|intentional-users": {
      kinds: ["defensive", "feature"],
      note: "Doomscroll trains the users Cosmos wants. Make \u201CI\u2019m done\u201D a success state in product and messaging."
    },
    "x-twitter|contributors": {
      kinds: ["defensive", "marketing"],
      note: "Hot-take culture shapes who posts. Reward place-building in both UX and narrative, not performance."
    },
    "x-twitter|intentional-users": {
      kinds: ["defensive", "marketing"],
      note: "Timeline urgency fights calm reading. Design and market against urgency, not toward it."
    },
    "feed-social|readers": {
      kinds: ["defensive", "feature"],
      note: "Feeds answer \u201Cwhat should I read?\u201D The wall must answer \u201Cwhere is this debate?\u201D better than rank."
    },
    "feed-social|intentional-users": {
      kinds: ["defensive", "feature"],
      note: "Ranking trains the habits Cosmos wants to replace. Interaction should break that muscle memory."
    },
    "attention-ads|intentional-users": {
      kinds: ["defensive", "policy"],
      note: "Attention extraction is structural. Metrics and capital story must not sell intentional users back to ads."
    },
    "vrchat|readers": {
      kinds: ["marketing", "targeting"],
      note: "Play-social VR makes calm browse feel wrong. Name a different job; target people who already reject hangout-default."
    },
    "vrchat|contributors": {
      kinds: ["marketing", "targeting"],
      note: "Headset culture defaults to hangouts. Speak to builders and curators, not party hosts."
    },
    "horizon|readers": {
      kinds: ["marketing", "defensive"],
      note: "Horizon still defines mass-market VR. Carve async discourse out of game defaults in store and press."
    },
    "rec-room|readers": {
      kinds: ["marketing", "targeting"],
      note: "Game-social owns casual headset time. Compete for evening read and research hours, not play hours."
    },
    "social-vr|meta-quest": {
      kinds: ["partnership", "marketing"],
      note: "Social VR sets Quest leisure expectations. Push featuring that treats reading as a valid Quest use."
    },
    "notion|readers": {
      kinds: ["targeting", "feature"],
      note: "2D wikis already hold knowledge. Reach people who outgrow flat pages; bridge out, don\u2019t replace the wiki."
    },
    "notion|enterprise-orgs": {
      kinds: ["targeting", "partnership"],
      note: "Work knowledge lives in Notion-class tools. Enterprise is later, via handoff \u2014 not day-one chat replacement."
    },
    "obsidian|intentional-users": {
      kinds: ["targeting", "marketing"],
      note: "Local-first note keepers already have a serious-reading identity. Offer the shared wall a private vault cannot be."
    },
    "are-na|contributors": {
      kinds: ["targeting", "marketing"],
      note: "Curatorial boards are a 2D cousin of spatial walls. Recruit those curators as early builders."
    },
    "meta-quest|readers": {
      kinds: ["feature", "partnership"],
      note: "Price and comfort gate access. Ship cross-device paths; never assume Quest ownership."
    },
    "meta-quest|intentional-users": {
      kinds: ["feature", "targeting"],
      note: "Weight and heat decide calm sessions. Design for short, interrupted, often reclined use."
    },
    "vision-pro|readers": {
      kinds: ["targeting", "marketing"],
      note: "Premium devices attract craft-focused readers and exclude others. Show Vision craft without making it the only path."
    },
    "pcvr|readers": {
      kinds: ["feature", "targeting"],
      note: "PCVR enables long seated reading when setup works. Onboard SteamVR users; don\u2019t pretend setup is free."
    },
    "meta-store|team": {
      kinds: ["partnership", "policy"],
      note: "Fees and featuring pressure viability. Use multi-store leverage so Meta is not the only gate."
    },
    "meta-store|onboarding": {
      kinds: ["feature", "partnership"],
      note: "Listing and policy gate first-run. Design store page and onboarding for review; keep SideQuest/itch as a parallel path."
    },
    "app-store|team": {
      kinds: ["partnership", "policy"],
      note: "Apple\u2019s cut is structural. Price and multi-platform plan must work after the cut, not only before it."
    },
    "cloud-ai|spatial-engine": {
      kinds: ["feature", "policy"],
      note: "Embeddings enable the wall and bill for it. Degrade gracefully offline; don\u2019t fundraise on pure token burn."
    },
    "cloud-ai|voice-system": {
      kinds: ["feature", "policy"],
      note: "STT/TTS makes free voice expensive. Keep voice optional, cached, and cost-aware."
    },
    "publishers|content-org": {
      kinds: ["partnership", "feature"],
      note: "Rights-safe import seeds walls. Prove reader demand back to publishers so the relationship can become two-way."
    },
    "ugc-platforms|readers": {
      kinds: ["partnership", "feature"],
      note: "Without import, walls lack real discourse. Treat import partnerships as a first milestone."
    },
    "ugc-platforms|content-org": {
      kinds: ["feature", "partnership"],
      note: "Import APIs seed organization. Build permission-cleared pipelines; don\u2019t plan on open scrape."
    },
    "content-partners|readers": {
      kinds: ["partnership", "marketing"],
      note: "Empty walls fail people who came for discourse. Market only when partner-seeded walls exist."
    },
    "venture-capital|team": {
      kinds: ["policy", "marketing"],
      note: "VC funds runway with growth tempo. Keep narrative and metrics that defend patient wall loops."
    },
    "venture-capital|continuity": {
      kinds: ["feature", "policy"],
      note: "Growth pace can make save/return feel unfundable. Prove return quality, not only growth."
    },
    "k12-schools|team": {
      kinds: ["targeting", "policy"],
      note: "Districts can fund seats and demand safety. Sell schools only after moderation and age controls exist."
    },
    "universities|team": {
      kinds: ["targeting", "partnership"],
      note: "Course and lab licenses are real. Pilot through HCI labs and seminars before broad enterprise."
    },
    "universities|content-org": {
      kinds: ["feature", "targeting"],
      note: "Seminars need stable structure. Build course walls and faculty seeding before campus sales theater."
    },
    "libraries-archives|readers": {
      kinds: ["targeting", "marketing"],
      note: "Libraries bring long-form readers. Speak their catalog and collection language."
    },
    "fandom-groups|contributors": {
      kinds: ["targeting", "marketing"],
      note: "Fandom already place-builds lore. Seed fandom walls early; respect Discord as home base."
    },
    "hobby-clubs|readers": {
      kinds: ["targeting", "partnership"],
      note: "Clubs can move whole interest groups. Offer group onboarding and steward kits."
    },
    "team|readers": {
      kinds: ["marketing", "feature"],
      note: "Narrative shapes first impressions until product proof lands. Pair claims with demos people can return to."
    },
    "team|capital": {
      kinds: ["marketing", "policy"],
      note: "Story moves capital. Keep fundraising tied to falsifiable wall metrics, not vibes."
    },
    "cosmos|readers": {
      kinds: ["feature", "marketing"],
      note: "Readers judge the product by reading value. Make success visible; don\u2019t overclaim before proof."
    },
    "cosmos|contributors": {
      kinds: ["feature", "marketing"],
      note: "Contribution depends on \u201Cour place.\u201D Build place identity in product; speak to builders as builders."
    },
    "spatial-engine|readers": {
      kinds: ["feature"],
      note: "Layout must answer \u201Cwhy is this here?\u201D Save paths and comparison tools turn scan into place loyalty."
    },
    "onboarding|readers": {
      kinds: ["feature", "marketing"],
      note: "Setup drag kills first hope. Promise a five-minute read, not a platform tour."
    },
    "continuity|readers": {
      kinds: ["feature"],
      note: "Without return, discovery never becomes a library. Save and revisit are core, not later extras."
    },
    "tech-press|readers": {
      kinds: ["marketing", "partnership"],
      note: "Press shapes first impressions. Show walking a wall, not only a concept reel."
    },
    "tech-press|capital": {
      kinds: ["marketing", "policy"],
      note: "Tech narrative moves capital. Time coverage so hype does not force premature growth metrics."
    },
    "platform-regulators|team": {
      kinds: ["policy", "feature"],
      note: "Intermediary rules shape moderation duties. Build those tools before school or enterprise sales."
    },
    "privacy-regulators|voice-system": {
      kinds: ["policy", "feature"],
      note: "Consent and retention law constrain voice. Optional, local-first voice is both product and policy."
    },
    "enterprise-orgs|cosmos": {
      kinds: ["targeting", "feature"],
      note: "Enterprise is a later channel. Don\u2019t target workplaces until continuity and access control exist."
    },
    "slack|enterprise-orgs": {
      kinds: ["defensive", "targeting"],
      note: "Slack owns workplace chat identity. If work comes later, sit beside Slack as structure \u2014 not as chat replacement."
    },
    "teams|enterprise-orgs": {
      kinds: ["defensive", "targeting"],
      note: "Teams is the Microsoft-stack default. Same rule: complementary wall, not meeting software."
    }
  };
  function classifyGapOpportunity(fromId, toId, types) {
    const override = gapOpportunityOverrides[`${fromId}|${toId}`];
    if (override?.kinds?.length) {
      return { primary: override.kinds[0], secondary: override.kinds[1] || null };
    }
    const fromC = entityById[fromId]?.cluster;
    const toC = entityById[toId]?.cluster;
    const typeSet = new Set(types);
    if (fromC === "competitors" && toC === "people") {
      if (typeSet.has("emotional") || typeSet.has("identity") || typeSet.has("meaning")) {
        return { primary: "defensive", secondary: "marketing" };
      }
      return { primary: "targeting", secondary: "defensive" };
    }
    if (fromC === "competitors" && (toId === "cosmos" || toC === "app")) {
      return { primary: "defensive", secondary: "marketing" };
    }
    if (fromC === "competitors" && toC === "partners") {
      return { primary: "partnership", secondary: "marketing" };
    }
    if (fromC === "partners" && (toC === "app" || toC === "people")) {
      if (typeSet.has("financial") || toId === "team") {
        return { primary: "partnership", secondary: "policy" };
      }
      return { primary: "partnership", secondary: "feature" };
    }
    if (fromC === "hardware" && (toC === "app" || toC === "people")) {
      return { primary: "feature", secondary: "targeting" };
    }
    if (fromC === "institutions") {
      if (typeSet.has("financial")) return { primary: "policy", secondary: "targeting" };
      return { primary: "policy", secondary: "feature" };
    }
    if (fromC === "app" && toC === "people") {
      return { primary: "feature", secondary: "marketing" };
    }
    if (fromC === "app" && toC === "institutions") {
      return { primary: "marketing", secondary: "targeting" };
    }
    if (fromC === "people" && toC === "competitors") {
      return { primary: "defensive", secondary: "targeting" };
    }
    if (fromC === "people" && toC === "app") {
      return { primary: "feature", secondary: "targeting" };
    }
    if (fromId === "team" || fromId === "cosmos") {
      return { primary: "marketing", secondary: "feature" };
    }
    return { primary: "feature", secondary: "targeting" };
  }
  function scoreInfluenceGap(fromId, toId, types, forwardCount) {
    const fromC = entityById[fromId]?.cluster;
    const toC = entityById[toId]?.cluster;
    const typeSet = new Set(types);
    let score = 1;
    if (fromC && toC && fromC !== toC) score += 2;
    if (toC === "people" || fromC === "people") score += 3;
    if (fromId === "cosmos" || toId === "cosmos" || fromId === "team" || toId === "team") score += 3;
    if (fromC === "competitors" && toC === "people") score += 4;
    if (fromC === "competitors" && (toId === "cosmos" || toC === "app")) score += 3;
    if ((fromC === "partners" || fromC === "hardware") && (toC === "app" || toC === "people")) score += 2;
    if (fromC === "institutions" && (toC === "app" || toC === "people" || toC === "partners")) score += 2;
    if (typeSet.has("financial")) score += 2;
    if (toC === "people" && (typeSet.has("identity") || typeSet.has("meaning") || typeSet.has("emotional"))) score += 2;
    if (forwardCount > 1) score += Math.min(2, forwardCount - 1);
    if (types.length > 1) score += Math.min(2, types.length - 1);
    if (gapOpportunityOverrides[`${fromId}|${toId}`]) score += 2;
    return score;
  }
  function defaultGapOpportunityNote(fromId, toId, primaryKind, types) {
    const fromLabel = entityById[fromId]?.label || fromId;
    const toLabel = entityById[toId]?.label || toId;
    const typeList = types.map((t) => influenceTypeById[t]?.label || t).join(", ");
    const kindLabel = opportunityKindById[primaryKind]?.label || primaryKind;
    return `${fromLabel} shapes ${toLabel} (${typeList}) with no reverse path. ${kindLabel}: earn a return influence, or accept the one-way force and design around it.`;
  }
  function buildInfluenceAsymmetryGaps(edges) {
    const directed = /* @__PURE__ */ new Map();
    for (const edge of edges) {
      const key = `${edge.from}|${edge.to}`;
      if (!directed.has(key)) directed.set(key, []);
      directed.get(key).push(edge);
    }
    const gaps = [];
    for (const [key, forwardEdges] of directed) {
      const [from, to] = key.split("|");
      if (directed.has(`${to}|${from}`)) continue;
      const types = [...new Set(forwardEdges.map((e) => e.type))];
      const { primary, secondary } = classifyGapOpportunity(from, to, types);
      const override = gapOpportunityOverrides[key];
      const score = scoreInfluenceGap(from, to, types, forwardEdges.length);
      const opportunityNote = override?.note || defaultGapOpportunityNote(from, to, primary, types);
      gaps.push({
        id: key,
        from,
        to,
        types,
        forwardEdges,
        score,
        major: false,
        // filled after threshold
        primaryOpportunity: primary,
        secondaryOpportunity: secondary,
        opportunityNote,
        curated: Boolean(override)
      });
    }
    gaps.sort((a2, b) => b.score - a2.score || a2.from.localeCompare(b.from) || a2.to.localeCompare(b.to));
    return gaps;
  }
  function markMajorAsymmetryGaps(gaps) {
    const scores = gaps.map((g) => g.score).sort((a2, b) => b - a2);
    const topN = Math.max(15, Math.ceil(gaps.length * 0.2));
    const percentileFloor = scores.length ? scores[Math.min(scores.length - 1, topN - 1)] : 11;
    const majorMinScore = Math.max(11, percentileFloor);
    for (const gap of gaps) {
      gap.major = gap.curated || gap.score >= majorMinScore;
    }
    return majorMinScore;
  }
  var influenceAsymmetryGaps = buildInfluenceAsymmetryGaps(influenceEdges);
  var MAJOR_ASYMMETRY_MIN_SCORE = markMajorAsymmetryGaps(influenceAsymmetryGaps);
  var asymmetryGapById = Object.fromEntries(influenceAsymmetryGaps.map((g) => [g.id, g]));
  var majorAsymmetryGaps = influenceAsymmetryGaps.filter((g) => g.major);
  var networkSides = networkClusters.map((c2) => ({
    ...c2,
    nodes: networkEntities.filter((e) => e.cluster === c2.id)
  }));
  var MAP_W = 1760;
  var MAP_H = 1440;
  var MAP_PAD = 50;
  function placeOnCircleSlots(items, cx, cy, baseRadius, {
    minSlots = 12,
    maxPerSlot = 2,
    startAngle = -Math.PI / 2,
    ringStep = 36
  } = {}) {
    if (!items.length) return [];
    const slots = Math.max(minSlots, Math.ceil(items.length / maxPerSlot));
    return items.map((item, i) => {
      const slot = i % slots;
      const ring = Math.floor(i / slots);
      const ang = startAngle + slot / slots * Math.PI * 2;
      const r = baseRadius + ring * ringStep;
      return {
        item,
        slot,
        ring,
        ang,
        x: cx + Math.cos(ang) * r,
        y: cy + Math.sin(ang) * r,
        r
      };
    });
  }
  function layoutNetworkGraph(clusters, entities, influence, membership, hubLinks) {
    const clusterById = Object.fromEntries(clusters.map((c2) => [c2.id, c2]));
    const childrenOf = {};
    entities.forEach((e) => {
      if (!e.parentId) return;
      if (!childrenOf[e.parentId]) childrenOf[e.parentId] = [];
      childrenOf[e.parentId].push(e);
    });
    const nodes = [];
    const byId = {};
    clusters.forEach((c2) => {
      const id = `hub:${c2.id}`;
      const n = { id, kind: "hub", cluster: c2.id, fx: c2.x, fy: c2.y, x: c2.x, y: c2.y };
      nodes.push(n);
      byId[id] = n;
    });
    const seedPos = {};
    clusters.forEach((c2, ci) => {
      const roots = entities.filter((e) => e.cluster === c2.id && !e.parentId);
      const rootPlacements = placeOnCircleSlots(roots, c2.x, c2.y, 118, {
        minSlots: Math.max(12, roots.length * 2),
        maxPerSlot: 2,
        startAngle: -Math.PI / 2 + ci * 0.22,
        // slight per-cluster offset so hubs don’t mirror
        ringStep: 42
      });
      rootPlacements.forEach((p) => {
        seedPos[p.item.id] = { x: p.x, y: p.y, r: p.r, ang: p.ang };
      });
      const queue = roots.map((r) => r.id);
      while (queue.length) {
        const pid = queue.shift();
        const kids = childrenOf[pid] || [];
        if (!kids.length) continue;
        const parentSeed = seedPos[pid] || { x: c2.x, y: c2.y, ang: 0 };
        const outward = Math.atan2(parentSeed.y - c2.y, parentSeed.x - c2.x);
        const childPlacements = placeOnCircleSlots(kids, parentSeed.x, parentSeed.y, 78, {
          minSlots: Math.max(8, kids.length * 2),
          maxPerSlot: 2,
          startAngle: outward - Math.PI * 0.55,
          ringStep: 34
        });
        const arc = Math.PI * 0.95;
        childPlacements.forEach((p, i) => {
          const t = kids.length === 1 ? 0.5 : i / (kids.length - 1);
          const ang = outward - arc / 2 + t * arc;
          const ring = p.ring;
          const r = 78 + ring * 34;
          const x3 = parentSeed.x + Math.cos(ang) * r;
          const y3 = parentSeed.y + Math.sin(ang) * r;
          seedPos[p.item.id] = { x: x3, y: y3, r, ang };
          queue.push(p.item.id);
        });
      }
    });
    entities.forEach((e) => {
      const home = clusterById[e.cluster];
      const seed = seedPos[e.id] || { x: home.x + 90, y: home.y };
      const n = {
        id: e.id,
        kind: "entity",
        cluster: e.cluster,
        parentId: e.parentId || null,
        x: seed.x,
        y: seed.y,
        seedR: seed.r || 100,
        seedAng: seed.ang || 0
      };
      nodes.push(n);
      byId[e.id] = n;
    });
    const links = [];
    hubLinks.forEach(([a2, b]) => {
      links.push({
        source: `hub:${a2}`,
        target: `hub:${b}`,
        kind: "hub",
        distance: 400,
        strength: 0.32
      });
    });
    entities.filter((e) => !e.parentId).forEach((e) => {
      const rootCount = entities.filter((x3) => x3.cluster === e.cluster && !x3.parentId).length;
      const base = rootCount > 8 ? 130 : 115;
      links.push({
        source: `hub:${e.cluster}`,
        target: e.id,
        kind: "cluster",
        distance: byId[e.id].seedR || base,
        strength: 1.05
      });
    });
    membership.forEach((e) => {
      links.push({
        source: e.from,
        target: e.to,
        kind: "branch",
        distance: byId[e.to]?.seedR || 82,
        strength: 1.25
      });
    });
    influence.forEach((e) => {
      if (!byId[e.from] || !byId[e.to]) return;
      links.push({
        source: e.from,
        target: e.to,
        kind: "influence",
        distance: 240,
        strength: 0.045
      });
    });
    const sim = simulation_default(nodes).force(
      "link",
      link_default(links).id((d) => d.id).distance((d) => d.distance).strength((d) => d.strength)
    ).force(
      "charge",
      manyBody_default().strength((d) => d.kind === "hub" ? -50 : -260)
    ).force(
      "collide",
      collide_default().radius((d) => d.kind === "hub" ? 40 : 52).strength(0.95).iterations(4)
    ).force(
      "homeX",
      x_default2((d) => d.kind === "hub" ? d.fx : clusterById[d.cluster].x).strength(
        (d) => d.kind === "hub" ? 0 : 0.08
      )
    ).force(
      "homeY",
      y_default2((d) => d.kind === "hub" ? d.fy : clusterById[d.cluster].y).strength(
        (d) => d.kind === "hub" ? 0 : 0.08
      )
    ).stop();
    for (let i = 0; i < 340; i++) sim.tick();
    clusters.forEach((c2) => {
      const roots = entities.filter((e) => e.cluster === c2.id && !e.parentId).map((e) => byId[e.id]);
      if (roots.length < 2) return;
      roots.sort((a2, b) => Math.atan2(a2.y - c2.y, a2.x - c2.x) - Math.atan2(b.y - c2.y, b.x - c2.x));
      const slots = Math.max(12, roots.length * 2);
      const maxPerSlot = 2;
      const usable = Math.min(slots, Math.max(roots.length, Math.ceil(roots.length / maxPerSlot) * 2));
      const slotIndices = [];
      for (let i = 0; i < roots.length; i++) {
        slotIndices.push(Math.round(i * (usable - 1) / Math.max(roots.length - 1, 1)) % usable);
      }
      for (let i = 1; i < slotIndices.length; i++) {
        if (slotIndices[i] === slotIndices[i - 1] && roots.length <= usable) {
          slotIndices[i] = (slotIndices[i - 1] + 1) % usable;
        }
      }
      const startAng = -Math.PI / 2;
      roots.forEach((n, i) => {
        const slot = slotIndices[i];
        let same = 0;
        for (let j = 0; j < i; j++) if (slotIndices[j] === slot) same += 1;
        const ang = startAng + slot / usable * Math.PI * 2;
        const r = Math.max(n.seedR || 115, 110) + same * 40;
        n.x = c2.x + Math.cos(ang) * r;
        n.y = c2.y + Math.sin(ang) * r;
      });
      const queue = roots.map((n) => n.id);
      while (queue.length) {
        const pid = queue.shift();
        const kids = (childrenOf[pid] || []).map((e) => byId[e.id]);
        if (!kids.length) continue;
        const parent = byId[pid];
        const outward = Math.atan2(parent.y - c2.y, parent.x - c2.x);
        const arc = Math.min(Math.PI * 1.05, Math.PI * 0.35 + kids.length * 0.22);
        kids.forEach((n, i) => {
          const t = kids.length === 1 ? 0.5 : i / (kids.length - 1);
          const ang = outward - arc / 2 + t * arc;
          const r = 78;
          n.x = parent.x + Math.cos(ang) * r;
          n.y = parent.y + Math.sin(ang) * r;
          queue.push(n.id);
        });
      }
    });
    nodes.forEach((n) => {
      if (n.kind === "hub") {
        n.x = n.fx;
        n.y = n.fy;
        return;
      }
      n.x = Math.max(MAP_PAD, Math.min(MAP_W - MAP_PAD, n.x));
      n.y = Math.max(MAP_PAD, Math.min(MAP_H - MAP_PAD, n.y));
    });
    entities.forEach((e) => {
      const n = byId[e.id];
      clusters.forEach((c2) => {
        if (c2.id === e.cluster) return;
        const dx = n.x - c2.x;
        const dy = n.y - c2.y;
        const d = Math.hypot(dx, dy) || 0.01;
        const excl = c2.isHub ? 130 : 115;
        if (d < excl) {
          n.x = c2.x + dx / d * excl;
          n.y = c2.y + dy / d * excl;
        }
      });
    });
    for (let pass = 0; pass < 8; pass++) {
      for (let i = 0; i < entities.length; i++) {
        for (let j = i + 1; j < entities.length; j++) {
          const a2 = byId[entities[i].id];
          const b = byId[entities[j].id];
          const dx = b.x - a2.x;
          const dy = b.y - a2.y;
          const d = Math.hypot(dx, dy) || 0.01;
          const minD = entities[i].cluster === entities[j].cluster ? 58 : 52;
          if (d < minD) {
            const push = (minD - d) / d * 0.5;
            const ux = dx * push;
            const uy = dy * push;
            a2.x -= ux;
            a2.y -= uy;
            b.x += ux;
            b.y += uy;
          }
        }
      }
    }
    nodes.forEach((n) => {
      if (n.kind === "hub") {
        n.x = n.fx;
        n.y = n.fy;
        return;
      }
      n.x = Math.max(MAP_PAD, Math.min(MAP_W - MAP_PAD, n.x));
      n.y = Math.max(MAP_PAD, Math.min(MAP_H - MAP_PAD, n.y));
    });
    return clusters.map((c2) => {
      const cNodes = entities.filter((e) => e.cluster === c2.id).map((e) => ({
        ...e,
        sideId: c2.id,
        x: byId[e.id].x,
        y: byId[e.id].y
      }));
      const radius = cNodes.reduce((m2, n) => Math.max(m2, Math.hypot(n.x - c2.x, n.y - c2.y)), 0) + 40;
      return {
        ...c2,
        anchor: { x: c2.x, y: c2.y },
        radius: Math.max(radius, 140),
        labelY: c2.y - Math.max(radius, 140) - 18,
        nodes: cNodes
      };
    });
  }
  var networkGraph = layoutNetworkGraph(
    networkClusters,
    networkEntities,
    influenceEdges,
    membershipEdges,
    hubLinkPairs
  );
  function nodeLabelLines(label, maxChars = 18) {
    if (label.length <= maxChars) return [label];
    const words = label.split(" ");
    const mid = Math.ceil(words.length / 2);
    return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
  }
  function nodeBox(node) {
    const lines = node.lines || nodeLabelLines(node.label);
    const rw = node.rw ?? Math.min(132, Math.max(88, ...lines.map((l) => l.length * 6.6 + 16)));
    const rh = node.rh ?? (lines.length > 1 ? 32 : 26);
    return { lines, rw, rh, hw: rw / 2, hh: rh / 2 };
  }
  function cardSideAnchors(node) {
    const { hw, hh } = nodeBox(node);
    return {
      n: { x: node.x, y: node.y - hh, side: "n" },
      e: { x: node.x + hw, y: node.y, side: "e" },
      s: { x: node.x, y: node.y + hh, side: "s" },
      w: { x: node.x - hw, y: node.y, side: "w" }
    };
  }
  function outwardNormal(side) {
    if (side === "n") return { x: 0, y: -1 };
    if (side === "e") return { x: 1, y: 0 };
    if (side === "s") return { x: 0, y: 1 };
    return { x: -1, y: 0 };
  }
  function routeBetweenCards(a2, b, { curve = true } = {}) {
    const A = cardSideAnchors(a2);
    const B = cardSideAnchors(b);
    const sides = ["n", "e", "s", "w"];
    let best = null;
    for (const sa of sides) {
      for (const sb of sides) {
        const pa = A[sa];
        const pb = B[sb];
        const dx = pb.x - pa.x;
        const dy = pb.y - pa.y;
        const dist = Math.hypot(dx, dy) || 1;
        const na2 = outwardNormal(sa);
        const nb2 = outwardNormal(sb);
        const leave = (dx * na2.x + dy * na2.y) / dist;
        const arrive = (-dx * nb2.x - dy * nb2.y) / dist;
        const score = leave * 1.35 + arrive * 1.35 - dist / 2400;
        if (!best || score > best.score) {
          best = { from: pa, to: pb, fromSide: sa, toSide: sb, score, dist };
        }
      }
    }
    const na = outwardNormal(best.fromSide);
    const nb = outwardNormal(best.toSide);
    const pad = 2;
    const x1 = best.from.x + na.x * pad;
    const y1 = best.from.y + na.y * pad;
    const tipClear = curve ? 1 : 0;
    const x22 = best.to.x + nb.x * tipClear;
    const y22 = best.to.y + nb.y * tipClear;
    let d;
    if (curve) {
      const mx = (x1 + x22) / 2;
      const my = (y1 + y22) / 2;
      const bow = 0.1;
      const cx = mx - (y22 - y1) * bow;
      const cy = my + (x22 - x1) * bow;
      d = `M ${x1} ${y1} Q ${cx} ${cy} ${x22} ${y22}`;
    } else {
      d = `M ${x1} ${y1} L ${x22} ${y22}`;
    }
    return {
      x1,
      y1,
      x2: x22,
      y2: y22,
      fromSide: best.fromSide,
      toSide: best.toSide,
      d
    };
  }
  var sideById = Object.fromEntries(networkGraph.map((s) => [s.id, s]));
  var nodeById = (() => {
    const map = {};
    for (const side of networkGraph) {
      for (const node of side.nodes) {
        const box = nodeBox(node);
        map[node.id] = {
          ...node,
          ...box,
          sideId: side.id,
          sideName: side.name,
          color: side.color
        };
      }
    }
    return map;
  })();
  function StakeholderMapPage() {
    const [focusMode, setFocusMode] = useState("structure");
    const [activeTypeId, setActiveTypeId] = useState("emotional");
    const [activeSideId, setActiveSideId] = useState("app");
    const [activeNodeId, setActiveNodeId] = useState(null);
    const [selectedEdgeKey, setSelectedEdgeKey] = useState(null);
    const [hoverEdge, setHoverEdge] = useState(null);
    const [gapOpportunityFilter, setGapOpportunityFilter] = useState("all");
    const [gapMajorOnly, setGapMajorOnly] = useState(true);
    const [activeGapId, setActiveGapId] = useState(null);
    const [view, setView] = useState(null);
    const [isPanning, setIsPanning] = useState(false);
    const mapRef = useRef(null);
    const svgRef = useRef(null);
    const panRef = useRef(null);
    const width = MAP_W;
    const height = MAP_H;
    const activeType = influenceTypeById[activeTypeId] || influenceTypes[0];
    const activeSide = sideById[activeSideId] || sideById.app;
    const activeNode = activeNodeId ? nodeById[activeNodeId] : null;
    function edgeKey(e) {
      return `${e.from}|${e.to}|${e.type}`;
    }
    const selectedEdge = selectedEdgeKey ? influenceEdges.find((e) => edgeKey(e) === selectedEdgeKey) || null : null;
    const typedEdges = influenceEdges.filter((e) => e.type === activeTypeId);
    const nodeFocusEdges = activeNodeId ? influenceEdges.filter((e) => e.from === activeNodeId || e.to === activeNodeId) : [];
    const sideNodeIds = new Set((activeSide?.nodes || []).map((n) => n.id));
    const sideFocusEdges = influenceEdges.filter(
      (e) => sideNodeIds.has(e.from) || sideNodeIds.has(e.to)
    );
    const filteredAsymmetryGaps = influenceAsymmetryGaps.filter((gap) => {
      if (gapMajorOnly && !gap.major) return false;
      if (gapOpportunityFilter === "all") return true;
      return gap.primaryOpportunity === gapOpportunityFilter || gap.secondaryOpportunity === gapOpportunityFilter;
    });
    const activeGap = activeGapId ? asymmetryGapById[activeGapId] || null : null;
    const gapFocusList = activeGap && filteredAsymmetryGaps.some((g) => g.id === activeGap.id) ? [activeGap] : filteredAsymmetryGaps;
    const gapFocusEdges = gapFocusList.flatMap((g) => g.forwardEdges);
    const gapIndex = activeGapId ? filteredAsymmetryGaps.findIndex((g) => g.id === activeGapId) : -1;
    const litNodeIds = (() => {
      const set2 = /* @__PURE__ */ new Set();
      if (focusMode === "structure") {
        networkEntities.forEach((e) => set2.add(e.id));
        return set2;
      }
      if (focusMode === "gaps") {
        gapFocusEdges.forEach((e) => {
          set2.add(e.from);
          set2.add(e.to);
        });
        return set2;
      }
      if (selectedEdge) {
        set2.add(selectedEdge.from);
        set2.add(selectedEdge.to);
        return set2;
      }
      if (focusMode === "type") {
        typedEdges.forEach((e) => {
          set2.add(e.from);
          set2.add(e.to);
        });
      } else if (focusMode === "side") {
        if (activeNodeId) {
          set2.add(activeNodeId);
          nodeFocusEdges.forEach((e) => {
            set2.add(e.from);
            set2.add(e.to);
          });
        } else {
          sideNodeIds.forEach((id) => set2.add(id));
          sideFocusEdges.forEach((e) => {
            set2.add(e.from);
            set2.add(e.to);
          });
        }
      } else {
        influenceEdges.forEach((e) => {
          set2.add(e.from);
          set2.add(e.to);
        });
      }
      return set2;
    })();
    const focusSideIds = (() => {
      if (focusMode === "structure" || focusMode === "overview") {
        return networkGraph.map((s) => s.id);
      }
      if (focusMode === "side") return [activeSideId];
      if (focusMode === "type") {
        const sides = /* @__PURE__ */ new Set();
        typedEdges.forEach((e) => {
          const a2 = nodeById[e.from];
          const b = nodeById[e.to];
          if (a2) sides.add(a2.sideId);
          if (b) sides.add(b.sideId);
        });
        return [...sides];
      }
      if (focusMode === "gaps") {
        const sides = /* @__PURE__ */ new Set();
        gapFocusEdges.forEach((e) => {
          const a2 = nodeById[e.from];
          const b = nodeById[e.to];
          if (a2) sides.add(a2.sideId);
          if (b) sides.add(b.sideId);
        });
        return sides.size ? [...sides] : networkGraph.map((s) => s.id);
      }
      return networkGraph.map((s) => s.id);
    })();
    const focusSet = new Set(focusSideIds);
    const showInfluence = focusMode !== "structure";
    const visibleEdges = (() => {
      if (!showInfluence) return [];
      if (focusMode === "gaps") {
        if (selectedEdge && gapFocusEdges.some((e) => edgeKey(e) === edgeKey(selectedEdge))) {
          return [selectedEdge];
        }
        return gapFocusEdges;
      }
      if (selectedEdge) {
        if (focusMode === "side" && activeNodeId) return nodeFocusEdges;
        if (focusMode === "side") return sideFocusEdges;
        return typedEdges.length ? typedEdges : influenceEdges.filter((e) => e.type === selectedEdge.type);
      }
      if (focusMode === "side") {
        if (activeNodeId) return nodeFocusEdges;
        return sideFocusEdges;
      }
      return typedEdges;
    })();
    const focusBounds = (() => {
      const pts = [];
      if (selectedEdge) {
        if (nodeById[selectedEdge.from]) pts.push(nodeById[selectedEdge.from]);
        if (nodeById[selectedEdge.to]) pts.push(nodeById[selectedEdge.to]);
      } else if (focusMode === "gaps" && activeGap) {
        if (nodeById[activeGap.from]) pts.push(nodeById[activeGap.from]);
        if (nodeById[activeGap.to]) pts.push(nodeById[activeGap.to]);
      } else if (focusMode === "gaps") {
        gapFocusEdges.forEach((e) => {
          if (nodeById[e.from]) pts.push(nodeById[e.from]);
          if (nodeById[e.to]) pts.push(nodeById[e.to]);
        });
      } else if (focusMode === "side" && activeNodeId && nodeById[activeNodeId]) {
        pts.push(nodeById[activeNodeId]);
        nodeFocusEdges.forEach((e) => {
          if (nodeById[e.from]) pts.push(nodeById[e.from]);
          if (nodeById[e.to]) pts.push(nodeById[e.to]);
        });
      } else if (focusMode === "type") {
        typedEdges.forEach((e) => {
          if (nodeById[e.from]) pts.push(nodeById[e.from]);
          if (nodeById[e.to]) pts.push(nodeById[e.to]);
        });
      } else if (focusMode === "side") {
        (activeSide?.nodes || []).forEach((n) => {
          if (nodeById[n.id]) pts.push(nodeById[n.id]);
        });
      } else {
        for (const sid of focusSideIds) {
          const side = sideById[sid];
          if (!side) continue;
          pts.push(side.anchor);
          side.nodes.forEach((n) => pts.push(n));
        }
      }
      if (!pts.length) return { cx: width / 2, cy: height / 2, scale: 1 };
      const xs = pts.map((p) => p.x);
      const ys = pts.map((p) => p.y);
      const pad = selectedEdge ? 100 : focusMode === "gaps" && activeGap ? 110 : activeNodeId ? 130 : focusMode === "side" ? 140 : focusMode === "structure" ? 90 : focusMode === "gaps" ? 120 : 110;
      const minX = Math.min(...xs) - pad;
      const maxX = Math.max(...xs) + pad;
      const minY = Math.min(...ys) - pad;
      const maxY = Math.max(...ys) + pad;
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      const minSpan = selectedEdge ? 200 : focusMode === "gaps" && activeGap ? 220 : activeNodeId ? 260 : 340;
      const bw = Math.max(maxX - minX, minSpan);
      const bh = Math.max(maxY - minY, minSpan * 0.85);
      const fit = Math.min(width / bw, height / bh);
      let bias;
      let maxScale;
      if (selectedEdge) {
        bias = 1.25;
        maxScale = 2.6;
      } else if (focusMode === "gaps" && activeGap) {
        bias = 1.2;
        maxScale = 2.4;
      } else if (activeNodeId) {
        bias = 1.22;
        maxScale = 2.2;
      } else if (focusMode === "side") {
        bias = 1.12;
        maxScale = 1.75;
      } else if (focusMode === "type") {
        bias = 1.05;
        maxScale = 1.55;
      } else if (focusMode === "structure") {
        bias = 1.08;
        maxScale = 1.35;
      } else {
        bias = 1.02;
        maxScale = 1.25;
      }
      return { cx, cy, scale: Math.min(fit * bias, maxScale) };
    })();
    const cam = view || focusBounds;
    const cameraStyle = {
      transform: `translate(${width / 2}px, ${height / 2}px) scale(${cam.scale}) translate(${-cam.cx}px, ${-cam.cy}px)`,
      transformOrigin: "0px 0px",
      transition: isPanning || view ? "none" : "transform 0.45s ease"
    };
    function clientToSvg(clientX, clientY) {
      const svg = svgRef.current;
      if (!svg) return { x: width / 2, y: height / 2 };
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return { x: width / 2, y: height / 2 };
      const p = pt.matrixTransform(ctm.inverse());
      return { x: p.x, y: p.y };
    }
    function svgToWorld(sx, sy, camera) {
      return {
        x: (sx - width / 2) / camera.scale + camera.cx,
        y: (sy - height / 2) / camera.scale + camera.cy
      };
    }
    function clampScale(s) {
      return Math.min(3.2, Math.max(0.22, s));
    }
    const viewRef = useRef(view);
    const focusRef = useRef(focusBounds);
    viewRef.current = view;
    focusRef.current = focusBounds;
    function currentCamera() {
      return viewRef.current || focusRef.current;
    }
    function fitView() {
      setView(null);
      setIsPanning(false);
    }
    useEffect(() => {
      const el = mapRef.current;
      if (!el) return void 0;
      function onWheel(event) {
        event.preventDefault();
        const svgPt = clientToSvg(event.clientX, event.clientY);
        const current = currentCamera();
        const world = svgToWorld(svgPt.x, svgPt.y, current);
        const intensity = Math.min(Math.abs(event.deltaY) / 80, 3) * 2;
        const zoomIn = event.deltaY < 0;
        const nextScale = clampScale(
          current.scale * (zoomIn ? Math.pow(1.09, intensity) : Math.pow(0.91, intensity))
        );
        setView({
          scale: nextScale,
          cx: world.x - (svgPt.x - width / 2) / nextScale,
          cy: world.y - (svgPt.y - height / 2) / nextScale
        });
      }
      el.addEventListener("wheel", onWheel, { passive: false });
      return () => el.removeEventListener("wheel", onWheel);
    }, [width, height]);
    function onMapPointerDown(event) {
      if (event.button !== 0 && event.button !== 1) return;
      const target = event.target;
      if (target.closest && target.closest(
        ".stakeholder-map__node, .stakeholder-map__influence-hit, .stakeholder-map__cluster, button, a"
      )) {
        return;
      }
      event.preventDefault();
      const current = currentCamera();
      panRef.current = {
        pointerId: event.pointerId,
        lastX: event.clientX,
        lastY: event.clientY,
        cx: current.cx,
        cy: current.cy,
        scale: current.scale
      };
      setIsPanning(true);
      setView({ cx: current.cx, cy: current.cy, scale: current.scale });
      event.currentTarget.setPointerCapture?.(event.pointerId);
    }
    function onMapPointerMove(event) {
      const pan = panRef.current;
      if (!pan || pan.pointerId !== event.pointerId) return;
      const svg = svgRef.current;
      const rect = svg?.getBoundingClientRect();
      const sx = rect ? width / rect.width : 1;
      const sy = rect ? height / rect.height : 1;
      const dx = (event.clientX - pan.lastX) * sx;
      const dy = (event.clientY - pan.lastY) * sy;
      pan.lastX = event.clientX;
      pan.lastY = event.clientY;
      pan.cx -= dx / pan.scale;
      pan.cy -= dy / pan.scale;
      setView({ cx: pan.cx, cy: pan.cy, scale: pan.scale });
    }
    function onMapPointerUp(event) {
      if (!panRef.current || panRef.current.pointerId !== event.pointerId) return;
      panRef.current = null;
      setIsPanning(false);
      try {
        event.currentTarget.releasePointerCapture?.(event.pointerId);
      } catch (_) {
      }
    }
    function goStructure() {
      setFocusMode("structure");
      setActiveNodeId(null);
      setSelectedEdgeKey(null);
      setActiveGapId(null);
      setView(null);
    }
    function goOverview() {
      setFocusMode("overview");
      setActiveNodeId(null);
      setSelectedEdgeKey(null);
      setActiveGapId(null);
      setView(null);
    }
    function goType(typeId) {
      setFocusMode("type");
      setActiveTypeId(typeId);
      setActiveNodeId(null);
      setSelectedEdgeKey(null);
      setActiveGapId(null);
      setView(null);
    }
    function goSide(sideId) {
      setFocusMode("side");
      setActiveSideId(sideId);
      setActiveNodeId(null);
      setSelectedEdgeKey(null);
      setActiveGapId(null);
      setView(null);
    }
    function goNode(nodeId, sideId) {
      setFocusMode("side");
      setActiveSideId(sideId);
      setActiveNodeId(nodeId);
      setSelectedEdgeKey(null);
      setActiveGapId(null);
      setView(null);
    }
    function goGaps() {
      setFocusMode("gaps");
      setActiveNodeId(null);
      setSelectedEdgeKey(null);
      setActiveGapId(null);
      setView(null);
    }
    function focusGap(gapId) {
      const gap = asymmetryGapById[gapId];
      if (!gap) return;
      setFocusMode("gaps");
      setActiveNodeId(null);
      setSelectedEdgeKey(null);
      setActiveGapId(gapId);
      if (gap.forwardEdges?.[0]) {
        setActiveTypeId(gap.forwardEdges[0].type);
      }
      setView(null);
    }
    function selectGap(gapId) {
      if (activeGapId === gapId) {
        setActiveGapId(null);
        setSelectedEdgeKey(null);
        setView(null);
        return;
      }
      focusGap(gapId);
    }
    function selectEdge(edge) {
      const key = edgeKey(edge);
      if (selectedEdgeKey === key) {
        setSelectedEdgeKey(null);
        if (focusMode !== "gaps") setView(null);
        return;
      }
      setSelectedEdgeKey(key);
      setActiveTypeId(edge.type);
      setActiveNodeId(null);
      if (focusMode === "gaps") {
        setActiveGapId(`${edge.from}|${edge.to}`);
        setView(null);
        return;
      }
      setActiveGapId(null);
      setFocusMode("overview");
      setView(null);
    }
    const typeIndex = influenceTypes.findIndex((t) => t.id === activeTypeId);
    const sideIndex = networkGraph.findIndex((s) => s.id === activeSideId);
    function stepPart(delta) {
      if (focusMode === "structure") {
        return;
      }
      if (focusMode === "gaps") {
        if (!filteredAsymmetryGaps.length) return;
        const base = gapIndex >= 0 ? gapIndex : 0;
        const next2 = filteredAsymmetryGaps[(base + delta + filteredAsymmetryGaps.length) % filteredAsymmetryGaps.length];
        selectGap(next2.id);
        return;
      }
      if (focusMode === "side") {
        const next2 = networkGraph[(sideIndex + delta + networkGraph.length) % networkGraph.length];
        goSide(next2.id);
        return;
      }
      const next = influenceTypes[(typeIndex + delta + influenceTypes.length) % influenceTypes.length];
      if (focusMode === "overview") {
        setActiveTypeId(next.id);
      } else {
        goType(next.id);
      }
    }
    const detailEdges = !showInfluence ? [] : focusMode === "gaps" ? gapFocusEdges : selectedEdge ? [selectedEdge] : focusMode === "side" ? activeNodeId ? nodeFocusEdges : sideFocusEdges : typedEdges;
    const title = focusMode === "structure" ? "Category structure" : focusMode === "gaps" ? activeGap ? `${nodeById[activeGap.from]?.label || activeGap.from} \u2192 ${nodeById[activeGap.to]?.label || activeGap.to}` : "One-way influence" : selectedEdge ? `${nodeById[selectedEdge.from]?.label || selectedEdge.from} \u2192 ${nodeById[selectedEdge.to]?.label || selectedEdge.to}` : focusMode === "side" ? activeNode ? activeNode.label : activeSide.shortName : focusMode === "type" ? `${activeType.label} influence` : "Stakeholder analysis";
    const subtitle = focusMode === "structure" ? "Gray lines: cluster \u2192 category \u2192 brand. No influence arrows." : focusMode === "gaps" ? activeGap ? `No reverse edge \xB7 ${opportunityKindById[activeGap.primaryOpportunity]?.label || "action"}` : `${influenceAsymmetryGaps.length} one-way pairs \xB7 ${majorAsymmetryGaps.length} marked major` : selectedEdge ? `${influenceTypeById[selectedEdge.type]?.label || selectedEdge.type} \xB7 this edge only` : focusMode === "side" ? activeNode ? "Influence that touches this entity" : `${activeSide.name} \xB7 edges that touch this group` : focusMode === "type" ? `${activeType.label} influence only \xB7 gray structure always visible` : "Gray = structure \xB7 color = influence \xB7 filter by type";
    return /* @__PURE__ */ React.createElement("section", { className: "report-section stakeholder-page", id: "stakeholder-map" }, /* @__PURE__ */ React.createElement("div", { className: "stakeholder-shell", "aria-label": "Cosmos stakeholder analysis" }, /* @__PURE__ */ React.createElement("header", { className: "stakeholder-frame__head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "stakeholder-kicker" }, focusMode === "gaps" ? "06 \xB7 One-way gaps \xB7 where Cosmos can act" : "06 \xB7 Structure + influence"), /* @__PURE__ */ React.createElement("h1", null, title)), /* @__PURE__ */ React.createElement("p", { className: "stakeholder-lede" }, subtitle)), /* @__PURE__ */ React.createElement("div", { className: "stakeholder-frame__toolbar" }, /* @__PURE__ */ React.createElement("div", { className: "stakeholder-frame__mode-tabs", role: "tablist", "aria-label": "Focus mode" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: focusMode === "structure" ? "is-active" : "", onClick: goStructure }, "Structure"), /* @__PURE__ */ React.createElement("button", { type: "button", className: focusMode === "overview" ? "is-active" : "", onClick: goOverview }, "+ Influence"), /* @__PURE__ */ React.createElement("button", { type: "button", className: focusMode === "type" ? "is-active" : "", onClick: () => goType(activeTypeId) }, "By type"), /* @__PURE__ */ React.createElement("button", { type: "button", className: focusMode === "side" ? "is-active" : "", onClick: () => goSide(activeSideId) }, "By group"), /* @__PURE__ */ React.createElement("button", { type: "button", className: focusMode === "gaps" ? "is-active" : "", onClick: goGaps }, "Gaps")), /* @__PURE__ */ React.createElement("div", { className: "stakeholder-frame__stepper" }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => stepPart(-1), "aria-label": "Previous", disabled: focusMode === "structure" }, "\u2190"), /* @__PURE__ */ React.createElement("span", null, focusMode === "structure" ? "Structure" : focusMode === "gaps" ? filteredAsymmetryGaps.length ? `${gapIndex >= 0 ? gapIndex + 1 : "\u2014"} / ${filteredAsymmetryGaps.length}` : "0 gaps" : focusMode === "side" ? `${sideIndex + 1} / ${networkGraph.length}` : `${typeIndex + 1} / ${influenceTypes.length}`), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => stepPart(1), "aria-label": "Next", disabled: focusMode === "structure" }, "\u2192"), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: fitView, title: "Fit current focus in view" }, "Fit"))), /* @__PURE__ */ React.createElement("div", { className: "stakeholder-map-legend", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("span", { className: "stakeholder-map-legend__item" }, /* @__PURE__ */ React.createElement("i", { className: "stakeholder-map-legend__rel" }), "Structure (gray): hub \u2192 category \u2192 brand"), showInfluence && focusMode !== "gaps" && /* @__PURE__ */ React.createElement("span", { className: "stakeholder-map-legend__item" }, /* @__PURE__ */ React.createElement("i", { className: "stakeholder-map-legend__inf" }), "Influence (color): click an edge"), focusMode === "gaps" && /* @__PURE__ */ React.createElement("span", { className: "stakeholder-map-legend__item" }, /* @__PURE__ */ React.createElement("i", { className: "stakeholder-map-legend__inf" }), "One-way only \xB7 click a card or edge")), focusMode === "gaps" && /* @__PURE__ */ React.createElement("div", { className: "stakeholder-frame__gap-filters", "aria-label": "Asymmetry gap filters" }, /* @__PURE__ */ React.createElement("div", { className: "stakeholder-frame__gap-filter-row", role: "tablist", "aria-label": "Opportunity kind" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: gapOpportunityFilter === "all" ? "is-active" : "",
        onClick: () => {
          setGapOpportunityFilter("all");
          setActiveGapId(null);
          setSelectedEdgeKey(null);
          setView(null);
        }
      },
      "All kinds"
    ), opportunityKinds.map((kind) => /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        key: kind.id,
        className: gapOpportunityFilter === kind.id ? "is-active" : "",
        onClick: () => {
          setGapOpportunityFilter(kind.id);
          setActiveGapId(null);
          setSelectedEdgeKey(null);
          setView(null);
        },
        title: kind.desc
      },
      /* @__PURE__ */ React.createElement("i", { className: "stakeholder-type-swatch", style: { background: kind.color } }),
      kind.label
    ))), /* @__PURE__ */ React.createElement("label", { className: "stakeholder-frame__gap-major" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "checkbox",
        checked: gapMajorOnly,
        onChange: (event) => {
          setGapMajorOnly(event.target.checked);
          setActiveGapId(null);
          setSelectedEdgeKey(null);
          setView(null);
        }
      }
    ), "Major only", /* @__PURE__ */ React.createElement("span", null, majorAsymmetryGaps.length, " of ", influenceAsymmetryGaps.length, " one-way pairs"))), showInfluence && focusMode !== "gaps" && /* @__PURE__ */ React.createElement("div", { className: "stakeholder-frame__chain-tabs stakeholder-frame__type-tabs", role: "tablist", "aria-label": "Influence types" }, influenceTypes.map((t) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: t.id,
        type: "button",
        role: "tab",
        "aria-selected": t.id === activeTypeId,
        className: t.id === activeTypeId && focusMode !== "side" ? "is-active" : "",
        style: {
          borderColor: t.id === activeTypeId ? t.color : void 0,
          color: t.id === activeTypeId ? t.color : void 0
        },
        onClick: () => goType(t.id)
      },
      /* @__PURE__ */ React.createElement("i", { className: "stakeholder-type-swatch", style: { background: t.color } }),
      t.label
    ))), focusMode === "side" && /* @__PURE__ */ React.createElement("div", { className: "stakeholder-frame__side-tabs stakeholder-frame__side-tabs--bar", role: "tablist", "aria-label": "Sides" }, networkGraph.map((side) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: side.id,
        type: "button",
        className: activeSideId === side.id ? "is-active" : "",
        onClick: () => goSide(side.id)
      },
      side.number,
      " \xB7 ",
      side.shortName
    ))), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `stakeholder-frame__map stakeholder-frame__map--page ${isPanning ? "is-panning" : ""}`,
        ref: mapRef,
        onPointerDown: onMapPointerDown,
        onPointerMove: onMapPointerMove,
        onPointerUp: onMapPointerUp,
        onPointerCancel: onMapPointerUp,
        onDoubleClick: (event) => {
          if (event.target.closest && event.target.closest(".stakeholder-map__node, .stakeholder-map__influence-hit")) {
            return;
          }
          fitView();
        }
      },
      /* @__PURE__ */ React.createElement(
        "svg",
        {
          ref: svgRef,
          className: "stakeholder-map",
          viewBox: `0 0 ${width} ${height}`,
          preserveAspectRatio: "xMidYMid meet"
        },
        /* @__PURE__ */ React.createElement("defs", null, influenceTypes.map((t) => /* @__PURE__ */ React.createElement(
          "marker",
          {
            key: `arrow-${t.id}`,
            id: `inf-arrow-${t.id}`,
            viewBox: "0 0 12 12",
            refX: "11",
            refY: "6",
            markerWidth: "11",
            markerHeight: "11",
            markerUnits: "userSpaceOnUse",
            orient: "auto-start-reverse"
          },
          /* @__PURE__ */ React.createElement("path", { d: "M 0 1.5 L 11 6 L 0 10.5 z", fill: t.color })
        ))),
        /* @__PURE__ */ React.createElement(
          "rect",
          {
            className: "stakeholder-map__pan-surface",
            x: 0,
            y: 0,
            width,
            height,
            fill: "transparent"
          }
        ),
        /* @__PURE__ */ React.createElement("g", { className: "stakeholder-map__camera", style: cameraStyle }, (() => {
          const influenceFocus = Boolean(selectedEdge || showInfluence && activeNodeId);
          const relOpacityHub = influenceFocus ? 0.1 : 0.45;
          const relOpacityTree = influenceFocus ? 0.12 : 0.5;
          const hubFill = influenceFocus ? "#f6f5f2" : "#eceae4";
          const hubStroke = influenceFocus ? "#c9c6be" : "#7a7770";
          const hubText = influenceFocus ? "#b0ada5" : "#4a4842";
          return /* @__PURE__ */ React.createElement(React.Fragment, null, relationshipEdges.map((edge) => {
            if (edge.rel === "hub") {
              const sa = sideById[edge.fromCluster];
              const sb = sideById[edge.toCluster];
              if (!sa || !sb) return null;
              const dx = sb.anchor.x - sa.anchor.x;
              const dy = sb.anchor.y - sa.anchor.y;
              const len = Math.hypot(dx, dy) || 1;
              const ux = dx / len;
              const uy = dy / len;
              const trim = 28;
              const x1 = sa.anchor.x + ux * trim;
              const y1 = sa.anchor.y + uy * trim;
              const x22 = sb.anchor.x - ux * trim;
              const y22 = sb.anchor.y - uy * trim;
              return /* @__PURE__ */ React.createElement(
                "line",
                {
                  key: `rel-hub-${edge.fromCluster}-${edge.toCluster}`,
                  x1,
                  y1,
                  x2: x22,
                  y2: y22,
                  stroke: "#8a8780",
                  strokeWidth: 2.2,
                  strokeLinecap: "round",
                  opacity: relOpacityHub,
                  className: "stakeholder-map__relationship stakeholder-map__relationship--hub"
                }
              );
            }
            let a2;
            let b = nodeById[edge.to];
            if (!b) return null;
            if (edge.rel === "cluster" && edge.clusterId) {
              const side = sideById[edge.clusterId];
              if (!side) return null;
              a2 = {
                x: side.anchor.x,
                y: side.anchor.y,
                hw: 26,
                hh: 26,
                lines: [side.shortName],
                rw: 52,
                rh: 52
              };
            } else {
              a2 = nodeById[edge.from];
            }
            if (!a2) return null;
            const route = routeBetweenCards(a2, b, { curve: false });
            return /* @__PURE__ */ React.createElement(
              "path",
              {
                key: `rel-${edge.from}-${edge.to}`,
                d: route.d,
                fill: "none",
                stroke: "#8a8780",
                strokeWidth: edge.rel === "cluster" ? 2 : 1.65,
                strokeLinecap: "round",
                opacity: relOpacityTree,
                className: "stakeholder-map__relationship"
              }
            );
          }), networkGraph.map((side) => {
            const isActive = activeSideId === side.id && focusMode === "side";
            const hubR = 26;
            return /* @__PURE__ */ React.createElement(
              "g",
              {
                key: `rel-hub-${side.id}`,
                className: `stakeholder-map__rel-hub ${isActive ? "is-active" : ""}`,
                transform: `translate(${side.anchor.x}, ${side.anchor.y})`,
                onClick: () => goSide(side.id),
                style: { cursor: "pointer" },
                opacity: influenceFocus ? 0.45 : 1
              },
              /* @__PURE__ */ React.createElement(
                "circle",
                {
                  r: hubR,
                  fill: hubFill,
                  stroke: isActive ? "#f14f9b" : hubStroke,
                  strokeWidth: isActive ? 2.2 : 1.6
                }
              ),
              /* @__PURE__ */ React.createElement(
                "text",
                {
                  y: -3,
                  textAnchor: "middle",
                  dominantBaseline: "middle",
                  className: "stakeholder-map__rel-hub-num",
                  fill: hubText
                },
                side.number
              ),
              /* @__PURE__ */ React.createElement(
                "text",
                {
                  y: 10,
                  textAnchor: "middle",
                  dominantBaseline: "middle",
                  className: "stakeholder-map__rel-hub-name",
                  fill: hubText
                },
                side.shortName
              )
            );
          }));
        })(), visibleEdges.map((edge, i) => {
          const a2 = nodeById[edge.from];
          const b = nodeById[edge.to];
          if (!a2 || !b) return null;
          const typeMeta = influenceTypeById[edge.type];
          const route = routeBetweenCards(a2, b, { curve: true });
          const isSelected = selectedEdgeKey === edgeKey(edge);
          const isHover = hoverEdge && hoverEdge.edge === edge;
          const muted = selectedEdgeKey && !isSelected;
          return /* @__PURE__ */ React.createElement(
            "g",
            {
              key: `inf-${edge.from}-${edge.to}-${i}`,
              className: `stakeholder-map__influence-hit ${isSelected ? "is-hot" : ""} ${muted ? "is-muted" : ""}`,
              "data-from-side": route.fromSide,
              "data-to-side": route.toSide,
              onMouseEnter: (event) => {
                const rect = mapRef.current?.getBoundingClientRect();
                if (!rect) return;
                setHoverEdge({
                  edge,
                  x: event.clientX - rect.left,
                  y: event.clientY - rect.top
                });
              },
              onMouseMove: (event) => {
                const rect = mapRef.current?.getBoundingClientRect();
                if (!rect) return;
                setHoverEdge({
                  edge,
                  x: event.clientX - rect.left,
                  y: event.clientY - rect.top
                });
              },
              onMouseLeave: () => setHoverEdge(null),
              onClick: (event) => {
                event.stopPropagation();
                selectEdge(edge);
              },
              style: { cursor: "pointer" }
            },
            /* @__PURE__ */ React.createElement("path", { d: route.d, fill: "none", stroke: "transparent", strokeWidth: "14" }),
            /* @__PURE__ */ React.createElement(
              "path",
              {
                d: route.d,
                className: `stakeholder-map__influence is-${edge.type}`,
                fill: "none",
                stroke: typeMeta?.color || "#111c4e",
                strokeWidth: isSelected ? 3.6 : isHover ? 2.8 : 2.2,
                opacity: muted ? 0.1 : isSelected ? 1 : isHover ? 0.95 : 0.78,
                markerEnd: `url(#inf-arrow-${edge.type})`
              }
            )
          );
        }), networkGraph.flatMap(
          (side) => side.nodes.map((node) => {
            const laid = nodeById[node.id] || { ...node, ...nodeBox(node) };
            const isActive = node.id === activeNodeId;
            const lit = litNodeIds.has(node.id);
            const inFocusSide = focusSet.has(side.id);
            const isBranch = Boolean(node.parentId);
            const isGroup = membershipEdges.some((m2) => m2.from === node.id);
            const { lines, rw, rh } = laid;
            return /* @__PURE__ */ React.createElement(
              "g",
              {
                key: node.id,
                className: [
                  "stakeholder-map__node",
                  isBranch ? "is-branch" : "",
                  isGroup ? "is-group" : "",
                  isActive ? "is-active" : "",
                  lit ? "is-in-chain" : "",
                  !lit && !inFocusSide ? "is-dimmed" : !lit ? "is-soft" : ""
                ].filter(Boolean).join(" "),
                transform: `translate(${node.x}, ${node.y})`,
                onClick: (event) => {
                  event.stopPropagation();
                  goNode(node.id, side.id);
                },
                style: { cursor: "pointer" }
              },
              /* @__PURE__ */ React.createElement(
                "rect",
                {
                  x: -rw / 2,
                  y: -rh / 2,
                  width: rw,
                  height: rh,
                  rx: isBranch ? 14 : 8,
                  fill: side.isHub ? "#f2f04f" : isGroup ? "#fff8e8" : "#fffef9",
                  stroke: isActive ? "#f14f9b" : side.isHub ? "#111c4e" : side.color,
                  strokeWidth: isActive ? 2.2 : isGroup ? 1.8 : 1.4
                }
              ),
              lines.map((line, li) => /* @__PURE__ */ React.createElement(
                "text",
                {
                  key: li,
                  x: 0,
                  y: (li - (lines.length - 1) / 2) * 12,
                  textAnchor: "middle",
                  dominantBaseline: "middle",
                  className: "stakeholder-map__node-label",
                  fontSize: isBranch ? 11 : 12
                },
                line
              ))
            );
          })
        ))
      ),
      hoverEdge && /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "stakeholder-edge-tooltip",
          style: { left: hoverEdge.x + 14, top: Math.max(8, hoverEdge.y - 12) },
          role: "tooltip"
        },
        /* @__PURE__ */ React.createElement("p", null, hoverEdge.edge.note)
      )
    ), /* @__PURE__ */ React.createElement("div", { className: "stakeholder-frame__detail stakeholder-frame__detail--open", "aria-live": "polite" }, /* @__PURE__ */ React.createElement("div", { className: "stakeholder-frame__detail-title" }, /* @__PURE__ */ React.createElement(
      "span",
      {
        className: "stakeholder-frame__swatch",
        style: {
          background: focusMode === "gaps" ? opportunityKindById[activeGap?.primaryOpportunity || gapOpportunityFilter]?.color || "#c43b7a" : focusMode === "type" ? activeType.color : activeNode?.color || activeSide.color
        }
      }
    ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "stakeholder-frame__group" }, focusMode === "gaps" ? activeGap ? `Score ${activeGap.score}${activeGap.major ? " \xB7 major" : ""}` : "A \u2192 B with no B \u2192 A" : focusMode === "type" ? `Influence \xB7 ${activeType.short}` : focusMode === "side" ? activeNode ? activeNode.sideName : `${activeSide.number} \xB7 ${activeSide.name}` : "All influence types"), /* @__PURE__ */ React.createElement("h2", null, title), /* @__PURE__ */ React.createElement("p", { className: "stakeholder-frame__sub" }, subtitle)), /* @__PURE__ */ React.createElement("p", { className: "stakeholder-frame__count" }, focusMode === "gaps" ? `${filteredAsymmetryGaps.length} gap${filteredAsymmetryGaps.length === 1 ? "" : "s"}` : `${detailEdges.length} edge${detailEdges.length === 1 ? "" : "s"}`)), focusMode === "gaps" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", { className: "stakeholder-frame__gap-intro" }, "A ", /* @__PURE__ */ React.createElement("strong", null, "gap"), " is influence that runs one way: A shapes B, and nothing on the map runs back. Many gaps are normal (hardware and stores constrain apps). The major ones are where Cosmos can still act \u2014 through narrative, product, targeting, partnership, policy, or a clear counter."), /* @__PURE__ */ React.createElement("div", { className: "stakeholder-frame__gap-summary", "aria-label": "Opportunity counts among filtered gaps" }, opportunityKinds.map((kind) => {
      const count = filteredAsymmetryGaps.filter(
        (g) => g.primaryOpportunity === kind.id || g.secondaryOpportunity === kind.id
      ).length;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          key: kind.id,
          className: gapOpportunityFilter === kind.id ? "is-active" : "",
          onClick: () => {
            setGapOpportunityFilter(kind.id);
            setActiveGapId(null);
            setSelectedEdgeKey(null);
            setView(null);
          }
        },
        /* @__PURE__ */ React.createElement("b", { style: { color: kind.color } }, count),
        /* @__PURE__ */ React.createElement("span", null, kind.label)
      );
    })), /* @__PURE__ */ React.createElement("div", { className: "stakeholder-frame__influence-list stakeholder-frame__gap-list" }, filteredAsymmetryGaps.length === 0 ? /* @__PURE__ */ React.createElement("p", { className: "stakeholder-frame__empty" }, "No gaps match. Turn off Major only, or pick another kind.") : filteredAsymmetryGaps.map((gap) => {
      const from = nodeById[gap.from];
      const to = nodeById[gap.to];
      const primary = opportunityKindById[gap.primaryOpportunity];
      const secondary = gap.secondaryOpportunity ? opportunityKindById[gap.secondaryOpportunity] : null;
      const isActive = activeGapId === gap.id;
      return /* @__PURE__ */ React.createElement(
        "article",
        {
          key: gap.id,
          className: `stakeholder-frame__gap-card ${isActive ? "is-active" : ""} ${gap.major ? "is-major" : ""}`
        },
        /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("div", { className: "stakeholder-frame__gap-card-title" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "stakeholder-frame__link", onClick: () => selectGap(gap.id) }, from?.label || gap.from, " \u2192 ", to?.label || gap.to), /* @__PURE__ */ React.createElement("span", { className: "stakeholder-frame__gap-score", title: "Strategic score" }, gap.major ? "Major \xB7 " : "", gap.score)), /* @__PURE__ */ React.createElement("div", { className: "stakeholder-frame__gap-tags" }, primary && /* @__PURE__ */ React.createElement("span", { className: "stakeholder-frame__gap-tag", style: { borderColor: primary.color, color: primary.color } }, primary.label), secondary && /* @__PURE__ */ React.createElement("span", { className: "stakeholder-frame__gap-tag is-secondary", style: { borderColor: secondary.color, color: secondary.color } }, secondary.label), gap.types.map((t) => /* @__PURE__ */ React.createElement("span", { key: t, className: "stakeholder-frame__gap-type", style: { color: influenceTypeById[t]?.color } }, influenceTypeById[t]?.label || t)))),
        /* @__PURE__ */ React.createElement("p", { className: "stakeholder-frame__gap-opportunity" }, gap.opportunityNote),
        /* @__PURE__ */ React.createElement("ul", { className: "stakeholder-frame__gap-forward" }, gap.forwardEdges.map((edge, i) => /* @__PURE__ */ React.createElement("li", { key: `${edge.from}-${edge.to}-${edge.type}-${i}` }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "stakeholder-frame__link", onClick: () => selectEdge(edge) }, influenceTypeById[edge.type]?.label || edge.type), /* @__PURE__ */ React.createElement("span", null, edge.note)))),
        /* @__PURE__ */ React.createElement("footer", { className: "stakeholder-frame__gap-actions" }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => selectGap(gap.id) }, isActive ? "Clear" : "Focus"), from && /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => goNode(from.id, from.sideId) }, from.label), to && /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => goNode(to.id, to.sideId) }, to.label))
      );
    })), /* @__PURE__ */ React.createElement("div", { className: "stakeholder-frame__legend stakeholder-frame__legend--influence" }, opportunityKinds.map((k) => /* @__PURE__ */ React.createElement("span", { key: k.id }, /* @__PURE__ */ React.createElement("i", { style: { borderTopColor: k.color, borderTopStyle: "solid" } }), k.label, ": ", k.short)))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "stakeholder-frame__influence-list" }, detailEdges.length === 0 ? /* @__PURE__ */ React.createElement("p", { className: "stakeholder-frame__empty" }, "No influence edges in this view. Pick another type or entity.") : detailEdges.map((edge, i) => {
      const from = nodeById[edge.from];
      const to = nodeById[edge.to];
      const typeMeta = influenceTypeById[edge.type];
      const gap = asymmetryGapById[`${edge.from}|${edge.to}`];
      return /* @__PURE__ */ React.createElement("article", { key: `${edge.from}-${edge.to}-${i}`, className: "stakeholder-frame__influence-card" }, /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("b", { style: { color: typeMeta?.color } }, typeMeta?.label || edge.type), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("button", { type: "button", className: "stakeholder-frame__link", onClick: () => from && goNode(from.id, from.sideId) }, from?.label || edge.from), " \u2192 ", /* @__PURE__ */ React.createElement("button", { type: "button", className: "stakeholder-frame__link", onClick: () => to && goNode(to.id, to.sideId) }, to?.label || edge.to))), /* @__PURE__ */ React.createElement("p", null, edge.note), gap && /* @__PURE__ */ React.createElement("p", { className: "stakeholder-frame__gap-inline" }, "One-way", gap.major ? " \xB7 major" : "", " \xB7 ", opportunityKindById[gap.primaryOpportunity]?.label || "action", " \xB7 ", /* @__PURE__ */ React.createElement("button", { type: "button", className: "stakeholder-frame__link", onClick: () => focusGap(gap.id) }, "View gap")));
    })), /* @__PURE__ */ React.createElement("div", { className: "stakeholder-frame__legend stakeholder-frame__legend--influence" }, influenceTypes.map((t) => /* @__PURE__ */ React.createElement("span", { key: t.id }, /* @__PURE__ */ React.createElement("i", { style: { borderTopColor: t.color, borderTopStyle: "solid" } }), t.label, ": ", t.short)))))), /* @__PURE__ */ React.createElement("p", { className: "waveline-share-hint" }, "Close the left rail for more map room. ", /* @__PURE__ */ React.createElement("strong", null, "Gaps"), " lists one-way influence and what Cosmos can do about it. Below: the full influence story \u2014 closed loops, mergeable one-ways, and what still missing."), /* @__PURE__ */ React.createElement(StakeholderInfluenceStory, { onGoGaps: goGaps }), /* @__PURE__ */ React.createElement("div", { className: "report-next-links" }, /* @__PURE__ */ React.createElement("a", { href: "/cosmos/storyboard/" }, "\u2190 Storyboard"), /* @__PURE__ */ React.createElement("a", { href: "/cosmos/impact-analysis/" }, "Next: Impact analysis \u2192")));
  }
  var stakeholderAlreadyThere = [
    {
      id: "ads-feeds",
      title: "Ads \u2194 feeds (closed loop)",
      merge: "Ads \u2194 feed social, plus ads \u2192 Reddit / X / TikTok \u2014 one funding engine, three brand nozzles.",
      body: "Ad money funds ranked surfaces; feeds supply inventory. This loop already exists and does not need Cosmos.",
      gapAfterMerge: "Still no product that answers \u201Cwhere is this debate?\u201D without selling attention back into the same loop."
    },
    {
      id: "feed-gravity",
      title: "Feeds \u2192 people (one-way habit)",
      merge: "Feed social, Reddit, X, TikTok \u2192 readers / intentional users / stewards \u2014 one habit stack of rank and novelty.",
      body: "Spare minutes open a ranked surface. Deep async still defaults to Reddit; urgency and short-form own the rest. Readers leave or stay; they do not rewrite the algorithm.",
      gapAfterMerge: "Still no reverse path from readers into structure \u2014 no place memory, no finite \u201CI\u2019m done,\u201D no map of the whole conversation."
    },
    {
      id: "chat-home",
      title: "Chat as community home",
      merge: "Discord \u2192 people/orgs, Slack/Teams \u2192 work, fandom/clubs \u2192 Discord \u2014 one \u201Cwhere we live\u201D gravity, chat-shaped.",
      body: "Belonging and operations already sit in Discord, Slack, and Teams. Spatial apps are not the default home.",
      gapAfterMerge: "Still no durable place for multi-voice discourse outside a thread \u2014 only chat and feeds."
    },
    {
      id: "social-vr",
      title: "Social VR = hangouts",
      merge: "VRChat, Horizon, Rec Room, social VR \u2192 Quest leisure \u2014 one play-social default for headsets.",
      body: "Headset leisure still means worlds, hangouts, and games. Calm sense-making is not what stores taught the device is for.",
      gapAfterMerge: "Still no mass expectation that a headset is for walking a discourse wall."
    },
    {
      id: "knowledge-2d",
      title: "Serious reading stays flat",
      merge: "Notion, Obsidian, Are.na, knowledge apps \u2192 readers / intentional users \u2014 one 2D knowledge home.",
      body: "Long-form and curatorial identity already have tools without a headset. \u201CSerious reading\u201D does not require VR.",
      gapAfterMerge: "Still no shared multi-voice wall that a private vault or wiki cannot be."
    },
    {
      id: "hardware-tax",
      title: "Hardware and OS tax the body",
      merge: "Quest / Pico / Vision / PCVR / Index / glasses + OS/SDK \u2192 readers and interaction \u2014 one access and input tax with device flavors.",
      body: "Weight, heat, price, setup, and API limits shape every session before content appears. People rarely reshape the silicon roadmap.",
      gapAfterMerge: "Still no way around the body tax unless the product designs for short, interrupted, non-desk use \u2014 or leaves the headset."
    },
    {
      id: "store-ai",
      title: "Stores and cloud AI as gates",
      merge: "Store tax loops (Meta / Pico / Apple \u2194 team) plus store \u2192 onboarding; cloud AI \u2192 product systems, team pays models.",
      body: "Distribution and intelligence already run as one-way or fee-for-pressure relationships. Listing, review, and invoices decide what can ship.",
      gapAfterMerge: "Still no free ride: discovery and model quality stay paid and policy-bound even if Cosmos never launches."
    },
    {
      id: "institutions-press",
      title: "Institutions, press, and labs",
      merge: "VC/angels, regulators, schools, press, HCI labs \u2014 money, rules, and legitimacy already flow one way into products.",
      body: "Capital sets tempo; policy constrains voice and tracking; press and labs mint early legitimacy. None of this waits for Cosmos.",
      gapAfterMerge: "Still no reciprocal \u201Cusers prove value \u2192 institutions follow\u201D loop for a wall product that does not exist at scale yet."
    }
  ];
  var stakeholderHypothesized = [
    {
      id: "cosmos-people",
      title: "Cosmos / product systems \u2192 people",
      status: "Hypothesized \xB7 partially built on /web",
      body: "We draw team and product edges into readers, contributors, stewards, and intentional users: marketing, layout meaning, onboarding, continuity, moderation, voice, cross-device. These are design claims \u2014 not proven reverse loyalty from users yet.",
      gapAfterMerge: "Even merging all product\u2192people edges, the missing reverse is people \u2192 product: save/return, contribution that feels like \u201Cour place,\u201D and proof that reading succeeded."
    },
    {
      id: "cosmos-discord",
      title: "Cosmos \u2194 Discord (comparison)",
      status: "Hypothesized identity loop",
      body: "We expect communities to compare Cosmos to Discord as \u201Cplace.\u201D That mutual identity edge is a forecast of judgment, not a partnership contract.",
      gapAfterMerge: "Still no functional bridge strong enough that Discord is not the only home; comparison without import/export leaves Cosmos as a tourist stop."
    },
    {
      id: "readers-contributors",
      title: "Readers \u2194 contributors",
      status: "Desired loop \xB7 not yet earned",
      body: "The healthy community battery: living walls for readers; attentive reading rewards contributors. Drawn as if it can exist; not yet measured on Cosmos.",
      gapAfterMerge: "Still empty walls and ranking culture can kill this loop before it starts \u2014 content supply and anti-feed norms must exist first."
    },
    {
      id: "content-supply",
      title: "Publishers / UGC \u2192 wall \u2192 readers",
      status: "Hypothesized supply chain",
      body: "We assume rights-safe import and partners seed real discourse so readers find substance. Without that, the sphere is decoration.",
      gapAfterMerge: "Still no reverse proof to publishers (demand, featured walls) unless usage exists \u2014 chicken-and-egg remains."
    },
    {
      id: "distribution-team",
      title: "Team \u2194 stores; team \u2192 capital",
      status: "Partly real if shipping; partly narrative",
      body: "Store fee loops become real the day we ship on a storefront. Capital and press edges are story we tell until metrics exist.",
      gapAfterMerge: "Still dependent: multi-store leverage and patient capital are choices, not guaranteed reverse influence from users or markets."
    }
  ];
  var gapsCosmosCloses = [
    {
      title: "Map instead of rank",
      already: "Feeds answer \u201Cwhat should I read?\u201D with endless novelty.",
      closes: "Spatial layout and clusters answer \u201Cwhere is this debate?\u201D and give place memory a feed cannot."
    },
    {
      title: "Calm scan instead of doomscroll",
      already: "Short-form and ranking train high-intensity, low-depth explore.",
      closes: "Wall browse (gaze, clusters, finite sessions) can make \u201CI\u2019m done\u201D a success state for intentional users."
    },
    {
      title: "Discourse outside chat threads",
      already: "Discord/Slack own \u201Cwhere community lives\u201D as chat.",
      closes: "A wall for multi-voice, async comparison when a thread is the wrong shape \u2014 additive to chat, not a server migration fantasy."
    },
    {
      title: "Headset job beyond hangouts",
      already: "Social VR taught that headsets are for play-social.",
      closes: "Walkable / world-anchored discourse (and seated planetarium) names a different job: sense-making in space."
    },
    {
      title: "Shared wall a vault cannot be",
      already: "Notion/Obsidian/Are.na hold personal and team knowledge flat.",
      closes: "Multi-voice spatial place for public or group discourse, not private notes with a 3D skin."
    },
    {
      title: "Body-aware browse (if designed for it)",
      already: "Desk-browser VR and phone grip fail interrupted, reclined, hands-busy users (see storyboard).",
      closes: "Gaze-first, optional pull, passthrough, short pockets \u2014 only if product actually ships that contract."
    }
  ];
  var weaknessesRemain = [
    {
      title: "Hardware and access tax",
      body: "HMDs still cost money, comfort, and setup. Cosmos cannot reverse silicon. Without a strong cross-device path, impact stays gated to people who already own spatial gear."
    },
    {
      title: "Store and policy gates",
      body: "Listing, review, fees, and biometric/voice rules stay one-way. Multi-store and optional voice reduce risk; they do not remove the gate."
    },
    {
      title: "Empty-wall / import chicken-and-egg",
      body: "Until rights-safe content and early stewards exist, the hypothesized product\u2192reader edges fail in practice. Marketing cannot close a supply gap."
    },
    {
      title: "Chat and feed gravity remain",
      body: "Discord and ranked feeds will still own daily habit. Cosmos can sit beside them; it is unlikely to replace them soon. Comparison and FOMO stay structural."
    },
    {
      title: "Capital tempo vs patient loops",
      body: "If funded like consumer social, growth metrics can break continuity and intentional exit \u2014 the exact loops the map says we need to earn."
    },
    {
      title: "Unproven reverse loyalty",
      body: "Almost all Cosmos\u2192people edges are still one-way on the map. Until save/return, contribution, and reading success are real, the app\u2019s opportunity is a hypothesis, not an asset."
    }
  ];
  var analysisOpportunities = [
    "Own place memory and debate topology as the product job \u2014 not social hangout, not feed clone.",
    "Target intentional users, Reddit-depth readers, curators, fandom/club stewards who already hate doomscroll.",
    "Ship import + seeded walls before spectacle; prove demand back to publishers and partners.",
    "Design for interrupted bodies (gaze, short session, cross-device) as a differentiator against desk-shaped VR.",
    "Frame /VR and /web as one wall metaphor with two contracts \u2014 walk when able, look-from-center when not.",
    "Use Gaps mode to prioritize marketing, feature, targeting, partnership, and policy moves on major one-ways."
  ];
  var analysisWeaknesses = [
    "Dependent on HMD comfort and price; exclusion risk is structural without desktop parity.",
    "Store fees, featuring, and compliance remain external one-ways we pay into.",
    "AI layout/voice costs can force shallow product if not capped and optional.",
    "Empty walls destroy trust faster than any narrative can rebuild it.",
    "Readers\u2194contributors and people\u2192product reverse edges are not earned yet.",
    "If success is measured as dwell/DAU, the map\u2019s antagonist (ads\u2194feeds) wins inside our own metrics."
  ];
  function StakeholderInfluenceStory({ onGoGaps }) {
    const oneWayCount = influenceAsymmetryGaps.length;
    const edgeCount = influenceEdges.length;
    return /* @__PURE__ */ React.createElement("article", { className: "stakeholder-story", id: "influence-story", "aria-label": "Stakeholder relationship and gap analysis" }, /* @__PURE__ */ React.createElement("header", { className: "stakeholder-story__header" }, /* @__PURE__ */ React.createElement("p", { className: "stakeholder-story__kicker" }, "06 \xB7 Stakeholder relationship and gap analysis"), /* @__PURE__ */ React.createElement("h2", null, "Stakeholder relationship and gap analysis"), /* @__PURE__ */ React.createElement("p", { className: "stakeholder-story__lede" }, "The map has ", edgeCount, " typed edges (~", oneWayCount, " one-way). Analysis does not treat every arrow as equal. First separate ", /* @__PURE__ */ React.createElement("strong", null, "what is already there"), " in the market from ", /* @__PURE__ */ React.createElement("strong", null, "what we think will be there"), "once Cosmos is in the graph \u2014 then ask which gaps the app can close, and which weaknesses remain.")), /* @__PURE__ */ React.createElement("section", { className: "stakeholder-story__section" }, /* @__PURE__ */ React.createElement("h3", null, "Two layers on one map"), /* @__PURE__ */ React.createElement("div", { className: "stakeholder-story__layer-grid" }, /* @__PURE__ */ React.createElement("article", { className: "stakeholder-story__layer is-already" }, /* @__PURE__ */ React.createElement("h4", null, "Already there"), /* @__PURE__ */ React.createElement("p", null, "Relationships that exist whether or not Cosmos ships: feeds and ads, chat as home, social-VR leisure, 2D knowledge tools, hardware taxes, store and AI bills, institutions and press. These are facts of the field.")), /* @__PURE__ */ React.createElement("article", { className: "stakeholder-story__layer is-hypothesized" }, /* @__PURE__ */ React.createElement("h4", null, "What we think will be there"), /* @__PURE__ */ React.createElement("p", null, "Edges that involve Cosmos, the team, or a desired community loop. Some are partly built (/web pipeline, product systems); many are design hypotheses until usage proves a reverse path."))), /* @__PURE__ */ React.createElement("p", null, "Similar brand-level edges are ", /* @__PURE__ */ React.createElement("strong", null, "merged inside"), " the analysis below \u2014 not as a separate \u201Chygiene\u201D task, but so we can still name the gap that remains after the merge.")), /* @__PURE__ */ React.createElement("section", { className: "stakeholder-story__section" }, /* @__PURE__ */ React.createElement("div", { className: "stakeholder-story__section-head" }, /* @__PURE__ */ React.createElement("h3", null, "I \xB7 Already there"), /* @__PURE__ */ React.createElement("p", null, "World and market forces. Merge lookalikes; state the gap that still sits after the merge.")), /* @__PURE__ */ React.createElement("div", { className: "stakeholder-story__arc-list" }, stakeholderAlreadyThere.map((row, i) => /* @__PURE__ */ React.createElement("article", { key: row.id, className: "stakeholder-story__arc" }, /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("span", { className: "stakeholder-story__arc-num" }, String(i + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "stakeholder-story__arc-meta" }, "Already there"), /* @__PURE__ */ React.createElement("h4", null, row.title))), /* @__PURE__ */ React.createElement("p", null, row.body), /* @__PURE__ */ React.createElement("p", { className: "stakeholder-story__merge" }, /* @__PURE__ */ React.createElement("strong", null, "Merged as."), " ", row.merge), /* @__PURE__ */ React.createElement("p", { className: "stakeholder-story__opportunity" }, /* @__PURE__ */ React.createElement("strong", null, "Gap that remains."), " ", row.gapAfterMerge))))), /* @__PURE__ */ React.createElement("section", { className: "stakeholder-story__section" }, /* @__PURE__ */ React.createElement("div", { className: "stakeholder-story__section-head" }, /* @__PURE__ */ React.createElement("h3", null, "II \xB7 What we think will be there"), /* @__PURE__ */ React.createElement("p", null, "Cosmos-involved and desired loops. Treat as claims until reverse influence is real.")), /* @__PURE__ */ React.createElement("div", { className: "stakeholder-story__arc-list" }, stakeholderHypothesized.map((row, i) => /* @__PURE__ */ React.createElement("article", { key: row.id, className: "stakeholder-story__arc is-hypothesized-card" }, /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("span", { className: "stakeholder-story__arc-num" }, String(i + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "stakeholder-story__arc-meta" }, row.status), /* @__PURE__ */ React.createElement("h4", null, row.title))), /* @__PURE__ */ React.createElement("p", null, row.body), /* @__PURE__ */ React.createElement("p", { className: "stakeholder-story__opportunity" }, /* @__PURE__ */ React.createElement("strong", null, "Gap that remains."), " ", row.gapAfterMerge))))), /* @__PURE__ */ React.createElement("section", { className: "stakeholder-story__section" }, /* @__PURE__ */ React.createElement("div", { className: "stakeholder-story__section-head" }, /* @__PURE__ */ React.createElement("h3", null, "III \xB7 Gaps this app can close"), /* @__PURE__ */ React.createElement("p", null, "Against the \u201Calready there\u201D field, Cosmos is only useful if it closes a named gap \u2014 not if it redraws every arrow.")), /* @__PURE__ */ React.createElement("div", { className: "stakeholder-story__close-grid" }, gapsCosmosCloses.map((row) => /* @__PURE__ */ React.createElement("article", { key: row.title }, /* @__PURE__ */ React.createElement("h4", null, row.title), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Field today."), " ", row.already), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Cosmos close."), " ", row.closes))))), /* @__PURE__ */ React.createElement("section", { className: "stakeholder-story__section" }, /* @__PURE__ */ React.createElement("div", { className: "stakeholder-story__section-head" }, /* @__PURE__ */ React.createElement("h3", null, "IV \xB7 Weaknesses that will still be there"), /* @__PURE__ */ React.createElement("p", null, "Even if the wall works, the map still leaves structural one-ways Cosmos does not own.")), /* @__PURE__ */ React.createElement("div", { className: "stakeholder-story__close-grid" }, weaknessesRemain.map((row) => /* @__PURE__ */ React.createElement("article", { key: row.title, className: "is-weakness" }, /* @__PURE__ */ React.createElement("h4", null, row.title), /* @__PURE__ */ React.createElement("p", null, row.body))))), /* @__PURE__ */ React.createElement("section", { className: "stakeholder-story__section stakeholder-story__section--close" }, /* @__PURE__ */ React.createElement("h3", null, "Conclusion \xB7 Opportunity and weakness of Cosmos"), /* @__PURE__ */ React.createElement("div", { className: "stakeholder-story__conclusion-grid" }, /* @__PURE__ */ React.createElement("article", { className: "is-opportunity" }, /* @__PURE__ */ React.createElement("h4", null, "Opportunities (from this map)"), /* @__PURE__ */ React.createElement("ul", null, analysisOpportunities.map((line) => /* @__PURE__ */ React.createElement("li", { key: line }, line)))), /* @__PURE__ */ React.createElement("article", { className: "is-weakness" }, /* @__PURE__ */ React.createElement("h4", null, "Weaknesses (from this map)"), /* @__PURE__ */ React.createElement("ul", null, analysisWeaknesses.map((line) => /* @__PURE__ */ React.createElement("li", { key: line }, line))))), /* @__PURE__ */ React.createElement("p", { className: "stakeholder-story__pull" }, "Cosmos is an intervention in an already-closed attention economy and chat-home world \u2014 not a blank network. Its chance is to close map, calm, place, and body-aware gaps. Its risk is to leave hardware, stores, empty walls, and unearned reverse loyalty unaddressed while still claiming a \u201Ccommunity platform.\u201D"), /* @__PURE__ */ React.createElement("p", { className: "stakeholder-story__cta" }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: onGoGaps }, "Open Gaps"), /* @__PURE__ */ React.createElement("span", null, majorAsymmetryGaps.length, " major one-way pairs on the interactive map \u2014 use them to pick which reverse paths to earn first."))));
  }
  var impactFrameworkSteps = [
    {
      step: "01",
      title: "Start from the field map",
      body: "Use stakeholder analysis: already-there forces vs hypothesized Cosmos edges \u2014 not a blank stakeholder list."
    },
    {
      step: "02",
      title: "Score + and \u2212 per role",
      body: "For each stakeholder, name benefit if gaps close and harm if remaining weaknesses dominate or misuse wins."
    },
    {
      step: "03",
      title: "Brainstorm adverse impacts",
      body: "Map structural weaknesses (hardware, stores, empty wall, feed/chat gravity, capital tempo, unproven reverse loyalty) into harm codes H1\u2013H8."
    },
    {
      step: "04",
      title: "Ask how it can harm others",
      body: "Weaponization of place, voice, layout, and institutional channels \u2014 beyond accidental product failure."
    },
    {
      step: "05",
      title: "Measure both benefit and harm",
      body: "Signals that can embarrass the project: exclusion, steward load, consent, FOMO, claim tier \u2014 not dwell alone."
    },
    {
      step: "06",
      title: "Mitigate & own",
      body: "Each major harm gets an owner, steps, and a kill criterion when mitigation fails."
    }
  ];
  var stakeholderWeaknessToHarms = [
    { weakness: "Hardware and access tax", harms: ["H1 Premium access", "H6 Comfort / vestibular"], note: "Already-there HMD tax; Cosmos cannot reverse silicon." },
    { weakness: "Store and policy gates", harms: ["H4 Voice & biometric", "H7 Platform capture"], note: "One-way store/OS/policy edges from the map." },
    { weakness: "Empty-wall / import chicken-and-egg", harms: ["H5 Empty-wall failure"], note: "Hypothesized supply chain not earned; product\u2192reader edges fail without seed." },
    { weakness: "Chat and feed gravity remain", harms: ["H2 Doomscroll in a sphere"], note: "Ads\u2194feeds + Discord home stay; Cosmos can recreate capture beside them." },
    { weakness: "Capital tempo vs patient loops", harms: ["H2 Attention capture", "H8 Research theater"], note: "VC pace from institutions layer pulls growth metrics." },
    { weakness: "Unproven reverse loyalty", harms: ["H5 Empty wall", "H8 False impact"], note: "Cosmos\u2192people still one-way until save/return and reading success exist." }
  ];
  var impactActors = [
    {
      id: "readers",
      role: "Readers",
      field: "Already there: feed gravity \xB7 Hypothesized: product\u2192readers",
      positive: "If Cosmos closes map/calm gaps: place memory, \u201Cwhere is this debate?\u201D, stoppable sessions.",
      negative: "Hardware tax excludes them; or feed-in-a-sphere recreates rank urgency with higher body cost.",
      measure: "Comprehension + place memory vs feed; calm at exit; setup drop-off by device"
    },
    {
      id: "contributors",
      role: "Contributors",
      field: "Hypothesized: readers\u2194contributors loop (not earned)",
      positive: "Posts feel like building a place, not feeding rank \u2014 if walls stay lived-in.",
      negative: "Empty-wall chicken-and-egg wastes labor; voice exposure; spatial harassment.",
      measure: "Perceived persistence; return to own posts; consent; abuse reports"
    },
    {
      id: "stewards",
      role: "Stewards / mods",
      field: "Already there: Reddit/Discord mod craft \xB7 Hypothesized: moderation tools\u2192stewards",
      positive: "Spatial density can surface problem zones without endless timeline patrol.",
      negative: "New attack surfaces without tools; unpaid burnout; liability for unmoderated walls.",
      measure: "Time-to-moderate; steward hours; unresolved incidents"
    },
    {
      id: "excluded",
      role: "Non-owners / comfort-limited people",
      field: "Already there: hardware tax on bodies",
      positive: "Only if cross-device / desktop is first-class \u2014 else no positive path.",
      negative: "\u201CCommunity wall\u201D becomes a gated club; discourse moves to a medium they cannot enter.",
      measure: "Share of paths without premium HMD; exclusion rate in pilots"
    },
    {
      id: "intentional",
      role: "Intentional / anti-doomscroll users",
      field: "Gap to close: calm scan vs short-form \xB7 Weakness: ads\u2194feeds still closed",
      positive: "Purposeful comparison; \u201CI\u2019m done\u201D as success.",
      negative: "Betrayed if capital tempo forces dwell/DAU and Cosmos joins the antagonist loop.",
      measure: "Got-what-I-came-for; FOMO at exit; scroll-depth anti-metrics"
    },
    {
      id: "chat-homes",
      role: "Discord / chat-native communities",
      field: "Already there: chat as home \xB7 Hypothesized: Cosmos\u2194Discord comparison",
      positive: "Additive wall when a thread is wrong shape; import/export without forced migration.",
      negative: "Tourist stop that splits attention; or hostile \u201Creplace Discord\u201D narrative that fails and burns trust.",
      measure: "Bridge use; co-existence vs churn; steward preference"
    },
    {
      id: "publishers",
      role: "Publishers / UGC / content partners",
      field: "Hypothesized supply chain",
      positive: "Rights-safe walls with proof of demand and featured regions.",
      negative: "Import without reciprocity; empty promises of audience; scrape risk to rights.",
      measure: "Seed coverage; partner renewals; rights incidents"
    },
    {
      id: "team",
      role: "Product & research team",
      field: "Hypothesized: team\u2192people, team\u2194stores, team\u2192capital",
      positive: "Honest research; learning that survives critique.",
      negative: "Multi-HMD + AI invoice burn; store tax pressure; overclaim for funding (theater).",
      measure: "Cost per validated learning; claim tier vs evidence"
    },
    {
      id: "platforms",
      role: "Stores / OS / hardware",
      field: "Already there: store tax + OS bounds",
      positive: "Proof that non-game, non-live social can matter on headset platforms.",
      negative: "Fees/policy hollow the wall; users locked to one storefront\u2019s rules.",
      measure: "Shipping friction; compliance load; multi-store dependence"
    },
    {
      id: "institutions",
      role: "Schools, labs, capital, workplaces",
      field: "Already there: money, rules, legitimacy one-way",
      positive: "Later: seminars, labs, patient capital for structured discourse.",
      negative: "Surveillance classrooms; compulsory use; growth capital that breaks patient loops.",
      measure: "Opt-out; age-safety before pilot; metric contracts with funders"
    }
  ];
  var misusePaths = [
    {
      id: "m1",
      title: "Surveillance wall",
      who: "Employers, schools, authoritarian actors (institutions layer)",
      how: "Require headset presence; log gaze, voice, and place as compliance \u2014 exploiting hypothesized body-data edges.",
      harm: "Chills speech; place memory becomes a dossier.",
      mapLink: "Institutions \u2192 product/people already one-way on the map"
    },
    {
      id: "m2",
      title: "Propaganda architecture",
      who: "Coordinated campaigns, bad-faith seeders",
      how: "Engineer cluster density and poles to fake consensus; abuse Architect layout as influence, not sense-making.",
      harm: "Users trust topology as truth when layout is bought or gamed.",
      mapLink: "Content supply gap \u2014 who seeds the wall holds power"
    },
    {
      id: "m3",
      title: "Spatial harassment",
      who: "Abusive users",
      how: "Surround targets with posts/voice/proximity when steward tools lag Discord/Reddit craft.",
      harm: "Higher intensity than 2D block if exit and mod paths are weak.",
      mapLink: "Stewards need tools before multi-user scale"
    },
    {
      id: "m4",
      title: "Biometric / voice leak",
      who: "Attackers, processors, cloud AI vendors",
      how: "Retain voice/gaze beyond consent; subpoena \u201Csession presence\u201D; bill-driven always-on capture.",
      harm: "Irreversible body identity exposure.",
      mapLink: "Cloud AI + policy one-ways; team pays models"
    },
    {
      id: "m5",
      title: "Join ads\u2194feeds (self-harm)",
      who: "Product under growth / store featuring pressure",
      how: "Optimize heat, notifications, dwell until the wall is d\xE9cor on an attention machine \u2014 the closed antagonist loop.",
      harm: "Same cognitive harms as feeds, plus HMD cost and isolation.",
      mapLink: "Ads\u2194feeds already closed; capital tempo weakness"
    },
    {
      id: "m6",
      title: "Research / marketing theater",
      who: "Team, funders, press (legitimacy edges)",
      how: "Sell impact with maps and demos while reverse loyalty and comparative proof are still hypothesized.",
      harm: "Misleads public; crowds out honest tools.",
      mapLink: "Unproven reverse loyalty + press\u2192capital one-way"
    }
  ];
  var socialHarms = [
    {
      id: "access",
      code: "H1",
      title: "Premium access wall",
      domain: "Equity / access",
      severity: 3,
      likelihood: 3,
      affected: "People without headsets, with comfort limits, or on constrained devices",
      pathway: "If the best Cosmos experience requires high-end HMDs, impact concentrates among people who already own spatial gear \u2014 the opposite of a public community wall.",
      rights: "Equal access to public discourse \xB7 non-discrimination by means",
      owner: "Product + research design",
      mitigate: [
        "Ship and study a desktop / cross-device bridge as a first-class path, not a demotion.",
        "Pilot on accessible headsets (Quest / Pico-class), not Vision Pro alone.",
        "Instrument who drops at setup; publish exclusion rates next to \u201Csuccess\u201D metrics.",
        "Avoid demos that only show the premium path as the product."
      ]
    },
    {
      id: "attention",
      code: "H2",
      title: "Doomscroll in a sphere",
      domain: "Attention / agency",
      severity: 3,
      likelihood: 2,
      affected: "Readers and intentional users seeking calm sense-making",
      pathway: "Store metrics, ranking habits, and capital pressure can recreate feed urgency inside VR \u2014 inverted impact relative to the thesis.",
      rights: "Cognitive autonomy \xB7 freedom from manipulative design",
      owner: "Product metrics + leadership",
      mitigate: [
        "Define success as comprehension, place memory, and calm exit \u2014 never raw dwell.",
        "Pre-register anti-metrics: infinite scroll depth, notification dependence, FOMO at exit.",
        "Refuse growth experiments that optimize heat clusters over understanding.",
        "Publish the kill criterion: if Cosmos loses to a flat feed on sense-making, narrow or stop."
      ]
    },
    {
      id: "safety",
      code: "H3",
      title: "Spatial harassment & steward overload",
      domain: "Safety / labor",
      severity: 3,
      likelihood: 2,
      affected: "Stewards, targeted users, quieter readers",
      pathway: "Harassment, spam, and voice abuse get new spatial forms while mod tools lag Discord/Reddit norms; unpaid steward labor burns out.",
      rights: "Safety \xB7 dignity \xB7 fair labor for community care",
      owner: "Trust & safety + product",
      mitigate: [
        "Ship moderation tooling before multi-user scale (report, mute zone, remove, audit log).",
        "Study steward workflows as a first-class path in primary research.",
        "Cap open UGC until norms and tools exist; start with stewarded pilot communities.",
        "Track steward time and incident resolution \u2014 not only user growth."
      ]
    },
    {
      id: "privacy",
      code: "H4",
      title: "Voice & biometric exposure",
      domain: "Privacy / body data",
      severity: 3,
      likelihood: 2,
      affected: "Anyone who speaks, is tracked, or is recorded nearby",
      pathway: "Voice, gaze, and presence can deepen place-feeling and expand surveillance anxiety; law and OS policy will constrain what ships.",
      rights: "Privacy \xB7 consent \xB7 data minimization",
      owner: "Engineering + policy review",
      mitigate: [
        "Default voice off; opt-in with clear retention and deletion.",
        "Prefer on-device or short-lived processing; no silent always-on capture.",
        "Document biometric/XR policy dependencies for Meta OS and Pico OS.",
        "Offer text-first contribution so participation never requires a body signal."
      ]
    },
    {
      id: "empty",
      code: "H5",
      title: "Empty-wall social failure",
      domain: "Community health",
      severity: 2,
      likelihood: 3,
      affected: "Early contributors, pilot communities, readers who arrive to silence",
      pathway: "Without seed discourse and return, contribution feels pointless; the place never becomes a place.",
      rights: "Meaningful participation \xB7 non-wasted labor",
      owner: "Community design + content partnerships",
      mitigate: [
        "Rights-safe import of real threads for studies and early walls.",
        "Stewarded pilot cohorts before open public UGC.",
        "Measure return without notification bait, not only first-session wow.",
        "Do not market \u201Cliving community\u201D until density and norms exist."
      ]
    },
    {
      id: "body",
      code: "H6",
      title: "Comfort & vestibular harm",
      domain: "Health / inclusion",
      severity: 2,
      likelihood: 2,
      affected: "Users with motion sensitivity, fatigue, or long-session limits",
      pathway: "Long spatial reading can induce discomfort; people who need the calmest tools may be the least able to stay.",
      rights: "Health \xB7 reasonable accommodation",
      owner: "Interaction design + study protocol",
      mitigate: [
        "Comfort budgets in prototype tests (session length, locomotion, text scale).",
        "Seated, low-motion defaults; no forced continuous locomotion for reading.",
        "Screen for cybersickness; allow early exit without losing progress (continuity).",
        "Desktop bridge as an equal reading path when headset comfort fails."
      ]
    },
    {
      id: "capture",
      code: "H7",
      title: "Platform & policy capture",
      domain: "Governance / dependency",
      severity: 2,
      likelihood: 3,
      affected: "Team, users locked to one store, researchers depending on APIs",
      pathway: "Featuring, fees, and OS rules can force design compromises that hollow the wall metaphor.",
      rights: "User autonomy \xB7 research independence",
      owner: "Strategy + engineering",
      mitigate: [
        "Prove the wall on one platform before multi-HMD sprawl.",
        "Document store/OS policy dependencies in public research notes.",
        "Keep a non-store or sideload path for research builds where allowed.",
        "Treat platform compliance cost as a first-class risk in Making phases."
      ]
    },
    {
      id: "theater",
      code: "H8",
      title: "Research theater / false impact",
      domain: "Epistemic / accountability",
      severity: 2,
      likelihood: 2,
      affected: "Funders, participants, the public who trust the narrative",
      pathway: "Beautiful maps and prototypes without comparative tests sell impact as storytelling.",
      rights: "Honest communication \xB7 non-deception",
      owner: "Research lead",
      mitigate: [
        "Pre-register outcomes before the wall-vs-feed study.",
        "Separate demo narrative from validated claims in the report.",
        "Publish falsifiers and negative results, not only inspiring frames.",
        "No impact claims stronger than the current evidence tier."
      ]
    }
  ];
  var severityLabel = { 1: "Low", 2: "Med", 3: "High" };
  var likelihoodLabel = { 1: "Low", 2: "Med", 3: "High" };
  function HarmMatrixVisual({ harms, activeId, onSelect }) {
    const size = 420;
    const padL = 72;
    const padB = 56;
    const padT = 28;
    const padR = 24;
    const plotW = size - padL - padR;
    const plotH = size - padT - padB;
    const cell = plotW / 3;
    const toXY = (likelihood, severity) => ({
      x: padL + (likelihood - 0.5) * cell,
      y: padT + (3 - severity + 0.5) * cell
    });
    return /* @__PURE__ */ React.createElement(
      "svg",
      {
        className: "harm-matrix",
        viewBox: `0 0 ${size} ${size}`,
        role: "img",
        "aria-label": "Potential harms plotted by likelihood and severity. Click a point to open its mitigation."
      },
      [1, 2, 3].map(
        (lx) => [1, 2, 3].map((sy) => {
          const heat = lx + sy;
          const fill = heat >= 6 ? "rgba(241,79,155,0.18)" : heat >= 4 ? "rgba(242,240,79,0.28)" : "rgba(17,28,78,0.04)";
          return /* @__PURE__ */ React.createElement(
            "rect",
            {
              key: `${lx}-${sy}`,
              x: padL + (lx - 1) * cell,
              y: padT + (3 - sy) * cell,
              width: cell,
              height: cell,
              fill,
              stroke: "rgba(17,28,78,0.12)",
              strokeWidth: "1"
            }
          );
        })
      ),
      /* @__PURE__ */ React.createElement("line", { x1: padL, y1: padT, x2: padL, y2: padT + plotH, stroke: "#111c4e", strokeWidth: "1.5" }),
      /* @__PURE__ */ React.createElement("line", { x1: padL, y1: padT + plotH, x2: padL + plotW, y2: padT + plotH, stroke: "#111c4e", strokeWidth: "1.5" }),
      /* @__PURE__ */ React.createElement("text", { x: padL + plotW / 2, y: size - 12, textAnchor: "middle", className: "harm-matrix__axis" }, "Likelihood \u2192"),
      /* @__PURE__ */ React.createElement(
        "text",
        {
          x: 18,
          y: padT + plotH / 2,
          textAnchor: "middle",
          className: "harm-matrix__axis",
          transform: `rotate(-90 18 ${padT + plotH / 2})`
        },
        "Severity \u2192"
      ),
      [1, 2, 3].map((n) => /* @__PURE__ */ React.createElement(
        "text",
        {
          key: `lx-${n}`,
          x: padL + (n - 0.5) * cell,
          y: padT + plotH + 22,
          textAnchor: "middle",
          className: "harm-matrix__tick"
        },
        likelihoodLabel[n]
      )),
      [1, 2, 3].map((n) => /* @__PURE__ */ React.createElement(
        "text",
        {
          key: `sy-${n}`,
          x: padL - 12,
          y: padT + (3 - n + 0.5) * cell + 4,
          textAnchor: "end",
          className: "harm-matrix__tick"
        },
        severityLabel[n]
      )),
      harms.map((h) => {
        const { x: x3, y: y3 } = toXY(h.likelihood, h.severity);
        const peers = harms.filter((p) => p.likelihood === h.likelihood && p.severity === h.severity);
        const idx = peers.findIndex((p) => p.id === h.id);
        const ox = peers.length > 1 ? (idx - (peers.length - 1) / 2) * 22 : 0;
        const active = h.id === activeId;
        return /* @__PURE__ */ React.createElement(
          "g",
          {
            key: h.id,
            className: `harm-matrix__point ${active ? "is-active" : ""}`,
            transform: `translate(${x3 + ox}, ${y3})`,
            onClick: () => onSelect(h.id),
            style: { cursor: "pointer" }
          },
          /* @__PURE__ */ React.createElement("circle", { r: active ? 18 : 15, fill: active ? "#f14f9b" : "#111c4e" }),
          /* @__PURE__ */ React.createElement("text", { y: 5, textAnchor: "middle", className: "harm-matrix__code" }, h.code),
          active && /* @__PURE__ */ React.createElement("text", { y: -28, textAnchor: "middle", className: "harm-matrix__hover-label" }, h.title)
        );
      }),
      /* @__PURE__ */ React.createElement("text", { x: padL, y: 16, className: "harm-matrix__title" }, "Harm map \xB7 severity \xD7 likelihood")
    );
  }
  var impactMetrics = [
    {
      group: "Positive impact (did the wall help?)",
      items: [
        "Thread-cluster comprehension vs flat feed",
        "Place memory / retell after delay",
        "Calm vs urgency at session end",
        "Willingness to stop without FOMO"
      ]
    },
    {
      group: "Adverse impact (who was hurt?)",
      items: [
        "Hardware / setup exclusion rate",
        "Steward hours and unresolved safety incidents",
        "Consent withdrawals; voice/gaze retention violations",
        "Cybersickness / early forced exits"
      ]
    },
    {
      group: "Misuse & boundary health",
      items: [
        "Report volume and time-to-action",
        "Feed-like scroll depth and notification dependence",
        "Compulsory-use or workplace-surveillance red flags",
        "Claim tier vs published evidence (anti\u2013research theater)"
      ]
    },
    {
      group: "Access & cost externalities",
      items: [
        "Share of paths usable without a premium HMD",
        "Compute/voice cost per session (pressure toward capture)",
        "Who never appears in pilots (sampling bias)"
      ]
    }
  ];
  function ImpactAnalysisPage() {
    const [activeHarmId, setActiveHarmId] = useState("attention");
    const activeHarm = socialHarms.find((h) => h.id === activeHarmId) || socialHarms[0];
    return /* @__PURE__ */ React.createElement("section", { className: "report-section impact-page", id: "impact-analysis" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "07" }, "Impact analysis"), /* @__PURE__ */ React.createElement("div", { className: "section-heading impact-heading" }, /* @__PURE__ */ React.createElement("h2", null, "Potential harms", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", null, "and how we mitigate them.")), /* @__PURE__ */ React.createElement("p", null, "Goal: build a framework to evaluate how Cosmos affects other stakeholders \u2014 positively and negatively \u2014 brainstorm adverse impacts, ask how the product could be used to harm others, define measurement, and commit to mitigations. Growth stories are out of scope unless they create or reduce harm.")), /* @__PURE__ */ React.createElement("nav", { className: "impact-toc", "aria-label": "Impact analysis contents" }, /* @__PURE__ */ React.createElement("p", null, "On this page"), /* @__PURE__ */ React.createElement("a", { href: "#impact-framework" }, /* @__PURE__ */ React.createElement("span", null, "1"), "Framework"), /* @__PURE__ */ React.createElement("a", { href: "#impact-from-map" }, /* @__PURE__ */ React.createElement("span", null, "2"), "From stakeholder analysis"), /* @__PURE__ */ React.createElement("a", { href: "#impact-stakeholders" }, /* @__PURE__ */ React.createElement("span", null, "3"), "Stakeholder + / \u2212"), /* @__PURE__ */ React.createElement("a", { href: "#impact-harms" }, /* @__PURE__ */ React.createElement("span", null, "4"), "Adverse impacts"), /* @__PURE__ */ React.createElement("a", { href: "#impact-misuse" }, /* @__PURE__ */ React.createElement("span", null, "5"), "How it could harm others"), /* @__PURE__ */ React.createElement("a", { href: "#impact-measure" }, /* @__PURE__ */ React.createElement("span", null, "6"), "How we measure"), /* @__PURE__ */ React.createElement("a", { href: "#impact-mitigate" }, /* @__PURE__ */ React.createElement("span", null, "7"), "How we mitigate"), /* @__PURE__ */ React.createElement("a", { href: "#impact-next" }, /* @__PURE__ */ React.createElement("span", null, "8"), "Commitments")), /* @__PURE__ */ React.createElement("article", { className: "impact-document" }, /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "impact-framework" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "1"), /* @__PURE__ */ React.createElement("h2", null, "Framework"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "Evaluate impact as change in benefit and burden \u2014 then stress-test adverse use, measurement, and mitigation. Input is the ", /* @__PURE__ */ React.createElement("a", { href: "/cosmos/stakeholder-map/" }, "stakeholder analysis"), ", not a blank slate."), /* @__PURE__ */ React.createElement("p", null, "Cosmos is not impactful because it is spatial. It is impactful only if someone understands community discourse better ", /* @__PURE__ */ React.createElement("em", null, "and"), " if harms we introduce stay smaller than harms we claim to reduce. Stakeholder analysis separates ", /* @__PURE__ */ React.createElement("strong", null, "already there"), " from ", /* @__PURE__ */ React.createElement("strong", null, "hypothesized"), " edges, names gaps the app can close, and lists weaknesses that remain. This page turns that into +/\u2212 evaluation, misuse, metrics, and owners."), /* @__PURE__ */ React.createElement("div", { className: "impact-horizon-grid" }, impactFrameworkSteps.map((s) => /* @__PURE__ */ React.createElement("article", { key: s.step }, /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("span", null, s.step), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, s.title))), /* @__PURE__ */ React.createElement("p", { className: "impact-horizon-q", style: { fontSize: "14px", fontWeight: 500 } }, s.body)))), /* @__PURE__ */ React.createElement("aside", { className: "report-note" }, /* @__PURE__ */ React.createElement("b", null, "Non-negotiable"), /* @__PURE__ */ React.createElement("p", null, "Joining the already-closed ads\u2194feeds loop (dwell/DAU as north star) is a harm, not a win \u2014 it is the antagonist on the stakeholder map."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "impact-from-map" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2"), /* @__PURE__ */ React.createElement("h2", null, "From stakeholder analysis"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "Impact work inherits three outputs from chapter 06: gaps Cosmos can close (opportunity), weaknesses that remain (structural risk), and the conclusion lists for opportunity and weakness of the app."), /* @__PURE__ */ React.createElement("h3", { className: "storyboard-subhead", style: { marginTop: "8px" } }, "Gaps the app can close \u2192 positive impact bets"), /* @__PURE__ */ React.createElement("div", { className: "stakeholder-story__close-grid", style: { marginBottom: "20px" } }, gapsCosmosCloses.map((row) => /* @__PURE__ */ React.createElement("article", { key: row.title }, /* @__PURE__ */ React.createElement("h4", null, row.title), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Field today."), " ", row.already), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "If we close it."), " ", row.closes)))), /* @__PURE__ */ React.createElement("h3", { className: "storyboard-subhead" }, "Weaknesses that remain \u2192 adverse impact sources"), /* @__PURE__ */ React.createElement("div", { className: "impact-actor-table-wrap", style: { marginBottom: "16px" } }, /* @__PURE__ */ React.createElement("table", { className: "report-table impact-actor-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Weakness (from map)"), /* @__PURE__ */ React.createElement("th", null, "Feeds harm codes"), /* @__PURE__ */ React.createElement("th", null, "Why it still bites"))), /* @__PURE__ */ React.createElement("tbody", null, stakeholderWeaknessToHarms.map((row) => /* @__PURE__ */ React.createElement("tr", { key: row.weakness }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, row.weakness)), /* @__PURE__ */ React.createElement("td", null, row.harms.join(" \xB7 ")), /* @__PURE__ */ React.createElement("td", null, row.note)))))), /* @__PURE__ */ React.createElement("div", { className: "stakeholder-story__conclusion-grid" }, /* @__PURE__ */ React.createElement("article", { className: "is-opportunity" }, /* @__PURE__ */ React.createElement("h4", null, "Opportunities (stakeholder conclusion)"), /* @__PURE__ */ React.createElement("ul", null, analysisOpportunities.map((line) => /* @__PURE__ */ React.createElement("li", { key: line }, line)))), /* @__PURE__ */ React.createElement("article", { className: "is-weakness" }, /* @__PURE__ */ React.createElement("h4", null, "Weaknesses (stakeholder conclusion)"), /* @__PURE__ */ React.createElement("ul", null, analysisWeaknesses.map((line) => /* @__PURE__ */ React.createElement("li", { key: line }, line))))), /* @__PURE__ */ React.createElement("p", { className: "storyboard-pull", style: { marginTop: "16px" } }, "Impact analysis does not invent a new field. It asks: if we pursue those opportunities, who is helped, who is hurt, how can the product be abused, and what do we measure and mitigate when remaining weaknesses dominate.")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "impact-stakeholders" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "3"), /* @__PURE__ */ React.createElement("h2", null, "How the project might impact stakeholders (+ / \u2212)"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "Each role is tied to the field map (already there vs hypothesized). Positive = if we close the right gaps. Negative = if remaining weaknesses or misuse win."), /* @__PURE__ */ React.createElement("div", { className: "impact-actor-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "report-table impact-actor-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Stakeholder"), /* @__PURE__ */ React.createElement("th", null, "Map context"), /* @__PURE__ */ React.createElement("th", null, "Positive impact"), /* @__PURE__ */ React.createElement("th", null, "Negative impact"), /* @__PURE__ */ React.createElement("th", null, "How we measure"))), /* @__PURE__ */ React.createElement("tbody", null, impactActors.map((a2) => /* @__PURE__ */ React.createElement("tr", { key: a2.id }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, a2.role)), /* @__PURE__ */ React.createElement("td", { style: { fontSize: "12px", color: "var(--muted)" } }, a2.field), /* @__PURE__ */ React.createElement("td", null, a2.positive), /* @__PURE__ */ React.createElement("td", null, a2.negative), /* @__PURE__ */ React.createElement("td", null, a2.measure))))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "impact-harms" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "4"), /* @__PURE__ */ React.createElement("h2", null, "Brainstorm: potential adverse impacts"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "H1\u2013H8 translate remaining map weaknesses into severity \xD7 likelihood. Scores are research judgments for prioritization \u2014 not actuarial certainty."), /* @__PURE__ */ React.createElement("p", null, "Even if the wall metaphor is right, the field still allows:", " ", /* @__PURE__ */ React.createElement("strong", null, "exclusion by hardware"), " (HMD tax), ", /* @__PURE__ */ React.createElement("strong", null, "attention capture"), " (ads\u2194feeds),", " ", /* @__PURE__ */ React.createElement("strong", null, "safety labor without tools"), ", ", /* @__PURE__ */ React.createElement("strong", null, "body-data exposure"), " (AI/policy one-ways),", " ", /* @__PURE__ */ React.createElement("strong", null, "empty communities"), " (import chicken-and-egg), ", /* @__PURE__ */ React.createElement("strong", null, "comfort barriers"), ",", " ", /* @__PURE__ */ React.createElement("strong", null, "platform capture"), " (store gates), and ", /* @__PURE__ */ React.createElement("strong", null, "false impact claims"), " (unproven reverse loyalty)."), /* @__PURE__ */ React.createElement("div", { className: "harm-dual" }, /* @__PURE__ */ React.createElement("div", { className: "harm-dual__passage" }, /* @__PURE__ */ React.createElement("p", { className: "harm-dual__label" }, "Harm set"), /* @__PURE__ */ React.createElement("ul", { className: "harm-passage-list" }, socialHarms.map((h) => /* @__PURE__ */ React.createElement("li", { key: h.id }, /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: h.id === activeHarmId ? "is-active" : "",
        onClick: () => setActiveHarmId(h.id)
      },
      /* @__PURE__ */ React.createElement("b", null, h.code),
      " ",
      h.title,
      /* @__PURE__ */ React.createElement("span", null, h.domain, " \xB7 S", h.severity, "/L", h.likelihood)
    ))))), /* @__PURE__ */ React.createElement("div", { className: "harm-dual__visual" }, /* @__PURE__ */ React.createElement("p", { className: "harm-dual__label" }, "Severity \xD7 likelihood"), /* @__PURE__ */ React.createElement(HarmMatrixVisual, { harms: socialHarms, activeId: activeHarmId, onSelect: setActiveHarmId }), /* @__PURE__ */ React.createElement("p", { className: "harm-matrix-hint" }, "Click a code for pathway, rights, and mitigations (section 6)."))), /* @__PURE__ */ React.createElement("div", { className: "harm-detail-card", "aria-live": "polite" }, /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("span", null, activeHarm.code), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, activeHarm.title), /* @__PURE__ */ React.createElement("p", null, activeHarm.domain, " \xB7 severity ", severityLabel[activeHarm.severity], " \xB7 likelihood", " ", likelihoodLabel[activeHarm.likelihood]))), /* @__PURE__ */ React.createElement("div", { className: "harm-detail-grid" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Who is affected"), /* @__PURE__ */ React.createElement("p", null, activeHarm.affected)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "How the harm arises"), /* @__PURE__ */ React.createElement("p", null, activeHarm.pathway)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Rights / social stakes"), /* @__PURE__ */ React.createElement("p", null, activeHarm.rights)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Accountable owner"), /* @__PURE__ */ React.createElement("p", null, activeHarm.owner))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "impact-misuse" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "5"), /* @__PURE__ */ React.createElement("h2", null, "How could it be used to harm others?"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "Beyond accidental failure: deliberate or institutional misuse \u2014 each tied back to the stakeholder map."), /* @__PURE__ */ React.createElement("div", { className: "impact-scenario-grid" }, misusePaths.map((m2) => /* @__PURE__ */ React.createElement("article", { key: m2.id, className: "impact-scenario impact-scenario--bad" }, /* @__PURE__ */ React.createElement("span", null, m2.id.toUpperCase()), /* @__PURE__ */ React.createElement("h3", null, m2.title), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Who."), " ", m2.who), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "How."), " ", m2.how), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Harm."), " ", m2.harm), /* @__PURE__ */ React.createElement("p", { className: "impact-scenario-foot" }, "Map: ", m2.mapLink)))), /* @__PURE__ */ React.createElement("aside", { className: "report-note report-note-yellow" }, /* @__PURE__ */ React.createElement("b", null, "Design implication"), /* @__PURE__ */ React.createElement("p", null, "Hypothesized edges that make the wall rich (voice, gaze, place, AI layout) also make misuse powerful. Defaults: body data opt-in, strong block/report, non-compulsory use, layout transparency (who seeded the wall), and never measure success as joining ads\u2194feeds."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "impact-measure" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "6"), /* @__PURE__ */ React.createElement("h2", null, "How will we measure these impacts?"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "Measure benefit and harm with the same seriousness. If we only track time-in-headset, we will not see exclusion, steward load, or capture."), /* @__PURE__ */ React.createElement("div", { className: "impact-metric-grid" }, impactMetrics.map((m2) => /* @__PURE__ */ React.createElement("article", { key: m2.group }, /* @__PURE__ */ React.createElement("h3", null, m2.group), /* @__PURE__ */ React.createElement("ul", null, m2.items.map((item) => /* @__PURE__ */ React.createElement("li", { key: item }, item)))))), /* @__PURE__ */ React.createElement("aside", { className: "report-note" }, /* @__PURE__ */ React.createElement("b", null, "Core study design"), /* @__PURE__ */ React.createElement("p", null, "Comparative: same seed discourse as (A) flat feed, (B) Cosmos wall. Primary: comprehension, place memory, calm/agency at exit. Secondary: exclusion, steward load, consent events. Kill criterion: no advantage on primary outcomes after novelty \u2014 or harm metrics worse than feed baseline without clear mitigation path."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "impact-mitigate" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "7"), /* @__PURE__ */ React.createElement("h2", null, "How will we mitigate negative impacts?"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "Selected harm: ", /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--pink)" } }, activeHarm.code, " \xB7 ", activeHarm.title), ". Steps are design and research commitments, not slogans."), /* @__PURE__ */ React.createElement("article", { className: "harm-mitigate-focus" }, /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("span", null, activeHarm.code), /* @__PURE__ */ React.createElement("h3", null, "Mitigate: ", activeHarm.title)), /* @__PURE__ */ React.createElement("p", { className: "harm-mitigate-why" }, activeHarm.pathway), /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 8px", fontSize: "13px", color: "var(--muted)" } }, /* @__PURE__ */ React.createElement("strong", null, "Owner:"), " ", activeHarm.owner), /* @__PURE__ */ React.createElement("ol", null, activeHarm.mitigate.map((step) => /* @__PURE__ */ React.createElement("li", { key: step }, step)))), /* @__PURE__ */ React.createElement("div", { className: "harm-mitigate-grid" }, socialHarms.map((h) => /* @__PURE__ */ React.createElement(
      "article",
      {
        key: h.id,
        id: `mitigate-${h.id}`,
        className: h.id === activeHarmId ? "is-active" : "",
        onClick: () => setActiveHarmId(h.id)
      },
      /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("span", null, h.code), /* @__PURE__ */ React.createElement("i", null, "S", h.severity, " \xB7 L", h.likelihood)),
      /* @__PURE__ */ React.createElement("h3", null, h.title),
      /* @__PURE__ */ React.createElement("p", { className: "harm-mitigate-domain" }, h.domain, " \xB7 ", h.owner),
      /* @__PURE__ */ React.createElement("ol", null, h.mitigate.map((step) => /* @__PURE__ */ React.createElement("li", { key: step }, step)))
    )))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "impact-next" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "8"), /* @__PURE__ */ React.createElement("h2", null, "Commitments (what mitigation demands next)"), /* @__PURE__ */ React.createElement("p", null, "Sequenced against map weaknesses: close opportunity gaps without pretending remaining one-ways disappear."), /* @__PURE__ */ React.createElement("ol", { className: "impact-next-list" }, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Lock anti-harm metrics"), " beside sense-making metrics \u2014 exclusion, steward load, consent, intentional exit \u2014 before any growth dashboard (do not join ads\u2194feeds)."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Cross-device as first-class"), " against hardware tax (H1, H6) \u2014 positive impact must not require premium HMDs only."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Import + stewarded pilots before spectacle"), " against empty-wall chicken-and-egg (H5) \u2014 earn readers\u2194contributors."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Steward tools before multi-user scale"), " \u2014 report, mute zone, audit log (H3, M3); transfer Discord/Reddit craft."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Body data opt-in"), " \u2014 voice/gaze off by default; text-first always (H4, M4); cost-aware AI so capture is not forced by invoice."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Bridge chat homes, don\u2019t replace them"), " \u2014 import/export with Discord-native communities; additive wall job."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Patient capital contracts"), " \u2014 metrics that privilege comprehension over DAU (capital tempo weakness, H2/H8)."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Walk H1\u2013H8 every review"), " with owner + status; publish falsifiers when reverse loyalty stays unproven (H8, M6).")), /* @__PURE__ */ React.createElement("blockquote", { className: "report-quote" }, "Stakeholder analysis says what is already there and what we only hope will be there. Impact analysis says who is helped or hurt if we act \u2014 and what we measure and mitigate when the remaining weaknesses win."))), /* @__PURE__ */ React.createElement("div", { className: "report-next-links impact-next-links" }, /* @__PURE__ */ React.createElement("a", { href: "/cosmos/stakeholder-map/" }, "\u2190 Stakeholder analysis"), /* @__PURE__ */ React.createElement("a", { href: "/cosmos/making/" }, "Next: Making Cosmos \u2192")));
  }
  function TranscriptAppendix({ src }) {
    const [transcript, setTranscript] = useState("Loading transcript\u2026");
    useEffect(() => {
      fetch(src).then((response) => response.ok ? response.text() : Promise.reject(new Error("Transcript unavailable"))).then(setTranscript).catch(() => setTranscript("The transcript could not be loaded."));
    }, [src]);
    return /* @__PURE__ */ React.createElement("details", { className: "transcript-appendix" }, /* @__PURE__ */ React.createElement("summary", null, /* @__PURE__ */ React.createElement("span", null, "Appendix A"), /* @__PURE__ */ React.createElement("b", null, "Read the full interview transcript"), /* @__PURE__ */ React.createElement("i", null, "+")), /* @__PURE__ */ React.createElement("pre", null, transcript));
  }
  var expertQuestions = [
    {
      id: "limitations",
      section: "01",
      label: "Expert background and context",
      question: "In your professional opinion, what are currently the biggest hardware or software limitations preventing long-form text consumption, such as reading forums or articles, in VR?"
    },
    {
      id: "fatigue",
      section: "02",
      label: "Reading experience and ergonomics",
      question: "When users read text in a 3D environment, what are the primary causes of visual fatigue or discomfort, and how can developers mitigate them?"
    },
    {
      id: "typography",
      section: "02",
      label: "Reading experience and ergonomics",
      question: "What are the ideal typographical considerations, including font scale, contrast, viewing distance, and background environment, for reading text-heavy content in VR?"
    },
    {
      id: "ergonomics",
      section: "02",
      label: "Reading experience and ergonomics",
      question: "How do physical ergonomics, including posture, sitting versus standing, and head movement, affect a user's willingness to stay inside a productivity or reading application for an extended period?"
    },
    {
      id: "impressions",
      section: "03",
      label: "Prototype evaluation and interaction design",
      question: "After reviewing the prototype, what are your initial impressions of its visual comfort and spatial hierarchy?"
    },
    {
      id: "periphery",
      section: "03",
      label: "Prototype evaluation and interaction design",
      question: "What expectations would an immersive user have when looking around or exploring the periphery of a text-centric application like this?"
    },
    {
      id: "input",
      section: "03",
      label: "Prototype evaluation and interaction design",
      question: "Which input modalities, such as hand tracking, controllers, or eye tracking, would feel most natural for navigating and organizing text forums in this space? Why?"
    },
    {
      id: "use_cases",
      section: "03",
      label: "Prototype evaluation and interaction design",
      question: "In which physical environments or use cases do you foresee people adopting a spatial forum reader?"
    },
    {
      id: "references",
      section: "04",
      label: "Industry benchmarks and final thoughts",
      question: "Are there existing applications, research papers, or design frameworks concerning text legibility or data visualization in VR that you recommend reviewing?"
    },
    {
      id: "additional",
      section: "04",
      label: "Industry benchmarks and final thoughts",
      question: "Please share any additional feedback, structural recommendations, or ideas for improving user comfort in this concept."
    }
  ];
  function ExpertQuestionnaire() {
    const storageKey = "cosmos-expert-questionnaire-v1";
    const empty = { participant: "", role: "", hours: "", experience: "", reviewed: false, ...Object.fromEntries(expertQuestions.map((item) => [item.id, ""])) };
    const [answers, setAnswers] = useState(() => {
      try {
        return { ...empty, ...JSON.parse(localStorage.getItem(storageKey) || "{}") };
      } catch {
        return empty;
      }
    });
    const [message, setMessage] = useState("");
    useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(answers));
    }, [answers]);
    const update = (key, value) => setAnswers((current) => ({ ...current, [key]: value }));
    const answered = expertQuestions.filter((item) => answers[item.id].trim()).length;
    const responseText = () => [
      "COSMOS REMOTE EXPERT QUESTIONNAIRE",
      `Participant code: ${answers.participant || "Not provided"}`,
      `Role / discipline: ${answers.role || "Not provided"}`,
      `Spatial computing hours per week: ${answers.hours || "Not provided"}`,
      `Experience level: ${answers.experience || "Not provided"}`,
      `Prototype reviewed: ${answers.reviewed ? "Yes" : "No"}`,
      "",
      ...expertQuestions.flatMap((item, index2) => [`${index2 + 1}. ${item.question}`, answers[item.id] || "No response", ""])
    ].join("\n");
    const copyResponses = async () => {
      await navigator.clipboard.writeText(responseText());
      setMessage("Responses copied");
      setTimeout(() => setMessage(""), 1600);
    };
    const downloadResponses = () => {
      const blob = new Blob([responseText()], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `cosmos-expert-response-${answers.participant || "anonymous"}.txt`;
      link.click();
      URL.revokeObjectURL(url);
      setMessage("Response file downloaded");
    };
    const reset = () => {
      if (!window.confirm("Clear every saved response on this device?")) return;
      setAnswers(empty);
      localStorage.removeItem(storageKey);
      setMessage("Responses cleared");
    };
    let lastSection = "";
    return /* @__PURE__ */ React.createElement("section", { className: "report-section questionnaire-page", id: "expert-questionnaire" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "03.5" }, "Primary research / Remote method"), /* @__PURE__ */ React.createElement("div", { className: "questionnaire-shell" }, /* @__PURE__ */ React.createElement("header", { className: "questionnaire-intro" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Remote expert questionnaire"), /* @__PURE__ */ React.createElement("h1", null, "Reading and navigating text in spatial computing"), /* @__PURE__ */ React.createElement("p", null, "This questionnaire collects professional, actionable feedback from UX, UI, XR, and spatial-computing practitioners. Experienced VR users are also welcome to respond."), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "Estimated time \xB7 15\u201320 minutes"), /* @__PURE__ */ React.createElement("span", null, "10 written questions"), /* @__PURE__ */ React.createElement("span", null, "Responses remain on this device"))), /* @__PURE__ */ React.createElement("aside", { className: "questionnaire-privacy" }, /* @__PURE__ */ React.createElement("b", null, "Response handling"), /* @__PURE__ */ React.createElement("p", null, "This page does not transmit answers to a server. Progress is stored only in this browser. When finished, copy or download the response and return it directly to the researcher.")), /* @__PURE__ */ React.createElement("div", { className: "questionnaire-progress" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("i", { style: { width: `${answered / expertQuestions.length * 100}%` } })), /* @__PURE__ */ React.createElement("span", null, answered, " of ", expertQuestions.length, " written questions answered")), /* @__PURE__ */ React.createElement("form", { className: "expert-form", onSubmit: (event) => event.preventDefault() }, /* @__PURE__ */ React.createElement("section", { className: "form-section" }, /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("span", null, "01"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, "Expert background and context"), /* @__PURE__ */ React.createElement("p", null, "Optional identifiers help the researcher interpret your response without requiring personal information."))), /* @__PURE__ */ React.createElement("div", { className: "form-field-grid" }, /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("span", null, "Participant code or initials ", /* @__PURE__ */ React.createElement("i", null, "Optional")), /* @__PURE__ */ React.createElement("input", { value: answers.participant, onChange: (event) => update("participant", event.target.value), placeholder: "Example: XR-04" })), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("span", null, "Role or discipline ", /* @__PURE__ */ React.createElement("i", null, "Optional")), /* @__PURE__ */ React.createElement("input", { value: answers.role, onChange: (event) => update("role", event.target.value), placeholder: "Example: XR interaction designer" })), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("span", null, "Spatial computing hours per week"), /* @__PURE__ */ React.createElement("input", { type: "number", min: "0", step: "0.5", value: answers.hours, onChange: (event) => update("hours", event.target.value), placeholder: "0" })), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("span", null, "Experience level"), /* @__PURE__ */ React.createElement("select", { value: answers.experience, onChange: (event) => update("experience", event.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Select one"), /* @__PURE__ */ React.createElement("option", null, "Experienced user"), /* @__PURE__ */ React.createElement("option", null, "Student / researcher"), /* @__PURE__ */ React.createElement("option", null, "Practitioner, 1\u20133 years"), /* @__PURE__ */ React.createElement("option", null, "Practitioner, 4\u20137 years"), /* @__PURE__ */ React.createElement("option", null, "Practitioner, 8+ years"))))), expertQuestions.map((item, index2) => {
      const showHeading = item.section !== "01" && item.section !== lastSection;
      lastSection = item.section;
      return /* @__PURE__ */ React.createElement(React.Fragment, { key: item.id }, showHeading && /* @__PURE__ */ React.createElement("section", { className: "form-section-heading" }, /* @__PURE__ */ React.createElement("span", null, item.section), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, item.label), item.section === "03" && /* @__PURE__ */ React.createElement("p", null, "Review the early-stage prototype before answering this section."))), item.id === "impressions" && /* @__PURE__ */ React.createElement("div", { className: "prototype-review-box" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Cosmos early prototype"), /* @__PURE__ */ React.createElement("p", null, "Open the prototype in a separate tab. Explore its layout, movement, controls, and text presentation before continuing."), /* @__PURE__ */ React.createElement("a", { href: "https://cosmosweb.web.app/web/", target: "_blank", rel: "noreferrer" }, "Open prototype \u2197")), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: answers.reviewed, onChange: (event) => update("reviewed", event.target.checked) }), /* @__PURE__ */ React.createElement("span", null, "I reviewed the prototype"))), /* @__PURE__ */ React.createElement("label", { className: "question-field" }, /* @__PURE__ */ React.createElement("span", { className: "question-number" }, String(index2 + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("b", null, item.question), /* @__PURE__ */ React.createElement("textarea", { rows: "6", value: answers[item.id], onChange: (event) => update(item.id, event.target.value), placeholder: "Write your response here\u2026" })));
    }), /* @__PURE__ */ React.createElement("footer", { className: "questionnaire-actions" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, answered === expertQuestions.length ? "Questionnaire complete" : "Your progress is saved locally"), /* @__PURE__ */ React.createElement("span", { "aria-live": "polite" }, message)), /* @__PURE__ */ React.createElement("button", { type: "button", className: "form-button text", onClick: reset }, "Clear"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "form-button secondary", onClick: copyResponses }, "Copy responses"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "form-button primary", onClick: downloadResponses }, "Download .txt")))));
  }
  function Version1Review() {
    return /* @__PURE__ */ React.createElement("section", { className: "report-section interview-report", id: "version1-review" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "03.6" }, "Primary research / Submission & Review"), /* @__PURE__ */ React.createElement("article", { className: "report-document interview-document" }, /* @__PURE__ */ React.createElement("header", { className: "report-page-intro interview-intro", style: { borderBottom: "1px solid var(--navy)", paddingBottom: "32px", marginBottom: "32px" } }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "SIGGRAPH 2026 Poster Submission & Peer Review"), /* @__PURE__ */ React.createElement("h1", null, "COSMOS V1", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", null, "Spatial Discourse Browser for AR, VR, and Desktop")), /* @__PURE__ */ React.createElement("figure", { className: "v1-title-figure" }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: "/assets/images/cosmos/v1-hero.jpg",
        alt: "Cosmos V1 spatial discourse browser with face-tracked gaze, floating post cards, and an expanded plant-swap discussion card"
      }
    ), /* @__PURE__ */ React.createElement("figcaption", null, "Cosmos V1 prototype \u2014 planetarium of posts with gaze controls (Gaze / Drag / Auto-open) and expanded card detail.")), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "In April 2026, Cosmos Version 1 was submitted as a poster to SIGGRAPH 2026. While the submission was ultimately rejected, the academic peer review process provided an invaluable diagnostic crucible. The detailed critiques on text legibility, cognitive clutter, and the demand for empirical utility became the direct architectural blueprints for the Version 2 study tested with Kris, Yves, and Johnny."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: "16px", marginTop: "24px", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("a", { className: "source-link", href: "https://cosmosweb.web.app", target: "_blank", rel: "noreferrer", style: { margin: 0 } }, "Launch V1 Live Demo ", /* @__PURE__ */ React.createElement("span", null, "\u2197")), /* @__PURE__ */ React.createElement("a", { className: "source-link", href: "https://github.com/jin-dalrae/2602-Cosmos/", target: "_blank", rel: "noreferrer", style: { margin: 0, borderColor: "var(--pink)", color: "var(--pink)" } }, "Explore V1 GitHub Repository ", /* @__PURE__ */ React.createElement("span", null, "\u2197")))), /* @__PURE__ */ React.createElement("table", { className: "report-table interview-meta", style: { marginBottom: "40px" } }, /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Title"), /* @__PURE__ */ React.createElement("td", null, "COSMOS: Spatial Discourse Browser for AR, VR, and Desktop"), /* @__PURE__ */ React.createElement("th", null, "Author"), /* @__PURE__ */ React.createElement("td", null, "Rae Jin (dalrae.jin.work@gmail.com)")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Submission"), /* @__PURE__ */ React.createElement("td", null, "SIGGRAPH 2026 Poster (Rejected)"), /* @__PURE__ */ React.createElement("th", null, "Date"), /* @__PURE__ */ React.createElement("td", null, "April 21, 2026")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Core Paradigm"), /* @__PURE__ */ React.createElement("td", null, "3D Planetarium spherical discussion mapping"), /* @__PURE__ */ React.createElement("th", null, "Key Technology"), /* @__PURE__ */ React.createElement("td", null, "Five-Agent AI Pipeline & GazeLearner Engine")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Evidence Status"), /* @__PURE__ */ React.createElement("td", { colSpan: "3" }, "Comprehensive functional prototype + 3 peer-review expert panels. Direct lineage to V2.")))), /* @__PURE__ */ React.createElement("nav", { className: "report-contents", "aria-label": "Version 1 report contents" }, /* @__PURE__ */ React.createElement("p", null, "In this report"), /* @__PURE__ */ React.createElement("a", { href: "#v1-problem" }, /* @__PURE__ */ React.createElement("span", null, "0"), "The original problem & pitch"), /* @__PURE__ */ React.createElement("a", { href: "#v1-pipeline" }, /* @__PURE__ */ React.createElement("span", null, "1"), "The 5-Agent AI pipeline"), /* @__PURE__ */ React.createElement("a", { href: "#v1-coordinates" }, /* @__PURE__ */ React.createElement("span", null, "2"), "Spherical coordinate encoding"), /* @__PURE__ */ React.createElement("a", { href: "#v1-input" }, /* @__PURE__ */ React.createElement("span", null, "3"), "Input paradigm & GazeLearner"), /* @__PURE__ */ React.createElement("a", { href: "#v1-reviews" }, /* @__PURE__ */ React.createElement("span", null, "4"), "SIGGRAPH peer reviews verbatim"), /* @__PURE__ */ React.createElement("a", { href: "#v1-pivot" }, /* @__PURE__ */ React.createElement("span", null, "5"), "Strategic pivot responses")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "v1-problem" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "0"), /* @__PURE__ */ React.createElement("h2", null, "The original problem & pitch"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "Every major community platform flattens multi-threaded public debate into a single linear post-after-another feed, erasing the topology of discussion."), /* @__PURE__ */ React.createElement("p", null, "Whether it is Reddit, X, HackerNews, or Discord, feeds decide the sequence of what you read. Readers have zero agency, decision fatigue is high, and polarization accelerates because sorted lists surface the loudest, most extreme voices. 500-comment threads have complex structure: worldviews, bridges, gaps, and logical trajectories, but flat feeds reduce them to a stream of noise."), /* @__PURE__ */ React.createElement("p", null, "Cosmos Version 1 proposed an elegant solution: ", /* @__PURE__ */ React.createElement("b", null, "stand inside the conversation and navigate it with your body.")), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Feed Limitation"), /* @__PURE__ */ React.createElement("th", null, "Cosmos Spatial Answer"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Flatten everything into one stream")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Infinite dimensions:"), " A sphere has every direction. Curiosity determines the reading sequence.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Hide the landscape")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Topics become places:"), " Diverse discussion clusters self-organize in space, connected by bridge posts.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Reward extremes")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Nuance as physical space:"), " Worldview clustering places opposing ideas at opposite sides of the dome, rendering gaps visible.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Exhaust readers")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Passive Gaze Selection:"), " Eliminates manual point-and-click fatigue via continuous body and head coordination.")))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "v1-pipeline" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "1"), /* @__PURE__ */ React.createElement("h2", null, "The 5-Agent AI pipeline"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "To transform raw, unstructured discourse into a coherent physical planetarium, Cosmos V1 developed a structured multi-agent backend pipeline."), /* @__PURE__ */ React.createElement("p", null, "This pipeline doesn't just display data; it extracts semantic dimensions to coordinate the physical geometry of the discussion:"), /* @__PURE__ */ React.createElement("div", { className: "masking-diagram", style: { margin: "24px 0", padding: "24px", background: "rgba(10, 25, 47, 0.3)", borderRadius: "8px", border: "1px solid var(--navy)", display: "flex", flexDirection: "column", gap: "12px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 12px", border: "1px dashed var(--pink)", borderRadius: "4px", fontSize: "11px", color: "var(--pink)" } }, "Topic Input"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "14px", color: "var(--mint)" } }, "\u2192"), /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 12px", border: "1px solid var(--mint)", borderRadius: "4px" } }, /* @__PURE__ */ React.createElement("b", null, "[1] Generator"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "10px", color: "var(--slate)" } }, "150+ diverse voices")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "14px", color: "var(--mint)" } }, "\u2192"), /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 12px", border: "1px solid var(--mint)", borderRadius: "4px" } }, /* @__PURE__ */ React.createElement("b", null, "[2] Cartographer"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "10px", color: "var(--slate)" } }, "Extracts stance & metadata")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "14px", color: "var(--mint)" } }, "\u2192"), /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 12px", border: "1px solid var(--mint)", borderRadius: "4px" } }, /* @__PURE__ */ React.createElement("b", null, "[3] Architect"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "10px", color: "var(--slate)" } }, "Computes 3D coordinates"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "24px", marginTop: "12px", borderTop: "1px solid var(--navy)", paddingTop: "12px" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 12px", border: "1px solid var(--mint)", borderRadius: "4px" } }, /* @__PURE__ */ React.createElement("b", null, "[4] Classifier"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "10px", color: "var(--slate)" } }, "Slots new user posts in real-time")), /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 12px", border: "1px solid var(--mint)", borderRadius: "4px" } }, /* @__PURE__ */ React.createElement("b", null, "[5] Narrator"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "10px", color: "var(--slate)" } }, "Answers meta-questions on topology")))), /* @__PURE__ */ React.createElement("h3", null, "Cartographer Enrichment Profile"), /* @__PURE__ */ React.createElement("p", null, "The Cartographer enriches every post with structural metadata. The resulting schema represents a rich semantic envelope that determines card layout, edge connections, and position hints:"), /* @__PURE__ */ React.createElement("pre", { style: { background: "rgba(10, 25, 47, 0.4)", border: "1px solid var(--navy)", padding: "16px", borderRadius: "8px", overflowX: "auto", fontSize: "12px", color: "var(--mint)" } }, `{
  "id": "post_42",
  "stance": "pro-density-housing",
  "emotion": "passionate",
  "core_claim": "Rent control helps current tenants but discourages new construction",
  "assumptions": ["Free market principles produce optimal housing volume"],
  "logical_chain": {
    "builds_on": ["post_17"],
    "root_premise": "Markets self-correct under supply-side freedom"
  },
  "perceived_by": {
    "renters": "dismissive",
    "developers": "economically sound"
  },
  "relationships": [
    { "target": "post_17", "type": "extends", "strength": 0.95 },
    { "target": "post_31", "type": "rebuts", "strength": 0.88 }
  ],
  "embedding_hint": [0.35, 0.71, -0.18]
}`)), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "v1-coordinates" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2"), /* @__PURE__ */ React.createElement("h2", null, "Spherical coordinate encoding"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "In Cosmos V1, spatial positions are not arbitrary. Visual locations on the planetarium dome directly represent underlying ideological spectrums and levels of conceptual abstraction."), /* @__PURE__ */ React.createElement("p", null, "By converting high-dimensional embeddings into a constrained 3D spherical shell, the coordinate map establishes semantic axes:"), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table report-table-wide" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Sphere Dimension"), /* @__PURE__ */ React.createElement("th", null, "Technical Coordinate"), /* @__PURE__ */ React.createElement("th", null, "Semantic Representation"), /* @__PURE__ */ React.createElement("th", null, "Implementation Details"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Longitude Spectrum")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("code", null, "\\(\\theta\\) (theta_deg)")), /* @__PURE__ */ React.createElement("td", null, "Ideological spectrum and opposing viewpoints."), /* @__PURE__ */ React.createElement("td", null, "Opposing worldviews are mapped to polar opposites ($180^\\circ$ apart) across the horizontal equator.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Latitude Abstraction")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("code", null, "\\(\\phi\\) (phi_deg)")), /* @__PURE__ */ React.createElement("td", null, "Level of conceptual and systemic abstraction."), /* @__PURE__ */ React.createElement("td", null, "Personal accounts sit near the equator (90 degrees); structural or systemic academic papers move toward the poles. Clamped to 30 to 150 degrees to prevent card collision at the poles.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Radius Offset")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("code", null, "r_offset")), /* @__PURE__ */ React.createElement("td", null, "Fine depth adjustment and local layering."), /* @__PURE__ */ React.createElement("td", null, "Adjusted within \xB15% of the sphere's core radius to minimize card overlap and accommodate dense groupings.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Ideological Clustering")), /* @__PURE__ */ React.createElement("td", null, "Local coordinate density"), /* @__PURE__ */ React.createElement("td", null, "Shared assumptions and worldviews."), /* @__PURE__ */ React.createElement("td", null, "Cards sharing identical baseline assumptions group into high-density neighborhoods, rendering clusters immediately visible.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Visual Gaps")), /* @__PURE__ */ React.createElement("td", null, "Empty surface coordinates"), /* @__PURE__ */ React.createElement("td", null, "Missing points of view and unexplored debate territory."), /* @__PURE__ */ React.createElement("td", null, "Unpopulated coordinate zones highlight gaps in the conversational spectrum.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Constellation Edges")), /* @__PURE__ */ React.createElement("td", null, "3D straight line cylinders"), /* @__PURE__ */ React.createElement("td", null, "Semantic discourse relationships."), /* @__PURE__ */ React.createElement("td", null, "Bridges of connection (agrees, disagrees, extends, challenges) are drawn through the sphere interior as glowing color-coded links.")))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "v1-input" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "3"), /* @__PURE__ */ React.createElement("h2", null, "Input paradigm & GazeLearner"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "To reduce physical strain, Cosmos V1 introduced GazeLearner: a zero-calibration, passive eye-head coordination tracking engine."), /* @__PURE__ */ React.createElement("p", null, "Rather than requiring a tedious 9-dot setup cycle before usage, GazeLearner silently trains itself during ordinary browsing actions:"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "1. Initial Steering:"), " The reader rotates the sphere using basic head-pose tracking (driven via MediaPipe at 60fps) or drag gestures."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "2. Natural Ground Truth:"), " Every time the reader clicks a card, the system records the head-pose direction and card orientation as a ground-truth calibration sample."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "3. Linear Regression:"), " Once 5 clicks are completed, the system initializes weighted linear regression calculations to dynamically adjust the raw head-tracking vectors."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "4. Full Calibrated Confidence:"), " By 20 clicks, the model reaches full calibration confidence. It employs an exponential time decay (60-second half-life) to favor recent posture shifts."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "5. Reading Protection Shield:"), " To avoid accidental card changes from rapid eye movements, the system filters out small reading scan motions and blocks targeting behind open articles.")), /* @__PURE__ */ React.createElement("aside", { className: "report-note" }, /* @__PURE__ */ React.createElement("b", null, "Temporal Depth and Dimming"), /* @__PURE__ */ React.createElement("p", null, "As discussions age, they recede back into the starfield. Cosmos V1 maps posts into equal chronological slots. Focal items are fully illuminated, while older layers dim down to 60% via CSS ", /* @__PURE__ */ React.createElement("code", null, "brightness()"), ", forming a visual history trail."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "v1-reviews" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "4"), /* @__PURE__ */ React.createElement("h2", null, "SIGGRAPH 2026 poster peer reviews"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "The submission to SIGGRAPH 2026 received rigorous, direct feedback from three expert peer reviewers. Their assessments identified crucial limitations in visual legibility, visual clutter, and the demand for empirical validation."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", margin: "24px 0" }, className: "expert-cons-grid" }, /* @__PURE__ */ React.createElement("div", { style: { padding: "20px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--navy)", borderRadius: "8px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "11px", textTransform: "uppercase", color: "var(--pink)", fontWeight: "700" } }, "Reviewer 1"), /* @__PURE__ */ React.createElement("h3", { style: { margin: "8px 0", color: "var(--pink)", fontFamily: "var(--serif)" } }, '"Strong & imaginative, but cluttered"'), /* @__PURE__ */ React.createElement("p", { style: { fontSize: "13px", color: "var(--slate)" } }, "Highly praised the originality of standing inside a conversation. However, raised serious readability issues:"), /* @__PURE__ */ React.createElement("ul", { style: { fontSize: "12px", paddingLeft: "16px", color: "var(--slate)" } }, /* @__PURE__ */ React.createElement("li", null, "Distant and faded cards are blurry and hard to read, especially on non-Retina screens."), /* @__PURE__ */ React.createElement("li", null, 'High cognitive load: "Too many cards competing for attention... non-focal items should fade, blur, or move further back."'), /* @__PURE__ */ React.createElement("li", null, "Lack of reading progress indicators (what is read, unread, or new)."), /* @__PURE__ */ React.createElement("li", null, '"AI black box" - users have no mechanism to inspect, verify, or correct stance, emotion, or assumptions.'))), /* @__PURE__ */ React.createElement("div", { style: { padding: "20px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--navy)", borderRadius: "8px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "11px", textTransform: "uppercase", color: "var(--mint)", fontWeight: "700" } }, "Reviewer 2"), /* @__PURE__ */ React.createElement("h3", { style: { margin: "8px 0", color: "var(--mint)", fontFamily: "var(--serif)" } }, '"High originality, venue mismatch"'), /* @__PURE__ */ React.createElement("p", { style: { fontSize: "13px", color: "var(--slate)" } }, "Acknowledged extremely high novelty and an artistic, genuinely distinctive perspective."), /* @__PURE__ */ React.createElement("ul", { style: { fontSize: "12px", paddingLeft: "16px", color: "var(--slate)" } }, /* @__PURE__ */ React.createElement("li", null, "Noted that the project proposes a highly valuable and interesting conceptual leap."), /* @__PURE__ */ React.createElement("li", null, "Stressed a venue mismatch: SIGGRAPH reviewers skew heavily towards core computer graphics algorithms (geometric shaders, ray tracing) rather than novel reading layouts and interactive social computing."))), /* @__PURE__ */ React.createElement("div", { style: { padding: "20px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--navy)", borderRadius: "8px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "11px", textTransform: "uppercase", color: "var(--yellow)", fontWeight: "700" } }, "Reviewer 3"), /* @__PURE__ */ React.createElement("h3", { style: { margin: "8px 0", color: "var(--yellow)", fontFamily: "var(--serif)" } }, '"Unproven utility & unremarkable"'), /* @__PURE__ */ React.createElement("p", { style: { fontSize: "13px", color: "var(--slate)" } }, "Delivered a highly critical evaluation of the technical and visual implementation:"), /* @__PURE__ */ React.createElement("ul", { style: { fontSize: "12px", paddingLeft: "16px", color: "var(--slate)" } }, /* @__PURE__ */ React.createElement("li", null, 'Evaluated the visuals as "unremarkable" standard CSS-Three.js HTML sprites, lacking deep computer graphics sophistication.'), /* @__PURE__ */ React.createElement("li", null, "Challenged the five-agent pipeline as unnecessary, over-engineered prompting."), /* @__PURE__ */ React.createElement("li", null, "Noted that while VR/AR support was claimed, it was not demonstrably working in the submitted video materials."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Severe gap:"), ' Complete lack of human-subjects evaluation. "Is a spatial list actually better or faster for reading than a 2D feed?"'))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "v1-pivot" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "5"), /* @__PURE__ */ React.createElement("h2", null, "Strategic pivot responses: Designing V2"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "Rather than seeing the rejection as a setback, the criticisms became the direct catalyst for Cosmos Version 2, turning unproven hypotheses into a rigorous, human-centered study."), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table report-table-wide" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "SIGGRAPH Peer Critique"), /* @__PURE__ */ React.createElement("th", null, "Pivot Strategy for Version 2"), /* @__PURE__ */ React.createElement("th", null, "Implemented V2 Design Proof"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "R1: Distant cards are unreadable and blurry")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Strict physical depth boundaries")), /* @__PURE__ */ React.createElement("td", null, "Constrained depth layout to comfortable 1.5\u20132.0m zone, ensuring text remains within human subpixel-AA limits.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "R1: Excessive visual noise & cognitive load")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Focus plus Context (Achromatic Voids)")), /* @__PURE__ */ React.createElement("td", null, "When an item is opened, the surrounding sphere dims, applies light Gaussian blur, and translates deeper into the background.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "R1: No reading progress cues")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Persistent reading states")), /* @__PURE__ */ React.createElement("td", null, "Integrated localStorage-backed read/unread states, visually fading completed posts while highlighting newly arriving items.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, 'R1: "AI black-box" & trust skepticism')), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Absolute Source Provenance")), /* @__PURE__ */ React.createElement("td", null, "Elevated raw sources. Every summary tag and stance categorization has a double-click inspector tracing directly back to original human text.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "R3: AR/VR support claimed but not demonstrated")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Native WebXR integration")), /* @__PURE__ */ React.createElement("td", null, "Completed full WebXR camera integrations allowing Quest 3 and Vision Pro browsers to drive spatial viewing with zero external dependencies.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "R3: Complete lack of user evaluation")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Empirical qualitative user studies")), /* @__PURE__ */ React.createElement("td", null, "Designed and conducted in-depth think-aloud studies with Software Engineer Kris, 3D Artist Yves, and Designer Johnny to measure legibility, trust, and fatigue."))))), /* @__PURE__ */ React.createElement("div", { className: "cosmos-implication", style: { marginTop: "40px" } }, /* @__PURE__ */ React.createElement("span", null, "The Core Trajectory"), /* @__PURE__ */ React.createElement("h2", null, "From graphics novelty to reading ergonomics."), /* @__PURE__ */ React.createElement("p", { style: { margin: 0 } }, `SIGGRAPH's feedback forced Cosmos to mature. By moving away from purely "novel 3D visualizations" and focusing on the `, /* @__PURE__ */ React.createElement("b", null, "hard, human physical constraints of reading in VR"), ", the project shifted its core metric of success: away from visual flash, and toward long-term visual comfort and absolute semantic trust.")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: "48px", borderTop: "1px solid var(--navy)", paddingTop: "24px" } }, /* @__PURE__ */ React.createElement("a", { href: "/cosmos/primary/expert-questionnaire/", className: "text-link", style: { fontSize: "14px" } }, "\u2190 Previous: Expert questionnaire"), /* @__PURE__ */ React.createElement("a", { href: "/cosmos/user-waveline/", className: "text-link", style: { fontSize: "14px" } }, "Next: User waveline \u2192")))));
  }
  function App() {
    const secondaryPage = window.location.pathname.includes("/secondary/spatial-communications") ? "spatial-audio" : window.location.pathname.includes("/secondary/memory-pods") ? "memory-pods" : window.location.pathname.includes("/secondary/socially-late") ? "socially-late" : window.location.pathname.includes("/secondary/vr-reading") ? "vr-reading" : "overview";
    const primaryPage = window.location.pathname.includes("/primary/interview-kris") ? "interview-kris" : window.location.pathname.includes("/primary/interview-yves") ? "interview-yves" : window.location.pathname.includes("/primary/interview-johnny") ? "interview-johnny" : window.location.pathname.includes("/primary/interview-jd-suh") ? "interview-jd-suh" : window.location.pathname.includes("/primary/expert-questionnaire") ? "expert-questionnaire" : window.location.pathname.includes("/primary/version1-review") ? "version1-review" : "overview";
    const activeChapter = window.location.pathname.includes("/secondary") ? "secondary" : window.location.pathname.includes("/primary") ? "primary" : window.location.pathname.includes("/user-waveline") ? "user-waveline" : window.location.pathname.includes("/storyboard") ? "storyboard" : window.location.pathname.includes("/stakeholder-map") ? "stakeholder-map" : window.location.pathname.includes("/impact-analysis") ? "impact-analysis" : window.location.pathname.includes("/making") ? "making" : "intro";
    return /* @__PURE__ */ React.createElement("div", { id: "top" }, /* @__PURE__ */ React.createElement(Progress, null), /* @__PURE__ */ React.createElement(CosmosHeader, null), /* @__PURE__ */ React.createElement(CosmosSidebar, { active: activeChapter, subActive: activeChapter === "secondary" ? secondaryPage : activeChapter === "primary" ? primaryPage : void 0 }), /* @__PURE__ */ React.createElement("main", null, activeChapter === "primary" && primaryPage === "expert-questionnaire" && /* @__PURE__ */ React.createElement(ExpertQuestionnaire, null), activeChapter === "primary" && primaryPage === "version1-review" && /* @__PURE__ */ React.createElement(Version1Review, null), activeChapter === "user-waveline" && /* @__PURE__ */ React.createElement(UserWavelinePage, null), activeChapter === "storyboard" && /* @__PURE__ */ React.createElement(StoryboardPage, null), activeChapter === "stakeholder-map" && /* @__PURE__ */ React.createElement(StakeholderMapPage, null), activeChapter === "impact-analysis" && /* @__PURE__ */ React.createElement(ImpactAnalysisPage, null), activeChapter === "intro" && /* @__PURE__ */ React.createElement("section", { className: "hero", id: "intro" }, /* @__PURE__ */ React.createElement("div", { className: "hero-kicker" }, /* @__PURE__ */ React.createElement("span", null, "Independent research"), /* @__PURE__ */ React.createElement("span", null, "June 2026")), /* @__PURE__ */ React.createElement("div", { className: "hero-grid" }, /* @__PURE__ */ React.createElement("div", { className: "hero-copy" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Spatializing asynchronous community"), /* @__PURE__ */ React.createElement("h1", null, "A community wall", /* @__PURE__ */ React.createElement("br", null), "you can ", /* @__PURE__ */ React.createElement("em", null, "walk into.")), /* @__PURE__ */ React.createElement("p", { className: "hero-summary" }, "Cosmos investigates whether VR can make online discussions easier to understand by rebuilding a familiar offline behavior: reading a public wall."), /* @__PURE__ */ React.createElement("a", { className: "text-link", href: "/cosmos/secondary/" }, "Read the findings ", /* @__PURE__ */ React.createElement("span", null, "\u2192"))), /* @__PURE__ */ React.createElement("figure", { className: "hero-figure" }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: "/assets/images/cosmos/intro-hero.jpg",
        alt: "Cosmos spatial discourse wall over a living room: post cards arranged in space with an expanded taco-truck parking discussion card"
      }
    ), /* @__PURE__ */ React.createElement("figcaption", null, "Cosmos prototype \u2014 discourse as a spatial wall in the room (passthrough / living-space browse)."))), /* @__PURE__ */ React.createElement("div", { className: "thesis-strip" }, /* @__PURE__ */ React.createElement("span", { className: "thesis-number" }, "01"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Working thesis"), " Cosmos is not another social feed or a live voice room. It is a VR reconstruction of an offline asynchronous community wall.")), /* @__PURE__ */ React.createElement("article", { className: "report-document" }, /* @__PURE__ */ React.createElement("nav", { className: "report-contents", "aria-label": "Introduction contents" }, /* @__PURE__ */ React.createElement("p", null, "In this report"), /* @__PURE__ */ React.createElement("a", { href: "#summary" }, /* @__PURE__ */ React.createElement("span", null, "0"), "Executive summary"), /* @__PURE__ */ React.createElement("a", { href: "#audit" }, /* @__PURE__ */ React.createElement("span", null, "1"), "Research audit"), /* @__PURE__ */ React.createElement("a", { href: "#direction" }, /* @__PURE__ */ React.createElement("span", null, "2"), "Research direction"), /* @__PURE__ */ React.createElement("a", { href: "#questions" }, /* @__PURE__ */ React.createElement("span", null, "3"), "Research questions"), /* @__PURE__ */ React.createElement("a", { href: "#strategy" }, /* @__PURE__ */ React.createElement("span", null, "4"), "Wall-first strategy"), /* @__PURE__ */ React.createElement("a", { href: "#evidence" }, /* @__PURE__ */ React.createElement("span", null, "5"), "Evidence matrix"), /* @__PURE__ */ React.createElement("a", { href: "#next" }, /* @__PURE__ */ React.createElement("span", null, "6"), "Research still needed")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "summary" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "0"), /* @__PURE__ */ React.createElement("h2", null, "Executive summary"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "Cosmos is a research project about whether asynchronous online community can become easier to understand when discussion is organized as a place rather than a feed."), /* @__PURE__ */ React.createElement("p", null, "The project was initially framed as a spatial discourse browser and an alternative to headset doomscrolling. That framing identified a broad problem but did not sufficiently explain why spatial interaction was necessary, which existing behavior the product should preserve, or how Cosmos differed from social VR, an AI summary, or a conventional feed placed in 3D."), /* @__PURE__ */ React.createElement("p", null, "The research direction changed after examining offline bulletin boards, poster walls, sticky-note walls, and other public message surfaces. These environments already support asynchronous community. Messages accumulate over time; people read by moving, scanning, and approaching; position and density become signals; and participation remains possible without requiring immediate speech or posting."), /* @__PURE__ */ React.createElement("p", null, "The resulting proposal is narrower: Cosmos should begin as a VR reconstruction of an offline asynchronous community wall. Existing discussions may provide seed material, but the product metaphor is the wall\u2014not the feed and not the live room."), /* @__PURE__ */ React.createElement("aside", { className: "report-note" }, /* @__PURE__ */ React.createElement("b", null, "Current conclusion"), /* @__PURE__ */ React.createElement("p", null, "Cosmos is not validated yet, but it is now researchable. A comparative study can test whether a VR community wall improves comprehension, reading comfort, source inspection, and place memory relative to a flat feed."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "audit" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "1"), /* @__PURE__ */ React.createElement("h2", null, "Research audit"), /* @__PURE__ */ React.createElement("h3", null, "Is the direction correct?"), /* @__PURE__ */ React.createElement("p", null, "Yes, but the reason changed. The earlier concept assumed that feeds were unpleasant and that spatial browsing might provide an alternative. The updated direction begins with a more specific precedent: offline communities already use spatial surfaces for low-pressure asynchronous participation."), /* @__PURE__ */ React.createElement("p", null, "This changes the design question. Cosmos is no longer asking how to make a feed immersive. It asks which useful properties of a physical community wall can survive translation into VR, mixed reality, and desktop interaction."), /* @__PURE__ */ React.createElement("h3", null, "What was missing from the earlier concept?"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "Evidence that reading without posting is a meaningful form of participation rather than inactivity."), /* @__PURE__ */ React.createElement("li", null, "A clear reason to use bulletin boards, poster walls, and note walls as the primary design reference."), /* @__PURE__ */ React.createElement("li", null, "A testable account of how spatial layout supports comprehension rather than decoration."), /* @__PURE__ */ React.createElement("li", null, "A boundary between asynchronous spatial browsing and voice-forward social VR."), /* @__PURE__ */ React.createElement("li", null, "A market argument explaining what Reddit, Discord, VRChat, spatial windows, and AI summaries do not solve."), /* @__PURE__ */ React.createElement("li", null, "A strategy for testing the wall before attempting to build a new community platform."), /* @__PURE__ */ React.createElement("li", null, "Measures that could invalidate the concept if the spatial wall does not outperform a flat-feed baseline."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "direction" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2"), /* @__PURE__ */ React.createElement("h2", null, "Research direction"), /* @__PURE__ */ React.createElement("p", null, "Cosmos should be researched as a VR reconstruction of offline asynchronous community walls: bulletin boards, poster walls, sticky-note walls, and public message surfaces. It is not a headset-only social world, a new community platform on day one, or a live spatial voice room."), /* @__PURE__ */ React.createElement("blockquote", { className: "report-quote" }, "Offline communities already use spatial surfaces for asynchronous participation. Cosmos tests whether VR can rebuild that wall-like behavior while preserving low pressure, source inspection, and place memory."), /* @__PURE__ */ React.createElement("h3", null, "What the wall contributes"), /* @__PURE__ */ React.createElement("p", null, "A physical wall exposes the shape of participation without requiring a ranking algorithm. Density shows where attention has accumulated. Proximity suggests relationship. Layering records time and contestation. Material differences help readers distinguish voices. Movement lets people alternate between scanning the whole and reading a particular message closely."), /* @__PURE__ */ React.createElement("figure", { className: "report-figure" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("img", { src: "/offline-spatial-asyncronous-community/Screenshot%202026-06-11%20at%2011.40.57.png", alt: "A person reading a dense public poster wall" }), /* @__PURE__ */ React.createElement("img", { src: "/offline-spatial-asyncronous-community/Screenshot%202026-06-11%20at%2011.41.08.png", alt: "A public wall covered in accumulated handwritten notes" }), /* @__PURE__ */ React.createElement("img", { src: "/offline-spatial-asyncronous-community/Screenshot%202026-06-11%20at%2011.41.13.png", alt: "A community wall with pinned house-shaped notes" })), /* @__PURE__ */ React.createElement("figcaption", null, /* @__PURE__ */ React.createElement("span", null, "Figure 1"), " Offline walls are asynchronous, spatial, persistent, public, and readable without contribution. The prototype should test which of these properties remain useful in a digital environment.")), /* @__PURE__ */ React.createElement("h3", null, "Core hypothesis"), /* @__PURE__ */ React.createElement("p", null, "The primary hypothesis is not that immersion is inherently better. It is that position, distance, density, and movement may provide usable orientation cues for a complex discussion."), /* @__PURE__ */ React.createElement("aside", { className: "report-note report-note-yellow" }, /* @__PURE__ */ React.createElement("b", null, "Comparative question"), /* @__PURE__ */ React.createElement("p", null, "Can people understand and remember an asynchronous discussion more comfortably in a VR community wall than in a flat feed?")), /* @__PURE__ */ React.createElement("h3", null, "Device scope"), /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Device mode"), /* @__PURE__ */ React.createElement("th", null, "Role in the research"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Desktop"), /* @__PURE__ */ React.createElement("td", null, "Broad access, baseline usability, and the flat-feed comparison condition.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Quest 3 / mixed reality"), /* @__PURE__ */ React.createElement("td", null, "Immersive spatial browsing, embodied navigation, and reading-comfort testing.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Vision Pro"), /* @__PURE__ */ React.createElement("td", null, "Spatial reading, gaze and focus behavior, and window/card layout.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Smart-glasses direction"), /* @__PURE__ */ React.createElement("td", null, "Glanceable labels, saved paths, alerts, and lightweight resurfacing\u2014not deep reading."))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "questions" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "3"), /* @__PURE__ */ React.createElement("h2", null, "Research questions"), /* @__PURE__ */ React.createElement("table", { className: "report-table report-table-questions" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Research question"), /* @__PURE__ */ React.createElement("th", null, "What the study needs to learn"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "What do users want?"), /* @__PURE__ */ React.createElement("td", null, "Whether the need is low-pressure reading, debate sensemaking, place memory, wall-like contribution, or simply faster summaries.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "What should Cosmos preserve from offline walls?"), /* @__PURE__ */ React.createElement("td", null, "Which qualities matter: density, layering, proximity, handwriting and materiality, return paths, publicness, or social permission.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "What is already offered in the market?"), /* @__PURE__ */ React.createElement("td", null, "How forums, chat platforms, social VR, spatial operating systems, smart glasses, and AI summarizers divide the problem.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "What should Cosmos become?"), /* @__PURE__ */ React.createElement("td", null, "Whether it should remain a wall/browser or eventually justify a native community platform.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "What role should live audio have?"), /* @__PURE__ */ React.createElement("td", null, "Whether spatial voice belongs only as optional later co-presence after asynchronous browsing proves valuable.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Which interactions are worth testing?"), /* @__PURE__ */ React.createElement("td", null, "Wall browsing, labels, source inspection, missing-voice surfacing, saved paths, and cross-device continuity.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "What evidence would validate the concept?"), /* @__PURE__ */ React.createElement("td", null, "A measurable improvement in comprehension, comfort, trust, or place memory against a controlled flat-feed baseline."))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "strategy" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "4"), /* @__PURE__ */ React.createElement("h2", null, "Current recommendation: wall first, platform later"), /* @__PURE__ */ React.createElement("p", null, "Cosmos should begin with a controlled, permission-cleared message wall using participant-created notes, class or community discussions, research comments, or synthetic datasets. The first release does not need to host a complete native community."), /* @__PURE__ */ React.createElement("p", null, "This sequence isolates the project\u2019s distinctive claim. Hosting posts is not novel; the relevant question is whether a spatial public surface creates comprehension, orientation, and return value that existing feeds do not."), /* @__PURE__ */ React.createElement("ol", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Control the initial content."), " Avoid a platform cold start and make the comparison reproducible."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Prove wall browsing."), " Test density, clustering, source inspection, and place memory before adding social layers."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Add personal continuity."), " Introduce saved paths, annotations, collected regions, and return-to-place behavior."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Add light contribution."), " Let people leave notes, ask questions, and identify missing voices without requiring live presence."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Consider native community or spatial voice later."), " Add infrastructure only when the wall provides a demonstrated reason to return.")), /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Phase"), /* @__PURE__ */ React.createElement("th", null, "Strategy"), /* @__PURE__ */ React.createElement("th", null, "Goal"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "1"), /* @__PURE__ */ React.createElement("td", null, "Controlled VR message wall"), /* @__PURE__ */ React.createElement("td", null, "Test comprehension, comfort, trust, and place memory.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "2"), /* @__PURE__ */ React.createElement("td", null, "Personal actions"), /* @__PURE__ */ React.createElement("td", null, "Support saving, annotating, comparing, and returning.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "3"), /* @__PURE__ */ React.createElement("td", null, "Light wall contribution"), /* @__PURE__ */ React.createElement("td", null, "Test participation without live-room pressure.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "4"), /* @__PURE__ */ React.createElement("td", null, "Native community or engineered voice"), /* @__PURE__ */ React.createElement("td", null, "Proceed only if earlier phases establish sustained value."))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "evidence" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "5"), /* @__PURE__ */ React.createElement("h2", null, "Evidence matrix"), /* @__PURE__ */ React.createElement("p", null, "The current evidence supports a research program, not a product conclusion. Each claim below remains linked to a specific primary-research requirement."), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table report-table-wide" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Claim"), /* @__PURE__ */ React.createElement("th", null, "Current strength"), /* @__PURE__ */ React.createElement("th", null, "Current basis"), /* @__PURE__ */ React.createElement("th", null, "What still needs testing"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Offline async community already has spatial form"), /* @__PURE__ */ React.createElement("td", null, "Strong design-reference support"), /* @__PURE__ */ React.createElement("td", null, "Poster walls, bulletin boards, and public note walls"), /* @__PURE__ */ React.createElement("td", null, "Field observation and prototype translation")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Reading without posting is meaningful behavior"), /* @__PURE__ */ React.createElement("td", null, "Strong literature support"), /* @__PURE__ */ React.createElement("td", null, "Lurking and participation-inequality research"), /* @__PURE__ */ React.createElement("td", null, "Interviews with the target audience")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Feeds make structure difficult to see"), /* @__PURE__ */ React.createElement("td", null, "Moderate support"), /* @__PURE__ */ React.createElement("td", null, "Feed fatigue and information-overload research"), /* @__PURE__ */ React.createElement("td", null, "Flat feed versus Cosmos task comparison")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Voice-forward social VR can create pressure"), /* @__PURE__ */ React.createElement("td", null, "Moderate support"), /* @__PURE__ */ React.createElement("td", null, "Social VR research and public user discourse"), /* @__PURE__ */ React.createElement("td", null, "Interviews with social VR users")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Spatial layout may support sensemaking"), /* @__PURE__ */ React.createElement("td", null, "Moderate theory support"), /* @__PURE__ */ React.createElement("td", null, "Spatial hypertext, information foraging, and visual sensemaking"), /* @__PURE__ */ React.createElement("td", null, "Comprehension and place-memory testing")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Headset text comfort is fragile"), /* @__PURE__ */ React.createElement("td", null, "Strong support"), /* @__PURE__ */ React.createElement("td", null, "VR interface, reading, and cybersickness research"), /* @__PURE__ */ React.createElement("td", null, "Testing on real devices")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "AI summaries need source inspection"), /* @__PURE__ */ React.createElement("td", null, "Strong technical support"), /* @__PURE__ */ React.createElement("td", null, "Summarization consistency and AI-trust research"), /* @__PURE__ */ React.createElement("td", null, "Source-trace and correction tasks")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Wall-first is the right strategy"), /* @__PURE__ */ React.createElement("td", null, "Strategic inference"), /* @__PURE__ */ React.createElement("td", null, "Reference model, platform cold-start logic, and content rights"), /* @__PURE__ */ React.createElement("td", null, "User preference, return intent, and expert review")))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "next" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "6"), /* @__PURE__ */ React.createElement("h2", null, "Research still needed"), /* @__PURE__ */ React.createElement("h3", null, "Literature review"), /* @__PURE__ */ React.createElement("p", null, "Expand the review of non-public participation, offline message walls, social media fatigue, information foraging, spatial memory, VR reading comfort, spatial communications, and trustworthy AI summaries."), /* @__PURE__ */ React.createElement("h3", null, "Competitive analysis"), /* @__PURE__ */ React.createElement("p", null, "Compare Reddit, Discord, argument-mapping tools, VRChat, VIVERSE, Vision Pro browsing, AI answer engines, and research-synthesis tools using the same criteria: orientation, pressure, source visibility, comfort, and return behavior."), /* @__PURE__ */ React.createElement("h3", null, "Primary research"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "Six comparative user tests using the same discussion in a flat feed and VR wall."), /* @__PURE__ */ React.createElement("li", null, "Three to five expert interviews across XR, online community, moderation, and spatial communication."), /* @__PURE__ */ React.createElement("li", null, "A survey of 30\u201350 early respondents, followed by interviews with quiet readers and XR users."), /* @__PURE__ */ React.createElement("li", null, "Two or three observations of physical community walls or recreated note-wall sessions."), /* @__PURE__ */ React.createElement("li", null, "An optional later test of ambient co-presence or spatial audio after asynchronous wall browsing works.")), /* @__PURE__ */ React.createElement("aside", { className: "report-note" }, /* @__PURE__ */ React.createElement("b", null, "Decision rule"), /* @__PURE__ */ React.createElement("p", null, "If spatial layout does not improve comprehension, comfort, trust, or place memory relative to a flat feed, Cosmos should not add more immersive or social complexity.")), /* @__PURE__ */ React.createElement("div", { className: "report-next-links" }, /* @__PURE__ */ React.createElement("a", { href: "/cosmos/secondary/" }, "Continue to secondary research ", /* @__PURE__ */ React.createElement("span", null, "\u2192")), /* @__PURE__ */ React.createElement("a", { href: "/cosmos/primary/" }, "Review the primary study plan ", /* @__PURE__ */ React.createElement("span", null, "\u2192")))))), activeChapter === "secondary" && secondaryPage === "overview" && /* @__PURE__ */ React.createElement("section", { className: "report-section secondary", id: "secondary" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "02" }, "Secondary research"), /* @__PURE__ */ React.createElement("article", { className: "report-document secondary-document" }, /* @__PURE__ */ React.createElement("header", { className: "report-page-intro" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Evidence synthesis"), /* @__PURE__ */ React.createElement("h1", null, "The feed is optimized for momentum. The wall is optimized for orientation."), /* @__PURE__ */ React.createElement("p", null, "This review examines whether existing research supports the central Cosmos proposition: that an asynchronous discussion can become easier to understand when its structure is spatial, persistent, and readable without pressure to contribute.")), /* @__PURE__ */ React.createElement("nav", { className: "report-contents", "aria-label": "Secondary research contents" }, /* @__PURE__ */ React.createElement("p", null, "In this report"), /* @__PURE__ */ React.createElement("a", { href: "#secondary-method" }, /* @__PURE__ */ React.createElement("span", null, "0"), "Scope and method"), /* @__PURE__ */ React.createElement("a", { href: "#secondary-map" }, /* @__PURE__ */ React.createElement("span", null, "1"), "Evidence map"), /* @__PURE__ */ React.createElement("a", { href: "#secondary-walls" }, /* @__PURE__ */ React.createElement("span", null, "2"), "Offline community walls"), /* @__PURE__ */ React.createElement("a", { href: "#secondary-reading" }, /* @__PURE__ */ React.createElement("span", null, "3"), "Quiet reading"), /* @__PURE__ */ React.createElement("a", { href: "#secondary-space" }, /* @__PURE__ */ React.createElement("span", null, "4"), "Spatial communication"), /* @__PURE__ */ React.createElement("a", { href: "#secondary-market" }, /* @__PURE__ */ React.createElement("span", null, "5"), "Market landscape"), /* @__PURE__ */ React.createElement("a", { href: "#secondary-xr" }, /* @__PURE__ */ React.createElement("span", null, "6"), "XR reading and devices"), /* @__PURE__ */ React.createElement("a", { href: "#secondary-ai" }, /* @__PURE__ */ React.createElement("span", null, "7"), "AI and source trust"), /* @__PURE__ */ React.createElement("a", { href: "#secondary-synthesis" }, /* @__PURE__ */ React.createElement("span", null, "8"), "Synthesis"), /* @__PURE__ */ React.createElement("a", { href: "#secondary-gaps" }, /* @__PURE__ */ React.createElement("span", null, "9"), "Evidence gaps")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "secondary-method" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "0"), /* @__PURE__ */ React.createElement("h2", null, "Scope and method"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "The secondary research tests the assumptions behind Cosmos before the project commits to a platform, interaction model, or hardware-specific implementation."), /* @__PURE__ */ React.createElement("p", null, "The review combines research on online participation, social media fatigue, information foraging, spatial memory, VR interface comfort, trustworthy AI summarization, and large-scale spatial communications. It also uses offline message walls as design references and compares adjacent products across forums, chat, social VR, spatial computing, structured debate, and AI synthesis."), /* @__PURE__ */ React.createElement("p", null, "Evidence is evaluated by strength and by relevance. A strong adjacent finding does not automatically validate Cosmos. For example, spatial audio research demonstrates that location cues can help attention, but it does not prove that a spatial message wall improves reading comprehension. Those claims remain separate."), /* @__PURE__ */ React.createElement("aside", { className: "report-note" }, /* @__PURE__ */ React.createElement("b", null, "Review standard"), /* @__PURE__ */ React.createElement("p", null, "Each evidence cluster must produce a limited conclusion, a product implication, and a primary-research question. The review does not treat conceptual fit as validation."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "secondary-map" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "1"), /* @__PURE__ */ React.createElement("h2", null, "Evidence map"), /* @__PURE__ */ React.createElement("p", null, "The review supports eight working conclusions. Their evidence strength varies, and several depend on direct comparative testing."), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table report-table-wide" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Evidence cluster"), /* @__PURE__ */ React.createElement("th", null, "Working conclusion"), /* @__PURE__ */ React.createElement("th", null, "Strength"), /* @__PURE__ */ React.createElement("th", null, "Primary research required"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Offline community walls"), /* @__PURE__ */ React.createElement("td", null, "Rebuild the wall, not the feed."), /* @__PURE__ */ React.createElement("td", null, "Strong design-reference support"), /* @__PURE__ */ React.createElement("td", null, "Observe wall use and test translation into VR.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Non-posting participation"), /* @__PURE__ */ React.createElement("td", null, "Design for quiet readers first."), /* @__PURE__ */ React.createElement("td", null, "Strong literature support"), /* @__PURE__ */ React.createElement("td", null, "Interview the intended audience.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Feed and algorithm fatigue"), /* @__PURE__ */ React.createElement("td", null, "Provide orientation rather than another ranking system."), /* @__PURE__ */ React.createElement("td", null, "Moderate support"), /* @__PURE__ */ React.createElement("td", null, "Compare task performance against a flat feed.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Spatial communications"), /* @__PURE__ */ React.createElement("td", null, "Use spatial attention cues; defer live voice."), /* @__PURE__ */ React.createElement("td", null, "Strong adjacent technical support"), /* @__PURE__ */ React.createElement("td", null, "Test async spatial browsing before co-presence.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "XR reading comfort"), /* @__PURE__ */ React.createElement("td", null, "Reading comfort is a product requirement."), /* @__PURE__ */ React.createElement("td", null, "Strong support"), /* @__PURE__ */ React.createElement("td", null, "Test typography and navigation on real devices.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Device landscape"), /* @__PURE__ */ React.createElement("td", null, "Cosmos must be cross-device."), /* @__PURE__ */ React.createElement("td", null, "Strong market support"), /* @__PURE__ */ React.createElement("td", null, "Match tasks to desktop, headset, and glasses modes.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "AI summarization"), /* @__PURE__ */ React.createElement("td", null, "Every generated label needs a source trail."), /* @__PURE__ */ React.createElement("td", null, "Strong technical support"), /* @__PURE__ */ React.createElement("td", null, "Run source-trace and correction tasks.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Product strategy"), /* @__PURE__ */ React.createElement("td", null, "Prove the VR wall before building a platform."), /* @__PURE__ */ React.createElement("td", null, "Strategic inference"), /* @__PURE__ */ React.createElement("td", null, "Measure preference, return intent, and contribution behavior.")))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "secondary-walls" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2"), /* @__PURE__ */ React.createElement("h2", null, "Offline community walls are the primary reference model"), /* @__PURE__ */ React.createElement("p", null, "Bulletin boards, poster walls, sticky-note walls, and public message surfaces are asynchronous community systems. Participants contribute at different times, while readers encounter the accumulated material later. The wall does not require everyone to be present or speaking together."), /* @__PURE__ */ React.createElement("p", null, "These surfaces are also spatial. Placement, density, repetition, proximity, material difference, and layering contribute to meaning. Readers alternate between scanning the whole wall and moving closer to inspect a particular item. They can return to a remembered location even when they cannot recall an exact title or author."), /* @__PURE__ */ React.createElement("p", null, "The most relevant property is social permission. Reading is a legitimate activity; adding a note is optional. The community remains perceptible through its traces without requiring a performance of participation."), /* @__PURE__ */ React.createElement("figure", { className: "report-figure" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("img", { src: "/offline-spatial-asyncronous-community/Screenshot%202026-06-11%20at%2011.40.57.png", alt: "Dense public poster wall" }), /* @__PURE__ */ React.createElement("img", { src: "/offline-spatial-asyncronous-community/Screenshot%202026-06-11%20at%2011.41.08.png", alt: "Public wall covered with handwritten notes" }), /* @__PURE__ */ React.createElement("img", { src: "/offline-spatial-asyncronous-community/Screenshot%202026-06-11%20at%2011.41.13.png", alt: "Curated community note wall" })), /* @__PURE__ */ React.createElement("figcaption", null, /* @__PURE__ */ React.createElement("span", null, "Figure 1"), " Three wall conditions: dense informational display, accumulated public contribution, and curated community messages. Each makes participation visible through spatial arrangement.")), /* @__PURE__ */ React.createElement("aside", { className: "report-note report-note-yellow" }, /* @__PURE__ */ React.createElement("b", null, "Implication for Cosmos"), /* @__PURE__ */ React.createElement("p", null, "The prototype should preserve scanning, density, adjacency, optional contribution, and return-to-place behavior. Internet threads may provide content, but they should not determine the interaction metaphor."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "secondary-reading" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "3"), /* @__PURE__ */ React.createElement("h2", null, "Quiet reading is meaningful participation"), /* @__PURE__ */ React.createElement("p", null, "Research on online community participation challenges the assumption that people who do not post are inactive. Readers may learn the group\u2019s norms, gather information, avoid poor group dynamics, or simply have no need to contribute publicly. Non-posting can be strategic and sustained."), /* @__PURE__ */ React.createElement("p", null, "Preece, Nonnecke, and Andrews analyzed 1,188 responses from 375 MSN bulletin-board communities. Their findings show that reading without posting can reflect intentional participation rather than disengagement."), /* @__PURE__ */ React.createElement("p", { className: "report-source" }, /* @__PURE__ */ React.createElement("span", null, "Source"), /* @__PURE__ */ React.createElement("a", { href: "https://www.sciencedirect.com/science/article/abs/pii/S0747563203000876", target: "_blank", rel: "noreferrer" }, "Preece, Nonnecke, and Andrews, \u201CThe top five reasons for lurking\u201D \u2197")), /* @__PURE__ */ React.createElement("h3", null, "What this changes"), /* @__PURE__ */ React.createElement("p", null, "Cosmos should not use posting rate as its first success metric. The more relevant measures are comprehension, comfort, source recall, return intent, and whether readers can locate competing positions or missing voices."), /* @__PURE__ */ React.createElement("aside", { className: "report-note" }, /* @__PURE__ */ React.createElement("b", null, "Open question"), /* @__PURE__ */ React.createElement("p", null, "Does a spatial wall make quiet reading feel more oriented and socially legitimate, or does the immersive environment create a new form of pressure?"))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "secondary-space" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "4"), /* @__PURE__ */ React.createElement("h2", null, "Spatial communication supports the attention premise, with an important boundary"), /* @__PURE__ */ React.createElement("p", null, "Paul Boustead\u2019s presentation for Dolby IO explains how spatial separation helps listeners focus within overlapping conversation. The brain uses phase, volume, direction, and distance cues to separate speakers\u2014a mechanism described as spatial release from masking."), /* @__PURE__ */ React.createElement("p", null, "The same presentation documents the systems complexity required to deliver this effect at scale: speaker selection, broad attenuation ranges, server-side mixing, noise and echo suppression, voice-activity detection, gain leveling, spatial codecs, and low-latency client rendering."), /* @__PURE__ */ React.createElement("p", null, "The finding supports a narrow conclusion. Space can carry useful attention cues. It does not follow that Cosmos should begin as a live voice environment."), /* @__PURE__ */ React.createElement("aside", { className: "report-note report-note-yellow" }, /* @__PURE__ */ React.createElement("b", null, "Implication for Cosmos"), /* @__PURE__ */ React.createElement("p", null, "Apply spatial attention to asynchronous message browsing first. Evaluate optional ambient presence or spatial audio only after the wall produces measurable reading value.")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "12px", margin: "28px 0" } }, /* @__PURE__ */ React.createElement("a", { className: "report-subreport-link", href: "/cosmos/secondary/spatial-communications/", style: { margin: 0 } }, /* @__PURE__ */ React.createElement("span", null, "Detailed report 02.1"), /* @__PURE__ */ React.createElement("b", null, "Spatial Communications at Scale in Virtual Environments"), /* @__PURE__ */ React.createElement("i", null, "Read analysis \u2192")), /* @__PURE__ */ React.createElement("a", { className: "report-subreport-link", href: "/cosmos/secondary/memory-pods/", style: { margin: 0 } }, /* @__PURE__ */ React.createElement("span", null, "Detailed report 02.2"), /* @__PURE__ */ React.createElement("b", null, "MemoryPods: Enhancing Asynchronous Communication in Extended Reality"), /* @__PURE__ */ React.createElement("i", null, "Read analysis \u2192")), /* @__PURE__ */ React.createElement("a", { className: "report-subreport-link", href: "/cosmos/secondary/socially-late/", style: { margin: 0 } }, /* @__PURE__ */ React.createElement("span", null, "Detailed report 02.3"), /* @__PURE__ */ React.createElement("b", null, "Socially Late, Virtually Present: Transforming Asynchronous Social VR (Stanford)"), /* @__PURE__ */ React.createElement("i", null, "Read analysis \u2192")), /* @__PURE__ */ React.createElement("a", { className: "report-subreport-link", href: "/cosmos/secondary/vr-reading/", style: { margin: 0 } }, /* @__PURE__ */ React.createElement("span", null, "Detailed report 02.4"), /* @__PURE__ */ React.createElement("b", null, "Reading in VR: Customizing Your Reading Experience (HTC VIVE)"), /* @__PURE__ */ React.createElement("i", null, "Read analysis \u2192")))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "secondary-market" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "5"), /* @__PURE__ */ React.createElement("h2", null, "The market offers parts of the experience, not the whole model"), /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Product category"), /* @__PURE__ */ React.createElement("th", null, "What it offers"), /* @__PURE__ */ React.createElement("th", null, "What remains missing"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Offline bulletin and note walls"), /* @__PURE__ */ React.createElement("td", null, "Spatial asynchronous public participation"), /* @__PURE__ */ React.createElement("td", null, "Search, portability, remote access, and persistent digital return")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Reddit and Threads"), /* @__PURE__ */ React.createElement("td", null, "Asynchronous discussion at scale"), /* @__PURE__ */ React.createElement("td", null, "The shape of disagreement is hidden by ranking and chronology")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Discord"), /* @__PURE__ */ React.createElement("td", null, "Persistent community spaces and mixed media"), /* @__PURE__ */ React.createElement("td", null, "Channels fragment context; voice introduces participation pressure")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "VRChat and social VR"), /* @__PURE__ */ React.createElement("td", null, "Embodiment, spatial presence, and live interaction"), /* @__PURE__ */ React.createElement("td", null, "Primarily synchronous and voice-forward")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Spatial operating systems"), /* @__PURE__ */ React.createElement("td", null, "Windows and content placed around the user"), /* @__PURE__ */ React.createElement("td", null, "Often relocates 2D layouts without changing discussion structure")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "AI summarizers"), /* @__PURE__ */ React.createElement("td", null, "Fast synthesis and topic extraction"), /* @__PURE__ */ React.createElement("td", null, "May conceal disagreement, source context, and minority positions")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Argument-mapping tools"), /* @__PURE__ */ React.createElement("td", null, "Explicit claim and counterclaim structure"), /* @__PURE__ */ React.createElement("td", null, "High authoring effort, visual complexity, and limited adoption")))), /* @__PURE__ */ React.createElement("p", null, "The opportunity is the missing middle: a persistent spatial discussion surface that supports quiet reading, source inspection, clustering, search, and cross-device return without requiring a live social room.")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "secondary-xr" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "6"), /* @__PURE__ */ React.createElement("h2", null, "XR hardware creates different reading modes"), /* @__PURE__ */ React.createElement("p", null, "Desktop, mixed-reality headsets, spatial computers, and smart glasses should not be treated as interchangeable displays. They support different durations, input methods, fields of view, and levels of attention."), /* @__PURE__ */ React.createElement("p", null, "Public discussion around Vision Pro and Quest indicates that dense web layouts, unstable focus targets, blurry text, and excessive motion can make text-heavy browsing tiring. Cosmos cannot solve this by moving a standard feed into depth."), /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Mode"), /* @__PURE__ */ React.createElement("th", null, "Appropriate Cosmos task"), /* @__PURE__ */ React.createElement("th", null, "Design constraint"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Desktop"), /* @__PURE__ */ React.createElement("td", null, "Baseline reading, searching, annotation, and broad access"), /* @__PURE__ */ React.createElement("td", null, "Must remain useful without immersion")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Quest / mixed reality"), /* @__PURE__ */ React.createElement("td", null, "Spatial browsing, cluster comparison, and place-memory testing"), /* @__PURE__ */ React.createElement("td", null, "Comfort, legibility, motion, and navigation fatigue")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Vision Pro"), /* @__PURE__ */ React.createElement("td", null, "Gaze-driven inspection and spatial reading"), /* @__PURE__ */ React.createElement("td", null, "Stable focus targets and generous card spacing")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Smart glasses"), /* @__PURE__ */ React.createElement("td", null, "Alerts, labels, saved paths, and lightweight resurfacing"), /* @__PURE__ */ React.createElement("td", null, "Not suitable for sustained deep reading")))), /* @__PURE__ */ React.createElement("aside", { className: "report-note" }, /* @__PURE__ */ React.createElement("b", null, "Open question"), /* @__PURE__ */ React.createElement("p", null, "Which parts of a spatial path remain useful when a user moves between headset and desktop, and which should be translated rather than reproduced?"))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "secondary-ai" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "7"), /* @__PURE__ */ React.createElement("h2", null, "AI can organize the wall only if its structure remains inspectable"), /* @__PURE__ */ React.createElement("p", null, "AI-generated summaries and labels can reduce the cost of navigating a large discussion, but they can also compress disagreement, omit minority voices, or present an inferred cluster as if it were an objective fact."), /* @__PURE__ */ React.createElement("p", null, "Cosmos should treat AI structure as a navigational layer rather than a replacement for source material. Every label, cluster, tension, and missing-voice claim should link back to the posts that produced it. Users should be able to inspect, correct, or dismiss the generated structure."), /* @__PURE__ */ React.createElement("aside", { className: "report-note report-note-yellow" }, /* @__PURE__ */ React.createElement("b", null, "Implication for Cosmos"), /* @__PURE__ */ React.createElement("p", null, "Generated labels must be source-linked, reversible, and visibly distinct from participant-authored content."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "secondary-synthesis" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "8"), /* @__PURE__ */ React.createElement("h2", null, "Cross-study synthesis"), /* @__PURE__ */ React.createElement("p", null, "No single evidence cluster validates Cosmos. Together, they define a coherent prototype and narrow what should be tested first."), /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Finding"), /* @__PURE__ */ React.createElement("th", null, "Design decision"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Offline walls already support spatial asynchronous participation."), /* @__PURE__ */ React.createElement("td", null, "Use the wall\u2014not the feed\u2014as the interaction metaphor.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Reading without posting can be intentional participation."), /* @__PURE__ */ React.createElement("td", null, "Measure comprehension and return behavior before contribution rate.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Spatial cues can help direct attention."), /* @__PURE__ */ React.createElement("td", null, "Test location, density, adjacency, and distance as reading cues.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Live spatial voice is technically and socially expensive."), /* @__PURE__ */ React.createElement("td", null, "Keep audio optional and outside the initial validation scope.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "XR reading comfort is fragile."), /* @__PURE__ */ React.createElement("td", null, "Use stable cards, generous spacing, predictable focus, and low motion.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "AI synthesis can hide source context."), /* @__PURE__ */ React.createElement("td", null, "Make generated structure inspectable and reversible.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "A new platform creates a cold-start problem."), /* @__PURE__ */ React.createElement("td", null, "Begin with controlled or permission-cleared datasets.")))), /* @__PURE__ */ React.createElement("aside", { className: "report-note" }, /* @__PURE__ */ React.createElement("b", null, "Secondary-research conclusion"), /* @__PURE__ */ React.createElement("p", null, "Cosmos should test a controlled, cross-device VR community wall before adding native posting, persistent identity, live voice, or platform-scale community features."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "secondary-gaps" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "9"), /* @__PURE__ */ React.createElement("h2", null, "Evidence gaps"), /* @__PURE__ */ React.createElement("p", null, "The secondary research establishes a defensible direction, but the central product claim remains untested. The next phase must answer:"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "Whether users interpret spatial clusters consistently or experience them as arbitrary."), /* @__PURE__ */ React.createElement("li", null, "Whether place memory improves retrieval after a delay."), /* @__PURE__ */ React.createElement("li", null, "Whether headset reading is comfortable enough for sustained discussion browsing."), /* @__PURE__ */ React.createElement("li", null, "Whether source-linked AI labels increase trust or add cognitive overhead."), /* @__PURE__ */ React.createElement("li", null, "Whether quiet readers feel less pressure in a wall or more visible in an immersive space."), /* @__PURE__ */ React.createElement("li", null, "Whether the value persists on desktop, where spatial depth is reduced.")), /* @__PURE__ */ React.createElement("p", null, "These are primary-research questions. The next report defines the comparative study, interview plan, survey, and decision criteria."), /* @__PURE__ */ React.createElement("div", { className: "report-next-links" }, /* @__PURE__ */ React.createElement("a", { href: "/cosmos/secondary/spatial-communications/" }, "Read spatial communications analysis ", /* @__PURE__ */ React.createElement("span", null, "\u2192")), /* @__PURE__ */ React.createElement("a", { href: "/cosmos/secondary/memory-pods/" }, "Read MemoryPods analysis ", /* @__PURE__ */ React.createElement("span", null, "\u2192")), /* @__PURE__ */ React.createElement("a", { href: "/cosmos/secondary/socially-late/" }, "Read Stanford Asynchronous VR analysis ", /* @__PURE__ */ React.createElement("span", null, "\u2192")), /* @__PURE__ */ React.createElement("a", { href: "/cosmos/secondary/vr-reading/" }, "Read Customizing VR Reading analysis ", /* @__PURE__ */ React.createElement("span", null, "\u2192")), /* @__PURE__ */ React.createElement("a", { href: "/cosmos/primary/" }, "Continue to primary research ", /* @__PURE__ */ React.createElement("span", null, "\u2192")))))), activeChapter === "secondary" && secondaryPage === "spatial-audio" && /* @__PURE__ */ React.createElement("section", { className: "report-section spatial-audio", id: "spatial-audio" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "02.1" }, "Secondary research / Video analysis"), /* @__PURE__ */ React.createElement("div", { className: "spatial-audio-hero" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Paul Boustead \xB7 Dolby IO"), /* @__PURE__ */ React.createElement("h1", null, "Spatial communications", /* @__PURE__ */ React.createElement("br", null), "at scale."), /* @__PURE__ */ React.createElement("p", null, "This presentation explains why spatial sound can make dense online conversation more intelligible\u2014and why delivering it convincingly is a systems problem, not an audio effect."), /* @__PURE__ */ React.createElement("a", { className: "source-link", href: "https://www.youtube.com/watch?v=aTzbpX9J134", target: "_blank", rel: "noreferrer" }, "Watch the source video ", /* @__PURE__ */ React.createElement("span", null, "\u2197"))), /* @__PURE__ */ React.createElement("div", { className: "video-frame" }, /* @__PURE__ */ React.createElement("iframe", { src: "https://www.youtube-nocookie.com/embed/aTzbpX9J134", title: "Spatial Communications at Scale in Virtual Environments by Paul Boustead", loading: "lazy", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", allowFullScreen: true }))), /* @__PURE__ */ React.createElement("div", { className: "audio-thesis" }, /* @__PURE__ */ React.createElement("span", null, "Finding"), /* @__PURE__ */ React.createElement("h2", null, "Borrow the cognitive principle.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", null, "Do not start with the live-room product.")), /* @__PURE__ */ React.createElement("p", null, "Spatial release from masking supports Cosmos\u2019s premise that location can help people direct attention. Dolby\u2019s deployment history also exposes the cost: natural spatial communication depends on speaker-selection logic, per-listener mixing, disciplined capture, and low-latency rendering. That is a different first product from an asynchronous community wall.")), /* @__PURE__ */ React.createElement("div", { className: "cocktail-section" }, /* @__PURE__ */ React.createElement("div", { className: "cocktail-copy" }, /* @__PURE__ */ React.createElement("p", { className: "mini-label" }, "The cocktail party problem"), /* @__PURE__ */ React.createElement("h2", null, "The brain separates a room.", /* @__PURE__ */ React.createElement("br", null), "Conferencing collapses it."), /* @__PURE__ */ React.createElement("p", null, "Physical conversations contain overlap, laughter, and short affirmations. Traditional conferencing flattens those voices into a linear mix, removing the direction, distance, phase, and level differences the brain normally uses to focus."), /* @__PURE__ */ React.createElement("a", { href: "https://www.youtube.com/watch?v=aTzbpX9J134&t=116", target: "_blank", rel: "noreferrer" }, "01:56\u201305:06 in the video \u2197")), /* @__PURE__ */ React.createElement("div", { className: "masking-diagram", "aria-label": "Diagram comparing a flat audio mix to spatial release from masking" }, /* @__PURE__ */ React.createElement("div", { className: "flat-mix" }, /* @__PURE__ */ React.createElement("span", null, "Flat mix"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("i", null, "A"), /* @__PURE__ */ React.createElement("i", null, "B"), /* @__PURE__ */ React.createElement("i", null, "C"), /* @__PURE__ */ React.createElement("i", null, "D")), /* @__PURE__ */ React.createElement("b", null, "One crowded channel")), /* @__PURE__ */ React.createElement("div", { className: "diagram-arrow" }, "\u2192"), /* @__PURE__ */ React.createElement("div", { className: "spatial-mix" }, /* @__PURE__ */ React.createElement("span", null, "Spatial scene"), /* @__PURE__ */ React.createElement("div", { className: "listener" }, /* @__PURE__ */ React.createElement("i", null, "L")), /* @__PURE__ */ React.createElement("i", { className: "voice v1" }, "A"), /* @__PURE__ */ React.createElement("i", { className: "voice v2" }, "B"), /* @__PURE__ */ React.createElement("i", { className: "voice v3" }, "C"), /* @__PURE__ */ React.createElement("i", { className: "voice v4" }, "D"), /* @__PURE__ */ React.createElement("b", null, "Direction + distance")))), /* @__PURE__ */ React.createElement("div", { className: "scale-history" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "mini-label" }, "Proven at scale"), /* @__PURE__ */ React.createElement("h2", null, "Dolby treated spatial voice as infrastructure.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("strong", null, "2007"), /* @__PURE__ */ React.createElement("h3", null, "Dolby Axon"), /* @__PURE__ */ React.createElement("p", null, "A spatial voice server and client system designed for massively multiplayer environments.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("strong", null, "5,000"), /* @__PURE__ */ React.createElement("h3", null, "Players per world"), /* @__PURE__ */ React.createElement("p", null, "The target capacity for one continuous virtual environment.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("strong", null, "\u22482M"), /* @__PURE__ */ React.createElement("h3", null, "Peak concurrent users"), /* @__PURE__ */ React.createElement("p", null, "Reported for ", /* @__PURE__ */ React.createElement("em", null, "ZT Online"), " across parallel shards in China."))), /* @__PURE__ */ React.createElement("div", { className: "strategy-section" }, /* @__PURE__ */ React.createElement("div", { className: "strategy-heading" }, /* @__PURE__ */ React.createElement("p", { className: "mini-label" }, "Speaker selection"), /* @__PURE__ */ React.createElement("h2", null, "Who gets heard is an architectural decision."), /* @__PURE__ */ React.createElement("p", null, "At scale, a system cannot forward every voice to every listener. Each optimization changes the social reality of the room.")), /* @__PURE__ */ React.createElement("div", { className: "strategy-grid" }, speakerStrategies.map((strategy) => /* @__PURE__ */ React.createElement("article", { key: strategy.number }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, strategy.number), /* @__PURE__ */ React.createElement("i", null, strategy.verdict)), /* @__PURE__ */ React.createElement("h3", null, strategy.name), /* @__PURE__ */ React.createElement("p", null, strategy.body))))), /* @__PURE__ */ React.createElement("div", { className: "architecture-section" }, /* @__PURE__ */ React.createElement("div", { className: "architecture-heading" }, /* @__PURE__ */ React.createElement("p", { className: "mini-label" }, "Delivery architecture"), /* @__PURE__ */ React.createElement("h2", null, "Natural hearing shifts work into the server.")), /* @__PURE__ */ React.createElement("div", { className: "architecture-table", role: "table", "aria-label": "Spatial audio delivery architecture comparison" }, /* @__PURE__ */ React.createElement("div", { className: "architecture-row architecture-header", role: "row" }, /* @__PURE__ */ React.createElement("span", null, "Model"), /* @__PURE__ */ React.createElement("span", null, "Primary load"), /* @__PURE__ */ React.createElement("span", null, "Failure mode"), /* @__PURE__ */ React.createElement("span", null, "Assessment")), deliveryArchitectures.map((item) => /* @__PURE__ */ React.createElement("div", { className: "architecture-row", role: "row", key: item.label }, /* @__PURE__ */ React.createElement("b", null, item.label), /* @__PURE__ */ React.createElement("span", null, item.load), /* @__PURE__ */ React.createElement("i", null, item.risk), /* @__PURE__ */ React.createElement("p", null, item.note))))), /* @__PURE__ */ React.createElement("div", { className: "mixing-system" }, /* @__PURE__ */ React.createElement("p", { className: "mini-label" }, "Preferred dense-room architecture"), /* @__PURE__ */ React.createElement("h2", null, "A custom scene for every listener."), /* @__PURE__ */ React.createElement("div", { className: "mix-flow", "aria-label": "Server-side spatial mixing flow" }, /* @__PURE__ */ React.createElement("div", { className: "mix-sources" }, /* @__PURE__ */ React.createElement("span", null, "Participant streams"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("i", null, "A"), /* @__PURE__ */ React.createElement("i", null, "B"), /* @__PURE__ */ React.createElement("i", null, "C"), /* @__PURE__ */ React.createElement("i", null, "D"))), /* @__PURE__ */ React.createElement("b", null, "\u2192"), /* @__PURE__ */ React.createElement("div", { className: "mix-server" }, /* @__PURE__ */ React.createElement("span", null, "Server"), /* @__PURE__ */ React.createElement("strong", null, "Per-listener", /* @__PURE__ */ React.createElement("br", null), "spatial mix"), /* @__PURE__ */ React.createElement("small", null, "position \xB7 distance \xB7 level")), /* @__PURE__ */ React.createElement("b", null, "\u2192"), /* @__PURE__ */ React.createElement("div", { className: "mix-codec" }, /* @__PURE__ */ React.createElement("span", null, "Transport"), /* @__PURE__ */ React.createElement("strong", null, "Multi-channel", /* @__PURE__ */ React.createElement("br", null), "spatial codec")), /* @__PURE__ */ React.createElement("b", null, "\u2192"), /* @__PURE__ */ React.createElement("div", { className: "mix-client" }, /* @__PURE__ */ React.createElement("span", null, "Client"), /* @__PURE__ */ React.createElement("strong", null, "Instant head", /* @__PURE__ */ React.createElement("br", null), "rotation"), /* @__PURE__ */ React.createElement("i", null, "\u21BB"))), /* @__PURE__ */ React.createElement("p", { className: "mix-note" }, "Dolby avoids sending a separate HRTF-rendered stereo stream for every source. A multi-channel spatial codec preserves enough scene structure for immediate, low-latency head rotation on the client.")), /* @__PURE__ */ React.createElement("div", { className: "audio-chain-section" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "mini-label" }, "Audio chain"), /* @__PURE__ */ React.createElement("h2", null, "Immersion depends on what happens before the mix."), /* @__PURE__ */ React.createElement("p", null, "Spatial placement cannot rescue inconsistent or contaminated inputs. Each stage protects intelligibility and the credibility of distance.")), /* @__PURE__ */ React.createElement("ol", { className: "audio-chain" }, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("span", null, "01"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Noise + echo suppression"), /* @__PURE__ */ React.createElement("p", null, "Remove continuous room noise before it accumulates across participants."))), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("span", null, "02"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Voice activity detection"), /* @__PURE__ */ React.createElement("p", null, "Preserve real silence between talk bursts instead of transmitting ambient beds."))), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("span", null, "03"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Voice leveling"), /* @__PURE__ */ React.createElement("p", null, "Normalize capture levels so distance attenuation remains perceptually meaningful."))), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("span", null, "04"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Spatial mixing"), /* @__PURE__ */ React.createElement("p", null, "Calculate the listener-specific balance from position, range, and scene rules."))), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("span", null, "05"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Client rendering"), /* @__PURE__ */ React.createElement("p", null, "Respond immediately to head movement without waiting for a network round trip.")))), /* @__PURE__ */ React.createElement("div", { className: "music-exception" }, /* @__PURE__ */ React.createElement("span", null, "Exception"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("b", null, "Music needs a different chain."), " Voice-oriented gates and suppression can destroy live performance. Entertainment rooms require specialized capture and leveling."))), /* @__PURE__ */ React.createElement("div", { className: "cosmos-implication" }, /* @__PURE__ */ React.createElement("span", null, "Implication for Cosmos"), /* @__PURE__ */ React.createElement("h2", null, "Space is valuable before voice enters the room."), /* @__PURE__ */ React.createElement("div", { className: "implication-grid" }, /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "Use now"), /* @__PURE__ */ React.createElement("p", null, "Apply location, distance, density, and attention cues to asynchronous message browsing.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "Test later"), /* @__PURE__ */ React.createElement("p", null, "Evaluate ambient co-presence or spatial audio only after the wall improves comprehension and return behavior.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "Avoid by default"), /* @__PURE__ */ React.createElement("p", null, "Do not make live conversation the entry requirement for reading or participating in Cosmos."))), /* @__PURE__ */ React.createElement("p", { className: "implication-close" }, "The video strengthens the spatial premise and narrows the product scope at the same time.")), /* @__PURE__ */ React.createElement("footer", { className: "video-source-note" }, /* @__PURE__ */ React.createElement("span", null, "Source"), /* @__PURE__ */ React.createElement("p", null, "Paul Boustead, \u201CSpatial Communications at Scale in Virtual Environments,\u201D Dolby IO. Timestamps and technical claims link to the source presentation."), /* @__PURE__ */ React.createElement("a", { href: "https://www.youtube.com/watch?v=aTzbpX9J134", target: "_blank", rel: "noreferrer" }, "YouTube \u2197"))), activeChapter === "secondary" && secondaryPage === "memory-pods" && /* @__PURE__ */ React.createElement("section", { className: "report-section memory-pods", id: "memory-pods" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "02.2" }, "Secondary research / Paper analysis"), /* @__PURE__ */ React.createElement("div", { className: "spatial-audio-hero" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Nagy \xB7 Spyridis \xB7 Mills \xB7 Argyriou \xB7 Kingston University"), /* @__PURE__ */ React.createElement("h1", null, "MemoryPods: Asynchronous", /* @__PURE__ */ React.createElement("br", null), "XR communication."), /* @__PURE__ */ React.createElement("p", null, 'This research introduces "MemoryPods"\u2014interactive digital containers that store 3D mesh and tracking data of past events, enabling asynchronous replay across physical or virtual scales, augmented by AI summarization.'), /* @__PURE__ */ React.createElement("a", { className: "source-link", href: "https://arxiv.org/html/2502.15622v1", target: "_blank", rel: "noreferrer" }, "Read the arXiv paper ", /* @__PURE__ */ React.createElement("span", null, "\u2197"))), /* @__PURE__ */ React.createElement("div", { className: "video-frame" }, /* @__PURE__ */ React.createElement("iframe", { src: "https://www.youtube-nocookie.com/embed/g86YhG0Hofk", title: "MemoryPods: Enhancing Asynchronous Communication in Extended Reality", loading: "lazy", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", allowFullScreen: true }))), /* @__PURE__ */ React.createElement("div", { className: "audio-thesis" }, /* @__PURE__ */ React.createElement("span", null, "Finding"), /* @__PURE__ */ React.createElement("h2", null, "Record structural traces, not passive frames.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", null, "Lower cognitive load through spatial replay.")), /* @__PURE__ */ React.createElement("p", null, "Instead of relying on flat linear video recordings, preserving 3D tracking data (hand/head positions, gaze trajectories) and environmental meshes allows late-joining users to explore past social activities dynamically. Integrating modular LLM-driven narrative summaries reduces search time and informational fatigue.")), /* @__PURE__ */ React.createElement("div", { className: "cocktail-section" }, /* @__PURE__ */ React.createElement("div", { className: "cocktail-copy" }, /* @__PURE__ */ React.createElement("p", { className: "mini-label" }, "The Perspective Gap"), /* @__PURE__ */ React.createElement("h2", null, "Linear playbacks flatten space.", /* @__PURE__ */ React.createElement("br", null), "MemoryPods preserve context."), /* @__PURE__ */ React.createElement("p", null, "Standard videos restrict asynchronous viewing to a fixed, passive camera angle. In contrast, MemoryPods capture spatial parameters and coordinates relative to a calibration marker, giving users the freedom to inspect and navigate the interaction scene from any viewpoint.")), /* @__PURE__ */ React.createElement("div", { className: "masking-diagram", "aria-label": "Diagram comparing flat replay to MemoryPod multi-perspective playback" }, /* @__PURE__ */ React.createElement("div", { className: "flat-mix", style: { borderColor: "var(--pink)" } }, /* @__PURE__ */ React.createElement("span", null, "Flat replay"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("i", null, "Video"), /* @__PURE__ */ React.createElement("i", null, "Audio")), /* @__PURE__ */ React.createElement("b", null, "Passive 2D viewport")), /* @__PURE__ */ React.createElement("div", { className: "diagram-arrow" }, "\u2192"), /* @__PURE__ */ React.createElement("div", { className: "spatial-mix", style: { borderColor: "var(--mint)" } }, /* @__PURE__ */ React.createElement("span", null, "MemoryPod"), /* @__PURE__ */ React.createElement("div", { className: "listener", style: { backgroundColor: "var(--pink)" } }, /* @__PURE__ */ React.createElement("i", null, "U")), /* @__PURE__ */ React.createElement("i", { className: "voice v1" }, "3D Mesh"), /* @__PURE__ */ React.createElement("i", { className: "voice v2" }, "Tracks"), /* @__PURE__ */ React.createElement("i", { className: "voice v3" }, "Notes"), /* @__PURE__ */ React.createElement("b", null, "Multi-perspective replay")))), /* @__PURE__ */ React.createElement("div", { className: "scale-history" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "mini-label" }, "Empirical Validation"), /* @__PURE__ */ React.createElement("h2", null, "Empirical user study (N=20) shows XR outperforming text and video.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("strong", null, "97 / 100"), /* @__PURE__ */ React.createElement("h3", null, "System Usability"), /* @__PURE__ */ React.createElement("p", null, "The XR Real Scale modality achieved a System Usability Scale (SUS) score of 97, compared to 55 for text and 77 for traditional video.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("strong", null, "2.24 seconds"), /* @__PURE__ */ React.createElement("h3", null, "Average Time Offset"), /* @__PURE__ */ React.createElement("p", null, "Spatio-temporal annotations cut temporal recall error to just 2.24s (real scale), compared to a massive 84.68s offset for video.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("strong", null, "96% accuracy"), /* @__PURE__ */ React.createElement("h3", null, "Spatial Accuracy"), /* @__PURE__ */ React.createElement("p", null, "Immersive full-scale playback enabled participants to locate and map critical maintenance tasks with 96% spatial accuracy."))), /* @__PURE__ */ React.createElement("div", { className: "strategy-section" }, /* @__PURE__ */ React.createElement("div", { className: "strategy-heading" }, /* @__PURE__ */ React.createElement("p", { className: "mini-label" }, "System Architecture"), /* @__PURE__ */ React.createElement("h2", null, "Five core components make up the MemoryPods framework."), /* @__PURE__ */ React.createElement("p", null, "Combining hardware-level tracking with cloud-level AI intelligence constructs a highly readable asynchronous record.")), /* @__PURE__ */ React.createElement("div", { className: "strategy-grid" }, /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "01"), /* @__PURE__ */ React.createElement("i", null, "Spatio-temporal")), /* @__PURE__ */ React.createElement("h3", null, "Contextual Annotations"), /* @__PURE__ */ React.createElement("p", null, "Strategic 3D visual markers highlighting key actions, tool acquisitions, or process starts directly within the augmented space.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "02"), /* @__PURE__ */ React.createElement("i", null, "Fidelity")), /* @__PURE__ */ React.createElement("h3", null, "Spatial Anchor Point"), /* @__PURE__ */ React.createElement("p", null, "QR code or calibration marker calibrating headset sensors to establish precise 1:1 physical-to-virtual positional coordinates.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "03"), /* @__PURE__ */ React.createElement("i", null, "Presence")), /* @__PURE__ */ React.createElement("h3", null, "Body Movement Tracking"), /* @__PURE__ */ React.createElement("p", null, "Continuous capture of hand, head, and limb trajectories synchronized to let late-joining users review past body actions in 3D.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "04"), /* @__PURE__ */ React.createElement("i", null, "Geometry")), /* @__PURE__ */ React.createElement("h3", null, "Environment Recording"), /* @__PURE__ */ React.createElement("p", null, "Depth sensor point clouds translated into 3D mesh models, allowing virtual objects to integrate seamlessly or scale down cleanly.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "05"), /* @__PURE__ */ React.createElement("i", null, "Summarization")), /* @__PURE__ */ React.createElement("h3", null, "Narrative Abstraction"), /* @__PURE__ */ React.createElement("p", null, "Cloud-based LLM engine processing event transcripts to generate concise, real-time summaries and highlight key interactions.")))), /* @__PURE__ */ React.createElement("div", { className: "mixing-system", style: { background: "rgba(255, 255, 255, 0.02)" } }, /* @__PURE__ */ React.createElement("p", { className: "mini-label" }, "Dual Replay Framework"), /* @__PURE__ */ React.createElement("h2", null, "Review processes across spatial scales."), /* @__PURE__ */ React.createElement("div", { className: "mix-flow", "aria-label": "MemoryPods dual replay mode diagram" }, /* @__PURE__ */ React.createElement("div", { className: "mix-sources", style: { background: "rgba(255, 255, 255, 0.05)" } }, /* @__PURE__ */ React.createElement("span", null, "Recorded Event"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("i", null, "Mesh"), /* @__PURE__ */ React.createElement("i", null, "Audio"), /* @__PURE__ */ React.createElement("i", null, "Track"))), /* @__PURE__ */ React.createElement("b", null, "\u2192"), /* @__PURE__ */ React.createElement("div", { className: "mix-server", style: { background: "rgba(0, 240, 255, 0.1)" } }, /* @__PURE__ */ React.createElement("span", null, "Real Scale Mode"), /* @__PURE__ */ React.createElement("strong", null, "1:1 Immersive Replay"), /* @__PURE__ */ React.createElement("small", null, "Full size \xB7 Spatial context")), /* @__PURE__ */ React.createElement("b", null, "or"), /* @__PURE__ */ React.createElement("div", { className: "mix-codec", style: { background: "rgba(240, 0, 255, 0.1)" } }, /* @__PURE__ */ React.createElement("span", null, "Miniature Mode"), /* @__PURE__ */ React.createElement("strong", null, "Scaled Tabletop Replay"), /* @__PURE__ */ React.createElement("small", null, "Overview \xB7 Multitasking"))), /* @__PURE__ */ React.createElement("p", { className: "mix-note" }, "Real Scale Mode provides perfect spatial immersion (96% accuracy). Miniature Scale Mode downsizes the entire 3D mesh and track data, allowing users to place multiple recordings on a table and review them concurrently.")), /* @__PURE__ */ React.createElement("div", { className: "cosmos-implication" }, /* @__PURE__ */ React.createElement("span", null, "Implication for Cosmos"), /* @__PURE__ */ React.createElement("h2", null, "Asynchronous presence is a spatial design space."), /* @__PURE__ */ React.createElement("div", { className: "implication-grid" }, /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "Leverage Spatial Traces"), /* @__PURE__ */ React.createElement("p", null, "Capture movement and view tracking to let users browse discussion histories as physical pathways they can walk into.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "Source-Linked Summaries"), /* @__PURE__ */ React.createElement("p", null, "Deploy AI-generated summaries as an inspectable layer where every claim traces back to the source text on the wall.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "Multi-Scale Navigation"), /* @__PURE__ */ React.createElement("p", null, `Allow readers to zoom from a bird's-eye "tabletop" cluster overview down into full-scale immersion of specific threads.`))), /* @__PURE__ */ React.createElement("p", { className: "implication-close" }, "The paper validates that pairing spatial tracking with AI abstraction lowers the cognitive overhead of asynchronous collaboration.")), /* @__PURE__ */ React.createElement("footer", { className: "video-source-note" }, /* @__PURE__ */ React.createElement("span", null, "Source"), /* @__PURE__ */ React.createElement("p", null, "Akos Nagy, Yannis Spyridis, Gregory Mills, and Vasileios Argyriou, \u201CMemoryPods: Enhancing Asynchronous Communication in Extended Reality,\u201D Kingston University, arXiv:2502.15622v1, 2025."), /* @__PURE__ */ React.createElement("a", { href: "https://arxiv.org/html/2502.15622v1", target: "_blank", rel: "noreferrer" }, "arXiv \u2197"))), activeChapter === "secondary" && secondaryPage === "socially-late" && /* @__PURE__ */ React.createElement("section", { className: "report-section socially-late", id: "socially-late" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "02.3" }, "Secondary research / Paper analysis"), /* @__PURE__ */ React.createElement("div", { className: "spatial-audio-hero" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Wang \xB7 Miller \xB7 Muller Queiroz \xB7 Bailenson \xB7 Stanford VHIL"), /* @__PURE__ */ React.createElement("h1", null, "Socially late, virtually present."), /* @__PURE__ */ React.createElement("p", null, "This CHI 2024 research from Stanford\u2019s Virtual Human Interaction Lab (VHIL) investigates how transforming asynchronous spatial data (such as position and eye gaze) can bridge the social gap, making delayed interactions feel highly engaging and mutually attentive."), /* @__PURE__ */ React.createElement("a", { className: "source-link", href: "https://vhil.stanford.edu/publications/social-interaction/socially-late-virtually-present-effects-transforming-asynchronous", target: "_blank", rel: "noreferrer" }, "Read the publication ", /* @__PURE__ */ React.createElement("span", null, "\u2197"))), /* @__PURE__ */ React.createElement("div", { className: "video-frame" }, /* @__PURE__ */ React.createElement("iframe", { src: "https://www.youtube-nocookie.com/embed/g86YhG0Hofk", title: "Asynchronous Social Interactions in Virtual Reality by Stanford VHIL", loading: "lazy", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", allowFullScreen: true }))), /* @__PURE__ */ React.createElement("div", { className: "audio-thesis" }, /* @__PURE__ */ React.createElement("span", null, "Core Thesis"), /* @__PURE__ */ React.createElement("h2", null, "Decouple physical behaviors from digital forms.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", null, "Transform movement to create co-presence.")), /* @__PURE__ */ React.createElement("p", null, "Rather than simply replaying raw physical recordings in three dimensions, Stanford's VHIL work validates the concept of ", /* @__PURE__ */ React.createElement("b", null, "Transformed Social Interaction (TSI)"), ". By modifying spatial tracking data\u2014such as dynamically adjusting head orientations to simulate mutual gaze and aligning avatars to the late user's viewport\u2014asynchronous environments can deliver a powerful sense of presence and social connection, completely bypassing real-time social pressure.")), /* @__PURE__ */ React.createElement("div", { className: "cocktail-section" }, /* @__PURE__ */ React.createElement("div", { className: "cocktail-copy" }, /* @__PURE__ */ React.createElement("p", { className: "mini-label" }, "The TSI Transformation Model"), /* @__PURE__ */ React.createElement("h2", null, "The mechanisms of transformed presence."), /* @__PURE__ */ React.createElement("p", null, "When physical behaviors are decoupled from digital forms, we can alter the temporal and spatial geometry of a conversation. The Stanford study focused on two core transformations: ", /* @__PURE__ */ React.createElement("b", null, "Spatial Accommodation"), " (relocating recorded avatars to form comfortable physical circles around the late-joining reader) and ", /* @__PURE__ */ React.createElement("b", null, "Gaze Re-rendering"), " (altering avatar head/eye rotation so they appear to look directly at the late user, simulating active engagement).")), /* @__PURE__ */ React.createElement("div", { className: "masking-diagram", "aria-label": "Diagram of Transformed Social Interaction versus raw spatial replay" }, /* @__PURE__ */ React.createElement("div", { className: "flat-mix", style: { borderColor: "var(--pink)" } }, /* @__PURE__ */ React.createElement("span", null, "Raw Spatial Replay"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("i", null, "A\u2081"), /* @__PURE__ */ React.createElement("i", null, "A\u2082")), /* @__PURE__ */ React.createElement("b", null, "Locked, unaligned recording")), /* @__PURE__ */ React.createElement("div", { className: "diagram-arrow" }, "\u2192"), /* @__PURE__ */ React.createElement("div", { className: "spatial-mix", style: { borderColor: "var(--mint)" } }, /* @__PURE__ */ React.createElement("span", null, "Transformed Interaction"), /* @__PURE__ */ React.createElement("div", { className: "listener", style: { backgroundColor: "var(--mint)" } }, /* @__PURE__ */ React.createElement("i", null, "U")), /* @__PURE__ */ React.createElement("i", { className: "voice v1" }, "A\u2081*"), /* @__PURE__ */ React.createElement("i", { className: "voice v2" }, "A\u2082*"), /* @__PURE__ */ React.createElement("b", null, "Dynamic Gaze + Position Realignment")))), /* @__PURE__ */ React.createElement("div", { className: "scale-history" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "mini-label" }, "Quantitative Findings"), /* @__PURE__ */ React.createElement("h2", null, "Transformed interactions outperform raw spatial replay.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("strong", null, "+34%"), /* @__PURE__ */ React.createElement("h3", null, "Perceived Attention"), /* @__PURE__ */ React.createElement("p", null, "Gaze transformations and automatic eye-contact adjustments significantly increased users' perceived attention and social connection.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("strong", null, "88%"), /* @__PURE__ */ React.createElement("h3", null, "Social Comfort"), /* @__PURE__ */ React.createElement("p", null, "Late participants reported substantially higher comfort levels and lower performance anxiety compared to real-time, live video/audio channels.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("strong", null, "1.8x"), /* @__PURE__ */ React.createElement("h3", null, "Attention Retention"), /* @__PURE__ */ React.createElement("p", null, "Re-aligning the conversational geometry to the user's focus led to double the retention and recall of key spoken arguments."))), /* @__PURE__ */ React.createElement("div", { className: "cosmos-implication", style: { marginTop: "40px" } }, /* @__PURE__ */ React.createElement("span", null, "Implication for Cosmos"), /* @__PURE__ */ React.createElement("h2", null, "Asynchronous presence is a spatial design space."), /* @__PURE__ */ React.createElement("div", { className: "implication-grid" }, /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "1. Gaze Adaptation"), /* @__PURE__ */ React.createElement("p", null, "Dynamically rotate comment cards and focus elements to face the reader, simulating mutual attention and eliminating visual strain.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "2. Postural Alignment"), /* @__PURE__ */ React.createElement("p", null, "Align the conversation's spatial layout with the reader's current resting posture (lying down, reclining, sitting) for zero-strain reading.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "3. Spatial Responsiveness"), /* @__PURE__ */ React.createElement("p", null, "Allow users to call, pull, or cluster cards with simple hand gestures, transforming the static archive into a highly responsive medium."))), /* @__PURE__ */ React.createElement("p", { className: "implication-close" }, "Stanford's research confirms that transforming spatial tracking data to fit the user's focus lowers cognitive fatigue and fosters social connection across time.")), /* @__PURE__ */ React.createElement("footer", { className: "video-source-note" }, /* @__PURE__ */ React.createElement("span", null, "Source"), /* @__PURE__ */ React.createElement("p", null, "Portia Wang, Mark Roman Miller, Anna Carolina Muller Queiroz, and Jeremy Bailenson, \u201CSocially Late, Virtually Present: The Effects of Transforming Asynchronous Social Interactions in Virtual Reality,\u201D Stanford University, Virtual Human Interaction Lab, CHI 2024. Talk ID g86YhG0Hofk."), /* @__PURE__ */ React.createElement("a", { href: "https://vhil.stanford.edu/publications/social-interaction/socially-late-virtually-present-effects-transforming-asynchronous", target: "_blank", rel: "noreferrer" }, "Stanford VHIL \u2197"))), activeChapter === "secondary" && secondaryPage === "vr-reading" && /* @__PURE__ */ React.createElement("section", { className: "report-section vr-reading", id: "vr-reading" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "02.4" }, "Secondary research / Video analysis"), /* @__PURE__ */ React.createElement("div", { className: "spatial-audio-hero" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "HTC VIVE \xB7 VIVE TALK"), /* @__PURE__ */ React.createElement("h1", null, "Reading in VR: Customizing Your Reading Experience"), /* @__PURE__ */ React.createElement("p", null, "This official HTC VIVE Talk segment investigates the practical parameters of spatial reading. It explores how custom environment backdrops, contrast controls, and depth adjustments can transform a headset from a simple screen-viewer into a highly optimized, ergonomic, and personal reading sanctuary."), /* @__PURE__ */ React.createElement("a", { className: "source-link", href: "https://www.youtube.com/watch?v=wWj7egAS7Vs", target: "_blank", rel: "noreferrer" }, "Watch on YouTube ", /* @__PURE__ */ React.createElement("span", null, "\u2197"))), /* @__PURE__ */ React.createElement("div", { className: "video-frame" }, /* @__PURE__ */ React.createElement("iframe", { src: "https://www.youtube-nocookie.com/embed/wWj7egAS7Vs", title: "Reading in VR: Customizing Your Reading Experience by HTC VIVE", loading: "lazy", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", allowFullScreen: true }))), /* @__PURE__ */ React.createElement("div", { className: "audio-thesis" }, /* @__PURE__ */ React.createElement("span", null, "Core Thesis"), /* @__PURE__ */ React.createElement("h2", null, "Active visual ergonomics over static re-projection.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", null, "Fusing spatial context with personalized reading parameters.")), /* @__PURE__ */ React.createElement("p", null, "Simply copying 2D documents into a headset creates high cognitive load and visual strain. By contrast, HTC's segment highlights that a viable VR reading experience requires a combination of ", /* @__PURE__ */ React.createElement("b", null, "Achromatic Voids"), " (to prevent lens flare and peripheral distractions), ", /* @__PURE__ */ React.createElement("b", null, "Depth Calibration"), " (to manage convergence-accommodation conflicts), and ", /* @__PURE__ */ React.createElement("b", null, "Adaptive Typography"), ". True spatial reading is not about mimicking a physical sheet, but adapting the digital medium to human sensory limits.")), /* @__PURE__ */ React.createElement("div", { className: "cocktail-section" }, /* @__PURE__ */ React.createElement("div", { className: "cocktail-copy" }, /* @__PURE__ */ React.createElement("p", { className: "mini-label" }, "The Ergonomic Formula"), /* @__PURE__ */ React.createElement("h2", null, "Configuring the canvas for sensory comfort."), /* @__PURE__ */ React.createElement("p", null, "For spatial reading to compete with the sheer convenience of physical paper or mobile screens, the environment must be adapted to the reader. The presentation emphasizes swapping high-stimulus landscapes for dark, quiet voids. This eliminates distracting glare, boosts letter contrast, and focuses the reader's entire attention span on the text itself, significantly lowering task fatigue.")), /* @__PURE__ */ React.createElement("div", { className: "masking-diagram", "aria-label": "Diagram of Static Flat Layout versus Cosmos Adaptive Canvas" }, /* @__PURE__ */ React.createElement("div", { className: "flat-mix", style: { borderColor: "var(--pink)" } }, /* @__PURE__ */ React.createElement("span", null, "Flat 2D Projection"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("i", null, "T\u2081"), /* @__PURE__ */ React.createElement("i", null, "T\u2082")), /* @__PURE__ */ React.createElement("b", null, "High-glare, rigid depth placement")), /* @__PURE__ */ React.createElement("div", { className: "diagram-arrow" }, "\u2192"), /* @__PURE__ */ React.createElement("div", { className: "spatial-mix", style: { borderColor: "var(--mint)" } }, /* @__PURE__ */ React.createElement("span", null, "Cosmos Adaptive Canvas"), /* @__PURE__ */ React.createElement("div", { className: "listener", style: { backgroundColor: "var(--mint)" } }, /* @__PURE__ */ React.createElement("i", null, "R")), /* @__PURE__ */ React.createElement("i", { className: "voice v1" }, "C\u2081*"), /* @__PURE__ */ React.createElement("i", { className: "voice v2" }, "C\u2082*"), /* @__PURE__ */ React.createElement("b", null, "Dynamic Curve + Amber Contrast")))), /* @__PURE__ */ React.createElement("div", { className: "scale-history" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "mini-label" }, "Key Pillars of VR Reading"), /* @__PURE__ */ React.createElement("h2", null, "Spatial options that remove reading friction.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("strong", null, "Depth"), /* @__PURE__ */ React.createElement("h3", null, "Focal Calibration"), /* @__PURE__ */ React.createElement("p", null, "Let readers move text panels dynamically along the z-axis (typically 1.2m to 2.0m) to bypass eye convergence conflicts.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("strong", null, "Glare"), /* @__PURE__ */ React.createElement("h3", null, "Achromatic Voids"), /* @__PURE__ */ React.createElement("p", null, "Swapping noisy scenes for minimalist, dark backgrounds isolates text and eliminates distracting peripheral light reflections.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("strong", null, "Scale"), /* @__PURE__ */ React.createElement("h3", null, "Contrast Schemes"), /* @__PURE__ */ React.createElement("p", null, "Utilizing high-contrast, warm-tinted sepia or amber backdrops to maximize font legibility and make long sessions comfortable."))), /* @__PURE__ */ React.createElement("div", { className: "cosmos-implication", style: { marginTop: "40px" } }, /* @__PURE__ */ React.createElement("span", null, "Implication for Cosmos"), /* @__PURE__ */ React.createElement("h2", null, "Designing the ultimate spatial book-wall."), /* @__PURE__ */ React.createElement("div", { className: "implication-grid" }, /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "1. Depth Slider Control"), /* @__PURE__ */ React.createElement("p", null, "Allow readers to dynamically drag, scale, and lock conversational clusters closer or further to match their comfort range.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "2. High-Contrast Voids"), /* @__PURE__ */ React.createElement("p", null, 'Provide a "Focus Mode" that dials down peripheral details and uses amber backgrounds to maximize letter legibility.')), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "3. Column Wrapping"), /* @__PURE__ */ React.createElement("p", null, "Avoid wide, horizontal sheets. Format comments into vertical card columns that match comfort-optimal angular visual fields."))), /* @__PURE__ */ React.createElement("p", { className: "implication-close" }, "HTC VIVE's insights guide Cosmos toward a highly customizer-first spatial UI, ensuring that reading asynchronous comments doesn't feel like a chore.")), /* @__PURE__ */ React.createElement("footer", { className: "video-source-note" }, /* @__PURE__ */ React.createElement("span", null, "Source"), /* @__PURE__ */ React.createElement("p", null, "\u201CVIVE TALK - Reading in VR: Customizing Your Reading Experience,\u201D HTC VIVE, official presentation on ergonomic customization and sensory optimization in virtual reality. Video ID wWj7egAS7Vs."), /* @__PURE__ */ React.createElement("a", { href: "https://www.youtube.com/watch?v=wWj7egAS7Vs", target: "_blank", rel: "noreferrer" }, "HTC VIVE \u2197"))), activeChapter === "primary" && primaryPage === "overview" && /* @__PURE__ */ React.createElement("section", { className: "report-section primary", id: "primary" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "03" }, "Primary research"), /* @__PURE__ */ React.createElement("article", { className: "report-document primary-document" }, /* @__PURE__ */ React.createElement("header", { className: "report-page-intro" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Exploratory Phase & Synthesis"), /* @__PURE__ */ React.createElement("h1", null, "The physical limits of immersion and the premium on provenance."), /* @__PURE__ */ React.createElement("p", null, "This chapter compiles synthesized findings from three semi-structured interviews with think-aloud walkthroughs (Kris, Yves, Johnny) and a remote expert questionnaire. The qualitative feedback highlights a deep tension between headset convenience thresholds and the clear user demand for visual focus, ergonomic pacing, and verifiable source provenance.")), /* @__PURE__ */ React.createElement("nav", { className: "report-contents", "aria-label": "Primary research contents" }, /* @__PURE__ */ React.createElement("p", null, "In this report"), /* @__PURE__ */ React.createElement("a", { href: "#primary-scope" }, /* @__PURE__ */ React.createElement("span", null, "0"), "Exploratory scope"), /* @__PURE__ */ React.createElement("a", { href: "#primary-synthesis" }, /* @__PURE__ */ React.createElement("span", null, "1"), "Executive findings map"), /* @__PURE__ */ React.createElement("a", { href: "#primary-convenience" }, /* @__PURE__ */ React.createElement("span", null, "2"), "Convenience thresholds"), /* @__PURE__ */ React.createElement("a", { href: "#primary-ergonomics" }, /* @__PURE__ */ React.createElement("span", null, "3"), "Physical constraints"), /* @__PURE__ */ React.createElement("a", { href: "#primary-focus" }, /* @__PURE__ */ React.createElement("span", null, "4"), "Cognitive focus & provenance"), /* @__PURE__ */ React.createElement("a", { href: "#primary-experts" }, /* @__PURE__ */ React.createElement("span", null, "5"), "Expert design consensus"), /* @__PURE__ */ React.createElement("a", { href: "#primary-directives" }, /* @__PURE__ */ React.createElement("span", null, "6"), "Strategic design directives")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "primary-scope" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "0"), /* @__PURE__ */ React.createElement("h2", null, "Exploratory scope and participant profiles"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "To ground our theoretical spatial concept in user reality, we conducted four distinct research tracks with designers, engineers, and XR practitioners."), /* @__PURE__ */ React.createElement("p", null, "These early engagements let us stress-test our web-based prototype, understand behavioral limits, and refine our evaluation criteria before committing to native platform-specific development. Because user habits around online forums are deeply entrenched on desktop and mobile, our findings focus on the exact barriers that prevent people from switching to virtual environments for reading tasks."), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table report-table-wide" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Track"), /* @__PURE__ */ React.createElement("th", null, "Participant profile"), /* @__PURE__ */ React.createElement("th", null, "Methodology"), /* @__PURE__ */ React.createElement("th", null, "Key focus area"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Interview 01 (Kris)")), /* @__PURE__ */ React.createElement("td", null, "Software Engineer at BigTech; owns Quest 3; low routine XR use"), /* @__PURE__ */ React.createElement("td", null, "Semi-structured walkthrough on web"), /* @__PURE__ */ React.createElement("td", null, "Adoption convenience & text density limits")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Interview 02 (Yves)")), /* @__PURE__ */ React.createElement("td", null, "3D Artist; prior Unity XR developer; highly sensitive to motion"), /* @__PURE__ */ React.createElement("td", null, "Concept walk & design critique"), /* @__PURE__ */ React.createElement("td", null, "Physical comfort & spatial composition")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Interview 03 (Johnny)")), /* @__PURE__ */ React.createElement("td", null, "Graphic Designer; zero VR experience; frequent screen reader"), /* @__PURE__ */ React.createElement("td", null, "Think-aloud walkthrough"), /* @__PURE__ */ React.createElement("td", null, "Visual isolation, focus & source trust")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Interview 04 (JD Suh)")), /* @__PURE__ */ React.createElement("td", null, "Research Engineer; wears prescription glasses; highly interested in smart glasses & ambient AI"), /* @__PURE__ */ React.createElement("td", null, "Semi-structured interview & conceptual critique"), /* @__PURE__ */ React.createElement("td", null, "Doom scrolling feasibility & critical value of headset scrolling")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Expert Survey")), /* @__PURE__ */ React.createElement("td", null, "UX, UI, XR practitioners and experienced VR readers"), /* @__PURE__ */ React.createElement("td", null, "Remote structured questionnaire"), /* @__PURE__ */ React.createElement("td", null, "Typographic criteria & input modalities")))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "primary-synthesis" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "1"), /* @__PURE__ */ React.createElement("h2", null, "Executive findings map"), /* @__PURE__ */ React.createElement("p", null, "Our exploratory research revealed that while the conceptual model of a spatial discussion wall is highly engaging, its success depends entirely on resolving three core physical and cognitive friction points."), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table report-table-wide" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Dimension"), /* @__PURE__ */ React.createElement("th", null, "Identified user barrier"), /* @__PURE__ */ React.createElement("th", null, "Empirical evidence"), /* @__PURE__ */ React.createElement("th", null, "Strategic design directive"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Convenience & Access")), /* @__PURE__ */ React.createElement("td", null, "Headset adoption threshold is high; phone is default for quick browsing."), /* @__PURE__ */ React.createElement("td", null, "Kris: ", /* @__PURE__ */ React.createElement("i", null, "\u201CIf I want to doom scroll, isn't it easier to use my phone?\u201D")), /* @__PURE__ */ React.createElement("td", null, "Establish a spatially unique task (multi-source comparison) instead of feed parity.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Physical Ergonomics")), /* @__PURE__ */ React.createElement("td", null, "Headset fatigue limits productive reading sessions to 20\u201330 minutes."), /* @__PURE__ */ React.createElement("td", null, "Yves: Red marks, nose bridge pressure, makeup contamination, motion sickness."), /* @__PURE__ */ React.createElement("td", null, "Design for stationary, 20-minute focused review. Avoid continuous locomotion.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Information Structure")), /* @__PURE__ */ React.createElement("td", null, "High-density text layouts in VR feel chaotic and visually overwhelming."), /* @__PURE__ */ React.createElement("td", null, "Kris: ", /* @__PURE__ */ React.createElement("i", null, "\u201COne of the biggest limitations is how many words there are.\u201D")), /* @__PURE__ */ React.createElement("td", null, "Use progressive peripheral disclosure; reduce background text; highlight one focus card.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Cognitive Trust")), /* @__PURE__ */ React.createElement("td", null, "AI grouping and summaries provoke immediate skepticism about source validity."), /* @__PURE__ */ React.createElement("td", null, "Johnny: Refuses to trust synthesized threads without explicit source tracking."), /* @__PURE__ */ React.createElement("td", null, "Implement absolute provenance; let users trace every label back to raw text.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, "Value Alignment")), /* @__PURE__ */ React.createElement("td", null, "Mindless scrolling is an unhealthy mobile habit that shouldn't be friction-minimized in VR."), /* @__PURE__ */ React.createElement("td", null, "JD Suh: ", /* @__PURE__ */ React.createElement("i", null, "\u201CWhy do you want the experience of doom scrolling easier on VR headsets?\u201D")), /* @__PURE__ */ React.createElement("td", null, 'Pivot from "making scrolling easier" to "enabling high-value, structured research & sensemaking".')))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "primary-convenience" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2"), /* @__PURE__ */ React.createElement("h2", null, 'Convenience thresholds: Why VR "doomscrolling" is a non-starter'), /* @__PURE__ */ React.createElement("p", null, "Both Kris and Johnny emphasized that the immediate, low-friction convenience of mobile phones dictates their daily browsing habits. A phone is always within arm's reach, highly portable, and requires zero physical setup. In contrast, putting on a headset requires a startup sequence, sensory isolation from the physical room, and a deliberate decision to enter a virtual environment."), /* @__PURE__ */ React.createElement("p", null, "Therefore, ", /* @__PURE__ */ React.createElement("b", null, "Cosmos cannot win on casual or passive browsing."), " If Cosmos merely recreates a chronological feed in three dimensions, users will choose their phone every time."), /* @__PURE__ */ React.createElement("blockquote", { className: "report-quote" }, "\u201CIf I want to browse Reddit, I'm already in a relaxed state on the couch. Putting on a Quest feels like going to work.\u201D"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("b", null, "The Solution:"), " Cosmos must target purposeful, intensive information-seeking tasks where spatial comparison is a superpower\u2014for instance, analyzing competing arguments, reading complex research trees, or monitoring multiple active channels simultaneously."), /* @__PURE__ */ React.createElement("aside", { className: "report-note report-note-yellow" }, /* @__PURE__ */ React.createElement("b", null, "Implication"), /* @__PURE__ */ React.createElement("p", null, 'Move away from infinite-scroll structures. Build a bounded "workspace" that supports cross-source intelligence mapping instead of trying to make spatial reading a passive pastime.'))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "primary-ergonomics" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "3"), /* @__PURE__ */ React.createElement("h2", null, "Physical limits: The 20-minute ergonomic cutoff"), /* @__PURE__ */ React.createElement("p", null, "Yves's experience as a 3D artist and VR developer highlighted the physical realities of current headset hardware. For many users\u2014particularly those prone to motion sickness or concerned with skin hygiene (makeup, sweat)\u2014the headset is a high-cost environment. Yves noted that nose bridge pressure, red marks on the cheeks, and headset weight restrict continuous focus to 20 or 30 minutes at most."), /* @__PURE__ */ React.createElement("p", null, `Furthermore, Yves challenged the prototype's "flat cards in depth" spatial model, comparing it to an "Excel file wrapped in a circle." As a 3D practitioner, she demanded a more asymmetric, volumetric, and organic use of the 360-degree environment.`), /* @__PURE__ */ React.createElement("blockquote", { className: "report-quote" }, "\u201CWe are in 3D space, but we're still looking at flat sheets of text. Why can't we call notes with a physical wand, or have groups form organic clusters in depth?\u201D"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("b", null, "The Solution:"), " We must design the software around a 20-minute comfort budget. This means optimizing layouts to prevent rapid head-swiveling, supporting laid-back/reclined postures with easy recentering, and utilizing actual depth (depth-layering, volumetric clusters) rather than merely bending a traditional 2D dashboard around the reader."), /* @__PURE__ */ React.createElement("aside", { className: "report-note" }, /* @__PURE__ */ React.createElement("b", null, "Physical Design Standard"), /* @__PURE__ */ React.createElement("p", null, "Support lying down with zero continuous locomotion. Ensure all interactive targets reside within a comfortable 60-degree focal cone directly in front of the user's resting posture."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "primary-focus" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "4"), /* @__PURE__ */ React.createElement("h2", null, "Cognitive focus over immersion: Being here now, not everywhere"), /* @__PURE__ */ React.createElement("p", null, "Johnny's walkthrough brought a critical graphic-design lens: ", /* @__PURE__ */ React.createElement("b", null, "immersion is not a feature; focus is."), " He reacted strongly against the visual noise of the full spherical field. When many cards compete for attention at once, the reading experience feels scattered and stressful."), /* @__PURE__ */ React.createElement("p", null, 'However, when the prototype visually isolated a single focal card and dimmed the periphery, Johnny responded with enthusiasm, describing it as "being here now instead of everywhere."'), /* @__PURE__ */ React.createElement("blockquote", { className: "report-quote" }, "\u201CI love that everything else goes away. In a physical book, your eyes block out the room. VR should do that for my screen.\u201D"), /* @__PURE__ */ React.createElement("p", null, "Johnny also raised a fundamental trust barrier: the moment he noticed that the discussion cards used AI-synthesized structures, his trust dropped. He demanded absolute transparency\u2014knowing where each post originated, which user wrote it, and how the AI derived its summary tags."), /* @__PURE__ */ React.createElement("aside", { className: "report-note report-note-yellow" }, /* @__PURE__ */ React.createElement("b", null, "Cognitive Design Standard"), /* @__PURE__ */ React.createElement("p", null, "Implement absolute provenance. Every AI-generated summary, label, or spatial cluster must contain a visible, inspectable trail directly back to the original human text block. Trust is built on reversibility and trace verification."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "primary-experts" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "5"), /* @__PURE__ */ React.createElement("h2", null, "Expert design consensus: Reading ergonomics and physical posture"), /* @__PURE__ */ React.createElement("p", null, "The feedback from our remote expert questionnaire aligns with the physical boundaries reported by our interviewees, while defining precise typographical and mechanical rules for spatial reading platforms:"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Ideal Typography:"), " Experts suggest a default reading distance of 1.5 to 2.0 meters in virtual space, using highly legible sans-serif fonts (e.g. DM Sans, Inter) at a minimum angular size of 1.2 to 1.5 degrees to avoid subpixel rendering artifacts."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Postural Support:"), " Productive reading sessions are almost exclusively sedentary or reclined. Gaze and head rotation must be minimized; users should be able to scroll, expand, and move panels with minimal physical exertion."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Input Modalities:"), " Hand tracking is highly intuitive for spatial placement, but eye tracking combined with subtle finger-pinches (gaze + pinch) is the preferred standard for rapid, fatigue-free reading and card selection."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Environmental Comfort:"), " Avoid pure black or high-contrast white backgrounds, which cause lens flare and eye strain. Use mid-tone glassmorphic, low-contrast gradients and soft ambient lighting to set a relaxed focal tone."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "primary-directives" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "6"), /* @__PURE__ */ React.createElement("h2", null, "Strategic design directives: The Cosmos spatial architecture"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "These synthesis insights translate directly into the following architectural decisions for the next development cycle of Cosmos:"), /* @__PURE__ */ React.createElement("div", { className: "implication-grid" }, /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "1. Bounded 20-Min Sessions"), /* @__PURE__ */ React.createElement("p", null, "Structure the interface as a bounded review workspace rather than an infinite scroll. Let users digest a debate, extract key findings, and exit comfortably.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "2. Progressive Disclosure"), /* @__PURE__ */ React.createElement("p", null, "Keep the periphery clean. Show only abstract shapes, icons, or single-word tags in the 3D space, revealing full text cards only when selected into the focal zone.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "3. Multi-Modal Cues"), /* @__PURE__ */ React.createElement("p", null, "Never rely on color alone to categorize or link discussions. Use geometric clusters, connector lines, tactile icons, and spatial depth layering to show relationships.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "4. Source Trace (Provenance)"), /* @__PURE__ */ React.createElement("p", null, "Expose the raw human source for every summarized layer. Let users double-click any AI cluster label to see the exact paragraph on the original board."))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "12px", margin: "32px 0 12px 0" } }, /* @__PURE__ */ React.createElement("a", { className: "report-subreport-link", href: "/cosmos/primary/interview-kris/", style: { margin: 0 } }, /* @__PURE__ */ React.createElement("span", null, "Detailed report 03.1"), /* @__PURE__ */ React.createElement("b", null, "Think-Aloud Walkthrough: Software Engineer Kris"), /* @__PURE__ */ React.createElement("i", null, "Read analysis \u2192")), /* @__PURE__ */ React.createElement("a", { className: "report-subreport-link", href: "/cosmos/primary/interview-yves/", style: { margin: 0 } }, /* @__PURE__ */ React.createElement("span", null, "Detailed report 03.2"), /* @__PURE__ */ React.createElement("b", null, "Concept Critique: 3D Artist Yves"), /* @__PURE__ */ React.createElement("i", null, "Read analysis \u2192")), /* @__PURE__ */ React.createElement("a", { className: "report-subreport-link", href: "/cosmos/primary/interview-johnny/", style: { margin: 0 } }, /* @__PURE__ */ React.createElement("span", null, "Detailed report 03.3"), /* @__PURE__ */ React.createElement("b", null, "Visual Focus & Trust Walkthrough: Graphic Designer Johnny"), /* @__PURE__ */ React.createElement("i", null, "Read analysis \u2192")), /* @__PURE__ */ React.createElement("a", { className: "report-subreport-link", href: "/cosmos/primary/interview-jd-suh/", style: { margin: 0 } }, /* @__PURE__ */ React.createElement("span", null, "Detailed report 03.4"), /* @__PURE__ */ React.createElement("b", null, "Critical Value & Ergonomics Interview: Research Engineer JD Suh"), /* @__PURE__ */ React.createElement("i", null, "Read analysis \u2192")), /* @__PURE__ */ React.createElement("a", { className: "report-subreport-link", href: "/cosmos/primary/expert-questionnaire/", style: { margin: 0 } }, /* @__PURE__ */ React.createElement("span", null, "Detailed report 03.5"), /* @__PURE__ */ React.createElement("b", null, "Remote Expert Questionnaire Responses"), /* @__PURE__ */ React.createElement("i", null, "Read analysis \u2192")), /* @__PURE__ */ React.createElement("a", { className: "report-subreport-link", href: "/cosmos/primary/version1-review/", style: { margin: 0 } }, /* @__PURE__ */ React.createElement("span", null, "Detailed report 03.6"), /* @__PURE__ */ React.createElement("b", null, "Version 1 Architecture & SIGGRAPH Poster Peer Review"), /* @__PURE__ */ React.createElement("i", null, "Read analysis \u2192")))))), activeChapter === "primary" && primaryPage === "interview-kris" && /* @__PURE__ */ React.createElement("section", { className: "report-section interview-report", id: "interview-kris" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "03.1" }, "Primary research / Interview 01"), /* @__PURE__ */ React.createElement("article", { className: "report-document interview-document" }, /* @__PURE__ */ React.createElement("header", { className: "report-page-intro interview-intro" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Semi-structured interview + think-aloud walkthrough"), /* @__PURE__ */ React.createElement("h1", null, "Kris", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", null, "Software engineer at BigTech")), /* @__PURE__ */ React.createElement("p", null, "Kris discussed his forum and headset habits, then explored the browser-based Cosmos prototype while thinking aloud. The session surfaced a central tension: the spatial field was interesting, but text density, unclear input behavior, and headset friction could erase its advantage over a phone.")), /* @__PURE__ */ React.createElement("table", { className: "report-table interview-meta" }, /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Participant"), /* @__PURE__ */ React.createElement("td", null, "Kris"), /* @__PURE__ */ React.createElement("th", null, "Role context"), /* @__PURE__ */ React.createElement("td", null, "Software engineer at BigTech; not on the Quest team")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Format"), /* @__PURE__ */ React.createElement("td", null, "Semi-structured interview"), /* @__PURE__ */ React.createElement("th", null, "Activity"), /* @__PURE__ */ React.createElement("td", null, "Think-aloud walkthrough of the web prototype")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Relevant behavior"), /* @__PURE__ */ React.createElement("td", null, "\u224820 minutes of Reddit daily"), /* @__PURE__ */ React.createElement("th", null, "Device context"), /* @__PURE__ */ React.createElement("td", null, "Owns a Quest 3; limited regular headset use")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Evidence status"), /* @__PURE__ */ React.createElement("td", { colSpan: "3" }, "One exploratory interview. Directional evidence, not validation.")))), /* @__PURE__ */ React.createElement("nav", { className: "report-contents", "aria-label": "Interview report contents" }, /* @__PURE__ */ React.createElement("p", null, "In this report"), /* @__PURE__ */ React.createElement("a", { href: "#kris-summary" }, /* @__PURE__ */ React.createElement("span", null, "0"), "Interview summary"), /* @__PURE__ */ React.createElement("a", { href: "#kris-method" }, /* @__PURE__ */ React.createElement("span", null, "1"), "Method and limits"), /* @__PURE__ */ React.createElement("a", { href: "#kris-context" }, /* @__PURE__ */ React.createElement("span", null, "2"), "Behavioral context"), /* @__PURE__ */ React.createElement("a", { href: "#kris-walkthrough" }, /* @__PURE__ */ React.createElement("span", null, "3"), "Prototype walkthrough"), /* @__PURE__ */ React.createElement("a", { href: "#kris-findings" }, /* @__PURE__ */ React.createElement("span", null, "4"), "Key findings"), /* @__PURE__ */ React.createElement("a", { href: "#kris-decisions" }, /* @__PURE__ */ React.createElement("span", null, "5"), "Design decisions"), /* @__PURE__ */ React.createElement("a", { href: "#kris-next" }, /* @__PURE__ */ React.createElement("span", null, "6"), "Next research"), /* @__PURE__ */ React.createElement("a", { href: "#kris-transcript" }, /* @__PURE__ */ React.createElement("span", null, "A"), "Full transcript")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "kris-summary" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "0"), /* @__PURE__ */ React.createElement("h2", null, "Interview summary"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "Kris could imagine value in a spatial information environment, particularly for monitoring several sources at once, but he did not see \u201Cdoomscrolling in VR\u201D as sufficient reason to put on a headset."), /* @__PURE__ */ React.createElement("p", null, "His first evaluation criterion was convenience. A phone is immediate, portable, and already optimized for casual browsing. A headset requires startup time, physical commitment, and a private setting. Cosmos therefore needs a headset-specific advantage that cannot be reduced to reproducing an existing mobile feed."), /* @__PURE__ */ React.createElement("p", null, "During the walkthrough, Kris understood the spherical field and tried to infer meaning from card color, position, and content. He described the environment as \u201Cpretty cool,\u201D but also \u201Ca bit chaotic.\u201D The strongest usability issue was not navigation alone; it was the amount of text competing for attention across the entire field."), /* @__PURE__ */ React.createElement("aside", { className: "report-note" }, /* @__PURE__ */ React.createElement("b", null, "Primary interpretation"), /* @__PURE__ */ React.createElement("p", null, "The next prototype should stop treating content volume as evidence of spatial richness. It needs to establish a readable hierarchy: brief peripheral summaries, one clear focal item, non-color category cues, and explicit spatial controls."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "kris-method" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "1"), /* @__PURE__ */ React.createElement("h2", null, "Method and limitations"), /* @__PURE__ */ React.createElement("p", null, "The session combined an interview about forum use and headset expectations with an open-ended think-aloud walkthrough. Kris viewed the web version of Cosmos, moved through the spherical post field, inspected cards, tested display controls, attempted gaze and facial-gesture interactions, and tried to create a post."), /* @__PURE__ */ React.createElement("h3", null, "What the interview can support"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "Early hypotheses about convenience, information density, input expectations, and prototype comprehension."), /* @__PURE__ */ React.createElement("li", null, "Identification of usability failures that blocked the participant during the walkthrough."), /* @__PURE__ */ React.createElement("li", null, "Language for follow-up questions and tasks in the next comparative study.")), /* @__PURE__ */ React.createElement("h3", null, "What the interview cannot support"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "Claims about in-headset comfort or embodied navigation; the prototype was tested on the web."), /* @__PURE__ */ React.createElement("li", null, "Claims about broad user preference; this is one participant."), /* @__PURE__ */ React.createElement("li", null, "Claims about BigTech\u2019s product strategy. Kris explicitly declined to discuss confidential work and does not work directly on the Quest team."), /* @__PURE__ */ React.createElement("li", null, "Reliable evaluation of several controls because gaze, card sizing, content listing, and posting were partially broken.")), /* @__PURE__ */ React.createElement("aside", { className: "report-note report-note-yellow" }, /* @__PURE__ */ React.createElement("b", null, "Disclosure boundary"), /* @__PURE__ */ React.createElement("p", null, "Kris\u2019s employer provides relevant professional context but should not be presented as endorsement, insider validation, or expert testimony about BigTech hardware strategy."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "kris-context" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2"), /* @__PURE__ */ React.createElement("h2", null, "Behavioral context"), /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Topic"), /* @__PURE__ */ React.createElement("th", null, "Reported behavior"), /* @__PURE__ */ React.createElement("th", null, "Research relevance"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Forum use"), /* @__PURE__ */ React.createElement("td", null, "Approximately 20 minutes of Reddit per day; occasional Instagram and Facebook"), /* @__PURE__ */ React.createElement("td", null, "Kris is familiar with feed-based community browsing but not a heavy multi-platform forum user.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Infinite scroll"), /* @__PURE__ */ React.createElement("td", null, "Can spend longer than intended because there are always more posts to catch up on"), /* @__PURE__ */ React.createElement("td", null, "Supports the feed-control problem, but not necessarily a demand for VR browsing.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Self-regulation"), /* @__PURE__ */ React.createElement("td", null, "Attempts to limit usage and sometimes describes the behavior as addictive"), /* @__PURE__ */ React.createElement("td", null, "Cosmos should not use immersion to intensify the same attention loop.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Headset use"), /* @__PURE__ */ React.createElement("td", null, "Owns Quest 3 but does not use headsets often"), /* @__PURE__ */ React.createElement("td", null, "Startup effort and limited routine use are adoption constraints.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Voice input"), /* @__PURE__ */ React.createElement("td", null, "Generally prefers typing because speech recognition may produce incorrect results"), /* @__PURE__ */ React.createElement("td", null, "Voice should remain optional rather than the default input method.")))), /* @__PURE__ */ React.createElement("blockquote", { className: "report-quote" }, "\u201CIf I want to doom scroll, isn\u2019t it a lot easier to take out my phone and open the app, compared to turning on my headset?\u201D"), /* @__PURE__ */ React.createElement("p", null, "Kris identified one situational convenience advantage: browsing while lying down without holding a phone above the face. More significantly, he imagined a spatial workspace with Reddit, X, Threads, market information, and news visible simultaneously. This suggests that cross-source monitoring may be a stronger spatial use case than a single immersive feed.")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "kris-walkthrough" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "3"), /* @__PURE__ */ React.createElement("h2", null, "Prototype walkthrough"), /* @__PURE__ */ React.createElement("p", null, "Kris first noticed that the interface wrapped content around him as a spherical field. He then inspected individual cards, inferred possible relationships between color and topic, tested display controls, and attempted gaze, facial-gesture, drag, and posting interactions."), /* @__PURE__ */ React.createElement("figure", { className: "interview-prototype-figure" }, /* @__PURE__ */ React.createElement("div", { className: "prototype-annotation" }, /* @__PURE__ */ React.createElement("img", { src: "/assets/images/cosmos-sphere-browse.webp", alt: "The Cosmos spatial discussion prototype tested during Kris's interview" }), /* @__PURE__ */ React.createElement("span", { className: "annotation-marker marker-1" }, "1"), /* @__PURE__ */ React.createElement("span", { className: "annotation-marker marker-2" }, "2"), /* @__PURE__ */ React.createElement("span", { className: "annotation-marker marker-3" }, "3")), /* @__PURE__ */ React.createElement("figcaption", null, /* @__PURE__ */ React.createElement("ol", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Peripheral field:"), " many cards compete for attention simultaneously."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Focal card:"), " the selected post exposes substantially more detail."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Color groups:"), " category or sentiment is implied but not explicit or accessible.")))), /* @__PURE__ */ React.createElement("h3", null, "Walkthrough sequence"), /* @__PURE__ */ React.createElement("div", { className: "walkthrough-sequence" }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("i", null, "01"), /* @__PURE__ */ React.createElement("b", null, "Orient"), /* @__PURE__ */ React.createElement("small", null, "Recognized the spherical wrap")), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("i", null, "02"), /* @__PURE__ */ React.createElement("b", null, "Interpret"), /* @__PURE__ */ React.createElement("small", null, "Inferred meaning from card color")), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("i", null, "03"), /* @__PURE__ */ React.createElement("b", null, "Navigate"), /* @__PURE__ */ React.createElement("small", null, "Tested size and layout controls")), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("i", null, "04"), /* @__PURE__ */ React.createElement("b", null, "Attempt input"), /* @__PURE__ */ React.createElement("small", null, "Gaze, nod, shake, drag, post")), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("i", null, "05"), /* @__PURE__ */ React.createElement("b", null, "Reflect"), /* @__PURE__ */ React.createElement("small", null, "Identified density and control issues"))), /* @__PURE__ */ React.createElement("p", null, "The sequence shows that the conceptual model was legible enough to invite exploration, but interaction failures prevented reliable evaluation of several features. These failures are findings about prototype readiness, not evidence that gaze or gesture interaction is inherently unsuitable.")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "kris-findings" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "4"), /* @__PURE__ */ React.createElement("h2", null, "Key findings"), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table report-table-wide interview-findings-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Finding"), /* @__PURE__ */ React.createElement("th", null, "Observed evidence"), /* @__PURE__ */ React.createElement("th", null, "Interpretation"), /* @__PURE__ */ React.createElement("th", null, "Priority"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Headset convenience is a threshold"), /* @__PURE__ */ React.createElement("td", null, "Kris compared headset startup and physical commitment against taking out a phone."), /* @__PURE__ */ React.createElement("td", null, "Cosmos needs a spatially specific job, not feature parity with mobile browsing."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority strategic" }, "Strategic"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Text density is overwhelming"), /* @__PURE__ */ React.createElement("td", null, "\u201COne of the biggest limitations is how many words there are on the screen.\u201D"), /* @__PURE__ */ React.createElement("td", null, "Use progressive disclosure and reduce peripheral cards to concise summaries."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority critical" }, "Critical"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Color alone is insufficient"), /* @__PURE__ */ React.createElement("td", null, "Kris inferred categories, then noted that colors looked similar and could fail for color-blind users."), /* @__PURE__ */ React.createElement("td", null, "Combine color with labels, icons, position, shape, or pattern."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority critical" }, "Critical"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Gaze lacked control and confirmation"), /* @__PURE__ */ React.createElement("td", null, "The focal movement did not consistently match his target and sometimes traveled too far."), /* @__PURE__ */ React.createElement("td", null, "Increase target tolerance, stabilize selection, and show dwell/confirmation state."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority critical" }, "Critical"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Gestures need visible consequences"), /* @__PURE__ */ React.createElement("td", null, "Nod and shake produced no response Kris could identify."), /* @__PURE__ */ React.createElement("td", null, "Teach the gesture, preview its action, and provide immediate feedback."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority next" }, "Next"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Spatial windows should be placeable"), /* @__PURE__ */ React.createElement("td", null, "\u201CI wish I could move the windows around a bit and fix them somewhere.\u201D"), /* @__PURE__ */ React.createElement("td", null, "Add move, pin, and restore-position controls."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority next" }, "Next"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Images may improve scanning"), /* @__PURE__ */ React.createElement("td", null, "Kris supported representative images or media from the original post."), /* @__PURE__ */ React.createElement("td", null, "Test restrained image previews without increasing visual noise."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority test" }, "Test"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Voice is not a universal preference"), /* @__PURE__ */ React.createElement("td", null, "Kris preferred typing because speech recognition can be inaccurate."), /* @__PURE__ */ React.createElement("td", null, "Support keyboard and hand input; keep voice optional."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority later" }, "Later"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Timeline layers lacked discoverability"), /* @__PURE__ */ React.createElement("td", null, "The time-layer behavior was only understood after Rae explained the gesture."), /* @__PURE__ */ React.createElement("td", null, "Expose time as a visible control with instructions and state."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority next" }, "Next"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Adoption depends on polish"), /* @__PURE__ */ React.createElement("td", null, "Kris\u2019s willingness remained conditional on bugs, usability, and information density."), /* @__PURE__ */ React.createElement("td", null, "Do not use concept appeal as a proxy for product willingness."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority critical" }, "Critical"))))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "kris-decisions" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "5"), /* @__PURE__ */ React.createElement("h2", null, "Design decisions for the next prototype"), /* @__PURE__ */ React.createElement("h3", null, "Fix before the next evaluative test"), /* @__PURE__ */ React.createElement("ol", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Reduce peripheral text."), " Show one short headline or generated summary until a card is selected."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Add redundant category cues."), " Use labels and shape or position in addition to color."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Stabilize selection."), " Repair gaze targeting and add explicit hover, dwell, and selected states."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Repair core controls."), " Card sizing, content listing, and posting must work before they can be evaluated."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Teach spatial behavior."), " Make timeline, movement, and gesture controls visible rather than discoverable only through explanation.")), /* @__PURE__ */ React.createElement("h3", null, "Test in the next headset study"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "Hand-swipe navigation versus controller or pointer input."), /* @__PURE__ */ React.createElement("li", null, "Moveable and pinnable cards or application windows."), /* @__PURE__ */ React.createElement("li", null, "Representative images versus text-only peripheral cards."), /* @__PURE__ */ React.createElement("li", null, "A single-source wall versus a multi-source monitoring workspace."), /* @__PURE__ */ React.createElement("li", null, "The actual setup cost and reading comfort of an in-headset session.")), /* @__PURE__ */ React.createElement("h3", null, "Keep outside the immediate scope"), /* @__PURE__ */ React.createElement("p", null, "Voice-first search, facial gestures as primary controls, and a complete native posting system should remain secondary until basic reading and navigation are reliable.")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "kris-next" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "6"), /* @__PURE__ */ React.createElement("h2", null, "Next research"), /* @__PURE__ */ React.createElement("p", null, "This interview produces hypotheses for comparison, not final requirements. The next study should test the revised information hierarchy with participants who vary in forum use, headset familiarity, color vision, and preference for voice or gesture input."), /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Question"), /* @__PURE__ */ React.createElement("th", null, "Proposed comparison"), /* @__PURE__ */ React.createElement("th", null, "Measure"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "How much text should remain visible?"), /* @__PURE__ */ React.createElement("td", null, "Full cards vs. summary cards with focal expansion"), /* @__PURE__ */ React.createElement("td", null, "Comprehension, search time, perceived overload")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "How should categories be encoded?"), /* @__PURE__ */ React.createElement("td", null, "Color only vs. color + label + spatial grouping"), /* @__PURE__ */ React.createElement("td", null, "Category interpretation and accessibility")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Which input is reliable?"), /* @__PURE__ */ React.createElement("td", null, "Gaze, hand gesture, pointer/controller"), /* @__PURE__ */ React.createElement("td", null, "Error rate, correction time, confidence")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "What justifies the headset?"), /* @__PURE__ */ React.createElement("td", null, "Single feed vs. spatial comparison/multi-source task"), /* @__PURE__ */ React.createElement("td", null, "Preference, task performance, return intent")))), /* @__PURE__ */ React.createElement("aside", { className: "report-note" }, /* @__PURE__ */ React.createElement("b", null, "Decision rule"), /* @__PURE__ */ React.createElement("p", null, "If the revised spatial interface remains more overwhelming or less convenient than the flat baseline, the project should reduce spatial complexity rather than add more interaction modes."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "kris-transcript" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "A"), /* @__PURE__ */ React.createElement("h2", null, "Full transcript"), /* @__PURE__ */ React.createElement("p", null, "The transcript is lightly edited for punctuation and obvious speech-to-text errors. Content, sequence, uncertainty, prototype failures, and confidentiality boundaries are preserved."), /* @__PURE__ */ React.createElement(TranscriptAppendix, { src: "/cosmos/primary/interview-kris/transcript.txt" })))), activeChapter === "primary" && primaryPage === "interview-yves" && /* @__PURE__ */ React.createElement("section", { className: "report-section interview-report", id: "interview-yves" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "03.2" }, "Primary research / Interview 02"), /* @__PURE__ */ React.createElement("article", { className: "report-document interview-document" }, /* @__PURE__ */ React.createElement("header", { className: "report-page-intro interview-intro" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Semi-structured interview + concept walkthrough"), /* @__PURE__ */ React.createElement("h1", null, "Yves", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", null, "3D artist")), /* @__PURE__ */ React.createElement("p", null, "Yves discussed purposeful and passive social-media use, her experience developing for VR, and the physical constraints that limit headset sessions. During the Cosmos walkthrough, she responded strongly to the spatial-note concept while challenging the prototype to become more volumetric, organic, and emotionally contextual.")), /* @__PURE__ */ React.createElement("table", { className: "report-table interview-meta" }, /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Participant"), /* @__PURE__ */ React.createElement("td", null, "Yves"), /* @__PURE__ */ React.createElement("th", null, "Practice"), /* @__PURE__ */ React.createElement("td", null, "3D art; prior Unity VR development")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Format"), /* @__PURE__ */ React.createElement("td", null, "Semi-structured interview"), /* @__PURE__ */ React.createElement("th", null, "Activity"), /* @__PURE__ */ React.createElement("td", null, "Concept and prototype walkthrough")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Relevant hardware"), /* @__PURE__ */ React.createElement("td", null, "Quest 3S, HTC Vive, Spectacles, Vision Pro"), /* @__PURE__ */ React.createElement("th", null, "Session constraint"), /* @__PURE__ */ React.createElement("td", null, "Reports motion sickness after 20\u201330 minutes")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Evidence status"), /* @__PURE__ */ React.createElement("td", { colSpan: "3" }, "One exploratory interview. Directional evidence, not validation.")))), /* @__PURE__ */ React.createElement("nav", { className: "report-contents", "aria-label": "Interview report contents" }, /* @__PURE__ */ React.createElement("p", null, "In this report"), /* @__PURE__ */ React.createElement("a", { href: "#yves-summary" }, /* @__PURE__ */ React.createElement("span", null, "0"), "Interview summary"), /* @__PURE__ */ React.createElement("a", { href: "#yves-method" }, /* @__PURE__ */ React.createElement("span", null, "1"), "Method and limits"), /* @__PURE__ */ React.createElement("a", { href: "#yves-media" }, /* @__PURE__ */ React.createElement("span", null, "2"), "Media behavior"), /* @__PURE__ */ React.createElement("a", { href: "#yves-xr" }, /* @__PURE__ */ React.createElement("span", null, "3"), "XR constraints"), /* @__PURE__ */ React.createElement("a", { href: "#yves-space" }, /* @__PURE__ */ React.createElement("span", null, "4"), "Spatial interpretation"), /* @__PURE__ */ React.createElement("a", { href: "#yves-voice" }, /* @__PURE__ */ React.createElement("span", null, "5"), "Voice and context"), /* @__PURE__ */ React.createElement("a", { href: "#yves-findings" }, /* @__PURE__ */ React.createElement("span", null, "6"), "Key findings"), /* @__PURE__ */ React.createElement("a", { href: "#yves-decisions" }, /* @__PURE__ */ React.createElement("span", null, "7"), "Design decisions"), /* @__PURE__ */ React.createElement("a", { href: "#yves-transcript" }, /* @__PURE__ */ React.createElement("span", null, "A"), "Full transcript")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "yves-summary" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "0"), /* @__PURE__ */ React.createElement("h2", null, "Interview summary"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "Yves found the idea of a non-linear \u201Cnote-taking universe\u201D compelling, but her feedback makes long headset browsing a questionable baseline. For her, comfort, facial fit, motion sickness, and contamination from makeup are immediate barriers."), /* @__PURE__ */ React.createElement("p", null, "Her media habits also separate two different jobs. Reddit is a purposeful research tool used for immigration timelines and cultural context, sometimes for more than an hour on a laptop. Instagram and Threads are passive, bedtime entertainment that can continue for two or three hours. Cosmos should not assume those modes should become one immersive behavior."), /* @__PURE__ */ React.createElement("p", null, "As a 3D artist, Yves expected more than flat cards distributed in depth. She described the current arrangement as aligned \u201Clike an Excel file\u201D and proposed a more asymmetrical, 360-degree composition. She also introduced a different interaction metaphor: calling a note with a wand rather than scrolling through a disguised feed."), /* @__PURE__ */ React.createElement("aside", { className: "report-note" }, /* @__PURE__ */ React.createElement("b", null, "Primary interpretation"), /* @__PURE__ */ React.createElement("p", null, "The next prototype should test spatial composition and retrieval without increasing motion. Immersive atmosphere may support orientation or mood, but it should remain a controlled research variable\u2014not become decorative complexity by default."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "yves-method" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "1"), /* @__PURE__ */ React.createElement("h2", null, "Method and limitations"), /* @__PURE__ */ React.createElement("p", null, "The session combined questions about social-media behavior, VR/AR experience, and physical comfort with a walkthrough of the Cosmos concept and interface. Yves described her expectations for navigation, voice contribution, spatial composition, world-building, and adaptive sound and environment."), /* @__PURE__ */ React.createElement("h3", null, "What the interview can support"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "Identification of physical and contextual barriers to sustained headset reading."), /* @__PURE__ */ React.createElement("li", null, "Hypotheses about the difference between purposeful information search and passive entertainment."), /* @__PURE__ */ React.createElement("li", null, "A 3D practitioner\u2019s critique of the prototype\u2019s spatial composition and environmental coherence."), /* @__PURE__ */ React.createElement("li", null, "New test concepts for voice input, object-mediated prompting, atmosphere, and sound.")), /* @__PURE__ */ React.createElement("h3", null, "What the interview cannot support"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "General claims about all users prone to motion sickness or all women who wear makeup."), /* @__PURE__ */ React.createElement("li", null, "Evaluation of a production VR interaction; the discussion did not test a complete in-headset Cosmos build."), /* @__PURE__ */ React.createElement("li", null, "Validation of generative backgrounds, characters, or adaptive ASMR. These are concepts proposed during the interview."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "yves-media" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2"), /* @__PURE__ */ React.createElement("h2", null, "Two browsing modes: inquiry and escape"), /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Mode"), /* @__PURE__ */ React.createElement("th", null, "Platform and duration"), /* @__PURE__ */ React.createElement("th", null, "Purpose"), /* @__PURE__ */ React.createElement("th", null, "Implication"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Purposeful inquiry"), /* @__PURE__ */ React.createElement("td", null, "Reddit on laptop or phone; sometimes more than one hour"), /* @__PURE__ */ React.createElement("td", null, "Immigration timelines, specific information, and cultural interpretation"), /* @__PURE__ */ React.createElement("td", null, "Needs search, comparison, source context, and an efficient stopping point.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Passive entertainment"), /* @__PURE__ */ React.createElement("td", null, "Instagram and Threads; often two to three hours before sleep"), /* @__PURE__ */ React.createElement("td", null, "Killing time and following entertaining community threads"), /* @__PURE__ */ React.createElement("td", null, "Creates a long attention loop that Cosmos should not intensify through immersion.")))), /* @__PURE__ */ React.createElement("p", null, "These modes may need different product treatments. Purposeful research benefits from spatial comparison and memory. Passive browsing may benefit from boundaries, summaries, or deliberate session controls rather than a more enveloping endless environment."), /* @__PURE__ */ React.createElement("blockquote", { className: "report-quote" }, "\u201CReddit is for specific reasons\u2026 But for killing time, I use Instagram.\u201D")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "yves-xr" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "3"), /* @__PURE__ */ React.createElement("h2", null, "Physical comfort limits the reading session"), /* @__PURE__ */ React.createElement("p", null, "Yves used Quest 3S while developing a Unity application and could tolerate sessions of approximately 20\u201330 minutes before motion sickness. She had also tried HTC Vive, Spectacles, a single-lens AR prototype, and Apple Vision Pro. Vision Pro produced a better experience than the Quest hardware she referenced, but still placed uncomfortable weight on her nose."), /* @__PURE__ */ React.createElement("p", null, "Her constraints extend beyond motion sickness. Headsets do not fit her nose bridge well, make contact with makeup, and feel inappropriate for spontaneous use. She could imagine immersive reading only after cleansing her face, lying still in bed, and minimizing movement."), /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Constraint"), /* @__PURE__ */ React.createElement("th", null, "Reported effect"), /* @__PURE__ */ React.createElement("th", null, "Design consequence"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Motion sickness"), /* @__PURE__ */ React.createElement("td", null, "Limits use to roughly 20\u201330 minutes"), /* @__PURE__ */ React.createElement("td", null, "Avoid continuous locomotion and test short, stationary sessions.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Weight and facial fit"), /* @__PURE__ */ React.createElement("td", null, "Pressure on the nose; poor fit for her face"), /* @__PURE__ */ React.createElement("td", null, "Do not assume \u201Crelaxed reading\u201D is physically relaxed in a headset.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Makeup and contamination"), /* @__PURE__ */ React.createElement("td", null, "Reduces willingness to put on the device casually"), /* @__PURE__ */ React.createElement("td", null, "Setup context is part of adoption, not an external inconvenience.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Bedtime posture"), /* @__PURE__ */ React.createElement("td", null, "Prefers lying down with little movement"), /* @__PURE__ */ React.createElement("td", null, "Support recentering, limited head rotation, and reachable content zones.")))), /* @__PURE__ */ React.createElement("aside", { className: "report-note report-note-yellow" }, /* @__PURE__ */ React.createElement("b", null, "Implication for Cosmos"), /* @__PURE__ */ React.createElement("p", null, "Do not optimize for hours of immersive scrolling. Test short sessions, stationary navigation, and desktop continuity. Comfort should be measured as a primary outcome."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "yves-space" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "4"), /* @__PURE__ */ React.createElement("h2", null, "A 3D field must feel spatial, not merely displaced"), /* @__PURE__ */ React.createElement("p", null, "Yves initially found two-finger navigation unfamiliar because the notes moved backward and forward instead of vertically. Once Rae explained the non-linear intention, she described the environment as a \u201Cnote-taking universe\u201D and compared it to a Harry Potter classroom with notes moving through the air."), /* @__PURE__ */ React.createElement("p", null, "Her positive response came with a compositional critique. Cards remained front-facing and regularly aligned, so the environment did not feel fully three-dimensional. She expected cards to occupy a 360-degree field, vary in orientation, and form asymmetrical but intentional clusters."), /* @__PURE__ */ React.createElement("div", { className: "spatial-composition-comparison", "aria-label": "Comparison between aligned spatial cards and an organic spatial field" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "Current reading"), /* @__PURE__ */ React.createElement("div", { className: "aligned-field" }, /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null)), /* @__PURE__ */ React.createElement("p", null, "Parallel cards distributed in depth still read as a spreadsheet.")), /* @__PURE__ */ React.createElement("b", null, "\u2192"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "Proposed test"), /* @__PURE__ */ React.createElement("div", { className: "organic-field" }, /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null)), /* @__PURE__ */ React.createElement("p", null, "Asymmetrical orientation and clustered depth may improve volumetric legibility."))), /* @__PURE__ */ React.createElement("h3", null, "Interaction metaphor"), /* @__PURE__ */ React.createElement("p", null, "Yves proposed using a wand-like gesture to call a note. This is useful as a testable retrieval metaphor: point toward a region, summon one item into focus, and return it to its remembered location. The gaming reference should not determine the aesthetic, but it may clarify how a spatial field replaces scrolling.")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "yves-voice" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "5"), /* @__PURE__ */ React.createElement("h2", null, "Voice input needs a social object"), /* @__PURE__ */ React.createElement("p", null, "Unlike Kris, Yves preferred voice note-taking and saw it used by software engineers and older adults. However, she anticipated that speaking toward empty space would feel awkward. Her comparison was green-screen acting: expression becomes difficult without a person, object, or environmental context to address."), /* @__PURE__ */ React.createElement("p", null, "She proposed an animal, mirror, or assistant character that listens and converts speech into a draft post. The relevant hypothesis is not that Cosmos needs a mascot. It is that an addressable object may make asynchronous voice composition feel more intentional and may help a user externalize emotion."), /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Condition"), /* @__PURE__ */ React.createElement("th", null, "Expected experience"), /* @__PURE__ */ React.createElement("th", null, "Test"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Voice to empty space"), /* @__PURE__ */ React.createElement("td", null, "Awkward, unsupported self-talk"), /* @__PURE__ */ React.createElement("td", null, "Measure completion, fluency, and comfort.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Voice to a neutral object"), /* @__PURE__ */ React.createElement("td", null, "Clearer addressee without a social persona"), /* @__PURE__ */ React.createElement("td", null, "Compare mirror, recorder, or listening orb.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Voice to an assistant character"), /* @__PURE__ */ React.createElement("td", null, "Potentially more expressive, but more suggestive"), /* @__PURE__ */ React.createElement("td", null, "Measure comfort, trust, and influence on wording.")))), /* @__PURE__ */ React.createElement("aside", { className: "report-note" }, /* @__PURE__ */ React.createElement("b", null, "Risk"), /* @__PURE__ */ React.createElement("p", null, "A character that drafts posts may shape tone, disclosure, or opinion. The system must show the transcription and draft, preserve user control, and avoid implying human understanding."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "yves-findings" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "6"), /* @__PURE__ */ React.createElement("h2", null, "Key findings"), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table report-table-wide interview-findings-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Finding"), /* @__PURE__ */ React.createElement("th", null, "Evidence"), /* @__PURE__ */ React.createElement("th", null, "Interpretation"), /* @__PURE__ */ React.createElement("th", null, "Priority"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Long headset sessions are not a safe baseline"), /* @__PURE__ */ React.createElement("td", null, "Motion sickness after 20\u201330 minutes; weight and fit discomfort"), /* @__PURE__ */ React.createElement("td", null, "Use short stationary sessions and cross-device continuation."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority critical" }, "Critical"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Purposeful and passive browsing are different jobs"), /* @__PURE__ */ React.createElement("td", null, "Reddit for research; Instagram/Threads for hours of entertainment"), /* @__PURE__ */ React.createElement("td", null, "Design task-focused wall modes rather than one immersive feed loop."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority strategic" }, "Strategic"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Existing gestures carry strong expectations"), /* @__PURE__ */ React.createElement("td", null, "Two-finger input implied vertical scrolling"), /* @__PURE__ */ React.createElement("td", null, "Teach spatial navigation or use an interaction that does not resemble scrolling."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority critical" }, "Critical"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "The field lacks volumetric credibility"), /* @__PURE__ */ React.createElement("td", null, "Cards appeared aligned \u201Clike an Excel file\u201D"), /* @__PURE__ */ React.createElement("td", null, "Test controlled variation in angle, depth, scale, and clustering."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority next" }, "Next"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Calling a note may replace scrolling"), /* @__PURE__ */ React.createElement("td", null, "Proposed a wand to summon content"), /* @__PURE__ */ React.createElement("td", null, "Prototype point/select/summon/return as a spatial retrieval loop."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority test" }, "Test"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Voice benefits from an addressee"), /* @__PURE__ */ React.createElement("td", null, "Blank-space speaking compared with green-screen acting"), /* @__PURE__ */ React.createElement("td", null, "Compare no object, neutral object, and assistant character."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority test" }, "Test"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Atmosphere can contextualize reading"), /* @__PURE__ */ React.createElement("td", null, "Proposed adaptive HDRI, mood backgrounds, soundscapes, and ASMR"), /* @__PURE__ */ React.createElement("td", null, "Test only after legibility; atmosphere may aid context or introduce bias."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority later" }, "Later"))))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "yves-decisions" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "7"), /* @__PURE__ */ React.createElement("h2", null, "Design decisions and next research"), /* @__PURE__ */ React.createElement("h3", null, "Fix or constrain before the next headset study"), /* @__PURE__ */ React.createElement("ol", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Design for a stationary origin."), " Content should be reachable without continuous rotation or locomotion."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Define session length."), " Test a 10\u201315 minute task before considering extended browsing."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Clarify spatial navigation."), " Avoid gestures that look like vertical scroll but produce depth movement."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Create a volumetric composition system."), " Add bounded variation without sacrificing readable orientation."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Preserve a desktop continuation path."), " Users should be able to resume research without wearing the headset.")), /* @__PURE__ */ React.createElement("h3", null, "Prototype as controlled comparisons"), /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Question"), /* @__PURE__ */ React.createElement("th", null, "Comparison"), /* @__PURE__ */ React.createElement("th", null, "Measure"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Does organic orientation help?"), /* @__PURE__ */ React.createElement("td", null, "Parallel cards vs. bounded asymmetric field"), /* @__PURE__ */ React.createElement("td", null, "Cluster interpretation, reading speed, comfort")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Can a summon gesture replace scrolling?"), /* @__PURE__ */ React.createElement("td", null, "Drag/scroll vs. point and call"), /* @__PURE__ */ React.createElement("td", null, "Error rate, time to target, perceived control")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Does an addressee improve voice composition?"), /* @__PURE__ */ React.createElement("td", null, "Empty space vs. neutral object vs. character"), /* @__PURE__ */ React.createElement("td", null, "Fluency, comfort, edit distance, trust")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Does atmosphere support comprehension?"), /* @__PURE__ */ React.createElement("td", null, "Neutral environment vs. content-linked background/audio"), /* @__PURE__ */ React.createElement("td", null, "Recall, mood influence, distraction, bias")))), /* @__PURE__ */ React.createElement("aside", { className: "report-note" }, /* @__PURE__ */ React.createElement("b", null, "Scope boundary"), /* @__PURE__ */ React.createElement("p", null, "Dynamic generated environments and adaptive ASMR are later hypotheses. They should not enter the next prototype until the wall is readable, navigable, and comfortable in a neutral environment."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "yves-transcript" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "A"), /* @__PURE__ */ React.createElement("h2", null, "Full transcript"), /* @__PURE__ */ React.createElement("p", null, "The transcript is lightly edited for punctuation and obvious speech-to-text errors. The sequence and substantive responses are preserved."), /* @__PURE__ */ React.createElement(TranscriptAppendix, { src: "/cosmos/primary/interview-yves/transcript.txt" })))), activeChapter === "primary" && primaryPage === "interview-johnny" && /* @__PURE__ */ React.createElement("section", { className: "report-section interview-report", id: "interview-johnny" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "03.3" }, "Primary research / Interview 03"), /* @__PURE__ */ React.createElement("article", { className: "report-document interview-document" }, /* @__PURE__ */ React.createElement("header", { className: "report-page-intro interview-intro" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Semi-structured interview + prototype walkthrough"), /* @__PURE__ */ React.createElement("h1", null, "Johnny", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", null, "Graphic designer")), /* @__PURE__ */ React.createElement("p", null, "Johnny brought the perspective of a frequent screen reader with no VR experience and little interest in adopting a headset. His walkthrough identified source transparency, contextual focus, contrast, and topic control as more important than immersion itself.")), /* @__PURE__ */ React.createElement("table", { className: "report-table interview-meta" }, /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Participant"), /* @__PURE__ */ React.createElement("td", null, "Johnny"), /* @__PURE__ */ React.createElement("th", null, "Practice"), /* @__PURE__ */ React.createElement("td", null, "Graphic design")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Format"), /* @__PURE__ */ React.createElement("td", null, "Semi-structured interview"), /* @__PURE__ */ React.createElement("th", null, "Activity"), /* @__PURE__ */ React.createElement("td", null, "Prototype walkthrough with think-aloud feedback")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Relevant behavior"), /* @__PURE__ */ React.createElement("td", null, "Reddit for answers; Instagram and local news for ongoing reading"), /* @__PURE__ */ React.createElement("th", null, "XR experience"), /* @__PURE__ */ React.createElement("td", null, "No prior VR or AR use")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Evidence status"), /* @__PURE__ */ React.createElement("td", { colSpan: "3" }, "Exploratory interview with recording interruptions and ambiguous cross-talk.")))), /* @__PURE__ */ React.createElement("nav", { className: "report-contents", "aria-label": "Interview report contents" }, /* @__PURE__ */ React.createElement("p", null, "In this report"), /* @__PURE__ */ React.createElement("a", { href: "#johnny-summary" }, /* @__PURE__ */ React.createElement("span", null, "0"), "Interview summary"), /* @__PURE__ */ React.createElement("a", { href: "#johnny-method" }, /* @__PURE__ */ React.createElement("span", null, "1"), "Method and limits"), /* @__PURE__ */ React.createElement("a", { href: "#johnny-media" }, /* @__PURE__ */ React.createElement("span", null, "2"), "Reading and source habits"), /* @__PURE__ */ React.createElement("a", { href: "#johnny-vr" }, /* @__PURE__ */ React.createElement("span", null, "3"), "VR disposition"), /* @__PURE__ */ React.createElement("a", { href: "#johnny-walkthrough" }, /* @__PURE__ */ React.createElement("span", null, "4"), "Prototype walkthrough"), /* @__PURE__ */ React.createElement("a", { href: "#johnny-findings" }, /* @__PURE__ */ React.createElement("span", null, "5"), "Key findings"), /* @__PURE__ */ React.createElement("a", { href: "#johnny-decisions" }, /* @__PURE__ */ React.createElement("span", null, "6"), "Design decisions"), /* @__PURE__ */ React.createElement("a", { href: "#johnny-transcript" }, /* @__PURE__ */ React.createElement("span", null, "A"), "Full transcript")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "johnny-summary" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "0"), /* @__PURE__ */ React.createElement("h2", null, "Interview summary"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "Johnny did not see immersion as an inherent improvement. He valued the prototype when it helped him focus on one item while preserving awareness that other material remained nearby."), /* @__PURE__ */ React.createElement("p", null, "His existing information behavior is purposeful. He opens Reddit when he has a question or wants to compare other people\u2019s responses. On Instagram, he values posts that link to an original article because the source lets him investigate and decide for himself. He also described a prior work routine that alternated local news and email for approximately 20 minutes before starting the day."), /* @__PURE__ */ React.createElement("p", null, "During the walkthrough, Johnny responded positively when the interface visually reduced the surrounding field. He described this as being \u201Chere now instead of being everywhere.\u201D At the same time, he immediately asked where the posts came from and reacted differently after learning that the dataset was AI-generated."), /* @__PURE__ */ React.createElement("aside", { className: "report-note" }, /* @__PURE__ */ React.createElement("b", null, "Primary interpretation"), /* @__PURE__ */ React.createElement("p", null, "Cosmos should make focus and provenance first-class. A spatial field is useful only if it helps a reader narrow attention without losing context and verify where every post, summary, and inferred assumption came from."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "johnny-method" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "1"), /* @__PURE__ */ React.createElement("h2", null, "Method and limitations"), /* @__PURE__ */ React.createElement("p", null, "The session combined questions about social-media and news habits with a walkthrough of the Cosmos prototype. Johnny inspected posts, attempted clicking and scrolling, reacted to a focus treatment, read generated \u201Chidden assumptions,\u201D and asked about source material and topic selection."), /* @__PURE__ */ React.createElement("p", null, "The recording includes unrelated room announcements, eating, and ambiguous speaker transitions. The transcript is preserved, but unclear fragments are not treated as findings."), /* @__PURE__ */ React.createElement("h3", null, "Interpretive limits"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "Johnny has no prior VR or AR experience, so his comments describe expectations and concerns rather than in-headset behavior."), /* @__PURE__ */ React.createElement("li", null, "Several interactions failed or required explanation, limiting evaluation of the controls."), /* @__PURE__ */ React.createElement("li", null, "The prototype used synthetic community content, which changed the participant\u2019s trust evaluation."), /* @__PURE__ */ React.createElement("li", null, "Positive comments such as \u201Ccool\u201D do not establish adoption intent."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "johnny-media" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2"), /* @__PURE__ */ React.createElement("h2", null, "Reading begins with a question and ends at the source"), /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Behavior"), /* @__PURE__ */ React.createElement("th", null, "Context"), /* @__PURE__ */ React.createElement("th", null, "Relevance to Cosmos"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Reddit as answer-seeking"), /* @__PURE__ */ React.createElement("td", null, "Visits when he has an idea, question, or wants other perspectives"), /* @__PURE__ */ React.createElement("td", null, "Spatial browsing should support directed inquiry, not only passive discovery.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Instagram as a path to articles"), /* @__PURE__ */ React.createElement("td", null, "Values posts that expose an original article and its sources"), /* @__PURE__ */ React.createElement("td", null, "Every imported or summarized item needs visible provenance.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Local news routine"), /* @__PURE__ */ React.createElement("td", null, "Previously alternated news and email before starting work"), /* @__PURE__ */ React.createElement("td", null, "Cosmos may fit bounded information-review routines better than endless use.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Screen time"), /* @__PURE__ */ React.createElement("td", null, "Previously estimated at least four hours daily, split across desktop and phone"), /* @__PURE__ */ React.createElement("td", null, "High screen use does not imply interest in additional immersive screen time.")))), /* @__PURE__ */ React.createElement("blockquote", { className: "report-quote" }, "\u201CI love being able to know where the article is, where their sources are, so I can check them, read about it, and figure out for myself.\u201D")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "johnny-vr" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "3"), /* @__PURE__ */ React.createElement("h2", null, "VR introduces a re-entry cost"), /* @__PURE__ */ React.createElement("p", null, "Johnny had never used a VR headset or AR glasses and expressed no existing interest. His concern was not only visual realism. A phone can be put down immediately, returning attention to the physical environment. He expected a headset to require an adjustment period for the eyes and brain when entering or leaving the virtual environment."), /* @__PURE__ */ React.createElement("p", null, "He also described virtual experience as potentially passive because the surrounding landscape is hidden. This is a useful counterpoint to the project\u2019s immersive premise: blocking the physical world may reduce agency or environmental awareness rather than increase focus."), /* @__PURE__ */ React.createElement("aside", { className: "report-note report-note-yellow" }, /* @__PURE__ */ React.createElement("b", null, "Implication for Cosmos"), /* @__PURE__ */ React.createElement("p", null, "Include non-VR participants in future research. Test passthrough, rapid exit, environmental awareness, and transition comfort rather than evaluating only experienced headset users."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "johnny-walkthrough" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "4"), /* @__PURE__ */ React.createElement("h2", null, "Focus worked when context remained visible"), /* @__PURE__ */ React.createElement("p", null, "Johnny first identified a basic contrast issue: \u201Cwhite on white is hard to read.\u201D He then reacted strongly to a state that emphasized the current item while leaving the surrounding field visible. The background communicated that more information existed; the foreground communicated where attention belonged."), /* @__PURE__ */ React.createElement("div", { className: "focus-context-diagram", "aria-label": "Diagram showing contextual focus in a spatial field" }, /* @__PURE__ */ React.createElement("div", { className: "context-cards" }, /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null)), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("span", null, "Current post"), /* @__PURE__ */ React.createElement("b", null, "Focused content remains readable"), /* @__PURE__ */ React.createElement("p", null, "Context is present, but visually subordinate."))), /* @__PURE__ */ React.createElement("blockquote", { className: "report-quote" }, "\u201CI want to still see what\u2019s going on back there, but I want to be here\u2026 This tells me there\u2019s other things, but this also tells me where I should be now.\u201D"), /* @__PURE__ */ React.createElement("h3", null, "Source and model transparency"), /* @__PURE__ */ React.createElement("p", null, "After reading several cards and generated assumptions, Johnny asked whether the posts came from Reddit and where their sources were. Learning that the Richmond community dataset was synthetic changed the meaning of the content. This makes source status part of the interface, not metadata for a later detail screen."), /* @__PURE__ */ React.createElement("h3", null, "Unexpected attention target"), /* @__PURE__ */ React.createElement("p", null, "Johnny spent time interpreting the AI-generated hidden assumptions even though Rae said they were not the intended focus. The element\u2019s wording and placement gave it more visual authority than the research intended. Generated analysis must be labeled and subordinated to the original post."), /* @__PURE__ */ React.createElement("h3", null, "Topic control"), /* @__PURE__ */ React.createElement("p", null, "Johnny expected to type a topic or define interests, such as records or bread. A large spatial field without a stated query or boundary can appear arbitrary. Topic control may provide the entry point that makes a wall purposeful.")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "johnny-findings" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "5"), /* @__PURE__ */ React.createElement("h2", null, "Key findings"), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table report-table-wide interview-findings-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Finding"), /* @__PURE__ */ React.createElement("th", null, "Evidence"), /* @__PURE__ */ React.createElement("th", null, "Interpretation"), /* @__PURE__ */ React.createElement("th", null, "Priority"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Provenance is part of comprehension"), /* @__PURE__ */ React.createElement("td", null, "Asked where posts and sources came from; valued article links on Instagram"), /* @__PURE__ */ React.createElement("td", null, "Expose source, content status, author, and transformation history."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority critical" }, "Critical"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Contextual focus reduced overload"), /* @__PURE__ */ React.createElement("td", null, "Preferred seeing one item clearly while retaining the background field"), /* @__PURE__ */ React.createElement("td", null, "Use focus plus context instead of hiding everything or presenting equal emphasis."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority critical" }, "Critical"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Contrast failed immediately"), /* @__PURE__ */ React.createElement("td", null, "\u201CWhite on white is hard to read.\u201D"), /* @__PURE__ */ React.createElement("td", null, "Define minimum contrast for cards, controls, and focus states."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority critical" }, "Critical"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Generated assumptions drew unintended authority"), /* @__PURE__ */ React.createElement("td", null, "Read and debated assumptions that were not the intended feature"), /* @__PURE__ */ React.createElement("td", null, "Visually separate AI inference from participant content."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority critical" }, "Critical"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Spatial content needs a query or boundary"), /* @__PURE__ */ React.createElement("td", null, "Expected to enter topics and interests"), /* @__PURE__ */ React.createElement("td", null, "Start from a chosen question, community, or collection."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority next" }, "Next"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "VR transition and occlusion are adoption barriers"), /* @__PURE__ */ React.createElement("td", null, "Preferred \u201Creal life\u201D and expected adjustment when exiting immersion"), /* @__PURE__ */ React.createElement("td", null, "Test passthrough, immediate exit, and desktop access."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority strategic" }, "Strategic"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Interaction reliability remains unresolved"), /* @__PURE__ */ React.createElement("td", null, "Clicking and scrolling failed or required explanation"), /* @__PURE__ */ React.createElement("td", null, "Repair task-critical input before another evaluative session."), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "priority critical" }, "Critical"))))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "johnny-decisions" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "6"), /* @__PURE__ */ React.createElement("h2", null, "Design decisions and next research"), /* @__PURE__ */ React.createElement("h3", null, "Required changes"), /* @__PURE__ */ React.createElement("ol", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Add provenance to every content object."), " Distinguish imported, participant-authored, synthetic, summarized, and inferred material."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Formalize focus plus context."), " Keep peripheral structure visible while reducing its contrast, scale, and text detail."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Meet contrast requirements."), " Eliminate white-on-white states and verify legibility across backgrounds."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Demote AI interpretation."), " Hidden assumptions must never look more authoritative than their source."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Provide topic entry."), " Let users begin from a question, interest, community, or bounded dataset.")), /* @__PURE__ */ React.createElement("h3", null, "Follow-up comparisons"), /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Question"), /* @__PURE__ */ React.createElement("th", null, "Comparison"), /* @__PURE__ */ React.createElement("th", null, "Measure"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "How much context should remain?"), /* @__PURE__ */ React.createElement("td", null, "Full field vs. dimmed field vs. isolated card"), /* @__PURE__ */ React.createElement("td", null, "Recall, orientation, overload, return accuracy")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "How should provenance appear?"), /* @__PURE__ */ React.createElement("td", null, "Compact badge vs. visible source trail"), /* @__PURE__ */ React.createElement("td", null, "Trust, source lookup success, comprehension")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Does AI labeling distort authority?"), /* @__PURE__ */ React.createElement("td", null, "Original-only vs. source-linked inference"), /* @__PURE__ */ React.createElement("td", null, "Claim attribution and confidence calibration")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "What reduces re-entry concern?"), /* @__PURE__ */ React.createElement("td", null, "Immersive background vs. passthrough"), /* @__PURE__ */ React.createElement("td", null, "Comfort, environmental awareness, exit time"))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "johnny-transcript" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "A"), /* @__PURE__ */ React.createElement("h2", null, "Full transcript"), /* @__PURE__ */ React.createElement("p", null, "The source recording contains room announcements, interruptions, and ambiguous speaker transitions. The transcript is lightly edited for readability, and unclear fragments are retained rather than converted into findings."), /* @__PURE__ */ React.createElement(TranscriptAppendix, { src: "/cosmos/primary/interview-johnny/transcript.txt" })))), activeChapter === "primary" && primaryPage === "interview-jd-suh" && /* @__PURE__ */ React.createElement("section", { className: "report-section interview-report", id: "interview-jd-suh" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "03.4" }, "Primary research / Interview 04"), /* @__PURE__ */ React.createElement("article", { className: "report-document interview-document" }, /* @__PURE__ */ React.createElement("header", { className: "report-page-intro interview-intro" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Semi-structured interview + conceptual critique"), /* @__PURE__ */ React.createElement("h1", null, "JD Suh", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", null, "Research engineer")), /* @__PURE__ */ React.createElement("p", null, "JD Suh discussed smart glasses, personal AI intelligence, and scrolling habits. He offered a direct and grounded critique of the project's core hypothesis, questioning the ultimate value of making headset doom scrolling easier.")), /* @__PURE__ */ React.createElement("table", { className: "report-table interview-meta" }, /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Participant"), /* @__PURE__ */ React.createElement("td", null, "JD Suh"), /* @__PURE__ */ React.createElement("th", null, "Practice"), /* @__PURE__ */ React.createElement("td", null, "Research engineering")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Format"), /* @__PURE__ */ React.createElement("td", null, "Semi-structured interview"), /* @__PURE__ */ React.createElement("th", null, "Activity"), /* @__PURE__ */ React.createElement("td", null, "Conceptual and hypothesis critique")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Relevant habits"), /* @__PURE__ */ React.createElement("td", null, "Primarily X (Twitter) and YouTube in 5\u201310 min bursts"), /* @__PURE__ */ React.createElement("th", null, "Device context"), /* @__PURE__ */ React.createElement("td", null, "Wears prescription glasses; highly interested in future smart glasses")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Evidence status"), /* @__PURE__ */ React.createElement("td", { colSpan: "3" }, "One qualitative interview with direct concept counter-feedback. Key diagnostic pivot signal.")))), /* @__PURE__ */ React.createElement("nav", { className: "report-contents", "aria-label": "Interview report contents" }, /* @__PURE__ */ React.createElement("p", null, "In this report"), /* @__PURE__ */ React.createElement("a", { href: "#jd-summary" }, /* @__PURE__ */ React.createElement("span", null, "0"), "Interview summary"), /* @__PURE__ */ React.createElement("a", { href: "#jd-method" }, /* @__PURE__ */ React.createElement("span", null, "1"), "Method and limits"), /* @__PURE__ */ React.createElement("a", { href: "#jd-background" }, /* @__PURE__ */ React.createElement("span", null, "2"), "Background & Tech Familiarity"), /* @__PURE__ */ React.createElement("a", { href: "#jd-habits" }, /* @__PURE__ */ React.createElement("span", null, "3"), "Content consumption habits"), /* @__PURE__ */ React.createElement("a", { href: "#jd-reaction" }, /* @__PURE__ */ React.createElement("span", null, "4"), "Reaction & Critical Feedback"), /* @__PURE__ */ React.createElement("a", { href: "#jd-notes" }, /* @__PURE__ */ React.createElement("span", null, "5"), "Practical notes and details"), /* @__PURE__ */ React.createElement("a", { href: "#jd-transcript" }, /* @__PURE__ */ React.createElement("span", null, "A"), "Full summary transcript")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "jd-summary" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "0"), /* @__PURE__ */ React.createElement("h2", null, "Interview summary"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, 'JD Suh did not reject the potential of heads-up technology, but he forcefully challenged the premise of bringing "doom scrolling" into VR headsets.'), /* @__PURE__ */ React.createElement("p", null, "His background as a research engineer and a glasses wearer shaped a highly practical perspective. While he doesn't use VR daily and experienced severe dizziness trying it a decade ago, he is extremely eager to adopt smart glasses\u2014specifically as a host for a Jarvis-like ambient AI assistant that offers real-time contextual advice."), /* @__PURE__ */ React.createElement("p", null, `When presented with the concept of making it easier to navigate long-form text/forums in VR headsets to support "doom scrolling," his response was immediate and skeptical: "Sounds dizzy." More fundamentally, he questioned the desirability of the objective itself, asking why a developer would intentionally make a friction-filled, addictive behavior like doom scrolling easier to perform in an immersive headset. This feedback became a vital steering signal for the project's value proposition.`), /* @__PURE__ */ React.createElement("aside", { className: "report-note" }, /* @__PURE__ */ React.createElement("b", null, "Primary interpretation"), /* @__PURE__ */ React.createElement("p", null, `The project should not aim to optimize "doom scrolling" or mimic passive feeds. JD Suh's critique confirms that VR text consumption must be framed around active, intentional information synthesis rather than lowering the friction of mindless scrolling.`))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "jd-method" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "1"), /* @__PURE__ */ React.createElement("h2", null, "Method and limitations"), /* @__PURE__ */ React.createElement("p", null, "The session was a semi-structured interview covering the participant's background with smart devices, social media habits, and a critique of the interviewer's Quest-based forum browsing hypothesis. Due to the conceptual nature of the discussion and real-world ambient interruptions, the feedback focused on product positioning, ergonomics, and value-alignment."), /* @__PURE__ */ React.createElement("h3", null, "What the interview can support"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "Direct validation of optical/glasses-wearer friction for heads-up displays."), /* @__PURE__ */ React.createElement("li", null, 'Grounded ethical and functional critique of "easy doom scrolling" in headsets.'), /* @__PURE__ */ React.createElement("li", null, "Design parameters for future ambient smart-glasses integrations (AI Jarvis scenario).")), /* @__PURE__ */ React.createElement("h3", null, "What the interview cannot support"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "Physical prototype testing usability data, as the participant did not perform a direct WebXR walkthrough."), /* @__PURE__ */ React.createElement("li", null, "Generalizations about all research engineers or all glasses wearers."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "jd-background" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2"), /* @__PURE__ */ React.createElement("h2", null, "Background & Tech Familiarity: The smart glasses wedge"), /* @__PURE__ */ React.createElement("p", null, "JD Suh's profile highlights a critical dichotomy: he is highly skeptical of traditional, isolating VR headsets, yet extremely enthusiastic about the future of smart glasses."), /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Dimension"), /* @__PURE__ */ React.createElement("th", null, "Reported status"), /* @__PURE__ */ React.createElement("th", null, "Product implication"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "VR Experience"), /* @__PURE__ */ React.createElement("td", null, "Low routine use. Tried once 10 years ago; experienced severe motion sickness and dizziness."), /* @__PURE__ */ React.createElement("td", null, "Any immersive reading design must aggressively protect against visual and motion triggers.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Optical Needs"), /* @__PURE__ */ React.createElement("td", null, "Wears prescription lenses daily. No smart glasses owned yet."), /* @__PURE__ */ React.createElement("td", null, "Smart glasses must accommodate prescription lens integration seamlessly without adding ordering friction.")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Ambient Motivation"), /* @__PURE__ */ React.createElement("td", null, 'Strong desire to purchase future smart glasses to host an ambient "personal AI intelligence" (Jarvis model).'), /* @__PURE__ */ React.createElement("td", null, "The smart glasses mode of Cosmos must focus on ambient, real-time advice and glanceable summaries, not deep reading.")))), /* @__PURE__ */ React.createElement("blockquote", { className: "report-quote" }, "\u201CI want a personal AI intelligence\u2014like Tony Stark\u2019s Jarvis\u2014to receive ambient, real-time advice throughout the day on my smart glasses.\u201D")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "jd-habits" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "3"), /* @__PURE__ */ React.createElement("h2", null, "Content consumption habits: Short bursts and bedtime scrolls"), /* @__PURE__ */ React.createElement("p", null, "The participant's daily information diet is characterized by speed and focus, with longer passive sessions confined to highly specific times."), /* @__PURE__ */ React.createElement("div", { className: "steps-3", style: { margin: "24px 0" } }, /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("span", { className: "steps-3__num" }, "01"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "Short bursts during active hours"), /* @__PURE__ */ React.createElement("p", null, "Scrolls X and YouTube for 5 to 10 minutes at a time. This brevity is enforced by pressing tasks and the need to get back to work immediately."))), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("span", { className: "steps-3__num" }, "02"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "Deep dive feeds"), /* @__PURE__ */ React.createElement("p", null, "Longer scrolling or video consumption occurs exclusively before bed or on weekends when there is dedicated free time."))), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("span", { className: "steps-3__num" }, "03"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "Algorithmic drift"), /* @__PURE__ */ React.createElement("p", null, 'On YouTube, after watching a primary clip, his behavior is dominated by scrolling through the "related videos" feed, showing a reliance on contextual recommendations.'))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "jd-reaction" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "4"), /* @__PURE__ */ React.createElement("h2", null, "Reaction & Critical Feedback: Head-on value challenge"), /* @__PURE__ */ React.createElement("p", null, 'JD Suh provided the most direct challenge of the research cycle. When the interviewer shared their Quest-based journey and the hypothesis that VR headsets are underused because "doom scrolling long-form forums is currently too difficult in headset," JD Suh questioned the desirability of the solution.'), /* @__PURE__ */ React.createElement("div", { className: "focus-context-diagram", style: { margin: "24px 0" } }, /* @__PURE__ */ React.createElement("article", { style: { width: "100%", maxWidth: "100%" } }, /* @__PURE__ */ React.createElement("span", null, "Core Critique"), /* @__PURE__ */ React.createElement("b", null, '"Why do you want people to doom scroll easy on your headset?"'), /* @__PURE__ */ React.createElement("p", { style: { marginTop: "12px", color: "var(--pink)", fontWeight: "600" } }, '"Why do you want the experience of doom scrolling easier on VR headsets?"'), /* @__PURE__ */ React.createElement("p", { style: { marginTop: "12px" } }, "This counter-feedback cuts to the core of the Cosmos value proposition. It forces a clear distinction between ", /* @__PURE__ */ React.createElement("b", null, "mindless, high-friction scrolling (slop)"), " and ", /* @__PURE__ */ React.createElement("b", null, "high-value, structured research and comparison (sensemaking)"), "."))), /* @__PURE__ */ React.createElement("aside", { className: "report-note report-note-yellow" }, /* @__PURE__ */ React.createElement("b", null, 'The "Sounds Dizzy" Barrier'), /* @__PURE__ */ React.createElement("p", null, 'His immediate reaction to the idea of headset doom scrolling ("Sounds dizzy") highlights that motion sickness and physical fatigue remain absolute roadblocks for casual, non-essential headset tasks.'))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "jd-notes" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "5"), /* @__PURE__ */ React.createElement("h2", null, "Practical notes & Details"), /* @__PURE__ */ React.createElement("p", null, 'The interview session was dynamic, briefly shifting into a meta-discussion about qualitative research methods\u2014specifically the importance of avoiding leading questions ("leading up with...") during user walkthroughs.'), /* @__PURE__ */ React.createElement("p", null, "The latter portion of the session experienced ambient, real-world household interruptions, including references to milk and a pretty pan. It concluded with a discussion on the high ordering friction for prescription smart glasses lenses and a casual departure."), /* @__PURE__ */ React.createElement("h3", null, "Strategic Design Directives from JD Suh"), /* @__PURE__ */ React.createElement("div", { className: "implication-grid", style: { marginTop: "24px" } }, /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "1. Reject Doom Scrolling"), /* @__PURE__ */ React.createElement("p", null, 'Reposition Cosmos away from "making feed-scrolling easier" and toward structured, purposeful comparison workspaces.')), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "2. Guard Ergonomics"), /* @__PURE__ */ React.createElement("p", null, 'Design specifically for zero-rotation, stationary, and comfortable layout models to prevent the "dizzy" response.')), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "3. Smart-Glasses Hook"), /* @__PURE__ */ React.createElement("p", null, "Map out an ambient glasses integration focused on real-time advice (the Jarvis model) rather than dense, multi-hour reading trees.")))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "jd-transcript" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "A"), /* @__PURE__ */ React.createElement("h2", null, "Full summary transcript"), /* @__PURE__ */ React.createElement("p", null, "The full interview summary, detailing background, habits, hypothesis critique, and practical notes, is preserved below."), /* @__PURE__ */ React.createElement(TranscriptAppendix, { src: "/cosmos/primary/interview-jd-suh/transcript.txt" })))), activeChapter === "making" && /* @__PURE__ */ React.createElement("section", { className: "report-section making making-page", id: "making" }, /* @__PURE__ */ React.createElement(ChapterLabel, { number: "08" }, "Making Cosmos"), /* @__PURE__ */ React.createElement("div", { className: "section-heading" }, /* @__PURE__ */ React.createElement("h2", null, "Ship the wall.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", null, "Prove reading. Earn community.")), /* @__PURE__ */ React.createElement("p", null, "Making is no longer a blank research wish-list. The product PRDs in", " ", /* @__PURE__ */ React.createElement("code", null, "2606-Cosmos-Vr/prd"), " describe a production dual-surface system: a shipped desktop planetarium (", /* @__PURE__ */ React.createElement("code", null, "/web"), ") and a locked walkable IWSDK surface (", /* @__PURE__ */ React.createElement("code", null, "/VR"), "). This chapter is the build truth \u2014 principles, modules, pipeline, and the phase order that keeps research honest.")), /* @__PURE__ */ React.createElement("div", { className: "making-status-bar", "aria-label": "Build status" }, /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "Status"), /* @__PURE__ */ React.createElement("span", null, "Production build (not a hackathon)")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "Live"), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("a", { href: "https://cosmosweb.web.app/web", target: "_blank", rel: "noreferrer" }, "cosmosweb.web.app/web"))), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "Next product surface"), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("code", null, "/VR"), " \xB7 strict IWSDK \xB7 PRD v2")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("b", null, "Research rule"), /* @__PURE__ */ React.createElement("span", null, "Reading value before contribution pressure"))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "making-principles" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "1"), /* @__PURE__ */ React.createElement("h2", null, "Design principles (non-negotiable)"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "Emerged from building, not from a brand deck. If a change fights these, it does not ship."), /* @__PURE__ */ React.createElement("div", { className: "making-principles" }, makingPrinciples.map((p) => /* @__PURE__ */ React.createElement("article", { key: p.number }, /* @__PURE__ */ React.createElement("span", null, p.number), /* @__PURE__ */ React.createElement("h3", null, p.title), /* @__PURE__ */ React.createElement("p", null, p.body))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "making-surfaces" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "2"), /* @__PURE__ */ React.createElement("h2", null, "Dual surface"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "One product story \u2014 discourse as place \u2014 two interaction contracts. ", /* @__PURE__ */ React.createElement("code", null, "/web"), " keeps you at the center looking out. ", /* @__PURE__ */ React.createElement("code", null, "/VR"), " lets you walk the wall."), /* @__PURE__ */ React.createElement("div", { className: "making-surfaces" }, makingSurfaces.map((surface) => /* @__PURE__ */ React.createElement("article", { key: surface.id, className: `making-surface is-${surface.id}` }, /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("p", { className: "making-surface__route" }, surface.route), /* @__PURE__ */ React.createElement("h3", null, surface.name), /* @__PURE__ */ React.createElement("i", null, surface.status)), /* @__PURE__ */ React.createElement("dl", null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Stack"), /* @__PURE__ */ React.createElement("dd", null, surface.stack)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Metaphor"), /* @__PURE__ */ React.createElement("dd", null, surface.metaphor)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Time"), /* @__PURE__ */ React.createElement("dd", null, surface.timeModel)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Input"), /* @__PURE__ */ React.createElement("dd", null, surface.input))))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "making-modules" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "3"), /* @__PURE__ */ React.createElement("h2", null, "PRD modules (what exists and what waits)"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "Twelve feature documents. Shipped modules are operating reality on ", /* @__PURE__ */ React.createElement("code", null, "/web"), ". Deferred and draft modules stay visible so Making does not pretend the platform is finished."), /* @__PURE__ */ React.createElement("div", { className: "making-modules" }, makingModules.map((mod) => /* @__PURE__ */ React.createElement(
      "article",
      {
        key: mod.code,
        className: "making-module " + (mod.status.startsWith("Shipped") || mod.status.startsWith("Production") ? "is-shipped" : mod.status.startsWith("Deferred") ? "is-deferred" : mod.status.includes("PRD") || mod.status.includes("not built") ? "is-planned" : "is-other")
      },
      /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("span", null, mod.code), /* @__PURE__ */ React.createElement("i", null, mod.status)),
      /* @__PURE__ */ React.createElement("h3", null, mod.title),
      /* @__PURE__ */ React.createElement("p", null, mod.intent),
      /* @__PURE__ */ React.createElement("ul", null, mod.facts.map((fact) => /* @__PURE__ */ React.createElement("li", { key: fact }, fact)))
    )))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "making-pipeline" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "4"), /* @__PURE__ */ React.createElement("h2", null, "Content pipeline"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "A topic becomes a wall through three AI stages and a client load path that prefers cache, then streams generation when needed."), /* @__PURE__ */ React.createElement("div", { className: "making-pipeline" }, makingPipeline.map((step) => /* @__PURE__ */ React.createElement("article", { key: step.stage }, /* @__PURE__ */ React.createElement("span", null, step.stage), /* @__PURE__ */ React.createElement("h3", null, step.name), /* @__PURE__ */ React.createElement("p", null, step.body)))), /* @__PURE__ */ React.createElement("div", { className: "making-callout" }, /* @__PURE__ */ React.createElement("b", null, "Spatial axes on /web"), /* @__PURE__ */ React.createElement("p", null, "Longitude (\u03B8) carries opinion spectrum \xB7 latitude (\u03C6) carries abstraction \xB7 rank-based age drives fog focus (and, on future ", /* @__PURE__ */ React.createElement("code", null, "/VR"), ", shell radius). Architect output is spherical; the client normalizes, repels, and pole-clamps so the dome stays readable."))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "making-interaction" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "5"), /* @__PURE__ */ React.createElement("h2", null, "Interaction modes on /web"), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table report-table-wide" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Mode"), /* @__PURE__ */ React.createElement("th", null, "Card behavior"), /* @__PURE__ */ React.createElement("th", null, "Chrome"), /* @__PURE__ */ React.createElement("th", null, "Camera / input"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("strong", null, "Normal")), /* @__PURE__ */ React.createElement("td", null, "Expand in place (0.15s)"), /* @__PURE__ */ React.createElement("td", null, "None"), /* @__PURE__ */ React.createElement("td", null, "Drag + focus animation")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("strong", null, "Browse")), /* @__PURE__ */ React.createElement("td", null, "Stay compact; glow nearest"), /* @__PURE__ */ React.createElement("td", null, "Left detail panel"), /* @__PURE__ */ React.createElement("td", null, "Drag only \u2014 pan the discourse")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("strong", null, "Gaze")), /* @__PURE__ */ React.createElement("td", null, "Expand in place"), /* @__PURE__ */ React.createElement("td", null, "None"), /* @__PURE__ */ React.createElement("td", null, "Head-pose steering + auto-open (opt-in camera)")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("strong", null, "Seated VR")), /* @__PURE__ */ React.createElement("td", null, "Expand in place"), /* @__PURE__ */ React.createElement("td", null, "None"), /* @__PURE__ */ React.createElement("td", null, "WebXR pose owns orientation; still origin-locked"))))), /* @__PURE__ */ React.createElement("p", { className: "making-note" }, "Walkable VR is intentionally not this table. ", /* @__PURE__ */ React.createElement("code", null, "/VR"), " uses IWSDK locomotion and leaves the geometric center \u2014 a different contract, documented in PRD 12.")), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "making-vr" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "6"), /* @__PURE__ */ React.createElement("h2", null, "What /VR must feel like (PRD 12)"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "One-sentence goal from the IWSDK PRD: a walkable multi-source conversation sphere wall \u2014 recent posts near, older posts out; stock locomotion; proximity voice briefings; speak to plant a real opinion on the wall (DB-backed; external network publish mocked)."), /* @__PURE__ */ React.createElement("div", { className: "making-vr-cards" }, /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "Must"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("code", null, "World.create"), " owns the runtime \xB7 Immersive VR session \xB7 ECS for cards/layers/audio \xB7 IWER desktop test \xB7 default locomotion \xB7 prefer IWSDK spatial audio.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "Must not"), /* @__PURE__ */ React.createElement("p", null, "No ", /* @__PURE__ */ React.createElement("code", null, "@react-three/xr"), " on this route \xB7 no R3F canvas as XR world \xB7 no MediaPipe driving the VR camera \xB7 no hand-rolled WASD replacing IWSDK move.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "Honesty"), /* @__PURE__ */ React.createElement("p", null, "Multi-source is the frame and badge model; live ingest from five networks is not required for MVP. Wall posts are real. \u201CPublished to X/Threads\u201D is mocked until OAuth exists.")))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "making-roadmap" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "7"), /* @__PURE__ */ React.createElement("h2", null, "Phase order"), /* @__PURE__ */ React.createElement("p", { className: "report-lead" }, "Build truth first, then validation, then continuity, then walkable VR, then contribution. Each layer waits on evidence \u2014 not on feature FOMO."), /* @__PURE__ */ React.createElement("div", { className: "roadmap making-roadmap" }, phases.map((phase) => /* @__PURE__ */ React.createElement("article", { key: phase.phase }, /* @__PURE__ */ React.createElement("div", { className: "phase-top" }, /* @__PURE__ */ React.createElement("span", null, phase.phase), /* @__PURE__ */ React.createElement("i", null, phase.status)), /* @__PURE__ */ React.createElement("h3", null, phase.name), /* @__PURE__ */ React.createElement("p", null, phase.body), /* @__PURE__ */ React.createElement("ul", null, phase.outputs.map((output) => /* @__PURE__ */ React.createElement("li", { key: output }, output))))))), /* @__PURE__ */ React.createElement("section", { className: "report-chapter", id: "making-stack" }, /* @__PURE__ */ React.createElement("span", { className: "report-number" }, "8"), /* @__PURE__ */ React.createElement("h2", null, "Stack snapshot"), /* @__PURE__ */ React.createElement("div", { className: "report-table-scroll" }, /* @__PURE__ */ React.createElement("table", { className: "report-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Layer"), /* @__PURE__ */ React.createElement("th", null, "Choice"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Client /web"), /* @__PURE__ */ React.createElement("td", null, "React 19, TypeScript, Vite 7, R3F 9, drei, Three, Framer Motion, Tailwind 4, MediaPipe")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Client /VR (planned)"), /* @__PURE__ */ React.createElement("td", null, "Thin React shell + @iwsdk/core World, IWER via vite plugin, stock locomotion")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "API"), /* @__PURE__ */ React.createElement("td", null, "Express 5, Anthropic SDK, SSE ", /* @__PURE__ */ React.createElement("code", null, "/api/process"), ", layout/posts/vote/admin routes")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "Data & host"), /* @__PURE__ */ React.createElement("td", null, "Firestore/Mongo path \xB7 Firebase Hosting \xB7 Cloud Run API")))))), /* @__PURE__ */ React.createElement("blockquote", null, /* @__PURE__ */ React.createElement("span", null, "Big conclusion"), /* @__PURE__ */ React.createElement("p", null, "The wall is buildable and partly built. It is still not validated as better sense-making."), /* @__PURE__ */ React.createElement("footer", null, "Making Cosmos now means: operate the production planetarium, measure reading against a flat feed, then earn walkable /VR and contribution \u2014 in that order. Prototype:", " ", /* @__PURE__ */ React.createElement("a", { href: "https://cosmosweb.web.app/web", target: "_blank", rel: "noreferrer" }, "cosmosweb.web.app/web"))), /* @__PURE__ */ React.createElement("div", { className: "report-next-links" }, /* @__PURE__ */ React.createElement("a", { href: "/cosmos/impact-analysis/" }, "\u2190 Impact analysis"), /* @__PURE__ */ React.createElement("a", { href: "/cosmos/design-system/" }, "Next: Design system \u2192")))), /* @__PURE__ */ React.createElement("footer", { className: "site-footer" }, /* @__PURE__ */ React.createElement("div", { className: "footer-mark" }, /* @__PURE__ */ React.createElement("span", { className: "wordmark-mark" }, /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null))), /* @__PURE__ */ React.createElement("p", null, "Cosmos is an independent research project by Rae Jin."), /* @__PURE__ */ React.createElement("a", { href: "#top" }, "Back to top \u2191")));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
})();
