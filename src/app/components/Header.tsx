import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Blog Platform
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link href="/signup" className="hover:underline">
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
