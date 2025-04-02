import { queryOptions } from '@tanstack/react-query';

import { UserSchema } from '.';
import { getUser } from '../api';

export const userQueryOptions = queryOptions<UserSchema>({
  queryKey: ['user'],
  queryFn: getUser,
});
