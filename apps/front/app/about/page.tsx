import {
  SparklesIcon,
  UserGroupIcon,
  GlobeAltIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Modern Technology",
    description:
      "Built with the latest tech stack ensuring speed, security, and scalability for all your blogging needs.",
    icon: BoltIcon,
  },
  {
    name: "Global Community",
    description:
      "Connect with readers and writers from around the world. Share your stories and discover new perspectives.",
    icon: GlobeAltIcon,
  },
  {
    name: "User-Centric Design",
    description:
      "Experience a clean, intuitive interface designed to make reading and writing as enjoyable as possible.",
    icon: UserGroupIcon,
  },
  {
    name: "Creative Freedom",
    description:
      "Express yourself fully with rich text formatting, image uploads, and customizable profile settings.",
    icon: SparklesIcon,
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-700">
      {/* Mission Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className=" text-center text-base font-semibold leading-7 text-blue-600">
            Our Mission
          </h2>
          <p className="mt-2 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Empowering Voices Everywhere
          </p>
          <p className="mt-6 text-center text-lg leading-8 text-slate-600">
            We believe that everyone has a story worth telling. My Modern Blog
            is designed to be the canvas for your thoughts, providing a seamless
            and beautiful experience for both writers and readers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-slate-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-slate-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
