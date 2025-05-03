import { queryOptions } from '@tanstack/react-query';

import { getFileOperations } from './actions';
import { FileOperationsSchema } from '../model';

export const developerFileOperationsQueryOptions = (teamId: string, userId: string) =>
  queryOptions<FileOperationsSchema[]>({
    queryKey: ['developer_file_operations', teamId, userId],
    queryFn: () => getFileOperations(teamId, userId),
  });
