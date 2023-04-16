import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Button } from "@pankod/refine-mui";

import { towelsLogo } from "assets";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
        
          <img src={towelsLogo} alt="Refine" width="28px" />
        ) : (
          <h2 style={{textDecoration: "none",}}>Towels</h2>
          // <img src="/refine.svg" alt="Refine" width="140px" />
        )}
      </Link>
    </Button>
  );
};
