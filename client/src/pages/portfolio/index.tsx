import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Code2, Github, Globe, LucideIcon, Star } from "lucide-react";

// Project type definition
interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  icon: LucideIcon;
  status: "completed" | "in-progress";
}

export default function Portfolio() {
  // Sample weekend projects
  const projects: Project[] = [
    {
      title: "AI Code Reviewer",
      description: "A GitHub Action that uses OpenAI to review pull requests and suggest improvements to code.",
      technologies: ["TypeScript", "Node.js", "OpenAI API", "GitHub Actions"],
      github: "https://github.com/ta-khongsap/ai-code-reviewer",
      icon: Code2,
      status: "completed"
    },
    {
      title: "Document RAG System",
      description: "A retrieval-augmented generation system for technical documentation that provides contextual answers.",
      technologies: ["Python", "LangChain", "Pinecone", "FastAPI"],
      link: "https://docs-rag.example.com",
      icon: Brain,
      status: "in-progress"
    },
    {
      title: "Smart Home Dashboard",
      description: "A real-time dashboard for monitoring and controlling smart home devices with anomaly detection.",
      technologies: ["React", "TypeScript", "MQTT", "TensorFlow.js"],
      github: "https://github.com/ta-khongsap/smart-home-dashboard",
      icon: Globe,
      status: "completed"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Weekend Projects | Totrakool Khongsap</title>
        <meta name="description" content="Weekend coding projects and experiments - Totrakool Khongsap" />
      </Helmet>
      
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Weekend Projects</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A collection of personal coding projects, experiments, and learning experiences that I work on during my free time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <project.icon className="h-8 w-8 text-primary mb-2" />
                  <Badge variant={project.status === "completed" ? "default" : "secondary"}>
                    {project.status === "completed" ? "Completed" : "In Progress"}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <Badge key={i} variant="outline" className="bg-muted/50">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2 pb-4">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="h-4 w-4 mr-1" /> GitHub
                  </a>
                )}
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Globe className="h-4 w-4 mr-1" /> Demo
                  </a>
                )}
                {!project.github && !project.link && <div></div>}
                <div className="flex items-center text-amber-500">
                  <Star className="h-4 w-4 mr-1 fill-current" />
                  <span className="text-sm">Featured</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-muted-foreground">More projects coming soon...</p>
        </div>
      </main>
    </>
  );
}