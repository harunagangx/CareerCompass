import { Compass } from 'lucide-react';
import { Link } from 'react-router';

const Logo = () => {
  return (
    <div className="flex items-center gap-10">
      <Link className="flex items-center gap-2" to="/">
        <Compass color="#DC2626" size={40} />
        <h1 className="text-3xl text-primary font-extrabold italic">CareerCompass</h1>
      </Link>
    </div>
  );
};

export default Logo;
