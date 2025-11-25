var n = Object.defineProperty;
var d = (a, t, e) => t in a ? n(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var o = (a, t, e) => d(a, typeof t != "symbol" ? t + "" : t, e);
const i = {
  node: null,
  startX: 0,
  width: 0,
  xPos: 0,
  time: 0,
  delta: 0,
  velocityX: 0
};
class r {
  constructor() {
    o(this, "dragToast", i);
    o(this, "$wrapper", document.createElement("div"));
    this.init();
  }
  init() {
    this.onDragStart = this.onDragStart.bind(this), this.onDragMove = this.onDragMove.bind(this), this.onDragEnd = this.onDragEnd.bind(this), this.$wrapper.classList.add("krel-toast-wrapper"), this.$wrapper.addEventListener("mousedown", this.onDragStart), this.$wrapper.addEventListener("touchstart", this.onDragStart);
  }
  toast(t, e = "") {
    this.$wrapper.children.length || document.body.append(this.$wrapper);
    const s = document.createElement("div");
    s.classList.add("krel-toast"), e && s.classList.add(`krel-toast-${e}`), s.innerHTML = t, s.style.marginTop = "30px", this.$wrapper.append(s), setTimeout(() => {
      s.style.marginTop = "0";
    }, 0), s.dataset.id = this.closeTimeOut(s);
  }
  error(t) {
    this.toast(t, "error");
  }
  success(t) {
    this.toast(t, "success");
  }
  onDragStart(t) {
    t.preventDefault();
    const e = t.target;
    if (e && e.closest(".krel-toast")) {
      const s = e.dataset.id;
      s && clearTimeout(+s), this.dragToast.node = e, this.dragToast.startX = this.clientX(t), this.dragToast.width = e.offsetWidth, this.dragToast.xPos = this.clientX(t), this.dragToast.time = Date.now(), this.dragToast.node.style.transition = "0s", document.addEventListener("mousemove", this.onDragMove), document.addEventListener("mouseup", this.onDragEnd), document.addEventListener("touchmove", this.onDragMove), document.addEventListener("touchend", this.onDragEnd);
    }
  }
  onDragMove(t) {
    this.dragToast.delta = this.clientX(t) - this.dragToast.startX, this.dragToast.xPos = this.dragToast.velocityX = Math.abs(this.dragToast.xPos - this.clientX(t)) / (Date.now() - this.dragToast.time), this.dragToast.time = Date.now(), this.dragToast.xPos = this.clientX(t), this.dragToast.node && this.dragToast.delta && this.dragToast.width && (this.dragToast.node.style.transform = `translate(${this.dragToast.delta}px)`, this.dragToast.node.style.opacity = `${1 - Math.abs(this.dragToast.delta / (this.dragToast.width * 0.6))}`);
  }
  onDragEnd(t) {
    if (t.preventDefault(), Math.abs(this.dragToast.delta) > this.dragToast.width * 0.6 || this.dragToast.velocityX > 1) {
      const e = this.dragToast.node;
      e && (e.style.transition = "height 0.2s,  padding 0.2s, margin 0.2s", e.style.opacity = "0", e.style.height = "0", e.style.margin = "0", e.style.padding = "0", setTimeout(() => {
        e.remove();
      }, 300));
    } else
      this.dragToast.node && (this.dragToast.node.style.transform = "", this.dragToast.node.style.opacity = "", this.dragToast.node.style.transition = "", this.dragToast.node.dataset.id = this.closeTimeOut(this.dragToast.node));
    this.dragToast = i, document.removeEventListener("mousemove", this.onDragMove), document.removeEventListener("mouseup", this.onDragEnd), document.removeEventListener("touchmove", this.onDragMove), document.removeEventListener("touchend", this.onDragEnd);
  }
  closeTimeOut(t) {
    return setTimeout(() => {
      t.style.marginTop = "-20px", t.style.opacity = "0", setTimeout(() => {
        t.remove(), this.$wrapper.children.length || this.$wrapper.remove();
      }, 500);
    }, 5e3).toString();
  }
  clientX(t) {
    if (t.type.includes("touch")) {
      const s = t;
      if (s.targetTouches.length >= 0.8)
        return s.targetTouches[0].screenX;
    }
    return t.clientX;
  }
}
new r();
const g = new r();
export {
  g as krelToast
};
