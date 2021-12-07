import Image from "next/image";

const Loading = () => {
  return (
    <div
      className="position-fixed w-100 h-100 text-center d-flex justify-content-center align-items-center"
      style={{
        background: "#0008",
        color: "white",
        top: 0,
        left: 0,
        zIndex: 9,
      }}
    >
      <Image src="/loader.gif" height={80} width={80} alt="svg" />
    </div>
  );
};
export default Loading;
