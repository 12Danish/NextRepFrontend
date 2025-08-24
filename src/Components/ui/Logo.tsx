interface LogoProps {
  isCollapsed?: boolean;
}

const Logo = ({ isCollapsed = false }: LogoProps) => {
  if (isCollapsed) {
    return (
      <div className="border-b border-gray-200 p-3 text-center items-center">
        <img src="/logo.png" alt="NextRep" className="w-10 h-10 mx-auto" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-orange-400/80 via-orange-500/80 to-pink-500/80 backdrop-blur-sm p-4 text-center items-center">
      <h1 className="text-white font-black text-4xl tracking-tighter leading-none text-center">
        Next<span className="text-amber-200">Rep</span>
      </h1>
    </div>
  );
};

export default Logo; 