export function onRequest(context) {
  return new Response(JSON.stringify({
    data: JSON.stringify(context),
    env: `Hello ${context.env.hello}`,
    kv: `Hello ${context.env.kv.get('hello')}`,
  }));
}
