// src/utils/pxGlobalContext.js
export function setPXGlobalContext(ctx) {
  if (!window.aptrinsic) return;
  window.aptrinsic('set', 'GlobalContext', ctx);
}

export function setPXGlobalContextOnce(ctx) {
  if (!window.aptrinsic) return;
  window.aptrinsic('setOnce', 'GlobalContext', ctx);
}

export function removePXGlobalContext(keys) {
  if (!window.aptrinsic) return;
  window.aptrinsic('remove', 'GlobalContext', keys);
}
