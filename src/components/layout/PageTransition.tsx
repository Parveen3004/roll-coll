
import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

interface PageTransitionProps {
  children: React.ReactNode;
  location: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, location }) => {
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location}
        timeout={300}
        classNames="page-transition"
        unmountOnExit
      >
        <div className="w-full h-full">{children}</div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default PageTransition;
