import "./index.css";
export default function Attachments({ imgs, videos }) {
  console.log("froom attachments", { imgs, videos });
  return (
    <div className="attachments-container">
      <div>
        {videos.map((video, i) => (
          <video muted controls className="attachments-videos">
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
      <div>
        {imgs.map((img, i) => (
          <img src={img.url} className="attachments-imgs" />
        ))}
      </div>
    </div>
  );
  z;
}
