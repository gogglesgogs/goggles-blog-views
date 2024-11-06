export function onRequest(context) {
  const c = context;
  const p = context.params;
  const t = context.params.test;
  
  return new Response(JSON.stringify({ 
    return_data: JSON.stringify(c),
    
    params_data: p,
    params_json: JSON.stringify(p),
    params_type: typeof p,
    
    test_data: t,
    test_json: JSON.stringify(t),
    test_type: typeof t,
  }));
}
