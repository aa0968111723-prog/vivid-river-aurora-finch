import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/logo";
import { replayZen } from "@/components/home/zen-intro";
import { DEFAULT_LAYOUT } from "@/lib/site-layout";
import { SITE, withUtm } from "@/lib/site";

export function SiteFooter({
  note = DEFAULT_LAYOUT.pages.footer.note,
  showReplay = true,
}: {
  note?: string;
  showReplay?: boolean;
}) {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-md text-sm leading-relaxed text-mist">{note}</p>
          {showReplay ? (
            <button type="button" onClick={replayZen} className="mt-4 min-h-11 text-sm text-leaf">
              再看一次龜龜
            </button>
          ) : null}
        </div>
        <div>
          <p className="text-sm font-medium">逛逛</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/events" className="text-mist no-underline hover:text-ink">
                近期活動
              </Link>
            </li>
            <li>
              <Link to="/first-time" className="text-mist no-underline hover:text-ink">
                第一次來
              </Link>
            </li>
            <li>
              <Link to="/join" className="text-mist no-underline hover:text-ink">
                加入我們
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-mist no-underline hover:text-ink">
                認識我們
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">找到我們</p>
          <ul className="mt-3 space-y-2 text-sm text-mist">
            <li>
              <a
                href={withUtm(SITE.instagramUrl, { medium: "footer", campaign: "instagram" })}
                className="no-underline hover:text-ink"
                target="_blank"
                rel="noreferrer"
              >
                Instagram {SITE.instagramHandle}
              </a>
            </li>
            <li>
              <a href={SITE.facebookUrl} className="no-underline hover:text-ink" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </li>
            <li>{SITE.campus}</li>
            <li>社辦：體育館 SG109</li>
            <li>
              <Link to="/login" className="text-mist/80 no-underline hover:text-ink">
                社員後台
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-mist md:px-6">
          © {new Date().getFullYear()} {SITE.name} · {SITE.nameEn}
        </p>
      </div>
    </footer>
  );
}
