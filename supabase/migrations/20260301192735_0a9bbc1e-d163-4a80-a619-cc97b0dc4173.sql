
-- Create campaigns table for limited-time promotions
CREATE TABLE public.campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  discount_percent INTEGER,
  badge_text TEXT NOT NULL DEFAULT 'Endirim',
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- Anyone can read active campaigns (public-facing)
CREATE POLICY "Anyone can read active campaigns"
ON public.campaigns
FOR SELECT
USING (is_active = true AND now() BETWEEN start_date AND end_date);

-- Admins can manage all campaigns
CREATE POLICY "Admins can manage campaigns"
ON public.campaigns
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());
