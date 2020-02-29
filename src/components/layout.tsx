import React from "react";
import { withStyles, WithStyles, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "./footer";
import SidebarComp from "./sidebar";
import {
  Root,
  Sidebar,
  CollapseBtn,
  CollapseIcon,
  Content
} from "@mui-treasury/layout";
import theme from "../config/theme";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";

const config = {
  sidebar: {
    anchor: "left",
    width: 256,
    variant: "permanent",
    collapsible: true,
    collapsedWidth: 64
  },
  header: {
    position: "fixed",
    offsetHeight: 64 // 64 is the height of header
  }
};

const styles = theme =>
  makeStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh"
    },
    content: {
      flexGrow: 1,
      overflow: "auto"
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500]
    }
  });

interface LayoutProps extends WithStyles {
  history: any;
}

class Layout extends React.Component<LayoutProps> {
  render() {
    const { classes, children } = this.props;
    return (
      <Root theme={theme} config={config}>
        {({ sidebarStyles }) => (
          <>
            <CssBaseline />
            <Sidebar>
              <div className={sidebarStyles.container}>
                <Avatar className={classes.purple}>OP</Avatar>
                <SidebarComp />
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

export default withStyles(styles)(Layout);
