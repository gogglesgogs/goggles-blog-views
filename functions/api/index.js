export function onRequest(context) {
  return new Response({
    data: JSON.stringify(context),
    env: `Hello ${context.env.hello}`,
    kv: `Hello ${context.env.kv.get('hello')}`,
  });
}
