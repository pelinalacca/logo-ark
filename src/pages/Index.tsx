import SpinWheel from "@/components/SpinWheel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-secondary tracking-tight mb-2">
          <span className="text-primary">Logo</span> Yazılım
        </h1>
        <p className="text-lg text-muted-foreground font-medium">
          Çarkı çevir, indirimini kazan!
        </p>
      </div>

      <SpinWheel />

      <p className="mt-12 text-xs text-muted-foreground max-w-md text-center">
        Bu kampanya Logo Yazılım ürünleri için geçerlidir. Her kullanıcı bir kez çark çevirebilir.
      </p>
    </div>
  );
};

export default Index;
