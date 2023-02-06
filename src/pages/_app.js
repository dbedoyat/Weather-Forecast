import { Lato } from "@next/font/google";
import "@/styles/globals.scss";
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={lato.className}>
      <Component {...pageProps} />
    </main>
  );
}
