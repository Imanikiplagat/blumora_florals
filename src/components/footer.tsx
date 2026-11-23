import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram,  faFacebook,  faTwitter,} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { brandLogoUrl } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="site-footer mt-24 bg-cream text-espresso">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center">
            <img
              src={brandLogoUrl}
              alt="Blumora Florals"
              className="h-20 w-20 shrink-0 object-contain"
            />
          </div>
          <p className="mt-4 max-w-sm text-sm text-espresso/75">
            Flowers that tell your story. Hand-tied by local florists and delivered
            to doors across the city, same day.
          </p>
          <div className="mt-6 flex gap-3">
        <a
          href="https://www.instagram.com/blumora_florals"
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-9 w-9 place-items-center rounded-full bg-olive/10 transition hover:bg-olive/20"
          aria-label="Instagram"
        >
         <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
        </a>

        <a
          href="https://www.facebook.com/blumoraflorals"
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-9 w-9 place-items-center rounded-full bg-olive/10 transition hover:bg-olive/20"
          aria-label="Facebook"
        >
          <FontAwesomeIcon icon={faFacebook} className="h-4 w-4" />
        </a>

        <a
          href="https://x.com/blumora_florals"
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-9 w-9 place-items-center rounded-full bg-olive/10 transition hover:bg-olive/20"
          aria-label="X"
        >
         <FontAwesomeIcon icon={faTwitter} className="h-4 w-4" />
        </a>
        </div>
        </div>
        <div>
          <h4 className="font-display text-lg">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-espresso/80">
            <li><Link to="/shop">All flowers</Link></li>
            <li><Link to="/shop">Best sellers</Link></li>
            <li><Link to="/custom">Custom bouquet</Link></li>
            <li><Link to="/blog">Journal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg">Help</h4>
          <ul className="mt-4 space-y-2 text-sm text-espresso/80">
            <li><Link to="/delivery" className="hover:text-white">Delivery</Link></li>
            <li><Link to="/care-guide" className="hover:text-white">Care guide</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-olive/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-espresso/65 sm:flex-row sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} Blumora Florals. Grown with care.</p>
          <p>Privacy · Terms · Cookies</p>
        </div>
      </div>
    </footer>
  );
}