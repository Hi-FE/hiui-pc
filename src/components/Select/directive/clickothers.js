export default {
  bind (el, binding) {
    const clickHandler = (ev) => {
      if (el.contains(ev.target)) {
        return false;
      }
      if (typeof binding.value === 'function') {
        binding.value();
      }
    };
    el.clickHandler = clickHandler;
    document.addEventListener('click', clickHandler);
  },
  unbind (el) {
    document.removeEventListener('click', el.documentHandler);
  }
};