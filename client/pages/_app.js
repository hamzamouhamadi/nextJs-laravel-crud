import "../styles/globals.css";
import { AuthProvider } from "../Provider/authContext";
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
