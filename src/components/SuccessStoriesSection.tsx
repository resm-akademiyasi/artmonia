import { useState, useEffect } from "react";
import { Play, ArrowRight, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

interface SuccessStory {
  id: string;
  student_name: string;
  testimonial: string;
  thumbnail_url: string | null;
  video_url: string | null;
  display_order: number;
}

const StoryCard = ({
  story,
  index,
  onPlay,
}: {
  story: SuccessStory;
  index: number;
  onPlay: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex-shrink-0 w-[220px] md:w-auto cursor-pointer group"
    onClick={onPlay}
  >
    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-lg">
      {story.thumbnail_url ? (
        <img
          src={story.thumbnail_url}
          alt={story.student_name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="h-full w-full bg-accent/10 flex items-center justify-center">
          <Play size={32} className="text-muted-foreground/40" />
        </div>
      )}

      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/50 transition-all duration-300" />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-xl border-2 border-primary-foreground/30">
          <Play size={28} className="text-primary-foreground ml-1" fill="currentColor" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-accent/80 to-transparent" />

      <div className="absolute top-3 right-3 bg-accent/60 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Volume2 size={14} className="text-primary-foreground" />
      </div>
    </div>

    <div className="mt-3 px-1">
      <p className="font-display text-base font-bold text-accent">{story.student_name}</p>
      <p className="font-body text-xs text-muted-foreground mt-0.5 line-clamp-2 italic">
        "{story.testimonial}"
      </p>
    </div>
  </motion.div>
);

const SuccessStoriesSection = () => {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [activeStory, setActiveStory] = useState<SuccessStory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("success_stories")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });
      if (data) setStories(data as unknown as SuccessStory[]);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return null;
  if (!stories.length) return null;

  return (
    <section className="section-padding overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-4 font-body text-[11px] tracking-[0.3em] uppercase text-primary">
            Uğur Hekayələri
          </p>
          <h2 className="font-display text-4xl font-bold text-accent md:text-5xl lg:text-6xl">
            Tələbələrimiz{" "}
            <span className="italic text-primary">danışır</span>
          </h2>
          <p className="mt-4 font-body text-sm text-muted-foreground">
            Real insanlar, real dəyişikliklər — öz sözləri ilə
          </p>
        </div>

        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stories.map((story, i) => (
            <StoryCard key={story.id} story={story} index={i} onPlay={() => setActiveStory(story)} />
          ))}
        </div>

        <div className="flex md:hidden gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
          {stories.map((story, i) => (
            <div key={story.id} className="snap-start">
              <StoryCard story={story} index={i} onPlay={() => setActiveStory(story)} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/stories"
            className="group inline-flex items-center gap-2 font-body text-sm font-semibold tracking-wider uppercase text-primary hover:text-accent transition-colors"
          >
            Daha çox hekayə izlə
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <Dialog open={!!activeStory} onOpenChange={() => setActiveStory(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-accent border-accent overflow-hidden rounded-2xl">
          <div className="relative aspect-[9/16] md:aspect-video bg-accent">
            {activeStory?.video_url ? (
              <video src={activeStory.video_url} controls autoPlay className="w-full h-full object-contain" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-primary-foreground/60">
                <Play size={64} className="text-primary" />
                <p className="font-body text-sm">Video tezliklə əlavə olunacaq</p>
              </div>
            )}
          </div>
          {activeStory && (
            <div className="p-5">
              <p className="font-display text-lg font-bold text-primary-foreground">{activeStory.student_name}</p>
              <p className="font-body text-sm text-primary-foreground/60 mt-1 italic">"{activeStory.testimonial}"</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SuccessStoriesSection;
