const ComfyJS = require("comfy.js");
const { default: OBSWebSocket } = require('obs-websocket-js');

// Create an OBS WebSocket instance
const obs = new OBSWebSocket();

// Connect to the OBS WebSocket server
obs.connect('ws://localhost:4455', 'password').then((info) => {
	console.log('Connected and identified', info)
}, () => {
	console.error('Error Connecting')
});

// Start and stop streaming functions
const startStreaming = async () => {
  try {
    await obs.call("StartRecord");
    //await obs.call("StartRecording");
    console.log("Started streaming");
  } catch (error) {
    console.error("Failed to start streaming:", error);
  }
};

const stopStreaming = async () => {
  try {
    await obs.call("StopRecord");
    //await obs.call("StopRecording");
    console.log("Stopped streaming");
  } catch (error) {
    console.error("Failed to stop streaming:", error);
  }
};

// Initialize ComfyJS
ComfyJS.Init('twitchusername', 'token');


// Handle chat commands
ComfyJS.onCommand = (user, command, message, flags, extra) => {
  if (flags.broadcaster || flags.mod) { // Allow only streamer control only
    if (command === "startstream") {
      startStreaming();
    } else if (command === "stopstream") {
      stopStreaming();
    }
  }
};
