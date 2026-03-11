
-- Fix news policies: drop restrictive, recreate as permissive
DROP POLICY IF EXISTS "Anyone can read published news" ON public.news;
CREATE POLICY "Anyone can read published news"
  ON public.news FOR SELECT
  TO public
  USING (is_published = true);

DROP POLICY IF EXISTS "Admins can manage news" ON public.news;
CREATE POLICY "Admins can manage news"
  ON public.news FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Fix student_results policies
DROP POLICY IF EXISTS "Anyone can read published results" ON public.student_results;
CREATE POLICY "Anyone can read published results"
  ON public.student_results FOR SELECT
  TO public
  USING (is_published = true);

DROP POLICY IF EXISTS "Admins can manage results" ON public.student_results;
CREATE POLICY "Admins can manage results"
  ON public.student_results FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Fix campaigns policies
DROP POLICY IF EXISTS "Anyone can read active campaigns" ON public.campaigns;
CREATE POLICY "Anyone can read active campaigns"
  ON public.campaigns FOR SELECT
  TO public
  USING (is_active = true AND now() >= start_date AND now() <= end_date);

DROP POLICY IF EXISTS "Admins can manage campaigns" ON public.campaigns;
CREATE POLICY "Admins can manage campaigns"
  ON public.campaigns FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Fix events policies
DROP POLICY IF EXISTS "Anyone can insert events" ON public.events;
CREATE POLICY "Anyone can insert events"
  ON public.events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read events" ON public.events;
CREATE POLICY "Admins can read events"
  ON public.events FOR SELECT
  TO authenticated
  USING (is_admin());

-- Fix leads policies
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
CREATE POLICY "Anyone can insert leads"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read leads" ON public.leads;
CREATE POLICY "Admins can read leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (is_admin());

-- Fix user_roles policies
DROP POLICY IF EXISTS "Users can read own role" ON public.user_roles;
CREATE POLICY "Users can read own role"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());
