import { PageServerLoad } from '@analogjs/router';
import { ServerRequest } from '@analogjs/router/tokens';
import { createClient } from '../../server/supabase';

export async function load({ event }: PageServerLoad) {
  const { req, res } = event.node;
  const client = createClient({ req: req as ServerRequest, res });

  const { data: countries } = await client
    .from('colors')
    .select('name')
    .limit(5);

  console.log('countries', countries);

  return { countries: countries ?? [] };
}
