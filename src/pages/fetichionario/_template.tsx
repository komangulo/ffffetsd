import { withFetichionarioLayout } from '@/components/fetichionario/withFetichionarioLayout';

interface FetichionarioPageProps {
  title: string;
  children: React.ReactNode;
}

const FetichionarioPage = ({ title, children }: FetichionarioPageProps) => {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-red-500 mb-6">{title}</h1>
        <div className="prose prose-invert max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
};

export const withFetichionarioPage = (title: string) => {
  return (Component: React.ComponentType) => {
    const WrappedComponent = () => (
      <FetichionarioPage title={title}>
        <Component />
      </FetichionarioPage>
    );
    return withFetichionarioLayout(WrappedComponent);
  };
};

export default FetichionarioPage;
