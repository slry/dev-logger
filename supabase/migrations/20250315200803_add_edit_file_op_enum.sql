alter type "public"."file_operation" rename to "file_operation__old_version_to_be_dropped";

create type "public"."file_operation" as enum ('DELETE', 'CREATE', 'EDIT');

alter table "public"."developer_file_operations" alter column operation type "public"."file_operation" using operation::text::"public"."file_operation";

drop type "public"."file_operation__old_version_to_be_dropped";


