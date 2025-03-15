import { queryOptions } from '@tanstack/react-query';

import { getFileOperations } from '.';
import { FileOperationsSchema } from '../model';

export const developerFileOperationsQueryOptions = queryOptions<FileOperationsSchema[]>({
  queryKey: ['developer_file_operations'],
  queryFn: getFileOperations,
});
