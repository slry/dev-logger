alter table "public"."developer_loc_per_day" drop constraint "developer_loc_per_day_pkey";

drop index if exists "public"."developer_loc_per_day_pkey";

alter table "public"."developer_loc_per_day" drop column "id";

CREATE UNIQUE INDEX developer_loc_per_day_pkey ON public.developer_loc_per_day USING btree (datetime);

alter table "public"."developer_loc_per_day" add constraint "developer_loc_per_day_pkey" PRIMARY KEY using index "developer_loc_per_day_pkey";


