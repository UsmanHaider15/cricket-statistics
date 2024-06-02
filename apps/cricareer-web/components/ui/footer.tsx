/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XetXM7BOGjN
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row md:px-6">
      <div className="flex items-center gap-2">
        <MountainIcon className="h-6 w-6" />
        <span className="font-bold">Cricket Statistics</span>
      </div>
      <nav className="flex gap-4">
        <Link className="text-sm hover:underline" href="#">
          About
        </Link>
        <Link className="text-sm hover:underline" href="#">
          Contact
        </Link>
        <Link className="text-sm hover:underline" href="#">
          Privacy
        </Link>
      </nav>
      <p className="text-sm text-gray-500">
        © 2024 Cricket Statistics. All rights reserved.
      </p>
    </footer>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
