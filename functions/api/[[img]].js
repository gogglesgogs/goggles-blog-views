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

function getImage(image) {
  let str = '';
  try {
    fetch(`https://gogsplayground.pages.dev/images/${image}`)
      .then(res => response.arrayBuffer())
      .then(data => str = data.toString('base64'));
    return str
  } catch (err) {
    return null
  }
};
  
export async function onRequest(context) {
  if (!context.params.img) 
    return response({
      status: 400,
      message: 'Please provide /format and /size',
      valid_params,
    });
  
  let format = context.params.img[0];
  let size = parseInt(context.params.img[1]);
  
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

  let image = `goggles-${format}-${size}.${format}`;

  let base64str = getImage(image);

  // if (!base64str) 
  //  return response({
  //    status: 500,
  //    message: `Failed to fetch image: ${image}`,
  //    valid_params,
  //  });
  
  return response({
    url: `http://gogsplayground.pages.dev/images/${image}`,
    image: `data:image/${format};base64,${base64str}`,
    format: format,
    height: size,
    width: size,
    valid_params,
  });
}
