import { CMS_NAME } from "../lib/constants";

export default function Footer() {
  return (
    <footer className='static bottom-0 p-10 bg-slate-100 w-full'>
      <p className="text-xl lg:text-3xl font-bold tracking-tighter leading-tight text-center">
        {CMS_NAME} er tilknyttet{" "}
        <span className='font-black'>International Tress Association</span>.
      </p>
    </footer>
  );
}
