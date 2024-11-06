export function onRequest(context) {
  return new Response(`Hello world. Api functional. ${context}`)
}
