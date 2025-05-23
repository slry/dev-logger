import { LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

import { RemoveGitlabRepoDialog } from '@/features/remove-gitlab-repo/ui';
import { Badge } from '@/shared/shadcn/ui/badge';
import { TableCell, TableRow } from '@/shared/ui/table';

import { GitlabRepoSchema } from '../../model';

export const GitlabRepoListItem: FC<GitlabRepoSchema> = ({
  name,
  description,
  url,
  teamId,
}) => {
  return (
    <TableRow className="last:border-b-0">
      <TableCell className="max-w-[300px] items-center truncate">{name}</TableCell>
      <TableCell>
        <div className="flex items-center justify-center">
          <Badge>
            <Link href={url} className="flex items-center gap-1">
              <span>Link</span>
              <LinkIcon className="size-4" />
            </Link>
          </Badge>
        </div>
      </TableCell>
      <TableCell>{description || 'No project description'}</TableCell>
      <TableCell>
        <RemoveGitlabRepoDialog teamId={teamId} repoUrl={url} />
      </TableCell>
    </TableRow>
  );
};
