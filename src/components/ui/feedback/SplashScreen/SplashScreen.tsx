export function SplashScreen() {
  return (
    <div
      className={
        "flex justify-center fixed top-0 left-0 w-full h-screen bg-background z-99999999"
      }
    >
      <div className="flex justify-center items-center flex-col h-fit m-auto gap-2">
        <img
          className="animate-bounce"
          src="/images/logo-1.png"
          alt="splash-screen"
          width={160}
          height={160}
        />
        {/* <Spinner size={24} /> */}
      </div>
    </div>
  );
}
// @keyframes my-animation {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(1080deg);
//   }
// }

// animation: 0.25s ease-in 0s 1 normal none running fadein, 2.5s ease-in-out 0s infinite normal none running my-animation;
