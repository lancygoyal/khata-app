import BackupIcon from "@material-ui/icons/Backup";
import ExitToApp from "@material-ui/icons/ExitToApp";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import SettingsApplications from "@material-ui/icons/SettingsApplications";
import Today from "@material-ui/icons/Today";

export default [
  { path: "/", title: "daybook", icon: Today },
  { path: "/books", title: "books", icon: LibraryBooks },
  { path: "/backup", title: "backup", icon: BackupIcon }, // Temp Route - Custom function in navbar.tsx
  { path: "/settings", title: "settings", icon: SettingsApplications },
  { path: "/logout", title: "logout", icon: ExitToApp }, // Temp Route - Custom function in navbar.tsx
];
