export function ArrowIcon({
  direction = "end",
}: {
  direction?: "start" | "end";
}) {
  return (
    <svg
      aria-hidden="true"
      className="playground-directional-icon"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d={
          direction === "start"
            ? "m12.5 4.5-5.5 5.5 5.5 5.5"
            : "m7.5 4.5 5.5 5.5-5.5 5.5"
        }
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
      <path
        d="M3 5h14M3 10h14M3 15h14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
      <circle
        cx="8.5"
        cy="8.5"
        r="5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="m12.25 12.25 4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
      <path
        d="m5 5 10 10M15 5 5 15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}
