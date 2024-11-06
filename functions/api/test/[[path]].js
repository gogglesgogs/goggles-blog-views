export function onRequest(context) {
  return new Response(JSON.stringify({ 
    return_data: JSON.stringify(context),
    
    params_data: context.params,
    params_json: JSON.stringify(context.params),
    params_type: typeof context.params,
    
    path_data: context.params.path,
    path_json: JSON.stringify(context.params.path),
    path_type: typeof context.params.path,
  }));
}
