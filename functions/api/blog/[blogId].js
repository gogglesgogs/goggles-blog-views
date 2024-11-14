const blogs = ["blog1", "blog2"];

export async function onRequestGet(context) {
  const view = await context.env.BLOG_VIEWS.get("blog1");
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
