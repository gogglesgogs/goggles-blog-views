const formats = ["png", "jpg", "webp", "avif"];
const sizes = [32, 64, 128, 196, 256, 320, 400, 500];
const valid_params = {
  formats: formats,
  sizes: sizes,
};

function response(res) {
  return new Response(
    JSON.stringify(res, null, 2), 
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
};
  
export function onRequest(context) {
  if (!context.params.img) 
    return response({
      status: 400,
      message: 'Please provide /format and /size',
      valid_params,
    });
  
  const format = context.params.img[0];
  const size = parseInt(context.params.img[1]);
  
  if (!format)
    return response({ 
      status: 400,
      message: 'Please provide /format',
      valid_params,
    });

  if (!size)
    return response({
      status: 400,
      message: 'Please provide /size',
      valid_params,
    });
  
  if (!formats.includes(format)) 
    return response({
      status: 400,
      message: `Invalid format: ${format}`,
      valid_params,
    });
  
  if (!sizes.includes(size))
    return response({
      status: 400,
      message: `Invalid size: ${size}`,
      valid_params,
    });

  if (format == 'jpg') format = 'jpeg';
  
  return response({
    url: `http://goggles.pages.dev/image/goggles-${format}-${size}.${format}`,
    image: `data:image/${format};base64,{PLACEHOLDER}`,
    format: format,
    height: size,
    width: size,
    valid_params,
  });
}
