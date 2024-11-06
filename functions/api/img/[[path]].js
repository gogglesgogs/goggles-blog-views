export function onRequest(context) {
  return new Response(JSON.stringify({ 
    data: JSON.stringify(context),
    params: JSON.stringify(context.params),
    params_type: typeof context.params,
    path: JSON.stringify(context.params.path),
    path_type: typeof context.params.path,
  }));
}
