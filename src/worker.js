export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname;
    if (path.endsWith('/docs')) {
      return Response.redirect(new URL(path + '/', url), 301);
    }
    const response = await env.ASSETS.fetch(request);
    if (response.status === 404) {
      return new Response('<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>404</title></head><body style="background:#0d1117;color:#e6edf3;font-family:sans-serif;padding:3rem"><h1 style="color:#ff7b72">404</h1><p>Página no encontrada.</p><a href="/" style="color:#79c0ff">Volver al inicio</a></body></html>', { status: 404, headers: { 'content-type': 'text/html; charset=utf-8' } });
    }
    return response;
  },
};