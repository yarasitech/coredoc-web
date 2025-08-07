import Link from "next/link";
import { FileText, Github, Twitter, MessageSquare, Heart } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "For Developers", href: "#for-developers" },
      { label: "Demo", href: "https://demo.coredoc.dev" },
    ],
    developers: [
      { label: "Documentation", href: "https://docs.coredoc.dev" },
      { label: "API Reference", href: "https://docs.coredoc.dev/api" },
      { label: "GitHub", href: "https://github.com/yarasitech/coredoc" },
      { label: "Contributing", href: "https://github.com/yarasitech/coredoc/blob/main/CONTRIBUTING.md" },
    ],
    community: [
      { label: "Discord", href: "https://discord.gg/coredoc" },
      { label: "Twitter", href: "https://twitter.com/coredoc" },
      { label: "Blog", href: "https://blog.coredoc.dev" },
      { label: "Roadmap", href: "https://github.com/yarasitech/coredoc/projects" },
    ],
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Coredoc</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Transform linear documents into infinite knowledge graphs. Open source
              and community-driven.
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href="https://github.com/yarasitech/coredoc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com/coredoc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://discord.gg/coredoc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Developers</h3>
            <ul className="space-y-2">
              {footerLinks.developers.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© 2024 Coredoc. MIT Licensed.</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>by the open source community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}