const formats = ["png", "jpg", "webp", "avif"];
const sizes = ["32", "64", "128", "196", "256", "300", "400", "500"];

function response(res, code) {
  return new Response(JSON.stringify(res, { status: code }))
};
  
export function onRequest(context) {
  const format = context.params.img[0];
  const size = context.params.img[1];
  
  if (!formats.includes(format)) 
    return response(`Invalid format: ${format}`, 400);
  if (!formats.includes(size))
    return response(`Invalid size: ${size}`, 400);
  
  return response(`goggles-${format}-${size}.${format}`, 200);
}
