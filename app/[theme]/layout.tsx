import "@/styles/globals.css"
import { type ReactNode } from "react"
import { Metadata } from "next"
import themes from "@/themes/index.json"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn, sanitizeName } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { ExamplesNav } from "@/components/examples-nav"
import Footer from "@/components/footer"
import PageHeader from "@/components/home/pageHeader"
import { ShadcnThemeProvider } from "@/components/shadcn-theme-provider"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeArrows } from "@/components/theme-arrows"
import { ThemeProvider } from "@/components/theme-provider"

import og from "@/public/og.jpg"
import PHProvider from "./providers"

export async function generateMetadata(params: {
  params: { theme: string }
}): Promise<Metadata> {
  // read route params
  const currentTheme =
    themes.find(
      (t) => sanitizeName(t.name) === sanitizeName(params.params.theme)
    ) ?? themes[0]

  return {
    title: {
      default: `${currentTheme.name} Theme`,
      template: `%s - ${siteConfig.name}`,
    },
    description: currentTheme.description || siteConfig.description,
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "white" },
      { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    twitter: {
      site: "https://shadcn-ui-theme-explorer.vercel.app/",
      title: siteConfig.name,
      description: siteConfig.description,
      creator: "@_luisFilipePT",
      images: og.src,
    },
    openGraph: {
      title: siteConfig.name,
      description: siteConfig.description,
      images: og.src,
      authors: ["Luis Filipe", "Joana Santos"],
      url: "https://shadcn-ui-theme-explorer.vercel.app/",
      locale: "en_GB",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
  }
}

interface RootLayoutProps {
  children: ReactNode
  params: any
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`theme-${params.theme}`}
    >
      <head />

      <PHProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
          suppressHydrationWarning={true}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ShadcnThemeProvider>
              <ThemeArrows params={params}>
                <div className="flex min-h-screen flex-col">
                  <SiteHeader />
                  <div className="flex-1">
                    <div className="container pb-10">
                      <PageHeader theme={params.theme} />
                      <ExamplesNav />
                      <section className="block">
                        <div className="overflow-hidden rounded-lg border bg-background shadow-xl">
                          {children}
                        </div>
                      </section>
                    </div>
                  </div>
                  <Footer />
                </div>
                <Toaster />
              </ThemeArrows>
              <TailwindIndicator />
            </ShadcnThemeProvider>
          </ThemeProvider>
        </body>
      </PHProvider>
    </html>
  )
}
