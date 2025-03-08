alter table "public"."developer_total_loc" alter column "loc_added" set default '0'::bigint;

alter table "public"."developer_total_loc" alter column "loc_added" set not null;

alter table "public"."developer_total_loc" alter column "loc_removed" set default '0'::bigint;

alter table "public"."developer_total_loc" alter column "loc_removed" set not null;


