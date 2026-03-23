import axios from "axios";

export const sendToSolarWinds = async (log) => {
  if (!process.env.SOLARWINDS_TOKEN) return;

  try {
    await axios.post("https://api.solarwinds.com/logs", log, {
      headers: {
        Authorization: `Bearer ${process.env.SOLARWINDS_TOKEN}`
      }
    });
  } catch (err) {
    console.error("SolarWinds error:", err.message);
  }
};