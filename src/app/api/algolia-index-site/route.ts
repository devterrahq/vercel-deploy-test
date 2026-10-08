import { SiteSearchHandler } from '@/helpers/algolia/site-search-handler';
import { setupStoryblokInit } from '@/helpers/storyblok-init';

export async function POST(request: Request) {
  if (!request.headers.has('Authorization')) {
    return new Response('No Authorization header detected', { status: 400 });
  }

  const authToken = request.headers.get('Authorization');
  if (authToken !== process.env.API_ADMIN_SECRET) {
    return new Response('Token invalid', { status: 401 });
  }

  try {
    const search = new SiteSearchHandler();

    setupStoryblokInit();

    const res = await search.indexAllPages();
    return Response.json(
      {
        res,
        success: true,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        {
          error: error.message,
        },
        {
          status: 500,
        },
      );
    } else {
      return Response.json(
        {
          error: error,
        },
        {
          status: 500,
        },
      );
    }
  }
}
