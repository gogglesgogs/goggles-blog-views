export function onRequest(context) {
  return new Response(JSON.stringify({
    env: `Hello ${context.env.hello}`,
    kv: `Hello ${context.env.kv.get('hello')}`,
  }))
}
