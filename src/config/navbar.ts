import Today from "@material-ui/icons/Today";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import SettingsApplications from "@material-ui/icons/SettingsApplications";
import ExitToApp from "@material-ui/icons/ExitToApp";

export default [
  { path: "/", title: "daybook", icon: Today },
  { path: "/books", title: "books", icon: LibraryBooks },
  { path: "/settings", title: "settings", icon: SettingsApplications },
  { path: "/signin", title: "logout", icon: ExitToApp }
];
