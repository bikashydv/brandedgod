import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Mic, Headphones, Play, ChevronLeft, ChevronRight, ArrowUpRight,
  Instagram, Youtube, Twitter, Music, Radio, Mail, Sparkles
} from "lucide-react";
import logo from "@/assets/logo.png";
import hostPortrait from "@/assets/host-portrait.jpg";
import epCreator from "@/assets/ep-creator-economy.jpg";
import epDeep from "@/assets/ep-deep-work.jpg";
import epWriting from "@/assets/ep-writing-craft.jpg";
import workFilm from "@/assets/work-film.jpg";
import workEssays from "@/assets/work-essays.jpg";
import workTalks from "@/assets/work-talks.jpg";
import workBrand from "@/assets/work-brand.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mira Cole — Podcaster & Content Creator" },
      { name: "description", content: "The personal studio of Mira Cole — host of Signal/Noise, essayist, and creative director. Conversations on craft, culture, and the creator economy." },
    ],
  }),
  component: Home,
});

const featured = [
  { tag: "EP · 087", title: "The Quiet Power of Long-Form", meta: "58 min · with Hana Mori", img: epDeep },
  { tag: "EP · 086", title: "Building an Audience Without Burning Out", meta: "44 min · solo", img: epCreator },
  { tag: "EP · 085", title: "Notes on the Writing Craft", meta: "1h 12m · with Theo Bates", img: epWriting },
  { tag: "EP · 084", title: "When Algorithms Stop Listening", meta: "39 min · solo", img: epCreator },
  { tag: "EP · 083", title: "The Studio Diaries, Vol. III", meta: "52 min · with K. Anand", img: epDeep },
];

const portfolio = [
  { cat: "Podcast", title: "Signal / Noise", desc: "Weekly long-form conversations. 87 episodes, 2.4M downloads.", img: epDeep },
  { cat: "Film", title: "Field Notes — Documentary Series", desc: "A six-part series on independent makers.", img: workFilm },
  { cat: "Writing", title: "The Margin — Essay Collection", desc: "Quarterly essays on attention and craft.", img: workEssays },
  { cat: "Speaking", title: "Stage: On Listening Better", desc: "Keynote · Reframe Conf · 2025", img: workTalks },
  { cat: "Brand", title: "Studio Identity System", desc: "End-to-end visual identity for the Signal/Noise studio.", img: workBrand },
  { cat: "Podcast", title: "After Hours — Mini-Series", desc: "A six-night audio diary recorded on tour.", img: epWriting },
];

const cats = ["All", "Podcast", "Film", "Writing", "Speaking", "Brand"] as const;

// 👇 ABOUT SLIDER — add or replace images here. Any number works (loops infinitely).
const aboutSlides = [
  { img: workEssays, caption: "The Margin — Vol. IV" },
  { img: hostPortrait, caption: "Studio session, Lisbon" },
  { img: workFilm, caption: "Field Notes — on location" },
  { img: workTalks, caption: "Reframe Conf · Keynote" },
  { img: epDeep, caption: "Recording Ep. 087" },
  { img: workBrand, caption: "Studio identity system" },
  { img: epWriting, caption: "Notes on the writing craft" },
];

const heroSlides = [
  { kicker: "EP · 088 · New", title: "Conversations that take their time.", desc: "Slow, long-form audio about craft, attention, and the people quietly building things that matter.", img: hostPortrait, cta: "Listen to latest" },
  { kicker: "Field Notes", title: "A documentary on independent makers.", desc: "Six episodes recorded across three continents — out now on the studio channel.", img: workFilm, cta: "Watch the series" },
  { kicker: "The Margin", title: "Quarterly essays on attention & craft.", desc: "Read the latest issue — on what we lose when the algorithm stops listening.", img: workEssays, cta: "Read the essay" },
  { kicker: "On Stage", title: "Keynote: On Listening Better.", desc: "Recorded live at Reframe Conf 2025 — a 32 minute talk on slow media.", img: workTalks, cta: "Watch the talk" },
];

function Home() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<(typeof cats)[number]>("All");
  const [slide, setSlide] = useState(0);
  const [aboutSlide, setAboutSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setAboutSlide((s) => (s + 1) % aboutSlides.length), 3500);
    return () => clearInterval(id);
  }, []);

  const scroll = (dir: number) => {
    sliderRef.current?.scrollBy({ left: dir * 480, behavior: "smooth" });
  };

  const items = portfolio.filter((p) => filter === "All" || p.cat === filter);

  return (
    <div className="min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/70 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 font-display text-xl">
            <img src={logo} alt="Mira Cole Studio logo" width={36} height={36} className="w-9 h-9 object-contain" />
            <span>Mira Cole</span>
            <span className="text-muted-foreground text-xs ml-1 font-sans tracking-widest">/ STUDIO</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#featured" className="hover:text-foreground transition">Featured</a>
            <a href="#portfolio" className="hover:text-foreground transition">Portfolio</a>
            <a href="#about" className="hover:text-foreground transition">About</a>
            <a href="#contact" className="hover:text-foreground transition">Contact</a>
          </nav>
          <a href="#contact" className="inline-flex items-center gap-2 bg-gradient-ember text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-glow hover:opacity-90 transition">
            Book Mira <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* TOP SLIDER — auto rotates every 3s */}
      <section aria-label="Featured highlights" className="relative border-b border-border/60 overflow-hidden">
        <div className="relative h-[280px] md:h-[360px]">
          {heroSlides.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              aria-hidden={i !== slide}
            >
              <img src={s.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
              <div className="relative max-w-7xl mx-auto px-6 lg:px-10 h-full flex flex-col justify-center max-w-2xl">
                <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3">{s.kicker}</div>
                <h2 className="font-display text-3xl md:text-5xl leading-tight">{s.title}</h2>
                <p className="text-muted-foreground mt-3 max-w-lg">{s.desc}</p>
                <div className="mt-5">
                  <a href="#featured" className="inline-flex items-center gap-2 bg-gradient-ember text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium shadow-glow hover:opacity-90 transition">
                    <Play className="w-3.5 h-3.5 fill-current" /> {s.cta}
                  </a>
                </div>
              </div>
            </div>
          ))}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === slide ? "w-8 bg-primary" : "w-4 bg-muted-foreground/40 hover:bg-muted-foreground"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-20 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary mb-6">
              <Mic className="w-3.5 h-3.5" /> On Air · Season 09
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
              Conversations<br />
              that take their <span className="italic text-gradient-ember">time.</span>
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
              I'm Mira — a podcaster, essayist and creative director making slow,
              long-form work about craft, attention, and the people quietly
              building things that matter.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#featured" className="inline-flex items-center gap-3 bg-gradient-ember text-primary-foreground px-6 py-3.5 rounded-full font-medium shadow-glow hover:opacity-90 transition">
                <Play className="w-4 h-4 fill-current" /> Listen to latest
              </a>
              <a href="#portfolio" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border hover:border-primary/60 hover:text-primary transition">
                See the portfolio
              </a>
            </div>
            <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm text-muted-foreground">
              <Stat n="2.4M" l="Downloads" />
              <Stat n="87" l="Episodes" />
              <Stat n="46" l="Countries" />
              <Stat n="4.9★" l="Apple Pods" />
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-6 bg-gradient-ember opacity-20 blur-3xl rounded-full" />
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-card border border-border">
              <img src={hostPortrait} alt="Portrait of Mira Cole at the studio microphone" className="w-full h-full object-cover" />
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 bg-background/80 backdrop-blur px-3 py-1.5 rounded-full text-xs">
                <span className="w-2 h-2 rounded-full bg-primary live-dot" /> Recording Ep. 088
              </div>
              <div className="absolute bottom-5 right-5 bg-background/85 backdrop-blur px-4 py-3 rounded-xl border border-border">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Now</div>
                <div className="text-sm font-medium">Signal / Noise</div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="border-y border-border/60 bg-card/40 overflow-hidden">
          <div className="flex whitespace-nowrap marquee py-4 text-muted-foreground font-display text-2xl">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-10 pr-10">
                <span>Apple Podcasts</span><Dot/>
                <span>Spotify</span><Dot/>
                <span>The New Quarterly</span><Dot/>
                <span>YouTube</span><Dot/>
                <span>Reframe Conf</span><Dot/>
                <span>Overcast</span><Dot/>
                <span>The Margin</span><Dot/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SLIDER (top slide bar) */}
      <section id="featured" className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3 flex items-center gap-2">
                <Headphones className="w-3.5 h-3.5" /> Featured
              </div>
              <h2 className="font-display text-4xl md:text-5xl">From the studio shelf.</h2>
              <p className="text-muted-foreground mt-3 max-w-lg">A scrolling rail of recent episodes, essays, and field recordings.</p>
            </div>
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll(-1)} aria-label="Previous" className="w-11 h-11 rounded-full border border-border hover:border-primary hover:text-primary transition flex items-center justify-center">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scroll(1)} aria-label="Next" className="w-11 h-11 rounded-full border border-border hover:border-primary hover:text-primary transition flex items-center justify-center">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div ref={sliderRef} className="flex gap-6 overflow-x-auto scrollbar-hidden snap-x snap-mandatory pb-4 -mx-6 px-6">
            {featured.map((f, i) => (
              <article key={i} className="snap-start shrink-0 w-[320px] md:w-[420px] group">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border shadow-card">
                  <img src={f.img} alt={f.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <button className="absolute top-5 right-5 w-12 h-12 rounded-full bg-gradient-ember text-primary-foreground flex items-center justify-center shadow-glow opacity-0 group-hover:opacity-100 transition">
                    <Play className="w-5 h-5 fill-current" />
                  </button>
                  <div className="absolute bottom-0 p-6">
                    <div className="text-[11px] uppercase tracking-[0.25em] text-primary">{f.tag}</div>
                    <h3 className="font-display text-2xl md:text-3xl mt-2 leading-tight">{f.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{f.meta}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-card/30 border-y border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> Portfolio
              </div>
              <h2 className="font-display text-4xl md:text-5xl">Selected work, 2019 — now.</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <button key={c} onClick={() => setFilter(c)}
                  className={`px-4 py-2 rounded-full text-sm border transition ${
                    filter === c
                      ? "bg-gradient-ember text-primary-foreground border-transparent shadow-glow"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-primary/60"
                  }`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p, i) => (
              <article key={i} className="group rounded-2xl overflow-hidden bg-background border border-border shadow-card hover:border-primary/50 transition">
                <div className="aspect-[5/4] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-primary mb-3">
                    <span>{p.cat}</span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
                  </div>
                  <h3 className="font-display text-2xl leading-tight">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="aspect-square rounded-2xl overflow-hidden border border-border shadow-card">
              <img src={workEssays} alt="An open essay collection" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">About</div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              I make slow media for people who still want to <em className="text-gradient-ember not-italic font-display">pay attention</em>.
            </h2>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              Based in Lisbon, working everywhere. For seven years I've been
              recording long-form conversations, writing essays, and helping
              independent studios shape the way they sound. My work lives at the
              intersection of craft, culture, and the strange new economics of
              attention.
            </p>
            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {[
                { h: "Speaking", p: "Keynotes on listening, long-form storytelling, and creator-led media." },
                { h: "Consulting", p: "Audio strategy and narrative coaching for studios and independent hosts." },
                { h: "Writing", p: "Essays, foreword work, and the quarterly newsletter The Margin." },
                { h: "Production", p: "Full-stack podcast production from concept to release." },
              ].map((s) => (
                <div key={s.h} className="p-5 rounded-xl border border-border bg-card/50">
                  <div className="font-display text-xl">{s.h}</div>
                  <p className="text-sm text-muted-foreground mt-2">{s.p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-card/30 border-t border-border/60">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Contact</div>
          <h2 className="font-display text-5xl md:text-6xl leading-tight">
            Let's make something <span className="italic text-gradient-ember">worth listening to</span>.
          </h2>
          <p className="text-muted-foreground mt-6 max-w-xl mx-auto">
            Bookings, collaborations, guest pitches — the inbox is open and read
            personally most mornings.
          </p>
          <a href="mailto:hello@miracole.studio" className="inline-flex items-center gap-3 mt-10 bg-gradient-ember text-primary-foreground px-7 py-4 rounded-full font-medium shadow-glow hover:opacity-90 transition">
            <Mail className="w-4 h-4" /> hello@miracole.studio
          </a>
          <div className="flex justify-center gap-3 mt-10">
            {[
              { I: Music, l: "Spotify" }, { I: Radio, l: "Apple" },
              { I: Youtube, l: "YouTube" }, { I: Instagram, l: "Instagram" },
              { I: Twitter, l: "Twitter" },
            ].map(({ I, l }) => (
              <a key={l} href="#" aria-label={l} className="w-11 h-11 rounded-full border border-border hover:border-primary hover:text-primary transition flex items-center justify-center">
                <I className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row gap-4 justify-between text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} Mira Cole Studio. All rights reserved.</div>
          <div className="font-mono text-xs tracking-widest">LISBON · 38.7°N 9.1°W</div>
        </div>
      </footer>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-foreground">{n}</div>
      <div className="text-xs uppercase tracking-widest mt-1">{l}</div>
    </div>
  );
}

function Dot() {
  return <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />;
}
