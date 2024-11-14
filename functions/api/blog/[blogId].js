const blogs = ["blog1", "blog2"];

export async function onRequestGet(context) {
  const view = await context.env.BLOG_VIEWS.get(context.params.blogId);
  if (!view) {
    return new Response(JSON.stringify({
      error: 404,
      message: `${context.params.blogId}: blog not found`
    }));
  }
  return new Response(JSON.stringify({ 
    id: context.params.blogId,
    views: view,
  }));
}

export async function onRequestPost(context) {
  return new Response(JSON.stringify({ 
    hello: "world",
  }));
}
