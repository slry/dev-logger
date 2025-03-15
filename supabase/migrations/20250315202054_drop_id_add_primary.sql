alter table "public"."developer_file_operations" drop constraint "developer_file_operations_pkey";

drop index if exists "public"."developer_file_operations_pkey";

alter table "public"."developer_file_operations" drop column "id";

CREATE UNIQUE INDEX developer_file_operations_pkey ON public.developer_file_operations USING btree (filename, operation);

alter table "public"."developer_file_operations" add constraint "developer_file_operations_pkey" PRIMARY KEY using index "developer_file_operations_pkey";


