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
import IdleTimer from "react-idle-timer";
import { APP_IDLE_TIME } from "../constants/app";
import { logout } from "../redux";

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
  store: any;
}

class Layout extends React.Component<LayoutProps> {
  idleTimer;

  render() {
    const { children } = this.props;
    return (
      <IdleTimer
        ref={ref => {
          this.idleTimer = ref;
        }}
        element={document}
        onIdle={this.onIdle}
        debounce={250}
        timeout={APP_IDLE_TIME}
      >
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
      </IdleTimer>
    );
  }

  onIdle = () => {
    const { store, history } = this.props;
    if (store.getState().app.isLogin) {
      console.log("last active", this.idleTimer.getLastActiveTime());
      history.replace("/");
      store.dispatch(logout());
      alert("User logged-out successfully!");
    }
  };
}

export default Layout;
