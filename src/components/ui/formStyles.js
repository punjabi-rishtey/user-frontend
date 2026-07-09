export const authCardClassName =
  "w-full rounded-2xl border border-[#E8DED7] bg-white p-6 shadow-[0_18px_45px_rgba(79,47,29,0.10)] sm:p-8";

export const authLabelClassName =
  "mb-2 block text-sm font-semibold text-[#4F2F1D]";

export const authInputClassName =
  "w-full rounded-xl border border-[#D8C5B8] bg-white px-4 py-3 text-base text-[#2B1810] shadow-[0_1px_0_rgba(79,47,29,0.04)] transition-[border-color,box-shadow] duration-150 ease-out placeholder:text-[#9A8172] focus-visible:border-[#990000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#990000]/20";

export const authPrimaryButtonClassName =
  "inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#990000] px-5 py-3 text-sm font-bold text-white transition-[transform,background-color,opacity,box-shadow] duration-150 ease-out hover:bg-[#800000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#990000]/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]";

export const authSecondaryButtonClassName =
  "inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#D8C5B8] bg-white px-5 py-3 text-sm font-semibold text-[#4F2F1D] transition-[transform,background-color,border-color,color,box-shadow] duration-150 ease-out hover:border-[#B99682] hover:bg-[#FCF9F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#990000]/20 active:scale-[0.98]";

export const authTextButtonClassName =
  "text-sm font-semibold text-[#4F2F1D] underline-offset-4 transition-[transform,color,box-shadow] duration-150 ease-out hover:text-[#990000] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#990000]/20 active:scale-[0.98]";

export const authInlineLinkClassName =
  "font-semibold text-[#990000] underline-offset-4 transition-[color,box-shadow] duration-150 ease-out hover:text-[#800000] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#990000]/20";

export const authSupportChipClassName =
  "inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full border border-[#D8C5B8] bg-white px-4 py-2 text-sm font-semibold text-[#4F2F1D] transition-[transform,background-color,border-color,color,box-shadow] duration-150 ease-out hover:border-[#B99682] hover:bg-[#FCF9F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#990000]/20 active:scale-[0.98]";

export const authIconButtonClassName =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#6B4132] transition-[transform,background-color,color,box-shadow] duration-150 ease-out hover:bg-[#F5EDE7] hover:text-[#4F2F1D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#990000]/20 active:scale-[0.96]";

export const authNoticeIconClassName = "mt-0.5 h-4 w-4 shrink-0";

export const getAuthNoticeClassName = (type) =>
  `mb-5 flex gap-3 rounded-xl border px-4 py-3 text-sm ${
    type === "success"
      ? "border-green-200 bg-green-50 text-green-800"
      : "border-red-200 bg-red-50 text-red-700"
  }`;

export const getAuthNoticeRole = (type) =>
  type === "success" ? "status" : "alert";
