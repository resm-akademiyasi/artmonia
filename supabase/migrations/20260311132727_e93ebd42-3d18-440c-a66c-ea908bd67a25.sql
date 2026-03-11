
-- Drop all existing policies and recreate as explicitly PERMISSIVE

-- NEWS
DROP POLICY IF EXISTS "Anyone can read published news" ON public.news;
DROP POLICY IF EXISTS "Admins can manage news" ON public.news;

CREATE POLICY "Anyone can read published news" ON public.news AS PERMISSIVE FOR SELECT TO public USING (is_published = true);
CREATE POLICY "Admins can manage news" ON public.news AS PERMISSIVE FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- STUDENT_RESULTS
DROP POLICY IF EXISTS "Anyone can read published results" ON public.student_results;
DROP POLICY IF EXISTS "Admins can manage results" ON public.student_results;

CREATE POLICY "Anyone can read published results" ON public.student_results AS PERMISSIVE FOR SELECT TO public USING (is_published = true);
CREATE POLICY "Admins can manage results" ON public.student_results AS PERMISSIVE FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- CAMPAIGNS
DROP POLICY IF EXISTS "Anyone can read active campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Admins can manage campaigns" ON public.campaigns;

CREATE POLICY "Anyone can read active campaigns" ON public.campaigns AS PERMISSIVE FOR SELECT TO public USING (is_active = true AND now() >= start_date AND now() <= end_date);
CREATE POLICY "Admins can manage campaigns" ON public.campaigns AS PERMISSIVE FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- EVENTS
DROP POLICY IF EXISTS "Anyone can insert events" ON public.events;
DROP POLICY IF EXISTS "Admins can read events" ON public.events;

CREATE POLICY "Anyone can insert events" ON public.events AS PERMISSIVE FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can read events" ON public.events AS PERMISSIVE FOR SELECT TO authenticated USING (is_admin());

-- LEADS
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can read leads" ON public.leads;

CREATE POLICY "Anyone can insert leads" ON public.leads AS PERMISSIVE FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can read leads" ON public.leads AS PERMISSIVE FOR SELECT TO authenticated USING (is_admin());

-- USER_ROLES
DROP POLICY IF EXISTS "Users can read own role" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

CREATE POLICY "Users can read own role" ON public.user_roles AS PERMISSIVE FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can manage roles" ON public.user_roles AS PERMISSIVE FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
