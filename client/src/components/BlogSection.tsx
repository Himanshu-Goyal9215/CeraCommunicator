import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, MessageSquare } from "lucide-react";

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "AI in Medical Documentation: Transforming Healthcare",
    excerpt: "How artificial intelligence is revolutionizing the way medical professionals document patient interactions.",
    date: "May 15, 2023",
    category: "AI & Healthcare",
    likes: 124,
    comments: 32,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "The Future of Clinical Decision Support Systems",
    excerpt: "Exploring how AI-powered clinical decision support systems are improving diagnostic accuracy and patient outcomes.",
    date: "June 3, 2023",
    category: "Clinical Practice",
    likes: 98,
    comments: 24,
    image: "https://images.unsplash.com/photo-1581093458791-9d2b11a0c07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "Improving Patient Care with SOAP Notes Automation",
    excerpt: "How automated SOAP notes are saving time and improving the quality of patient documentation.",
    date: "July 12, 2023",
    category: "Documentation",
    likes: 156,
    comments: 41,
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  }
];

export default function BlogSection() {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Latest Insights</h2>
        <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 flex items-center gap-2">
          View All Articles <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="h-48 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-600 text-sm font-medium">{post.category}</span>
                <span className="text-gray-500 text-sm">{post.date}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {post.excerpt}
              </p>
              <div className="flex justify-between items-center">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0 flex items-center gap-1">
                  Read More <ArrowRight className="h-3 w-3" />
                </Button>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Heart className="h-3 w-3 mr-1" />
                    {post.likes}
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {post.comments}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 