export function calcStrength(pw: string): number {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export function inputCls(hasError: boolean) {
  return `w-full h-[42px] border rounded-[10px] px-3 text-[13px] text-stone-900 bg-white outline-none transition-all placeholder:text-stone-300 ${
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
      : "border-stone-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
  }`;
}
