import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProductTabs({ description, reviewCount }) {
  return (
    <div className="w-full">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md bg-foreground">
          <TabsTrigger value="description" className="text-background">Description</TabsTrigger>
          <TabsTrigger value="reviews" className="text-background">Reviews ({reviewCount})</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-8">
          <div className="prose prose-gray max-w-none">
            <p className="text-foreground leading-relaxed text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentula augue nec est vestibulum auctor.
              Donec risus est, rutrum vitae cursus rutrum, auctor sit imperdiet. Pellentesque facilisis mi mollis
              finibus pellentesque cursus at, suscipit et ninim.
            </p>
            <p className="text-foreground leading-relaxed mt-4 text-justify">
              Pellentesque aliquam, sem eget laoreet ultrices, ipsum mauris feugiat ipsum, quis fermentum tortor ante
              eget velit. Donec ac tempor ante. Fusce ultricies massa mauris. Fusce aliquam, mauris eget sagittis
              ultrices, ipsum mauris aliquam ex, sed elementor mauris ipsum nec est, et magna risus mauris lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, mauris eros egestas
              risus, ut accumsan nibh dolor quis, ac sodales. Cras risque mauris ex, consequat vel dignissim et, lacinia
              ut urna. Donec gravida fermentum tellus. Ut non mauris lorem. Aenean tempor mauris diam.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-8">
          <div className="text-foreground">
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
