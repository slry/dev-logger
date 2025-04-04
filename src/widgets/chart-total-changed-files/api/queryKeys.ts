import { queryOptions } from '@tanstack/react-query';

import { getFileOperations } from '.';
import { FileOperationsSchema } from '../model';

export const developerFileOperationsQueryOptions = (teamId: string) =>
  queryOptions<FileOperationsSchema[]>({
    queryKey: ['developer_file_operations', teamId],
    queryFn: () => getFileOperations(teamId),
  });
