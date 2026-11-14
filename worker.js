export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let key;

    try {
      // URL.pathname keeps spaces percent-encoded (for example, %20).
      // Decode it so the key matches the exact R2 object name.
      key = decodeURIComponent(url.pathname.slice(1));
    } catch {
      return new Response('Invalid URL encoding', { status: 400 });
    }

    if (!key) {
      return new Response('Grizelle 3D Asset Proxy is active', { status: 200 });
    }

    const object = await env.MY_BUCKET.get(key);
    if (object === null) {
      return new Response('File not found', { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }
    if (request.method === 'HEAD') {
      return new Response(null, { headers });
    }

    return new Response(object.body, { headers });
  },
};
