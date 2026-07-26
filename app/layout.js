import "./globals.css";
import "./manager/manager-v26.css";

export const metadata = {
  title: "Gästeguide | Chalet Michael",
  description: "Gästeguide für Chalet Michael in Grächen"
};

export default function RootLayout({ children }) {
  return <html lang="de"><body>{children}</body></html>;
}
