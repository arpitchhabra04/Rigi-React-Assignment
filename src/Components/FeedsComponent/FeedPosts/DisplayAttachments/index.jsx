// import "./index.css";
// export default function Attachments({ imgs, videos }) {
//   console.log("froom attachments", { imgs, videos });
//   return (
//     <div className="attachments-container">
//       <div>
//         {videos.map((video, i) => (
//           <video muted controls className="attachments-videos">
//             <source src={video.url} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         ))}
//       </div>
//       <div>
//         {imgs.map((img, i) => (
//           <img src={img.url} className="attachments-imgs" />
//         ))}
//       </div>
//     </div>
//   );
//   z;
// }

import "./index.css";

export default function Attachments({ imgs, videos }) {
  console.log("from attachments", { imgs, videos });

  return (
    <div className="attachments-container">
      {/* Render videos */}
      {videos.map((video) => (
        <div className="attachment-item" key={video.id}>
          <video muted controls className="attachment-video">
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}

      {/* Render images */}
      {imgs.map((img) => (
        <div className="attachment-item" key={img.id}>
          <img src={img.url} className="attachment-img" />
        </div>
      ))}
    </div>
  );
}
