import { queryOptions } from '@tanstack/react-query';

import { getLocPerFile } from '.';
import { LocPerFileSchema } from '../model';

export const developerLocPerFileQueryOptions = queryOptions<LocPerFileSchema[]>({
  queryKey: ['developer_total_loc'],
  queryFn: getLocPerFile,
});
