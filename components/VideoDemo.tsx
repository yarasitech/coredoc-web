import styles from "./VideoDemo.module.css";

export default function VideoDemo() {
  return (
    <div className={styles.container}>
      <div className={styles.videoWrapper}>
        <iframe
          className={styles.video}
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