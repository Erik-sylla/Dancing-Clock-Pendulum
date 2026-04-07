// Cloud Function: pendulumDefaults
// Returns JSON configuration for the DancingClockPendulum app.

exports.pendulumDefaults = async (req, res) => {
  try {
    // Hard-coded defaults (Iteration 4 baseline)
    const config = {
      hourLen:    100,
      minLen:     200,
      stringLen:  500,
      speed:       60,
      trailMax:  20000,
      lineWidth:  1.2,
      zoom:       80,     // percent
      offsetY:      0,
      palette:      0
    };
    //const { Firestore } = require("@google-cloud/firestore");
    //const db = new Firestore();

    //const doc = await db.collection("pendulum").doc("defaults").get();
    //const config = doc.data();

    res.set("Content-Type", "application/json");
    res.status(200).send(config);

  } catch (err) {
    console.error("Error generating pendulum defaults:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
};