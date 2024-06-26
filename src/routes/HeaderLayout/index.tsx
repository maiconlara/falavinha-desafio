import { Outlet } from "react-router-dom";
import Header from "./header";
import { useMediaQuery } from "../../utils/hooks/useMediaQuery";
import Mobile from "./mobile";

const HeaderLayout = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="flex flex-col relative max-w-[100vw] w-full min-h-[100vh] overflow-hidden justify-start items-center font-nunito">
      {isDesktop && <Header />}
      {!isDesktop && <Mobile />}
      <Outlet />
    </div>
  );
};
export default HeaderLayout;
