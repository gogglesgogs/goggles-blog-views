export async function onRequestGet(context) {
  const view = await context.env.BLOG_VIEWS.get("blog1");
  return new Response(JSON.stringify({ 
    id: context.params.blogId,
    view }));
}
