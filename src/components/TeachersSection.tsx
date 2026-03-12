import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Teacher {
  id: string;
  full_name: string;
  title: string | null;
  bio: string | null;
  photo_url: string | null;
  specialties: string[];
}

const TeachersSection = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      const { data } = await supabase
        .from("teachers")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });
      if (data) setTeachers(data as unknown as Teacher[]);
      setLoading(false);
    };
    fetchTeachers();
  }, []);

  if (loading) return null;
  if (!teachers.length) return null;

  return (
    <section id="teachers" className="section-padding overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-4 font-body text-[11px] tracking-[0.3em] uppercase text-primary">
            Komandamız
          </p>
          <h2 className="font-display text-4xl font-bold text-accent md:text-5xl lg:text-6xl">
            Müəllim <span className="italic text-primary">heyəti</span>
          </h2>
          <p className="mt-4 font-body text-sm text-muted-foreground">
            Peşəkar və təcrübəli müəllimlərimizlə tanış olun
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teachers.slice(0, 4).map((teacher, i) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group text-center"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-lg mx-auto max-w-[280px]">
                {teacher.photo_url ? (
                  <img
                    src={teacher.photo_url}
                    alt={teacher.full_name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-accent/5 flex items-center justify-center">
                    <span className="font-display text-5xl font-bold text-muted-foreground/30">
                      {teacher.full_name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/70 to-transparent" />

                {/* Specialties on hover */}
                {teacher.specialties.length > 0 && (
                  <div className="absolute bottom-3 inset-x-3 flex flex-wrap gap-1 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {teacher.specialties.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] bg-primary/80 backdrop-blur-sm text-primary-foreground px-2.5 py-0.5 rounded-full font-body font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <p className="font-display text-lg font-bold text-accent">{teacher.full_name}</p>
                {teacher.title && (
                  <p className="font-body text-xs text-primary font-medium mt-0.5">{teacher.title}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {teachers.length > 4 && (
          <div className="mt-12 text-center">
            <Link
              to="/teachers"
              className="group inline-flex items-center gap-2 font-body text-sm font-semibold tracking-wider uppercase text-primary hover:text-accent transition-colors"
            >
              Bütün müəllimləri gör
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeachersSection;
