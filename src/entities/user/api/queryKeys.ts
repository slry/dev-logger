import { queryOptions } from '@tanstack/react-query';

import { getUser } from './actions';
import { UserSchema } from '../model';

export const userQueryOptions = queryOptions<UserSchema>({
  queryKey: ['user'],
  queryFn: getUser,
});
