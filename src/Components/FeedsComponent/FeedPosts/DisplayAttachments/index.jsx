import "./index.css";

export default function Attachments({ imgs, videos }) {
  return (
    <div className="attachments-container">
      {videos.map((video) => (
        <div className="attachment-item" key={video.id}>
          <video muted controls className="attachment-video">
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}

      {imgs.map((img) => (
        <div className="attachment-item" key={img.id}>
          <img src={img.url} loading="lazy" className="attachment-img" />
        </div>
      ))}
    </div>
  );
}
