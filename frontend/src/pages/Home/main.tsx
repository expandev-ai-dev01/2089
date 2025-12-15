import { useNavigation } from '@/core/hooks/useNavigation';
import { useEffect } from 'react';

function HomePage() {
  const { navigate } = useNavigation();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null;
}

export { HomePage };
