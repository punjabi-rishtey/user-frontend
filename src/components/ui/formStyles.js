export const authCardClassName =
  "w-full rounded-xl border border-border bg-card p-6 sm:p-8";

export const authLabelClassName =
  "mb-2 block text-sm font-semibold text-brown";

export const authInputClassName =
  "w-full rounded-lg border border-border bg-card px-4 py-3 text-base text-ink shadow-none transition-[border-color,box-shadow] duration-150 ease-out placeholder:text-muted-foreground focus-visible:border-maroon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/20";

/** Mirrors Button variant=default size=lg atelier language */
export const authPrimaryButtonClassName =
  "inline-flex min-h-12 items-center justify-center rounded-lg bg-maroon px-6 py-3 text-base font-semibold text-primary-foreground shadow-[0_8px_20px_-12px_rgba(153,0,0,0.55)] transition-[transform,background-color,box-shadow,opacity] duration-150 ease-out hover:bg-[#7a0000] hover:shadow-[0_10px_24px_-12px_rgba(153,0,0,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/30 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55 active:scale-[0.98]";

/** Mirrors Button variant=outline */
export const authSecondaryButtonClassName =
  "inline-flex min-h-12 items-center justify-center rounded-lg border border-brown/20 bg-card px-6 py-3 text-base font-semibold text-brown transition-[transform,background-color,border-color,opacity] duration-150 ease-out hover:border-maroon/35 hover:bg-secondary hover:text-brown-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/30 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-55 active:scale-[0.98]";

export const authTextButtonClassName =
  "text-sm font-semibold text-brown underline-offset-4 transition-colors duration-150 ease-out hover:text-maroon hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/30";

export const authInlineLinkClassName =
  "font-semibold text-maroon underline-offset-4 transition-colors duration-150 ease-out hover:text-maroon/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/30";

export const authSupportChipClassName =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-brown/20 bg-card px-4 py-2 text-sm font-semibold text-brown transition-[transform,background-color,border-color] duration-150 ease-out hover:border-maroon/35 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/30 active:scale-[0.98]";

export const authIconButtonClassName =
  "inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-[transform,background-color,color] duration-150 ease-out hover:bg-secondary hover:text-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/30 active:scale-[0.98]";

export const authNoticeIconClassName = "mt-0.5 size-4 shrink-0";

export const getAuthNoticeClassName = (type) =>
  `mb-5 flex gap-3 rounded-lg border px-4 py-3 text-sm ${
    type === "success"
      ? "border-green-200 bg-green-50 text-green-800"
      : "border-red-200 bg-red-50 text-red-700"
  }`;

export const getAuthNoticeRole = (type) =>
  type === "success" ? "status" : "alert";
