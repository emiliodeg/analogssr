import { defineEventHandler } from 'h3';
import { createClient } from '../../../supabase';
import { ServerRequest } from '@analogjs/router/tokens';
import { fail, json } from '@analogjs/router/server/actions';

export default defineEventHandler(async (event) => {
  const client = createClient({ req: event.node.req as ServerRequest, res: event.node.res });

  const { data, error } = await client
    .from('colors')
    .select('name')
    .range(5, 10);

    if (error) return fail(422, { email: 'Email is required' });

    return json({ countries: data ?? [] });
});
