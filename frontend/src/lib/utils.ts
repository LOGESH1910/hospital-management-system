/**
 * Class Name utility - merges Tailwind CSS classes conditionally
 * Similar to clsx or classnames but lightweight
 */
export function cn(...classes: (string | undefined | boolean | null)[]) {
  return classes
    .filter((c) => c && (typeof c !== "boolean" || c))
    .join(" ")
}