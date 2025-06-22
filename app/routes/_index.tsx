import { NotificationList } from "~/components/modal/notification-list";
import { Colors } from "../components/colors";
import { Header } from "../components/tool/tool";
import { Navbar } from "~/components/navbar/navbar";

export default function Index() {
  return (
    <>
      <NotificationList />
      <Navbar />
      <Header />
      <Colors />
    </>
  );
}
