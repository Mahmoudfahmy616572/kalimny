alter table public.user_preferences
  add column if not exists placement_done boolean not null default false,
  add column if not exists placement_level text check (placement_level in ('A1','A2','B1','B2','C1','C2')),
  add column if not exists placement_confidence numeric(3,2),
  add column if not exists placement_source text check (placement_source in ('ai','self')) default 'self';
