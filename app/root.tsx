import {
  Links,
  Meta,
  Outlet,
  Scripts,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import { GeneralContextProvider } from "./contexts/General";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Simple Color - A tool for choose colors</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta 
          name="description" 
          content="Simple Color is a web tool that helps developers with no design background choose beautiful color combinations effortlessly and quickly."/>
        <Meta />
        <Links />
      </head>
      <body>
        <GeneralContextProvider>
          {children}
        </GeneralContextProvider>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
