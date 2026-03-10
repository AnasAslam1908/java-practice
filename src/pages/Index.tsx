import { useState, useRef, useCallback, useEffect } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { topics } from "@/data/topics";
import DocSidebar from "@/components/DocSidebar";
import TableOfContents from "@/components/TableOfContents";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";
import SectionCard from "@/components/SectionCard";
import TrapQuestions from "@/components/TrapQuestions";
import CheatSheet from "@/components/CheatSheet";

export default function Index() {
  const [activeTopic, setActiveTopic] = useState("oops");
  const [activeSection, setActiveSection] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentTopic = topics.find((t) => t.id === activeTopic)!;

  const scrollToSection = useCallback((index: number) => {
    setActiveSection(index);
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleTopicSelect = useCallback((topicId: string) => {
    setActiveTopic(topicId);
    setActiveSection(0);
    setSidebarOpen(false);
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSectionSelect = useCallback((topicId: string, sectionIndex: number) => {
    setActiveTopic(topicId);
    setSidebarOpen(false);
    setTimeout(() => {
      setActiveSection(sectionIndex);
      sectionRefs.current[sectionIndex]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  const handleSearchSelect = useCallback((topicId: string, sectionIndex: number) => {
    handleSectionSelect(topicId, sectionIndex);
  }, [handleSectionSelect]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveSection(idx);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeTopic]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 lg:px-6 h-14">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 rounded-md hover:bg-accent text-muted-foreground transition-colors"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary text-primary-foreground">
                <BookOpen className="h-4 w-4" />
              </div>
              <h1 className="text-sm font-semibold text-foreground tracking-tight">
                Java Interview Docs
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <SearchBar onSelect={handleSearchSelect} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar */}
        <aside
          className={`fixed lg:sticky top-14 z-40 h-[calc(100vh-3.5rem)] w-[260px] bg-sidebar border-r border-sidebar-border overflow-y-auto scrollbar-thin transition-transform duration-200 lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <DocSidebar
            activeTopic={activeTopic}
            onTopicSelect={handleTopicSelect}
            onSectionSelect={handleSectionSelect}
          />
        </aside>

        {/* Main Content */}
        <main
          ref={contentRef}
          className="flex-1 overflow-y-auto scrollbar-thin h-[calc(100vh-3.5rem)]"
        >
          <div className="max-w-[720px] mx-auto px-6 sm:px-10 py-10">
            {/* Topic Header */}
            <div className="mb-10 pb-6 border-b border-border">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{currentTopic.icon}</span>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">{currentTopic.label}</h1>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentTopic.sections.length} sections · Interview-ready explanations with code examples
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-0">
              {currentTopic.sections.map((section, idx) => (
                <div
                  key={`${activeTopic}-${idx}`}
                  ref={(el) => { sectionRefs.current[idx] = el; }}
                  className="scroll-mt-20 py-8 first:pt-0"
                >
                  <SectionCard section={section} index={idx} />
                  {idx < currentTopic.sections.length - 1 && (
                    <div className="border-b border-border mt-8" />
                  )}
                </div>
              ))}
            </div>

            {/* Trap Questions */}
            {currentTopic.trapQuestions && currentTopic.trapQuestions.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <TrapQuestions questions={currentTopic.trapQuestions} />
              </div>
            )}

            {/* Cheat Sheet */}
            <div className="mt-12 mb-10 pt-8 border-t border-border">
              <CheatSheet />
            </div>
          </div>
        </main>

        {/* Right TOC */}
        <aside className="hidden xl:block sticky top-14 h-[calc(100vh-3.5rem)] w-52 border-l border-border overflow-y-auto scrollbar-thin">
          <TableOfContents
            sections={currentTopic.sections}
            activeSection={activeSection}
            onSectionClick={scrollToSection}
          />
        </aside>
      </div>
    </div>
  );
}
