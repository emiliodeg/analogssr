import { ServerContext } from '@analogjs/router/tokens';
import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';

export function createClient(context: ServerContext) {
  return createServerClient(process.env['VITE_SUPABASE_DATABASE_URL']!, process.env['VITE_SUPABASE_ANON_KEY']!, {
    cookies: {
      getAll() {
        const cookies = parseCookieHeader(context.req.headers.cookie ?? '');
        return cookies
          .filter((cookie) => typeof cookie.value === 'string')
          .map((cookie) => ({
            name: cookie.name,
            value: cookie.value as string,
          }));
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          context.res.appendHeader('Set-Cookie', serializeCookieHeader(name, value, options))
        )
      },
    },
  })
}