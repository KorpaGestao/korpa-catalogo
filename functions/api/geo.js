// Devolve a cidade/estado aproximados de quem acessa o site.
// A Cloudflare ja sabe isso pelo IP (request.cf) — nada e pedido a cliente
// e o IP nao e guardado em lugar nenhum.
export async function onRequest(context) {
  var cf = (context.request && context.request.cf) || {};
  var body = JSON.stringify({
    cidade: cf.city || null,
    estado: cf.regionCode || cf.region || null,
    pais: cf.country || null
  });
  return new Response(body, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
