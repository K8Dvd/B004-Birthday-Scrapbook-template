
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Heart,
  Music2,
  Pause,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import { siteData, type TapeColor } from "./data";

type PageId =
  | "cover"
  | "hello"
  | "memories"
  | "notes"
  | "video"
  | "photos"
  | "letter"
  | "ending";

const pages: PageId[] = [
  "cover",
  "hello",
  "memories",
  "notes",
  "video",
  "photos",
  "letter",
  "ending",
];

const pageLabels = [
  "cover",
  "hello",
  "memories",
  "notes",
  "video",
  "photos",
  "letter",
  "finish",
];

const YOUTUBE_VIDEO_ID = "L16f7Jve-T4";

function tapeClass(tape: TapeColor) {
  return `tape tape-${tape}`;
}

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [selectedPhoto, setSelectedPhoto] =
    useState<string | null>(null);

  const youtubeFrameRef =
    useRef<HTMLIFrameElement | null>(null);

  const page = pages[currentPage];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const sendYouTubeCommand = (command: string) => {
    const iframe = youtubeFrameRef.current;

    if (!iframe?.contentWindow) return;

    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: command,
        args: [],
      }),
      "https://www.youtube.com"
    );
  };

  const startMusic = () => {
    if (!musicStarted) {
      setMusicStarted(true);
      setMusicPlaying(true);
      return;
    }

    if (musicPlaying) {
      sendYouTubeCommand("pauseVideo");
      setMusicPlaying(false);
    } else {
      sendYouTubeCommand("playVideo");
      setMusicPlaying(true);
    }
  };

  const goToPage = (index: number) => {
    if (index < 0 || index >= pages.length) return;

    if (
      currentPage === 0 &&
      index !== 0 &&
      !musicStarted
    ) {
      setMusicStarted(true);
      setMusicPlaying(true);
    }

    setCurrentPage(index);
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      goToPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((value) => value - 1);
    }
  };

  const handleCoverOpen = () => {
    setMusicStarted(true);
    setMusicPlaying(true);
    setCurrentPage(1);
  };

  const renderPage = () => {
    switch (page) {
      case "cover":
        return (
          <CoverPage
            onOpen={handleCoverOpen}
            musicPlaying={musicPlaying}
          />
        );

      case "hello":
        return <HelloPage />;

      case "memories":
        return (
          <MemoriesPage
            onPhotoClick={setSelectedPhoto}
          />
        );

      case "notes":
        return <NotesPage />;

      case "video":
        return <VideoPage />;

      case "photos":
        return (
          <PhotosPage
            onPhotoClick={setSelectedPhoto}
          />
        );

      case "letter":
        return <LetterPage />;

      case "ending":
        return <EndingPage />;

      default:
        return null;
    }
  };

  return (
    <div className="app">
      {musicStarted && (
        <iframe
          ref={youtubeFrameRef}
          title="Birthday music"
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&playsinline=1&enablejsapi=1&rel=0&fs=0&iv_load_policy=3&disablekb=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          style={{
            position: "fixed",
            width: "200px",
            height: "200px",
            left: "-1000px",
            top: "-1000px",
            opacity: 0,
            pointerEvents: "none",
            border: "none",
            visibility: "hidden",
          }}
        />
      )}

      <div
        className="background-doodles"
        aria-hidden="true"
      >
        <span className="doodle doodle-star">
          ✦
        </span>
        <span className="doodle doodle-heart">
          ♡
        </span>
        <span className="doodle doodle-flower">
          ✿
        </span>
        <span className="doodle doodle-sparkle">
          ✦
        </span>
      </div>

      <header className="topbar">
        <button
          className="brand-button"
          onClick={() => setCurrentPage(0)}
          aria-label="Back to cover"
        >
          <span className="brand-dot" />
          <span>KATE'S SCRAPBOOK</span>
        </button>

        <div className="page-counter">
          <span>
            {String(currentPage + 1).padStart(2, "0")}
          </span>

          <span className="page-counter-slash">
            /
          </span>

          <span>
            {String(pages.length).padStart(2, "0")}
          </span>
        </div>

        <button
          className={`music-button ${
            musicPlaying ? "is-playing" : ""
          }`}
          onClick={startMusic}
          aria-label={
            musicPlaying
              ? "Pause music"
              : "Play music"
          }
        >
          {musicPlaying ? (
            <Pause size={16} />
          ) : (
            <Play size={16} />
          )}

          <span>
            {musicPlaying ? "playing" : "music"}
          </span>
        </button>
      </header>

      <main className="page-container">
        {renderPage()}
      </main>

      <nav
        className="page-nav"
        aria-label="Scrapbook navigation"
      >
        <button
          className="nav-arrow"
          onClick={previousPage}
          disabled={currentPage === 0}
          aria-label="Previous page"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="page-dots">
          {pages.map((item, index) => (
            <button
              key={item}
              className={`page-dot ${
                index === currentPage
                  ? "active"
                  : ""
              }`}
              onClick={() => goToPage(index)}
              aria-label={`Go to ${pageLabels[index]} page`}
              title={pageLabels[index]}
            >
              <span />
            </button>
          ))}
        </div>

        <button
          className="nav-arrow"
          onClick={nextPage}
          disabled={
            currentPage === pages.length - 1
          }
          aria-label="Next page"
        >
          <ArrowRight size={18} />
        </button>
      </nav>

      {selectedPhoto && (
        <div
          className="photo-modal"
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100dvh",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            padding: "20px",
            margin: 0,
            overflow: "hidden",
          }}
        >
          <button
            className="modal-close"
            onClick={() =>
              setSelectedPhoto(null)
            }
            aria-label="Close photo"
          >
            <X size={22} />
          </button>

          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
              margin: 0,
              padding: 0,
            }}
          >
            <img
              src={selectedPhoto}
              alt="Scrapbook memory"
              onClick={(event) =>
                event.stopPropagation()
              }
              style={{
                display: "block",
                width: "auto",
                height: "auto",
                maxWidth: "calc(100vw - 40px)",
                maxHeight: "calc(100dvh - 40px)",
                objectFit: "contain",
                objectPosition: "center center",
                margin: "0 auto",
                flex: "0 0 auto",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function CoverPage({
  onOpen,
  musicPlaying,
}: {
  onOpen: () => void;
  musicPlaying: boolean;
}) {
  return (
    <section className="scrap-page cover-page">
      <div className="cover-sticker sticker-pink">
        {siteData.cover.stickerOne}
      </div>

      <div className="cover-sticker sticker-yellow">
        {siteData.cover.stickerTwo}
      </div>

      <div className="cover-sparkle sparkle-one">
        ✦
      </div>

      <div className="cover-sparkle sparkle-two">
        ✦
      </div>

      <div className="cover-grid">
        <div className="cover-copy">
          <div className="eyebrow colorful-eyebrow">
            <Sparkles size={15} />
            {siteData.cover.kicker}
          </div>

          <h1 className="cover-title">
            <span>
              {siteData.cover.titleLineOne}
            </span>

            <strong>
              {siteData.cover.titleHighlight}
            </strong>

            <em>
              {siteData.cover.titleLineThree}
            </em>
          </h1>

          <p className="cover-subtitle">
            {siteData.cover.subtitle}
          </p>

          <div className="cover-person">
            <span>made especially for</span>
            <strong>
              {siteData.personName}
            </strong>
          </div>

          <button
            className="open-button"
            onClick={onOpen}
          >
            <span>OPEN THE SCRAPBOOK</span>
            <ArrowRight size={19} />
          </button>

          <div className="music-hint">
            <Music2 size={14} />

            {musicPlaying
              ? "music is playing ♫"
              : "tap to open + start the music"}
          </div>
        </div>

        <div className="cover-photo-area">
          <div className="cover-paper-back paper-yellow" />
          <div className="cover-paper-back paper-blue" />

          <div className="cover-photo-card">
            <div className="photo-tape" />

            <img
              src="/photos/photo-01.jpg"
              alt="Birthday memory"
            />

            <div className="cover-photo-caption">
              {siteData.cover.photoCaption}

              <Heart
                size={15}
                fill="currentColor"
              />
            </div>
          </div>

          <div className="date-stamp">
            <span>
              {siteData.birthdayMonth}
            </span>

            <strong>
              {siteData.birthdayDay}
            </strong>

            <span>
              {siteData.birthdayYear}
            </span>
          </div>

          <div className="little-label">
            <span>KEEP</span>
            <strong>THIS</strong>
            <span>FOREVER</span>
          </div>
        </div>
      </div>

      <div className="cover-bottom-note">
        <ChevronDown size={16} />
        <span>there's more inside</span>
      </div>
    </section>
  );
}

function HelloPage() {
  return (
    <section className="scrap-page inner-page hello-page">
      <div className="section-heading">
        <span className="section-number">
          {siteData.hello.label}
        </span>

        <h2>
          {siteData.hello.titleLineOne}

          <strong>
            {siteData.hello.titleHighlight}
          </strong>
        </h2>

        <p>{siteData.hello.intro}</p>
      </div>

      <div className="hello-layout">
        <div className="hello-photo-wrap">
          <div className="hello-photo-shadow" />

          <div className="hello-photo">
            <div className="photo-corner corner-a" />
            <div className="photo-corner corner-b" />

            <img
              src="/photos/photo-02.jpg"
              alt="Birthday memory"
            />

            <span className="hello-photo-label">
              LOOK AT YOU!
            </span>
          </div>

          <div className="hand-note">
            <span>psst...</span>

            <strong>
              you made it another year!
            </strong>
          </div>
        </div>

        <div className="hello-copy">
          {siteData.hello.paragraphs.map(
            (paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            )
          )}

          <div className="yellow-note">
            <Sparkles size={17} />

            <span>
              {siteData.hello.note}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MemoriesPage({
  onPhotoClick,
}: {
  onPhotoClick: (image: string) => void;
}) {
  return (
    <section className="scrap-page inner-page memories-page">
      <div className="section-heading centered">
        <span className="section-number">
          02 / MEMORY WALL
        </span>

        <h2>
          little moments,
          <strong>big memories.</strong>
        </h2>

        <p>
          Four tiny pieces of life that deserve
          their own little corners.
        </p>
      </div>

      <div className="memory-grid">
        {siteData.memories.map(
          (memory) => (
            <button
              key={memory.number}
              className="memory-card"
              onClick={() =>
                onPhotoClick(memory.image)
              }
              style={
                {
                  "--rotation": `${memory.rotate}deg`,
                } as CSSProperties
              }
            >
              <div
                className={tapeClass(
                  memory.tape
                )}
              />

              <div className="memory-image">
                <img
                  src={memory.image}
                  alt={memory.title}
                />
              </div>

              <div className="memory-info">
                <span className="memory-number">
                  {memory.number}
                </span>

                <h3>{memory.title}</h3>
                <p>{memory.text}</p>
              </div>
            </button>
          )
        )}
      </div>

      <div className="memory-bottom">
        <span>click a photo ♡</span>
        <div className="scribble-line" />
        <span>to make it bigger</span>
      </div>
    </section>
  );
}

function NotesPage() {
  return (
    <section className="scrap-page inner-page notes-page">
      <div className="notes-top">
        <div className="section-heading">
          <span className="section-number">
            {siteData.notes.label}
          </span>

          <h2>
            {siteData.notes.titleLineOne}

            <strong>
              {siteData.notes.titleHighlight}
            </strong>
          </h2>

          <p>{siteData.notes.intro}</p>
        </div>

        <div className="notes-photo">
          <div className="mini-tape" />

          <img
            src={siteData.notes.photo}
            alt="Birthday memory"
          />

          <span>THIS ONE ♡</span>
        </div>
      </div>

      <div className="note-card-grid">
        {siteData.notes.cards.map(
          (card) => (
            <article
              key={card.number}
              className={`note-card note-${card.color}`}
            >
              <div className="note-card-number">
                {card.number}
              </div>

              <div className="note-doodle">
                {card.doodle}
              </div>

              <h3>{card.title}</h3>
              <p>{card.text}</p>

              <div className="note-card-line" />
            </article>
          )
        )}
      </div>

      <div className="notes-footer">
        <span>
          little reminders from me to you
        </span>

        <Heart
          size={18}
          fill="currentColor"
        />
      </div>
    </section>
  );
}

function VideoPage() {
  return (
    <section className="scrap-page inner-page video-page">
      <div className="section-heading centered">
        <span className="section-number">
          {siteData.video.label}
        </span>

        <h2>
          {siteData.video.titleLineOne}

          <strong>
            {siteData.video.titleHighlight}
          </strong>
        </h2>

        <p>
          {siteData.video.subtitle}
        </p>
      </div>

      <div className="video-stage">
        <div className="video-paper-back video-paper-yellow" />
        <div className="video-paper-back video-paper-pink" />

        <div className="video-card">
          <div className="video-tape tape-yellow" />

          <video
            controls
            playsInline
            preload="metadata"
            src={siteData.video.videoFile}
          >
            Your browser does not support
            the video tag.
          </video>

          <div className="video-caption">
            <div>
              <span>MEMORY NO. 05</span>

              <strong>
                a little moving picture
              </strong>
            </div>

            <div className="video-heart">
              <Heart
                size={20}
                fill="currentColor"
              />
            </div>
          </div>
        </div>

        <div className="video-sticker">
          <Play
            size={15}
            fill="currentColor"
          />

          <span>
            {siteData.video.sticker}
          </span>
        </div>
      </div>
    </section>
  );
}

function PhotosPage({
  onPhotoClick,
}: {
  onPhotoClick: (image: string) => void;
}) {
  return (
    <section className="scrap-page inner-page photos-page">
      <div className="section-heading">
        <span className="section-number">
          {siteData.photos.label}
        </span>

        <h2>
          {siteData.photos.titleLineOne}

          <strong>
            {siteData.photos.titleHighlight}
          </strong>
        </h2>

        <p>
          {siteData.photos.subtitle}
        </p>
      </div>

      <div className="photo-dump">
        {siteData.photos.photos.map(
          (photo, index) => (
            <button
              key={photo.image}
              className={`dump-photo dump-photo-${
                index + 1
              }`}
              onClick={() =>
                onPhotoClick(photo.image)
              }
              style={
                {
                  "--rotation": `${photo.rotate}deg`,
                } as CSSProperties
              }
            >
              <div
                className={tapeClass(
                  photo.tape
                )}
              />

              <div className="dump-image">
                <img
                  src={photo.image}
                  alt={photo.label}
                />
              </div>

              <span>{photo.label}</span>
            </button>
          )
        )}

        <div className="photo-dump-note">
          <Sparkles size={20} />

          <strong>
            NO
            <br />
            PARTICULAR
            <br />
            ORDER
          </strong>

          <span>
            just the good stuff
          </span>
        </div>
      </div>

      <div className="photo-page-footer">
        <span>
          photo pile complete ♡
        </span>
      </div>
    </section>
  );
}

function LetterPage() {
  return (
    <section className="scrap-page inner-page letter-page">
      <div className="letter-side-label">
        <span>06</span>
        <span>ONE LAST NOTE</span>
      </div>

      <div className="letter-paper">
        <div className="letter-holes">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="letter-top">
          <span>
            {siteData.letter.label}
          </span>

          <div className="letter-doodle">
            ♡
          </div>
        </div>

        <div className="letter-content">
          <span className="letter-small">
            {siteData.letter.sideNote}
          </span>

          <h2>
            {siteData.letter.greeting}
          </h2>

          {siteData.letter.paragraphs.map(
            (paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            )
          )}

          <div className="letter-ending">
            <span>
              {siteData.letter.endingLineOne}
            </span>

            <strong>
              {siteData.letter.endingLineTwo}
            </strong>
          </div>
        </div>

        <div className="letter-sticker">
          <Heart
            size={17}
            fill="currentColor"
          />

          <span>KEEP THIS</span>
        </div>
      </div>
    </section>
  );
}

function EndingPage() {
  return (
    <section className="scrap-page ending-page">
      <div
        className="ending-confetti"
        aria-hidden="true"
      >
        <span>✦</span>
        <span>♡</span>
        <span>✿</span>
        <span>✦</span>
        <span>♡</span>
        <span>✦</span>
      </div>

      <div className="ending-sticker ending-sticker-left">
        {siteData.ending.stickerOne}
      </div>

      <div className="ending-sticker ending-sticker-right">
        {siteData.ending.stickerTwo}
      </div>

      <div className="ending-content">
        <span className="ending-small">
          {siteData.ending.smallText}
        </span>

        <h2>
          <span>
            {siteData.ending.titleLineOne}
          </span>

          <strong>
            {siteData.ending.titleHighlight}
          </strong>

          <em>
            {siteData.ending.titleLineThree}
          </em>
        </h2>

        <p>
          {siteData.ending.message}
        </p>

        <div className="ending-heart">
          <Heart
            size={30}
            fill="currentColor"
          />
        </div>

        <div className="ending-names">
          <span>
            made especially for
          </span>

          <strong>
            {siteData.personName}
          </strong>

          <small>
            from {siteData.senderName}
          </small>
        </div>

        <button
          className="restart-button"
          onClick={() =>
            window.scrollTo({ top: 0 })
          }
        >
          <Sparkles size={16} />
          read it again
        </button>
      </div>
    </section>
  );
}

export default App;

