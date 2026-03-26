import Image from "next/image";
import finance_bg from "../../public/finance_bg.png";
import logo from "../../public/logo.png";

const AuthBanner = ({
  bannerTitle,
  bannerDesc,
}: {
  bannerTitle: string;
  bannerDesc: string;
}) => {
  return (
    <div
      className="w-1/2 relative overflow-hidden text-white"
      style={{
        clipPath: "ellipse(90% 100% at 10% 50%)",
      }}
    >
      <Image
        src={finance_bg}
        alt="finance bg"
        fill
        priority
        className="object-cover object-[80%_center]"
      />

      <div className="absolute inset-0 bg-[var(--primary-color)]/60 z-10" />

      <div className="absolute inset-0 z-20 flex flex-col justify-between p-10">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="logo" width={140} />
        </div>

        <div className="max-w-lg">
          <h1 className="text-3xl font-semibold leading-snug mb-4">
            {bannerTitle}
          </h1>
          <p className="text-white/80">{bannerDesc}</p>
        </div>

        <div />
      </div>
    </div>
  );
};

export default AuthBanner;
