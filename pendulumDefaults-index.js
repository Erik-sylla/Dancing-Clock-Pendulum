/**
 * Google Cloud Function: pendulumDefaults
 *
 * Returns the default configuration for the Clock String Pendulum visualiser.
 * The HTML page fetches this on load and initialises all sliders from the response.
 *
 * Deploy with:
 *   gcloud functions deploy pendulumDefaults \
 *     --runtime nodejs20 \
 *     --trigger-http \
 *     --allow-unauthenticated \
 *     --region YOUR_REGION
 *
 * After deployment, copy the printed URL into the HTML file's CONFIG_URL constant.
 */

/**
 * Default configuration values.
 * Edit these to change what the visualiser starts with.
 *
 * Fields:
 *   hourLen    {number}  Hour hand length in px         (0–200)
 *   minLen     {number}  Minute hand length in px        (0–200)
 *   stringLen  {number}  String length in px            (50–700)
 *   speed      {number}  Simulation speed multiplier    (1–3600)
 *   trailMax   {number}  Max trail segments             (100–100000)
 *   lineWidth  {number}  Stroke width in px             (0.3–4)
 *   zoom       {number}  Zoom level in percent          (5–100)
 *   offsetY    {number}  Vertical offset in logical px  (-400–400)
 *   palette    {number}  Colour palette index           (0–5)
 *                          0 = Aurora, 1 = Fire, 2 = Ocean,
 *                          3 = Mono,   4 = Forest, 5 = Neon
 */
const DEFAULTS = {
  hourLen:    120,
  minLen:     160,
  stringLen:  350,
  speed:       600,
  trailMax:  80000,
  lineWidth:   1.2,
  zoom:        100,
  offsetY:       0,
  palette:       0,
};

/**
 * HTTP Cloud Function entry point.
 * @param {import('@google-cloud/functions-framework').Request}  req
 * @param {import('@google-cloud/functions-framework').Response} res
 */
exports.pendulumDefaults = (req, res) => {
  // Allow the HTML page to call this from any origin (CORS).
  // Restrict to your domain in production if preferred, e.g.:
  //   res.set('Access-Control-Allow-Origin', 'https://your-app.example.com');
  res.set('Access-Control-Allow-Origin', '*');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    return res.status(204).send('');
  }

  // Only accept GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.set('Content-Type', 'application/json');
  // Cache for 60 seconds on the client; adjust as needed
  res.set('Cache-Control', 'public, max-age=60');

  return res.status(200).json(DEFAULTS);
};
