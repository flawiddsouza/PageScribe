var $O = (h) => {
  throw TypeError(h);
};
var TO = (h, c, f) => c.has(h) || $O("Cannot " + f);
var on = (h, c, f) => (TO(h, c, "read from private field"), f ? f.call(h) : c.get(h)), An = (h, c, f) => c.has(h) ? $O("Cannot add the same private member more than once") : c instanceof WeakSet ? c.add(h) : c.set(h, f), an = (h, c, f, p) => (TO(h, c, "write to private field"), p ? p.call(h, f) : c.set(h, f), f);
var Ds = Array.isArray, h1 = Array.prototype.indexOf, $h = Array.from, c1 = Object.defineProperty, En = Object.getOwnPropertyDescriptor, FO = Object.getOwnPropertyDescriptors, u1 = Object.prototype, f1 = Array.prototype, Th = Object.getPrototypeOf;
function d1(h) {
  return h();
}
function yh(h) {
  for (var c = 0; c < h.length; c++)
    h[c]();
}
const De = 2, HO = 4, Es = 8, Ph = 16, Ki = 32, zn = 64, fa = 128, un = 256, da = 512, we = 1024, jr = 2048, fn = 4096, Yi = 8192, Nn = 16384, O1 = 32768, Rh = 65536, JO = 1 << 17, p1 = 1 << 19, KO = 1 << 20, dr = Symbol("$state"), m1 = Symbol("legacy props"), g1 = Symbol("");
function tp(h) {
  return h === this.v;
}
function v1(h, c) {
  return h != h ? c == c : h !== c || h !== null && typeof h == "object" || typeof h == "function";
}
function Ch(h) {
  return !v1(h, this.v);
}
function Q1(h) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function y1() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function b1(h) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function w1() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function x1(h) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function S1() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function k1() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function $1() {
  throw new Error("https://svelte.dev/e/state_unsafe_local_read");
}
function T1() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
let Zs = !1;
function P1() {
  Zs = !0;
}
const _h = 1, Ah = 2, ep = 4, R1 = 8, C1 = 16, _1 = 1, A1 = 2, W1 = 4, X1 = 8, q1 = 16, M1 = 1, D1 = 2, qe = Symbol();
function ui(h, c) {
  var f = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: h,
    reactions: null,
    equals: tp,
    rv: 0,
    wv: 0
  };
  return f;
}
// @__NO_SIDE_EFFECTS__
function Wh(h, c = !1) {
  var p;
  const f = ui(h);
  return c || (f.equals = Ch), Zs && Et !== null && Et.l !== null && ((p = Et.l).s ?? (p.s = [])).push(f), f;
}
function Kt(h, c = !1) {
  return /* @__PURE__ */ E1(/* @__PURE__ */ Wh(h, c));
}
// @__NO_SIDE_EFFECTS__
function E1(h) {
  return $t !== null && $t.f & De && (Fi === null ? J1([h]) : Fi.push(h)), h;
}
function pt(h, c) {
  return E(
    h,
    Ji(() => g(h))
  ), c;
}
function E(h, c) {
  return $t !== null && js() && $t.f & (De | Ph) && // If the source was created locally within the current derived, then
  // we allow the mutation.
  (Fi === null || !Fi.includes(h)) && T1(), Rs(h, c);
}
function Rs(h, c) {
  return h.equals(c) || (h.v, h.v = c, h.wv = gp(), ip(h, jr), js() && Tt !== null && Tt.f & we && !(Tt.f & (Ki | zn)) && (fr === null ? K1([h]) : fr.push(h))), c;
}
function ip(h, c) {
  var f = h.reactions;
  if (f !== null)
    for (var p = js(), v = f.length, y = 0; y < v; y++) {
      var $ = f[y], W = $.f;
      W & jr || !p && $ === Tt || (di($, c), W & (we | un) && (W & De ? ip(
        /** @type {Derived} */
        $,
        fn
      ) : $a(
        /** @type {Effect} */
        $
      )));
    }
}
let Z1 = !1;
function Mn(h, c = null, f) {
  if (typeof h != "object" || h === null || dr in h)
    return h;
  const p = Th(h);
  if (p !== u1 && p !== f1)
    return h;
  var v = /* @__PURE__ */ new Map(), y = Ds(h), $ = ui(0);
  y && v.set("length", ui(
    /** @type {any[]} */
    h.length
  ));
  var W;
  return new Proxy(
    /** @type {any} */
    h,
    {
      defineProperty(S, x, P) {
        (!("value" in P) || P.configurable === !1 || P.enumerable === !1 || P.writable === !1) && S1();
        var T = v.get(x);
        return T === void 0 ? (T = ui(P.value), v.set(x, T)) : E(T, Mn(P.value, W)), !0;
      },
      deleteProperty(S, x) {
        var P = v.get(x);
        if (P === void 0)
          x in S && v.set(x, ui(qe));
        else {
          if (y && typeof x == "string") {
            var T = (
              /** @type {Source<number>} */
              v.get("length")
            ), X = Number(x);
            Number.isInteger(X) && X < T.v && E(T, X);
          }
          E(P, qe), PO($);
        }
        return !0;
      },
      get(S, x, P) {
        var Z;
        if (x === dr)
          return h;
        var T = v.get(x), X = x in S;
        if (T === void 0 && (!X || (Z = En(S, x)) != null && Z.writable) && (T = ui(Mn(X ? S[x] : qe, W)), v.set(x, T)), T !== void 0) {
          var q = g(T);
          return q === qe ? void 0 : q;
        }
        return Reflect.get(S, x, P);
      },
      getOwnPropertyDescriptor(S, x) {
        var P = Reflect.getOwnPropertyDescriptor(S, x);
        if (P && "value" in P) {
          var T = v.get(x);
          T && (P.value = g(T));
        } else if (P === void 0) {
          var X = v.get(x), q = X == null ? void 0 : X.v;
          if (X !== void 0 && q !== qe)
            return {
              enumerable: !0,
              configurable: !0,
              value: q,
              writable: !0
            };
        }
        return P;
      },
      has(S, x) {
        var q;
        if (x === dr)
          return !0;
        var P = v.get(x), T = P !== void 0 && P.v !== qe || Reflect.has(S, x);
        if (P !== void 0 || Tt !== null && (!T || (q = En(S, x)) != null && q.writable)) {
          P === void 0 && (P = ui(T ? Mn(S[x], W) : qe), v.set(x, P));
          var X = g(P);
          if (X === qe)
            return !1;
        }
        return T;
      },
      set(S, x, P, T) {
        var et;
        var X = v.get(x), q = x in S;
        if (y && x === "length")
          for (var Z = P; Z < /** @type {Source<number>} */
          X.v; Z += 1) {
            var N = v.get(Z + "");
            N !== void 0 ? E(N, qe) : Z in S && (N = ui(qe), v.set(Z + "", N));
          }
        X === void 0 ? (!q || (et = En(S, x)) != null && et.writable) && (X = ui(void 0), E(X, Mn(P, W)), v.set(x, X)) : (q = X.v !== qe, E(X, Mn(P, W)));
        var gt = Reflect.getOwnPropertyDescriptor(S, x);
        if (gt != null && gt.set && gt.set.call(T, P), !q) {
          if (y && typeof x == "string") {
            var wt = (
              /** @type {Source<number>} */
              v.get("length")
            ), Rt = Number(x);
            Number.isInteger(Rt) && Rt >= wt.v && E(wt, Rt + 1);
          }
          PO($);
        }
        return !0;
      },
      ownKeys(S) {
        g($);
        var x = Reflect.ownKeys(S).filter((X) => {
          var q = v.get(X);
          return q === void 0 || q.v !== qe;
        });
        for (var [P, T] of v)
          T.v !== qe && !(P in S) && x.push(P);
        return x;
      },
      setPrototypeOf() {
        k1();
      }
    }
  );
}
function PO(h, c = 1) {
  E(h, h.v + c);
}
function RO(h) {
  return h !== null && typeof h == "object" && dr in h ? h[dr] : h;
}
function j1(h, c) {
  return Object.is(RO(h), RO(c));
}
var CO, rp, np;
function z1() {
  if (CO === void 0) {
    CO = window;
    var h = Element.prototype, c = Node.prototype;
    rp = En(c, "firstChild").get, np = En(c, "nextSibling").get, h.__click = void 0, h.__className = "", h.__attributes = null, h.__styles = null, h.__e = void 0, Text.prototype.__t = void 0;
  }
}
function Xh(h = "") {
  return document.createTextNode(h);
}
// @__NO_SIDE_EFFECTS__
function Cs(h) {
  return rp.call(h);
}
// @__NO_SIDE_EFFECTS__
function wa(h) {
  return np.call(h);
}
function I(h, c) {
  return /* @__PURE__ */ Cs(h);
}
function ci(h, c) {
  {
    var f = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ Cs(
        /** @type {Node} */
        h
      )
    );
    return f instanceof Comment && f.data === "" ? /* @__PURE__ */ wa(f) : f;
  }
}
function K(h, c = 1, f = !1) {
  let p = h;
  for (; c--; )
    p = /** @type {TemplateNode} */
    /* @__PURE__ */ wa(p);
  return p;
}
function N1(h) {
  h.textContent = "";
}
// @__NO_SIDE_EFFECTS__
function Oa(h) {
  var c = De | jr;
  Tt === null ? c |= un : Tt.f |= KO;
  var f = $t !== null && $t.f & De ? (
    /** @type {Derived} */
    $t
  ) : null;
  const p = {
    children: null,
    ctx: Et,
    deps: null,
    equals: tp,
    f: c,
    fn: h,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      null
    ),
    wv: 0,
    parent: f ?? Tt
  };
  return f !== null && (f.children ?? (f.children = [])).push(p), p;
}
// @__NO_SIDE_EFFECTS__
function sp(h) {
  const c = /* @__PURE__ */ Oa(h);
  return c.equals = Ch, c;
}
function op(h) {
  var c = h.children;
  if (c !== null) {
    h.children = null;
    for (var f = 0; f < c.length; f += 1) {
      var p = c[f];
      p.f & De ? qh(
        /** @type {Derived} */
        p
      ) : Or(
        /** @type {Effect} */
        p
      );
    }
  }
}
function I1(h) {
  for (var c = h.parent; c !== null; ) {
    if (!(c.f & De))
      return (
        /** @type {Effect} */
        c
      );
    c = c.parent;
  }
  return null;
}
function ap(h) {
  var c, f = Tt;
  fi(I1(h));
  try {
    op(h), c = Qp(h);
  } finally {
    fi(f);
  }
  return c;
}
function lp(h) {
  var c = ap(h), f = (hn || h.f & un) && h.deps !== null ? fn : we;
  di(h, f), h.equals(c) || (h.v = c, h.wv = gp());
}
function qh(h) {
  op(h), _s(h, 0), di(h, Nn), h.v = h.children = h.deps = h.ctx = h.reactions = null;
}
function hp(h) {
  Tt === null && $t === null && b1(), $t !== null && $t.f & un && y1(), Eh && Q1();
}
function G1(h, c) {
  var f = c.last;
  f === null ? c.last = c.first = h : (f.next = h, h.prev = f, c.last = h);
}
function In(h, c, f, p = !0) {
  var v = (h & zn) !== 0, y = Tt, $ = {
    ctx: Et,
    deps: null,
    deriveds: null,
    nodes_start: null,
    nodes_end: null,
    f: h | jr,
    first: null,
    fn: c,
    last: null,
    next: null,
    parent: v ? null : y,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0
  };
  if (f) {
    var W = Zn;
    try {
      AO(!0), ka($), $.f |= O1;
    } catch (P) {
      throw Or($), P;
    } finally {
      AO(W);
    }
  } else c !== null && $a($);
  var S = f && $.deps === null && $.first === null && $.nodes_start === null && $.teardown === null && ($.f & (KO | fa)) === 0;
  if (!S && !v && p && (y !== null && G1($, y), $t !== null && $t.f & De)) {
    var x = (
      /** @type {Derived} */
      $t
    );
    (x.children ?? (x.children = [])).push($);
  }
  return $;
}
function V1(h) {
  const c = In(Es, null, !1);
  return di(c, we), c.teardown = h, c;
}
function _O(h) {
  hp();
  var c = Tt !== null && (Tt.f & Ki) !== 0 && Et !== null && !Et.m;
  if (c) {
    var f = (
      /** @type {ComponentContext} */
      Et
    );
    (f.e ?? (f.e = [])).push({
      fn: h,
      effect: Tt,
      reaction: $t
    });
  } else {
    var p = Er(h);
    return p;
  }
}
function L1(h) {
  return hp(), Gn(h);
}
function U1(h) {
  const c = In(zn, h, !0);
  return (f = {}) => new Promise((p) => {
    f.outro ? pa(c, () => {
      Or(c), p(void 0);
    }) : (Or(c), p(void 0));
  });
}
function Er(h) {
  return In(HO, h, !1);
}
function Wn(h, c) {
  var f = (
    /** @type {ComponentContextLegacy} */
    Et
  ), p = { effect: null, ran: !1 };
  f.l.r1.push(p), p.effect = Gn(() => {
    h(), !p.ran && (p.ran = !0, E(f.l.r2, !0), Ji(c));
  });
}
function B1() {
  var h = (
    /** @type {ComponentContextLegacy} */
    Et
  );
  Gn(() => {
    if (g(h.l.r2)) {
      for (var c of h.l.r1) {
        var f = c.effect;
        f.f & we && di(f, fn), Vn(f) && ka(f), c.ran = !1;
      }
      h.l.r2.v = !1;
    }
  });
}
function Gn(h) {
  return In(Es, h, !0);
}
function te(h) {
  return xa(h);
}
function xa(h, c = 0) {
  return In(Es | Ph | c, h, !0);
}
function jn(h, c = !0) {
  return In(Es | Ki, h, !0, c);
}
function cp(h) {
  var c = h.teardown;
  if (c !== null) {
    const f = Eh, p = $t;
    WO(!0), Hi(null);
    try {
      c.call(null);
    } finally {
      WO(f), Hi(p);
    }
  }
}
function up(h) {
  var c = h.deriveds;
  if (c !== null) {
    h.deriveds = null;
    for (var f = 0; f < c.length; f += 1)
      qh(c[f]);
  }
}
function fp(h, c = !1) {
  var f = h.first;
  for (h.first = h.last = null; f !== null; ) {
    var p = f.next;
    Or(f, c), f = p;
  }
}
function Y1(h) {
  for (var c = h.first; c !== null; ) {
    var f = c.next;
    c.f & Ki || Or(c), c = f;
  }
}
function Or(h, c = !0) {
  var f = !1;
  if ((c || h.f & p1) && h.nodes_start !== null) {
    for (var p = h.nodes_start, v = h.nodes_end; p !== null; ) {
      var y = p === v ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ wa(p)
      );
      p.remove(), p = y;
    }
    f = !0;
  }
  fp(h, c && !f), up(h), _s(h, 0), di(h, Nn);
  var $ = h.transitions;
  if ($ !== null)
    for (const S of $)
      S.stop();
  cp(h);
  var W = h.parent;
  W !== null && W.first !== null && dp(h), h.next = h.prev = h.teardown = h.ctx = h.deps = h.fn = h.nodes_start = h.nodes_end = null;
}
function dp(h) {
  var c = h.parent, f = h.prev, p = h.next;
  f !== null && (f.next = p), p !== null && (p.prev = f), c !== null && (c.first === h && (c.first = p), c.last === h && (c.last = f));
}
function pa(h, c) {
  var f = [];
  Mh(h, f, !0), Op(f, () => {
    Or(h), c && c();
  });
}
function Op(h, c) {
  var f = h.length;
  if (f > 0) {
    var p = () => --f || c();
    for (var v of h)
      v.out(p);
  } else
    c();
}
function Mh(h, c, f) {
  if (!(h.f & Yi)) {
    if (h.f ^= Yi, h.transitions !== null)
      for (const $ of h.transitions)
        ($.is_global || f) && c.push($);
    for (var p = h.first; p !== null; ) {
      var v = p.next, y = (p.f & Rh) !== 0 || (p.f & Ki) !== 0;
      Mh(p, c, y ? f : !1), p = v;
    }
  }
}
function ma(h) {
  pp(h, !0);
}
function pp(h, c) {
  if (h.f & Yi) {
    h.f ^= Yi, h.f & we || (h.f ^= we), Vn(h) && (di(h, jr), $a(h));
    for (var f = h.first; f !== null; ) {
      var p = f.next, v = (f.f & Rh) !== 0 || (f.f & Ki) !== 0;
      pp(f, v ? c : !1), f = p;
    }
    if (h.transitions !== null)
      for (const y of h.transitions)
        (y.is_global || c) && y.in();
  }
}
let bh = !1, wh = [];
function F1() {
  bh = !1;
  const h = wh.slice();
  wh = [], yh(h);
}
function Dh(h) {
  bh || (bh = !0, queueMicrotask(F1)), wh.push(h);
}
function H1(h) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
let ca = !1, ga = !1, va = null, Zn = !1, Eh = !1;
function AO(h) {
  Zn = h;
}
function WO(h) {
  Eh = h;
}
let xh = [], Ts = 0;
let $t = null;
function Hi(h) {
  $t = h;
}
let Tt = null;
function fi(h) {
  Tt = h;
}
let Fi = null;
function J1(h) {
  Fi = h;
}
let Me = null, Fe = 0, fr = null;
function K1(h) {
  fr = h;
}
let mp = 1, Qa = 0, hn = !1, Mr = null, Et = null;
function gp() {
  return ++mp;
}
function js() {
  return !Zs || Et !== null && Et.l === null;
}
function Vn(h) {
  var x;
  var c = h.f;
  if (c & jr)
    return !0;
  if (c & fn) {
    var f = h.deps, p = (c & un) !== 0;
    if (f !== null) {
      var v, y, $ = (c & da) !== 0, W = p && Tt !== null && !hn, S = f.length;
      if ($ || W) {
        for (v = 0; v < S; v++)
          y = f[v], ($ || !((x = y == null ? void 0 : y.reactions) != null && x.includes(h))) && (y.reactions ?? (y.reactions = [])).push(h);
        $ && (h.f ^= da);
      }
      for (v = 0; v < S; v++)
        if (y = f[v], Vn(
          /** @type {Derived} */
          y
        ) && lp(
          /** @type {Derived} */
          y
        ), y.wv > h.wv)
          return !0;
    }
    (!p || Tt !== null && !hn) && di(h, we);
  }
  return !1;
}
function tw(h, c) {
  for (var f = c; f !== null; ) {
    if (f.f & fa)
      try {
        f.fn(h);
        return;
      } catch {
        f.f ^= fa;
      }
    f = f.parent;
  }
  throw ca = !1, h;
}
function ew(h) {
  return (h.f & Nn) === 0 && (h.parent === null || (h.parent.f & fa) === 0);
}
function Sa(h, c, f, p) {
  if (ca) {
    if (f === null && (ca = !1), ew(c))
      throw h;
    return;
  }
  f !== null && (ca = !0);
  {
    tw(h, c);
    return;
  }
}
function vp(h, c, f = 0) {
  var p = h.reactions;
  if (p !== null)
    for (var v = 0; v < p.length; v++) {
      var y = p[v];
      y.f & De ? vp(
        /** @type {Derived} */
        y,
        c,
        f + 1
      ) : c === y && (f === 0 ? di(y, jr) : y.f & we && di(y, fn), $a(
        /** @type {Effect} */
        y
      ));
    }
}
function Qp(h) {
  var X;
  var c = Me, f = Fe, p = fr, v = $t, y = hn, $ = Fi, W = Et, S = h.f;
  Me = /** @type {null | Value[]} */
  null, Fe = 0, fr = null, $t = S & (Ki | zn) ? null : h, hn = !Zn && (S & un) !== 0, Fi = null, Et = h.ctx, Qa++;
  try {
    var x = (
      /** @type {Function} */
      (0, h.fn)()
    ), P = h.deps;
    if (Me !== null) {
      var T;
      if (_s(h, Fe), P !== null && Fe > 0)
        for (P.length = Fe + Me.length, T = 0; T < Me.length; T++)
          P[Fe + T] = Me[T];
      else
        h.deps = P = Me;
      if (!hn)
        for (T = Fe; T < P.length; T++)
          ((X = P[T]).reactions ?? (X.reactions = [])).push(h);
    } else P !== null && Fe < P.length && (_s(h, Fe), P.length = Fe);
    if (js() && fr !== null && !(h.f & (De | fn | jr)))
      for (T = 0; T < /** @type {Source[]} */
      fr.length; T++)
        vp(
          fr[T],
          /** @type {Effect} */
          h
        );
    return v !== null && Qa++, x;
  } finally {
    Me = c, Fe = f, fr = p, $t = v, hn = y, Fi = $, Et = W;
  }
}
function iw(h, c) {
  let f = c.reactions;
  if (f !== null) {
    var p = h1.call(f, h);
    if (p !== -1) {
      var v = f.length - 1;
      v === 0 ? f = c.reactions = null : (f[p] = f[v], f.pop());
    }
  }
  f === null && c.f & De && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Me === null || !Me.includes(c)) && (di(c, fn), c.f & (un | da) || (c.f ^= da), _s(
    /** @type {Derived} **/
    c,
    0
  ));
}
function _s(h, c) {
  var f = h.deps;
  if (f !== null)
    for (var p = c; p < f.length; p++)
      iw(h, f[p]);
}
function ka(h) {
  var c = h.f;
  if (!(c & Nn)) {
    di(h, we);
    var f = Tt, p = Et;
    Tt = h;
    try {
      c & Ph ? Y1(h) : fp(h), up(h), cp(h);
      var v = Qp(h);
      h.teardown = typeof v == "function" ? v : null, h.wv = mp;
      var y = h.deps, $;
    } catch (W) {
      Sa(W, h, f, p || h.ctx);
    } finally {
      Tt = f;
    }
  }
}
function rw() {
  if (Ts > 1e3) {
    Ts = 0;
    try {
      w1();
    } catch (h) {
      if (va !== null)
        Sa(h, va, null);
      else
        throw h;
    }
  }
  Ts++;
}
function nw(h) {
  var c = h.length;
  if (c !== 0) {
    rw();
    var f = Zn;
    Zn = !0;
    try {
      for (var p = 0; p < c; p++) {
        var v = h[p];
        v.f & we || (v.f ^= we);
        var y = [];
        yp(v, y), sw(y);
      }
    } finally {
      Zn = f;
    }
  }
}
function sw(h) {
  var c = h.length;
  if (c !== 0)
    for (var f = 0; f < c; f++) {
      var p = h[f];
      if (!(p.f & (Nn | Yi)))
        try {
          Vn(p) && (ka(p), p.deps === null && p.first === null && p.nodes_start === null && (p.teardown === null ? dp(p) : p.fn = null));
        } catch (v) {
          Sa(v, p, null, p.ctx);
        }
    }
}
function ow() {
  if (ga = !1, Ts > 1001)
    return;
  const h = xh;
  xh = [], nw(h), ga || (Ts = 0, va = null);
}
function $a(h) {
  ga || (ga = !0, queueMicrotask(ow)), va = h;
  for (var c = h; c.parent !== null; ) {
    c = c.parent;
    var f = c.f;
    if (f & (zn | Ki)) {
      if (!(f & we)) return;
      c.f ^= we;
    }
  }
  xh.push(c);
}
function yp(h, c) {
  var f = h.first, p = [];
  t: for (; f !== null; ) {
    var v = f.f, y = (v & Ki) !== 0, $ = y && (v & we) !== 0, W = f.next;
    if (!$ && !(v & Yi))
      if (v & Es) {
        if (y)
          f.f ^= we;
        else
          try {
            Vn(f) && ka(f);
          } catch (T) {
            Sa(T, f, null, f.ctx);
          }
        var S = f.first;
        if (S !== null) {
          f = S;
          continue;
        }
      } else v & HO && p.push(f);
    if (W === null) {
      let T = f.parent;
      for (; T !== null; ) {
        if (h === T)
          break t;
        var x = T.next;
        if (x !== null) {
          f = x;
          continue t;
        }
        T = T.parent;
      }
    }
    f = W;
  }
  for (var P = 0; P < p.length; P++)
    S = p[P], c.push(S), yp(S, c);
}
function g(h) {
  var P;
  var c = h.f, f = (c & De) !== 0;
  if (f && c & Nn) {
    var p = ap(
      /** @type {Derived} */
      h
    );
    return qh(
      /** @type {Derived} */
      h
    ), p;
  }
  if (Mr !== null && Mr.add(h), $t !== null) {
    Fi !== null && Fi.includes(h) && $1();
    var v = $t.deps;
    h.rv < Qa && (h.rv = Qa, Me === null && v !== null && v[Fe] === h ? Fe++ : Me === null ? Me = [h] : Me.push(h));
  } else if (f && /** @type {Derived} */
  h.deps === null)
    for (var y = (
      /** @type {Derived} */
      h
    ), $ = y.parent, W = y; $ !== null; )
      if ($.f & De) {
        var S = (
          /** @type {Derived} */
          $
        );
        W = S, $ = S.parent;
      } else {
        var x = (
          /** @type {Effect} */
          $
        );
        (P = x.deriveds) != null && P.includes(W) || (x.deriveds ?? (x.deriveds = [])).push(W);
        break;
      }
  return f && (y = /** @type {Derived} */
  h, Vn(y) && lp(y)), h.v;
}
function aw(h) {
  var c = Mr;
  Mr = /* @__PURE__ */ new Set();
  var f = Mr, p;
  try {
    if (Ji(h), c !== null)
      for (p of Mr)
        c.add(p);
  } finally {
    Mr = c;
  }
  return f;
}
function Ti(h) {
  var c = aw(() => Ji(h));
  for (var f of c)
    if (f.f & JO)
      for (
        const p of
        /** @type {Derived} */
        f.deps || []
      )
        p.f & De || Rs(p, p.v);
    else
      Rs(f, f.v);
}
function Ji(h) {
  const c = $t;
  try {
    return $t = null, h();
  } finally {
    $t = c;
  }
}
const lw = -7169;
function di(h, c) {
  h.f = h.f & lw | c;
}
function Zh(h, c = !1, f) {
  Et = {
    p: Et,
    c: null,
    e: null,
    m: !1,
    s: h,
    x: null,
    l: null
  }, Zs && !c && (Et.l = {
    s: null,
    u: null,
    r1: [],
    r2: ui(!1)
  });
}
function jh(h) {
  const c = Et;
  if (c !== null) {
    const $ = c.e;
    if ($ !== null) {
      var f = Tt, p = $t;
      c.e = null;
      try {
        for (var v = 0; v < $.length; v++) {
          var y = $[v];
          fi(y.effect), Hi(y.reaction), Er(y.fn);
        }
      } finally {
        fi(f), Hi(p);
      }
    }
    Et = c.p, c.m = !0;
  }
  return (
    /** @type {T} */
    {}
  );
}
function bp(h) {
  if (!(typeof h != "object" || !h || h instanceof EventTarget)) {
    if (dr in h)
      Sh(h);
    else if (!Array.isArray(h))
      for (let c in h) {
        const f = h[c];
        typeof f == "object" && f && dr in f && Sh(f);
      }
  }
}
function Sh(h, c = /* @__PURE__ */ new Set()) {
  if (typeof h == "object" && h !== null && // We don't want to traverse DOM elements
  !(h instanceof EventTarget) && !c.has(h)) {
    c.add(h), h instanceof Date && h.getTime();
    for (let p in h)
      try {
        Sh(h[p], c);
      } catch {
      }
    const f = Th(h);
    if (f !== Object.prototype && f !== Array.prototype && f !== Map.prototype && f !== Set.prototype && f !== Date.prototype) {
      const p = FO(f);
      for (let v in p) {
        const y = p[v].get;
        if (y)
          try {
            y.call(h);
          } catch {
          }
      }
    }
  }
}
const hw = ["touchstart", "touchmove"];
function cw(h) {
  return hw.includes(h);
}
let XO = !1;
function uw() {
  XO || (XO = !0, document.addEventListener(
    "reset",
    (h) => {
      Promise.resolve().then(() => {
        var c;
        if (!h.defaultPrevented)
          for (
            const f of
            /**@type {HTMLFormElement} */
            h.target.elements
          )
            (c = f.__on_r) == null || c.call(f);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
    { capture: !0 }
  ));
}
function wp(h) {
  var c = $t, f = Tt;
  Hi(null), fi(null);
  try {
    return h();
  } finally {
    Hi(c), fi(f);
  }
}
function xp(h, c, f, p = f) {
  h.addEventListener(c, () => wp(f));
  const v = h.__on_r;
  v ? h.__on_r = () => {
    v(), p(!0);
  } : h.__on_r = () => p(!0), uw();
}
const fw = /* @__PURE__ */ new Set(), qO = /* @__PURE__ */ new Set();
function dw(h, c, f, p) {
  function v(y) {
    if (p.capture || $s.call(c, y), !y.cancelBubble)
      return wp(() => f.call(this, y));
  }
  return h.startsWith("pointer") || h.startsWith("touch") || h === "wheel" ? Dh(() => {
    c.addEventListener(h, v, p);
  }) : c.addEventListener(h, v, p), v;
}
function bt(h, c, f, p, v) {
  var y = { capture: p, passive: v }, $ = dw(h, c, f, y);
  (c === document.body || c === window || c === document) && V1(() => {
    c.removeEventListener(h, $, y);
  });
}
function $s(h) {
  var Rt;
  var c = this, f = (
    /** @type {Node} */
    c.ownerDocument
  ), p = h.type, v = ((Rt = h.composedPath) == null ? void 0 : Rt.call(h)) || [], y = (
    /** @type {null | Element} */
    v[0] || h.target
  ), $ = 0, W = h.__root;
  if (W) {
    var S = v.indexOf(W);
    if (S !== -1 && (c === document || c === /** @type {any} */
    window)) {
      h.__root = c;
      return;
    }
    var x = v.indexOf(c);
    if (x === -1)
      return;
    S <= x && ($ = S);
  }
  if (y = /** @type {Element} */
  v[$] || h.target, y !== c) {
    c1(h, "currentTarget", {
      configurable: !0,
      get() {
        return y || f;
      }
    });
    var P = $t, T = Tt;
    Hi(null), fi(null);
    try {
      for (var X, q = []; y !== null; ) {
        var Z = y.assignedSlot || y.parentNode || /** @type {any} */
        y.host || null;
        try {
          var N = y["__" + p];
          if (N !== void 0 && !/** @type {any} */
          y.disabled)
            if (Ds(N)) {
              var [gt, ...wt] = N;
              gt.apply(y, [h, ...wt]);
            } else
              N.call(y, h);
        } catch (et) {
          X ? q.push(et) : X = et;
        }
        if (h.cancelBubble || Z === c || Z === null)
          break;
        y = Z;
      }
      if (X) {
        for (let et of q)
          queueMicrotask(() => {
            throw et;
          });
        throw X;
      }
    } finally {
      h.__root = c, delete h.currentTarget, Hi(P), fi(T);
    }
  }
}
function Sp(h) {
  var c = document.createElement("template");
  return c.innerHTML = h, c.content;
}
function ya(h, c) {
  var f = (
    /** @type {Effect} */
    Tt
  );
  f.nodes_start === null && (f.nodes_start = h, f.nodes_end = c);
}
// @__NO_SIDE_EFFECTS__
function qt(h, c) {
  var f = (c & M1) !== 0, p = (c & D1) !== 0, v, y = !h.startsWith("<!>");
  return () => {
    v === void 0 && (v = Sp(y ? h : "<!>" + h), f || (v = /** @type {Node} */
    /* @__PURE__ */ Cs(v)));
    var $ = (
      /** @type {TemplateNode} */
      p ? document.importNode(v, !0) : v.cloneNode(!0)
    );
    if (f) {
      var W = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Cs($)
      ), S = (
        /** @type {TemplateNode} */
        $.lastChild
      );
      ya(W, S);
    } else
      ya($, $);
    return $;
  };
}
function ua() {
  var h = document.createDocumentFragment(), c = document.createComment(""), f = Xh();
  return h.append(c, f), ya(c, f), h;
}
function St(h, c) {
  h !== null && h.before(
    /** @type {Node} */
    c
  );
}
function Be(h, c) {
  var f = c == null ? "" : typeof c == "object" ? c + "" : c;
  f !== (h.__t ?? (h.__t = h.nodeValue)) && (h.__t = f, h.nodeValue = f == null ? "" : f + "");
}
function Ow(h, c) {
  return pw(h, c);
}
const Xn = /* @__PURE__ */ new Map();
function pw(h, { target: c, anchor: f, props: p = {}, events: v, context: y, intro: $ = !0 }) {
  z1();
  var W = /* @__PURE__ */ new Set(), S = (T) => {
    for (var X = 0; X < T.length; X++) {
      var q = T[X];
      if (!W.has(q)) {
        W.add(q);
        var Z = cw(q);
        c.addEventListener(q, $s, { passive: Z });
        var N = Xn.get(q);
        N === void 0 ? (document.addEventListener(q, $s, { passive: Z }), Xn.set(q, 1)) : Xn.set(q, N + 1);
      }
    }
  };
  S($h(fw)), qO.add(S);
  var x = void 0, P = U1(() => {
    var T = f ?? c.appendChild(Xh());
    return jn(() => {
      if (y) {
        Zh({});
        var X = (
          /** @type {ComponentContext} */
          Et
        );
        X.c = y;
      }
      v && (p.$$events = v), x = h(T, p) || {}, y && jh();
    }), () => {
      var Z;
      for (var X of W) {
        c.removeEventListener(X, $s);
        var q = (
          /** @type {number} */
          Xn.get(X)
        );
        --q === 0 ? (document.removeEventListener(X, $s), Xn.delete(X)) : Xn.set(X, q);
      }
      qO.delete(S), T !== f && ((Z = T.parentNode) == null || Z.removeChild(T));
    };
  });
  return mw.set(x, P), x;
}
let mw = /* @__PURE__ */ new WeakMap();
function Ye(h, c, f = !1) {
  var p = h, v = null, y = null, $ = qe, W = f ? Rh : 0, S = !1;
  const x = (T, X = !0) => {
    S = !0, P(X, T);
  }, P = (T, X) => {
    $ !== ($ = T) && ($ ? (v ? ma(v) : X && (v = jn(() => X(p))), y && pa(y, () => {
      y = null;
    })) : (y ? ma(y) : X && (y = jn(() => X(p))), v && pa(v, () => {
      v = null;
    })));
  };
  xa(() => {
    S = !1, c(x), S || P(null, null);
  }, W);
}
function Ui(h, c) {
  return c;
}
function gw(h, c, f, p) {
  for (var v = [], y = c.length, $ = 0; $ < y; $++)
    Mh(c[$].e, v, !0);
  var W = y > 0 && v.length === 0 && f !== null;
  if (W) {
    var S = (
      /** @type {Element} */
      /** @type {Element} */
      f.parentNode
    );
    N1(S), S.append(
      /** @type {Element} */
      f
    ), p.clear(), qr(h, c[0].prev, c[y - 1].next);
  }
  Op(v, () => {
    for (var x = 0; x < y; x++) {
      var P = c[x];
      W || (p.delete(P.k), qr(h, P.prev, P.next)), Or(P.e, !W);
    }
  });
}
function Bi(h, c, f, p, v, y = null) {
  var $ = h, W = { flags: c, items: /* @__PURE__ */ new Map(), first: null }, S = (c & ep) !== 0;
  if (S) {
    var x = (
      /** @type {Element} */
      h
    );
    $ = x.appendChild(Xh());
  }
  var P = null, T = !1, X = /* @__PURE__ */ sp(() => {
    var q = f();
    return Ds(q) ? q : q == null ? [] : $h(q);
  });
  xa(() => {
    var q = g(X), Z = q.length;
    if (!(T && Z === 0)) {
      T = Z === 0;
      {
        var N = (
          /** @type {Effect} */
          $t
        );
        vw(
          q,
          W,
          $,
          v,
          c,
          (N.f & Yi) !== 0,
          p
        );
      }
      y !== null && (Z === 0 ? P ? ma(P) : P = jn(() => y($)) : P !== null && pa(P, () => {
        P = null;
      })), g(X);
    }
  });
}
function vw(h, c, f, p, v, y, $, W) {
  var Nr, Ri, me, _;
  var S = (v & R1) !== 0, x = (v & (_h | Ah)) !== 0, P = h.length, T = c.items, X = c.first, q = X, Z, N = null, gt, wt = [], Rt = [], et, vt, lt, st;
  if (S)
    for (st = 0; st < P; st += 1)
      et = h[st], vt = $(et, st), lt = T.get(vt), lt !== void 0 && ((Nr = lt.a) == null || Nr.measure(), (gt ?? (gt = /* @__PURE__ */ new Set())).add(lt));
  for (st = 0; st < P; st += 1) {
    if (et = h[st], vt = $(et, st), lt = T.get(vt), lt === void 0) {
      var Oi = q ? (
        /** @type {TemplateNode} */
        q.e.nodes_start
      ) : f;
      N = yw(
        Oi,
        c,
        N,
        N === null ? c.first : N.next,
        et,
        vt,
        st,
        p,
        v
      ), T.set(vt, N), wt = [], Rt = [], q = N.next;
      continue;
    }
    if (x && Qw(lt, et, st, v), lt.e.f & Yi && (ma(lt.e), S && ((Ri = lt.a) == null || Ri.unfix(), (gt ?? (gt = /* @__PURE__ */ new Set())).delete(lt))), lt !== q) {
      if (Z !== void 0 && Z.has(lt)) {
        if (wt.length < Rt.length) {
          var nt = Rt[0], Pt;
          N = nt.prev;
          var xt = wt[0], At = wt[wt.length - 1];
          for (Pt = 0; Pt < wt.length; Pt += 1)
            MO(wt[Pt], nt, f);
          for (Pt = 0; Pt < Rt.length; Pt += 1)
            Z.delete(Rt[Pt]);
          qr(c, xt.prev, At.next), qr(c, N, xt), qr(c, At, nt), q = nt, N = At, st -= 1, wt = [], Rt = [];
        } else
          Z.delete(lt), MO(lt, q, f), qr(c, lt.prev, lt.next), qr(c, lt, N === null ? c.first : N.next), qr(c, N, lt), N = lt;
        continue;
      }
      for (wt = [], Rt = []; q !== null && q.k !== vt; )
        (y || !(q.e.f & Yi)) && (Z ?? (Z = /* @__PURE__ */ new Set())).add(q), Rt.push(q), q = q.next;
      if (q === null)
        continue;
      lt = q;
    }
    wt.push(lt), N = lt, q = lt.next;
  }
  if (q !== null || Z !== void 0) {
    for (var pe = Z === void 0 ? [] : $h(Z); q !== null; )
      (y || !(q.e.f & Yi)) && pe.push(q), q = q.next;
    var Pe = pe.length;
    if (Pe > 0) {
      var zr = v & ep && P === 0 ? f : null;
      if (S) {
        for (st = 0; st < Pe; st += 1)
          (me = pe[st].a) == null || me.measure();
        for (st = 0; st < Pe; st += 1)
          (_ = pe[st].a) == null || _.fix();
      }
      gw(c, pe, zr, T);
    }
  }
  S && Dh(() => {
    var Ir;
    if (gt !== void 0)
      for (lt of gt)
        (Ir = lt.a) == null || Ir.apply();
  }), Tt.first = c.first && c.first.e, Tt.last = N && N.e;
}
function Qw(h, c, f, p) {
  p & _h && Rs(h.v, c), p & Ah ? Rs(
    /** @type {Value<number>} */
    h.i,
    f
  ) : h.i = f;
}
function yw(h, c, f, p, v, y, $, W, S, x) {
  var P = (S & _h) !== 0, T = (S & C1) === 0, X = P ? T ? /* @__PURE__ */ Wh(v) : ui(v) : v, q = S & Ah ? ui($) : $, Z = {
    i: q,
    v: X,
    k: y,
    a: null,
    // @ts-expect-error
    e: null,
    prev: f,
    next: p
  };
  try {
    return Z.e = jn(() => W(h, X, q), Z1), Z.e.prev = f && f.e, Z.e.next = p && p.e, f === null ? c.first = Z : (f.next = Z, f.e.next = Z.e), p !== null && (p.prev = Z, p.e.prev = Z.e), Z;
  } finally {
  }
}
function MO(h, c, f) {
  for (var p = h.next ? (
    /** @type {TemplateNode} */
    h.next.e.nodes_start
  ) : f, v = c ? (
    /** @type {TemplateNode} */
    c.e.nodes_start
  ) : f, y = (
    /** @type {TemplateNode} */
    h.e.nodes_start
  ); y !== p; ) {
    var $ = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ wa(y)
    );
    v.before(y), y = $;
  }
}
function qr(h, c, f) {
  c === null ? h.first = f : (c.next = f, c.e.next = f && f.e), f !== null && (f.prev = c, f.e.prev = c && c.e);
}
function oa(h, c, f, p, v) {
  var y = h, $ = "", W;
  xa(() => {
    $ !== ($ = c() ?? "") && (W !== void 0 && (Or(W), W = void 0), $ !== "" && (W = jn(() => {
      var S = $ + "", x = Sp(S);
      ya(
        /** @type {TemplateNode} */
        /* @__PURE__ */ Cs(x),
        /** @type {TemplateNode} */
        x.lastChild
      ), y.before(x);
    })));
  });
}
function DO(h, c, f) {
  Er(() => {
    var p = Ji(() => c(h, f == null ? void 0 : f()) || {});
    if (p != null && p.destroy)
      return () => (
        /** @type {Function} */
        p.destroy()
      );
  });
}
function bw(h, c) {
  var f = h.__attributes ?? (h.__attributes = {});
  f.value === (f.value = // treat null and undefined the same for the initial value
  c ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when its `0`
  h.value === c && (c !== 0 || h.nodeName !== "PROGRESS") || (h.value = c);
}
function Dn(h, c, f, p) {
  var v = h.__attributes ?? (h.__attributes = {});
  v[c] !== (v[c] = f) && (c === "style" && "__styles" in h && (h.__styles = {}), c === "loading" && (h[g1] = f), f == null ? h.removeAttribute(c) : typeof f != "string" && kp(h).includes(c) ? h[c] = f : h.setAttribute(c, f));
}
function hi(h, c, f) {
  var p = $t, v = Tt;
  Hi(null), fi(null);
  try {
    // Don't compute setters for custom elements while they aren't registered yet,
    // because during their upgrade/instantiation they might add more setters.
    // Instead, fall back to a simple "an object, then set as property" heuristic.
    (kh.has(h.nodeName) || // customElements may not be available in browser extension contexts
    !customElements || customElements.get(h.tagName.toLowerCase()) ? kp(h).includes(c) : f && typeof f == "object") ? h[c] = f : Dn(h, c, f == null ? f : String(f));
  } finally {
    Hi(p), fi(v);
  }
}
var kh = /* @__PURE__ */ new Map();
function kp(h) {
  var c = kh.get(h.nodeName);
  if (c) return c;
  kh.set(h.nodeName, c = []);
  for (var f, p = h, v = Element.prototype; v !== p; ) {
    f = FO(p);
    for (var y in f)
      f[y].set && c.push(y);
    p = Th(p);
  }
  return c;
}
function aa(h, c, f = c) {
  var p = js();
  xp(h, "input", (v) => {
    var y = v ? h.defaultValue : h.value;
    if (y = gh(h) ? vh(y) : y, f(y), p && y !== (y = c())) {
      var $ = h.selectionStart, W = h.selectionEnd;
      h.value = y ?? "", W !== null && (h.selectionStart = $, h.selectionEnd = Math.min(W, h.value.length));
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  Ji(c) == null && h.value && f(gh(h) ? vh(h.value) : h.value), Gn(() => {
    var v = c();
    gh(h) && v === vh(h.value) || h.type === "date" && !v && !h.value || v !== h.value && (h.value = v ?? "");
  });
}
function gh(h) {
  var c = h.type;
  return c === "number" || c === "range";
}
function vh(h) {
  return h === "" ? null : +h;
}
function $p(h, c, f) {
  if (h.multiple)
    return xw(h, c);
  for (var p of h.options) {
    var v = Ps(p);
    if (j1(v, c)) {
      p.selected = !0;
      return;
    }
  }
  (!f || c !== void 0) && (h.selectedIndex = -1);
}
function ww(h, c) {
  Er(() => {
    var f = new MutationObserver(() => {
      var p = h.__value;
      $p(h, p);
    });
    return f.observe(h, {
      // Listen to option element changes
      childList: !0,
      subtree: !0,
      // because of <optgroup>
      // Listen to option element value attribute changes
      // (doesn't get notified of select value changes,
      // because that property is not reflected as an attribute)
      attributes: !0,
      attributeFilter: ["value"]
    }), () => {
      f.disconnect();
    };
  });
}
function Wr(h, c, f = c) {
  var p = !0;
  xp(h, "change", (v) => {
    var y = v ? "[selected]" : ":checked", $;
    if (h.multiple)
      $ = [].map.call(h.querySelectorAll(y), Ps);
    else {
      var W = h.querySelector(y) ?? // will fall back to first non-disabled option if no option is selected
      h.querySelector("option:not([disabled])");
      $ = W && Ps(W);
    }
    f($);
  }), Er(() => {
    var v = c();
    if ($p(h, v, p), p && v === void 0) {
      var y = h.querySelector(":checked");
      y !== null && (v = Ps(y), f(v));
    }
    h.__value = v, p = !1;
  }), ww(h);
}
function xw(h, c) {
  for (var f of h.options)
    f.selected = ~c.indexOf(Ps(f));
}
function Ps(h) {
  return "__value" in h ? h.__value : h.value;
}
function EO(h, c) {
  return h === c || (h == null ? void 0 : h[dr]) === c;
}
function Sw(h = {}, c, f, p) {
  return Er(() => {
    var v, y;
    return Gn(() => {
      v = y, y = [], Ji(() => {
        h !== f(...y) && (c(h, ...y), v && EO(f(...v), h) && c(null, ...v));
      });
    }), () => {
      Dh(() => {
        y && EO(f(...y), h) && c(null, ...y);
      });
    };
  }), h;
}
function kw(h, c, f, p = f) {
  c.addEventListener("input", () => {
    p(c[h]);
  }), Gn(() => {
    var v = f();
    if (c[h] !== v)
      if (v == null) {
        var y = c[h];
        p(y);
      } else
        c[h] = v + "";
  });
}
function Tp(h) {
  return function(...c) {
    var f = (
      /** @type {Event} */
      c[0]
    );
    return f.preventDefault(), h == null ? void 0 : h.apply(this, c);
  };
}
function Pp(h = !1) {
  const c = (
    /** @type {ComponentContextLegacy} */
    Et
  ), f = c.l.u;
  if (!f) return;
  let p = () => bp(c.s);
  if (h) {
    let v = 0, y = (
      /** @type {Record<string, any>} */
      {}
    );
    const $ = /* @__PURE__ */ Oa(() => {
      let W = !1;
      const S = c.s;
      for (const x in S)
        S[x] !== y[x] && (y[x] = S[x], W = !0);
      return W && v++, v;
    });
    p = () => g($);
  }
  f.b.length && L1(() => {
    ZO(c, p), yh(f.b);
  }), _O(() => {
    const v = Ji(() => f.m.map(d1));
    return () => {
      for (const y of v)
        typeof y == "function" && y();
    };
  }), f.a.length && _O(() => {
    ZO(c, p), yh(f.a);
  });
}
function ZO(h, c) {
  if (h.l.s)
    for (const f of h.l.s) g(f);
  c();
}
function $w(h, c) {
  var y;
  var f = (
    /** @type {Record<string, Function[] | Function>} */
    (y = h.$$events) == null ? void 0 : y[c.type]
  ), p = Ds(f) ? f.slice() : f == null ? [] : [f];
  for (var v of p)
    v.call(this, c);
}
let la = !1;
function Tw(h) {
  var c = la;
  try {
    return la = !1, [h(), la];
  } finally {
    la = c;
  }
}
function jO(h) {
  for (var c = Tt, f = Tt; c !== null && !(c.f & (Ki | zn)); )
    c = c.parent;
  try {
    return fi(c), h();
  } finally {
    fi(f);
  }
}
function Dr(h, c, f, p) {
  var Oi;
  var v = (f & _1) !== 0, y = !Zs || (f & A1) !== 0, $ = (f & X1) !== 0, W = (f & q1) !== 0, S = !1, x;
  $ ? [x, S] = Tw(() => (
    /** @type {V} */
    h[c]
  )) : x = /** @type {V} */
  h[c];
  var P = dr in h || m1 in h, T = $ && (((Oi = En(h, c)) == null ? void 0 : Oi.set) ?? (P && c in h && ((nt) => h[c] = nt))) || void 0, X = (
    /** @type {V} */
    p
  ), q = !0, Z = !1, N = () => (Z = !0, q && (q = !1, W ? X = Ji(
    /** @type {() => V} */
    p
  ) : X = /** @type {V} */
  p), X);
  x === void 0 && p !== void 0 && (T && y && x1(), x = N(), T && T(x));
  var gt;
  if (y)
    gt = () => {
      var nt = (
        /** @type {V} */
        h[c]
      );
      return nt === void 0 ? N() : (q = !0, Z = !1, nt);
    };
  else {
    var wt = jO(
      () => (v ? Oa : sp)(() => (
        /** @type {V} */
        h[c]
      ))
    );
    wt.f |= JO, gt = () => {
      var nt = g(wt);
      return nt !== void 0 && (X = /** @type {V} */
      void 0), nt === void 0 ? X : nt;
    };
  }
  if (!(f & W1))
    return gt;
  if (T) {
    var Rt = h.$$legacy;
    return function(nt, Pt) {
      return arguments.length > 0 ? ((!y || !Pt || Rt || S) && T(Pt ? gt() : nt), nt) : gt();
    };
  }
  var et = !1, vt = !1, lt = /* @__PURE__ */ Wh(x), st = jO(
    () => /* @__PURE__ */ Oa(() => {
      var nt = gt(), Pt = g(lt);
      return et ? (et = !1, vt = !0, Pt) : (vt = !1, lt.v = nt);
    })
  );
  return v || (st.equals = Ch), function(nt, Pt) {
    if (Mr !== null && (et = vt, gt(), g(lt)), arguments.length > 0) {
      const xt = Pt ? g(st) : y && $ ? Mn(nt) : nt;
      return st.equals(xt) || (et = !0, E(lt, xt), Z && X !== void 0 && (X = xt), Ji(() => g(st))), nt;
    }
    return g(st);
  };
}
function Pw(h, c, { bubbles: f = !1, cancelable: p = !1 } = {}) {
  return new CustomEvent(h, { detail: c, bubbles: f, cancelable: p });
}
function Rw() {
  const h = Et;
  return h === null && H1(), (c, f, p) => {
    var y;
    const v = (
      /** @type {Record<string, Function | Function[]>} */
      (y = h.s.$$events) == null ? void 0 : y[
        /** @type {any} */
        c
      ]
    );
    if (v) {
      const $ = Ds(v) ? v.slice() : [v], W = Pw(
        /** @type {string} */
        c,
        f,
        p
      );
      for (const S of $)
        S.call(h.x, W);
      return !W.defaultPrevented;
    }
    return !0;
  };
}
const Cw = "5";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(Cw);
P1();
function _w(h, c, f) {
  let p;
  return function() {
    const v = this, y = arguments, $ = function() {
      p = null, h.apply(v, y);
    };
    clearTimeout(p), p = setTimeout($, c);
  };
}
const Rp = 6048e5, Aw = 864e5, zO = Symbol.for("constructDateFrom");
function Zr(h, c) {
  return typeof h == "function" ? h(c) : h && typeof h == "object" && zO in h ? h[zO](c) : h instanceof Date ? new h.constructor(c) : new Date(c);
}
function Pi(h, c) {
  return Zr(c || h, h);
}
let Ww = {};
function Ta() {
  return Ww;
}
function As(h, c) {
  var W, S, x, P;
  const f = Ta(), p = (c == null ? void 0 : c.weekStartsOn) ?? ((S = (W = c == null ? void 0 : c.locale) == null ? void 0 : W.options) == null ? void 0 : S.weekStartsOn) ?? f.weekStartsOn ?? ((P = (x = f.locale) == null ? void 0 : x.options) == null ? void 0 : P.weekStartsOn) ?? 0, v = Pi(h, c == null ? void 0 : c.in), y = v.getDay(), $ = (y < p ? 7 : 0) + y - p;
  return v.setDate(v.getDate() - $), v.setHours(0, 0, 0, 0), v;
}
function ba(h, c) {
  return As(h, { ...c, weekStartsOn: 1 });
}
function Cp(h, c) {
  const f = Pi(h, c == null ? void 0 : c.in), p = f.getFullYear(), v = Zr(f, 0);
  v.setFullYear(p + 1, 0, 4), v.setHours(0, 0, 0, 0);
  const y = ba(v), $ = Zr(f, 0);
  $.setFullYear(p, 0, 4), $.setHours(0, 0, 0, 0);
  const W = ba($);
  return f.getTime() >= y.getTime() ? p + 1 : f.getTime() >= W.getTime() ? p : p - 1;
}
function NO(h) {
  const c = Pi(h), f = new Date(
    Date.UTC(
      c.getFullYear(),
      c.getMonth(),
      c.getDate(),
      c.getHours(),
      c.getMinutes(),
      c.getSeconds(),
      c.getMilliseconds()
    )
  );
  return f.setUTCFullYear(c.getFullYear()), +h - +f;
}
function Xw(h, ...c) {
  const f = Zr.bind(
    null,
    c.find((p) => typeof p == "object")
  );
  return c.map(f);
}
function IO(h, c) {
  const f = Pi(h, c == null ? void 0 : c.in);
  return f.setHours(0, 0, 0, 0), f;
}
function qw(h, c, f) {
  const [p, v] = Xw(
    f == null ? void 0 : f.in,
    h,
    c
  ), y = IO(p), $ = IO(v), W = +y - NO(y), S = +$ - NO($);
  return Math.round((W - S) / Aw);
}
function Mw(h, c) {
  const f = Cp(h, c), p = Zr(h, 0);
  return p.setFullYear(f, 0, 4), p.setHours(0, 0, 0, 0), ba(p);
}
function Dw(h) {
  return h instanceof Date || typeof h == "object" && Object.prototype.toString.call(h) === "[object Date]";
}
function Ew(h) {
  return !(!Dw(h) && typeof h != "number" || isNaN(+Pi(h)));
}
function Zw(h, c) {
  const f = Pi(h, c == null ? void 0 : c.in);
  return f.setFullYear(f.getFullYear(), 0, 1), f.setHours(0, 0, 0, 0), f;
}
const jw = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, zw = (h, c, f) => {
  let p;
  const v = jw[h];
  return typeof v == "string" ? p = v : c === 1 ? p = v.one : p = v.other.replace("{{count}}", c.toString()), f != null && f.addSuffix ? f.comparison && f.comparison > 0 ? "in " + p : p + " ago" : p;
};
function Qh(h) {
  return (c = {}) => {
    const f = c.width ? String(c.width) : h.defaultWidth;
    return h.formats[f] || h.formats[h.defaultWidth];
  };
}
const Nw = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Iw = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Gw = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Vw = {
  date: Qh({
    formats: Nw,
    defaultWidth: "full"
  }),
  time: Qh({
    formats: Iw,
    defaultWidth: "full"
  }),
  dateTime: Qh({
    formats: Gw,
    defaultWidth: "full"
  })
}, Lw = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Uw = (h, c, f, p) => Lw[h];
function Ss(h) {
  return (c, f) => {
    const p = f != null && f.context ? String(f.context) : "standalone";
    let v;
    if (p === "formatting" && h.formattingValues) {
      const $ = h.defaultFormattingWidth || h.defaultWidth, W = f != null && f.width ? String(f.width) : $;
      v = h.formattingValues[W] || h.formattingValues[$];
    } else {
      const $ = h.defaultWidth, W = f != null && f.width ? String(f.width) : h.defaultWidth;
      v = h.values[W] || h.values[$];
    }
    const y = h.argumentCallback ? h.argumentCallback(c) : c;
    return v[y];
  };
}
const Bw = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Yw = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Fw = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, Hw = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, Jw = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, Kw = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, tx = (h, c) => {
  const f = Number(h), p = f % 100;
  if (p > 20 || p < 10)
    switch (p % 10) {
      case 1:
        return f + "st";
      case 2:
        return f + "nd";
      case 3:
        return f + "rd";
    }
  return f + "th";
}, ex = {
  ordinalNumber: tx,
  era: Ss({
    values: Bw,
    defaultWidth: "wide"
  }),
  quarter: Ss({
    values: Yw,
    defaultWidth: "wide",
    argumentCallback: (h) => h - 1
  }),
  month: Ss({
    values: Fw,
    defaultWidth: "wide"
  }),
  day: Ss({
    values: Hw,
    defaultWidth: "wide"
  }),
  dayPeriod: Ss({
    values: Jw,
    defaultWidth: "wide",
    formattingValues: Kw,
    defaultFormattingWidth: "wide"
  })
};
function ks(h) {
  return (c, f = {}) => {
    const p = f.width, v = p && h.matchPatterns[p] || h.matchPatterns[h.defaultMatchWidth], y = c.match(v);
    if (!y)
      return null;
    const $ = y[0], W = p && h.parsePatterns[p] || h.parsePatterns[h.defaultParseWidth], S = Array.isArray(W) ? rx(W, (T) => T.test($)) : (
      // [TODO] -- I challenge you to fix the type
      ix(W, (T) => T.test($))
    );
    let x;
    x = h.valueCallback ? h.valueCallback(S) : S, x = f.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      f.valueCallback(x)
    ) : x;
    const P = c.slice($.length);
    return { value: x, rest: P };
  };
}
function ix(h, c) {
  for (const f in h)
    if (Object.prototype.hasOwnProperty.call(h, f) && c(h[f]))
      return f;
}
function rx(h, c) {
  for (let f = 0; f < h.length; f++)
    if (c(h[f]))
      return f;
}
function nx(h) {
  return (c, f = {}) => {
    const p = c.match(h.matchPattern);
    if (!p) return null;
    const v = p[0], y = c.match(h.parsePattern);
    if (!y) return null;
    let $ = h.valueCallback ? h.valueCallback(y[0]) : y[0];
    $ = f.valueCallback ? f.valueCallback($) : $;
    const W = c.slice(v.length);
    return { value: $, rest: W };
  };
}
const sx = /^(\d+)(th|st|nd|rd)?/i, ox = /\d+/i, ax = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, lx = {
  any: [/^b/i, /^(a|c)/i]
}, hx = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, cx = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, ux = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, fx = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, dx = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Ox = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, px = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, mx = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, gx = {
  ordinalNumber: nx({
    matchPattern: sx,
    parsePattern: ox,
    valueCallback: (h) => parseInt(h, 10)
  }),
  era: ks({
    matchPatterns: ax,
    defaultMatchWidth: "wide",
    parsePatterns: lx,
    defaultParseWidth: "any"
  }),
  quarter: ks({
    matchPatterns: hx,
    defaultMatchWidth: "wide",
    parsePatterns: cx,
    defaultParseWidth: "any",
    valueCallback: (h) => h + 1
  }),
  month: ks({
    matchPatterns: ux,
    defaultMatchWidth: "wide",
    parsePatterns: fx,
    defaultParseWidth: "any"
  }),
  day: ks({
    matchPatterns: dx,
    defaultMatchWidth: "wide",
    parsePatterns: Ox,
    defaultParseWidth: "any"
  }),
  dayPeriod: ks({
    matchPatterns: px,
    defaultMatchWidth: "any",
    parsePatterns: mx,
    defaultParseWidth: "any"
  })
}, vx = {
  code: "en-US",
  formatDistance: zw,
  formatLong: Vw,
  formatRelative: Uw,
  localize: ex,
  match: gx,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Qx(h, c) {
  const f = Pi(h, c == null ? void 0 : c.in);
  return qw(f, Zw(f)) + 1;
}
function yx(h, c) {
  const f = Pi(h, c == null ? void 0 : c.in), p = +ba(f) - +Mw(f);
  return Math.round(p / Rp) + 1;
}
function _p(h, c) {
  var P, T, X, q;
  const f = Pi(h, c == null ? void 0 : c.in), p = f.getFullYear(), v = Ta(), y = (c == null ? void 0 : c.firstWeekContainsDate) ?? ((T = (P = c == null ? void 0 : c.locale) == null ? void 0 : P.options) == null ? void 0 : T.firstWeekContainsDate) ?? v.firstWeekContainsDate ?? ((q = (X = v.locale) == null ? void 0 : X.options) == null ? void 0 : q.firstWeekContainsDate) ?? 1, $ = Zr((c == null ? void 0 : c.in) || h, 0);
  $.setFullYear(p + 1, 0, y), $.setHours(0, 0, 0, 0);
  const W = As($, c), S = Zr((c == null ? void 0 : c.in) || h, 0);
  S.setFullYear(p, 0, y), S.setHours(0, 0, 0, 0);
  const x = As(S, c);
  return +f >= +W ? p + 1 : +f >= +x ? p : p - 1;
}
function bx(h, c) {
  var W, S, x, P;
  const f = Ta(), p = (c == null ? void 0 : c.firstWeekContainsDate) ?? ((S = (W = c == null ? void 0 : c.locale) == null ? void 0 : W.options) == null ? void 0 : S.firstWeekContainsDate) ?? f.firstWeekContainsDate ?? ((P = (x = f.locale) == null ? void 0 : x.options) == null ? void 0 : P.firstWeekContainsDate) ?? 1, v = _p(h, c), y = Zr((c == null ? void 0 : c.in) || h, 0);
  return y.setFullYear(v, 0, p), y.setHours(0, 0, 0, 0), As(y, c);
}
function wx(h, c) {
  const f = Pi(h, c == null ? void 0 : c.in), p = +As(f, c) - +bx(f, c);
  return Math.round(p / Rp) + 1;
}
function kt(h, c) {
  const f = h < 0 ? "-" : "", p = Math.abs(h).toString().padStart(c, "0");
  return f + p;
}
const Xr = {
  // Year
  y(h, c) {
    const f = h.getFullYear(), p = f > 0 ? f : 1 - f;
    return kt(c === "yy" ? p % 100 : p, c.length);
  },
  // Month
  M(h, c) {
    const f = h.getMonth();
    return c === "M" ? String(f + 1) : kt(f + 1, 2);
  },
  // Day of the month
  d(h, c) {
    return kt(h.getDate(), c.length);
  },
  // AM or PM
  a(h, c) {
    const f = h.getHours() / 12 >= 1 ? "pm" : "am";
    switch (c) {
      case "a":
      case "aa":
        return f.toUpperCase();
      case "aaa":
        return f;
      case "aaaaa":
        return f[0];
      case "aaaa":
      default:
        return f === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(h, c) {
    return kt(h.getHours() % 12 || 12, c.length);
  },
  // Hour [0-23]
  H(h, c) {
    return kt(h.getHours(), c.length);
  },
  // Minute
  m(h, c) {
    return kt(h.getMinutes(), c.length);
  },
  // Second
  s(h, c) {
    return kt(h.getSeconds(), c.length);
  },
  // Fraction of second
  S(h, c) {
    const f = c.length, p = h.getMilliseconds(), v = Math.trunc(
      p * Math.pow(10, f - 3)
    );
    return kt(v, c.length);
  }
}, qn = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, GO = {
  // Era
  G: function(h, c, f) {
    const p = h.getFullYear() > 0 ? 1 : 0;
    switch (c) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return f.era(p, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return f.era(p, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return f.era(p, { width: "wide" });
    }
  },
  // Year
  y: function(h, c, f) {
    if (c === "yo") {
      const p = h.getFullYear(), v = p > 0 ? p : 1 - p;
      return f.ordinalNumber(v, { unit: "year" });
    }
    return Xr.y(h, c);
  },
  // Local week-numbering year
  Y: function(h, c, f, p) {
    const v = _p(h, p), y = v > 0 ? v : 1 - v;
    if (c === "YY") {
      const $ = y % 100;
      return kt($, 2);
    }
    return c === "Yo" ? f.ordinalNumber(y, { unit: "year" }) : kt(y, c.length);
  },
  // ISO week-numbering year
  R: function(h, c) {
    const f = Cp(h);
    return kt(f, c.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(h, c) {
    const f = h.getFullYear();
    return kt(f, c.length);
  },
  // Quarter
  Q: function(h, c, f) {
    const p = Math.ceil((h.getMonth() + 1) / 3);
    switch (c) {
      // 1, 2, 3, 4
      case "Q":
        return String(p);
      // 01, 02, 03, 04
      case "QQ":
        return kt(p, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return f.ordinalNumber(p, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return f.quarter(p, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return f.quarter(p, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return f.quarter(p, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(h, c, f) {
    const p = Math.ceil((h.getMonth() + 1) / 3);
    switch (c) {
      // 1, 2, 3, 4
      case "q":
        return String(p);
      // 01, 02, 03, 04
      case "qq":
        return kt(p, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return f.ordinalNumber(p, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return f.quarter(p, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return f.quarter(p, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return f.quarter(p, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(h, c, f) {
    const p = h.getMonth();
    switch (c) {
      case "M":
      case "MM":
        return Xr.M(h, c);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return f.ordinalNumber(p + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return f.month(p, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return f.month(p, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return f.month(p, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(h, c, f) {
    const p = h.getMonth();
    switch (c) {
      // 1, 2, ..., 12
      case "L":
        return String(p + 1);
      // 01, 02, ..., 12
      case "LL":
        return kt(p + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return f.ordinalNumber(p + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return f.month(p, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return f.month(p, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return f.month(p, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(h, c, f, p) {
    const v = wx(h, p);
    return c === "wo" ? f.ordinalNumber(v, { unit: "week" }) : kt(v, c.length);
  },
  // ISO week of year
  I: function(h, c, f) {
    const p = yx(h);
    return c === "Io" ? f.ordinalNumber(p, { unit: "week" }) : kt(p, c.length);
  },
  // Day of the month
  d: function(h, c, f) {
    return c === "do" ? f.ordinalNumber(h.getDate(), { unit: "date" }) : Xr.d(h, c);
  },
  // Day of year
  D: function(h, c, f) {
    const p = Qx(h);
    return c === "Do" ? f.ordinalNumber(p, { unit: "dayOfYear" }) : kt(p, c.length);
  },
  // Day of week
  E: function(h, c, f) {
    const p = h.getDay();
    switch (c) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return f.day(p, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return f.day(p, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return f.day(p, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return f.day(p, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(h, c, f, p) {
    const v = h.getDay(), y = (v - p.weekStartsOn + 8) % 7 || 7;
    switch (c) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(y);
      // Padded numerical value
      case "ee":
        return kt(y, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return f.ordinalNumber(y, { unit: "day" });
      case "eee":
        return f.day(v, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return f.day(v, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return f.day(v, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return f.day(v, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(h, c, f, p) {
    const v = h.getDay(), y = (v - p.weekStartsOn + 8) % 7 || 7;
    switch (c) {
      // Numerical value (same as in `e`)
      case "c":
        return String(y);
      // Padded numerical value
      case "cc":
        return kt(y, c.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return f.ordinalNumber(y, { unit: "day" });
      case "ccc":
        return f.day(v, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return f.day(v, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return f.day(v, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return f.day(v, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(h, c, f) {
    const p = h.getDay(), v = p === 0 ? 7 : p;
    switch (c) {
      // 2
      case "i":
        return String(v);
      // 02
      case "ii":
        return kt(v, c.length);
      // 2nd
      case "io":
        return f.ordinalNumber(v, { unit: "day" });
      // Tue
      case "iii":
        return f.day(p, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return f.day(p, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return f.day(p, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return f.day(p, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(h, c, f) {
    const v = h.getHours() / 12 >= 1 ? "pm" : "am";
    switch (c) {
      case "a":
      case "aa":
        return f.dayPeriod(v, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return f.dayPeriod(v, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return f.dayPeriod(v, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return f.dayPeriod(v, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(h, c, f) {
    const p = h.getHours();
    let v;
    switch (p === 12 ? v = qn.noon : p === 0 ? v = qn.midnight : v = p / 12 >= 1 ? "pm" : "am", c) {
      case "b":
      case "bb":
        return f.dayPeriod(v, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return f.dayPeriod(v, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return f.dayPeriod(v, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return f.dayPeriod(v, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(h, c, f) {
    const p = h.getHours();
    let v;
    switch (p >= 17 ? v = qn.evening : p >= 12 ? v = qn.afternoon : p >= 4 ? v = qn.morning : v = qn.night, c) {
      case "B":
      case "BB":
      case "BBB":
        return f.dayPeriod(v, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return f.dayPeriod(v, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return f.dayPeriod(v, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(h, c, f) {
    if (c === "ho") {
      let p = h.getHours() % 12;
      return p === 0 && (p = 12), f.ordinalNumber(p, { unit: "hour" });
    }
    return Xr.h(h, c);
  },
  // Hour [0-23]
  H: function(h, c, f) {
    return c === "Ho" ? f.ordinalNumber(h.getHours(), { unit: "hour" }) : Xr.H(h, c);
  },
  // Hour [0-11]
  K: function(h, c, f) {
    const p = h.getHours() % 12;
    return c === "Ko" ? f.ordinalNumber(p, { unit: "hour" }) : kt(p, c.length);
  },
  // Hour [1-24]
  k: function(h, c, f) {
    let p = h.getHours();
    return p === 0 && (p = 24), c === "ko" ? f.ordinalNumber(p, { unit: "hour" }) : kt(p, c.length);
  },
  // Minute
  m: function(h, c, f) {
    return c === "mo" ? f.ordinalNumber(h.getMinutes(), { unit: "minute" }) : Xr.m(h, c);
  },
  // Second
  s: function(h, c, f) {
    return c === "so" ? f.ordinalNumber(h.getSeconds(), { unit: "second" }) : Xr.s(h, c);
  },
  // Fraction of second
  S: function(h, c) {
    return Xr.S(h, c);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(h, c, f) {
    const p = h.getTimezoneOffset();
    if (p === 0)
      return "Z";
    switch (c) {
      // Hours and optional minutes
      case "X":
        return LO(p);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return ln(p);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return ln(p, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(h, c, f) {
    const p = h.getTimezoneOffset();
    switch (c) {
      // Hours and optional minutes
      case "x":
        return LO(p);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return ln(p);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return ln(p, ":");
    }
  },
  // Timezone (GMT)
  O: function(h, c, f) {
    const p = h.getTimezoneOffset();
    switch (c) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + VO(p, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + ln(p, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(h, c, f) {
    const p = h.getTimezoneOffset();
    switch (c) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + VO(p, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + ln(p, ":");
    }
  },
  // Seconds timestamp
  t: function(h, c, f) {
    const p = Math.trunc(+h / 1e3);
    return kt(p, c.length);
  },
  // Milliseconds timestamp
  T: function(h, c, f) {
    return kt(+h, c.length);
  }
};
function VO(h, c = "") {
  const f = h > 0 ? "-" : "+", p = Math.abs(h), v = Math.trunc(p / 60), y = p % 60;
  return y === 0 ? f + String(v) : f + String(v) + c + kt(y, 2);
}
function LO(h, c) {
  return h % 60 === 0 ? (h > 0 ? "-" : "+") + kt(Math.abs(h) / 60, 2) : ln(h, c);
}
function ln(h, c = "") {
  const f = h > 0 ? "-" : "+", p = Math.abs(h), v = kt(Math.trunc(p / 60), 2), y = kt(p % 60, 2);
  return f + v + c + y;
}
const UO = (h, c) => {
  switch (h) {
    case "P":
      return c.date({ width: "short" });
    case "PP":
      return c.date({ width: "medium" });
    case "PPP":
      return c.date({ width: "long" });
    case "PPPP":
    default:
      return c.date({ width: "full" });
  }
}, Ap = (h, c) => {
  switch (h) {
    case "p":
      return c.time({ width: "short" });
    case "pp":
      return c.time({ width: "medium" });
    case "ppp":
      return c.time({ width: "long" });
    case "pppp":
    default:
      return c.time({ width: "full" });
  }
}, xx = (h, c) => {
  const f = h.match(/(P+)(p+)?/) || [], p = f[1], v = f[2];
  if (!v)
    return UO(h, c);
  let y;
  switch (p) {
    case "P":
      y = c.dateTime({ width: "short" });
      break;
    case "PP":
      y = c.dateTime({ width: "medium" });
      break;
    case "PPP":
      y = c.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      y = c.dateTime({ width: "full" });
      break;
  }
  return y.replace("{{date}}", UO(p, c)).replace("{{time}}", Ap(v, c));
}, Sx = {
  p: Ap,
  P: xx
}, kx = /^D+$/, $x = /^Y+$/, Tx = ["D", "DD", "YY", "YYYY"];
function Px(h) {
  return kx.test(h);
}
function Rx(h) {
  return $x.test(h);
}
function Cx(h, c, f) {
  const p = _x(h, c, f);
  if (console.warn(p), Tx.includes(h)) throw new RangeError(p);
}
function _x(h, c, f) {
  const p = h[0] === "Y" ? "years" : "days of the month";
  return `Use \`${h.toLowerCase()}\` instead of \`${h}\` (in \`${c}\`) for formatting ${p} to the input \`${f}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Ax = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Wx = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Xx = /^'([^]*?)'?$/, qx = /''/g, Mx = /[a-zA-Z]/;
function ha(h, c, f) {
  var P, T, X, q;
  const p = Ta(), v = p.locale ?? vx, y = p.firstWeekContainsDate ?? ((T = (P = p.locale) == null ? void 0 : P.options) == null ? void 0 : T.firstWeekContainsDate) ?? 1, $ = p.weekStartsOn ?? ((q = (X = p.locale) == null ? void 0 : X.options) == null ? void 0 : q.weekStartsOn) ?? 0, W = Pi(h, f == null ? void 0 : f.in);
  if (!Ew(W))
    throw new RangeError("Invalid time value");
  let S = c.match(Wx).map((Z) => {
    const N = Z[0];
    if (N === "p" || N === "P") {
      const gt = Sx[N];
      return gt(Z, v.formatLong);
    }
    return Z;
  }).join("").match(Ax).map((Z) => {
    if (Z === "''")
      return { isToken: !1, value: "'" };
    const N = Z[0];
    if (N === "'")
      return { isToken: !1, value: Dx(Z) };
    if (GO[N])
      return { isToken: !0, value: Z };
    if (N.match(Mx))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + N + "`"
      );
    return { isToken: !1, value: Z };
  });
  v.localize.preprocessor && (S = v.localize.preprocessor(W, S));
  const x = {
    firstWeekContainsDate: y,
    weekStartsOn: $,
    locale: v
  };
  return S.map((Z) => {
    if (!Z.isToken) return Z.value;
    const N = Z.value;
    (Rx(N) || Px(N)) && Cx(N, c, String(h));
    const gt = GO[N[0]];
    return gt(W, N, v.localize, x);
  }).join("");
}
function Dx(h) {
  const c = h.match(Xx);
  return c ? c[1].replace(qx, "'") : h;
}
function Ex(h) {
  const c = window.getSelection();
  if (c.toString() && c.rangeCount) {
    const f = c.getRangeAt(0).cloneRange();
    f.surroundContents(h), c.removeAllRanges(), c.addRange(f);
  }
}
function Zx(h) {
  if (h.hasChildNodes())
    return h.firstChild;
  for (; h && !h.nextSibling; )
    h = h.parentNode;
  return h ? h.nextSibling : null;
}
function jx(h) {
  let c = h.startContainer;
  const f = h.endContainer;
  if (c == f)
    return [c];
  const p = [];
  for (; c && c != f; )
    p.push(c = Zx(c));
  for (c = h.startContainer; c && c != h.commonAncestorContainer; )
    p.unshift(c), c = c.parentNode;
  return p;
}
function zx() {
  if (window.getSelection) {
    const h = window.getSelection();
    if (!h.isCollapsed)
      return jx(h.getRangeAt(0));
  }
  return [];
}
function Nx(h, c = !1) {
  if (h.altKey && h.shiftKey && h.key.toLowerCase() === "d" && document.execCommand("insertHTML", !1, ha(/* @__PURE__ */ new Date(), "dd-MMM-yy")), h.metaKey && h.shiftKey && h.key.toLowerCase() === "d" && document.execCommand("insertHTML", !1, ha(/* @__PURE__ */ new Date(), "dd-MMM-yy")), h.key === "F11" && (h.preventDefault(), document.execCommand("insertHTML", !1, ha(/* @__PURE__ */ new Date(), "(hh:mm a) "))), h.key === "F12" && (h.preventDefault(), document.execCommand("insertHTML", !1, ha(/* @__PURE__ */ new Date(), "dd-MMM-yy hh:mm a: "))), !c && h.ctrlKey && h.key.toLowerCase() === "k") {
    h.preventDefault();
    const f = zx().filter((v) => v.tagName === "A");
    if (f.length > 0) {
      confirm("Make selected links clickable?") && (f.forEach((v) => {
        v.contentEditable = !1, v.target = "_blank";
      }), h.target.dispatchEvent(new Event("input")));
      return;
    }
    const p = prompt("Enter link");
    if (p) {
      const v = document.createElement("a");
      v.href = p, v.target = "_blank", v.contentEditable = !1, Ex(v), h.target.dispatchEvent(new Event("input"));
    }
  }
}
var BO = {}, YO;
function Ix() {
  if (YO) return BO;
  YO = 1;
  class h extends HTMLElement {
    constructor() {
      super(), this.attachShadow({ mode: "open" });
    }
  }
  class c {
    constructor() {
    }
    lineAt(t) {
      if (t < 0 || t > this.length)
        throw new RangeError(`Invalid position ${t} in document of length ${this.length}`);
      return this.lineInner(t, !1, 1, 0);
    }
    line(t) {
      if (t < 1 || t > this.lines)
        throw new RangeError(`Invalid line number ${t} in ${this.lines}-line document`);
      return this.lineInner(t, !0, 1, 0);
    }
    replace(t, e, i) {
      let n = [];
      return this.decompose(0, t, n, 2), i.length && i.decompose(0, i.length, n, 3), this.decompose(e, this.length, n, 1), p.from(n, this.length - (e - t) + i.length);
    }
    append(t) {
      return this.replace(this.length, this.length, t);
    }
    slice(t, e = this.length) {
      let i = [];
      return this.decompose(t, e, i, 0), p.from(i, e - t);
    }
    eq(t) {
      if (t == this)
        return !0;
      if (t.length != this.length || t.lines != this.lines)
        return !1;
      let e = this.scanIdentical(t, 1), i = this.length - this.scanIdentical(t, -1), n = new W(this), s = new W(t);
      for (let o = e, a = e; ; ) {
        if (n.next(o), s.next(o), o = 0, n.lineBreak != s.lineBreak || n.done != s.done || n.value != s.value)
          return !1;
        if (a += n.value.length, n.done || a >= i)
          return !0;
      }
    }
    iter(t = 1) {
      return new W(this, t);
    }
    iterRange(t, e = this.length) {
      return new S(this, t, e);
    }
    iterLines(t, e) {
      let i;
      if (t == null)
        i = this.iter();
      else {
        e == null && (e = this.lines + 1);
        let n = this.line(t).from;
        i = this.iterRange(n, Math.max(n, e == this.lines + 1 ? this.length : e <= 1 ? 0 : this.line(e - 1).to));
      }
      return new x(i);
    }
    toString() {
      return this.sliceString(0);
    }
    toJSON() {
      let t = [];
      return this.flatten(t), t;
    }
    static of(t) {
      if (t.length == 0)
        throw new RangeError("A document must have at least one line");
      return t.length == 1 && !t[0] ? c.empty : t.length <= 32 ? new f(t) : p.from(f.split(t, []));
    }
  }
  class f extends c {
    constructor(t, e = v(t)) {
      super(), this.text = t, this.length = e;
    }
    get lines() {
      return this.text.length;
    }
    get children() {
      return null;
    }
    lineInner(t, e, i, n) {
      for (let s = 0; ; s++) {
        let o = this.text[s], a = n + o.length;
        if ((e ? i : a) >= t)
          return new P(n, a, i, o);
        n = a + 1, i++;
      }
    }
    decompose(t, e, i, n) {
      let s = t <= 0 && e >= this.length ? this : new f($(this.text, t, e), Math.min(e, this.length) - Math.max(0, t));
      if (n & 1) {
        let o = i.pop(), a = y(s.text, o.text.slice(), 0, s.length);
        if (a.length <= 32)
          i.push(new f(a, o.length + s.length));
        else {
          let l = a.length >> 1;
          i.push(new f(a.slice(0, l)), new f(a.slice(l)));
        }
      } else
        i.push(s);
    }
    replace(t, e, i) {
      if (!(i instanceof f))
        return super.replace(t, e, i);
      let n = y(this.text, y(i.text, $(this.text, 0, t)), e), s = this.length + i.length - (e - t);
      return n.length <= 32 ? new f(n, s) : p.from(f.split(n, []), s);
    }
    sliceString(t, e = this.length, i = `
`) {
      let n = "";
      for (let s = 0, o = 0; s <= e && o < this.text.length; o++) {
        let a = this.text[o], l = s + a.length;
        s > t && o && (n += i), t < l && e > s && (n += a.slice(Math.max(0, t - s), e - s)), s = l + 1;
      }
      return n;
    }
    flatten(t) {
      for (let e of this.text)
        t.push(e);
    }
    scanIdentical() {
      return 0;
    }
    static split(t, e) {
      let i = [], n = -1;
      for (let s of t)
        i.push(s), n += s.length + 1, i.length == 32 && (e.push(new f(i, n)), i = [], n = -1);
      return n > -1 && e.push(new f(i, n)), e;
    }
  }
  class p extends c {
    constructor(t, e) {
      super(), this.children = t, this.length = e, this.lines = 0;
      for (let i of t)
        this.lines += i.lines;
    }
    lineInner(t, e, i, n) {
      for (let s = 0; ; s++) {
        let o = this.children[s], a = n + o.length, l = i + o.lines - 1;
        if ((e ? l : a) >= t)
          return o.lineInner(t, e, i, n);
        n = a + 1, i = l + 1;
      }
    }
    decompose(t, e, i, n) {
      for (let s = 0, o = 0; o <= e && s < this.children.length; s++) {
        let a = this.children[s], l = o + a.length;
        if (t <= l && e >= o) {
          let u = n & ((o <= t ? 1 : 0) | (l >= e ? 2 : 0));
          o >= t && l <= e && !u ? i.push(a) : a.decompose(t - o, e - o, i, u);
        }
        o = l + 1;
      }
    }
    replace(t, e, i) {
      if (i.lines < this.lines)
        for (let n = 0, s = 0; n < this.children.length; n++) {
          let o = this.children[n], a = s + o.length;
          if (t >= s && e <= a) {
            let l = o.replace(t - s, e - s, i), u = this.lines - o.lines + l.lines;
            if (l.lines < u >> 4 && l.lines > u >> 6) {
              let d = this.children.slice();
              return d[n] = l, new p(d, this.length - (e - t) + i.length);
            }
            return super.replace(s, a, l);
          }
          s = a + 1;
        }
      return super.replace(t, e, i);
    }
    sliceString(t, e = this.length, i = `
`) {
      let n = "";
      for (let s = 0, o = 0; s < this.children.length && o <= e; s++) {
        let a = this.children[s], l = o + a.length;
        o > t && s && (n += i), t < l && e > o && (n += a.sliceString(t - o, e - o, i)), o = l + 1;
      }
      return n;
    }
    flatten(t) {
      for (let e of this.children)
        e.flatten(t);
    }
    scanIdentical(t, e) {
      if (!(t instanceof p))
        return 0;
      let i = 0, [n, s, o, a] = e > 0 ? [0, 0, this.children.length, t.children.length] : [this.children.length - 1, t.children.length - 1, -1, -1];
      for (; ; n += e, s += e) {
        if (n == o || s == a)
          return i;
        let l = this.children[n], u = t.children[s];
        if (l != u)
          return i + l.scanIdentical(u, e);
        i += l.length + 1;
      }
    }
    static from(t, e = t.reduce((i, n) => i + n.length + 1, -1)) {
      let i = 0;
      for (let Q of t)
        i += Q.lines;
      if (i < 32) {
        let Q = [];
        for (let b of t)
          b.flatten(Q);
        return new f(Q, e);
      }
      let n = Math.max(32, i >> 5), s = n << 1, o = n >> 1, a = [], l = 0, u = -1, d = [];
      function O(Q) {
        let b;
        if (Q.lines > s && Q instanceof p)
          for (let C of Q.children)
            O(C);
        else
          Q.lines > o && (l > o || !l) ? (m(), a.push(Q)) : Q instanceof f && l && (b = d[d.length - 1]) instanceof f && Q.lines + b.lines <= 32 ? (l += Q.lines, u += Q.length + 1, d[d.length - 1] = new f(b.text.concat(Q.text), b.length + 1 + Q.length)) : (l + Q.lines > n && m(), l += Q.lines, u += Q.length + 1, d.push(Q));
      }
      function m() {
        l != 0 && (a.push(d.length == 1 ? d[0] : p.from(d, u)), u = -1, l = d.length = 0);
      }
      for (let Q of t)
        O(Q);
      return m(), a.length == 1 ? a[0] : new p(a, e);
    }
  }
  c.empty = /* @__PURE__ */ new f([""], 0);
  function v(r) {
    let t = -1;
    for (let e of r)
      t += e.length + 1;
    return t;
  }
  function y(r, t, e = 0, i = 1e9) {
    for (let n = 0, s = 0, o = !0; s < r.length && n <= i; s++) {
      let a = r[s], l = n + a.length;
      l >= e && (l > i && (a = a.slice(0, i - n)), n < e && (a = a.slice(e - n)), o ? (t[t.length - 1] += a, o = !1) : t.push(a)), n = l + 1;
    }
    return t;
  }
  function $(r, t, e) {
    return y(r, [""], t, e);
  }
  class W {
    constructor(t, e = 1) {
      this.dir = e, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [t], this.offsets = [e > 0 ? 1 : (t instanceof f ? t.text.length : t.children.length) << 1];
    }
    nextInner(t, e) {
      for (this.done = this.lineBreak = !1; ; ) {
        let i = this.nodes.length - 1, n = this.nodes[i], s = this.offsets[i], o = s >> 1, a = n instanceof f ? n.text.length : n.children.length;
        if (o == (e > 0 ? a : 0)) {
          if (i == 0)
            return this.done = !0, this.value = "", this;
          e > 0 && this.offsets[i - 1]++, this.nodes.pop(), this.offsets.pop();
        } else if ((s & 1) == (e > 0 ? 0 : 1)) {
          if (this.offsets[i] += e, t == 0)
            return this.lineBreak = !0, this.value = `
`, this;
          t--;
        } else if (n instanceof f) {
          let l = n.text[o + (e < 0 ? -1 : 0)];
          if (this.offsets[i] += e, l.length > Math.max(0, t))
            return this.value = t == 0 ? l : e > 0 ? l.slice(t) : l.slice(0, l.length - t), this;
          t -= l.length;
        } else {
          let l = n.children[o + (e < 0 ? -1 : 0)];
          t > l.length ? (t -= l.length, this.offsets[i] += e) : (e < 0 && this.offsets[i]--, this.nodes.push(l), this.offsets.push(e > 0 ? 1 : (l instanceof f ? l.text.length : l.children.length) << 1));
        }
      }
    }
    next(t = 0) {
      return t < 0 && (this.nextInner(-t, -this.dir), t = this.value.length), this.nextInner(t, this.dir);
    }
  }
  class S {
    constructor(t, e, i) {
      this.value = "", this.done = !1, this.cursor = new W(t, e > i ? -1 : 1), this.pos = e > i ? t.length : 0, this.from = Math.min(e, i), this.to = Math.max(e, i);
    }
    nextInner(t, e) {
      if (e < 0 ? this.pos <= this.from : this.pos >= this.to)
        return this.value = "", this.done = !0, this;
      t += Math.max(0, e < 0 ? this.pos - this.to : this.from - this.pos);
      let i = e < 0 ? this.pos - this.from : this.to - this.pos;
      t > i && (t = i), i -= t;
      let { value: n } = this.cursor.next(t);
      return this.pos += (n.length + t) * e, this.value = n.length <= i ? n : e < 0 ? n.slice(n.length - i) : n.slice(0, i), this.done = !this.value, this;
    }
    next(t = 0) {
      return t < 0 ? t = Math.max(t, this.from - this.pos) : t > 0 && (t = Math.min(t, this.to - this.pos)), this.nextInner(t, this.cursor.dir);
    }
    get lineBreak() {
      return this.cursor.lineBreak && this.value != "";
    }
  }
  class x {
    constructor(t) {
      this.inner = t, this.afterBreak = !0, this.value = "", this.done = !1;
    }
    next(t = 0) {
      let { done: e, lineBreak: i, value: n } = this.inner.next(t);
      return e ? (this.done = !0, this.value = "") : i ? this.afterBreak ? this.value = "" : (this.afterBreak = !0, this.next()) : (this.value = n, this.afterBreak = !1), this;
    }
    get lineBreak() {
      return !1;
    }
  }
  typeof Symbol < "u" && (c.prototype[Symbol.iterator] = function() {
    return this.iter();
  }, W.prototype[Symbol.iterator] = S.prototype[Symbol.iterator] = x.prototype[Symbol.iterator] = function() {
    return this;
  });
  class P {
    constructor(t, e, i, n) {
      this.from = t, this.to = e, this.number = i, this.text = n;
    }
    get length() {
      return this.to - this.from;
    }
  }
  let T = /* @__PURE__ */ "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((r) => r ? parseInt(r, 36) : 1);
  for (let r = 1; r < T.length; r++)
    T[r] += T[r - 1];
  function X(r) {
    for (let t = 1; t < T.length; t += 2)
      if (T[t] > r)
        return T[t - 1] <= r;
    return !1;
  }
  function q(r) {
    return r >= 127462 && r <= 127487;
  }
  const Z = 8205;
  function N(r, t, e = !0, i = !0) {
    return (e ? gt : wt)(r, t, i);
  }
  function gt(r, t, e) {
    if (t == r.length)
      return t;
    t && Rt(r.charCodeAt(t)) && et(r.charCodeAt(t - 1)) && t--;
    let i = vt(r, t);
    for (t += st(i); t < r.length; ) {
      let n = vt(r, t);
      if (i == Z || n == Z || e && X(n))
        t += st(n), i = n;
      else if (q(n)) {
        let s = 0, o = t - 2;
        for (; o >= 0 && q(vt(r, o)); )
          s++, o -= 2;
        if (s % 2 == 0)
          break;
        t += 2;
      } else
        break;
    }
    return t;
  }
  function wt(r, t, e) {
    for (; t > 0; ) {
      let i = gt(r, t - 2, e);
      if (i < t)
        return i;
      t--;
    }
    return 0;
  }
  function Rt(r) {
    return r >= 56320 && r < 57344;
  }
  function et(r) {
    return r >= 55296 && r < 56320;
  }
  function vt(r, t) {
    let e = r.charCodeAt(t);
    if (!et(e) || t + 1 == r.length)
      return e;
    let i = r.charCodeAt(t + 1);
    return Rt(i) ? (e - 55296 << 10) + (i - 56320) + 65536 : e;
  }
  function lt(r) {
    return r <= 65535 ? String.fromCharCode(r) : (r -= 65536, String.fromCharCode((r >> 10) + 55296, (r & 1023) + 56320));
  }
  function st(r) {
    return r < 65536 ? 1 : 2;
  }
  const Oi = /\r\n?|\n/;
  var nt = /* @__PURE__ */ function(r) {
    return r[r.Simple = 0] = "Simple", r[r.TrackDel = 1] = "TrackDel", r[r.TrackBefore = 2] = "TrackBefore", r[r.TrackAfter = 3] = "TrackAfter", r;
  }(nt || (nt = {}));
  class Pt {
    constructor(t) {
      this.sections = t;
    }
    get length() {
      let t = 0;
      for (let e = 0; e < this.sections.length; e += 2)
        t += this.sections[e];
      return t;
    }
    get newLength() {
      let t = 0;
      for (let e = 0; e < this.sections.length; e += 2) {
        let i = this.sections[e + 1];
        t += i < 0 ? this.sections[e] : i;
      }
      return t;
    }
    get empty() {
      return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
    }
    iterGaps(t) {
      for (let e = 0, i = 0, n = 0; e < this.sections.length; ) {
        let s = this.sections[e++], o = this.sections[e++];
        o < 0 ? (t(i, n, s), n += s) : n += o, i += s;
      }
    }
    iterChangedRanges(t, e = !1) {
      Pe(this, t, e);
    }
    get invertedDesc() {
      let t = [];
      for (let e = 0; e < this.sections.length; ) {
        let i = this.sections[e++], n = this.sections[e++];
        n < 0 ? t.push(i, n) : t.push(n, i);
      }
      return new Pt(t);
    }
    composeDesc(t) {
      return this.empty ? t : t.empty ? this : Nr(this, t);
    }
    mapDesc(t, e = !1) {
      return t.empty ? this : zr(this, t, e);
    }
    mapPos(t, e = -1, i = nt.Simple) {
      let n = 0, s = 0;
      for (let o = 0; o < this.sections.length; ) {
        let a = this.sections[o++], l = this.sections[o++], u = n + a;
        if (l < 0) {
          if (u > t)
            return s + (t - n);
          s += a;
        } else {
          if (i != nt.Simple && u >= t && (i == nt.TrackDel && n < t && u > t || i == nt.TrackBefore && n < t || i == nt.TrackAfter && u > t))
            return null;
          if (u > t || u == t && e < 0 && !a)
            return t == n || e < 0 ? s : s + l;
          s += l;
        }
        n = u;
      }
      if (t > n)
        throw new RangeError(`Position ${t} is out of range for changeset of length ${n}`);
      return s;
    }
    touchesRange(t, e = t) {
      for (let i = 0, n = 0; i < this.sections.length && n <= e; ) {
        let s = this.sections[i++], o = this.sections[i++], a = n + s;
        if (o >= 0 && n <= e && a >= t)
          return n < t && a > e ? "cover" : !0;
        n = a;
      }
      return !1;
    }
    toString() {
      let t = "";
      for (let e = 0; e < this.sections.length; ) {
        let i = this.sections[e++], n = this.sections[e++];
        t += (t ? " " : "") + i + (n >= 0 ? ":" + n : "");
      }
      return t;
    }
    toJSON() {
      return this.sections;
    }
    static fromJSON(t) {
      if (!Array.isArray(t) || t.length % 2 || t.some((e) => typeof e != "number"))
        throw new RangeError("Invalid JSON representation of ChangeDesc");
      return new Pt(t);
    }
    static create(t) {
      return new Pt(t);
    }
  }
  class xt extends Pt {
    constructor(t, e) {
      super(t), this.inserted = e;
    }
    apply(t) {
      if (this.length != t.length)
        throw new RangeError("Applying change set to a document with the wrong length");
      return Pe(this, (e, i, n, s, o) => t = t.replace(n, n + (i - e), o), !1), t;
    }
    mapDesc(t, e = !1) {
      return zr(this, t, e, !0);
    }
    invert(t) {
      let e = this.sections.slice(), i = [];
      for (let n = 0, s = 0; n < e.length; n += 2) {
        let o = e[n], a = e[n + 1];
        if (a >= 0) {
          e[n] = a, e[n + 1] = o;
          let l = n >> 1;
          for (; i.length < l; )
            i.push(c.empty);
          i.push(o ? t.slice(s, s + o) : c.empty);
        }
        s += o;
      }
      return new xt(e, i);
    }
    compose(t) {
      return this.empty ? t : t.empty ? this : Nr(this, t, !0);
    }
    map(t, e = !1) {
      return t.empty ? this : zr(this, t, e, !0);
    }
    iterChanges(t, e = !1) {
      Pe(this, t, e);
    }
    get desc() {
      return Pt.create(this.sections);
    }
    filter(t) {
      let e = [], i = [], n = [], s = new Ri(this);
      t:
        for (let o = 0, a = 0; ; ) {
          let l = o == t.length ? 1e9 : t[o++];
          for (; a < l || a == l && s.len == 0; ) {
            if (s.done)
              break t;
            let d = Math.min(s.len, l - a);
            At(n, d, -1);
            let O = s.ins == -1 ? -1 : s.off == 0 ? s.ins : 0;
            At(e, d, O), O > 0 && pe(i, e, s.text), s.forward(d), a += d;
          }
          let u = t[o++];
          for (; a < u; ) {
            if (s.done)
              break t;
            let d = Math.min(s.len, u - a);
            At(e, d, -1), At(n, d, s.ins == -1 ? -1 : s.off == 0 ? s.ins : 0), s.forward(d), a += d;
          }
        }
      return {
        changes: new xt(e, i),
        filtered: Pt.create(n)
      };
    }
    toJSON() {
      let t = [];
      for (let e = 0; e < this.sections.length; e += 2) {
        let i = this.sections[e], n = this.sections[e + 1];
        n < 0 ? t.push(i) : n == 0 ? t.push([i]) : t.push([i].concat(this.inserted[e >> 1].toJSON()));
      }
      return t;
    }
    static of(t, e, i) {
      let n = [], s = [], o = 0, a = null;
      function l(d = !1) {
        if (!d && !n.length)
          return;
        o < e && At(n, e - o, -1);
        let O = new xt(n, s);
        a = a ? a.compose(O.map(a)) : O, n = [], s = [], o = 0;
      }
      function u(d) {
        if (Array.isArray(d))
          for (let O of d)
            u(O);
        else if (d instanceof xt) {
          if (d.length != e)
            throw new RangeError(`Mismatched change set length (got ${d.length}, expected ${e})`);
          l(), a = a ? a.compose(d.map(a)) : d;
        } else {
          let { from: O, to: m = O, insert: Q } = d;
          if (O > m || O < 0 || m > e)
            throw new RangeError(`Invalid change range ${O} to ${m} (in doc of length ${e})`);
          let b = Q ? typeof Q == "string" ? c.of(Q.split(i || Oi)) : Q : c.empty, C = b.length;
          if (O == m && C == 0)
            return;
          O < o && l(), O > o && At(n, O - o, -1), At(n, m - O, C), pe(s, n, b), o = m;
        }
      }
      return u(t), l(!a), a;
    }
    static empty(t) {
      return new xt(t ? [t, -1] : [], []);
    }
    static fromJSON(t) {
      if (!Array.isArray(t))
        throw new RangeError("Invalid JSON representation of ChangeSet");
      let e = [], i = [];
      for (let n = 0; n < t.length; n++) {
        let s = t[n];
        if (typeof s == "number")
          e.push(s, -1);
        else {
          if (!Array.isArray(s) || typeof s[0] != "number" || s.some((o, a) => a && typeof o != "string"))
            throw new RangeError("Invalid JSON representation of ChangeSet");
          if (s.length == 1)
            e.push(s[0], 0);
          else {
            for (; i.length < n; )
              i.push(c.empty);
            i[n] = c.of(s.slice(1)), e.push(s[0], i[n].length);
          }
        }
      }
      return new xt(e, i);
    }
    static createSet(t, e) {
      return new xt(t, e);
    }
  }
  function At(r, t, e, i = !1) {
    if (t == 0 && e <= 0)
      return;
    let n = r.length - 2;
    n >= 0 && e <= 0 && e == r[n + 1] ? r[n] += t : t == 0 && r[n] == 0 ? r[n + 1] += e : i ? (r[n] += t, r[n + 1] += e) : r.push(t, e);
  }
  function pe(r, t, e) {
    if (e.length == 0)
      return;
    let i = t.length - 2 >> 1;
    if (i < r.length)
      r[r.length - 1] = r[r.length - 1].append(e);
    else {
      for (; r.length < i; )
        r.push(c.empty);
      r.push(e);
    }
  }
  function Pe(r, t, e) {
    let i = r.inserted;
    for (let n = 0, s = 0, o = 0; o < r.sections.length; ) {
      let a = r.sections[o++], l = r.sections[o++];
      if (l < 0)
        n += a, s += a;
      else {
        let u = n, d = s, O = c.empty;
        for (; u += a, d += l, l && i && (O = O.append(i[o - 2 >> 1])), !(e || o == r.sections.length || r.sections[o + 1] < 0); )
          a = r.sections[o++], l = r.sections[o++];
        t(n, u, s, d, O), n = u, s = d;
      }
    }
  }
  function zr(r, t, e, i = !1) {
    let n = [], s = i ? [] : null, o = new Ri(r), a = new Ri(t);
    for (let l = -1; ; )
      if (o.ins == -1 && a.ins == -1) {
        let u = Math.min(o.len, a.len);
        At(n, u, -1), o.forward(u), a.forward(u);
      } else if (a.ins >= 0 && (o.ins < 0 || l == o.i || o.off == 0 && (a.len < o.len || a.len == o.len && !e))) {
        let u = a.len;
        for (At(n, a.ins, -1); u; ) {
          let d = Math.min(o.len, u);
          o.ins >= 0 && l < o.i && o.len <= d && (At(n, 0, o.ins), s && pe(s, n, o.text), l = o.i), o.forward(d), u -= d;
        }
        a.next();
      } else if (o.ins >= 0) {
        let u = 0, d = o.len;
        for (; d; )
          if (a.ins == -1) {
            let O = Math.min(d, a.len);
            u += O, d -= O, a.forward(O);
          } else if (a.ins == 0 && a.len < d)
            d -= a.len, a.next();
          else
            break;
        At(n, u, l < o.i ? o.ins : 0), s && l < o.i && pe(s, n, o.text), l = o.i, o.forward(o.len - d);
      } else {
        if (o.done && a.done)
          return s ? xt.createSet(n, s) : Pt.create(n);
        throw new Error("Mismatched change set lengths");
      }
  }
  function Nr(r, t, e = !1) {
    let i = [], n = e ? [] : null, s = new Ri(r), o = new Ri(t);
    for (let a = !1; ; ) {
      if (s.done && o.done)
        return n ? xt.createSet(i, n) : Pt.create(i);
      if (s.ins == 0)
        At(i, s.len, 0, a), s.next();
      else if (o.len == 0 && !o.done)
        At(i, 0, o.ins, a), n && pe(n, i, o.text), o.next();
      else {
        if (s.done || o.done)
          throw new Error("Mismatched change set lengths");
        {
          let l = Math.min(s.len2, o.len), u = i.length;
          if (s.ins == -1) {
            let d = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
            At(i, l, d, a), n && d && pe(n, i, o.text);
          } else
            o.ins == -1 ? (At(i, s.off ? 0 : s.len, l, a), n && pe(n, i, s.textBit(l))) : (At(i, s.off ? 0 : s.len, o.off ? 0 : o.ins, a), n && !o.off && pe(n, i, o.text));
          a = (s.ins > l || o.ins >= 0 && o.len > l) && (a || i.length > u), s.forward2(l), o.forward(l);
        }
      }
    }
  }
  class Ri {
    constructor(t) {
      this.set = t, this.i = 0, this.next();
    }
    next() {
      let { sections: t } = this.set;
      this.i < t.length ? (this.len = t[this.i++], this.ins = t[this.i++]) : (this.len = 0, this.ins = -2), this.off = 0;
    }
    get done() {
      return this.ins == -2;
    }
    get len2() {
      return this.ins < 0 ? this.len : this.ins;
    }
    get text() {
      let { inserted: t } = this.set, e = this.i - 2 >> 1;
      return e >= t.length ? c.empty : t[e];
    }
    textBit(t) {
      let { inserted: e } = this.set, i = this.i - 2 >> 1;
      return i >= e.length && !t ? c.empty : e[i].slice(this.off, t == null ? void 0 : this.off + t);
    }
    forward(t) {
      t == this.len ? this.next() : (this.len -= t, this.off += t);
    }
    forward2(t) {
      this.ins == -1 ? this.forward(t) : t == this.ins ? this.next() : (this.ins -= t, this.off += t);
    }
  }
  class me {
    constructor(t, e, i) {
      this.from = t, this.to = e, this.flags = i;
    }
    get anchor() {
      return this.flags & 16 ? this.to : this.from;
    }
    get head() {
      return this.flags & 16 ? this.from : this.to;
    }
    get empty() {
      return this.from == this.to;
    }
    get assoc() {
      return this.flags & 4 ? -1 : this.flags & 8 ? 1 : 0;
    }
    get bidiLevel() {
      let t = this.flags & 3;
      return t == 3 ? null : t;
    }
    get goalColumn() {
      let t = this.flags >> 5;
      return t == 33554431 ? void 0 : t;
    }
    map(t, e = -1) {
      let i, n;
      return this.empty ? i = n = t.mapPos(this.from, e) : (i = t.mapPos(this.from, 1), n = t.mapPos(this.to, -1)), i == this.from && n == this.to ? this : new me(i, n, this.flags);
    }
    extend(t, e = t) {
      if (t <= this.anchor && e >= this.anchor)
        return _.range(t, e);
      let i = Math.abs(t - this.anchor) > Math.abs(e - this.anchor) ? t : e;
      return _.range(this.anchor, i);
    }
    eq(t) {
      return this.anchor == t.anchor && this.head == t.head;
    }
    toJSON() {
      return { anchor: this.anchor, head: this.head };
    }
    static fromJSON(t) {
      if (!t || typeof t.anchor != "number" || typeof t.head != "number")
        throw new RangeError("Invalid JSON representation for SelectionRange");
      return _.range(t.anchor, t.head);
    }
    static create(t, e, i) {
      return new me(t, e, i);
    }
  }
  class _ {
    constructor(t, e) {
      this.ranges = t, this.mainIndex = e;
    }
    map(t, e = -1) {
      return t.empty ? this : _.create(this.ranges.map((i) => i.map(t, e)), this.mainIndex);
    }
    eq(t) {
      if (this.ranges.length != t.ranges.length || this.mainIndex != t.mainIndex)
        return !1;
      for (let e = 0; e < this.ranges.length; e++)
        if (!this.ranges[e].eq(t.ranges[e]))
          return !1;
      return !0;
    }
    get main() {
      return this.ranges[this.mainIndex];
    }
    asSingle() {
      return this.ranges.length == 1 ? this : new _([this.main], 0);
    }
    addRange(t, e = !0) {
      return _.create([t].concat(this.ranges), e ? 0 : this.mainIndex + 1);
    }
    replaceRange(t, e = this.mainIndex) {
      let i = this.ranges.slice();
      return i[e] = t, _.create(i, this.mainIndex);
    }
    toJSON() {
      return { ranges: this.ranges.map((t) => t.toJSON()), main: this.mainIndex };
    }
    static fromJSON(t) {
      if (!t || !Array.isArray(t.ranges) || typeof t.main != "number" || t.main >= t.ranges.length)
        throw new RangeError("Invalid JSON representation for EditorSelection");
      return new _(t.ranges.map((e) => me.fromJSON(e)), t.main);
    }
    static single(t, e = t) {
      return new _([_.range(t, e)], 0);
    }
    static create(t, e = 0) {
      if (t.length == 0)
        throw new RangeError("A selection needs at least one range");
      for (let i = 0, n = 0; n < t.length; n++) {
        let s = t[n];
        if (s.empty ? s.from <= i : s.from < i)
          return _.normalized(t.slice(), e);
        i = s.to;
      }
      return new _(t, e);
    }
    static cursor(t, e = 0, i, n) {
      return me.create(t, t, (e == 0 ? 0 : e < 0 ? 4 : 8) | (i == null ? 3 : Math.min(2, i)) | (n ?? 33554431) << 5);
    }
    static range(t, e, i) {
      let n = (i ?? 33554431) << 5;
      return e < t ? me.create(e, t, 16 | n | 8) : me.create(t, e, n | (e > t ? 4 : 0));
    }
    static normalized(t, e = 0) {
      let i = t[e];
      t.sort((n, s) => n.from - s.from), e = t.indexOf(i);
      for (let n = 1; n < t.length; n++) {
        let s = t[n], o = t[n - 1];
        if (s.empty ? s.from <= o.to : s.from < o.to) {
          let a = o.from, l = Math.max(s.to, o.to);
          n <= e && e--, t.splice(--n, 2, s.anchor > s.head ? _.range(l, a) : _.range(a, l));
        }
      }
      return new _(t, e);
    }
  }
  function Ir(r, t) {
    for (let e of r.ranges)
      if (e.to > t)
        throw new RangeError("Selection points outside of document");
  }
  let pr = 0;
  class V {
    constructor(t, e, i, n, s) {
      this.combine = t, this.compareInput = e, this.compare = i, this.isStatic = n, this.id = pr++, this.default = t([]), this.extensions = typeof s == "function" ? s(this) : s;
    }
    static define(t = {}) {
      return new V(t.combine || ((e) => e), t.compareInput || ((e, i) => e === i), t.compare || (t.combine ? (e, i) => e === i : dn), !!t.static, t.enables);
    }
    of(t) {
      return new tr([], this, 0, t);
    }
    compute(t, e) {
      if (this.isStatic)
        throw new Error("Can't compute a static facet");
      return new tr(t, this, 1, e);
    }
    computeN(t, e) {
      if (this.isStatic)
        throw new Error("Can't compute a static facet");
      return new tr(t, this, 2, e);
    }
    from(t, e) {
      return e || (e = (i) => i), this.compute([t], (i) => e(i.field(t)));
    }
  }
  function dn(r, t) {
    return r == t || r.length == t.length && r.every((e, i) => e === t[i]);
  }
  class tr {
    constructor(t, e, i, n) {
      this.dependencies = t, this.facet = e, this.type = i, this.value = n, this.id = pr++;
    }
    dynamicSlot(t) {
      var e;
      let i = this.value, n = this.facet.compareInput, s = this.id, o = t[s] >> 1, a = this.type == 2, l = !1, u = !1, d = [];
      for (let O of this.dependencies)
        O == "doc" ? l = !0 : O == "selection" ? u = !0 : !(((e = t[O.id]) !== null && e !== void 0 ? e : 1) & 1) && d.push(t[O.id]);
      return {
        create(O) {
          return O.values[o] = i(O), 1;
        },
        update(O, m) {
          if (l && m.docChanged || u && (m.docChanged || m.selection) || Un(O, d)) {
            let Q = i(O);
            if (a ? !Ln(Q, O.values[o], n) : !n(Q, O.values[o]))
              return O.values[o] = Q, 1;
          }
          return 0;
        },
        reconfigure: (O, m) => {
          let Q = i(O), b = m.config.address[s];
          if (b != null) {
            let C = mr(m, b);
            if (this.dependencies.every((A) => A instanceof V ? m.facet(A) === O.facet(A) : A instanceof Yt ? m.field(A, !1) == O.field(A, !1) : !0) || (a ? Ln(Q, C, n) : n(Q, C)))
              return O.values[o] = C, 0;
          }
          return O.values[o] = Q, 1;
        }
      };
    }
  }
  function Ln(r, t, e) {
    if (r.length != t.length)
      return !1;
    for (let i = 0; i < r.length; i++)
      if (!e(r[i], t[i]))
        return !1;
    return !0;
  }
  function Un(r, t) {
    let e = !1;
    for (let i of t)
      Gr(r, i) & 1 && (e = !0);
    return e;
  }
  function Pa(r, t, e) {
    let i = e.map((l) => r[l.id]), n = e.map((l) => l.type), s = i.filter((l) => !(l & 1)), o = r[t.id] >> 1;
    function a(l) {
      let u = [];
      for (let d = 0; d < i.length; d++) {
        let O = mr(l, i[d]);
        if (n[d] == 2)
          for (let m of O)
            u.push(m);
        else
          u.push(O);
      }
      return t.combine(u);
    }
    return {
      create(l) {
        for (let u of i)
          Gr(l, u);
        return l.values[o] = a(l), 1;
      },
      update(l, u) {
        if (!Un(l, s))
          return 0;
        let d = a(l);
        return t.compare(d, l.values[o]) ? 0 : (l.values[o] = d, 1);
      },
      reconfigure(l, u) {
        let d = Un(l, i), O = u.config.facets[t.id], m = u.facet(t);
        if (O && !d && dn(e, O))
          return l.values[o] = m, 0;
        let Q = a(l);
        return t.compare(Q, m) ? (l.values[o] = m, 0) : (l.values[o] = Q, 1);
      }
    };
  }
  const zs = /* @__PURE__ */ V.define({ static: !0 });
  class Yt {
    constructor(t, e, i, n, s) {
      this.id = t, this.createF = e, this.updateF = i, this.compareF = n, this.spec = s, this.provides = void 0;
    }
    static define(t) {
      let e = new Yt(pr++, t.create, t.update, t.compare || ((i, n) => i === n), t);
      return t.provide && (e.provides = t.provide(e)), e;
    }
    create(t) {
      let e = t.facet(zs).find((i) => i.field == this);
      return ((e == null ? void 0 : e.create) || this.createF)(t);
    }
    slot(t) {
      let e = t[this.id] >> 1;
      return {
        create: (i) => (i.values[e] = this.create(i), 1),
        update: (i, n) => {
          let s = i.values[e], o = this.updateF(s, n);
          return this.compareF(s, o) ? 0 : (i.values[e] = o, 1);
        },
        reconfigure: (i, n) => n.config.address[this.id] != null ? (i.values[e] = n.field(this), 0) : (i.values[e] = this.create(i), 1)
      };
    }
    init(t) {
      return [this, zs.of({ field: this, create: t })];
    }
    get extension() {
      return this;
    }
  }
  const le = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
  function ut(r) {
    return (t) => new Bn(t, r);
  }
  const er = {
    highest: /* @__PURE__ */ ut(le.highest),
    high: /* @__PURE__ */ ut(le.high),
    default: /* @__PURE__ */ ut(le.default),
    low: /* @__PURE__ */ ut(le.low),
    lowest: /* @__PURE__ */ ut(le.lowest)
  };
  class Bn {
    constructor(t, e) {
      this.inner = t, this.prec = e;
    }
  }
  class On {
    of(t) {
      return new Yn(this, t);
    }
    reconfigure(t) {
      return On.reconfigure.of({ compartment: this, extension: t });
    }
    get(t) {
      return t.config.compartments.get(this);
    }
  }
  class Yn {
    constructor(t, e) {
      this.compartment = t, this.inner = e;
    }
  }
  class ht {
    constructor(t, e, i, n, s, o) {
      for (this.base = t, this.compartments = e, this.dynamicSlots = i, this.address = n, this.staticValues = s, this.facets = o, this.statusTemplate = []; this.statusTemplate.length < i.length; )
        this.statusTemplate.push(0);
    }
    staticFacet(t) {
      let e = this.address[t.id];
      return e == null ? t.default : this.staticValues[e >> 1];
    }
    static resolve(t, e, i) {
      let n = [], s = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ new Map();
      for (let m of Zt(t, e, o))
        m instanceof Yt ? n.push(m) : (s[m.facet.id] || (s[m.facet.id] = [])).push(m);
      let a = /* @__PURE__ */ Object.create(null), l = [], u = [];
      for (let m of n)
        a[m.id] = u.length << 1, u.push((Q) => m.slot(Q));
      let d = i == null ? void 0 : i.config.facets;
      for (let m in s) {
        let Q = s[m], b = Q[0].facet, C = d && d[m] || [];
        if (Q.every((A) => A.type == 0))
          if (a[b.id] = l.length << 1 | 1, dn(C, Q))
            l.push(i.facet(b));
          else {
            let A = b.combine(Q.map((M) => M.value));
            l.push(i && b.compare(A, i.facet(b)) ? i.facet(b) : A);
          }
        else {
          for (let A of Q)
            A.type == 0 ? (a[A.id] = l.length << 1 | 1, l.push(A.value)) : (a[A.id] = u.length << 1, u.push((M) => A.dynamicSlot(M)));
          a[b.id] = u.length << 1, u.push((A) => Pa(A, b, Q));
        }
      }
      let O = u.map((m) => m(a));
      return new ht(t, o, O, a, l, s);
    }
  }
  function Zt(r, t, e) {
    let i = [[], [], [], [], []], n = /* @__PURE__ */ new Map();
    function s(o, a) {
      let l = n.get(o);
      if (l != null) {
        if (l <= a)
          return;
        let u = i[l].indexOf(o);
        u > -1 && i[l].splice(u, 1), o instanceof Yn && e.delete(o.compartment);
      }
      if (n.set(o, a), Array.isArray(o))
        for (let u of o)
          s(u, a);
      else if (o instanceof Yn) {
        if (e.has(o.compartment))
          throw new RangeError("Duplicate use of compartment in extensions");
        let u = t.get(o.compartment) || o.inner;
        e.set(o.compartment, u), s(u, a);
      } else if (o instanceof Bn)
        s(o.inner, o.prec);
      else if (o instanceof Yt)
        i[a].push(o), o.provides && s(o.provides, a);
      else if (o instanceof tr)
        i[a].push(o), o.facet.extensions && s(o.facet.extensions, a);
      else {
        let u = o.extension;
        if (!u)
          throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
        s(u, a);
      }
    }
    return s(r, le.default), i.reduce((o, a) => o.concat(a));
  }
  function Gr(r, t) {
    if (t & 1)
      return 2;
    let e = t >> 1, i = r.status[e];
    if (i == 4)
      throw new Error("Cyclic dependency between fields and/or facets");
    if (i & 2)
      return i;
    r.status[e] = 4;
    let n = r.computeSlot(r, r.config.dynamicSlots[e]);
    return r.status[e] = 2 | n;
  }
  function mr(r, t) {
    return t & 1 ? r.config.staticValues[t >> 1] : r.values[t >> 1];
  }
  const Ns = /* @__PURE__ */ V.define(), Is = /* @__PURE__ */ V.define({
    combine: (r) => r.some((t) => t),
    static: !0
  }), ir = /* @__PURE__ */ V.define({
    combine: (r) => r.length ? r[0] : void 0,
    static: !0
  }), Gs = /* @__PURE__ */ V.define(), Vs = /* @__PURE__ */ V.define(), Ls = /* @__PURE__ */ V.define(), Us = /* @__PURE__ */ V.define({
    combine: (r) => r.length ? r[0] : !1
  });
  class rr {
    constructor(t, e) {
      this.type = t, this.value = e;
    }
    static define() {
      return new Ra();
    }
  }
  class Ra {
    of(t) {
      return new rr(this, t);
    }
  }
  class Ca {
    constructor(t) {
      this.map = t;
    }
    of(t) {
      return new ct(this, t);
    }
  }
  class ct {
    constructor(t, e) {
      this.type = t, this.value = e;
    }
    map(t) {
      let e = this.type.map(this.value, t);
      return e === void 0 ? void 0 : e == this.value ? this : new ct(this.type, e);
    }
    is(t) {
      return this.type == t;
    }
    static define(t = {}) {
      return new Ca(t.map || ((e) => e));
    }
    static mapEffects(t, e) {
      if (!t.length)
        return t;
      let i = [];
      for (let n of t) {
        let s = n.map(e);
        s && i.push(s);
      }
      return i;
    }
  }
  ct.reconfigure = /* @__PURE__ */ ct.define(), ct.appendConfig = /* @__PURE__ */ ct.define();
  class Gt {
    constructor(t, e, i, n, s, o) {
      this.startState = t, this.changes = e, this.selection = i, this.effects = n, this.annotations = s, this.scrollIntoView = o, this._doc = null, this._state = null, i && Ir(i, e.newLength), s.some((a) => a.type == Gt.time) || (this.annotations = s.concat(Gt.time.of(Date.now())));
    }
    static create(t, e, i, n, s, o) {
      return new Gt(t, e, i, n, s, o);
    }
    get newDoc() {
      return this._doc || (this._doc = this.changes.apply(this.startState.doc));
    }
    get newSelection() {
      return this.selection || this.startState.selection.map(this.changes);
    }
    get state() {
      return this._state || this.startState.applyTransaction(this), this._state;
    }
    annotation(t) {
      for (let e of this.annotations)
        if (e.type == t)
          return e.value;
    }
    get docChanged() {
      return !this.changes.empty;
    }
    get reconfigured() {
      return this.startState.config != this.state.config;
    }
    isUserEvent(t) {
      let e = this.annotation(Gt.userEvent);
      return !!(e && (e == t || e.length > t.length && e.slice(0, t.length) == t && e[t.length] == "."));
    }
  }
  Gt.time = /* @__PURE__ */ rr.define(), Gt.userEvent = /* @__PURE__ */ rr.define(), Gt.addToHistory = /* @__PURE__ */ rr.define(), Gt.remote = /* @__PURE__ */ rr.define();
  function _a(r, t) {
    let e = [];
    for (let i = 0, n = 0; ; ) {
      let s, o;
      if (i < r.length && (n == t.length || t[n] >= r[i]))
        s = r[i++], o = r[i++];
      else if (n < t.length)
        s = t[n++], o = t[n++];
      else
        return e;
      !e.length || e[e.length - 1] < s ? e.push(s, o) : e[e.length - 1] < o && (e[e.length - 1] = o);
    }
  }
  function Bs(r, t, e) {
    var i;
    let n, s, o;
    return e ? (n = t.changes, s = xt.empty(t.changes.length), o = r.changes.compose(t.changes)) : (n = t.changes.map(r.changes), s = r.changes.mapDesc(t.changes, !0), o = r.changes.compose(n)), {
      changes: o,
      selection: t.selection ? t.selection.map(s) : (i = r.selection) === null || i === void 0 ? void 0 : i.map(n),
      effects: ct.mapEffects(r.effects, n).concat(ct.mapEffects(t.effects, s)),
      annotations: r.annotations.length ? r.annotations.concat(t.annotations) : t.annotations,
      scrollIntoView: r.scrollIntoView || t.scrollIntoView
    };
  }
  function Fn(r, t, e) {
    let i = t.selection, n = R(t.annotations);
    return t.userEvent && (n = n.concat(Gt.userEvent.of(t.userEvent))), {
      changes: t.changes instanceof xt ? t.changes : xt.of(t.changes || [], e, r.facet(ir)),
      selection: i && (i instanceof _ ? i : _.single(i.anchor, i.head)),
      effects: R(t.effects),
      annotations: n,
      scrollIntoView: !!t.scrollIntoView
    };
  }
  function Hn(r, t, e) {
    let i = Fn(r, t.length ? t[0] : {}, r.doc.length);
    t.length && t[0].filter === !1 && (e = !1);
    for (let s = 1; s < t.length; s++) {
      t[s].filter === !1 && (e = !1);
      let o = !!t[s].sequential;
      i = Bs(i, Fn(r, t[s], o ? i.changes.newLength : r.doc.length), o);
    }
    let n = Gt.create(r, i.changes, i.selection, i.effects, i.annotations, i.scrollIntoView);
    return Wa(e ? Aa(n) : n);
  }
  function Aa(r) {
    let t = r.startState, e = !0;
    for (let n of t.facet(Gs)) {
      let s = n(r);
      if (s === !1) {
        e = !1;
        break;
      }
      Array.isArray(s) && (e = e === !0 ? s : _a(e, s));
    }
    if (e !== !0) {
      let n, s;
      if (e === !1)
        s = r.changes.invertedDesc, n = xt.empty(t.doc.length);
      else {
        let o = r.changes.filter(e);
        n = o.changes, s = o.filtered.mapDesc(o.changes).invertedDesc;
      }
      r = Gt.create(t, n, r.selection && r.selection.map(s), ct.mapEffects(r.effects, s), r.annotations, r.scrollIntoView);
    }
    let i = t.facet(Vs);
    for (let n = i.length - 1; n >= 0; n--) {
      let s = i[n](r);
      s instanceof Gt ? r = s : Array.isArray(s) && s.length == 1 && s[0] instanceof Gt ? r = s[0] : r = Hn(t, R(s), !1);
    }
    return r;
  }
  function Wa(r) {
    let t = r.startState, e = t.facet(Ls), i = r;
    for (let n = e.length - 1; n >= 0; n--) {
      let s = e[n](r);
      s && Object.keys(s).length && (i = Bs(r, Fn(t, s, r.changes.newLength), !0));
    }
    return i == r ? r : Gt.create(t, r.changes, r.selection, i.effects, i.annotations, i.scrollIntoView);
  }
  const k = [];
  function R(r) {
    return r == null ? k : Array.isArray(r) ? r : [r];
  }
  var D = /* @__PURE__ */ function(r) {
    return r[r.Word = 0] = "Word", r[r.Space = 1] = "Space", r[r.Other = 2] = "Other", r;
  }(D || (D = {}));
  const H = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
  let tt;
  try {
    tt = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
  } catch {
  }
  function Ct(r) {
    if (tt)
      return tt.test(r);
    for (let t = 0; t < r.length; t++) {
      let e = r[t];
      if (/\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || H.test(e)))
        return !0;
    }
    return !1;
  }
  function xe(r) {
    return (t) => {
      if (!/\S/.test(t))
        return D.Space;
      if (Ct(t))
        return D.Word;
      for (let e = 0; e < r.length; e++)
        if (t.indexOf(r[e]) > -1)
          return D.Word;
      return D.Other;
    };
  }
  class ft {
    constructor(t, e, i, n, s, o) {
      this.config = t, this.doc = e, this.selection = i, this.values = n, this.status = t.statusTemplate.slice(), this.computeSlot = s, o && (o._state = this);
      for (let a = 0; a < this.config.dynamicSlots.length; a++)
        Gr(this, a << 1);
      this.computeSlot = null;
    }
    field(t, e = !0) {
      let i = this.config.address[t.id];
      if (i == null) {
        if (e)
          throw new RangeError("Field is not present in this state");
        return;
      }
      return Gr(this, i), mr(this, i);
    }
    update(...t) {
      return Hn(this, t, !0);
    }
    applyTransaction(t) {
      let e = this.config, { base: i, compartments: n } = e;
      for (let o of t.effects)
        o.is(On.reconfigure) ? (e && (n = /* @__PURE__ */ new Map(), e.compartments.forEach((a, l) => n.set(l, a)), e = null), n.set(o.value.compartment, o.value.extension)) : o.is(ct.reconfigure) ? (e = null, i = o.value) : o.is(ct.appendConfig) && (e = null, i = R(i).concat(o.value));
      let s;
      e ? s = t.startState.values.slice() : (e = ht.resolve(i, n, this), s = new ft(e, this.doc, this.selection, e.dynamicSlots.map(() => null), (o, a) => a.reconfigure(o, this), null).values), new ft(e, t.newDoc, t.newSelection, s, (o, a) => a.update(o, t), t);
    }
    replaceSelection(t) {
      return typeof t == "string" && (t = this.toText(t)), this.changeByRange((e) => ({
        changes: { from: e.from, to: e.to, insert: t },
        range: _.cursor(e.from + t.length)
      }));
    }
    changeByRange(t) {
      let e = this.selection, i = t(e.ranges[0]), n = this.changes(i.changes), s = [i.range], o = R(i.effects);
      for (let a = 1; a < e.ranges.length; a++) {
        let l = t(e.ranges[a]), u = this.changes(l.changes), d = u.map(n);
        for (let m = 0; m < a; m++)
          s[m] = s[m].map(d);
        let O = n.mapDesc(u, !0);
        s.push(l.range.map(O)), n = n.compose(d), o = ct.mapEffects(o, d).concat(ct.mapEffects(R(l.effects), O));
      }
      return {
        changes: n,
        selection: _.create(s, e.mainIndex),
        effects: o
      };
    }
    changes(t = []) {
      return t instanceof xt ? t : xt.of(t, this.doc.length, this.facet(ft.lineSeparator));
    }
    toText(t) {
      return c.of(t.split(this.facet(ft.lineSeparator) || Oi));
    }
    sliceDoc(t = 0, e = this.doc.length) {
      return this.doc.sliceString(t, e, this.lineBreak);
    }
    facet(t) {
      let e = this.config.address[t.id];
      return e == null ? t.default : (Gr(this, e), mr(this, e));
    }
    toJSON(t) {
      let e = {
        doc: this.sliceDoc(),
        selection: this.selection.toJSON()
      };
      if (t)
        for (let i in t) {
          let n = t[i];
          n instanceof Yt && this.config.address[n.id] != null && (e[i] = n.spec.toJSON(this.field(t[i]), this));
        }
      return e;
    }
    static fromJSON(t, e = {}, i) {
      if (!t || typeof t.doc != "string")
        throw new RangeError("Invalid JSON representation for EditorState");
      let n = [];
      if (i) {
        for (let s in i)
          if (Object.prototype.hasOwnProperty.call(t, s)) {
            let o = i[s], a = t[s];
            n.push(o.init((l) => o.spec.fromJSON(a, l)));
          }
      }
      return ft.create({
        doc: t.doc,
        selection: _.fromJSON(t.selection),
        extensions: e.extensions ? n.concat([e.extensions]) : n
      });
    }
    static create(t = {}) {
      let e = ht.resolve(t.extensions || [], /* @__PURE__ */ new Map()), i = t.doc instanceof c ? t.doc : c.of((t.doc || "").split(e.staticFacet(ft.lineSeparator) || Oi)), n = t.selection ? t.selection instanceof _ ? t.selection : _.single(t.selection.anchor, t.selection.head) : _.single(0);
      return Ir(n, i.length), e.staticFacet(Is) || (n = n.asSingle()), new ft(e, i, n, e.dynamicSlots.map(() => null), (s, o) => o.create(s), null);
    }
    get tabSize() {
      return this.facet(ft.tabSize);
    }
    get lineBreak() {
      return this.facet(ft.lineSeparator) || `
`;
    }
    get readOnly() {
      return this.facet(Us);
    }
    phrase(t, ...e) {
      for (let i of this.facet(ft.phrases))
        if (Object.prototype.hasOwnProperty.call(i, t)) {
          t = i[t];
          break;
        }
      return e.length && (t = t.replace(/\$(\$|\d*)/g, (i, n) => {
        if (n == "$")
          return "$";
        let s = +(n || 1);
        return !s || s > e.length ? i : e[s - 1];
      })), t;
    }
    languageDataAt(t, e, i = -1) {
      let n = [];
      for (let s of this.facet(Ns))
        for (let o of s(this, e, i))
          Object.prototype.hasOwnProperty.call(o, t) && n.push(o[t]);
      return n;
    }
    charCategorizer(t) {
      return xe(this.languageDataAt("wordChars", t).join(""));
    }
    wordAt(t) {
      let { text: e, from: i, length: n } = this.doc.lineAt(t), s = this.charCategorizer(t), o = t - i, a = t - i;
      for (; o > 0; ) {
        let l = N(e, o, !1);
        if (s(e.slice(l, o)) != D.Word)
          break;
        o = l;
      }
      for (; a < n; ) {
        let l = N(e, a);
        if (s(e.slice(a, l)) != D.Word)
          break;
        a = l;
      }
      return o == a ? null : _.range(o + i, a + i);
    }
  }
  ft.allowMultipleSelections = Is, ft.tabSize = /* @__PURE__ */ V.define({
    combine: (r) => r.length ? r[0] : 4
  }), ft.lineSeparator = ir, ft.readOnly = Us, ft.phrases = /* @__PURE__ */ V.define({
    compare(r, t) {
      let e = Object.keys(r), i = Object.keys(t);
      return e.length == i.length && e.every((n) => r[n] == t[n]);
    }
  }), ft.languageData = Ns, ft.changeFilter = Gs, ft.transactionFilter = Vs, ft.transactionExtender = Ls, On.reconfigure = /* @__PURE__ */ ct.define();
  function pi(r, t, e = {}) {
    let i = {};
    for (let n of r)
      for (let s of Object.keys(n)) {
        let o = n[s], a = i[s];
        if (a === void 0)
          i[s] = o;
        else if (!(a === o || o === void 0))
          if (Object.hasOwnProperty.call(e, s))
            i[s] = e[s](a, o);
          else
            throw new Error("Config merge conflict for field " + s);
      }
    for (let n in t)
      i[n] === void 0 && (i[n] = t[n]);
    return i;
  }
  class Ee {
    eq(t) {
      return this == t;
    }
    range(t, e = t) {
      return gr.create(t, e, this);
    }
  }
  Ee.prototype.startSide = Ee.prototype.endSide = 0, Ee.prototype.point = !1, Ee.prototype.mapMode = nt.TrackDel;
  class gr {
    constructor(t, e, i) {
      this.from = t, this.to = e, this.value = i;
    }
    static create(t, e, i) {
      return new gr(t, e, i);
    }
  }
  function Vr(r, t) {
    return r.from - t.from || r.value.startSide - t.value.startSide;
  }
  class Ft {
    constructor(t, e, i, n) {
      this.from = t, this.to = e, this.value = i, this.maxPoint = n;
    }
    get length() {
      return this.to[this.to.length - 1];
    }
    findIndex(t, e, i, n = 0) {
      let s = i ? this.to : this.from;
      for (let o = n, a = s.length; ; ) {
        if (o == a)
          return o;
        let l = o + a >> 1, u = s[l] - t || (i ? this.value[l].endSide : this.value[l].startSide) - e;
        if (l == o)
          return u >= 0 ? o : a;
        u >= 0 ? a = l : o = l + 1;
      }
    }
    between(t, e, i, n) {
      for (let s = this.findIndex(e, -1e9, !0), o = this.findIndex(i, 1e9, !1, s); s < o; s++)
        if (n(this.from[s] + t, this.to[s] + t, this.value[s]) === !1)
          return !1;
    }
    map(t, e) {
      let i = [], n = [], s = [], o = -1, a = -1;
      for (let l = 0; l < this.value.length; l++) {
        let u = this.value[l], d = this.from[l] + t, O = this.to[l] + t, m, Q;
        if (d == O) {
          let b = e.mapPos(d, u.startSide, u.mapMode);
          if (b == null || (m = Q = b, u.startSide != u.endSide && (Q = e.mapPos(d, u.endSide), Q < m)))
            continue;
        } else if (m = e.mapPos(d, u.startSide), Q = e.mapPos(O, u.endSide), m > Q || m == Q && u.startSide > 0 && u.endSide <= 0)
          continue;
        (Q - m || u.endSide - u.startSide) < 0 || (o < 0 && (o = m), u.point && (a = Math.max(a, Q - m)), i.push(u), n.push(m - o), s.push(Q - o));
      }
      return { mapped: i.length ? new Ft(n, s, i, a) : null, pos: o };
    }
  }
  class rt {
    constructor(t, e, i, n) {
      this.chunkPos = t, this.chunk = e, this.nextLayer = i, this.maxPoint = n;
    }
    static create(t, e, i, n) {
      return new rt(t, e, i, n);
    }
    get length() {
      let t = this.chunk.length - 1;
      return t < 0 ? 0 : Math.max(this.chunkEnd(t), this.nextLayer.length);
    }
    get size() {
      if (this.isEmpty)
        return 0;
      let t = this.nextLayer.size;
      for (let e of this.chunk)
        t += e.value.length;
      return t;
    }
    chunkEnd(t) {
      return this.chunkPos[t] + this.chunk[t].length;
    }
    update(t) {
      let { add: e = [], sort: i = !1, filterFrom: n = 0, filterTo: s = this.length } = t, o = t.filter;
      if (e.length == 0 && !o)
        return this;
      if (i && (e = e.slice().sort(Vr)), this.isEmpty)
        return e.length ? rt.of(e) : this;
      let a = new Ze(this, null, -1).goto(0), l = 0, u = [], d = new se();
      for (; a.value || l < e.length; )
        if (l < e.length && (a.from - e[l].from || a.startSide - e[l].value.startSide) >= 0) {
          let O = e[l++];
          d.addInner(O.from, O.to, O.value) || u.push(O);
        } else
          a.rangeIndex == 1 && a.chunkIndex < this.chunk.length && (l == e.length || this.chunkEnd(a.chunkIndex) < e[l].from) && (!o || n > this.chunkEnd(a.chunkIndex) || s < this.chunkPos[a.chunkIndex]) && d.addChunk(this.chunkPos[a.chunkIndex], this.chunk[a.chunkIndex]) ? a.nextChunk() : ((!o || n > a.to || s < a.from || o(a.from, a.to, a.value)) && (d.addInner(a.from, a.to, a.value) || u.push(gr.create(a.from, a.to, a.value))), a.next());
      return d.finishInner(this.nextLayer.isEmpty && !u.length ? rt.empty : this.nextLayer.update({ add: u, filter: o, filterFrom: n, filterTo: s }));
    }
    map(t) {
      if (t.empty || this.isEmpty)
        return this;
      let e = [], i = [], n = -1;
      for (let o = 0; o < this.chunk.length; o++) {
        let a = this.chunkPos[o], l = this.chunk[o], u = t.touchesRange(a, a + l.length);
        if (u === !1)
          n = Math.max(n, l.maxPoint), e.push(l), i.push(t.mapPos(a));
        else if (u === !0) {
          let { mapped: d, pos: O } = l.map(a, t);
          d && (n = Math.max(n, d.maxPoint), e.push(d), i.push(O));
        }
      }
      let s = this.nextLayer.map(t);
      return e.length == 0 ? s : new rt(i, e, s || rt.empty, n);
    }
    between(t, e, i) {
      if (!this.isEmpty) {
        for (let n = 0; n < this.chunk.length; n++) {
          let s = this.chunkPos[n], o = this.chunk[n];
          if (e >= s && t <= s + o.length && o.between(s, t - s, e - s, i) === !1)
            return;
        }
        this.nextLayer.between(t, e, i);
      }
    }
    iter(t = 0) {
      return gi.from([this]).goto(t);
    }
    get isEmpty() {
      return this.nextLayer == this;
    }
    static iter(t, e = 0) {
      return gi.from(t).goto(e);
    }
    static compare(t, e, i, n, s = -1) {
      let o = t.filter((O) => O.maxPoint > 0 || !O.isEmpty && O.maxPoint >= s), a = e.filter((O) => O.maxPoint > 0 || !O.isEmpty && O.maxPoint >= s), l = mi(o, a, i), u = new Re(o, l, s), d = new Re(a, l, s);
      i.iterGaps((O, m, Q) => jt(u, O, d, m, Q, n)), i.empty && i.length == 0 && jt(u, 0, d, 0, 0, n);
    }
    static eq(t, e, i = 0, n) {
      n == null && (n = 1e9);
      let s = t.filter((d) => !d.isEmpty && e.indexOf(d) < 0), o = e.filter((d) => !d.isEmpty && t.indexOf(d) < 0);
      if (s.length != o.length)
        return !1;
      if (!s.length)
        return !0;
      let a = mi(s, o), l = new Re(s, a, 0).goto(i), u = new Re(o, a, 0).goto(i);
      for (; ; ) {
        if (l.to != u.to || !ie(l.active, u.active) || l.point && (!u.point || !l.point.eq(u.point)))
          return !1;
        if (l.to > n)
          return !0;
        l.next(), u.next();
      }
    }
    static spans(t, e, i, n, s = -1) {
      let o = new Re(t, null, s).goto(e), a = e, l = o.openStart;
      for (; ; ) {
        let u = Math.min(o.to, i);
        if (o.point ? (n.point(a, u, o.point, o.activeForPoint(o.to), l, o.pointRank), l = o.openEnd(u) + (o.to > u ? 1 : 0)) : u > a && (n.span(a, u, o.active, l), l = o.openEnd(u)), o.to > i)
          break;
        a = o.to, o.next();
      }
      return l;
    }
    static of(t, e = !1) {
      let i = new se();
      for (let n of t instanceof gr ? [t] : e ? ee(t) : t)
        i.add(n.from, n.to, n.value);
      return i.finish();
    }
  }
  rt.empty = /* @__PURE__ */ new rt([], [], null, -1);
  function ee(r) {
    if (r.length > 1)
      for (let t = r[0], e = 1; e < r.length; e++) {
        let i = r[e];
        if (Vr(t, i) > 0)
          return r.slice().sort(Vr);
        t = i;
      }
    return r;
  }
  rt.empty.nextLayer = rt.empty;
  class se {
    constructor() {
      this.chunks = [], this.chunkPos = [], this.chunkStart = -1, this.last = null, this.lastFrom = -1e9, this.lastTo = -1e9, this.from = [], this.to = [], this.value = [], this.maxPoint = -1, this.setMaxPoint = -1, this.nextLayer = null;
    }
    finishChunk(t) {
      this.chunks.push(new Ft(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, t && (this.from = [], this.to = [], this.value = []);
    }
    add(t, e, i) {
      this.addInner(t, e, i) || (this.nextLayer || (this.nextLayer = new se())).add(t, e, i);
    }
    addInner(t, e, i) {
      let n = t - this.lastTo || i.startSide - this.last.endSide;
      if (n <= 0 && (t - this.lastFrom || i.startSide - this.last.startSide) < 0)
        throw new Error("Ranges must be added sorted by `from` position and `startSide`");
      return n < 0 ? !1 : (this.from.length == 250 && this.finishChunk(!0), this.chunkStart < 0 && (this.chunkStart = t), this.from.push(t - this.chunkStart), this.to.push(e - this.chunkStart), this.last = i, this.lastFrom = t, this.lastTo = e, this.value.push(i), i.point && (this.maxPoint = Math.max(this.maxPoint, e - t)), !0);
    }
    addChunk(t, e) {
      if ((t - this.lastTo || e.value[0].startSide - this.last.endSide) < 0)
        return !1;
      this.from.length && this.finishChunk(!0), this.setMaxPoint = Math.max(this.setMaxPoint, e.maxPoint), this.chunks.push(e), this.chunkPos.push(t);
      let i = e.value.length - 1;
      return this.last = e.value[i], this.lastFrom = e.from[i] + t, this.lastTo = e.to[i] + t, !0;
    }
    finish() {
      return this.finishInner(rt.empty);
    }
    finishInner(t) {
      if (this.from.length && this.finishChunk(!1), this.chunks.length == 0)
        return t;
      let e = rt.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(t) : t, this.setMaxPoint);
      return this.from = null, e;
    }
  }
  function mi(r, t, e) {
    let i = /* @__PURE__ */ new Map();
    for (let s of r)
      for (let o = 0; o < s.chunk.length; o++)
        s.chunk[o].maxPoint <= 0 && i.set(s.chunk[o], s.chunkPos[o]);
    let n = /* @__PURE__ */ new Set();
    for (let s of t)
      for (let o = 0; o < s.chunk.length; o++) {
        let a = i.get(s.chunk[o]);
        a != null && (e ? e.mapPos(a) : a) == s.chunkPos[o] && !(e != null && e.touchesRange(a, a + s.chunk[o].length)) && n.add(s.chunk[o]);
      }
    return n;
  }
  class Ze {
    constructor(t, e, i, n = 0) {
      this.layer = t, this.skip = e, this.minPoint = i, this.rank = n;
    }
    get startSide() {
      return this.value ? this.value.startSide : 0;
    }
    get endSide() {
      return this.value ? this.value.endSide : 0;
    }
    goto(t, e = -1e9) {
      return this.chunkIndex = this.rangeIndex = 0, this.gotoInner(t, e, !1), this;
    }
    gotoInner(t, e, i) {
      for (; this.chunkIndex < this.layer.chunk.length; ) {
        let n = this.layer.chunk[this.chunkIndex];
        if (!(this.skip && this.skip.has(n) || this.layer.chunkEnd(this.chunkIndex) < t || n.maxPoint < this.minPoint))
          break;
        this.chunkIndex++, i = !1;
      }
      if (this.chunkIndex < this.layer.chunk.length) {
        let n = this.layer.chunk[this.chunkIndex].findIndex(t - this.layer.chunkPos[this.chunkIndex], e, !0);
        (!i || this.rangeIndex < n) && this.setRangeIndex(n);
      }
      this.next();
    }
    forward(t, e) {
      (this.to - t || this.endSide - e) < 0 && this.gotoInner(t, e, !0);
    }
    next() {
      for (; ; )
        if (this.chunkIndex == this.layer.chunk.length) {
          this.from = this.to = 1e9, this.value = null;
          break;
        } else {
          let t = this.layer.chunkPos[this.chunkIndex], e = this.layer.chunk[this.chunkIndex], i = t + e.from[this.rangeIndex];
          if (this.from = i, this.to = t + e.to[this.rangeIndex], this.value = e.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint)
            break;
        }
    }
    setRangeIndex(t) {
      if (t == this.layer.chunk[this.chunkIndex].value.length) {
        if (this.chunkIndex++, this.skip)
          for (; this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]); )
            this.chunkIndex++;
        this.rangeIndex = 0;
      } else
        this.rangeIndex = t;
    }
    nextChunk() {
      this.chunkIndex++, this.rangeIndex = 0, this.next();
    }
    compare(t) {
      return this.from - t.from || this.startSide - t.startSide || this.rank - t.rank || this.to - t.to || this.endSide - t.endSide;
    }
  }
  class gi {
    constructor(t) {
      this.heap = t;
    }
    static from(t, e = null, i = -1) {
      let n = [];
      for (let s = 0; s < t.length; s++)
        for (let o = t[s]; !o.isEmpty; o = o.nextLayer)
          o.maxPoint >= i && n.push(new Ze(o, e, i, s));
      return n.length == 1 ? n[0] : new gi(n);
    }
    get startSide() {
      return this.value ? this.value.startSide : 0;
    }
    goto(t, e = -1e9) {
      for (let i of this.heap)
        i.goto(t, e);
      for (let i = this.heap.length >> 1; i >= 0; i--)
        Ci(this.heap, i);
      return this.next(), this;
    }
    forward(t, e) {
      for (let i of this.heap)
        i.forward(t, e);
      for (let i = this.heap.length >> 1; i >= 0; i--)
        Ci(this.heap, i);
      (this.to - t || this.value.endSide - e) < 0 && this.next();
    }
    next() {
      if (this.heap.length == 0)
        this.from = this.to = 1e9, this.value = null, this.rank = -1;
      else {
        let t = this.heap[0];
        this.from = t.from, this.to = t.to, this.value = t.value, this.rank = t.rank, t.value && t.next(), Ci(this.heap, 0);
      }
    }
  }
  function Ci(r, t) {
    for (let e = r[t]; ; ) {
      let i = (t << 1) + 1;
      if (i >= r.length)
        break;
      let n = r[i];
      if (i + 1 < r.length && n.compare(r[i + 1]) >= 0 && (n = r[i + 1], i++), e.compare(n) < 0)
        break;
      r[i] = e, r[t] = n, t = i;
    }
  }
  class Re {
    constructor(t, e, i) {
      this.minPoint = i, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = gi.from(t, e, i);
    }
    goto(t, e = -1e9) {
      return this.cursor.goto(t, e), this.active.length = this.activeTo.length = this.activeRank.length = 0, this.minActive = -1, this.to = t, this.endSide = e, this.openStart = -1, this.next(), this;
    }
    forward(t, e) {
      for (; this.minActive > -1 && (this.activeTo[this.minActive] - t || this.active[this.minActive].endSide - e) < 0; )
        this.removeActive(this.minActive);
      this.cursor.forward(t, e);
    }
    removeActive(t) {
      Ht(this.active, t), Ht(this.activeTo, t), Ht(this.activeRank, t), this.minActive = vr(this.active, this.activeTo);
    }
    addActive(t) {
      let e = 0, { value: i, to: n, rank: s } = this.cursor;
      for (; e < this.activeRank.length && this.activeRank[e] <= s; )
        e++;
      He(this.active, e, i), He(this.activeTo, e, n), He(this.activeRank, e, s), t && He(t, e, this.cursor.from), this.minActive = vr(this.active, this.activeTo);
    }
    next() {
      let t = this.to, e = this.point;
      this.point = null;
      let i = this.openStart < 0 ? [] : null, n = 0;
      for (; ; ) {
        let s = this.minActive;
        if (s > -1 && (this.activeTo[s] - this.cursor.from || this.active[s].endSide - this.cursor.startSide) < 0) {
          if (this.activeTo[s] > t) {
            this.to = this.activeTo[s], this.endSide = this.active[s].endSide;
            break;
          }
          this.removeActive(s), i && Ht(i, s);
        } else if (this.cursor.value)
          if (this.cursor.from > t) {
            this.to = this.cursor.from, this.endSide = this.cursor.startSide;
            break;
          } else {
            let o = this.cursor.value;
            if (!o.point)
              this.addActive(i), this.cursor.next();
            else if (e && this.cursor.to == this.to && this.cursor.from < this.cursor.to)
              this.cursor.next();
            else {
              this.point = o, this.pointFrom = this.cursor.from, this.pointRank = this.cursor.rank, this.to = this.cursor.to, this.endSide = o.endSide, this.cursor.from < t && (n = 1), this.cursor.next(), this.forward(this.to, this.endSide);
              break;
            }
          }
        else {
          this.to = this.endSide = 1e9;
          break;
        }
      }
      if (i) {
        let s = 0;
        for (; s < i.length && i[s] < t; )
          s++;
        this.openStart = s + n;
      }
    }
    activeForPoint(t) {
      if (!this.active.length)
        return this.active;
      let e = [];
      for (let i = this.active.length - 1; i >= 0 && !(this.activeRank[i] < this.pointRank); i--)
        (this.activeTo[i] > t || this.activeTo[i] == t && this.active[i].endSide >= this.point.endSide) && e.push(this.active[i]);
      return e.reverse();
    }
    openEnd(t) {
      let e = 0;
      for (let i = this.activeTo.length - 1; i >= 0 && this.activeTo[i] > t; i--)
        e++;
      return e;
    }
  }
  function jt(r, t, e, i, n, s) {
    r.goto(t), e.goto(i);
    let o = i + n, a = i, l = i - t;
    for (; ; ) {
      let u = r.to + l - e.to || r.endSide - e.endSide, d = u < 0 ? r.to + l : e.to, O = Math.min(d, o);
      if (r.point || e.point ? r.point && e.point && (r.point == e.point || r.point.eq(e.point)) && ie(r.activeForPoint(r.to + l), e.activeForPoint(e.to)) || s.comparePoint(a, O, r.point, e.point) : O > a && !ie(r.active, e.active) && s.compareRange(a, O, r.active, e.active), d > o)
        break;
      a = d, u <= 0 && r.next(), u >= 0 && e.next();
    }
  }
  function ie(r, t) {
    if (r.length != t.length)
      return !1;
    for (let e = 0; e < r.length; e++)
      if (r[e] != t[e] && !r[e].eq(t[e]))
        return !1;
    return !0;
  }
  function Ht(r, t) {
    for (let e = t, i = r.length - 1; e < i; e++)
      r[e] = r[e + 1];
    r.pop();
  }
  function He(r, t, e) {
    for (let i = r.length - 1; i >= t; i--)
      r[i + 1] = r[i];
    r[t] = e;
  }
  function vr(r, t) {
    let e = -1, i = 1e9;
    for (let n = 0; n < t.length; n++)
      (t[n] - i || r[n].endSide - r[e].endSide) < 0 && (e = n, i = t[n]);
    return e;
  }
  function nr(r, t, e = r.length) {
    let i = 0;
    for (let n = 0; n < e; )
      r.charCodeAt(n) == 9 ? (i += t - i % t, n++) : (i++, n = N(r, n));
    return i;
  }
  function _i(r, t, e, i) {
    for (let n = 0, s = 0; ; ) {
      if (s >= t)
        return n;
      if (n == r.length)
        break;
      s += r.charCodeAt(n) == 9 ? e - s % e : 1, n = N(r, n);
    }
    return i === !0 ? -1 : r.length;
  }
  const ge = "ͼ", je = typeof Symbol > "u" ? "__" + ge : Symbol.for(ge), Lr = typeof Symbol > "u" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet"), pn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {};
  class he {
    constructor(t, e) {
      this.rules = [];
      let { finish: i } = e || {};
      function n(o) {
        return /^@/.test(o) ? [o] : o.split(/,\s*/);
      }
      function s(o, a, l, u) {
        let d = [], O = /^@(\w+)\b/.exec(o[0]), m = O && O[1] == "keyframes";
        if (O && a == null)
          return l.push(o[0] + ";");
        for (let Q in a) {
          let b = a[Q];
          if (/&/.test(Q))
            s(
              Q.split(/,\s*/).map((C) => o.map((A) => C.replace(/&/, A))).reduce((C, A) => C.concat(A)),
              b,
              l
            );
          else if (b && typeof b == "object") {
            if (!O)
              throw new RangeError("The value of a property (" + Q + ") should be a primitive value.");
            s(n(Q), b, d, m);
          } else
            b != null && d.push(Q.replace(/_.*/, "").replace(/[A-Z]/g, (C) => "-" + C.toLowerCase()) + ": " + b + ";");
        }
        (d.length || m) && l.push((i && !O && !u ? o.map(i) : o).join(", ") + " {" + d.join(" ") + "}");
      }
      for (let o in t)
        s(n(o), t[o], this.rules);
    }
    getRules() {
      return this.rules.join(`
`);
    }
    static newName() {
      let t = pn[je] || 1;
      return pn[je] = t + 1, ge + t.toString(36);
    }
    static mount(t, e) {
      (t[Lr] || new Ur(t)).mount(Array.isArray(e) ? e : [e]);
    }
  }
  let Je = null;
  class Ur {
    constructor(t) {
      if (!t.head && t.adoptedStyleSheets && typeof CSSStyleSheet < "u") {
        if (Je)
          return t.adoptedStyleSheets = [Je.sheet].concat(t.adoptedStyleSheets), t[Lr] = Je;
        this.sheet = new CSSStyleSheet(), t.adoptedStyleSheets = [this.sheet].concat(t.adoptedStyleSheets), Je = this;
      } else {
        this.styleTag = (t.ownerDocument || t).createElement("style");
        let e = t.head || t;
        e.insertBefore(this.styleTag, e.firstChild);
      }
      this.modules = [], t[Lr] = this;
    }
    mount(t) {
      let e = this.sheet, i = 0, n = 0;
      for (let s = 0; s < t.length; s++) {
        let o = t[s], a = this.modules.indexOf(o);
        if (a < n && a > -1 && (this.modules.splice(a, 1), n--, a = -1), a == -1) {
          if (this.modules.splice(n++, 0, o), e)
            for (let l = 0; l < o.rules.length; l++)
              e.insertRule(o.rules[l], i++);
        } else {
          for (; n < a; )
            i += this.modules[n++].rules.length;
          i += o.rules.length, n++;
        }
      }
      if (!e) {
        let s = "";
        for (let o = 0; o < this.modules.length; o++)
          s += this.modules[o].getRules() + `
`;
        this.styleTag.textContent = s;
      }
    }
  }
  for (var Ke = {
    8: "Backspace",
    9: "Tab",
    10: "Enter",
    12: "NumLock",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    44: "PrintScreen",
    45: "Insert",
    46: "Delete",
    59: ";",
    61: "=",
    91: "Meta",
    92: "Meta",
    106: "*",
    107: "+",
    108: ",",
    109: "-",
    110: ".",
    111: "/",
    144: "NumLock",
    145: "ScrollLock",
    160: "Shift",
    161: "Shift",
    162: "Control",
    163: "Control",
    164: "Alt",
    165: "Alt",
    173: "-",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'"
  }, Qt = {
    48: ")",
    49: "!",
    50: "@",
    51: "#",
    52: "$",
    53: "%",
    54: "^",
    55: "&",
    56: "*",
    57: "(",
    59: ":",
    61: "+",
    173: "_",
    186: ":",
    187: "+",
    188: "<",
    189: "_",
    190: ">",
    191: "?",
    192: "~",
    219: "{",
    220: "|",
    221: "}",
    222: '"'
  }, ot = typeof navigator < "u" && /Chrome\/(\d+)/.exec(navigator.userAgent), ve = typeof navigator < "u" && /Apple Computer/.test(navigator.vendor), re = typeof navigator < "u" && /Gecko\/\d+/.test(navigator.userAgent), oe = typeof navigator < "u" && /Mac/.test(navigator.platform), ce = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent), Qe = ot && (oe || +ot[1] < 57) || re && oe, dt = 0; dt < 10; dt++)
    Ke[48 + dt] = Ke[96 + dt] = String(dt);
  for (var dt = 1; dt <= 24; dt++)
    Ke[dt + 111] = "F" + dt;
  for (var dt = 65; dt <= 90; dt++)
    Ke[dt] = String.fromCharCode(dt + 32), Qt[dt] = String.fromCharCode(dt);
  for (var ue in Ke)
    Qt.hasOwnProperty(ue) || (Qt[ue] = Ke[ue]);
  function ti(r) {
    var t = Qe && (r.ctrlKey || r.altKey || r.metaKey) || (ve || ce) && r.shiftKey && r.key && r.key.length == 1 || r.key == "Unidentified", e = !t && r.key || (r.shiftKey ? Qt : Ke)[r.keyCode] || r.key || "Unidentified";
    return e == "Esc" && (e = "Escape"), e == "Del" && (e = "Delete"), e == "Left" && (e = "ArrowLeft"), e == "Up" && (e = "ArrowUp"), e == "Right" && (e = "ArrowRight"), e == "Down" && (e = "ArrowDown"), e;
  }
  function Ce(r) {
    let t;
    return r.nodeType == 11 ? t = r.getSelection ? r : r.ownerDocument : t = r, t.getSelection();
  }
  function ne(r, t) {
    return t ? r == t || r.contains(t.nodeType != 1 ? t.parentNode : t) : !1;
  }
  function Ai() {
    let r = document.activeElement;
    for (; r && r.shadowRoot; )
      r = r.shadowRoot.activeElement;
    return r;
  }
  function ze(r, t) {
    if (!t.anchorNode)
      return !1;
    try {
      return ne(r, t.anchorNode);
    } catch {
      return !1;
    }
  }
  function Ne(r) {
    return r.nodeType == 3 ? Xi(r, 0, r.nodeValue.length).getClientRects() : r.nodeType == 1 ? r.getClientRects() : [];
  }
  function Ie(r, t, e, i) {
    return e ? vi(r, t, e, i, -1) || vi(r, t, e, i, 1) : !1;
  }
  function ei(r) {
    for (var t = 0; ; t++)
      if (r = r.previousSibling, !r)
        return t;
  }
  function vi(r, t, e, i, n) {
    for (; ; ) {
      if (r == e && t == i)
        return !0;
      if (t == (n < 0 ? 0 : ii(r))) {
        if (r.nodeName == "DIV")
          return !1;
        let s = r.parentNode;
        if (!s || s.nodeType != 1)
          return !1;
        t = ei(r) + (n < 0 ? 0 : 1), r = s;
      } else if (r.nodeType == 1) {
        if (r = r.childNodes[t + (n < 0 ? -1 : 0)], r.nodeType == 1 && r.contentEditable == "false")
          return !1;
        t = n < 0 ? ii(r) : 0;
      } else
        return !1;
    }
  }
  function ii(r) {
    return r.nodeType == 3 ? r.nodeValue.length : r.childNodes.length;
  }
  const Wi = { left: 0, right: 0, top: 0, bottom: 0 };
  function zt(r, t) {
    let e = t ? r.left : r.right;
    return { left: e, right: e, top: r.top, bottom: r.bottom };
  }
  function Br(r) {
    return {
      left: 0,
      right: r.innerWidth,
      top: 0,
      bottom: r.innerHeight
    };
  }
  function mn(r, t, e, i, n, s, o, a) {
    let l = r.ownerDocument, u = l.defaultView;
    for (let d = r; d; )
      if (d.nodeType == 1) {
        let O, m = d == l.body;
        if (m)
          O = Br(u);
        else {
          if (d.scrollHeight <= d.clientHeight && d.scrollWidth <= d.clientWidth) {
            d = d.parentNode;
            continue;
          }
          let C = d.getBoundingClientRect();
          O = {
            left: C.left,
            right: C.left + d.clientWidth,
            top: C.top,
            bottom: C.top + d.clientHeight
          };
        }
        let Q = 0, b = 0;
        if (n == "nearest")
          t.top < O.top ? (b = -(O.top - t.top + o), e > 0 && t.bottom > O.bottom + b && (b = t.bottom - O.bottom + b + o)) : t.bottom > O.bottom && (b = t.bottom - O.bottom + o, e < 0 && t.top - b < O.top && (b = -(O.top + b - t.top + o)));
        else {
          let C = t.bottom - t.top, A = O.bottom - O.top;
          b = (n == "center" && C <= A ? t.top + C / 2 - A / 2 : n == "start" || n == "center" && e < 0 ? t.top - o : t.bottom - A + o) - O.top;
        }
        if (i == "nearest" ? t.left < O.left ? (Q = -(O.left - t.left + s), e > 0 && t.right > O.right + Q && (Q = t.right - O.right + Q + s)) : t.right > O.right && (Q = t.right - O.right + s, e < 0 && t.left < O.left + Q && (Q = -(O.left + Q - t.left + s))) : Q = (i == "center" ? t.left + (t.right - t.left) / 2 - (O.right - O.left) / 2 : i == "start" == a ? t.left - s : t.right - (O.right - O.left) + s) - O.left, Q || b)
          if (m)
            u.scrollBy(Q, b);
          else {
            if (b) {
              let C = d.scrollTop;
              d.scrollTop += b, b = d.scrollTop - C;
            }
            if (Q) {
              let C = d.scrollLeft;
              d.scrollLeft += Q, Q = d.scrollLeft - C;
            }
            t = {
              left: t.left - Q,
              top: t.top - b,
              right: t.right - Q,
              bottom: t.bottom - b
            };
          }
        if (m)
          break;
        d = d.assignedSlot || d.parentNode, i = n = "nearest";
      } else if (d.nodeType == 11)
        d = d.host;
      else
        break;
  }
  class Yr {
    constructor() {
      this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
    }
    eq(t) {
      return this.anchorNode == t.anchorNode && this.anchorOffset == t.anchorOffset && this.focusNode == t.focusNode && this.focusOffset == t.focusOffset;
    }
    setRange(t) {
      this.set(t.anchorNode, t.anchorOffset, t.focusNode, t.focusOffset);
    }
    set(t, e, i, n) {
      this.anchorNode = t, this.anchorOffset = e, this.focusNode = i, this.focusOffset = n;
    }
  }
  let Qi = null;
  function Qr(r) {
    if (r.setActive)
      return r.setActive();
    if (Qi)
      return r.focus(Qi);
    let t = [];
    for (let e = r; e && (t.push(e, e.scrollTop, e.scrollLeft), e != e.ownerDocument); e = e.parentNode)
      ;
    if (r.focus(Qi == null ? {
      get preventScroll() {
        return Qi = { preventScroll: !0 }, !0;
      }
    } : void 0), !Qi) {
      Qi = !1;
      for (let e = 0; e < t.length; ) {
        let i = t[e++], n = t[e++], s = t[e++];
        i.scrollTop != n && (i.scrollTop = n), i.scrollLeft != s && (i.scrollLeft = s);
      }
    }
  }
  let gn;
  function Xi(r, t, e = t) {
    let i = gn || (gn = document.createRange());
    return i.setEnd(r, e), i.setStart(r, t), i;
  }
  function sr(r, t, e) {
    let i = { key: t, code: t, keyCode: e, which: e, cancelable: !0 }, n = new KeyboardEvent("keydown", i);
    n.synthetic = !0, r.dispatchEvent(n);
    let s = new KeyboardEvent("keyup", i);
    return s.synthetic = !0, r.dispatchEvent(s), n.defaultPrevented || s.defaultPrevented;
  }
  function Se(r) {
    for (; r; ) {
      if (r && (r.nodeType == 9 || r.nodeType == 11 && r.host))
        return r;
      r = r.assignedSlot || r.parentNode;
    }
    return null;
  }
  function zh(r) {
    for (; r.attributes.length; )
      r.removeAttributeNode(r.attributes[0]);
  }
  function Wp(r, t) {
    let e = t.focusNode, i = t.focusOffset;
    if (!e || t.anchorNode != e || t.anchorOffset != i)
      return !1;
    for (; ; )
      if (i) {
        if (e.nodeType != 1)
          return !1;
        let n = e.childNodes[i - 1];
        n.contentEditable == "false" ? i-- : (e = n, i = ii(e));
      } else {
        if (e == r)
          return !0;
        i = ei(e), e = e.parentNode;
      }
  }
  class fe {
    constructor(t, e, i = !0) {
      this.node = t, this.offset = e, this.precise = i;
    }
    static before(t, e) {
      return new fe(t.parentNode, ei(t), e);
    }
    static after(t, e) {
      return new fe(t.parentNode, ei(t) + 1, e);
    }
  }
  const Xa = [];
  class Mt {
    constructor() {
      this.parent = null, this.dom = null, this.dirty = 2;
    }
    get editorView() {
      if (!this.parent)
        throw new Error("Accessing view in orphan content view");
      return this.parent.editorView;
    }
    get overrideDOMText() {
      return null;
    }
    get posAtStart() {
      return this.parent ? this.parent.posBefore(this) : 0;
    }
    get posAtEnd() {
      return this.posAtStart + this.length;
    }
    posBefore(t) {
      let e = this.posAtStart;
      for (let i of this.children) {
        if (i == t)
          return e;
        e += i.length + i.breakAfter;
      }
      throw new RangeError("Invalid child in posBefore");
    }
    posAfter(t) {
      return this.posBefore(t) + t.length;
    }
    coordsAt(t, e) {
      return null;
    }
    sync(t) {
      if (this.dirty & 2) {
        let e = this.dom, i = null, n;
        for (let s of this.children) {
          if (s.dirty) {
            if (!s.dom && (n = i ? i.nextSibling : e.firstChild)) {
              let o = Mt.get(n);
              (!o || !o.parent && o.constructor == s.constructor) && s.reuseDOM(n);
            }
            s.sync(t), s.dirty = 0;
          }
          if (n = i ? i.nextSibling : e.firstChild, t && !t.written && t.node == e && n != s.dom && (t.written = !0), s.dom.parentNode == e)
            for (; n && n != s.dom; )
              n = Nh(n);
          else
            e.insertBefore(s.dom, n);
          i = s.dom;
        }
        for (n = i ? i.nextSibling : e.firstChild, n && t && t.node == e && (t.written = !0); n; )
          n = Nh(n);
      } else if (this.dirty & 1)
        for (let e of this.children)
          e.dirty && (e.sync(t), e.dirty = 0);
    }
    reuseDOM(t) {
    }
    localPosFromDOM(t, e) {
      let i;
      if (t == this.dom)
        i = this.dom.childNodes[e];
      else {
        let n = ii(t) == 0 ? 0 : e == 0 ? -1 : 1;
        for (; ; ) {
          let s = t.parentNode;
          if (s == this.dom)
            break;
          n == 0 && s.firstChild != s.lastChild && (t == s.firstChild ? n = -1 : n = 1), t = s;
        }
        n < 0 ? i = t : i = t.nextSibling;
      }
      if (i == this.dom.firstChild)
        return 0;
      for (; i && !Mt.get(i); )
        i = i.nextSibling;
      if (!i)
        return this.length;
      for (let n = 0, s = 0; ; n++) {
        let o = this.children[n];
        if (o.dom == i)
          return s;
        s += o.length + o.breakAfter;
      }
    }
    domBoundsAround(t, e, i = 0) {
      let n = -1, s = -1, o = -1, a = -1;
      for (let l = 0, u = i, d = i; l < this.children.length; l++) {
        let O = this.children[l], m = u + O.length;
        if (u < t && m > e)
          return O.domBoundsAround(t, e, u);
        if (m >= t && n == -1 && (n = l, s = u), u > e && O.dom.parentNode == this.dom) {
          o = l, a = d;
          break;
        }
        d = m, u = m + O.breakAfter;
      }
      return {
        from: s,
        to: a < 0 ? i + this.length : a,
        startDOM: (n ? this.children[n - 1].dom.nextSibling : null) || this.dom.firstChild,
        endDOM: o < this.children.length && o >= 0 ? this.children[o].dom : null
      };
    }
    markDirty(t = !1) {
      this.dirty |= 2, this.markParentsDirty(t);
    }
    markParentsDirty(t) {
      for (let e = this.parent; e; e = e.parent) {
        if (t && (e.dirty |= 2), e.dirty & 1)
          return;
        e.dirty |= 1, t = !1;
      }
    }
    setParent(t) {
      this.parent != t && (this.parent = t, this.dirty && this.markParentsDirty(!0));
    }
    setDOM(t) {
      this.dom && (this.dom.cmView = null), this.dom = t, t.cmView = this;
    }
    get rootView() {
      for (let t = this; ; ) {
        let e = t.parent;
        if (!e)
          return t;
        t = e;
      }
    }
    replaceChildren(t, e, i = Xa) {
      this.markDirty();
      for (let n = t; n < e; n++) {
        let s = this.children[n];
        s.parent == this && s.destroy();
      }
      this.children.splice(t, e - t, ...i);
      for (let n = 0; n < i.length; n++)
        i[n].setParent(this);
    }
    ignoreMutation(t) {
      return !1;
    }
    ignoreEvent(t) {
      return !1;
    }
    childCursor(t = this.length) {
      return new Ih(this.children, t, this.children.length);
    }
    childPos(t, e = 1) {
      return this.childCursor().findPos(t, e);
    }
    toString() {
      let t = this.constructor.name.replace("View", "");
      return t + (this.children.length ? "(" + this.children.join() + ")" : this.length ? "[" + (t == "Text" ? this.text : this.length) + "]" : "") + (this.breakAfter ? "#" : "");
    }
    static get(t) {
      return t.cmView;
    }
    get isEditable() {
      return !0;
    }
    merge(t, e, i, n, s, o) {
      return !1;
    }
    become(t) {
      return !1;
    }
    getSide() {
      return 0;
    }
    destroy() {
      this.parent = null;
    }
  }
  Mt.prototype.breakAfter = 0;
  function Nh(r) {
    let t = r.nextSibling;
    return r.parentNode.removeChild(r), t;
  }
  class Ih {
    constructor(t, e, i) {
      this.children = t, this.pos = e, this.i = i, this.off = 0;
    }
    findPos(t, e = 1) {
      for (; ; ) {
        if (t > this.pos || t == this.pos && (e > 0 || this.i == 0 || this.children[this.i - 1].breakAfter))
          return this.off = t - this.pos, this;
        let i = this.children[--this.i];
        this.pos -= i.length + i.breakAfter;
      }
    }
  }
  function Gh(r, t, e, i, n, s, o, a, l) {
    let { children: u } = r, d = u.length ? u[t] : null, O = s.length ? s[s.length - 1] : null, m = O ? O.breakAfter : o;
    if (!(t == i && d && !o && !m && s.length < 2 && d.merge(e, n, s.length ? O : null, e == 0, a, l))) {
      if (i < u.length) {
        let Q = u[i];
        Q && n < Q.length ? (t == i && (Q = Q.split(n), n = 0), !m && O && Q.merge(0, n, O, !0, 0, l) ? s[s.length - 1] = Q : (n && Q.merge(0, n, null, !1, 0, l), s.push(Q))) : Q != null && Q.breakAfter && (O ? O.breakAfter = 1 : o = 1), i++;
      }
      for (d && (d.breakAfter = o, e > 0 && (!o && s.length && d.merge(e, d.length, s[0], !1, a, 0) ? d.breakAfter = s.shift().breakAfter : (e < d.length || d.children.length && d.children[d.children.length - 1].length == 0) && d.merge(e, d.length, null, !1, a, 0), t++)); t < i && s.length; )
        if (u[i - 1].become(s[s.length - 1]))
          i--, s.pop(), l = s.length ? 0 : a;
        else if (u[t].become(s[0]))
          t++, s.shift(), a = s.length ? 0 : l;
        else
          break;
      !s.length && t && i < u.length && !u[t - 1].breakAfter && u[i].merge(0, 0, u[t - 1], !1, a, l) && t--, (t < i || s.length) && r.replaceChildren(t, i, s);
    }
  }
  function Vh(r, t, e, i, n, s) {
    let o = r.childCursor(), { i: a, off: l } = o.findPos(e, 1), { i: u, off: d } = o.findPos(t, -1), O = t - e;
    for (let m of i)
      O += m.length;
    r.length += O, Gh(r, u, d, a, l, i, 0, n, s);
  }
  let Ge = typeof navigator < "u" ? navigator : { userAgent: "", vendor: "", platform: "" }, qa = typeof document < "u" ? document : { documentElement: { style: {} } };
  const Ma = /* @__PURE__ */ /Edge\/(\d+)/.exec(Ge.userAgent), Lh = /* @__PURE__ */ /MSIE \d/.test(Ge.userAgent), Da = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Ge.userAgent), Ys = !!(Lh || Da || Ma), Uh = !Ys && /* @__PURE__ */ /gecko\/(\d+)/i.test(Ge.userAgent), Ea = !Ys && /* @__PURE__ */ /Chrome\/(\d+)/.exec(Ge.userAgent), Bh = "webkitFontSmoothing" in qa.documentElement.style, Yh = !Ys && /* @__PURE__ */ /Apple Computer/.test(Ge.vendor), Fh = Yh && (/* @__PURE__ */ /Mobile\/\w+/.test(Ge.userAgent) || Ge.maxTouchPoints > 2);
  var B = {
    mac: Fh || /* @__PURE__ */ /Mac/.test(Ge.platform),
    windows: /* @__PURE__ */ /Win/.test(Ge.platform),
    linux: /* @__PURE__ */ /Linux|X11/.test(Ge.platform),
    ie: Ys,
    ie_version: Lh ? qa.documentMode || 6 : Da ? +Da[1] : Ma ? +Ma[1] : 0,
    gecko: Uh,
    gecko_version: Uh ? +(/* @__PURE__ */ /Firefox\/(\d+)/.exec(Ge.userAgent) || [0, 0])[1] : 0,
    chrome: !!Ea,
    chrome_version: Ea ? +Ea[1] : 0,
    ios: Fh,
    android: /* @__PURE__ */ /Android\b/.test(Ge.userAgent),
    webkit: Bh,
    safari: Yh,
    webkit_version: Bh ? +(/* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0,
    tabSize: qa.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
  };
  const Xp = 256;
  class yr extends Mt {
    constructor(t) {
      super(), this.text = t;
    }
    get length() {
      return this.text.length;
    }
    createDOM(t) {
      this.setDOM(t || document.createTextNode(this.text));
    }
    sync(t) {
      this.dom || this.createDOM(), this.dom.nodeValue != this.text && (t && t.node == this.dom && (t.written = !0), this.dom.nodeValue = this.text);
    }
    reuseDOM(t) {
      t.nodeType == 3 && this.createDOM(t);
    }
    merge(t, e, i) {
      return i && (!(i instanceof yr) || this.length - (e - t) + i.length > Xp) ? !1 : (this.text = this.text.slice(0, t) + (i ? i.text : "") + this.text.slice(e), this.markDirty(), !0);
    }
    split(t) {
      let e = new yr(this.text.slice(t));
      return this.text = this.text.slice(0, t), this.markDirty(), e;
    }
    localPosFromDOM(t, e) {
      return t == this.dom ? e : e ? this.text.length : 0;
    }
    domAtPos(t) {
      return new fe(this.dom, t);
    }
    domBoundsAround(t, e, i) {
      return { from: i, to: i + this.length, startDOM: this.dom, endDOM: this.dom.nextSibling };
    }
    coordsAt(t, e) {
      return Za(this.dom, t, e);
    }
  }
  class qi extends Mt {
    constructor(t, e = [], i = 0) {
      super(), this.mark = t, this.children = e, this.length = i;
      for (let n of e)
        n.setParent(this);
    }
    setAttrs(t) {
      if (zh(t), this.mark.class && (t.className = this.mark.class), this.mark.attrs)
        for (let e in this.mark.attrs)
          t.setAttribute(e, this.mark.attrs[e]);
      return t;
    }
    reuseDOM(t) {
      t.nodeName == this.mark.tagName.toUpperCase() && (this.setDOM(t), this.dirty |= 6);
    }
    sync(t) {
      this.dom ? this.dirty & 4 && this.setAttrs(this.dom) : this.setDOM(this.setAttrs(document.createElement(this.mark.tagName))), super.sync(t);
    }
    merge(t, e, i, n, s, o) {
      return i && (!(i instanceof qi && i.mark.eq(this.mark)) || t && s <= 0 || e < this.length && o <= 0) ? !1 : (Vh(this, t, e, i ? i.children : [], s - 1, o - 1), this.markDirty(), !0);
    }
    split(t) {
      let e = [], i = 0, n = -1, s = 0;
      for (let a of this.children) {
        let l = i + a.length;
        l > t && e.push(i < t ? a.split(t - i) : a), n < 0 && i >= t && (n = s), i = l, s++;
      }
      let o = this.length - t;
      return this.length = t, n > -1 && (this.children.length = n, this.markDirty()), new qi(this.mark, e, o);
    }
    domAtPos(t) {
      return Kh(this.dom, this.children, t);
    }
    coordsAt(t, e) {
      return ec(this, t, e);
    }
  }
  function Za(r, t, e) {
    let i = r.nodeValue.length;
    t > i && (t = i);
    let n = t, s = t, o = 0;
    t == 0 && e < 0 || t == i && e >= 0 ? B.chrome || B.gecko || (t ? (n--, o = 1) : s < i && (s++, o = -1)) : e < 0 ? n-- : s < i && s++;
    let a = Xi(r, n, s).getClientRects();
    if (!a.length)
      return Wi;
    let l = a[(o ? o < 0 : e >= 0) ? 0 : a.length - 1];
    return B.safari && !o && l.width == 0 && (l = Array.prototype.find.call(a, (u) => u.width) || l), o ? zt(l, o < 0) : l || null;
  }
  class br extends Mt {
    constructor(t, e, i) {
      super(), this.widget = t, this.length = e, this.side = i, this.prevWidget = null;
    }
    static create(t, e, i) {
      return new (t.customView || br)(t, e, i);
    }
    split(t) {
      let e = br.create(this.widget, this.length - t, this.side);
      return this.length -= t, e;
    }
    sync() {
      (!this.dom || !this.widget.updateDOM(this.dom)) && (this.dom && this.prevWidget && this.prevWidget.destroy(this.dom), this.prevWidget = null, this.setDOM(this.widget.toDOM(this.editorView)), this.dom.contentEditable = "false");
    }
    getSide() {
      return this.side;
    }
    merge(t, e, i, n, s, o) {
      return i && (!(i instanceof br) || !this.widget.compare(i.widget) || t > 0 && s <= 0 || e < this.length && o <= 0) ? !1 : (this.length = t + (i ? i.length : 0) + (this.length - e), !0);
    }
    become(t) {
      return t.length == this.length && t instanceof br && t.side == this.side && this.widget.constructor == t.widget.constructor ? (this.widget.eq(t.widget) || this.markDirty(!0), this.dom && !this.prevWidget && (this.prevWidget = this.widget), this.widget = t.widget, !0) : !1;
    }
    ignoreMutation() {
      return !0;
    }
    ignoreEvent(t) {
      return this.widget.ignoreEvent(t);
    }
    get overrideDOMText() {
      if (this.length == 0)
        return c.empty;
      let t = this;
      for (; t.parent; )
        t = t.parent;
      let e = t.editorView, i = e && e.state.doc, n = this.posAtStart;
      return i ? i.slice(n, n + this.length) : c.empty;
    }
    domAtPos(t) {
      return t == 0 ? fe.before(this.dom) : fe.after(this.dom, t == this.length);
    }
    domBoundsAround() {
      return null;
    }
    coordsAt(t, e) {
      let i = this.dom.getClientRects(), n = null;
      if (!i.length)
        return Wi;
      for (let s = t > 0 ? i.length - 1 : 0; n = i[s], !(t > 0 ? s == 0 : s == i.length - 1 || n.top < n.bottom); s += t > 0 ? -1 : 1)
        ;
      return t == 0 && e > 0 || t == this.length && e <= 0 ? n : zt(n, t == 0);
    }
    get isEditable() {
      return !1;
    }
    destroy() {
      super.destroy(), this.dom && this.widget.destroy(this.dom);
    }
  }
  class Hh extends br {
    domAtPos(t) {
      let { topView: e, text: i } = this.widget;
      return e ? ja(t, 0, e, i, (n, s) => n.domAtPos(s), (n) => new fe(i, Math.min(n, i.nodeValue.length))) : new fe(i, Math.min(t, i.nodeValue.length));
    }
    sync() {
      this.setDOM(this.widget.toDOM());
    }
    localPosFromDOM(t, e) {
      let { topView: i, text: n } = this.widget;
      return i ? Jh(t, e, i, n) : Math.min(e, this.length);
    }
    ignoreMutation() {
      return !1;
    }
    get overrideDOMText() {
      return null;
    }
    coordsAt(t, e) {
      let { topView: i, text: n } = this.widget;
      return i ? ja(t, e, i, n, (s, o, a) => s.coordsAt(o, a), (s, o) => Za(n, s, o)) : Za(n, t, e);
    }
    destroy() {
      var t;
      super.destroy(), (t = this.widget.topView) === null || t === void 0 || t.destroy();
    }
    get isEditable() {
      return !0;
    }
  }
  function ja(r, t, e, i, n, s) {
    if (e instanceof qi) {
      for (let o of e.children) {
        let a = ne(o.dom, i), l = a ? i.nodeValue.length : o.length;
        if (r < l || r == l && o.getSide() <= 0)
          return a ? ja(r, t, o, i, n, s) : n(o, r, t);
        r -= l;
      }
      return n(e, e.length, -1);
    } else
      return e.dom == i ? s(r, t) : n(e, r, t);
  }
  function Jh(r, t, e, i) {
    if (e instanceof qi)
      for (let n of e.children) {
        let s = 0, o = ne(n.dom, i);
        if (ne(n.dom, r))
          return s + (o ? Jh(r, t, n, i) : n.localPosFromDOM(r, t));
        s += o ? i.nodeValue.length : n.length;
      }
    else if (e.dom == i)
      return Math.min(t, i.nodeValue.length);
    return e.localPosFromDOM(r, t);
  }
  class vn extends Mt {
    constructor(t) {
      super(), this.side = t;
    }
    get length() {
      return 0;
    }
    merge() {
      return !1;
    }
    become(t) {
      return t instanceof vn && t.side == this.side;
    }
    split() {
      return new vn(this.side);
    }
    sync() {
      if (!this.dom) {
        let t = document.createElement("img");
        t.className = "cm-widgetBuffer", t.setAttribute("aria-hidden", "true"), this.setDOM(t);
      }
    }
    getSide() {
      return this.side;
    }
    domAtPos(t) {
      return fe.before(this.dom);
    }
    localPosFromDOM() {
      return 0;
    }
    domBoundsAround() {
      return null;
    }
    coordsAt(t) {
      let e = this.dom.getBoundingClientRect(), i = qp(this, this.side > 0 ? -1 : 1);
      return i && i.top < e.bottom && i.bottom > e.top ? { left: e.left, right: e.right, top: i.top, bottom: i.bottom } : e;
    }
    get overrideDOMText() {
      return c.empty;
    }
  }
  yr.prototype.children = br.prototype.children = vn.prototype.children = Xa;
  function qp(r, t) {
    let e = r.parent, i = e ? e.children.indexOf(r) : -1;
    for (; e && i >= 0; )
      if (t < 0 ? i > 0 : i < e.children.length) {
        let n = e.children[i + t];
        if (n instanceof yr) {
          let s = n.coordsAt(t < 0 ? n.length : 0, t);
          if (s)
            return s;
        }
        i += t;
      } else if (e instanceof qi && e.parent)
        i = e.parent.children.indexOf(e) + (t < 0 ? 0 : 1), e = e.parent;
      else {
        let n = e.dom.lastChild;
        if (n && n.nodeName == "BR")
          return n.getClientRects()[0];
        break;
      }
  }
  function Kh(r, t, e) {
    let i = 0;
    for (let n = 0; i < t.length; i++) {
      let s = t[i], o = n + s.length;
      if (!(o == n && s.getSide() <= 0)) {
        if (e > n && e < o && s.dom.parentNode == r)
          return s.domAtPos(e - n);
        if (e <= n)
          break;
        n = o;
      }
    }
    for (; i > 0; i--) {
      let n = t[i - 1].dom;
      if (n.parentNode == r)
        return fe.after(n);
    }
    return new fe(r, 0);
  }
  function tc(r, t, e) {
    let i, { children: n } = r;
    e > 0 && t instanceof qi && n.length && (i = n[n.length - 1]) instanceof qi && i.mark.eq(t.mark) ? tc(i, t.children[0], e - 1) : (n.push(t), t.setParent(r)), r.length += t.length;
  }
  function ec(r, t, e) {
    for (let s = 0, o = 0; o < r.children.length; o++) {
      let a = r.children[o], l = s + a.length, u;
      if ((e <= 0 || l == r.length || a.getSide() > 0 ? l >= t : l > t) && (t < l || o + 1 == r.children.length || (u = r.children[o + 1]).length || u.getSide() > 0)) {
        let d = 0;
        if (l == s) {
          if (a.getSide() <= 0)
            continue;
          d = e = -a.getSide();
        }
        let O = a.coordsAt(Math.max(0, t - s), e);
        return d && O ? zt(O, e < 0) : O;
      }
      s = l;
    }
    let i = r.dom.lastChild;
    if (!i)
      return r.dom.getBoundingClientRect();
    let n = Ne(i);
    return n[n.length - 1] || null;
  }
  function za(r, t) {
    for (let e in r)
      e == "class" && t.class ? t.class += " " + r.class : e == "style" && t.style ? t.style += ";" + r.style : t[e] = r[e];
    return t;
  }
  function Na(r, t) {
    if (r == t)
      return !0;
    if (!r || !t)
      return !1;
    let e = Object.keys(r), i = Object.keys(t);
    if (e.length != i.length)
      return !1;
    for (let n of e)
      if (i.indexOf(n) == -1 || r[n] !== t[n])
        return !1;
    return !0;
  }
  function Ia(r, t, e) {
    let i = null;
    if (t)
      for (let n in t)
        e && n in e || r.removeAttribute(i = n);
    if (e)
      for (let n in e)
        t && t[n] == e[n] || r.setAttribute(i = n, e[n]);
    return !!i;
  }
  class wr {
    eq(t) {
      return !1;
    }
    updateDOM(t) {
      return !1;
    }
    compare(t) {
      return this == t || this.constructor == t.constructor && this.eq(t);
    }
    get estimatedHeight() {
      return -1;
    }
    ignoreEvent(t) {
      return !0;
    }
    get customView() {
      return null;
    }
    destroy(t) {
    }
  }
  var Wt = /* @__PURE__ */ function(r) {
    return r[r.Text = 0] = "Text", r[r.WidgetBefore = 1] = "WidgetBefore", r[r.WidgetAfter = 2] = "WidgetAfter", r[r.WidgetRange = 3] = "WidgetRange", r;
  }(Wt || (Wt = {}));
  class it extends Ee {
    constructor(t, e, i, n) {
      super(), this.startSide = t, this.endSide = e, this.widget = i, this.spec = n;
    }
    get heightRelevant() {
      return !1;
    }
    static mark(t) {
      return new Fs(t);
    }
    static widget(t) {
      let e = t.side || 0, i = !!t.block;
      return e += i ? e > 0 ? 3e8 : -4e8 : e > 0 ? 1e8 : -1e8, new Fr(t, e, e, i, t.widget || null, !1);
    }
    static replace(t) {
      let e = !!t.block, i, n;
      if (t.isBlockGap)
        i = -5e8, n = 4e8;
      else {
        let { start: s, end: o } = ic(t, e);
        i = (s ? e ? -3e8 : -1 : 5e8) - 1, n = (o ? e ? 2e8 : 1 : -6e8) + 1;
      }
      return new Fr(t, i, n, e, t.widget || null, !0);
    }
    static line(t) {
      return new Jn(t);
    }
    static set(t, e = !1) {
      return rt.of(t, e);
    }
    hasHeight() {
      return this.widget ? this.widget.estimatedHeight > -1 : !1;
    }
  }
  it.none = rt.empty;
  class Fs extends it {
    constructor(t) {
      let { start: e, end: i } = ic(t);
      super(e ? -1 : 5e8, i ? 1 : -6e8, null, t), this.tagName = t.tagName || "span", this.class = t.class || "", this.attrs = t.attributes || null;
    }
    eq(t) {
      return this == t || t instanceof Fs && this.tagName == t.tagName && this.class == t.class && Na(this.attrs, t.attrs);
    }
    range(t, e = t) {
      if (t >= e)
        throw new RangeError("Mark decorations may not be empty");
      return super.range(t, e);
    }
  }
  Fs.prototype.point = !1;
  class Jn extends it {
    constructor(t) {
      super(-2e8, -2e8, null, t);
    }
    eq(t) {
      return t instanceof Jn && Na(this.spec.attributes, t.spec.attributes);
    }
    range(t, e = t) {
      if (e != t)
        throw new RangeError("Line decoration ranges must be zero-length");
      return super.range(t, e);
    }
  }
  Jn.prototype.mapMode = nt.TrackBefore, Jn.prototype.point = !0;
  class Fr extends it {
    constructor(t, e, i, n, s, o) {
      super(e, i, s, t), this.block = n, this.isReplace = o, this.mapMode = n ? e <= 0 ? nt.TrackBefore : nt.TrackAfter : nt.TrackDel;
    }
    get type() {
      return this.startSide < this.endSide ? Wt.WidgetRange : this.startSide <= 0 ? Wt.WidgetBefore : Wt.WidgetAfter;
    }
    get heightRelevant() {
      return this.block || !!this.widget && this.widget.estimatedHeight >= 5;
    }
    eq(t) {
      return t instanceof Fr && Mp(this.widget, t.widget) && this.block == t.block && this.startSide == t.startSide && this.endSide == t.endSide;
    }
    range(t, e = t) {
      if (this.isReplace && (t > e || t == e && this.startSide > 0 && this.endSide <= 0))
        throw new RangeError("Invalid range for replacement decoration");
      if (!this.isReplace && e != t)
        throw new RangeError("Widget decorations can only have zero-length ranges");
      return super.range(t, e);
    }
  }
  Fr.prototype.point = !0;
  function ic(r, t = !1) {
    let { inclusiveStart: e, inclusiveEnd: i } = r;
    return e == null && (e = r.inclusive), i == null && (i = r.inclusive), { start: e ?? t, end: i ?? t };
  }
  function Mp(r, t) {
    return r == t || !!(r && t && r.compare(t));
  }
  function Ga(r, t, e, i = 0) {
    let n = e.length - 1;
    n >= 0 && e[n] + i >= r ? e[n] = Math.max(e[n], t) : e.push(r, t);
  }
  class ke extends Mt {
    constructor() {
      super(...arguments), this.children = [], this.length = 0, this.prevAttrs = void 0, this.attrs = null, this.breakAfter = 0;
    }
    merge(t, e, i, n, s, o) {
      if (i) {
        if (!(i instanceof ke))
          return !1;
        this.dom || i.transferDOM(this);
      }
      return n && this.setDeco(i ? i.attrs : null), Vh(this, t, e, i ? i.children : [], s, o), !0;
    }
    split(t) {
      let e = new ke();
      if (e.breakAfter = this.breakAfter, this.length == 0)
        return e;
      let { i, off: n } = this.childPos(t);
      n && (e.append(this.children[i].split(n), 0), this.children[i].merge(n, this.children[i].length, null, !1, 0, 0), i++);
      for (let s = i; s < this.children.length; s++)
        e.append(this.children[s], 0);
      for (; i > 0 && this.children[i - 1].length == 0; )
        this.children[--i].destroy();
      return this.children.length = i, this.markDirty(), this.length = t, e;
    }
    transferDOM(t) {
      !this.dom || (this.markDirty(), t.setDOM(this.dom), t.prevAttrs = this.prevAttrs === void 0 ? this.attrs : this.prevAttrs, this.prevAttrs = void 0, this.dom = null);
    }
    setDeco(t) {
      Na(this.attrs, t) || (this.dom && (this.prevAttrs = this.attrs, this.markDirty()), this.attrs = t);
    }
    append(t, e) {
      tc(this, t, e);
    }
    addLineDeco(t) {
      let e = t.spec.attributes, i = t.spec.class;
      e && (this.attrs = za(e, this.attrs || {})), i && (this.attrs = za({ class: i }, this.attrs || {}));
    }
    domAtPos(t) {
      return Kh(this.dom, this.children, t);
    }
    reuseDOM(t) {
      t.nodeName == "DIV" && (this.setDOM(t), this.dirty |= 6);
    }
    sync(t) {
      var e;
      this.dom ? this.dirty & 4 && (zh(this.dom), this.dom.className = "cm-line", this.prevAttrs = this.attrs ? null : void 0) : (this.setDOM(document.createElement("div")), this.dom.className = "cm-line", this.prevAttrs = this.attrs ? null : void 0), this.prevAttrs !== void 0 && (Ia(this.dom, this.prevAttrs, this.attrs), this.dom.classList.add("cm-line"), this.prevAttrs = void 0), super.sync(t);
      let i = this.dom.lastChild;
      for (; i && Mt.get(i) instanceof qi; )
        i = i.lastChild;
      if (!i || !this.length || i.nodeName != "BR" && ((e = Mt.get(i)) === null || e === void 0 ? void 0 : e.isEditable) == !1 && (!B.ios || !this.children.some((n) => n instanceof yr))) {
        let n = document.createElement("BR");
        n.cmIgnore = !0, this.dom.appendChild(n);
      }
    }
    measureTextSize() {
      if (this.children.length == 0 || this.length > 20)
        return null;
      let t = 0;
      for (let e of this.children) {
        if (!(e instanceof yr))
          return null;
        let i = Ne(e.dom);
        if (i.length != 1)
          return null;
        t += i[0].width;
      }
      return {
        lineHeight: this.dom.getBoundingClientRect().height,
        charWidth: t / this.length
      };
    }
    coordsAt(t, e) {
      return ec(this, t, e);
    }
    become(t) {
      return !1;
    }
    get type() {
      return Wt.Text;
    }
    static find(t, e) {
      for (let i = 0, n = 0; i < t.children.length; i++) {
        let s = t.children[i], o = n + s.length;
        if (o >= e) {
          if (s instanceof ke)
            return s;
          if (o > e)
            break;
        }
        n = o + s.breakAfter;
      }
      return null;
    }
  }
  class Hr extends Mt {
    constructor(t, e, i) {
      super(), this.widget = t, this.length = e, this.type = i, this.breakAfter = 0, this.prevWidget = null;
    }
    merge(t, e, i, n, s, o) {
      return i && (!(i instanceof Hr) || !this.widget.compare(i.widget) || t > 0 && s <= 0 || e < this.length && o <= 0) ? !1 : (this.length = t + (i ? i.length : 0) + (this.length - e), !0);
    }
    domAtPos(t) {
      return t == 0 ? fe.before(this.dom) : fe.after(this.dom, t == this.length);
    }
    split(t) {
      let e = this.length - t;
      this.length = t;
      let i = new Hr(this.widget, e, this.type);
      return i.breakAfter = this.breakAfter, i;
    }
    get children() {
      return Xa;
    }
    sync() {
      (!this.dom || !this.widget.updateDOM(this.dom)) && (this.dom && this.prevWidget && this.prevWidget.destroy(this.dom), this.prevWidget = null, this.setDOM(this.widget.toDOM(this.editorView)), this.dom.contentEditable = "false");
    }
    get overrideDOMText() {
      return this.parent ? this.parent.view.state.doc.slice(this.posAtStart, this.posAtEnd) : c.empty;
    }
    domBoundsAround() {
      return null;
    }
    become(t) {
      return t instanceof Hr && t.type == this.type && t.widget.constructor == this.widget.constructor ? (t.widget.eq(this.widget) || this.markDirty(!0), this.dom && !this.prevWidget && (this.prevWidget = this.widget), this.widget = t.widget, this.length = t.length, this.breakAfter = t.breakAfter, !0) : !1;
    }
    ignoreMutation() {
      return !0;
    }
    ignoreEvent(t) {
      return this.widget.ignoreEvent(t);
    }
    destroy() {
      super.destroy(), this.dom && this.widget.destroy(this.dom);
    }
  }
  class Va {
    constructor(t, e, i, n) {
      this.doc = t, this.pos = e, this.end = i, this.disallowBlockEffectsFor = n, this.content = [], this.curLine = null, this.breakAtStart = 0, this.pendingBuffer = 0, this.atCursorPos = !0, this.openStart = -1, this.openEnd = -1, this.text = "", this.textOff = 0, this.cursor = t.iter(), this.skip = e;
    }
    posCovered() {
      if (this.content.length == 0)
        return !this.breakAtStart && this.doc.lineAt(this.pos).from != this.pos;
      let t = this.content[this.content.length - 1];
      return !t.breakAfter && !(t instanceof Hr && t.type == Wt.WidgetBefore);
    }
    getLine() {
      return this.curLine || (this.content.push(this.curLine = new ke()), this.atCursorPos = !0), this.curLine;
    }
    flushBuffer(t) {
      this.pendingBuffer && (this.curLine.append(Hs(new vn(-1), t), t.length), this.pendingBuffer = 0);
    }
    addBlockWidget(t) {
      this.flushBuffer([]), this.curLine = null, this.content.push(t);
    }
    finish(t) {
      t ? this.pendingBuffer = 0 : this.flushBuffer([]), this.posCovered() || this.getLine();
    }
    buildText(t, e, i) {
      for (; t > 0; ) {
        if (this.textOff == this.text.length) {
          let { value: s, lineBreak: o, done: a } = this.cursor.next(this.skip);
          if (this.skip = 0, a)
            throw new Error("Ran out of text content when drawing inline views");
          if (o) {
            this.posCovered() || this.getLine(), this.content.length ? this.content[this.content.length - 1].breakAfter = 1 : this.breakAtStart = 1, this.flushBuffer([]), this.curLine = null, t--;
            continue;
          } else
            this.text = s, this.textOff = 0;
        }
        let n = Math.min(this.text.length - this.textOff, t, 512);
        this.flushBuffer(e.slice(0, i)), this.getLine().append(Hs(new yr(this.text.slice(this.textOff, this.textOff + n)), e), i), this.atCursorPos = !0, this.textOff += n, t -= n, i = 0;
      }
    }
    span(t, e, i, n) {
      this.buildText(e - t, i, n), this.pos = e, this.openStart < 0 && (this.openStart = n);
    }
    point(t, e, i, n, s, o) {
      if (this.disallowBlockEffectsFor[o] && i instanceof Fr) {
        if (i.block)
          throw new RangeError("Block decorations may not be specified via plugins");
        if (e > this.doc.lineAt(this.pos).to)
          throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
      }
      let a = e - t;
      if (i instanceof Fr)
        if (i.block) {
          let { type: l } = i;
          l == Wt.WidgetAfter && !this.posCovered() && this.getLine(), this.addBlockWidget(new Hr(i.widget || new rc("div"), a, l));
        } else {
          let l = br.create(i.widget || new rc("span"), a, i.startSide), u = this.atCursorPos && !l.isEditable && s <= n.length && (t < e || i.startSide > 0), d = !l.isEditable && (t < e || i.startSide <= 0), O = this.getLine();
          this.pendingBuffer == 2 && !u && (this.pendingBuffer = 0), this.flushBuffer(n), u && (O.append(Hs(new vn(1), n), s), s = n.length + Math.max(0, s - n.length)), O.append(Hs(l, n), s), this.atCursorPos = d, this.pendingBuffer = d ? t < e ? 1 : 2 : 0;
        }
      else
        this.doc.lineAt(this.pos).from == this.pos && this.getLine().addLineDeco(i);
      a && (this.textOff + a <= this.text.length ? this.textOff += a : (this.skip += a - (this.text.length - this.textOff), this.text = "", this.textOff = 0), this.pos = e), this.openStart < 0 && (this.openStart = s);
    }
    static build(t, e, i, n, s) {
      let o = new Va(t, e, i, s);
      return o.openEnd = rt.spans(n, e, i, o), o.openStart < 0 && (o.openStart = o.openEnd), o.finish(o.openEnd), o;
    }
  }
  function Hs(r, t) {
    for (let e of t)
      r = new qi(e, [r], r.length);
    return r;
  }
  class rc extends wr {
    constructor(t) {
      super(), this.tag = t;
    }
    eq(t) {
      return t.tag == this.tag;
    }
    toDOM() {
      return document.createElement(this.tag);
    }
    updateDOM(t) {
      return t.nodeName.toLowerCase() == this.tag;
    }
  }
  const nc = /* @__PURE__ */ V.define(), sc = /* @__PURE__ */ V.define(), oc = /* @__PURE__ */ V.define(), ac = /* @__PURE__ */ V.define(), La = /* @__PURE__ */ V.define(), lc = /* @__PURE__ */ V.define(), hc = /* @__PURE__ */ V.define({
    combine: (r) => r.some((t) => t)
  });
  class Js {
    constructor(t, e = "nearest", i = "nearest", n = 5, s = 5) {
      this.range = t, this.y = e, this.x = i, this.yMargin = n, this.xMargin = s;
    }
    map(t) {
      return t.empty ? this : new Js(this.range.map(t), this.y, this.x, this.yMargin, this.xMargin);
    }
  }
  const cc = /* @__PURE__ */ ct.define({ map: (r, t) => r.map(t) });
  function yi(r, t, e) {
    let i = r.facet(ac);
    i.length ? i[0](t) : window.onerror ? window.onerror(String(t), e, void 0, void 0, t) : e ? console.error(e + ":", t) : console.error(t);
  }
  const Ks = /* @__PURE__ */ V.define({ combine: (r) => r.length ? r[0] : !0 });
  let Dp = 0;
  const Kn = /* @__PURE__ */ V.define();
  class ye {
    constructor(t, e, i, n) {
      this.id = t, this.create = e, this.domEventHandlers = i, this.extension = n(this);
    }
    static define(t, e) {
      const { eventHandlers: i, provide: n, decorations: s } = e || {};
      return new ye(Dp++, t, i, (o) => {
        let a = [Kn.of(o)];
        return s && a.push(ts.of((l) => {
          let u = l.plugin(o);
          return u ? s(u) : it.none;
        })), n && a.push(n(o)), a;
      });
    }
    static fromClass(t, e) {
      return ye.define((i) => new t(i), e);
    }
  }
  class Ua {
    constructor(t) {
      this.spec = t, this.mustUpdate = null, this.value = null;
    }
    update(t) {
      if (this.value) {
        if (this.mustUpdate) {
          let e = this.mustUpdate;
          if (this.mustUpdate = null, this.value.update)
            try {
              this.value.update(e);
            } catch (i) {
              if (yi(e.state, i, "CodeMirror plugin crashed"), this.value.destroy)
                try {
                  this.value.destroy();
                } catch {
                }
              this.deactivate();
            }
        }
      } else if (this.spec)
        try {
          this.value = this.spec.create(t);
        } catch (e) {
          yi(t.state, e, "CodeMirror plugin crashed"), this.deactivate();
        }
      return this;
    }
    destroy(t) {
      var e;
      if (!((e = this.value) === null || e === void 0) && e.destroy)
        try {
          this.value.destroy();
        } catch (i) {
          yi(t.state, i, "CodeMirror plugin crashed");
        }
    }
    deactivate() {
      this.spec = this.value = null;
    }
  }
  const uc = /* @__PURE__ */ V.define(), fc = /* @__PURE__ */ V.define(), ts = /* @__PURE__ */ V.define(), dc = /* @__PURE__ */ V.define(), Oc = /* @__PURE__ */ V.define(), es = /* @__PURE__ */ V.define();
  class or {
    constructor(t, e, i, n) {
      this.fromA = t, this.toA = e, this.fromB = i, this.toB = n;
    }
    join(t) {
      return new or(Math.min(this.fromA, t.fromA), Math.max(this.toA, t.toA), Math.min(this.fromB, t.fromB), Math.max(this.toB, t.toB));
    }
    addToSet(t) {
      let e = t.length, i = this;
      for (; e > 0; e--) {
        let n = t[e - 1];
        if (!(n.fromA > i.toA)) {
          if (n.toA < i.fromA)
            break;
          i = i.join(n), t.splice(e - 1, 1);
        }
      }
      return t.splice(e, 0, i), t;
    }
    static extendWithRanges(t, e) {
      if (e.length == 0)
        return t;
      let i = [];
      for (let n = 0, s = 0, o = 0, a = 0; ; n++) {
        let l = n == t.length ? null : t[n], u = o - a, d = l ? l.fromB : 1e9;
        for (; s < e.length && e[s] < d; ) {
          let O = e[s], m = e[s + 1], Q = Math.max(a, O), b = Math.min(d, m);
          if (Q <= b && new or(Q + u, b + u, Q, b).addToSet(i), m > d)
            break;
          s += 2;
        }
        if (!l)
          return i;
        new or(l.fromA, l.toA, l.fromB, l.toB).addToSet(i), o = l.toA, a = l.toB;
      }
    }
  }
  class to {
    constructor(t, e, i) {
      this.view = t, this.state = e, this.transactions = i, this.flags = 0, this.startState = t.state, this.changes = xt.empty(this.startState.doc.length);
      for (let o of i)
        this.changes = this.changes.compose(o.changes);
      let n = [];
      this.changes.iterChangedRanges((o, a, l, u) => n.push(new or(o, a, l, u))), this.changedRanges = n;
      let s = t.hasFocus;
      s != t.inputState.notifiedFocused && (t.inputState.notifiedFocused = s, this.flags |= 1);
    }
    static create(t, e, i) {
      return new to(t, e, i);
    }
    get viewportChanged() {
      return (this.flags & 4) > 0;
    }
    get heightChanged() {
      return (this.flags & 2) > 0;
    }
    get geometryChanged() {
      return this.docChanged || (this.flags & 10) > 0;
    }
    get focusChanged() {
      return (this.flags & 1) > 0;
    }
    get docChanged() {
      return !this.changes.empty;
    }
    get selectionSet() {
      return this.transactions.some((t) => t.selection);
    }
    get empty() {
      return this.flags == 0 && this.transactions.length == 0;
    }
  }
  var Vt = /* @__PURE__ */ function(r) {
    return r[r.LTR = 0] = "LTR", r[r.RTL = 1] = "RTL", r;
  }(Vt || (Vt = {}));
  const Ba = Vt.LTR, Ep = Vt.RTL;
  function pc(r) {
    let t = [];
    for (let e = 0; e < r.length; e++)
      t.push(1 << +r[e]);
    return t;
  }
  const Zp = /* @__PURE__ */ pc("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), jp = /* @__PURE__ */ pc("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), Ya = /* @__PURE__ */ Object.create(null), Mi = [];
  for (let r of ["()", "[]", "{}"]) {
    let t = /* @__PURE__ */ r.charCodeAt(0), e = /* @__PURE__ */ r.charCodeAt(1);
    Ya[t] = e, Ya[e] = -t;
  }
  function zp(r) {
    return r <= 247 ? Zp[r] : 1424 <= r && r <= 1524 ? 2 : 1536 <= r && r <= 1785 ? jp[r - 1536] : 1774 <= r && r <= 2220 ? 4 : 8192 <= r && r <= 8203 || r == 8204 ? 256 : 1;
  }
  const Np = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
  class Qn {
    constructor(t, e, i) {
      this.from = t, this.to = e, this.level = i;
    }
    get dir() {
      return this.level % 2 ? Ep : Ba;
    }
    side(t, e) {
      return this.dir == e == t ? this.to : this.from;
    }
    static find(t, e, i, n) {
      let s = -1;
      for (let o = 0; o < t.length; o++) {
        let a = t[o];
        if (a.from <= e && a.to >= e) {
          if (a.level == i)
            return o;
          (s < 0 || (n != 0 ? n < 0 ? a.from < e : a.to > e : t[s].level > a.level)) && (s = o);
        }
      }
      if (s < 0)
        throw new RangeError("Index out of range");
      return s;
    }
  }
  const Nt = [];
  function Ip(r, t) {
    let e = r.length, i = t == Ba ? 1 : 2, n = t == Ba ? 2 : 1;
    if (!r || i == 1 && !Np.test(r))
      return mc(e);
    for (let o = 0, a = i, l = i; o < e; o++) {
      let u = zp(r.charCodeAt(o));
      u == 512 ? u = a : u == 8 && l == 4 && (u = 16), Nt[o] = u == 4 ? 2 : u, u & 7 && (l = u), a = u;
    }
    for (let o = 0, a = i, l = i; o < e; o++) {
      let u = Nt[o];
      if (u == 128)
        o < e - 1 && a == Nt[o + 1] && a & 24 ? u = Nt[o] = a : Nt[o] = 256;
      else if (u == 64) {
        let d = o + 1;
        for (; d < e && Nt[d] == 64; )
          d++;
        let O = o && a == 8 || d < e && Nt[d] == 8 ? l == 1 ? 1 : 8 : 256;
        for (let m = o; m < d; m++)
          Nt[m] = O;
        o = d - 1;
      } else
        u == 8 && l == 1 && (Nt[o] = 1);
      a = u, u & 7 && (l = u);
    }
    for (let o = 0, a = 0, l = 0, u, d, O; o < e; o++)
      if (d = Ya[u = r.charCodeAt(o)])
        if (d < 0) {
          for (let m = a - 3; m >= 0; m -= 3)
            if (Mi[m + 1] == -d) {
              let Q = Mi[m + 2], b = Q & 2 ? i : Q & 4 ? Q & 1 ? n : i : 0;
              b && (Nt[o] = Nt[Mi[m]] = b), a = m;
              break;
            }
        } else {
          if (Mi.length == 189)
            break;
          Mi[a++] = o, Mi[a++] = u, Mi[a++] = l;
        }
      else if ((O = Nt[o]) == 2 || O == 1) {
        let m = O == i;
        l = m ? 0 : 1;
        for (let Q = a - 3; Q >= 0; Q -= 3) {
          let b = Mi[Q + 2];
          if (b & 2)
            break;
          if (m)
            Mi[Q + 2] |= 2;
          else {
            if (b & 4)
              break;
            Mi[Q + 2] |= 4;
          }
        }
      }
    for (let o = 0; o < e; o++)
      if (Nt[o] == 256) {
        let a = o + 1;
        for (; a < e && Nt[a] == 256; )
          a++;
        let l = (o ? Nt[o - 1] : i) == 1, u = (a < e ? Nt[a] : i) == 1, d = l == u ? l ? 1 : 2 : i;
        for (let O = o; O < a; O++)
          Nt[O] = d;
        o = a - 1;
      }
    let s = [];
    if (i == 1)
      for (let o = 0; o < e; ) {
        let a = o, l = Nt[o++] != 1;
        for (; o < e && l == (Nt[o] != 1); )
          o++;
        if (l)
          for (let u = o; u > a; ) {
            let d = u, O = Nt[--u] != 2;
            for (; u > a && O == (Nt[u - 1] != 2); )
              u--;
            s.push(new Qn(u, d, O ? 2 : 1));
          }
        else
          s.push(new Qn(a, o, 0));
      }
    else
      for (let o = 0; o < e; ) {
        let a = o, l = Nt[o++] == 2;
        for (; o < e && l == (Nt[o] == 2); )
          o++;
        s.push(new Qn(a, o, l ? 1 : 2));
      }
    return s;
  }
  function mc(r) {
    return [new Qn(0, r, 0)];
  }
  let gc = "";
  function Gp(r, t, e, i, n) {
    var s;
    let o = i.head - r.from, a = -1;
    if (o == 0) {
      if (!n || !r.length)
        return null;
      t[0].level != e && (o = t[0].side(!1, e), a = 0);
    } else if (o == r.length) {
      if (n)
        return null;
      let m = t[t.length - 1];
      m.level != e && (o = m.side(!0, e), a = t.length - 1);
    }
    a < 0 && (a = Qn.find(t, o, (s = i.bidiLevel) !== null && s !== void 0 ? s : -1, i.assoc));
    let l = t[a];
    o == l.side(n, e) && (l = t[a += n ? 1 : -1], o = l.side(!n, e));
    let u = n == (l.dir == e), d = N(r.text, o, u);
    if (gc = r.text.slice(Math.min(o, d), Math.max(o, d)), d != l.side(n, e))
      return _.cursor(d + r.from, u ? -1 : 1, l.level);
    let O = a == (n ? t.length - 1 : 0) ? null : t[a + (n ? 1 : -1)];
    return !O && l.level != e ? _.cursor(n ? r.to : r.from, n ? -1 : 1, e) : O && O.level < l.level ? _.cursor(O.side(!n, e) + r.from, n ? 1 : -1, O.level) : _.cursor(d + r.from, n ? -1 : 1, l.level);
  }
  const xr = "￿";
  class vc {
    constructor(t, e) {
      this.points = t, this.text = "", this.lineSeparator = e.facet(ft.lineSeparator);
    }
    append(t) {
      this.text += t;
    }
    lineBreak() {
      this.text += xr;
    }
    readRange(t, e) {
      if (!t)
        return this;
      let i = t.parentNode;
      for (let n = t; ; ) {
        this.findPointBefore(i, n), this.readNode(n);
        let s = n.nextSibling;
        if (s == e)
          break;
        let o = Mt.get(n), a = Mt.get(s);
        (o && a ? o.breakAfter : (o ? o.breakAfter : Qc(n)) || Qc(s) && (n.nodeName != "BR" || n.cmIgnore)) && this.lineBreak(), n = s;
      }
      return this.findPointBefore(i, e), this;
    }
    readTextNode(t) {
      let e = t.nodeValue;
      for (let i of this.points)
        i.node == t && (i.pos = this.text.length + Math.min(i.offset, e.length));
      for (let i = 0, n = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
        let s = -1, o = 1, a;
        if (this.lineSeparator ? (s = e.indexOf(this.lineSeparator, i), o = this.lineSeparator.length) : (a = n.exec(e)) && (s = a.index, o = a[0].length), this.append(e.slice(i, s < 0 ? e.length : s)), s < 0)
          break;
        if (this.lineBreak(), o > 1)
          for (let l of this.points)
            l.node == t && l.pos > this.text.length && (l.pos -= o - 1);
        i = s + o;
      }
    }
    readNode(t) {
      if (t.cmIgnore)
        return;
      let e = Mt.get(t), i = e && e.overrideDOMText;
      if (i != null) {
        this.findPointInside(t, i.length);
        for (let n = i.iter(); !n.next().done; )
          n.lineBreak ? this.lineBreak() : this.append(n.value);
      } else
        t.nodeType == 3 ? this.readTextNode(t) : t.nodeName == "BR" ? t.nextSibling && this.lineBreak() : t.nodeType == 1 && this.readRange(t.firstChild, null);
    }
    findPointBefore(t, e) {
      for (let i of this.points)
        i.node == t && t.childNodes[i.offset] == e && (i.pos = this.text.length);
    }
    findPointInside(t, e) {
      for (let i of this.points)
        (t.nodeType == 3 ? i.node == t : t.contains(i.node)) && (i.pos = this.text.length + Math.min(e, i.offset));
    }
  }
  function Qc(r) {
    return r.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(r.nodeName);
  }
  class yc {
    constructor(t, e) {
      this.node = t, this.offset = e, this.pos = -1;
    }
  }
  class bc extends Mt {
    constructor(t) {
      super(), this.view = t, this.compositionDeco = it.none, this.decorations = [], this.dynamicDecorationMap = [], this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.setDOM(t.contentDOM), this.children = [new ke()], this.children[0].setParent(this), this.updateDeco(), this.updateInner([new or(0, 0, 0, t.state.doc.length)], 0);
    }
    get root() {
      return this.view.root;
    }
    get editorView() {
      return this.view;
    }
    get length() {
      return this.view.state.doc.length;
    }
    update(t) {
      let e = t.changedRanges;
      this.minWidth > 0 && e.length && (e.every(({ fromA: o, toA: a }) => a < this.minWidthFrom || o > this.minWidthTo) ? (this.minWidthFrom = t.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = t.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.view.inputState.composing < 0 ? this.compositionDeco = it.none : (t.transactions.length || this.dirty) && (this.compositionDeco = Lp(this.view, t.changes)), (B.ie || B.chrome) && !this.compositionDeco.size && t && t.state.doc.lines != t.startState.doc.lines && (this.forceSelection = !0);
      let i = this.decorations, n = this.updateDeco(), s = Fp(i, n, t.changes);
      return e = or.extendWithRanges(e, s), this.dirty == 0 && e.length == 0 ? !1 : (this.updateInner(e, t.startState.doc.length), t.transactions.length && (this.lastUpdate = Date.now()), !0);
    }
    updateInner(t, e) {
      this.view.viewState.mustMeasureContent = !0, this.updateChildren(t, e);
      let { observer: i } = this.view;
      i.ignore(() => {
        this.dom.style.height = this.view.viewState.contentHeight + "px", this.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
        let s = B.chrome || B.ios ? { node: i.selectionRange.focusNode, written: !1 } : void 0;
        this.sync(s), this.dirty = 0, s && (s.written || i.selectionRange.focusNode != s.node) && (this.forceSelection = !0), this.dom.style.height = "";
      });
      let n = [];
      if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length)
        for (let s of this.children)
          s instanceof Hr && s.widget instanceof wc && n.push(s.dom);
      i.updateGaps(n);
    }
    updateChildren(t, e) {
      let i = this.childCursor(e);
      for (let n = t.length - 1; ; n--) {
        let s = n >= 0 ? t[n] : null;
        if (!s)
          break;
        let { fromA: o, toA: a, fromB: l, toB: u } = s, { content: d, breakAtStart: O, openStart: m, openEnd: Q } = Va.build(this.view.state.doc, l, u, this.decorations, this.dynamicDecorationMap), { i: b, off: C } = i.findPos(a, 1), { i: A, off: M } = i.findPos(o, -1);
        Gh(this, A, M, b, C, d, O, m, Q);
      }
    }
    updateSelection(t = !1, e = !1) {
      if ((t || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange(), !(e || this.mayControlSelection()) || B.ios && this.view.inputState.rapidCompositionStart)
        return;
      let i = this.forceSelection;
      this.forceSelection = !1;
      let n = this.view.state.selection.main, s = this.domAtPos(n.anchor), o = n.empty ? s : this.domAtPos(n.head);
      if (B.gecko && n.empty && Vp(s)) {
        let l = document.createTextNode("");
        this.view.observer.ignore(() => s.node.insertBefore(l, s.node.childNodes[s.offset] || null)), s = o = new fe(l, 0), i = !0;
      }
      let a = this.view.observer.selectionRange;
      (i || !a.focusNode || !Ie(s.node, s.offset, a.anchorNode, a.anchorOffset) || !Ie(o.node, o.offset, a.focusNode, a.focusOffset)) && (this.view.observer.ignore(() => {
        B.android && B.chrome && this.dom.contains(a.focusNode) && Hp(a.focusNode, this.dom) && (this.dom.blur(), this.dom.focus({ preventScroll: !0 }));
        let l = Ce(this.root);
        if (l)
          if (n.empty) {
            if (B.gecko) {
              let u = Bp(s.node, s.offset);
              if (u && u != 3) {
                let d = Sc(s.node, s.offset, u == 1 ? 1 : -1);
                d && (s = new fe(d, u == 1 ? 0 : d.nodeValue.length));
              }
            }
            l.collapse(s.node, s.offset), n.bidiLevel != null && a.cursorBidiLevel != null && (a.cursorBidiLevel = n.bidiLevel);
          } else if (l.extend)
            l.collapse(s.node, s.offset), l.extend(o.node, o.offset);
          else {
            let u = document.createRange();
            n.anchor > n.head && ([s, o] = [o, s]), u.setEnd(o.node, o.offset), u.setStart(s.node, s.offset), l.removeAllRanges(), l.addRange(u);
          }
      }), this.view.observer.setSelectionRange(s, o)), this.impreciseAnchor = s.precise ? null : new fe(a.anchorNode, a.anchorOffset), this.impreciseHead = o.precise ? null : new fe(a.focusNode, a.focusOffset);
    }
    enforceCursorAssoc() {
      if (this.compositionDeco.size)
        return;
      let t = this.view.state.selection.main, e = Ce(this.root);
      if (!e || !t.empty || !t.assoc || !e.modify)
        return;
      let i = ke.find(this, t.head);
      if (!i)
        return;
      let n = i.posAtStart;
      if (t.head == n || t.head == n + i.length)
        return;
      let s = this.coordsAt(t.head, -1), o = this.coordsAt(t.head, 1);
      if (!s || !o || s.bottom > o.top)
        return;
      let a = this.domAtPos(t.head + t.assoc);
      e.collapse(a.node, a.offset), e.modify("move", t.assoc < 0 ? "forward" : "backward", "lineboundary");
    }
    mayControlSelection() {
      let t = this.root.activeElement;
      return t == this.dom || ze(this.dom, this.view.observer.selectionRange) && !(t && this.dom.contains(t));
    }
    nearest(t) {
      for (let e = t; e; ) {
        let i = Mt.get(e);
        if (i && i.rootView == this)
          return i;
        e = e.parentNode;
      }
      return null;
    }
    posFromDOM(t, e) {
      let i = this.nearest(t);
      if (!i)
        throw new RangeError("Trying to find position for a DOM position outside of the document");
      return i.localPosFromDOM(t, e) + i.posAtStart;
    }
    domAtPos(t) {
      let { i: e, off: i } = this.childCursor().findPos(t, -1);
      for (; e < this.children.length - 1; ) {
        let n = this.children[e];
        if (i < n.length || n instanceof ke)
          break;
        e++, i = 0;
      }
      return this.children[e].domAtPos(i);
    }
    coordsAt(t, e) {
      for (let i = this.length, n = this.children.length - 1; ; n--) {
        let s = this.children[n], o = i - s.breakAfter - s.length;
        if (t > o || t == o && s.type != Wt.WidgetBefore && s.type != Wt.WidgetAfter && (!n || e == 2 || this.children[n - 1].breakAfter || this.children[n - 1].type == Wt.WidgetBefore && e > -2))
          return s.coordsAt(t - o, e);
        i = o;
      }
    }
    measureVisibleLineHeights(t) {
      let e = [], { from: i, to: n } = t, s = this.view.contentDOM.clientWidth, o = s > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, a = -1, l = this.view.textDirection == Vt.LTR;
      for (let u = 0, d = 0; d < this.children.length; d++) {
        let O = this.children[d], m = u + O.length;
        if (m > n)
          break;
        if (u >= i) {
          let Q = O.dom.getBoundingClientRect();
          if (e.push(Q.height), o) {
            let b = O.dom.lastChild, C = b ? Ne(b) : [];
            if (C.length) {
              let A = C[C.length - 1], M = l ? A.right - Q.left : Q.right - A.left;
              M > a && (a = M, this.minWidth = s, this.minWidthFrom = u, this.minWidthTo = m);
            }
          }
        }
        u = m + O.breakAfter;
      }
      return e;
    }
    textDirectionAt(t) {
      let { i: e } = this.childPos(t, 1);
      return getComputedStyle(this.children[e].dom).direction == "rtl" ? Vt.RTL : Vt.LTR;
    }
    measureTextSize() {
      for (let n of this.children)
        if (n instanceof ke) {
          let s = n.measureTextSize();
          if (s)
            return s;
        }
      let t = document.createElement("div"), e, i;
      return t.className = "cm-line", t.style.width = "99999px", t.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
        this.dom.appendChild(t);
        let n = Ne(t.firstChild)[0];
        e = t.getBoundingClientRect().height, i = n ? n.width / 27 : 7, t.remove();
      }), { lineHeight: e, charWidth: i };
    }
    childCursor(t = this.length) {
      let e = this.children.length;
      return e && (t -= this.children[--e].length), new Ih(this.children, t, e);
    }
    computeBlockGapDeco() {
      let t = [], e = this.view.viewState;
      for (let i = 0, n = 0; ; n++) {
        let s = n == e.viewports.length ? null : e.viewports[n], o = s ? s.from - 1 : this.length;
        if (o > i) {
          let a = e.lineBlockAt(o).bottom - e.lineBlockAt(i).top;
          t.push(it.replace({
            widget: new wc(a),
            block: !0,
            inclusive: !0,
            isBlockGap: !0
          }).range(i, o));
        }
        if (!s)
          break;
        i = s.to + 1;
      }
      return it.set(t);
    }
    updateDeco() {
      let t = this.view.state.facet(ts).map((e, i) => (this.dynamicDecorationMap[i] = typeof e == "function") ? e(this.view) : e);
      for (let e = t.length; e < t.length + 3; e++)
        this.dynamicDecorationMap[e] = !1;
      return this.decorations = [
        ...t,
        this.compositionDeco,
        this.computeBlockGapDeco(),
        this.view.viewState.lineGapDeco
      ];
    }
    scrollIntoView(t) {
      let { range: e } = t, i = this.coordsAt(e.head, e.empty ? e.assoc : e.head > e.anchor ? -1 : 1), n;
      if (!i)
        return;
      !e.empty && (n = this.coordsAt(e.anchor, e.anchor > e.head ? -1 : 1)) && (i = {
        left: Math.min(i.left, n.left),
        top: Math.min(i.top, n.top),
        right: Math.max(i.right, n.right),
        bottom: Math.max(i.bottom, n.bottom)
      });
      let s = 0, o = 0, a = 0, l = 0;
      for (let d of this.view.state.facet(Oc).map((O) => O(this.view)))
        if (d) {
          let { left: O, right: m, top: Q, bottom: b } = d;
          O != null && (s = Math.max(s, O)), m != null && (o = Math.max(o, m)), Q != null && (a = Math.max(a, Q)), b != null && (l = Math.max(l, b));
        }
      let u = {
        left: i.left - s,
        top: i.top - a,
        right: i.right + o,
        bottom: i.bottom + l
      };
      mn(this.view.scrollDOM, u, e.head < e.anchor ? -1 : 1, t.x, t.y, t.xMargin, t.yMargin, this.view.textDirection == Vt.LTR);
    }
  }
  function Vp(r) {
    return r.node.nodeType == 1 && r.node.firstChild && (r.offset == 0 || r.node.childNodes[r.offset - 1].contentEditable == "false") && (r.offset == r.node.childNodes.length || r.node.childNodes[r.offset].contentEditable == "false");
  }
  class wc extends wr {
    constructor(t) {
      super(), this.height = t;
    }
    toDOM() {
      let t = document.createElement("div");
      return this.updateDOM(t), t;
    }
    eq(t) {
      return t.height == this.height;
    }
    updateDOM(t) {
      return t.style.height = this.height + "px", !0;
    }
    get estimatedHeight() {
      return this.height;
    }
  }
  function xc(r) {
    let t = r.observer.selectionRange, e = t.focusNode && Sc(t.focusNode, t.focusOffset, 0);
    if (!e)
      return null;
    let i = r.docView.nearest(e);
    if (!i)
      return null;
    if (i instanceof ke) {
      let n = e;
      for (; n.parentNode != i.dom; )
        n = n.parentNode;
      let s = n.previousSibling;
      for (; s && !Mt.get(s); )
        s = s.previousSibling;
      let o = s ? Mt.get(s).posAtEnd : i.posAtStart;
      return { from: o, to: o, node: n, text: e };
    } else {
      for (; ; ) {
        let { parent: s } = i;
        if (!s)
          return null;
        if (s instanceof ke)
          break;
        i = s;
      }
      let n = i.posAtStart;
      return { from: n, to: n + i.length, node: i.dom, text: e };
    }
  }
  function Lp(r, t) {
    let e = xc(r);
    if (!e)
      return it.none;
    let { from: i, to: n, node: s, text: o } = e, a = t.mapPos(i, 1), l = Math.max(a, t.mapPos(n, -1)), { state: u } = r, d = s.nodeType == 3 ? s.nodeValue : new vc([], u).readRange(s.firstChild, null).text;
    if (l - a < d.length)
      if (u.doc.sliceString(a, Math.min(u.doc.length, a + d.length), xr) == d)
        l = a + d.length;
      else if (u.doc.sliceString(Math.max(0, l - d.length), l, xr) == d)
        a = l - d.length;
      else
        return it.none;
    else if (u.doc.sliceString(a, l, xr) != d)
      return it.none;
    let O = Mt.get(s);
    return O instanceof Hh ? O = O.widget.topView : O && (O.parent = null), it.set(it.replace({ widget: new Up(s, o, O), inclusive: !0 }).range(a, l));
  }
  class Up extends wr {
    constructor(t, e, i) {
      super(), this.top = t, this.text = e, this.topView = i;
    }
    eq(t) {
      return this.top == t.top && this.text == t.text;
    }
    toDOM() {
      return this.top;
    }
    ignoreEvent() {
      return !1;
    }
    get customView() {
      return Hh;
    }
  }
  function Sc(r, t, e) {
    for (; ; ) {
      if (r.nodeType == 3)
        return r;
      if (r.nodeType == 1 && t > 0 && e <= 0)
        r = r.childNodes[t - 1], t = ii(r);
      else if (r.nodeType == 1 && t < r.childNodes.length && e >= 0)
        r = r.childNodes[t], t = 0;
      else
        return null;
    }
  }
  function Bp(r, t) {
    return r.nodeType != 1 ? 0 : (t && r.childNodes[t - 1].contentEditable == "false" ? 1 : 0) | (t < r.childNodes.length && r.childNodes[t].contentEditable == "false" ? 2 : 0);
  }
  class Yp {
    constructor() {
      this.changes = [];
    }
    compareRange(t, e) {
      Ga(t, e, this.changes);
    }
    comparePoint(t, e) {
      Ga(t, e, this.changes);
    }
  }
  function Fp(r, t, e) {
    let i = new Yp();
    return rt.compare(r, t, e, i), i.changes;
  }
  function Hp(r, t) {
    for (let e = r; e && e != t; e = e.assignedSlot || e.parentNode)
      if (e.nodeType == 1 && e.contentEditable == "false")
        return !0;
    return !1;
  }
  function Jp(r, t, e = 1) {
    let i = r.charCategorizer(t), n = r.doc.lineAt(t), s = t - n.from;
    if (n.length == 0)
      return _.cursor(t);
    s == 0 ? e = 1 : s == n.length && (e = -1);
    let o = s, a = s;
    e < 0 ? o = N(n.text, s, !1) : a = N(n.text, s);
    let l = i(n.text.slice(o, a));
    for (; o > 0; ) {
      let u = N(n.text, o, !1);
      if (i(n.text.slice(u, o)) != l)
        break;
      o = u;
    }
    for (; a < n.length; ) {
      let u = N(n.text, a);
      if (i(n.text.slice(a, u)) != l)
        break;
      a = u;
    }
    return _.range(o + n.from, a + n.from);
  }
  function Kp(r, t) {
    return t.left > r ? t.left - r : Math.max(0, r - t.right);
  }
  function tm(r, t) {
    return t.top > r ? t.top - r : Math.max(0, r - t.bottom);
  }
  function Fa(r, t) {
    return r.top < t.bottom - 1 && r.bottom > t.top + 1;
  }
  function kc(r, t) {
    return t < r.top ? { top: t, left: r.left, right: r.right, bottom: r.bottom } : r;
  }
  function $c(r, t) {
    return t > r.bottom ? { top: r.top, left: r.left, right: r.right, bottom: t } : r;
  }
  function Ha(r, t, e) {
    let i, n, s, o, a, l, u, d;
    for (let Q = r.firstChild; Q; Q = Q.nextSibling) {
      let b = Ne(Q);
      for (let C = 0; C < b.length; C++) {
        let A = b[C];
        n && Fa(n, A) && (A = kc($c(A, n.bottom), n.top));
        let M = Kp(t, A), U = tm(e, A);
        if (M == 0 && U == 0)
          return Q.nodeType == 3 ? Tc(Q, t, e) : Ha(Q, t, e);
        (!i || o > U || o == U && s > M) && (i = Q, n = A, s = M, o = U), M == 0 ? e > A.bottom && (!u || u.bottom < A.bottom) ? (a = Q, u = A) : e < A.top && (!d || d.top > A.top) && (l = Q, d = A) : u && Fa(u, A) ? u = $c(u, A.bottom) : d && Fa(d, A) && (d = kc(d, A.top));
      }
    }
    if (u && u.bottom >= e ? (i = a, n = u) : d && d.top <= e && (i = l, n = d), !i)
      return { node: r, offset: 0 };
    let O = Math.max(n.left, Math.min(n.right, t));
    if (i.nodeType == 3)
      return Tc(i, O, e);
    if (!s && i.contentEditable == "true")
      return Ha(i, O, e);
    let m = Array.prototype.indexOf.call(r.childNodes, i) + (t >= (n.left + n.right) / 2 ? 1 : 0);
    return { node: r, offset: m };
  }
  function Tc(r, t, e) {
    let i = r.nodeValue.length, n = -1, s = 1e9, o = 0;
    for (let a = 0; a < i; a++) {
      let l = Xi(r, a, a + 1).getClientRects();
      for (let u = 0; u < l.length; u++) {
        let d = l[u];
        if (d.top == d.bottom)
          continue;
        o || (o = t - d.left);
        let O = (d.top > e ? d.top - e : e - d.bottom) - 1;
        if (d.left - 1 <= t && d.right + 1 >= t && O < s) {
          let m = t >= (d.left + d.right) / 2, Q = m;
          if ((B.chrome || B.gecko) && Xi(r, a).getBoundingClientRect().left == d.right && (Q = !m), O <= 0)
            return { node: r, offset: a + (Q ? 1 : 0) };
          n = a + (Q ? 1 : 0), s = O;
        }
      }
    }
    return { node: r, offset: n > -1 ? n : o > 0 ? r.nodeValue.length : 0 };
  }
  function Pc(r, { x: t, y: e }, i, n = -1) {
    var s;
    let o = r.contentDOM.getBoundingClientRect(), a = o.top + r.viewState.paddingTop, l, { docHeight: u } = r.viewState, d = e - a;
    if (d < 0)
      return 0;
    if (d > u)
      return r.state.doc.length;
    for (let M = r.defaultLineHeight / 2, U = !1; l = r.elementAtHeight(d), l.type != Wt.Text; )
      for (; d = n > 0 ? l.bottom + M : l.top - M, !(d >= 0 && d <= u); ) {
        if (U)
          return i ? null : 0;
        U = !0, n = -n;
      }
    e = a + d;
    let O = l.from;
    if (O < r.viewport.from)
      return r.viewport.from == 0 ? 0 : i ? null : Rc(r, o, l, t, e);
    if (O > r.viewport.to)
      return r.viewport.to == r.state.doc.length ? r.state.doc.length : i ? null : Rc(r, o, l, t, e);
    let m = r.dom.ownerDocument, Q = r.root.elementFromPoint ? r.root : m, b = Q.elementFromPoint(t, e);
    b && !r.contentDOM.contains(b) && (b = null), b || (t = Math.max(o.left + 1, Math.min(o.right - 1, t)), b = Q.elementFromPoint(t, e), b && !r.contentDOM.contains(b) && (b = null));
    let C, A = -1;
    if (b && ((s = r.docView.nearest(b)) === null || s === void 0 ? void 0 : s.isEditable) != !1) {
      if (m.caretPositionFromPoint) {
        let M = m.caretPositionFromPoint(t, e);
        M && ({ offsetNode: C, offset: A } = M);
      } else if (m.caretRangeFromPoint) {
        let M = m.caretRangeFromPoint(t, e);
        M && ({ startContainer: C, startOffset: A } = M, (B.safari && em(C, A, t) || B.chrome && im(C, A, t)) && (C = void 0));
      }
    }
    if (!C || !r.docView.dom.contains(C)) {
      let M = ke.find(r.docView, O);
      if (!M)
        return d > l.top + l.height / 2 ? l.to : l.from;
      ({ node: C, offset: A } = Ha(M.dom, t, e));
    }
    return r.docView.posFromDOM(C, A);
  }
  function Rc(r, t, e, i, n) {
    let s = Math.round((i - t.left) * r.defaultCharacterWidth);
    r.lineWrapping && e.height > r.defaultLineHeight * 1.5 && (s += Math.floor((n - e.top) / r.defaultLineHeight) * r.viewState.heightOracle.lineLength);
    let o = r.state.sliceDoc(e.from, e.to);
    return e.from + _i(o, s, r.state.tabSize);
  }
  function em(r, t, e) {
    let i;
    if (r.nodeType != 3 || t != (i = r.nodeValue.length))
      return !1;
    for (let n = r.nextSibling; n; n = n.nextSibling)
      if (n.nodeType != 1 || n.nodeName != "BR")
        return !1;
    return Xi(r, i - 1, i).getBoundingClientRect().left > e;
  }
  function im(r, t, e) {
    if (t != 0)
      return !1;
    for (let n = r; ; ) {
      let s = n.parentNode;
      if (!s || s.nodeType != 1 || s.firstChild != n)
        return !1;
      if (s.classList.contains("cm-line"))
        break;
      n = s;
    }
    let i = r.nodeType == 1 ? r.getBoundingClientRect() : Xi(r, 0, Math.max(r.nodeValue.length, 1)).getBoundingClientRect();
    return e - i.left > 5;
  }
  function rm(r, t, e, i) {
    let n = r.state.doc.lineAt(t.head), s = !i || !r.lineWrapping ? null : r.coordsAtPos(t.assoc < 0 && t.head > n.from ? t.head - 1 : t.head);
    if (s) {
      let l = r.dom.getBoundingClientRect(), u = r.textDirectionAt(n.from), d = r.posAtCoords({
        x: e == (u == Vt.LTR) ? l.right - 1 : l.left + 1,
        y: (s.top + s.bottom) / 2
      });
      if (d != null)
        return _.cursor(d, e ? -1 : 1);
    }
    let o = ke.find(r.docView, t.head), a = o ? e ? o.posAtEnd : o.posAtStart : e ? n.to : n.from;
    return _.cursor(a, e ? -1 : 1);
  }
  function Cc(r, t, e, i) {
    let n = r.state.doc.lineAt(t.head), s = r.bidiSpans(n), o = r.textDirectionAt(n.from);
    for (let a = t, l = null; ; ) {
      let u = Gp(n, s, o, a, e), d = gc;
      if (!u) {
        if (n.number == (e ? r.state.doc.lines : 1))
          return a;
        d = `
`, n = r.state.doc.line(n.number + (e ? 1 : -1)), s = r.bidiSpans(n), u = _.cursor(e ? n.from : n.to);
      }
      if (l) {
        if (!l(d))
          return a;
      } else {
        if (!i)
          return u;
        l = i(d);
      }
      a = u;
    }
  }
  function nm(r, t, e) {
    let i = r.state.charCategorizer(t), n = i(e);
    return (s) => {
      let o = i(s);
      return n == D.Space && (n = o), n == o;
    };
  }
  function sm(r, t, e, i) {
    let n = t.head, s = e ? 1 : -1;
    if (n == (e ? r.state.doc.length : 0))
      return _.cursor(n, t.assoc);
    let o = t.goalColumn, a, l = r.contentDOM.getBoundingClientRect(), u = r.coordsAtPos(n), d = r.documentTop;
    if (u)
      o == null && (o = u.left - l.left), a = s < 0 ? u.top : u.bottom;
    else {
      let Q = r.viewState.lineBlockAt(n);
      o == null && (o = Math.min(l.right - l.left, r.defaultCharacterWidth * (n - Q.from))), a = (s < 0 ? Q.top : Q.bottom) + d;
    }
    let O = l.left + o, m = i ?? r.defaultLineHeight >> 1;
    for (let Q = 0; ; Q += 10) {
      let b = a + (m + Q) * s, C = Pc(r, { x: O, y: b }, !1, s);
      if (b < l.top || b > l.bottom || (s < 0 ? C < n : C > n))
        return _.cursor(C, t.assoc, void 0, o);
    }
  }
  function Ja(r, t, e) {
    let i = r.state.facet(dc).map((n) => n(r));
    for (; ; ) {
      let n = !1;
      for (let s of i)
        s.between(e.from - 1, e.from + 1, (o, a, l) => {
          e.from > o && e.from < a && (e = t.from > e.from ? _.cursor(o, 1) : _.cursor(a, -1), n = !0);
        });
      if (!n)
        return e;
    }
  }
  class om {
    constructor(t) {
      this.lastKeyCode = 0, this.lastKeyTime = 0, this.lastTouchTime = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.chromeScrollHack = -1, this.pendingIOSKey = void 0, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastEscPress = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.registeredEvents = [], this.customHandlers = [], this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.rapidCompositionStart = !1, this.mouseSelection = null;
      for (let e in ae) {
        let i = ae[e];
        t.contentDOM.addEventListener(e, (n) => {
          !Wc(t, n) || this.ignoreDuringComposition(n) || e == "keydown" && this.keydown(t, n) || (this.mustFlushObserver(n) && t.observer.forceFlush(), this.runCustomHandlers(e, t, n) ? n.preventDefault() : i(t, n));
        }, Ka[e]), this.registeredEvents.push(e);
      }
      B.chrome && B.chrome_version == 102 && t.scrollDOM.addEventListener("wheel", () => {
        this.chromeScrollHack < 0 ? t.contentDOM.style.pointerEvents = "none" : window.clearTimeout(this.chromeScrollHack), this.chromeScrollHack = setTimeout(() => {
          this.chromeScrollHack = -1, t.contentDOM.style.pointerEvents = "";
        }, 100);
      }, { passive: !0 }), this.notifiedFocused = t.hasFocus, B.safari && t.contentDOM.addEventListener("input", () => null);
    }
    setSelectionOrigin(t) {
      this.lastSelectionOrigin = t, this.lastSelectionTime = Date.now();
    }
    ensureHandlers(t, e) {
      var i;
      let n;
      this.customHandlers = [];
      for (let s of e)
        if (n = (i = s.update(t).spec) === null || i === void 0 ? void 0 : i.domEventHandlers) {
          this.customHandlers.push({ plugin: s.value, handlers: n });
          for (let o in n)
            this.registeredEvents.indexOf(o) < 0 && o != "scroll" && (this.registeredEvents.push(o), t.contentDOM.addEventListener(o, (a) => {
              !Wc(t, a) || this.runCustomHandlers(o, t, a) && a.preventDefault();
            }));
        }
    }
    runCustomHandlers(t, e, i) {
      for (let n of this.customHandlers) {
        let s = n.handlers[t];
        if (s)
          try {
            if (s.call(n.plugin, i, e) || i.defaultPrevented)
              return !0;
          } catch (o) {
            yi(e.state, o);
          }
      }
      return !1;
    }
    runScrollHandlers(t, e) {
      this.lastScrollTop = t.scrollDOM.scrollTop, this.lastScrollLeft = t.scrollDOM.scrollLeft;
      for (let i of this.customHandlers) {
        let n = i.handlers.scroll;
        if (n)
          try {
            n.call(i.plugin, e, t);
          } catch (s) {
            yi(t.state, s);
          }
      }
    }
    keydown(t, e) {
      if (this.lastKeyCode = e.keyCode, this.lastKeyTime = Date.now(), e.keyCode == 9 && Date.now() < this.lastEscPress + 2e3)
        return !0;
      if (B.android && B.chrome && !e.synthetic && (e.keyCode == 13 || e.keyCode == 8))
        return t.observer.delayAndroidKey(e.key, e.keyCode), !0;
      let i;
      return B.ios && (i = _c.find((n) => n.keyCode == e.keyCode)) && !(e.ctrlKey || e.altKey || e.metaKey) && !e.synthetic ? (this.pendingIOSKey = i, setTimeout(() => this.flushIOSKey(t), 250), !0) : !1;
    }
    flushIOSKey(t) {
      let e = this.pendingIOSKey;
      return e ? (this.pendingIOSKey = void 0, sr(t.contentDOM, e.key, e.keyCode)) : !1;
    }
    ignoreDuringComposition(t) {
      return /^key/.test(t.type) ? this.composing > 0 ? !0 : B.safari && !B.ios && Date.now() - this.compositionEndedAt < 100 ? (this.compositionEndedAt = 0, !0) : !1 : !1;
    }
    mustFlushObserver(t) {
      return t.type == "keydown" && t.keyCode != 229 || t.type == "compositionend" && !B.ios;
    }
    startMouseSelection(t) {
      this.mouseSelection && this.mouseSelection.destroy(), this.mouseSelection = t;
    }
    update(t) {
      this.mouseSelection && this.mouseSelection.update(t), t.transactions.length && (this.lastKeyCode = this.lastSelectionTime = 0);
    }
    destroy() {
      this.mouseSelection && this.mouseSelection.destroy();
    }
  }
  const _c = [
    { key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" },
    { key: "Enter", keyCode: 13, inputType: "insertParagraph" },
    { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }
  ], Ac = [16, 17, 18, 20, 91, 92, 224, 225];
  class am {
    constructor(t, e, i, n) {
      this.view = t, this.style = i, this.mustSelect = n, this.lastEvent = e;
      let s = t.contentDOM.ownerDocument;
      s.addEventListener("mousemove", this.move = this.move.bind(this)), s.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = e.shiftKey, this.multiple = t.state.facet(ft.allowMultipleSelections) && lm(t, e), this.dragMove = hm(t, e), this.dragging = cm(t, e) && tl(e) == 1 ? null : !1, this.dragging === !1 && (e.preventDefault(), this.select(e));
    }
    move(t) {
      if (t.buttons == 0)
        return this.destroy();
      this.dragging === !1 && this.select(this.lastEvent = t);
    }
    up(t) {
      this.dragging == null && this.select(this.lastEvent), this.dragging || t.preventDefault(), this.destroy();
    }
    destroy() {
      let t = this.view.contentDOM.ownerDocument;
      t.removeEventListener("mousemove", this.move), t.removeEventListener("mouseup", this.up), this.view.inputState.mouseSelection = null;
    }
    select(t) {
      let e = this.style.get(t, this.extend, this.multiple);
      (this.mustSelect || !e.eq(this.view.state.selection) || e.main.assoc != this.view.state.selection.main.assoc) && this.view.dispatch({
        selection: e,
        userEvent: "select.pointer",
        scrollIntoView: !0
      }), this.mustSelect = !1;
    }
    update(t) {
      t.docChanged && this.dragging && (this.dragging = this.dragging.map(t.changes)), this.style.update(t) && setTimeout(() => this.select(this.lastEvent), 20);
    }
  }
  function lm(r, t) {
    let e = r.state.facet(nc);
    return e.length ? e[0](t) : B.mac ? t.metaKey : t.ctrlKey;
  }
  function hm(r, t) {
    let e = r.state.facet(sc);
    return e.length ? e[0](t) : B.mac ? !t.altKey : !t.ctrlKey;
  }
  function cm(r, t) {
    let { main: e } = r.state.selection;
    if (e.empty)
      return !1;
    let i = Ce(r.root);
    if (!i || i.rangeCount == 0)
      return !0;
    let n = i.getRangeAt(0).getClientRects();
    for (let s = 0; s < n.length; s++) {
      let o = n[s];
      if (o.left <= t.clientX && o.right >= t.clientX && o.top <= t.clientY && o.bottom >= t.clientY)
        return !0;
    }
    return !1;
  }
  function Wc(r, t) {
    if (!t.bubbles)
      return !0;
    if (t.defaultPrevented)
      return !1;
    for (let e = t.target, i; e != r.contentDOM; e = e.parentNode)
      if (!e || e.nodeType == 11 || (i = Mt.get(e)) && i.ignoreEvent(t))
        return !1;
    return !0;
  }
  const ae = /* @__PURE__ */ Object.create(null), Ka = /* @__PURE__ */ Object.create(null), Xc = B.ie && B.ie_version < 15 || B.ios && B.webkit_version < 604;
  function um(r) {
    let t = r.dom.parentNode;
    if (!t)
      return;
    let e = t.appendChild(document.createElement("textarea"));
    e.style.cssText = "position: fixed; left: -10000px; top: 10px", e.focus(), setTimeout(() => {
      r.focus(), e.remove(), qc(r, e.value);
    }, 50);
  }
  function qc(r, t) {
    let { state: e } = r, i, n = 1, s = e.toText(t), o = s.lines == e.selection.ranges.length;
    if (el != null && e.selection.ranges.every((a) => a.empty) && el == s.toString()) {
      let a = -1;
      i = e.changeByRange((l) => {
        let u = e.doc.lineAt(l.from);
        if (u.from == a)
          return { range: l };
        a = u.from;
        let d = e.toText((o ? s.line(n++).text : t) + e.lineBreak);
        return {
          changes: { from: u.from, insert: d },
          range: _.cursor(l.from + d.length)
        };
      });
    } else
      o ? i = e.changeByRange((a) => {
        let l = s.line(n++);
        return {
          changes: { from: a.from, to: a.to, insert: l.text },
          range: _.cursor(a.from + l.length)
        };
      }) : i = e.replaceSelection(s);
    r.dispatch(i, {
      userEvent: "input.paste",
      scrollIntoView: !0
    });
  }
  ae.keydown = (r, t) => {
    r.inputState.setSelectionOrigin("select"), t.keyCode == 27 ? r.inputState.lastEscPress = Date.now() : Ac.indexOf(t.keyCode) < 0 && (r.inputState.lastEscPress = 0);
  }, ae.touchstart = (r, t) => {
    r.inputState.lastTouchTime = Date.now(), r.inputState.setSelectionOrigin("select.pointer");
  }, ae.touchmove = (r) => {
    r.inputState.setSelectionOrigin("select.pointer");
  }, Ka.touchstart = Ka.touchmove = { passive: !0 }, ae.mousedown = (r, t) => {
    if (r.observer.flush(), r.inputState.lastTouchTime > Date.now() - 2e3 && tl(t) == 1)
      return;
    let e = null;
    for (let i of r.state.facet(oc))
      if (e = i(r, t), e)
        break;
    if (!e && t.button == 0 && (e = Om(r, t)), e) {
      let i = r.root.activeElement != r.contentDOM;
      i && r.observer.ignore(() => Qr(r.contentDOM)), r.inputState.startMouseSelection(new am(r, t, e, i));
    }
  };
  function Mc(r, t, e, i) {
    if (i == 1)
      return _.cursor(t, e);
    if (i == 2)
      return Jp(r.state, t, e);
    {
      let n = ke.find(r.docView, t), s = r.state.doc.lineAt(n ? n.posAtEnd : t), o = n ? n.posAtStart : s.from, a = n ? n.posAtEnd : s.to;
      return a < r.state.doc.length && a == s.to && a++, _.range(o, a);
    }
  }
  let Dc = (r, t) => r >= t.top && r <= t.bottom, Ec = (r, t, e) => Dc(t, e) && r >= e.left && r <= e.right;
  function fm(r, t, e, i) {
    let n = ke.find(r.docView, t);
    if (!n)
      return 1;
    let s = t - n.posAtStart;
    if (s == 0)
      return 1;
    if (s == n.length)
      return -1;
    let o = n.coordsAt(s, -1);
    if (o && Ec(e, i, o))
      return -1;
    let a = n.coordsAt(s, 1);
    return a && Ec(e, i, a) ? 1 : o && Dc(i, o) ? -1 : 1;
  }
  function Zc(r, t) {
    let e = r.posAtCoords({ x: t.clientX, y: t.clientY }, !1);
    return { pos: e, bias: fm(r, e, t.clientX, t.clientY) };
  }
  const dm = B.ie && B.ie_version <= 11;
  let jc = null, zc = 0, Nc = 0;
  function tl(r) {
    if (!dm)
      return r.detail;
    let t = jc, e = Nc;
    return jc = r, Nc = Date.now(), zc = !t || e > Date.now() - 400 && Math.abs(t.clientX - r.clientX) < 2 && Math.abs(t.clientY - r.clientY) < 2 ? (zc + 1) % 3 : 1;
  }
  function Om(r, t) {
    let e = Zc(r, t), i = tl(t), n = r.state.selection, s = e, o = t;
    return {
      update(a) {
        a.docChanged && (e.pos = a.changes.mapPos(e.pos), n = n.map(a.changes), o = null);
      },
      get(a, l, u) {
        let d;
        if (o && a.clientX == o.clientX && a.clientY == o.clientY ? d = s : (d = s = Zc(r, a), o = a), !d || !e)
          return n;
        let O = Mc(r, d.pos, d.bias, i);
        if (e.pos != d.pos && !l) {
          let m = Mc(r, e.pos, e.bias, i), Q = Math.min(m.from, O.from), b = Math.max(m.to, O.to);
          O = Q < O.from ? _.range(Q, b) : _.range(b, Q);
        }
        return l ? n.replaceRange(n.main.extend(O.from, O.to)) : u && n.ranges.length > 1 && n.ranges.some((m) => m.eq(O)) ? pm(n, O) : u ? n.addRange(O) : _.create([O]);
      }
    };
  }
  function pm(r, t) {
    for (let e = 0; ; e++)
      if (r.ranges[e].eq(t))
        return _.create(r.ranges.slice(0, e).concat(r.ranges.slice(e + 1)), r.mainIndex == e ? 0 : r.mainIndex - (r.mainIndex > e ? 1 : 0));
  }
  ae.dragstart = (r, t) => {
    let { selection: { main: e } } = r.state, { mouseSelection: i } = r.inputState;
    i && (i.dragging = e), t.dataTransfer && (t.dataTransfer.setData("Text", r.state.sliceDoc(e.from, e.to)), t.dataTransfer.effectAllowed = "copyMove");
  };
  function Ic(r, t, e, i) {
    if (!e)
      return;
    let n = r.posAtCoords({ x: t.clientX, y: t.clientY }, !1);
    t.preventDefault();
    let { mouseSelection: s } = r.inputState, o = i && s && s.dragging && s.dragMove ? { from: s.dragging.from, to: s.dragging.to } : null, a = { from: n, insert: e }, l = r.state.changes(o ? [o, a] : a);
    r.focus(), r.dispatch({
      changes: l,
      selection: { anchor: l.mapPos(n, -1), head: l.mapPos(n, 1) },
      userEvent: o ? "move.drop" : "input.drop"
    });
  }
  ae.drop = (r, t) => {
    if (!t.dataTransfer)
      return;
    if (r.state.readOnly)
      return t.preventDefault();
    let e = t.dataTransfer.files;
    if (e && e.length) {
      t.preventDefault();
      let i = Array(e.length), n = 0, s = () => {
        ++n == e.length && Ic(r, t, i.filter((o) => o != null).join(r.state.lineBreak), !1);
      };
      for (let o = 0; o < e.length; o++) {
        let a = new FileReader();
        a.onerror = s, a.onload = () => {
          /[\x00-\x08\x0e-\x1f]{2}/.test(a.result) || (i[o] = a.result), s();
        }, a.readAsText(e[o]);
      }
    } else
      Ic(r, t, t.dataTransfer.getData("Text"), !0);
  }, ae.paste = (r, t) => {
    if (r.state.readOnly)
      return t.preventDefault();
    r.observer.flush();
    let e = Xc ? null : t.clipboardData;
    e ? (qc(r, e.getData("text/plain")), t.preventDefault()) : um(r);
  };
  function mm(r, t) {
    let e = r.dom.parentNode;
    if (!e)
      return;
    let i = e.appendChild(document.createElement("textarea"));
    i.style.cssText = "position: fixed; left: -10000px; top: 10px", i.value = t, i.focus(), i.selectionEnd = t.length, i.selectionStart = 0, setTimeout(() => {
      i.remove(), r.focus();
    }, 50);
  }
  function gm(r) {
    let t = [], e = [], i = !1;
    for (let n of r.selection.ranges)
      n.empty || (t.push(r.sliceDoc(n.from, n.to)), e.push(n));
    if (!t.length) {
      let n = -1;
      for (let { from: s } of r.selection.ranges) {
        let o = r.doc.lineAt(s);
        o.number > n && (t.push(o.text), e.push({ from: o.from, to: Math.min(r.doc.length, o.to + 1) })), n = o.number;
      }
      i = !0;
    }
    return { text: t.join(r.lineBreak), ranges: e, linewise: i };
  }
  let el = null;
  ae.copy = ae.cut = (r, t) => {
    let { text: e, ranges: i, linewise: n } = gm(r.state);
    if (!e && !n)
      return;
    el = n ? e : null;
    let s = Xc ? null : t.clipboardData;
    s ? (t.preventDefault(), s.clearData(), s.setData("text/plain", e)) : mm(r, e), t.type == "cut" && !r.state.readOnly && r.dispatch({
      changes: i,
      scrollIntoView: !0,
      userEvent: "delete.cut"
    });
  };
  function Gc(r) {
    setTimeout(() => {
      r.hasFocus != r.inputState.notifiedFocused && r.update([]);
    }, 10);
  }
  ae.focus = (r) => {
    r.inputState.lastFocusTime = Date.now(), !r.scrollDOM.scrollTop && (r.inputState.lastScrollTop || r.inputState.lastScrollLeft) && (r.scrollDOM.scrollTop = r.inputState.lastScrollTop, r.scrollDOM.scrollLeft = r.inputState.lastScrollLeft), Gc(r);
  }, ae.blur = (r) => {
    r.observer.clearSelectionRange(), Gc(r);
  };
  function Vc(r, t) {
    if (r.docView.compositionDeco.size) {
      r.inputState.rapidCompositionStart = t;
      try {
        r.update([]);
      } finally {
        r.inputState.rapidCompositionStart = !1;
      }
    }
  }
  ae.compositionstart = ae.compositionupdate = (r) => {
    r.inputState.compositionFirstChange == null && (r.inputState.compositionFirstChange = !0), r.inputState.composing < 0 && (r.inputState.composing = 0, r.docView.compositionDeco.size && (r.observer.flush(), Vc(r, !0)));
  }, ae.compositionend = (r) => {
    r.inputState.composing = -1, r.inputState.compositionEndedAt = Date.now(), r.inputState.compositionFirstChange = null, setTimeout(() => {
      r.inputState.composing < 0 && Vc(r, !1);
    }, 50);
  }, ae.contextmenu = (r) => {
    r.inputState.lastContextMenu = Date.now();
  }, ae.beforeinput = (r, t) => {
    var e;
    let i;
    if (B.chrome && B.android && (i = _c.find((n) => n.inputType == t.inputType)) && (r.observer.delayAndroidKey(i.key, i.keyCode), i.key == "Backspace" || i.key == "Delete")) {
      let n = ((e = window.visualViewport) === null || e === void 0 ? void 0 : e.height) || 0;
      setTimeout(() => {
        var s;
        (((s = window.visualViewport) === null || s === void 0 ? void 0 : s.height) || 0) > n + 10 && r.hasFocus && (r.contentDOM.blur(), r.focus());
      }, 100);
    }
  };
  const Lc = ["pre-wrap", "normal", "pre-line", "break-spaces"];
  class vm {
    constructor() {
      this.doc = c.empty, this.lineWrapping = !1, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.lineLength = 30, this.heightChanged = !1;
    }
    heightForGap(t, e) {
      let i = this.doc.lineAt(e).number - this.doc.lineAt(t).number + 1;
      return this.lineWrapping && (i += Math.ceil((e - t - i * this.lineLength * 0.5) / this.lineLength)), this.lineHeight * i;
    }
    heightForLine(t) {
      return this.lineWrapping ? (1 + Math.max(0, Math.ceil((t - this.lineLength) / (this.lineLength - 5)))) * this.lineHeight : this.lineHeight;
    }
    setDoc(t) {
      return this.doc = t, this;
    }
    mustRefreshForWrapping(t) {
      return Lc.indexOf(t) > -1 != this.lineWrapping;
    }
    mustRefreshForHeights(t) {
      let e = !1;
      for (let i = 0; i < t.length; i++) {
        let n = t[i];
        n < 0 ? i++ : this.heightSamples[Math.floor(n * 10)] || (e = !0, this.heightSamples[Math.floor(n * 10)] = !0);
      }
      return e;
    }
    refresh(t, e, i, n, s) {
      let o = Lc.indexOf(t) > -1, a = Math.round(e) != Math.round(this.lineHeight) || this.lineWrapping != o;
      if (this.lineWrapping = o, this.lineHeight = e, this.charWidth = i, this.lineLength = n, a) {
        this.heightSamples = {};
        for (let l = 0; l < s.length; l++) {
          let u = s[l];
          u < 0 ? l++ : this.heightSamples[Math.floor(u * 10)] = !0;
        }
      }
      return a;
    }
  }
  class Qm {
    constructor(t, e) {
      this.from = t, this.heights = e, this.index = 0;
    }
    get more() {
      return this.index < this.heights.length;
    }
  }
  class Sr {
    constructor(t, e, i, n, s) {
      this.from = t, this.length = e, this.top = i, this.height = n, this.type = s;
    }
    get to() {
      return this.from + this.length;
    }
    get bottom() {
      return this.top + this.height;
    }
    join(t) {
      let e = (Array.isArray(this.type) ? this.type : [this]).concat(Array.isArray(t.type) ? t.type : [t]);
      return new Sr(this.from, this.length + t.length, this.top, this.height + t.height, e);
    }
  }
  var Xt = /* @__PURE__ */ function(r) {
    return r[r.ByPos = 0] = "ByPos", r[r.ByHeight = 1] = "ByHeight", r[r.ByPosNoHeight = 2] = "ByPosNoHeight", r;
  }(Xt || (Xt = {}));
  const eo = 1e-3;
  class _e {
    constructor(t, e, i = 2) {
      this.length = t, this.height = e, this.flags = i;
    }
    get outdated() {
      return (this.flags & 2) > 0;
    }
    set outdated(t) {
      this.flags = (t ? 2 : 0) | this.flags & -3;
    }
    setHeight(t, e) {
      this.height != e && (Math.abs(this.height - e) > eo && (t.heightChanged = !0), this.height = e);
    }
    replace(t, e, i) {
      return _e.of(i);
    }
    decomposeLeft(t, e) {
      e.push(this);
    }
    decomposeRight(t, e) {
      e.push(this);
    }
    applyChanges(t, e, i, n) {
      let s = this;
      for (let o = n.length - 1; o >= 0; o--) {
        let { fromA: a, toA: l, fromB: u, toB: d } = n[o], O = s.lineAt(a, Xt.ByPosNoHeight, e, 0, 0), m = O.to >= l ? O : s.lineAt(l, Xt.ByPosNoHeight, e, 0, 0);
        for (d += m.to - l, l = m.to; o > 0 && O.from <= n[o - 1].toA; )
          a = n[o - 1].fromA, u = n[o - 1].fromB, o--, a < O.from && (O = s.lineAt(a, Xt.ByPosNoHeight, e, 0, 0));
        u += O.from - a, a = O.from;
        let Q = il.build(i, t, u, d);
        s = s.replace(a, l, Q);
      }
      return s.updateHeight(i, 0);
    }
    static empty() {
      return new Ve(0, 0);
    }
    static of(t) {
      if (t.length == 1)
        return t[0];
      let e = 0, i = t.length, n = 0, s = 0;
      for (; ; )
        if (e == i)
          if (n > s * 2) {
            let a = t[e - 1];
            a.break ? t.splice(--e, 1, a.left, null, a.right) : t.splice(--e, 1, a.left, a.right), i += 1 + a.break, n -= a.size;
          } else if (s > n * 2) {
            let a = t[i];
            a.break ? t.splice(i, 1, a.left, null, a.right) : t.splice(i, 1, a.left, a.right), i += 2 + a.break, s -= a.size;
          } else
            break;
        else if (n < s) {
          let a = t[e++];
          a && (n += a.size);
        } else {
          let a = t[--i];
          a && (s += a.size);
        }
      let o = 0;
      return t[e - 1] == null ? (o = 1, e--) : t[e] == null && (o = 1, i++), new ym(_e.of(t.slice(0, e)), o, _e.of(t.slice(i)));
    }
  }
  _e.prototype.size = 1;
  class Uc extends _e {
    constructor(t, e, i) {
      super(t, e), this.type = i;
    }
    blockAt(t, e, i, n) {
      return new Sr(n, this.length, i, this.height, this.type);
    }
    lineAt(t, e, i, n, s) {
      return this.blockAt(0, i, n, s);
    }
    forEachLine(t, e, i, n, s, o) {
      t <= s + this.length && e >= s && o(this.blockAt(0, i, n, s));
    }
    updateHeight(t, e = 0, i = !1, n) {
      return n && n.from <= e && n.more && this.setHeight(t, n.heights[n.index++]), this.outdated = !1, this;
    }
    toString() {
      return `block(${this.length})`;
    }
  }
  class Ve extends Uc {
    constructor(t, e) {
      super(t, e, Wt.Text), this.collapsed = 0, this.widgetHeight = 0;
    }
    replace(t, e, i) {
      let n = i[0];
      return i.length == 1 && (n instanceof Ve || n instanceof de && n.flags & 4) && Math.abs(this.length - n.length) < 10 ? (n instanceof de ? n = new Ve(n.length, this.height) : n.height = this.height, this.outdated || (n.outdated = !1), n) : _e.of(i);
    }
    updateHeight(t, e = 0, i = !1, n) {
      return n && n.from <= e && n.more ? this.setHeight(t, n.heights[n.index++]) : (i || this.outdated) && this.setHeight(t, Math.max(this.widgetHeight, t.heightForLine(this.length - this.collapsed))), this.outdated = !1, this;
    }
    toString() {
      return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
    }
  }
  class de extends _e {
    constructor(t) {
      super(t, 0);
    }
    lines(t, e) {
      let i = t.lineAt(e).number, n = t.lineAt(e + this.length).number;
      return { firstLine: i, lastLine: n, lineHeight: this.height / (n - i + 1) };
    }
    blockAt(t, e, i, n) {
      let { firstLine: s, lastLine: o, lineHeight: a } = this.lines(e, n), l = Math.max(0, Math.min(o - s, Math.floor((t - i) / a))), { from: u, length: d } = e.line(s + l);
      return new Sr(u, d, i + a * l, a, Wt.Text);
    }
    lineAt(t, e, i, n, s) {
      if (e == Xt.ByHeight)
        return this.blockAt(t, i, n, s);
      if (e == Xt.ByPosNoHeight) {
        let { from: O, to: m } = i.lineAt(t);
        return new Sr(O, m - O, 0, 0, Wt.Text);
      }
      let { firstLine: o, lineHeight: a } = this.lines(i, s), { from: l, length: u, number: d } = i.lineAt(t);
      return new Sr(l, u, n + a * (d - o), a, Wt.Text);
    }
    forEachLine(t, e, i, n, s, o) {
      let { firstLine: a, lineHeight: l } = this.lines(i, s);
      for (let u = Math.max(t, s), d = Math.min(s + this.length, e); u <= d; ) {
        let O = i.lineAt(u);
        u == t && (n += l * (O.number - a)), o(new Sr(O.from, O.length, n, l, Wt.Text)), n += l, u = O.to + 1;
      }
    }
    replace(t, e, i) {
      let n = this.length - e;
      if (n > 0) {
        let s = i[i.length - 1];
        s instanceof de ? i[i.length - 1] = new de(s.length + n) : i.push(null, new de(n - 1));
      }
      if (t > 0) {
        let s = i[0];
        s instanceof de ? i[0] = new de(t + s.length) : i.unshift(new de(t - 1), null);
      }
      return _e.of(i);
    }
    decomposeLeft(t, e) {
      e.push(new de(t - 1), null);
    }
    decomposeRight(t, e) {
      e.push(null, new de(this.length - t - 1));
    }
    updateHeight(t, e = 0, i = !1, n) {
      let s = e + this.length;
      if (n && n.from <= e + this.length && n.more) {
        let o = [], a = Math.max(e, n.from), l = -1, u = t.heightChanged;
        for (n.from > e && o.push(new de(n.from - e - 1).updateHeight(t, e)); a <= s && n.more; ) {
          let O = t.doc.lineAt(a).length;
          o.length && o.push(null);
          let m = n.heights[n.index++];
          l == -1 ? l = m : Math.abs(m - l) >= eo && (l = -2);
          let Q = new Ve(O, m);
          Q.outdated = !1, o.push(Q), a += O + 1;
        }
        a <= s && o.push(null, new de(s - a).updateHeight(t, a));
        let d = _e.of(o);
        return t.heightChanged = u || l < 0 || Math.abs(d.height - this.height) >= eo || Math.abs(l - this.lines(t.doc, e).lineHeight) >= eo, d;
      } else
        (i || this.outdated) && (this.setHeight(t, t.heightForGap(e, e + this.length)), this.outdated = !1);
      return this;
    }
    toString() {
      return `gap(${this.length})`;
    }
  }
  class ym extends _e {
    constructor(t, e, i) {
      super(t.length + e + i.length, t.height + i.height, e | (t.outdated || i.outdated ? 2 : 0)), this.left = t, this.right = i, this.size = t.size + i.size;
    }
    get break() {
      return this.flags & 1;
    }
    blockAt(t, e, i, n) {
      let s = i + this.left.height;
      return t < s ? this.left.blockAt(t, e, i, n) : this.right.blockAt(t, e, s, n + this.left.length + this.break);
    }
    lineAt(t, e, i, n, s) {
      let o = n + this.left.height, a = s + this.left.length + this.break, l = e == Xt.ByHeight ? t < o : t < a, u = l ? this.left.lineAt(t, e, i, n, s) : this.right.lineAt(t, e, i, o, a);
      if (this.break || (l ? u.to < a : u.from > a))
        return u;
      let d = e == Xt.ByPosNoHeight ? Xt.ByPosNoHeight : Xt.ByPos;
      return l ? u.join(this.right.lineAt(a, d, i, o, a)) : this.left.lineAt(a, d, i, n, s).join(u);
    }
    forEachLine(t, e, i, n, s, o) {
      let a = n + this.left.height, l = s + this.left.length + this.break;
      if (this.break)
        t < l && this.left.forEachLine(t, e, i, n, s, o), e >= l && this.right.forEachLine(t, e, i, a, l, o);
      else {
        let u = this.lineAt(l, Xt.ByPos, i, n, s);
        t < u.from && this.left.forEachLine(t, u.from - 1, i, n, s, o), u.to >= t && u.from <= e && o(u), e > u.to && this.right.forEachLine(u.to + 1, e, i, a, l, o);
      }
    }
    replace(t, e, i) {
      let n = this.left.length + this.break;
      if (e < n)
        return this.balanced(this.left.replace(t, e, i), this.right);
      if (t > this.left.length)
        return this.balanced(this.left, this.right.replace(t - n, e - n, i));
      let s = [];
      t > 0 && this.decomposeLeft(t, s);
      let o = s.length;
      for (let a of i)
        s.push(a);
      if (t > 0 && Bc(s, o - 1), e < this.length) {
        let a = s.length;
        this.decomposeRight(e, s), Bc(s, a);
      }
      return _e.of(s);
    }
    decomposeLeft(t, e) {
      let i = this.left.length;
      if (t <= i)
        return this.left.decomposeLeft(t, e);
      e.push(this.left), this.break && (i++, t >= i && e.push(null)), t > i && this.right.decomposeLeft(t - i, e);
    }
    decomposeRight(t, e) {
      let i = this.left.length, n = i + this.break;
      if (t >= n)
        return this.right.decomposeRight(t - n, e);
      t < i && this.left.decomposeRight(t, e), this.break && t < n && e.push(null), e.push(this.right);
    }
    balanced(t, e) {
      return t.size > 2 * e.size || e.size > 2 * t.size ? _e.of(this.break ? [t, null, e] : [t, e]) : (this.left = t, this.right = e, this.height = t.height + e.height, this.outdated = t.outdated || e.outdated, this.size = t.size + e.size, this.length = t.length + this.break + e.length, this);
    }
    updateHeight(t, e = 0, i = !1, n) {
      let { left: s, right: o } = this, a = e + s.length + this.break, l = null;
      return n && n.from <= e + s.length && n.more ? l = s = s.updateHeight(t, e, i, n) : s.updateHeight(t, e, i), n && n.from <= a + o.length && n.more ? l = o = o.updateHeight(t, a, i, n) : o.updateHeight(t, a, i), l ? this.balanced(s, o) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
    }
    toString() {
      return this.left + (this.break ? " " : "-") + this.right;
    }
  }
  function Bc(r, t) {
    let e, i;
    r[t] == null && (e = r[t - 1]) instanceof de && (i = r[t + 1]) instanceof de && r.splice(t - 1, 3, new de(e.length + 1 + i.length));
  }
  const bm = 5;
  class il {
    constructor(t, e) {
      this.pos = t, this.oracle = e, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = t;
    }
    get isCovered() {
      return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
    }
    span(t, e) {
      if (this.lineStart > -1) {
        let i = Math.min(e, this.lineEnd), n = this.nodes[this.nodes.length - 1];
        n instanceof Ve ? n.length += i - this.pos : (i > this.pos || !this.isCovered) && this.nodes.push(new Ve(i - this.pos, -1)), this.writtenTo = i, e > i && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
      }
      this.pos = e;
    }
    point(t, e, i) {
      if (t < e || i.heightRelevant) {
        let n = i.widget ? i.widget.estimatedHeight : 0;
        n < 0 && (n = this.oracle.lineHeight);
        let s = e - t;
        i.block ? this.addBlock(new Uc(s, n, i.type)) : (s || n >= bm) && this.addLineDeco(n, s);
      } else
        e > t && this.span(t, e);
      this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
    }
    enterLine() {
      if (this.lineStart > -1)
        return;
      let { from: t, to: e } = this.oracle.doc.lineAt(this.pos);
      this.lineStart = t, this.lineEnd = e, this.writtenTo < t && ((this.writtenTo < t - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, t - 1)), this.nodes.push(null)), this.pos > t && this.nodes.push(new Ve(this.pos - t, -1)), this.writtenTo = this.pos;
    }
    blankContent(t, e) {
      let i = new de(e - t);
      return this.oracle.doc.lineAt(t).to == e && (i.flags |= 4), i;
    }
    ensureLine() {
      this.enterLine();
      let t = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
      if (t instanceof Ve)
        return t;
      let e = new Ve(0, -1);
      return this.nodes.push(e), e;
    }
    addBlock(t) {
      this.enterLine(), t.type == Wt.WidgetAfter && !this.isCovered && this.ensureLine(), this.nodes.push(t), this.writtenTo = this.pos = this.pos + t.length, t.type != Wt.WidgetBefore && (this.covering = t);
    }
    addLineDeco(t, e) {
      let i = this.ensureLine();
      i.length += e, i.collapsed += e, i.widgetHeight = Math.max(i.widgetHeight, t), this.writtenTo = this.pos = this.pos + e;
    }
    finish(t) {
      let e = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
      this.lineStart > -1 && !(e instanceof Ve) && !this.isCovered ? this.nodes.push(new Ve(0, -1)) : (this.writtenTo < this.pos || e == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
      let i = t;
      for (let n of this.nodes)
        n instanceof Ve && n.updateHeight(this.oracle, i), i += n ? n.length : 1;
      return this.nodes;
    }
    static build(t, e, i, n) {
      let s = new il(i, t);
      return rt.spans(e, i, n, s, 0), s.finish(i);
    }
  }
  function wm(r, t, e) {
    let i = new xm();
    return rt.compare(r, t, e, i, 0), i.changes;
  }
  class xm {
    constructor() {
      this.changes = [];
    }
    compareRange() {
    }
    comparePoint(t, e, i, n) {
      (t < e || i && i.heightRelevant || n && n.heightRelevant) && Ga(t, e, this.changes, 5);
    }
  }
  function Sm(r, t) {
    let e = r.getBoundingClientRect(), i = Math.max(0, e.left), n = Math.min(innerWidth, e.right), s = Math.max(0, e.top), o = Math.min(innerHeight, e.bottom), a = r.ownerDocument.body;
    for (let l = r.parentNode; l && l != a; )
      if (l.nodeType == 1) {
        let u = l, d = window.getComputedStyle(u);
        if ((u.scrollHeight > u.clientHeight || u.scrollWidth > u.clientWidth) && d.overflow != "visible") {
          let O = u.getBoundingClientRect();
          i = Math.max(i, O.left), n = Math.min(n, O.right), s = Math.max(s, O.top), o = Math.min(o, O.bottom);
        }
        l = d.position == "absolute" || d.position == "fixed" ? u.offsetParent : u.parentNode;
      } else if (l.nodeType == 11)
        l = l.host;
      else
        break;
    return {
      left: i - e.left,
      right: Math.max(i, n) - e.left,
      top: s - (e.top + t),
      bottom: Math.max(s, o) - (e.top + t)
    };
  }
  function km(r, t) {
    let e = r.getBoundingClientRect();
    return {
      left: 0,
      right: e.right - e.left,
      top: t,
      bottom: e.bottom - (e.top + t)
    };
  }
  class rl {
    constructor(t, e, i) {
      this.from = t, this.to = e, this.size = i;
    }
    static same(t, e) {
      if (t.length != e.length)
        return !1;
      for (let i = 0; i < t.length; i++) {
        let n = t[i], s = e[i];
        if (n.from != s.from || n.to != s.to || n.size != s.size)
          return !1;
      }
      return !0;
    }
    draw(t) {
      return it.replace({ widget: new $m(this.size, t) }).range(this.from, this.to);
    }
  }
  class $m extends wr {
    constructor(t, e) {
      super(), this.size = t, this.vertical = e;
    }
    eq(t) {
      return t.size == this.size && t.vertical == this.vertical;
    }
    toDOM() {
      let t = document.createElement("div");
      return this.vertical ? t.style.height = this.size + "px" : (t.style.width = this.size + "px", t.style.height = "2px", t.style.display = "inline-block"), t;
    }
    get estimatedHeight() {
      return this.vertical ? this.size : -1;
    }
  }
  class Yc {
    constructor(t) {
      this.state = t, this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 }, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.heightOracle = new vm(), this.scaler = Jc, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = Vt.RTL, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1, this.stateDeco = t.facet(ts).filter((e) => typeof e != "function"), this.heightMap = _e.empty().applyChanges(this.stateDeco, c.empty, this.heightOracle.setDoc(t.doc), [new or(0, 0, 0, t.doc.length)]), this.viewport = this.getViewport(0, null), this.updateViewportLines(), this.updateForViewport(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = it.set(this.lineGaps.map((e) => e.draw(!1))), this.computeVisibleRanges();
    }
    updateForViewport() {
      let t = [this.viewport], { main: e } = this.state.selection;
      for (let i = 0; i <= 1; i++) {
        let n = i ? e.head : e.anchor;
        if (!t.some(({ from: s, to: o }) => n >= s && n <= o)) {
          let { from: s, to: o } = this.lineBlockAt(n);
          t.push(new io(s, o));
        }
      }
      this.viewports = t.sort((i, n) => i.from - n.from), this.scaler = this.heightMap.height <= 7e6 ? Jc : new Rm(this.heightOracle.doc, this.heightMap, this.viewports);
    }
    updateViewportLines() {
      this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.state.doc, 0, 0, (t) => {
        this.viewportLines.push(this.scaler.scale == 1 ? t : is(t, this.scaler));
      });
    }
    update(t, e = null) {
      this.state = t.state;
      let i = this.stateDeco;
      this.stateDeco = this.state.facet(ts).filter((u) => typeof u != "function");
      let n = t.changedRanges, s = or.extendWithRanges(n, wm(i, this.stateDeco, t ? t.changes : xt.empty(this.state.doc.length))), o = this.heightMap.height;
      this.heightMap = this.heightMap.applyChanges(this.stateDeco, t.startState.doc, this.heightOracle.setDoc(this.state.doc), s), this.heightMap.height != o && (t.flags |= 2);
      let a = s.length ? this.mapViewport(this.viewport, t.changes) : this.viewport;
      (e && (e.range.head < a.from || e.range.head > a.to) || !this.viewportIsAppropriate(a)) && (a = this.getViewport(0, e));
      let l = !t.changes.empty || t.flags & 2 || a.from != this.viewport.from || a.to != this.viewport.to;
      this.viewport = a, this.updateForViewport(), l && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, t.changes))), t.flags |= this.computeVisibleRanges(), e && (this.scrollTarget = e), !this.mustEnforceCursorAssoc && t.selectionSet && t.view.lineWrapping && t.state.selection.main.empty && t.state.selection.main.assoc && (this.mustEnforceCursorAssoc = !0);
    }
    measure(t) {
      let e = t.contentDOM, i = window.getComputedStyle(e), n = this.heightOracle, s = i.whiteSpace;
      this.defaultTextDirection = i.direction == "rtl" ? Vt.RTL : Vt.LTR;
      let o = this.heightOracle.mustRefreshForWrapping(s), a = o || this.mustMeasureContent || this.contentDOMHeight != e.clientHeight;
      this.contentDOMHeight = e.clientHeight, this.mustMeasureContent = !1;
      let l = 0, u = 0, d = parseInt(i.paddingTop) || 0, O = parseInt(i.paddingBottom) || 0;
      (this.paddingTop != d || this.paddingBottom != O) && (this.paddingTop = d, this.paddingBottom = O, l |= 10), this.editorWidth != t.scrollDOM.clientWidth && (n.lineWrapping && (a = !0), this.editorWidth = t.scrollDOM.clientWidth, l |= 8);
      let m = (this.printing ? km : Sm)(e, this.paddingTop), Q = m.top - this.pixelViewport.top, b = m.bottom - this.pixelViewport.bottom;
      this.pixelViewport = m;
      let C = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
      if (C != this.inView && (this.inView = C, C && (a = !0)), !this.inView)
        return 0;
      let A = e.clientWidth;
      if ((this.contentDOMWidth != A || this.editorHeight != t.scrollDOM.clientHeight) && (this.contentDOMWidth = A, this.editorHeight = t.scrollDOM.clientHeight, l |= 8), a) {
        let U = t.docView.measureVisibleLineHeights(this.viewport);
        if (n.mustRefreshForHeights(U) && (o = !0), o || n.lineWrapping && Math.abs(A - this.contentDOMWidth) > n.charWidth) {
          let { lineHeight: Y, charWidth: G } = t.docView.measureTextSize();
          o = n.refresh(s, Y, G, A / G, U), o && (t.docView.minWidth = 0, l |= 8);
        }
        Q > 0 && b > 0 ? u = Math.max(Q, b) : Q < 0 && b < 0 && (u = Math.min(Q, b)), n.heightChanged = !1;
        for (let Y of this.viewports) {
          let G = Y.from == this.viewport.from ? U : t.docView.measureVisibleLineHeights(Y);
          this.heightMap = this.heightMap.updateHeight(n, 0, o, new Qm(Y.from, G));
        }
        n.heightChanged && (l |= 2);
      }
      let M = !this.viewportIsAppropriate(this.viewport, u) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
      return M && (this.viewport = this.getViewport(u, this.scrollTarget)), this.updateForViewport(), (l & 2 || M) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(o ? [] : this.lineGaps)), l |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, t.docView.enforceCursorAssoc()), l;
    }
    get visibleTop() {
      return this.scaler.fromDOM(this.pixelViewport.top);
    }
    get visibleBottom() {
      return this.scaler.fromDOM(this.pixelViewport.bottom);
    }
    getViewport(t, e) {
      let i = 0.5 - Math.max(-0.5, Math.min(0.5, t / 1e3 / 2)), n = this.heightMap, s = this.state.doc, { visibleTop: o, visibleBottom: a } = this, l = new io(n.lineAt(o - i * 1e3, Xt.ByHeight, s, 0, 0).from, n.lineAt(a + (1 - i) * 1e3, Xt.ByHeight, s, 0, 0).to);
      if (e) {
        let { head: u } = e.range;
        if (u < l.from || u > l.to) {
          let d = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), O = n.lineAt(u, Xt.ByPos, s, 0, 0), m;
          e.y == "center" ? m = (O.top + O.bottom) / 2 - d / 2 : e.y == "start" || e.y == "nearest" && u < l.from ? m = O.top : m = O.bottom - d, l = new io(n.lineAt(m - 1e3 / 2, Xt.ByHeight, s, 0, 0).from, n.lineAt(m + d + 1e3 / 2, Xt.ByHeight, s, 0, 0).to);
        }
      }
      return l;
    }
    mapViewport(t, e) {
      let i = e.mapPos(t.from, -1), n = e.mapPos(t.to, 1);
      return new io(this.heightMap.lineAt(i, Xt.ByPos, this.state.doc, 0, 0).from, this.heightMap.lineAt(n, Xt.ByPos, this.state.doc, 0, 0).to);
    }
    viewportIsAppropriate({ from: t, to: e }, i = 0) {
      if (!this.inView)
        return !0;
      let { top: n } = this.heightMap.lineAt(t, Xt.ByPos, this.state.doc, 0, 0), { bottom: s } = this.heightMap.lineAt(e, Xt.ByPos, this.state.doc, 0, 0), { visibleTop: o, visibleBottom: a } = this;
      return (t == 0 || n <= o - Math.max(10, Math.min(-i, 250))) && (e == this.state.doc.length || s >= a + Math.max(10, Math.min(i, 250))) && n > o - 2 * 1e3 && s < a + 2 * 1e3;
    }
    mapLineGaps(t, e) {
      if (!t.length || e.empty)
        return t;
      let i = [];
      for (let n of t)
        e.touchesRange(n.from, n.to) || i.push(new rl(e.mapPos(n.from), e.mapPos(n.to), n.size));
      return i;
    }
    ensureLineGaps(t) {
      let e = [];
      if (this.defaultTextDirection != Vt.LTR)
        return e;
      for (let i of this.viewportLines) {
        if (i.length < 4e3)
          continue;
        let n = Tm(i.from, i.to, this.stateDeco);
        if (n.total < 4e3)
          continue;
        let s, o;
        if (this.heightOracle.lineWrapping) {
          let u = 2e3 / this.heightOracle.lineLength * this.heightOracle.lineHeight;
          s = ro(n, (this.visibleTop - i.top - u) / i.height), o = ro(n, (this.visibleBottom - i.top + u) / i.height);
        } else {
          let u = n.total * this.heightOracle.charWidth, d = 2e3 * this.heightOracle.charWidth;
          s = ro(n, (this.pixelViewport.left - d) / u), o = ro(n, (this.pixelViewport.right + d) / u);
        }
        let a = [];
        s > i.from && a.push({ from: i.from, to: s }), o < i.to && a.push({ from: o, to: i.to });
        let l = this.state.selection.main;
        l.from >= i.from && l.from <= i.to && Hc(a, l.from - 10, l.from + 10), !l.empty && l.to >= i.from && l.to <= i.to && Hc(a, l.to - 10, l.to + 10);
        for (let { from: u, to: d } of a)
          d - u > 1e3 && e.push(Pm(t, (O) => O.from >= i.from && O.to <= i.to && Math.abs(O.from - u) < 1e3 && Math.abs(O.to - d) < 1e3) || new rl(u, d, this.gapSize(i, u, d, n)));
      }
      return e;
    }
    gapSize(t, e, i, n) {
      let s = Fc(n, i) - Fc(n, e);
      return this.heightOracle.lineWrapping ? t.height * s : n.total * this.heightOracle.charWidth * s;
    }
    updateLineGaps(t) {
      rl.same(t, this.lineGaps) || (this.lineGaps = t, this.lineGapDeco = it.set(t.map((e) => e.draw(this.heightOracle.lineWrapping))));
    }
    computeVisibleRanges() {
      let t = this.stateDeco;
      this.lineGaps.length && (t = t.concat(this.lineGapDeco));
      let e = [];
      rt.spans(t, this.viewport.from, this.viewport.to, {
        span(n, s) {
          e.push({ from: n, to: s });
        },
        point() {
        }
      }, 20);
      let i = e.length != this.visibleRanges.length || this.visibleRanges.some((n, s) => n.from != e[s].from || n.to != e[s].to);
      return this.visibleRanges = e, i ? 4 : 0;
    }
    lineBlockAt(t) {
      return t >= this.viewport.from && t <= this.viewport.to && this.viewportLines.find((e) => e.from <= t && e.to >= t) || is(this.heightMap.lineAt(t, Xt.ByPos, this.state.doc, 0, 0), this.scaler);
    }
    lineBlockAtHeight(t) {
      return is(this.heightMap.lineAt(this.scaler.fromDOM(t), Xt.ByHeight, this.state.doc, 0, 0), this.scaler);
    }
    elementAtHeight(t) {
      return is(this.heightMap.blockAt(this.scaler.fromDOM(t), this.state.doc, 0, 0), this.scaler);
    }
    get docHeight() {
      return this.scaler.toDOM(this.heightMap.height);
    }
    get contentHeight() {
      return this.docHeight + this.paddingTop + this.paddingBottom;
    }
  }
  class io {
    constructor(t, e) {
      this.from = t, this.to = e;
    }
  }
  function Tm(r, t, e) {
    let i = [], n = r, s = 0;
    return rt.spans(e, r, t, {
      span() {
      },
      point(o, a) {
        o > n && (i.push({ from: n, to: o }), s += o - n), n = a;
      }
    }, 20), n < t && (i.push({ from: n, to: t }), s += t - n), { total: s, ranges: i };
  }
  function ro({ total: r, ranges: t }, e) {
    if (e <= 0)
      return t[0].from;
    if (e >= 1)
      return t[t.length - 1].to;
    let i = Math.floor(r * e);
    for (let n = 0; ; n++) {
      let { from: s, to: o } = t[n], a = o - s;
      if (i <= a)
        return s + i;
      i -= a;
    }
  }
  function Fc(r, t) {
    let e = 0;
    for (let { from: i, to: n } of r.ranges) {
      if (t <= n) {
        e += t - i;
        break;
      }
      e += n - i;
    }
    return e / r.total;
  }
  function Hc(r, t, e) {
    for (let i = 0; i < r.length; i++) {
      let n = r[i];
      if (n.from < e && n.to > t) {
        let s = [];
        n.from < t && s.push({ from: n.from, to: t }), n.to > e && s.push({ from: e, to: n.to }), r.splice(i, 1, ...s), i += s.length - 1;
      }
    }
  }
  function Pm(r, t) {
    for (let e of r)
      if (t(e))
        return e;
  }
  const Jc = {
    toDOM(r) {
      return r;
    },
    fromDOM(r) {
      return r;
    },
    scale: 1
  };
  class Rm {
    constructor(t, e, i) {
      let n = 0, s = 0, o = 0;
      this.viewports = i.map(({ from: a, to: l }) => {
        let u = e.lineAt(a, Xt.ByPos, t, 0, 0).top, d = e.lineAt(l, Xt.ByPos, t, 0, 0).bottom;
        return n += d - u, { from: a, to: l, top: u, bottom: d, domTop: 0, domBottom: 0 };
      }), this.scale = (7e6 - n) / (e.height - n);
      for (let a of this.viewports)
        a.domTop = o + (a.top - s) * this.scale, o = a.domBottom = a.domTop + (a.bottom - a.top), s = a.bottom;
    }
    toDOM(t) {
      for (let e = 0, i = 0, n = 0; ; e++) {
        let s = e < this.viewports.length ? this.viewports[e] : null;
        if (!s || t < s.top)
          return n + (t - i) * this.scale;
        if (t <= s.bottom)
          return s.domTop + (t - s.top);
        i = s.bottom, n = s.domBottom;
      }
    }
    fromDOM(t) {
      for (let e = 0, i = 0, n = 0; ; e++) {
        let s = e < this.viewports.length ? this.viewports[e] : null;
        if (!s || t < s.domTop)
          return i + (t - n) / this.scale;
        if (t <= s.domBottom)
          return s.top + (t - s.domTop);
        i = s.bottom, n = s.domBottom;
      }
    }
  }
  function is(r, t) {
    if (t.scale == 1)
      return r;
    let e = t.toDOM(r.top), i = t.toDOM(r.bottom);
    return new Sr(r.from, r.length, e, i - e, Array.isArray(r.type) ? r.type.map((n) => is(n, t)) : r.type);
  }
  const no = /* @__PURE__ */ V.define({ combine: (r) => r.join(" ") }), nl = /* @__PURE__ */ V.define({ combine: (r) => r.indexOf(!0) > -1 }), sl = /* @__PURE__ */ he.newName(), Kc = /* @__PURE__ */ he.newName(), tu = /* @__PURE__ */ he.newName(), eu = { "&light": "." + Kc, "&dark": "." + tu };
  function ol(r, t, e) {
    return new he(t, {
      finish(i) {
        return /&/.test(i) ? i.replace(/&\w*/, (n) => {
          if (n == "&")
            return r;
          if (!e || !e[n])
            throw new RangeError(`Unsupported selector: ${n}`);
          return e[n];
        }) : r + " " + i;
      }
    });
  }
  const Cm = /* @__PURE__ */ ol("." + sl, {
    "&.cm-editor": {
      position: "relative !important",
      boxSizing: "border-box",
      "&.cm-focused": {
        outline: "1px dotted #212121"
      },
      display: "flex !important",
      flexDirection: "column"
    },
    ".cm-scroller": {
      display: "flex !important",
      alignItems: "flex-start !important",
      fontFamily: "monospace",
      lineHeight: 1.4,
      height: "100%",
      overflowX: "auto",
      position: "relative",
      zIndex: 0
    },
    ".cm-content": {
      margin: 0,
      flexGrow: 2,
      flexShrink: 0,
      minHeight: "100%",
      display: "block",
      whiteSpace: "pre",
      wordWrap: "normal",
      boxSizing: "border-box",
      padding: "4px 0",
      outline: "none",
      "&[contenteditable=true]": {
        WebkitUserModify: "read-write-plaintext-only"
      }
    },
    ".cm-lineWrapping": {
      whiteSpace_fallback: "pre-wrap",
      whiteSpace: "break-spaces",
      wordBreak: "break-word",
      overflowWrap: "anywhere",
      flexShrink: 1
    },
    "&light .cm-content": { caretColor: "black" },
    "&dark .cm-content": { caretColor: "white" },
    ".cm-line": {
      display: "block",
      padding: "0 2px 0 4px"
    },
    ".cm-selectionLayer": {
      zIndex: -1,
      contain: "size style"
    },
    ".cm-selectionBackground": {
      position: "absolute"
    },
    "&light .cm-selectionBackground": {
      background: "#d9d9d9"
    },
    "&dark .cm-selectionBackground": {
      background: "#222"
    },
    "&light.cm-focused .cm-selectionBackground": {
      background: "#d7d4f0"
    },
    "&dark.cm-focused .cm-selectionBackground": {
      background: "#233"
    },
    ".cm-cursorLayer": {
      zIndex: 100,
      contain: "size style",
      pointerEvents: "none"
    },
    "&.cm-focused .cm-cursorLayer": {
      animation: "steps(1) cm-blink 1.2s infinite"
    },
    "@keyframes cm-blink": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
    "@keyframes cm-blink2": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
    ".cm-cursor, .cm-dropCursor": {
      position: "absolute",
      borderLeft: "1.2px solid black",
      marginLeft: "-0.6px",
      pointerEvents: "none"
    },
    ".cm-cursor": {
      display: "none"
    },
    "&dark .cm-cursor": {
      borderLeftColor: "#444"
    },
    "&.cm-focused .cm-cursor": {
      display: "block"
    },
    "&light .cm-activeLine": { backgroundColor: "#f3f9ff" },
    "&dark .cm-activeLine": { backgroundColor: "#223039" },
    "&light .cm-specialChar": { color: "red" },
    "&dark .cm-specialChar": { color: "#f78" },
    ".cm-gutters": {
      flexShrink: 0,
      display: "flex",
      height: "100%",
      boxSizing: "border-box",
      left: 0,
      zIndex: 200
    },
    "&light .cm-gutters": {
      backgroundColor: "#f5f5f5",
      color: "#6c6c6c",
      borderRight: "1px solid #ddd"
    },
    "&dark .cm-gutters": {
      backgroundColor: "#333338",
      color: "#ccc"
    },
    ".cm-gutter": {
      display: "flex !important",
      flexDirection: "column",
      flexShrink: 0,
      boxSizing: "border-box",
      minHeight: "100%",
      overflow: "hidden"
    },
    ".cm-gutterElement": {
      boxSizing: "border-box"
    },
    ".cm-lineNumbers .cm-gutterElement": {
      padding: "0 3px 0 5px",
      minWidth: "20px",
      textAlign: "right",
      whiteSpace: "nowrap"
    },
    "&light .cm-activeLineGutter": {
      backgroundColor: "#e2f2ff"
    },
    "&dark .cm-activeLineGutter": {
      backgroundColor: "#222227"
    },
    ".cm-panels": {
      boxSizing: "border-box",
      position: "sticky",
      left: 0,
      right: 0
    },
    "&light .cm-panels": {
      backgroundColor: "#f5f5f5",
      color: "black"
    },
    "&light .cm-panels-top": {
      borderBottom: "1px solid #ddd"
    },
    "&light .cm-panels-bottom": {
      borderTop: "1px solid #ddd"
    },
    "&dark .cm-panels": {
      backgroundColor: "#333338",
      color: "white"
    },
    ".cm-tab": {
      display: "inline-block",
      overflow: "hidden",
      verticalAlign: "bottom"
    },
    ".cm-widgetBuffer": {
      verticalAlign: "text-top",
      height: "1em",
      display: "inline"
    },
    ".cm-placeholder": {
      color: "#888",
      display: "inline-block",
      verticalAlign: "top"
    },
    ".cm-button": {
      verticalAlign: "middle",
      color: "inherit",
      fontSize: "70%",
      padding: ".2em 1em",
      borderRadius: "1px"
    },
    "&light .cm-button": {
      backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
      border: "1px solid #888",
      "&:active": {
        backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)"
      }
    },
    "&dark .cm-button": {
      backgroundImage: "linear-gradient(#393939, #111)",
      border: "1px solid #888",
      "&:active": {
        backgroundImage: "linear-gradient(#111, #333)"
      }
    },
    ".cm-textfield": {
      verticalAlign: "middle",
      color: "inherit",
      fontSize: "70%",
      border: "1px solid silver",
      padding: ".2em .5em"
    },
    "&light .cm-textfield": {
      backgroundColor: "white"
    },
    "&dark .cm-textfield": {
      border: "1px solid #555",
      backgroundColor: "inherit"
    }
  }, eu), _m = {
    childList: !0,
    characterData: !0,
    subtree: !0,
    attributes: !0,
    characterDataOldValue: !0
  }, al = B.ie && B.ie_version <= 11;
  class Am {
    constructor(t, e, i) {
      this.view = t, this.onChange = e, this.onScrollChanged = i, this.active = !1, this.selectionRange = new Yr(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.scrollTargets = [], this.intersection = null, this.resize = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.parentCheck = -1, this.dom = t.contentDOM, this.observer = new MutationObserver((n) => {
        for (let s of n)
          this.queue.push(s);
        (B.ie && B.ie_version <= 11 || B.ios && t.composing) && n.some((s) => s.type == "childList" && s.removedNodes.length || s.type == "characterData" && s.oldValue.length > s.target.nodeValue.length) ? this.flushSoon() : this.flush();
      }), al && (this.onCharData = (n) => {
        this.queue.push({
          target: n.target,
          type: "characterData",
          oldValue: n.prevValue
        }), this.flushSoon();
      }), this.onSelectionChange = this.onSelectionChange.bind(this), window.addEventListener("resize", this.onResize = this.onResize.bind(this)), typeof ResizeObserver == "function" && (this.resize = new ResizeObserver(() => {
        this.view.docView.lastUpdate < Date.now() - 75 && this.onResize();
      }), this.resize.observe(t.scrollDOM)), window.addEventListener("beforeprint", this.onPrint = this.onPrint.bind(this)), this.start(), window.addEventListener("scroll", this.onScroll = this.onScroll.bind(this)), typeof IntersectionObserver == "function" && (this.intersection = new IntersectionObserver((n) => {
        this.parentCheck < 0 && (this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3)), n.length > 0 && n[n.length - 1].intersectionRatio > 0 != this.intersecting && (this.intersecting = !this.intersecting, this.intersecting != this.view.inView && this.onScrollChanged(document.createEvent("Event")));
      }, {}), this.intersection.observe(this.dom), this.gapIntersection = new IntersectionObserver((n) => {
        n.length > 0 && n[n.length - 1].intersectionRatio > 0 && this.onScrollChanged(document.createEvent("Event"));
      }, {})), this.listenForScroll(), this.readSelectionRange(), this.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
    }
    onScroll(t) {
      this.intersecting && this.flush(!1), this.onScrollChanged(t);
    }
    onResize() {
      this.resizeTimeout < 0 && (this.resizeTimeout = setTimeout(() => {
        this.resizeTimeout = -1, this.view.requestMeasure();
      }, 50));
    }
    onPrint() {
      this.view.viewState.printing = !0, this.view.measure(), setTimeout(() => {
        this.view.viewState.printing = !1, this.view.requestMeasure();
      }, 500);
    }
    updateGaps(t) {
      if (this.gapIntersection && (t.length != this.gaps.length || this.gaps.some((e, i) => e != t[i]))) {
        this.gapIntersection.disconnect();
        for (let e of t)
          this.gapIntersection.observe(e);
        this.gaps = t;
      }
    }
    onSelectionChange(t) {
      if (!this.readSelectionRange() || this.delayedAndroidKey)
        return;
      let { view: e } = this, i = this.selectionRange;
      if (e.state.facet(Ks) ? e.root.activeElement != this.dom : !ze(e.dom, i))
        return;
      let n = i.anchorNode && e.docView.nearest(i.anchorNode);
      n && n.ignoreEvent(t) || ((B.ie && B.ie_version <= 11 || B.android && B.chrome) && !e.state.selection.main.empty && i.focusNode && Ie(i.focusNode, i.focusOffset, i.anchorNode, i.anchorOffset) ? this.flushSoon() : this.flush(!1));
    }
    readSelectionRange() {
      let { view: t } = this, e = B.safari && t.root.nodeType == 11 && Ai() == this.dom && Wm(this.view) || Ce(t.root);
      if (!e || this.selectionRange.eq(e))
        return !1;
      let i = ze(this.dom, e);
      return i && !this.selectionChanged && this.selectionRange.focusNode && t.inputState.lastFocusTime > Date.now() - 200 && t.inputState.lastTouchTime < Date.now() - 300 && Wp(this.dom, e) ? (t.docView.updateSelection(), !1) : (this.selectionRange.setRange(e), i && (this.selectionChanged = !0), !0);
    }
    setSelectionRange(t, e) {
      this.selectionRange.set(t.node, t.offset, e.node, e.offset), this.selectionChanged = !1;
    }
    clearSelectionRange() {
      this.selectionRange.set(null, 0, null, 0);
    }
    listenForScroll() {
      this.parentCheck = -1;
      let t = 0, e = null;
      for (let i = this.dom; i; )
        if (i.nodeType == 1)
          !e && t < this.scrollTargets.length && this.scrollTargets[t] == i ? t++ : e || (e = this.scrollTargets.slice(0, t)), e && e.push(i), i = i.assignedSlot || i.parentNode;
        else if (i.nodeType == 11)
          i = i.host;
        else
          break;
      if (t < this.scrollTargets.length && !e && (e = this.scrollTargets.slice(0, t)), e) {
        for (let i of this.scrollTargets)
          i.removeEventListener("scroll", this.onScroll);
        for (let i of this.scrollTargets = e)
          i.addEventListener("scroll", this.onScroll);
      }
    }
    ignore(t) {
      if (!this.active)
        return t();
      try {
        return this.stop(), t();
      } finally {
        this.start(), this.clear();
      }
    }
    start() {
      this.active || (this.observer.observe(this.dom, _m), al && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = !0);
    }
    stop() {
      !this.active || (this.active = !1, this.observer.disconnect(), al && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
    }
    clear() {
      this.processRecords(), this.queue.length = 0, this.selectionChanged = !1;
    }
    delayAndroidKey(t, e) {
      this.delayedAndroidKey || requestAnimationFrame(() => {
        let i = this.delayedAndroidKey;
        this.delayedAndroidKey = null, this.delayedFlush = -1, this.flush() || sr(this.dom, i.key, i.keyCode);
      }), (!this.delayedAndroidKey || t == "Enter") && (this.delayedAndroidKey = { key: t, keyCode: e });
    }
    flushSoon() {
      this.delayedFlush < 0 && (this.delayedFlush = window.setTimeout(() => {
        this.delayedFlush = -1, this.flush();
      }, 20));
    }
    forceFlush() {
      this.delayedFlush >= 0 && (window.clearTimeout(this.delayedFlush), this.delayedFlush = -1), this.flush();
    }
    processRecords() {
      let t = this.queue;
      for (let s of this.observer.takeRecords())
        t.push(s);
      t.length && (this.queue = []);
      let e = -1, i = -1, n = !1;
      for (let s of t) {
        let o = this.readMutation(s);
        !o || (o.typeOver && (n = !0), e == -1 ? { from: e, to: i } = o : (e = Math.min(o.from, e), i = Math.max(o.to, i)));
      }
      return { from: e, to: i, typeOver: n };
    }
    flush(t = !0) {
      if (this.delayedFlush >= 0 || this.delayedAndroidKey)
        return;
      t && this.readSelectionRange();
      let { from: e, to: i, typeOver: n } = this.processRecords(), s = this.selectionChanged && ze(this.dom, this.selectionRange);
      if (e < 0 && !s)
        return;
      this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1;
      let o = this.view.state, a = this.onChange(e, i, n);
      return this.view.state == o && this.view.update([]), a;
    }
    readMutation(t) {
      let e = this.view.docView.nearest(t.target);
      if (!e || e.ignoreMutation(t))
        return null;
      if (e.markDirty(t.type == "attributes"), t.type == "attributes" && (e.dirty |= 4), t.type == "childList") {
        let i = iu(e, t.previousSibling || t.target.previousSibling, -1), n = iu(e, t.nextSibling || t.target.nextSibling, 1);
        return {
          from: i ? e.posAfter(i) : e.posAtStart,
          to: n ? e.posBefore(n) : e.posAtEnd,
          typeOver: !1
        };
      } else
        return t.type == "characterData" ? { from: e.posAtStart, to: e.posAtEnd, typeOver: t.target.nodeValue == t.oldValue } : null;
    }
    destroy() {
      var t, e, i;
      this.stop(), (t = this.intersection) === null || t === void 0 || t.disconnect(), (e = this.gapIntersection) === null || e === void 0 || e.disconnect(), (i = this.resize) === null || i === void 0 || i.disconnect();
      for (let n of this.scrollTargets)
        n.removeEventListener("scroll", this.onScroll);
      window.removeEventListener("scroll", this.onScroll), window.removeEventListener("resize", this.onResize), window.removeEventListener("beforeprint", this.onPrint), this.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout);
    }
  }
  function iu(r, t, e) {
    for (; t; ) {
      let i = Mt.get(t);
      if (i && i.parent == r)
        return i;
      let n = t.parentNode;
      t = n != r.dom ? n : e > 0 ? t.nextSibling : t.previousSibling;
    }
    return null;
  }
  function Wm(r) {
    let t = null;
    function e(l) {
      l.preventDefault(), l.stopImmediatePropagation(), t = l.getTargetRanges()[0];
    }
    if (r.contentDOM.addEventListener("beforeinput", e, !0), document.execCommand("indent"), r.contentDOM.removeEventListener("beforeinput", e, !0), !t)
      return null;
    let i = t.startContainer, n = t.startOffset, s = t.endContainer, o = t.endOffset, a = r.docView.domAtPos(r.state.selection.main.anchor);
    return Ie(a.node, a.offset, s, o) && ([i, n, s, o] = [s, o, i, n]), { anchorNode: i, anchorOffset: n, focusNode: s, focusOffset: o };
  }
  function Xm(r, t, e, i) {
    let n, s, o = r.state.selection.main;
    if (t > -1) {
      let a = r.docView.domBoundsAround(t, e, 0);
      if (!a || r.state.readOnly)
        return !1;
      let { from: l, to: u } = a, d = r.docView.impreciseHead || r.docView.impreciseAnchor ? [] : Mm(r), O = new vc(d, r.state);
      O.readRange(a.startDOM, a.endDOM);
      let m = o.from, Q = null;
      (r.inputState.lastKeyCode === 8 && r.inputState.lastKeyTime > Date.now() - 100 || B.android && O.text.length < u - l) && (m = o.to, Q = "end");
      let b = qm(r.state.doc.sliceString(l, u, xr), O.text, m - l, Q);
      b && (B.chrome && r.inputState.lastKeyCode == 13 && b.toB == b.from + 2 && O.text.slice(b.from, b.toB) == xr + xr && b.toB--, n = {
        from: l + b.from,
        to: l + b.toA,
        insert: c.of(O.text.slice(b.from, b.toB).split(xr))
      }), s = Dm(d, l);
    } else if (r.hasFocus || !r.state.facet(Ks)) {
      let a = r.observer.selectionRange, { impreciseHead: l, impreciseAnchor: u } = r.docView, d = l && l.node == a.focusNode && l.offset == a.focusOffset || !ne(r.contentDOM, a.focusNode) ? r.state.selection.main.head : r.docView.posFromDOM(a.focusNode, a.focusOffset), O = u && u.node == a.anchorNode && u.offset == a.anchorOffset || !ne(r.contentDOM, a.anchorNode) ? r.state.selection.main.anchor : r.docView.posFromDOM(a.anchorNode, a.anchorOffset);
      (d != o.head || O != o.anchor) && (s = _.single(O, d));
    }
    if (!n && !s)
      return !1;
    if (!n && i && !o.empty && s && s.main.empty ? n = { from: o.from, to: o.to, insert: r.state.doc.slice(o.from, o.to) } : n && n.from >= o.from && n.to <= o.to && (n.from != o.from || n.to != o.to) && o.to - o.from - (n.to - n.from) <= 4 ? n = {
      from: o.from,
      to: o.to,
      insert: r.state.doc.slice(o.from, n.from).append(n.insert).append(r.state.doc.slice(n.to, o.to))
    } : (B.mac || B.android) && n && n.from == n.to && n.from == o.head - 1 && n.insert.toString() == "." && (n = { from: o.from, to: o.to, insert: c.of([" "]) }), n) {
      let a = r.state;
      if (B.ios && r.inputState.flushIOSKey(r) || B.android && (n.from == o.from && n.to == o.to && n.insert.length == 1 && n.insert.lines == 2 && sr(r.contentDOM, "Enter", 13) || n.from == o.from - 1 && n.to == o.to && n.insert.length == 0 && sr(r.contentDOM, "Backspace", 8) || n.from == o.from && n.to == o.to + 1 && n.insert.length == 0 && sr(r.contentDOM, "Delete", 46)))
        return !0;
      let l = n.insert.toString();
      if (r.state.facet(lc).some((O) => O(r, n.from, n.to, l)))
        return !0;
      r.inputState.composing >= 0 && r.inputState.composing++;
      let u;
      if (n.from >= o.from && n.to <= o.to && n.to - n.from >= (o.to - o.from) / 3 && (!s || s.main.empty && s.main.from == n.from + n.insert.length) && r.inputState.composing < 0) {
        let O = o.from < n.from ? a.sliceDoc(o.from, n.from) : "", m = o.to > n.to ? a.sliceDoc(n.to, o.to) : "";
        u = a.replaceSelection(r.state.toText(O + n.insert.sliceString(0, void 0, r.state.lineBreak) + m));
      } else {
        let O = a.changes(n), m = s && !a.selection.main.eq(s.main) && s.main.to <= O.newLength ? s.main : void 0;
        if (a.selection.ranges.length > 1 && r.inputState.composing >= 0 && n.to <= o.to && n.to >= o.to - 10) {
          let Q = r.state.sliceDoc(n.from, n.to), b = xc(r) || r.state.doc.lineAt(o.head), C = o.to - n.to, A = o.to - o.from;
          u = a.changeByRange((M) => {
            if (M.from == o.from && M.to == o.to)
              return { changes: O, range: m || M.map(O) };
            let U = M.to - C, Y = U - Q.length;
            if (M.to - M.from != A || r.state.sliceDoc(Y, U) != Q || b && M.to >= b.from && M.from <= b.to)
              return { range: M };
            let G = a.changes({ from: Y, to: U, insert: n.insert }), L = M.to - o.to;
            return {
              changes: G,
              range: m ? _.range(Math.max(0, m.anchor + L), Math.max(0, m.head + L)) : M.map(G)
            };
          });
        } else
          u = {
            changes: O,
            selection: m && a.selection.replaceRange(m)
          };
      }
      let d = "input.type";
      return r.composing && (d += ".compose", r.inputState.compositionFirstChange && (d += ".start", r.inputState.compositionFirstChange = !1)), r.dispatch(u, { scrollIntoView: !0, userEvent: d }), !0;
    } else if (s && !s.main.eq(o)) {
      let a = !1, l = "select";
      return r.inputState.lastSelectionTime > Date.now() - 50 && (r.inputState.lastSelectionOrigin == "select" && (a = !0), l = r.inputState.lastSelectionOrigin), r.dispatch({ selection: s, scrollIntoView: a, userEvent: l }), !0;
    } else
      return !1;
  }
  function qm(r, t, e, i) {
    let n = Math.min(r.length, t.length), s = 0;
    for (; s < n && r.charCodeAt(s) == t.charCodeAt(s); )
      s++;
    if (s == n && r.length == t.length)
      return null;
    let o = r.length, a = t.length;
    for (; o > 0 && a > 0 && r.charCodeAt(o - 1) == t.charCodeAt(a - 1); )
      o--, a--;
    if (i == "end") {
      let l = Math.max(0, s - Math.min(o, a));
      e -= o + l - s;
    }
    return o < s && r.length < t.length ? (s -= e <= s && e >= o ? s - e : 0, a = s + (a - o), o = s) : a < s && (s -= e <= s && e >= a ? s - e : 0, o = s + (o - a), a = s), { from: s, toA: o, toB: a };
  }
  function Mm(r) {
    let t = [];
    if (r.root.activeElement != r.contentDOM)
      return t;
    let { anchorNode: e, anchorOffset: i, focusNode: n, focusOffset: s } = r.observer.selectionRange;
    return e && (t.push(new yc(e, i)), (n != e || s != i) && t.push(new yc(n, s))), t;
  }
  function Dm(r, t) {
    if (r.length == 0)
      return null;
    let e = r[0].pos, i = r.length == 2 ? r[1].pos : e;
    return e > -1 && i > -1 ? _.single(e + t, i + t) : null;
  }
  class F {
    constructor(t = {}) {
      this.plugins = [], this.pluginMap = /* @__PURE__ */ new Map(), this.editorAttrs = {}, this.contentAttrs = {}, this.bidiCache = [], this.destroyed = !1, this.updateState = 2, this.measureScheduled = -1, this.measureRequests = [], this.contentDOM = document.createElement("div"), this.scrollDOM = document.createElement("div"), this.scrollDOM.tabIndex = -1, this.scrollDOM.className = "cm-scroller", this.scrollDOM.appendChild(this.contentDOM), this.announceDOM = document.createElement("div"), this.announceDOM.style.cssText = "position: absolute; top: -10000px", this.announceDOM.setAttribute("aria-live", "polite"), this.dom = document.createElement("div"), this.dom.appendChild(this.announceDOM), this.dom.appendChild(this.scrollDOM), this._dispatch = t.dispatch || ((e) => this.update([e])), this.dispatch = this.dispatch.bind(this), this.root = t.root || Se(t.parent) || document, this.viewState = new Yc(t.state || ft.create(t)), this.plugins = this.state.facet(Kn).map((e) => new Ua(e));
      for (let e of this.plugins)
        e.update(this);
      this.observer = new Am(this, (e, i, n) => Xm(this, e, i, n), (e) => {
        this.inputState.runScrollHandlers(this, e), this.observer.intersecting && this.measure();
      }), this.inputState = new om(this), this.inputState.ensureHandlers(this, this.plugins), this.docView = new bc(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), t.parent && t.parent.appendChild(this.dom);
    }
    get state() {
      return this.viewState.state;
    }
    get viewport() {
      return this.viewState.viewport;
    }
    get visibleRanges() {
      return this.viewState.visibleRanges;
    }
    get inView() {
      return this.viewState.inView;
    }
    get composing() {
      return this.inputState.composing > 0;
    }
    get compositionStarted() {
      return this.inputState.composing >= 0;
    }
    dispatch(...t) {
      this._dispatch(t.length == 1 && t[0] instanceof Gt ? t[0] : this.state.update(...t));
    }
    update(t) {
      if (this.updateState != 0)
        throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
      let e = !1, i = !1, n, s = this.state;
      for (let a of t) {
        if (a.startState != s)
          throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
        s = a.state;
      }
      if (this.destroyed) {
        this.viewState.state = s;
        return;
      }
      if (this.observer.clear(), s.facet(ft.phrases) != this.state.facet(ft.phrases))
        return this.setState(s);
      n = to.create(this, s, t);
      let o = this.viewState.scrollTarget;
      try {
        this.updateState = 2;
        for (let a of t) {
          if (o && (o = o.map(a.changes)), a.scrollIntoView) {
            let { main: l } = a.state.selection;
            o = new Js(l.empty ? l : _.cursor(l.head, l.head > l.anchor ? -1 : 1));
          }
          for (let l of a.effects)
            l.is(cc) && (o = l.value);
        }
        this.viewState.update(n, o), this.bidiCache = so.update(this.bidiCache, n.changes), n.empty || (this.updatePlugins(n), this.inputState.update(n)), e = this.docView.update(n), this.state.facet(es) != this.styleModules && this.mountStyles(), i = this.updateAttrs(), this.showAnnouncements(t), this.docView.updateSelection(e, t.some((a) => a.isUserEvent("select.pointer")));
      } finally {
        this.updateState = 0;
      }
      if (n.startState.facet(no) != n.state.facet(no) && (this.viewState.mustMeasureContent = !0), (e || i || o || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), !n.empty)
        for (let a of this.state.facet(La))
          a(n);
    }
    setState(t) {
      if (this.updateState != 0)
        throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
      if (this.destroyed) {
        this.viewState.state = t;
        return;
      }
      this.updateState = 2;
      let e = this.hasFocus;
      try {
        for (let i of this.plugins)
          i.destroy(this);
        this.viewState = new Yc(t), this.plugins = t.facet(Kn).map((i) => new Ua(i)), this.pluginMap.clear();
        for (let i of this.plugins)
          i.update(this);
        this.docView = new bc(this), this.inputState.ensureHandlers(this, this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
      } finally {
        this.updateState = 0;
      }
      e && this.focus(), this.requestMeasure();
    }
    updatePlugins(t) {
      let e = t.startState.facet(Kn), i = t.state.facet(Kn);
      if (e != i) {
        let n = [];
        for (let s of i) {
          let o = e.indexOf(s);
          if (o < 0)
            n.push(new Ua(s));
          else {
            let a = this.plugins[o];
            a.mustUpdate = t, n.push(a);
          }
        }
        for (let s of this.plugins)
          s.mustUpdate != t && s.destroy(this);
        this.plugins = n, this.pluginMap.clear(), this.inputState.ensureHandlers(this, this.plugins);
      } else
        for (let n of this.plugins)
          n.mustUpdate = t;
      for (let n = 0; n < this.plugins.length; n++)
        this.plugins[n].update(this);
    }
    measure(t = !0) {
      if (this.destroyed)
        return;
      this.measureScheduled > -1 && cancelAnimationFrame(this.measureScheduled), this.measureScheduled = 0, t && this.observer.forceFlush();
      let e = null;
      try {
        for (let i = 0; ; i++) {
          this.updateState = 1;
          let n = this.viewport, s = this.viewState.measure(this);
          if (!s && !this.measureRequests.length && this.viewState.scrollTarget == null)
            break;
          if (i > 5) {
            console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
            break;
          }
          let o = [];
          s & 4 || ([this.measureRequests, o] = [o, this.measureRequests]);
          let a = o.map((O) => {
            try {
              return O.read(this);
            } catch (m) {
              return yi(this.state, m), ru;
            }
          }), l = to.create(this, this.state, []), u = !1, d = !1;
          l.flags |= s, e ? e.flags |= s : e = l, this.updateState = 2, l.empty || (this.updatePlugins(l), this.inputState.update(l), this.updateAttrs(), u = this.docView.update(l));
          for (let O = 0; O < o.length; O++)
            if (a[O] != ru)
              try {
                let m = o[O];
                m.write && m.write(a[O], this);
              } catch (m) {
                yi(this.state, m);
              }
          if (this.viewState.scrollTarget && (this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, d = !0), u && this.docView.updateSelection(!0), this.viewport.from == n.from && this.viewport.to == n.to && !d && this.measureRequests.length == 0)
            break;
        }
      } finally {
        this.updateState = 0, this.measureScheduled = -1;
      }
      if (e && !e.empty)
        for (let i of this.state.facet(La))
          i(e);
    }
    get themeClasses() {
      return sl + " " + (this.state.facet(nl) ? tu : Kc) + " " + this.state.facet(no);
    }
    updateAttrs() {
      let t = nu(this, uc, {
        class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
      }), e = {
        spellcheck: "false",
        autocorrect: "off",
        autocapitalize: "off",
        translate: "no",
        contenteditable: this.state.facet(Ks) ? "true" : "false",
        class: "cm-content",
        style: `${B.tabSize}: ${this.state.tabSize}`,
        role: "textbox",
        "aria-multiline": "true"
      };
      this.state.readOnly && (e["aria-readonly"] = "true"), nu(this, fc, e);
      let i = this.observer.ignore(() => {
        let n = Ia(this.contentDOM, this.contentAttrs, e), s = Ia(this.dom, this.editorAttrs, t);
        return n || s;
      });
      return this.editorAttrs = t, this.contentAttrs = e, i;
    }
    showAnnouncements(t) {
      let e = !0;
      for (let i of t)
        for (let n of i.effects)
          if (n.is(F.announce)) {
            e && (this.announceDOM.textContent = ""), e = !1;
            let s = this.announceDOM.appendChild(document.createElement("div"));
            s.textContent = n.value;
          }
    }
    mountStyles() {
      this.styleModules = this.state.facet(es), he.mount(this.root, this.styleModules.concat(Cm).reverse());
    }
    readMeasured() {
      if (this.updateState == 2)
        throw new Error("Reading the editor layout isn't allowed during an update");
      this.updateState == 0 && this.measureScheduled > -1 && this.measure(!1);
    }
    requestMeasure(t) {
      if (this.measureScheduled < 0 && (this.measureScheduled = requestAnimationFrame(() => this.measure())), t) {
        if (t.key != null) {
          for (let e = 0; e < this.measureRequests.length; e++)
            if (this.measureRequests[e].key === t.key) {
              this.measureRequests[e] = t;
              return;
            }
        }
        this.measureRequests.push(t);
      }
    }
    plugin(t) {
      let e = this.pluginMap.get(t);
      return (e === void 0 || e && e.spec != t) && this.pluginMap.set(t, e = this.plugins.find((i) => i.spec == t) || null), e && e.update(this).value;
    }
    get documentTop() {
      return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
    }
    get documentPadding() {
      return { top: this.viewState.paddingTop, bottom: this.viewState.paddingBottom };
    }
    elementAtHeight(t) {
      return this.readMeasured(), this.viewState.elementAtHeight(t);
    }
    lineBlockAtHeight(t) {
      return this.readMeasured(), this.viewState.lineBlockAtHeight(t);
    }
    get viewportLineBlocks() {
      return this.viewState.viewportLines;
    }
    lineBlockAt(t) {
      return this.viewState.lineBlockAt(t);
    }
    get contentHeight() {
      return this.viewState.contentHeight;
    }
    moveByChar(t, e, i) {
      return Ja(this, t, Cc(this, t, e, i));
    }
    moveByGroup(t, e) {
      return Ja(this, t, Cc(this, t, e, (i) => nm(this, t.head, i)));
    }
    moveToLineBoundary(t, e, i = !0) {
      return rm(this, t, e, i);
    }
    moveVertically(t, e, i) {
      return Ja(this, t, sm(this, t, e, i));
    }
    domAtPos(t) {
      return this.docView.domAtPos(t);
    }
    posAtDOM(t, e = 0) {
      return this.docView.posFromDOM(t, e);
    }
    posAtCoords(t, e = !0) {
      return this.readMeasured(), Pc(this, t, e);
    }
    coordsAtPos(t, e = 1) {
      this.readMeasured();
      let i = this.docView.coordsAt(t, e);
      if (!i || i.left == i.right)
        return i;
      let n = this.state.doc.lineAt(t), s = this.bidiSpans(n), o = s[Qn.find(s, t - n.from, -1, e)];
      return zt(i, o.dir == Vt.LTR == e > 0);
    }
    get defaultCharacterWidth() {
      return this.viewState.heightOracle.charWidth;
    }
    get defaultLineHeight() {
      return this.viewState.heightOracle.lineHeight;
    }
    get textDirection() {
      return this.viewState.defaultTextDirection;
    }
    textDirectionAt(t) {
      return !this.state.facet(hc) || t < this.viewport.from || t > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(t));
    }
    get lineWrapping() {
      return this.viewState.heightOracle.lineWrapping;
    }
    bidiSpans(t) {
      if (t.length > Em)
        return mc(t.length);
      let e = this.textDirectionAt(t.from);
      for (let n of this.bidiCache)
        if (n.from == t.from && n.dir == e)
          return n.order;
      let i = Ip(t.text, e);
      return this.bidiCache.push(new so(t.from, t.to, e, i)), i;
    }
    get hasFocus() {
      var t;
      return (document.hasFocus() || B.safari && ((t = this.inputState) === null || t === void 0 ? void 0 : t.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
    }
    focus() {
      this.observer.ignore(() => {
        Qr(this.contentDOM), this.docView.updateSelection();
      });
    }
    destroy() {
      for (let t of this.plugins)
        t.destroy(this);
      this.plugins = [], this.inputState.destroy(), this.dom.remove(), this.observer.destroy(), this.measureScheduled > -1 && cancelAnimationFrame(this.measureScheduled), this.destroyed = !0;
    }
    static scrollIntoView(t, e = {}) {
      return cc.of(new Js(typeof t == "number" ? _.cursor(t) : t, e.y, e.x, e.yMargin, e.xMargin));
    }
    static domEventHandlers(t) {
      return ye.define(() => ({}), { eventHandlers: t });
    }
    static theme(t, e) {
      let i = he.newName(), n = [no.of(i), es.of(ol(`.${i}`, t))];
      return e && e.dark && n.push(nl.of(!0)), n;
    }
    static baseTheme(t) {
      return er.lowest(es.of(ol("." + sl, t, eu)));
    }
    static findFromDOM(t) {
      var e;
      let i = t.querySelector(".cm-content"), n = i && Mt.get(i) || Mt.get(t);
      return ((e = n == null ? void 0 : n.rootView) === null || e === void 0 ? void 0 : e.view) || null;
    }
  }
  F.styleModule = es, F.inputHandler = lc, F.perLineTextDirection = hc, F.exceptionSink = ac, F.updateListener = La, F.editable = Ks, F.mouseSelectionStyle = oc, F.dragMovesSelection = sc, F.clickAddsSelectionRange = nc, F.decorations = ts, F.atomicRanges = dc, F.scrollMargins = Oc, F.darkTheme = nl, F.contentAttributes = fc, F.editorAttributes = uc, F.lineWrapping = /* @__PURE__ */ F.contentAttributes.of({ class: "cm-lineWrapping" }), F.announce = /* @__PURE__ */ ct.define();
  const Em = 4096, ru = {};
  class so {
    constructor(t, e, i, n) {
      this.from = t, this.to = e, this.dir = i, this.order = n;
    }
    static update(t, e) {
      if (e.empty)
        return t;
      let i = [], n = t.length ? t[t.length - 1].dir : Vt.LTR;
      for (let s = Math.max(0, t.length - 10); s < t.length; s++) {
        let o = t[s];
        o.dir == n && !e.touchesRange(o.from, o.to) && i.push(new so(e.mapPos(o.from, 1), e.mapPos(o.to, -1), o.dir, o.order));
      }
      return i;
    }
  }
  function nu(r, t, e) {
    for (let i = r.state.facet(t), n = i.length - 1; n >= 0; n--) {
      let s = i[n], o = typeof s == "function" ? s(r) : s;
      o && za(o, e);
    }
    return e;
  }
  const Zm = B.mac ? "mac" : B.windows ? "win" : B.linux ? "linux" : "key";
  function jm(r, t) {
    const e = r.split(/-(?!$)/);
    let i = e[e.length - 1];
    i == "Space" && (i = " ");
    let n, s, o, a;
    for (let l = 0; l < e.length - 1; ++l) {
      const u = e[l];
      if (/^(cmd|meta|m)$/i.test(u))
        a = !0;
      else if (/^a(lt)?$/i.test(u))
        n = !0;
      else if (/^(c|ctrl|control)$/i.test(u))
        s = !0;
      else if (/^s(hift)?$/i.test(u))
        o = !0;
      else if (/^mod$/i.test(u))
        t == "mac" ? a = !0 : s = !0;
      else
        throw new Error("Unrecognized modifier name: " + u);
    }
    return n && (i = "Alt-" + i), s && (i = "Ctrl-" + i), a && (i = "Meta-" + i), o && (i = "Shift-" + i), i;
  }
  function oo(r, t, e) {
    return t.altKey && (r = "Alt-" + r), t.ctrlKey && (r = "Ctrl-" + r), t.metaKey && (r = "Meta-" + r), e !== !1 && t.shiftKey && (r = "Shift-" + r), r;
  }
  const zm = /* @__PURE__ */ er.default(/* @__PURE__ */ F.domEventHandlers({
    keydown(r, t) {
      return au(ou(t.state), r, t, "editor");
    }
  })), ao = /* @__PURE__ */ V.define({ enables: zm }), su = /* @__PURE__ */ new WeakMap();
  function ou(r) {
    let t = r.facet(ao), e = su.get(t);
    return e || su.set(t, e = Gm(t.reduce((i, n) => i.concat(n), []))), e;
  }
  function Nm(r, t, e) {
    return au(ou(r.state), t, r, e);
  }
  let kr = null;
  const Im = 4e3;
  function Gm(r, t = Zm) {
    let e = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), n = (o, a) => {
      let l = i[o];
      if (l == null)
        i[o] = a;
      else if (l != a)
        throw new Error("Key binding " + o + " is used both as a regular binding and as a multi-stroke prefix");
    }, s = (o, a, l, u) => {
      let d = e[o] || (e[o] = /* @__PURE__ */ Object.create(null)), O = a.split(/ (?!$)/).map((b) => jm(b, t));
      for (let b = 1; b < O.length; b++) {
        let C = O.slice(0, b).join(" ");
        n(C, !0), d[C] || (d[C] = {
          preventDefault: !0,
          commands: [(A) => {
            let M = kr = { view: A, prefix: C, scope: o };
            return setTimeout(() => {
              kr == M && (kr = null);
            }, Im), !0;
          }]
        });
      }
      let m = O.join(" ");
      n(m, !1);
      let Q = d[m] || (d[m] = { preventDefault: !1, commands: [] });
      Q.commands.push(l), u && (Q.preventDefault = !0);
    };
    for (let o of r) {
      let a = o[t] || o.key;
      if (a)
        for (let l of o.scope ? o.scope.split(" ") : ["editor"])
          s(l, a, o.run, o.preventDefault), o.shift && s(l, "Shift-" + a, o.shift, o.preventDefault);
    }
    return e;
  }
  function au(r, t, e, i) {
    let n = ti(t), s = vt(n, 0), o = st(s) == n.length && n != " ", a = "", l = !1;
    kr && kr.view == e && kr.scope == i && (a = kr.prefix + " ", (l = Ac.indexOf(t.keyCode) < 0) && (kr = null));
    let u = (m) => {
      if (m) {
        for (let Q of m.commands)
          if (Q(e))
            return !0;
        m.preventDefault && (l = !0);
      }
      return !1;
    }, d = r[i], O;
    if (d) {
      if (u(d[a + oo(n, t, !o)]))
        return !0;
      if (o && (t.shiftKey || t.altKey || t.metaKey || s > 127) && (O = Ke[t.keyCode]) && O != n) {
        if (u(d[a + oo(O, t, !0)]) || t.shiftKey && Qt[t.keyCode] != O && u(d[a + oo(Qt[t.keyCode], t, !1)]))
          return !0;
      } else if (o && t.shiftKey && u(d[a + oo(n, t, !0)]))
        return !0;
    }
    return l;
  }
  const lu = !B.ios, rs = /* @__PURE__ */ V.define({
    combine(r) {
      return pi(r, {
        cursorBlinkRate: 1200,
        drawRangeCursor: !0
      }, {
        cursorBlinkRate: (t, e) => Math.min(t, e),
        drawRangeCursor: (t, e) => t || e
      });
    }
  });
  function Vm(r = {}) {
    return [
      rs.of(r),
      Lm,
      Um
    ];
  }
  class hu {
    constructor(t, e, i, n, s) {
      this.left = t, this.top = e, this.width = i, this.height = n, this.className = s;
    }
    draw() {
      let t = document.createElement("div");
      return t.className = this.className, this.adjust(t), t;
    }
    adjust(t) {
      t.style.left = this.left + "px", t.style.top = this.top + "px", this.width >= 0 && (t.style.width = this.width + "px"), t.style.height = this.height + "px";
    }
    eq(t) {
      return this.left == t.left && this.top == t.top && this.width == t.width && this.height == t.height && this.className == t.className;
    }
  }
  const Lm = /* @__PURE__ */ ye.fromClass(class {
    constructor(r) {
      this.view = r, this.rangePieces = [], this.cursors = [], this.measureReq = { read: this.readPos.bind(this), write: this.drawSel.bind(this) }, this.selectionLayer = r.scrollDOM.appendChild(document.createElement("div")), this.selectionLayer.className = "cm-selectionLayer", this.selectionLayer.setAttribute("aria-hidden", "true"), this.cursorLayer = r.scrollDOM.appendChild(document.createElement("div")), this.cursorLayer.className = "cm-cursorLayer", this.cursorLayer.setAttribute("aria-hidden", "true"), r.requestMeasure(this.measureReq), this.setBlinkRate();
    }
    setBlinkRate() {
      this.cursorLayer.style.animationDuration = this.view.state.facet(rs).cursorBlinkRate + "ms";
    }
    update(r) {
      let t = r.startState.facet(rs) != r.state.facet(rs);
      (t || r.selectionSet || r.geometryChanged || r.viewportChanged) && this.view.requestMeasure(this.measureReq), r.transactions.some((e) => e.scrollIntoView) && (this.cursorLayer.style.animationName = this.cursorLayer.style.animationName == "cm-blink" ? "cm-blink2" : "cm-blink"), t && this.setBlinkRate();
    }
    readPos() {
      let { state: r } = this.view, t = r.facet(rs), e = r.selection.ranges.map((n) => n.empty ? [] : Bm(this.view, n)).reduce((n, s) => n.concat(s)), i = [];
      for (let n of r.selection.ranges) {
        let s = n == r.selection.main;
        if (n.empty ? !s || lu : t.drawRangeCursor) {
          let o = Ym(this.view, n, s);
          o && i.push(o);
        }
      }
      return { rangePieces: e, cursors: i };
    }
    drawSel({ rangePieces: r, cursors: t }) {
      if (r.length != this.rangePieces.length || r.some((e, i) => !e.eq(this.rangePieces[i]))) {
        this.selectionLayer.textContent = "";
        for (let e of r)
          this.selectionLayer.appendChild(e.draw());
        this.rangePieces = r;
      }
      if (t.length != this.cursors.length || t.some((e, i) => !e.eq(this.cursors[i]))) {
        let e = this.cursorLayer.children;
        if (e.length !== t.length) {
          this.cursorLayer.textContent = "";
          for (const i of t)
            this.cursorLayer.appendChild(i.draw());
        } else
          t.forEach((i, n) => i.adjust(e[n]));
        this.cursors = t;
      }
    }
    destroy() {
      this.selectionLayer.remove(), this.cursorLayer.remove();
    }
  }), cu = {
    ".cm-line": {
      "& ::selection": { backgroundColor: "transparent !important" },
      "&::selection": { backgroundColor: "transparent !important" }
    }
  };
  lu && (cu[".cm-line"].caretColor = "transparent !important");
  const Um = /* @__PURE__ */ er.highest(/* @__PURE__ */ F.theme(cu));
  function uu(r) {
    let t = r.scrollDOM.getBoundingClientRect();
    return { left: (r.textDirection == Vt.LTR ? t.left : t.right - r.scrollDOM.clientWidth) - r.scrollDOM.scrollLeft, top: t.top - r.scrollDOM.scrollTop };
  }
  function fu(r, t, e) {
    let i = _.cursor(t);
    return {
      from: Math.max(e.from, r.moveToLineBoundary(i, !1, !0).from),
      to: Math.min(e.to, r.moveToLineBoundary(i, !0, !0).from),
      type: Wt.Text
    };
  }
  function du(r, t) {
    let e = r.lineBlockAt(t);
    if (Array.isArray(e.type)) {
      for (let i of e.type)
        if (i.to > t || i.to == t && (i.to == e.to || i.type == Wt.Text))
          return i;
    }
    return e;
  }
  function Bm(r, t) {
    if (t.to <= r.viewport.from || t.from >= r.viewport.to)
      return [];
    let e = Math.max(t.from, r.viewport.from), i = Math.min(t.to, r.viewport.to), n = r.textDirection == Vt.LTR, s = r.contentDOM, o = s.getBoundingClientRect(), a = uu(r), l = window.getComputedStyle(s.firstChild), u = o.left + parseInt(l.paddingLeft) + Math.min(0, parseInt(l.textIndent)), d = o.right - parseInt(l.paddingRight), O = du(r, e), m = du(r, i), Q = O.type == Wt.Text ? O : null, b = m.type == Wt.Text ? m : null;
    if (r.lineWrapping && (Q && (Q = fu(r, e, Q)), b && (b = fu(r, i, b))), Q && b && Q.from == b.from)
      return A(M(t.from, t.to, Q));
    {
      let Y = Q ? M(t.from, null, Q) : U(O, !1), G = b ? M(null, t.to, b) : U(m, !0), L = [];
      return (Q || O).to < (b || m).from - 1 ? L.push(C(u, Y.bottom, d, G.top)) : Y.bottom < G.top && r.elementAtHeight((Y.bottom + G.top) / 2).type == Wt.Text && (Y.bottom = G.top = (Y.bottom + G.top) / 2), A(Y).concat(L).concat(A(G));
    }
    function C(Y, G, L, J) {
      return new hu(Y - a.left, G - a.top - 0.01, L - Y, J - G + 0.01, "cm-selectionBackground");
    }
    function A({ top: Y, bottom: G, horizontal: L }) {
      let J = [];
      for (let at = 0; at < L.length; at += 2)
        J.push(C(L[at], Y, L[at + 1], G));
      return J;
    }
    function M(Y, G, L) {
      let J = 1e9, at = -1e9, Ut = [];
      function yt(Bt, Jt, Ue, be, Te) {
        let ki = r.coordsAtPos(Bt, Bt == L.to ? -2 : 2), Oe = r.coordsAtPos(Ue, Ue == L.from ? 2 : -2);
        J = Math.min(ki.top, Oe.top, J), at = Math.max(ki.bottom, Oe.bottom, at), Te == Vt.LTR ? Ut.push(n && Jt ? u : ki.left, n && be ? d : Oe.right) : Ut.push(!n && be ? u : Oe.left, !n && Jt ? d : ki.right);
      }
      let mt = Y ?? L.from, _t = G ?? L.to;
      for (let Bt of r.visibleRanges)
        if (Bt.to > mt && Bt.from < _t)
          for (let Jt = Math.max(Bt.from, mt), Ue = Math.min(Bt.to, _t); ; ) {
            let be = r.state.doc.lineAt(Jt);
            for (let Te of r.bidiSpans(be)) {
              let ki = Te.from + be.from, Oe = Te.to + be.from;
              if (ki >= Ue)
                break;
              Oe > Jt && yt(Math.max(ki, Jt), Y == null && ki <= mt, Math.min(Oe, Ue), G == null && Oe >= _t, Te.dir);
            }
            if (Jt = be.to + 1, Jt >= Ue)
              break;
          }
      return Ut.length == 0 && yt(mt, Y == null, _t, G == null, r.textDirection), { top: J, bottom: at, horizontal: Ut };
    }
    function U(Y, G) {
      let L = o.top + (G ? Y.top : Y.bottom);
      return { top: L, bottom: L, horizontal: [] };
    }
  }
  function Ym(r, t, e) {
    let i = r.coordsAtPos(t.head, t.assoc || 1);
    if (!i)
      return null;
    let n = uu(r);
    return new hu(i.left - n.left, i.top - n.top, -1, i.bottom - i.top, e ? "cm-cursor cm-cursor-primary" : "cm-cursor cm-cursor-secondary");
  }
  function Ou(r, t, e, i, n) {
    t.lastIndex = 0;
    for (let s = r.iterRange(e, i), o = e, a; !s.next().done; o += s.value.length)
      if (!s.lineBreak)
        for (; a = t.exec(s.value); )
          n(o + a.index, a);
  }
  function Fm(r, t) {
    let e = r.visibleRanges;
    if (e.length == 1 && e[0].from == r.viewport.from && e[0].to == r.viewport.to)
      return e;
    let i = [];
    for (let { from: n, to: s } of e)
      n = Math.max(r.state.doc.lineAt(n).from, n - t), s = Math.min(r.state.doc.lineAt(s).to, s + t), i.length && i[i.length - 1].to >= n ? i[i.length - 1].to = s : i.push({ from: n, to: s });
    return i;
  }
  class Hm {
    constructor(t) {
      const { regexp: e, decoration: i, decorate: n, boundary: s, maxLength: o = 1e3 } = t;
      if (!e.global)
        throw new RangeError("The regular expression given to MatchDecorator should have its 'g' flag set");
      if (this.regexp = e, n)
        this.addMatch = (a, l, u, d) => n(d, u, u + a[0].length, a, l);
      else if (i) {
        let a = typeof i == "function" ? i : () => i;
        this.addMatch = (l, u, d, O) => O(d, d + l[0].length, a(l, u, d));
      } else
        throw new RangeError("Either 'decorate' or 'decoration' should be provided to MatchDecorator");
      this.boundary = s, this.maxLength = o;
    }
    createDeco(t) {
      let e = new se(), i = e.add.bind(e);
      for (let { from: n, to: s } of Fm(t, this.maxLength))
        Ou(t.state.doc, this.regexp, n, s, (o, a) => this.addMatch(a, t, o, i));
      return e.finish();
    }
    updateDeco(t, e) {
      let i = 1e9, n = -1;
      return t.docChanged && t.changes.iterChanges((s, o, a, l) => {
        l > t.view.viewport.from && a < t.view.viewport.to && (i = Math.min(a, i), n = Math.max(l, n));
      }), t.viewportChanged || n - i > 1e3 ? this.createDeco(t.view) : n > -1 ? this.updateRange(t.view, e.map(t.changes), i, n) : e;
    }
    updateRange(t, e, i, n) {
      for (let s of t.visibleRanges) {
        let o = Math.max(s.from, i), a = Math.min(s.to, n);
        if (a > o) {
          let l = t.state.doc.lineAt(o), u = l.to < a ? t.state.doc.lineAt(a) : l, d = Math.max(s.from, l.from), O = Math.min(s.to, u.to);
          if (this.boundary) {
            for (; o > l.from; o--)
              if (this.boundary.test(l.text[o - 1 - l.from])) {
                d = o;
                break;
              }
            for (; a < u.to; a++)
              if (this.boundary.test(u.text[a - u.from])) {
                O = a;
                break;
              }
          }
          let m = [], Q, b = (C, A, M) => m.push(M.range(C, A));
          if (l == u)
            for (this.regexp.lastIndex = d - l.from; (Q = this.regexp.exec(l.text)) && Q.index < O - l.from; )
              this.addMatch(Q, t, Q.index + l.from, b);
          else
            Ou(t.state.doc, this.regexp, d, O, (C, A) => this.addMatch(A, t, C, b));
          e = e.update({ filterFrom: d, filterTo: O, filter: (C, A) => C < d || A > O, add: m });
        }
      }
      return e;
    }
  }
  const ll = /x/.unicode != null ? "gu" : "g", Jm = /* @__PURE__ */ new RegExp(`[\0-\b
--­؜​‎‏\u2028\u2029‭‮⁦⁧⁩\uFEFF￹-￼]`, ll), Km = {
    0: "null",
    7: "bell",
    8: "backspace",
    10: "newline",
    11: "vertical tab",
    13: "carriage return",
    27: "escape",
    8203: "zero width space",
    8204: "zero width non-joiner",
    8205: "zero width joiner",
    8206: "left-to-right mark",
    8207: "right-to-left mark",
    8232: "line separator",
    8237: "left-to-right override",
    8238: "right-to-left override",
    8294: "left-to-right isolate",
    8295: "right-to-left isolate",
    8297: "pop directional isolate",
    8233: "paragraph separator",
    65279: "zero width no-break space",
    65532: "object replacement"
  };
  let hl = null;
  function tg() {
    var r;
    if (hl == null && typeof document < "u" && document.body) {
      let t = document.body.style;
      hl = ((r = t.tabSize) !== null && r !== void 0 ? r : t.MozTabSize) != null;
    }
    return hl || !1;
  }
  const lo = /* @__PURE__ */ V.define({
    combine(r) {
      let t = pi(r, {
        render: null,
        specialChars: Jm,
        addSpecialChars: null
      });
      return (t.replaceTabs = !tg()) && (t.specialChars = new RegExp("	|" + t.specialChars.source, ll)), t.addSpecialChars && (t.specialChars = new RegExp(t.specialChars.source + "|" + t.addSpecialChars.source, ll)), t;
    }
  });
  function eg(r = {}) {
    return [lo.of(r), ig()];
  }
  let pu = null;
  function ig() {
    return pu || (pu = ye.fromClass(class {
      constructor(r) {
        this.view = r, this.decorations = it.none, this.decorationCache = /* @__PURE__ */ Object.create(null), this.decorator = this.makeDecorator(r.state.facet(lo)), this.decorations = this.decorator.createDeco(r);
      }
      makeDecorator(r) {
        return new Hm({
          regexp: r.specialChars,
          decoration: (t, e, i) => {
            let { doc: n } = e.state, s = vt(t[0], 0);
            if (s == 9) {
              let o = n.lineAt(i), a = e.state.tabSize, l = nr(o.text, a, i - o.from);
              return it.replace({ widget: new og((a - l % a) * this.view.defaultCharacterWidth) });
            }
            return this.decorationCache[s] || (this.decorationCache[s] = it.replace({ widget: new sg(r, s) }));
          },
          boundary: r.replaceTabs ? void 0 : /[^]/
        });
      }
      update(r) {
        let t = r.state.facet(lo);
        r.startState.facet(lo) != t ? (this.decorator = this.makeDecorator(t), this.decorations = this.decorator.createDeco(r.view)) : this.decorations = this.decorator.updateDeco(r, this.decorations);
      }
    }, {
      decorations: (r) => r.decorations
    }));
  }
  const rg = "•";
  function ng(r) {
    return r >= 32 ? rg : r == 10 ? "␤" : String.fromCharCode(9216 + r);
  }
  class sg extends wr {
    constructor(t, e) {
      super(), this.options = t, this.code = e;
    }
    eq(t) {
      return t.code == this.code;
    }
    toDOM(t) {
      let e = ng(this.code), i = t.state.phrase("Control character") + " " + (Km[this.code] || "0x" + this.code.toString(16)), n = this.options.render && this.options.render(this.code, i, e);
      if (n)
        return n;
      let s = document.createElement("span");
      return s.textContent = e, s.title = i, s.setAttribute("aria-label", i), s.className = "cm-specialChar", s;
    }
    ignoreEvent() {
      return !1;
    }
  }
  class og extends wr {
    constructor(t) {
      super(), this.width = t;
    }
    eq(t) {
      return t.width == this.width;
    }
    toDOM() {
      let t = document.createElement("span");
      return t.textContent = "	", t.className = "cm-tab", t.style.width = this.width + "px", t;
    }
    ignoreEvent() {
      return !1;
    }
  }
  function ag() {
    return hg;
  }
  const lg = /* @__PURE__ */ it.line({ class: "cm-activeLine" }), hg = /* @__PURE__ */ ye.fromClass(class {
    constructor(r) {
      this.decorations = this.getDeco(r);
    }
    update(r) {
      (r.docChanged || r.selectionSet) && (this.decorations = this.getDeco(r.view));
    }
    getDeco(r) {
      let t = -1, e = [];
      for (let i of r.state.selection.ranges) {
        if (!i.empty)
          return it.none;
        let n = r.lineBlockAt(i.head);
        n.from > t && (e.push(lg.range(n.from)), t = n.from);
      }
      return it.set(e);
    }
  }, {
    decorations: (r) => r.decorations
  }), cl = "-10000px";
  class cg {
    constructor(t, e, i) {
      this.facet = e, this.createTooltipView = i, this.input = t.state.facet(e), this.tooltips = this.input.filter((n) => n), this.tooltipViews = this.tooltips.map(i);
    }
    update(t) {
      let e = t.state.facet(this.facet), i = e.filter((s) => s);
      if (e === this.input) {
        for (let s of this.tooltipViews)
          s.update && s.update(t);
        return !1;
      }
      let n = [];
      for (let s = 0; s < i.length; s++) {
        let o = i[s], a = -1;
        if (o) {
          for (let l = 0; l < this.tooltips.length; l++) {
            let u = this.tooltips[l];
            u && u.create == o.create && (a = l);
          }
          if (a < 0)
            n[s] = this.createTooltipView(o);
          else {
            let l = n[s] = this.tooltipViews[a];
            l.update && l.update(t);
          }
        }
      }
      for (let s of this.tooltipViews)
        n.indexOf(s) < 0 && s.dom.remove();
      return this.input = e, this.tooltips = i, this.tooltipViews = n, !0;
    }
  }
  function ug() {
    return { top: 0, left: 0, bottom: innerHeight, right: innerWidth };
  }
  const ul = /* @__PURE__ */ V.define({
    combine: (r) => {
      var t, e, i;
      return {
        position: B.ios ? "absolute" : ((t = r.find((n) => n.position)) === null || t === void 0 ? void 0 : t.position) || "fixed",
        parent: ((e = r.find((n) => n.parent)) === null || e === void 0 ? void 0 : e.parent) || null,
        tooltipSpace: ((i = r.find((n) => n.tooltipSpace)) === null || i === void 0 ? void 0 : i.tooltipSpace) || ug
      };
    }
  }), mu = /* @__PURE__ */ ye.fromClass(class {
    constructor(r) {
      var t;
      this.view = r, this.inView = !0, this.lastTransaction = 0, this.measureTimeout = -1;
      let e = r.state.facet(ul);
      this.position = e.position, this.parent = e.parent, this.classes = r.themeClasses, this.createContainer(), this.measureReq = { read: this.readMeasure.bind(this), write: this.writeMeasure.bind(this), key: this }, this.manager = new cg(r, gu, (i) => this.createTooltip(i)), this.intersectionObserver = typeof IntersectionObserver == "function" ? new IntersectionObserver((i) => {
        Date.now() > this.lastTransaction - 50 && i.length > 0 && i[i.length - 1].intersectionRatio < 1 && this.measureSoon();
      }, { threshold: [1] }) : null, this.observeIntersection(), (t = r.dom.ownerDocument.defaultView) === null || t === void 0 || t.addEventListener("resize", this.measureSoon = this.measureSoon.bind(this)), this.maybeMeasure();
    }
    createContainer() {
      this.parent ? (this.container = document.createElement("div"), this.container.style.position = "relative", this.container.className = this.view.themeClasses, this.parent.appendChild(this.container)) : this.container = this.view.dom;
    }
    observeIntersection() {
      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect();
        for (let r of this.manager.tooltipViews)
          this.intersectionObserver.observe(r.dom);
      }
    }
    measureSoon() {
      this.measureTimeout < 0 && (this.measureTimeout = setTimeout(() => {
        this.measureTimeout = -1, this.maybeMeasure();
      }, 50));
    }
    update(r) {
      r.transactions.length && (this.lastTransaction = Date.now());
      let t = this.manager.update(r);
      t && this.observeIntersection();
      let e = t || r.geometryChanged, i = r.state.facet(ul);
      if (i.position != this.position) {
        this.position = i.position;
        for (let n of this.manager.tooltipViews)
          n.dom.style.position = this.position;
        e = !0;
      }
      if (i.parent != this.parent) {
        this.parent && this.container.remove(), this.parent = i.parent, this.createContainer();
        for (let n of this.manager.tooltipViews)
          this.container.appendChild(n.dom);
        e = !0;
      } else
        this.parent && this.view.themeClasses != this.classes && (this.classes = this.container.className = this.view.themeClasses);
      e && this.maybeMeasure();
    }
    createTooltip(r) {
      let t = r.create(this.view);
      if (t.dom.classList.add("cm-tooltip"), r.arrow && !t.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")) {
        let e = document.createElement("div");
        e.className = "cm-tooltip-arrow", t.dom.appendChild(e);
      }
      return t.dom.style.position = this.position, t.dom.style.top = cl, this.container.appendChild(t.dom), t.mount && t.mount(this.view), t;
    }
    destroy() {
      var r, t;
      (r = this.view.dom.ownerDocument.defaultView) === null || r === void 0 || r.removeEventListener("resize", this.measureSoon);
      for (let { dom: e } of this.manager.tooltipViews)
        e.remove();
      (t = this.intersectionObserver) === null || t === void 0 || t.disconnect(), clearTimeout(this.measureTimeout);
    }
    readMeasure() {
      let r = this.view.dom.getBoundingClientRect();
      return {
        editor: r,
        parent: this.parent ? this.container.getBoundingClientRect() : r,
        pos: this.manager.tooltips.map((t, e) => {
          let i = this.manager.tooltipViews[e];
          return i.getCoords ? i.getCoords(t.pos) : this.view.coordsAtPos(t.pos);
        }),
        size: this.manager.tooltipViews.map(({ dom: t }) => t.getBoundingClientRect()),
        space: this.view.state.facet(ul).tooltipSpace(this.view)
      };
    }
    writeMeasure(r) {
      let { editor: t, space: e } = r, i = [];
      for (let n = 0; n < this.manager.tooltips.length; n++) {
        let s = this.manager.tooltips[n], o = this.manager.tooltipViews[n], { dom: a } = o, l = r.pos[n], u = r.size[n];
        if (!l || l.bottom <= Math.max(t.top, e.top) || l.top >= Math.min(t.bottom, e.bottom) || l.right < Math.max(t.left, e.left) - 0.1 || l.left > Math.min(t.right, e.right) + 0.1) {
          a.style.top = cl;
          continue;
        }
        let d = s.arrow ? o.dom.querySelector(".cm-tooltip-arrow") : null, O = d ? 7 : 0, m = u.right - u.left, Q = u.bottom - u.top, b = o.offset || dg, C = this.view.textDirection == Vt.LTR, A = u.width > e.right - e.left ? C ? e.left : e.right - u.width : C ? Math.min(l.left - (d ? 14 : 0) + b.x, e.right - m) : Math.max(e.left, l.left - m + (d ? 14 : 0) - b.x), M = !!s.above;
        !s.strictSide && (M ? l.top - (u.bottom - u.top) - b.y < e.top : l.bottom + (u.bottom - u.top) + b.y > e.bottom) && M == e.bottom - l.bottom > l.top - e.top && (M = !M);
        let U = M ? l.top - Q - O - b.y : l.bottom + O + b.y, Y = A + m;
        if (o.overlap !== !0)
          for (let G of i)
            G.left < Y && G.right > A && G.top < U + Q && G.bottom > U && (U = M ? G.top - Q - 2 - O : G.bottom + O + 2);
        this.position == "absolute" ? (a.style.top = U - r.parent.top + "px", a.style.left = A - r.parent.left + "px") : (a.style.top = U + "px", a.style.left = A + "px"), d && (d.style.left = `${l.left + (C ? b.x : -b.x) - (A + 14 - 7)}px`), o.overlap !== !0 && i.push({ left: A, top: U, right: Y, bottom: U + Q }), a.classList.toggle("cm-tooltip-above", M), a.classList.toggle("cm-tooltip-below", !M), o.positioned && o.positioned();
      }
    }
    maybeMeasure() {
      if (this.manager.tooltips.length && (this.view.inView && this.view.requestMeasure(this.measureReq), this.inView != this.view.inView && (this.inView = this.view.inView, !this.inView)))
        for (let r of this.manager.tooltipViews)
          r.dom.style.top = cl;
    }
  }, {
    eventHandlers: {
      scroll() {
        this.maybeMeasure();
      }
    }
  }), fg = /* @__PURE__ */ F.baseTheme({
    ".cm-tooltip": {
      zIndex: 100
    },
    "&light .cm-tooltip": {
      border: "1px solid #bbb",
      backgroundColor: "#f5f5f5"
    },
    "&light .cm-tooltip-section:not(:first-child)": {
      borderTop: "1px solid #bbb"
    },
    "&dark .cm-tooltip": {
      backgroundColor: "#333338",
      color: "white"
    },
    ".cm-tooltip-arrow": {
      height: "7px",
      width: `${7 * 2}px`,
      position: "absolute",
      zIndex: -1,
      overflow: "hidden",
      "&:before, &:after": {
        content: "''",
        position: "absolute",
        width: 0,
        height: 0,
        borderLeft: "7px solid transparent",
        borderRight: "7px solid transparent"
      },
      ".cm-tooltip-above &": {
        bottom: "-7px",
        "&:before": {
          borderTop: "7px solid #bbb"
        },
        "&:after": {
          borderTop: "7px solid #f5f5f5",
          bottom: "1px"
        }
      },
      ".cm-tooltip-below &": {
        top: "-7px",
        "&:before": {
          borderBottom: "7px solid #bbb"
        },
        "&:after": {
          borderBottom: "7px solid #f5f5f5",
          top: "1px"
        }
      }
    },
    "&dark .cm-tooltip .cm-tooltip-arrow": {
      "&:before": {
        borderTopColor: "#333338",
        borderBottomColor: "#333338"
      },
      "&:after": {
        borderTopColor: "transparent",
        borderBottomColor: "transparent"
      }
    }
  }), dg = { x: 0, y: 0 }, gu = /* @__PURE__ */ V.define({
    enables: [mu, fg]
  });
  function Og(r, t) {
    let e = r.plugin(mu);
    if (!e)
      return null;
    let i = e.manager.tooltips.indexOf(t);
    return i < 0 ? null : e.manager.tooltipViews[i];
  }
  const vu = /* @__PURE__ */ V.define({
    combine(r) {
      let t, e;
      for (let i of r)
        t = t || i.topContainer, e = e || i.bottomContainer;
      return { topContainer: t, bottomContainer: e };
    }
  });
  function ho(r, t) {
    let e = r.plugin(Qu), i = e ? e.specs.indexOf(t) : -1;
    return i > -1 ? e.panels[i] : null;
  }
  const Qu = /* @__PURE__ */ ye.fromClass(class {
    constructor(r) {
      this.input = r.state.facet(uo), this.specs = this.input.filter((e) => e), this.panels = this.specs.map((e) => e(r));
      let t = r.state.facet(vu);
      this.top = new co(r, !0, t.topContainer), this.bottom = new co(r, !1, t.bottomContainer), this.top.sync(this.panels.filter((e) => e.top)), this.bottom.sync(this.panels.filter((e) => !e.top));
      for (let e of this.panels)
        e.dom.classList.add("cm-panel"), e.mount && e.mount();
    }
    update(r) {
      let t = r.state.facet(vu);
      this.top.container != t.topContainer && (this.top.sync([]), this.top = new co(r.view, !0, t.topContainer)), this.bottom.container != t.bottomContainer && (this.bottom.sync([]), this.bottom = new co(r.view, !1, t.bottomContainer)), this.top.syncClasses(), this.bottom.syncClasses();
      let e = r.state.facet(uo);
      if (e != this.input) {
        let i = e.filter((l) => l), n = [], s = [], o = [], a = [];
        for (let l of i) {
          let u = this.specs.indexOf(l), d;
          u < 0 ? (d = l(r.view), a.push(d)) : (d = this.panels[u], d.update && d.update(r)), n.push(d), (d.top ? s : o).push(d);
        }
        this.specs = i, this.panels = n, this.top.sync(s), this.bottom.sync(o);
        for (let l of a)
          l.dom.classList.add("cm-panel"), l.mount && l.mount();
      } else
        for (let i of this.panels)
          i.update && i.update(r);
    }
    destroy() {
      this.top.sync([]), this.bottom.sync([]);
    }
  }, {
    provide: (r) => F.scrollMargins.of((t) => {
      let e = t.plugin(r);
      return e && { top: e.top.scrollMargin(), bottom: e.bottom.scrollMargin() };
    })
  });
  class co {
    constructor(t, e, i) {
      this.view = t, this.top = e, this.container = i, this.dom = void 0, this.classes = "", this.panels = [], this.syncClasses();
    }
    sync(t) {
      for (let e of this.panels)
        e.destroy && t.indexOf(e) < 0 && e.destroy();
      this.panels = t, this.syncDOM();
    }
    syncDOM() {
      if (this.panels.length == 0) {
        this.dom && (this.dom.remove(), this.dom = void 0);
        return;
      }
      if (!this.dom) {
        this.dom = document.createElement("div"), this.dom.className = this.top ? "cm-panels cm-panels-top" : "cm-panels cm-panels-bottom", this.dom.style[this.top ? "top" : "bottom"] = "0";
        let e = this.container || this.view.dom;
        e.insertBefore(this.dom, this.top ? e.firstChild : null);
      }
      let t = this.dom.firstChild;
      for (let e of this.panels)
        if (e.dom.parentNode == this.dom) {
          for (; t != e.dom; )
            t = yu(t);
          t = t.nextSibling;
        } else
          this.dom.insertBefore(e.dom, t);
      for (; t; )
        t = yu(t);
    }
    scrollMargin() {
      return !this.dom || this.container ? 0 : Math.max(0, this.top ? this.dom.getBoundingClientRect().bottom - Math.max(0, this.view.scrollDOM.getBoundingClientRect().top) : Math.min(innerHeight, this.view.scrollDOM.getBoundingClientRect().bottom) - this.dom.getBoundingClientRect().top);
    }
    syncClasses() {
      if (!(!this.container || this.classes == this.view.themeClasses)) {
        for (let t of this.classes.split(" "))
          t && this.container.classList.remove(t);
        for (let t of (this.classes = this.view.themeClasses).split(" "))
          t && this.container.classList.add(t);
      }
    }
  }
  function yu(r) {
    let t = r.nextSibling;
    return r.remove(), t;
  }
  const uo = /* @__PURE__ */ V.define({
    enables: Qu
  });
  class ar extends Ee {
    compare(t) {
      return this == t || this.constructor == t.constructor && this.eq(t);
    }
    eq(t) {
      return !1;
    }
    destroy(t) {
    }
  }
  ar.prototype.elementClass = "", ar.prototype.toDOM = void 0, ar.prototype.mapMode = nt.TrackBefore, ar.prototype.startSide = ar.prototype.endSide = -1, ar.prototype.point = !0;
  const fo = /* @__PURE__ */ V.define(), pg = {
    class: "",
    renderEmptyElements: !1,
    elementStyle: "",
    markers: () => rt.empty,
    lineMarker: () => null,
    lineMarkerChange: null,
    initialSpacer: null,
    updateSpacer: null,
    domEventHandlers: {}
  }, ns = /* @__PURE__ */ V.define();
  function mg(r) {
    return [wu(), ns.of(Object.assign(Object.assign({}, pg), r))];
  }
  const bu = /* @__PURE__ */ V.define({
    combine: (r) => r.some((t) => t)
  });
  function wu(r) {
    return [
      gg
    ];
  }
  const gg = /* @__PURE__ */ ye.fromClass(class {
    constructor(r) {
      this.view = r, this.prevViewport = r.viewport, this.dom = document.createElement("div"), this.dom.className = "cm-gutters", this.dom.setAttribute("aria-hidden", "true"), this.dom.style.minHeight = this.view.contentHeight + "px", this.gutters = r.state.facet(ns).map((t) => new ku(r, t));
      for (let t of this.gutters)
        this.dom.appendChild(t.dom);
      this.fixed = !r.state.facet(bu), this.fixed && (this.dom.style.position = "sticky"), this.syncGutters(!1), r.scrollDOM.insertBefore(this.dom, r.contentDOM);
    }
    update(r) {
      if (this.updateGutters(r)) {
        let t = this.prevViewport, e = r.view.viewport, i = Math.min(t.to, e.to) - Math.max(t.from, e.from);
        this.syncGutters(i < (e.to - e.from) * 0.8);
      }
      r.geometryChanged && (this.dom.style.minHeight = this.view.contentHeight + "px"), this.view.state.facet(bu) != !this.fixed && (this.fixed = !this.fixed, this.dom.style.position = this.fixed ? "sticky" : ""), this.prevViewport = r.view.viewport;
    }
    syncGutters(r) {
      let t = this.dom.nextSibling;
      r && this.dom.remove();
      let e = rt.iter(this.view.state.facet(fo), this.view.viewport.from), i = [], n = this.gutters.map((s) => new vg(s, this.view.viewport, -this.view.documentPadding.top));
      for (let s of this.view.viewportLineBlocks) {
        let o;
        if (Array.isArray(s.type)) {
          for (let a of s.type)
            if (a.type == Wt.Text) {
              o = a;
              break;
            }
        } else
          o = s.type == Wt.Text ? s : void 0;
        if (o) {
          i.length && (i = []), Su(e, i, s.from);
          for (let a of n)
            a.line(this.view, o, i);
        }
      }
      for (let s of n)
        s.finish();
      r && this.view.scrollDOM.insertBefore(this.dom, t);
    }
    updateGutters(r) {
      let t = r.startState.facet(ns), e = r.state.facet(ns), i = r.docChanged || r.heightChanged || r.viewportChanged || !rt.eq(r.startState.facet(fo), r.state.facet(fo), r.view.viewport.from, r.view.viewport.to);
      if (t == e)
        for (let n of this.gutters)
          n.update(r) && (i = !0);
      else {
        i = !0;
        let n = [];
        for (let s of e) {
          let o = t.indexOf(s);
          o < 0 ? n.push(new ku(this.view, s)) : (this.gutters[o].update(r), n.push(this.gutters[o]));
        }
        for (let s of this.gutters)
          s.dom.remove(), n.indexOf(s) < 0 && s.destroy();
        for (let s of n)
          this.dom.appendChild(s.dom);
        this.gutters = n;
      }
      return i;
    }
    destroy() {
      for (let r of this.gutters)
        r.destroy();
      this.dom.remove();
    }
  }, {
    provide: (r) => F.scrollMargins.of((t) => {
      let e = t.plugin(r);
      return !e || e.gutters.length == 0 || !e.fixed ? null : t.textDirection == Vt.LTR ? { left: e.dom.offsetWidth } : { right: e.dom.offsetWidth };
    })
  });
  function xu(r) {
    return Array.isArray(r) ? r : [r];
  }
  function Su(r, t, e) {
    for (; r.value && r.from <= e; )
      r.from == e && t.push(r.value), r.next();
  }
  class vg {
    constructor(t, e, i) {
      this.gutter = t, this.height = i, this.localMarkers = [], this.i = 0, this.cursor = rt.iter(t.markers, e.from);
    }
    line(t, e, i) {
      this.localMarkers.length && (this.localMarkers = []), Su(this.cursor, this.localMarkers, e.from);
      let n = i.length ? this.localMarkers.concat(i) : this.localMarkers, s = this.gutter.config.lineMarker(t, e, n);
      s && n.unshift(s);
      let o = this.gutter;
      if (n.length == 0 && !o.config.renderEmptyElements)
        return;
      let a = e.top - this.height;
      if (this.i == o.elements.length) {
        let l = new $u(t, e.height, a, n);
        o.elements.push(l), o.dom.appendChild(l.dom);
      } else
        o.elements[this.i].update(t, e.height, a, n);
      this.height = e.bottom, this.i++;
    }
    finish() {
      let t = this.gutter;
      for (; t.elements.length > this.i; ) {
        let e = t.elements.pop();
        t.dom.removeChild(e.dom), e.destroy();
      }
    }
  }
  class ku {
    constructor(t, e) {
      this.view = t, this.config = e, this.elements = [], this.spacer = null, this.dom = document.createElement("div"), this.dom.className = "cm-gutter" + (this.config.class ? " " + this.config.class : "");
      for (let i in e.domEventHandlers)
        this.dom.addEventListener(i, (n) => {
          let s = t.lineBlockAtHeight(n.clientY - t.documentTop);
          e.domEventHandlers[i](t, s, n) && n.preventDefault();
        });
      this.markers = xu(e.markers(t)), e.initialSpacer && (this.spacer = new $u(t, 0, 0, [e.initialSpacer(t)]), this.dom.appendChild(this.spacer.dom), this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none");
    }
    update(t) {
      let e = this.markers;
      if (this.markers = xu(this.config.markers(t.view)), this.spacer && this.config.updateSpacer) {
        let n = this.config.updateSpacer(this.spacer.markers[0], t);
        n != this.spacer.markers[0] && this.spacer.update(t.view, 0, 0, [n]);
      }
      let i = t.view.viewport;
      return !rt.eq(this.markers, e, i.from, i.to) || (this.config.lineMarkerChange ? this.config.lineMarkerChange(t) : !1);
    }
    destroy() {
      for (let t of this.elements)
        t.destroy();
    }
  }
  class $u {
    constructor(t, e, i, n) {
      this.height = -1, this.above = 0, this.markers = [], this.dom = document.createElement("div"), this.dom.className = "cm-gutterElement", this.update(t, e, i, n);
    }
    update(t, e, i, n) {
      this.height != e && (this.dom.style.height = (this.height = e) + "px"), this.above != i && (this.dom.style.marginTop = (this.above = i) ? i + "px" : ""), Qg(this.markers, n) || this.setMarkers(t, n);
    }
    setMarkers(t, e) {
      let i = "cm-gutterElement", n = this.dom.firstChild;
      for (let s = 0, o = 0; ; ) {
        let a = o, l = s < e.length ? e[s++] : null, u = !1;
        if (l) {
          let d = l.elementClass;
          d && (i += " " + d);
          for (let O = o; O < this.markers.length; O++)
            if (this.markers[O].compare(l)) {
              a = O, u = !0;
              break;
            }
        } else
          a = this.markers.length;
        for (; o < a; ) {
          let d = this.markers[o++];
          if (d.toDOM) {
            d.destroy(n);
            let O = n.nextSibling;
            n.remove(), n = O;
          }
        }
        if (!l)
          break;
        l.toDOM && (u ? n = n.nextSibling : this.dom.insertBefore(l.toDOM(t), n)), u && o++;
      }
      this.dom.className = i, this.markers = e;
    }
    destroy() {
      this.setMarkers(null, []);
    }
  }
  function Qg(r, t) {
    if (r.length != t.length)
      return !1;
    for (let e = 0; e < r.length; e++)
      if (!r[e].compare(t[e]))
        return !1;
    return !0;
  }
  const yg = /* @__PURE__ */ V.define(), yn = /* @__PURE__ */ V.define({
    combine(r) {
      return pi(r, { formatNumber: String, domEventHandlers: {} }, {
        domEventHandlers(t, e) {
          let i = Object.assign({}, t);
          for (let n in e) {
            let s = i[n], o = e[n];
            i[n] = s ? (a, l, u) => s(a, l, u) || o(a, l, u) : o;
          }
          return i;
        }
      });
    }
  });
  class fl extends ar {
    constructor(t) {
      super(), this.number = t;
    }
    eq(t) {
      return this.number == t.number;
    }
    toDOM() {
      return document.createTextNode(this.number);
    }
  }
  function dl(r, t) {
    return r.state.facet(yn).formatNumber(t, r.state);
  }
  const bg = /* @__PURE__ */ ns.compute([yn], (r) => ({
    class: "cm-lineNumbers",
    renderEmptyElements: !1,
    markers(t) {
      return t.state.facet(yg);
    },
    lineMarker(t, e, i) {
      return i.some((n) => n.toDOM) ? null : new fl(dl(t, t.state.doc.lineAt(e.from).number));
    },
    lineMarkerChange: (t) => t.startState.facet(yn) != t.state.facet(yn),
    initialSpacer(t) {
      return new fl(dl(t, Tu(t.state.doc.lines)));
    },
    updateSpacer(t, e) {
      let i = dl(e.view, Tu(e.view.state.doc.lines));
      return i == t.number ? t : new fl(i);
    },
    domEventHandlers: r.facet(yn).domEventHandlers
  }));
  function wg(r = {}) {
    return [
      yn.of(r),
      wu(),
      bg
    ];
  }
  function Tu(r) {
    let t = 9;
    for (; t < r; )
      t = t * 10 + 9;
    return t;
  }
  const xg = /* @__PURE__ */ new class extends ar {
    constructor() {
      super(...arguments), this.elementClass = "cm-activeLineGutter";
    }
  }(), Sg = /* @__PURE__ */ fo.compute(["selection"], (r) => {
    let t = [], e = -1;
    for (let i of r.selection.ranges)
      if (i.empty) {
        let n = r.doc.lineAt(i.head).from;
        n > e && (e = n, t.push(xg.range(n)));
      }
    return rt.of(t);
  });
  function kg() {
    return Sg;
  }
  const Pu = 1024;
  let $g = 0;
  class ri {
    constructor(t, e) {
      this.from = t, this.to = e;
    }
  }
  class Ot {
    constructor(t = {}) {
      this.id = $g++, this.perNode = !!t.perNode, this.deserialize = t.deserialize || (() => {
        throw new Error("This node type doesn't define a deserialize function");
      });
    }
    add(t) {
      if (this.perNode)
        throw new RangeError("Can't add per-node props to node types");
      return typeof t != "function" && (t = $e.match(t)), (e) => {
        let i = t(e);
        return i === void 0 ? null : [this, i];
      };
    }
  }
  Ot.closedBy = new Ot({ deserialize: (r) => r.split(" ") }), Ot.openedBy = new Ot({ deserialize: (r) => r.split(" ") }), Ot.group = new Ot({ deserialize: (r) => r.split(" ") }), Ot.contextHash = new Ot({ perNode: !0 }), Ot.lookAhead = new Ot({ perNode: !0 }), Ot.mounted = new Ot({ perNode: !0 });
  class Tg {
    constructor(t, e, i) {
      this.tree = t, this.overlay = e, this.parser = i;
    }
  }
  const Pg = /* @__PURE__ */ Object.create(null);
  class $e {
    constructor(t, e, i, n = 0) {
      this.name = t, this.props = e, this.id = i, this.flags = n;
    }
    static define(t) {
      let e = t.props && t.props.length ? /* @__PURE__ */ Object.create(null) : Pg, i = (t.top ? 1 : 0) | (t.skipped ? 2 : 0) | (t.error ? 4 : 0) | (t.name == null ? 8 : 0), n = new $e(t.name || "", e, t.id, i);
      if (t.props) {
        for (let s of t.props)
          if (Array.isArray(s) || (s = s(n)), s) {
            if (s[0].perNode)
              throw new RangeError("Can't store a per-node prop on a node type");
            e[s[0].id] = s[1];
          }
      }
      return n;
    }
    prop(t) {
      return this.props[t.id];
    }
    get isTop() {
      return (this.flags & 1) > 0;
    }
    get isSkipped() {
      return (this.flags & 2) > 0;
    }
    get isError() {
      return (this.flags & 4) > 0;
    }
    get isAnonymous() {
      return (this.flags & 8) > 0;
    }
    is(t) {
      if (typeof t == "string") {
        if (this.name == t)
          return !0;
        let e = this.prop(Ot.group);
        return e ? e.indexOf(t) > -1 : !1;
      }
      return this.id == t;
    }
    static match(t) {
      let e = /* @__PURE__ */ Object.create(null);
      for (let i in t)
        for (let n of i.split(" "))
          e[n] = t[i];
      return (i) => {
        for (let n = i.prop(Ot.group), s = -1; s < (n ? n.length : 0); s++) {
          let o = e[s < 0 ? i.name : n[s]];
          if (o)
            return o;
        }
      };
    }
  }
  $e.none = new $e("", /* @__PURE__ */ Object.create(null), 0, 8);
  class Ol {
    constructor(t) {
      this.types = t;
      for (let e = 0; e < t.length; e++)
        if (t[e].id != e)
          throw new RangeError("Node type ids should correspond to array positions when creating a node set");
    }
    extend(...t) {
      let e = [];
      for (let i of this.types) {
        let n = null;
        for (let s of t) {
          let o = s(i);
          o && (n || (n = Object.assign({}, i.props)), n[o[0].id] = o[1]);
        }
        e.push(n ? new $e(i.name, n, i.id, i.flags) : i);
      }
      return new Ol(e);
    }
  }
  const Oo = /* @__PURE__ */ new WeakMap(), Ru = /* @__PURE__ */ new WeakMap();
  var Dt;
  (function(r) {
    r[r.ExcludeBuffers = 1] = "ExcludeBuffers", r[r.IncludeAnonymous = 2] = "IncludeAnonymous", r[r.IgnoreMounts = 4] = "IgnoreMounts", r[r.IgnoreOverlays = 8] = "IgnoreOverlays";
  })(Dt || (Dt = {}));
  class It {
    constructor(t, e, i, n, s) {
      if (this.type = t, this.children = e, this.positions = i, this.length = n, this.props = null, s && s.length) {
        this.props = /* @__PURE__ */ Object.create(null);
        for (let [o, a] of s)
          this.props[typeof o == "number" ? o : o.id] = a;
      }
    }
    toString() {
      let t = this.prop(Ot.mounted);
      if (t && !t.overlay)
        return t.tree.toString();
      let e = "";
      for (let i of this.children) {
        let n = i.toString();
        n && (e && (e += ","), e += n);
      }
      return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (e.length ? "(" + e + ")" : "") : e;
    }
    cursor(t = 0) {
      return new ss(this.topNode, t);
    }
    cursorAt(t, e = 0, i = 0) {
      let n = Oo.get(this) || this.topNode, s = new ss(n);
      return s.moveTo(t, e), Oo.set(this, s._tree), s;
    }
    get topNode() {
      return new ni(this, 0, 0, null);
    }
    resolve(t, e = 0) {
      let i = bn(Oo.get(this) || this.topNode, t, e, !1);
      return Oo.set(this, i), i;
    }
    resolveInner(t, e = 0) {
      let i = bn(Ru.get(this) || this.topNode, t, e, !0);
      return Ru.set(this, i), i;
    }
    iterate(t) {
      let { enter: e, leave: i, from: n = 0, to: s = this.length } = t;
      for (let o = this.cursor((t.mode || 0) | Dt.IncludeAnonymous); ; ) {
        let a = !1;
        if (o.from <= s && o.to >= n && (o.type.isAnonymous || e(o) !== !1)) {
          if (o.firstChild())
            continue;
          a = !0;
        }
        for (; a && i && !o.type.isAnonymous && i(o), !o.nextSibling(); ) {
          if (!o.parent())
            return;
          a = !0;
        }
      }
    }
    prop(t) {
      return t.perNode ? this.props ? this.props[t.id] : void 0 : this.type.prop(t);
    }
    get propValues() {
      let t = [];
      if (this.props)
        for (let e in this.props)
          t.push([+e, this.props[e]]);
      return t;
    }
    balance(t = {}) {
      return this.children.length <= 8 ? this : gl($e.none, this.children, this.positions, 0, this.children.length, 0, this.length, (e, i, n) => new It(this.type, e, i, n, this.propValues), t.makeTree || ((e, i, n) => new It($e.none, e, i, n)));
    }
    static build(t) {
      return Cg(t);
    }
  }
  It.empty = new It($e.none, [], [], 0);
  class pl {
    constructor(t, e) {
      this.buffer = t, this.index = e;
    }
    get id() {
      return this.buffer[this.index - 4];
    }
    get start() {
      return this.buffer[this.index - 3];
    }
    get end() {
      return this.buffer[this.index - 2];
    }
    get size() {
      return this.buffer[this.index - 1];
    }
    get pos() {
      return this.index;
    }
    next() {
      this.index -= 4;
    }
    fork() {
      return new pl(this.buffer, this.index);
    }
  }
  class Jr {
    constructor(t, e, i) {
      this.buffer = t, this.length = e, this.set = i;
    }
    get type() {
      return $e.none;
    }
    toString() {
      let t = [];
      for (let e = 0; e < this.buffer.length; )
        t.push(this.childString(e)), e = this.buffer[e + 3];
      return t.join(",");
    }
    childString(t) {
      let e = this.buffer[t], i = this.buffer[t + 3], n = this.set.types[e], s = n.name;
      if (/\W/.test(s) && !n.isError && (s = JSON.stringify(s)), t += 4, i == t)
        return s;
      let o = [];
      for (; t < i; )
        o.push(this.childString(t)), t = this.buffer[t + 3];
      return s + "(" + o.join(",") + ")";
    }
    findChild(t, e, i, n, s) {
      let { buffer: o } = this, a = -1;
      for (let l = t; l != e && !(Cu(s, n, o[l + 1], o[l + 2]) && (a = l, i > 0)); l = o[l + 3])
        ;
      return a;
    }
    slice(t, e, i, n) {
      let s = this.buffer, o = new Uint16Array(e - t);
      for (let a = t, l = 0; a < e; )
        o[l++] = s[a++], o[l++] = s[a++] - i, o[l++] = s[a++] - i, o[l++] = s[a++] - t;
      return new Jr(o, n - i, this.set);
    }
  }
  function Cu(r, t, e, i) {
    switch (r) {
      case -2:
        return e < t;
      case -1:
        return i >= t && e < t;
      case 0:
        return e < t && i > t;
      case 1:
        return e <= t && i > t;
      case 2:
        return i > t;
      case 4:
        return !0;
    }
  }
  function _u(r, t) {
    let e = r.childBefore(t);
    for (; e; ) {
      let i = e.lastChild;
      if (!i || i.to != e.to)
        break;
      i.type.isError && i.from == i.to ? (r = e, e = i.prevSibling) : e = i;
    }
    return r;
  }
  function bn(r, t, e, i) {
    for (var n; r.from == r.to || (e < 1 ? r.from >= t : r.from > t) || (e > -1 ? r.to <= t : r.to < t); ) {
      let o = !i && r instanceof ni && r.index < 0 ? null : r.parent;
      if (!o)
        return r;
      r = o;
    }
    let s = i ? 0 : Dt.IgnoreOverlays;
    if (i)
      for (let o = r, a = o.parent; a; o = a, a = o.parent)
        o instanceof ni && o.index < 0 && ((n = a.enter(t, e, s)) === null || n === void 0 ? void 0 : n.from) != o.from && (r = a);
    for (; ; ) {
      let o = r.enter(t, e, s);
      if (!o)
        return r;
      r = o;
    }
  }
  class ni {
    constructor(t, e, i, n) {
      this._tree = t, this.from = e, this.index = i, this._parent = n;
    }
    get type() {
      return this._tree.type;
    }
    get name() {
      return this._tree.type.name;
    }
    get to() {
      return this.from + this._tree.length;
    }
    nextChild(t, e, i, n, s = 0) {
      for (let o = this; ; ) {
        for (let { children: a, positions: l } = o._tree, u = e > 0 ? a.length : -1; t != u; t += e) {
          let d = a[t], O = l[t] + o.from;
          if (Cu(n, i, O, O + d.length)) {
            if (d instanceof Jr) {
              if (s & Dt.ExcludeBuffers)
                continue;
              let m = d.findChild(0, d.buffer.length, e, i - O, n);
              if (m > -1)
                return new Di(new Rg(o, d, t, O), null, m);
            } else if (s & Dt.IncludeAnonymous || !d.type.isAnonymous || ml(d)) {
              let m;
              if (!(s & Dt.IgnoreMounts) && d.props && (m = d.prop(Ot.mounted)) && !m.overlay)
                return new ni(m.tree, O, t, o);
              let Q = new ni(d, O, t, o);
              return s & Dt.IncludeAnonymous || !Q.type.isAnonymous ? Q : Q.nextChild(e < 0 ? d.children.length - 1 : 0, e, i, n);
            }
          }
        }
        if (s & Dt.IncludeAnonymous || !o.type.isAnonymous || (o.index >= 0 ? t = o.index + e : t = e < 0 ? -1 : o._parent._tree.children.length, o = o._parent, !o))
          return null;
      }
    }
    get firstChild() {
      return this.nextChild(0, 1, 0, 4);
    }
    get lastChild() {
      return this.nextChild(this._tree.children.length - 1, -1, 0, 4);
    }
    childAfter(t) {
      return this.nextChild(0, 1, t, 2);
    }
    childBefore(t) {
      return this.nextChild(this._tree.children.length - 1, -1, t, -2);
    }
    enter(t, e, i = 0) {
      let n;
      if (!(i & Dt.IgnoreOverlays) && (n = this._tree.prop(Ot.mounted)) && n.overlay) {
        let s = t - this.from;
        for (let { from: o, to: a } of n.overlay)
          if ((e > 0 ? o <= s : o < s) && (e < 0 ? a >= s : a > s))
            return new ni(n.tree, n.overlay[0].from + this.from, -1, this);
      }
      return this.nextChild(0, 1, t, e, i);
    }
    nextSignificantParent() {
      let t = this;
      for (; t.type.isAnonymous && t._parent; )
        t = t._parent;
      return t;
    }
    get parent() {
      return this._parent ? this._parent.nextSignificantParent() : null;
    }
    get nextSibling() {
      return this._parent && this.index >= 0 ? this._parent.nextChild(this.index + 1, 1, 0, 4) : null;
    }
    get prevSibling() {
      return this._parent && this.index >= 0 ? this._parent.nextChild(this.index - 1, -1, 0, 4) : null;
    }
    cursor(t = 0) {
      return new ss(this, t);
    }
    get tree() {
      return this._tree;
    }
    toTree() {
      return this._tree;
    }
    resolve(t, e = 0) {
      return bn(this, t, e, !1);
    }
    resolveInner(t, e = 0) {
      return bn(this, t, e, !0);
    }
    enterUnfinishedNodesBefore(t) {
      return _u(this, t);
    }
    getChild(t, e = null, i = null) {
      let n = po(this, t, e, i);
      return n.length ? n[0] : null;
    }
    getChildren(t, e = null, i = null) {
      return po(this, t, e, i);
    }
    toString() {
      return this._tree.toString();
    }
    get node() {
      return this;
    }
    matchContext(t) {
      return mo(this, t);
    }
  }
  function po(r, t, e, i) {
    let n = r.cursor(), s = [];
    if (!n.firstChild())
      return s;
    if (e != null) {
      for (; !n.type.is(e); )
        if (!n.nextSibling())
          return s;
    }
    for (; ; ) {
      if (i != null && n.type.is(i))
        return s;
      if (n.type.is(t) && s.push(n.node), !n.nextSibling())
        return i == null ? s : [];
    }
  }
  function mo(r, t, e = t.length - 1) {
    for (let i = r.parent; e >= 0; i = i.parent) {
      if (!i)
        return !1;
      if (!i.type.isAnonymous) {
        if (t[e] && t[e] != i.name)
          return !1;
        e--;
      }
    }
    return !0;
  }
  class Rg {
    constructor(t, e, i, n) {
      this.parent = t, this.buffer = e, this.index = i, this.start = n;
    }
  }
  class Di {
    constructor(t, e, i) {
      this.context = t, this._parent = e, this.index = i, this.type = t.buffer.set.types[t.buffer.buffer[i]];
    }
    get name() {
      return this.type.name;
    }
    get from() {
      return this.context.start + this.context.buffer.buffer[this.index + 1];
    }
    get to() {
      return this.context.start + this.context.buffer.buffer[this.index + 2];
    }
    child(t, e, i) {
      let { buffer: n } = this.context, s = n.findChild(this.index + 4, n.buffer[this.index + 3], t, e - this.context.start, i);
      return s < 0 ? null : new Di(this.context, this, s);
    }
    get firstChild() {
      return this.child(1, 0, 4);
    }
    get lastChild() {
      return this.child(-1, 0, 4);
    }
    childAfter(t) {
      return this.child(1, t, 2);
    }
    childBefore(t) {
      return this.child(-1, t, -2);
    }
    enter(t, e, i = 0) {
      if (i & Dt.ExcludeBuffers)
        return null;
      let { buffer: n } = this.context, s = n.findChild(this.index + 4, n.buffer[this.index + 3], e > 0 ? 1 : -1, t - this.context.start, e);
      return s < 0 ? null : new Di(this.context, this, s);
    }
    get parent() {
      return this._parent || this.context.parent.nextSignificantParent();
    }
    externalSibling(t) {
      return this._parent ? null : this.context.parent.nextChild(this.context.index + t, t, 0, 4);
    }
    get nextSibling() {
      let { buffer: t } = this.context, e = t.buffer[this.index + 3];
      return e < (this._parent ? t.buffer[this._parent.index + 3] : t.buffer.length) ? new Di(this.context, this._parent, e) : this.externalSibling(1);
    }
    get prevSibling() {
      let { buffer: t } = this.context, e = this._parent ? this._parent.index + 4 : 0;
      return this.index == e ? this.externalSibling(-1) : new Di(this.context, this._parent, t.findChild(e, this.index, -1, 0, 4));
    }
    cursor(t = 0) {
      return new ss(this, t);
    }
    get tree() {
      return null;
    }
    toTree() {
      let t = [], e = [], { buffer: i } = this.context, n = this.index + 4, s = i.buffer[this.index + 3];
      if (s > n) {
        let o = i.buffer[this.index + 1], a = i.buffer[this.index + 2];
        t.push(i.slice(n, s, o, a)), e.push(0);
      }
      return new It(this.type, t, e, this.to - this.from);
    }
    resolve(t, e = 0) {
      return bn(this, t, e, !1);
    }
    resolveInner(t, e = 0) {
      return bn(this, t, e, !0);
    }
    enterUnfinishedNodesBefore(t) {
      return _u(this, t);
    }
    toString() {
      return this.context.buffer.childString(this.index);
    }
    getChild(t, e = null, i = null) {
      let n = po(this, t, e, i);
      return n.length ? n[0] : null;
    }
    getChildren(t, e = null, i = null) {
      return po(this, t, e, i);
    }
    get node() {
      return this;
    }
    matchContext(t) {
      return mo(this, t);
    }
  }
  class ss {
    constructor(t, e = 0) {
      if (this.mode = e, this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, t instanceof ni)
        this.yieldNode(t);
      else {
        this._tree = t.context.parent, this.buffer = t.context;
        for (let i = t._parent; i; i = i._parent)
          this.stack.unshift(i.index);
        this.bufferNode = t, this.yieldBuf(t.index);
      }
    }
    get name() {
      return this.type.name;
    }
    yieldNode(t) {
      return t ? (this._tree = t, this.type = t.type, this.from = t.from, this.to = t.to, !0) : !1;
    }
    yieldBuf(t, e) {
      this.index = t;
      let { start: i, buffer: n } = this.buffer;
      return this.type = e || n.set.types[n.buffer[t]], this.from = i + n.buffer[t + 1], this.to = i + n.buffer[t + 2], !0;
    }
    yield(t) {
      return t ? t instanceof ni ? (this.buffer = null, this.yieldNode(t)) : (this.buffer = t.context, this.yieldBuf(t.index, t.type)) : !1;
    }
    toString() {
      return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
    }
    enterChild(t, e, i) {
      if (!this.buffer)
        return this.yield(this._tree.nextChild(t < 0 ? this._tree._tree.children.length - 1 : 0, t, e, i, this.mode));
      let { buffer: n } = this.buffer, s = n.findChild(this.index + 4, n.buffer[this.index + 3], t, e - this.buffer.start, i);
      return s < 0 ? !1 : (this.stack.push(this.index), this.yieldBuf(s));
    }
    firstChild() {
      return this.enterChild(1, 0, 4);
    }
    lastChild() {
      return this.enterChild(-1, 0, 4);
    }
    childAfter(t) {
      return this.enterChild(1, t, 2);
    }
    childBefore(t) {
      return this.enterChild(-1, t, -2);
    }
    enter(t, e, i = this.mode) {
      return this.buffer ? i & Dt.ExcludeBuffers ? !1 : this.enterChild(1, t, e) : this.yield(this._tree.enter(t, e, i));
    }
    parent() {
      if (!this.buffer)
        return this.yieldNode(this.mode & Dt.IncludeAnonymous ? this._tree._parent : this._tree.parent);
      if (this.stack.length)
        return this.yieldBuf(this.stack.pop());
      let t = this.mode & Dt.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
      return this.buffer = null, this.yieldNode(t);
    }
    sibling(t) {
      if (!this.buffer)
        return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + t, t, 0, 4, this.mode)) : !1;
      let { buffer: e } = this.buffer, i = this.stack.length - 1;
      if (t < 0) {
        let n = i < 0 ? 0 : this.stack[i] + 4;
        if (this.index != n)
          return this.yieldBuf(e.findChild(n, this.index, -1, 0, 4));
      } else {
        let n = e.buffer[this.index + 3];
        if (n < (i < 0 ? e.buffer.length : e.buffer[this.stack[i] + 3]))
          return this.yieldBuf(n);
      }
      return i < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + t, t, 0, 4, this.mode)) : !1;
    }
    nextSibling() {
      return this.sibling(1);
    }
    prevSibling() {
      return this.sibling(-1);
    }
    atLastNode(t) {
      let e, i, { buffer: n } = this;
      if (n) {
        if (t > 0) {
          if (this.index < n.buffer.buffer.length)
            return !1;
        } else
          for (let s = 0; s < this.index; s++)
            if (n.buffer.buffer[s + 3] < this.index)
              return !1;
        ({ index: e, parent: i } = n);
      } else
        ({ index: e, _parent: i } = this._tree);
      for (; i; { index: e, _parent: i } = i)
        if (e > -1)
          for (let s = e + t, o = t < 0 ? -1 : i._tree.children.length; s != o; s += t) {
            let a = i._tree.children[s];
            if (this.mode & Dt.IncludeAnonymous || a instanceof Jr || !a.type.isAnonymous || ml(a))
              return !1;
          }
      return !0;
    }
    move(t, e) {
      if (e && this.enterChild(t, 0, 4))
        return !0;
      for (; ; ) {
        if (this.sibling(t))
          return !0;
        if (this.atLastNode(t) || !this.parent())
          return !1;
      }
    }
    next(t = !0) {
      return this.move(1, t);
    }
    prev(t = !0) {
      return this.move(-1, t);
    }
    moveTo(t, e = 0) {
      for (; (this.from == this.to || (e < 1 ? this.from >= t : this.from > t) || (e > -1 ? this.to <= t : this.to < t)) && this.parent(); )
        ;
      for (; this.enterChild(1, t, e); )
        ;
      return this;
    }
    get node() {
      if (!this.buffer)
        return this._tree;
      let t = this.bufferNode, e = null, i = 0;
      if (t && t.context == this.buffer)
        t:
          for (let n = this.index, s = this.stack.length; s >= 0; ) {
            for (let o = t; o; o = o._parent)
              if (o.index == n) {
                if (n == this.index)
                  return o;
                e = o, i = s + 1;
                break t;
              }
            n = this.stack[--s];
          }
      for (let n = i; n < this.stack.length; n++)
        e = new Di(this.buffer, e, this.stack[n]);
      return this.bufferNode = new Di(this.buffer, e, this.index);
    }
    get tree() {
      return this.buffer ? null : this._tree._tree;
    }
    iterate(t, e) {
      for (let i = 0; ; ) {
        let n = !1;
        if (this.type.isAnonymous || t(this) !== !1) {
          if (this.firstChild()) {
            i++;
            continue;
          }
          this.type.isAnonymous || (n = !0);
        }
        for (; n && e && e(this), n = this.type.isAnonymous, !this.nextSibling(); ) {
          if (!i)
            return;
          this.parent(), i--, n = !0;
        }
      }
    }
    matchContext(t) {
      if (!this.buffer)
        return mo(this.node, t);
      let { buffer: e } = this.buffer, { types: i } = e.set;
      for (let n = t.length - 1, s = this.stack.length - 1; n >= 0; s--) {
        if (s < 0)
          return mo(this.node, t, n);
        let o = i[e.buffer[this.stack[s]]];
        if (!o.isAnonymous) {
          if (t[n] && t[n] != o.name)
            return !1;
          n--;
        }
      }
      return !0;
    }
  }
  function ml(r) {
    return r.children.some((t) => t instanceof Jr || !t.type.isAnonymous || ml(t));
  }
  function Cg(r) {
    var t;
    let { buffer: e, nodeSet: i, maxBufferLength: n = Pu, reused: s = [], minRepeatType: o = i.types.length } = r, a = Array.isArray(e) ? new pl(e, e.length) : e, l = i.types, u = 0, d = 0;
    function O(G, L, J, at, Ut) {
      let { id: yt, start: mt, end: _t, size: Bt } = a, Jt = d;
      for (; Bt < 0; )
        if (a.next(), Bt == -1) {
          let Oe = s[yt];
          J.push(Oe), at.push(mt - G);
          return;
        } else if (Bt == -3) {
          u = yt;
          return;
        } else if (Bt == -4) {
          d = yt;
          return;
        } else
          throw new RangeError(`Unrecognized record size: ${Bt}`);
      let Ue = l[yt], be, Te, ki = mt - G;
      if (_t - mt <= n && (Te = C(a.pos - L, Ut))) {
        let Oe = new Uint16Array(Te.size - Te.skip), $i = a.pos - Te.size, ur = Oe.length;
        for (; a.pos > $i; )
          ur = A(Te.start, Oe, ur);
        be = new Jr(Oe, _t - Te.start, i), ki = Te.start - G;
      } else {
        let Oe = a.pos - Bt;
        a.next();
        let $i = [], ur = [], sn = yt >= o ? yt : -1, _n = 0, sa = _t;
        for (; a.pos > Oe; )
          sn >= 0 && a.id == sn && a.size >= 0 ? (a.end <= sa - n && (Q($i, ur, mt, _n, a.end, sa, sn, Jt), _n = $i.length, sa = a.end), a.next()) : O(mt, Oe, $i, ur, sn);
        if (sn >= 0 && _n > 0 && _n < $i.length && Q($i, ur, mt, _n, mt, sa, sn, Jt), $i.reverse(), ur.reverse(), sn > -1 && _n > 0) {
          let kO = m(Ue);
          be = gl(Ue, $i, ur, 0, $i.length, 0, _t - mt, kO, kO);
        } else
          be = b(Ue, $i, ur, _t - mt, Jt - _t);
      }
      J.push(be), at.push(ki);
    }
    function m(G) {
      return (L, J, at) => {
        let Ut = 0, yt = L.length - 1, mt, _t;
        if (yt >= 0 && (mt = L[yt]) instanceof It) {
          if (!yt && mt.type == G && mt.length == at)
            return mt;
          (_t = mt.prop(Ot.lookAhead)) && (Ut = J[yt] + mt.length + _t);
        }
        return b(G, L, J, at, Ut);
      };
    }
    function Q(G, L, J, at, Ut, yt, mt, _t) {
      let Bt = [], Jt = [];
      for (; G.length > at; )
        Bt.push(G.pop()), Jt.push(L.pop() + J - Ut);
      G.push(b(i.types[mt], Bt, Jt, yt - Ut, _t - yt)), L.push(Ut - J);
    }
    function b(G, L, J, at, Ut = 0, yt) {
      if (u) {
        let mt = [Ot.contextHash, u];
        yt = yt ? [mt].concat(yt) : [mt];
      }
      if (Ut > 25) {
        let mt = [Ot.lookAhead, Ut];
        yt = yt ? [mt].concat(yt) : [mt];
      }
      return new It(G, L, J, at, yt);
    }
    function C(G, L) {
      let J = a.fork(), at = 0, Ut = 0, yt = 0, mt = J.end - n, _t = { size: 0, start: 0, skip: 0 };
      t:
        for (let Bt = J.pos - G; J.pos > Bt; ) {
          let Jt = J.size;
          if (J.id == L && Jt >= 0) {
            _t.size = at, _t.start = Ut, _t.skip = yt, yt += 4, at += 4, J.next();
            continue;
          }
          let Ue = J.pos - Jt;
          if (Jt < 0 || Ue < Bt || J.start < mt)
            break;
          let be = J.id >= o ? 4 : 0, Te = J.start;
          for (J.next(); J.pos > Ue; ) {
            if (J.size < 0)
              if (J.size == -3)
                be += 4;
              else
                break t;
            else
              J.id >= o && (be += 4);
            J.next();
          }
          Ut = Te, at += Jt, yt += be;
        }
      return (L < 0 || at == G) && (_t.size = at, _t.start = Ut, _t.skip = yt), _t.size > 4 ? _t : void 0;
    }
    function A(G, L, J) {
      let { id: at, start: Ut, end: yt, size: mt } = a;
      if (a.next(), mt >= 0 && at < o) {
        let _t = J;
        if (mt > 4) {
          let Bt = a.pos - (mt - 4);
          for (; a.pos > Bt; )
            J = A(G, L, J);
        }
        L[--J] = _t, L[--J] = yt - G, L[--J] = Ut - G, L[--J] = at;
      } else
        mt == -3 ? u = at : mt == -4 && (d = at);
      return J;
    }
    let M = [], U = [];
    for (; a.pos > 0; )
      O(r.start || 0, r.bufferStart || 0, M, U, -1);
    let Y = (t = r.length) !== null && t !== void 0 ? t : M.length ? U[0] + M[0].length : 0;
    return new It(l[r.topID], M.reverse(), U.reverse(), Y);
  }
  const Au = /* @__PURE__ */ new WeakMap();
  function go(r, t) {
    if (!r.isAnonymous || t instanceof Jr || t.type != r)
      return 1;
    let e = Au.get(t);
    if (e == null) {
      e = 1;
      for (let i of t.children) {
        if (i.type != r || !(i instanceof It)) {
          e = 1;
          break;
        }
        e += go(r, i);
      }
      Au.set(t, e);
    }
    return e;
  }
  function gl(r, t, e, i, n, s, o, a, l) {
    let u = 0;
    for (let b = i; b < n; b++)
      u += go(r, t[b]);
    let d = Math.ceil(u * 1.5 / 8), O = [], m = [];
    function Q(b, C, A, M, U) {
      for (let Y = A; Y < M; ) {
        let G = Y, L = C[Y], J = go(r, b[Y]);
        for (Y++; Y < M; Y++) {
          let at = go(r, b[Y]);
          if (J + at >= d)
            break;
          J += at;
        }
        if (Y == G + 1) {
          if (J > d) {
            let at = b[G];
            Q(at.children, at.positions, 0, at.children.length, C[G] + U);
            continue;
          }
          O.push(b[G]);
        } else {
          let at = C[Y - 1] + b[Y - 1].length - L;
          O.push(gl(r, b, C, G, Y, L, at, null, l));
        }
        m.push(L + U - s);
      }
    }
    return Q(t, e, i, n, 0), (a || l)(O, m, o);
  }
  class _g {
    constructor() {
      this.map = /* @__PURE__ */ new WeakMap();
    }
    setBuffer(t, e, i) {
      let n = this.map.get(t);
      n || this.map.set(t, n = /* @__PURE__ */ new Map()), n.set(e, i);
    }
    getBuffer(t, e) {
      let i = this.map.get(t);
      return i && i.get(e);
    }
    set(t, e) {
      t instanceof Di ? this.setBuffer(t.context.buffer, t.index, e) : t instanceof ni && this.map.set(t.tree, e);
    }
    get(t) {
      return t instanceof Di ? this.getBuffer(t.context.buffer, t.index) : t instanceof ni ? this.map.get(t.tree) : void 0;
    }
    cursorSet(t, e) {
      t.buffer ? this.setBuffer(t.buffer.buffer, t.index, e) : this.map.set(t.tree, e);
    }
    cursorGet(t) {
      return t.buffer ? this.getBuffer(t.buffer.buffer, t.index) : this.map.get(t.tree);
    }
  }
  class lr {
    constructor(t, e, i, n, s = !1, o = !1) {
      this.from = t, this.to = e, this.tree = i, this.offset = n, this.open = (s ? 1 : 0) | (o ? 2 : 0);
    }
    get openStart() {
      return (this.open & 1) > 0;
    }
    get openEnd() {
      return (this.open & 2) > 0;
    }
    static addTree(t, e = [], i = !1) {
      let n = [new lr(0, t.length, t, 0, !1, i)];
      for (let s of e)
        s.to > t.length && n.push(s);
      return n;
    }
    static applyChanges(t, e, i = 128) {
      if (!e.length)
        return t;
      let n = [], s = 1, o = t.length ? t[0] : null;
      for (let a = 0, l = 0, u = 0; ; a++) {
        let d = a < e.length ? e[a] : null, O = d ? d.fromA : 1e9;
        if (O - l >= i)
          for (; o && o.from < O; ) {
            let m = o;
            if (l >= m.from || O <= m.to || u) {
              let Q = Math.max(m.from, l) - u, b = Math.min(m.to, O) - u;
              m = Q >= b ? null : new lr(Q, b, m.tree, m.offset + u, a > 0, !!d);
            }
            if (m && n.push(m), o.to > O)
              break;
            o = s < t.length ? t[s++] : null;
          }
        if (!d)
          break;
        l = d.toA, u = d.toA - d.toB;
      }
      return n;
    }
  }
  class Wu {
    startParse(t, e, i) {
      return typeof t == "string" && (t = new Ag(t)), i = i ? i.length ? i.map((n) => new ri(n.from, n.to)) : [new ri(0, 0)] : [new ri(0, t.length)], this.createParse(t, e || [], i);
    }
    parse(t, e, i) {
      let n = this.startParse(t, e, i);
      for (; ; ) {
        let s = n.advance();
        if (s)
          return s;
      }
    }
  }
  class Ag {
    constructor(t) {
      this.string = t;
    }
    get length() {
      return this.string.length;
    }
    chunk(t) {
      return this.string.slice(t);
    }
    get lineChunks() {
      return !1;
    }
    read(t, e) {
      return this.string.slice(t, e);
    }
  }
  function Wg(r) {
    return (t, e, i, n) => new qg(t, r, e, i, n);
  }
  class Xu {
    constructor(t, e, i, n, s) {
      this.parser = t, this.parse = e, this.overlay = i, this.target = n, this.ranges = s;
    }
  }
  class Xg {
    constructor(t, e, i, n, s, o, a) {
      this.parser = t, this.predicate = e, this.mounts = i, this.index = n, this.start = s, this.target = o, this.prev = a, this.depth = 0, this.ranges = [];
    }
  }
  const vl = new Ot({ perNode: !0 });
  class qg {
    constructor(t, e, i, n, s) {
      this.nest = e, this.input = i, this.fragments = n, this.ranges = s, this.inner = [], this.innerDone = 0, this.baseTree = null, this.stoppedAt = null, this.baseParse = t;
    }
    advance() {
      if (this.baseParse) {
        let i = this.baseParse.advance();
        if (!i)
          return null;
        if (this.baseParse = null, this.baseTree = i, this.startInner(), this.stoppedAt != null)
          for (let n of this.inner)
            n.parse.stopAt(this.stoppedAt);
      }
      if (this.innerDone == this.inner.length) {
        let i = this.baseTree;
        return this.stoppedAt != null && (i = new It(i.type, i.children, i.positions, i.length, i.propValues.concat([[vl, this.stoppedAt]]))), i;
      }
      let t = this.inner[this.innerDone], e = t.parse.advance();
      if (e) {
        this.innerDone++;
        let i = Object.assign(/* @__PURE__ */ Object.create(null), t.target.props);
        i[Ot.mounted.id] = new Tg(e, t.overlay, t.parser), t.target.props = i;
      }
      return null;
    }
    get parsedPos() {
      if (this.baseParse)
        return 0;
      let t = this.input.length;
      for (let e = this.innerDone; e < this.inner.length; e++)
        this.inner[e].ranges[0].from < t && (t = Math.min(t, this.inner[e].parse.parsedPos));
      return t;
    }
    stopAt(t) {
      if (this.stoppedAt = t, this.baseParse)
        this.baseParse.stopAt(t);
      else
        for (let e = this.innerDone; e < this.inner.length; e++)
          this.inner[e].parse.stopAt(t);
    }
    startInner() {
      let t = new Eg(this.fragments), e = null, i = null, n = new ss(new ni(this.baseTree, this.ranges[0].from, 0, null), Dt.IncludeAnonymous | Dt.IgnoreMounts);
      t:
        for (let s, o; this.stoppedAt == null || n.from < this.stoppedAt; ) {
          let a = !0, l;
          if (t.hasNode(n)) {
            if (e) {
              let u = e.mounts.find((d) => d.frag.from <= n.from && d.frag.to >= n.to && d.mount.overlay);
              if (u)
                for (let d of u.mount.overlay) {
                  let O = d.from + u.pos, m = d.to + u.pos;
                  O >= n.from && m <= n.to && !e.ranges.some((Q) => Q.from < m && Q.to > O) && e.ranges.push({ from: O, to: m });
                }
            }
            a = !1;
          } else if (i && (o = Mg(i.ranges, n.from, n.to)))
            a = o != 2;
          else if (!n.type.isAnonymous && n.from < n.to && (s = this.nest(n, this.input))) {
            n.tree || Dg(n);
            let u = t.findMounts(n.from, s.parser);
            if (typeof s.overlay == "function")
              e = new Xg(s.parser, s.overlay, u, this.inner.length, n.from, n.tree, e);
            else {
              let d = Du(this.ranges, s.overlay || [new ri(n.from, n.to)]);
              d.length && this.inner.push(new Xu(s.parser, s.parser.startParse(this.input, Eu(u, d), d), s.overlay ? s.overlay.map((O) => new ri(O.from - n.from, O.to - n.from)) : null, n.tree, d)), s.overlay ? d.length && (i = { ranges: d, depth: 0, prev: i }) : a = !1;
            }
          } else
            e && (l = e.predicate(n)) && (l === !0 && (l = new ri(n.from, n.to)), l.from < l.to && e.ranges.push(l));
          if (a && n.firstChild())
            e && e.depth++, i && i.depth++;
          else
            for (; !n.nextSibling(); ) {
              if (!n.parent())
                break t;
              if (e && !--e.depth) {
                let u = Du(this.ranges, e.ranges);
                u.length && this.inner.splice(e.index, 0, new Xu(e.parser, e.parser.startParse(this.input, Eu(e.mounts, u), u), e.ranges.map((d) => new ri(d.from - e.start, d.to - e.start)), e.target, u)), e = e.prev;
              }
              i && !--i.depth && (i = i.prev);
            }
        }
    }
  }
  function Mg(r, t, e) {
    for (let i of r) {
      if (i.from >= e)
        break;
      if (i.to > t)
        return i.from <= t && i.to >= e ? 2 : 1;
    }
    return 0;
  }
  function qu(r, t, e, i, n, s) {
    if (t < e) {
      let o = r.buffer[t + 1], a = r.buffer[e - 2];
      i.push(r.slice(t, e, o, a)), n.push(o - s);
    }
  }
  function Dg(r) {
    let { node: t } = r, e = 0;
    do
      r.parent(), e++;
    while (!r.tree);
    let i = 0, n = r.tree, s = 0;
    for (; s = n.positions[i] + r.from, !(s <= t.from && s + n.children[i].length >= t.to); i++)
      ;
    let o = n.children[i], a = o.buffer;
    function l(u, d, O, m, Q) {
      let b = u;
      for (; a[b + 2] + s <= t.from; )
        b = a[b + 3];
      let C = [], A = [];
      qu(o, u, b, C, A, m);
      let M = a[b + 1], U = a[b + 2], Y = M + s == t.from && U + s == t.to && a[b] == t.type.id;
      return C.push(Y ? t.toTree() : l(b + 4, a[b + 3], o.set.types[a[b]], M, U - M)), A.push(M - m), qu(o, a[b + 3], d, C, A, m), new It(O, C, A, Q);
    }
    n.children[i] = l(0, a.length, $e.none, 0, o.length);
    for (let u = 0; u <= e; u++)
      r.childAfter(t.from);
  }
  class Mu {
    constructor(t, e) {
      this.offset = e, this.done = !1, this.cursor = t.cursor(Dt.IncludeAnonymous | Dt.IgnoreMounts);
    }
    moveTo(t) {
      let { cursor: e } = this, i = t - this.offset;
      for (; !this.done && e.from < i; )
        e.to >= t && e.enter(i, 1, Dt.IgnoreOverlays | Dt.ExcludeBuffers) || e.next(!1) || (this.done = !0);
    }
    hasNode(t) {
      if (this.moveTo(t.from), !this.done && this.cursor.from + this.offset == t.from && this.cursor.tree)
        for (let e = this.cursor.tree; ; ) {
          if (e == t.tree)
            return !0;
          if (e.children.length && e.positions[0] == 0 && e.children[0] instanceof It)
            e = e.children[0];
          else
            break;
        }
      return !1;
    }
  }
  class Eg {
    constructor(t) {
      var e;
      if (this.fragments = t, this.curTo = 0, this.fragI = 0, t.length) {
        let i = this.curFrag = t[0];
        this.curTo = (e = i.tree.prop(vl)) !== null && e !== void 0 ? e : i.to, this.inner = new Mu(i.tree, -i.offset);
      } else
        this.curFrag = this.inner = null;
    }
    hasNode(t) {
      for (; this.curFrag && t.from >= this.curTo; )
        this.nextFrag();
      return this.curFrag && this.curFrag.from <= t.from && this.curTo >= t.to && this.inner.hasNode(t);
    }
    nextFrag() {
      var t;
      if (this.fragI++, this.fragI == this.fragments.length)
        this.curFrag = this.inner = null;
      else {
        let e = this.curFrag = this.fragments[this.fragI];
        this.curTo = (t = e.tree.prop(vl)) !== null && t !== void 0 ? t : e.to, this.inner = new Mu(e.tree, -e.offset);
      }
    }
    findMounts(t, e) {
      var i;
      let n = [];
      if (this.inner) {
        this.inner.cursor.moveTo(t, 1);
        for (let s = this.inner.cursor.node; s; s = s.parent) {
          let o = (i = s.tree) === null || i === void 0 ? void 0 : i.prop(Ot.mounted);
          if (o && o.parser == e)
            for (let a = this.fragI; a < this.fragments.length; a++) {
              let l = this.fragments[a];
              if (l.from >= s.to)
                break;
              l.tree == this.curFrag.tree && n.push({
                frag: l,
                pos: s.from - l.offset,
                mount: o
              });
            }
        }
      }
      return n;
    }
  }
  function Du(r, t) {
    let e = null, i = t;
    for (let n = 1, s = 0; n < r.length; n++) {
      let o = r[n - 1].to, a = r[n].from;
      for (; s < i.length; s++) {
        let l = i[s];
        if (l.from >= a)
          break;
        l.to <= o || (e || (i = e = t.slice()), l.from < o ? (e[s] = new ri(l.from, o), l.to > a && e.splice(s + 1, 0, new ri(a, l.to))) : l.to > a ? e[s--] = new ri(a, l.to) : e.splice(s--, 1));
      }
    }
    return i;
  }
  function Zg(r, t, e, i) {
    let n = 0, s = 0, o = !1, a = !1, l = -1e9, u = [];
    for (; ; ) {
      let d = n == r.length ? 1e9 : o ? r[n].to : r[n].from, O = s == t.length ? 1e9 : a ? t[s].to : t[s].from;
      if (o != a) {
        let m = Math.max(l, e), Q = Math.min(d, O, i);
        m < Q && u.push(new ri(m, Q));
      }
      if (l = Math.min(d, O), l == 1e9)
        break;
      d == l && (o ? (o = !1, n++) : o = !0), O == l && (a ? (a = !1, s++) : a = !0);
    }
    return u;
  }
  function Eu(r, t) {
    let e = [];
    for (let { pos: i, mount: n, frag: s } of r) {
      let o = i + (n.overlay ? n.overlay[0].from : 0), a = o + n.tree.length, l = Math.max(s.from, o), u = Math.min(s.to, a);
      if (n.overlay) {
        let d = n.overlay.map((m) => new ri(m.from + i, m.to + i)), O = Zg(t, d, l, u);
        for (let m = 0, Q = l; ; m++) {
          let b = m == O.length, C = b ? u : O[m].from;
          if (C > Q && e.push(new lr(Q, C, n.tree, -o, s.from >= Q, s.to <= C)), b)
            break;
          Q = O[m].to;
        }
      } else
        e.push(new lr(l, u, n.tree, -o, s.from >= o, s.to <= a));
    }
    return e;
  }
  let jg = 0;
  class Ei {
    constructor(t, e, i) {
      this.set = t, this.base = e, this.modified = i, this.id = jg++;
    }
    static define(t) {
      if (t != null && t.base)
        throw new Error("Can not derive from a modified tag");
      let e = new Ei([], null, []);
      if (e.set.push(e), t)
        for (let i of t.set)
          e.set.push(i);
      return e;
    }
    static defineModifier() {
      let t = new vo();
      return (e) => e.modified.indexOf(t) > -1 ? e : vo.get(e.base || e, e.modified.concat(t).sort((i, n) => i.id - n.id));
    }
  }
  let zg = 0;
  class vo {
    constructor() {
      this.instances = [], this.id = zg++;
    }
    static get(t, e) {
      if (!e.length)
        return t;
      let i = e[0].instances.find((a) => a.base == t && Ng(e, a.modified));
      if (i)
        return i;
      let n = [], s = new Ei(n, t, e);
      for (let a of e)
        a.instances.push(s);
      let o = Zu(e);
      for (let a of t.set)
        for (let l of o)
          n.push(vo.get(a, l));
      return s;
    }
  }
  function Ng(r, t) {
    return r.length == t.length && r.every((e, i) => e == t[i]);
  }
  function Zu(r) {
    let t = [r];
    for (let e = 0; e < r.length; e++)
      for (let i of Zu(r.slice(0, e).concat(r.slice(e + 1))))
        t.push(i);
    return t;
  }
  function os(r) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let e in r) {
      let i = r[e];
      Array.isArray(i) || (i = [i]);
      for (let n of e.split(" "))
        if (n) {
          let s = [], o = 2, a = n;
          for (let O = 0; ; ) {
            if (a == "..." && O > 0 && O + 3 == n.length) {
              o = 1;
              break;
            }
            let m = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(a);
            if (!m)
              throw new RangeError("Invalid path: " + n);
            if (s.push(m[0] == "*" ? "" : m[0][0] == '"' ? JSON.parse(m[0]) : m[0]), O += m[0].length, O == n.length)
              break;
            let Q = n[O++];
            if (O == n.length && Q == "!") {
              o = 0;
              break;
            }
            if (Q != "/")
              throw new RangeError("Invalid path: " + n);
            a = n.slice(O);
          }
          let l = s.length - 1, u = s[l];
          if (!u)
            throw new RangeError("Invalid path: " + n);
          let d = new Ig(i, o, l > 0 ? s.slice(0, l) : null);
          t[u] = d.sort(t[u]);
        }
    }
    return ju.add(t);
  }
  const ju = new Ot();
  class Ig {
    constructor(t, e, i, n) {
      this.tags = t, this.mode = e, this.context = i, this.next = n;
    }
    sort(t) {
      return !t || t.depth < this.depth ? (this.next = t, this) : (t.next = this.sort(t.next), t);
    }
    get depth() {
      return this.context ? this.context.length : 0;
    }
  }
  function zu(r, t) {
    let e = /* @__PURE__ */ Object.create(null);
    for (let s of r)
      if (!Array.isArray(s.tag))
        e[s.tag.id] = s.class;
      else
        for (let o of s.tag)
          e[o.id] = s.class;
    let { scope: i, all: n = null } = t || {};
    return {
      style: (s) => {
        let o = n;
        for (let a of s)
          for (let l of a.set) {
            let u = e[l.id];
            if (u) {
              o = o ? o + " " + u : u;
              break;
            }
          }
        return o;
      },
      scope: i
    };
  }
  function Gg(r, t) {
    let e = null;
    for (let i of r) {
      let n = i.style(t);
      n && (e = e ? e + " " + n : n);
    }
    return e;
  }
  function Vg(r, t, e, i = 0, n = r.length) {
    let s = new Lg(i, Array.isArray(t) ? t : [t], e);
    s.highlightRange(r.cursor(), i, n, "", s.highlighters), s.flush(n);
  }
  class Lg {
    constructor(t, e, i) {
      this.at = t, this.highlighters = e, this.span = i, this.class = "";
    }
    startSpan(t, e) {
      e != this.class && (this.flush(t), t > this.at && (this.at = t), this.class = e);
    }
    flush(t) {
      t > this.at && this.class && this.span(this.at, t, this.class);
    }
    highlightRange(t, e, i, n, s) {
      let { type: o, from: a, to: l } = t;
      if (a >= i || l <= e)
        return;
      o.isTop && (s = this.highlighters.filter((Q) => !Q.scope || Q.scope(o)));
      let u = n, d = o.prop(ju), O = !1;
      for (; d; ) {
        if (!d.context || t.matchContext(d.context)) {
          let Q = Gg(s, d.tags);
          Q && (u && (u += " "), u += Q, d.mode == 1 ? n += (n ? " " : "") + Q : d.mode == 0 && (O = !0));
          break;
        }
        d = d.next;
      }
      if (this.startSpan(t.from, u), O)
        return;
      let m = t.tree && t.tree.prop(Ot.mounted);
      if (m && m.overlay) {
        let Q = t.node.enter(m.overlay[0].from + a, 1), b = this.highlighters.filter((A) => !A.scope || A.scope(m.tree.type)), C = t.firstChild();
        for (let A = 0, M = a; ; A++) {
          let U = A < m.overlay.length ? m.overlay[A] : null, Y = U ? U.from + a : l, G = Math.max(e, M), L = Math.min(i, Y);
          if (G < L && C)
            for (; t.from < L && (this.highlightRange(t, G, L, n, s), this.startSpan(Math.min(i, t.to), u), !(t.to >= Y || !t.nextSibling())); )
              ;
          if (!U || Y > i)
            break;
          M = U.to + a, M > e && (this.highlightRange(Q.cursor(), Math.max(e, U.from + a), Math.min(i, M), n, b), this.startSpan(M, u));
        }
        C && t.parent();
      } else if (t.firstChild()) {
        do
          if (!(t.to <= e)) {
            if (t.from >= i)
              break;
            this.highlightRange(t, e, i, n, s), this.startSpan(Math.min(i, t.to), u);
          }
        while (t.nextSibling());
        t.parent();
      }
    }
  }
  const j = Ei.define, Qo = j(), $r = j(), Nu = j($r), Iu = j($r), Tr = j(), yo = j(Tr), Ql = j(Tr), Zi = j(), Kr = j(Zi), ji = j(), zi = j(), yl = j(), as = j(yl), bo = j(), w = {
    comment: Qo,
    lineComment: j(Qo),
    blockComment: j(Qo),
    docComment: j(Qo),
    name: $r,
    variableName: j($r),
    typeName: Nu,
    tagName: j(Nu),
    propertyName: Iu,
    attributeName: j(Iu),
    className: j($r),
    labelName: j($r),
    namespace: j($r),
    macroName: j($r),
    literal: Tr,
    string: yo,
    docString: j(yo),
    character: j(yo),
    attributeValue: j(yo),
    number: Ql,
    integer: j(Ql),
    float: j(Ql),
    bool: j(Tr),
    regexp: j(Tr),
    escape: j(Tr),
    color: j(Tr),
    url: j(Tr),
    keyword: ji,
    self: j(ji),
    null: j(ji),
    atom: j(ji),
    unit: j(ji),
    modifier: j(ji),
    operatorKeyword: j(ji),
    controlKeyword: j(ji),
    definitionKeyword: j(ji),
    moduleKeyword: j(ji),
    operator: zi,
    derefOperator: j(zi),
    arithmeticOperator: j(zi),
    logicOperator: j(zi),
    bitwiseOperator: j(zi),
    compareOperator: j(zi),
    updateOperator: j(zi),
    definitionOperator: j(zi),
    typeOperator: j(zi),
    controlOperator: j(zi),
    punctuation: yl,
    separator: j(yl),
    bracket: as,
    angleBracket: j(as),
    squareBracket: j(as),
    paren: j(as),
    brace: j(as),
    content: Zi,
    heading: Kr,
    heading1: j(Kr),
    heading2: j(Kr),
    heading3: j(Kr),
    heading4: j(Kr),
    heading5: j(Kr),
    heading6: j(Kr),
    contentSeparator: j(Zi),
    list: j(Zi),
    quote: j(Zi),
    emphasis: j(Zi),
    strong: j(Zi),
    link: j(Zi),
    monospace: j(Zi),
    strikethrough: j(Zi),
    inserted: j(),
    deleted: j(),
    changed: j(),
    invalid: j(),
    meta: bo,
    documentMeta: j(bo),
    annotation: j(bo),
    processingInstruction: j(bo),
    definition: Ei.defineModifier(),
    constant: Ei.defineModifier(),
    function: Ei.defineModifier(),
    standard: Ei.defineModifier(),
    local: Ei.defineModifier(),
    special: Ei.defineModifier()
  };
  zu([
    { tag: w.link, class: "tok-link" },
    { tag: w.heading, class: "tok-heading" },
    { tag: w.emphasis, class: "tok-emphasis" },
    { tag: w.strong, class: "tok-strong" },
    { tag: w.keyword, class: "tok-keyword" },
    { tag: w.atom, class: "tok-atom" },
    { tag: w.bool, class: "tok-bool" },
    { tag: w.url, class: "tok-url" },
    { tag: w.labelName, class: "tok-labelName" },
    { tag: w.inserted, class: "tok-inserted" },
    { tag: w.deleted, class: "tok-deleted" },
    { tag: w.literal, class: "tok-literal" },
    { tag: w.string, class: "tok-string" },
    { tag: w.number, class: "tok-number" },
    { tag: [w.regexp, w.escape, w.special(w.string)], class: "tok-string2" },
    { tag: w.variableName, class: "tok-variableName" },
    { tag: w.local(w.variableName), class: "tok-variableName tok-local" },
    { tag: w.definition(w.variableName), class: "tok-variableName tok-definition" },
    { tag: w.special(w.variableName), class: "tok-variableName2" },
    { tag: w.definition(w.propertyName), class: "tok-propertyName tok-definition" },
    { tag: w.typeName, class: "tok-typeName" },
    { tag: w.namespace, class: "tok-namespace" },
    { tag: w.className, class: "tok-className" },
    { tag: w.macroName, class: "tok-macroName" },
    { tag: w.propertyName, class: "tok-propertyName" },
    { tag: w.operator, class: "tok-operator" },
    { tag: w.comment, class: "tok-comment" },
    { tag: w.meta, class: "tok-meta" },
    { tag: w.invalid, class: "tok-invalid" },
    { tag: w.punctuation, class: "tok-punctuation" }
  ]);
  var bl;
  const ls = /* @__PURE__ */ new Ot();
  function Ug(r) {
    return V.define({
      combine: r ? (t) => t.concat(r) : void 0
    });
  }
  class bi {
    constructor(t, e, i = []) {
      this.data = t, ft.prototype.hasOwnProperty("tree") || Object.defineProperty(ft.prototype, "tree", { get() {
        return Lt(this);
      } }), this.parser = e, this.extension = [
        Pr.of(this),
        ft.languageData.of((n, s, o) => n.facet(Gu(n, s, o)))
      ].concat(i);
    }
    isActiveAt(t, e, i = -1) {
      return Gu(t, e, i) == this.data;
    }
    findRegions(t) {
      let e = t.facet(Pr);
      if ((e == null ? void 0 : e.data) == this.data)
        return [{ from: 0, to: t.doc.length }];
      if (!e || !e.allowsNesting)
        return [];
      let i = [], n = (s, o) => {
        if (s.prop(ls) == this.data) {
          i.push({ from: o, to: o + s.length });
          return;
        }
        let a = s.prop(Ot.mounted);
        if (a) {
          if (a.tree.prop(ls) == this.data) {
            if (a.overlay)
              for (let l of a.overlay)
                i.push({ from: l.from + o, to: l.to + o });
            else
              i.push({ from: o, to: o + s.length });
            return;
          } else if (a.overlay) {
            let l = i.length;
            if (n(a.tree, a.overlay[0].from + o), i.length > l)
              return;
          }
        }
        for (let l = 0; l < s.children.length; l++) {
          let u = s.children[l];
          u instanceof It && n(u, s.positions[l] + o);
        }
      };
      return n(Lt(t), 0), i;
    }
    get allowsNesting() {
      return !0;
    }
  }
  bi.setState = /* @__PURE__ */ ct.define();
  function Gu(r, t, e) {
    let i = r.facet(Pr);
    if (!i)
      return null;
    let n = i.data;
    if (i.allowsNesting)
      for (let s = Lt(r).topNode; s; s = s.enter(t, e, Dt.ExcludeBuffers))
        n = s.type.prop(ls) || n;
    return n;
  }
  class tn extends bi {
    constructor(t, e) {
      super(t, e), this.parser = e;
    }
    static define(t) {
      let e = Ug(t.languageData);
      return new tn(e, t.parser.configure({
        props: [ls.add((i) => i.isTop ? e : void 0)]
      }));
    }
    configure(t) {
      return new tn(this.data, this.parser.configure(t));
    }
    get allowsNesting() {
      return this.parser.hasWrappers();
    }
  }
  function Lt(r) {
    let t = r.field(bi.state, !1);
    return t ? t.tree : It.empty;
  }
  class Bg {
    constructor(t, e = t.length) {
      this.doc = t, this.length = e, this.cursorPos = 0, this.string = "", this.cursor = t.iter();
    }
    syncTo(t) {
      return this.string = this.cursor.next(t - this.cursorPos).value, this.cursorPos = t + this.string.length, this.cursorPos - this.string.length;
    }
    chunk(t) {
      return this.syncTo(t), this.string;
    }
    get lineChunks() {
      return !0;
    }
    read(t, e) {
      let i = this.cursorPos - this.string.length;
      return t < i || e >= this.cursorPos ? this.doc.sliceString(t, e) : this.string.slice(t - i, e - i);
    }
  }
  let hs = null;
  class wo {
    constructor(t, e, i = [], n, s, o, a, l) {
      this.parser = t, this.state = e, this.fragments = i, this.tree = n, this.treeLen = s, this.viewport = o, this.skipped = a, this.scheduleOn = l, this.parse = null, this.tempSkipped = [];
    }
    static create(t, e, i) {
      return new wo(t, e, [], It.empty, 0, i, [], null);
    }
    startParse() {
      return this.parser.startParse(new Bg(this.state.doc), this.fragments);
    }
    work(t, e) {
      return e != null && e >= this.state.doc.length && (e = void 0), this.tree != It.empty && this.isDone(e ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
        var i;
        if (typeof t == "number") {
          let n = Date.now() + t;
          t = () => Date.now() > n;
        }
        for (this.parse || (this.parse = this.startParse()), e != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > e) && e < this.state.doc.length && this.parse.stopAt(e); ; ) {
          let n = this.parse.advance();
          if (n)
            if (this.fragments = this.withoutTempSkipped(lr.addTree(n, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (i = this.parse.stoppedAt) !== null && i !== void 0 ? i : this.state.doc.length, this.tree = n, this.parse = null, this.treeLen < (e ?? this.state.doc.length))
              this.parse = this.startParse();
            else
              return !0;
          if (t())
            return !1;
        }
      });
    }
    takeTree() {
      let t, e;
      this.parse && (t = this.parse.parsedPos) >= this.treeLen && ((this.parse.stoppedAt == null || this.parse.stoppedAt > t) && this.parse.stopAt(t), this.withContext(() => {
        for (; !(e = this.parse.advance()); )
          ;
      }), this.treeLen = t, this.tree = e, this.fragments = this.withoutTempSkipped(lr.addTree(this.tree, this.fragments, !0)), this.parse = null);
    }
    withContext(t) {
      let e = hs;
      hs = this;
      try {
        return t();
      } finally {
        hs = e;
      }
    }
    withoutTempSkipped(t) {
      for (let e; e = this.tempSkipped.pop(); )
        t = Vu(t, e.from, e.to);
      return t;
    }
    changes(t, e) {
      let { fragments: i, tree: n, treeLen: s, viewport: o, skipped: a } = this;
      if (this.takeTree(), !t.empty) {
        let l = [];
        if (t.iterChangedRanges((u, d, O, m) => l.push({ fromA: u, toA: d, fromB: O, toB: m })), i = lr.applyChanges(i, l), n = It.empty, s = 0, o = { from: t.mapPos(o.from, -1), to: t.mapPos(o.to, 1) }, this.skipped.length) {
          a = [];
          for (let u of this.skipped) {
            let d = t.mapPos(u.from, 1), O = t.mapPos(u.to, -1);
            d < O && a.push({ from: d, to: O });
          }
        }
      }
      return new wo(this.parser, e, i, n, s, o, a, this.scheduleOn);
    }
    updateViewport(t) {
      if (this.viewport.from == t.from && this.viewport.to == t.to)
        return !1;
      this.viewport = t;
      let e = this.skipped.length;
      for (let i = 0; i < this.skipped.length; i++) {
        let { from: n, to: s } = this.skipped[i];
        n < t.to && s > t.from && (this.fragments = Vu(this.fragments, n, s), this.skipped.splice(i--, 1));
      }
      return this.skipped.length >= e ? !1 : (this.reset(), !0);
    }
    reset() {
      this.parse && (this.takeTree(), this.parse = null);
    }
    skipUntilInView(t, e) {
      this.skipped.push({ from: t, to: e });
    }
    static getSkippingParser(t) {
      return new class extends Wu {
        createParse(e, i, n) {
          let s = n[0].from, o = n[n.length - 1].to;
          return {
            parsedPos: s,
            advance() {
              let a = hs;
              if (a) {
                for (let l of n)
                  a.tempSkipped.push(l);
                t && (a.scheduleOn = a.scheduleOn ? Promise.all([a.scheduleOn, t]) : t);
              }
              return this.parsedPos = o, new It($e.none, [], [], o - s);
            },
            stoppedAt: null,
            stopAt() {
            }
          };
        }
      }();
    }
    isDone(t) {
      t = Math.min(t, this.state.doc.length);
      let e = this.fragments;
      return this.treeLen >= t && e.length && e[0].from == 0 && e[0].to >= t;
    }
    static get() {
      return hs;
    }
  }
  function Vu(r, t, e) {
    return lr.applyChanges(r, [{ fromA: t, toA: e, fromB: t, toB: e }]);
  }
  class wn {
    constructor(t) {
      this.context = t, this.tree = t.tree;
    }
    apply(t) {
      if (!t.docChanged && this.tree == this.context.tree)
        return this;
      let e = this.context.changes(t.changes, t.state), i = this.context.treeLen == t.startState.doc.length ? void 0 : Math.max(t.changes.mapPos(this.context.treeLen), e.viewport.to);
      return e.work(20, i) || e.takeTree(), new wn(e);
    }
    static init(t) {
      let e = Math.min(3e3, t.doc.length), i = wo.create(t.facet(Pr).parser, t, { from: 0, to: e });
      return i.work(20, e) || i.takeTree(), new wn(i);
    }
  }
  bi.state = /* @__PURE__ */ Yt.define({
    create: wn.init,
    update(r, t) {
      for (let e of t.effects)
        if (e.is(bi.setState))
          return e.value;
      return t.startState.facet(Pr) != t.state.facet(Pr) ? wn.init(t.state) : r.apply(t);
    }
  });
  let Lu = (r) => {
    let t = setTimeout(() => r(), 500);
    return () => clearTimeout(t);
  };
  typeof requestIdleCallback < "u" && (Lu = (r) => {
    let t = -1, e = setTimeout(() => {
      t = requestIdleCallback(r, { timeout: 400 });
    }, 100);
    return () => t < 0 ? clearTimeout(e) : cancelIdleCallback(t);
  });
  const wl = typeof navigator < "u" && (!((bl = navigator.scheduling) === null || bl === void 0) && bl.isInputPending) ? () => navigator.scheduling.isInputPending() : null, Yg = /* @__PURE__ */ ye.fromClass(class {
    constructor(r) {
      this.view = r, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
    }
    update(r) {
      let t = this.view.state.field(bi.state).context;
      (t.updateViewport(r.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), r.docChanged && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t);
    }
    scheduleWork() {
      if (this.working)
        return;
      let { state: r } = this.view, t = r.field(bi.state);
      (t.tree != t.context.tree || !t.context.isDone(r.doc.length)) && (this.working = Lu(this.work));
    }
    work(r) {
      this.working = null;
      let t = Date.now();
      if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0)
        return;
      let { state: e, viewport: { to: i } } = this.view, n = e.field(bi.state);
      if (n.tree == n.context.tree && n.context.isDone(i + 1e5))
        return;
      let s = Date.now() + Math.min(this.chunkBudget, 100, r && !wl ? Math.max(25, r.timeRemaining() - 5) : 1e9), o = n.context.treeLen < i && e.doc.length > i + 1e3, a = n.context.work(() => wl && wl() || Date.now() > s, i + (o ? 0 : 1e5));
      this.chunkBudget -= Date.now() - t, (a || this.chunkBudget <= 0) && (n.context.takeTree(), this.view.dispatch({ effects: bi.setState.of(new wn(n.context)) })), this.chunkBudget > 0 && !(a && !o) && this.scheduleWork(), this.checkAsyncSchedule(n.context);
    }
    checkAsyncSchedule(r) {
      r.scheduleOn && (this.workScheduled++, r.scheduleOn.then(() => this.scheduleWork()).catch((t) => yi(this.view.state, t)).then(() => this.workScheduled--), r.scheduleOn = null);
    }
    destroy() {
      this.working && this.working();
    }
    isWorking() {
      return !!(this.working || this.workScheduled > 0);
    }
  }, {
    eventHandlers: { focus() {
      this.scheduleWork();
    } }
  }), Pr = /* @__PURE__ */ V.define({
    combine(r) {
      return r.length ? r[0] : null;
    },
    enables: [bi.state, Yg]
  });
  class xo {
    constructor(t, e = []) {
      this.language = t, this.support = e, this.extension = [t, e];
    }
  }
  const Fg = /* @__PURE__ */ V.define(), cs = /* @__PURE__ */ V.define({
    combine: (r) => {
      if (!r.length)
        return "  ";
      if (!/^(?: +|\t+)$/.test(r[0]))
        throw new Error("Invalid indent unit: " + JSON.stringify(r[0]));
      return r[0];
    }
  });
  function So(r) {
    let t = r.facet(cs);
    return t.charCodeAt(0) == 9 ? r.tabSize * t.length : t.length;
  }
  function us(r, t) {
    let e = "", i = r.tabSize;
    if (r.facet(cs).charCodeAt(0) == 9)
      for (; t >= i; )
        e += "	", t -= i;
    for (let n = 0; n < t; n++)
      e += " ";
    return e;
  }
  function xl(r, t) {
    r instanceof ft && (r = new ko(r));
    for (let i of r.state.facet(Fg)) {
      let n = i(r, t);
      if (n != null)
        return n;
    }
    let e = Lt(r.state);
    return e ? Hg(r, e, t) : null;
  }
  class ko {
    constructor(t, e = {}) {
      this.state = t, this.options = e, this.unit = So(t);
    }
    lineAt(t, e = 1) {
      let i = this.state.doc.lineAt(t), { simulateBreak: n, simulateDoubleBreak: s } = this.options;
      return n != null && n >= i.from && n <= i.to ? s && n == t ? { text: "", from: t } : (e < 0 ? n < t : n <= t) ? { text: i.text.slice(n - i.from), from: n } : { text: i.text.slice(0, n - i.from), from: i.from } : i;
    }
    textAfterPos(t, e = 1) {
      if (this.options.simulateDoubleBreak && t == this.options.simulateBreak)
        return "";
      let { text: i, from: n } = this.lineAt(t, e);
      return i.slice(t - n, Math.min(i.length, t + 100 - n));
    }
    column(t, e = 1) {
      let { text: i, from: n } = this.lineAt(t, e), s = this.countColumn(i, t - n), o = this.options.overrideIndentation ? this.options.overrideIndentation(n) : -1;
      return o > -1 && (s += o - this.countColumn(i, i.search(/\S|$/))), s;
    }
    countColumn(t, e = t.length) {
      return nr(t, this.state.tabSize, e);
    }
    lineIndent(t, e = 1) {
      let { text: i, from: n } = this.lineAt(t, e), s = this.options.overrideIndentation;
      if (s) {
        let o = s(n);
        if (o > -1)
          return o;
      }
      return this.countColumn(i, i.search(/\S|$/));
    }
    get simulatedBreak() {
      return this.options.simulateBreak || null;
    }
  }
  const fs = /* @__PURE__ */ new Ot();
  function Hg(r, t, e) {
    return Uu(t.resolveInner(e).enterUnfinishedNodesBefore(e), e, r);
  }
  function Jg(r) {
    return r.pos == r.options.simulateBreak && r.options.simulateDoubleBreak;
  }
  function Kg(r) {
    let t = r.type.prop(fs);
    if (t)
      return t;
    let e = r.firstChild, i;
    if (e && (i = e.type.prop(Ot.closedBy))) {
      let n = r.lastChild, s = n && i.indexOf(n.name) > -1;
      return (o) => Bu(o, !0, 1, void 0, s && !Jg(o) ? n.from : void 0);
    }
    return r.parent == null ? tv : null;
  }
  function Uu(r, t, e) {
    for (; r; r = r.parent) {
      let i = Kg(r);
      if (i)
        return i(Sl.create(e, t, r));
    }
    return null;
  }
  function tv() {
    return 0;
  }
  class Sl extends ko {
    constructor(t, e, i) {
      super(t.state, t.options), this.base = t, this.pos = e, this.node = i;
    }
    static create(t, e, i) {
      return new Sl(t, e, i);
    }
    get textAfter() {
      return this.textAfterPos(this.pos);
    }
    get baseIndent() {
      let t = this.state.doc.lineAt(this.node.from);
      for (; ; ) {
        let e = this.node.resolve(t.from);
        for (; e.parent && e.parent.from == e.from; )
          e = e.parent;
        if (ev(e, this.node))
          break;
        t = this.state.doc.lineAt(e.from);
      }
      return this.lineIndent(t.from);
    }
    continue() {
      let t = this.node.parent;
      return t ? Uu(t, this.pos, this.base) : 0;
    }
  }
  function ev(r, t) {
    for (let e = t; e; e = e.parent)
      if (r == e)
        return !0;
    return !1;
  }
  function iv(r) {
    let t = r.node, e = t.childAfter(t.from), i = t.lastChild;
    if (!e)
      return null;
    let n = r.options.simulateBreak, s = r.state.doc.lineAt(e.from), o = n == null || n <= s.from ? s.to : Math.min(s.to, n);
    for (let a = e.to; ; ) {
      let l = t.childAfter(a);
      if (!l || l == i)
        return null;
      if (!l.type.isSkipped)
        return l.from < o ? e : null;
      a = l.to;
    }
  }
  function rv({ closing: r, align: t = !0, units: e = 1 }) {
    return (i) => Bu(i, t, e, r);
  }
  function Bu(r, t, e, i, n) {
    let s = r.textAfter, o = s.match(/^\s*/)[0].length, a = i && s.slice(o, o + i.length) == i || n == r.pos + o, l = t ? iv(r) : null;
    return l ? a ? r.column(l.from) : r.column(l.to) : r.baseIndent + (a ? 0 : r.unit * e);
  }
  const nv = (r) => r.baseIndent;
  function xn({ except: r, units: t = 1 } = {}) {
    return (e) => {
      let i = r && r.test(e.textAfter);
      return e.baseIndent + (i ? 0 : t * e.unit);
    };
  }
  const sv = 200;
  function ov() {
    return ft.transactionFilter.of((r) => {
      if (!r.docChanged || !r.isUserEvent("input.type") && !r.isUserEvent("input.complete"))
        return r;
      let t = r.startState.languageDataAt("indentOnInput", r.startState.selection.main.head);
      if (!t.length)
        return r;
      let e = r.newDoc, { head: i } = r.newSelection.main, n = e.lineAt(i);
      if (i > n.from + sv)
        return r;
      let s = e.sliceString(n.from, i);
      if (!t.some((u) => u.test(s)))
        return r;
      let { state: o } = r, a = -1, l = [];
      for (let { head: u } of o.selection.ranges) {
        let d = o.doc.lineAt(u);
        if (d.from == a)
          continue;
        a = d.from;
        let O = xl(o, d.from);
        if (O == null)
          continue;
        let m = /^\s*/.exec(d.text)[0], Q = us(o, O);
        m != Q && l.push({ from: d.from, to: d.from + m.length, insert: Q });
      }
      return l.length ? [r, { changes: l, sequential: !0 }] : r;
    });
  }
  const av = /* @__PURE__ */ V.define(), ds = /* @__PURE__ */ new Ot();
  function kl(r) {
    let t = r.firstChild, e = r.lastChild;
    return t && t.to < e.from ? { from: t.to, to: e.type.isError ? r.to : e.from } : null;
  }
  function lv(r, t, e) {
    let i = Lt(r);
    if (i.length < e)
      return null;
    let n = i.resolveInner(e), s = null;
    for (let o = n; o; o = o.parent) {
      if (o.to <= e || o.from > e)
        continue;
      if (s && o.from < t)
        break;
      let a = o.type.prop(ds);
      if (a && (o.to < i.length - 50 || i.length == r.doc.length || !hv(o))) {
        let l = a(o, r);
        l && l.from <= e && l.from >= t && l.to > e && (s = l);
      }
    }
    return s;
  }
  function hv(r) {
    let t = r.lastChild;
    return t && t.to == r.to && t.type.isError;
  }
  function $o(r, t, e) {
    for (let i of r.facet(av)) {
      let n = i(r, t, e);
      if (n)
        return n;
    }
    return lv(r, t, e);
  }
  function Yu(r, t) {
    let e = t.mapPos(r.from, 1), i = t.mapPos(r.to, -1);
    return e >= i ? void 0 : { from: e, to: i };
  }
  const To = /* @__PURE__ */ ct.define({ map: Yu }), Os = /* @__PURE__ */ ct.define({ map: Yu });
  function Fu(r) {
    let t = [];
    for (let { head: e } of r.state.selection.ranges)
      t.some((i) => i.from <= e && i.to >= e) || t.push(r.lineBlockAt(e));
    return t;
  }
  const en = /* @__PURE__ */ Yt.define({
    create() {
      return it.none;
    },
    update(r, t) {
      r = r.map(t.changes);
      for (let e of t.effects)
        e.is(To) && !cv(r, e.value.from, e.value.to) ? r = r.update({ add: [tf.range(e.value.from, e.value.to)] }) : e.is(Os) && (r = r.update({
          filter: (i, n) => e.value.from != i || e.value.to != n,
          filterFrom: e.value.from,
          filterTo: e.value.to
        }));
      if (t.selection) {
        let e = !1, { head: i } = t.selection.main;
        r.between(i, i, (n, s) => {
          n < i && s > i && (e = !0);
        }), e && (r = r.update({
          filterFrom: i,
          filterTo: i,
          filter: (n, s) => s <= i || n >= i
        }));
      }
      return r;
    },
    provide: (r) => F.decorations.from(r),
    toJSON(r, t) {
      let e = [];
      return r.between(0, t.doc.length, (i, n) => {
        e.push(i, n);
      }), e;
    },
    fromJSON(r) {
      if (!Array.isArray(r) || r.length % 2)
        throw new RangeError("Invalid JSON for fold state");
      let t = [];
      for (let e = 0; e < r.length; ) {
        let i = r[e++], n = r[e++];
        if (typeof i != "number" || typeof n != "number")
          throw new RangeError("Invalid JSON for fold state");
        t.push(tf.range(i, n));
      }
      return it.set(t, !0);
    }
  });
  function Po(r, t, e) {
    var i;
    let n = null;
    return (i = r.field(en, !1)) === null || i === void 0 || i.between(t, e, (s, o) => {
      (!n || n.from > s) && (n = { from: s, to: o });
    }), n;
  }
  function cv(r, t, e) {
    let i = !1;
    return r.between(t, t, (n, s) => {
      n == t && s == e && (i = !0);
    }), i;
  }
  function Hu(r, t) {
    return r.field(en, !1) ? t : t.concat(ct.appendConfig.of(Ku()));
  }
  const uv = (r) => {
    for (let t of Fu(r)) {
      let e = $o(r.state, t.from, t.to);
      if (e)
        return r.dispatch({ effects: Hu(r.state, [To.of(e), Ju(r, e)]) }), !0;
    }
    return !1;
  }, fv = (r) => {
    if (!r.state.field(en, !1))
      return !1;
    let t = [];
    for (let e of Fu(r)) {
      let i = Po(r.state, e.from, e.to);
      i && t.push(Os.of(i), Ju(r, i, !1));
    }
    return t.length && r.dispatch({ effects: t }), t.length > 0;
  };
  function Ju(r, t, e = !0) {
    let i = r.state.doc.lineAt(t.from).number, n = r.state.doc.lineAt(t.to).number;
    return F.announce.of(`${r.state.phrase(e ? "Folded lines" : "Unfolded lines")} ${i} ${r.state.phrase("to")} ${n}.`);
  }
  const dv = (r) => {
    let { state: t } = r, e = [];
    for (let i = 0; i < t.doc.length; ) {
      let n = r.lineBlockAt(i), s = $o(t, n.from, n.to);
      s && e.push(To.of(s)), i = (s ? r.lineBlockAt(s.to) : n).to + 1;
    }
    return e.length && r.dispatch({ effects: Hu(r.state, e) }), !!e.length;
  }, Ov = (r) => {
    let t = r.state.field(en, !1);
    if (!t || !t.size)
      return !1;
    let e = [];
    return t.between(0, r.state.doc.length, (i, n) => {
      e.push(Os.of({ from: i, to: n }));
    }), r.dispatch({ effects: e }), !0;
  }, pv = [
    { key: "Ctrl-Shift-[", mac: "Cmd-Alt-[", run: uv },
    { key: "Ctrl-Shift-]", mac: "Cmd-Alt-]", run: fv },
    { key: "Ctrl-Alt-[", run: dv },
    { key: "Ctrl-Alt-]", run: Ov }
  ], mv = {
    placeholderDOM: null,
    placeholderText: "…"
  }, gv = /* @__PURE__ */ V.define({
    combine(r) {
      return pi(r, mv);
    }
  });
  function Ku(r) {
    return [en, yv];
  }
  const tf = /* @__PURE__ */ it.replace({ widget: /* @__PURE__ */ new class extends wr {
    toDOM(r) {
      let { state: t } = r, e = t.facet(gv), i = (s) => {
        let o = r.lineBlockAt(r.posAtDOM(s.target)), a = Po(r.state, o.from, o.to);
        a && r.dispatch({ effects: Os.of(a) }), s.preventDefault();
      };
      if (e.placeholderDOM)
        return e.placeholderDOM(r, i);
      let n = document.createElement("span");
      return n.textContent = e.placeholderText, n.setAttribute("aria-label", t.phrase("folded code")), n.title = t.phrase("unfold"), n.className = "cm-foldPlaceholder", n.onclick = i, n;
    }
  }() }), vv = {
    openText: "⌄",
    closedText: "›",
    markerDOM: null,
    domEventHandlers: {},
    foldingChanged: () => !1
  };
  class $l extends ar {
    constructor(t, e) {
      super(), this.config = t, this.open = e;
    }
    eq(t) {
      return this.config == t.config && this.open == t.open;
    }
    toDOM(t) {
      if (this.config.markerDOM)
        return this.config.markerDOM(this.open);
      let e = document.createElement("span");
      return e.textContent = this.open ? this.config.openText : this.config.closedText, e.title = t.state.phrase(this.open ? "Fold line" : "Unfold line"), e;
    }
  }
  function Qv(r = {}) {
    let t = Object.assign(Object.assign({}, vv), r), e = new $l(t, !0), i = new $l(t, !1), n = ye.fromClass(class {
      constructor(o) {
        this.from = o.viewport.from, this.markers = this.buildMarkers(o);
      }
      update(o) {
        (o.docChanged || o.viewportChanged || o.startState.facet(Pr) != o.state.facet(Pr) || o.startState.field(en, !1) != o.state.field(en, !1) || Lt(o.startState) != Lt(o.state) || t.foldingChanged(o)) && (this.markers = this.buildMarkers(o.view));
      }
      buildMarkers(o) {
        let a = new se();
        for (let l of o.viewportLineBlocks) {
          let u = Po(o.state, l.from, l.to) ? i : $o(o.state, l.from, l.to) ? e : null;
          u && a.add(l.from, l.from, u);
        }
        return a.finish();
      }
    }), { domEventHandlers: s } = t;
    return [
      n,
      mg({
        class: "cm-foldGutter",
        markers(o) {
          var a;
          return ((a = o.plugin(n)) === null || a === void 0 ? void 0 : a.markers) || rt.empty;
        },
        initialSpacer() {
          return new $l(t, !1);
        },
        domEventHandlers: Object.assign(Object.assign({}, s), { click: (o, a, l) => {
          if (s.click && s.click(o, a, l))
            return !0;
          let u = Po(o.state, a.from, a.to);
          if (u)
            return o.dispatch({ effects: Os.of(u) }), !0;
          let d = $o(o.state, a.from, a.to);
          return d ? (o.dispatch({ effects: To.of(d) }), !0) : !1;
        } })
      }),
      Ku()
    ];
  }
  const yv = /* @__PURE__ */ F.baseTheme({
    ".cm-foldPlaceholder": {
      backgroundColor: "#eee",
      border: "1px solid #ddd",
      color: "#888",
      borderRadius: ".2em",
      margin: "0 1px",
      padding: "0 1px",
      cursor: "pointer"
    },
    ".cm-foldGutter span": {
      padding: "0 1px",
      cursor: "pointer"
    }
  });
  class Ro {
    constructor(t, e) {
      let i;
      function n(a) {
        let l = he.newName();
        return (i || (i = /* @__PURE__ */ Object.create(null)))["." + l] = a, l;
      }
      const s = typeof e.all == "string" ? e.all : e.all ? n(e.all) : void 0, o = e.scope;
      this.scope = o instanceof bi ? (a) => a.prop(ls) == o.data : o ? (a) => a == o : void 0, this.style = zu(t.map((a) => ({
        tag: a.tag,
        class: a.class || n(Object.assign({}, a, { tag: null }))
      })), {
        all: s
      }).style, this.module = i ? new he(i) : null, this.themeType = e.themeType;
    }
    static define(t, e) {
      return new Ro(t, e || {});
    }
  }
  const Tl = /* @__PURE__ */ V.define(), ef = /* @__PURE__ */ V.define({
    combine(r) {
      return r.length ? [r[0]] : null;
    }
  });
  function Pl(r) {
    let t = r.facet(Tl);
    return t.length ? t : r.facet(ef);
  }
  function bv(r, t) {
    let e = [xv], i;
    return r instanceof Ro && (r.module && e.push(F.styleModule.of(r.module)), i = r.themeType), t != null && t.fallback ? e.push(ef.of(r)) : i ? e.push(Tl.computeN([F.darkTheme], (n) => n.facet(F.darkTheme) == (i == "dark") ? [r] : [])) : e.push(Tl.of(r)), e;
  }
  class wv {
    constructor(t) {
      this.markCache = /* @__PURE__ */ Object.create(null), this.tree = Lt(t.state), this.decorations = this.buildDeco(t, Pl(t.state));
    }
    update(t) {
      let e = Lt(t.state), i = Pl(t.state), n = i != Pl(t.startState);
      e.length < t.view.viewport.to && !n && e.type == this.tree.type ? this.decorations = this.decorations.map(t.changes) : (e != this.tree || t.viewportChanged || n) && (this.tree = e, this.decorations = this.buildDeco(t.view, i));
    }
    buildDeco(t, e) {
      if (!e || !this.tree.length)
        return it.none;
      let i = new se();
      for (let { from: n, to: s } of t.visibleRanges)
        Vg(this.tree, e, (o, a, l) => {
          i.add(o, a, this.markCache[l] || (this.markCache[l] = it.mark({ class: l })));
        }, n, s);
      return i.finish();
    }
  }
  const xv = /* @__PURE__ */ er.high(/* @__PURE__ */ ye.fromClass(wv, {
    decorations: (r) => r.decorations
  })), Sv = /* @__PURE__ */ Ro.define([
    {
      tag: w.meta,
      color: "#7a757a"
    },
    {
      tag: w.link,
      textDecoration: "underline"
    },
    {
      tag: w.heading,
      textDecoration: "underline",
      fontWeight: "bold"
    },
    {
      tag: w.emphasis,
      fontStyle: "italic"
    },
    {
      tag: w.strong,
      fontWeight: "bold"
    },
    {
      tag: w.strikethrough,
      textDecoration: "line-through"
    },
    {
      tag: w.keyword,
      color: "#708"
    },
    {
      tag: [w.atom, w.bool, w.url, w.contentSeparator, w.labelName],
      color: "#219"
    },
    {
      tag: [w.literal, w.inserted],
      color: "#164"
    },
    {
      tag: [w.string, w.deleted],
      color: "#a11"
    },
    {
      tag: [w.regexp, w.escape, /* @__PURE__ */ w.special(w.string)],
      color: "#e40"
    },
    {
      tag: /* @__PURE__ */ w.definition(w.variableName),
      color: "#00f"
    },
    {
      tag: /* @__PURE__ */ w.local(w.variableName),
      color: "#30a"
    },
    {
      tag: [w.typeName, w.namespace],
      color: "#085"
    },
    {
      tag: w.className,
      color: "#167"
    },
    {
      tag: [/* @__PURE__ */ w.special(w.variableName), w.macroName],
      color: "#256"
    },
    {
      tag: /* @__PURE__ */ w.definition(w.propertyName),
      color: "#00c"
    },
    {
      tag: w.comment,
      color: "#940"
    },
    {
      tag: w.invalid,
      color: "#f00"
    }
  ]), kv = /* @__PURE__ */ F.baseTheme({
    "&.cm-focused .cm-matchingBracket": { backgroundColor: "#328c8252" },
    "&.cm-focused .cm-nonmatchingBracket": { backgroundColor: "#bb555544" }
  }), rf = 1e4, nf = "()[]{}", sf = /* @__PURE__ */ V.define({
    combine(r) {
      return pi(r, {
        afterCursor: !0,
        brackets: nf,
        maxScanDistance: rf,
        renderMatch: Pv
      });
    }
  }), $v = /* @__PURE__ */ it.mark({ class: "cm-matchingBracket" }), Tv = /* @__PURE__ */ it.mark({ class: "cm-nonmatchingBracket" });
  function Pv(r) {
    let t = [], e = r.matched ? $v : Tv;
    return t.push(e.range(r.start.from, r.start.to)), r.end && t.push(e.range(r.end.from, r.end.to)), t;
  }
  const Rv = /* @__PURE__ */ Yt.define({
    create() {
      return it.none;
    },
    update(r, t) {
      if (!t.docChanged && !t.selection)
        return r;
      let e = [], i = t.state.facet(sf);
      for (let n of t.state.selection.ranges) {
        if (!n.empty)
          continue;
        let s = Ni(t.state, n.head, -1, i) || n.head > 0 && Ni(t.state, n.head - 1, 1, i) || i.afterCursor && (Ni(t.state, n.head, 1, i) || n.head < t.state.doc.length && Ni(t.state, n.head + 1, -1, i));
        s && (e = e.concat(i.renderMatch(s, t.state)));
      }
      return it.set(e, !0);
    },
    provide: (r) => F.decorations.from(r)
  }), Cv = [
    Rv,
    kv
  ];
  function _v(r = {}) {
    return [sf.of(r), Cv];
  }
  function Rl(r, t, e) {
    let i = r.prop(t < 0 ? Ot.openedBy : Ot.closedBy);
    if (i)
      return i;
    if (r.name.length == 1) {
      let n = e.indexOf(r.name);
      if (n > -1 && n % 2 == (t < 0 ? 1 : 0))
        return [e[n + t]];
    }
    return null;
  }
  function Ni(r, t, e, i = {}) {
    let n = i.maxScanDistance || rf, s = i.brackets || nf, o = Lt(r), a = o.resolveInner(t, e);
    for (let l = a; l; l = l.parent) {
      let u = Rl(l.type, e, s);
      if (u && l.from < l.to)
        return Av(r, t, e, l, u, s);
    }
    return Wv(r, t, e, o, a.type, n, s);
  }
  function Av(r, t, e, i, n, s) {
    let o = i.parent, a = { from: i.from, to: i.to }, l = 0, u = o == null ? void 0 : o.cursor();
    if (u && (e < 0 ? u.childBefore(i.from) : u.childAfter(i.to)))
      do
        if (e < 0 ? u.to <= i.from : u.from >= i.to) {
          if (l == 0 && n.indexOf(u.type.name) > -1 && u.from < u.to)
            return { start: a, end: { from: u.from, to: u.to }, matched: !0 };
          if (Rl(u.type, e, s))
            l++;
          else if (Rl(u.type, -e, s)) {
            if (l == 0)
              return {
                start: a,
                end: u.from == u.to ? void 0 : { from: u.from, to: u.to },
                matched: !1
              };
            l--;
          }
        }
      while (e < 0 ? u.prevSibling() : u.nextSibling());
    return { start: a, matched: !1 };
  }
  function Wv(r, t, e, i, n, s, o) {
    let a = e < 0 ? r.sliceDoc(t - 1, t) : r.sliceDoc(t, t + 1), l = o.indexOf(a);
    if (l < 0 || l % 2 == 0 != e > 0)
      return null;
    let u = { from: e < 0 ? t - 1 : t, to: e > 0 ? t + 1 : t }, d = r.doc.iterRange(t, e > 0 ? r.doc.length : 0), O = 0;
    for (let m = 0; !d.next().done && m <= s; ) {
      let Q = d.value;
      e < 0 && (m += Q.length);
      let b = t + m * e;
      for (let C = e > 0 ? 0 : Q.length - 1, A = e > 0 ? Q.length : -1; C != A; C += e) {
        let M = o.indexOf(Q[C]);
        if (!(M < 0 || i.resolveInner(b + C, 1).type != n))
          if (M % 2 == 0 == e > 0)
            O++;
          else {
            if (O == 1)
              return { start: u, end: { from: b + C, to: b + C + 1 }, matched: M >> 1 == l >> 1 };
            O--;
          }
      }
      e > 0 && (m += Q.length);
    }
    return d.done ? { start: u, matched: !1 } : null;
  }
  const Xv = /* @__PURE__ */ Object.create(null), of = [$e.none], af = [], qv = /* @__PURE__ */ Object.create(null);
  for (let [r, t] of [
    ["variable", "variableName"],
    ["variable-2", "variableName.special"],
    ["string-2", "string.special"],
    ["def", "variableName.definition"],
    ["tag", "tagName"],
    ["attribute", "attributeName"],
    ["type", "typeName"],
    ["builtin", "variableName.standard"],
    ["qualifier", "modifier"],
    ["error", "invalid"],
    ["header", "heading"],
    ["property", "propertyName"]
  ])
    qv[r] = /* @__PURE__ */ Mv(Xv, t);
  function Cl(r, t) {
    af.indexOf(r) > -1 || (af.push(r), console.warn(t));
  }
  function Mv(r, t) {
    let e = null;
    for (let s of t.split(".")) {
      let o = r[s] || w[s];
      o ? typeof o == "function" ? e ? e = o(e) : Cl(s, `Modifier ${s} used at start of tag`) : e ? Cl(s, `Tag ${s} used as modifier`) : e = o : Cl(s, `Unknown highlighting tag ${s}`);
    }
    if (!e)
      return 0;
    let i = t.replace(/ /g, "_"), n = $e.define({
      id: of.length,
      name: i,
      props: [os({ [i]: e })]
    });
    return of.push(n), n.id;
  }
  const Dv = (r) => {
    let t = Al(r.state);
    return t.line ? Ev(r) : t.block ? jv(r) : !1;
  };
  function _l(r, t) {
    return ({ state: e, dispatch: i }) => {
      if (e.readOnly)
        return !1;
      let n = r(t, e);
      return n ? (i(e.update(n)), !0) : !1;
    };
  }
  const Ev = /* @__PURE__ */ _l(Iv, 0), Zv = /* @__PURE__ */ _l(lf, 0), jv = /* @__PURE__ */ _l((r, t) => lf(r, t, Nv(t)), 0);
  function Al(r, t = r.selection.main.head) {
    let e = r.languageDataAt("commentTokens", t);
    return e.length ? e[0] : {};
  }
  const ps = 50;
  function zv(r, { open: t, close: e }, i, n) {
    let s = r.sliceDoc(i - ps, i), o = r.sliceDoc(n, n + ps), a = /\s*$/.exec(s)[0].length, l = /^\s*/.exec(o)[0].length, u = s.length - a;
    if (s.slice(u - t.length, u) == t && o.slice(l, l + e.length) == e)
      return {
        open: { pos: i - a, margin: a && 1 },
        close: { pos: n + l, margin: l && 1 }
      };
    let d, O;
    n - i <= 2 * ps ? d = O = r.sliceDoc(i, n) : (d = r.sliceDoc(i, i + ps), O = r.sliceDoc(n - ps, n));
    let m = /^\s*/.exec(d)[0].length, Q = /\s*$/.exec(O)[0].length, b = O.length - Q - e.length;
    return d.slice(m, m + t.length) == t && O.slice(b, b + e.length) == e ? {
      open: {
        pos: i + m + t.length,
        margin: /\s/.test(d.charAt(m + t.length)) ? 1 : 0
      },
      close: {
        pos: n - Q - e.length,
        margin: /\s/.test(O.charAt(b - 1)) ? 1 : 0
      }
    } : null;
  }
  function Nv(r) {
    let t = [];
    for (let e of r.selection.ranges) {
      let i = r.doc.lineAt(e.from), n = e.to <= i.to ? i : r.doc.lineAt(e.to), s = t.length - 1;
      s >= 0 && t[s].to > i.from ? t[s].to = n.to : t.push({ from: i.from, to: n.to });
    }
    return t;
  }
  function lf(r, t, e = t.selection.ranges) {
    let i = e.map((s) => Al(t, s.from).block);
    if (!i.every((s) => s))
      return null;
    let n = e.map((s, o) => zv(t, i[o], s.from, s.to));
    if (r != 2 && !n.every((s) => s))
      return { changes: t.changes(e.map((s, o) => n[o] ? [] : [{ from: s.from, insert: i[o].open + " " }, { from: s.to, insert: " " + i[o].close }])) };
    if (r != 1 && n.some((s) => s)) {
      let s = [];
      for (let o = 0, a; o < n.length; o++)
        if (a = n[o]) {
          let l = i[o], { open: u, close: d } = a;
          s.push({ from: u.pos - l.open.length, to: u.pos + u.margin }, { from: d.pos - d.margin, to: d.pos + l.close.length });
        }
      return { changes: s };
    }
    return null;
  }
  function Iv(r, t, e = t.selection.ranges) {
    let i = [], n = -1;
    for (let { from: s, to: o } of e) {
      let a = i.length, l = 1e9;
      for (let u = s; u <= o; ) {
        let d = t.doc.lineAt(u);
        if (d.from > n && (s == o || o > d.from)) {
          n = d.from;
          let O = Al(t, u).line;
          if (!O)
            continue;
          let m = /^\s*/.exec(d.text)[0].length, Q = m == d.length, b = d.text.slice(m, m + O.length) == O ? m : -1;
          m < d.text.length && m < l && (l = m), i.push({ line: d, comment: b, token: O, indent: m, empty: Q, single: !1 });
        }
        u = d.to + 1;
      }
      if (l < 1e9)
        for (let u = a; u < i.length; u++)
          i[u].indent < i[u].line.text.length && (i[u].indent = l);
      i.length == a + 1 && (i[a].single = !0);
    }
    if (r != 2 && i.some((s) => s.comment < 0 && (!s.empty || s.single))) {
      let s = [];
      for (let { line: a, token: l, indent: u, empty: d, single: O } of i)
        (O || !d) && s.push({ from: a.from + u, insert: l + " " });
      let o = t.changes(s);
      return { changes: o, selection: t.selection.map(o, 1) };
    } else if (r != 1 && i.some((s) => s.comment >= 0)) {
      let s = [];
      for (let { line: o, comment: a, token: l } of i)
        if (a >= 0) {
          let u = o.from + a, d = u + l.length;
          o.text[d - o.from] == " " && d++, s.push({ from: u, to: d });
        }
      return { changes: s };
    }
    return null;
  }
  const Wl = /* @__PURE__ */ rr.define(), Gv = /* @__PURE__ */ rr.define(), Vv = /* @__PURE__ */ V.define(), hf = /* @__PURE__ */ V.define({
    combine(r) {
      return pi(r, {
        minDepth: 100,
        newGroupDelay: 500
      }, { minDepth: Math.max, newGroupDelay: Math.min });
    }
  });
  function Lv(r) {
    let t = 0;
    return r.iterChangedRanges((e, i) => t = i), t;
  }
  const cf = /* @__PURE__ */ Yt.define({
    create() {
      return Ii.empty;
    },
    update(r, t) {
      let e = t.state.facet(hf), i = t.annotation(Wl);
      if (i) {
        let l = t.docChanged ? _.single(Lv(t.changes)) : void 0, u = Ae.fromTransaction(t, l), d = i.side, O = d == 0 ? r.undone : r.done;
        return u ? O = _o(O, O.length, e.minDepth, u) : O = df(O, t.startState.selection), new Ii(d == 0 ? i.rest : O, d == 0 ? O : i.rest);
      }
      let n = t.annotation(Gv);
      if ((n == "full" || n == "before") && (r = r.isolate()), t.annotation(Gt.addToHistory) === !1)
        return t.changes.empty ? r : r.addMapping(t.changes.desc);
      let s = Ae.fromTransaction(t), o = t.annotation(Gt.time), a = t.annotation(Gt.userEvent);
      return s ? r = r.addChanges(s, o, a, e.newGroupDelay, e.minDepth) : t.selection && (r = r.addSelection(t.startState.selection, o, a, e.newGroupDelay)), (n == "full" || n == "after") && (r = r.isolate()), r;
    },
    toJSON(r) {
      return { done: r.done.map((t) => t.toJSON()), undone: r.undone.map((t) => t.toJSON()) };
    },
    fromJSON(r) {
      return new Ii(r.done.map(Ae.fromJSON), r.undone.map(Ae.fromJSON));
    }
  });
  function Uv(r = {}) {
    return [
      cf,
      hf.of(r),
      F.domEventHandlers({
        beforeinput(t, e) {
          let i = t.inputType == "historyUndo" ? uf : t.inputType == "historyRedo" ? Xl : null;
          return i ? (t.preventDefault(), i(e)) : !1;
        }
      })
    ];
  }
  function Co(r, t) {
    return function({ state: e, dispatch: i }) {
      if (!t && e.readOnly)
        return !1;
      let n = e.field(cf, !1);
      if (!n)
        return !1;
      let s = n.pop(r, e, t);
      return s ? (i(s), !0) : !1;
    };
  }
  const uf = /* @__PURE__ */ Co(0, !1), Xl = /* @__PURE__ */ Co(1, !1), Bv = /* @__PURE__ */ Co(0, !0), Yv = /* @__PURE__ */ Co(1, !0);
  class Ae {
    constructor(t, e, i, n, s) {
      this.changes = t, this.effects = e, this.mapped = i, this.startSelection = n, this.selectionsAfter = s;
    }
    setSelAfter(t) {
      return new Ae(this.changes, this.effects, this.mapped, this.startSelection, t);
    }
    toJSON() {
      var t, e, i;
      return {
        changes: (t = this.changes) === null || t === void 0 ? void 0 : t.toJSON(),
        mapped: (e = this.mapped) === null || e === void 0 ? void 0 : e.toJSON(),
        startSelection: (i = this.startSelection) === null || i === void 0 ? void 0 : i.toJSON(),
        selectionsAfter: this.selectionsAfter.map((n) => n.toJSON())
      };
    }
    static fromJSON(t) {
      return new Ae(t.changes && xt.fromJSON(t.changes), [], t.mapped && Pt.fromJSON(t.mapped), t.startSelection && _.fromJSON(t.startSelection), t.selectionsAfter.map(_.fromJSON));
    }
    static fromTransaction(t, e) {
      let i = si;
      for (let n of t.startState.facet(Vv)) {
        let s = n(t);
        s.length && (i = i.concat(s));
      }
      return !i.length && t.changes.empty ? null : new Ae(t.changes.invert(t.startState.doc), i, void 0, e || t.startState.selection, si);
    }
    static selection(t) {
      return new Ae(void 0, si, void 0, void 0, t);
    }
  }
  function _o(r, t, e, i) {
    let n = t + 1 > e + 20 ? t - e - 1 : 0, s = r.slice(n, t);
    return s.push(i), s;
  }
  function Fv(r, t) {
    let e = [], i = !1;
    return r.iterChangedRanges((n, s) => e.push(n, s)), t.iterChangedRanges((n, s, o, a) => {
      for (let l = 0; l < e.length; ) {
        let u = e[l++], d = e[l++];
        a >= u && o <= d && (i = !0);
      }
    }), i;
  }
  function Hv(r, t) {
    return r.ranges.length == t.ranges.length && r.ranges.filter((e, i) => e.empty != t.ranges[i].empty).length === 0;
  }
  function ff(r, t) {
    return r.length ? t.length ? r.concat(t) : r : t;
  }
  const si = [], Jv = 200;
  function df(r, t) {
    if (r.length) {
      let e = r[r.length - 1], i = e.selectionsAfter.slice(Math.max(0, e.selectionsAfter.length - Jv));
      return i.length && i[i.length - 1].eq(t) ? r : (i.push(t), _o(r, r.length - 1, 1e9, e.setSelAfter(i)));
    } else
      return [Ae.selection([t])];
  }
  function Kv(r) {
    let t = r[r.length - 1], e = r.slice();
    return e[r.length - 1] = t.setSelAfter(t.selectionsAfter.slice(0, t.selectionsAfter.length - 1)), e;
  }
  function ql(r, t) {
    if (!r.length)
      return r;
    let e = r.length, i = si;
    for (; e; ) {
      let n = tQ(r[e - 1], t, i);
      if (n.changes && !n.changes.empty || n.effects.length) {
        let s = r.slice(0, e);
        return s[e - 1] = n, s;
      } else
        t = n.mapped, e--, i = n.selectionsAfter;
    }
    return i.length ? [Ae.selection(i)] : si;
  }
  function tQ(r, t, e) {
    let i = ff(r.selectionsAfter.length ? r.selectionsAfter.map((a) => a.map(t)) : si, e);
    if (!r.changes)
      return Ae.selection(i);
    let n = r.changes.map(t), s = t.mapDesc(r.changes, !0), o = r.mapped ? r.mapped.composeDesc(s) : s;
    return new Ae(n, ct.mapEffects(r.effects, t), o, r.startSelection.map(s), i);
  }
  const eQ = /^(input\.type|delete)($|\.)/;
  class Ii {
    constructor(t, e, i = 0, n = void 0) {
      this.done = t, this.undone = e, this.prevTime = i, this.prevUserEvent = n;
    }
    isolate() {
      return this.prevTime ? new Ii(this.done, this.undone) : this;
    }
    addChanges(t, e, i, n, s) {
      let o = this.done, a = o[o.length - 1];
      return a && a.changes && !a.changes.empty && t.changes && (!i || eQ.test(i)) && (!a.selectionsAfter.length && e - this.prevTime < n && Fv(a.changes, t.changes) || i == "input.type.compose") ? o = _o(o, o.length - 1, s, new Ae(t.changes.compose(a.changes), ff(t.effects, a.effects), a.mapped, a.startSelection, si)) : o = _o(o, o.length, s, t), new Ii(o, si, e, i);
    }
    addSelection(t, e, i, n) {
      let s = this.done.length ? this.done[this.done.length - 1].selectionsAfter : si;
      return s.length > 0 && e - this.prevTime < n && i == this.prevUserEvent && i && /^select($|\.)/.test(i) && Hv(s[s.length - 1], t) ? this : new Ii(df(this.done, t), this.undone, e, i);
    }
    addMapping(t) {
      return new Ii(ql(this.done, t), ql(this.undone, t), this.prevTime, this.prevUserEvent);
    }
    pop(t, e, i) {
      let n = t == 0 ? this.done : this.undone;
      if (n.length == 0)
        return null;
      let s = n[n.length - 1];
      if (i && s.selectionsAfter.length)
        return e.update({
          selection: s.selectionsAfter[s.selectionsAfter.length - 1],
          annotations: Wl.of({ side: t, rest: Kv(n) }),
          userEvent: t == 0 ? "select.undo" : "select.redo",
          scrollIntoView: !0
        });
      if (s.changes) {
        let o = n.length == 1 ? si : n.slice(0, n.length - 1);
        return s.mapped && (o = ql(o, s.mapped)), e.update({
          changes: s.changes,
          selection: s.startSelection,
          effects: s.effects,
          annotations: Wl.of({ side: t, rest: o }),
          filter: !1,
          userEvent: t == 0 ? "undo" : "redo",
          scrollIntoView: !0
        });
      } else
        return null;
    }
  }
  Ii.empty = /* @__PURE__ */ new Ii(si, si);
  const iQ = [
    { key: "Mod-z", run: uf, preventDefault: !0 },
    { key: "Mod-y", mac: "Mod-Shift-z", run: Xl, preventDefault: !0 },
    { linux: "Ctrl-Shift-z", run: Xl, preventDefault: !0 },
    { key: "Mod-u", run: Bv, preventDefault: !0 },
    { key: "Alt-u", mac: "Mod-Shift-u", run: Yv, preventDefault: !0 }
  ];
  function Sn(r, t) {
    return _.create(r.ranges.map(t), r.mainIndex);
  }
  function Gi(r, t) {
    return r.update({ selection: t, scrollIntoView: !0, userEvent: "select" });
  }
  function hr({ state: r, dispatch: t }, e) {
    let i = Sn(r.selection, e);
    return i.eq(r.selection) ? !1 : (t(Gi(r, i)), !0);
  }
  function Ao(r, t) {
    return _.cursor(t ? r.to : r.from);
  }
  function Of(r, t) {
    return hr(r, (e) => e.empty ? r.moveByChar(e, t) : Ao(e, t));
  }
  function oi(r) {
    return r.textDirectionAt(r.state.selection.main.head) == Vt.LTR;
  }
  const pf = (r) => Of(r, !oi(r)), mf = (r) => Of(r, oi(r));
  function gf(r, t) {
    return hr(r, (e) => e.empty ? r.moveByGroup(e, t) : Ao(e, t));
  }
  const rQ = (r) => gf(r, !oi(r)), nQ = (r) => gf(r, oi(r));
  function sQ(r, t, e) {
    if (t.type.prop(e))
      return !0;
    let i = t.to - t.from;
    return i && (i > 2 || /[^\s,.;:]/.test(r.sliceDoc(t.from, t.to))) || t.firstChild;
  }
  function Wo(r, t, e) {
    let i = Lt(r).resolveInner(t.head), n = e ? Ot.closedBy : Ot.openedBy;
    for (let l = t.head; ; ) {
      let u = e ? i.childAfter(l) : i.childBefore(l);
      if (!u)
        break;
      sQ(r, u, n) ? i = u : l = e ? u.to : u.from;
    }
    let s = i.type.prop(n), o, a;
    return s && (o = e ? Ni(r, i.from, 1) : Ni(r, i.to, -1)) && o.matched ? a = e ? o.end.to : o.end.from : a = e ? i.to : i.from, _.cursor(a, e ? -1 : 1);
  }
  const oQ = (r) => hr(r, (t) => Wo(r.state, t, !oi(r))), aQ = (r) => hr(r, (t) => Wo(r.state, t, oi(r)));
  function vf(r, t) {
    return hr(r, (e) => {
      if (!e.empty)
        return Ao(e, t);
      let i = r.moveVertically(e, t);
      return i.head != e.head ? i : r.moveToLineBoundary(e, t);
    });
  }
  const Qf = (r) => vf(r, !1), yf = (r) => vf(r, !0);
  function bf(r) {
    return Math.max(r.defaultLineHeight, Math.min(r.dom.clientHeight, innerHeight) - 5);
  }
  function wf(r, t) {
    let { state: e } = r, i = Sn(e.selection, (a) => a.empty ? r.moveVertically(a, t, bf(r)) : Ao(a, t));
    if (i.eq(e.selection))
      return !1;
    let n = r.coordsAtPos(e.selection.main.head), s = r.scrollDOM.getBoundingClientRect(), o;
    return n && n.top > s.top && n.bottom < s.bottom && n.top - s.top <= r.scrollDOM.scrollHeight - r.scrollDOM.scrollTop - r.scrollDOM.clientHeight && (o = F.scrollIntoView(i.main.head, { y: "start", yMargin: n.top - s.top })), r.dispatch(Gi(e, i), { effects: o }), !0;
  }
  const xf = (r) => wf(r, !1), Ml = (r) => wf(r, !0);
  function Xo(r, t, e) {
    let i = r.lineBlockAt(t.head), n = r.moveToLineBoundary(t, e);
    if (n.head == t.head && n.head != (e ? i.to : i.from) && (n = r.moveToLineBoundary(t, e, !1)), !e && n.head == i.from && i.length) {
      let s = /^\s*/.exec(r.state.sliceDoc(i.from, Math.min(i.from + 100, i.to)))[0].length;
      s && t.head != i.from + s && (n = _.cursor(i.from + s));
    }
    return n;
  }
  const Sf = (r) => hr(r, (t) => Xo(r, t, !0)), kf = (r) => hr(r, (t) => Xo(r, t, !1)), lQ = (r) => hr(r, (t) => _.cursor(r.lineBlockAt(t.head).from, 1)), hQ = (r) => hr(r, (t) => _.cursor(r.lineBlockAt(t.head).to, -1));
  function cQ(r, t, e) {
    let i = !1, n = Sn(r.selection, (s) => {
      let o = Ni(r, s.head, -1) || Ni(r, s.head, 1) || s.head > 0 && Ni(r, s.head - 1, 1) || s.head < r.doc.length && Ni(r, s.head + 1, -1);
      if (!o || !o.end)
        return s;
      i = !0;
      let a = o.start.from == s.head ? o.end.to : o.end.from;
      return _.cursor(a);
    });
    return i ? (t(Gi(r, n)), !0) : !1;
  }
  const uQ = ({ state: r, dispatch: t }) => cQ(r, t);
  function Vi(r, t) {
    let e = Sn(r.state.selection, (i) => {
      let n = t(i);
      return _.range(i.anchor, n.head, n.goalColumn);
    });
    return e.eq(r.state.selection) ? !1 : (r.dispatch(Gi(r.state, e)), !0);
  }
  function $f(r, t) {
    return Vi(r, (e) => r.moveByChar(e, t));
  }
  const Tf = (r) => $f(r, !oi(r)), Pf = (r) => $f(r, oi(r));
  function Rf(r, t) {
    return Vi(r, (e) => r.moveByGroup(e, t));
  }
  const fQ = (r) => Rf(r, !oi(r)), dQ = (r) => Rf(r, oi(r)), OQ = (r) => Vi(r, (t) => Wo(r.state, t, !oi(r))), pQ = (r) => Vi(r, (t) => Wo(r.state, t, oi(r)));
  function Cf(r, t) {
    return Vi(r, (e) => r.moveVertically(e, t));
  }
  const _f = (r) => Cf(r, !1), Af = (r) => Cf(r, !0);
  function Wf(r, t) {
    return Vi(r, (e) => r.moveVertically(e, t, bf(r)));
  }
  const Xf = (r) => Wf(r, !1), qf = (r) => Wf(r, !0), Mf = (r) => Vi(r, (t) => Xo(r, t, !0)), Df = (r) => Vi(r, (t) => Xo(r, t, !1)), mQ = (r) => Vi(r, (t) => _.cursor(r.lineBlockAt(t.head).from)), gQ = (r) => Vi(r, (t) => _.cursor(r.lineBlockAt(t.head).to)), Ef = ({ state: r, dispatch: t }) => (t(Gi(r, { anchor: 0 })), !0), Zf = ({ state: r, dispatch: t }) => (t(Gi(r, { anchor: r.doc.length })), !0), jf = ({ state: r, dispatch: t }) => (t(Gi(r, { anchor: r.selection.main.anchor, head: 0 })), !0), zf = ({ state: r, dispatch: t }) => (t(Gi(r, { anchor: r.selection.main.anchor, head: r.doc.length })), !0), vQ = ({ state: r, dispatch: t }) => (t(r.update({ selection: { anchor: 0, head: r.doc.length }, userEvent: "select" })), !0), QQ = ({ state: r, dispatch: t }) => {
    let e = Do(r).map(({ from: i, to: n }) => _.range(i, Math.min(n + 1, r.doc.length)));
    return t(r.update({ selection: _.create(e), userEvent: "select" })), !0;
  }, yQ = ({ state: r, dispatch: t }) => {
    let e = Sn(r.selection, (i) => {
      var n;
      let s = Lt(r).resolveInner(i.head, 1);
      for (; !(s.from < i.from && s.to >= i.to || s.to > i.to && s.from <= i.from || !(!((n = s.parent) === null || n === void 0) && n.parent)); )
        s = s.parent;
      return _.range(s.to, s.from);
    });
    return t(Gi(r, e)), !0;
  }, bQ = ({ state: r, dispatch: t }) => {
    let e = r.selection, i = null;
    return e.ranges.length > 1 ? i = _.create([e.main]) : e.main.empty || (i = _.create([_.cursor(e.main.head)])), i ? (t(Gi(r, i)), !0) : !1;
  };
  function qo({ state: r, dispatch: t }, e) {
    if (r.readOnly)
      return !1;
    let i = "delete.selection", n = r.changeByRange((s) => {
      let { from: o, to: a } = s;
      if (o == a) {
        let l = e(o);
        l < o ? i = "delete.backward" : l > o && (i = "delete.forward"), o = Math.min(o, l), a = Math.max(a, l);
      }
      return o == a ? { range: s } : { changes: { from: o, to: a }, range: _.cursor(o) };
    });
    return n.changes.empty ? !1 : (t(r.update(n, {
      scrollIntoView: !0,
      userEvent: i,
      effects: i == "delete.selection" ? F.announce.of(r.phrase("Selection deleted")) : void 0
    })), !0);
  }
  function Mo(r, t, e) {
    if (r instanceof F)
      for (let i of r.state.facet(F.atomicRanges).map((n) => n(r)))
        i.between(t, t, (n, s) => {
          n < t && s > t && (t = e ? s : n);
        });
    return t;
  }
  const Nf = (r, t) => qo(r, (e) => {
    let { state: i } = r, n = i.doc.lineAt(e), s, o;
    if (!t && e > n.from && e < n.from + 200 && !/[^ \t]/.test(s = n.text.slice(0, e - n.from))) {
      if (s[s.length - 1] == "	")
        return e - 1;
      let a = nr(s, i.tabSize), l = a % So(i) || So(i);
      for (let u = 0; u < l && s[s.length - 1 - u] == " "; u++)
        e--;
      o = e;
    } else
      o = N(n.text, e - n.from, t, t) + n.from, o == e && n.number != (t ? i.doc.lines : 1) && (o += t ? 1 : -1);
    return Mo(r, o, t);
  }), Dl = (r) => Nf(r, !1), If = (r) => Nf(r, !0), Gf = (r, t) => qo(r, (e) => {
    let i = e, { state: n } = r, s = n.doc.lineAt(i), o = n.charCategorizer(i);
    for (let a = null; ; ) {
      if (i == (t ? s.to : s.from)) {
        i == e && s.number != (t ? n.doc.lines : 1) && (i += t ? 1 : -1);
        break;
      }
      let l = N(s.text, i - s.from, t) + s.from, u = s.text.slice(Math.min(i, l) - s.from, Math.max(i, l) - s.from), d = o(u);
      if (a != null && d != a)
        break;
      (u != " " || i != e) && (a = d), i = l;
    }
    return Mo(r, i, t);
  }), Vf = (r) => Gf(r, !1), wQ = (r) => Gf(r, !0), Lf = (r) => qo(r, (t) => {
    let e = r.lineBlockAt(t).to;
    return Mo(r, t < e ? e : Math.min(r.state.doc.length, t + 1), !0);
  }), xQ = (r) => qo(r, (t) => {
    let e = r.lineBlockAt(t).from;
    return Mo(r, t > e ? e : Math.max(0, t - 1), !1);
  }), SQ = ({ state: r, dispatch: t }) => {
    if (r.readOnly)
      return !1;
    let e = r.changeByRange((i) => ({
      changes: { from: i.from, to: i.to, insert: c.of(["", ""]) },
      range: _.cursor(i.from)
    }));
    return t(r.update(e, { scrollIntoView: !0, userEvent: "input" })), !0;
  }, kQ = ({ state: r, dispatch: t }) => {
    if (r.readOnly)
      return !1;
    let e = r.changeByRange((i) => {
      if (!i.empty || i.from == 0 || i.from == r.doc.length)
        return { range: i };
      let n = i.from, s = r.doc.lineAt(n), o = n == s.from ? n - 1 : N(s.text, n - s.from, !1) + s.from, a = n == s.to ? n + 1 : N(s.text, n - s.from, !0) + s.from;
      return {
        changes: { from: o, to: a, insert: r.doc.slice(n, a).append(r.doc.slice(o, n)) },
        range: _.cursor(a)
      };
    });
    return e.changes.empty ? !1 : (t(r.update(e, { scrollIntoView: !0, userEvent: "move.character" })), !0);
  };
  function Do(r) {
    let t = [], e = -1;
    for (let i of r.selection.ranges) {
      let n = r.doc.lineAt(i.from), s = r.doc.lineAt(i.to);
      if (!i.empty && i.to == s.from && (s = r.doc.lineAt(i.to - 1)), e >= n.number) {
        let o = t[t.length - 1];
        o.to = s.to, o.ranges.push(i);
      } else
        t.push({ from: n.from, to: s.to, ranges: [i] });
      e = s.number + 1;
    }
    return t;
  }
  function Uf(r, t, e) {
    if (r.readOnly)
      return !1;
    let i = [], n = [];
    for (let s of Do(r)) {
      if (e ? s.to == r.doc.length : s.from == 0)
        continue;
      let o = r.doc.lineAt(e ? s.to + 1 : s.from - 1), a = o.length + 1;
      if (e) {
        i.push({ from: s.to, to: o.to }, { from: s.from, insert: o.text + r.lineBreak });
        for (let l of s.ranges)
          n.push(_.range(Math.min(r.doc.length, l.anchor + a), Math.min(r.doc.length, l.head + a)));
      } else {
        i.push({ from: o.from, to: s.from }, { from: s.to, insert: r.lineBreak + o.text });
        for (let l of s.ranges)
          n.push(_.range(l.anchor - a, l.head - a));
      }
    }
    return i.length ? (t(r.update({
      changes: i,
      scrollIntoView: !0,
      selection: _.create(n, r.selection.mainIndex),
      userEvent: "move.line"
    })), !0) : !1;
  }
  const $Q = ({ state: r, dispatch: t }) => Uf(r, t, !1), TQ = ({ state: r, dispatch: t }) => Uf(r, t, !0);
  function Bf(r, t, e) {
    if (r.readOnly)
      return !1;
    let i = [];
    for (let n of Do(r))
      e ? i.push({ from: n.from, insert: r.doc.slice(n.from, n.to) + r.lineBreak }) : i.push({ from: n.to, insert: r.lineBreak + r.doc.slice(n.from, n.to) });
    return t(r.update({ changes: i, scrollIntoView: !0, userEvent: "input.copyline" })), !0;
  }
  const PQ = ({ state: r, dispatch: t }) => Bf(r, t, !1), RQ = ({ state: r, dispatch: t }) => Bf(r, t, !0), CQ = (r) => {
    if (r.state.readOnly)
      return !1;
    let { state: t } = r, e = t.changes(Do(t).map(({ from: n, to: s }) => (n > 0 ? n-- : s < t.doc.length && s++, { from: n, to: s }))), i = Sn(t.selection, (n) => r.moveVertically(n, !0)).map(e);
    return r.dispatch({ changes: e, selection: i, scrollIntoView: !0, userEvent: "delete.line" }), !0;
  };
  function _Q(r, t) {
    if (/\(\)|\[\]|\{\}/.test(r.sliceDoc(t - 1, t + 1)))
      return { from: t, to: t };
    let e = Lt(r).resolveInner(t), i = e.childBefore(t), n = e.childAfter(t), s;
    return i && n && i.to <= t && n.from >= t && (s = i.type.prop(Ot.closedBy)) && s.indexOf(n.name) > -1 && r.doc.lineAt(i.to).from == r.doc.lineAt(n.from).from ? { from: i.to, to: n.from } : null;
  }
  const AQ = /* @__PURE__ */ Yf(!1), WQ = /* @__PURE__ */ Yf(!0);
  function Yf(r) {
    return ({ state: t, dispatch: e }) => {
      if (t.readOnly)
        return !1;
      let i = t.changeByRange((n) => {
        let { from: s, to: o } = n, a = t.doc.lineAt(s), l = !r && s == o && _Q(t, s);
        r && (s = o = (o <= a.to ? a : t.doc.lineAt(o)).to);
        let u = new ko(t, { simulateBreak: s, simulateDoubleBreak: !!l }), d = xl(u, s);
        for (d == null && (d = /^\s*/.exec(t.doc.lineAt(s).text)[0].length); o < a.to && /\s/.test(a.text[o - a.from]); )
          o++;
        l ? { from: s, to: o } = l : s > a.from && s < a.from + 100 && !/\S/.test(a.text.slice(0, s)) && (s = a.from);
        let O = ["", us(t, d)];
        return l && O.push(us(t, u.lineIndent(a.from, -1))), {
          changes: { from: s, to: o, insert: c.of(O) },
          range: _.cursor(s + 1 + O[1].length)
        };
      });
      return e(t.update(i, { scrollIntoView: !0, userEvent: "input" })), !0;
    };
  }
  function El(r, t) {
    let e = -1;
    return r.changeByRange((i) => {
      let n = [];
      for (let o = i.from; o <= i.to; ) {
        let a = r.doc.lineAt(o);
        a.number > e && (i.empty || i.to > a.from) && (t(a, n, i), e = a.number), o = a.to + 1;
      }
      let s = r.changes(n);
      return {
        changes: n,
        range: _.range(s.mapPos(i.anchor, 1), s.mapPos(i.head, 1))
      };
    });
  }
  const XQ = ({ state: r, dispatch: t }) => {
    if (r.readOnly)
      return !1;
    let e = /* @__PURE__ */ Object.create(null), i = new ko(r, { overrideIndentation: (s) => {
      let o = e[s];
      return o ?? -1;
    } }), n = El(r, (s, o, a) => {
      let l = xl(i, s.from);
      if (l == null)
        return;
      /\S/.test(s.text) || (l = 0);
      let u = /^\s*/.exec(s.text)[0], d = us(r, l);
      (u != d || a.from < s.from + u.length) && (e[s.from] = l, o.push({ from: s.from, to: s.from + u.length, insert: d }));
    });
    return n.changes.empty || t(r.update(n, { userEvent: "indent" })), !0;
  }, Ff = ({ state: r, dispatch: t }) => r.readOnly ? !1 : (t(r.update(El(r, (e, i) => {
    i.push({ from: e.from, insert: r.facet(cs) });
  }), { userEvent: "input.indent" })), !0), Hf = ({ state: r, dispatch: t }) => r.readOnly ? !1 : (t(r.update(El(r, (e, i) => {
    let n = /^\s*/.exec(e.text)[0];
    if (!n)
      return;
    let s = nr(n, r.tabSize), o = 0, a = us(r, Math.max(0, s - So(r)));
    for (; o < n.length && o < a.length && n.charCodeAt(o) == a.charCodeAt(o); )
      o++;
    i.push({ from: e.from + o, to: e.from + n.length, insert: a.slice(o) });
  }), { userEvent: "delete.dedent" })), !0), qQ = [
    { key: "Ctrl-b", run: pf, shift: Tf, preventDefault: !0 },
    { key: "Ctrl-f", run: mf, shift: Pf },
    { key: "Ctrl-p", run: Qf, shift: _f },
    { key: "Ctrl-n", run: yf, shift: Af },
    { key: "Ctrl-a", run: lQ, shift: mQ },
    { key: "Ctrl-e", run: hQ, shift: gQ },
    { key: "Ctrl-d", run: If },
    { key: "Ctrl-h", run: Dl },
    { key: "Ctrl-k", run: Lf },
    { key: "Ctrl-Alt-h", run: Vf },
    { key: "Ctrl-o", run: SQ },
    { key: "Ctrl-t", run: kQ },
    { key: "Ctrl-v", run: Ml }
  ], MQ = /* @__PURE__ */ [
    { key: "ArrowLeft", run: pf, shift: Tf, preventDefault: !0 },
    { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: rQ, shift: fQ },
    { mac: "Cmd-ArrowLeft", run: kf, shift: Df },
    { key: "ArrowRight", run: mf, shift: Pf, preventDefault: !0 },
    { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: nQ, shift: dQ },
    { mac: "Cmd-ArrowRight", run: Sf, shift: Mf },
    { key: "ArrowUp", run: Qf, shift: _f, preventDefault: !0 },
    { mac: "Cmd-ArrowUp", run: Ef, shift: jf },
    { mac: "Ctrl-ArrowUp", run: xf, shift: Xf },
    { key: "ArrowDown", run: yf, shift: Af, preventDefault: !0 },
    { mac: "Cmd-ArrowDown", run: Zf, shift: zf },
    { mac: "Ctrl-ArrowDown", run: Ml, shift: qf },
    { key: "PageUp", run: xf, shift: Xf },
    { key: "PageDown", run: Ml, shift: qf },
    { key: "Home", run: kf, shift: Df, preventDefault: !0 },
    { key: "Mod-Home", run: Ef, shift: jf },
    { key: "End", run: Sf, shift: Mf, preventDefault: !0 },
    { key: "Mod-End", run: Zf, shift: zf },
    { key: "Enter", run: AQ },
    { key: "Mod-a", run: vQ },
    { key: "Backspace", run: Dl, shift: Dl },
    { key: "Delete", run: If },
    { key: "Mod-Backspace", mac: "Alt-Backspace", run: Vf },
    { key: "Mod-Delete", mac: "Alt-Delete", run: wQ },
    { mac: "Mod-Backspace", run: xQ },
    { mac: "Mod-Delete", run: Lf }
  ].concat(/* @__PURE__ */ qQ.map((r) => ({ mac: r.key, run: r.run, shift: r.shift }))), DQ = /* @__PURE__ */ [
    { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: oQ, shift: OQ },
    { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: aQ, shift: pQ },
    { key: "Alt-ArrowUp", run: $Q },
    { key: "Shift-Alt-ArrowUp", run: PQ },
    { key: "Alt-ArrowDown", run: TQ },
    { key: "Shift-Alt-ArrowDown", run: RQ },
    { key: "Escape", run: bQ },
    { key: "Mod-Enter", run: WQ },
    { key: "Alt-l", mac: "Ctrl-l", run: QQ },
    { key: "Mod-i", run: yQ, preventDefault: !0 },
    { key: "Mod-[", run: Hf },
    { key: "Mod-]", run: Ff },
    { key: "Mod-Alt-\\", run: XQ },
    { key: "Shift-Mod-k", run: CQ },
    { key: "Shift-Mod-\\", run: uQ },
    { key: "Mod-/", run: Dv },
    { key: "Alt-A", run: Zv }
  ].concat(MQ), EQ = { key: "Tab", run: Ff, shift: Hf };
  function We() {
    var r = arguments[0];
    typeof r == "string" && (r = document.createElement(r));
    var t = 1, e = arguments[1];
    if (e && typeof e == "object" && e.nodeType == null && !Array.isArray(e)) {
      for (var i in e)
        if (Object.prototype.hasOwnProperty.call(e, i)) {
          var n = e[i];
          typeof n == "string" ? r.setAttribute(i, n) : n != null && (r[i] = n);
        }
      t++;
    }
    for (; t < arguments.length; t++)
      Jf(r, arguments[t]);
    return r;
  }
  function Jf(r, t) {
    if (typeof t == "string")
      r.appendChild(document.createTextNode(t));
    else if (t != null)
      if (t.nodeType != null)
        r.appendChild(t);
      else if (Array.isArray(t))
        for (var e = 0; e < t.length; e++)
          Jf(r, t[e]);
      else
        throw new RangeError("Unsupported child node: " + t);
  }
  const Kf = typeof String.prototype.normalize == "function" ? (r) => r.normalize("NFKD") : (r) => r;
  class kn {
    constructor(t, e, i = 0, n = t.length, s) {
      this.value = { from: 0, to: 0 }, this.done = !1, this.matches = [], this.buffer = "", this.bufferPos = 0, this.iter = t.iterRange(i, n), this.bufferStart = i, this.normalize = s ? (o) => s(Kf(o)) : Kf, this.query = this.normalize(e);
    }
    peek() {
      if (this.bufferPos == this.buffer.length) {
        if (this.bufferStart += this.buffer.length, this.iter.next(), this.iter.done)
          return -1;
        this.bufferPos = 0, this.buffer = this.iter.value;
      }
      return vt(this.buffer, this.bufferPos);
    }
    next() {
      for (; this.matches.length; )
        this.matches.pop();
      return this.nextOverlapping();
    }
    nextOverlapping() {
      for (; ; ) {
        let t = this.peek();
        if (t < 0)
          return this.done = !0, this;
        let e = lt(t), i = this.bufferStart + this.bufferPos;
        this.bufferPos += st(t);
        let n = this.normalize(e);
        for (let s = 0, o = i; ; s++) {
          let a = n.charCodeAt(s), l = this.match(a, o);
          if (l)
            return this.value = l, this;
          if (s == n.length - 1)
            break;
          o == i && s < e.length && e.charCodeAt(s) == a && o++;
        }
      }
    }
    match(t, e) {
      let i = null;
      for (let n = 0; n < this.matches.length; n += 2) {
        let s = this.matches[n], o = !1;
        this.query.charCodeAt(s) == t && (s == this.query.length - 1 ? i = { from: this.matches[n + 1], to: e + 1 } : (this.matches[n]++, o = !0)), o || (this.matches.splice(n, 2), n -= 2);
      }
      return this.query.charCodeAt(0) == t && (this.query.length == 1 ? i = { from: e, to: e + 1 } : this.matches.push(1, e)), i;
    }
  }
  typeof Symbol < "u" && (kn.prototype[Symbol.iterator] = function() {
    return this;
  });
  const td = { from: -1, to: -1, match: /* @__PURE__ */ /.*/.exec("") }, Zl = "gm" + (/x/.unicode == null ? "" : "u");
  class ed {
    constructor(t, e, i, n = 0, s = t.length) {
      if (this.to = s, this.curLine = "", this.done = !1, this.value = td, /\\[sWDnr]|\n|\r|\[\^/.test(e))
        return new id(t, e, i, n, s);
      this.re = new RegExp(e, Zl + (i != null && i.ignoreCase ? "i" : "")), this.iter = t.iter();
      let o = t.lineAt(n);
      this.curLineStart = o.from, this.matchPos = n, this.getLine(this.curLineStart);
    }
    getLine(t) {
      this.iter.next(t), this.iter.lineBreak ? this.curLine = "" : (this.curLine = this.iter.value, this.curLineStart + this.curLine.length > this.to && (this.curLine = this.curLine.slice(0, this.to - this.curLineStart)), this.iter.next());
    }
    nextLine() {
      this.curLineStart = this.curLineStart + this.curLine.length + 1, this.curLineStart > this.to ? this.curLine = "" : this.getLine(0);
    }
    next() {
      for (let t = this.matchPos - this.curLineStart; ; ) {
        this.re.lastIndex = t;
        let e = this.matchPos <= this.to && this.re.exec(this.curLine);
        if (e) {
          let i = this.curLineStart + e.index, n = i + e[0].length;
          if (this.matchPos = n + (i == n ? 1 : 0), i == this.curLine.length && this.nextLine(), i < n || i > this.value.to)
            return this.value = { from: i, to: n, match: e }, this;
          t = this.matchPos - this.curLineStart;
        } else if (this.curLineStart + this.curLine.length < this.to)
          this.nextLine(), t = 0;
        else
          return this.done = !0, this;
      }
    }
  }
  const jl = /* @__PURE__ */ new WeakMap();
  class $n {
    constructor(t, e) {
      this.from = t, this.text = e;
    }
    get to() {
      return this.from + this.text.length;
    }
    static get(t, e, i) {
      let n = jl.get(t);
      if (!n || n.from >= i || n.to <= e) {
        let a = new $n(e, t.sliceString(e, i));
        return jl.set(t, a), a;
      }
      if (n.from == e && n.to == i)
        return n;
      let { text: s, from: o } = n;
      return o > e && (s = t.sliceString(e, o) + s, o = e), n.to < i && (s += t.sliceString(n.to, i)), jl.set(t, new $n(o, s)), new $n(e, s.slice(e - o, i - o));
    }
  }
  class id {
    constructor(t, e, i, n, s) {
      this.text = t, this.to = s, this.done = !1, this.value = td, this.matchPos = n, this.re = new RegExp(e, Zl + (i != null && i.ignoreCase ? "i" : "")), this.flat = $n.get(t, n, this.chunkEnd(n + 5e3));
    }
    chunkEnd(t) {
      return t >= this.to ? this.to : this.text.lineAt(t).to;
    }
    next() {
      for (; ; ) {
        let t = this.re.lastIndex = this.matchPos - this.flat.from, e = this.re.exec(this.flat.text);
        if (e && !e[0] && e.index == t && (this.re.lastIndex = t + 1, e = this.re.exec(this.flat.text)), e && this.flat.to < this.to && e.index + e[0].length > this.flat.text.length - 10 && (e = null), e) {
          let i = this.flat.from + e.index, n = i + e[0].length;
          return this.value = { from: i, to: n, match: e }, this.matchPos = n + (i == n ? 1 : 0), this;
        } else {
          if (this.flat.to == this.to)
            return this.done = !0, this;
          this.flat = $n.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
        }
      }
    }
  }
  typeof Symbol < "u" && (ed.prototype[Symbol.iterator] = id.prototype[Symbol.iterator] = function() {
    return this;
  });
  function ZQ(r) {
    try {
      return new RegExp(r, Zl), !0;
    } catch {
      return !1;
    }
  }
  function zl(r) {
    let t = We("input", { class: "cm-textfield", name: "line" }), e = We("form", {
      class: "cm-gotoLine",
      onkeydown: (n) => {
        n.keyCode == 27 ? (n.preventDefault(), r.dispatch({ effects: Eo.of(!1) }), r.focus()) : n.keyCode == 13 && (n.preventDefault(), i());
      },
      onsubmit: (n) => {
        n.preventDefault(), i();
      }
    }, We("label", r.state.phrase("Go to line"), ": ", t), " ", We("button", { class: "cm-button", type: "submit" }, r.state.phrase("go")));
    function i() {
      let n = /^([+-])?(\d+)?(:\d+)?(%)?$/.exec(t.value);
      if (!n)
        return;
      let { state: s } = r, o = s.doc.lineAt(s.selection.main.head), [, a, l, u, d] = n, O = u ? +u.slice(1) : 0, m = l ? +l : o.number;
      if (l && d) {
        let b = m / 100;
        a && (b = b * (a == "-" ? -1 : 1) + o.number / s.doc.lines), m = Math.round(s.doc.lines * b);
      } else
        l && a && (m = m * (a == "-" ? -1 : 1) + o.number);
      let Q = s.doc.line(Math.max(1, Math.min(s.doc.lines, m)));
      r.dispatch({
        effects: Eo.of(!1),
        selection: _.cursor(Q.from + Math.max(0, Math.min(O, Q.length))),
        scrollIntoView: !0
      }), r.focus();
    }
    return { dom: e };
  }
  const Eo = /* @__PURE__ */ ct.define(), rd = /* @__PURE__ */ Yt.define({
    create() {
      return !0;
    },
    update(r, t) {
      for (let e of t.effects)
        e.is(Eo) && (r = e.value);
      return r;
    },
    provide: (r) => uo.from(r, (t) => t ? zl : null)
  }), jQ = (r) => {
    let t = ho(r, zl);
    if (!t) {
      let e = [Eo.of(!0)];
      r.state.field(rd, !1) == null && e.push(ct.appendConfig.of([rd, zQ])), r.dispatch({ effects: e }), t = ho(r, zl);
    }
    return t && t.dom.querySelector("input").focus(), !0;
  }, zQ = /* @__PURE__ */ F.baseTheme({
    ".cm-panel.cm-gotoLine": {
      padding: "2px 6px 4px",
      "& label": { fontSize: "80%" }
    }
  }), NQ = {
    highlightWordAroundCursor: !1,
    minSelectionLength: 1,
    maxMatches: 100,
    wholeWords: !1
  }, IQ = /* @__PURE__ */ V.define({
    combine(r) {
      return pi(r, NQ, {
        highlightWordAroundCursor: (t, e) => t || e,
        minSelectionLength: Math.min,
        maxMatches: Math.min
      });
    }
  });
  function GQ(r) {
    return [YQ, BQ];
  }
  const VQ = /* @__PURE__ */ it.mark({ class: "cm-selectionMatch" }), LQ = /* @__PURE__ */ it.mark({ class: "cm-selectionMatch cm-selectionMatch-main" });
  function nd(r, t, e, i) {
    return (e == 0 || r(t.sliceDoc(e - 1, e)) != D.Word) && (i == t.doc.length || r(t.sliceDoc(i, i + 1)) != D.Word);
  }
  function UQ(r, t, e, i) {
    return r(t.sliceDoc(e, e + 1)) == D.Word && r(t.sliceDoc(i - 1, i)) == D.Word;
  }
  const BQ = /* @__PURE__ */ ye.fromClass(class {
    constructor(r) {
      this.decorations = this.getDeco(r);
    }
    update(r) {
      (r.selectionSet || r.docChanged || r.viewportChanged) && (this.decorations = this.getDeco(r.view));
    }
    getDeco(r) {
      let t = r.state.facet(IQ), { state: e } = r, i = e.selection;
      if (i.ranges.length > 1)
        return it.none;
      let n = i.main, s, o = null;
      if (n.empty) {
        if (!t.highlightWordAroundCursor)
          return it.none;
        let l = e.wordAt(n.head);
        if (!l)
          return it.none;
        o = e.charCategorizer(n.head), s = e.sliceDoc(l.from, l.to);
      } else {
        let l = n.to - n.from;
        if (l < t.minSelectionLength || l > 200)
          return it.none;
        if (t.wholeWords) {
          if (s = e.sliceDoc(n.from, n.to), o = e.charCategorizer(n.head), !(nd(o, e, n.from, n.to) && UQ(o, e, n.from, n.to)))
            return it.none;
        } else if (s = e.sliceDoc(n.from, n.to).trim(), !s)
          return it.none;
      }
      let a = [];
      for (let l of r.visibleRanges) {
        let u = new kn(e.doc, s, l.from, l.to);
        for (; !u.next().done; ) {
          let { from: d, to: O } = u.value;
          if ((!o || nd(o, e, d, O)) && (n.empty && d <= n.from && O >= n.to ? a.push(LQ.range(d, O)) : (d >= n.to || O <= n.from) && a.push(VQ.range(d, O)), a.length > t.maxMatches))
            return it.none;
        }
      }
      return it.set(a);
    }
  }, {
    decorations: (r) => r.decorations
  }), YQ = /* @__PURE__ */ F.baseTheme({
    ".cm-selectionMatch": { backgroundColor: "#99ff7780" },
    ".cm-searchMatch .cm-selectionMatch": { backgroundColor: "transparent" }
  }), FQ = ({ state: r, dispatch: t }) => {
    let { selection: e } = r, i = _.create(e.ranges.map((n) => r.wordAt(n.head) || _.cursor(n.head)), e.mainIndex);
    return i.eq(e) ? !1 : (t(r.update({ selection: i })), !0);
  };
  function HQ(r, t) {
    let { main: e, ranges: i } = r.selection, n = r.wordAt(e.head), s = n && n.from == e.from && n.to == e.to;
    for (let o = !1, a = new kn(r.doc, t, i[i.length - 1].to); ; )
      if (a.next(), a.done) {
        if (o)
          return null;
        a = new kn(r.doc, t, 0, Math.max(0, i[i.length - 1].from - 1)), o = !0;
      } else {
        if (o && i.some((l) => l.from == a.value.from))
          continue;
        if (s) {
          let l = r.wordAt(a.value.from);
          if (!l || l.from != a.value.from || l.to != a.value.to)
            continue;
        }
        return a.value;
      }
  }
  const JQ = ({ state: r, dispatch: t }) => {
    let { ranges: e } = r.selection;
    if (e.some((s) => s.from === s.to))
      return FQ({ state: r, dispatch: t });
    let i = r.sliceDoc(e[0].from, e[0].to);
    if (r.selection.ranges.some((s) => r.sliceDoc(s.from, s.to) != i))
      return !1;
    let n = HQ(r, i);
    return n ? (t(r.update({
      selection: r.selection.addRange(_.range(n.from, n.to), !1),
      effects: F.scrollIntoView(n.to)
    })), !0) : !1;
  }, Nl = /* @__PURE__ */ V.define({
    combine(r) {
      var t;
      return {
        top: r.reduce((e, i) => e ?? i.top, void 0) || !1,
        caseSensitive: r.reduce((e, i) => e ?? i.caseSensitive, void 0) || !1,
        createPanel: ((t = r.find((e) => e.createPanel)) === null || t === void 0 ? void 0 : t.createPanel) || ((e) => new ly(e))
      };
    }
  });
  class sd {
    constructor(t) {
      this.search = t.search, this.caseSensitive = !!t.caseSensitive, this.regexp = !!t.regexp, this.replace = t.replace || "", this.valid = !!this.search && (!this.regexp || ZQ(this.search)), this.unquoted = t.literal ? this.search : this.search.replace(/\\([nrt\\])/g, (e, i) => i == "n" ? `
` : i == "r" ? "\r" : i == "t" ? "	" : "\\");
    }
    eq(t) {
      return this.search == t.search && this.replace == t.replace && this.caseSensitive == t.caseSensitive && this.regexp == t.regexp;
    }
    create() {
      return this.regexp ? new ty(this) : new KQ(this);
    }
    getCursor(t, e = 0, i = t.length) {
      return this.regexp ? Pn(this, t, e, i) : Tn(this, t, e, i);
    }
  }
  class od {
    constructor(t) {
      this.spec = t;
    }
  }
  function Tn(r, t, e, i) {
    return new kn(t, r.unquoted, e, i, r.caseSensitive ? void 0 : (n) => n.toLowerCase());
  }
  class KQ extends od {
    constructor(t) {
      super(t);
    }
    nextMatch(t, e, i) {
      let n = Tn(this.spec, t, i, t.length).nextOverlapping();
      return n.done && (n = Tn(this.spec, t, 0, e).nextOverlapping()), n.done ? null : n.value;
    }
    prevMatchInRange(t, e, i) {
      for (let n = i; ; ) {
        let s = Math.max(e, n - 1e4 - this.spec.unquoted.length), o = Tn(this.spec, t, s, n), a = null;
        for (; !o.nextOverlapping().done; )
          a = o.value;
        if (a)
          return a;
        if (s == e)
          return null;
        n -= 1e4;
      }
    }
    prevMatch(t, e, i) {
      return this.prevMatchInRange(t, 0, e) || this.prevMatchInRange(t, i, t.length);
    }
    getReplacement(t) {
      return this.spec.replace;
    }
    matchAll(t, e) {
      let i = Tn(this.spec, t, 0, t.length), n = [];
      for (; !i.next().done; ) {
        if (n.length >= e)
          return null;
        n.push(i.value);
      }
      return n;
    }
    highlight(t, e, i, n) {
      let s = Tn(this.spec, t, Math.max(0, e - this.spec.unquoted.length), Math.min(i + this.spec.unquoted.length, t.length));
      for (; !s.next().done; )
        n(s.value.from, s.value.to);
    }
  }
  function Pn(r, t, e, i) {
    return new ed(t, r.search, r.caseSensitive ? void 0 : { ignoreCase: !0 }, e, i);
  }
  class ty extends od {
    nextMatch(t, e, i) {
      let n = Pn(this.spec, t, i, t.length).next();
      return n.done && (n = Pn(this.spec, t, 0, e).next()), n.done ? null : n.value;
    }
    prevMatchInRange(t, e, i) {
      for (let n = 1; ; n++) {
        let s = Math.max(e, i - n * 1e4), o = Pn(this.spec, t, s, i), a = null;
        for (; !o.next().done; )
          a = o.value;
        if (a && (s == e || a.from > s + 10))
          return a;
        if (s == e)
          return null;
      }
    }
    prevMatch(t, e, i) {
      return this.prevMatchInRange(t, 0, e) || this.prevMatchInRange(t, i, t.length);
    }
    getReplacement(t) {
      return this.spec.replace.replace(/\$([$&\d+])/g, (e, i) => i == "$" ? "$" : i == "&" ? t.match[0] : i != "0" && +i < t.match.length ? t.match[i] : e);
    }
    matchAll(t, e) {
      let i = Pn(this.spec, t, 0, t.length), n = [];
      for (; !i.next().done; ) {
        if (n.length >= e)
          return null;
        n.push(i.value);
      }
      return n;
    }
    highlight(t, e, i, n) {
      let s = Pn(this.spec, t, Math.max(0, e - 250), Math.min(i + 250, t.length));
      for (; !s.next().done; )
        n(s.value.from, s.value.to);
    }
  }
  const ms = /* @__PURE__ */ ct.define(), Il = /* @__PURE__ */ ct.define(), Rr = /* @__PURE__ */ Yt.define({
    create(r) {
      return new Gl(Ll(r).create(), null);
    },
    update(r, t) {
      for (let e of t.effects)
        e.is(ms) ? r = new Gl(e.value.create(), r.panel) : e.is(Il) && (r = new Gl(r.query, e.value ? Vl : null));
      return r;
    },
    provide: (r) => uo.from(r, (t) => t.panel)
  });
  class Gl {
    constructor(t, e) {
      this.query = t, this.panel = e;
    }
  }
  const ey = /* @__PURE__ */ it.mark({ class: "cm-searchMatch" }), iy = /* @__PURE__ */ it.mark({ class: "cm-searchMatch cm-searchMatch-selected" }), ry = /* @__PURE__ */ ye.fromClass(class {
    constructor(r) {
      this.view = r, this.decorations = this.highlight(r.state.field(Rr));
    }
    update(r) {
      let t = r.state.field(Rr);
      (t != r.startState.field(Rr) || r.docChanged || r.selectionSet || r.viewportChanged) && (this.decorations = this.highlight(t));
    }
    highlight({ query: r, panel: t }) {
      if (!t || !r.spec.valid)
        return it.none;
      let { view: e } = this, i = new se();
      for (let n = 0, s = e.visibleRanges, o = s.length; n < o; n++) {
        let { from: a, to: l } = s[n];
        for (; n < o - 1 && l > s[n + 1].from - 2 * 250; )
          l = s[++n].to;
        r.highlight(e.state.doc, a, l, (u, d) => {
          let O = e.state.selection.ranges.some((m) => m.from == u && m.to == d);
          i.add(u, d, O ? iy : ey);
        });
      }
      return i.finish();
    }
  }, {
    decorations: (r) => r.decorations
  });
  function gs(r) {
    return (t) => {
      let e = t.state.field(Rr, !1);
      return e && e.query.spec.valid ? r(t, e) : ld(t);
    };
  }
  const Zo = /* @__PURE__ */ gs((r, { query: t }) => {
    let { to: e } = r.state.selection.main, i = t.nextMatch(r.state.doc, e, e);
    return i ? (r.dispatch({
      selection: { anchor: i.from, head: i.to },
      scrollIntoView: !0,
      effects: Ul(r, i),
      userEvent: "select.search"
    }), !0) : !1;
  }), jo = /* @__PURE__ */ gs((r, { query: t }) => {
    let { state: e } = r, { from: i } = e.selection.main, n = t.prevMatch(e.doc, i, i);
    return n ? (r.dispatch({
      selection: { anchor: n.from, head: n.to },
      scrollIntoView: !0,
      effects: Ul(r, n),
      userEvent: "select.search"
    }), !0) : !1;
  }), ny = /* @__PURE__ */ gs((r, { query: t }) => {
    let e = t.matchAll(r.state.doc, 1e3);
    return !e || !e.length ? !1 : (r.dispatch({
      selection: _.create(e.map((i) => _.range(i.from, i.to))),
      userEvent: "select.search.matches"
    }), !0);
  }), sy = ({ state: r, dispatch: t }) => {
    let e = r.selection;
    if (e.ranges.length > 1 || e.main.empty)
      return !1;
    let { from: i, to: n } = e.main, s = [], o = 0;
    for (let a = new kn(r.doc, r.sliceDoc(i, n)); !a.next().done; ) {
      if (s.length > 1e3)
        return !1;
      a.value.from == i && (o = s.length), s.push(_.range(a.value.from, a.value.to));
    }
    return t(r.update({
      selection: _.create(s, o),
      userEvent: "select.search.matches"
    })), !0;
  }, ad = /* @__PURE__ */ gs((r, { query: t }) => {
    let { state: e } = r, { from: i, to: n } = e.selection.main;
    if (e.readOnly)
      return !1;
    let s = t.nextMatch(e.doc, i, i);
    if (!s)
      return !1;
    let o = [], a, l, u = [];
    if (s.from == i && s.to == n && (l = e.toText(t.getReplacement(s)), o.push({ from: s.from, to: s.to, insert: l }), s = t.nextMatch(e.doc, s.from, s.to), u.push(F.announce.of(e.phrase("replaced match on line $", e.doc.lineAt(i).number) + "."))), s) {
      let d = o.length == 0 || o[0].from >= s.to ? 0 : s.to - s.from - l.length;
      a = { anchor: s.from - d, head: s.to - d }, u.push(Ul(r, s));
    }
    return r.dispatch({
      changes: o,
      selection: a,
      scrollIntoView: !!a,
      effects: u,
      userEvent: "input.replace"
    }), !0;
  }), oy = /* @__PURE__ */ gs((r, { query: t }) => {
    if (r.state.readOnly)
      return !1;
    let e = t.matchAll(r.state.doc, 1e9).map((n) => {
      let { from: s, to: o } = n;
      return { from: s, to: o, insert: t.getReplacement(n) };
    });
    if (!e.length)
      return !1;
    let i = r.state.phrase("replaced $ matches", e.length) + ".";
    return r.dispatch({
      changes: e,
      effects: F.announce.of(i),
      userEvent: "input.replace.all"
    }), !0;
  });
  function Vl(r) {
    return r.state.facet(Nl).createPanel(r);
  }
  function Ll(r, t) {
    var e;
    let i = r.selection.main, n = i.empty || i.to > i.from + 100 ? "" : r.sliceDoc(i.from, i.to), s = (e = t == null ? void 0 : t.caseSensitive) !== null && e !== void 0 ? e : r.facet(Nl).caseSensitive;
    return t && !n ? t : new sd({ search: n.replace(/\n/g, "\\n"), caseSensitive: s });
  }
  const ld = (r) => {
    let t = r.state.field(Rr, !1);
    if (t && t.panel) {
      let e = ho(r, Vl);
      if (!e)
        return !1;
      let i = e.dom.querySelector("[main-field]");
      if (i && i != r.root.activeElement) {
        let n = Ll(r.state, t.query.spec);
        n.valid && r.dispatch({ effects: ms.of(n) }), i.focus(), i.select();
      }
    } else
      r.dispatch({ effects: [
        Il.of(!0),
        t ? ms.of(Ll(r.state, t.query.spec)) : ct.appendConfig.of(cy)
      ] });
    return !0;
  }, hd = (r) => {
    let t = r.state.field(Rr, !1);
    if (!t || !t.panel)
      return !1;
    let e = ho(r, Vl);
    return e && e.dom.contains(r.root.activeElement) && r.focus(), r.dispatch({ effects: Il.of(!1) }), !0;
  }, ay = [
    { key: "Mod-f", run: ld, scope: "editor search-panel" },
    { key: "F3", run: Zo, shift: jo, scope: "editor search-panel", preventDefault: !0 },
    { key: "Mod-g", run: Zo, shift: jo, scope: "editor search-panel", preventDefault: !0 },
    { key: "Escape", run: hd, scope: "editor search-panel" },
    { key: "Mod-Shift-l", run: sy },
    { key: "Alt-g", run: jQ },
    { key: "Mod-d", run: JQ, preventDefault: !0 }
  ];
  class ly {
    constructor(t) {
      this.view = t;
      let e = this.query = t.state.field(Rr).query.spec;
      this.commit = this.commit.bind(this), this.searchField = We("input", {
        value: e.search,
        placeholder: ai(t, "Find"),
        "aria-label": ai(t, "Find"),
        class: "cm-textfield",
        name: "search",
        "main-field": "true",
        onchange: this.commit,
        onkeyup: this.commit
      }), this.replaceField = We("input", {
        value: e.replace,
        placeholder: ai(t, "Replace"),
        "aria-label": ai(t, "Replace"),
        class: "cm-textfield",
        name: "replace",
        onchange: this.commit,
        onkeyup: this.commit
      }), this.caseField = We("input", {
        type: "checkbox",
        name: "case",
        checked: e.caseSensitive,
        onchange: this.commit
      }), this.reField = We("input", {
        type: "checkbox",
        name: "re",
        checked: e.regexp,
        onchange: this.commit
      });
      function i(n, s, o) {
        return We("button", { class: "cm-button", name: n, onclick: s, type: "button" }, o);
      }
      this.dom = We("div", { onkeydown: (n) => this.keydown(n), class: "cm-search" }, [
        this.searchField,
        i("next", () => Zo(t), [ai(t, "next")]),
        i("prev", () => jo(t), [ai(t, "previous")]),
        i("select", () => ny(t), [ai(t, "all")]),
        We("label", null, [this.caseField, ai(t, "match case")]),
        We("label", null, [this.reField, ai(t, "regexp")]),
        ...t.state.readOnly ? [] : [
          We("br"),
          this.replaceField,
          i("replace", () => ad(t), [ai(t, "replace")]),
          i("replaceAll", () => oy(t), [ai(t, "replace all")]),
          We("button", {
            name: "close",
            onclick: () => hd(t),
            "aria-label": ai(t, "close"),
            type: "button"
          }, ["×"])
        ]
      ]);
    }
    commit() {
      let t = new sd({
        search: this.searchField.value,
        caseSensitive: this.caseField.checked,
        regexp: this.reField.checked,
        replace: this.replaceField.value
      });
      t.eq(this.query) || (this.query = t, this.view.dispatch({ effects: ms.of(t) }));
    }
    keydown(t) {
      Nm(this.view, t, "search-panel") ? t.preventDefault() : t.keyCode == 13 && t.target == this.searchField ? (t.preventDefault(), (t.shiftKey ? jo : Zo)(this.view)) : t.keyCode == 13 && t.target == this.replaceField && (t.preventDefault(), ad(this.view));
    }
    update(t) {
      for (let e of t.transactions)
        for (let i of e.effects)
          i.is(ms) && !i.value.eq(this.query) && this.setQuery(i.value);
    }
    setQuery(t) {
      this.query = t, this.searchField.value = t.search, this.replaceField.value = t.replace, this.caseField.checked = t.caseSensitive, this.reField.checked = t.regexp;
    }
    mount() {
      this.searchField.select();
    }
    get pos() {
      return 80;
    }
    get top() {
      return this.view.state.facet(Nl).top;
    }
  }
  function ai(r, t) {
    return r.state.phrase(t);
  }
  const zo = 30, No = /[\s\.,:;?!]/;
  function Ul(r, { from: t, to: e }) {
    let i = r.state.doc.lineAt(t), n = r.state.doc.lineAt(e).to, s = Math.max(i.from, t - zo), o = Math.min(n, e + zo), a = r.state.sliceDoc(s, o);
    if (s != i.from) {
      for (let l = 0; l < zo; l++)
        if (!No.test(a[l + 1]) && No.test(a[l])) {
          a = a.slice(l);
          break;
        }
    }
    if (o != n) {
      for (let l = a.length - 1; l > a.length - zo; l--)
        if (!No.test(a[l - 1]) && No.test(a[l])) {
          a = a.slice(0, l);
          break;
        }
    }
    return F.announce.of(`${r.state.phrase("current match")}. ${a} ${r.state.phrase("on line")} ${i.number}.`);
  }
  const hy = /* @__PURE__ */ F.baseTheme({
    ".cm-panel.cm-search": {
      padding: "2px 6px 4px",
      position: "relative",
      "& [name=close]": {
        position: "absolute",
        top: "0",
        right: "4px",
        backgroundColor: "inherit",
        border: "none",
        font: "inherit",
        padding: 0,
        margin: 0
      },
      "& input, & button, & label": {
        margin: ".2em .6em .2em 0"
      },
      "& input[type=checkbox]": {
        marginRight: ".2em"
      },
      "& label": {
        fontSize: "80%",
        whiteSpace: "pre"
      }
    },
    "&light .cm-searchMatch": { backgroundColor: "#ffff0054" },
    "&dark .cm-searchMatch": { backgroundColor: "#00ffff8a" },
    "&light .cm-searchMatch-selected": { backgroundColor: "#ff6a0054" },
    "&dark .cm-searchMatch-selected": { backgroundColor: "#ff00ff8a" }
  }), cy = [
    Rr,
    /* @__PURE__ */ er.lowest(ry),
    hy
  ];
  class cd {
    constructor(t, e, i) {
      this.state = t, this.pos = e, this.explicit = i, this.abortListeners = [];
    }
    tokenBefore(t) {
      let e = Lt(this.state).resolveInner(this.pos, -1);
      for (; e && t.indexOf(e.name) < 0; )
        e = e.parent;
      return e ? {
        from: e.from,
        to: this.pos,
        text: this.state.sliceDoc(e.from, this.pos),
        type: e.type
      } : null;
    }
    matchBefore(t) {
      let e = this.state.doc.lineAt(this.pos), i = Math.max(e.from, this.pos - 250), n = e.text.slice(i - e.from, this.pos - e.from), s = n.search(Od(t, !1));
      return s < 0 ? null : { from: i + s, to: this.pos, text: n.slice(s) };
    }
    get aborted() {
      return this.abortListeners == null;
    }
    addEventListener(t, e) {
      t == "abort" && this.abortListeners && this.abortListeners.push(e);
    }
  }
  function ud(r) {
    let t = Object.keys(r).join(""), e = /\w/.test(t);
    return e && (t = t.replace(/\w/g, "")), `[${e ? "\\w" : ""}${t.replace(/[^\w\s]/g, "\\$&")}]`;
  }
  function uy(r) {
    let t = /* @__PURE__ */ Object.create(null), e = /* @__PURE__ */ Object.create(null);
    for (let { label: n } of r) {
      t[n[0]] = !0;
      for (let s = 1; s < n.length; s++)
        e[n[s]] = !0;
    }
    let i = ud(t) + ud(e) + "*$";
    return [new RegExp("^" + i), new RegExp(i)];
  }
  function fd(r) {
    let t = r.map((n) => typeof n == "string" ? { label: n } : n), [e, i] = t.every((n) => /^\w+$/.test(n.label)) ? [/\w*$/, /\w+$/] : uy(t);
    return (n) => {
      let s = n.matchBefore(i);
      return s || n.explicit ? { from: s ? s.from : n.pos, options: t, validFor: e } : null;
    };
  }
  function fy(r, t) {
    return (e) => {
      for (let i = Lt(e.state).resolveInner(e.pos, -1); i; i = i.parent)
        if (r.indexOf(i.name) > -1)
          return null;
      return t(e);
    };
  }
  class dd {
    constructor(t, e, i) {
      this.completion = t, this.source = e, this.match = i;
    }
  }
  function Cr(r) {
    return r.selection.main.head;
  }
  function Od(r, t) {
    var e;
    let { source: i } = r, n = t && i[0] != "^", s = i[i.length - 1] != "$";
    return !n && !s ? r : new RegExp(`${n ? "^" : ""}(?:${i})${s ? "$" : ""}`, (e = r.flags) !== null && e !== void 0 ? e : r.ignoreCase ? "i" : "");
  }
  function dy(r, t, e, i) {
    return Object.assign(Object.assign({}, r.changeByRange((n) => {
      if (n == r.selection.main)
        return {
          changes: { from: e, to: i, insert: t },
          range: _.cursor(e + t.length)
        };
      let s = i - e;
      return !n.empty || s && r.sliceDoc(n.from - s, n.from) != r.sliceDoc(e, i) ? { range: n } : {
        changes: { from: n.from - s, to: n.from, insert: t },
        range: _.cursor(n.from - s + t.length)
      };
    })), { userEvent: "input.complete" });
  }
  function pd(r, t) {
    const e = t.completion.apply || t.completion.label;
    let i = t.source;
    typeof e == "string" ? r.dispatch(dy(r.state, e, i.from, i.to)) : e(r, t.completion, i.from, i.to);
  }
  const md = /* @__PURE__ */ new WeakMap();
  function Oy(r) {
    if (!Array.isArray(r))
      return r;
    let t = md.get(r);
    return t || md.set(r, t = fd(r)), t;
  }
  class py {
    constructor(t) {
      this.pattern = t, this.chars = [], this.folded = [], this.any = [], this.precise = [], this.byWord = [];
      for (let e = 0; e < t.length; ) {
        let i = vt(t, e), n = st(i);
        this.chars.push(i);
        let s = t.slice(e, e + n), o = s.toUpperCase();
        this.folded.push(vt(o == s ? s.toLowerCase() : o, 0)), e += n;
      }
      this.astral = t.length != this.chars.length;
    }
    match(t) {
      if (this.pattern.length == 0)
        return [0];
      if (t.length < this.pattern.length)
        return null;
      let { chars: e, folded: i, any: n, precise: s, byWord: o } = this;
      if (e.length == 1) {
        let U = vt(t, 0);
        return U == e[0] ? [0, 0, st(U)] : U == i[0] ? [-200, 0, st(U)] : null;
      }
      let a = t.indexOf(this.pattern);
      if (a == 0)
        return [0, 0, this.pattern.length];
      let l = e.length, u = 0;
      if (a < 0) {
        for (let U = 0, Y = Math.min(t.length, 200); U < Y && u < l; ) {
          let G = vt(t, U);
          (G == e[u] || G == i[u]) && (n[u++] = U), U += st(G);
        }
        if (u < l)
          return null;
      }
      let d = 0, O = 0, m = !1, Q = 0, b = -1, C = -1, A = /[a-z]/.test(t), M = !0;
      for (let U = 0, Y = Math.min(t.length, 200), G = 0; U < Y && O < l; ) {
        let L = vt(t, U);
        a < 0 && (d < l && L == e[d] && (s[d++] = U), Q < l && (L == e[Q] || L == i[Q] ? (Q == 0 && (b = U), C = U + 1, Q++) : Q = 0));
        let J, at = L < 255 ? L >= 48 && L <= 57 || L >= 97 && L <= 122 ? 2 : L >= 65 && L <= 90 ? 1 : 0 : (J = lt(L)) != J.toLowerCase() ? 1 : J != J.toUpperCase() ? 2 : 0;
        (!U || at == 1 && A || G == 0 && at != 0) && (e[O] == L || i[O] == L && (m = !0) ? o[O++] = U : o.length && (M = !1)), G = at, U += st(L);
      }
      return O == l && o[0] == 0 && M ? this.result(-100 + (m ? -200 : 0), o, t) : Q == l && b == 0 ? [-200 - t.length, 0, C] : a > -1 ? [-700 - t.length, a, a + this.pattern.length] : Q == l ? [-900 - t.length, b, C] : O == l ? this.result(-100 + (m ? -200 : 0) + -700 + (M ? 0 : -1100), o, t) : e.length == 2 ? null : this.result((n[0] ? -700 : 0) + -200 + -1100, n, t);
    }
    result(t, e, i) {
      let n = [t - i.length], s = 1;
      for (let o of e) {
        let a = o + (this.astral ? st(vt(i, o)) : 1);
        s > 1 && n[s - 1] == o ? n[s - 1] = a : (n[s++] = o, n[s++] = a);
      }
      return n;
    }
  }
  const Li = /* @__PURE__ */ V.define({
    combine(r) {
      return pi(r, {
        activateOnTyping: !0,
        selectOnOpen: !0,
        override: null,
        closeOnBlur: !0,
        maxRenderedOptions: 100,
        defaultKeymap: !0,
        optionClass: () => "",
        aboveCursor: !1,
        icons: !0,
        addToOptions: [],
        compareCompletions: (t, e) => t.label.localeCompare(e.label)
      }, {
        defaultKeymap: (t, e) => t && e,
        closeOnBlur: (t, e) => t && e,
        icons: (t, e) => t && e,
        optionClass: (t, e) => (i) => my(t(i), e(i)),
        addToOptions: (t, e) => t.concat(e)
      });
    }
  });
  function my(r, t) {
    return r ? t ? r + " " + t : r : t;
  }
  function gy(r) {
    let t = r.addToOptions.slice();
    return r.icons && t.push({
      render(e) {
        let i = document.createElement("div");
        return i.classList.add("cm-completionIcon"), e.type && i.classList.add(...e.type.split(/\s+/g).map((n) => "cm-completionIcon-" + n)), i.setAttribute("aria-hidden", "true"), i;
      },
      position: 20
    }), t.push({
      render(e, i, n) {
        let s = document.createElement("span");
        s.className = "cm-completionLabel";
        let { label: o } = e, a = 0;
        for (let l = 1; l < n.length; ) {
          let u = n[l++], d = n[l++];
          u > a && s.appendChild(document.createTextNode(o.slice(a, u)));
          let O = s.appendChild(document.createElement("span"));
          O.appendChild(document.createTextNode(o.slice(u, d))), O.className = "cm-completionMatchedText", a = d;
        }
        return a < o.length && s.appendChild(document.createTextNode(o.slice(a))), s;
      },
      position: 50
    }, {
      render(e) {
        if (!e.detail)
          return null;
        let i = document.createElement("span");
        return i.className = "cm-completionDetail", i.textContent = e.detail, i;
      },
      position: 80
    }), t.sort((e, i) => e.position - i.position).map((e) => e.render);
  }
  function gd(r, t, e) {
    if (r <= e)
      return { from: 0, to: r };
    if (t < 0 && (t = 0), t <= r >> 1) {
      let n = Math.floor(t / e);
      return { from: n * e, to: (n + 1) * e };
    }
    let i = Math.floor((r - t) / e);
    return { from: r - (i + 1) * e, to: r - i * e };
  }
  class vy {
    constructor(t, e) {
      this.view = t, this.stateField = e, this.info = null, this.placeInfo = {
        read: () => this.measureInfo(),
        write: (a) => this.positionInfo(a),
        key: this
      };
      let i = t.state.field(e), { options: n, selected: s } = i.open, o = t.state.facet(Li);
      this.optionContent = gy(o), this.optionClass = o.optionClass, this.range = gd(n.length, s, o.maxRenderedOptions), this.dom = document.createElement("div"), this.dom.className = "cm-tooltip-autocomplete", this.dom.addEventListener("mousedown", (a) => {
        for (let l = a.target, u; l && l != this.dom; l = l.parentNode)
          if (l.nodeName == "LI" && (u = /-(\d+)$/.exec(l.id)) && +u[1] < n.length) {
            pd(t, n[+u[1]]), a.preventDefault();
            return;
          }
      }), this.list = this.dom.appendChild(this.createListBox(n, i.id, this.range)), this.list.addEventListener("scroll", () => {
        this.info && this.view.requestMeasure(this.placeInfo);
      });
    }
    mount() {
      this.updateSel();
    }
    update(t) {
      t.state.field(this.stateField) != t.startState.field(this.stateField) && this.updateSel();
    }
    positioned() {
      this.info && this.view.requestMeasure(this.placeInfo);
    }
    updateSel() {
      let t = this.view.state.field(this.stateField), e = t.open;
      if ((e.selected < this.range.from || e.selected >= this.range.to) && (this.range = gd(e.options.length, e.selected, this.view.state.facet(Li).maxRenderedOptions), this.list.remove(), this.list = this.dom.appendChild(this.createListBox(e.options, t.id, this.range)), this.list.addEventListener("scroll", () => {
        this.info && this.view.requestMeasure(this.placeInfo);
      })), this.updateSelectedOption(e.selected)) {
        this.info && (this.info.remove(), this.info = null);
        let { completion: i } = e.options[e.selected], { info: n } = i;
        if (!n)
          return;
        let s = typeof n == "string" ? document.createTextNode(n) : n(i);
        if (!s)
          return;
        "then" in s ? s.then((o) => {
          o && this.view.state.field(this.stateField, !1) == t && this.addInfoPane(o);
        }).catch((o) => yi(this.view.state, o, "completion info")) : this.addInfoPane(s);
      }
    }
    addInfoPane(t) {
      let e = this.info = document.createElement("div");
      e.className = "cm-tooltip cm-completionInfo", e.appendChild(t), this.dom.appendChild(e), this.view.requestMeasure(this.placeInfo);
    }
    updateSelectedOption(t) {
      let e = null;
      for (let i = this.list.firstChild, n = this.range.from; i; i = i.nextSibling, n++)
        n == t ? i.hasAttribute("aria-selected") || (i.setAttribute("aria-selected", "true"), e = i) : i.hasAttribute("aria-selected") && i.removeAttribute("aria-selected");
      return e && yy(this.list, e), e;
    }
    measureInfo() {
      let t = this.dom.querySelector("[aria-selected]");
      if (!t || !this.info)
        return null;
      let e = this.dom.getBoundingClientRect(), i = this.info.getBoundingClientRect(), n = t.getBoundingClientRect();
      if (n.top > Math.min(innerHeight, e.bottom) - 10 || n.bottom < Math.max(0, e.top) + 10)
        return null;
      let s = Math.max(0, Math.min(n.top, innerHeight - i.height)) - e.top, o = this.view.textDirection == Vt.RTL, a = e.left, l = innerWidth - e.right;
      return o && a < Math.min(i.width, l) ? o = !1 : !o && l < Math.min(i.width, a) && (o = !0), { top: s, left: o };
    }
    positionInfo(t) {
      this.info && (this.info.style.top = (t ? t.top : -1e6) + "px", t && (this.info.classList.toggle("cm-completionInfo-left", t.left), this.info.classList.toggle("cm-completionInfo-right", !t.left)));
    }
    createListBox(t, e, i) {
      const n = document.createElement("ul");
      n.id = e, n.setAttribute("role", "listbox"), n.setAttribute("aria-expanded", "true"), n.setAttribute("aria-label", this.view.state.phrase("Completions"));
      for (let s = i.from; s < i.to; s++) {
        let { completion: o, match: a } = t[s];
        const l = n.appendChild(document.createElement("li"));
        l.id = e + "-" + s, l.setAttribute("role", "option");
        let u = this.optionClass(o);
        u && (l.className = u);
        for (let d of this.optionContent) {
          let O = d(o, this.view.state, a);
          O && l.appendChild(O);
        }
      }
      return i.from && n.classList.add("cm-completionListIncompleteTop"), i.to < t.length && n.classList.add("cm-completionListIncompleteBottom"), n;
    }
  }
  function Qy(r) {
    return (t) => new vy(t, r);
  }
  function yy(r, t) {
    let e = r.getBoundingClientRect(), i = t.getBoundingClientRect();
    i.top < e.top ? r.scrollTop -= e.top - i.top : i.bottom > e.bottom && (r.scrollTop += i.bottom - e.bottom);
  }
  function vd(r) {
    return (r.boost || 0) * 100 + (r.apply ? 10 : 0) + (r.info ? 5 : 0) + (r.type ? 1 : 0);
  }
  function by(r, t) {
    let e = [], i = 0;
    for (let a of r)
      if (a.hasResult())
        if (a.result.filter === !1) {
          let l = a.result.getMatch;
          for (let u of a.result.options) {
            let d = [1e9 - i++];
            if (l)
              for (let O of l(u))
                d.push(O);
            e.push(new dd(u, a, d));
          }
        } else {
          let l = new py(t.sliceDoc(a.from, a.to)), u;
          for (let d of a.result.options)
            (u = l.match(d.label)) && (d.boost != null && (u[0] += d.boost), e.push(new dd(d, a, u)));
        }
    let n = [], s = null, o = t.facet(Li).compareCompletions;
    for (let a of e.sort((l, u) => u.match[0] - l.match[0] || o(l.completion, u.completion)))
      !s || s.label != a.completion.label || s.detail != a.completion.detail || s.type != null && a.completion.type != null && s.type != a.completion.type || s.apply != a.completion.apply ? n.push(a) : vd(a.completion) > vd(s) && (n[n.length - 1] = a), s = a.completion;
    return n;
  }
  class vs {
    constructor(t, e, i, n, s) {
      this.options = t, this.attrs = e, this.tooltip = i, this.timestamp = n, this.selected = s;
    }
    setSelected(t, e) {
      return t == this.selected || t >= this.options.length ? this : new vs(this.options, Qd(e, t), this.tooltip, this.timestamp, t);
    }
    static build(t, e, i, n, s) {
      let o = by(t, e);
      if (!o.length)
        return null;
      let a = e.facet(Li).selectOnOpen ? 0 : -1;
      if (n && n.selected != a && n.selected != -1) {
        let l = n.options[n.selected].completion;
        for (let u = 0; u < o.length; u++)
          if (o[u].completion == l) {
            a = u;
            break;
          }
      }
      return new vs(o, Qd(i, a), {
        pos: t.reduce((l, u) => u.hasResult() ? Math.min(l, u.from) : l, 1e8),
        create: Qy(li),
        above: s.aboveCursor
      }, n ? n.timestamp : Date.now(), a);
    }
    map(t) {
      return new vs(this.options, this.attrs, Object.assign(Object.assign({}, this.tooltip), { pos: t.mapPos(this.tooltip.pos) }), this.timestamp, this.selected);
    }
  }
  class Io {
    constructor(t, e, i) {
      this.active = t, this.id = e, this.open = i;
    }
    static start() {
      return new Io(Sy, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
    }
    update(t) {
      let { state: e } = t, i = e.facet(Li), n = (i.override || e.languageDataAt("autocomplete", Cr(e)).map(Oy)).map((o) => (this.active.find((a) => a.source == o) || new Xe(o, this.active.some((a) => a.state != 0) ? 1 : 0)).update(t, i));
      n.length == this.active.length && n.every((o, a) => o == this.active[a]) && (n = this.active);
      let s = t.selection || n.some((o) => o.hasResult() && t.changes.touchesRange(o.from, o.to)) || !wy(n, this.active) ? vs.build(n, e, this.id, this.open, i) : this.open && t.docChanged ? this.open.map(t.changes) : this.open;
      !s && n.every((o) => o.state != 1) && n.some((o) => o.hasResult()) && (n = n.map((o) => o.hasResult() ? new Xe(o.source, 0) : o));
      for (let o of t.effects)
        o.is(bd) && (s = s && s.setSelected(o.value, this.id));
      return n == this.active && s == this.open ? this : new Io(n, this.id, s);
    }
    get tooltip() {
      return this.open ? this.open.tooltip : null;
    }
    get attrs() {
      return this.open ? this.open.attrs : xy;
    }
  }
  function wy(r, t) {
    if (r == t)
      return !0;
    for (let e = 0, i = 0; ; ) {
      for (; e < r.length && !r[e].hasResult; )
        e++;
      for (; i < t.length && !t[i].hasResult; )
        i++;
      let n = e == r.length, s = i == t.length;
      if (n || s)
        return n == s;
      if (r[e++].result != t[i++].result)
        return !1;
    }
  }
  const xy = {
    "aria-autocomplete": "list"
  };
  function Qd(r, t) {
    let e = {
      "aria-autocomplete": "list",
      "aria-haspopup": "listbox",
      "aria-controls": r
    };
    return t > -1 && (e["aria-activedescendant"] = r + "-" + t), e;
  }
  const Sy = [];
  function Bl(r) {
    return r.isUserEvent("input.type") ? "input" : r.isUserEvent("delete.backward") ? "delete" : null;
  }
  class Xe {
    constructor(t, e, i = -1) {
      this.source = t, this.state = e, this.explicitPos = i;
    }
    hasResult() {
      return !1;
    }
    update(t, e) {
      let i = Bl(t), n = this;
      i ? n = n.handleUserEvent(t, i, e) : t.docChanged ? n = n.handleChange(t) : t.selection && n.state != 0 && (n = new Xe(n.source, 0));
      for (let s of t.effects)
        if (s.is(Yl))
          n = new Xe(n.source, 1, s.value ? Cr(t.state) : -1);
        else if (s.is(Go))
          n = new Xe(n.source, 0);
        else if (s.is(yd))
          for (let o of s.value)
            o.source == n.source && (n = o);
      return n;
    }
    handleUserEvent(t, e, i) {
      return e == "delete" || !i.activateOnTyping ? this.map(t.changes) : new Xe(this.source, 1);
    }
    handleChange(t) {
      return t.changes.touchesRange(Cr(t.startState)) ? new Xe(this.source, 0) : this.map(t.changes);
    }
    map(t) {
      return t.empty || this.explicitPos < 0 ? this : new Xe(this.source, this.state, t.mapPos(this.explicitPos));
    }
  }
  class Qs extends Xe {
    constructor(t, e, i, n, s) {
      super(t, 2, e), this.result = i, this.from = n, this.to = s;
    }
    hasResult() {
      return !0;
    }
    handleUserEvent(t, e, i) {
      var n;
      let s = t.changes.mapPos(this.from), o = t.changes.mapPos(this.to, 1), a = Cr(t.state);
      if ((this.explicitPos < 0 ? a <= s : a < this.from) || a > o || e == "delete" && Cr(t.startState) == this.from)
        return new Xe(this.source, e == "input" && i.activateOnTyping ? 1 : 0);
      let l = this.explicitPos < 0 ? -1 : t.changes.mapPos(this.explicitPos), u;
      return ky(this.result.validFor, t.state, s, o) ? new Qs(this.source, l, this.result, s, o) : this.result.update && (u = this.result.update(this.result, s, o, new cd(t.state, a, l >= 0))) ? new Qs(this.source, l, u, u.from, (n = u.to) !== null && n !== void 0 ? n : Cr(t.state)) : new Xe(this.source, 1, l);
    }
    handleChange(t) {
      return t.changes.touchesRange(this.from, this.to) ? new Xe(this.source, 0) : this.map(t.changes);
    }
    map(t) {
      return t.empty ? this : new Qs(this.source, this.explicitPos < 0 ? -1 : t.mapPos(this.explicitPos), this.result, t.mapPos(this.from), t.mapPos(this.to, 1));
    }
  }
  function ky(r, t, e, i) {
    if (!r)
      return !1;
    let n = t.sliceDoc(e, i);
    return typeof r == "function" ? r(n, e, i, t) : Od(r, !0).test(n);
  }
  const Yl = /* @__PURE__ */ ct.define(), Go = /* @__PURE__ */ ct.define(), yd = /* @__PURE__ */ ct.define({
    map(r, t) {
      return r.map((e) => e.map(t));
    }
  }), bd = /* @__PURE__ */ ct.define(), li = /* @__PURE__ */ Yt.define({
    create() {
      return Io.start();
    },
    update(r, t) {
      return r.update(t);
    },
    provide: (r) => [
      gu.from(r, (t) => t.tooltip),
      F.contentAttributes.from(r, (t) => t.attrs)
    ]
  }), wd = 75;
  function Vo(r, t = "option") {
    return (e) => {
      let i = e.state.field(li, !1);
      if (!i || !i.open || Date.now() - i.open.timestamp < wd)
        return !1;
      let n = 1, s;
      t == "page" && (s = Og(e, i.open.tooltip)) && (n = Math.max(2, Math.floor(s.dom.offsetHeight / s.dom.querySelector("li").offsetHeight) - 1));
      let { length: o } = i.open.options, a = i.open.selected > -1 ? i.open.selected + n * (r ? 1 : -1) : r ? 0 : o - 1;
      return a < 0 ? a = t == "page" ? 0 : o - 1 : a >= o && (a = t == "page" ? o - 1 : 0), e.dispatch({ effects: bd.of(a) }), !0;
    };
  }
  const $y = (r) => {
    let t = r.state.field(li, !1);
    return r.state.readOnly || !t || !t.open || Date.now() - t.open.timestamp < wd || t.open.selected < 0 ? !1 : (pd(r, t.open.options[t.open.selected]), !0);
  }, Ty = (r) => r.state.field(li, !1) ? (r.dispatch({ effects: Yl.of(!0) }), !0) : !1, Py = (r) => {
    let t = r.state.field(li, !1);
    return !t || !t.active.some((e) => e.state != 0) ? !1 : (r.dispatch({ effects: Go.of(null) }), !0);
  };
  class Ry {
    constructor(t, e) {
      this.active = t, this.context = e, this.time = Date.now(), this.updates = [], this.done = void 0;
    }
  }
  const xd = 50, Cy = 50, _y = 1e3, Ay = /* @__PURE__ */ ye.fromClass(class {
    constructor(r) {
      this.view = r, this.debounceUpdate = -1, this.running = [], this.debounceAccept = -1, this.composing = 0;
      for (let t of r.state.field(li).active)
        t.state == 1 && this.startQuery(t);
    }
    update(r) {
      let t = r.state.field(li);
      if (!r.selectionSet && !r.docChanged && r.startState.field(li) == t)
        return;
      let e = r.transactions.some((i) => (i.selection || i.docChanged) && !Bl(i));
      for (let i = 0; i < this.running.length; i++) {
        let n = this.running[i];
        if (e || n.updates.length + r.transactions.length > Cy && Date.now() - n.time > _y) {
          for (let s of n.context.abortListeners)
            try {
              s();
            } catch (o) {
              yi(this.view.state, o);
            }
          n.context.abortListeners = null, this.running.splice(i--, 1);
        } else
          n.updates.push(...r.transactions);
      }
      if (this.debounceUpdate > -1 && clearTimeout(this.debounceUpdate), this.debounceUpdate = t.active.some((i) => i.state == 1 && !this.running.some((n) => n.active.source == i.source)) ? setTimeout(() => this.startUpdate(), xd) : -1, this.composing != 0)
        for (let i of r.transactions)
          Bl(i) == "input" ? this.composing = 2 : this.composing == 2 && i.selection && (this.composing = 3);
    }
    startUpdate() {
      this.debounceUpdate = -1;
      let { state: r } = this.view, t = r.field(li);
      for (let e of t.active)
        e.state == 1 && !this.running.some((i) => i.active.source == e.source) && this.startQuery(e);
    }
    startQuery(r) {
      let { state: t } = this.view, e = Cr(t), i = new cd(t, e, r.explicitPos == e), n = new Ry(r, i);
      this.running.push(n), Promise.resolve(r.source(i)).then((s) => {
        n.context.aborted || (n.done = s || null, this.scheduleAccept());
      }, (s) => {
        this.view.dispatch({ effects: Go.of(null) }), yi(this.view.state, s);
      });
    }
    scheduleAccept() {
      this.running.every((r) => r.done !== void 0) ? this.accept() : this.debounceAccept < 0 && (this.debounceAccept = setTimeout(() => this.accept(), xd));
    }
    accept() {
      var r;
      this.debounceAccept > -1 && clearTimeout(this.debounceAccept), this.debounceAccept = -1;
      let t = [], e = this.view.state.facet(Li);
      for (let i = 0; i < this.running.length; i++) {
        let n = this.running[i];
        if (n.done === void 0)
          continue;
        if (this.running.splice(i--, 1), n.done) {
          let o = new Qs(n.active.source, n.active.explicitPos, n.done, n.done.from, (r = n.done.to) !== null && r !== void 0 ? r : Cr(n.updates.length ? n.updates[0].startState : this.view.state));
          for (let a of n.updates)
            o = o.update(a, e);
          if (o.hasResult()) {
            t.push(o);
            continue;
          }
        }
        let s = this.view.state.field(li).active.find((o) => o.source == n.active.source);
        if (s && s.state == 1)
          if (n.done == null) {
            let o = new Xe(n.active.source, 0);
            for (let a of n.updates)
              o = o.update(a, e);
            o.state != 1 && t.push(o);
          } else
            this.startQuery(s);
      }
      t.length && this.view.dispatch({ effects: yd.of(t) });
    }
  }, {
    eventHandlers: {
      blur() {
        let r = this.view.state.field(li, !1);
        r && r.tooltip && this.view.state.facet(Li).closeOnBlur && this.view.dispatch({ effects: Go.of(null) });
      },
      compositionstart() {
        this.composing = 1;
      },
      compositionend() {
        this.composing == 3 && setTimeout(() => this.view.dispatch({ effects: Yl.of(!1) }), 20), this.composing = 0;
      }
    }
  }), Sd = /* @__PURE__ */ F.baseTheme({
    ".cm-tooltip.cm-tooltip-autocomplete": {
      "& > ul": {
        fontFamily: "monospace",
        whiteSpace: "nowrap",
        overflow: "hidden auto",
        maxWidth_fallback: "700px",
        maxWidth: "min(700px, 95vw)",
        minWidth: "250px",
        maxHeight: "10em",
        listStyle: "none",
        margin: 0,
        padding: 0,
        "& > li": {
          overflowX: "hidden",
          textOverflow: "ellipsis",
          cursor: "pointer",
          padding: "1px 3px",
          lineHeight: 1.2
        }
      }
    },
    "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
      background: "#17c",
      color: "white"
    },
    "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
      background: "#347",
      color: "white"
    },
    ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
      content: '"···"',
      opacity: 0.5,
      display: "block",
      textAlign: "center"
    },
    ".cm-tooltip.cm-completionInfo": {
      position: "absolute",
      padding: "3px 9px",
      width: "max-content",
      maxWidth: "300px"
    },
    ".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
    ".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
    "&light .cm-snippetField": { backgroundColor: "#00000022" },
    "&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
    ".cm-snippetFieldPosition": {
      verticalAlign: "text-top",
      width: 0,
      height: "1.15em",
      margin: "0 -0.7px -.7em",
      borderLeft: "1.4px dotted #888"
    },
    ".cm-completionMatchedText": {
      textDecoration: "underline"
    },
    ".cm-completionDetail": {
      marginLeft: "0.5em",
      fontStyle: "italic"
    },
    ".cm-completionIcon": {
      fontSize: "90%",
      width: ".8em",
      display: "inline-block",
      textAlign: "center",
      paddingRight: ".6em",
      opacity: "0.6"
    },
    ".cm-completionIcon-function, .cm-completionIcon-method": {
      "&:after": { content: "'ƒ'" }
    },
    ".cm-completionIcon-class": {
      "&:after": { content: "'○'" }
    },
    ".cm-completionIcon-interface": {
      "&:after": { content: "'◌'" }
    },
    ".cm-completionIcon-variable": {
      "&:after": { content: "'𝑥'" }
    },
    ".cm-completionIcon-constant": {
      "&:after": { content: "'𝐶'" }
    },
    ".cm-completionIcon-type": {
      "&:after": { content: "'𝑡'" }
    },
    ".cm-completionIcon-enum": {
      "&:after": { content: "'∪'" }
    },
    ".cm-completionIcon-property": {
      "&:after": { content: "'□'" }
    },
    ".cm-completionIcon-keyword": {
      "&:after": { content: "'🔑︎'" }
    },
    ".cm-completionIcon-namespace": {
      "&:after": { content: "'▢'" }
    },
    ".cm-completionIcon-text": {
      "&:after": { content: "'abc'", fontSize: "50%", verticalAlign: "middle" }
    }
  });
  class Wy {
    constructor(t, e, i, n) {
      this.field = t, this.line = e, this.from = i, this.to = n;
    }
  }
  class Fl {
    constructor(t, e, i) {
      this.field = t, this.from = e, this.to = i;
    }
    map(t) {
      let e = t.mapPos(this.from, -1, nt.TrackDel), i = t.mapPos(this.to, 1, nt.TrackDel);
      return e == null || i == null ? null : new Fl(this.field, e, i);
    }
  }
  class Hl {
    constructor(t, e) {
      this.lines = t, this.fieldPositions = e;
    }
    instantiate(t, e) {
      let i = [], n = [e], s = t.doc.lineAt(e), o = /^\s*/.exec(s.text)[0];
      for (let l of this.lines) {
        if (i.length) {
          let u = o, d = /^\t*/.exec(l)[0].length;
          for (let O = 0; O < d; O++)
            u += t.facet(cs);
          n.push(e + u.length - d), l = u + l.slice(d);
        }
        i.push(l), e += l.length + 1;
      }
      let a = this.fieldPositions.map((l) => new Fl(l.field, n[l.line] + l.from, n[l.line] + l.to));
      return { text: i, ranges: a };
    }
    static parse(t) {
      let e = [], i = [], n = [], s;
      for (let o of t.split(/\r\n?|\n/)) {
        for (; s = /[#$]\{(?:(\d+)(?::([^}]*))?|([^}]*))\}/.exec(o); ) {
          let a = s[1] ? +s[1] : null, l = s[2] || s[3] || "", u = -1;
          for (let d = 0; d < e.length; d++)
            (a != null ? e[d].seq == a : l && e[d].name == l) && (u = d);
          if (u < 0) {
            let d = 0;
            for (; d < e.length && (a == null || e[d].seq != null && e[d].seq < a); )
              d++;
            e.splice(d, 0, { seq: a, name: l }), u = d;
            for (let O of n)
              O.field >= u && O.field++;
          }
          n.push(new Wy(u, i.length, s.index, s.index + l.length)), o = o.slice(0, s.index) + l + o.slice(s.index + s[0].length);
        }
        for (let a; a = /([$#])\\{/.exec(o); ) {
          o = o.slice(0, a.index) + a[1] + "{" + o.slice(a.index + a[0].length);
          for (let l of n)
            l.line == i.length && l.from > a.index && (l.from--, l.to--);
        }
        i.push(o);
      }
      return new Hl(i, n);
    }
  }
  let Xy = /* @__PURE__ */ it.widget({ widget: /* @__PURE__ */ new class extends wr {
    toDOM() {
      let r = document.createElement("span");
      return r.className = "cm-snippetFieldPosition", r;
    }
    ignoreEvent() {
      return !1;
    }
  }() }), qy = /* @__PURE__ */ it.mark({ class: "cm-snippetField" });
  class Rn {
    constructor(t, e) {
      this.ranges = t, this.active = e, this.deco = it.set(t.map((i) => (i.from == i.to ? Xy : qy).range(i.from, i.to)));
    }
    map(t) {
      let e = [];
      for (let i of this.ranges) {
        let n = i.map(t);
        if (!n)
          return null;
        e.push(n);
      }
      return new Rn(e, this.active);
    }
    selectionInsideField(t) {
      return t.ranges.every((e) => this.ranges.some((i) => i.field == this.active && i.from <= e.from && i.to >= e.to));
    }
  }
  const ys = /* @__PURE__ */ ct.define({
    map(r, t) {
      return r && r.map(t);
    }
  }), My = /* @__PURE__ */ ct.define(), bs = /* @__PURE__ */ Yt.define({
    create() {
      return null;
    },
    update(r, t) {
      for (let e of t.effects) {
        if (e.is(ys))
          return e.value;
        if (e.is(My) && r)
          return new Rn(r.ranges, e.value);
      }
      return r && t.docChanged && (r = r.map(t.changes)), r && t.selection && !r.selectionInsideField(t.selection) && (r = null), r;
    },
    provide: (r) => F.decorations.from(r, (t) => t ? t.deco : it.none)
  });
  function Jl(r, t) {
    return _.create(r.filter((e) => e.field == t).map((e) => _.range(e.from, e.to)));
  }
  function Dy(r) {
    let t = Hl.parse(r);
    return (e, i, n, s) => {
      let { text: o, ranges: a } = t.instantiate(e.state, n), l = {
        changes: { from: n, to: s, insert: c.of(o) },
        scrollIntoView: !0
      };
      if (a.length && (l.selection = Jl(a, 0)), a.length > 1) {
        let u = new Rn(a, 0), d = l.effects = [ys.of(u)];
        e.state.field(bs, !1) === void 0 && d.push(ct.appendConfig.of([bs, Ny, Iy, Sd]));
      }
      e.dispatch(e.state.update(l));
    };
  }
  function kd(r) {
    return ({ state: t, dispatch: e }) => {
      let i = t.field(bs, !1);
      if (!i || r < 0 && i.active == 0)
        return !1;
      let n = i.active + r, s = r > 0 && !i.ranges.some((o) => o.field == n + r);
      return e(t.update({
        selection: Jl(i.ranges, n),
        effects: ys.of(s ? null : new Rn(i.ranges, n))
      })), !0;
    };
  }
  const Ey = ({ state: r, dispatch: t }) => r.field(bs, !1) ? (t(r.update({ effects: ys.of(null) })), !0) : !1, Zy = /* @__PURE__ */ kd(1), jy = /* @__PURE__ */ kd(-1), zy = [
    { key: "Tab", run: Zy, shift: jy },
    { key: "Escape", run: Ey }
  ], $d = /* @__PURE__ */ V.define({
    combine(r) {
      return r.length ? r[0] : zy;
    }
  }), Ny = /* @__PURE__ */ er.highest(/* @__PURE__ */ ao.compute([$d], (r) => r.facet($d)));
  function wi(r, t) {
    return Object.assign(Object.assign({}, t), { apply: Dy(r) });
  }
  const Iy = /* @__PURE__ */ F.domEventHandlers({
    mousedown(r, t) {
      let e = t.state.field(bs, !1), i;
      if (!e || (i = t.posAtCoords({ x: r.clientX, y: r.clientY })) == null)
        return !1;
      let n = e.ranges.find((s) => s.from <= i && s.to >= i);
      return !n || n.field == e.active ? !1 : (t.dispatch({
        selection: Jl(e.ranges, n.field),
        effects: ys.of(e.ranges.some((s) => s.field > n.field) ? new Rn(e.ranges, n.field) : null)
      }), !0);
    }
  }), Lo = {
    brackets: ["(", "[", "{", "'", '"'],
    before: ")]}:;>"
  }, rn = /* @__PURE__ */ ct.define({
    map(r, t) {
      let e = t.mapPos(r, -1, nt.TrackAfter);
      return e ?? void 0;
    }
  }), Kl = /* @__PURE__ */ ct.define({
    map(r, t) {
      return t.mapPos(r);
    }
  }), th = /* @__PURE__ */ new class extends Ee {
  }();
  th.startSide = 1, th.endSide = -1;
  const Td = /* @__PURE__ */ Yt.define({
    create() {
      return rt.empty;
    },
    update(r, t) {
      if (t.selection) {
        let e = t.state.doc.lineAt(t.selection.main.head).from, i = t.startState.doc.lineAt(t.startState.selection.main.head).from;
        e != t.changes.mapPos(i, -1) && (r = rt.empty);
      }
      r = r.map(t.changes);
      for (let e of t.effects)
        e.is(rn) ? r = r.update({ add: [th.range(e.value, e.value + 1)] }) : e.is(Kl) && (r = r.update({ filter: (i) => i != e.value }));
      return r;
    }
  });
  function Gy() {
    return [Ly, Td];
  }
  const eh = "()[]{}<>";
  function Pd(r) {
    for (let t = 0; t < eh.length; t += 2)
      if (eh.charCodeAt(t) == r)
        return eh.charAt(t + 1);
    return lt(r < 128 ? r : r + 1);
  }
  function Rd(r, t) {
    return r.languageDataAt("closeBrackets", t)[0] || Lo;
  }
  const Vy = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), Ly = /* @__PURE__ */ F.inputHandler.of((r, t, e, i) => {
    if ((Vy ? r.composing : r.compositionStarted) || r.state.readOnly)
      return !1;
    let n = r.state.selection.main;
    if (i.length > 2 || i.length == 2 && st(vt(i, 0)) == 1 || t != n.from || e != n.to)
      return !1;
    let s = Yy(r.state, i);
    return s ? (r.dispatch(s), !0) : !1;
  }), Uy = ({ state: r, dispatch: t }) => {
    if (r.readOnly)
      return !1;
    let e = Rd(r, r.selection.main.head).brackets || Lo.brackets, i = null, n = r.changeByRange((s) => {
      if (s.empty) {
        let o = Fy(r.doc, s.head);
        for (let a of e)
          if (a == o && Uo(r.doc, s.head) == Pd(vt(a, 0)))
            return {
              changes: { from: s.head - a.length, to: s.head + a.length },
              range: _.cursor(s.head - a.length),
              userEvent: "delete.backward"
            };
      }
      return { range: i = s };
    });
    return i || t(r.update(n, { scrollIntoView: !0 })), !i;
  }, By = [
    { key: "Backspace", run: Uy }
  ];
  function Yy(r, t) {
    let e = Rd(r, r.selection.main.head), i = e.brackets || Lo.brackets;
    for (let n of i) {
      let s = Pd(vt(n, 0));
      if (t == n)
        return s == n ? Ky(r, n, i.indexOf(n + n + n) > -1) : Hy(r, n, s, e.before || Lo.before);
      if (t == s && Cd(r, r.selection.main.from))
        return Jy(r, n, s);
    }
    return null;
  }
  function Cd(r, t) {
    let e = !1;
    return r.field(Td).between(0, r.doc.length, (i) => {
      i == t && (e = !0);
    }), e;
  }
  function Uo(r, t) {
    let e = r.sliceString(t, t + 2);
    return e.slice(0, st(vt(e, 0)));
  }
  function Fy(r, t) {
    let e = r.sliceString(t - 2, t);
    return st(vt(e, 0)) == e.length ? e : e.slice(1);
  }
  function Hy(r, t, e, i) {
    let n = null, s = r.changeByRange((o) => {
      if (!o.empty)
        return {
          changes: [{ insert: t, from: o.from }, { insert: e, from: o.to }],
          effects: rn.of(o.to + t.length),
          range: _.range(o.anchor + t.length, o.head + t.length)
        };
      let a = Uo(r.doc, o.head);
      return !a || /\s/.test(a) || i.indexOf(a) > -1 ? {
        changes: { insert: t + e, from: o.head },
        effects: rn.of(o.head + t.length),
        range: _.cursor(o.head + t.length)
      } : { range: n = o };
    });
    return n ? null : r.update(s, {
      scrollIntoView: !0,
      userEvent: "input.type"
    });
  }
  function Jy(r, t, e) {
    let i = null, n = r.selection.ranges.map((s) => s.empty && Uo(r.doc, s.head) == e ? _.cursor(s.head + e.length) : i = s);
    return i ? null : r.update({
      selection: _.create(n, r.selection.mainIndex),
      scrollIntoView: !0,
      effects: r.selection.ranges.map(({ from: s }) => Kl.of(s))
    });
  }
  function Ky(r, t, e) {
    let i = null, n = r.changeByRange((s) => {
      if (!s.empty)
        return {
          changes: [{ insert: t, from: s.from }, { insert: t, from: s.to }],
          effects: rn.of(s.to + t.length),
          range: _.range(s.anchor + t.length, s.head + t.length)
        };
      let o = s.head, a = Uo(r.doc, o);
      if (a == t) {
        if (_d(r, o))
          return {
            changes: { insert: t + t, from: o },
            effects: rn.of(o + t.length),
            range: _.cursor(o + t.length)
          };
        if (Cd(r, o)) {
          let l = e && r.sliceDoc(o, o + t.length * 3) == t + t + t;
          return {
            range: _.cursor(o + t.length * (l ? 3 : 1)),
            effects: Kl.of(o)
          };
        }
      } else {
        if (e && r.sliceDoc(o - 2 * t.length, o) == t + t && _d(r, o - 2 * t.length))
          return {
            changes: { insert: t + t + t + t, from: o },
            effects: rn.of(o + t.length),
            range: _.cursor(o + t.length)
          };
        if (r.charCategorizer(o)(a) != D.Word) {
          let l = r.sliceDoc(o - 1, o);
          if (l != t && r.charCategorizer(o)(l) != D.Word && !t0(r, o, t))
            return {
              changes: { insert: t + t, from: o },
              effects: rn.of(o + t.length),
              range: _.cursor(o + t.length)
            };
        }
      }
      return { range: i = s };
    });
    return i ? null : r.update(n, {
      scrollIntoView: !0,
      userEvent: "input.type"
    });
  }
  function _d(r, t) {
    let e = Lt(r).resolveInner(t + 1);
    return e.parent && e.from == t;
  }
  function t0(r, t, e) {
    let i = Lt(r).resolveInner(t, -1);
    for (let n = 0; n < 5; n++) {
      if (r.sliceDoc(i.from, i.from + e.length) == e) {
        let o = i.firstChild;
        for (; o && o.from == i.from && o.to - o.from > e.length; ) {
          if (r.sliceDoc(o.to - e.length, o.to) == e)
            return !1;
          o = o.firstChild;
        }
        return !0;
      }
      let s = i.to == t && i.parent;
      if (!s)
        break;
      i = s;
    }
    return !1;
  }
  function e0(r = {}) {
    return [
      li,
      Li.of(r),
      Ay,
      i0,
      Sd
    ];
  }
  const Ad = [
    { key: "Ctrl-Space", run: Ty },
    { key: "Escape", run: Py },
    { key: "ArrowDown", run: /* @__PURE__ */ Vo(!0) },
    { key: "ArrowUp", run: /* @__PURE__ */ Vo(!1) },
    { key: "PageDown", run: /* @__PURE__ */ Vo(!0, "page") },
    { key: "PageUp", run: /* @__PURE__ */ Vo(!1, "page") },
    { key: "Enter", run: $y }
  ], i0 = /* @__PURE__ */ er.highest(/* @__PURE__ */ ao.computeN([Li], (r) => r.facet(Li).defaultKeymap ? [Ad] : []));
  class Bo {
    constructor(t, e, i, n, s, o, a, l, u, d = 0, O) {
      this.p = t, this.stack = e, this.state = i, this.reducePos = n, this.pos = s, this.score = o, this.buffer = a, this.bufferBase = l, this.curContext = u, this.lookAhead = d, this.parent = O;
    }
    toString() {
      return `[${this.stack.filter((t, e) => e % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
    }
    static start(t, e, i = 0) {
      let n = t.parser.context;
      return new Bo(t, [], e, i, i, 0, [], 0, n ? new Wd(n, n.start) : null, 0, null);
    }
    get context() {
      return this.curContext ? this.curContext.context : null;
    }
    pushState(t, e) {
      this.stack.push(this.state, e, this.bufferBase + this.buffer.length), this.state = t;
    }
    reduce(t) {
      let e = t >> 19, i = t & 65535, { parser: n } = this.p, s = n.dynamicPrecedence(i);
      if (s && (this.score += s), e == 0) {
        this.pushState(n.getGoto(this.state, i, !0), this.reducePos), i < n.minRepeatTerm && this.storeNode(i, this.reducePos, this.reducePos, 4, !0), this.reduceContext(i, this.reducePos);
        return;
      }
      let o = this.stack.length - (e - 1) * 3 - (t & 262144 ? 6 : 0), a = this.stack[o - 2], l = this.stack[o - 1], u = this.bufferBase + this.buffer.length - l;
      if (i < n.minRepeatTerm || t & 131072) {
        let d = n.stateFlag(this.state, 1) ? this.pos : this.reducePos;
        this.storeNode(i, a, d, u + 4, !0);
      }
      if (t & 262144)
        this.state = this.stack[o];
      else {
        let d = this.stack[o - 3];
        this.state = n.getGoto(d, i, !0);
      }
      for (; this.stack.length > o; )
        this.stack.pop();
      this.reduceContext(i, a);
    }
    storeNode(t, e, i, n = 4, s = !1) {
      if (t == 0 && (!this.stack.length || this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)) {
        let o = this, a = this.buffer.length;
        if (a == 0 && o.parent && (a = o.bufferBase - o.parent.bufferBase, o = o.parent), a > 0 && o.buffer[a - 4] == 0 && o.buffer[a - 1] > -1) {
          if (e == i)
            return;
          if (o.buffer[a - 2] >= e) {
            o.buffer[a - 2] = i;
            return;
          }
        }
      }
      if (!s || this.pos == i)
        this.buffer.push(t, e, i, n);
      else {
        let o = this.buffer.length;
        if (o > 0 && this.buffer[o - 4] != 0)
          for (; o > 0 && this.buffer[o - 2] > i; )
            this.buffer[o] = this.buffer[o - 4], this.buffer[o + 1] = this.buffer[o - 3], this.buffer[o + 2] = this.buffer[o - 2], this.buffer[o + 3] = this.buffer[o - 1], o -= 4, n > 4 && (n -= 4);
        this.buffer[o] = t, this.buffer[o + 1] = e, this.buffer[o + 2] = i, this.buffer[o + 3] = n;
      }
    }
    shift(t, e, i) {
      let n = this.pos;
      if (t & 131072)
        this.pushState(t & 65535, this.pos);
      else if (t & 262144)
        this.pos = i, this.shiftContext(e, n), e <= this.p.parser.maxNode && this.buffer.push(e, n, i, 4);
      else {
        let s = t, { parser: o } = this.p;
        (i > this.pos || e <= o.maxNode) && (this.pos = i, o.stateFlag(s, 1) || (this.reducePos = i)), this.pushState(s, n), this.shiftContext(e, n), e <= o.maxNode && this.buffer.push(e, n, i, 4);
      }
    }
    apply(t, e, i) {
      t & 65536 ? this.reduce(t) : this.shift(t, e, i);
    }
    useNode(t, e) {
      let i = this.p.reused.length - 1;
      (i < 0 || this.p.reused[i] != t) && (this.p.reused.push(t), i++);
      let n = this.pos;
      this.reducePos = this.pos = n + t.length, this.pushState(e, n), this.buffer.push(i, n, this.reducePos, -1), this.curContext && this.updateContext(this.curContext.tracker.reuse(this.curContext.context, t, this, this.p.stream.reset(this.pos - t.length)));
    }
    split() {
      let t = this, e = t.buffer.length;
      for (; e > 0 && t.buffer[e - 2] > t.reducePos; )
        e -= 4;
      let i = t.buffer.slice(e), n = t.bufferBase + e;
      for (; t && n == t.bufferBase; )
        t = t.parent;
      return new Bo(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, i, n, this.curContext, this.lookAhead, t);
    }
    recoverByDelete(t, e) {
      let i = t <= this.p.parser.maxNode;
      i && this.storeNode(t, this.pos, e, 4), this.storeNode(0, this.pos, e, i ? 8 : 4), this.pos = this.reducePos = e, this.score -= 190;
    }
    canShift(t) {
      for (let e = new r0(this); ; ) {
        let i = this.p.parser.stateSlot(e.state, 4) || this.p.parser.hasAction(e.state, t);
        if (!(i & 65536))
          return !0;
        if (i == 0)
          return !1;
        e.reduce(i);
      }
    }
    recoverByInsert(t) {
      if (this.stack.length >= 300)
        return [];
      let e = this.p.parser.nextStates(this.state);
      if (e.length > 8 || this.stack.length >= 120) {
        let n = [];
        for (let s = 0, o; s < e.length; s += 2)
          (o = e[s + 1]) != this.state && this.p.parser.hasAction(o, t) && n.push(e[s], o);
        if (this.stack.length < 120)
          for (let s = 0; n.length < 8 && s < e.length; s += 2) {
            let o = e[s + 1];
            n.some((a, l) => l & 1 && a == o) || n.push(e[s], o);
          }
        e = n;
      }
      let i = [];
      for (let n = 0; n < e.length && i.length < 4; n += 2) {
        let s = e[n + 1];
        if (s == this.state)
          continue;
        let o = this.split();
        o.pushState(s, this.pos), o.storeNode(0, o.pos, o.pos, 4, !0), o.shiftContext(e[n], this.pos), o.score -= 200, i.push(o);
      }
      return i;
    }
    forceReduce() {
      let t = this.p.parser.stateSlot(this.state, 5);
      if (!(t & 65536))
        return !1;
      let { parser: e } = this.p;
      if (!e.validAction(this.state, t)) {
        let i = t >> 19, n = t & 65535, s = this.stack.length - i * 3;
        if (s < 0 || e.getGoto(this.stack[s], n, !1) < 0)
          return !1;
        this.storeNode(0, this.reducePos, this.reducePos, 4, !0), this.score -= 100;
      }
      return this.reducePos = this.pos, this.reduce(t), !0;
    }
    forceAll() {
      for (; !this.p.parser.stateFlag(this.state, 2); )
        if (!this.forceReduce()) {
          this.storeNode(0, this.pos, this.pos, 4, !0);
          break;
        }
      return this;
    }
    get deadEnd() {
      if (this.stack.length != 3)
        return !1;
      let { parser: t } = this.p;
      return t.data[t.stateSlot(this.state, 1)] == 65535 && !t.stateSlot(this.state, 4);
    }
    restart() {
      this.state = this.stack[0], this.stack.length = 0;
    }
    sameState(t) {
      if (this.state != t.state || this.stack.length != t.stack.length)
        return !1;
      for (let e = 0; e < this.stack.length; e += 3)
        if (this.stack[e] != t.stack[e])
          return !1;
      return !0;
    }
    get parser() {
      return this.p.parser;
    }
    dialectEnabled(t) {
      return this.p.parser.dialect.flags[t];
    }
    shiftContext(t, e) {
      this.curContext && this.updateContext(this.curContext.tracker.shift(this.curContext.context, t, this, this.p.stream.reset(e)));
    }
    reduceContext(t, e) {
      this.curContext && this.updateContext(this.curContext.tracker.reduce(this.curContext.context, t, this, this.p.stream.reset(e)));
    }
    emitContext() {
      let t = this.buffer.length - 1;
      (t < 0 || this.buffer[t] != -3) && this.buffer.push(this.curContext.hash, this.reducePos, this.reducePos, -3);
    }
    emitLookAhead() {
      let t = this.buffer.length - 1;
      (t < 0 || this.buffer[t] != -4) && this.buffer.push(this.lookAhead, this.reducePos, this.reducePos, -4);
    }
    updateContext(t) {
      if (t != this.curContext.context) {
        let e = new Wd(this.curContext.tracker, t);
        e.hash != this.curContext.hash && this.emitContext(), this.curContext = e;
      }
    }
    setLookAhead(t) {
      t > this.lookAhead && (this.emitLookAhead(), this.lookAhead = t);
    }
    close() {
      this.curContext && this.curContext.tracker.strict && this.emitContext(), this.lookAhead > 0 && this.emitLookAhead();
    }
  }
  class Wd {
    constructor(t, e) {
      this.tracker = t, this.context = e, this.hash = t.strict ? t.hash(e) : 0;
    }
  }
  var Xd;
  (function(r) {
    r[r.Insert = 200] = "Insert", r[r.Delete = 190] = "Delete", r[r.Reduce = 100] = "Reduce", r[r.MaxNext = 4] = "MaxNext", r[r.MaxInsertStackDepth = 300] = "MaxInsertStackDepth", r[r.DampenInsertStackDepth = 120] = "DampenInsertStackDepth";
  })(Xd || (Xd = {}));
  class r0 {
    constructor(t) {
      this.start = t, this.state = t.state, this.stack = t.stack, this.base = this.stack.length;
    }
    reduce(t) {
      let e = t & 65535, i = t >> 19;
      i == 0 ? (this.stack == this.start.stack && (this.stack = this.stack.slice()), this.stack.push(this.state, 0, 0), this.base += 3) : this.base -= (i - 1) * 3;
      let n = this.start.p.parser.getGoto(this.stack[this.base - 3], e, !0);
      this.state = n;
    }
  }
  class Yo {
    constructor(t, e, i) {
      this.stack = t, this.pos = e, this.index = i, this.buffer = t.buffer, this.index == 0 && this.maybeNext();
    }
    static create(t, e = t.bufferBase + t.buffer.length) {
      return new Yo(t, e, e - t.bufferBase);
    }
    maybeNext() {
      let t = this.stack.parent;
      t != null && (this.index = this.stack.bufferBase - t.bufferBase, this.stack = t, this.buffer = t.buffer);
    }
    get id() {
      return this.buffer[this.index - 4];
    }
    get start() {
      return this.buffer[this.index - 3];
    }
    get end() {
      return this.buffer[this.index - 2];
    }
    get size() {
      return this.buffer[this.index - 1];
    }
    next() {
      this.index -= 4, this.pos -= 4, this.index == 0 && this.maybeNext();
    }
    fork() {
      return new Yo(this.stack, this.pos, this.index);
    }
  }
  class Fo {
    constructor() {
      this.start = -1, this.value = -1, this.end = -1, this.extended = -1, this.lookAhead = 0, this.mask = 0, this.context = 0;
    }
  }
  const qd = new Fo();
  class n0 {
    constructor(t, e) {
      this.input = t, this.ranges = e, this.chunk = "", this.chunkOff = 0, this.chunk2 = "", this.chunk2Pos = 0, this.next = -1, this.token = qd, this.rangeIndex = 0, this.pos = this.chunkPos = e[0].from, this.range = e[0], this.end = e[e.length - 1].to, this.readNext();
    }
    resolveOffset(t, e) {
      let i = this.range, n = this.rangeIndex, s = this.pos + t;
      for (; s < i.from; ) {
        if (!n)
          return null;
        let o = this.ranges[--n];
        s -= i.from - o.to, i = o;
      }
      for (; e < 0 ? s > i.to : s >= i.to; ) {
        if (n == this.ranges.length - 1)
          return null;
        let o = this.ranges[++n];
        s += o.from - i.to, i = o;
      }
      return s;
    }
    peek(t) {
      let e = this.chunkOff + t, i, n;
      if (e >= 0 && e < this.chunk.length)
        i = this.pos + t, n = this.chunk.charCodeAt(e);
      else {
        let s = this.resolveOffset(t, 1);
        if (s == null)
          return -1;
        if (i = s, i >= this.chunk2Pos && i < this.chunk2Pos + this.chunk2.length)
          n = this.chunk2.charCodeAt(i - this.chunk2Pos);
        else {
          let o = this.rangeIndex, a = this.range;
          for (; a.to <= i; )
            a = this.ranges[++o];
          this.chunk2 = this.input.chunk(this.chunk2Pos = i), i + this.chunk2.length > a.to && (this.chunk2 = this.chunk2.slice(0, a.to - i)), n = this.chunk2.charCodeAt(0);
        }
      }
      return i >= this.token.lookAhead && (this.token.lookAhead = i + 1), n;
    }
    acceptToken(t, e = 0) {
      let i = e ? this.resolveOffset(e, -1) : this.pos;
      if (i == null || i < this.token.start)
        throw new RangeError("Token end out of bounds");
      this.token.value = t, this.token.end = i;
    }
    getChunk() {
      if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
        let { chunk: t, chunkPos: e } = this;
        this.chunk = this.chunk2, this.chunkPos = this.chunk2Pos, this.chunk2 = t, this.chunk2Pos = e, this.chunkOff = this.pos - this.chunkPos;
      } else {
        this.chunk2 = this.chunk, this.chunk2Pos = this.chunkPos;
        let t = this.input.chunk(this.pos), e = this.pos + t.length;
        this.chunk = e > this.range.to ? t.slice(0, this.range.to - this.pos) : t, this.chunkPos = this.pos, this.chunkOff = 0;
      }
    }
    readNext() {
      return this.chunkOff >= this.chunk.length && (this.getChunk(), this.chunkOff == this.chunk.length) ? this.next = -1 : this.next = this.chunk.charCodeAt(this.chunkOff);
    }
    advance(t = 1) {
      for (this.chunkOff += t; this.pos + t >= this.range.to; ) {
        if (this.rangeIndex == this.ranges.length - 1)
          return this.setDone();
        t -= this.range.to - this.pos, this.range = this.ranges[++this.rangeIndex], this.pos = this.range.from;
      }
      return this.pos += t, this.pos >= this.token.lookAhead && (this.token.lookAhead = this.pos + 1), this.readNext();
    }
    setDone() {
      return this.pos = this.chunkPos = this.end, this.range = this.ranges[this.rangeIndex = this.ranges.length - 1], this.chunk = "", this.next = -1;
    }
    reset(t, e) {
      if (e ? (this.token = e, e.start = t, e.lookAhead = t + 1, e.value = e.extended = -1) : this.token = qd, this.pos != t) {
        if (this.pos = t, t == this.end)
          return this.setDone(), this;
        for (; t < this.range.from; )
          this.range = this.ranges[--this.rangeIndex];
        for (; t >= this.range.to; )
          this.range = this.ranges[++this.rangeIndex];
        t >= this.chunkPos && t < this.chunkPos + this.chunk.length ? this.chunkOff = t - this.chunkPos : (this.chunk = "", this.chunkOff = 0), this.readNext();
      }
      return this;
    }
    read(t, e) {
      if (t >= this.chunkPos && e <= this.chunkPos + this.chunk.length)
        return this.chunk.slice(t - this.chunkPos, e - this.chunkPos);
      if (t >= this.chunk2Pos && e <= this.chunk2Pos + this.chunk2.length)
        return this.chunk2.slice(t - this.chunk2Pos, e - this.chunk2Pos);
      if (t >= this.range.from && e <= this.range.to)
        return this.input.read(t, e);
      let i = "";
      for (let n of this.ranges) {
        if (n.from >= e)
          break;
        n.to > t && (i += this.input.read(Math.max(n.from, t), Math.min(n.to, e)));
      }
      return i;
    }
  }
  class Ho {
    constructor(t, e) {
      this.data = t, this.id = e;
    }
    token(t, e) {
      s0(this.data, t, e, this.id);
    }
  }
  Ho.prototype.contextual = Ho.prototype.fallback = Ho.prototype.extend = !1;
  class xi {
    constructor(t, e = {}) {
      this.token = t, this.contextual = !!e.contextual, this.fallback = !!e.fallback, this.extend = !!e.extend;
    }
  }
  function s0(r, t, e, i) {
    let n = 0, s = 1 << i, { parser: o } = e.p, { dialect: a } = o;
    t:
      for (; s & r[n]; ) {
        let l = r[n + 1];
        for (let m = n + 3; m < l; m += 2)
          if ((r[m + 1] & s) > 0) {
            let Q = r[m];
            if (a.allows(Q) && (t.token.value == -1 || t.token.value == Q || o.overrides(Q, t.token.value))) {
              t.acceptToken(Q);
              break;
            }
          }
        let u = t.next, d = 0, O = r[n + 2];
        if (t.next < 0 && O > d && r[l + O * 3 - 3] == 65535) {
          n = r[l + O * 3 - 1];
          continue t;
        }
        for (; d < O; ) {
          let m = d + O >> 1, Q = l + m + (m << 1), b = r[Q], C = r[Q + 1];
          if (u < b)
            O = m;
          else if (u >= C)
            d = m + 1;
          else {
            n = r[Q + 2], t.advance();
            continue t;
          }
        }
        break;
      }
  }
  function Jo(r, t = Uint16Array) {
    if (typeof r != "string")
      return r;
    let e = null;
    for (let i = 0, n = 0; i < r.length; ) {
      let s = 0;
      for (; ; ) {
        let o = r.charCodeAt(i++), a = !1;
        if (o == 126) {
          s = 65535;
          break;
        }
        o >= 92 && o--, o >= 34 && o--;
        let l = o - 32;
        if (l >= 46 && (l -= 46, a = !0), s += l, a)
          break;
        s *= 46;
      }
      e ? e[n++] = s : e = new t(s);
    }
    return e;
  }
  const Si = typeof process < "u" && process.env && /\bparse\b/.test(process.env.LOG);
  let ih = null;
  var Md;
  (function(r) {
    r[r.Margin = 25] = "Margin";
  })(Md || (Md = {}));
  function Dd(r, t, e) {
    let i = r.cursor(Dt.IncludeAnonymous);
    for (i.moveTo(t); ; )
      if (!(e < 0 ? i.childBefore(t) : i.childAfter(t)))
        for (; ; ) {
          if ((e < 0 ? i.to < t : i.from > t) && !i.type.isError)
            return e < 0 ? Math.max(0, Math.min(i.to - 1, t - 25)) : Math.min(r.length, Math.max(i.from + 1, t + 25));
          if (e < 0 ? i.prevSibling() : i.nextSibling())
            break;
          if (!i.parent())
            return e < 0 ? 0 : r.length;
        }
  }
  class o0 {
    constructor(t, e) {
      this.fragments = t, this.nodeSet = e, this.i = 0, this.fragment = null, this.safeFrom = -1, this.safeTo = -1, this.trees = [], this.start = [], this.index = [], this.nextFragment();
    }
    nextFragment() {
      let t = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
      if (t) {
        for (this.safeFrom = t.openStart ? Dd(t.tree, t.from + t.offset, 1) - t.offset : t.from, this.safeTo = t.openEnd ? Dd(t.tree, t.to + t.offset, -1) - t.offset : t.to; this.trees.length; )
          this.trees.pop(), this.start.pop(), this.index.pop();
        this.trees.push(t.tree), this.start.push(-t.offset), this.index.push(0), this.nextStart = this.safeFrom;
      } else
        this.nextStart = 1e9;
    }
    nodeAt(t) {
      if (t < this.nextStart)
        return null;
      for (; this.fragment && this.safeTo <= t; )
        this.nextFragment();
      if (!this.fragment)
        return null;
      for (; ; ) {
        let e = this.trees.length - 1;
        if (e < 0)
          return this.nextFragment(), null;
        let i = this.trees[e], n = this.index[e];
        if (n == i.children.length) {
          this.trees.pop(), this.start.pop(), this.index.pop();
          continue;
        }
        let s = i.children[n], o = this.start[e] + i.positions[n];
        if (o > t)
          return this.nextStart = o, null;
        if (s instanceof It) {
          if (o == t) {
            if (o < this.safeFrom)
              return null;
            let a = o + s.length;
            if (a <= this.safeTo) {
              let l = s.prop(Ot.lookAhead);
              if (!l || a + l < this.fragment.to)
                return s;
            }
          }
          this.index[e]++, o + s.length >= Math.max(this.safeFrom, t) && (this.trees.push(s), this.start.push(o), this.index.push(0));
        } else
          this.index[e]++, this.nextStart = o + s.length;
      }
    }
  }
  class a0 {
    constructor(t, e) {
      this.stream = e, this.tokens = [], this.mainToken = null, this.actions = [], this.tokens = t.tokenizers.map((i) => new Fo());
    }
    getActions(t) {
      let e = 0, i = null, { parser: n } = t.p, { tokenizers: s } = n, o = n.stateSlot(t.state, 3), a = t.curContext ? t.curContext.hash : 0, l = 0;
      for (let u = 0; u < s.length; u++) {
        if (!(1 << u & o))
          continue;
        let d = s[u], O = this.tokens[u];
        if (!(i && !d.fallback) && ((d.contextual || O.start != t.pos || O.mask != o || O.context != a) && (this.updateCachedToken(O, d, t), O.mask = o, O.context = a), O.lookAhead > O.end + 25 && (l = Math.max(O.lookAhead, l)), O.value != 0)) {
          let m = e;
          if (O.extended > -1 && (e = this.addActions(t, O.extended, O.end, e)), e = this.addActions(t, O.value, O.end, e), !d.extend && (i = O, e > m))
            break;
        }
      }
      for (; this.actions.length > e; )
        this.actions.pop();
      return l && t.setLookAhead(l), !i && t.pos == this.stream.end && (i = new Fo(), i.value = t.p.parser.eofTerm, i.start = i.end = t.pos, e = this.addActions(t, i.value, i.end, e)), this.mainToken = i, this.actions;
    }
    getMainToken(t) {
      if (this.mainToken)
        return this.mainToken;
      let e = new Fo(), { pos: i, p: n } = t;
      return e.start = i, e.end = Math.min(i + 1, n.stream.end), e.value = i == n.stream.end ? n.parser.eofTerm : 0, e;
    }
    updateCachedToken(t, e, i) {
      if (e.token(this.stream.reset(i.pos, t), i), t.value > -1) {
        let { parser: n } = i.p;
        for (let s = 0; s < n.specialized.length; s++)
          if (n.specialized[s] == t.value) {
            let o = n.specializers[s](this.stream.read(t.start, t.end), i);
            if (o >= 0 && i.p.parser.dialect.allows(o >> 1)) {
              o & 1 ? t.extended = o >> 1 : t.value = o >> 1;
              break;
            }
          }
      } else
        t.value = 0, t.end = Math.min(i.p.stream.end, i.pos + 1);
    }
    putAction(t, e, i, n) {
      for (let s = 0; s < n; s += 3)
        if (this.actions[s] == t)
          return n;
      return this.actions[n++] = t, this.actions[n++] = e, this.actions[n++] = i, n;
    }
    addActions(t, e, i, n) {
      let { state: s } = t, { parser: o } = t.p, { data: a } = o;
      for (let l = 0; l < 2; l++)
        for (let u = o.stateSlot(s, l ? 2 : 1); ; u += 3) {
          if (a[u] == 65535)
            if (a[u + 1] == 1)
              u = cr(a, u + 2);
            else {
              n == 0 && a[u + 1] == 2 && (n = this.putAction(cr(a, u + 2), e, i, n));
              break;
            }
          a[u] == e && (n = this.putAction(cr(a, u + 1), e, i, n));
        }
      return n;
    }
  }
  var Ed;
  (function(r) {
    r[r.Distance = 5] = "Distance", r[r.MaxRemainingPerStep = 3] = "MaxRemainingPerStep", r[r.MinBufferLengthPrune = 500] = "MinBufferLengthPrune", r[r.ForceReduceLimit = 10] = "ForceReduceLimit", r[r.CutDepth = 15e3] = "CutDepth", r[r.CutTo = 9e3] = "CutTo";
  })(Ed || (Ed = {}));
  class l0 {
    constructor(t, e, i, n) {
      this.parser = t, this.input = e, this.ranges = n, this.recovering = 0, this.nextStackID = 9812, this.minStackPos = 0, this.reused = [], this.stoppedAt = null, this.stream = new n0(e, n), this.tokens = new a0(t, this.stream), this.topTerm = t.top[1];
      let { from: s } = n[0];
      this.stacks = [Bo.start(this, t.top[0], s)], this.fragments = i.length && this.stream.end - s > t.bufferLength * 4 ? new o0(i, t.nodeSet) : null;
    }
    get parsedPos() {
      return this.minStackPos;
    }
    advance() {
      let t = this.stacks, e = this.minStackPos, i = this.stacks = [], n, s;
      for (let o = 0; o < t.length; o++) {
        let a = t[o];
        for (; ; ) {
          if (this.tokens.mainToken = null, a.pos > e)
            i.push(a);
          else {
            if (this.advanceStack(a, i, t))
              continue;
            {
              n || (n = [], s = []), n.push(a);
              let l = this.tokens.getMainToken(a);
              s.push(l.value, l.end);
            }
          }
          break;
        }
      }
      if (!i.length) {
        let o = n && c0(n);
        if (o)
          return this.stackToTree(o);
        if (this.parser.strict)
          throw Si && n && console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none")), new SyntaxError("No parse at " + e);
        this.recovering || (this.recovering = 5);
      }
      if (this.recovering && n) {
        let o = this.stoppedAt != null && n[0].pos > this.stoppedAt ? n[0] : this.runRecovery(n, s, i);
        if (o)
          return this.stackToTree(o.forceAll());
      }
      if (this.recovering) {
        let o = this.recovering == 1 ? 1 : this.recovering * 3;
        if (i.length > o)
          for (i.sort((a, l) => l.score - a.score); i.length > o; )
            i.pop();
        i.some((a) => a.reducePos > e) && this.recovering--;
      } else if (i.length > 1)
        t:
          for (let o = 0; o < i.length - 1; o++) {
            let a = i[o];
            for (let l = o + 1; l < i.length; l++) {
              let u = i[l];
              if (a.sameState(u) || a.buffer.length > 500 && u.buffer.length > 500)
                if ((a.score - u.score || a.buffer.length - u.buffer.length) > 0)
                  i.splice(l--, 1);
                else {
                  i.splice(o--, 1);
                  continue t;
                }
            }
          }
      this.minStackPos = i[0].pos;
      for (let o = 1; o < i.length; o++)
        i[o].pos < this.minStackPos && (this.minStackPos = i[o].pos);
      return null;
    }
    stopAt(t) {
      if (this.stoppedAt != null && this.stoppedAt < t)
        throw new RangeError("Can't move stoppedAt forward");
      this.stoppedAt = t;
    }
    advanceStack(t, e, i) {
      let n = t.pos, { parser: s } = this, o = Si ? this.stackID(t) + " -> " : "";
      if (this.stoppedAt != null && n > this.stoppedAt)
        return t.forceReduce() ? t : null;
      if (this.fragments) {
        let u = t.curContext && t.curContext.tracker.strict, d = u ? t.curContext.hash : 0;
        for (let O = this.fragments.nodeAt(n); O; ) {
          let m = this.parser.nodeSet.types[O.type.id] == O.type ? s.getGoto(t.state, O.type.id) : -1;
          if (m > -1 && O.length && (!u || (O.prop(Ot.contextHash) || 0) == d))
            return t.useNode(O, m), Si && console.log(o + this.stackID(t) + ` (via reuse of ${s.getName(O.type.id)})`), !0;
          if (!(O instanceof It) || O.children.length == 0 || O.positions[0] > 0)
            break;
          let Q = O.children[0];
          if (Q instanceof It && O.positions[0] == 0)
            O = Q;
          else
            break;
        }
      }
      let a = s.stateSlot(t.state, 4);
      if (a > 0)
        return t.reduce(a), Si && console.log(o + this.stackID(t) + ` (via always-reduce ${s.getName(a & 65535)})`), !0;
      if (t.stack.length >= 15e3)
        for (; t.stack.length > 9e3 && t.forceReduce(); )
          ;
      let l = this.tokens.getActions(t);
      for (let u = 0; u < l.length; ) {
        let d = l[u++], O = l[u++], m = l[u++], Q = u == l.length || !i, b = Q ? t : t.split();
        if (b.apply(d, O, m), Si && console.log(o + this.stackID(b) + ` (via ${d & 65536 ? `reduce of ${s.getName(d & 65535)}` : "shift"} for ${s.getName(O)} @ ${n}${b == t ? "" : ", split"})`), Q)
          return !0;
        b.pos > n ? e.push(b) : i.push(b);
      }
      return !1;
    }
    advanceFully(t, e) {
      let i = t.pos;
      for (; ; ) {
        if (!this.advanceStack(t, null, null))
          return !1;
        if (t.pos > i)
          return Zd(t, e), !0;
      }
    }
    runRecovery(t, e, i) {
      let n = null, s = !1;
      for (let o = 0; o < t.length; o++) {
        let a = t[o], l = e[o << 1], u = e[(o << 1) + 1], d = Si ? this.stackID(a) + " -> " : "";
        if (a.deadEnd && (s || (s = !0, a.restart(), Si && console.log(d + this.stackID(a) + " (restarted)"), this.advanceFully(a, i))))
          continue;
        let O = a.split(), m = d;
        for (let Q = 0; O.forceReduce() && Q < 10 && (Si && console.log(m + this.stackID(O) + " (via force-reduce)"), !this.advanceFully(O, i)); Q++)
          Si && (m = this.stackID(O) + " -> ");
        for (let Q of a.recoverByInsert(l))
          Si && console.log(d + this.stackID(Q) + " (via recover-insert)"), this.advanceFully(Q, i);
        this.stream.end > a.pos ? (u == a.pos && (u++, l = 0), a.recoverByDelete(l, u), Si && console.log(d + this.stackID(a) + ` (via recover-delete ${this.parser.getName(l)})`), Zd(a, i)) : (!n || n.score < a.score) && (n = a);
      }
      return n;
    }
    stackToTree(t) {
      return t.close(), It.build({
        buffer: Yo.create(t),
        nodeSet: this.parser.nodeSet,
        topID: this.topTerm,
        maxBufferLength: this.parser.bufferLength,
        reused: this.reused,
        start: this.ranges[0].from,
        length: t.pos - this.ranges[0].from,
        minRepeatType: this.parser.minRepeatTerm
      });
    }
    stackID(t) {
      let e = (ih || (ih = /* @__PURE__ */ new WeakMap())).get(t);
      return e || ih.set(t, e = String.fromCodePoint(this.nextStackID++)), e + t;
    }
  }
  function Zd(r, t) {
    for (let e = 0; e < t.length; e++) {
      let i = t[e];
      if (i.pos == r.pos && i.sameState(r)) {
        t[e].score < r.score && (t[e] = r);
        return;
      }
    }
    t.push(r);
  }
  class h0 {
    constructor(t, e, i) {
      this.source = t, this.flags = e, this.disabled = i;
    }
    allows(t) {
      return !this.disabled || this.disabled[t] == 0;
    }
  }
  const rh = (r) => r;
  class jd {
    constructor(t) {
      this.start = t.start, this.shift = t.shift || rh, this.reduce = t.reduce || rh, this.reuse = t.reuse || rh, this.hash = t.hash || (() => 0), this.strict = t.strict !== !1;
    }
  }
  class nn extends Wu {
    constructor(t) {
      if (super(), this.wrappers = [], t.version != 14)
        throw new RangeError(`Parser version (${t.version}) doesn't match runtime version (14)`);
      let e = t.nodeNames.split(" ");
      this.minRepeatTerm = e.length;
      for (let a = 0; a < t.repeatNodeCount; a++)
        e.push("");
      let i = Object.keys(t.topRules).map((a) => t.topRules[a][1]), n = [];
      for (let a = 0; a < e.length; a++)
        n.push([]);
      function s(a, l, u) {
        n[a].push([l, l.deserialize(String(u))]);
      }
      if (t.nodeProps)
        for (let a of t.nodeProps) {
          let l = a[0];
          typeof l == "string" && (l = Ot[l]);
          for (let u = 1; u < a.length; ) {
            let d = a[u++];
            if (d >= 0)
              s(d, l, a[u++]);
            else {
              let O = a[u + -d];
              for (let m = -d; m > 0; m--)
                s(a[u++], l, O);
              u++;
            }
          }
        }
      this.nodeSet = new Ol(e.map((a, l) => $e.define({
        name: l >= this.minRepeatTerm ? void 0 : a,
        id: l,
        props: n[l],
        top: i.indexOf(l) > -1,
        error: l == 0,
        skipped: t.skippedNodes && t.skippedNodes.indexOf(l) > -1
      }))), t.propSources && (this.nodeSet = this.nodeSet.extend(...t.propSources)), this.strict = !1, this.bufferLength = Pu;
      let o = Jo(t.tokenData);
      if (this.context = t.context, this.specialized = new Uint16Array(t.specialized ? t.specialized.length : 0), this.specializers = [], t.specialized)
        for (let a = 0; a < t.specialized.length; a++)
          this.specialized[a] = t.specialized[a].term, this.specializers[a] = t.specialized[a].get;
      this.states = Jo(t.states, Uint32Array), this.data = Jo(t.stateData), this.goto = Jo(t.goto), this.maxTerm = t.maxTerm, this.tokenizers = t.tokenizers.map((a) => typeof a == "number" ? new Ho(o, a) : a), this.topRules = t.topRules, this.dialects = t.dialects || {}, this.dynamicPrecedences = t.dynamicPrecedences || null, this.tokenPrecTable = t.tokenPrec, this.termNames = t.termNames || null, this.maxNode = this.nodeSet.types.length - 1, this.dialect = this.parseDialect(), this.top = this.topRules[Object.keys(this.topRules)[0]];
    }
    createParse(t, e, i) {
      let n = new l0(this, t, e, i);
      for (let s of this.wrappers)
        n = s(n, t, e, i);
      return n;
    }
    getGoto(t, e, i = !1) {
      let n = this.goto;
      if (e >= n[0])
        return -1;
      for (let s = n[e + 1]; ; ) {
        let o = n[s++], a = o & 1, l = n[s++];
        if (a && i)
          return l;
        for (let u = s + (o >> 1); s < u; s++)
          if (n[s] == t)
            return l;
        if (a)
          return -1;
      }
    }
    hasAction(t, e) {
      let i = this.data;
      for (let n = 0; n < 2; n++)
        for (let s = this.stateSlot(t, n ? 2 : 1), o; ; s += 3) {
          if ((o = i[s]) == 65535)
            if (i[s + 1] == 1)
              o = i[s = cr(i, s + 2)];
            else {
              if (i[s + 1] == 2)
                return cr(i, s + 2);
              break;
            }
          if (o == e || o == 0)
            return cr(i, s + 1);
        }
      return 0;
    }
    stateSlot(t, e) {
      return this.states[t * 6 + e];
    }
    stateFlag(t, e) {
      return (this.stateSlot(t, 0) & e) > 0;
    }
    validAction(t, e) {
      if (e == this.stateSlot(t, 4))
        return !0;
      for (let i = this.stateSlot(t, 1); ; i += 3) {
        if (this.data[i] == 65535)
          if (this.data[i + 1] == 1)
            i = cr(this.data, i + 2);
          else
            return !1;
        if (e == cr(this.data, i + 1))
          return !0;
      }
    }
    nextStates(t) {
      let e = [];
      for (let i = this.stateSlot(t, 1); ; i += 3) {
        if (this.data[i] == 65535)
          if (this.data[i + 1] == 1)
            i = cr(this.data, i + 2);
          else
            break;
        if (!(this.data[i + 2] & 1)) {
          let n = this.data[i + 1];
          e.some((s, o) => o & 1 && s == n) || e.push(this.data[i], n);
        }
      }
      return e;
    }
    overrides(t, e) {
      let i = zd(this.data, this.tokenPrecTable, e);
      return i < 0 || zd(this.data, this.tokenPrecTable, t) < i;
    }
    configure(t) {
      let e = Object.assign(Object.create(nn.prototype), this);
      if (t.props && (e.nodeSet = this.nodeSet.extend(...t.props)), t.top) {
        let i = this.topRules[t.top];
        if (!i)
          throw new RangeError(`Invalid top rule name ${t.top}`);
        e.top = i;
      }
      return t.tokenizers && (e.tokenizers = this.tokenizers.map((i) => {
        let n = t.tokenizers.find((s) => s.from == i);
        return n ? n.to : i;
      })), t.specializers && (e.specializers = this.specializers.map((i) => {
        let n = t.specializers.find((s) => s.from == i);
        return n ? n.to : i;
      })), t.contextTracker && (e.context = t.contextTracker), t.dialect && (e.dialect = this.parseDialect(t.dialect)), t.strict != null && (e.strict = t.strict), t.wrap && (e.wrappers = e.wrappers.concat(t.wrap)), t.bufferLength != null && (e.bufferLength = t.bufferLength), e;
    }
    hasWrappers() {
      return this.wrappers.length > 0;
    }
    getName(t) {
      return this.termNames ? this.termNames[t] : String(t <= this.maxNode && this.nodeSet.types[t].name || t);
    }
    get eofTerm() {
      return this.maxNode + 1;
    }
    get topNode() {
      return this.nodeSet.types[this.top[1]];
    }
    dynamicPrecedence(t) {
      let e = this.dynamicPrecedences;
      return e == null ? 0 : e[t] || 0;
    }
    parseDialect(t) {
      let e = Object.keys(this.dialects), i = e.map(() => !1);
      if (t)
        for (let s of t.split(" ")) {
          let o = e.indexOf(s);
          o >= 0 && (i[o] = !0);
        }
      let n = null;
      for (let s = 0; s < e.length; s++)
        if (!i[s])
          for (let o = this.dialects[e[s]], a; (a = this.data[o++]) != 65535; )
            (n || (n = new Uint8Array(this.maxTerm + 1)))[a] = 1;
      return new h0(t, i, n);
    }
    static deserialize(t) {
      return new nn(t);
    }
  }
  function cr(r, t) {
    return r[t] | r[t + 1] << 16;
  }
  function zd(r, t, e) {
    for (let i = t, n; (n = r[i]) != 65535; i++)
      if (n == e)
        return i - t;
    return -1;
  }
  function c0(r) {
    let t = null;
    for (let e of r) {
      let i = e.p.stoppedAt;
      (e.pos == e.p.stream.end || i != null && e.pos > i) && e.p.parser.stateFlag(e.state, 2) && (!t || t.score < e.score) && (t = e);
    }
    return t;
  }
  const u0 = 1, Nd = 281, Id = 2, f0 = 3, Ko = 282, d0 = 4, O0 = 283, Gd = 284, p0 = 286, m0 = 287, g0 = 5, v0 = 6, Q0 = 1, y0 = [
    9,
    10,
    11,
    12,
    13,
    32,
    133,
    160,
    5760,
    8192,
    8193,
    8194,
    8195,
    8196,
    8197,
    8198,
    8199,
    8200,
    8201,
    8202,
    8232,
    8233,
    8239,
    8287,
    12288
  ], Vd = 125, b0 = 123, w0 = 59, Ld = 47, x0 = 42, S0 = 43, k0 = 45, $0 = 36, T0 = 96, P0 = 92, R0 = new jd({
    start: !1,
    shift(r, t) {
      return t == g0 || t == v0 || t == p0 ? r : t == m0;
    },
    strict: !1
  }), C0 = new xi((r, t) => {
    let { next: e } = r;
    (e == Vd || e == -1 || t.context) && t.canShift(Gd) && r.acceptToken(Gd);
  }, { contextual: !0, fallback: !0 }), _0 = new xi((r, t) => {
    let { next: e } = r, i;
    y0.indexOf(e) > -1 || e == Ld && ((i = r.peek(1)) == Ld || i == x0) || e != Vd && e != w0 && e != -1 && !t.context && t.canShift(Nd) && r.acceptToken(Nd);
  }, { contextual: !0 }), A0 = new xi((r, t) => {
    let { next: e } = r;
    if ((e == S0 || e == k0) && (r.advance(), e == r.next)) {
      r.advance();
      let i = !t.context && t.canShift(Id);
      r.acceptToken(i ? Id : f0);
    }
  }, { contextual: !0 }), W0 = new xi((r) => {
    for (let t = !1, e = 0; ; e++) {
      let { next: i } = r;
      if (i < 0) {
        e && r.acceptToken(Ko);
        break;
      } else if (i == T0) {
        e ? r.acceptToken(Ko) : r.acceptToken(O0, 1);
        break;
      } else if (i == b0 && t) {
        e == 1 ? r.acceptToken(d0, 1) : r.acceptToken(Ko, -1);
        break;
      } else if (i == 10 && e) {
        r.advance(), r.acceptToken(Ko);
        break;
      } else
        i == P0 && r.advance();
      t = i == $0, r.advance();
    }
  }), X0 = new xi((r, t) => {
    if (!(r.next != 101 || !t.dialectEnabled(Q0))) {
      r.advance();
      for (let e = 0; e < 6; e++) {
        if (r.next != "xtends".charCodeAt(e))
          return;
        r.advance();
      }
      r.next >= 57 && r.next <= 65 || r.next >= 48 && r.next <= 90 || r.next == 95 || r.next >= 97 && r.next <= 122 || r.next > 160 || r.acceptToken(u0);
    }
  }), q0 = os({
    "get set async static": w.modifier,
    "for while do if else switch try catch finally return throw break continue default case": w.controlKeyword,
    "in of await yield void typeof delete instanceof": w.operatorKeyword,
    "let var const function class extends": w.definitionKeyword,
    "import export from": w.moduleKeyword,
    "with debugger as new": w.keyword,
    TemplateString: w.special(w.string),
    super: w.atom,
    BooleanLiteral: w.bool,
    this: w.self,
    null: w.null,
    Star: w.modifier,
    VariableName: w.variableName,
    "CallExpression/VariableName TaggedTemplateExpression/VariableName": w.function(w.variableName),
    VariableDefinition: w.definition(w.variableName),
    Label: w.labelName,
    PropertyName: w.propertyName,
    PrivatePropertyName: w.special(w.propertyName),
    "CallExpression/MemberExpression/PropertyName": w.function(w.propertyName),
    "FunctionDeclaration/VariableDefinition": w.function(w.definition(w.variableName)),
    "ClassDeclaration/VariableDefinition": w.definition(w.className),
    PropertyDefinition: w.definition(w.propertyName),
    PrivatePropertyDefinition: w.definition(w.special(w.propertyName)),
    UpdateOp: w.updateOperator,
    LineComment: w.lineComment,
    BlockComment: w.blockComment,
    Number: w.number,
    String: w.string,
    ArithOp: w.arithmeticOperator,
    LogicOp: w.logicOperator,
    BitOp: w.bitwiseOperator,
    CompareOp: w.compareOperator,
    RegExp: w.regexp,
    Equals: w.definitionOperator,
    Arrow: w.function(w.punctuation),
    ": Spread": w.punctuation,
    "( )": w.paren,
    "[ ]": w.squareBracket,
    "{ }": w.brace,
    "InterpolationStart InterpolationEnd": w.special(w.brace),
    ".": w.derefOperator,
    ", ;": w.separator,
    TypeName: w.typeName,
    TypeDefinition: w.definition(w.typeName),
    "type enum interface implements namespace module declare": w.definitionKeyword,
    "abstract global Privacy readonly override": w.modifier,
    "is keyof unique infer": w.operatorKeyword,
    JSXAttributeValue: w.attributeValue,
    JSXText: w.content,
    "JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag": w.angleBracket,
    "JSXIdentifier JSXNameSpacedName": w.tagName,
    "JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName": w.attributeName
  }), M0 = { __proto__: null, export: 18, as: 23, from: 29, default: 32, async: 37, function: 38, this: 48, true: 56, false: 56, void: 66, typeof: 70, null: 86, super: 88, new: 122, await: 139, yield: 141, delete: 142, class: 152, extends: 154, public: 197, private: 197, protected: 197, readonly: 199, instanceof: 220, in: 222, const: 224, import: 256, keyof: 307, unique: 311, infer: 317, is: 351, abstract: 371, implements: 373, type: 375, let: 378, var: 380, interface: 387, enum: 391, namespace: 397, module: 399, declare: 403, global: 407, for: 428, of: 437, while: 440, with: 444, do: 448, if: 452, else: 454, switch: 458, case: 464, try: 470, catch: 474, finally: 478, return: 482, throw: 486, break: 490, continue: 494, debugger: 498 }, D0 = { __proto__: null, async: 109, get: 111, set: 113, public: 161, private: 161, protected: 161, static: 163, abstract: 165, override: 167, readonly: 173, new: 355 }, E0 = { __proto__: null, "<": 129 }, Z0 = nn.deserialize({
    version: 14,
    states: "$8SO`QdOOO'QQ(C|O'#ChO'XOWO'#DVO)dQdO'#D]O)tQdO'#DhO){QdO'#DrO-xQdO'#DxOOQO'#E]'#E]O.]Q`O'#E[O.bQ`O'#E[OOQ(C['#Ef'#EfO0aQ(C|O'#ItO2wQ(C|O'#IuO3eQ`O'#EzO3jQ!bO'#FaOOQ(C['#FS'#FSO3rO#tO'#FSO4QQ&jO'#FhO5bQ`O'#FgOOQ(C['#Iu'#IuOOQ(CW'#It'#ItOOQS'#J^'#J^O5gQ`O'#HpO5lQ(ChO'#HqOOQS'#Ih'#IhOOQS'#Hr'#HrQ`QdOOO){QdO'#DjO5tQ`O'#G[O5yQ&jO'#CmO6XQ`O'#EZO6dQ`O'#EgO6iQ,UO'#FRO7TQ`O'#G[O7YQ`O'#G`O7eQ`O'#G`O7sQ`O'#GcO7sQ`O'#GdO7sQ`O'#GfO5tQ`O'#GiO8dQ`O'#GlO9rQ`O'#CdO:SQ`O'#GyO:[Q`O'#HPO:[Q`O'#HRO`QdO'#HTO:[Q`O'#HVO:[Q`O'#HYO:aQ`O'#H`O:fQ(CjO'#HfO){QdO'#HhO:qQ(CjO'#HjO:|Q(CjO'#HlO5lQ(ChO'#HnO){QdO'#DWOOOW'#Ht'#HtO;XOWO,59qOOQ(C[,59q,59qO=jQtO'#ChO=tQdO'#HuO>XQ`O'#IvO@WQtO'#IvO'dQdO'#IvO@_Q`O,59wO@uQ7[O'#DbOAnQ`O'#E]OA{Q`O'#JROBWQ`O'#JQOBWQ`O'#JQOB`Q`O,5:yOBeQ`O'#JPOBlQaO'#DyO5yQ&jO'#EZOBzQ`O'#EZOCVQpO'#FROOQ(C[,5:S,5:SOC_QdO,5:SOE]Q(C|O,5:^OEyQ`O,5:dOFdQ(ChO'#JOO7YQ`O'#I}OFkQ`O'#I}OFsQ`O,5:xOFxQ`O'#I}OGWQdO,5:vOIWQ&jO'#EWOJeQ`O,5:vOKwQ&jO'#DlOLOQdO'#DqOLYQ7[O,5;PO){QdO,5;POOQS'#Er'#ErOOQS'#Et'#EtO){QdO,5;RO){QdO,5;RO){QdO,5;RO){QdO,5;RO){QdO,5;RO){QdO,5;RO){QdO,5;RO){QdO,5;RO){QdO,5;RO){QdO,5;RO){QdO,5;ROOQS'#Ex'#ExOLbQdO,5;cOOQ(C[,5;h,5;hOOQ(C[,5;i,5;iONbQ`O,5;iOOQ(C[,5;j,5;jO){QdO'#IPONgQ(ChO,5<TO! RQ&jO,5;RO){QdO,5;fO! kQ!bO'#JVO! YQ!bO'#JVO! rQ!bO'#JVO!!TQ!bO,5;qOOOO,5;{,5;{O!!cQdO'#FcOOOO'#IO'#IOO3rO#tO,5;nO!!jQ!bO'#FeOOQ(C[,5;n,5;nO!#WQ,VO'#CrOOQ(C]'#Cu'#CuO!#kQ`O'#CuO!#pOWO'#CyO!$^Q,VO,5<QO!$eQ`O,5<SO!%tQ&jO'#FrO!&RQ`O'#FsO!&WQ`O'#FsO!&]Q&jO'#FwO!'[Q7[O'#F{O!'}Q,VO'#IqOOQ(C]'#Iq'#IqO!(XQaO'#IpO!(gQ`O'#IoO!(oQ`O'#CqOOQ(C]'#Cs'#CsOOQ(C]'#C|'#C|O!(wQ`O'#DOOJjQ&jO'#FjOJjQ&jO'#FlO!(|Q`O'#FnO!)RQ`O'#FoO!&WQ`O'#FuOJjQ&jO'#FzO!)WQ`O'#E^O!)oQ`O,5<RO`QdO,5>[OOQS'#Ik'#IkOOQS,5>],5>]OOQS-E;p-E;pO!+kQ(C|O,5:UOOQ(CX'#Cp'#CpO!,[Q&kO,5<vOOQO'#Cf'#CfO!,mQ(ChO'#IlO5bQ`O'#IlO:aQ`O,59XO!-OQ!bO,59XO!-WQ&jO,59XO5yQ&jO,59XO!-cQ`O,5:vO!-kQ`O'#GxO!-yQ`O'#JbO){QdO,5;kO!.RQ7[O,5;mO!.WQ`O,5=cO!.]Q`O,5=cO!.bQ`O,5=cO5lQ(ChO,5=cO5tQ`O,5<vO!.pQ`O'#E_O!/UQ7[O'#E`OOQ(CW'#JP'#JPO!/gQ(ChO'#J_O5lQ(ChO,5<zO7sQ`O,5=QOOQP'#Cr'#CrO!/rQ!bO,5<}O!/zQ!cO,5=OO!0VQ`O,5=QO!0[QpO,5=TO:aQ`O'#GnO5tQ`O'#GpO!0dQ`O'#GpO5yQ&jO'#GsO!0iQ`O'#GsOOQS,5=W,5=WO!0nQ`O'#GtO!0vQ`O'#CmO!0{Q`O,59OO!1VQ`O,59OO!3XQdO,59OOOQS,59O,59OO!3fQ(ChO,59OO){QdO,59OO!3qQdO'#G{OOQS'#G|'#G|OOQS'#G}'#G}O`QdO,5=eO!4RQ`O,5=eO){QdO'#DxO`QdO,5=kO`QdO,5=mO!4WQ`O,5=oO`QdO,5=qO!4]Q`O,5=tO!4bQdO,5=zOOQS,5>Q,5>QO){QdO,5>QO5lQ(ChO,5>SOOQS,5>U,5>UO!8cQ`O,5>UOOQS,5>W,5>WO!8cQ`O,5>WOOQS,5>Y,5>YO!8hQpO,59rOOOW-E;r-E;rOOQ(C[1G/]1G/]O!8mQtO,5>aO'dQdO,5>aOOQO,5>f,5>fO!8wQdO'#HuOOQO-E;s-E;sO!9UQ`O,5?bO!9^QtO,5?bO!9eQ`O,5?lOOQ(C[1G/c1G/cO!9mQ!bO'#DTOOQO'#Ix'#IxO){QdO'#IxO!:[Q!bO'#IxO!:yQ!bO'#DcO!;[Q7[O'#DcO!=gQdO'#DcO!=nQ`O'#IwO!=vQ`O,59|O!={Q`O'#EaO!>ZQ`O'#JSO!>cQ`O,5:zO!>yQ7[O'#DcO){QdO,5?mO!?TQ`O'#HzOOQO-E;x-E;xO!9eQ`O,5?lOOQ(CW1G0e1G0eO!@aQ7[O'#D|OOQ(C[,5:e,5:eO){QdO,5:eOIWQ&jO,5:eO!@hQaO,5:eO:aQ`O,5:uO!-OQ!bO,5:uO!-WQ&jO,5:uO5yQ&jO,5:uOOQ(C[1G/n1G/nOOQ(C[1G0O1G0OOOQ(CW'#EV'#EVO){QdO,5?jO!@sQ(ChO,5?jO!AUQ(ChO,5?jO!A]Q`O,5?iO!AeQ`O'#H|O!A]Q`O,5?iOOQ(CW1G0d1G0dO7YQ`O,5?iOOQ(C[1G0b1G0bO!BPQ(C|O1G0bO!CRQ(CyO,5:rOOQ(C]'#Fq'#FqO!CoQ(C}O'#IqOGWQdO1G0bO!EqQ,VO'#IyO!E{Q`O,5:WO!FQQtO'#IzO){QdO'#IzO!F[Q`O,5:]OOQ(C]'#DT'#DTOOQ(C[1G0k1G0kO!FaQ`O1G0kO!HrQ(C|O1G0mO!HyQ(C|O1G0mO!K^Q(C|O1G0mO!KeQ(C|O1G0mO!MlQ(C|O1G0mO!NPQ(C|O1G0mO#!pQ(C|O1G0mO#!wQ(C|O1G0mO#%[Q(C|O1G0mO#%cQ(C|O1G0mO#'WQ(C|O1G0mO#*QQMlO'#ChO#+{QMlO1G0}O#-vQMlO'#IuOOQ(C[1G1T1G1TO#.ZQ(C|O,5>kOOQ(CW-E;}-E;}O#.zQ(C}O1G0mOOQ(C[1G0m1G0mO#1PQ(C|O1G1QO#1pQ!bO,5;sO#1uQ!bO,5;tO#1zQ!bO'#F[O#2`Q`O'#FZOOQO'#JW'#JWOOQO'#H}'#H}O#2eQ!bO1G1]OOQ(C[1G1]1G1]OOOO1G1f1G1fO#2sQMlO'#ItO#2}Q`O,5;}OLbQdO,5;}OOOO-E;|-E;|OOQ(C[1G1Y1G1YOOQ(C[,5<P,5<PO#3SQ!bO,5<POOQ(C],59a,59aOIWQ&jO'#C{OOOW'#Hs'#HsO#3XOWO,59eOOQ(C],59e,59eO){QdO1G1lO!)RQ`O'#IRO#3dQ`O,5<eOOQ(C],5<b,5<bOOQO'#GV'#GVOJjQ&jO,5<pOOQO'#GX'#GXOJjQ&jO,5<rOIWQ&jO,5<tOOQO1G1n1G1nO#3oQqO'#CpO#4SQqO,5<^O#4ZQ`O'#JZO5tQ`O'#JZO#4iQ`O,5<`OJjQ&jO,5<_O#4nQ`O'#FtO#4yQ`O,5<_O#5OQqO'#FqO#5]QqO'#J[O#5gQ`O'#J[OIWQ&jO'#J[O#5lQ`O,5<cOOQ(CW'#Dg'#DgO#5qQ!bO'#F|O!'VQ7[O'#F|O!'VQ7[O'#GOO#6SQ`O'#GPO!&WQ`O'#GSO#6XQ(ChO'#ITO#6dQ7[O,5<gOOQ(C],5<g,5<gO#6kQ7[O'#F|O#6yQ7[O'#F}O#7RQ7[O'#F}OOQ(C],5<u,5<uOJjQ&jO,5?[OJjQ&jO,5?[O#7WQ`O'#IUO#7cQ`O,5?ZO#7kQ`O,59]OOQ(C]'#Ch'#ChO#8[Q,VO,59jOOQ(C],59j,59jO#8}Q,VO,5<UO#9pQ,VO,5<WO#9zQ`O,5<YOOQ(C],5<Z,5<ZO#:PQ`O,5<aO#:UQ,VO,5<fOGWQdO1G1mO#:fQ`O1G1mOOQS1G3v1G3vOOQ(C[1G/p1G/pONbQ`O1G/pOOQS1G2b1G2bOIWQ&jO1G2bO){QdO1G2bOIWQ&jO1G2bO#:kQaO1G2bO#<QQ&jO'#EWOOQ(CW,5?W,5?WO#<[Q(ChO,5?WOOQS1G.s1G.sO:aQ`O1G.sO!-OQ!bO1G.sO!-WQ&jO1G.sO#<mQ`O1G0bO#<rQ`O'#ChO#<}Q`O'#JcO#=VQ`O,5=dO#=[Q`O'#JcO#=aQ`O'#JcO#=iQ`O'#I^O#=wQ`O,5?|O#>PQtO1G1VOOQ(C[1G1X1G1XO5tQ`O1G2}O#>WQ`O1G2}O#>]Q`O1G2}O#>bQ`O1G2}OOQS1G2}1G2}O#>gQ&kO1G2bO7YQ`O'#JQO7YQ`O'#EaO7YQ`O'#IWO#>xQ(ChO,5?yOOQS1G2f1G2fO!0VQ`O1G2lOIWQ&jO1G2iO#?TQ`O1G2iOOQS1G2j1G2jOIWQ&jO1G2jO#?YQaO1G2jO#?bQ7[O'#GhOOQS1G2l1G2lO!'VQ7[O'#IYO!0[QpO1G2oOOQS1G2o1G2oOOQS,5=Y,5=YO#?jQ&kO,5=[O5tQ`O,5=[O#6SQ`O,5=_O5bQ`O,5=_O!-OQ!bO,5=_O!-WQ&jO,5=_O5yQ&jO,5=_O#?{Q`O'#JaO#@WQ`O,5=`OOQS1G.j1G.jO#@]Q(ChO1G.jO#@hQ`O1G.jO#@mQ`O1G.jO5lQ(ChO1G.jO#@uQtO,5@OO#APQ`O,5@OO#A[QdO,5=gO#AcQ`O,5=gO7YQ`O,5@OOOQS1G3P1G3PO`QdO1G3POOQS1G3V1G3VOOQS1G3X1G3XO:[Q`O1G3ZO#AhQdO1G3]O#EcQdO'#H[OOQS1G3`1G3`O#EpQ`O'#HbO:aQ`O'#HdOOQS1G3f1G3fO#ExQdO1G3fO5lQ(ChO1G3lOOQS1G3n1G3nOOQ(CW'#Fx'#FxO5lQ(ChO1G3pO5lQ(ChO1G3rOOOW1G/^1G/^O#IvQpO,5<TO#JOQtO1G3{OOQO1G4Q1G4QO){QdO,5>aO#JYQ`O1G4|O#JbQ`O1G5WO#JjQ`O,5?dOLbQdO,5:{O7YQ`O,5:{O:aQ`O,59}OLbQdO,59}O!-OQ!bO,59}O#JoQMlO,59}OOQO,5:{,5:{O#JyQ7[O'#HvO#KaQ`O,5?cOOQ(C[1G/h1G/hO#KiQ7[O'#H{O#K}Q`O,5?nOOQ(CW1G0f1G0fO!;[Q7[O,59}O#LVQtO1G5XO7YQ`O,5>fOOQ(CW'#ES'#ESO#LaQ(DjO'#ETO!@XQ7[O'#D}OOQO'#Hy'#HyO#L{Q7[O,5:hOOQ(C[,5:h,5:hO#MSQ7[O'#D}O#MeQ7[O'#D}O#MlQ7[O'#EYO#MoQ7[O'#ETO#M|Q7[O'#ETO!@XQ7[O'#ETO#NaQ`O1G0PO#NfQqO1G0POOQ(C[1G0P1G0PO){QdO1G0POIWQ&jO1G0POOQ(C[1G0a1G0aO:aQ`O1G0aO!-OQ!bO1G0aO!-WQ&jO1G0aO#NmQ(C|O1G5UO){QdO1G5UO#N}Q(ChO1G5UO$ `Q`O1G5TO7YQ`O,5>hOOQO,5>h,5>hO$ hQ`O,5>hOOQO-E;z-E;zO$ `Q`O1G5TO$ vQ(C}O,59jO$#xQ(C}O,5<UO$%}Q(C}O,5<WO$(SQ(C}O,5<fOOQ(C[7+%|7+%|O$*_Q(C|O7+%|O$+OQ&jO'#HwO$+YQ`O,5?eOOQ(C]1G/r1G/rO$+bQdO'#HxO$+oQ`O,5?fO$+wQtO,5?fOOQ(C[1G/w1G/wOOQ(C[7+&V7+&VO$,RQMlO,5:^O){QdO7+&iO$,]QMlO,5:UOOQO1G1_1G1_OOQO1G1`1G1`O$,jQ!LQO,5;vOLbQdO,5;uOOQO-E;{-E;{OOQ(C[7+&w7+&wOOOO7+'Q7+'QOOOO1G1i1G1iO$,uQ`O1G1iOOQ(C[1G1k1G1kO$,zQqO,59gOOOW-E;q-E;qOOQ(C]1G/P1G/PO$-RQ(C|O7+'WOOQ(C],5>m,5>mO$-rQ`O,5>mOOQ(C]1G2P1G2PP$-wQ`O'#IRPOQ(C]-E<P-E<PO$.hQ,VO1G2[O$/ZQ,VO1G2^O$/eQqO1G2`OOQ(C]1G1x1G1xO$/lQ`O'#IQO$/zQ`O,5?uO$/zQ`O,5?uO$0SQ`O,5?uO$0_Q`O,5?uOOQO1G1z1G1zO$0mQ,VO1G1yOJjQ&jO1G1yO$0}Q&jO'#ISO$1_Q`O,5?vOIWQ&jO,5?vO$1gQqO,5?vOOQ(C]1G1}1G1}OOQ(CW,5<h,5<hOOQ(CW,5<i,5<iO$1qQ`O,5<iO#5}Q`O,5<iO!-OQ!bO,5<hO$1vQ`O,5<jOOQ(CW,5<k,5<kO$1qQ`O,5<nOOQO,5>o,5>oOOQO-E<R-E<ROOQ(C]1G2R1G2RO!'VQ7[O,5<hO$2OQ`O,5<iO!'VQ7[O,5<jO!'VQ7[O,5<iO$2ZQ,VO1G4vO$2eQ,VO1G4vOOQO,5>p,5>pOOQO-E<S-E<SOOQP1G.w1G.wO!.RQ7[O,59lO){QdO,59lO$2rQ`O1G1tOJjQ&jO1G1{O$2wQ(C|O7+'XOOQ(C[7+'X7+'XOGWQdO7+'XOOQ(C[7+%[7+%[O$3hQqO'#J]O#NaQ`O7+'|O$3rQ`O7+'|O$3zQqO7+'|OOQS7+'|7+'|OIWQ&jO7+'|O){QdO7+'|OIWQ&jO7+'|O$4UQ(CyO'#ChO$4iQ(CyO,5<lO$5ZQ`O,5<lOOQ(CW1G4r1G4rOOQS7+$_7+$_O:aQ`O7+$_O!-OQ!bO7+$_OGWQdO7+%|O$5`Q`O'#I]O$5qQ`O,5?}OOQO1G3O1G3OO5tQ`O,5?}O$5qQ`O,5?}O$5yQ`O,5?}OOQO,5>x,5>xOOQO-E<[-E<[OOQ(C[7+&q7+&qO$6OQ`O7+(iO5lQ(ChO7+(iO5tQ`O7+(iO$6TQ`O7+(iO$6YQaO7+'|OOQ(CW,5>r,5>rOOQ(CW-E<U-E<UOOQS7+(W7+(WO$6hQ(CyO7+(TOIWQ&jO7+(TO$6rQqO7+(UOOQS7+(U7+(UOIWQ&jO7+(UO$6yQ`O'#J`O$7UQ`O,5=SOOQO,5>t,5>tOOQO-E<W-E<WOOQS7+(Z7+(ZO$8OQ7[O'#GqOOQS1G2v1G2vOIWQ&jO1G2vO){QdO1G2vOIWQ&jO1G2vO$8VQaO1G2vO$8eQ&kO1G2vO5lQ(ChO1G2yO#6SQ`O1G2yO5bQ`O1G2yO!-OQ!bO1G2yO!-WQ&jO1G2yO$8vQ`O'#I[O$9RQ`O,5?{O$9ZQ7[O,5?{OOQ(CW1G2z1G2zOOQS7+$U7+$UO$9cQ`O7+$UO5lQ(ChO7+$UO$9hQ`O7+$UO){QdO1G5jO){QdO1G5kO$9mQdO1G3RO$9tQ`O1G3RO$9yQdO1G3RO$:QQ(ChO1G5jOOQS7+(k7+(kO5lQ(ChO7+(uO`QdO7+(wOOQS'#Jf'#JfOOQS'#I_'#I_O$:[QdO,5=vOOQS,5=v,5=vO){QdO'#H]O$:iQ`O'#H_OOQS,5=|,5=|O7YQ`O,5=|OOQS,5>O,5>OOOQS7+)Q7+)QOOQS7+)W7+)WOOQS7+)[7+)[OOQS7+)^7+)^OOQO1G5O1G5OO$:nQMlO1G0gO$:xQ`O1G0gOOQO1G/i1G/iO$;TQMlO1G/iO:aQ`O1G/iOLbQdO'#DcOOQO,5>b,5>bOOQO-E;t-E;tOOQO,5>g,5>gOOQO-E;y-E;yO!-OQ!bO1G/iO:aQ`O,5:iOOQO,5:o,5:oO){QdO,5:oO$;_Q(ChO,5:oO$;jQ(ChO,5:oO!-OQ!bO,5:iOOQO-E;w-E;wOOQ(C[1G0S1G0SO!@XQ7[O,5:iO$;xQ7[O,5:iO$<ZQ(DjO,5:oO$<uQ7[O,5:iO!@XQ7[O,5:oOOQO,5:t,5:tO$<|Q7[O,5:oO$=ZQ(ChO,5:oOOQ(C[7+%k7+%kO#NaQ`O7+%kO#NfQqO7+%kOOQ(C[7+%{7+%{O:aQ`O7+%{O!-OQ!bO7+%{O$=oQ(C|O7+*pO){QdO7+*pOOQO1G4S1G4SO7YQ`O1G4SO$>PQ`O7+*oO$>XQ(C}O1G2[O$@^Q(C}O1G2^O$BcQ(C}O1G1yO$DnQ,VO,5>cOOQO-E;u-E;uO$DxQtO,5>dO){QdO,5>dOOQO-E;v-E;vO$ESQ`O1G5QO$E[QMlO1G0bO$GcQMlO1G0mO$GjQMlO1G0mO$IkQMlO1G0mO$IrQMlO1G0mO$KgQMlO1G0mO$KzQMlO1G0mO$NXQMlO1G0mO$N`QMlO1G0mO%!aQMlO1G0mO%!hQMlO1G0mO%$]QMlO1G0mO%$pQ(C|O<<JTO%%rQMmO1G0mO%'|QMmO'#IqO%)iQMlO1G1QOLbQdO'#F^OOQO'#JX'#JXOOQO1G1b1G1bO%)vQ`O1G1aO%){QMlO,5>kOOOO7+'T7+'TOOOW1G/R1G/ROOQ(C]1G4X1G4XOJjQ&jO7+'zO%*VQ`O,5>lO5tQ`O,5>lOOQO-E<O-E<OO%*eQ`O1G5aO%*eQ`O1G5aO%*mQ`O1G5aO%*xQ,VO7+'eO%+YQqO,5>nO%+dQ`O,5>nOIWQ&jO,5>nOOQO-E<Q-E<QO%+iQqO1G5bO%+sQ`O1G5bOOQ(CW1G2T1G2TO$1qQ`O1G2TOOQ(CW1G2S1G2SO%+{Q`O1G2UOIWQ&jO1G2UOOQ(CW1G2Y1G2YO!-OQ!bO1G2SO#5}Q`O1G2TO%,QQ`O1G2UO%,YQ`O1G2TOJjQ&jO7+*bOOQ(C]1G/W1G/WO%,eQ`O1G/WOOQ(C]7+'`7+'`O%,jQ,VO7+'gO%,zQ(C|O<<JsOOQ(C[<<Js<<JsOIWQ&jO'#IVO%-kQ`O,5?wOOQS<<Kh<<KhOIWQ&jO<<KhO#NaQ`O<<KhO%-sQ`O<<KhO%-{QqO<<KhOIWQ&jO1G2WOOQS<<Gy<<GyO:aQ`O<<GyO%.VQ(C|O<<IhOOQ(C[<<Ih<<IhOOQO,5>w,5>wO%.vQ`O,5>wO%.{Q`O,5>wOOQO-E<Z-E<ZO%/TQ`O1G5iO%/TQ`O1G5iO5tQ`O1G5iO%/]Q`O<<LTOOQS<<LT<<LTO%/bQ`O<<LTO5lQ(ChO<<LTO){QdO<<KhOIWQ&jO<<KhOOQS<<Ko<<KoO$6hQ(CyO<<KoOOQS<<Kp<<KpO$6rQqO<<KpO%/gQ7[O'#IXO%/rQ`O,5?zOLbQdO,5?zOOQS1G2n1G2nO#LaQ(DjO'#ETO!@XQ7[O'#GrOOQO'#IZ'#IZO%/zQ7[O,5=]OOQS,5=],5=]O%0RQ7[O'#ETO%0^Q7[O'#ETO%0uQ7[O'#ETO%1PQ7[O'#GrO%1bQ`O7+(bO%1gQ`O7+(bO%1oQqO7+(bOOQS7+(b7+(bOIWQ&jO7+(bO){QdO7+(bOIWQ&jO7+(bO%1yQaO7+(bOOQS7+(e7+(eO5lQ(ChO7+(eO#6SQ`O7+(eO5bQ`O7+(eO!-OQ!bO7+(eO%2XQ`O,5>vOOQO-E<Y-E<YOOQO'#Gu'#GuO%2dQ`O1G5gO5lQ(ChO<<GpOOQS<<Gp<<GpO%2lQ`O<<GpO%2qQ`O7++UO%2vQ`O7++VOOQS7+(m7+(mO%2{Q`O7+(mO%3QQdO7+(mO%3XQ`O7+(mO){QdO7++UO){QdO7++VOOQS<<La<<LaOOQS<<Lc<<LcOOQS-E<]-E<]OOQS1G3b1G3bO%3^Q`O,5=wOOQS,5=y,5=yO%3cQ`O1G3hOLbQdO7+&ROOQO7+%T7+%TO%3hQMlO1G5XO:aQ`O7+%TOOQO1G0T1G0TO%3rQ(C|O1G0ZOOQO1G0Z1G0ZO){QdO1G0ZO%3|Q(ChO1G0ZO:aQ`O1G0TO!-OQ!bO1G0TO!@XQ7[O1G0TO%4XQ(ChO1G0ZO%4gQ7[O1G0TO%4xQ(ChO1G0ZO%5^Q(DjO1G0ZO%5hQ7[O1G0TO!@XQ7[O1G0ZOOQ(C[<<IV<<IVOOQ(C[<<Ig<<IgO:aQ`O<<IgO%5oQ(C|O<<N[OOQO7+)n7+)nO%6PQ(C}O7+'eO%8[Q(C}O7+'gO%:gQtO1G4OO%:qQMlO7+%|O%;gQMmO,59jO%=hQMmO,5<UO%?lQMmO,5<WO%A[QMmO,5<fO%B}QMlO7+'WO%C[QMlO7+'XO%CiQ`O,5;xOOQO7+&{7+&{O%CnQ,VO<<KfOOQO1G4W1G4WO%CuQ`O1G4WO%DQQ`O1G4WO%D`Q`O7+*{O%D`Q`O7+*{OIWQ&jO1G4YO%DhQqO1G4YO%DrQ`O7+*|OOQ(CW7+'o7+'oO$1qQ`O7+'pO%DzQqO7+'pOOQ(CW7+'n7+'nO$1qQ`O7+'oO%ERQ`O7+'pOIWQ&jO7+'pO#5}Q`O7+'oO%EWQ,VO<<M|OOQ(C]7+$r7+$rO%EbQqO,5>qOOQO-E<T-E<TO#NaQ`OANASOOQSANASANASOIWQ&jOANASO%ElQ(CyO7+'rOOQSAN=eAN=eO5tQ`O1G4cOOQO1G4c1G4cO%E|Q`O1G4cO%FRQ`O7++TO%FRQ`O7++TO5lQ(ChOANAoO%FZQ`OANAoOOQSANAoANAoO%F`Q`OANASO%FhQqOANASOOQSANAZANAZOOQSANA[ANA[O%FrQ`O,5>sOOQO-E<V-E<VO%F}QMlO1G5fO#6SQ`O,5=^O5bQ`O,5=^O!-OQ!bO,5=^OOQO-E<X-E<XOOQS1G2w1G2wO$<ZQ(DjO,5:oO!@XQ7[O,5=^O%GXQ7[O,5=^O%GjQ7[O,5:oOOQS<<K|<<K|OIWQ&jO<<K|O%1bQ`O<<K|O%GtQ`O<<K|O%G|QqO<<K|O){QdO<<K|OIWQ&jO<<K|OOQS<<LP<<LPO5lQ(ChO<<LPO#6SQ`O<<LPO5bQ`O<<LPO%HWQ7[O1G4bO%H`Q`O7++ROOQSAN=[AN=[O5lQ(ChOAN=[OOQS<<Np<<NpOOQS<<Nq<<NqOOQS<<LX<<LXO%HhQ`O<<LXO%HmQdO<<LXO%HtQ`O<<NpO%HyQ`O<<NqOOQS1G3c1G3cO:aQ`O7+)SO%IOQMlO<<ImOOQO<<Ho<<HoOOQO7+%u7+%uO%3rQ(C|O7+%uO){QdO7+%uOOQO7+%o7+%oO:aQ`O7+%oO!-OQ!bO7+%oO%IYQ(ChO7+%uO!@XQ7[O7+%oO%IeQ(ChO7+%uO%IsQ7[O7+%oO%JUQ(ChO7+%uOOQ(C[AN?RAN?RO%JjQMlO<<JTO%JwQMmO1G1yO%MOQMmO1G2[O& SQMmO1G2^O&!rQMlO<<JsO&#PQMlO<<IhOOQO1G1d1G1dOJjQ&jOANAQOOQO7+)r7+)rO&#^Q`O7+)rO&#iQ`O<<NgO&#qQqO7+)tOOQ(CW<<K[<<K[O$1qQ`O<<K[OOQ(CW<<KZ<<KZO&#{QqO<<K[O$1qQ`O<<KZOOQSG26nG26nO#NaQ`OG26nOOQO7+)}7+)}O5tQ`O7+)}O&$SQ`O<<NoOOQSG27ZG27ZO5lQ(ChOG27ZOIWQ&jOG26nOLbQdO1G4_O&$[Q`O7++QO5lQ(ChO1G2xO#6SQ`O1G2xO5bQ`O1G2xO!-OQ!bO1G2xO!@XQ7[O1G2xO%5^Q(DjO1G0ZO&$dQ7[O1G2xO%1bQ`OANAhOOQSANAhANAhOIWQ&jOANAhO&$uQ`OANAhO&$}QqOANAhOOQSANAkANAkO5lQ(ChOANAkO#6SQ`OANAkOOQO'#Gv'#GvOOQO7+)|7+)|OOQSG22vG22vOOQSANAsANAsO&%XQ`OANAsOOQSAND[AND[OOQSAND]AND]OOQS<<Ln<<LnOOQO<<Ia<<IaO%3rQ(C|O<<IaOOQO<<IZ<<IZO:aQ`O<<IZO){QdO<<IaO!-OQ!bO<<IZO&%^Q(ChO<<IaO!@XQ7[O<<IZO&%iQ(ChO<<IaO&%wQMmO7+'eO&'jQMmO7+'gO&)]Q,VOG26lOOQO<<M^<<M^OOQ(CWAN@vAN@vO$1qQ`OAN@vOOQ(CWAN@uAN@uOOQSLD,YLD,YOOQO<<Mi<<MiOOQSLD,uLD,uO#NaQ`OLD,YO&)mQMlO7+)yOOQO7+(d7+(dO5lQ(ChO7+(dO#6SQ`O7+(dO5bQ`O7+(dO!-OQ!bO7+(dO!@XQ7[O7+(dOOQSG27SG27SO%1bQ`OG27SOIWQ&jOG27SOOQSG27VG27VO5lQ(ChOG27VOOQSG27_G27_OOQOAN>{AN>{OOQOAN>uAN>uO%3rQ(C|OAN>{O:aQ`OAN>uO){QdOAN>{O!-OQ!bOAN>uO&)wQ(ChOAN>{O&*SQ(C}OG26lOOQ(CWG26bG26bOOQS!$( t!$( tOOQO<<LO<<LOO5lQ(ChO<<LOO#6SQ`O<<LOO5bQ`O<<LOO!-OQ!bO<<LOOOQSLD,nLD,nO%1bQ`OLD,nOOQSLD,qLD,qOOQOG24gG24gOOQOG24aG24aO%3rQ(C|OG24gO:aQ`OG24aO){QdOG24gO&,pQ!LRO,5:rO&-gQ$ITO'#IqOOQOANAjANAjO5lQ(ChOANAjO#6SQ`OANAjO5bQ`OANAjOOQS!$(!Y!$(!YOOQOLD*RLD*ROOQOLD){LD){O%3rQ(C|OLD*RO&.ZQMmOG26lO&/|Q!LRO,59jO&0pQ!LRO,5<UO&1dQ!LRO,5<WO&2WQ!LRO,5<fOOQOG27UG27UO5lQ(ChOG27UO#6SQ`OG27UOOQO!$'Mm!$'MmO&2}Q!LRO1G2[O&3qQ!LRO1G2^O&4eQ!LRO1G1yOOQOLD,pLD,pO5lQ(ChOLD,pO&5[Q!LRO7+'eO&6RQ!LRO7+'gOOQO!$(![!$(![O&6xQ!LROG26lOLbQdO'#DrO&7oQtO'#ItOLbQdO'#DjO&7vQ(C|O'#ChO&8aQtO'#ChO&8qQdO,5:vO&:qQ&jO'#EWOLbQdO,5;ROLbQdO,5;ROLbQdO,5;ROLbQdO,5;ROLbQdO,5;ROLbQdO,5;ROLbQdO,5;ROLbQdO,5;ROLbQdO,5;ROLbQdO,5;ROLbQdO,5;ROLbQdO'#IPO&<OQ`O,5<TO&=eQ&jO,5;ROLbQdO,5;fO!(wQ`O'#DOO!(wQ`O'#DOO!(wQ`O'#DOOIWQ&jO'#FjO&:qQ&jO'#FjO&<WQ&jO'#FjOIWQ&jO'#FlO&:qQ&jO'#FlO&<WQ&jO'#FlOIWQ&jO'#FzO&:qQ&jO'#FzO&<WQ&jO'#FzOLbQdO,5?mO&8qQdO1G0bO&=lQMlO'#ChOLbQdO1G1lOIWQ&jO,5<pO&:qQ&jO,5<pO&<WQ&jO,5<pOIWQ&jO,5<rO&:qQ&jO,5<rO&<WQ&jO,5<rOIWQ&jO,5<_O&:qQ&jO,5<_O&<WQ&jO,5<_O&8qQdO1G1mOLbQdO7+&iOIWQ&jO1G1yO&:qQ&jO1G1yO&<WQ&jO1G1yOIWQ&jO1G1{O&:qQ&jO1G1{O&<WQ&jO1G1{O&8qQdO7+'XO&8qQdO7+%|O&=vQ`O7+'pOIWQ&jOANAQO&:qQ&jOANAQO&<WQ&jOANAQO&=vQ`O<<K[O&=vQ`OAN@vO&={Q`O'#E[O&>QQ`O'#E[O&>YQ`O'#EzO&>_Q`O'#EgO&>dQ`O'#JRO&>oQ`O'#JPO&>zQ`O,5:vO&?PQ,VO,5<QO&?WQ`O'#FsO&?]Q`O'#FsO&?bQ`O'#FsO&?gQ`O,5<RO&?oQ`O,5:vO&?wQMlO1G0}O&@OQ`O,5<_O&@TQ`O,5<_O&@YQ`O,5<_O&@_Q`O,5<aO&@dQ`O,5<aO&@iQ`O,5<aO&@nQ`O1G1mO&@sQ`O1G0bO&@xQ`O1G2UO&@}Q,VO<<KfO&AUQ,VO<<KfO&A]Q,VO<<KfO&AdQqO7+'pO&AkQ`O7+'pO&ApQqO<<K[O4QQ&jO'#FhO5bQ`O'#FgOBzQ`O'#EZOLbQdO,5;cO!&WQ`O'#FsO!&WQ`O'#FsO!&WQ`O'#FsO!&WQ`O'#FuO!&WQ`O'#FuO!&WQ`O'#FuO&AwQ`O,5<jOJjQ&jO7+'zOJjQ&jO7+'zOJjQ&jO7+'zOIWQ&jO1G2UO&BPQ`O1G2UOIWQ&jO7+'pO!'VQ7[O'#GOO$/eQqO1G2`O$/eQqO1G2`O$/eQqO1G2`O!'VQ7[O,5<jOIWQ&jO,5<tOIWQ&jO,5<tOIWQ&jO,5<t",
    stateData: "&B}~O'YOS'ZOSTOSUOS~OQTORTOXyO]cO_hObnOcmOhcOjTOkcOlcOqTOsTOxRO{cO|cO}cO!TSO!_kO!dUO!gTO!hTO!iTO!jTO!kTO!nlO#dsO#tpO#x^O%PqO%RtO%TrO%UrO%XuO%ZvO%^wO%_wO%axO%nzO%t{O%v|O%x}O%z!OO%}!PO&T!QO&Z!RO&]!SO&_!TO&a!UO&c!VO']PO'fQO'oYO'|aO~OQ[XZ[X_[Xj[Xu[Xv[Xx[X!R[X!a[X!b[X!d[X!j[X!{[X#WdX#[[X#][X#^[X#_[X#`[X#a[X#b[X#c[X#e[X#g[X#i[X#j[X#o[X'W[X'f[X'p[X'w[X'x[X~O!]$lX~P$zOS!WO'U!XO'V!ZO~OQTORTO]cOb!kOc!jOhcOjTOkcOlcOqTOsTOxRO{cO|cO}cO!T!bO!_kO!dUO!gTO!hTO!iTO!jTO!kTO!n!iO#t!lO#x^O']![O'fQO'oYO'|aO~O!Q!`O!R!]O!O'jP!O'tP~P'dO!S!mO~P`OQTORTO]cOb!kOc!jOhcOjTOkcOlcOqTOsTOxRO{cO|cO}cO!T!bO!_kO!dUO!gTO!hTO!iTO!jTO!kTO!n!iO#t!lO#x^O']9aO'fQO'oYO'|aO~OQTORTO]cOb!kOc!jOhcOjTOkcOlcOqTOsTOxRO{cO|cO}cO!T!bO!_kO!dUO!gTO!hTO!iTO!jTO!kTO!n!iO#t!lO#x^O'fQO'oYO'|aO~O!Q!rO#U!uO#V!rO']9bO!c'qP~P+{O#W!vO~O!]!wO#W!vO~OQ#^OZ#dOj#ROu!{Ov!{Ox!|O!R#bO!a#TO!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO#a#TO#b#TO#c#TO#e#UO#g#WO#i#YO#j#ZO'fQO'p#[O'w!}O'x#OO~O_'hX'W'hX!c'hX!O'hX!T'hX%Q'hX!]'hX~P.jO!{#eO#o#eOQ'iXZ'iX_'iXj'iXu'iXv'iXx'iX!R'iX!a'iX!b'iX!d'iX!j'iX#['iX#]'iX#^'iX#_'iX#`'iX#a'iX#b'iX#e'iX#g'iX#i'iX#j'iX'f'iX'p'iX'w'iX'x'iX~O#c'iX'W'iX!O'iX!c'iXn'iX!T'iX%Q'iX!]'iX~P0zO!{#eO~O#z#fO$R#jO~O!T#kO#x^O$U#lO$W#nO~O]#qOh$QOj#rOk#qOl#qOq$ROs$SOx#yO!T#zO!_$XO!d#vO#V$YO#t$VO$_$TO$a$UO$d$WO']#pO'b$PO'f#sO'a'cP~O!d$ZO~O!]$]O~O_$^O'W$^O~O']$bO~O!d$ZO']$bO'^$dO'b$PO~Oc$jO!d$ZO']$bO~O#c#TO~O]$sOu$oO!T$lO!d$nO%R$rO']$bO'^$dO^(UP~O!n$tO~Ox$uO!T$vO']$bO~Ox$uO!T$vO%Z$zO']$bO~O']${O~O#dsO%RtO%TrO%UrO%XuO%ZvO%^wO%_wO~Ob%UOc%TO!n%RO%P%SO%c%QO~P7xOb%XOcmO!T%WO!nlO#dsO%PqO%TrO%UrO%XuO%ZvO%^wO%_wO%axO~O`%[O!{%_O%R%YO'^$dO~P8wO!d%`O!g%dO~O!d%eO~O!TSO~O_$^O'T%mO'W$^O~O_$^O'T%pO'W$^O~O_$^O'T%rO'W$^O~OS!WO'U!XO'V%vO~OQ[XZ[Xj[Xu[Xv[Xx[X!R[X!RdX!a[X!b[X!d[X!j[X!{[X!{dX#WdX#[[X#][X#^[X#_[X#`[X#a[X#b[X#c[X#e[X#g[X#i[X#j[X#o[X'f[X'p[X'w[X'x[X~O!O[X!OdX~P;dO!Q%xO!O&iX!O&nX!R&iX!R&nX~P'dO!R%zO!O'jX~OQ#^OZ#dOj#ROu!{Ov!{Ox!|O!R%zO!a#TO!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO#a#TO#b#TO#c#TO#e#UO#g#WO#i#YO#j#ZO'fQO'p#[O'w!}O'x#OO~O!O'jX~P>aO!O&PO~Ox&SO!W&^O!X&VO!Y&VO'^$dO~O]&TOk&TO!Q&WO'g&QO!S'kP!S'vP~P@dO!O'sX!R'sX!]'sX!c'sX'p'sX~O!{'sX#W#PX!S'sX~PA]O!{&_O!O'uX!R'uX~O!R&`O!O'tX~O!O&cO~O!{#eO~PA]OP&gO!T&dO!o&fO']$bO~Oc&lO!d$ZO']$bO~Ou$oO!d$nO~O!S&mO~P`Ou!{Ov!{Ox!|O!b!yO!d!zO'fQOQ!faZ!faj!fa!R!fa!a!fa!j!fa#[!fa#]!fa#^!fa#_!fa#`!fa#a!fa#b!fa#c!fa#e!fa#g!fa#i!fa#j!fa'p!fa'w!fa'x!fa~O_!fa'W!fa!O!fa!c!fan!fa!T!fa%Q!fa!]!fa~PCfO!c&nO~O!]!wO!{&pO'p&oO!R'rX_'rX'W'rX~O!c'rX~PFOO!R&tO!c'qX~O!c&vO~Ox$uO!T$vO#V&wO']$bO~OQTORTO]cOb!kOc!jOhcOjTOkcOlcOqTOsTOxRO{cO|cO}cO!TSO!_kO!dUO!gTO!hTO!iTO!jTO!kTO!n!iO#t!lO#x^O']9aO'fQO'oYO'|aO~O]#qOh$QOj#rOk#qOl#qOq$ROs9tOx#yO!T#zO!_;eO!d#vO#V9}O#t$VO$_9wO$a9zO$d$WO']&{O'b$PO'f#sO~O#W&}O~O]#qOh$QOj#rOk#qOl#qOq$ROs$SOx#yO!T#zO!_$XO!d#vO#V$YO#t$VO$_$TO$a$UO$d$WO']&{O'b$PO'f#sO~O'a'mP~PJjO!Q'RO!c'nP~P){O'g'TO'oYO~OQ9^OR9^O]cOb;`Oc!jOhcOj9^OkcOlcOq9^Os9^OxRO{cO|cO}cO!T!bO!_9`O!dUO!g9^O!h9^O!i9^O!j9^O!k9^O!n!iO#t!lO#x^O']'cO'fQO'oYO'|;^O~O!d!zO~O!R#bO_$]a'W$]a!c$]a!O$]a!T$]a%Q$]a!]$]a~O#d'jO~PIWO!]'lO!T'yX#w'yX#z'yX$R'yX~Ou'mO~P! YOu'mO!T'yX#w'yX#z'yX$R'yX~O!T'oO#w'sO#z'nO$R'tO~O!Q'wO~PLbO#z#fO$R'zO~OP$eXu$eXx$eX!b$eX'w$eX'x$eX~OPfX!RfX!{fX'afX'a$eX~P!!rOk'|O~OS'}O'U(OO'V(QO~OP(ZOu(SOx(TO'w(VO'x(XO~O'a(RO~P!#{O'a([O~O]#qOh$QOj#rOk#qOl#qOq$ROs9tOx#yO!T#zO!_;eO!d#vO#V9}O#t$VO$_9wO$a9zO$d$WO'b$PO'f#sO~O!Q(`O'](]O!c'}P~P!$jO#W(bO~O!d(cO~O!Q(hO'](eO!O(OP~P!$jOj(uOx(mO!W(sO!X(lO!Y(lO!d(cO!x(tO$w(oO'^$dO'g(jO~O!S(rO~P!&jO!b!yOP'eXu'eXx'eX'w'eX'x'eX!R'eX!{'eX~O'a'eX#m'eX~P!'cOP(xO!{(wO!R'dX'a'dX~O!R(yO'a'cX~O']${O'a'cP~O'](|O~O!d)RO~O']&{O~Ox$uO!Q!rO!T$vO#U!uO#V!rO']$bO!c'qP~O!]!wO#W)VO~OQ#^OZ#dOj#ROu!{Ov!{Ox!|O!a#TO!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO#a#TO#b#TO#c#TO#e#UO#g#WO#i#YO#j#ZO'fQO'p#[O'w!}O'x#OO~O_!^a!R!^a'W!^a!O!^a!c!^an!^a!T!^a%Q!^a!]!^a~P!)wOP)_O!T&dO!o)^O%Q)]O'b$PO~O!])aO!T'`X_'`X!R'`X'W'`X~O!d$ZO'b$PO~O!d$ZO']$bO'b$PO~O!]!wO#W&}O~O])lO%R)mO'])iO!S(VP~O!R)nO^(UX~O'g'TO~OZ)rO~O^)sO~O!T$lO']$bO'^$dO^(UP~Ox$uO!Q)xO!R&`O!T$vO']$bO!O'tP~O]&ZOk&ZO!Q)yO'g'TO!S'vP~O!R)zO_(RX'W(RX~O!{*OO'b$PO~OP*RO!T#zO'b$PO~O!T*TO~Ou*VO!TSO~O!n*[O~Oc*aO~O'](|O!S(TP~Oc$jO~O%RtO']${O~P8wOZ*gO^*fO~OQTORTO]cObnOcmOhcOjTOkcOlcOqTOsTOxRO{cO|cO}cO!_kO!dUO!gTO!hTO!iTO!jTO!kTO!nlO#x^O%PqO'fQO'oYO'|aO~O!T!bO#t!lO']9aO~P!1_O^*fO_$^O'W$^O~O_*kO#d*mO%T*mO%U*mO~P){O!d%`O~O%t*rO~O!T*tO~O&V*vO&X*wOQ&SaR&SaX&Sa]&Sa_&Sab&Sac&Sah&Saj&Sak&Sal&Saq&Sas&Sax&Sa{&Sa|&Sa}&Sa!T&Sa!_&Sa!d&Sa!g&Sa!h&Sa!i&Sa!j&Sa!k&Sa!n&Sa#d&Sa#t&Sa#x&Sa%P&Sa%R&Sa%T&Sa%U&Sa%X&Sa%Z&Sa%^&Sa%_&Sa%a&Sa%n&Sa%t&Sa%v&Sa%x&Sa%z&Sa%}&Sa&T&Sa&Z&Sa&]&Sa&_&Sa&a&Sa&c&Sa'S&Sa']&Sa'f&Sa'o&Sa'|&Sa!S&Sa%{&Sa`&Sa&Q&Sa~O']*|O~On+PO~O!O&ia!R&ia~P!)wO!Q+TO!O&iX!R&iX~P){O!R%zO!O'ja~O!O'ja~P>aO!R&`O!O'ta~O!RwX!R!ZX!SwX!S!ZX!]wX!]!ZX!d!ZX!{wX'b!ZX~O!]+YO!{+XO!R#TX!R'lX!S#TX!S'lX!]'lX!d'lX'b'lX~O!]+[O!d$ZO'b$PO!R!VX!S!VX~O]&ROk&ROx&SO'g(jO~OQ9^OR9^O]cOb;`Oc!jOhcOj9^OkcOlcOq9^Os9^OxRO{cO|cO}cO!T!bO!_9`O!dUO!g9^O!h9^O!i9^O!j9^O!k9^O!n!iO#t!lO#x^O'fQO'oYO'|;^O~O']:SO~P!;jO!R+`O!S'kX~O!S+bO~O!]+YO!{+XO!R#TX!S#TX~O!R+cO!S'vX~O!S+eO~O]&ROk&ROx&SO'^$dO'g(jO~O!X+fO!Y+fO~P!>hOx$uO!Q+hO!T$vO']$bO!O&nX!R&nX~O_+lO!W+oO!X+kO!Y+kO!r+sO!s+qO!t+rO!u+pO!x+tO'^$dO'g(jO'o+iO~O!S+nO~P!?iOP+yO!T&dO!o+xO~O!{,PO!R'ra!c'ra_'ra'W'ra~O!]!wO~P!@sO!R&tO!c'qa~Ox$uO!Q,SO!T$vO#U,UO#V,SO']$bO!R&pX!c&pX~O_#Oi!R#Oi'W#Oi!O#Oi!c#Oin#Oi!T#Oi%Q#Oi!]#Oi~P!)wOP;tOu(SOx(TO'w(VO'x(XO~O#W!za!R!za!c!za!{!za!T!za_!za'W!za!O!za~P!BpO#W'eXQ'eXZ'eX_'eXj'eXv'eX!a'eX!d'eX!j'eX#['eX#]'eX#^'eX#_'eX#`'eX#a'eX#b'eX#c'eX#e'eX#g'eX#i'eX#j'eX'W'eX'f'eX'p'eX!c'eX!O'eX!T'eXn'eX%Q'eX!]'eX~P!'cO!R,_O'a'mX~P!#{O'a,aO~O!R,bO!c'nX~P!)wO!c,eO~O!O,fO~OQ#^Ou!{Ov!{Ox!|O!b!yO!d!zO!j#^O'fQOZ#Zi_#Zij#Zi!R#Zi!a#Zi#]#Zi#^#Zi#_#Zi#`#Zi#a#Zi#b#Zi#c#Zi#e#Zi#g#Zi#i#Zi#j#Zi'W#Zi'p#Zi'w#Zi'x#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~O#[#Zi~P!FfO#[#PO~P!FfOQ#^Ou!{Ov!{Ox!|O!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO'fQOZ#Zi_#Zi!R#Zi!a#Zi#`#Zi#a#Zi#b#Zi#c#Zi#e#Zi#g#Zi#i#Zi#j#Zi'W#Zi'p#Zi'w#Zi'x#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~Oj#Zi~P!IQOj#RO~P!IQOQ#^Oj#ROu!{Ov!{Ox!|O!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO'fQO_#Zi!R#Zi#e#Zi#g#Zi#i#Zi#j#Zi'W#Zi'p#Zi'w#Zi'x#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~OZ#Zi!a#Zi#a#Zi#b#Zi#c#Zi~P!KlOZ#dO!a#TO#a#TO#b#TO#c#TO~P!KlOQ#^OZ#dOj#ROu!{Ov!{Ox!|O!a#TO!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO#a#TO#b#TO#c#TO#e#UO'fQO_#Zi!R#Zi#g#Zi#i#Zi#j#Zi'W#Zi'p#Zi'x#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~O'w#Zi~P!NdO'w!}O~P!NdOQ#^OZ#dOj#ROu!{Ov!{Ox!|O!a#TO!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO#a#TO#b#TO#c#TO#e#UO#g#WO'fQO'w!}O_#Zi!R#Zi#i#Zi#j#Zi'W#Zi'p#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~O'x#Zi~P##OO'x#OO~P##OOQ#^OZ#dOj#ROu!{Ov!{Ox!|O!a#TO!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO#a#TO#b#TO#c#TO#e#UO#g#WO#i#YO'fQO'w!}O'x#OO~O_#Zi!R#Zi#j#Zi'W#Zi'p#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~P#%jOQ[XZ[Xj[Xu[Xv[Xx[X!a[X!b[X!d[X!j[X!{[X#WdX#[[X#][X#^[X#_[X#`[X#a[X#b[X#c[X#e[X#g[X#i[X#j[X#o[X'f[X'p[X'w[X'x[X!R[X!S[X~O#m[X~P#'}OQ#^OZ9rOj9gOu!{Ov!{Ox!|O!a9iO!b!yO!d!zO!j#^O#[9eO#]9fO#^9fO#_9fO#`9hO#a9iO#b9iO#c9iO#e9jO#g9lO#i9nO#j9oO'fQO'p#[O'w!}O'x#OO~O#m,hO~P#*XOQ'iXZ'iXj'iXu'iXv'iXx'iX!a'iX!b'iX!d'iX!j'iX#['iX#]'iX#^'iX#_'iX#`'iX#a'iX#b'iX#e'iX#g'iX#i'iX#j'iX'f'iX'p'iX'w'iX'x'iX!R'iX~O!{9sO#o9sO#c'iX#m'iX!S'iX~P#,SO_&sa!R&sa'W&sa!c&san&sa!O&sa!T&sa%Q&sa!]&sa~P!)wOQ#ZiZ#Zi_#Zij#Ziv#Zi!R#Zi!a#Zi!b#Zi!d#Zi!j#Zi#[#Zi#]#Zi#^#Zi#_#Zi#`#Zi#a#Zi#b#Zi#c#Zi#e#Zi#g#Zi#i#Zi#j#Zi'W#Zi'f#Zi'p#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~P!BpO_#ni!R#ni'W#ni!O#ni!c#nin#ni!T#ni%Q#ni!]#ni~P!)wO#z,jO~O#z,kO~O!]'lO!{,lO!T$OX#w$OX#z$OX$R$OX~O!Q,mO~O!T'oO#w,oO#z'nO$R,pO~O!R9pO!S'hX~P#*XO!S,qO~O$R,sO~OS'}O'U(OO'V,vO~O],yOk,yO!O,zO~O!RdX!]dX!cdX!c$eX'pdX~P!!rO!c-QO~P!BpO!R-RO!]!wO'p&oO!c'}X~O!c-WO~O!Q(`O']$bO!c'}P~O#W-YO~O!O$eX!R$eX!]$lX~P!!rO!R-ZO!O(OX~P!BpO!]-]O~O!O-_O~Oj-cO!]!wO!d$ZO'b$PO'p&oO~O!])aO~O_$^O!R-hO'W$^O~O!S-jO~P!&jO!X-kO!Y-kO'^$dO'g(jO~Ox-mO'g(jO~O!x-nO~O']${O!R&xX'a&xX~O!R(yO'a'ca~O'a-sO~Ou-tOv-tOx-uOPra'wra'xra!Rra!{ra~O'ara#mra~P#7pOu(SOx(TOP$^a'w$^a'x$^a!R$^a!{$^a~O'a$^a#m$^a~P#8fOu(SOx(TOP$`a'w$`a'x$`a!R$`a!{$`a~O'a$`a#m$`a~P#9XO]-vO~O#W-wO~O'a$na!R$na!{$na#m$na~P!#{O#W-zO~OP.TO!T&dO!o.SO%Q.RO~O]#qOj#rOk#qOl#qOq$ROs9tOx#yO!T#zO!_;eO!d#vO#V9}O#t$VO$_9wO$a9zO$d$WO'b$PO'f#sO~Oh.VO'].UO~P#:yO!])aO!T'`a_'`a!R'`a'W'`a~O#W.]O~OZ[X!RdX!SdX~O!R.^O!S(VX~O!S.`O~OZ.aO~O].cO'])iO~O!T$lO']$bO^'QX!R'QX~O!R)nO^(Ua~O!c.fO~P!)wO].hO~OZ.iO~O^.jO~OP.TO!T&dO!o.SO%Q.RO'b$PO~O!R)zO_(Ra'W(Ra~O!{.pO~OP.sO!T#zO~O'g'TO!S(SP~OP.}O!T.yO!o.|O%Q.{O'b$PO~OZ/XO!R/VO!S(TX~O!S/YO~O^/[O_$^O'W$^O~O]/]O~O]/^O'](|O~O#c/_O%r/`O~P0zO!{#eO#c/_O%r/`O~O_/aO~P){O_/cO~O%{/gOQ%yiR%yiX%yi]%yi_%yib%yic%yih%yij%yik%yil%yiq%yis%yix%yi{%yi|%yi}%yi!T%yi!_%yi!d%yi!g%yi!h%yi!i%yi!j%yi!k%yi!n%yi#d%yi#t%yi#x%yi%P%yi%R%yi%T%yi%U%yi%X%yi%Z%yi%^%yi%_%yi%a%yi%n%yi%t%yi%v%yi%x%yi%z%yi%}%yi&T%yi&Z%yi&]%yi&_%yi&a%yi&c%yi'S%yi']%yi'f%yi'o%yi'|%yi!S%yi`%yi&Q%yi~O`/mO!S/kO&Q/lO~P`O!TSO!d/oO~O&X*wOQ&SiR&SiX&Si]&Si_&Sib&Sic&Sih&Sij&Sik&Sil&Siq&Sis&Six&Si{&Si|&Si}&Si!T&Si!_&Si!d&Si!g&Si!h&Si!i&Si!j&Si!k&Si!n&Si#d&Si#t&Si#x&Si%P&Si%R&Si%T&Si%U&Si%X&Si%Z&Si%^&Si%_&Si%a&Si%n&Si%t&Si%v&Si%x&Si%z&Si%}&Si&T&Si&Z&Si&]&Si&_&Si&a&Si&c&Si'S&Si']&Si'f&Si'o&Si'|&Si!S&Si%{&Si`&Si&Q&Si~O!R#bOn$]a~O!O&ii!R&ii~P!)wO!R%zO!O'ji~O!R&`O!O'ti~O!O/uO~O!R!Va!S!Va~P#*XO]&ROk&RO!Q/{O'g(jO!R&jX!S&jX~P@dO!R+`O!S'ka~O]&ZOk&ZO!Q)yO'g'TO!R&oX!S&oX~O!R+cO!S'va~O!O'ui!R'ui~P!)wO_$^O!]!wO!d$ZO!j0VO!{0TO'W$^O'b$PO'p&oO~O!S0YO~P!?iO!X0ZO!Y0ZO'^$dO'g(jO'o+iO~O!W0[O~P#MSO!TSO!W0[O!u0^O!x0_O~P#MSO!W0[O!s0aO!t0aO!u0^O!x0_O~P#MSO!T&dO~O!T&dO~P!BpO!R'ri!c'ri_'ri'W'ri~P!)wO!{0jO!R'ri!c'ri_'ri'W'ri~O!R&tO!c'qi~Ox$uO!T$vO#V0lO']$bO~O#WraQraZra_rajra!ara!bra!dra!jra#[ra#]ra#^ra#_ra#`ra#ara#bra#cra#era#gra#ira#jra'Wra'fra'pra!cra!Ora!Tranra%Qra!]ra~P#7pO#W$^aQ$^aZ$^a_$^aj$^av$^a!a$^a!b$^a!d$^a!j$^a#[$^a#]$^a#^$^a#_$^a#`$^a#a$^a#b$^a#c$^a#e$^a#g$^a#i$^a#j$^a'W$^a'f$^a'p$^a!c$^a!O$^a!T$^an$^a%Q$^a!]$^a~P#8fO#W$`aQ$`aZ$`a_$`aj$`av$`a!a$`a!b$`a!d$`a!j$`a#[$`a#]$`a#^$`a#_$`a#`$`a#a$`a#b$`a#c$`a#e$`a#g$`a#i$`a#j$`a'W$`a'f$`a'p$`a!c$`a!O$`a!T$`an$`a%Q$`a!]$`a~P#9XO#W$naQ$naZ$na_$naj$nav$na!R$na!a$na!b$na!d$na!j$na#[$na#]$na#^$na#_$na#`$na#a$na#b$na#c$na#e$na#g$na#i$na#j$na'W$na'f$na'p$na!c$na!O$na!T$na!{$nan$na%Q$na!]$na~P!BpO_#Oq!R#Oq'W#Oq!O#Oq!c#Oqn#Oq!T#Oq%Q#Oq!]#Oq~P!)wO!R&kX'a&kX~PJjO!R,_O'a'ma~O!Q0tO!R&lX!c&lX~P){O!R,bO!c'na~O!R,bO!c'na~P!)wO#m!fa!S!fa~PCfO#m!^a!R!^a!S!^a~P#*XO!T1XO#x^O$P1YO~O!S1^O~On1_O~P!BpO_$Yq!R$Yq'W$Yq!O$Yq!c$Yqn$Yq!T$Yq%Q$Yq!]$Yq~P!)wO!O1`O~O],yOk,yO~Ou(SOx(TO'x(XOP$xi'w$xi!R$xi!{$xi~O'a$xi#m$xi~P$.POu(SOx(TOP$zi'w$zi'x$zi!R$zi!{$zi~O'a$zi#m$zi~P$.rO'p#[O~P!BpO!Q1cO']$bO!R&tX!c&tX~O!R-RO!c'}a~O!R-RO!]!wO!c'}a~O!R-RO!]!wO'p&oO!c'}a~O'a$gi!R$gi!{$gi#m$gi~P!#{O!Q1kO'](eO!O&vX!R&vX~P!$jO!R-ZO!O(Oa~O!R-ZO!O(Oa~P!BpO!]!wO~O!]!wO#c1sO~Oj1vO!]!wO'p&oO~O!R'di'a'di~P!#{O!{1yO!R'di'a'di~P!#{O!c1|O~O_$Zq!R$Zq'W$Zq!O$Zq!c$Zqn$Zq!T$Zq%Q$Zq!]$Zq~P!)wO!R2QO!T(PX~P!BpO!T&dO%Q2TO~O!T&dO%Q2TO~P!BpO!T$eX$u[X_$eX!R$eX'W$eX~P!!rO$u2XOPgXugXxgX!TgX'wgX'xgX_gX!RgX'WgX~O$u2XO~O]2_O%R2`O'])iO!R'PX!S'PX~O!R.^O!S(Va~OZ2dO~O^2eO~O]2hO~OP2jO!T&dO!o2iO%Q2TO~O_$^O'W$^O~P!BpO!T#zO~P!BpO!R2oO!{2qO!S(SX~O!S2rO~Ox;oO!W2{O!X2tO!Y2tO!r2zO!s2yO!t2yO!x2xO'^$dO'g(jO'o+iO~O!S2wO~P$7ZOP3SO!T.yO!o3RO%Q3QO~OP3SO!T.yO!o3RO%Q3QO'b$PO~O'](|O!R'OX!S'OX~O!R/VO!S(Ta~O]3^O'g3]O~O]3_O~O^3aO~O!c3dO~P){O_3fO~O_3fO~P){O#c3hO%r3iO~PFOO`/mO!S3mO&Q/lO~P`O!]3oO~O!R#Ti!S#Ti~P#*XO!{3qO!R#Ti!S#Ti~O!R!Vi!S!Vi~P#*XO_$^O!{3xO'W$^O~O_$^O!]!wO!{3xO'W$^O~O!X3|O!Y3|O'^$dO'g(jO'o+iO~O_$^O!]!wO!d$ZO!j3}O!{3xO'W$^O'b$PO'p&oO~O!W4OO~P$;xO!W4OO!u4RO!x4SO~P$;xO_$^O!]!wO!j3}O!{3xO'W$^O'p&oO~O!R'rq!c'rq_'rq'W'rq~P!)wO!R&tO!c'qq~O#W$xiQ$xiZ$xi_$xij$xiv$xi!a$xi!b$xi!d$xi!j$xi#[$xi#]$xi#^$xi#_$xi#`$xi#a$xi#b$xi#c$xi#e$xi#g$xi#i$xi#j$xi'W$xi'f$xi'p$xi!c$xi!O$xi!T$xin$xi%Q$xi!]$xi~P$.PO#W$ziQ$ziZ$zi_$zij$ziv$zi!a$zi!b$zi!d$zi!j$zi#[$zi#]$zi#^$zi#_$zi#`$zi#a$zi#b$zi#c$zi#e$zi#g$zi#i$zi#j$zi'W$zi'f$zi'p$zi!c$zi!O$zi!T$zin$zi%Q$zi!]$zi~P$.rO#W$giQ$giZ$gi_$gij$giv$gi!R$gi!a$gi!b$gi!d$gi!j$gi#[$gi#]$gi#^$gi#_$gi#`$gi#a$gi#b$gi#c$gi#e$gi#g$gi#i$gi#j$gi'W$gi'f$gi'p$gi!c$gi!O$gi!T$gi!{$gin$gi%Q$gi!]$gi~P!BpO!R&ka'a&ka~P!#{O!R&la!c&la~P!)wO!R,bO!c'ni~O#m#Oi!R#Oi!S#Oi~P#*XOQ#^Ou!{Ov!{Ox!|O!b!yO!d!zO!j#^O'fQOZ#Zij#Zi!a#Zi#]#Zi#^#Zi#_#Zi#`#Zi#a#Zi#b#Zi#c#Zi#e#Zi#g#Zi#i#Zi#j#Zi#m#Zi'p#Zi'w#Zi'x#Zi!R#Zi!S#Zi~O#[#Zi~P$EiO#[9eO~P$EiOQ#^Ou!{Ov!{Ox!|O!b!yO!d!zO!j#^O#[9eO#]9fO#^9fO#_9fO'fQOZ#Zi!a#Zi#`#Zi#a#Zi#b#Zi#c#Zi#e#Zi#g#Zi#i#Zi#j#Zi#m#Zi'p#Zi'w#Zi'x#Zi!R#Zi!S#Zi~Oj#Zi~P$GqOj9gO~P$GqOQ#^Oj9gOu!{Ov!{Ox!|O!b!yO!d!zO!j#^O#[9eO#]9fO#^9fO#_9fO#`9hO'fQO#e#Zi#g#Zi#i#Zi#j#Zi#m#Zi'p#Zi'w#Zi'x#Zi!R#Zi!S#Zi~OZ#Zi!a#Zi#a#Zi#b#Zi#c#Zi~P$IyOZ9rO!a9iO#a9iO#b9iO#c9iO~P$IyOQ#^OZ9rOj9gOu!{Ov!{Ox!|O!a9iO!b!yO!d!zO!j#^O#[9eO#]9fO#^9fO#_9fO#`9hO#a9iO#b9iO#c9iO#e9jO'fQO#g#Zi#i#Zi#j#Zi#m#Zi'p#Zi'x#Zi!R#Zi!S#Zi~O'w#Zi~P$L_O'w!}O~P$L_OQ#^OZ9rOj9gOu!{Ov!{Ox!|O!a9iO!b!yO!d!zO!j#^O#[9eO#]9fO#^9fO#_9fO#`9hO#a9iO#b9iO#c9iO#e9jO#g9lO'fQO'w!}O#i#Zi#j#Zi#m#Zi'p#Zi!R#Zi!S#Zi~O'x#Zi~P$NgO'x#OO~P$NgOQ#^OZ9rOj9gOu!{Ov!{Ox!|O!a9iO!b!yO!d!zO!j#^O#[9eO#]9fO#^9fO#_9fO#`9hO#a9iO#b9iO#c9iO#e9jO#g9lO#i9nO'fQO'w!}O'x#OO~O#j#Zi#m#Zi'p#Zi!R#Zi!S#Zi~P%!oO_#ky!R#ky'W#ky!O#ky!c#kyn#ky!T#ky%Q#ky!]#ky~P!)wOP;vOu(SOx(TO'w(VO'x(XO~OQ#ZiZ#Zij#Ziv#Zi!a#Zi!b#Zi!d#Zi!j#Zi#[#Zi#]#Zi#^#Zi#_#Zi#`#Zi#a#Zi#b#Zi#c#Zi#e#Zi#g#Zi#i#Zi#j#Zi#m#Zi'f#Zi'p#Zi!R#Zi!S#Zi~P%%aO!b!yOP'eXu'eXx'eX'w'eX'x'eX!S'eX~OQ'eXZ'eXj'eXv'eX!a'eX!d'eX!j'eX#['eX#]'eX#^'eX#_'eX#`'eX#a'eX#b'eX#c'eX#e'eX#g'eX#i'eX#j'eX#m'eX'f'eX'p'eX!R'eX~P%'eO#m#ni!R#ni!S#ni~P#*XO!S4eO~O!R&sa!S&sa~P#*XO!]!wO'p&oO!R&ta!c&ta~O!R-RO!c'}i~O!R-RO!]!wO!c'}i~O'a$gq!R$gq!{$gq#m$gq~P!#{O!O&va!R&va~P!BpO!]4lO~O!R-ZO!O(Oi~P!BpO!R-ZO!O(Oi~O!O4pO~O!]!wO#c4uO~Oj4vO!]!wO'p&oO~O!O4xO~O'a$iq!R$iq!{$iq#m$iq~P!#{O_$Zy!R$Zy'W$Zy!O$Zy!c$Zyn$Zy!T$Zy%Q$Zy!]$Zy~P!)wO!R2QO!T(Pa~O!T&dO%Q4}O~O!T&dO%Q4}O~P!BpO_#Oy!R#Oy'W#Oy!O#Oy!c#Oyn#Oy!T#Oy%Q#Oy!]#Oy~P!)wOZ5QO~O]5SO'])iO~O!R.^O!S(Vi~O]5VO~O^5WO~O'g'TO!R&{X!S&{X~O!R2oO!S(Sa~O!S5eO~P$7ZOx;sO'g(jO'o+iO~O!W5hO!X5gO!Y5gO!x0_O'^$dO'g(jO'o+iO~O!s5iO!t5iO~P%0^O!X5gO!Y5gO'^$dO'g(jO'o+iO~O!T.yO~O!T.yO%Q5kO~O!T.yO%Q5kO~P!BpOP5pO!T.yO!o5oO%Q5kO~OZ5uO!R'Oa!S'Oa~O!R/VO!S(Ti~O]5xO~O!c5yO~O!c5zO~O!c5{O~O!c5{O~P){O_5}O~O!]6QO~O!c6RO~O!R'ui!S'ui~P#*XO_$^O'W$^O~P!)wO_$^O!{6WO'W$^O~O_$^O!]!wO!{6WO'W$^O~O!X6]O!Y6]O'^$dO'g(jO'o+iO~O_$^O!]!wO!j6^O!{6WO'W$^O'p&oO~O!d$ZO'b$PO~P%4xO!W6_O~P%4gO!R'ry!c'ry_'ry'W'ry~P!)wO#W$gqQ$gqZ$gq_$gqj$gqv$gq!R$gq!a$gq!b$gq!d$gq!j$gq#[$gq#]$gq#^$gq#_$gq#`$gq#a$gq#b$gq#c$gq#e$gq#g$gq#i$gq#j$gq'W$gq'f$gq'p$gq!c$gq!O$gq!T$gq!{$gqn$gq%Q$gq!]$gq~P!BpO#W$iqQ$iqZ$iq_$iqj$iqv$iq!R$iq!a$iq!b$iq!d$iq!j$iq#[$iq#]$iq#^$iq#_$iq#`$iq#a$iq#b$iq#c$iq#e$iq#g$iq#i$iq#j$iq'W$iq'f$iq'p$iq!c$iq!O$iq!T$iq!{$iqn$iq%Q$iq!]$iq~P!BpO!R&li!c&li~P!)wO#m#Oq!R#Oq!S#Oq~P#*XOu-tOv-tOx-uOPra'wra'xra!Sra~OQraZrajra!ara!bra!dra!jra#[ra#]ra#^ra#_ra#`ra#ara#bra#cra#era#gra#ira#jra#mra'fra'pra!Rra~P%;OOu(SOx(TOP$^a'w$^a'x$^a!S$^a~OQ$^aZ$^aj$^av$^a!a$^a!b$^a!d$^a!j$^a#[$^a#]$^a#^$^a#_$^a#`$^a#a$^a#b$^a#c$^a#e$^a#g$^a#i$^a#j$^a#m$^a'f$^a'p$^a!R$^a~P%=SOu(SOx(TOP$`a'w$`a'x$`a!S$`a~OQ$`aZ$`aj$`av$`a!a$`a!b$`a!d$`a!j$`a#[$`a#]$`a#^$`a#_$`a#`$`a#a$`a#b$`a#c$`a#e$`a#g$`a#i$`a#j$`a#m$`a'f$`a'p$`a!R$`a~P%?WOQ$naZ$naj$nav$na!a$na!b$na!d$na!j$na#[$na#]$na#^$na#_$na#`$na#a$na#b$na#c$na#e$na#g$na#i$na#j$na#m$na'f$na'p$na!R$na!S$na~P%%aO#m$Yq!R$Yq!S$Yq~P#*XO#m$Zq!R$Zq!S$Zq~P#*XO!S6hO~O#m6iO~P!#{O!]!wO!R&ti!c&ti~O!]!wO'p&oO!R&ti!c&ti~O!R-RO!c'}q~O!O&vi!R&vi~P!BpO!R-ZO!O(Oq~O!O6oO~P!BpO!O6oO~O!R'dy'a'dy~P!#{O!R&ya!T&ya~P!BpO!T$tq_$tq!R$tq'W$tq~P!BpOZ6vO~O!R.^O!S(Vq~O]6yO~O!T&dO%Q6zO~O!T&dO%Q6zO~P!BpO!{6{O!R&{a!S&{a~O!R2oO!S(Si~P#*XO!X7RO!Y7RO'^$dO'g(jO'o+iO~O!W7TO!x4SO~P%GXO!T.yO%Q7WO~O!T.yO%Q7WO~P!BpO]7_O'g7^O~O!R/VO!S(Tq~O!c7aO~O!c7aO~P){O!c7cO~O!c7dO~O!R#Ty!S#Ty~P#*XO_$^O!{7jO'W$^O~O_$^O!]!wO!{7jO'W$^O~O!X7mO!Y7mO'^$dO'g(jO'o+iO~O_$^O!]!wO!j7nO!{7jO'W$^O'p&oO~O#m#ky!R#ky!S#ky~P#*XOQ$giZ$gij$giv$gi!a$gi!b$gi!d$gi!j$gi#[$gi#]$gi#^$gi#_$gi#`$gi#a$gi#b$gi#c$gi#e$gi#g$gi#i$gi#j$gi#m$gi'f$gi'p$gi!R$gi!S$gi~P%%aOu(SOx(TO'x(XOP$xi'w$xi!S$xi~OQ$xiZ$xij$xiv$xi!a$xi!b$xi!d$xi!j$xi#[$xi#]$xi#^$xi#_$xi#`$xi#a$xi#b$xi#c$xi#e$xi#g$xi#i$xi#j$xi#m$xi'f$xi'p$xi!R$xi~P%LjOu(SOx(TOP$zi'w$zi'x$zi!S$zi~OQ$ziZ$zij$ziv$zi!a$zi!b$zi!d$zi!j$zi#[$zi#]$zi#^$zi#_$zi#`$zi#a$zi#b$zi#c$zi#e$zi#g$zi#i$zi#j$zi#m$zi'f$zi'p$zi!R$zi~P%NnO#m$Zy!R$Zy!S$Zy~P#*XO#m#Oy!R#Oy!S#Oy~P#*XO!]!wO!R&tq!c&tq~O!R-RO!c'}y~O!O&vq!R&vq~P!BpO!O7tO~P!BpO!R.^O!S(Vy~O!R2oO!S(Sq~O!X8QO!Y8QO'^$dO'g(jO'o+iO~O!T.yO%Q8TO~O!T.yO%Q8TO~P!BpO!c8WO~O_$^O!{8]O'W$^O~O_$^O!]!wO!{8]O'W$^O~OQ$gqZ$gqj$gqv$gq!a$gq!b$gq!d$gq!j$gq#[$gq#]$gq#^$gq#_$gq#`$gq#a$gq#b$gq#c$gq#e$gq#g$gq#i$gq#j$gq#m$gq'f$gq'p$gq!R$gq!S$gq~P%%aOQ$iqZ$iqj$iqv$iq!a$iq!b$iq!d$iq!j$iq#[$iq#]$iq#^$iq#_$iq#`$iq#a$iq#b$iq#c$iq#e$iq#g$iq#i$iq#j$iq#m$iq'f$iq'p$iq!R$iq!S$iq~P%%aO'a$|!Z!R$|!Z!{$|!Z#m$|!Z~P!#{O!R&{q!S&{q~P#*XO_$^O!{8oO'W$^O~O#W$|!ZQ$|!ZZ$|!Z_$|!Zj$|!Zv$|!Z!R$|!Z!a$|!Z!b$|!Z!d$|!Z!j$|!Z#[$|!Z#]$|!Z#^$|!Z#_$|!Z#`$|!Z#a$|!Z#b$|!Z#c$|!Z#e$|!Z#g$|!Z#i$|!Z#j$|!Z'W$|!Z'f$|!Z'p$|!Z!c$|!Z!O$|!Z!T$|!Z!{$|!Zn$|!Z%Q$|!Z!]$|!Z~P!BpOP;uOu(SOx(TO'w(VO'x(XO~O!S!za!W!za!X!za!Y!za!r!za!s!za!t!za!x!za'^!za'g!za'o!za~P&,_O!W'eX!X'eX!Y'eX!r'eX!s'eX!t'eX!x'eX'^'eX'g'eX'o'eX~P%'eOQ$|!ZZ$|!Zj$|!Zv$|!Z!a$|!Z!b$|!Z!d$|!Z!j$|!Z#[$|!Z#]$|!Z#^$|!Z#_$|!Z#`$|!Z#a$|!Z#b$|!Z#c$|!Z#e$|!Z#g$|!Z#i$|!Z#j$|!Z#m$|!Z'f$|!Z'p$|!Z!R$|!Z!S$|!Z~P%%aO!Wra!Xra!Yra!rra!sra!tra!xra'^ra'gra'ora~P%;OO!W$^a!X$^a!Y$^a!r$^a!s$^a!t$^a!x$^a'^$^a'g$^a'o$^a~P%=SO!W$`a!X$`a!Y$`a!r$`a!s$`a!t$`a!x$`a'^$`a'g$`a'o$`a~P%?WO!S$na!W$na!X$na!Y$na!r$na!s$na!t$na!x$na'^$na'g$na'o$na~P&,_O!W$xi!X$xi!Y$xi!r$xi!s$xi!t$xi!x$xi'^$xi'g$xi'o$xi~P%LjO!W$zi!X$zi!Y$zi!r$zi!s$zi!t$zi!x$zi'^$zi'g$zi'o$zi~P%NnO!S$gi!W$gi!X$gi!Y$gi!r$gi!s$gi!t$gi!x$gi'^$gi'g$gi'o$gi~P&,_O!S$gq!W$gq!X$gq!Y$gq!r$gq!s$gq!t$gq!x$gq'^$gq'g$gq'o$gq~P&,_O!S$iq!W$iq!X$iq!Y$iq!r$iq!s$iq!t$iq!x$iq'^$iq'g$iq'o$iq~P&,_O!S$|!Z!W$|!Z!X$|!Z!Y$|!Z!r$|!Z!s$|!Z!t$|!Z!x$|!Z'^$|!Z'g$|!Z'o$|!Z~P&,_On'hX~P.jOn[X!O[X!c[X%r[X!T[X%Q[X!][X~P$zO!]dX!c[X!cdX'pdX~P;dOQ9^OR9^O]cOb;`Oc!jOhcOj9^OkcOlcOq9^Os9^OxRO{cO|cO}cO!TSO!_9`O!dUO!g9^O!h9^O!i9^O!j9^O!k9^O!n!iO#t!lO#x^O']'cO'fQO'oYO'|;^O~O]#qOh$QOj#rOk#qOl#qOq$ROs9uOx#yO!T#zO!_;fO!d#vO#V:OO#t$VO$_9xO$a9{O$d$WO']&{O'b$PO'f#sO~O!R9pO!S$]a~O]#qOh$QOj#rOk#qOl#qOq$ROs9vOx#yO!T#zO!_;gO!d#vO#V:PO#t$VO$_9yO$a9|O$d$WO']&{O'b$PO'f#sO~O#d'jO~P&<WO!S[X!SdX~P;dO!]9dO~O#W9cO~O!]!wO#W9cO~O!{9sO~O#c9iO~O!{:QO!R'uX!S'uX~O!{9sO!R'sX!S'sX~O#W:RO~O'a:TO~P!#{O#W:[O~O#W:]O~O#W:^O~O!]!wO#W:_O~O!]!wO#W:RO~O#m:`O~P#*XO#W:aO~O#W:bO~O#W:cO~O#W:dO~O#W:eO~O#W:fO~O#W:gO~O#W:hO~O!O:iO~O#m:jO~P!#{O#m:kO~P!#{O#m:lO~P!#{O!O:mO~P!BpO!O:mO~O!O:nO~P!BpO!]!wO#c;lO~O!]!wO#c;nO~O#x~!b!r!t!u#U#V'|$_$a$d$u%P%Q%R%X%Z%^%_%a%c~UT#x'|#]}'Y'Z#z'Y']'g~",
    goto: "#Kk(ZPPPPPPPP([P(lP*`PPPP-zPP.a3s7o8SP8SPPP8SP:U8SP8SP:YPP:`P:t?VPPPP?ZPPPP?ZA{PPPBRDdP?ZPFwPPPPHp?ZPPPPPJi?ZPPMjNgPPPPNk!!TP!!]!#^PNg?Z?Z!&n!)i!.[!.[!1kPPP!1r!4h?ZPPPPPPPPPP!7_P!8pPP?Z!9}P?ZP?Z?Z?Z?ZP?Z!;dPP!>]P!AQ!AY!A^!A^P!>YP!Ab!AbP!DVP!DZ?Z?Z!Da!GT8SP8SP8S8SP!HW8S8S!Jf8S!M_8S# g8S8S#!T#$c#$c#$g#$c#$oP#$cP8S#%k8S#'X8S8S-zPPP#(yPP#)c#)cP#)cP#)x#)cPP#*OP#)uP#)u#*b!!X#)u#+P#+V#+Y([#+]([P#+d#+d#+dP([P([P([P([PP([P#+j#+mP#+m([P#+qP#+tP([P([P([P([P([P([([#+z#,U#,[#,b#,p#,v#,|#-W#-^#-m#-s#.R#.X#._#.m#/S#0z#1Y#1`#1f#1l#1r#1|#2S#2Y#2d#2v#2|PPPPPPPP#3SPP#3v#7OPP#8f#8m#8uPP#>a#@t#Fp#Fs#Fv#GR#GUPP#GX#G]#Gz#Hq#Hu#IZPP#I_#Ie#IiP#Il#Ip#Is#Jc#Jy#KO#KR#KU#K[#K_#Kc#KgmhOSj}!n$]%c%f%g%i*o*t/g/jQ$imQ$ppQ%ZyS&V!b+`Q&k!jS(l#z(qQ)g$jQ)t$rQ*`%TQ+f&^S+k&d+mQ+}&lQ-k(sQ/U*aY0Z+o+p+q+r+sS2t.y2vU3|0[0^0aU5g2y2z2{S6]4O4RS7R5h5iQ7m6_R8Q7T$p[ORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$]$n%[%_%c%e%f%g%i%m%x%z&S&_&f&p&}'R(R)V)^*k*o*t+T+x,P,b,h-u-z.S.].|/_/`/a/c/g/j/l0T0j0t2i3R3f3h3i3x5o5}6W7j8]8o!j'e#]#k&W'w+X+[,m/{1X2q3q6{9^9`9c9e9f9g9h9i9j9k9l9m9n9o9p9s:Q:R:T:_:`:g:h;aQ(}$SQ)l$lQ*b%WQ*i%`Q,X9tQ.W)aQ.c)mQ/^*gQ2_.^Q3Z/VQ4^9vQ5S2`R8{9upeOSjy}!n$]%Y%c%f%g%i*o*t/g/jR*d%[&WVOSTjkn}!S!W!k!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k$]$n%[%_%`%c%e%f%g%i%m%z&S&_&f&p&}'R'w(R)V)^*k*o*t+T+X+[+x,P,b,h,m-u-z.S.].|/_/`/a/c/g/j/l/{0T0j0t1X2i2q3R3f3h3i3q3x5o5}6W6{7j8]8o9^9`9c9e9f9g9h9i9j9k9l9m9n9o9p9s:Q:R:T:_:`:g:h;`;a[!cRU!]!`%x&WQ$clQ$hmS$mp$rv$wrs!r!u$Z$u&`&t&w)x)y)z*m+Y+h,S,U/o0lQ%PwQ&h!iQ&j!jS(_#v(cS)f$i$jQ)j$lQ)w$tQ*Z%RQ*_%TS+|&k&lQ-V(`Q.[)gQ.b)mQ.d)nQ.g)rQ/P*[S/T*`*aQ0h+}Q1b-RQ2^.^Q2b.aQ2g.iQ3Y/UQ4i1cQ5R2`Q5U2dQ6u5QR7w6vx#xa!y$T$U$Y(W(Y(b(w(x,_-Y-w1a1y6i;^;i;j;k!Y$fm!j$h$i$j&U&j&k&l(k)f)g+]+j+|+}-d.[0Q0W0]0h1u3{4Q6Z7k8^Q)`$cQ*P$|Q*S$}Q*^%TQ.k)wQ/O*ZU/S*_*`*aQ3T/PS3X/T/UQ5b2sQ5t3YS7P5c5fS8O7Q7SQ8f8PQ8u8g#[;b!w#d#v#y&g'}(Z(h)])_)a*O*R+y-Z-].R.T.p.s.{.}1k1s2Q2T2X2j3Q3S4l4u4}5k5p6z7W8T9w9z9}:U:X:[:a:d:j;l;n;t;u;vd;c9d9x9{:O:V:Y:]:b:e:ke;d9r9y9|:P:W:Z:^:c:f:lW#}a$P(y;^S$|t%YQ$}uQ%OvR)}$z%P#|a!w!y#d#v#y$T$U$Y&g'}(W(Y(Z(b(h(w(x)])_)a*O*R+y,_-Y-Z-]-w.R.T.p.s.{.}1a1k1s1y2Q2T2X2j3Q3S4l4u4}5k5p6i6z7W8T9d9r9w9x9y9z9{9|9}:O:P:U:V:W:X:Y:Z:[:]:^:a:b:c:d:e:f:j:k:l;^;i;j;k;l;n;t;u;vT(O#s(PX)O$S9t9u9vU&Z!b$v+cQ'U!{Q)q$oQ.t*TQ1z-tR5^2o&^cORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k$]$n%[%_%`%c%e%f%g%i%m%x%z&S&W&_&f&p&}'R'w(R)V)^*k*o*t+T+X+[+x,P,b,h,m-u-z.S.].|/_/`/a/c/g/j/l/{0T0j0t1X2i2q3R3f3h3i3q3x5o5}6W6{7j8]8o9^9`9c9e9f9g9h9i9j9k9l9m9n9o9p9s:Q:R:T:_:`:g:h;a$]#aZ!_!o$a%w%}&y'Q'W'X'Y'Z'[']'^'_'`'a'b'd'g'k'u)p+R+^+g,O,^,d,g,i,w-x/v/y0i0s0w0x0y0z0{0|0}1O1P1Q1R1S1T1W1]2O2[3s3v4W4[4]4b4c5`6S6V6b6f6g7g7z8Z8m8y9_:|T!XQ!Y&_cORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k$]$n%[%_%`%c%e%f%g%i%m%x%z&S&W&_&f&p&}'R'w(R)V)^*k*o*t+T+X+[+x,P,b,h,m-u-z.S.].|/_/`/a/c/g/j/l/{0T0j0t1X2i2q3R3f3h3i3q3x5o5}6W6{7j8]8o9^9`9c9e9f9g9h9i9j9k9l9m9n9o9p9s:Q:R:T:_:`:g:h;aQ&X!bR/|+`Y&R!b&V&^+`+fS(k#z(qS+j&d+mS-d(l(sQ-e(mQ-l(tQ.v*VU0W+k+o+pU0]+q+r+sS0b+t2xQ1u-kQ1w-mQ1x-nS2s.y2vU3{0Z0[0^Q4P0_Q4Q0aS5c2t2{S5f2y2zU6Z3|4O4RQ6`4SS7Q5g5hQ7S5iS7k6]6_S8P7R7TQ8^7mQ8g8QQ;h;oR;m;slhOSj}!n$]%c%f%g%i*o*t/g/jQ%k!QS&x!v9cQ)d$gQ*X%PQ*Y%QQ+z&iS,]&}:RS-y)V:_Q.Y)eQ.x*WQ/n*vQ/p*wQ/x+ZQ0`+qQ0f+{S2P-z:gQ2Y.ZS2].]:hQ3r/zQ3u0RQ4U0gQ5P2ZQ6T3tQ6X3zQ6a4VQ7e6RQ7h6YQ8Y7iQ8l8[R8x8n$W#`Z!_!o%w%}&y'Q'W'X'Y'Z'[']'^'_'`'a'b'd'g'k'u)p+R+^+g,O,^,d,g,w-x/v/y0i0s0w0x0y0z0{0|0}1O1P1Q1R1S1T1W1]2O2[3s3v4W4[4]4b4c5`6S6V6b6f6g7g7z8Z8m8y9_:|W(v#{&|1V8qT)Z$a,i$W#_Z!_!o%w%}&y'Q'W'X'Y'Z'[']'^'_'`'a'b'd'g'k'u)p+R+^+g,O,^,d,g,w-x/v/y0i0s0w0x0y0z0{0|0}1O1P1Q1R1S1T1W1]2O2[3s3v4W4[4]4b4c5`6S6V6b6f6g7g7z8Z8m8y9_:|Q'f#`S)Y$a,iR-{)Z&^cORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k$]$n%[%_%`%c%e%f%g%i%m%x%z&S&W&_&f&p&}'R'w(R)V)^*k*o*t+T+X+[+x,P,b,h,m-u-z.S.].|/_/`/a/c/g/j/l/{0T0j0t1X2i2q3R3f3h3i3q3x5o5}6W6{7j8]8o9^9`9c9e9f9g9h9i9j9k9l9m9n9o9p9s:Q:R:T:_:`:g:h;aQ%f{Q%g|Q%i!OQ%j!PR/f*rQ&e!iQ)[$cQ+w&hS.Q)`)wS0c+u+vW2S-}.O.P.kS4T0d0eU4|2U2V2WU6s4{5Y5ZQ7v6tR8b7yT+l&d+mS+j&d+mU0W+k+o+pU0]+q+r+sS0b+t2xS2s.y2vU3{0Z0[0^Q4P0_Q4Q0aS5c2t2{S5f2y2zU6Z3|4O4RQ6`4SS7Q5g5hQ7S5iS7k6]6_S8P7R7TQ8^7mR8g8QS+l&d+mT2u.y2vS&r!q/dQ-U(_Q-b(kS0V+j2sQ1g-VS1p-c-lU3}0]0b5fQ4h1bS4s1v1xU6^4P4Q7SQ6k4iQ6r4vR7n6`Q!xXS&q!q/dQ)W$[Q)b$eQ)h$kQ,Q&rQ-T(_Q-a(kQ-f(nQ.X)cQ/Q*]S0U+j2sS1f-U-VS1o-b-lQ1r-eQ1t-gQ3V/RW3y0V0]0b5fQ4g1bQ4k1gS4o1p1xQ4t1wQ5r3WW6[3}4P4Q7SS6j4h4iS6n4p:iQ6p4sQ6}5aQ7[5sS7l6^6`Q7r6kS7s6o:mQ7u6rQ7|7OQ8V7]Q8_7nS8a7t:nQ8d7}Q8s8eQ9Q8tQ9X9RQ:u:pQ;T:zQ;U:{Q;V;hR;[;m$rWORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$]$n%[%_%`%c%e%f%g%i%m%x%z&S&_&f&p&}'R(R)V)^*k*o*t+T+x,P,b,h-u-z.S.].|/_/`/a/c/g/j/l0T0j0t2i3R3f3h3i3x5o5}6W7j8]8oS!xn!k!j:o#]#k&W'w+X+[,m/{1X2q3q6{9^9`9c9e9f9g9h9i9j9k9l9m9n9o9p9s:Q:R:T:_:`:g:h;aR:u;`$rXORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$]$n%[%_%`%c%e%f%g%i%m%x%z&S&_&f&p&}'R(R)V)^*k*o*t+T+x,P,b,h-u-z.S.].|/_/`/a/c/g/j/l0T0j0t2i3R3f3h3i3x5o5}6W7j8]8oQ$[b!Y$em!j$h$i$j&U&j&k&l(k)f)g+]+j+|+}-d.[0Q0W0]0h1u3{4Q6Z7k8^S$kn!kQ)c$fQ*]%TW/R*^*_*`*aU3W/S/T/UQ5a2sS5s3X3YU7O5b5c5fQ7]5tU7}7P7Q7SS8e8O8PS8t8f8gQ9R8u!j:p#]#k&W'w+X+[,m/{1X2q3q6{9^9`9c9e9f9g9h9i9j9k9l9m9n9o9p9s:Q:R:T:_:`:g:h;aQ:z;_R:{;`$f]OSTjk}!S!W!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$]$n%[%_%c%e%f%g%i%m%z&S&_&f&p&}'R(R)V)^*k*o*t+T+x,P,b,h-u-z.S.].|/_/`/a/c/g/j/l0T0j0t2i3R3f3h3i3x5o5}6W7j8]8oY!hRU!]!`%xv$wrs!r!u$Z$u&`&t&w)x)y)z*m+Y+h,S,U/o0lQ*j%`!h:q#]#k'w+X+[,m/{1X2q3q6{9^9`9c9e9f9g9h9i9j9k9l9m9n9o9p9s:Q:R:T:_:`:g:h;aR:t&WS&[!b$vR0O+c$p[ORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$]$n%[%_%c%e%f%g%i%m%x%z&S&_&f&p&}'R(R)V)^*k*o*t+T+x,P,b,h-u-z.S.].|/_/`/a/c/g/j/l0T0j0t2i3R3f3h3i3x5o5}6W7j8]8o!j'e#]#k&W'w+X+[,m/{1X2q3q6{9^9`9c9e9f9g9h9i9j9k9l9m9n9o9p9s:Q:R:T:_:`:g:h;aR*i%`$roORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$]$n%[%_%`%c%e%f%g%i%m%x%z&S&_&f&p&}'R(R)V)^*k*o*t+T+x,P,b,h-u-z.S.].|/_/`/a/c/g/j/l0T0j0t2i3R3f3h3i3x5o5}6W7j8]8oQ'U!{!k:r#]#k&W'w+X+[,m/{1X2q3q6{9^9`9c9e9f9g9h9i9j9k9l9m9n9o9p9s:Q:R:T:_:`:g:h;a!h#VZ!_$a%w%}&y'Q'_'`'a'b'g'k)p+R+g,O,^,d,w-x0i0s1T2O2[3v4W4[6V7g8Z8m8y9_!R9k'd'u+^,i/v/y0w1P1Q1R1S1W1]3s4]4b4c5`6S6b6f6g7z:|!d#XZ!_$a%w%}&y'Q'a'b'g'k)p+R+g,O,^,d,w-x0i0s1T2O2[3v4W4[6V7g8Z8m8y9_}9m'd'u+^,i/v/y0w1R1S1W1]3s4]4b4c5`6S6b6f6g7z:|!`#]Z!_$a%w%}&y'Q'g'k)p+R+g,O,^,d,w-x0i0s1T2O2[3v4W4[6V7g8Z8m8y9_Q1a-Px;a'd'u+^,i/v/y0w1W1]3s4]4b4c5`6S6b6f6g7z:|Q;i;pQ;j;qR;k;r&^cORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k$]$n%[%_%`%c%e%f%g%i%m%x%z&S&W&_&f&p&}'R'w(R)V)^*k*o*t+T+X+[+x,P,b,h,m-u-z.S.].|/_/`/a/c/g/j/l/{0T0j0t1X2i2q3R3f3h3i3q3x5o5}6W6{7j8]8o9^9`9c9e9f9g9h9i9j9k9l9m9n9o9p9s:Q:R:T:_:`:g:h;aS#l`#mR1Y,l&e_ORSTU`jk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k#m$]$n%[%_%`%c%e%f%g%i%m%x%z&S&W&_&f&p&}'R'w(R)V)^*k*o*t+T+X+[+x,P,b,h,l,m-u-z.S.].|/_/`/a/c/g/j/l/{0T0j0t1X2i2q3R3f3h3i3q3x5o5}6W6{7j8]8o9^9`9c9e9f9g9h9i9j9k9l9m9n9o9p9s:Q:R:T:_:`:g:h;aS#g^#nT'n#i'rT#h^#nT'p#i'r&e`ORSTU`jk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k#m$]$n%[%_%`%c%e%f%g%i%m%x%z&S&W&_&f&p&}'R'w(R)V)^*k*o*t+T+X+[+x,P,b,h,l,m-u-z.S.].|/_/`/a/c/g/j/l/{0T0j0t1X2i2q3R3f3h3i3q3x5o5}6W6{7j8]8o9^9`9c9e9f9g9h9i9j9k9l9m9n9o9p9s:Q:R:T:_:`:g:h;aT#l`#mQ#o`R'y#m$rbORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$]$n%[%_%`%c%e%f%g%i%m%x%z&S&_&f&p&}'R(R)V)^*k*o*t+T+x,P,b,h-u-z.S.].|/_/`/a/c/g/j/l0T0j0t2i3R3f3h3i3x5o5}6W7j8]8o!k;_#]#k&W'w+X+[,m/{1X2q3q6{9^9`9c9e9f9g9h9i9j9k9l9m9n9o9p9s:Q:R:T:_:`:g:h;a#RdOSUj}!S!W!n!|#k$]%[%_%`%c%e%f%g%i%m&S&f'w)^*k*o*t+x,m-u.S.|/_/`/a/c/g/j/l1X2i3R3f3h3i5o5}x#{a!y$T$U$Y(W(Y(b(w(x,_-Y-w1a1y6i;^;i;j;k#[&|!w#d#v#y&g'}(Z(h)])_)a*O*R+y-Z-].R.T.p.s.{.}1k1s2Q2T2X2j3Q3S4l4u4}5k5p6z7W8T9w9z9}:U:X:[:a:d:j;l;n;t;u;vQ)S$WQ,x(Sd1V9r9y9|:P:W:Z:^:c:f:le8q9d9x9{:O:V:Y:]:b:e:kx#wa!y$T$U$Y(W(Y(b(w(x,_-Y-w1a1y6i;^;i;j;kQ(d#xS(n#z(qQ)T$XQ-g(o#[:w!w#d#v#y&g'}(Z(h)])_)a*O*R+y-Z-].R.T.p.s.{.}1k1s2Q2T2X2j3Q3S4l4u4}5k5p6z7W8T9w9z9}:U:X:[:a:d:j;l;n;t;u;vd:x9d9x9{:O:V:Y:]:b:e:kd:y9r9y9|:P:W:Z:^:c:f:lQ:};bQ;O;cQ;P;dQ;Q;eQ;R;fR;S;gx#{a!y$T$U$Y(W(Y(b(w(x,_-Y-w1a1y6i;^;i;j;k#[&|!w#d#v#y&g'}(Z(h)])_)a*O*R+y-Z-].R.T.p.s.{.}1k1s2Q2T2X2j3Q3S4l4u4}5k5p6z7W8T9w9z9}:U:X:[:a:d:j;l;n;t;u;vd1V9r9y9|:P:W:Z:^:c:f:le8q9d9x9{:O:V:Y:]:b:e:klfOSj}!n$]%c%f%g%i*o*t/g/jQ(g#yQ*}%pQ+O%rR1j-Z%O#|a!w!y#d#v#y$T$U$Y&g'}(W(Y(Z(b(h(w(x)])_)a*O*R+y,_-Y-Z-]-w.R.T.p.s.{.}1a1k1s1y2Q2T2X2j3Q3S4l4u4}5k5p6i6z7W8T9d9r9w9x9y9z9{9|9}:O:P:U:V:W:X:Y:Z:[:]:^:a:b:c:d:e:f:j:k:l;^;i;j;k;l;n;t;u;vQ*Q$}Q.r*SQ2m.qR5]2nT(p#z(qS(p#z(qT2u.y2vQ)b$eQ-f(nQ.X)cQ/Q*]Q3V/RQ5r3WQ6}5aQ7[5sQ7|7OQ8V7]Q8d7}Q8s8eQ9Q8tR9X9Rp(W#t'O)U-X-o-p0q1h1}4f4w7q:v;W;X;Y!n:U&z'i(^(f+v,[,t-P-^-|.P.o.q0e0p1i1m2W2l2n3O4Y4Z4m4q4y5O5Z5n6m6q7Y8`;Z;];p;q;r[:V8p9O9V9Y9Z9]]:W1U4a6c7o7p8zr(Y#t'O)U,}-X-o-p0q1h1}4f4w7q:v;W;X;Y!p:X&z'i(^(f+v,[,t-P-^-|.P.o.q0e0n0p1i1m2W2l2n3O4Y4Z4m4q4y5O5Z5n6m6q7Y8`;Z;];p;q;r^:Y8p9O9T9V9Y9Z9]_:Z1U4a6c6d7o7p8zpeOSjy}!n$]%Y%c%f%g%i*o*t/g/jQ%VxR*k%`peOSjy}!n$]%Y%c%f%g%i*o*t/g/jR%VxQ*U%OR.n)}qeOSjy}!n$]%Y%c%f%g%i*o*t/g/jQ.z*ZS3P/O/PW5j2|2}3O3TU7V5l5m5nU8R7U7X7YQ8h8SR8v8iQ%^yR*e%YR3^/XR7_5uS$mp$rR.d)nQ%czR*o%dR*u%jT/h*t/jR*y%kQ*x%kR/q*yQjOQ!nST$`j!nQ(P#sR,u(PQ!YQR%u!YQ!^RU%{!^%|+UQ%|!_R+U%}Q+a&XR/}+aQ,`'OR0r,`Q,c'QS0u,c0vR0v,dQ+m&dR0X+mS!eR$uU&a!e&b+VQ&b!fR+V&OQ+d&[R0P+dQ&u!sQ,R&sU,V&u,R0mR0m,WQ'r#iR,n'rQ#m`R'x#mQ#cZU'h#c+Q9qQ+Q9_R9q'uQ-S(_W1d-S1e4j6lU1e-T-U-VS4j1f1gR6l4k$k(U#t&z'O'i(^(f)P)Q)U+v,Y,Z,[,t,}-O-P-X-^-o-p-|.P.o.q0e0n0o0p0q1U1h1i1m1}2W2l2n3O4Y4Z4_4`4a4f4m4q4w4y5O5Z5n6c6d6e6m6q7Y7o7p7q8`8p8z8|8}9O9T9U9V9Y9Z9]:v;W;X;Y;Z;];p;q;rQ-[(fU1l-[1n4nQ1n-^R4n1mQ(q#zR-i(qQ(z$OR-r(zQ2R-|R4z2RQ){$xR.m){Q2p.tS5_2p6|R6|5`Q*W%PR.w*WQ2v.yR5d2vQ/W*bS3[/W5vR5v3^Q._)jW2a._2c5T6wQ2c.bQ5T2bR6w5UQ)o$mR.e)oQ/j*tR3l/jWiOSj!nQ%h}Q)X$]Q*n%cQ*p%fQ*q%gQ*s%iQ/e*oS/h*t/jR3k/gQ$_gQ%l!RQ%o!TQ%q!UQ%s!VQ)v$sQ)|$yQ*d%^Q*{%nQ-h(pS/Z*e*hQ/r*zQ/s*}Q/t+OS0S+j2sQ2f.hQ2k.oQ3U/QQ3`/]Q3j/fY3w0U0V0]0b5fQ5X2hQ5[2lQ5q3VQ5w3_[6U3v3y3}4P4Q7SQ6x5VQ7Z5rQ7`5xW7f6V6[6^6`Q7x6yQ7{6}Q8U7[U8X7g7l7nQ8c7|Q8j8VS8k8Z8_Q8r8dQ8w8mQ9P8sQ9S8yQ9W9QR9[9XQ$gmQ&i!jU)e$h$i$jQ+Z&UU+{&j&k&lQ-`(kS.Z)f)gQ/z+]Q0R+jS0g+|+}Q1q-dQ2Z.[Q3t0QS3z0W0]Q4V0hQ4r1uS6Y3{4QQ7i6ZQ8[7kR8n8^S#ua;^R({$PU$Oa$P;^R-q(yQ#taS&z!w)aQ'O!yQ'i#dQ(^#vQ(f#yQ)P$TQ)Q$UQ)U$YQ+v&gQ,Y9wQ,Z9zQ,[9}Q,t'}Q,}(WQ-O(YQ-P(ZQ-X(bQ-^(hQ-o(wQ-p(xd-|)].R.{2T3Q4}5k6z7W8TQ.P)_Q.o*OQ.q*RQ0e+yQ0n:UQ0o:XQ0p:[Q0q,_Q1U9rQ1h-YQ1i-ZQ1m-]Q1}-wQ2W.TQ2l.pQ2n.sQ3O.}Q4Y:aQ4Z:dQ4_9yQ4`9|Q4a:PQ4f1aQ4m1kQ4q1sQ4w1yQ4y2QQ5O2XQ5Z2jQ5n3SQ6c:^Q6d:WQ6e:ZQ6m4lQ6q4uQ7Y5pQ7o:cQ7p:fQ7q6iQ8`:jQ8p9dQ8z:lQ8|9xQ8}9{Q9O:OQ9T:VQ9U:YQ9V:]Q9Y:bQ9Z:eQ9]:kQ:v;^Q;W;iQ;X;jQ;Y;kQ;Z;lQ;];nQ;p;tQ;q;uR;r;vlgOSj}!n$]%c%f%g%i*o*t/g/jS!pU%eQ%n!SQ%t!WQ'V!|Q'v#kS*h%[%_Q*l%`Q*z%mQ+W&SQ+u&fQ,r'wQ.O)^Q/b*kQ0d+xQ1[,mQ1{-uQ2V.SQ2}.|Q3b/_Q3c/`Q3e/aQ3g/cQ3n/lQ4d1XQ5Y2iQ5m3RQ5|3fQ6O3hQ6P3iQ7X5oR7b5}!vZOSUj}!S!n!|$]%[%_%`%c%e%f%g%i%m&S&f)^*k*o*t+x-u.S.|/_/`/a/c/g/j/l2i3R3f3h3i5o5}Q!_RQ!oTQ$akS%w!]%zQ%}!`Q&y!vQ'Q!zQ'W#PQ'X#QQ'Y#RQ'Z#SQ'[#TQ']#UQ'^#VQ'_#WQ'`#XQ'a#YQ'b#ZQ'd#]Q'g#bQ'k#eW'u#k'w,m1XQ)p$nS+R%x+TS+^&W/{Q+g&_Q,O&pQ,^&}Q,d'RQ,g9^Q,i9`Q,w(RQ-x)VQ/v+XQ/y+[Q0i,PQ0s,bQ0w9cQ0x9eQ0y9fQ0z9gQ0{9hQ0|9iQ0}9jQ1O9kQ1P9lQ1Q9mQ1R9nQ1S9oQ1T,hQ1W9sQ1]9pQ2O-zQ2[.]Q3s:QQ3v0TQ4W0jQ4[0tQ4]:RQ4b:TQ4c:_Q5`2qQ6S3qQ6V3xQ6b:`Q6f:gQ6g:hQ7g6WQ7z6{Q8Z7jQ8m8]Q8y8oQ9_!WR:|;aR!aRR&Y!bS&U!b+`S+]&V&^R0Q+fR'P!yR'S!zT!tU$ZS!sU$ZU$xrs*mS&s!r!uQ,T&tQ,W&wQ.l)zS0k,S,UR4X0l`!dR!]!`$u%x&`)x+hh!qUrs!r!u$Z&t&w)z,S,U0lQ/d*mQ/w+YQ3p/oT:s&W)yT!gR$uS!fR$uS%y!]&`S&O!`)xS+S%x+hT+_&W)yT&]!b$vQ#i^R'{#nT'q#i'rR1Z,lT(a#v(cR(i#yQ-})]Q2U.RQ2|.{Q4{2TQ5l3QQ6t4}Q7U5kQ7y6zQ8S7WR8i8TlhOSj}!n$]%c%f%g%i*o*t/g/jQ%]yR*d%YV$yrs*mR.u*TR*c%WQ$qpR)u$rR)k$lT%az%dT%bz%dT/i*t/j",
    nodeNames: "⚠ extends ArithOp ArithOp InterpolationStart LineComment BlockComment Script ExportDeclaration export Star as VariableName String from ; default FunctionDeclaration async function VariableDefinition TypeParamList TypeDefinition ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation VoidType void TypeofType typeof MemberExpression . ?. PropertyName [ TemplateString Interpolation null super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewExpression new TypeArgList CompareOp < ) ( ArgList UnaryExpression await yield delete LogicOp BitOp ParenthesizedExpression ClassExpression class extends ClassBody MethodDeclaration Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression PrivatePropertyName BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof in const CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXStartTag JSXSelfClosingTag JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast ArrowFunction TypeParamList SequenceExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature CallSignature TypePredicate is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody MethodDeclaration AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement",
    maxTerm: 332,
    context: R0,
    nodeProps: [
      ["closedBy", 4, "InterpolationEnd", 40, "]", 51, "}", 66, ")", 132, "JSXSelfCloseEndTag JSXEndTag", 146, "JSXEndTag"],
      ["group", -26, 8, 15, 17, 58, 184, 188, 191, 192, 194, 197, 200, 211, 213, 219, 221, 223, 225, 228, 234, 240, 242, 244, 246, 248, 250, 251, "Statement", -30, 12, 13, 24, 27, 28, 41, 43, 44, 45, 47, 52, 60, 68, 74, 75, 91, 92, 101, 103, 119, 122, 124, 125, 126, 127, 129, 130, 148, 149, 151, "Expression", -22, 23, 25, 29, 32, 34, 152, 154, 156, 157, 159, 160, 161, 163, 164, 165, 167, 168, 169, 178, 180, 182, 183, "Type", -3, 79, 85, 90, "ClassItem"],
      ["openedBy", 30, "InterpolationStart", 46, "[", 50, "{", 65, "(", 131, "JSXStartTag", 141, "JSXStartTag JSXStartCloseTag"]
    ],
    propSources: [q0],
    skippedNodes: [0, 5, 6],
    repeatNodeCount: 28,
    tokenData: "!C}~R!`OX%TXY%cYZ'RZ[%c[]%T]^'R^p%Tpq%cqr'crs(kst0htu2`uv4pvw5ewx6cxy<yyz=Zz{=k{|>k|}?O}!O>k!O!P?`!P!QCl!Q!R!0[!R![!1q![!]!7s!]!^!8V!^!_!8g!_!`!9d!`!a!:[!a!b!<R!b!c%T!c!}2`!}#O!=d#O#P%T#P#Q!=t#Q#R!>U#R#S2`#S#T!>i#T#o2`#o#p!>y#p#q!?O#q#r!?f#r#s!?x#s$f%T$f$g%c$g#BY2`#BY#BZ!@Y#BZ$IS2`$IS$I_!@Y$I_$I|2`$I|$I}!Bq$I}$JO!Bq$JO$JT2`$JT$JU!@Y$JU$KV2`$KV$KW!@Y$KW&FU2`&FU&FV!@Y&FV?HT2`?HT?HU!@Y?HU~2`W%YR$UWO!^%T!_#o%T#p~%T7Z%jg$UW'Y7ROX%TXY%cYZ%TZ[%c[p%Tpq%cq!^%T!_#o%T#p$f%T$f$g%c$g#BY%T#BY#BZ%c#BZ$IS%T$IS$I_%c$I_$JT%T$JT$JU%c$JU$KV%T$KV$KW%c$KW&FU%T&FU&FV%c&FV?HT%T?HT?HU%c?HU~%T7Z'YR$UW'Z7RO!^%T!_#o%T#p~%T$T'jS$UW!j#{O!^%T!_!`'v!`#o%T#p~%T$O'}S#e#v$UWO!^%T!_!`(Z!`#o%T#p~%T$O(bR#e#v$UWO!^%T!_#o%T#p~%T)X(rZ$UW]#eOY(kYZ)eZr(krs*rs!^(k!^!_+U!_#O(k#O#P-b#P#o(k#o#p+U#p~(k&r)jV$UWOr)ers*Ps!^)e!^!_*a!_#o)e#o#p*a#p~)e&r*WR$P&j$UWO!^%T!_#o%T#p~%T&j*dROr*ars*ms~*a&j*rO$P&j)X*{R$P&j$UW]#eO!^%T!_#o%T#p~%T)P+ZV]#eOY+UYZ*aZr+Urs+ps#O+U#O#P+w#P~+U)P+wO$P&j]#e)P+zROr+Urs,Ts~+U)P,[U$P&j]#eOY,nZr,nrs-Vs#O,n#O#P-[#P~,n#e,sU]#eOY,nZr,nrs-Vs#O,n#O#P-[#P~,n#e-[O]#e#e-_PO~,n)X-gV$UWOr(krs-|s!^(k!^!_+U!_#o(k#o#p+U#p~(k)X.VZ$P&j$UW]#eOY.xYZ%TZr.xrs/rs!^.x!^!_,n!_#O.x#O#P0S#P#o.x#o#p,n#p~.x#m/PZ$UW]#eOY.xYZ%TZr.xrs/rs!^.x!^!_,n!_#O.x#O#P0S#P#o.x#o#p,n#p~.x#m/yR$UW]#eO!^%T!_#o%T#p~%T#m0XT$UWO!^.x!^!_,n!_#o.x#o#p,n#p~.x3]0mZ$UWOt%Ttu1`u!^%T!_!c%T!c!}1`!}#R%T#R#S1`#S#T%T#T#o1`#p$g%T$g~1`3]1g]$UW'o3TOt%Ttu1`u!Q%T!Q![1`![!^%T!_!c%T!c!}1`!}#R%T#R#S1`#S#T%T#T#o1`#p$g%T$g~1`7Z2k_$UW#zS']$y'g3SOt%Ttu2`u}%T}!O3j!O!Q%T!Q![2`![!^%T!_!c%T!c!}2`!}#R%T#R#S2`#S#T%T#T#o2`#p$g%T$g~2`[3q_$UW#zSOt%Ttu3ju}%T}!O3j!O!Q%T!Q![3j![!^%T!_!c%T!c!}3j!}#R%T#R#S3j#S#T%T#T#o3j#p$g%T$g~3j$O4wS#^#v$UWO!^%T!_!`5T!`#o%T#p~%T$O5[R$UW#o#vO!^%T!_#o%T#p~%T5b5lU'x5Y$UWOv%Tvw6Ow!^%T!_!`5T!`#o%T#p~%T$O6VS$UW#i#vO!^%T!_!`5T!`#o%T#p~%T)X6jZ$UW]#eOY6cYZ7]Zw6cwx*rx!^6c!^!_8T!_#O6c#O#P:T#P#o6c#o#p8T#p~6c&r7bV$UWOw7]wx*Px!^7]!^!_7w!_#o7]#o#p7w#p~7]&j7zROw7wwx*mx~7w)P8YV]#eOY8TYZ7wZw8Twx+px#O8T#O#P8o#P~8T)P8rROw8Twx8{x~8T)P9SU$P&j]#eOY9fZw9fwx-Vx#O9f#O#P9}#P~9f#e9kU]#eOY9fZw9fwx-Vx#O9f#O#P9}#P~9f#e:QPO~9f)X:YV$UWOw6cwx:ox!^6c!^!_8T!_#o6c#o#p8T#p~6c)X:xZ$P&j$UW]#eOY;kYZ%TZw;kwx/rx!^;k!^!_9f!_#O;k#O#P<e#P#o;k#o#p9f#p~;k#m;rZ$UW]#eOY;kYZ%TZw;kwx/rx!^;k!^!_9f!_#O;k#O#P<e#P#o;k#o#p9f#p~;k#m<jT$UWO!^;k!^!_9f!_#o;k#o#p9f#p~;k&i=QR!d&a$UWO!^%T!_#o%T#p~%Tk=bR!cc$UWO!^%T!_#o%T#p~%T7V=tU'^4V#_#v$UWOz%Tz{>W{!^%T!_!`5T!`#o%T#p~%T$O>_S#[#v$UWO!^%T!_!`5T!`#o%T#p~%T%w>rSj%o$UWO!^%T!_!`5T!`#o%T#p~%T&i?VR!R&a$UWO!^%T!_#o%T#p~%T7Z?gVu5^$UWO!O%T!O!P?|!P!Q%T!Q![@r![!^%T!_#o%T#p~%T!{@RT$UWO!O%T!O!P@b!P!^%T!_#o%T#p~%T!{@iR!Q!s$UWO!^%T!_#o%T#p~%T!{@yZ$UWk!sO!Q%T!Q![@r![!^%T!_!g%T!g!hAl!h#R%T#R#S@r#S#X%T#X#YAl#Y#o%T#p~%T!{AqZ$UWO{%T{|Bd|}%T}!OBd!O!Q%T!Q![CO![!^%T!_#R%T#R#SCO#S#o%T#p~%T!{BiV$UWO!Q%T!Q![CO![!^%T!_#R%T#R#SCO#S#o%T#p~%T!{CVV$UWk!sO!Q%T!Q![CO![!^%T!_#R%T#R#SCO#S#o%T#p~%T7ZCs`$UW#]#vOYDuYZ%TZzDuz{Jl{!PDu!P!Q!-e!Q!^Du!^!_Fx!_!`!.^!`!a!/]!a!}Du!}#OHq#O#PJQ#P#oDu#o#pFx#p~DuXD|[$UW}POYDuYZ%TZ!PDu!P!QEr!Q!^Du!^!_Fx!_!}Du!}#OHq#O#PJQ#P#oDu#o#pFx#p~DuXEy_$UW}PO!^%T!_#Z%T#Z#[Er#[#]%T#]#^Er#^#a%T#a#bEr#b#g%T#g#hEr#h#i%T#i#jEr#j#m%T#m#nEr#n#o%T#p~%TPF}V}POYFxZ!PFx!P!QGd!Q!}Fx!}#OG{#O#PHh#P~FxPGiU}P#Z#[Gd#]#^Gd#a#bGd#g#hGd#i#jGd#m#nGdPHOTOYG{Z#OG{#O#PH_#P#QFx#Q~G{PHbQOYG{Z~G{PHkQOYFxZ~FxXHvY$UWOYHqYZ%TZ!^Hq!^!_G{!_#OHq#O#PIf#P#QDu#Q#oHq#o#pG{#p~HqXIkV$UWOYHqYZ%TZ!^Hq!^!_G{!_#oHq#o#pG{#p~HqXJVV$UWOYDuYZ%TZ!^Du!^!_Fx!_#oDu#o#pFx#p~Du7ZJs^$UW}POYJlYZKoZzJlz{NQ{!PJl!P!Q!,R!Q!^Jl!^!_!!]!_!}Jl!}#O!'|#O#P!+a#P#oJl#o#p!!]#p~Jl7ZKtV$UWOzKoz{LZ{!^Ko!^!_M]!_#oKo#o#pM]#p~Ko7ZL`X$UWOzKoz{LZ{!PKo!P!QL{!Q!^Ko!^!_M]!_#oKo#o#pM]#p~Ko7ZMSR$UWU7RO!^%T!_#o%T#p~%T7RM`ROzM]z{Mi{~M]7RMlTOzM]z{Mi{!PM]!P!QM{!Q~M]7RNQOU7R7ZNX^$UW}POYJlYZKoZzJlz{NQ{!PJl!P!Q! T!Q!^Jl!^!_!!]!_!}Jl!}#O!'|#O#P!+a#P#oJl#o#p!!]#p~Jl7Z! ^_$UWU7R}PO!^%T!_#Z%T#Z#[Er#[#]%T#]#^Er#^#a%T#a#bEr#b#g%T#g#hEr#h#i%T#i#jEr#j#m%T#m#nEr#n#o%T#p~%T7R!!bY}POY!!]YZM]Zz!!]z{!#Q{!P!!]!P!Q!&x!Q!}!!]!}#O!$`#O#P!&f#P~!!]7R!#VY}POY!!]YZM]Zz!!]z{!#Q{!P!!]!P!Q!#u!Q!}!!]!}#O!$`#O#P!&f#P~!!]7R!#|UU7R}P#Z#[Gd#]#^Gd#a#bGd#g#hGd#i#jGd#m#nGd7R!$cWOY!$`YZM]Zz!$`z{!${{#O!$`#O#P!&S#P#Q!!]#Q~!$`7R!%OYOY!$`YZM]Zz!$`z{!${{!P!$`!P!Q!%n!Q#O!$`#O#P!&S#P#Q!!]#Q~!$`7R!%sTU7ROYG{Z#OG{#O#PH_#P#QFx#Q~G{7R!&VTOY!$`YZM]Zz!$`z{!${{~!$`7R!&iTOY!!]YZM]Zz!!]z{!#Q{~!!]7R!&}_}POzM]z{Mi{#ZM]#Z#[!&x#[#]M]#]#^!&x#^#aM]#a#b!&x#b#gM]#g#h!&x#h#iM]#i#j!&x#j#mM]#m#n!&x#n~M]7Z!(R[$UWOY!'|YZKoZz!'|z{!(w{!^!'|!^!_!$`!_#O!'|#O#P!*o#P#QJl#Q#o!'|#o#p!$`#p~!'|7Z!(|^$UWOY!'|YZKoZz!'|z{!(w{!P!'|!P!Q!)x!Q!^!'|!^!_!$`!_#O!'|#O#P!*o#P#QJl#Q#o!'|#o#p!$`#p~!'|7Z!*PY$UWU7ROYHqYZ%TZ!^Hq!^!_G{!_#OHq#O#PIf#P#QDu#Q#oHq#o#pG{#p~Hq7Z!*tX$UWOY!'|YZKoZz!'|z{!(w{!^!'|!^!_!$`!_#o!'|#o#p!$`#p~!'|7Z!+fX$UWOYJlYZKoZzJlz{NQ{!^Jl!^!_!!]!_#oJl#o#p!!]#p~Jl7Z!,Yc$UW}POzKoz{LZ{!^Ko!^!_M]!_#ZKo#Z#[!,R#[#]Ko#]#^!,R#^#aKo#a#b!,R#b#gKo#g#h!,R#h#iKo#i#j!,R#j#mKo#m#n!,R#n#oKo#o#pM]#p~Ko7Z!-lV$UWT7ROY!-eYZ%TZ!^!-e!^!_!.R!_#o!-e#o#p!.R#p~!-e7R!.WQT7ROY!.RZ~!.R$P!.g[$UW#o#v}POYDuYZ%TZ!PDu!P!QEr!Q!^Du!^!_Fx!_!}Du!}#OHq#O#PJQ#P#oDu#o#pFx#p~Du]!/f[#wS$UW}POYDuYZ%TZ!PDu!P!QEr!Q!^Du!^!_Fx!_!}Du!}#OHq#O#PJQ#P#oDu#o#pFx#p~Du!{!0cd$UWk!sO!O%T!O!P@r!P!Q%T!Q![!1q![!^%T!_!g%T!g!hAl!h#R%T#R#S!1q#S#U%T#U#V!3X#V#X%T#X#YAl#Y#b%T#b#c!2w#c#d!4m#d#l%T#l#m!5{#m#o%T#p~%T!{!1x_$UWk!sO!O%T!O!P@r!P!Q%T!Q![!1q![!^%T!_!g%T!g!hAl!h#R%T#R#S!1q#S#X%T#X#YAl#Y#b%T#b#c!2w#c#o%T#p~%T!{!3OR$UWk!sO!^%T!_#o%T#p~%T!{!3^W$UWO!Q%T!Q!R!3v!R!S!3v!S!^%T!_#R%T#R#S!3v#S#o%T#p~%T!{!3}Y$UWk!sO!Q%T!Q!R!3v!R!S!3v!S!^%T!_#R%T#R#S!3v#S#b%T#b#c!2w#c#o%T#p~%T!{!4rV$UWO!Q%T!Q!Y!5X!Y!^%T!_#R%T#R#S!5X#S#o%T#p~%T!{!5`X$UWk!sO!Q%T!Q!Y!5X!Y!^%T!_#R%T#R#S!5X#S#b%T#b#c!2w#c#o%T#p~%T!{!6QZ$UWO!Q%T!Q![!6s![!^%T!_!c%T!c!i!6s!i#R%T#R#S!6s#S#T%T#T#Z!6s#Z#o%T#p~%T!{!6z]$UWk!sO!Q%T!Q![!6s![!^%T!_!c%T!c!i!6s!i#R%T#R#S!6s#S#T%T#T#Z!6s#Z#b%T#b#c!2w#c#o%T#p~%T$u!7|R!]V$UW#m$fO!^%T!_#o%T#p~%T!q!8^R_!i$UWO!^%T!_#o%T#p~%T5w!8rR'bd!a/n#x&s'|P!P!Q!8{!^!_!9Q!_!`!9_W!9QO$WW#v!9VP#`#v!_!`!9Y#v!9_O#o#v#v!9dO#a#v$u!9kT!{$m$UWO!^%T!_!`'v!`!a!9z!a#o%T#p~%T$P!:RR#W#w$UWO!^%T!_#o%T#p~%T%V!:gT'a!R#a#v$RS$UWO!^%T!_!`!:v!`!a!;W!a#o%T#p~%T$O!:}R#a#v$UWO!^%T!_#o%T#p~%T$O!;_T#`#v$UWO!^%T!_!`5T!`!a!;n!a#o%T#p~%T$O!;uS#`#v$UWO!^%T!_!`5T!`#o%T#p~%T*a!<YV'p#{$UWO!O%T!O!P!<o!P!^%T!_!a%T!a!b!=P!b#o%T#p~%T*[!<vRv*S$UWO!^%T!_#o%T#p~%T$O!=WS$UW#j#vO!^%T!_!`5T!`#o%T#p~%T7V!=kRx6}$UWO!^%T!_#o%T#p~%Tk!={R!Oc$UWO!^%T!_#o%T#p~%T$O!>]S#g#v$UWO!^%T!_!`5T!`#o%T#p~%T$a!>pR$UW'f$XO!^%T!_#o%T#p~%T~!?OO!T~5b!?VT'w5Y$UWO!^%T!_!`5T!`#o%T#p#q!=P#q~%T6X!?oR!S5}nQ$UWO!^%T!_#o%T#p~%TX!@PR!kP$UWO!^%T!_#o%T#p~%T7Z!@gr$UW'Y7R#zS']$y'g3SOX%TXY%cYZ%TZ[%c[p%Tpq%cqt%Ttu2`u}%T}!O3j!O!Q%T!Q![2`![!^%T!_!c%T!c!}2`!}#R%T#R#S2`#S#T%T#T#o2`#p$f%T$f$g%c$g#BY2`#BY#BZ!@Y#BZ$IS2`$IS$I_!@Y$I_$JT2`$JT$JU!@Y$JU$KV2`$KV$KW!@Y$KW&FU2`&FU&FV!@Y&FV?HT2`?HT?HU!@Y?HU~2`7Z!CO_$UW'Z7R#zS']$y'g3SOt%Ttu2`u}%T}!O3j!O!Q%T!Q![2`![!^%T!_!c%T!c!}2`!}#R%T#R#S2`#S#T%T#T#o2`#p$g%T$g~2`",
    tokenizers: [X0, _0, A0, W0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, C0],
    topRules: { Script: [0, 7] },
    dialects: { jsx: 12107, ts: 12109 },
    dynamicPrecedences: { 149: 1, 176: 1 },
    specialized: [{ term: 289, get: (r) => M0[r] || -1 }, { term: 299, get: (r) => D0[r] || -1 }, { term: 63, get: (r) => E0[r] || -1 }],
    tokenPrec: 12130
  }), j0 = [
    /* @__PURE__ */ wi("function ${name}(${params}) {\n	${}\n}", {
      label: "function",
      detail: "definition",
      type: "keyword"
    }),
    /* @__PURE__ */ wi("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
      label: "for",
      detail: "loop",
      type: "keyword"
    }),
    /* @__PURE__ */ wi("for (let ${name} of ${collection}) {\n	${}\n}", {
      label: "for",
      detail: "of loop",
      type: "keyword"
    }),
    /* @__PURE__ */ wi("do {\n	${}\n} while (${})", {
      label: "do",
      detail: "loop",
      type: "keyword"
    }),
    /* @__PURE__ */ wi("while (${}) {\n	${}\n}", {
      label: "while",
      detail: "loop",
      type: "keyword"
    }),
    /* @__PURE__ */ wi(`try {
	\${}
} catch (\${error}) {
	\${}
}`, {
      label: "try",
      detail: "/ catch block",
      type: "keyword"
    }),
    /* @__PURE__ */ wi("if (${}) {\n	${}\n}", {
      label: "if",
      detail: "block",
      type: "keyword"
    }),
    /* @__PURE__ */ wi(`if (\${}) {
	\${}
} else {
	\${}
}`, {
      label: "if",
      detail: "/ else block",
      type: "keyword"
    }),
    /* @__PURE__ */ wi(`class \${name} {
	constructor(\${params}) {
		\${}
	}
}`, {
      label: "class",
      detail: "definition",
      type: "keyword"
    }),
    /* @__PURE__ */ wi('import {${names}} from "${module}"\n${}', {
      label: "import",
      detail: "named",
      type: "keyword"
    }),
    /* @__PURE__ */ wi('import ${name} from "${module}"\n${}', {
      label: "import",
      detail: "default",
      type: "keyword"
    })
  ], Ud = /* @__PURE__ */ new _g(), Bd = /* @__PURE__ */ new Set([
    "Script",
    "Block",
    "FunctionExpression",
    "FunctionDeclaration",
    "ArrowFunction",
    "MethodDeclaration",
    "ForStatement"
  ]);
  function ws(r) {
    return (t, e) => {
      let i = t.node.getChild("VariableDefinition");
      return i && e(i, r), !0;
    };
  }
  const z0 = ["FunctionDeclaration"], N0 = {
    FunctionDeclaration: /* @__PURE__ */ ws("function"),
    ClassDeclaration: /* @__PURE__ */ ws("class"),
    ClassExpression: () => !0,
    EnumDeclaration: /* @__PURE__ */ ws("constant"),
    TypeAliasDeclaration: /* @__PURE__ */ ws("type"),
    NamespaceDeclaration: /* @__PURE__ */ ws("namespace"),
    VariableDefinition(r, t) {
      r.matchContext(z0) || t(r, "variable");
    },
    TypeDefinition(r, t) {
      t(r, "type");
    },
    __proto__: null
  };
  function Yd(r, t) {
    let e = Ud.get(t);
    if (e)
      return e;
    let i = [], n = !0;
    function s(o, a) {
      let l = r.sliceString(o.from, o.to);
      i.push({ label: l, type: a });
    }
    return t.cursor(Dt.IncludeAnonymous).iterate((o) => {
      if (n)
        n = !1;
      else if (o.name) {
        let a = N0[o.name];
        if (a && a(o, s) || Bd.has(o.name))
          return !1;
      } else if (o.to - o.from > 8192) {
        for (let a of Yd(r, o.node))
          i.push(a);
        return !1;
      }
    }), Ud.set(t, i), i;
  }
  const Fd = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/, Hd = [
    "TemplateString",
    "String",
    "RegExp",
    "LineComment",
    "BlockComment",
    "VariableDefinition",
    "TypeDefinition",
    "Label",
    "PropertyDefinition",
    "PropertyName",
    "PrivatePropertyDefinition",
    "PrivatePropertyName"
  ];
  function I0(r) {
    let t = Lt(r.state).resolveInner(r.pos, -1);
    if (Hd.indexOf(t.name) > -1)
      return null;
    let e = t.to - t.from < 20 && Fd.test(r.state.sliceDoc(t.from, t.to));
    if (!e && !r.explicit)
      return null;
    let i = [];
    for (let n = t; n; n = n.parent)
      Bd.has(n.name) && (i = i.concat(Yd(r.state.doc, n)));
    return {
      options: i,
      from: e ? t.from : r.pos,
      validFor: Fd
    };
  }
  const _r = /* @__PURE__ */ tn.define({
    parser: /* @__PURE__ */ Z0.configure({
      props: [
        /* @__PURE__ */ fs.add({
          IfStatement: /* @__PURE__ */ xn({ except: /^\s*({|else\b)/ }),
          TryStatement: /* @__PURE__ */ xn({ except: /^\s*({|catch\b|finally\b)/ }),
          LabeledStatement: nv,
          SwitchBody: (r) => {
            let t = r.textAfter, e = /^\s*\}/.test(t), i = /^\s*(case|default)\b/.test(t);
            return r.baseIndent + (e ? 0 : i ? 1 : 2) * r.unit;
          },
          Block: /* @__PURE__ */ rv({ closing: "}" }),
          ArrowFunction: (r) => r.baseIndent + r.unit,
          "TemplateString BlockComment": () => null,
          "Statement Property": /* @__PURE__ */ xn({ except: /^{/ }),
          JSXElement(r) {
            let t = /^\s*<\//.test(r.textAfter);
            return r.lineIndent(r.node.from) + (t ? 0 : r.unit);
          },
          JSXEscape(r) {
            let t = /\s*\}/.test(r.textAfter);
            return r.lineIndent(r.node.from) + (t ? 0 : r.unit);
          },
          "JSXOpenTag JSXSelfClosingTag"(r) {
            return r.column(r.node.from) + r.unit;
          }
        }),
        /* @__PURE__ */ ds.add({
          "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression": kl,
          BlockComment(r) {
            return { from: r.from + 2, to: r.to - 2 };
          }
        })
      ]
    }),
    languageData: {
      closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] },
      commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
      indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
      wordChars: "$"
    }
  }), G0 = /* @__PURE__ */ _r.configure({ dialect: "ts" }), V0 = /* @__PURE__ */ _r.configure({ dialect: "jsx" }), L0 = /* @__PURE__ */ _r.configure({ dialect: "jsx ts" }), U0 = /* @__PURE__ */ "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map((r) => ({ label: r, type: "keyword" }));
  function Jd(r = {}) {
    let t = r.jsx ? r.typescript ? L0 : V0 : r.typescript ? G0 : _r;
    return new xo(t, [
      _r.data.of({
        autocomplete: fy(Hd, fd(j0.concat(U0)))
      }),
      _r.data.of({
        autocomplete: I0
      }),
      r.jsx ? Y0 : []
    ]);
  }
  function Kd(r, t, e = r.length) {
    if (!t)
      return "";
    let i = t.getChild("JSXIdentifier");
    return i ? r.sliceString(i.from, Math.min(i.to, e)) : "";
  }
  const B0 = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), Y0 = /* @__PURE__ */ F.inputHandler.of((r, t, e, i) => {
    if ((B0 ? r.composing : r.compositionStarted) || r.state.readOnly || t != e || i != ">" && i != "/" || !_r.isActiveAt(r.state, t, -1))
      return !1;
    let { state: n } = r, s = n.changeByRange((o) => {
      var a, l, u;
      let { head: d } = o, O = Lt(n).resolveInner(d, -1), m;
      if (O.name == "JSXStartTag" && (O = O.parent), i == ">" && O.name == "JSXFragmentTag")
        return { range: _.cursor(d + 1), changes: { from: d, insert: "><>" } };
      if (i == ">" && O.name == "JSXIdentifier") {
        if (((l = (a = O.parent) === null || a === void 0 ? void 0 : a.lastChild) === null || l === void 0 ? void 0 : l.name) != "JSXEndTag" && (m = Kd(n.doc, O.parent, d)))
          return { range: _.cursor(d + 1), changes: { from: d, insert: `></${m}>` } };
      } else if (i == "/" && O.name == "JSXFragmentTag") {
        let Q = O.parent, b = Q == null ? void 0 : Q.parent;
        if (Q.from == d - 1 && ((u = b.lastChild) === null || u === void 0 ? void 0 : u.name) != "JSXEndTag" && (m = Kd(n.doc, b == null ? void 0 : b.firstChild, d))) {
          let C = `/${m}>`;
          return { range: _.cursor(d + C.length), changes: { from: d, insert: C } };
        }
      }
      return { range: o };
    });
    return s.changes.empty ? !1 : (r.dispatch(s, { userEvent: "input.type", scrollIntoView: !0 }), !0);
  }), F0 = 53, H0 = 1, J0 = 54, K0 = 2, tb = 55, eb = 3, ta = 4, tO = 5, eO = 6, iO = 7, rO = 8, ib = 9, rb = 10, nb = 11, nh = 56, sb = 12, nO = 57, ob = 18, ab = 27, lb = 30, hb = 33, cb = 35, ub = 0, fb = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    command: !0,
    embed: !0,
    frame: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
    menuitem: !0
  }, db = {
    dd: !0,
    li: !0,
    optgroup: !0,
    option: !0,
    p: !0,
    rp: !0,
    rt: !0,
    tbody: !0,
    td: !0,
    tfoot: !0,
    th: !0,
    tr: !0
  }, sO = {
    dd: { dd: !0, dt: !0 },
    dt: { dd: !0, dt: !0 },
    li: { li: !0 },
    option: { option: !0, optgroup: !0 },
    optgroup: { optgroup: !0 },
    p: {
      address: !0,
      article: !0,
      aside: !0,
      blockquote: !0,
      dir: !0,
      div: !0,
      dl: !0,
      fieldset: !0,
      footer: !0,
      form: !0,
      h1: !0,
      h2: !0,
      h3: !0,
      h4: !0,
      h5: !0,
      h6: !0,
      header: !0,
      hgroup: !0,
      hr: !0,
      menu: !0,
      nav: !0,
      ol: !0,
      p: !0,
      pre: !0,
      section: !0,
      table: !0,
      ul: !0
    },
    rp: { rp: !0, rt: !0 },
    rt: { rp: !0, rt: !0 },
    tbody: { tbody: !0, tfoot: !0 },
    td: { td: !0, th: !0 },
    tfoot: { tbody: !0 },
    th: { td: !0, th: !0 },
    thead: { tbody: !0, tfoot: !0 },
    tr: { tr: !0 }
  };
  function Ob(r) {
    return r == 45 || r == 46 || r == 58 || r >= 65 && r <= 90 || r == 95 || r >= 97 && r <= 122 || r >= 161;
  }
  function oO(r) {
    return r == 9 || r == 10 || r == 13 || r == 32;
  }
  let aO = null, lO = null, hO = 0;
  function sh(r, t) {
    let e = r.pos + t;
    if (hO == e && lO == r)
      return aO;
    let i = r.peek(t);
    for (; oO(i); )
      i = r.peek(++t);
    let n = "";
    for (; Ob(i); )
      n += String.fromCharCode(i), i = r.peek(++t);
    return lO = r, hO = e, aO = n ? n.toLowerCase() : i == pb || i == mb ? void 0 : null;
  }
  const cO = 60, uO = 62, fO = 47, pb = 63, mb = 33, gb = 45;
  function dO(r, t) {
    this.name = r, this.parent = t, this.hash = t ? t.hash : 0;
    for (let e = 0; e < r.length; e++)
      this.hash += (this.hash << 4) + r.charCodeAt(e) + (r.charCodeAt(e) << 8);
  }
  const vb = [ta, rO, tO, eO, iO], Qb = new jd({
    start: null,
    shift(r, t, e, i) {
      return vb.indexOf(t) > -1 ? new dO(sh(i, 1) || "", r) : r;
    },
    reduce(r, t) {
      return t == ob && r ? r.parent : r;
    },
    reuse(r, t, e, i) {
      let n = t.type.id;
      return n == ta || n == cb ? new dO(sh(i, 1) || "", r) : r;
    },
    hash(r) {
      return r ? r.hash : 0;
    },
    strict: !1
  }), yb = new xi((r, t) => {
    if (r.next != cO) {
      r.next < 0 && t.context && r.acceptToken(nh);
      return;
    }
    r.advance();
    let e = r.next == fO;
    e && r.advance();
    let i = sh(r, 0);
    if (i === void 0)
      return;
    if (!i)
      return r.acceptToken(e ? sb : ta);
    let n = t.context ? t.context.name : null;
    if (e) {
      if (i == n)
        return r.acceptToken(ib);
      if (n && db[n])
        return r.acceptToken(nh, -2);
      if (t.dialectEnabled(ub))
        return r.acceptToken(rb);
      for (let s = t.context; s; s = s.parent)
        if (s.name == i)
          return;
      r.acceptToken(nb);
    } else {
      if (i == "script")
        return r.acceptToken(tO);
      if (i == "style")
        return r.acceptToken(eO);
      if (i == "textarea")
        return r.acceptToken(iO);
      if (fb.hasOwnProperty(i))
        return r.acceptToken(rO);
      n && sO[n] && sO[n][i] ? r.acceptToken(nh, -1) : r.acceptToken(ta);
    }
  }, { contextual: !0 }), bb = new xi((r) => {
    for (let t = 0, e = 0; ; e++) {
      if (r.next < 0) {
        e && r.acceptToken(nO);
        break;
      }
      if (r.next == gb)
        t++;
      else if (r.next == uO && t >= 2) {
        e > 3 && r.acceptToken(nO, -2);
        break;
      } else
        t = 0;
      r.advance();
    }
  });
  function oh(r, t, e) {
    let i = 2 + r.length;
    return new xi((n) => {
      for (let s = 0, o = 0, a = 0; ; a++) {
        if (n.next < 0) {
          a && n.acceptToken(t);
          break;
        }
        if (s == 0 && n.next == cO || s == 1 && n.next == fO || s >= 2 && s < i && n.next == r.charCodeAt(s - 2))
          s++, o++;
        else if ((s == 2 || s == i) && oO(n.next))
          o++;
        else if (s == i && n.next == uO) {
          a > o ? n.acceptToken(t, -o) : n.acceptToken(e, -(o - 2));
          break;
        } else if ((n.next == 10 || n.next == 13) && a) {
          n.acceptToken(t, 1);
          break;
        } else
          s = o = 0;
        n.advance();
      }
    });
  }
  const wb = oh("script", F0, H0), xb = oh("style", J0, K0), Sb = oh("textarea", tb, eb), kb = os({
    "Text RawText": w.content,
    "StartTag StartCloseTag SelfCloserEndTag EndTag SelfCloseEndTag": w.angleBracket,
    TagName: w.tagName,
    "MismatchedCloseTag/TagName": [w.tagName, w.invalid],
    AttributeName: w.attributeName,
    "AttributeValue UnquotedAttributeValue": w.attributeValue,
    Is: w.definitionOperator,
    "EntityReference CharacterReference": w.character,
    Comment: w.blockComment,
    ProcessingInst: w.processingInstruction,
    DoctypeDecl: w.documentMeta
  }), $b = nn.deserialize({
    version: 14,
    states: ",xOVOxOOO!WQ!bO'#CoO!]Q!bO'#CyO!bQ!bO'#C|O!gQ!bO'#DPO!lQ!bO'#DRO!qOXO'#CnO!|OYO'#CnO#XO[O'#CnO$eOxO'#CnOOOW'#Cn'#CnO$lO!rO'#DSO$tQ!bO'#DUO$yQ!bO'#DVOOOW'#Dj'#DjOOOW'#DX'#DXQVOxOOO%OQ#tO,59ZO%WQ#tO,59eO%`Q#tO,59hO%hQ#tO,59kO%pQ#tO,59mOOOX'#D]'#D]O%xOXO'#CwO&TOXO,59YOOOY'#D^'#D^O&]OYO'#CzO&hOYO,59YOOO['#D_'#D_O&pO[O'#C}O&{O[O,59YOOOW'#D`'#D`O'TOxO,59YO'[Q!bO'#DQOOOW,59Y,59YOOO`'#Da'#DaO'aO!rO,59nOOOW,59n,59nO'iQ!bO,59pO'nQ!bO,59qOOOW-E7V-E7VO'sQ#tO'#CqOOQO'#DY'#DYO(OQ#tO1G.uOOOX1G.u1G.uO(WQ#tO1G/POOOY1G/P1G/PO(`Q#tO1G/SOOO[1G/S1G/SO(hQ#tO1G/VOOOW1G/V1G/VO(pQ#tO1G/XOOOW1G/X1G/XOOOX-E7Z-E7ZO(xQ!bO'#CxOOOW1G.t1G.tOOOY-E7[-E7[O(}Q!bO'#C{OOO[-E7]-E7]O)SQ!bO'#DOOOOW-E7^-E7^O)XQ!bO,59lOOO`-E7_-E7_OOOW1G/Y1G/YOOOW1G/[1G/[OOOW1G/]1G/]O)^Q&jO,59]OOQO-E7W-E7WOOOX7+$a7+$aOOOY7+$k7+$kOOO[7+$n7+$nOOOW7+$q7+$qOOOW7+$s7+$sO)iQ!bO,59dO)nQ!bO,59gO)sQ!bO,59jOOOW1G/W1G/WO)xO,UO'#CtO*ZO7[O'#CtOOQO1G.w1G.wOOOW1G/O1G/OOOOW1G/R1G/ROOOW1G/U1G/UOOOO'#DZ'#DZO*lO,UO,59`OOQO,59`,59`OOOO'#D['#D[O*}O7[O,59`OOOO-E7X-E7XOOQO1G.z1G.zOOOO-E7Y-E7Y",
    stateData: "+h~O!]OS~OSSOTPOUQOVROWTOY]OZ[O[^O^^O_^O`^Oa^Ow^Oz_O!cZO~OdaO~OdbO~OdcO~OddO~OdeO~O!VfOPkP!YkP~O!WiOQnP!YnP~O!XlORqP!YqP~OSSOTPOUQOVROWTOXqOY]OZ[O[^O^^O_^O`^Oa^Ow^O!cZO~O!YrO~P#dO!ZsO!duO~OdvO~OdwO~OfyOj|O~OfyOj!OO~OfyOj!QO~OfyOj!SO~OfyOj!UO~O!VfOPkX!YkX~OP!WO!Y!XO~O!WiOQnX!YnX~OQ!ZO!Y!XO~O!XlORqX!YqX~OR!]O!Y!XO~O!Y!XO~P#dOd!_O~O!ZsO!d!aO~Oj!bO~Oj!cO~Og!dOfeXjeX~OfyOj!fO~OfyOj!gO~OfyOj!hO~OfyOj!iO~OfyOj!jO~Od!kO~Od!lO~Od!mO~Oj!nO~Oi!qO!_!oO!a!pO~Oj!rO~Oj!sO~Oj!tO~O_!uO`!uOa!uO!_!wO!`!uO~O_!xO`!xOa!xO!a!wO!b!xO~O_!uO`!uOa!uO!_!{O!`!uO~O_!xO`!xOa!xO!a!{O!b!xO~O`_a!cwz!c~",
    goto: "%o!_PPPPPPPPPPPPPPPPPP!`!fP!lPP!xPP!{#O#R#X#[#_#e#h#k#q#w!`P!`!`P#}$T$k$q$w$}%T%Z%aPPPPPPPP%gX^OX`pXUOX`pezabcde{}!P!R!TR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ}bQ!PcQ!RdQ!TeZ!e{}!P!R!TQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",
    nodeNames: "⚠ StartCloseTag StartCloseTag StartCloseTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue EndTag ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl",
    maxTerm: 66,
    context: Qb,
    nodeProps: [
      ["closedBy", -11, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, "EndTag", -4, 19, 29, 32, 35, "CloseTag"],
      ["group", -9, 12, 15, 16, 17, 18, 38, 39, 40, 41, "Entity", 14, "Entity TextContent", -3, 27, 30, 33, "TextContent Entity"],
      ["openedBy", 26, "StartTag StartCloseTag", -4, 28, 31, 34, 36, "OpenTag"]
    ],
    propSources: [kb],
    skippedNodes: [0],
    repeatNodeCount: 9,
    tokenData: "!#b!aR!WOX$kXY)sYZ)sZ]$k]^)s^p$kpq)sqr$krs*zsv$kvw+dwx2yx}$k}!O3f!O!P$k!P!Q7_!Q![$k![!]8u!]!^$k!^!_>b!_!`!!p!`!a8T!a!c$k!c!}8u!}#R$k#R#S8u#S#T$k#T#o8u#o$f$k$f$g&R$g%W$k%W%o8u%o%p$k%p&a8u&a&b$k&b1p8u1p4U$k4U4d8u4d4e$k4e$IS8u$IS$I`$k$I`$Ib8u$Ib$Kh$k$Kh%#t8u%#t&/x$k&/x&Et8u&Et&FV$k&FV;'S8u;'S;:j<t;:j?&r$k?&r?Ah8u?Ah?BY$k?BY?Mn8u?Mn~$k!Z$vc^PiW!``!bpOX$kXZ&RZ]$k]^&R^p$kpq&Rqr$krs&qsv$kvw)Rwx'rx!P$k!P!Q&R!Q!^$k!^!_(k!_!a&R!a$f$k$f$g&R$g~$k!R&[V^P!``!bpOr&Rrs&qsv&Rwx'rx!^&R!^!_(k!_~&Rq&xT^P!bpOv&qwx'Xx!^&q!^!_'g!_~&qP'^R^POv'Xw!^'X!_~'Xp'lQ!bpOv'gx~'ga'yU^P!``Or'rrs'Xsv'rw!^'r!^!_(]!_~'r`(bR!``Or(]sv(]w~(]!Q(rT!``!bpOr(krs'gsv(kwx(]x~(kW)WXiWOX)RZ])R^p)Rqr)Rsw)Rx!P)R!Q!^)R!a$f)R$g~)R!a*O^^P!``!bp!]^OX&RXY)sYZ)sZ]&R]^)s^p&Rpq)sqr&Rrs&qsv&Rwx'rx!^&R!^!_(k!_~&R!Z+TT!_h^P!bpOv&qwx'Xx!^&q!^!_'g!_~&q!Z+kbiWa!ROX,sXZ.QZ],s]^.Q^p,sqr,srs.Qst/]tw,swx.Qx!P,s!P!Q.Q!Q!],s!]!^)R!^!a.Q!a$f,s$f$g.Q$g~,s!Z,xbiWOX,sXZ.QZ],s]^.Q^p,sqr,srs.Qst)Rtw,swx.Qx!P,s!P!Q.Q!Q!],s!]!^.i!^!a.Q!a$f,s$f$g.Q$g~,s!R.TTOp.Qqs.Qt!].Q!]!^.d!^~.Q!R.iO_!R!Z.pXiW_!ROX)RZ])R^p)Rqr)Rsw)Rx!P)R!Q!^)R!a$f)R$g~)R!Z/baiWOX0gXZ1qZ]0g]^1q^p0gqr0grs1qsw0gwx1qx!P0g!P!Q1q!Q!]0g!]!^)R!^!a1q!a$f0g$f$g1q$g~0g!Z0laiWOX0gXZ1qZ]0g]^1q^p0gqr0grs1qsw0gwx1qx!P0g!P!Q1q!Q!]0g!]!^2V!^!a1q!a$f0g$f$g1q$g~0g!R1tSOp1qq!]1q!]!^2Q!^~1q!R2VO`!R!Z2^XiW`!ROX)RZ])R^p)Rqr)Rsw)Rx!P)R!Q!^)R!a$f)R$g~)R!Z3SU!ax^P!``Or'rrs'Xsv'rw!^'r!^!_(]!_~'r!]3qe^PiW!``!bpOX$kXZ&RZ]$k]^&R^p$kpq&Rqr$krs&qsv$kvw)Rwx'rx}$k}!O5S!O!P$k!P!Q&R!Q!^$k!^!_(k!_!a&R!a$f$k$f$g&R$g~$k!]5_d^PiW!``!bpOX$kXZ&RZ]$k]^&R^p$kpq&Rqr$krs&qsv$kvw)Rwx'rx!P$k!P!Q&R!Q!^$k!^!_(k!_!`&R!`!a6m!a$f$k$f$g&R$g~$k!T6xV^P!``!bp!dQOr&Rrs&qsv&Rwx'rx!^&R!^!_(k!_~&R!X7hX^P!``!bpOr&Rrs&qsv&Rwx'rx!^&R!^!_(k!_!`&R!`!a8T!a~&R!X8`VjU^P!``!bpOr&Rrs&qsv&Rwx'rx!^&R!^!_(k!_~&R!a9U!YfSdQ^PiW!``!bpOX$kXZ&RZ]$k]^&R^p$kpq&Rqr$krs&qsv$kvw)Rwx'rx}$k}!O8u!O!P8u!P!Q&R!Q![8u![!]8u!]!^$k!^!_(k!_!a&R!a!c$k!c!}8u!}#R$k#R#S8u#S#T$k#T#o8u#o$f$k$f$g&R$g$}$k$}%O8u%O%W$k%W%o8u%o%p$k%p&a8u&a&b$k&b1p8u1p4U8u4U4d8u4d4e$k4e$IS8u$IS$I`$k$I`$Ib8u$Ib$Je$k$Je$Jg8u$Jg$Kh$k$Kh%#t8u%#t&/x$k&/x&Et8u&Et&FV$k&FV;'S8u;'S;:j<t;:j?&r$k?&r?Ah8u?Ah?BY$k?BY?Mn8u?Mn~$k!a=Pe^PiW!``!bpOX$kXZ&RZ]$k]^&R^p$kpq&Rqr$krs&qsv$kvw)Rwx'rx!P$k!P!Q&R!Q!^$k!^!_(k!_!a&R!a$f$k$f$g&R$g;=`$k;=`<%l8u<%l~$k!R>iW!``!bpOq(kqr?Rrs'gsv(kwx(]x!a(k!a!bKj!b~(k!R?YZ!``!bpOr(krs'gsv(kwx(]x}(k}!O?{!O!f(k!f!gAR!g#W(k#W#XGz#X~(k!R@SV!``!bpOr(krs'gsv(kwx(]x}(k}!O@i!O~(k!R@rT!``!bp!cPOr(krs'gsv(kwx(]x~(k!RAYV!``!bpOr(krs'gsv(kwx(]x!q(k!q!rAo!r~(k!RAvV!``!bpOr(krs'gsv(kwx(]x!e(k!e!fB]!f~(k!RBdV!``!bpOr(krs'gsv(kwx(]x!v(k!v!wBy!w~(k!RCQV!``!bpOr(krs'gsv(kwx(]x!{(k!{!|Cg!|~(k!RCnV!``!bpOr(krs'gsv(kwx(]x!r(k!r!sDT!s~(k!RD[V!``!bpOr(krs'gsv(kwx(]x!g(k!g!hDq!h~(k!RDxW!``!bpOrDqrsEbsvDqvwEvwxFfx!`Dq!`!aGb!a~DqqEgT!bpOvEbvxEvx!`Eb!`!aFX!a~EbPEyRO!`Ev!`!aFS!a~EvPFXOzPqF`Q!bpzPOv'gx~'gaFkV!``OrFfrsEvsvFfvwEvw!`Ff!`!aGQ!a~FfaGXR!``zPOr(]sv(]w~(]!RGkT!``!bpzPOr(krs'gsv(kwx(]x~(k!RHRV!``!bpOr(krs'gsv(kwx(]x#c(k#c#dHh#d~(k!RHoV!``!bpOr(krs'gsv(kwx(]x#V(k#V#WIU#W~(k!RI]V!``!bpOr(krs'gsv(kwx(]x#h(k#h#iIr#i~(k!RIyV!``!bpOr(krs'gsv(kwx(]x#m(k#m#nJ`#n~(k!RJgV!``!bpOr(krs'gsv(kwx(]x#d(k#d#eJ|#e~(k!RKTV!``!bpOr(krs'gsv(kwx(]x#X(k#X#YDq#Y~(k!RKqW!``!bpOrKjrsLZsvKjvwLowxNPx!aKj!a!b! g!b~KjqL`T!bpOvLZvxLox!aLZ!a!bM^!b~LZPLrRO!aLo!a!bL{!b~LoPMORO!`Lo!`!aMX!a~LoPM^OwPqMcT!bpOvLZvxLox!`LZ!`!aMr!a~LZqMyQ!bpwPOv'gx~'gaNUV!``OrNPrsLosvNPvwLow!aNP!a!bNk!b~NPaNpV!``OrNPrsLosvNPvwLow!`NP!`!a! V!a~NPa! ^R!``wPOr(]sv(]w~(]!R! nW!``!bpOrKjrsLZsvKjvwLowxNPx!`Kj!`!a!!W!a~Kj!R!!aT!``!bpwPOr(krs'gsv(kwx(]x~(k!V!!{VgS^P!``!bpOr&Rrs&qsv&Rwx'rx!^&R!^!_(k!_~&R",
    tokenizers: [wb, xb, Sb, yb, bb, 0, 1, 2, 3, 4, 5],
    topRules: { Document: [0, 13] },
    dialects: { noMatch: 0 },
    tokenPrec: 476
  });
  function Tb(r, t) {
    let e = /* @__PURE__ */ Object.create(null);
    for (let i of r.firstChild.getChildren("Attribute")) {
      let n = i.getChild("AttributeName"), s = i.getChild("AttributeValue") || i.getChild("UnquotedAttributeValue");
      n && (e[t.read(n.from, n.to)] = s ? s.name == "AttributeValue" ? t.read(s.from + 1, s.to - 1) : t.read(s.from, s.to) : "");
    }
    return e;
  }
  function ah(r, t, e) {
    let i;
    for (let n of e)
      if (!n.attrs || n.attrs(i || (i = Tb(r.node.parent, t))))
        return { parser: n.parser };
    return null;
  }
  function Pb(r) {
    let t = [], e = [], i = [];
    for (let n of r) {
      let s = n.tag == "script" ? t : n.tag == "style" ? e : n.tag == "textarea" ? i : null;
      if (!s)
        throw new RangeError("Only script, style, and textarea tags can host nested parsers");
      s.push(n);
    }
    return Wg((n, s) => {
      let o = n.type.id;
      return o == ab ? ah(n, s, t) : o == lb ? ah(n, s, e) : o == hb ? ah(n, s, i) : null;
    });
  }
  const Rb = 93, OO = 1, Cb = 94, _b = 95, pO = 2, mO = [
    9,
    10,
    11,
    12,
    13,
    32,
    133,
    160,
    5760,
    8192,
    8193,
    8194,
    8195,
    8196,
    8197,
    8198,
    8199,
    8200,
    8201,
    8202,
    8232,
    8233,
    8239,
    8287,
    12288
  ], Ab = 58, Wb = 40, gO = 95, Xb = 91, ea = 45, qb = 46, Mb = 35, Db = 37;
  function ia(r) {
    return r >= 65 && r <= 90 || r >= 97 && r <= 122 || r >= 161;
  }
  function Eb(r) {
    return r >= 48 && r <= 57;
  }
  const Zb = new xi((r, t) => {
    for (let e = !1, i = 0, n = 0; ; n++) {
      let { next: s } = r;
      if (ia(s) || s == ea || s == gO || e && Eb(s))
        !e && (s != ea || n > 0) && (e = !0), i === n && s == ea && i++, r.advance();
      else {
        e && r.acceptToken(s == Wb ? Cb : i == 2 && t.canShift(pO) ? pO : _b);
        break;
      }
    }
  }), jb = new xi((r) => {
    if (mO.includes(r.peek(-1))) {
      let { next: t } = r;
      (ia(t) || t == gO || t == Mb || t == qb || t == Xb || t == Ab || t == ea) && r.acceptToken(Rb);
    }
  }), zb = new xi((r) => {
    if (!mO.includes(r.peek(-1))) {
      let { next: t } = r;
      if (t == Db && (r.advance(), r.acceptToken(OO)), ia(t)) {
        do
          r.advance();
        while (ia(r.next));
        r.acceptToken(OO);
      }
    }
  }), Nb = os({
    "import charset namespace keyframes": w.definitionKeyword,
    "media supports": w.controlKeyword,
    "from to selector": w.keyword,
    NamespaceName: w.namespace,
    KeyframeName: w.labelName,
    TagName: w.tagName,
    ClassName: w.className,
    PseudoClassName: w.constant(w.className),
    IdName: w.labelName,
    "FeatureName PropertyName": w.propertyName,
    AttributeName: w.attributeName,
    NumberLiteral: w.number,
    KeywordQuery: w.keyword,
    UnaryQueryOp: w.operatorKeyword,
    "CallTag ValueName": w.atom,
    VariableName: w.variableName,
    Callee: w.operatorKeyword,
    Unit: w.unit,
    "UniversalSelector NestingSelector": w.definitionOperator,
    AtKeyword: w.keyword,
    MatchOp: w.compareOperator,
    "ChildOp SiblingOp, LogicOp": w.logicOperator,
    BinOp: w.arithmeticOperator,
    Important: w.modifier,
    Comment: w.blockComment,
    ParenthesizedContent: w.special(w.name),
    ColorLiteral: w.color,
    StringLiteral: w.string,
    ":": w.punctuation,
    "PseudoOp #": w.derefOperator,
    "; ,": w.separator,
    "( )": w.paren,
    "[ ]": w.squareBracket,
    "{ }": w.brace
  }), Ib = { __proto__: null, lang: 32, "nth-child": 32, "nth-last-child": 32, "nth-of-type": 32, dir: 32, url: 60, "url-prefix": 60, domain: 60, regexp: 60, selector: 134 }, Gb = { __proto__: null, "@import": 114, "@media": 138, "@charset": 142, "@namespace": 146, "@keyframes": 152, "@supports": 164 }, Vb = { __proto__: null, not: 128, only: 128, from: 158, to: 160 }, Lb = nn.deserialize({
    version: 14,
    states: "7WOYQ[OOOOQP'#Cd'#CdOOQP'#Cc'#CcO!ZQ[O'#CfO!}QXO'#CaO#UQ[O'#ChO#aQ[O'#DPO#fQ[O'#DTOOQP'#Ec'#EcO#kQdO'#DeO$VQ[O'#DrO#kQdO'#DtO$hQ[O'#DvO$sQ[O'#DyO$xQ[O'#EPO%WQ[O'#EROOQS'#Eb'#EbOOQS'#ES'#ESQYQ[OOOOQP'#Cg'#CgOOQP,59Q,59QO!ZQ[O,59QO%_Q[O'#EVO%yQWO,58{O&RQ[O,59SO#aQ[O,59kO#fQ[O,59oO%_Q[O,59sO%_Q[O,59uO%_Q[O,59vO'bQ[O'#D`OOQS,58{,58{OOQP'#Ck'#CkOOQO'#C}'#C}OOQP,59S,59SO'iQWO,59SO'nQWO,59SOOQP'#DR'#DROOQP,59k,59kOOQO'#DV'#DVO'sQ`O,59oOOQS'#Cp'#CpO#kQdO'#CqO'{QvO'#CsO)VQtO,5:POOQO'#Cx'#CxO'iQWO'#CwO)kQWO'#CyOOQS'#Ef'#EfOOQO'#Dh'#DhO)pQ[O'#DoO*OQWO'#EiO$xQ[O'#DmO*^QWO'#DpOOQO'#Ej'#EjO%|QWO,5:^O*cQpO,5:`OOQS'#Dx'#DxO*kQWO,5:bO*pQ[O,5:bOOQO'#D{'#D{O*xQWO,5:eO*}QWO,5:kO+VQWO,5:mOOQS-E8Q-E8QOOQP1G.l1G.lO+yQXO,5:qOOQO-E8T-E8TOOQS1G.g1G.gOOQP1G.n1G.nO'iQWO1G.nO'nQWO1G.nOOQP1G/V1G/VO,WQ`O1G/ZO,qQXO1G/_O-XQXO1G/aO-oQXO1G/bO.VQXO'#CdO.zQWO'#DaOOQS,59z,59zO/PQWO,59zO/XQ[O,59zO/`QdO'#CoO/gQ[O'#DOOOQP1G/Z1G/ZO#kQdO1G/ZO/nQpO,59]OOQS,59_,59_O#kQdO,59aO/vQWO1G/kOOQS,59c,59cO/{Q!bO,59eO0TQWO'#DhO0`QWO,5:TO0eQWO,5:ZO$xQ[O,5:VO$xQ[O'#EYO0mQWO,5;TO0xQWO,5:XO%_Q[O,5:[OOQS1G/x1G/xOOQS1G/z1G/zOOQS1G/|1G/|O1ZQWO1G/|O1`QdO'#D|OOQS1G0P1G0POOQS1G0V1G0VOOQS1G0X1G0XOOQP7+$Y7+$YOOQP7+$u7+$uO#kQdO7+$uO#kQdO,59{O1nQ[O'#EXO1xQWO1G/fOOQS1G/f1G/fO1xQWO1G/fO2QQtO'#ETO2uQdO'#EeO3PQWO,59ZO3UQXO'#EhO3]QWO,59jO3bQpO7+$uOOQS1G.w1G.wOOQS1G.{1G.{OOQS7+%V7+%VO3jQWO1G/PO#kQdO1G/oOOQO1G/u1G/uOOQO1G/q1G/qO3oQWO,5:tOOQO-E8W-E8WO3}QXO1G/vOOQS7+%h7+%hO4UQYO'#CsO%|QWO'#EZO4^QdO,5:hOOQS,5:h,5:hO4lQpO<<HaO4tQtO1G/gOOQO,5:s,5:sO5XQ[O,5:sOOQO-E8V-E8VOOQS7+%Q7+%QO5cQWO7+%QOOQS-E8R-E8RO#kQdO'#EUO5kQWO,5;POOQT1G.u1G.uO5sQWO,5;SOOQP1G/U1G/UOOQP<<Ha<<HaOOQS7+$k7+$kO5{QdO7+%ZOOQO7+%b7+%bOOQS,5:u,5:uOOQS-E8X-E8XOOQS1G0S1G0SOOQPAN={AN={O6SQtO'#EWO#kQdO'#EWO6}QdO7+%ROOQO7+%R7+%ROOQO1G0_1G0_OOQS<<Hl<<HlO7_QdO,5:pOOQO-E8S-E8SOOQO<<Hu<<HuO7iQtO,5:rOOQS-E8U-E8UOOQO<<Hm<<Hm",
    stateData: "8j~O#TOSROS~OUWOXWO]TO^TOtUOxVO!Y_O!ZXO!gYO!iZO!k[O!n]O!t^O#RPO#WRO~O#RcO~O]hO^hOpfOtiOxjO|kO!PmO#PlO#WeO~O!RnO~P!`O`sO#QqO#RpO~O#RuO~O#RwO~OQ!QObzOf!QOh!QOn!PO#Q}O#RyO#Z{O~Ob!SO!b!UO!e!VO#R!RO!R#]P~Oh![On!PO#R!ZO~O#R!^O~Ob!SO!b!UO!e!VO#R!RO~O!W#]P~P$VOUWOXWO]TO^TOtUOxVO#RPO#WRO~OpfO!RnO~O`!hO#QqO#RpO~OQ!pOUWOXWO]TO^TOtUOxVO!Y_O!ZXO!gYO!iZO!k[O!n]O!t^O#R!oO#WRO~O!Q!qO~P&^Ob!tO~Ob!uO~Ov!vOz!wO~OP!yObgXjgX!WgX!bgX!egX#RgXagXQgXfgXhgXngXpgX#QgX#ZgXvgX!QgX!VgX~Ob!SOj!zO!b!UO!e!VO#R!RO!W#]P~Ob!}O~Ob!SO!b!UO!e!VO#R#OO~Op#SO!`#RO!R#]X!W#]X~Ob#VO~Oj!zO!W#XO~O!W#YO~Oh#ZOn!PO~O!R#[O~O!RnO!`#RO~O!RnO!W#_O~O]hO^hOtiOxjO|kO!PmO#PlO#WeO~Op!ya!R!yaa!ya~P+_Ov#aOz#bO~O]hO^hOtiOxjO#WeO~Op{i|{i!P{i!R{i#P{ia{i~P,`Op}i|}i!P}i!R}i#P}ia}i~P,`Op!Oi|!Oi!P!Oi!R!Oi#P!Oia!Oi~P,`O]WX]!UX^WXpWXtWXxWX|WX!PWX!RWX#PWX#WWX~O]#cO~O!Q#fO!W#dO~O!Q#fO~P&^Oa#XP~P#kOa#[P~P%_Oa#nOj!zO~O!W#pO~Oh#qOo#qO~O]!^Xa![X!`![X~O]#rO~Oa#sO!`#RO~Op#SO!R#]a!W#]a~O!`#ROp!aa!R!aa!W!aaa!aa~O!W#xO~O!Q#|O!q#zO!r#zO#Z#yO~O!Q!{X!W!{X~P&^O!Q$SO!W#dO~Oj!zOQ!wXa!wXb!wXf!wXh!wXn!wXp!wX#Q!wX#R!wX#Z!wX~Op$VOa#XX~P#kOa$XO~Oa#[X~P!`Oa$ZO~Oj!zOv$[O~Oa$]O~O!`#ROp!|a!R!|a!W!|a~Oa$_O~P+_OP!yO!RgX~O!Q$bO!q#zO!r#zO#Z#yO~Oj!zOv$cO~Oj!zOp$eO!V$gO!Q!Ti!W!Ti~P#kO!Q!{a!W!{a~P&^O!Q$iO!W#dO~Op$VOa#Xa~OpfOa#[a~Oa$lO~P#kOj!zOQ!zXb!zXf!zXh!zXn!zXp!zX!Q!zX!V!zX!W!zX#Q!zX#R!zX#Z!zX~Op$eO!V$oO!Q!Tq!W!Tq~P#kOa!xap!xa~P#kOj!zOQ!zab!zaf!zah!zan!zap!za!Q!za!V!za!W!za#Q!za#R!za#Z!za~Oo#Zj!Pj~",
    goto: ",O#_PPPPP#`P#h#vP#h$U#hPP$[PPP$b$k$kP$}P$kP$k%e%wPPP&a&g#hP&mP#hP&sP#hP#h#hPPP&y']'iPP#`PP'o'o'y'oP'oP'o'oP#`P#`P#`P'|#`P(P(SPP#`P#`(V(e(s(y)T)Z)e)kPPPPPP)q)yP*e*hP+^+a+j]`Obn!s#d$QiWObfklmn!s!u#V#d$QiQObfklmn!s!u#V#d$QQdRR!ceQrTR!ghQ!gsQ!|!OR#`!hq!QXZz!t!w!z#b#c#i#r$O$V$^$e$f$jp!QXZz!t!w!z#b#c#i#r$O$V$^$e$f$jT#z#[#{q!OXZz!t!w!z#b#c#i#r$O$V$^$e$f$jp!QXZz!t!w!z#b#c#i#r$O$V$^$e$f$jQ![[R#Z!]QtTR!ihQ!gtR#`!iQvUR!jiQxVR!kjQoSQ!fgQ#W!XQ#^!`Q#_!aR$`#zQ!rnQ#g!sQ$P#dR$h$QX!pn!s#d$Qa!WY^_|!S!U#R#SR#P!SR!][R!_]R#]!_QbOU!bb!s$QQ!snR$Q#dQ#i!tU$U#i$^$jQ$^#rR$j$VQ$W#iR$k$WQgSS!eg$YR$Y#kQ$f$OR$n$fQ#e!rS$R#e$TR$T#gQ#T!TR#v#TQ#{#[R$a#{]aObn!s#d$Q[SObn!s#d$QQ!dfQ!lkQ!mlQ!nmQ#k!uR#w#VR#j!tQ|XQ!YZQ!xz[#h!t#i#r$V$^$jQ#m!wQ#o!zQ#}#bQ$O#cS$d$O$fR$m$eR#l!uQ!XYQ!a_R!{|U!TY_|Q!`^Q#Q!SQ#U!UQ#t#RR#u#S",
    nodeNames: "⚠ Unit VariableName Comment StyleSheet RuleSet UniversalSelector TagSelector TagName NestingSelector ClassSelector ClassName PseudoClassSelector : :: PseudoClassName PseudoClassName ) ( ArgList ValueName ParenthesizedValue ColorLiteral NumberLiteral StringLiteral BinaryExpression BinOp CallExpression Callee CallLiteral CallTag ParenthesizedContent , PseudoClassName ArgList IdSelector # IdName ] AttributeSelector [ AttributeName MatchOp ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp } { Block Declaration PropertyName Important ; ImportStatement AtKeyword import KeywordQuery FeatureQuery FeatureName BinaryQuery LogicOp UnaryQuery UnaryQueryOp ParenthesizedQuery SelectorQuery selector MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList from to SupportsStatement supports AtRule",
    maxTerm: 106,
    nodeProps: [
      ["openedBy", 17, "(", 48, "{"],
      ["closedBy", 18, ")", 49, "}"]
    ],
    propSources: [Nb],
    skippedNodes: [0, 3],
    repeatNodeCount: 8,
    tokenData: "Ay~R![OX$wX^%]^p$wpq%]qr(crs+}st,otu2Uuv$wvw2rwx2}xy3jyz3uz{3z{|4_|}8U}!O8a!O!P8x!P!Q9Z!Q![;e![!]<Y!]!^<x!^!_$w!_!`=T!`!a=`!a!b$w!b!c>O!c!}$w!}#O?[#O#P$w#P#Q?g#Q#R2U#R#T$w#T#U?r#U#c$w#c#d@q#d#o$w#o#pAQ#p#q2U#q#rA]#r#sAh#s#y$w#y#z%]#z$f$w$f$g%]$g#BY$w#BY#BZ%]#BZ$IS$w$IS$I_%]$I_$I|$w$I|$JO%]$JO$JT$w$JT$JU%]$JU$KV$w$KV$KW%]$KW&FU$w&FU&FV%]&FV~$wW$zQOy%Qz~%QW%VQoWOy%Qz~%Q~%bf#T~OX%QX^&v^p%Qpq&vqy%Qz#y%Q#y#z&v#z$f%Q$f$g&v$g#BY%Q#BY#BZ&v#BZ$IS%Q$IS$I_&v$I_$I|%Q$I|$JO&v$JO$JT%Q$JT$JU&v$JU$KV%Q$KV$KW&v$KW&FU%Q&FU&FV&v&FV~%Q~&}f#T~oWOX%QX^&v^p%Qpq&vqy%Qz#y%Q#y#z&v#z$f%Q$f$g&v$g#BY%Q#BY#BZ&v#BZ$IS%Q$IS$I_&v$I_$I|%Q$I|$JO&v$JO$JT%Q$JT$JU&v$JU$KV%Q$KV$KW&v$KW&FU%Q&FU&FV&v&FV~%Q^(fSOy%Qz#]%Q#]#^(r#^~%Q^(wSoWOy%Qz#a%Q#a#b)T#b~%Q^)YSoWOy%Qz#d%Q#d#e)f#e~%Q^)kSoWOy%Qz#c%Q#c#d)w#d~%Q^)|SoWOy%Qz#f%Q#f#g*Y#g~%Q^*_SoWOy%Qz#h%Q#h#i*k#i~%Q^*pSoWOy%Qz#T%Q#T#U*|#U~%Q^+RSoWOy%Qz#b%Q#b#c+_#c~%Q^+dSoWOy%Qz#h%Q#h#i+p#i~%Q^+wQ!VUoWOy%Qz~%Q~,QUOY+}Zr+}rs,ds#O+}#O#P,i#P~+}~,iOh~~,lPO~+}_,tWtPOy%Qz!Q%Q!Q![-^![!c%Q!c!i-^!i#T%Q#T#Z-^#Z~%Q^-cWoWOy%Qz!Q%Q!Q![-{![!c%Q!c!i-{!i#T%Q#T#Z-{#Z~%Q^.QWoWOy%Qz!Q%Q!Q![.j![!c%Q!c!i.j!i#T%Q#T#Z.j#Z~%Q^.qWfUoWOy%Qz!Q%Q!Q![/Z![!c%Q!c!i/Z!i#T%Q#T#Z/Z#Z~%Q^/bWfUoWOy%Qz!Q%Q!Q![/z![!c%Q!c!i/z!i#T%Q#T#Z/z#Z~%Q^0PWoWOy%Qz!Q%Q!Q![0i![!c%Q!c!i0i!i#T%Q#T#Z0i#Z~%Q^0pWfUoWOy%Qz!Q%Q!Q![1Y![!c%Q!c!i1Y!i#T%Q#T#Z1Y#Z~%Q^1_WoWOy%Qz!Q%Q!Q![1w![!c%Q!c!i1w!i#T%Q#T#Z1w#Z~%Q^2OQfUoWOy%Qz~%QY2XSOy%Qz!_%Q!_!`2e!`~%QY2lQzQoWOy%Qz~%QX2wQXPOy%Qz~%Q~3QUOY2}Zw2}wx,dx#O2}#O#P3d#P~2}~3gPO~2}_3oQbVOy%Qz~%Q~3zOa~_4RSUPjSOy%Qz!_%Q!_!`2e!`~%Q_4fUjS!PPOy%Qz!O%Q!O!P4x!P!Q%Q!Q![7_![~%Q^4}SoWOy%Qz!Q%Q!Q![5Z![~%Q^5bWoW#ZUOy%Qz!Q%Q!Q![5Z![!g%Q!g!h5z!h#X%Q#X#Y5z#Y~%Q^6PWoWOy%Qz{%Q{|6i|}%Q}!O6i!O!Q%Q!Q![6z![~%Q^6nSoWOy%Qz!Q%Q!Q![6z![~%Q^7RSoW#ZUOy%Qz!Q%Q!Q![6z![~%Q^7fYoW#ZUOy%Qz!O%Q!O!P5Z!P!Q%Q!Q![7_![!g%Q!g!h5z!h#X%Q#X#Y5z#Y~%Q_8ZQpVOy%Qz~%Q^8fUjSOy%Qz!O%Q!O!P4x!P!Q%Q!Q![7_![~%Q_8}S#WPOy%Qz!Q%Q!Q![5Z![~%Q~9`RjSOy%Qz{9i{~%Q~9nSoWOy9iyz9zz{:o{~9i~9}ROz9zz{:W{~9z~:ZTOz9zz{:W{!P9z!P!Q:j!Q~9z~:oOR~~:tUoWOy9iyz9zz{:o{!P9i!P!Q;W!Q~9i~;_QoWR~Oy%Qz~%Q^;jY#ZUOy%Qz!O%Q!O!P5Z!P!Q%Q!Q![7_![!g%Q!g!h5z!h#X%Q#X#Y5z#Y~%QX<_S]POy%Qz![%Q![!]<k!]~%QX<rQ^PoWOy%Qz~%Q_<}Q!WVOy%Qz~%QY=YQzQOy%Qz~%QX=eS|POy%Qz!`%Q!`!a=q!a~%QX=xQ|PoWOy%Qz~%QX>RUOy%Qz!c%Q!c!}>e!}#T%Q#T#o>e#o~%QX>lY!YPoWOy%Qz}%Q}!O>e!O!Q%Q!Q![>e![!c%Q!c!}>e!}#T%Q#T#o>e#o~%QX?aQxPOy%Qz~%Q^?lQvUOy%Qz~%QX?uSOy%Qz#b%Q#b#c@R#c~%QX@WSoWOy%Qz#W%Q#W#X@d#X~%QX@kQ!`PoWOy%Qz~%QX@tSOy%Qz#f%Q#f#g@d#g~%QXAVQ!RPOy%Qz~%Q_AbQ!QVOy%Qz~%QZAmS!PPOy%Qz!_%Q!_!`2e!`~%Q",
    tokenizers: [jb, zb, Zb, 0, 1, 2, 3],
    topRules: { StyleSheet: [0, 4] },
    specialized: [{ term: 94, get: (r) => Ib[r] || -1 }, { term: 56, get: (r) => Gb[r] || -1 }, { term: 95, get: (r) => Vb[r] || -1 }],
    tokenPrec: 1078
  });
  let lh = null;
  function hh() {
    if (!lh && typeof document == "object" && document.body) {
      let r = [];
      for (let t in document.body.style)
        /[A-Z]|^-|^(item|length)$/.test(t) || r.push(t);
      lh = r.sort().map((t) => ({ type: "property", label: t }));
    }
    return lh || [];
  }
  const vO = /* @__PURE__ */ [
    "active",
    "after",
    "before",
    "checked",
    "default",
    "disabled",
    "empty",
    "enabled",
    "first-child",
    "first-letter",
    "first-line",
    "first-of-type",
    "focus",
    "hover",
    "in-range",
    "indeterminate",
    "invalid",
    "lang",
    "last-child",
    "last-of-type",
    "link",
    "not",
    "nth-child",
    "nth-last-child",
    "nth-last-of-type",
    "nth-of-type",
    "only-of-type",
    "only-child",
    "optional",
    "out-of-range",
    "placeholder",
    "read-only",
    "read-write",
    "required",
    "root",
    "selection",
    "target",
    "valid",
    "visited"
  ].map((r) => ({ type: "class", label: r })), QO = /* @__PURE__ */ [
    "above",
    "absolute",
    "activeborder",
    "additive",
    "activecaption",
    "after-white-space",
    "ahead",
    "alias",
    "all",
    "all-scroll",
    "alphabetic",
    "alternate",
    "always",
    "antialiased",
    "appworkspace",
    "asterisks",
    "attr",
    "auto",
    "auto-flow",
    "avoid",
    "avoid-column",
    "avoid-page",
    "avoid-region",
    "axis-pan",
    "background",
    "backwards",
    "baseline",
    "below",
    "bidi-override",
    "blink",
    "block",
    "block-axis",
    "bold",
    "bolder",
    "border",
    "border-box",
    "both",
    "bottom",
    "break",
    "break-all",
    "break-word",
    "bullets",
    "button",
    "button-bevel",
    "buttonface",
    "buttonhighlight",
    "buttonshadow",
    "buttontext",
    "calc",
    "capitalize",
    "caps-lock-indicator",
    "caption",
    "captiontext",
    "caret",
    "cell",
    "center",
    "checkbox",
    "circle",
    "cjk-decimal",
    "clear",
    "clip",
    "close-quote",
    "col-resize",
    "collapse",
    "color",
    "color-burn",
    "color-dodge",
    "column",
    "column-reverse",
    "compact",
    "condensed",
    "contain",
    "content",
    "contents",
    "content-box",
    "context-menu",
    "continuous",
    "copy",
    "counter",
    "counters",
    "cover",
    "crop",
    "cross",
    "crosshair",
    "currentcolor",
    "cursive",
    "cyclic",
    "darken",
    "dashed",
    "decimal",
    "decimal-leading-zero",
    "default",
    "default-button",
    "dense",
    "destination-atop",
    "destination-in",
    "destination-out",
    "destination-over",
    "difference",
    "disc",
    "discard",
    "disclosure-closed",
    "disclosure-open",
    "document",
    "dot-dash",
    "dot-dot-dash",
    "dotted",
    "double",
    "down",
    "e-resize",
    "ease",
    "ease-in",
    "ease-in-out",
    "ease-out",
    "element",
    "ellipse",
    "ellipsis",
    "embed",
    "end",
    "ethiopic-abegede-gez",
    "ethiopic-halehame-aa-er",
    "ethiopic-halehame-gez",
    "ew-resize",
    "exclusion",
    "expanded",
    "extends",
    "extra-condensed",
    "extra-expanded",
    "fantasy",
    "fast",
    "fill",
    "fill-box",
    "fixed",
    "flat",
    "flex",
    "flex-end",
    "flex-start",
    "footnotes",
    "forwards",
    "from",
    "geometricPrecision",
    "graytext",
    "grid",
    "groove",
    "hand",
    "hard-light",
    "help",
    "hidden",
    "hide",
    "higher",
    "highlight",
    "highlighttext",
    "horizontal",
    "hsl",
    "hsla",
    "hue",
    "icon",
    "ignore",
    "inactiveborder",
    "inactivecaption",
    "inactivecaptiontext",
    "infinite",
    "infobackground",
    "infotext",
    "inherit",
    "initial",
    "inline",
    "inline-axis",
    "inline-block",
    "inline-flex",
    "inline-grid",
    "inline-table",
    "inset",
    "inside",
    "intrinsic",
    "invert",
    "italic",
    "justify",
    "keep-all",
    "landscape",
    "large",
    "larger",
    "left",
    "level",
    "lighter",
    "lighten",
    "line-through",
    "linear",
    "linear-gradient",
    "lines",
    "list-item",
    "listbox",
    "listitem",
    "local",
    "logical",
    "loud",
    "lower",
    "lower-hexadecimal",
    "lower-latin",
    "lower-norwegian",
    "lowercase",
    "ltr",
    "luminosity",
    "manipulation",
    "match",
    "matrix",
    "matrix3d",
    "medium",
    "menu",
    "menutext",
    "message-box",
    "middle",
    "min-intrinsic",
    "mix",
    "monospace",
    "move",
    "multiple",
    "multiple_mask_images",
    "multiply",
    "n-resize",
    "narrower",
    "ne-resize",
    "nesw-resize",
    "no-close-quote",
    "no-drop",
    "no-open-quote",
    "no-repeat",
    "none",
    "normal",
    "not-allowed",
    "nowrap",
    "ns-resize",
    "numbers",
    "numeric",
    "nw-resize",
    "nwse-resize",
    "oblique",
    "opacity",
    "open-quote",
    "optimizeLegibility",
    "optimizeSpeed",
    "outset",
    "outside",
    "outside-shape",
    "overlay",
    "overline",
    "padding",
    "padding-box",
    "painted",
    "page",
    "paused",
    "perspective",
    "pinch-zoom",
    "plus-darker",
    "plus-lighter",
    "pointer",
    "polygon",
    "portrait",
    "pre",
    "pre-line",
    "pre-wrap",
    "preserve-3d",
    "progress",
    "push-button",
    "radial-gradient",
    "radio",
    "read-only",
    "read-write",
    "read-write-plaintext-only",
    "rectangle",
    "region",
    "relative",
    "repeat",
    "repeating-linear-gradient",
    "repeating-radial-gradient",
    "repeat-x",
    "repeat-y",
    "reset",
    "reverse",
    "rgb",
    "rgba",
    "ridge",
    "right",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "round",
    "row",
    "row-resize",
    "row-reverse",
    "rtl",
    "run-in",
    "running",
    "s-resize",
    "sans-serif",
    "saturation",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "screen",
    "scroll",
    "scrollbar",
    "scroll-position",
    "se-resize",
    "self-start",
    "self-end",
    "semi-condensed",
    "semi-expanded",
    "separate",
    "serif",
    "show",
    "single",
    "skew",
    "skewX",
    "skewY",
    "skip-white-space",
    "slide",
    "slider-horizontal",
    "slider-vertical",
    "sliderthumb-horizontal",
    "sliderthumb-vertical",
    "slow",
    "small",
    "small-caps",
    "small-caption",
    "smaller",
    "soft-light",
    "solid",
    "source-atop",
    "source-in",
    "source-out",
    "source-over",
    "space",
    "space-around",
    "space-between",
    "space-evenly",
    "spell-out",
    "square",
    "start",
    "static",
    "status-bar",
    "stretch",
    "stroke",
    "stroke-box",
    "sub",
    "subpixel-antialiased",
    "svg_masks",
    "super",
    "sw-resize",
    "symbolic",
    "symbols",
    "system-ui",
    "table",
    "table-caption",
    "table-cell",
    "table-column",
    "table-column-group",
    "table-footer-group",
    "table-header-group",
    "table-row",
    "table-row-group",
    "text",
    "text-bottom",
    "text-top",
    "textarea",
    "textfield",
    "thick",
    "thin",
    "threeddarkshadow",
    "threedface",
    "threedhighlight",
    "threedlightshadow",
    "threedshadow",
    "to",
    "top",
    "transform",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ",
    "transparent",
    "ultra-condensed",
    "ultra-expanded",
    "underline",
    "unidirectional-pan",
    "unset",
    "up",
    "upper-latin",
    "uppercase",
    "url",
    "var",
    "vertical",
    "vertical-text",
    "view-box",
    "visible",
    "visibleFill",
    "visiblePainted",
    "visibleStroke",
    "visual",
    "w-resize",
    "wait",
    "wave",
    "wider",
    "window",
    "windowframe",
    "windowtext",
    "words",
    "wrap",
    "wrap-reverse",
    "x-large",
    "x-small",
    "xor",
    "xx-large",
    "xx-small"
  ].map((r) => ({ type: "keyword", label: r })).concat(/* @__PURE__ */ [
    "aliceblue",
    "antiquewhite",
    "aqua",
    "aquamarine",
    "azure",
    "beige",
    "bisque",
    "black",
    "blanchedalmond",
    "blue",
    "blueviolet",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "chocolate",
    "coral",
    "cornflowerblue",
    "cornsilk",
    "crimson",
    "cyan",
    "darkblue",
    "darkcyan",
    "darkgoldenrod",
    "darkgray",
    "darkgreen",
    "darkkhaki",
    "darkmagenta",
    "darkolivegreen",
    "darkorange",
    "darkorchid",
    "darkred",
    "darksalmon",
    "darkseagreen",
    "darkslateblue",
    "darkslategray",
    "darkturquoise",
    "darkviolet",
    "deeppink",
    "deepskyblue",
    "dimgray",
    "dodgerblue",
    "firebrick",
    "floralwhite",
    "forestgreen",
    "fuchsia",
    "gainsboro",
    "ghostwhite",
    "gold",
    "goldenrod",
    "gray",
    "grey",
    "green",
    "greenyellow",
    "honeydew",
    "hotpink",
    "indianred",
    "indigo",
    "ivory",
    "khaki",
    "lavender",
    "lavenderblush",
    "lawngreen",
    "lemonchiffon",
    "lightblue",
    "lightcoral",
    "lightcyan",
    "lightgoldenrodyellow",
    "lightgray",
    "lightgreen",
    "lightpink",
    "lightsalmon",
    "lightseagreen",
    "lightskyblue",
    "lightslategray",
    "lightsteelblue",
    "lightyellow",
    "lime",
    "limegreen",
    "linen",
    "magenta",
    "maroon",
    "mediumaquamarine",
    "mediumblue",
    "mediumorchid",
    "mediumpurple",
    "mediumseagreen",
    "mediumslateblue",
    "mediumspringgreen",
    "mediumturquoise",
    "mediumvioletred",
    "midnightblue",
    "mintcream",
    "mistyrose",
    "moccasin",
    "navajowhite",
    "navy",
    "oldlace",
    "olive",
    "olivedrab",
    "orange",
    "orangered",
    "orchid",
    "palegoldenrod",
    "palegreen",
    "paleturquoise",
    "palevioletred",
    "papayawhip",
    "peachpuff",
    "peru",
    "pink",
    "plum",
    "powderblue",
    "purple",
    "rebeccapurple",
    "red",
    "rosybrown",
    "royalblue",
    "saddlebrown",
    "salmon",
    "sandybrown",
    "seagreen",
    "seashell",
    "sienna",
    "silver",
    "skyblue",
    "slateblue",
    "slategray",
    "snow",
    "springgreen",
    "steelblue",
    "tan",
    "teal",
    "thistle",
    "tomato",
    "turquoise",
    "violet",
    "wheat",
    "white",
    "whitesmoke",
    "yellow",
    "yellowgreen"
  ].map((r) => ({ type: "constant", label: r }))), Ub = /* @__PURE__ */ [
    "a",
    "abbr",
    "address",
    "article",
    "aside",
    "b",
    "bdi",
    "bdo",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "dt",
    "em",
    "figcaption",
    "figure",
    "footer",
    "form",
    "header",
    "hgroup",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "main",
    "meter",
    "nav",
    "ol",
    "output",
    "p",
    "pre",
    "ruby",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strong",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "tr",
    "u",
    "ul"
  ].map((r) => ({ type: "type", label: r })), Ar = /^[\w-]*/, Bb = (r) => {
    let { state: t, pos: e } = r, i = Lt(t).resolveInner(e, -1);
    if (i.name == "PropertyName")
      return { from: i.from, options: hh(), validFor: Ar };
    if (i.name == "ValueName")
      return { from: i.from, options: QO, validFor: Ar };
    if (i.name == "PseudoClassName")
      return { from: i.from, options: vO, validFor: Ar };
    if (i.name == "TagName") {
      for (let { parent: o } = i; o; o = o.parent)
        if (o.name == "Block")
          return { from: i.from, options: hh(), validFor: Ar };
      return { from: i.from, options: Ub, validFor: Ar };
    }
    if (!r.explicit)
      return null;
    let n = i.resolve(e), s = n.childBefore(e);
    return s && s.name == ":" && n.name == "PseudoClassSelector" ? { from: e, options: vO, validFor: Ar } : s && s.name == ":" && n.name == "Declaration" || n.name == "ArgList" ? { from: e, options: QO, validFor: Ar } : n.name == "Block" ? { from: e, options: hh(), validFor: Ar } : null;
  }, ch = /* @__PURE__ */ tn.define({
    parser: /* @__PURE__ */ Lb.configure({
      props: [
        /* @__PURE__ */ fs.add({
          Declaration: /* @__PURE__ */ xn()
        }),
        /* @__PURE__ */ ds.add({
          Block: kl
        })
      ]
    }),
    languageData: {
      commentTokens: { block: { open: "/*", close: "*/" } },
      indentOnInput: /^\s*\}$/,
      wordChars: "-"
    }
  });
  function yO() {
    return new xo(ch, ch.data.of({ autocomplete: Bb }));
  }
  const xs = ["_blank", "_self", "_top", "_parent"], uh = ["ascii", "utf-8", "utf-16", "latin1", "latin1"], fh = ["get", "post", "put", "delete"], dh = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"], Le = ["true", "false"], z = {}, Yb = {
    a: {
      attrs: {
        href: null,
        ping: null,
        type: null,
        media: null,
        target: xs,
        hreflang: null
      }
    },
    abbr: z,
    acronym: z,
    address: z,
    applet: z,
    area: {
      attrs: {
        alt: null,
        coords: null,
        href: null,
        target: null,
        ping: null,
        media: null,
        hreflang: null,
        type: null,
        shape: ["default", "rect", "circle", "poly"]
      }
    },
    article: z,
    aside: z,
    audio: {
      attrs: {
        src: null,
        mediagroup: null,
        crossorigin: ["anonymous", "use-credentials"],
        preload: ["none", "metadata", "auto"],
        autoplay: ["autoplay"],
        loop: ["loop"],
        controls: ["controls"]
      }
    },
    b: z,
    base: { attrs: { href: null, target: xs } },
    basefont: z,
    bdi: z,
    bdo: z,
    big: z,
    blockquote: { attrs: { cite: null } },
    body: z,
    br: z,
    button: {
      attrs: {
        form: null,
        formaction: null,
        name: null,
        value: null,
        autofocus: ["autofocus"],
        disabled: ["autofocus"],
        formenctype: dh,
        formmethod: fh,
        formnovalidate: ["novalidate"],
        formtarget: xs,
        type: ["submit", "reset", "button"]
      }
    },
    canvas: { attrs: { width: null, height: null } },
    caption: z,
    center: z,
    cite: z,
    code: z,
    col: { attrs: { span: null } },
    colgroup: { attrs: { span: null } },
    command: {
      attrs: {
        type: ["command", "checkbox", "radio"],
        label: null,
        icon: null,
        radiogroup: null,
        command: null,
        title: null,
        disabled: ["disabled"],
        checked: ["checked"]
      }
    },
    data: { attrs: { value: null } },
    datagrid: { attrs: { disabled: ["disabled"], multiple: ["multiple"] } },
    datalist: { attrs: { data: null } },
    dd: z,
    del: { attrs: { cite: null, datetime: null } },
    details: { attrs: { open: ["open"] } },
    dfn: z,
    dir: z,
    div: z,
    dl: z,
    dt: z,
    em: z,
    embed: { attrs: { src: null, type: null, width: null, height: null } },
    eventsource: { attrs: { src: null } },
    fieldset: { attrs: { disabled: ["disabled"], form: null, name: null } },
    figcaption: z,
    figure: z,
    font: z,
    footer: z,
    form: {
      attrs: {
        action: null,
        name: null,
        "accept-charset": uh,
        autocomplete: ["on", "off"],
        enctype: dh,
        method: fh,
        novalidate: ["novalidate"],
        target: xs
      }
    },
    frame: z,
    frameset: z,
    h1: z,
    h2: z,
    h3: z,
    h4: z,
    h5: z,
    h6: z,
    head: {
      children: ["title", "base", "link", "style", "meta", "script", "noscript", "command"]
    },
    header: z,
    hgroup: z,
    hr: z,
    html: {
      attrs: { manifest: null }
    },
    i: z,
    iframe: {
      attrs: {
        src: null,
        srcdoc: null,
        name: null,
        width: null,
        height: null,
        sandbox: ["allow-top-navigation", "allow-same-origin", "allow-forms", "allow-scripts"],
        seamless: ["seamless"]
      }
    },
    img: {
      attrs: {
        alt: null,
        src: null,
        ismap: null,
        usemap: null,
        width: null,
        height: null,
        crossorigin: ["anonymous", "use-credentials"]
      }
    },
    input: {
      attrs: {
        alt: null,
        dirname: null,
        form: null,
        formaction: null,
        height: null,
        list: null,
        max: null,
        maxlength: null,
        min: null,
        name: null,
        pattern: null,
        placeholder: null,
        size: null,
        src: null,
        step: null,
        value: null,
        width: null,
        accept: ["audio/*", "video/*", "image/*"],
        autocomplete: ["on", "off"],
        autofocus: ["autofocus"],
        checked: ["checked"],
        disabled: ["disabled"],
        formenctype: dh,
        formmethod: fh,
        formnovalidate: ["novalidate"],
        formtarget: xs,
        multiple: ["multiple"],
        readonly: ["readonly"],
        required: ["required"],
        type: [
          "hidden",
          "text",
          "search",
          "tel",
          "url",
          "email",
          "password",
          "datetime",
          "date",
          "month",
          "week",
          "time",
          "datetime-local",
          "number",
          "range",
          "color",
          "checkbox",
          "radio",
          "file",
          "submit",
          "image",
          "reset",
          "button"
        ]
      }
    },
    ins: { attrs: { cite: null, datetime: null } },
    kbd: z,
    keygen: {
      attrs: {
        challenge: null,
        form: null,
        name: null,
        autofocus: ["autofocus"],
        disabled: ["disabled"],
        keytype: ["RSA"]
      }
    },
    label: { attrs: { for: null, form: null } },
    legend: z,
    li: { attrs: { value: null } },
    link: {
      attrs: {
        href: null,
        type: null,
        hreflang: null,
        media: null,
        sizes: ["all", "16x16", "16x16 32x32", "16x16 32x32 64x64"]
      }
    },
    map: { attrs: { name: null } },
    mark: z,
    menu: { attrs: { label: null, type: ["list", "context", "toolbar"] } },
    meta: {
      attrs: {
        content: null,
        charset: uh,
        name: ["viewport", "application-name", "author", "description", "generator", "keywords"],
        "http-equiv": ["content-language", "content-type", "default-style", "refresh"]
      }
    },
    meter: { attrs: { value: null, min: null, low: null, high: null, max: null, optimum: null } },
    nav: z,
    noframes: z,
    noscript: z,
    object: {
      attrs: {
        data: null,
        type: null,
        name: null,
        usemap: null,
        form: null,
        width: null,
        height: null,
        typemustmatch: ["typemustmatch"]
      }
    },
    ol: {
      attrs: { reversed: ["reversed"], start: null, type: ["1", "a", "A", "i", "I"] },
      children: ["li", "script", "template", "ul", "ol"]
    },
    optgroup: { attrs: { disabled: ["disabled"], label: null } },
    option: { attrs: { disabled: ["disabled"], label: null, selected: ["selected"], value: null } },
    output: { attrs: { for: null, form: null, name: null } },
    p: z,
    param: { attrs: { name: null, value: null } },
    pre: z,
    progress: { attrs: { value: null, max: null } },
    q: { attrs: { cite: null } },
    rp: z,
    rt: z,
    ruby: z,
    s: z,
    samp: z,
    script: {
      attrs: {
        type: ["text/javascript"],
        src: null,
        async: ["async"],
        defer: ["defer"],
        charset: uh
      }
    },
    section: z,
    select: {
      attrs: {
        form: null,
        name: null,
        size: null,
        autofocus: ["autofocus"],
        disabled: ["disabled"],
        multiple: ["multiple"]
      }
    },
    slot: { attrs: { name: null } },
    small: z,
    source: { attrs: { src: null, type: null, media: null } },
    span: z,
    strike: z,
    strong: z,
    style: {
      attrs: {
        type: ["text/css"],
        media: null,
        scoped: null
      }
    },
    sub: z,
    summary: z,
    sup: z,
    table: z,
    tbody: z,
    td: { attrs: { colspan: null, rowspan: null, headers: null } },
    template: z,
    textarea: {
      attrs: {
        dirname: null,
        form: null,
        maxlength: null,
        name: null,
        placeholder: null,
        rows: null,
        cols: null,
        autofocus: ["autofocus"],
        disabled: ["disabled"],
        readonly: ["readonly"],
        required: ["required"],
        wrap: ["soft", "hard"]
      }
    },
    tfoot: z,
    th: { attrs: { colspan: null, rowspan: null, headers: null, scope: ["row", "col", "rowgroup", "colgroup"] } },
    thead: z,
    time: { attrs: { datetime: null } },
    title: z,
    tr: z,
    track: {
      attrs: {
        src: null,
        label: null,
        default: null,
        kind: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
        srclang: null
      }
    },
    tt: z,
    u: z,
    ul: { children: ["li", "script", "template", "ul", "ol"] },
    var: z,
    video: {
      attrs: {
        src: null,
        poster: null,
        width: null,
        height: null,
        crossorigin: ["anonymous", "use-credentials"],
        preload: ["auto", "metadata", "none"],
        autoplay: ["autoplay"],
        mediagroup: ["movie"],
        muted: ["muted"],
        controls: ["controls"]
      }
    },
    wbr: z
  }, Fb = {
    accesskey: null,
    class: null,
    contenteditable: Le,
    contextmenu: null,
    dir: ["ltr", "rtl", "auto"],
    draggable: ["true", "false", "auto"],
    dropzone: ["copy", "move", "link", "string:", "file:"],
    hidden: ["hidden"],
    id: null,
    inert: ["inert"],
    itemid: null,
    itemprop: null,
    itemref: null,
    itemscope: ["itemscope"],
    itemtype: null,
    lang: ["ar", "bn", "de", "en-GB", "en-US", "es", "fr", "hi", "id", "ja", "pa", "pt", "ru", "tr", "zh"],
    spellcheck: Le,
    autocorrect: Le,
    autocapitalize: Le,
    style: null,
    tabindex: null,
    title: null,
    translate: ["yes", "no"],
    onclick: null,
    rel: ["stylesheet", "alternate", "author", "bookmark", "help", "license", "next", "nofollow", "noreferrer", "prefetch", "prev", "search", "tag"],
    role: /* @__PURE__ */ "alert application article banner button cell checkbox complementary contentinfo dialog document feed figure form grid gridcell heading img list listbox listitem main navigation region row rowgroup search switch tab table tabpanel textbox timer".split(" "),
    "aria-activedescendant": null,
    "aria-atomic": Le,
    "aria-autocomplete": ["inline", "list", "both", "none"],
    "aria-busy": Le,
    "aria-checked": ["true", "false", "mixed", "undefined"],
    "aria-controls": null,
    "aria-describedby": null,
    "aria-disabled": Le,
    "aria-dropeffect": null,
    "aria-expanded": ["true", "false", "undefined"],
    "aria-flowto": null,
    "aria-grabbed": ["true", "false", "undefined"],
    "aria-haspopup": Le,
    "aria-hidden": Le,
    "aria-invalid": ["true", "false", "grammar", "spelling"],
    "aria-label": null,
    "aria-labelledby": null,
    "aria-level": null,
    "aria-live": ["off", "polite", "assertive"],
    "aria-multiline": Le,
    "aria-multiselectable": Le,
    "aria-owns": null,
    "aria-posinset": null,
    "aria-pressed": ["true", "false", "mixed", "undefined"],
    "aria-readonly": Le,
    "aria-relevant": null,
    "aria-required": Le,
    "aria-selected": ["true", "false", "undefined"],
    "aria-setsize": null,
    "aria-sort": ["ascending", "descending", "none", "other"],
    "aria-valuemax": null,
    "aria-valuemin": null,
    "aria-valuenow": null,
    "aria-valuetext": null
  };
  class ra {
    constructor(t, e) {
      this.tags = Object.assign(Object.assign({}, Yb), t), this.globalAttrs = Object.assign(Object.assign({}, Fb), e), this.allTags = Object.keys(this.tags), this.globalAttrNames = Object.keys(this.globalAttrs);
    }
  }
  ra.default = /* @__PURE__ */ new ra();
  function Cn(r, t, e = r.length) {
    if (!t)
      return "";
    let i = t.firstChild, n = i && i.getChild("TagName");
    return n ? r.sliceString(n.from, Math.min(n.to, e)) : "";
  }
  function na(r, t = !1) {
    for (let e = r.parent; e; e = e.parent)
      if (e.name == "Element")
        if (t)
          t = !1;
        else
          return e;
    return null;
  }
  function bO(r, t, e) {
    let i = e.tags[Cn(r, na(t, !0))];
    return (i == null ? void 0 : i.children) || e.allTags;
  }
  function Oh(r, t) {
    let e = [];
    for (let i = t; i = na(i); ) {
      let n = Cn(r, i);
      if (n && i.lastChild.name == "CloseTag")
        break;
      n && e.indexOf(n) < 0 && (t.name == "EndTag" || t.from >= i.firstChild.to) && e.push(n);
    }
    return e;
  }
  const wO = /^[:\-\.\w\u00b7-\uffff]*$/;
  function xO(r, t, e, i, n) {
    let s = /\s*>/.test(r.sliceDoc(n, n + 5)) ? "" : ">";
    return {
      from: i,
      to: n,
      options: bO(r.doc, e, t).map((o) => ({ label: o, type: "type" })).concat(Oh(r.doc, e).map((o, a) => ({
        label: "/" + o,
        apply: "/" + o + s,
        type: "type",
        boost: 99 - a
      }))),
      validFor: /^\/?[:\-\.\w\u00b7-\uffff]*$/
    };
  }
  function SO(r, t, e, i) {
    let n = /\s*>/.test(r.sliceDoc(i, i + 5)) ? "" : ">";
    return {
      from: e,
      to: i,
      options: Oh(r.doc, t).map((s, o) => ({ label: s, apply: s + n, type: "type", boost: 99 - o })),
      validFor: wO
    };
  }
  function Hb(r, t, e, i) {
    let n = [], s = 0;
    for (let o of bO(r.doc, e, t))
      n.push({ label: "<" + o, type: "type" });
    for (let o of Oh(r.doc, e))
      n.push({ label: "</" + o + ">", type: "type", boost: 99 - s++ });
    return { from: i, to: i, options: n, validFor: /^<\/?[:\-\.\w\u00b7-\uffff]*$/ };
  }
  function Jb(r, t, e, i, n) {
    let s = na(e), o = s ? t.tags[Cn(r.doc, s)] : null, a = o && o.attrs ? Object.keys(o.attrs).concat(t.globalAttrNames) : t.globalAttrNames;
    return {
      from: i,
      to: n,
      options: a.map((l) => ({ label: l, type: "property" })),
      validFor: wO
    };
  }
  function Kb(r, t, e, i, n) {
    var s;
    let o = (s = e.parent) === null || s === void 0 ? void 0 : s.getChild("AttributeName"), a = [], l;
    if (o) {
      let u = r.sliceDoc(o.from, o.to), d = t.globalAttrs[u];
      if (!d) {
        let O = na(e), m = O ? t.tags[Cn(r.doc, O)] : null;
        d = (m == null ? void 0 : m.attrs) && m.attrs[u];
      }
      if (d) {
        let O = r.sliceDoc(i, n).toLowerCase(), m = '"', Q = '"';
        /^['"]/.test(O) ? (l = O[0] == '"' ? /^[^"]*$/ : /^[^']*$/, m = "", Q = r.sliceDoc(n, n + 1) == O[0] ? "" : O[0], O = O.slice(1), i++) : l = /^[^\s<>='"]*$/;
        for (let b of d)
          a.push({ label: b, apply: m + b + Q, type: "constant" });
      }
    }
    return { from: i, to: n, options: a, validFor: l };
  }
  function t1(r, t) {
    let { state: e, pos: i } = t, n = Lt(e).resolveInner(i), s = n.resolve(i, -1);
    for (let o = i, a; n == s && (a = s.childBefore(o)); ) {
      let l = a.lastChild;
      if (!l || !l.type.isError || l.from < l.to)
        break;
      n = s = a, o = l.from;
    }
    return s.name == "TagName" ? s.parent && /CloseTag$/.test(s.parent.name) ? SO(e, s, s.from, i) : xO(e, r, s, s.from, i) : s.name == "StartTag" ? xO(e, r, s, i, i) : s.name == "StartCloseTag" || s.name == "IncompleteCloseTag" ? SO(e, s, i, i) : t.explicit && (s.name == "OpenTag" || s.name == "SelfClosingTag") || s.name == "AttributeName" ? Jb(e, r, s, s.name == "AttributeName" ? s.from : i, i) : s.name == "Is" || s.name == "AttributeValue" || s.name == "UnquotedAttributeValue" ? Kb(e, r, s, s.name == "Is" ? i : s.from, i) : t.explicit && (n.name == "Element" || n.name == "Text" || n.name == "Document") ? Hb(e, r, s, i) : null;
  }
  function e1(r) {
    let { extraTags: t, extraGlobalAttributes: e } = r, i = e || t ? new ra(t, e) : ra.default;
    return (n) => t1(i, n);
  }
  const ph = /* @__PURE__ */ tn.define({
    parser: /* @__PURE__ */ $b.configure({
      props: [
        /* @__PURE__ */ fs.add({
          Element(r) {
            let t = /^(\s*)(<\/)?/.exec(r.textAfter);
            return r.node.to <= r.pos + t[0].length ? r.continue() : r.lineIndent(r.node.from) + (t[2] ? 0 : r.unit);
          },
          "OpenTag CloseTag SelfClosingTag"(r) {
            return r.column(r.node.from) + r.unit;
          },
          Document(r) {
            if (r.pos + /\s*/.exec(r.textAfter)[0].length < r.node.to)
              return r.continue();
            let t = null, e;
            for (let i = r.node; ; ) {
              let n = i.lastChild;
              if (!n || n.name != "Element" || n.to != i.to)
                break;
              t = i = n;
            }
            return t && !((e = t.lastChild) && (e.name == "CloseTag" || e.name == "SelfClosingTag")) ? r.lineIndent(t.from) + r.unit : null;
          }
        }),
        /* @__PURE__ */ ds.add({
          Element(r) {
            let t = r.firstChild, e = r.lastChild;
            return !t || t.name != "OpenTag" ? null : { from: t.to, to: e.name == "CloseTag" ? e.from : r.to };
          }
        })
      ],
      wrap: /* @__PURE__ */ Pb([
        {
          tag: "script",
          attrs(r) {
            return !r.type || /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(r.type);
          },
          parser: _r.parser
        },
        {
          tag: "style",
          attrs(r) {
            return (!r.lang || r.lang == "css") && (!r.type || /^(text\/)?(x-)?(stylesheet|css)$/i.test(r.type));
          },
          parser: ch.parser
        }
      ])
    }),
    languageData: {
      commentTokens: { block: { open: "<!--", close: "-->" } },
      indentOnInput: /^\s*<\/\w+\W$/,
      wordChars: "-._"
    }
  });
  function i1(r = {}) {
    let t = ph;
    return r.matchClosingTags === !1 && (t = t.configure({ dialect: "noMatch" })), new xo(t, [
      ph.data.of({ autocomplete: e1(r) }),
      r.autoCloseTags !== !1 ? r1 : [],
      Jd().support,
      yO().support
    ]);
  }
  const r1 = /* @__PURE__ */ F.inputHandler.of((r, t, e, i) => {
    if (r.composing || r.state.readOnly || t != e || i != ">" && i != "/" || !ph.isActiveAt(r.state, t, -1))
      return !1;
    let { state: n } = r, s = n.changeByRange((o) => {
      var a, l, u;
      let { head: d } = o, O = Lt(n).resolveInner(d, -1), m;
      if ((O.name == "TagName" || O.name == "StartTag") && (O = O.parent), i == ">" && O.name == "OpenTag") {
        if (((l = (a = O.parent) === null || a === void 0 ? void 0 : a.lastChild) === null || l === void 0 ? void 0 : l.name) != "CloseTag" && (m = Cn(n.doc, O.parent, d)))
          return { range: _.cursor(d + 1), changes: { from: d, insert: `></${m}>` } };
      } else if (i == "/" && O.name == "OpenTag") {
        let Q = O.parent, b = Q == null ? void 0 : Q.parent;
        if (Q.from == d - 1 && ((u = b.lastChild) === null || u === void 0 ? void 0 : u.name) != "CloseTag" && (m = Cn(n.doc, b, d))) {
          let C = `/${m}>`;
          return { range: _.cursor(d + C.length), changes: { from: d, insert: C } };
        }
      }
      return { range: o };
    });
    return s.changes.empty ? !1 : (r.dispatch(s, { userEvent: "input.type", scrollIntoView: !0 }), !0);
  }), n1 = os({
    String: w.string,
    Number: w.number,
    "True False": w.bool,
    PropertyName: w.propertyName,
    Null: w.null,
    ",": w.separator,
    "[ ]": w.squareBracket,
    "{ }": w.brace
  }), s1 = nn.deserialize({
    version: 14,
    states: "$bOVQPOOOOQO'#Cb'#CbOnQPO'#CeOvQPO'#CjOOQO'#Cp'#CpQOQPOOOOQO'#Cg'#CgO}QPO'#CfO!SQPO'#CrOOQO,59P,59PO![QPO,59PO!aQPO'#CuOOQO,59U,59UO!iQPO,59UOVQPO,59QOqQPO'#CkO!nQPO,59^OOQO1G.k1G.kOVQPO'#ClO!vQPO,59aOOQO1G.p1G.pOOQO1G.l1G.lOOQO,59V,59VOOQO-E6i-E6iOOQO,59W,59WOOQO-E6j-E6j",
    stateData: "#O~OcOS~OQSORSOSSOTSOWQO]ROePO~OVXOeUO~O[[O~PVOg^O~Oh_OVfX~OVaO~OhbO[iX~O[dO~Oh_OVfa~OhbO[ia~O",
    goto: "!kjPPPPPPkPPkqwPPk{!RPPP!XP!ePP!hXSOR^bQWQRf_TVQ_Q`WRg`QcZRicQTOQZRQe^RhbRYQR]R",
    nodeNames: "⚠ JsonText True False Null Number String } { Object Property PropertyName ] [ Array",
    maxTerm: 25,
    nodeProps: [
      ["openedBy", 7, "{", 12, "["],
      ["closedBy", 8, "}", 13, "]"]
    ],
    propSources: [n1],
    skippedNodes: [0],
    repeatNodeCount: 2,
    tokenData: "(|~RaXY!WYZ!W]^!Wpq!Wrs!]|}$u}!O$z!Q!R%T!R![&c![!]&t!}#O&y#P#Q'O#Y#Z'T#b#c'r#h#i(Z#o#p(r#q#r(w~!]Oc~~!`Wpq!]qr!]rs!xs#O!]#O#P!}#P;'S!];'S;=`$o<%lO!]~!}Oe~~#QXrs!]!P!Q!]#O#P!]#U#V!]#Y#Z!]#b#c!]#f#g!]#h#i!]#i#j#m~#pR!Q![#y!c!i#y#T#Z#y~#|R!Q![$V!c!i$V#T#Z$V~$YR!Q![$c!c!i$c#T#Z$c~$fR!Q![!]!c!i!]#T#Z!]~$rP;=`<%l!]~$zOh~~$}Q!Q!R%T!R![&c~%YRT~!O!P%c!g!h%w#X#Y%w~%fP!Q![%i~%nRT~!Q![%i!g!h%w#X#Y%w~%zR{|&T}!O&T!Q![&Z~&WP!Q![&Z~&`PT~!Q![&Z~&hST~!O!P%c!Q![&c!g!h%w#X#Y%w~&yOg~~'OO]~~'TO[~~'WP#T#U'Z~'^P#`#a'a~'dP#g#h'g~'jP#X#Y'm~'rOR~~'uP#i#j'x~'{P#`#a(O~(RP#`#a(U~(ZOS~~(^P#f#g(a~(dP#i#j(g~(jP#X#Y(m~(rOQ~~(wOW~~(|OV~",
    tokenizers: [0],
    topRules: { JsonText: [0, 1] },
    tokenPrec: 0
  }), o1 = /* @__PURE__ */ tn.define({
    name: "json",
    parser: /* @__PURE__ */ s1.configure({
      props: [
        /* @__PURE__ */ fs.add({
          Object: /* @__PURE__ */ xn({ except: /^\s*\}/ }),
          Array: /* @__PURE__ */ xn({ except: /^\s*\]/ })
        }),
        /* @__PURE__ */ ds.add({
          "Object Array": kl
        })
      ]
    }),
    languageData: {
      closeBrackets: { brackets: ["[", "{", '"'] },
      indentOnInput: /^\s*[\}\]]$/
    }
  });
  function a1() {
    return new xo(o1);
  }
  function mh(r, t, e) {
    let i = null;
    return r === "javascript" && (i = Jd()), r === "html" && (i = i1()), r === "css" && (i = yO()), r === "json" && (i = a1()), ft.create({
      doc: t,
      extensions: [
        i,
        Uv(),
        wg(),
        ag(),
        kg(),
        eg(),
        GQ(),
        Vm(),
        ov(),
        cs.of("    "),
        bv(Sv, { fallback: !0 }),
        _v(),
        Gy(),
        Qv({ openText: "▾", closedText: "▸" }),
        e0(),
        F.lineWrapping,
        F.updateListener.of((n) => {
          n.docChanged && e(n.state.doc.toString());
        }),
        ao.of([
          ...DQ,
          ...iQ,
          EQ,
          ...ay,
          ...pv,
          ...Ad,
          ...By
        ])
      ]
    });
  }
  class l1 extends h {
    constructor() {
      super();
    }
    static get observedAttributes() {
      return ["lang", "value"];
    }
    attributeChangedCallback(t, e, i) {
      !this.editor || (t === "lang" && this.editor.setState(mh(i, this.value, (n) => {
        this.value = n, this.dispatchEvent(new Event("input"));
      })), t === "value" && this.editor.setState(mh(this.lang, i, (n) => {
        this.value = n, this.dispatchEvent(new Event("input"));
      })));
    }
    connectedCallback() {
      var t, e;
      this.lang = (t = this.getAttribute("lang")) != null ? t : "javascript", this.value = (e = this.getAttribute("value")) != null ? e : "", this.editor = null, this.shadowRoot.innerHTML = `
            <div id="code-mirror-editor"></div>
            <style>
            :host {
                display: block;
                height: 100%;
                overflow: auto;
            }

            #code-mirror-editor {
                height: 100%;
            }

            #code-mirror-editor .cm-editor.cm-focused {
                outline: 0 !important;
            }

            #code-mirror-editor .cm-gutters {
                user-select: none;
                background-color: inherit;
                border-right: 0;
            }

            #code-mirror-editor .cm-scroller {
                font-family: Menlo, Monaco, Consolas, 'Droid Sans Mono', 'Courier New', monospace, 'Droid Sans Fallback';
                font-size: 14px;
                overflow: auto;
            }

            #code-mirror-editor .cm-editor.cm-focused .cm-activeLine,
            #code-mirror-editor .cm-editor.cm-focused .cm-activeLineGutter {
                background-color: rgb(130, 130, 130, 0.1);
            }

            #code-mirror-editor .cm-editor:not(.cm-focused) .cm-activeLine,
            #code-mirror-editor .cm-editor:not(.cm-focused) .cm-activeLineGutter {
                background-color: transparent;
            }

            #code-mirror-editor .cm-foldGutter span {
                font-size: 1.1rem;
                line-height: 1.1rem;
                color: rgb(130, 130, 130, 0.5);
            }

            #code-mirror-editor .cm-foldGutter span:hover {
                color: #999999;
            }

            #code-mirror-editor .cm-editor {
                height: 100%;
            }
            </style>
        `, this.editor = new F({
        state: mh(this.lang, this.value, (i) => {
          this.value = i, this.dispatchEvent(new Event("input"));
        }),
        parent: this.shadowRoot.querySelector("#code-mirror-editor")
      }), this.hasAttribute("autofocus") && this.editor.focus();
    }
  }
  return customElements.define("code-mirror", l1), BO;
}
Ix();
var Gx = /* @__PURE__ */ qt('<li tabindex="0" class="svelte-1xp5n6q"> </li>'), Vx = /* @__PURE__ */ qt('<ul class="suggestions svelte-1xp5n6q"></ul>');
function Lx(h, c) {
  Zh(c, !1);
  let f = Dr(c, "suggestions", 24, () => []), p = Dr(c, "position", 24, () => ({ top: 0, left: 0 })), v = Dr(c, "show", 12, !1);
  const y = Rw();
  function $(T) {
    y("select", { suggestion: T });
  }
  function W(T) {
    if (T.key === "ArrowUp" || T.key === "ArrowDown") {
      T.preventDefault();
      const X = document.querySelectorAll(".suggestions li");
      let q = Array.from(X).findIndex((Z) => Z === document.activeElement);
      T.key === "ArrowUp" ? q = q > 0 ? q - 1 : X.length - 1 : q = q < X.length - 1 ? q + 1 : 0, X[q].focus();
    } else if (T.key === "Enter") {
      T.preventDefault();
      const X = document.activeElement;
      X && X.tagName === "LI" && $(X.textContent);
    } else T.key === "Escape" && (T.preventDefault(), v(!1), globalThis.cellFocus.focus());
  }
  Pp();
  var S = ua(), x = ci(S);
  {
    var P = (T) => {
      var X = Vx();
      Bi(X, 5, f, Ui, (q, Z) => {
        var N = Gx(), gt = I(N);
        te(() => Be(gt, g(Z))), bt("mousedown", N, Tp(function(wt) {
          $w.call(this, c, wt);
        })), bt("click", N, () => $(g(Z))), St(q, N);
      }), te(() => Dn(X, "style", `top: ${p().top ?? ""}px; left: ${p().left ?? ""}px;`)), bt("keydown", X, W), St(T, X);
    };
    Ye(x, (T) => {
      v() && T(P);
    });
  }
  St(h, S), jh();
}
var Ux = /* @__PURE__ */ qt('<div class="config svelte-uqg8y3">Configure Table</div>'), Bx = /* @__PURE__ */ qt('<th class="svelte-uqg8y3"> <span class="v-h svelte-uqg8y3"> </span></th>'), Yx = /* @__PURE__ */ qt('<div contenteditable="" spellcheck="false" class="svelte-uqg8y3"></div>'), Fx = /* @__PURE__ */ qt('<div class="svelte-uqg8y3"><!></div>'), Hx = /* @__PURE__ */ qt('<div class="svelte-uqg8y3"><!></div>'), Jx = /* @__PURE__ */ qt('<td class="svelte-uqg8y3"><!></td>'), Kx = /* @__PURE__ */ qt('<td class="table-actions svelte-uqg8y3"><button class="svelte-uqg8y3">↑</button> <button class="svelte-uqg8y3">↓</button> <button class="svelte-uqg8y3">x</button></td>'), tS = /* @__PURE__ */ qt('<tr class="svelte-uqg8y3"><!><!></tr>'), eS = /* @__PURE__ */ qt('<th class="svelte-uqg8y3"><!></th>'), iS = /* @__PURE__ */ qt('<th class="svelte-uqg8y3"></th>'), rS = /* @__PURE__ */ qt("<tfoot><tr></tr></tfoot>"), nS = /* @__PURE__ */ qt('<!> <div class="table-container svelte-uqg8y3"><table class="editable-table svelte-uqg8y3"><thead class="svelte-uqg8y3"><tr></tr></thead><tbody class="svelte-uqg8y3"></tbody><!></table></div>', 1), sS = /* @__PURE__ */ qt('<tr><td class="svelte-uqg8y3"><input type="text" class="svelte-uqg8y3"></td><td class="svelte-uqg8y3"><input type="text" class="svelte-uqg8y3"></td><td class="svelte-uqg8y3"><select><option>Yes</option><option>No</option></select></td><td class="svelte-uqg8y3"><select><option>Left</option><option>Center</option><option>Right</option></select></td><td class="svelte-uqg8y3"><select><option>Input</option><option>Computed</option></select></td><td class="svelte-uqg8y3"><select><option>No</option><option>Yes</option></select></td><td class="svelte-uqg8y3"><button type="button">Update</button></td><td class="svelte-uqg8y3"><button type="button">Cancel</button></td></tr>'), oS = /* @__PURE__ */ qt('<tr><td class="svelte-uqg8y3"> </td><td class="svelte-uqg8y3"> </td><td class="svelte-uqg8y3"> </td><td class="svelte-uqg8y3"> </td><td class="svelte-uqg8y3"> </td><td class="svelte-uqg8y3"> </td><td class="svelte-uqg8y3"><button type="button">Move Up</button></td><td class="svelte-uqg8y3"><button type="button">Move Down</button></td><td class="svelte-uqg8y3"><button type="button">Edit</button></td><td class="svelte-uqg8y3"><button type="button">Delete</button></td></tr>'), aS = /* @__PURE__ */ qt('<tr><td class="svelte-uqg8y3"><input type="text" required class="svelte-uqg8y3"></td><td class="svelte-uqg8y3"><input type="text" placeholder="Keep blank to be = name" class="svelte-uqg8y3"></td><td class="svelte-uqg8y3"><select><option>Yes</option><option>No</option></select></td><td class="svelte-uqg8y3"><select><option>Left</option><option>Center</option><option>Right</option></select></td><td class="svelte-uqg8y3"><select><option>Input</option><option>Computed</option></select></td><td class="svelte-uqg8y3"><select><option>No</option><option>Yes</option></select></td><td class="svelte-uqg8y3"><button>Add</button></td><td class="svelte-uqg8y3"><button class="ml-0_5em" type="button">Cancel</button></td></tr>'), lS = /* @__PURE__ */ qt('<button class="mt-1em svelte-uqg8y3">Add Column</button>'), hS = /* @__PURE__ */ qt("<div> </div> <div><code-mirror></code-mirror></div>", 3), cS = /* @__PURE__ */ qt('<div class="config-heading mt-1em svelte-uqg8y3">Computed Columns</div> <div class="config-area-font-size svelte-uqg8y3"></div> <div class="config-area-note svelte-uqg8y3">Available variables: <code class="svelte-uqg8y3">items</code>, <code class="svelte-uqg8y3">rowIndex</code> & <code class="svelte-uqg8y3">item</code></div>', 1), uS = /* @__PURE__ */ qt("<div> </div> <div><code-mirror></code-mirror></div>", 3), fS = /* @__PURE__ */ qt('<div> </div> <div><input type="text" class="svelte-uqg8y3"></div>', 1), dS = /* @__PURE__ */ qt("<div> </div> <div><code-mirror></code-mirror></div>", 3), OS = /* @__PURE__ */ qt(`<div class="config-holder svelte-uqg8y3"><div class="svelte-uqg8y3">Exit Configuration</div> <div style="margin-top: 0.5rem" class="svelte-uqg8y3">Copy Configuration</div> <div style="margin-top: 0.25rem" class="svelte-uqg8y3">Paste Configuration</div></div> <div class="config-heading svelte-uqg8y3">Columns</div> <form><table class="config-table svelte-uqg8y3"><thead><tr><th class="svelte-uqg8y3">Name</th><th class="svelte-uqg8y3">Label</th><th class="svelte-uqg8y3">Wrap</th><th class="svelte-uqg8y3">Align</th><th class="svelte-uqg8y3">Type</th><th class="svelte-uqg8y3">Autocomplete</th></tr></thead><tbody class="svelte-uqg8y3"><!><!></tbody></table></form> <!> <!> <div class="config-heading mt-1em svelte-uqg8y3">Totals</div> <div class="config-area-font-size svelte-uqg8y3"></div> <div class="config-area-note svelte-uqg8y3">Available variables: <code class="svelte-uqg8y3">items</code> & <code class="svelte-uqg8y3">columnName</code></div> <div class="config-heading mt-1em svelte-uqg8y3">Column Widths</div> <div class="config-area-font-size svelte-uqg8y3"></div> <div class="config-heading mt-1em svelte-uqg8y3">Column Styles</div> <div class="config-area-font-size svelte-uqg8y3"></div> <div class="config-area-note svelte-uqg8y3">Available variables: <code class="svelte-uqg8y3">items</code>, <code class="svelte-uqg8y3">rowIndex</code>, <code class="svelte-uqg8y3">item</code> & <code class="svelte-uqg8y3">columnName</code><br> You can add conditions and return a style like:<br> <code class="svelte-uqg8y3">return items[rowIndex][columnName] === 'foo' ? 'color: red' : ''</code></div> <div class="config-heading mt-1em svelte-uqg8y3">Row Style</div> <div class="config-area-font-size svelte-uqg8y3"><div><code-mirror></code-mirror></div></div> <div class="config-area-note svelte-uqg8y3">Available variables: <code class="svelte-uqg8y3">items</code>, <code class="svelte-uqg8y3">rowIndex</code> & <code class="svelte-uqg8y3">item</code><br> You can add conditions and return a style like:<br> <code class="svelte-uqg8y3">return items[rowIndex]['My Column Name'] === 'foo' ? 'color: red' : ''</code></div> <div class="config-heading mt-1em svelte-uqg8y3">Startup Script</div> <div class="config-area-font-size svelte-uqg8y3"><div><code-mirror></code-mirror></div></div> <div class="config-area-note svelte-uqg8y3">Available variables: <code class="svelte-uqg8y3">rows</code><br> <details><summary style="cursor: pointer; user-select: none;">Click here to see example code on how to modify the rows in the table on startup</summary> <code style="white-space: pre;" class="svelte-uqg8y3"><!></code></details></div> <div class="config-heading mt-1em svelte-uqg8y3">Custom Functions</div> <div class="config-area-font-size svelte-uqg8y3"><div><code-mirror></code-mirror></div></div> <div class="config-area-note svelte-uqg8y3">Define custom functions here that can be used in any evaluated JS code.</div> <div style="margin-bottom: 3rem"></div>`, 3), pS = /* @__PURE__ */ qt('<div class="main-container svelte-uqg8y3"><!></div> <!> <!>', 1);
function mS(h, c) {
  Zh(c, !1);
  const f = Kt();
  let p = Dr(c, "content", 8), v = Dr(c, "onUpdate", 8), y = Dr(c, "viewOnly", 8, !1), $ = Dr(c, "pageContentOverride", 8, void 0), W = Dr(c, "style", 8, ""), S = Kt([]), x = Kt([]), P = Kt({}), T = Kt({}), X = Kt(""), q = Kt(""), Z = Kt(""), N = Kt(!1), gt = Kt([]), wt = Kt([]), Rt = Kt([]), et = Kt({
    show: !1,
    suggestions: [],
    position: { top: 0, left: 0 },
    itemIndex: null,
    columnName: null
  });
  function vt(k) {
    return g(X) ? pr("Row Style", g(X), k) : "";
  }
  function lt() {
    E(gt, g(x).map((k, R) => vt(R)));
  }
  function st(k) {
    pt(gt, g(gt)[k] = vt(k)), E(gt, g(gt));
  }
  function Oi(k, R, D) {
    return g(S)[R].style ? pr("Column Style", g(S)[R].style, k, D) : "";
  }
  function nt() {
    E(wt, g(x).map((k, R) => g(S).map((D, H) => Oi(R, H, D.name))));
  }
  function Pt(k) {
    pt(wt, g(wt)[k] = g(S).map((R, D) => Oi(k, D, R.name))), E(wt, g(wt));
  }
  function xt(k, R) {
    const D = g(S)[R];
    return D.expression ? pr("Computed Column", D.expression, k, D.name) : "";
  }
  function At() {
    E(Rt, g(x).map((k, R) => g(S).map((D, H) => D.type === "Computed" ? xt(R, H) : null)));
  }
  function pe(k) {
    pt(Rt, g(Rt)[k] = g(S).map((R, D) => R.type === "Computed" ? xt(k, D) : null)), E(Rt, g(Rt));
  }
  let Pe = Kt(null);
  async function zr() {
    return { content: p() };
  }
  function Nr() {
    E(Yt, !1), E(le, !1), mr(), V = [], zr().then((k) => {
      let R = k.content ? JSON.parse(k.content) : {
        columns: [],
        items: [],
        totals: {},
        widths: {},
        rowStyle: "",
        startupScript: "",
        customFunctions: ""
      };
      if (E(S, R.columns), E(me, !0), E(P, R.totals), E(T, R.widths ? R.widths : {}), E(X, R.rowStyle ? R.rowStyle : ""), E(q, R.startupScript ? R.startupScript : ""), E(Z, R.customFunctions ? R.customFunctions : ""), g(S).length > 0 && g(q) && g(q).trim()) {
        const D = JSON.stringify(R.items);
        Ir(g(q), { rows: R.items }), D !== JSON.stringify(R.items) && E(me, !1);
      }
      E(x, R.items), lt(), nt(), At(), g(S).length === 0 && (E(Yt, !0), E(le, !0)), setTimeout(
        () => {
          if (g(Pe)) {
            let D = g(Pe).querySelectorAll("tbody > tr:last-child > td > div[contenteditable]:empty");
            D.length === 0 ? (D = g(Pe).querySelectorAll("tbody > tr:last-child > td > div[contenteditable]"), D = D[D.length - 1]) : D = D[0], D && (D.focus(), D.scrollIntoView()), document.execCommand("selectAll", !1, null), document.getSelection().collapseToEnd();
          }
        },
        0
      );
    });
  }
  const Ri = _w(
    function() {
      const k = JSON.stringify(
        {
          columns: g(S),
          items: g(x),
          totals: g(P),
          widths: g(T),
          rowStyle: g(X),
          startupScript: g(q),
          customFunctions: g(Z)
        },
        null,
        4
      );
      v()(k);
    },
    500
  );
  let me = Kt(!0);
  function _() {
    E(x, g(x));
  }
  function Ir(k, R) {
    try {
      const D = Object.keys(R).join(","), H = Object.values(R);
      return new Function(D, k).apply(this, H);
    } catch (D) {
      alert("error evaluating startup script"), console.log("startup script error", D);
    }
  }
  function pr(k, R, D = null, H = null) {
    console.log("evaluating", k);
    try {
      const tt = g(Z) ? g(Z) + `
` : "";
      return new Function("items", "rowIndex", "item", "columnName", tt + R).call(this, g(x), D, D !== null ? g(x)[D] : null, H);
    } catch (tt) {
      return console.error(`${k}:`, tt), "error evaluating given expression";
    }
  }
  let V = [];
  function dn(k) {
    var R = !1, D = !1, H, tt;
    if (window.getSelection) {
      var Ct = window.getSelection();
      Ct.rangeCount && (H = Ct.getRangeAt(0), tt = H.cloneRange(), tt.selectNodeContents(k), tt.setEnd(H.startContainer, H.startOffset), R = tt.toString() == "", tt.selectNodeContents(k), tt.setStart(H.endContainer, H.endOffset), D = tt.toString() == "");
    } else document.selection && document.selection.type != "Control" && (H = document.selection.createRange(), tt = H.duplicate(), tt.moveToElementText(k), tt.setEndPoint("EndToStart", H), R = tt.text == "", tt.moveToElementText(k), tt.setEndPoint("StartToEnd", H), D = tt.text == "");
    return { atStart: R, atEnd: D };
  }
  function tr(k, R) {
    let D = {};
    g(S).forEach((H) => {
      D[H.name] = "";
    }), R ? g(x).splice(k, 0, D) : g(x).splice(k + 1, 0, D), E(x, g(x)), lt(), nt(), At(), R || setTimeout(
      () => {
        let tt = document.querySelector(".editable-table tbody").querySelectorAll("tr")[k + 1];
        typeof tt < "u" && tt.querySelector("div[contenteditable]").focus();
      },
      0
    );
  }
  function Ln(k) {
    if (g(x).length === 1) {
      V.push({
        index: 0,
        item: JSON.parse(JSON.stringify(g(x)[0]))
      }), g(S).forEach((tt) => {
        pt(x, g(x)[0][tt.name] = "");
      }), lt(), nt(), At();
      return;
    }
    V.push({
      index: k,
      item: g(x)[k]
    }), g(x).splice(k, 1), E(x, g(x));
    let R = document.querySelector(".editable-table tbody");
    if (!R)
      return;
    let H = R.querySelectorAll("tr")[k - 1];
    typeof H < "u" && H.querySelector("div[contenteditable]").focus(), lt(), nt(), At();
  }
  function Un(k, R, D) {
    if (Nx(k), Vs(), k.ctrlKey && k.key === "Enter" && (k.shiftKey ? tr(R, !0) : tr(R, !1)), k.ctrlKey && k.key.toLowerCase() === "delete" && (k.preventDefault(), Ln(R)), g(et).show && k.key === "ArrowDown") {
      k.preventDefault();
      const H = document.querySelectorAll(".suggestions li");
      H.length > 0 && (globalThis.cellFocus = document.activeElement, H[0].focus());
      return;
    }
    if (k.key === "ArrowUp") {
      if (dn(k.target.closest("td")).atStart === !1 && k.ctrlKey === !1)
        return;
      k.preventDefault();
      let H = k.target.closest("tbody").querySelectorAll("tr"), tt = k.target.parentElement.cellIndex, Ct = H[k.target.parentElement.parentElement.rowIndex - 2];
      typeof Ct < "u" && Ct.querySelector("td:nth-of-type(" + (tt + 1) + ") > div").focus();
    }
    if (k.key === "ArrowDown") {
      if (dn(k.target.closest("td")).atEnd === !1 && k.ctrlKey === !1)
        return;
      k.preventDefault();
      let H = k.target.closest("tbody").querySelectorAll("tr"), tt = k.target.parentElement.cellIndex, Ct = H[k.target.parentElement.parentElement.rowIndex];
      typeof Ct < "u" && Ct.querySelector("td:nth-of-type(" + (tt + 1) + ") > div").focus();
    }
    if (k.ctrlKey && k.key === ";") {
      k.preventDefault();
      const H = k.target.closest("tbody").querySelectorAll("tr"), tt = k.target.parentElement.cellIndex, Ct = H[k.target.parentElement.parentElement.rowIndex - 2];
      if (typeof Ct < "u") {
        const xe = Ct.querySelector("td:nth-of-type(" + (tt + 1) + ") > div");
        document.execCommand("insertHTML", !1, xe.innerHTML);
      }
    }
    k.ctrlKey && k.key.toLowerCase() === "i" && (k.preventDefault(), k.target, window.getSelection().toString(), E(N, !0)), k.key === "Escape" && (k.preventDefault(), pt(et, g(et).show = !1));
  }
  function Pa(k) {
    setTimeout(
      () => {
        const R = document.activeElement;
        R && R.closest(".suggestions") || pt(et, g(et).show = !1);
      },
      0
    );
  }
  function zs(k) {
    if (k.ctrlKey && k.key.toLowerCase() === "z" && V.length > 0) {
      k.preventDefault();
      let R = V.pop();
      if (g(x).length === 1) {
        let D = 0, H = Object.keys(g(x)[0]), tt = H.length;
        H.forEach((Ct) => {
          g(x)[0][Ct] === "" && D++;
        }), D === tt ? g(x).splice(R.index, 1, R.item) : g(x).splice(R.index, 0, R.item);
      } else g(x).length > 1 && g(x).splice(R.index, 0, R.item);
      E(x, g(x));
    }
  }
  let Yt = Kt(!1), le = Kt(!1), ut = Kt({
    name: "",
    label: "",
    wrap: "",
    align: "",
    type: "",
    autocomplete: ""
  });
  function er() {
    if (g(S).map((R) => R.name).includes(g(ut).name)) {
      alert("You can't use an existing column name");
      return;
    }
    g(ut).label === "" && pt(ut, g(ut).label = g(ut).name), g(S).push(g(ut)), E(S, g(S)), g(x).length === 0 ? g(x).push({ [g(ut).name]: "" }) : g(x).forEach((R) => {
      R[g(ut).name] = "";
    }), E(x, g(x)), E(ut, {
      name: "",
      label: "",
      wrap: "",
      align: "",
      type: "",
      autocomplete: ""
    }), E(le, !1);
  }
  function Bn(k, R, D) {
    var H = k[R];
    k[R] = k[D], k[D] = H;
  }
  function On(k) {
    k > 0 && (Bn(g(S), k, k - 1), E(S, g(S)), E(x, g(x)));
  }
  function Yn(k) {
    k < g(S).length - 1 && (Bn(g(S), k, k + 1), E(S, g(S)), E(x, g(x)));
  }
  let ht = Kt(null), Zt = Kt(null);
  function Gr(k) {
    E(le, !1), E(ht, JSON.parse(JSON.stringify(k))), E(Zt, k);
  }
  function mr() {
    E(ht, null), E(Zt, null);
  }
  function Ns() {
    if (g(ht).name === "") {
      alert("Column name can't be be empty");
      return;
    }
    if (g(S).map((R) => R.name).filter((R) => R != g(Zt).name).includes(g(ht).name)) {
      alert("You can't use an existing column name");
      return;
    }
    g(Zt).name !== g(ht).name && g(x).forEach((R) => {
      R[g(ht).name] = R[g(Zt).name], delete R[g(Zt).name];
    }), pt(Zt, g(Zt).name = g(ht).name), pt(Zt, g(Zt).label = g(ht).label), pt(Zt, g(Zt).wrap = g(ht).wrap), pt(Zt, g(Zt).align = g(ht).align), pt(Zt, g(Zt).type = g(ht).type), pt(Zt, g(Zt).autocomplete = g(ht).autocomplete), E(x, g(x)), E(ht, null), E(Zt, null);
  }
  function Is(k) {
    confirm("Deleting a column, will also delete all the items under it. Are you sure you want to delete this column?") && (E(S, g(S).filter((R) => R.name !== k)), g(x).forEach((R) => {
      Object.keys(R).forEach((D) => {
        g(S).map((H) => H.name).includes(D) || delete R[D];
      });
    }), E(x, g(x)));
  }
  function ir(k) {
    k.focus();
  }
  function Gs(k) {
  }
  function Vs() {
    window.getSelection().getRangeAt(0);
  }
  function Ls() {
    let k = JSON.stringify({
      columns: g(S),
      totals: g(P),
      widths: g(T),
      rowStyle: g(X),
      startupScript: g(q),
      customFunctions: g(Z)
    });
    navigator.clipboard.writeText(k).then(() => {
      alert("Configuration copied to clipboard");
    });
  }
  async function Us() {
    const k = await navigator.clipboard.readText();
    if (confirm("Are you sure you want to paste configuration? This will overwrite the current configuration."))
      try {
        let R = JSON.parse(k);
        E(S, R.columns), g(x).length === 0 && g(x).push({}), E(P, R.totals), E(T, R.widths), E(X, R.rowStyle), E(q, R.startupScript), E(Z, R.customFunctions);
      } catch {
        alert("Invalid configuration");
      }
  }
  function rr(k, R, D) {
    const H = g(S).find((tt) => tt.name === D);
    if (H && H.autocomplete === "Yes") {
      const tt = k.target.textContent, xe = g(f)[D].filter((ft) => ft.toLowerCase().includes(tt.toLowerCase()) && ft !== tt);
      xe.length > 0 ? (pt(et, g(et).show = !0), pt(et, g(et).suggestions = xe), pt(et, g(et).position = Ra(k.target)), pt(et, g(et).itemIndex = R), pt(et, g(et).columnName = D)) : pt(et, g(et).show = !1);
    } else
      pt(et, g(et).show = !1);
    st(R), Pt(R), pe(R);
  }
  function Ra(k) {
    const R = k.getBoundingClientRect();
    return {
      top: R.bottom + window.scrollY,
      left: R.left + window.scrollX
    };
  }
  function Ca(k) {
    const R = k.detail.suggestion, { itemIndex: D, columnName: H } = g(et);
    if (D !== null && H) {
      pt(x, g(x)[D][H] = R), E(x, g(x)), pt(et, g(et).show = !1);
      const tt = g(Pe).querySelector(`tbody tr:nth-child(${D + 1}) td:nth-child(${g(S).findIndex((Ct) => Ct.name === H) + 1}) div[contenteditable]`);
      tt && (tt.textContent = R, tt.focus(), document.getSelection().collapse(tt, 1));
    }
  }
  Wn(
    () => bp($()),
    () => {
      if ($()) {
        let k = JSON.parse($());
        E(S, k.columns), E(x, k.items), E(P, k.totals), E(T, k.widths), E(X, k.rowStyle), E(q, k.startupScript), E(Z, k.customFunctions), lt(), nt(), At();
      }
    }
  ), Wn(() => {
  }, () => {
    Nr();
  }), Wn(
    () => (g(x), g(P), g(T), g(X), g(q), g(Z), g(me)),
    () => {
      g(x) && (E(P, g(P)), Object.keys(g(P)).forEach((k) => {
        g(P)[k] === "" && delete g(P)[k];
      }), E(T, g(T)), Object.keys(g(T)).forEach((k) => {
        g(T)[k] === "" && delete g(T)[k];
      }), E(X, g(X)), E(q, g(q)), E(Z, g(Z)), g(me) || Ri(), E(me, !1));
    }
  ), Wn(() => g(le), () => {
    g(le) && (E(ut, {
      name: "",
      label: "",
      wrap: "",
      align: "",
      type: "",
      autocomplete: ""
    }), mr());
  }), Wn(() => {
  }, () => {
    E(f, {});
  }), Wn(() => (g(S), g(x)), () => {
    g(S).forEach((k) => {
      k.autocomplete === "Yes" && pt(f, g(f)[k.name] = [
        ...new Set(g(x).map((R) => R[k.name]).filter((R) => R))
      ].filter((R) => R !== "<br>"));
    });
  }), B1(), Pp();
  var ct = pS(), Gt = ci(ct), _a = I(Gt);
  {
    var Bs = (k) => {
      var R = nS(), D = ci(R);
      {
        var H = (Ft) => {
          var rt = Ux();
          bt("click", rt, () => E(Yt, !0)), St(Ft, rt);
        };
        Ye(D, (Ft) => {
          $() === void 0 && y() === !1 && Ft(H);
        });
      }
      var tt = K(D, 2), Ct = I(tt), xe = I(Ct), ft = I(xe);
      Bi(ft, 5, () => g(S), Ui, (Ft, rt) => {
        var ee = Bx(), se = I(ee), mi = K(se), Ze = I(mi);
        te(() => {
          Dn(ee, "style", g(rt).wrap === "No" ? "white-space: nowrap;" : ""), Be(se, g(rt).label), Be(Ze, g(rt).label === "" ? g(rt).name : "");
        }), St(Ft, ee);
      });
      var Ee = K(xe);
      Bi(Ee, 5, () => g(x), Ui, (Ft, rt, ee) => {
        var se = tS(), mi = I(se);
        Bi(mi, 1, () => g(S), Ui, (Re, jt, ie) => {
          var Ht = Jx(), He = I(Ht);
          {
            var vr = (_i) => {
              var ge = Yx();
              kw("innerHTML", ge, () => g(rt)[g(jt).name], (je) => (g(rt)[g(jt).name] = je, Ti(() => g(x)))), bt("keydown", ge, (je) => Un(je, ee, g(jt).name)), bt("input", ge, (je) => rr(je, ee, g(jt).name)), bt("blur", ge, Pa), St(_i, ge);
            }, nr = (_i) => {
              var ge = ua(), je = ci(ge);
              {
                var Lr = (he) => {
                  var Je = Fx(), Ur = I(Je);
                  oa(Ur, () => g(Rt)[ee][ie]), St(he, Je);
                }, pn = (he) => {
                  var Je = Hx(), Ur = I(Je);
                  oa(Ur, () => g(rt)[g(jt).name] || '<span style="visibility: hidden">cat</span>'), St(he, Je);
                };
                Ye(je, (he) => {
                  g(jt).type === "Computed" ? he(Lr) : he(pn, !1);
                });
              }
              St(_i, ge);
            };
            Ye(He, (_i) => {
              $() === void 0 && y() === !1 && g(jt).type !== "Computed" ? _i(vr) : _i(nr, !1);
            });
          }
          te(() => Dn(Ht, "style", `min-width: ${g(T)[g(jt).name] ?? ""}; max-width: ${g(T)[g(jt).name] ?? ""}; ${(g(jt).wrap === "No" ? "white-space: nowrap;" : "word-break: break-word;") ?? ""} ${(g(jt).align ? `text-align: ${g(jt).align};` : "text-align: left;") ?? ""} ${g(gt)[ee] ?? ""}; ${(g(wt)[ee] ? g(wt)[ee][ie] : "") ?? ""}`)), St(Re, Ht);
        });
        var gi = K(mi);
        {
          var Ci = (Re) => {
            var jt = Kx(), ie = I(jt), Ht = K(ie, 2), He = K(Ht, 2);
            bt("click", ie, () => tr(ee, !0)), bt("click", Ht, () => tr(ee, !1)), bt("click", He, () => {
              confirm("Are you sure you want to delete this row?") && Ln(ee);
            }), St(Re, jt);
          };
          Ye(gi, (Re) => {
            $() === void 0 && y() === !1 && Re(Ci);
          });
        }
        St(Ft, se);
      });
      var gr = K(Ee);
      {
        var Vr = (Ft) => {
          var rt = rS(), ee = I(rt);
          Bi(ee, 5, () => g(S), Ui, (mi, Ze) => {
            var gi = ua(), Ci = ci(gi);
            {
              var Re = (ie) => {
                var Ht = eS(), He = I(Ht);
                oa(He, () => pr("Totals", g(P)[g(Ze).name], null, g(Ze).name)), te(() => Dn(Ht, "style", g(Ze).wrap === "No" ? "white-space: nowrap;" : "")), St(ie, Ht);
              }, jt = (ie) => {
                var Ht = iS();
                St(ie, Ht);
              };
              Ye(Ci, (ie) => {
                g(P).hasOwnProperty(g(Ze).name) ? ie(Re) : ie(jt, !1);
              });
            }
            St(mi, gi);
          }), St(Ft, rt);
        };
        Ye(gr, (Ft) => {
          Object.keys(g(P)).length > 0 && Ft(Vr);
        });
      }
      Sw(Ct, (Ft) => E(Pe, Ft), () => g(Pe)), te(() => Dn(Ct, "style", W())), bt("paste", Ct, Gs), bt("keydown", Ct, (Ft) => zs(Ft)), St(k, R);
    }, Fn = (k) => {
      var R = OS(), D = ci(R), H = I(D), tt = K(H, 2), Ct = K(tt, 2), xe = K(D, 4), ft = I(xe), pi = K(I(ft)), Ee = I(pi);
      Bi(Ee, 1, () => g(S), Ui, (Qt, ot, ve) => {
        var re = ua(), oe = ci(re);
        {
          var ce = (dt) => {
            var ue = sS(), ti = I(ue), Ce = I(ti);
            Er(() => aa(Ce, () => g(ht).name, (Se) => pt(ht, g(ht).name = Se))), DO(Ce, (Se) => ir == null ? void 0 : ir(Se));
            var ne = K(ti), Ai = I(ne), ze = K(ne), Ne = I(ze);
            te(() => {
              g(ht), Ti(() => {
              });
            });
            var Ie = I(Ne);
            Ie.value = ((Ie.__value = "") == null, "");
            var ei = K(ze), vi = I(ei);
            te(() => {
              g(ht), Ti(() => {
              });
            });
            var ii = I(vi);
            ii.value = ((ii.__value = "") == null, "");
            var Wi = K(ei), zt = I(Wi);
            te(() => {
              g(ht), Ti(() => {
              });
            });
            var Br = I(zt);
            Br.value = ((Br.__value = "") == null, "");
            var mn = K(Wi), Yr = I(mn);
            te(() => {
              g(ht), Ti(() => {
              });
            });
            var Qi = I(Yr);
            Qi.value = ((Qi.__value = "") == null, "");
            var Qr = K(mn), gn = I(Qr), Xi = K(Qr), sr = I(Xi);
            aa(Ai, () => g(ht).label, (Se) => pt(ht, g(ht).label = Se)), Wr(Ne, () => g(ht).wrap, (Se) => pt(ht, g(ht).wrap = Se)), Wr(vi, () => g(ht).align, (Se) => pt(ht, g(ht).align = Se)), Wr(zt, () => g(ht).type, (Se) => pt(ht, g(ht).type = Se)), Wr(Yr, () => g(ht).autocomplete, (Se) => pt(ht, g(ht).autocomplete = Se)), bt("click", gn, Ns), bt("click", sr, mr), St(dt, ue);
          }, Qe = (dt) => {
            var ue = oS(), ti = I(ue), Ce = I(ti), ne = K(ti), Ai = I(ne), ze = K(ne), Ne = I(ze), Ie = K(ze), ei = I(Ie), vi = K(Ie), ii = I(vi), Wi = K(vi), zt = I(Wi), Br = K(Wi), mn = I(Br), Yr = K(Br), Qi = I(Yr), Qr = K(Yr), gn = I(Qr), Xi = K(Qr), sr = I(Xi);
            te(() => {
              Be(Ce, g(ot).name), Be(Ai, g(ot).label), Be(Ne, g(ot).wrap || "Yes"), Be(ei, g(ot).align || "Left"), Be(ii, g(ot).type || "Input"), Be(zt, g(ot).autocomplete || "No");
            }), bt("click", mn, () => On(ve)), bt("click", Qi, () => Yn(ve)), bt("click", gn, () => Gr(g(ot))), bt("click", sr, () => Is(g(ot).name)), St(dt, ue);
          };
          Ye(oe, (dt) => {
            g(Zt) && g(Zt).name === g(ot).name ? dt(ce) : dt(Qe, !1);
          });
        }
        St(Qt, re);
      });
      var Vr = K(Ee);
      {
        var Ft = (Qt) => {
          var ot = aS(), ve = I(ot), re = I(ve);
          Er(() => aa(re, () => g(ut).name, (zt) => pt(ut, g(ut).name = zt))), DO(re, (zt) => ir == null ? void 0 : ir(zt));
          var oe = K(ve), ce = I(oe), Qe = K(oe), dt = I(Qe);
          te(() => {
            g(ut), Ti(() => {
            });
          });
          var ue = I(dt);
          ue.value = ((ue.__value = "") == null, "");
          var ti = K(Qe), Ce = I(ti);
          te(() => {
            g(ut), Ti(() => {
            });
          });
          var ne = I(Ce);
          ne.value = ((ne.__value = "") == null, "");
          var Ai = K(ti), ze = I(Ai);
          te(() => {
            g(ut), Ti(() => {
            });
          });
          var Ne = I(ze);
          Ne.value = ((Ne.__value = "") == null, "");
          var Ie = K(Ai), ei = I(Ie);
          te(() => {
            g(ut), Ti(() => {
            });
          });
          var vi = I(ei);
          vi.value = ((vi.__value = "") == null, "");
          var ii = K(Ie, 2), Wi = I(ii);
          aa(ce, () => g(ut).label, (zt) => pt(ut, g(ut).label = zt)), Wr(dt, () => g(ut).wrap, (zt) => pt(ut, g(ut).wrap = zt)), Wr(Ce, () => g(ut).align, (zt) => pt(ut, g(ut).align = zt)), Wr(ze, () => g(ut).type, (zt) => pt(ut, g(ut).type = zt)), Wr(ei, () => g(ut).autocomplete, (zt) => pt(ut, g(ut).autocomplete = zt)), bt("click", Wi, () => E(le, !1)), St(Qt, ot);
        };
        Ye(Vr, (Qt) => {
          g(le) && Qt(Ft);
        });
      }
      var rt = K(xe, 2);
      {
        var ee = (Qt) => {
          var ot = lS();
          bt("click", ot, () => E(le, !0)), St(Qt, ot);
        };
        Ye(rt, (Qt) => {
          g(le) || Qt(ee);
        });
      }
      var se = K(rt, 2);
      {
        var mi = (Qt) => {
          var ot = cS(), ve = K(ci(ot), 2);
          const re = () => g(S).filter((oe) => g(oe).type === "Computed");
          Bi(ve, 5, re, Ui, (oe, ce, Qe) => {
            var dt = hS(), ue = ci(dt), ti = I(ue), Ce = K(ue, 2), ne = I(Ce);
            hi(ne, "style", "border: 1px solid darkgray"), te(() => {
              Be(ti, g(ce).label ? g(ce).label : g(ce).name), hi(ne, "value", g(ce).expression);
            }), bt("input", ne, (Ai) => {
              g(ce).expression = Ai.target.value, Ti(() => re()), _();
            }), St(oe, dt);
          }), St(Qt, ot);
        };
        Ye(se, (Qt) => {
          g(S).filter((ot) => ot.type === "Computed").length > 0 && Qt(mi);
        });
      }
      var Ze = K(se, 4);
      Bi(Ze, 5, () => g(S), Ui, (Qt, ot) => {
        var ve = uS(), re = ci(ve), oe = I(re), ce = K(re, 2), Qe = I(ce);
        hi(Qe, "style", "border: 1px solid darkgray"), te(() => {
          Be(oe, g(ot).label ? g(ot).label : g(ot).name), hi(Qe, "value", g(P)[g(ot).name] ? g(P)[g(ot).name] : "");
        }), bt("input", Qe, (dt) => pt(P, g(P)[g(ot).name] = dt.target.value)), St(Qt, ve);
      });
      var Ci = K(Ze, 6);
      Bi(Ci, 5, () => g(S), Ui, (Qt, ot) => {
        var ve = fS(), re = ci(ve), oe = I(re), ce = K(re, 2), Qe = I(ce);
        te(() => {
          Be(oe, g(ot).label ? g(ot).label : g(ot).name), bw(Qe, g(T)[g(ot).name] ? g(T)[g(ot).name] : "");
        }), bt("input", Qe, (dt) => pt(T, g(T)[g(ot).name] = dt.target.value)), St(Qt, ve);
      });
      var jt = K(Ci, 4);
      const ie = () => g(S);
      Bi(jt, 5, ie, Ui, (Qt, ot, ve) => {
        var re = dS(), oe = ci(re), ce = I(oe), Qe = K(oe, 2), dt = I(Qe);
        hi(dt, "style", "border: 1px solid darkgray"), te(() => {
          Be(ce, g(ot).label ? g(ot).label : g(ot).name), hi(dt, "value", g(ot).style);
        }), bt("input", dt, (ue) => {
          g(ot).style = ue.target.value, Ti(() => ie()), _();
        }), St(Qt, re);
      });
      var Ht = K(jt, 6), He = I(Ht), vr = I(He);
      hi(vr, "style", "border: 1px solid darkgray");
      var nr = K(Ht, 6), _i = I(nr), ge = I(_i);
      hi(ge, "style", "border: 1px solid darkgray");
      var je = K(nr, 2), Lr = K(I(je), 4), pn = K(I(Lr), 2), he = I(pn);
      oa(
        he,
        () => `// Modify all rows
rows.forEach(row => {
    row['Column 1'] = row['Column 1'] + 'foo'
})

// add a new row at the end
rows.push({
    'Column 1' : 'Hi'
})

// add a new row at any index
const insertAtIndex = 1
rows.splice(insertAtIndex, 0, { 'Column 1': 'Inserted at index 1' })`
      );
      var Je = K(je, 4), Ur = I(Je), Ke = I(Ur);
      hi(Ke, "style", "border: 1px solid darkgray"), te(() => {
        hi(vr, "value", g(X)), hi(ge, "value", g(q)), hi(Ke, "value", g(Z));
      }), bt("click", H, () => E(Yt, !1)), bt("click", tt, Ls), bt("click", Ct, Us), bt("submit", xe, Tp(er)), bt("input", vr, (Qt) => E(X, Qt.target.value)), bt("input", ge, (Qt) => E(q, Qt.target.value)), bt("input", Ke, (Qt) => E(Z, Qt.target.value)), St(k, R);
    };
    Ye(_a, (k) => {
      g(Yt) ? k(Fn, !1) : k(Bs);
    });
  }
  var Hn = K(Gt, 2);
  {
    var Aa = (k) => {
    };
    Ye(Hn, (k) => {
      g(N) && k(Aa);
    });
  }
  var Wa = K(Hn, 2);
  Lx(Wa, {
    get suggestions() {
      return g(et).suggestions;
    },
    get position() {
      return g(et).position;
    },
    get show() {
      return g(et).show;
    },
    set show(k) {
      pt(et, g(et).show = k);
    },
    $$events: { select: Ca },
    $$legacy: !0
  }), St(h, ct), jh();
}
var Ws, Xs, qs, Ms, cn;
class vS {
  constructor(c) {
    An(this, Ws);
    An(this, Xs);
    An(this, qs);
    An(this, Ms);
    An(this, cn);
    an(this, Ws, c.mountPoint), an(this, Xs, c.onUpdateCallback), an(this, qs, c.fontFamily), an(this, Ms, c.fontSize), an(this, cn, c.fileContent);
  }
  render() {
    Ow(mS, {
      target: on(this, Ws),
      props: {
        content: on(this, cn),
        onUpdate: (c) => {
          an(this, cn, c), on(this, Xs).call(this);
        },
        style: `font-family: ${on(this, qs)}; font-size: ${on(this, Ms)};`
      }
    });
  }
  getFileContent() {
    return on(this, cn);
  }
}
Ws = new WeakMap(), Xs = new WeakMap(), qs = new WeakMap(), Ms = new WeakMap(), cn = new WeakMap();
export {
  vS as default
};
