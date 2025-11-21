import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "TMT Daily Brief has become essential for our investment decisions. The M&A insights are unparalleled.",
    name: "James Chen",
    title: "VP, Goldman Sachs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
  },
  {
    quote: "The daily updates and AI dictionary have transformed how we analyze market trends.",
    name: "Sarah Johnson", 
    title: "Director, McKinsey & Company",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
  },
  {
    quote: "Outstanding research quality. The mentorship program is a game-changer for junior analysts.",
    name: "Michael Zhang",
    title: "Senior Analyst, J.P. Morgan", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4" data-testid="text-testimonials-title">
            Trusted by industry professionals
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-white shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`card-testimonial-${index}`}
            >
              <CardContent className="p-8">
                <img 
                  src={testimonial.image}
                  alt={`Professional headshot of ${testimonial.name}`}
                  className="w-16 h-16 rounded-full object-cover mb-6"
                  data-testid={`img-testimonial-${index}`}
                />
                <p className="text-muted-foreground mb-6 italic" data-testid={`text-testimonial-quote-${index}`}>
                  "{testimonial.quote}"
                </p>
                <div>
                  <h4 className="font-semibold text-secondary" data-testid={`text-testimonial-name-${index}`}>
                    {testimonial.name}
                  </h4>
                  <p className="text-muted-foreground" data-testid={`text-testimonial-title-${index}`}>
                    {testimonial.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
