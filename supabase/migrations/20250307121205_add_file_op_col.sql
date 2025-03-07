create type "public"."file_operation" as enum ('DELETE', 'CREATE');

alter table "public"."developer_file_operations" add column "operation" file_operation not null;


