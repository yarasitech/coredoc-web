export default function VideoDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Coredoc Demo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}