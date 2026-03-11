import { useState } from "react";
import { Play, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface SuccessStory {
  id: string;
  name: string;
  testimonial: string;
  thumbnailUrl: string;
  videoUrl: string;
}

const allStories: SuccessStory[] = [
  {
    id: "1",
    name: "Aysel Həsənova",
    testimonial: "Artmonia yaradıcılığa baxışımı tamamilə dəyişdi",
    thumbnailUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=600&fit=crop",
    videoUrl: "",
  },
  {
    id: "2",
    name: "Kənan Əliyev",
    testimonial: "Sıfırdan başlayıb 3 ayda ilk əsərimi satdım",
    thumbnailUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=600&fit=crop",
    videoUrl: "",
  },
  {
    id: "3",
    name: "Nərmin Quliyeva",
    testimonial: "Burada öyrəndiklərim peşəkar həyatıma istiqamət verdi",
    thumbnailUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=600&fit=crop",
    videoUrl: "",
  },
  {
    id: "4",
    name: "Rəşad Məmmədov",
    testimonial: "Hər dərsdə yeni bir dünya kəşf etdim",
    thumbnailUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&h=600&fit=crop",
    videoUrl: "",
  },
];

const StoriesPage = () => {
  const [activeStory, setActiveStory] = useState<SuccessStory | null>(null);

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-4 font-body text-[11px] tracking-[0.3em] uppercase text-primary">
            Video Qalereyası
          </p>
          <h1 className="font-display text-4xl font-bold text-accent md:text-5xl lg:text-6xl">
            Uğur <span className="italic text-primary">Hekayələri</span>
          </h1>
          <p className="mt-4 font-body text-sm text-muted-foreground">
            Tələbələrimizin Artmonia ilə dəyişən həyat hekayələri
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {allStories.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="cursor-pointer group"
              onClick={() => setActiveStory(story)}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-lg">
                <img
                  src={story.thumbnailUrl}
                  alt={story.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
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
                <p className="font-display text-base font-bold text-accent">{story.name}</p>
                <p className="font-body text-xs text-muted-foreground mt-0.5 line-clamp-2 italic">
                  "{story.testimonial}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!activeStory} onOpenChange={() => setActiveStory(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-accent border-accent overflow-hidden rounded-2xl">
          <div className="relative aspect-[9/16] md:aspect-video bg-accent">
            {activeStory?.videoUrl ? (
              <video src={activeStory.videoUrl} controls autoPlay className="w-full h-full object-contain" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-primary-foreground/60">
                <Play size={64} className="text-primary" />
                <p className="font-body text-sm">Video tezliklə əlavə olunacaq</p>
              </div>
            )}
          </div>
          {activeStory && (
            <div className="p-5">
              <p className="font-display text-lg font-bold text-primary-foreground">{activeStory.name}</p>
              <p className="font-body text-sm text-primary-foreground/60 mt-1 italic">"{activeStory.testimonial}"</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default StoriesPage;
