export interface res {
	message: string;
	blogid?: string;
	viewcount?: number;
}

function response(res?: res, opts?: ResponseInit): Response {
	return new Response(JSON.stringify(res), { headers: { 'Content-Type': 'application/json' }, ...opts });
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		const blogid = url.searchParams.get('blogid');

		if (!blogid)
			return response(
				{
					message: 'Missing blogid',
				},
				{ status: 400 }
			);

		switch (request.method) {
			case 'GET': {
				const view = await env.BLOG_VIEWS.get(blogid);
				if (!view) {
					return response(
						{
							message: `${blogid}: Blog not found`,
							blogid,
						},
						{ status: 404 }
					);
				}
				return response(
					{
						message: `Returned view count successfully!`,
						viewcount: parseInt(view),
						blogid,
					},
					{ status: 200 }
				);
			}
			case 'POST': {
				const currentView = await env.BLOG_VIEWS.get(blogid);
				if (!currentView) {
					return response(
						{
							message: `${blogid}: Blog not found`,
							blogid,
						},
						{ status: 404 }
					);
				}
				const newView = parseInt(currentView) + 1;
				await env.BLOG_VIEWS.put(blogid, newView.toString());
				return response(
					{
						message: 'Stored successfully!',
						blogid,
						viewcount: newView,
					},
					{ status: 200 }
				);
			}
			default:
				return response(
					{
						message: 'Method not allowed',
					},
					{ status: 405 }
				);
		}
	},
} satisfies ExportedHandler<Env>;
