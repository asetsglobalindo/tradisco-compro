import L from "leaflet";

const LefleatMapIcon = {
  SPBU: new L.Icon({
    iconUrl: "/icons/spbu-marker.png",
    iconRetinaUrl: "/icons/spbu-marker.png",
    popupAnchor: [-10, -50],
    className: "lefleat-spbu-marker",
    iconSize: [32, 45],
  }),
  myLocation: new L.Icon({
    iconUrl: "/icons/my-location.png",
    iconRetinaUrl: "/icons/my-location.png",
    popupAnchor: [-0, -0],
    className: "lefleat-spbu-marker",
    iconSize: [15, 15],
  }),
};

export default LefleatMapIcon;
