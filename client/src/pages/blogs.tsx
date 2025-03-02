import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, MessageSquare, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

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
  },
  {
    id: 4,
    title: "Telemedicine and Remote Patient Monitoring",
    excerpt: "The rise of telemedicine solutions and how they're changing the landscape of healthcare delivery.",
    date: "August 5, 2023",
    category: "Telemedicine",
    likes: 112,
    comments: 28,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    title: "Ethical Considerations in Medical AI",
    excerpt: "Exploring the ethical challenges and considerations when implementing AI in healthcare settings.",
    date: "September 18, 2023",
    category: "Ethics",
    likes: 87,
    comments: 36,
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    title: "The Impact of Voice Recognition on Medical Reporting",
    excerpt: "How voice recognition technology is streamlining medical documentation and improving efficiency.",
    date: "October 7, 2023",
    category: "Technology",
    likes: 103,
    comments: 19,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  }
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-blue-600 hover:bg-blue-50 flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                </Button>
              </Link>
            </div>
            <h1 className="text-xl font-semibold text-gray-800">CeraCommunicator Insights</h1>
          </div>
        </div>
      </header>

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Latest Insights</h2>
            <div className="flex gap-4">
              <Button variant="outline" className="border-gray-300">
                Most Recent
              </Button>
              <Button variant="outline" className="border-gray-300">
                Most Popular
              </Button>
              <Button variant="outline" className="border-gray-300">
                Categories
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          <div className="mt-12 flex justify-center">
            <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
              Load More Articles
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 