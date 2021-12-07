import Navbar from "./Navbar";
import Notify from "./Notify";

export default function Layout({ children }) {
  return (
    <div className="container-fluid p-0 m-0">
      <Navbar />
      <Notify />
      {children}
    </div>
  );
}
