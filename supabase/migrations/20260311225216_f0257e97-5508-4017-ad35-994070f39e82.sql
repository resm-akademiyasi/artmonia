
CREATE TABLE public.teachers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  photo_url TEXT,
  specialties TEXT[] DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published teachers"
  ON public.teachers
  FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Admins can manage teachers"
  ON public.teachers
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());
