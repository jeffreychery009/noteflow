import { Card, CardContent } from "../ui/card";

export function FeatureCard({
  title,
  description,
  features,
}: {
  title: string;
  description: string;
  features: Array<{
    icon: React.ReactNode;
    text: string;
  }>;
}) {
  return (
    <Card className="border border-transparent bg-white shadow-md dark:border-[#C8CBD9] dark:border-opacity-10 dark:bg-[#2A2A2A]">
      <CardContent className="p-8">
        <h3 className="mb-4 text-2xl font-medium">{title}</h3>
        <p className="mb-8 text-gray-600 dark:text-gray-400">{description}</p>
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className="text-primary">{feature.icon}</div>
              <span className="text-gray-900 dark:text-gray-100">
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
