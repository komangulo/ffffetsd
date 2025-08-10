import { useState } from 'react';
import { Sidebar } from './Sidebar';
import Navigation from '../Navigation';

export const withFetichionarioLayout = (WrappedComponent: React.ComponentType<any>) => {
  return function WithFetichionarioLayout(props: any) {
    const [searchQuery, setSearchQuery] = useState('');

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Main Navigation */}
        <Navigation />
        
        <div className="flex pt-16">
          {/* Sidebar */}
          <Sidebar 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Main Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            <WrappedComponent {...props} />
          </div>
        </div>
      </div>
    );
  };
};

export default withFetichionarioLayout;
