import Link from "next/link";
import { useAuth } from "../../Provider/authContext";

const Header = () => {
  const { logged, logout } = useAuth();

  return (
    <header>
      <nav className="p-5 bg-black flex justify-between items-center">
        <Link href="/" className="text-white font-semibold">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/White_Smile_Lirion.png/600px-White_Smile_Lirion.png?20130816021419"
            className="w-14"
          />
        </Link>
        <ul className="flex gap-4">
          {logged ? (
            <>
              (
              <li>
                <Link
                  href="/"
                  onClick={logout}
                  className="text-black bg-white rounded  px-4 py-1"
                >
                  logout
                </Link>
              </li>
              )
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className="text-black bg-white rounded  px-4 py-1"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-black bg-white rounded  px-4 py-1"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
