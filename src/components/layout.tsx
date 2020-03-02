import React from "react";
import { WithStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "./footer";
import Navbar from "./navbar";
import {
  Root,
  Sidebar,
  CollapseBtn,
  CollapseIcon,
  Content
} from "@mui-treasury/layout";
import theme from "../config/theme";
import navbarData from "../config/navbar";

const config = {
  sidebar: {
    anchor: "left",
    width: 256,
    variant: "permanent",
    collapsible: true,
    collapsedWidth: 64
  },
  header: {
    position: "fixed"
    // offsetHeight: 64 // 64 is the height of header
  }
};

interface LayoutProps extends WithStyles {
  history: any;
}

class Layout extends React.Component<LayoutProps> {
  render() {
    const { children } = this.props;
    return (
      <Root theme={theme} config={config}>
        {({ sidebarStyles, collapsed }) => (
          <>
            <CssBaseline />
            <Sidebar>
              <div className={sidebarStyles.container}>
                <Navbar collapsed={collapsed} data={navbarData} />
              </div>
              <CollapseBtn className={sidebarStyles.collapseBtn}>
                <CollapseIcon />
              </CollapseBtn>
            </Sidebar>
            <Content>{children}</Content>
            <Footer />
          </>
        )}
      </Root>
    );
  }
}

export default Layout;
