import "./globals.css";
export const metadata={
  title:"Chalet Michael | Alpine Retreat",
  description:"Digitale Gästemappe für Chalet Michael in Grächen"
};
export default function RootLayout({children}) {
  return <html lang="de"><body>{children}</body></html>;
}
