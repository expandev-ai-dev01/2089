import { ErrorBoundary } from '@/router/error-boundary';
import { useNavigation } from '@/core/hooks/useNavigation';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Button } from '@/core/components/button';
import { ArrowLeftRight, FileInput } from 'lucide-react';

function MainLayout() {
  const { location, navigate } = useNavigation();

  const isTranslatorPage = location.pathname === '/';
  const isDecoderPage = location.pathname === '/decoder';
  const isInputPage = location.pathname === '/input';

  const handleToggle = () => {
    if (isTranslatorPage) {
      navigate('/decoder');
    } else {
      navigate('/');
    }
  };

  const handleInputPage = () => {
    navigate('/input');
  };

  return (
    <ErrorBoundary resetKey={location.pathname}>
      <div className="bg-background relative flex min-h-screen flex-col font-sans antialiased">
        <header className="border-b px-9 py-6">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Morser</h1>
              <p className="text-muted-foreground text-sm">Tradutor de Código Morse</p>
            </div>
            <div className="flex gap-2">
              {!isInputPage && (
                <Button variant="outline" onClick={handleInputPage}>
                  <FileInput className="h-4 w-4" />
                  Interface de Entrada
                </Button>
              )}
              {(isTranslatorPage || isDecoderPage) && (
                <Button variant="outline" onClick={handleToggle}>
                  <ArrowLeftRight className="h-4 w-4" />
                  {isTranslatorPage ? 'Decodificar Morse' : 'Traduzir Texto'}
                </Button>
              )}
            </div>
          </div>
        </header>
        <main className="flex h-full min-h-fit flex-1">
          <div className="max-w-dvw container flex-1 px-9 py-0">
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center">
                  <LoadingSpinner />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </main>
        <footer className="border-t px-9 py-6">
          <div className="container mx-auto text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 Morser - Tradutor de Código Morse
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export { MainLayout };
