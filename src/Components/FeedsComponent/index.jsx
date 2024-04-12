export default function Feeds() {
  const fetchFeeds = () => {
    fetch(
      "https://rigi-react-assignment-ii-server-production.up.railway.app/api/posts/1",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "XM0ooo4EG8puK9EPQ16M3KGxSA3ZsCKS",
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  fetchFeeds();
  return <div>From Feed</div>;
}
