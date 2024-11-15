import { createExecutionContext } from 'cloudflare:test';
import { describe, it, expect, vi, afterEach } from 'vitest';
import worker, { res } from '../src/index';

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

const mockEnv = {
	BLOG_VIEWS: {
		get: vi.fn(),
		put: vi.fn(),
	},
};

describe('worker tests', () => {
	const ctx = createExecutionContext();

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('GET: returns 400 when blogid is missing in url', async () => {
		const request = new IncomingRequest('https://example.com');
		const response = await worker.fetch(request, mockEnv, ctx);

		expect(response.status).toBe(400);
		const data: res = await response.json();
		expect(data.message).toBe('Missing blogid');
	});

	it('GET: returns 404 when blog does not exist in kv', async () => {
		mockEnv.BLOG_VIEWS.get.mockResolvedValueOnce(null);
		const request = new IncomingRequest('https://example.com?blogid=1', { method: 'GET' });
		const response = await worker.fetch(request, mockEnv, ctx);

		expect(response.status).toBe(404);
		const data: res = await response.json();
		expect(data.message).toBe('1: Blog not found');
	});

	it('GET: returns view count when blog exists', async () => {
		mockEnv.BLOG_VIEWS.get.mockResolvedValueOnce(10);
		const request = new IncomingRequest('https://example.com?blogid=1', { method: 'GET' });
		const response = await worker.fetch(request, mockEnv, ctx);

		expect(response.status).toBe(200);
		const data: res = await response.json();
		expect(data.message).toBe('Get view count successfully!');
		expect(data.viewcount).toBe(10);
		expect(data.blogid).toBe('1');
	});

	it('POST: increments view count when blog exists', async () => {
		mockEnv.BLOG_VIEWS.get.mockResolvedValueOnce('10');
		mockEnv.BLOG_VIEWS.put.mockResolvedValueOnce(undefined);
		const request = new IncomingRequest('https://example.com?blogid=1', { method: 'POST' });
		const response = await worker.fetch(request, mockEnv, ctx);

		expect(response.status).toBe(200);
		const data: res = await response.json();
		expect(data.message).toBe('Update view count successfully!');
		expect(data.viewcount).toBe(11);
		expect(data.blogid).toBe('1');
		expect(mockEnv.BLOG_VIEWS.put).toHaveBeenCalledWith('1', '11');
	});

	it('POST: returns 404 when blog does not exist in kv', async () => {
		mockEnv.BLOG_VIEWS.get.mockResolvedValueOnce(null);
		const request = new IncomingRequest('https://example.com?blogid=1', { method: 'POST' });
		const response = await worker.fetch(request, mockEnv, ctx);

		expect(response.status).toBe(404);
		const data: res = await response.json();
		expect(data.message).toBe('1: Blog not found');
	});

	it('returns 405 for unsupported HTTP methods', async () => {
		const request = new IncomingRequest('https://example.com?blogid=1', { method: 'PUT' });
		const response = await worker.fetch(request, mockEnv, ctx);

		expect(response.status).toBe(405);
		const data: res = await response.json();
		expect(data.message).toBe('Method not allowed');
	});
});
