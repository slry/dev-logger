import { queryOptions } from '@tanstack/react-query';

import { getLocPerFile } from '.';
import { LocPerFileSchema } from '../model';

export const developerLocPerFileQueryOptions = queryOptions<LocPerFileSchema[]>({
  queryKey: ['developer_loc_per_file'],
  queryFn: getLocPerFile,
});
