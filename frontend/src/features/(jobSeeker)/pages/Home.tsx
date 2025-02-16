import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Link } from 'react-router';

const Home = () => {
  return (
    <div>
      <Button>
        <Link to="/blog">Go to blog page</Link>
      </Button>

      <Button
        onClick={() => {
          toast('Hello from sonner!', {
            className: 'toast',
          });
        }}
      >
        Show text
      </Button>
      
    </div>
  );
};

export default Home;
