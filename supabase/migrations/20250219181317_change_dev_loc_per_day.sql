alter table "public"."developer_loc_per_day" drop column "loc";

alter table "public"."developer_loc_per_day" add column "loc_added" bigint not null default '0'::bigint;

alter table "public"."developer_loc_per_day" add column "loc_removed" bigint not null default '0'::bigint;


