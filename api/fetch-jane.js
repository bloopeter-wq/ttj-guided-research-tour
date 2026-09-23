export default async function handler(req, res) {
  try {
    const response = await fetch('https://ttjmessagetesting.tempurl.host/pages/explore-v2.html', {
      headers: { 'user-agent': 'Mozilla/5.0' }
    });
    const text = await response.text();
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(response.status).send(text);
  } catch (error) {
    res.status(500).send(String(error && error.stack ? error.stack : error));
  }
}
