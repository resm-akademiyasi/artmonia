
CREATE TABLE public.success_stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  testimonial TEXT NOT NULL,
  thumbnail_url TEXT,
  video_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published stories"
  ON public.success_stories
  FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Admins can manage stories"
  ON public.success_stories
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());
