import Link from "next/link";
import { Button } from "./ui/button";
import GithubStarCount from "./GithubStars";

const LandingNav = () => {
  return (
    <nav className="flex justify-between items-center w-screen px-4 py-3">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl bg-gradient-to-tl to-zinc-400 from-slate-800 via-gray-900 bg-clip-text text-transparent">
        EvBiz
      </h1>
      <div className="flex">
        <div>
          {/* <GithubStarCount repoUrl="https://github.com/suman-3/Quick-Bio" /> */}
        </div>
        <Link href="/sign-in">
          <Button variant="link" className="text-white">
            Log In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button variant="link" className="text-white">
            Register
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNav;
